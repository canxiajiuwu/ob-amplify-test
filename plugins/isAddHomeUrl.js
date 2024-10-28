// 不需要添加首页的路由名
const noAddHomeArr = [
  'index',
  'lang',
  'lang-live-sportName',
  'lang-betslip',
  'lang-mybet',
  'lang-account'
]
// 初始化判断是否需要添加首页
export default () => {
  const fn = () => {
    // web端
    if (window.appInteraction.type === 1) {
      // 符合条件: 未初始化, 第一次页面不符合条件
      if (!noAddHomeArr.includes(vm.route.name)) {
        const { href, origin } = location
        history.replaceState(null, '', origin)
        history.pushState(null, '', href)
      }
    }
  }
  const oldFn = window.onload
  window.onload = () => {
    if (typeof oldFn === 'function') oldFn()
    fn()
  }
}
