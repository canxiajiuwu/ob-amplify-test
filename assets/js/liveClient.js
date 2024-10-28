/* eslint-disable no-case-declarations */
import CryptoJS from 'crypto-js'

const rawHeaderLen = 16
const packetOffset = 0
const headerOffset = 4
const verOffset = 6
const opOffset = 8
const seqOffset = 12

export default function Client(options) {
  const MAX_CONNECT_TIME = 10
  const DELAY = 15000
  this.options = options || {}
  this.alive = true
  this.createConnect(MAX_CONNECT_TIME, DELAY)
}

Client.prototype.createConnect = function (max, delay) {
  const self = this
  if (max === 0) {
    return
  }

  try {
    connect()
  } catch (err) {
    console.log(err)
  }

  const textDecoder = new TextDecoder()
  const textEncoder = new TextEncoder()
  let heartbeatInterval

  function connect() {
    const ws = new WebSocket(self.options.url)
    self.ws = ws
    // eslint-disable-next-line no-unused-vars
    let auth = false
    ws.binaryType = 'arraybuffer'
    ws.onopen = function () {
      getAuth()
    }
    ws.onerror = function (e) {
      console.log('error:' + e)
    }
    ws.onmessage = function (evt) {
      const data = evt.data
      const dataView = new DataView(data, 0)
      let packetLen = dataView.getInt32(packetOffset)
      let headerLen = dataView.getInt16(headerOffset)
      //   var ver = dataView.getInt16(verOffset)
      let op = dataView.getInt32(opOffset)
      //   var seq = dataView.getInt32(seqOffset)
      switch (op) {
        case 8:
          auth = true
          heartbeat()
          heartbeatInterval = setInterval(heartbeat, 30 * 1000)
          break
        case 3:
          // receive a heartbeat from server
          break
        case 9:
          for (
            let offset = rawHeaderLen;
            offset < data.byteLength;
            offset += packetLen
          ) {
            // parse
            packetLen = dataView.getInt32(offset)
            headerLen = dataView.getInt16(offset + headerOffset)
            // ver = dataView.getInt16(offset + verOffset)
            op = dataView.getInt32(offset + opOffset)
            // seq = dataView.getInt32(offset + seqOffset)
            const msgBody = textDecoder.decode(
              data.slice(offset + headerLen, offset + packetLen)
            )

            // callback
            messageReceived(msgBody)
          }
          break
        default:
          const msgBody = textDecoder.decode(data.slice(headerLen, packetLen))
          messageReceived(msgBody)
          break
      }
    }

    ws.onclose = function () {
      if (heartbeatInterval) clearInterval(heartbeatInterval)
      setTimeout(reConnect, delay)
    }

    function heartbeat() {
      const headerBuf = new ArrayBuffer(rawHeaderLen)
      const headerView = new DataView(headerBuf, 0)
      headerView.setInt32(packetOffset, rawHeaderLen)
      headerView.setInt16(headerOffset, rawHeaderLen)
      headerView.setInt16(verOffset, 1)
      headerView.setInt32(opOffset, 2)
      headerView.setInt32(seqOffset, 1)
      ws.send(headerBuf)
    }

    function getAuth() {
      const headerBuf = new ArrayBuffer(rawHeaderLen)
      const headerView = new DataView(headerBuf, 0)
      const bodyBuf = textEncoder.encode(JSON.stringify(self.options.auth))
      headerView.setInt32(packetOffset, rawHeaderLen + bodyBuf.byteLength)
      headerView.setInt16(headerOffset, rawHeaderLen)
      headerView.setInt16(verOffset, 1)
      headerView.setInt32(opOffset, 7)
      headerView.setInt32(seqOffset, 1)
      ws.send(mergeArrayBuffer(headerBuf, bodyBuf))
      // auth验证成功回调
      const notify = self.options.notify
      if (notify)
        notify({
          op: 5173
        })
    }

    function messageReceived(body) {
      const notify = self.options.notify
      if (notify) notify(JSON.parse(decrypt(body)))
    }

    function mergeArrayBuffer(ab1, ab2) {
      const u81 = new Uint8Array(ab1)
      const u82 = new Uint8Array(ab2)
      const res = new Uint8Array(ab1.byteLength + ab2.byteLength)
      res.set(u81, 0)
      res.set(u82, ab1.byteLength)
      return res.buffer
    }

    /** 解密 */
    function decrypt(word) {
      //   let word =
      //     '37aaeb0f2b15ac702f3b5f064645f26e7c2ed8dc7ca263b66857e40495f844000a8a9da5df505c5e7b062c91fc099b82286d85d1b4f7acac5f464d428162708e'
      const key = CryptoJS.enc.Utf8.parse('ZTM**#KKKDJJ1234')
      const iv = CryptoJS.enc.Utf8.parse('ZTM**#KKKDJJ1234')

      const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
      const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
      const decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    }

    /** 加密 */
    function encrypt(word) {
      const key = CryptoJS.enc.Utf8.parse('ZTM**#KKKDJJ1234')
      const iv = CryptoJS.enc.Utf8.parse('ZTM**#KKKDJJ1234')
      const data = JSON.stringify(word)
      const srcs = CryptoJS.enc.Utf8.parse(data)
      const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.ciphertext.toString()
    }

    self.sendMsg = function (data) {
      const token = encrypt({
        plate: self.options.plate,
        serve: self.options.serve,
        data
      })
      // const token = JSON.stringify(data)
      const headerBuf = new ArrayBuffer(rawHeaderLen)
      const headerView = new DataView(headerBuf, 0)
      const bodyBuf = textEncoder.encode(token)
      headerView.setInt32(packetOffset, rawHeaderLen + bodyBuf.byteLength)
      headerView.setInt16(headerOffset, rawHeaderLen)
      headerView.setInt16(verOffset, 1)
      headerView.setInt32(opOffset, 26)
      headerView.setInt32(seqOffset, 1)
      ws.send(mergeArrayBuffer(headerBuf, bodyBuf))
    }

    // function char2ab(str) {
    //   var buf = new ArrayBuffer(str.length)
    //   var bufView = new Uint8Array(buf)
    //   for (var i = 0; i < str.length; i++) {
    //     bufView[i] = str[i]
    //   }
    //   return buf
    // }
  }

  function reConnect() {
    if (self.alive) self.createConnect(--max, delay * 2)
  }
}

// id为期数id,返回hash值
export function SHA256(id) {
  return CryptoJS.SHA256(id).toString()
}
