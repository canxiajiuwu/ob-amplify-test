;(function (win) {
  const Client = function (options) {
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

    // var heartbeatInterval;

    function connect() {
      const ws = new WebSocket(self.options.url)
      self.ws = ws
      let auth = false
      ws.onopen = function () {
        getInt()
      }
      ws.onerror = function (e) {
        console.log('error:' + e)
      }
      ws.onmessage = function (evt) {
        // com.gamemania.main.manager.AppManager.log(evt.data);
        const receives = JSON.parse(evt.data)

        if (receives.type == 2021) {
          auth = true
          // heartbeat();
          // heartbeatInterval = setInterval(heartbeat, 4 * 60 * 1000);
        }
        if (!auth) {
          setTimeout(getInt, delay)
        }

        const notify = self.options.notify
        if (notify) notify(receives)
      }

      ws.onclose = function () {
        // if (heartbeatInterval) clearInterval(heartbeatInterval);
        setTimeout(reConnect, delay)
      }

      // function heartbeat() {
      //     ws.send(JSON.stringify({
      //         'ver': 1,
      //         'op': 2,
      //         'seq': 2,
      //         'body': {}
      //     }));
      // }

      function getInt() {
        ws.send(JSON.stringify(self.options.auth))
      }

      // function getAuth() {
      //     ws.send(JSON.stringify({
      //         'ver': 1,
      //         'op': 7,
      //         'seq': 1,
      //         'body': self.options.auth
      //     }));
      // }
    }

    function reConnect() {
      if (self.alive) self.createConnect(--max, delay * 2)
    }
  }

  win.MyClient = Client
})(typeof window !== 'undefined' ? window : global)

export default MyClient
