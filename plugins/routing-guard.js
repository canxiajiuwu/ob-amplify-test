/* eslint-disable no-unused-vars */
export default (context) => {
  const { app, store } = context
  const hWin = typeof window !== 'undefined' // window存在为客户端
  // 获取原型对象上的方法
  const originalPush = app.router.push
  const originalReplace = app.router.replace
  const originGo = app.router.go
  const originBack = app.router.back
  // 全局路由后置守卫需要数据
  let beforRouterType = ''
  let beforRouterNumber = 0

  // 修改原型对象中的push方法
  app.router.push = function (location, onComplete, onAbort) {
    beforRouterType = 'push'
    return originalPush.call(this, location, onComplete, onAbort)
  }
  // 修改原型对象中的replace方法
  app.router.replace = function (location, onComplete, onAbort) {
    beforRouterType = 'replace'
    return originalReplace.call(this, location, onComplete, onAbort)
  }
  // 修改原型对象中的go方法
  app.router.go = function (location, onComplete, onAbort) {
    beforRouterType = 'go'
    beforRouterNumber = location
    return originGo.call(this, location, onComplete, onAbort)
  }
  // 修改原型对象中的back方法
  app.router.back = function (location, onComplete, onAbort) {
    beforRouterType = 'back'
    return originBack.call(this, location, onComplete, onAbort)
  }
  // app已构建页面
  const routeNameArr = [
    'index',
    'lang',
    'lang-live-sportName',
    'lang-betslip',
    'lang-mybet',
    'lang-account',
    'lang-match-matchId',
    'lang-login',
    'lang-register'
  ]
  // 全局前置守卫
  app.router.beforeEach((to, from, next) => {
    const winApp = window.appInteraction
    const locale = vm.store.state.root.locale
    // 将用户语言设置到cookies
    if (locale) app.$cookies.set('languages', locale, { path: '/' })
    // 新版app符合页面
    if (winApp?.type === 3 && Lib.store.get('isNewApp')) {
      // mybet与account页面删除返回方法, 其他页面注入方法
      if (['lang-mybet', 'lang-account'].includes(to.name))
        window.APP.setOnKeyPressedFunction('')
      else winApp.setOnKeyPressedFunction()
      // 配置
      const appUrl = Lib.outUrl.onebetAppCmUrl
      let routeN = ''
      const queryObj = { ...to.query }
      // 链接有notJump传参则不处理
      if (queryObj.notJump) return next()
      // 前往页面符合要求
      if (routeNameArr.includes(to.name)) {
        // 参数处理
        const routeObj = {
          index: () => {
            routeN = '/main'
            queryObj.scheme = 'home'
          },
          lang: () => {
            routeN = '/main'
            queryObj.scheme = 'home'
          },
          'lang-live-sportName': () => {
            routeN = '/main'
            queryObj.scheme = 'live'
          },
          'lang-betslip': () => {
            routeN = '/main'
            queryObj.scheme = 'betslip'
          },
          'lang-mybet': () => {
            routeN = '/main'
            queryObj.scheme = 'myBet'
          },
          'lang-account': () => {
            routeN = '/main'
            queryObj.scheme = 'account'
          },
          'lang-match-matchId': () => {
            routeN = '/match'
            queryObj.match_Id = to.params.matchId
          },
          'lang-login': () => {
            routeN = '/login'
            queryObj.index = 1
          },
          'lang-register': () => {
            routeN = '/login'
            queryObj.index = 0
          }
        }
        if (routeObj[to.name]) routeObj[to.name]()
        // 匹配成功
        if (routeN) return winApp.adjustRouting(appUrl + routeN, queryObj)
      }
      if (['lang-crashGame', 'lang-KickersX'].includes(to.name)) {
        const queryStr = (to.fullPath.includes('?') ? '&' : '?') + 'notJump=1'
        return winApp.openPage({
          page: window.location.origin + to.fullPath + queryStr,
          type: 1
        })
      }
      // 离开页面符合要求
      if (['lang-mybet', 'lang-account'].includes(from.name))
        return winApp.openDetail({
          loadUrl: window.location.origin + to.fullPath,
          showHomeAsUp: false
        })
    }
    // 判断sofascore广告渠道 存入页面临时缓存 强更新 覆盖旧数据
    if (to.name?.includes('ad-')) {
      const code = to.name.split('-')[1]
      sessionStorage.setItem('sesChannel', code)
    }
    next()
  })
  if (hWin) {
    // 跳转页面时取消未结束的请求
    app.router.beforeEach((to, from, next) => {
      try {
        const reqObj = store.state.pathCancelReq[from.name]
        if (reqObj) {
          for (const key in reqObj) reqObj[key]('page change, hand cancel')
        }
      } catch (e) {}
      next()
    })
  }
  //  全局后置守卫
  app.router.afterEach((to) => {
    app.$seo_init(context)
    // app记录路由进度
    const winApp = window.appInteraction
    if (winApp?.type === 3 && Lib.store.get('isNewApp') !== undefined) {
      let routerLen = Number(sessionStorage.getItem('routerLen'))
      if (isNaN(routerLen) || routerLen < 1) routerLen = 1
      // 根据重构后的方法调整路由进度
      const nextObj = {
        push: () => {
          routerLen = history.length
        },
        replace: () => {
          routerLen = history.length
        },
        go: () => {
          routerLen += beforRouterNumber
        },
        back: () => {
          routerLen--
        }
      }
      if (nextObj[beforRouterType]) nextObj[beforRouterType]()
      // 防止突发情况
      if (routerLen < 1) routerLen = 1
      sessionStorage.setItem('routerLen', routerLen)
    }
    if (to?.name) Lib.store.set('previousRoute', to.name)
    // 首次进入事件统计
    const obj = Lib.store.get('eventBurial')
    const { firstOpen } = obj || {}
    if (!firstOpen) {
      if (winApp?.type === 1)
        Lib.common.event_statistics('first_open_web', `User_from:${to.path}`)
      else Lib.common.event_statistics('first_open')
      Lib.store.set('eventBurial', { ...obj, firstOpen: true })
    }
  })
}
