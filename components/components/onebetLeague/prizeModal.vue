<template>
  <div class="cl-flexcc cl-prizeModal-wrap" @click="closePrizeModal">
    <div class="cl-content">
      <div class="cl-title">{{ $t('virtualFreebet.con') }}</div>
      <div class="cl-word">
        {{
          $t('virtualFreebet.conWord', {
            home_score: home_score,
            away_score: away_score,
            win: win
          })
        }}
      </div>
      <div class="cl-image" />
      <div class="cl-close" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['home_score', 'away_score', 'win'],
  methods: {
    closePrizeModal() {
      this.$emit('closePrizeModal')
    }
  }
}
</script>

<style scoped lang="less">
.cl-prizeModal-wrap {
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .cl-content {
    text-align: center;

    .cl-title {
      color: #ffe400;
      font-size: 23rem/36;
      font-weight: bold;
    }

    .cl-word {
      color: #fff;
      font-size: 11rem/36;
      width: 240rem/36;
      margin: 13rem/36 auto;
    }

    .cl-image {
      width: 512rem/108;
      height: 512rem/108;
      background-image: url('~/assets/images/general/notSprites/league/prizes.png');
      background-size: 100% 100%;
      margin: 0 auto;
    }

    .cl-close {
      margin: 45rem/36 auto;
      .sprite(@icon-x,108rem);
    }
  }
}
</style>
