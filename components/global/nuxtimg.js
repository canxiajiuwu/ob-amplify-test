import nuxtimg from './nuxtimg.vue'

const loading = {
  install: function (Vue) {
    Vue.component('Nuxtimg', nuxtimg)
  }
}

export default loading
