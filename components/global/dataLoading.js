import dataLoading from './dataLoading.vue'

const loading = {
  install: function (Vue) {
    Vue.component('DataLoading', dataLoading)
  }
}

export default loading
