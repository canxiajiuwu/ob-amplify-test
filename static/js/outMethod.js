;(function (win) {
  win.GameToHall = {
    //  game back  0 normal , 1 Guest , 2 kickerX
    gameClose(type, number) {
      console.log('gameClose', number)
      const winApp = window.appInteraction
      setTimeout(() => {
        if (type === 2) {
          if (winApp.type === 3 && localStorage.getItem('isNewApp') === 'true')
            this.appBackStep()
          // else vm.app.router.back()
        }
        // hall index.vue
        document.getElementById('gameEvent').click()
        if (type === 1) vm.store.commit('setGuest', false)
      }, 100)
      vm.store.commit('setPlayGamesTimes', number)
    },
    // // go to page
    // comeWebPage(string) {
    //   console.log(`comeWebPage:${string}`)
    //   window.document.getElementById('gameEvent').click()
    //   setTimeout(
    //     () => vm.app.router.push('/' + vm.store.state.root.locale + string),
    //     100
    //   )
    // },
    // progress
    getProgress(int) {
      console.log('getProgress')
      vm.store.commit('setProgress', int)
    },
    // game onload
    gameOnload() {
      console.log('gameOnload')
      vm.store.commit('setGameOnload', true)
    },
    // Message pop-up
    openModal(string) {
      console.log('openModal')
      vm.store.commit('Modal', {
        event: '',
        type: '',
        title: '',
        message: string || 'something went wrong',
        solidButton: 'OK',
        borderButton: ''
      })
    },
    // openPage
    openPage(page, isCloseGame) {
      console.log('openPage:', page)
      const urlObj = { login: 1, deposit: 1 }
      const baseu = '/' + vm.store.state.root.locale
      let url = String(page)
      if (urlObj[page]) url = '/' + url
      if (isCloseGame) {
        window.document.getElementById('gameEvent').click()
        if (url.indexOf('http') === 0)
          return url.includes(window.location.origin)
            ? (window.location.href = url)
            : window.open(url)
        setTimeout(() => {
          const flagArr = [
            url.includes('/login'),
            url.includes('from=') || url.includes('fromName=')
          ]
          flagArr.includes(false)
            ? vm.app.router.push(baseu + url)
            : vm.app.router.replace(baseu + url)
        }, 100)
      } else {
        vm.store.commit(
          'setPageIframeUrl',
          (String(url).indexOf('http') === 0 ? url : baseu + url) +
            '?isPageIframe=true'
        )
        vm.store.commit('setPageIframeShow', true)
      }
    },
    // google analysis
    ga(action, target) {
      console.log(action, target)
      try {
        const newString = action.replace('-', '_')
        gtag('event', newString, {
          event_category: vm.store.state.root.locale,
          event_label: target || undefined
        })
        // ga('send', 'event', vm.store.state.root.locale, action, target );
        if (APP) {
          APP.reportFbEmpEvent(
            JSON.stringify({ eventName: action, eventValue: target })
          )
        }
      } catch (err) {
        console.log(err)
      }
    },
    //
    openWebPageWithoutLeaveGame(string) {
      console.log('openWebPageWithoutLeaveGame')
      vm.store.commit('setPageIframeUrl', string + '?isPageIframe=true')
      vm.store.commit('setPageIframeShow', true)
    },
    // when close game http
    outGameHttp(roomId) {
      vm.store.commit('setRoomId', roomId)
      // app.vue
      window.document.getElementById('outGameModal').click()
    },
    // new app Function Revise
    // app back
    appBackStep(key) {
      console.log(key, '>>>>>>app back step')
      if (
        Object.prototype.toString.call(window.onebetFramesCallBack) ===
          '[object Object]' &&
        typeof window.onebetFramesCallBack.appBackStep === 'function'
      )
        return window.onebetFramesCallBack.appBackStep()

      if (key === 4) {
        if (vm.route.name === 'lang' || vm.route.name === 'index') {
          if (vm.store.state.exit_time === 0) {
            window.APP.toast('Press again to exit.', 0)
            vm.store.commit('setExitTime', 1)
            setTimeout(() => vm.store.commit('setExitTime', 0), 2000)
          } else window.APP.exitApp()
        } else vm.app.router.back()
        return
      }

      const routerLen = sessionStorage.getItem('routerLen') || 1
      const isNewApp = win.appInteraction.isNewApp()
      if (routerLen <= 2 && isNewApp) window.APP.closeTopActivity()
      else vm.app.router.back()
    },
    // new app Function add
    // user status change
    userStatusChange(token) {
      // 两边都没有token,且vuex中也没有用户信息则不处理,防止死循环
      if (!token && !Lib.store.get('token') && !vm.store.state.accountInfo)
        return
      // 是否刷新
      let refresh = 0
      // 没有token,代表用户退出登录或token过期
      if (!token) {
        Lib.store.remove('token')
        refresh = 1
      }
      // token不一致,代表用户已使用新的token
      if (
        token &&
        (Lib.common.encrypt(token) !== Lib.store.get('token') ||
          !vm.store.state.accountInfo)
      ) {
        Lib.store.set('token', Lib.common.encrypt(token))
        refresh = 1
      }
      if (refresh) vm.app.router.go(0)
    },
    // The app notifies web users of data changes
    updateSelectOutcome(data) {
      vm.store.state.ticketsDataIsAppReturn = 1
      vm.store.commit('setTickets', JSON.parse(data))
    },
    // user bet after data change
    updateUserBetData() {
      const dom = document.getElementsByClassName('appUpdateUserBetData')[0]
      if (dom) dom.click()
    },
    // user funds data change
    updateUserFundsData() {
      const dom = document.getElementsByClassName('OBgetUserInfo')[0]
      if (dom) dom.click()
    }
  }

  win.appInteraction = (() => {
    if (win.APP) {
      // app for complete
      return {
        type: 3,
        openApp(app, name, url, string) {
          APP.openApp(app, name, url, string)
        },
        showGame(url) {
          APP.showGame(url)
        },
        getIMEI() {
          console.log(APP.getIMEI())
          return APP.getIMEI()
        },
        showBadger(int) {
          APP.showBadger(int)
        },
        exitApp() {
          APP.exitApp()
        },
        getMetaData() {
          return APP.getMetaData ? 'gm_' + APP.getMetaData('MTA_CHANNEL') : ''
        },
        reportFbEmpEvent(eventName, eventValue) {
          APP.reportFbEmpEvent(JSON.stringify({ eventName, eventValue }))
        },
        // 1.facebook 2. whatsapp 3.instagram 4.sms 5.twitter
        share(index, shareUrl, value) {
          APP.share(index, shareUrl, value)
        },
        openBrowser(url) {
          APP.openBrowser(url)
        },
        downloadFile(url, title, detail) {
          APP.downloadFile(url, title, detail)
        },
        // close app start loading
        closeStartDialog() {
          APP.closeStartDialog()
        },
        changeLanguage(string) {
          APP.changeLanguage(string)
        },
        defaultLanguage() {
          return APP.defaultLanguage()
        },
        // Injection method when the user slides right to go back
        setOnKeyPressedFunction() {
          if (typeof window.APP.isNewApp === 'function')
            APP.setOnKeyPressedFunction('window.GameToHall.appBackStep()')
          else APP.setOnKeyPressedFunction('GameToHall.appBackStep')
        },
        // new app Function add
        // Is it a new app
        isNewApp() {
          if (typeof window.APP.isNewApp === 'function')
            return window.APP.isNewApp()
          else return undefined
        },
        // get user token
        getUserToken() {
          return APP.getUserToken()
        },
        // Login status
        renewuserLogin(str, status) {
          APP.renewuserLogin(str, status)
        },
        // app go Routing
        adjustRouting(url, parameter) {
          let urlStr = url
          if (parameter) {
            urlStr += '?'
            for (const i in parameter) urlStr += `${i}=${parameter[i]}&`
          }
          APP.adjustRouting(urlStr)
        },
        // openDetail
        openDetail(obj) {
          APP.openDetail(JSON.stringify(obj))
        },
        // close current page
        closeTopActivity() {
          APP.closeTopActivity()
        },
        // Notify app user data changes
        updateSelectOutcome(data) {
          APP.updateSelectOutcome(JSON.stringify(data))
        },
        // get user data
        getUserSelectOutcome() {
          return JSON.parse(APP.getUserSelectOutcome())
        },
        // game on load
        gameOnload() {
          APP.gameOnload()
        },
        // open page
        // page (string) isCloseGame (bool) fromUrl(String) cancelUrl(String) isHorizontalScreen(Bool) type(Int)
        openPage(obj) {
          APP.openPage(JSON.stringify(obj))
        },
        // user funds Change
        fundsChange() {
          APP.fundsChange()
        },
        // get Safe Area Top
        getSafeAreaTop() {
          if (typeof window.APP.getSafeAreaTop === 'function')
            return window.APP.getSafeAreaTop()
          else return 0
        }
      }
    }
    // web
    else return { type: 1 }
  })()
})(window)
