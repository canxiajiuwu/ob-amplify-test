import dataError from './dataError.vue'

const loading = {
  install: function (Vue) {
    Vue.component('DataError', dataError)
  }
}

export default loading
