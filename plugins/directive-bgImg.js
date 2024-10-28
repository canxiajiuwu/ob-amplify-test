import Vue from 'vue'

export default () => {
  Vue.directive('bgImg', {
    bind: (el, binding) => {
      const bgUrl = window
        .getComputedStyle(el)
        .getPropertyValue('background-image')
      if (bgUrl === 'none') {
        el.style.backgroundImage = `url(${binding.value})`
        el.style.backgroundSize = `cover`
      }
    }
  })

  Vue.directive('sharp', {
    bind: (el) => {
      const format = el.dataset.format
      const size = el.dataset.size
      let src = el.getAttribute('src')
      if (
        document
          .createElement('canvas')
          .toDataURL('image/webp')
          .indexOf('data:image/webp') === 0
      ) {
        const isCDN = 'https://d164xwyrrsm78k.cloudfront.net/onebet/'
        if (src?.includes(isCDN)) {
          // 判断是否支持webp
          el.setAttribute(
            'src',
            (src += `?f=${format}${size ? '&d=' + size : ''}`)
          )
        }
      }
    }
  })
}
