import cardPacks from './cardPacks.vue'

const loading = {
  install: function (Vue) {
    Vue.component('CardPacks', cardPacks)
  }
}

export default loading
