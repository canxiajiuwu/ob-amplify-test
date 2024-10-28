<template>
  <div class="cl-countDown-wrap" @touchmove.stop @mousewheel.stop>
    <div class="cl-title">{{ liveWord.name || $t('onebetLeague.matchDay') }}</div>
    <div class="cl-start">{{ $t('onebetLeague.start') }}</div>
    <div class="cl-ring">
      <div class="cl-flexcc cl-status">{{ countDownTime }}</div>
      <div
        class="cl-sx1"
        :style="{
          transform: 'rotate(' + deg1 + 'deg)',
          backgroundColor: color1
        }"
      />
      <div
        class="cl-sx2"
        :style="{
          transform: 'rotate(' + deg2 + 'deg)',
          backgroundColor: color2,
          transition: 'transform ' + transition + 'ms linear'
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['countDownTime', 'liveWord'],
  data() {
    return {
      deg1: 0,
      deg2: -360,
      color1: '#fff',
      color2: '#fff',
      transition: 1000
    }
  },
  watch: {
    countDownTime(time) {
      this.deg2 = -36 * time
      if (time % 10 < 5) {
        this.color1 = '#979797'
        this.deg1 = 180
      } else {
        this.color1 = '#fff'
        this.deg1 = 0
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-countDown-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  color: #fff;
  z-index: 3;
  text-align: center;
  background-color: #131d3b;

  .cl-title {
    padding-top: 80rem/36;
    font-size: 33rem/36;
    font-weight: bold;
  }

  .cl-start {
    font-size: 17rem/36;
    text-transform: lowercase;
  }

  .cl-ring {
    margin: 24rem/36 auto;
    position: relative;
    box-sizing: border-box;
    width: 110rem/36;
    height: 110rem/36;
    background-color: #979797;
    border-radius: 50%;

    .cl-status {
      position: absolute;
      top: 10rem/36;
      left: 10rem/36;
      width: 90rem/36;
      height: 90rem/36;
      font-size: 50rem/36;
      font-weight: bold;
      color: #fff;
      background-color: #131d3b;
      z-index: 3;
      border-radius: 50%;
    }

    .cl-sx1 {
      position: absolute;
      left: 0;
      top: 0;
      width: 55rem/36;
      height: 110rem/36;
      transform-origin: right center;
      border-radius: 55rem/36 0 0 55rem/36;
      background-color: #fff;
      z-index: 2;
    }

    .cl-sx2 {
      position: absolute;
      right: 0;
      top: 0;
      width: 55rem/36;
      height: 110rem/36;
      transform-origin: left center;
      border-radius: 0 55rem/36 55rem/36 0;
      background-color: #fff;
      z-index: 1;
    }
  }
}
</style>
