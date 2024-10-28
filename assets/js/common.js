import Lib from './Lib'
import CryptoJS from './aes'
import jsStyleData from './mainStyle'
import domtoimage from '@/assets/js/dom-to-image.min'
// 未知高度展开收缩动画
import CollapseTransition from '@/assets/js/utils/collapse-transition'
// js变量文件
import { popUpWindowDetection } from '@/assets/js/utils/popupPriority.js'
const Rxports = {
  CollapseTransition,
  jsStyleData,
  /**
   * 获取url传过来的参数
   * @param name  获取的参数
   */
  GetQueryString: function (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  GetUrlParam(paraName) {
    const url = document.location.toString()
    const arrObj = url.split('?')

    if (arrObj.length > 1) {
      const arrPara = arrObj[1].split('&')
      let arr

      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split('=')

        if (arr != null && arr[0] === paraName) return arr[1]
      }
      return ''
    } else return ''
  },
  /**
   * 获取对应名称的cookie
   * @param name cookie的名称
   * @returns {null} 不存在时，返回null
   */
  getCookie(name) {
    let arr
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) return unescape(arr[2])
    else return null
  },
  /**
   * 设置cookie
   * @param name cookie的名称
   * @param value cookie的值
   * @param day cookie的过期时间
   */
  setCookie(name, value, day) {
    if (day !== 0) {
      // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      const expires = day * 24 * 60 * 60 * 1000
      const date = new Date(+new Date() + expires)
      document.cookie =
        name +
        '=' +
        escape(value) +
        ';expires=' +
        date.toUTCString() +
        ';path=/'
    } else document.cookie = name + '=' + escape(value) + ';path=/'
  },
  /**
   * 删除cookie
   * @param name cookie的名称
   */
  delCookie(name) {
    this.setCookie(name, ' ', -1)
  },
  // 加密
  encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('abcdefgabcdefg12')
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  // 解密
  decrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('abcdefgabcdefg12')
    const decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  },
  // 接口加密
  apiEncrypt(word) {
    return word
  },
  // 接口解密
  apiDecrypt(word) {
    return word
  },
  // google analysis
  event_statistics(action, target) {
    if (typeof window === 'undefined') return
    const winApp = window.appInteraction || { type: 1 }
    const newString = action.replace('-', '_')
    const channel =
      sessionStorage.getItem('sesChannel') || this.getCookie('channel')
    const newTarget = `${target || ''}${channel ? ',channel:' + channel : ''}${
      this.getCookie('rs_st_code')
        ? ',rs_st_code:' + this.getCookie('rs_st_code')
        : ''
    }`
    if (winApp.type === 1) {
      const targetObj = []
      newTarget.split(',').forEach((item) => {
        if (item) {
          const arr = item.split(':')
          if (!arr[1]) arr[1] = 'default'
          targetObj.push(arr)
        }
      })
      try {
        const gtag = window.gtag
        if (gtag) {
          gtag('event', newString, {
            event_category: window.vm.store.state.root.locale,
            ...Object.fromEntries(targetObj)
          })
        }
      } catch (err) {
        console.log(err)
      }
    } else winApp.reportFbEmpEvent(newString, newTarget || 'no set')
  },

  // /**
  //  * 错误提示弹窗
  //  * @param data  获取的参数
  //  * @param _this  vm指针
  //  * @param index  type类型
  //  */
  // errorReminder (data,_this,index,title,confirmButtonText,cancelButtonText){
  //   _this.$store.commit('Modal',{
  //     message:data?data:'something went wrong',
  //     type:index?index:1,
  //     title:title?title:'',
  //     confirmButtonText:confirmButtonText?confirmButtonText:'',
  //     cancelButtonText:cancelButtonText?cancelButtonText:''
  //   })
  // },

  // 错误提示弹窗
  errorReminder(
    _this,
    event,
    type,
    title,
    message,
    solidButton,
    borderButton,
    solidButtonCall,
    borderButtonCall,
    selectTitle
  ) {
    // type 值有 A B C
    if (type !== 'A') {
      // A类型分享 B 订单分享的Load Code弹窗
      if (
        !popUpWindowDetection({
          type: type === 'B' ? 'orderSharing' : 'publicPopUpBox'
        })
      )
        return
    }
    _this.$store.commit('Modal', {
      event,
      type,
      title,
      message,
      solidButton,
      borderButton,
      solidButtonCall,
      borderButtonCall,
      selectTitle //  选择框
    })
  },
  // 头部错误提示
  errorReminderUp(_this, reminderShow, reminderText, reminderType) {
    _this.$store.commit('setCommonReminder', {
      // 错误提示是否展示
      isCommonReminderShow: reminderShow,
      // 错误提示文本
      commonReminderText: reminderText,
      // 错误提示类型
      commonReminderType: reminderType
    })
  },
  // 预加载图片
  loadImage(url, callback) {
    const img = new Image() // 创建一个Image对象，实现图片的预下载
    img.src = url
    if (img.complete) {
      // 如果图片已经存在于浏览器缓存，直接调用回调函数
      if (callback) callback(img)
      return // 直接返回，不用再处理onload事件
    }
    img.onload = () => {
      img.onload = null
      if (callback) callback(img)
    }
  },
  // 判断是电脑还是移动端
  isMobile() {
    const test = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    )
    if (test) return true
    else return false
  },
  // 活动页回退处理
  activityBack(_this) {
    const winApp = window.appInteraction
    const historyLen = history.length
    if (Lib.store.get('isNewApp')) {
      const routerLen = sessionStorage.getItem('routerLen') || 1
      if (routerLen <= 2) winApp.closeTopActivity()
      else _this.$router.back()
      return
    }
    if (historyLen <= 2)
      _this.$router.replace({ path: `/${_this.$store.state.root.locale}` })
    else _this.$router.back()
  },
  // 手机号验证
  phoneNumberVerify(_this) {
    return _this.$store.state.root.country === 'ug'
      ? /^(070|074|075|076|077|078|079|039|01\d|02\d)\d{7}$/
      : /^(065\d|067\d|069\d|068\d|01\d{2})\d{6}$/
  },
  // 手机号品牌商验证
  phoneNumberCompany(_this, phone) {
    if (_this.$store.state.root.country === 'ug') {
      if (/^(010|015|076|077|078|039|031)\d{7}$/.test(phone)) return 'mtn'

      if (/^(075|070|074|020)\d{7}$/.test(phone)) return 'airtel'
    } else {
      if (/^(065[0-4]|067\d|068[0-5])\d{6}$/.test(phone)) return 'mtn'

      if (/^(069\d|065[5-9]|068[6-9])\d{6}$/.test(phone)) return 'orange'
    }
  },
  // 是否是pc端
  isPC() {
    if (typeof window === 'undefined') return false
    const userAgentInfo = navigator.userAgent.toLowerCase()
    const Agents = [
      'android',
      'iphone',
      'symbianOS',
      'windows phone',
      'ipad',
      'ipod'
    ]
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  },
  /**
   * @msg: 获取系统当前时间
   * @param {number} date 时间戳
   * @param {string} fmt 时间格式 具体看代码
   * @return: string
   */
  getDate(date, fmt) {
    let time = fmt
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }

    if (/(y+)/.test(fmt)) {
      time = time.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        time = time.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return time
  },
  // 秒变分钟
  minuteDetal(seconds, fmt) {
    let time = fmt || "mm:ss'"
    const o = {
      'd+': parseInt(seconds / (3600 * 24)),
      'H+': parseInt(seconds / 3600) % 24,
      'h+': parseInt(seconds / 3600),
      'M+': parseInt(seconds / 60) % 60,
      'm+': parseInt(seconds / 60),
      's+': seconds % 60
    }

    for (const k in o) {
      if (new RegExp('(' + k + ')').test("mm:ss'")) {
        time = time.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }

      if (new RegExp('(' + k + ')').test(fmt)) {
        time = time.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }

    return time
  },
  // 删除skeleton
  hideSkeleton() {
    const winApp = window.appInteraction
    const skeleton = document.getElementById('skeleton-wrap-case')
    if (skeleton) skeleton.style.display = 'none'
    if (Lib.store.get('isNewApp')) winApp.gameOnload()
  },
  // 向下取整
  MathFloor(number, figures) {
    const digit = Math.pow(10, figures)
    return Math.floor(number * digit) / digit
  },
  // 初始化wchat
  initFreshChat(_this) {
    window.fcWidget.init({
      token: 'de501069-adeb-48d7-b153-1880463eede0',
      host: 'https://wchat.freshchat.com',
      open: false,
      locale: _this.$store.state.root.locale,
      config: {
        headerProperty: {
          hideChatButton: true,
          backgroundColor: '#394D8B'
        }
      }
    })

    window.fcWidget.on('widget:loaded', (resp) => {
      // 如果已填写完信息，则打开聊天窗口
      console.log('Widget Loaded')
      if (!_this.$store.state.isServerInfoShow) {
        this.openWchat(_this)
      }
    })
  },
  // 下载wchat文件
  initialize(_this, i, t) {
    let e
    // eslint-disable-next-line no-unused-expressions
    i.getElementById(t)
      ? this.openWchat(_this)
      : (_this.$store.commit('setServerInfoShow', true),
        ((e = i.createElement('script')).id = t),
        (e.async = !0),
        (e.src = 'https://wchat.freshchat.com/js/widget.js'),
        (e.onload = () => {
          this.initFreshChat(_this)
        }),
        i.head.appendChild(e))
  },
  // 切换wchat状态
  initiateCall(_this) {
    // app在线客服
    const winApp = window.appInteraction
    if (Lib.store.get('isNewApp')) {
      const appUrl =
        Lib.outUrl[
          `onebetApp${
            _this.$store.state.root.country === 'ug' ? 'Ug' : 'Cm'
          }Url`
        ]
      const url = appUrl + '/contact'
      winApp.adjustRouting(url)
      return
    }
    // web端在线客服
    this.initialize(_this, document, 'freshchat-js-sdk')
  },
  // 已初始化wchat，打开客服
  openWchat(_this) {
    _this.$store.commit('changeLoadingStatus', 0)
    this.setWchatProperties(_this)
    window.fcWidget.open()
  },
  // 设置用户属性
  setWchatProperties(_this) {
    const info = Lib.store.get('customerInfo')
    const connectionInfo = window.navigator.connection

    if (info) {
      window.fcWidget.user.setProperties({
        firstName: info.name,
        phone: info.mobile,
        email: info.email,
        site: window.appInteraction.type === 1 ? 'web' : 'app',
        effectiveType: connectionInfo.effectiveType,
        type: connectionInfo.type,
        userAgent: window.navigator.userAgent,
        meta_country: window.vm.store.state.root.country
      })
    }
  },
  // 异步加载js
  loadScript(src, callback, data) {
    window.vm.store.commit('changeLoadingStatus', true)
    const script = document.createElement('script')
    const head = document.getElementsByTagName('head')[0]
    script.type = 'text/javascript'
    script.charset = 'UTF-8'
    script.src = src
    script.setAttribute('id', 'ze-snippet')
    if (script.addEventListener) {
      script.addEventListener(
        'load',
        function () {
          callback(data)
        },
        false
      )
    } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', function () {
        const target = window.event.srcElement
        if (target.readyState === 'loaded') {
          callback(data)
        }
      })
    }
    head.appendChild(script)
  },
  // jwt身份验证
  serverInit(data) {
    // 链接若没回应20s后关闭loading
    setTimeout(() => {
      window.vm.store.commit('changeLoadingStatus', false)
    }, 20000)

    zE('webWidget', 'hide')
    zE('webWidget:on', 'open', function () {
      zE('webWidget', 'show')
      window.vm.store.commit('changeLoadingStatus', false)
      console.log('The widget has been opened!')
    })
    zE('webWidget:on', 'close', function () {
      zE('webWidget', 'hide')
      console.log('The widget has been closed!')
    })
    zE('webWidget:on', 'chat:unreadMessages', function (number) {
      console.log(`It seems you have  unread messages!`)
    })

    zE('webWidget:on', 'chat:connected', function () {
      zE('webWidget', 'open')
      console.log('successfully connected to Zendesk Chat!')
    })

    zE('webWidget:on', 'chat:status', function (status) {
      console.log('This chat session is now', status)
    })

    if (data) {
      zE('webWidget', 'prefill', {
        name: { value: data.name },
        email: { value: data.email },
        phone: { value: data.mobile }
      })
    }
  },
  // gameId
  gameName({ vm, item }) {
    const gameList = vm.$store.getters.gameList
    return gameList[item]
  },
  // 打开游戏前配置
  openGameConfig(_this, gameId, guest, role) {
    sessionStorage.setItem('loginAfterOpenGame', gameId) // 打开游戏时，验证登录前，记录游戏id
    sessionStorage.removeItem('loginToOpenGame') // 若存在登录直接打开游戏时的gameId，则在打开游戏清除掉

    const gameName = this.gameName({ vm: _this, item: gameId })
    if (gameName) {
      _this.$store.commit('setGameName', gameName.replace(/\s+/g, ''))
      _this.$store.commit('setOpenGame', '')
    } else {
      _this.$store.commit('setGameName', '')
      _this.$store.commit('setOpenGame', gameId)
    }
    _this.$store.commit('setGuest', guest)
    // if (role) {
    //   _this.$store.commit('setRole', role)
    // }
    // _this.$store.commit('setGiftGameId', '')
  },
  /**
   * 清空输入框
   * @msg: 清空输入框
   * @param: {data} 改动的参数
   * @param: {_this} this指针
   */
  clearInputData(data, _this) {
    _this[data] = ''
  },
  /**
   * 截屏
   */
  screenshots(success_callback, error_callback) {
    domtoimage
      .toJpeg(document.body, { quality: 0.6 })
      .then(function (dataUrl) {
        const link = document.createElement('a')
        link.download = 'my-image-name.jpeg'
        link.href = dataUrl
        link.click()
        success_callback()
      })
      .catch(function (e) {
        console.log(e)
        error_callback()
      })
  },
  /*
   * fn [function] 需要防抖的函数
   * delay [number] 毫秒，防抖期限值
   */
  deBounce(fn, delay = 500) {
    let timer = null
    // 借助闭包
    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  },
  // 节流
  throttle(func, wait = 500) {
    let previous = 0
    return function (...args) {
      const now = Date.now()
      const context = this
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    }
  },
  // 首字母大写
  UpperCase(item) {
    if (typeof item !== 'string') return item
    const firstStr = item[0].toUpperCase()
    const arr = Array.from(item)
    arr.shift()
    const str = firstStr + arr.join('')
    return str
  },
  /**
   * 金额格式化
   * @param: {Number} num 需要格式化的金额
   */
  abs(num) {
    const str = Number(num).toFixed(2) + ''
    const intSum = str
      .substring(0, str.indexOf('.'))
      .replace(/\B(?=(?:\d{3})+$)/g, ',')
    const dot = str.substring(str.length, str.indexOf('.'))
    const ret = intSum + dot
    return ret
  },
  /**
   * 根据配置返回相应方法
   * 注:调用页面必须有: inject: ['openGame'], 才可以获取游戏方法
   */
  openWay(type, _this) {
    const winApp = window.appInteraction
    // 跳转第三方链接方法
    const ThirdPartyServices = (url) => {
      if (Lib.store.get('isNewApp')) {
        if (url.includes(window.location.origin))
          return winApp.openDetail({ loadUrl: url, showHomeAsUp: false })
        return winApp.openBrowser(url)
      }
      if (winApp.type !== 1 && !url.includes(window.location.origin))
        return winApp.openBrowser(url)
      url.includes(window.location.origin)
        ? (window.location.href = url)
        : window.open(url)
    }
    const fnArr = [
      (item) => {
        if (item.url.indexOf('http') === 0) return ThirdPartyServices(item.url)
        _this.$router.push({ path: item.url })
      },
      (item) => ThirdPartyServices(item.url),
      (item) => {
        winApp.type === 1
          ? ThirdPartyServices(item.url)
          : winApp.openBrowser(item.url)
      },
      (item) => {
        Lib.common.openGameConfig(_this, item.gameId, '', '')
        _this.openGame()
      }
    ]
    return fnArr[type]
  },
  /**
   * 判断当前后台配置数据是否需要更新
   * @param {string} name 数据名称
   * @param {string} type 类型(查询:inquire,存储:storage)
   */
  getBackstageDataIsRefresh(name, type) {
    // 现在时间
    const nowTime = new Date().getTime()
    // 一小时
    const onehour = 3600000
    // 记录数据改变变量
    const storageObj = Lib.store.get('allDataRenewTime')
    // 事件对象
    const eventObj = {
      // 查询 (返回boolean, true: 可以更新, false: 不可以更新)
      inquire: () => {
        // 数据结构为对象进行下一步
        if (Object.prototype.toString.call(storageObj) === '[object Object]') {
          // 获取当前查询的本地记录时间
          const storageNum = Number(storageObj[name])
          // 非数值
          if (isNaN(storageNum)) return 1
          // 是数值
          else {
            // 存储时间小于现在时间
            // eslint-disable-next-line no-lonely-if
            if (storageNum <= nowTime) return 1
            // 储存时间不合理(本地时间比现在时间后的1.5个小时还大)
            else if (nowTime + onehour * 1.5 <= storageNum) return 1
            // 正常情况(即时间合理)
            else return 0
          }
          // 不为对象直接返回true
        } else return 1
      },
      // 存储时间
      storage: () => {
        // 数据结构为对象进行下一步
        if (Object.prototype.toString.call(storageObj) === '[object Object]') {
          // 修改当前数据时间
          storageObj[name] = nowTime + onehour
          Lib.store.set('allDataRenewTime', storageObj)
        }
        // 不为对象
        else {
          // 重新使用新对象覆盖,放弃旧数据
          const newObj = { [name]: nowTime + onehour }
          Lib.store.set('allDataRenewTime', newObj)
        }
      }
    }
    return eventObj[type]()
  },
  //  获取重大赛事是否大于设定值
  getMajorEventsIsMore(_this) {
    const judNum = 5
    const name = 'ObMajorEventsObj'
    const onehour = 3600000
    const nowTime = new Date().getTime()
    const storageObj = Lib.store.get('allDataRenewTime')
    // meflag: 是否需要更新
    let meflag = 0
    let CopyStorageObj = storageObj
    // 若为对象进行下一步
    if (Object.prototype.toString.call(storageObj) === '[object Object]') {
      // 解构需要的数据
      const { time, DailyImportantMatches } = storageObj[name] || {}
      // 非数值
      if (isNaN(time)) meflag = 1
      // 是数值
      else {
        // 存储时间小于现在时间
        // eslint-disable-next-line no-lonely-if
        if (time <= nowTime) meflag = 1
        // 储存时间不合理(本地时间比现在时间后的1.5个小时还大)
        else if (nowTime + onehour * 1.5 <= time) meflag = 1
        // 正常情况(即时间合理)
        else return DailyImportantMatches > judNum ? 1 : 0
      }
    } else CopyStorageObj = {}
    // 更新
    if (meflag) {
      _this.$axios_api.getImportantMatchesNumber({}).then((res) => {
        const {
          code,
          data: { DailyImportantMatches }
        } = res
        if (code === 0) {
          CopyStorageObj[name] = {
            time: nowTime + onehour,
            DailyImportantMatches
          }
          Lib.store.set('allDataRenewTime', CopyStorageObj)
        }
      })
    }
    return 1
  },
  /**
   * 修改主题色颜色
   * @param {string} name 数据名称
   */
  changeThemeColor(color) {
    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor.setAttribute('content', color)
  },
  // 深拷贝
  deepCopy(data, hash = new WeakMap()) {
    if (typeof data !== 'object' || data === null) return data
    // 判断传入的待拷贝对象的引用是否存在于hash中
    if (hash.has(data)) return hash.get(data)
    const newData = {}
    const dataKeys = Object.keys(data)
    dataKeys.forEach((value) => {
      const currentDataValue = data[value]
      // 基本数据类型的值和函数直接赋值拷贝
      if (typeof currentDataValue !== 'object' || currentDataValue === null) {
        newData[value] = currentDataValue
      } else if (Array.isArray(currentDataValue)) {
        // 实现数组的深拷贝
        // newData[value] = [...currentDataValue]
        const arr = []
        const length = currentDataValue.length
        for (let i = 0; i < length; i++) {
          arr.push(this.deepCopy(currentDataValue[i], hash))
        }
        newData[value] = arr
      } else if (currentDataValue instanceof Set) {
        // 实现set数据的深拷贝
        newData[value] = new Set([...currentDataValue])
      } else if (currentDataValue instanceof Map) {
        // 实现map数据的深拷贝
        newData[value] = new Map([...currentDataValue])
      } else {
        // 将这个待拷贝对象的引用存于hash中
        hash.set(data, data)
        // 普通对象则递归赋值
        newData[value] = this.deepCopy(currentDataValue, hash)
      }
    })
    return newData
  },
  // 判断对象是否是一个纯粹的对象
  isPlainObject(obj) {
    return (
      typeof obj === 'object' &&
      Object.prototype.toString.call(obj) === '[object Object]'
    )
  },
  // 深度合并多个对象的方法
  deepAssign() {
    const len = arguments.length
    let target = arguments[0]
    if (!this.isPlainObject(target)) target = {}
    for (let i = 1; i < len; i++) {
      const source = arguments[i]
      if (this.isPlainObject(source)) {
        for (const s in source) {
          if (s === '__proto__' || target === source[s]) {
            continue
          }
          if (this.isPlainObject(source[s])) {
            target[s] = this.deepAssign(target[s], source[s])
          } else {
            target[s] = source[s]
          }
        }
      }
    }
    return target
  },
  has(object, key) {
    return object != null && Object.prototype.hasOwnProperty.call(object, key)
  },
  // 记录和筛选展示的freebet arr => 传入数组, type => 调用方法
  // type为record时arr为字符串数组, 数组中每项为freebet比赛match_id
  // type为filter时arr为对象数组, 数组中每项为freebet投注所需对象(对象中必须有对应match_id), 具体查看freebet页面或vuex
  recFilFreeBet(type, arr = []) {
    // 获取本地记录数据, 当天时间
    const storageObj = Lib.store.get('recFilFreeBet') || {}
    const nowTime = new Date().toDateString()
    let idarr = []
    // 初始化判断, 数据是否合格, 时间是否为当天
    if (this.isPlainObject(storageObj)) {
      if (storageObj.time === nowTime) idarr = storageObj.idarr
    }
    // 事件对象
    const eventObj = {
      record: () => {
        // 记录 合并去重
        idarr = [...new Set([...idarr, ...arr])]
        Lib.store.set('recFilFreeBet', { time: nowTime, idarr })
      },
      filter: () => {
        // 筛选
        Lib.store.set('recFilFreeBet', { time: nowTime, idarr })
        if (!idarr.length) return arr.slice(0, 5) // 无记录直接返回5个
        const oldarr = [] // 筛选有无记录数组
        let farr = arr.filter((a) => {
          const aflag = idarr.includes(a.match_id)
          if (aflag) oldarr.push(a)
          return !aflag
        })
        const len = farr.length // 大于5场则截取, 小于5场则补充
        if (len < 5) farr = [...farr, ...oldarr.slice(0, 5 - len)]
        else if (len > 5) farr = farr.slice(0, 5)
        return farr
      }
    }
    return eventObj[type]()
  },
  windowObjectReference: null,
  openRequestedTab(url, windowName) {
    if (
      this.windowObjectReference === null ||
      this.windowObjectReference.closed
    ) {
      this.windowObjectReference = window.open(url, windowName, 'popup')
    } else {
      this.windowObjectReference.focus()
    }
  }
}

// 服务端不执行代码
if (typeof window !== 'undefined') {
  window.common = Rxports
}
export default Rxports
