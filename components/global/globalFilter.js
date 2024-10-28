import globalFilter from './globalFilter.vue'

const loading = {
  install: function (Vue) {
    Vue.component('GlobalFilter', globalFilter)
  }
}

export default loading
