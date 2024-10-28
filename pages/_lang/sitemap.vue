<template>
  <div class="cl-sitemap-wrap">
    <h3>Most Visited Page</h3>

    <div class="cl-link-wrap">
      <a :href="`${hostUrl}/${locale}/onebetLeague`">OneBetLeague</a>
      <a :href="`${hostUrl}/${locale}/onebetLeague-freebet`"
        >OneBetLeague FreeBet</a
      >
      <a :href="`${hostUrl}/${locale}/freebet`">FreeBet</a>
      <a :href="`${hostUrl}/${locale}/nova6`">Nova 6</a>
      <a :href="`${hostUrl}/${locale}/coinsCenter/winBonus`">Coins Center</a>
      <a :href="`${hostUrl}/${locale}/promotions`">Promotions</a>
      <a :href="`${hostUrl}/${locale}/popular`">Popular Matches</a>
      <a :href="`${hostUrl}/${locale}/featured`">Featured Matches</a>
      <a :href="`${hostUrl}/${locale}/betslip`">Betslip</a>
      <a :href="`${hostUrl}/${locale}/jackpotEntrance`">Jackpot</a>
      <a :href="`${hostUrl}/${locale}/invite`">Invite People</a>
      <a :href="`${hostUrl}/${locale}/firstDeposit`">First Deposit Promotion</a>
      <a :href="`${hostUrl}/${locale}/download`">Download OneBet App</a>
    </div>

    <h3>Matches</h3>

    <div class="cl-link-wrap">
      <a :href="`${hostUrl}/${locale}/sports/Football`">Football</a>
      <a :href="`${hostUrl}/${locale}/live/Football`">Live Football Matches</a>
    </div>

    <h3>Most Bet Football Leagues</h3>

    <div class="cl-link-wrap">
      <a :href="`${hostUrl}/${locale}/sports/Football/${locale}gland`"
        >England Football Leagues</a
      >
      <a :href="`${hostUrl}/${locale}/sports/Football/Italy`"
        >Italy Football Leagues</a
      >
      <a :href="`${hostUrl}/${locale}/sports/Football/Spain`"
        >Spain Football Leagues</a
      >
      <a :href="`${hostUrl}/${locale}/sports/Football/Germany`"
        >Germany Football Leagues</a
      >
      <a :href="`${hostUrl}/${locale}/sports/Football/France`"
        >France Football Leagues</a
      >
    </div>

    <h3>Other Sports Matches</h3>

    <div class="cl-link-wrap">
      <a :href="`${hostUrl}/${locale}/sports/Basketball`">Basketball</a>
      <a :href="`${hostUrl}/${locale}/sports/USAFootball`">USA Football</a>
      <a :href="`${hostUrl}/${locale}/sports/Rugby`">Rugby</a>
      <a :href="`${hostUrl}/${locale}/sports/Tennis`">Tennis</a>
      <a :href="`${hostUrl}/${locale}/sports/Cricket`">Cricket</a>
      <a :href="`${hostUrl}/${locale}/sports/Volleyball`">Volleyball</a>
    </div>

    <h3>About Onebet</h3>
    <div class="cl-link-wrap">
      <a :href="`${hostUrl}/${locale}/howToPlay`">How to Play</a>
      <a :href="`${hostUrl}/${locale}/aboutUs`">About US</a>
      <a :href="`${hostUrl}/${locale}/terms`">Terms and Conditions</a>
      <a :href="`${hostUrl}/${locale}/privacy`">Privacy Police</a>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  computed: {
    hostUrl() {
      return typeof window === 'undefined' ? '' : window.location.host
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  }
}
</script>

<style scoped lang="less">
.cl-sitemap-wrap {
  width: 10rem;
  height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  padding: 10rem/36;

  h3 {
    padding-top: 20rem/36;
    font-size: 1.17em;
    font-weight: bold;
  }

  .cl-link-wrap {
    padding-top: 10rem/36;

    a {
      color: #1b07d2;
      display: inline-block;
      padding: 3rem/36 15rem/36 3rem/36 0;
    }
  }
}
</style>
