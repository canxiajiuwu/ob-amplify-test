<template>
  <div class="cl-activityInstruction_wrap">
    <div class="cl-close" @click="close">
      <img :src="`${STATICURL}/images/timeLimitedActivity/close.png`" />
    </div>
    <div class="cl-top">{{ $t('accountGiftList.rules') }}</div>
    <div class="cl-main">
      <div
        class="cl-item"
        v-for="(a, b) in $t('timeLimitedActivity.rules')"
        :key="b"
      >
        {{ b + 1 + '.' + a }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityInstruction',
  computed: {
    STATICURL() {
      return process.env.STATICURL
    }
  },
  methods: {
    close() {
      this.$emit('emitCloseActivityInstruction')
    }
  }
}
</script>
<style scoped lang="less">
.cl-activityInstruction_wrap {
  padding: 16rem/36 12rem/36 30rem/36;
  position: relative;
  .cl-close {
    width: 19rem/36;
    height: 19rem/36;
    position: absolute;
    top: 10rem/36;
    left: 10rem/36;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .cl-top {
    text-align: center;
    font-size: 13rem/36;
    font-weight: 900;
    color: #000;
    line-height: 13rem/36;
    text-transform: uppercase;
  }
  .cl-main {
    font-size: 12rem/36;
    font-weight: 400;
    color: #000;
    line-height: 17rem/36;
    padding-top: 8rem/36;
    .cl-item {
      padding-top: 14rem/36;
    }
  }
}
</style>
