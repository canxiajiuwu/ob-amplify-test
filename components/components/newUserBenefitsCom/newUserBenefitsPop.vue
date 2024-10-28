<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="cl-newUserBenefitsPop-wrap">
    <drawer
      :visible.sync="showNewUserBenefitsPop"
      type="middle"
      :width="320 / 36"
      :height="400 / 36"
      :show="true"
      :border-radius="17"
      boxbg-color="rgba(255, 255, 255, 0)"
    >
      <div class="cl-box">
        <div class="cl-icon" :class="type" />
        <div class="cl-title1">{{ title1[type] }}</div>
        <div class="cl-title2" v-html="title2[type]" />
        <div class="cl-gift" :class="'no-gift' + newUserBenefits.category">
          <div class="cl-left">
            <div class="cl-xaf">{{ $t('units') }}</div>
            <div class="cl-amount">{{ gift.amount }}</div>
          </div>
          <div class="cl-right">
            <div class="cl-exclusiveGift">
              {{
                $t('newUserBenefits.exclusiveGift', {
                  category:
                    newUserBenefits.category === 1
                      ? $t('newUserBenefits.gift')
                      : 'Freebet'
                })
              }}
            </div>
            <div class="cl-giftLimitation">
              {{
                newUserBenefits.category === 1
                  ? $t('newUserBenefits.stakes') +
                    gift.stakes +
                    '; ' +
                    $t('newUserBenefits.odds') +
                    gift.odds
                  : $t('newUserBenefits.market') + gift.market
              }}
            </div>
          </div>
        </div>
        <div class="cl-button" @click="claimAndBet">{{ button[type] }}</div>
        <div
          class="cl-details"
          v-if="type === 'orderSuccessful'"
          @click="details"
        >
          {{ $t('newUserBenefits.checkMoreDetails') }}
        </div>
      </div>
      <div class="cl-close" @click="close" />
    </drawer>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import { newUserBenefitData } from '@/assets/data/newUserBenefitData.js'

export default {
  // type => orderSuccessful successfulCollection
  props: ['showNewUserBenefitsPop', 'type', 'newUserBenefits'],
  data() {
    return {
      title1: {
        orderSuccessful: this.$t('newUserBenefits.congratulations'),
        successfulCollection: this.$t('newUserBenefits.claimSuccessful')
      },
      title2: {
        orderSuccessful: this.$t('newUserBenefits.sendsGift'),
        successfulCollection: this.$t('newUserBenefits.hours')
      },
      button: {
        orderSuccessful: this.newUserBenefits.today_give
          ? this.$t('newUserBenefits.claimTomorrow')
          : this.$t('newUserBenefits.claimNow'),
        successfulCollection: this.$t('newUserBenefits.goToBet')
      }
    }
  },
  computed: {
    gift() {
      const ndata = newUserBenefitData[this.newUserBenefits.category - 1]
      return ndata ? ndata[this.newUserBenefits.bet_times] : {}
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  watch: {
    showNewUserBenefitsPop(val) {
      if (val) {
        const Pop_From =
          this.type === 'orderSuccessful'
            ? this.newUserBenefits.today_give
              ? 'Claim_Tomorrow'
              : 'Claim'
            : 'Use'
        this.eventBurial([
          `New_${
            this.newUserBenefits.category === 1 ? 'Gifts' : 'FreeBet'
          }_Pop_View`,
          `Pop_From;${Pop_From}`
        ])
      }
    }
  },
  methods: {
    // 事件埋点公用方法
    eventBurial(arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        if (arr[1]) Lib.common.event_statistics(arr[0], arr[1])
        else Lib.common.event_statistics(arr[0])
      }
    },
    close() {
      this.$emit('newUserBenefitsPopClose')
    },
    details() {
      this.close()
      this.$router.push({
        path: `/${this.locale}/newUserBenefits`
      })
    },
    claimAndBet() {
      this.close()
      if (this.type === 'successfulCollection') {
        const path = this.newUserBenefits.category === 1 ? 'betslip' : 'freebet'
        this.$router.push({
          path: `/${this.locale}/${path}`
        })
      } else if (this.newUserBenefits.today_give) {
        Lib.common.errorReminder(
          this,
          'changeBettingAmount',
          '',
          '',
          this.$t('newUserBenefits.oneCan', {
            category:
              this.newUserBenefits.category === 1
                ? $t('newUserBenefits.gift')
                : 'Freebet'
          }),
          this.$t('newUserBenefits.OK'),
          ''
        )
      } else {
        this.$emit('gettingReward')
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-newUserBenefitsPop-wrap {
  .cl-box {
    width: 320rem/36;
    height: 297rem/36;
    background: #f7f7f7;
    border-radius: 17rem/36;
    position: relative;
    margin-top: 40rem/36;
    display: flex;
    flex-direction: column;
    align-items: center;
    .cl-icon {
      position: absolute;
      top: -40rem/36;
      width: 70rem/36;
      height: 70rem/36;
      background-size: contain;
      background-repeat: no-repeat;
      &.no-orderSuccessful {
        background-image: url(~/assets/images/newUserBenefits/orderSuccessful.png);
      }
      &.no-successfulCollection {
        background-image: url(~/assets/images/newUserBenefits/successfulCollection.png);
      }
    }
    .cl-title1 {
      font-weight: bold;
      font-size: 16rem/36;
      color: #050505;
      line-height: 16rem/36;
      margin-top: 38rem/36;
    }
    .cl-title2 {
      font-weight: 400;
      font-size: 13rem/36;
      color: #717171;
      line-height: 14px;
      margin-top: 8rem/36;
    }
    .cl-gift {
      width: 289rem/36;
      height: 100rem/36;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(~/assets/images/newUserBenefits/gift.png);
      margin-top: 14rem/36;
      padding: 16rem/36 0 22rem/36;
      box-sizing: border-box;
      display: flex;
      &.no-gift1 {
        background-image: url(~/assets/images/newUserBenefits/gift1.png);
        .cl-left {
          border: 0;
        }
      }
      .cl-left {
        width: 90rem/36;
        font-weight: bold;
        color: #ed2136;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-right: 1rem/36 solid #ffdc40;
        .cl-xaf {
          font-size: 16rem/36;
          line-height: 16rem/36;
          margin-top: 12rem/36;
        }
        .cl-amount {
          margin-top: 7rem/36;
          font-size: 23rem/36;
          line-height: 23rem/36;
        }
      }
      .cl-right {
        width: 197rem/36;
        padding-left: 10rem/36;
        .cl-exclusiveGift {
          font-weight: bold;
          font-size: 13rem/36;
          color: #bc860f;
          line-height: 13rem/36;
          margin-top: 13rem/36;
        }
        .cl-giftLimitation {
          margin-top: 13rem/36;
          font-weight: 400;
          font-size: 11rem/36;
          color: #bc860f;
          line-height: 11rem/36;
        }
      }
    }
    .cl-button {
      width: 245rem/36;
      height: 46rem/36;
      background: linear-gradient(83deg, #ff4eba, #ff2759);
      border-radius: 23rem/36;
      margin-top: 14rem/36;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16rem/36;
      color: #ffffff;
    }
    .cl-details {
      font-weight: 400;
      font-size: 13rem/36;
      color: #000000;
      line-height: 13rem/36;
      text-decoration-line: underline;
      margin-top: 16rem/36;
    }
  }
  .cl-close {
    width: 30rem/36;
    height: 30rem/36;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(~/assets/images/newUserBenefits/newUserBenefitsPopClose.png);
    margin: 30rem/36 auto 0;
  }
}
</style>
