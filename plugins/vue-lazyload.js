import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import defaultLogo from '@/assets/images/general/notSprites/logo/default-logo.png'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: defaultLogo,
  error: defaultLogo,
  throttleWait: 20000,
  dispatchEvent: false, // lazyload 插件默认会阻塞图片元素的 onload 等事件,若要打开,只需在配置中将当前项设为 true
  observer: true, // 当指定元素进入页面时,自动触发函数
  observerOptions: {
    rootMargin: '0px', // 表示元素的扩展范围
    threshold: 0.1 // 0.1 表示元素显示 10% 的高度时,触发当前元素显示函数
  },
  filter: {
    webp(listener, options) {
      if (!options.supportWebp) return
      const isCDN = 'https://d164xwyrrsm78k.cloudfront.net/onebet/'
      if (listener.src && listener.src.includes(isCDN)) {
        listener.src += `?f=webp${
          listener.el.dataset.size ? '&d=' + listener.el.dataset.size : ''
        }`
      }
    }
  }
})
