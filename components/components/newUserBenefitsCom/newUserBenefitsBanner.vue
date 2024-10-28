<template>
  <div
    class="cl-flexcc cl-newUserBenefitsBanner-wrap"
    v-if="flag"
    :class="[
      'no-' + where,
      { 'cl-height75': [2, 3, 4].includes(status) && where !== 'home' }
    ]"
  >
    <div
      style="height: calc(12rem / 36)"
      v-if="[2, 3, 4].includes(status) && where === 'home'"
    />
    <div
      class="cl-box"
      :class="{
        'cl-box2': [2, 3, 4].includes(status) && newUserBenefits.category !== 1,
        'cl-box3': [2, 3, 4].includes(status) && newUserBenefits.category === 1,
        'cl-boxFr': locale === 'fr',
        'cl-boxMargin': status === 4
      }"
      @click="goPage(true)"
    >
      <div class="cl-title" v-if="[1, 5, 6].includes(status)">
        {{
          $t('newUserBenefits.exclusiveGift', {
            category:
              newUserBenefits.category === 1 ||
              (!newUserBenefits.category && category === 1)
                ? $t('newUserBenefits.gift')
                : 'Freebet'
          })
        }}
      </div>
      <div class="cl-bottom">
        <div class="cl-left">
          <template v-if="status === 1">
            <div class="cl-unregistered">
              <div
                class="cl-amount50"
                :class="'no-amount50' + (newUserBenefits.category || category)"
              >
                <div class="cl-tons">x6</div>
              </div>
              <div class="cl-add">+</div>
              <div
                class="cl-amount100"
                :class="'no-amount100' + (newUserBenefits.category || category)"
              >
                <div class="cl-tons">x3</div>
              </div>
            </div>
          </template>

          <template v-else-if="[5, 6].includes(status)">
            <div class="cl-anOrder">
              <div
                :class="[
                  'amount' + showGift.amount,
                  'amount' + showGift.amount + newUserBenefits.category
                ]"
                class="cl-left13"
              />
              <div class="cl-anOrderTitle">
                <div
                  v-html="
                    status === 6
                      ? $t('newUserBenefits.betNow', {
                          num: showGift.amount,
                          category:
                            newUserBenefits.category === 1
                              ? $t('newUserBenefits.gift')
                              : 'Freebet'
                        })
                      : $t('newUserBenefits.betNow2', {
                          num: showGift.amount,
                          category:
                            newUserBenefits.category === 1
                              ? $t('newUserBenefits.gift')
                              : 'Freebet'
                        })
                  "
                ></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="cl-friable">
              <div class="cl-amountBox">
                <div class="cl-xaf">{{ $t('units') }}</div>
                <div class="cl-amount">{{ showGift.amount }}</div>
              </div>
              <div class="cl-instructionsForUse">
                <div class="cl-instructionsForUse1">
                  <div class="cl-absolute">
                    {{
                      $t('newUserBenefits.exclusiveGift', {
                        category:
                          newUserBenefits.category === 1
                            ? $t('newUserBenefits.gift')
                            : 'Freebet'
                      })
                    }}
                  </div>
                </div>
                <div class="cl-prerequisite">
                  {{
                    newUserBenefits.category === 1
                      ? $t('newUserBenefits.stakes') +
                        showGift.stakes +
                        '; ' +
                        $t('newUserBenefits.odds') +
                        showGift.odds
                      : $t('newUserBenefits.market') + showGift.market
                  }}
                </div>
                <div class="cl-expire" v-if="status === 2">
                  {{ $t('newUserBenefits.expireAfter') + getDate(expireTime) }}
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="cl-right">
          <div
            class="cl-button"
            @click.stop="processingButtonClicks"
            v-if="status !== 6"
          >
            {{ rightTitle }}
          </div>
          <div class="cl-checkMore">{{ $t('newUserBenefits.checkMore') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import { newUserBenefitData } from '@/assets/data/newUserBenefitData.js'

export default {
  props: {
    where: {
      type: String // home  Bet_History Market
    }
  },
  data() {
    return {
      flag: 0,
      newUserBenefits: Lib.store.get('newUserBenefits') || {},
      category: Lib.store.get('category'),
      detail: [],
      showGift: {},
      status: 0, // 1 未登录 2 有卷未使用 3 有卷今天没领 4 有卷今天领了 5 立即下单现在可领 6 立即下单明天可领
      expireTime: 0,
      timer: null,
      noChange: 1 // 获取用户信息后是否请求
    }
  },
  computed: {
    accountInfo() {
      return this.$store.state.accountInfo
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    rightTitle() {
      const rightTitleArr = [
        this.$t('betslipPlaceBet.get'),
        this.$t('freeBetList.useNow'),
        this.$t('newUserBenefits.claimNow'),
        this.$t('newUserBenefits.claimTomorrow'),
        this.$t('newUserBenefits.goToBet'),
        this.$t('newUserBenefits.goToBet')
      ]
      return rightTitleArr[this.status - 1]
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  watch: {
    accountInfo: {
      handler(val) {
        if (val && this.noChange) {
          this.noChange = 0
          this.getNewUserBenefits()
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (!this.token) {
      this.flag = 1
      this.getStatus()
    }
    if (!this.accountInfo && this.token) {
      this.$axios_api.userAccountInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setAccountInfo', res.data)
        }
      })
    }
  },
  // activated() {
  //   const newUserBenefits = Lib.store.get('newUserBenefits')
  //   if (!newUserBenefits) {
  //     // 退出登陆了
  //     this.status = 1
  //     this.flag = 1
  //     this.newUserBenefits = {}
  //     return
  //   }
  //   if (
  //     newUserBenefits.bet_times !== this.newUserBenefits.bet_times ||
  //     newUserBenefits.give_times !== this.newUserBenefits.give_times ||
  //     newUserBenefits.today_give !== this.newUserBenefits.today_give
  //   ) {
  //     this.getNewUserBenefits()
  //   }
  // },
  destroyed() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    // 格式化时间
    getDate(seconds) {
      // 计算小时、分钟和秒
      seconds = Math.floor(seconds)
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const remainingSeconds = seconds % 60
      return hours + ':' + minutes + ':' + remainingSeconds
    },
    //  获取数据
    getNewUserBenefits() {
      if (
        this.newUserBenefits.uid === this.accountInfo.uid &&
        (this.newUserBenefits.use_all ||
          this.newUserBenefits.end_time * 1000 < new Date().getTime())
      ) {
        this.flag = 0
        this.$emit('emitflag', this.flag)
        return
      }

      this.$axios_api
        .newUserBenefitsGet({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            if (Object.keys(res.data.benefits).length === 0) {
              // 说明是老用户
              Lib.store.set('newUserBenefits', {
                uid: this.accountInfo ? this.accountInfo.uid : '',
                use_all: true,
                end_time: 0
              })
              this.flag = 0
              this.$emit('emitflag', this.flag)
              return
            }
            this.flag = 1
            this.newUserBenefits = res.data.benefits
            this.detail = res.data.detail
            Lib.store.set('newUserBenefits', this.newUserBenefits)
            this.getStatus()
          } else if (res.code === 10101) {
            this.flag = 1
            this.status = 1
          }
        })
    },
    getStatus() {
      if (!this.token) {
        this.status = 1
        this.eventBurial([
          `New_Remain_${this.category === 1 ? 'Gifts' : 'FreeBet'}_Banner_View`,
          `Page_From:${this.where}`
        ])
        return
      }
      if (
        this.newUserBenefits.end_time * 1000 < new Date().getTime() ||
        this.newUserBenefits.use_all
      ) {
        this.status = 0
        this.flag = 0
        this.$emit('emitflag', this.flag)
        return
      }
      this.flag = 1
      const index = this.detail.findIndex((item) => item.status === 1)
      if (index !== -1) {
        // 有可用的卷
        this.status = 2
        this.flag = 0
        this.$emit('emitflag', this.flag)
        return
      }
      if (this.newUserBenefits.bet_times > this.newUserBenefits.give_times) {
        this.showGift =
          newUserBenefitData[this.newUserBenefits.category - 1][
            this.newUserBenefits.give_times
          ]
        this.status = this.newUserBenefits.today_give ? 4 : 3
        return
      }
      this.showGift =
        newUserBenefitData[this.newUserBenefits.category - 1][
          this.newUserBenefits.give_times + 1
        ]
      this.status = this.newUserBenefits.today_give ? 6 : 5
    },
    goPage(status) {
      this.$router.push({
        path: `/${this.locale}/newUserBenefits`
      })
      status &&
        this.eventBurial([
          `New_Remain_${
            this.category === 1 ? 'Gifts' : 'FreeBet'
          }_Banner_Touch`,
          `Page_From:${this.where}`
        ])
    },
    processingButtonClicks() {
      this.eventBurial([
        `New_Remain_${this.category === 1 ? 'Gifts' : 'FreeBet'}_Banner_Touch`,
        `Page_From:${this.where}`
      ])
      switch (this.status) {
        case 1:
          this.goPage(false)
          break
        case 2:
        case 5:
        case 6:
          this.goToBet()
          break
        case 3:
          this.gettingReward(this.newUserBenefits.give_times)
          break
        case 4:
          Lib.common.errorReminder(
            this,
            'changeBettingAmount',
            '',
            '',
            this.$t('newUserBenefits.oneCan', {
              category:
                this.newUserBenefits.category === 1
                  ? this.$t('newUserBenefits.gift')
                  : 'Freebet'
            }),
            this.$t('newUserBenefits.OK'),
            ''
          )
          break
        default:
          break
      }
    },
    //  领取奖励
    gettingReward(index) {
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .newUserBenefitsOpen({
          token: this.token,
          cid: index
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            // 有可用的卷
            this.status = 2
            this.newUserBenefits.give_times++
            Lib.store.set('newUserBenefits', this.newUserBenefits)
            this.flag = 0
            this.$emit('emitflag', this.flag)
            this.$emit(
              'needR',
              this.newUserBenefits.category === 1 ? 'Gift' : 'FreeBet'
            )
          } else {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('newUserBenefits.failedClaim'),
              '',
              ''
            )
          }
        })
    },
    goToBet() {
      const path =
        this.newUserBenefits.category === 1 ||
        this.status === 5 ||
        this.status === 6
          ? 'betslip'
          : 'freebet'
      this.$router.push({ path: `/${this.locale}/${path}` })
    },
    // 事件埋点公用方法
    eventBurial(arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        if (arr[1]) Lib.common.event_statistics(arr[0], arr[1])
        else Lib.common.event_statistics(arr[0])
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-newUserBenefitsBanner-wrap {
  height: 90rem/36;
  flex-direction: column;
  &.no-Bet_History {
    padding: 10rem/36 0;
    background-color: #1c2029;
  }
  &.no-Market {
    padding: 10rem/36 0;
    background-color: #fff;
  }
  &.cl-height75 {
    height: 75rem/36;
  }
  .cl-box {
    width: 340rem/36;
    height: 90rem/36;
    padding-right: 12rem/36;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(../../../assets/images/newUserBenefits/newUserBenefitsBannerRed.png);
    &.cl-box2 {
      .sprite(@claim-com-swipergift, 108rem);
      // .sprite(@claim-com-swiperfreebet, 108rem);
    }
    &.cl-box3 {
      .sprite(@claim-com-swipergift, 108rem);
    }
    &.cl-boxFr {
      .cl-bottom {
        .cl-left {
          .cl-anOrder {
            .cl-anOrderTitle {
              font-size: 10rem/36;
            }
          }
        }
        .cl-right {
          font-size: 10rem/36;
        }
      }
    }
    &.cl-boxMargin {
      .cl-bottom {
        .cl-left {
          .cl-friable {
            .cl-instructionsForUse {
              .cl-instructionsForUse1 {
                height: 24rem/36;

                .cl-absolute {
                  width: 150rem/36;
                  white-space: normal;
                }
              }
            }
          }
        }
      }
    }
    .cl-amount50 {
      width: 66rem/36;
      height: 49rem/36;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(../../../assets/images/newUserBenefits/newUserBenefitsBanner50.png);
      position: relative;
      &.no-amount501 {
        background-image: url(../../../assets/images/newUserBenefits/newUserBenefitsBannerGift50.png);
      }
    }
    .cl-amount100 {
      width: 66rem/36;
      height: 49rem/36;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(../../../assets/images/newUserBenefits/newUserBenefitsBanner100.png);
      position: relative;
      &.no-amount1001 {
        background-image: url(../../../assets/images/newUserBenefits/newUserBenefitsBannerGift100.png);
      }
    }
    .cl-tons {
      width: 33rem/36;
      height: 19rem/36;
      background: #ff8a00;
      border-radius: 10rem/36;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 13rem/36;
      color: #ffffff;
      position: absolute;
      right: -24rem/36;
      top: -1rem/36;
    }
    .cl-title {
      padding-top: 7rem/36;
      font-weight: bold;
      font-size: 11rem/36;
      color: #ffffff;
      line-height: 11rem/36;
      text-align: center;
    }
    .cl-bottom {
      display: flex;
      justify-content: space-between;
      .cl-left {
        .cl-unregistered {
          display: flex;
          margin-top: 14rem/36;
          .cl-amount50 {
            margin-left: 28rem/36;
          }
          .cl-add {
            font-weight: 900;
            font-size: 35rem/36;
            color: #bc860f;
            margin-left: 23rem/36;
          }
          .cl-amount100 {
            margin-left: 14rem/36;
          }
        }
        .cl-friable {
          display: flex;
          align-items: center;
          height: 75rem/36;
          .cl-amountBox {
            flex: 1;
            min-width: 80rem/36;
            // padding-right: 12rem/36;
            box-sizing: border-box;
            font-weight: bold;
            color: #ed2136;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .cl-xaf {
              font-size: 13rem/36;
              line-height: 13rem/36;
            }
            .cl-amount {
              margin-top: 3rem/36;
              font-size: 23rem/36;
              line-height: 23rem/36;
            }
          }
          .cl-instructionsForUse {
            position: relative;
            .cl-instructionsForUse1 {
              height: 12rem/36;
              font-weight: bold;
              font-size: 12rem/36;
              color: #bc860f;
              line-height: 12rem/36;
              .cl-absolute {
                position: absolute;
                left: 0;
                top: 0;
                white-space: nowrap;
              }
            }
          }
          .cl-prerequisite {
            font-weight: 400;
            font-size: 12rem/36;
            color: #bc860f;
            line-height: 12rem/36;
            margin-top: 7rem/36;
          }
          .cl-expire {
            font-weight: 400;
            font-size: 10rem/36;
            color: #ed2136;
            line-height: 10rem/36;
            margin-top: 5rem/36;
          }
        }
        .cl-anOrder {
          display: flex;
          .cl-left13 {
            margin-left: 13rem/36;
            margin-top: 12rem/36;
          }
          .cl-anOrderTitle {
            width: 137rem/36;
            height: 62rem/36;
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 12rem/36;
            color: #bc860f;
            line-height: 13rem/36;
            margin-left: 6rem/36;
            margin-top: 6rem/36;
          }
        }
      }
      .cl-right {
        font-size: 12rem/36;
        padding-top: 28rem/36;
        .cl-button {
          min-width: 68rem/36;
          padding: 0 6rem/36;
          box-sizing: border-box;
          height: 23rem/36;
          background: linear-gradient(83deg, #ff4eba, #ff2759);
          border-radius: 12rem/36;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: #ffffff;

          white-space: nowrap;
        }
        .cl-checkMore {
          font-weight: 400;
          font-size: 8rem/36;
          color: #fe3e5d;
          line-height: 14rem/36;
          text-decoration-line: underline;
          text-align: center;
        }
      }
    }
  }
}
</style>
