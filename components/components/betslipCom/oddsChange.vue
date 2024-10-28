<template>
  <div class="cl-flexcc cl-oddsChangeBox" :class="'no-' + oddsState">
    <div class="cl-oddsCount">{{ odds }}</div>
    <div
      v-if="oddsState"
      class="cl-icon"
      :class="oddsState === 'up' ? 'cl-iconRotate0' : 'cl-iconRotate180'"
    />
  </div>
</template>

<script>
export default {
  props: ['odds', 'isOddsChange'],
  data() {
    return { oddsState: '' }
  },
  watch: {
    odds(newVal, oldVal) {
      if (newVal > oldVal) this.oddsState = 'up'
      else if (newVal < oldVal) this.oddsState = 'down'
      else this.oddsState = ''
    },
    isOddsChange(val) {
      if (!val) this.oddsState = ''
    }
  }
}
</script>

<style scoped lang="less">
.cl-oddsChangeBox {
  font-size: 11rem/36;
  font-weight: bold;
  color: #000;
  .cl-oddsCount {
    padding-top: 2rem/36;
  }
  .cl-icon {
    .sprite(@ticon-oddsup, 108rem);
  }
  &.no-up {
    .cl-oddsCount {
      color: #30db7f;
    }
  }
  &.no-down {
    .cl-oddsCount {
      color: #f65858;
    }
  }
}
</style>
