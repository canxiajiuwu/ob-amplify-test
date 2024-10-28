import Lib from '@/assets/js/Lib'

export const casinoMixins = {
  computed: {
    isGuest() {
      return this.$store.state.isGuest
    }
  },
  mounted() {
    setTimeout(() => {
      const loginToOpenGame = Number(sessionStorage.getItem('loginToOpenGame'))
      if (!isNaN(loginToOpenGame) && loginToOpenGame !== 0) {
        Lib.common.openGameConfig(this, loginToOpenGame, this.isGuest)
        this.openGame()
      }
    }, 300)
  },
  activated() {
    setTimeout(() => {
      const loginToOpenGame = Number(sessionStorage.getItem('loginToOpenGame'))
      if (!isNaN(loginToOpenGame) && loginToOpenGame !== 0) {
        Lib.common.openGameConfig(this, loginToOpenGame, this.isGuest)
        this.openGame()
      }
    }, 300)
  }
}
