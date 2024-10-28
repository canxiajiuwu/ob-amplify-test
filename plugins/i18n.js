import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: `${store.state.root.locale}_${store.state.root.country}`,
    fallbackLocale: 'fr',
    messages: {
      // en_ug: require('@/assets/languages/ug/en.js'),
      en_cm: require('@/assets/languages/cm/en.js'),
      fr_cm: require('@/assets/languages/cm/fr.js')
    }
  })
}
