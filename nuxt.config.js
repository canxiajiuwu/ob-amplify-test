/* eslint-disable no-useless-escape */
// 引入环境配置
import { defineNuxtConfig } from '@nuxt/bridge'
import env from './env'
// import { routes } from './static/js/sitemap.js'
// // eslint-disable-next-line nuxt/no-cjs-in-config
// const CopyPlugin = require('copy-webpack-plugin')
// // eslint-disable-next-line nuxt/no-cjs-in-config
// const MangleCssClassPluginC = require('./plugins/mangle-css-class-plugin-c/index.js')

// env环境变量
const ENV = env[process.env.NODE_ENV]

export default defineNuxtConfig({
  bridge: {
    nitro: true
  },
  vue: {
    config: {
      // 开不开启devtools
      devtools: ENV.NODE_ENV !== 'production'
    }
  },
  // 环境变量
  env: ENV,
  loading: '~/components/components/pageLoading.vue',
  // 关闭生成map文件
  productionSourceMap: ENV.NODE_ENV !== 'production',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt2-onebet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: 'shortcut icon',
        href: 'https://static-sport.onebet.cm/ssr-static/favicon.ico'
      },
      { rel: 'dns-prefetch', href: 'https://cdn-api.onebet.cm' },
      { rel: 'dns-prefetch', href: 'https://static-sport.onebet.cm' },
      { rel: 'dns-prefetch', href: 'https://d2m6jvlii5xwqv.cloudfront.net' }
    ],
    script: [
      // {
      //   src: '/js/fix.js'
      // },
      {
        src: '/js/outMethod.js?v=2',
        defer: true
      },
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-5QJTYT6ZDZ',
        defer: true
      },
      {
        src: '/js/head/gtagInit.js',
        defer: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['./assets/css/common.less', './assets/css/index.less'],
  serverMiddleware:
    ENV.NODE_ENV !== 'development' ? ['./serverMiddleware/LruCache'] : [],
  router: {
    middleware: ['i18n', 'redirect'],
    extendRoutes(routes, resolve) {
      // sofascore 广告页跳转到指定页面
      const registerFreebet = routes.find(
        (route) => route.name === 'lang-registerFreebet'
      )
      const firstDeposit = routes.find(
        (route) => route.name === 'lang-firstDeposit'
      )
      const index = routes.find((route) => route.name === 'index')

      routes.push(
        Object.assign({}, index, {
          name: 'ad-4201',
          path: '/sofascore-ad/app320x50'
        })
      )
      routes.push(
        Object.assign({}, index, {
          name: 'ad-4202',
          path: '/sofascore-ad/app320x480'
        })
      )
      routes.push(
        Object.assign({}, index, {
          name: 'ad-4203',
          path: '/sofascore-ad/web320x50'
        })
      )
      routes.push(
        Object.assign({}, registerFreebet, {
          name: 'ad-4204',
          path: '/sofascore-ad/web300x250'
        })
      )
      routes.push(
        Object.assign({}, index, {
          name: 'ad-4205',
          path: '/sofascore-ad/web300x600'
        })
      )
      routes.push(
        Object.assign({}, firstDeposit, {
          name: 'ad-4206',
          path: '/sofascore-ad/web728x90'
        })
      )
      routes.push(
        Object.assign({}, index, {
          name: 'ad-4207',
          path: '/sofascore-ad/web-gift'
        })
      )
      routes.push(
        Object.assign({}, index, {
          name: 'ad-4208',
          path: '/sofascore-ad/app-odds'
        })
      )
      routes.push(
        Object.assign({}, index, {
          name: 'ad-4209',
          path: '/sofascore-ad/web-odds'
        })
      )
      // 几个同为首页的路由公用同一个pages
      routes.push(Object.assign({}, index, { name: 'lang', path: '/:lang' }))
      routes.push(
        Object.assign({}, index, { name: 'lang-refer', path: '/:lang/refer' })
      )
      routes.push(
        Object.assign({}, index, {
          name: 'lang-top-league',
          path: '/:lang/top-league'
        })
      )
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/routing-guard', mode: 'client' },
    '@/plugins/i18n.js', // 国际化适配
    '@/plugins/vant.js', // 加载全局组件
    { src: '@/plugins/seo' }, // 全局seo配置
    { src: '@/plugins/lottiePlayer', mode: 'client' },
    { src: '@/plugins/axios' },
    { src: '@/plugins/vue-lazyload', mode: 'client', ssr: false },
    { src: '@/plugins/vm', mode: 'client' }, // 客户端绑定全局变量
    { src: '@/plugins/prefetchRoute', mode: 'client' }, // js 手动预加载路由
    { src: '@/plugins/directive-bgImg.js' }, // 自定义指令，背景图处理
    { src: '@/plugins/isAddHomeUrl', mode: 'client' } // 客户端判断是否添加首页
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxtjs/sitemap',
    // 添加设置scss变量的插件
    '@nuxtjs/style-resources',
    // // https://go.nuxtjs.dev/axios
    // '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // 获取cookie
    'cookie-universal-nuxt'
    // nuxt/image 插件
    // '@nuxt/image'
  ],

  pageTransition: {
    mode: 'out-in'
  },

  // sitemap: {
  //   hostname: 'https://www.onebet.cm/', // 你的具体的网址
  //   path: '/sitemap.xml',
  //   cacheTime: 24 * 60 * 60 * 1000,
  //   // gzip: true,
  //   defaults: {
  //     changefreq: 'daily',
  //     priority: 1,
  //     lastmod: new Date()
  //   },
  //   routes
  // },

  // 手动配置@nuxtjs/style-resources
  styleResources: {
    less: [
      // 在这里不能使用路径别名 ～ 和 @
      './assets/css/mainStyle.less',
      './assets/images/general/sprites/*.less'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: ''
    // proxy: true // Can be also an object with default options
  },

  // proxy: {
  //   '/userProxy/': {
  //     target:
  //       ENV.NODE_ENV === 'production'
  //         ? 'https://cdn-api.onebet.cm/user/'
  //         : 'https://staging-api-cm.onebet.ug/user/',
  //     pathRewrite: { '^/userProxy/': '' }
  //   },
  //   '/sportsProxy/': {
  //     target:
  //       ENV.NODE_ENV === 'production'
  //         ? 'https://cdn-api.onebet.cm/sports/'
  //         : 'https://staging-api-cm.onebet.ug/sports/',
  //     pathRewrite: { '^/sportsProxy/': '' }
  //   },
  //   '/virtualProxy/': {
  //     target:
  //       ENV.NODE_ENV === 'production'
  //         ? 'https://cdn-api.onebet.cm/virtual_cash/'
  //         : 'https://staging-api-cm.onebet.ug/virtual/',
  //     pathRewrite: { '^/virtualProxy/': '' }
  //   },
  //   '/onegameProxy/': {
  //     target:
  //       ENV.NODE_ENV === 'production'
  //         ? 'https://cdn-api.onebet.cm/onegame/'
  //         : 'https://staging-api-cm.onebet.ug/onegame/',
  //     pathRewrite: { '^/onegameProxy/': '' }
  //   }
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'OneBet',
      short_name: 'OneBet',
      description: 'Enjoy The Best Live Betting Experience',
      background_color: '#fff',
      orientation: 'portrait',
      display: 'standalone',
      theme_color: '#4C50FA'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // 启用缓存 terser-webpack-plugin 和 cache-loader
    cache: ENV.NODE_ENV !== 'development',
    hardSource: ENV.NODE_ENV !== 'development',
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true
      }
    },
    optimization: {
      minimize: true
      // splitChunks: {
      // chunks: 'all',
      // automaticNameDelimiter: '-',
      // maxSize: 307200 // 生成 chunk 的最大体积（以 bytes 为单位）
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10, // 优先级
      //     reuseExistingChunk: true
      //   },
      //   common: {
      //     minChunks: 1,
      //     priority: -20, // 优先级
      //     reuseExistingChunk: true
      //   }
      // }
      // }
    },
    publicPath: '',
    // ENV.NODE_ENV === 'production'
    //   ? 'https://static-sport.onebet.cm/ssr-static/'
    //   : 'https://static-sport.onebet.cm/ssr-static-staging/',
    // 提取css
    // extends(config, { isDev }) {
    //   if (!isDev) {
    //     config.extractCSS = true
    //   }
    // },
    // extractCSS: true,
    plugins: [
      // ENV.NODE_ENV !== 'development'
      //   ? new CopyPlugin(
      //       [
      //         {
      //           from: 'static',
      //           to: ''
      //         }
      //       ],
      //       { debug: 'info' }
      //     )
      //   : () => {},
      // ENV.NODE_ENV !== 'development'
      //   ? new MangleCssClassPluginC({
      //       classNameRegExp: 'cl-[a-zA-Z0-9_-]*',
      //       mangleCssVariables: true,
      //       log: false
      //     })
      //   : () => {}
    ]
  },

  render: {
    static: {
      maxAge: '10d'
    }
    //  server 端自定义指令
    //   bundleRenderer: {
    //     directives: {
    //     }
    //   }
  }
})
