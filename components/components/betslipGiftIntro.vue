<template>
  <div
    class="cl-betslipGiftIntro"
    :class="{ 'cl-isLive': where === 'live' }"
    @click.stop="closeGiftIntro"
  >
    <div class="cl-bsbb cl-word" :class="'no-' + direction">
      {{ word || $t('betslipPlaceBet.giftIntro') }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['where', 'word', 'direction'],
  mounted() {
    setTimeout(this.closeGiftIntro, 10000)
  },
  methods: {
    closeGiftIntro() {
      this.$emit('closeGiftIntro')
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipGiftIntro {
  width: 340rem/36;
  height: 15rem;
  bottom: -3.2rem;
  left: 0;
  position: absolute;

  .cl-word {
    color: #fff;
    width: 212rem/36;
    text-align: center;
    font-size: 10rem/36;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 3rem/36;
    padding: 3rem/36 5rem/36;
    margin-top: 10.4rem;

    &.no-right {
      margin-left: 120rem/36;
    }
  }
  &.cl-isLive {
    .cl-word {
      background-color: #0b0d10;
    }
  }
}
</style>
