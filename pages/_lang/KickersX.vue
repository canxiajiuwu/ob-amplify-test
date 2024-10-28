<template>
  <div class="cl-kickersX_wrap">
    <div class="cl-loading" v-if="!gameOnload">
      <div class="cl-box">
        <div class="cl-defaultImg" v-show="!loadingSucess">
          <img
            :src="STATICURL + `/lotties/kickersX/kickersXErr.png`"
            alt="onebet | kickersX"
          />
        </div>
        <lottie-player
          v-if="isSvg"
          ref="lottiePlayer"
          :src="STATICURL + `/lotties/kickersX/loading.json`"
          autoplay
          loop
          :style="{ width: 137 / 72 + 'rem', height: 200 / 72 + 'rem' }"
        />
      </div>
      <div class="cl-percentage">{{ progress }}%</div>
    </div>
    <iframe
      class="cl-kickersX"
      :src="gameUrl"
      frameborder="0"
      allow="autoplay"
      :style="appHeight"
    ></iframe>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  name: 'KickersX',
  data() {
    return {
      gameUrl: `/gameRes/miniGame/KickersX/game-${
        process.env.NODE_ENV === 'production' ? 'release' : 'staging'
      }/index.html`,
      loadingSucess: false,
      appHeight: ''
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    progress() {
      return this.$store.state.progress
    },
    gameOnload() {
      return this.$store.state.gameOnload
    },
    // 支持svg
    isSvg() {
      return typeof window === 'undefined' ? '' : SVGRect ? 'svg' : ''
    }
  },
  beforeMount() {
    this.gameUrl = `${this.gameUrl}?language=${
      this.$store.state.root.locale
    }&token=${this.token}&timeStamp=${new Date().getTime()}`
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    if (this.isSvg) {
      this.$refs.lottiePlayer.addEventListener('load', () => {
        this.loadingSucess = true
      })
      this.$refs.lottiePlayer.addEventListener('error', () => {
        this.loadingSucess = false
      })
    }

    const bodyHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    this.appHeight = `height:${bodyHeight}px;`
  },
  destroyed() {
    this.$store.commit('setGameOnload', false)
    this.$store.commit('setProgress', 0)
  }
}
</script>

<style scoped lang="less">
.cl-kickersX_wrap {
  position: relative;
  .cl-loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    z-index: 100;
    .cl-box {
      position: relative;
      width: 66rem/36;
      height: 100rem/36;
      .cl-defaultImg {
        box-sizing: border-box;
        padding-bottom: 6rem/36;
        display: flex;
        align-items: flex-end;
        width: 66rem/36;
        height: 100rem/36;
        position: absolute;
        top: 0;
        left: 0;
        img {
          width: 66rem/36;
          height: 56rem/36;
        }
      }
    }

    .cl-percentage {
      font-size: 15rem/36;
      font-weight: bold;
      color: #2a6673;
      text-align: center;
      margin-top: 10rem/36;
    }
  }
  .cl-kickersX {
    width: 10rem;
    height: 100vh;
  }
}
</style>
