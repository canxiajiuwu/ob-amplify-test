<template>
  <div class="cl-iframeBox">
    <iframe
      :src="iframeUrl"
      frameborder="0"
      id="gameIframe"
      @click="close"
      width="100%"
      height="100%"
    ></iframe>
    <!--<loading v-if="isLoadingShow"></loading>-->
    <!--<div id="loading" @click="isLoadingShow = false"></div>-->
    <gameProgress
      @closeLoading="closeLoading"
      v-if="isLoadingShow"
      :is-football-game="isFootballGame"
    />
  </div>
</template>

<script>
import gameProgress from './progress.vue'
import Lib from '@/assets/js/Lib'

export default {
  name: '',
  components: { gameProgress },
  props: ['isFootballGame'],
  data() {
    return {
      iframeUrl: '',
      isLoadingShow: true
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    country() {
      return this.$store.state.root.country
    },
    lang() {
      return this.$store.state.root.locale
    },
    isGuest() {
      return this.$store.state.isGuest
    },
    gameName() {
      return this.$store.state.gameName
    },
    openGame() {
      return this.$store.state.openGame
    },
    APP() {
      return window.APP || null
    }
  },
  mounted() {
    // casino 链接
    const baseUrl = this.isFootballGame
      ? this.isFootballGame.url
      : Lib.outUrl.gameUrl
    this.iframeUrl =
      baseUrl +
      `?v=${new Date().getTime()}` +
      `&gameName=${this.gameName}` +
      `&openGame=${this.openGame}` +
      `&language=${this.lang}` +
      `&country=${this.country}` +
      `&token=${this.token}`
    // 提前创建一级历史记录
    this.webAddHistory()
  },
  methods: {
    close() {
      this.$emit('closeGame')
    },
    closeLoading() {
      this.isLoadingShow = false
    },
    // 添加当前页面历史记录，给casino回退使用
    webAddHistory() {
      window.history.pushState({}, '', window.location.href)
    }
  }
}
</script>

<style scoped lang="less">
.cl-iframeBox {
  width: 10rem;
  position: fixed;
  z-index: 20;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: #fff;

  .cl-gamerotate {
    transform: rotate(-90deg);
  }
}
</style>
