<template>
  <div
    class="cl-oddsWord"
    :class="[
      {
        'cl-heartBeatUp': isOddsChangeUp,
        'cl-heartBeatDown': isOddsChangeDown
      },
      'no-' + where
    ]"
    :style="{ fontSize: fontSizeNum + 'rem' }"
  >
    {{ odds }}
  </div>
</template>

<script>
export default {
  props: {
    odds: {},
    fontSizeNum: {
      type: Number,
      default: 13 / 36
    },
    where: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOddsChangeUp: 0,
      isOddsChangeDown: 0
    }
  },
  watch: {
    odds(newVal, oldVal) {
      if (oldVal && newVal !== oldVal) {
        if (newVal > oldVal) this.isOddsChangeUp = 1
        else this.isOddsChangeDown = 1

        setTimeout(() => {
          this.isOddsChangeUp = 0
          this.isOddsChangeDown = 0
        }, 1500)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-oddsWord {
  color: #000;
  font-weight: bold;
  &.no-live {
    color: #fff;
  }
}
</style>
