import commonReminder from './commonReminder.vue'

const loading = {
  install: function (Vue) {
    Vue.component('CommonReminder', commonReminder)
  }
}

export default loading
