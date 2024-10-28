import drawer from './drawer.vue'

const loading = {
  install: function (Vue) {
    Vue.component('Drawer', drawer)
  }
}

export default loading
