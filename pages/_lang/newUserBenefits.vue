<template>
  <div class="cl-newUserBenefits_wrap">
    <div class="cl-topBox">
      <headBack
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
        bgcolor="rgb(90, 64, 255)"
        :is-white-back="true"
        :title="$t('newUserBenefits.title')"
        color="#fff"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />
    <div class="cl-main" v-if="benefits.category">
      <img
        class="cl-img"
        :src="`${STATICURL}/images/${locale}/newUserBenefits${
          benefits.category === 1 ? '' : '2'
        }.jpg`"
        alt="onebet | New User Exclusive"
      />
      <div class="cl-flexcc cl-newUserBenefitsBox">
        <div class="cl-newUserBenefits">
          {{ $t('newUserBenefits.claimDuring') + claimDuring }}
        </div>
      </div>
      <div class="cl-grid-container">
        <div
          class="cl-grid-item"
          v-for="(item, index) in showList"
          :key="index"
        >
          <div
            class="cl-top"
            :class="{
              'cl-top2': benefits.category === 2,
              'cl-top3': item.showState === 4 || item.showState === 3
            }"
          >
            <div class="cl-amount">
              {{ item.amount }}<span>{{ $t('units') }}</span>
            </div>
            <div class="cl-dottedLine"></div>
            <div class="cl-prerequisite">
              <template v-if="benefits.category === 1">
                <div class="cl-stakes">
                  {{ $t('newUserBenefits.stakes') + item.stakes }}
                </div>
                <div class="cl-odds">
                  {{ $t('newUserBenefits.odds') + item.odds }}
                </div>
              </template>
              <div class="cl-market" v-else>
                {{ $t('newUserBenefits.market') + item.market }}
              </div>
            </div>

            <div class="cl-betDays">
              {{
                benefits.category === 1 && index == 0
                  ? $t('newUserBenefits.claimAfter')
                  : $t('newUserBenefits.betDays', {
                      num: index + (benefits.category === 1 ? 0 : 1)
                    })
              }}
            </div>
          </div>
          <div
            class="cl-bottom"
            v-if="item.showState"
            @click="processingButtonClicks(item, index)"
          >
            <div
              class="cl-bottomTitle"
              :class="{
                'cl-registerNow': item.showState === 1 || item.showState === 5,
                'cl-alreadyUsed':
                  item.showState === 4 ||
                  item.showState === 3 ||
                  item.showState === 7 ||
                  item.showState === 6,
                'cl-useItNow': item.showState === 2,
                'cl-bottomTitleFr': locale === 'fr'
              }"
            >
              {{ getBottomTitle(item) }}
            </div>
            <div class="cl-expire" v-if="item.showState === 2">
              {{
                $t('newUserBenefits.expireAfter') +
                getDate(accessTimeObj[item.cate_id])
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="cl-directionsBox">
        <h2 class="cl-h2 cl-directionsTitle">
          {{ $t(`newUserBenefits.whatGiftsTitle${benefits.category}`) }}
        </h2>
        <div
          class="cl-directionsItem cl-whatGiftsContent"
          v-html="$t(`newUserBenefits.whatGiftsContent${benefits.category}`)"
          @click="goToWhatPage"
        />
        <h2 class="cl-h2 cl-directionsTitle">
          {{ $t('newUserBenefits.directions') }}
        </h2>
        <div class="cl-directionsList">
          <div
            class="cl-directionsItem"
            v-for="(item, index) in $t('newUserBenefits.directionsList')"
            :key="index"
          >
            {{
              item.replaceAll(
                '{category}',
                benefits.category === 1 ? $t('newUserBenefits.gift') : 'Freebet'
              )
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import { newUserBenefitData } from '@/assets/data/newUserBenefitData.js'

export default {
  name: 'NewUserBenefits',
  components: {
    headBack
  },
  data() {
    return {
      benefits: {
        // bet_times: 7, // 可以领取的次数
        // give_times: 3, // 已经发放的次数
        // category: 1, // 1 gift
        // created_at: 1713959669,
        // end_time: 12321312,
        // today_give: 1, // 今日是否领取
        // use_all: true, // 是否张优惠券都用完了
      },
      showList: [],
      accessTimeObj: {},
      timer: null
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    claimDuring() {
      return (
        Lib.common.getDate(new Date(this.benefits.created_at * 1000), 'M:dd') +
        ' ~ ' +
        Lib.common.getDate(new Date(this.benefits.end_time * 1000), 'M:dd')
      )
    },
    tickets() {
      return this.$store.state.tickets
    },
    platform() {
      return this.$store.state.platform
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    if (this.token) {
      this.getNewUserBenefits()
    } else {
      this.unregisteredStatus()
    }
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    const category = Lib.store.get('category')
    this.eventBurial([`New_${category === 1 ? 'Gifts' : 'FreeBet'}_Page_View`])
  },
  destroyed() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    // 事件埋点公用方法
    eventBurial(arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        if (arr[1]) Lib.common.event_statistics(arr[0], arr[1])
        else Lib.common.event_statistics(arr[0])
      }
    },
    // 点击如何使用Gifts跳转到【How TO USE GIFTS】 击FreeBet场次跳转到FreeBet页面，点击如何使用FreeBet打开【HOW TO USE FreeBet】
    goToWhatPage() {
      const path =
        this.benefits.category === 1 ? 'giftHowToUse' : 'freeBetHowToUse'
      this.$router.push({
        path: `/${this.locale}/${path}`
      })
    },
    //  获取数据
    getNewUserBenefits() {
      this.$axios_api
        .newUserBenefitsGet({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            if (Object.keys(res.data.benefits).length === 0) {
              // 说明是老用户
              Lib.common.errorReminder(
                this,
                '',
                '',
                '',
                this.$t('newUserBenefits.activityExpired'),
                '',
                ''
              )
              this.unregisteredStatus(1)
              Lib.store.set('newUserBenefits', {
                uid: this.accountInfo?.uid,
                use_all: true,
                end_time: 0
              })
              return
            }
            this.benefits = res.data.benefits
            // this.benefits.category = 2
            // this.benefits.bet_times = 2
            Lib.store.set('newUserBenefits', this.benefits)
            const arr = newUserBenefitData[this.benefits.category - 1]
            this.spliceData(arr, res.data.detail)
            // 判断活动是否过期
            if (this.benefits.end_time * 1000 < new Date().getTime()) {
              Lib.common.errorReminder(
                this,
                '',
                '',
                '',
                this.$t('newUserBenefits.activityExpired'),
                '',
                ''
              )
            }
          } else if (res.code === 10101) {
            this.unregisteredStatus()
          }
        })
    },
    unregisteredStatus(endTime) {
      this.benefits = {
        bet_times: 0, // 可以领取的次数
        give_times: 0, // 已经发放的次数
        category: Lib.store.get('category') || Math.round(Math.random() + 1), // 1 gift
        created_at: new Date().getTime() / 1000,
        end_time: endTime || new Date().getTime() / 1000 + 30 * 24 * 60 * 60,
        today_give: 0, // 今日是否领取
        use_all: false
      }
      this.showList = newUserBenefitData[this.benefits.category - 1]
      if (this.showList && this.showList.length) this.showList[0].showState = 1
    },
    // 格式化时间
    getDate(seconds) {
      // 计算小时、分钟和秒
      seconds = Math.floor(seconds)
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const remainingSeconds = seconds % 60
      return hours + ':' + minutes + ':' + remainingSeconds
    },
    // 拼接数据
    spliceData(arr, detail) {
      if (detail.length > 0) {
        detail.forEach((item, index) => {
          Object.assign(arr[index], item)
        })
        this.showList = arr
      }
      arr.forEach((item, index) => {
        this.judgmentState(index, item)
      })
      this.showList = arr
    },
    // 开启定时器算时间
    turnTimer(cateId, expire) {
      this.$set(
        this.accessTimeObj,
        cateId,
        Math.floor((expire * 1000 - new Date()) / 1000)
      )
      if (!this.timer) {
        this.timer = setInterval(() => {
          for (const key in this.accessTimeObj) {
            // this.$set(this.accessTimeObj, key, this.accessTimeObj[key]-1);
            this.accessTimeObj[key] = this.accessTimeObj[key] - 1
            // 到点删除值，改状态
            if (this.accessTimeObj[key] <= 0) {
              delete this.accessTimeObj[key]
              const item = this.showList.find((item) => item.cate_id == key)
              item && (item.showState = 4)
            }
          }
        }, 1000)
      }
    },
    judgmentState(index, item) {
      /**
       * showState
       * 1 未注册
       * 2 可以使用
       * 3 已经使用
       * 4 已过期
       * 5 未领取，显示可领取
       * 6 今天领取过了，显示明天来领
       * 7 没得领取的了，显示bet
       */
      if (index === 0 && !this.token) {
        item.showState = 1
      }
      if (item.status === 1 || item.status === 2 || item.status === 3) {
        item.showState = item.status + 1
        if (item.showState === 2) {
          this.turnTimer(item.cate_id, item.expire)
        }
        return
      }
      if (
        this.benefits.give_times < this.benefits.bet_times &&
        index < this.benefits.bet_times
      ) {
        // 有还可以领取的卷
        item.showState = this.benefits.today_give ? 6 : 5
      }
      if (
        this.benefits.give_times == this.benefits.bet_times &&
        index === this.benefits.bet_times
      ) {
        item.showState = 7
      }
    },
    // 获取显示数据
    getBottomTitle(item) {
      const arrTitle = [
        this.benefits.category === 1
          ? this.$t('newUserBenefits.registerNow')
          : this.$t('newUserBenefits.claim'),
        this.$t('newUserBenefits.useItNow'),
        this.$t('newUserBenefits.alreadyUsed'),
        this.$t('newUserBenefits.expired'),
        this.$t('newUserBenefits.claim'),
        this.$t('newUserBenefits.claimTomorrow'),
        this.$t('newUserBenefits.claim')
      ]
      return arrTitle[item.showState - 1]
    },
    // 处理按钮点击
    processingButtonClicks(item, index) {
      // 过期了不处理
      if (this.benefits.end_time * 1000 < new Date().getTime()) return
      switch (item.showState) {
        case 1:
          this.$router.push({
            path: `/${this.locale}/register`,
            query: {
              from: this.$route.name
            }
          })
          break
        case 2:
          // eslint-disable-next-line no-case-declarations
          const path = this.benefits.category === 1 ? 'betslip' : 'freebet'
          this.$router.push({
            path: `/${this.locale}/${path}`
          })
          break
        case 5:
          this.gettingReward(index)
          break
        case 6:
          Lib.common.errorReminder(
            this,
            '',
            '',
            '',
            this.$t('newUserBenefits.oneCan', {
              category:
                this.benefits.category === 1
                  ? this.$t('newUserBenefits.gift')
                  : 'Freebet'
            }),
            this.$t('newUserBenefits.OK'),
            ''
          )
          break
        case 7:
          Lib.common.errorReminder(
            this,
            '',
            '',
            '',
            this.$t('newUserBenefits.accumulated', {
              num: index + (this.benefits.category === 1 ? 0 : 1),
              category:
                this.benefits.category === 1
                  ? this.$t('newUserBenefits.gift')
                  : 'Freebet'
            }) +
              '<br/>' +
              this.$t(
                `newUserBenefits.betNowAndTomorrow${this.benefits.today_give}`
              ),
            this.benefits.today_give
              ? this.$t('newUserBenefits.OK')
              : this.$t('newUserBenefits.goToBet'),
            '',
            () => {
              if (this.benefits.today_give) return
              this.$router.push({
                path: `/${this.locale}/betslip`
              })
            }
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
            this.$set(
              this.showList,
              index,
              Object.assign({}, this.showList[index], res.data)
            )
            this.turnTimer(res.data.cate_id, res.data.expire)
            this.benefits.today_give = 1
            this.benefits.give_times++
            // 重新更新数据
            this.showList.forEach((item, index) => {
              this.judgmentState(index, item)
            })
            Lib.store.set('newUserBenefits', this.benefits)
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
    }
  }
}
</script>

<style scoped lang="less">
.cl-newUserBenefits_wrap {
  min-height: 100vh;
  background-color: #fde3c2;
  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 2;
  }

  .cl-main {
    position: relative;
    width: 100%;
    padding-top: 102rem/36;
    .cl-img {
      position: absolute;
      top: 0;
      width: 100%;
    }
    .cl-newUserBenefitsBox {
      position: relative;
      z-index: 1;
      .cl-newUserBenefits {
        padding: 0 11rem/36;
        height: 26rem/36;
        background: rgba(0, 0, 0, 0.32);
        border-radius: 13rem/36;
        font-size: 11rem/36;
        color: #ffffff;
        line-height: 26rem/36;
      }
    }

    .cl-grid-container {
      position: relative;
      z-index: 1;
      width: 340rem/36;
      margin: 102rem/36 auto 0;
      display: grid;
      grid-template-columns: repeat(3, 109rem/36);
      // grid-template-rows: repeat(3, auto);
      grid-gap: 10rem/36 7rem/36;
      .cl-grid-item {
        width: 109rem/36;
        .cl-top {
          width: 100%;
          height: 127rem/36;
          background-image: url('~/assets/images/newUserBenefits/newUserBenefitsItemBG.png');
          display: flex;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          flex-direction: column;
          align-items: center;
          &.cl-top2 {
            background-image: url(~/assets/images/newUserBenefits/newUserBenefitsItemBG2.png);
          }
          &.cl-top3 {
            background-image: url(~/assets/images/newUserBenefits/newUserBenefitsItemBG3.png);
            .cl-amount {
              color: #bbbbbb;
            }
            .cl-dottedLine {
              border-bottom: 1rem/36 dashed #bbbbbb;
            }
            .cl-prerequisite {
              .stakes,
              .odds,
              .cl-market {
                color: #bbbbbb;
              }
            }
          }
          .cl-amount {
            height: 17rem/36;
            margin-top: 22rem/36;
            font-weight: 800;
            font-size: 23rem/36;
            line-height: 23rem/36;
            color: #ff334c;
            span {
              font-size: 13rem/36;
            }
          }
          .cl-dottedLine {
            margin-top: 15rem/36;
            width: 83rem/36;
            border-bottom: 1rem/36 dashed #d29b23;
          }

          .cl-prerequisite {
            height: 44rem/36;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            .stakes,
            .odds,
            .cl-market {
              font-weight: 400;
              font-size: 11rem/36;
              color: #d29b23;
              line-height: 15rem/36;
            }
          }
          .cl-betDays {
            width: 75rem/36;
            text-align: center;
            font-weight: 400;
            font-size: 10rem/36;
            color: rgba(255, 255, 255, 1);
            line-height: 12rem/36;
          }
        }
        .cl-bottom {
          height: 44rem/36;
          padding-top: 10rem/36;
          .cl-bottomTitle {
            width: 109rem/36;
            height: 30rem/36;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 15rem/36;
            font-size: 11rem/36;
            font-weight: bold;
            &.cl-registerNow {
              background: linear-gradient(83deg, #ff4eba, #ff2759);
              color: #ffffff;
            }
            &.cl-alreadyUsed {
              background: #bbbbbb;
              color: rgba(255, 255, 255, 0.5);
            }
            &.cl-useItNow {
              border: 1rem/36 solid #ff285b;
              color: #ff295e;
            }
            &.cl-bottomTitleFr {
              font-size: 10rem/36;
            }
          }
          .cl-expire {
            font-weight: 400;
            font-size: 11rem/36;
            color: #ed2136;
            line-height: 11rem/36;
            margin-top: 5rem/36;
          }
        }
      }
    }
    .cl-directionsBox {
      width: 340rem/36;
      margin: 16rem/36 auto 0;
      padding-bottom: 30rem/36;
      .cl-whatGiftsContent {
        margin-top: 8rem/36;
        margin-bottom: 18rem/36;
      }
      .cl-directionsTitle {
        font-weight: bold;
        font-size: 13rem/36;
        color: #724527;
        line-height: 13rem/36;
        text-transform: uppercase;
      }
      .cl-directionsList {
        margin-top: 10rem/36;
        .cl-directionsItem {
          font-weight: 400;
          font-size: 13rem/36;
          color: #724527;
          line-height: 18rem/36;
        }
      }
    }
  }
}
</style>
