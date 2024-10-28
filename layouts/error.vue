<template>
  <div class="cl-noFound-wrap cl-flexcs">
    <div class="cl-icon cl-flexcc">404</div>
    <div class="cl-oops">{{ $t('noFound.oops') }}</div>
    <div class="cl-pageNotFound">{{ $t('noFound.pageNotFound') }}</div>
    <div class="cl-pageNotFound2">{{ $t('noFound.pageNotFound2') }}</div>
    <div class="cl-betOnebet" @click="goPage">
      {{ $t('noFound.betOnebet') }}<span> https://www.onebet.cm</span>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  computed: {
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    goPage() {
      this.$router.push({ path: `/${this.locale}` })
    }
  }
}
</script>

<style scoped lang="less">
.cl-noFound-wrap {
  height: 100vh;
  background: #fff;
  flex-direction: column;
  position: fixed;
  width: 100%;
  z-index: 100;
  .cl-icon {
    width: 123rem/36;
    height: 123rem/36;
    background: #ecf6f6;
    font-weight: 800;
    font-size: 40rem/36;
    color: #4c50fa;
    border-radius: 50%;
    margin-top: 116rem/36;
  }
  .cl-oops {
    font-weight: 800;
    font-size: 18rem/36;
    color: #000;
    line-height: 18rem/36;
    margin-top: 12rem/36;
  }
  .cl-pageNotFound {
    font-weight: 400;
    font-size: 12rem/36;
    color: #000;
    line-height: 15rem/36;
    margin-top: 13rem/36;
  }
  .cl-pageNotFound2 {
    width: 280rem/36;
    font-weight: 400;
    font-size: 12rem/36;
    color: rgba(0, 0, 0, 0.6);
    line-height: 15rem/36;
    margin-top: 4rem/36;
    text-align: center;
  }
  .cl-betOnebet {
    font-weight: 400;
    font-size: 12rem/36;
    color: #000;
    line-height: 12rem/36;
    margin-top: 40rem/36;
    span {
      text-transform: none;
      color: #4c50fa;
    }
  }
}
</style>
