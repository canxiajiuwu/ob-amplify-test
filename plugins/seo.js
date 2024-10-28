import { TDK } from '@/assets/js/seo_config.js'
import common from '@/assets/js/common.js'
// import { EXTERNAL } from '@/assets/js/head_third_party'

export default (context, inject) => {
  // 页面seo数据init
  seo_init(context)
  inject('seo_init', seo_init)
  // 个性化数据插值
  inject('seo_interpolation', seo_interpolation)
  // 分享meta插入
  inject('seo_meta_inject', seo_meta_inject)
}

// 页面seo数据init
const seo_init = ({ req, route, app, store, params }, seo_name, data) => {
  // 获取浏览器语言
  const raw = req?.rawHeaders
  let reqLang
  if (raw) {
    const AcceptLanguage =
      raw[raw.findIndex((item) => item === 'Accept-Language') + 1]
    if (AcceptLanguage?.includes('fr')) {
      reqLang = 'fr'
    } else if (AcceptLanguage?.includes('en')) {
      reqLang = 'en'
    }
  }

  // 获取路由参数语言
  let routeLang = route.params.lang

  // 获取用户本地储存的语言
  const cookiesLang = app.$cookies.get('languages')

  if (!store.state.locales.includes(routeLang)) {
    routeLang = undefined
  }

  const lang = routeLang || cookiesLang || reqLang || 'fr' // 语言
  store.commit('setRoot', {
    ...store.state.root,
    locale: lang
  })

  const name = seo_name || route.name // 路由名

  const country = 'cm' // 国家
  let TDKData
  if (!TDKData) TDKData = common.deepCopy(TDK[name] || TDK.common)
  const TDK_path = TDKData ? TDKData[`${country}_${lang}`] : {}

  // 个性化插值
  let OPTIONS = data
  if (name === 'lang-sports-sportName') {
    const sportName = params.sportName
    OPTIONS = {
      title: { sportName },
      description: { sportName },
      keywords: { sportName }
    }
  } else if (name === 'lang-sports-sportName-countryName') {
    const countryName = params.countryName
    OPTIONS = {
      title: { country: countryName },
      description: { country: countryName }
    }
  } else if (name === 'lang-sports-sportName-countryName-leagueId-leagueName') {
    const countryName = params.countryName
    const leagueName = params.leagueName
    OPTIONS = {
      title: { country: countryName },
      description: { leagueName, country: countryName }
    }
  } else if (name === 'lang-sports-matchId') {
    return
  }
  seo_interpolation({ store, TDK_path, OPTIONS })
}

// 个性化数据插值
const seo_interpolation = ({ store, TDK_path, OPTIONS }) => {
  // head信息插入个性化值
  const Title = TDK_path.title
  if (common.has(OPTIONS, 'title')) {
    try {
      if (Object.prototype.toString.call(Title) === '[object Function]') {
        TDK_path.title = Title(OPTIONS.title)
      }
    } catch (err) {
      console.log(err)
    }
  }
  // meta信息插入个性化值
  TDK_path.meta.forEach((item) => {
    if (common.has(OPTIONS, item.hid)) {
      try {
        if (
          Object.prototype.toString.call(item.content) === '[object Function]'
        ) {
          item.content = item.content(OPTIONS[item.hid])
        }
      } catch (err) {
        console.log(err)
      }
    }
  })
  // 设置到store
  store.commit('setSeoHead', TDK_path)
}

// 分享meta插入
const seo_meta_inject = ({ app, obj, type }) => {
  return Promise.resolve(() => {
    app.head[type].push(obj)
  })
}

// client 路由跳转，切换seo文本内容
// const seo_client = () => {}
