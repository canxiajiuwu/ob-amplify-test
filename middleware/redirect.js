// 重定向查询
const redirectFn = (str) => {
  if (['app', 'download'].includes(str)) return 'download'
  if (['jackpot'].includes(str)) return 'jackpotEntrance'
  if (['kickersx', 'kicker'].includes(str)) return 'KickersX'
  if (['virtual', 'onebetleague'].includes(str)) return 'onebetLeague'
  if (['freebet'].includes(str)) return 'freebet'
  if (['crash', 'onebetcrash'].includes(str)) return 'crashGame'
  if (['football'].includes(str)) return 'sports/Football'
  if (['basketball'].includes(str)) return 'sports/Basketball'
  if (['rugby'].includes(str)) return 'sports/Rugby'
  if (['tennis'].includes(str)) return 'sports/Tennis'
  if (['cricket'].includes(str)) return 'sports/Cricket'
  if (['volleyball'].includes(str)) return 'sports/Volleyball'
  if (['promotion'].includes(str)) return 'promotions'
  if (['popularbets', 'popular%20bets'].includes(str)) return 'popular'
  if (['about'].includes(str)) return 'aboutUs'
}
// 重定向判断 参数↓
// rstr => 重定向后地址, 没有则为undefined
// redirect => 重定向方法
// rObj => 需要传入重定向方法的传参
const redirectJump = ({ rstr, redirect, rObj, error }) =>
  rstr ? redirect(rObj) : error({ statusCode: 404 })

export default function ({ isHMR, store, route, redirect, error }) {
  if (isHMR) return // 热更新不执行
  const { fullPath, matched, query } = route // 解构route中需要的参数(全路径, 路由匹配数组, query传参)
  const {
    root: { locale }
  } = store.state // 解构vuex中需要的参数(语言)
  const onlyLink = fullPath.split('?')[0].split('/') // 分割全路径, 只获取路径参数(route.path会把动态参数修改为动态文件名)
  if (onlyLink[1] === 's') {
    onlyLink.splice(1, 0)
  }
  const lastLink = String(onlyLink[onlyLink.length - 1]).toLowerCase() // 路径最后一个/后的参数
  const ml = matched.length // 路由匹配层级数(无路由匹配时为0)
  const rstr = redirectFn(lastLink) // 获取重定向路径
  const rObj = { path: `/${locale}/${rstr}`, query } // 重定向传参
  // 判断是否第一层参数是否正确
  if (['', 'en', 'fr', 'sofascore-ad'].includes(onlyLink[1])) {
    // 未找到匹配路由
    if (!ml) redirectJump({ rstr, redirect, rObj, error })
    // 找到匹配路由则不处理
  } else redirectJump({ rstr, redirect, rObj, error })
}
