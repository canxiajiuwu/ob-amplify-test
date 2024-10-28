<template>
  <div class="cl-betslipWinBonus-wrap">
    <div class="cl-topBanner" @click="betNow">
      <div class="cl-flexcc cl-backIcon" @click.stop="goBack">
        <div class="cl-icon" />
      </div>
      <img
        :src="`${STATICURL}/images/lang/${locale}/${country}/extraBonus/bg.jpg`"
        alt="banner"
      />
    </div>
    <div class="cl-container">
      <div class="cl-content">
        <div class="cl-flexcc cl-titleBox">
          <div class="cl-title">{{ $t('betslipBonusNew.bonus') }}</div>
        </div>

        <div class="cl-termsList">
          <div class="cl-item">{{ $t('betslipBonusNew.art') }}</div>
        </div>
        <div class="cl-list">
          <div class="cl-flexcb cl-item" v-for="item in 20" :key="item">
            <div>
              {{
                $t('betslipBonus.legs', {
                  number: 2 + item,
                  percent: bonusList[2 + item]
                })
              }}
            </div>
            <div>
              {{
                $t('betslipBonus.legs', {
                  number: 22 + item,
                  percent: bonusList[22 + item]
                })
              }}
            </div>
          </div>
        </div>

        <div class="cl-flexcc cl-titleBox">
          <div class="cl-title">{{ $t('betslipBonusNew.terms') }}</div>
        </div>

        <div class="cl-termsList">
          <div
            class="cl-item"
            v-for="(a, b) in $t('betslipBonusNew.termsList')"
            :key="b"
          >
            {{ a }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  name: 'BetslipBonus',
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    bonusList() {
      return this.$store.state.bonusList
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    },
    // 前往主页
    betNow() {
      this.$router.push({ path: `/${this.locale}` })
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipWinBonus-wrap {
  background-color: #270684;

  .cl-topBanner {
    height: 198rem/36;

    > img {
      width: 10rem;
      height: 198rem/36;
    }

    .cl-backIcon {
      position: absolute;
      left: 10rem/36;
      top: 10rem/36;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      width: 24rem/36;
      height: 24rem/36;

      .cl-icon {
        .sprite(@icon-back-white,360rem);
      }
    }
  }

  .cl-content {
    margin: 5rem/36 5rem/36 0;
    box-sizing: border-box;
    padding: 16rem/36 20rem/36 20rem/36;
    color: #000;

    .cl-title {
      position: relative;
      text-align: center;
      color: #fef23c;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 16rem/36;
    }

    .cl-title:after {
      position: absolute;
      right: -14rem/36;
      top: 4rem/36;
      content: '';
      width: 6rem/36;
      height: 6rem/36;
      background-color: #fef23c;
      border-radius: 50%;
    }

    .cl-title:before {
      position: absolute;
      left: -14rem/36;
      top: 4rem/36;
      content: '';
      width: 6rem/36;
      height: 6rem/36;
      background-color: #fef23c;
      border-radius: 50%;
    }

    table {
      color: #394d8b;
      padding: 10rem/36 0;

      td {
        width: 120rem/36;
      }
    }

    .cl-termsList {
      color: #fff;

      .cl-item {
        padding-bottom: 10rem/36;
      }
    }

    .cl-list {
      margin-bottom: 26rem/36;
      border-radius: 3rem/36;
      background-color: #7a53e9;

      .cl-item {
        height: 26rem/36;
        box-sizing: border-box;
        padding: 0 17rem/36;
        color: #fff;
        font-size: 10rem/36;
      }

      .item:nth-child(even) {
        background-color: #5d3cbc;
      }
    }
  }
}
</style>
