<template>
  <div class="cl-liveBanner-wrap" @click="goCrashGame">
    <img
      class="cl-bannerImg"
      src="@/assets/images/Live/crashGameBanner.jpg"
      alt="crashGame"
    />
    <div class="cl-wordBox">
      <div
        class="cl-word"
        v-html="
          $store.state.root.locale === 'en'
            ? 'OneBet Crash<br> Live Odds'
            : 'Cotes OneBet<br> Crash en direct'
        "
      />
      <div class="cl-gameOdds">{{ showOdds }}</div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: {
    showOdds: {
      type: String,
      default: '1.00'
    }
  },
  methods: {
    goCrashGame() {
      // 事件统计(点击banner)
      Lib.common.event_statistics('live_banner_crash')
      this.$router.push({ path: `/${this.$store.state.root.locale}/crashGame` })
    }
  }
}
</script>

<style scoped lang="less">
.cl-liveBanner-wrap {
  width: 100%;
  .cl-bannerImg {
    width: 100%;
    height: 100%;
  }
  .cl-wordBox {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 195rem/36;
    display: flex;
    align-items: center;
    .cl-word {
      font-size: 13rem/36;
      font-weight: bold;
      color: #fff;
      line-height: 15rem/36;
    }
    .cl-gameOdds {
      margin-left: 10rem/36;
      font-size: 30rem/36;
      font-weight: 800;
      color: #ffec6c;
      white-space: nowrap;
      font-family: Alibaba PuHuiTi;
    }
  }
}
</style>
