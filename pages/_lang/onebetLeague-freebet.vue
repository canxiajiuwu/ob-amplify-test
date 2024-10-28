<template>
  <div class="cl-onebetLeague-freebet-wrap">
    <headBack
      is-white-back
      :title="$t('virtualFreebet.title').toUpperCase()"
      :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      :bgcolor="mainStyle.mainThemeColor"
      color="#fff"
      :z-index="5"
    />
    <!-- 比赛信息 -->
    <div
      class="cl-flexcc cl-freebet-content"
      :class="{ 'cl-live': isLive === 1 }"
    >
      <div class="cl-width">
        <div style="height: calc(10rem / 36)" />
        <div class="cl-flexcc cl-top-name">
          <h2 class="cl-h2">Onebet League - English League</h2>
        </div>
        <div style="height: calc(15rem / 36)" />
        <div class="cl-flexcc">
          <div class="cl-team cl-home">
            <div class="cl-flexcc cl-logoBox">
              <div
                class="cl-icon"
                v-if="freeBetInfo.infos && freeBetInfo.infos.match"
                :class="`no-icon${freeBetInfo.infos.match.home_name.icon}`"
              />
            </div>
            <div
              class="cl-teamName"
              v-if="freeBetInfo.infos && freeBetInfo.infos.match"
            >
              {{ freeBetInfo.infos.match.home_name.name }}
            </div>
          </div>
          <div class="cl-middle">
            <div class="cl-score" v-if="isLive">
              {{ show_home_score + ' : ' + show_away_score }}
            </div>
            <div class="cl-vs" v-else>{{ $t('matchDetailInbox.vs') }}</div>
          </div>
          <div class="cl-team cl-away">
            <div class="cl-flexcc cl-logoBox">
              <div
                class="cl-icon"
                v-if="freeBetInfo.infos && freeBetInfo.infos.match"
                :class="`no-icon${freeBetInfo.infos.match.away_name.icon}`"
              />
            </div>
            <div
              class="cl-teamName"
              v-if="freeBetInfo.infos && freeBetInfo.infos.match"
            >
              {{ freeBetInfo.infos.match.away_name.name }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLive === 1" class="cl-liveBox" />
    </div>
    <!-- 投注项 -->
    <div class="cl-betBox">
      <!-- 1X2 selectItem resultItem -->
      <div class="cl-flexcc cl-market">
        <template
          v-if="
            freeBetInfo.infos &&
            freeBetInfo.infos.match &&
            freeBetInfo.infos.match.markets
          "
        >
          <div
            class="cl-flexcb cl-item"
            :class="[
              { resultItem: isLive && win_1X2 === item.id },
              selectOutcome && selectOutcome.id === item.id && !isLive
                ? 'cl-oddsButton'
                : 'cl-noOddsButton'
            ]"
            v-for="(item, index) in freeBetInfo.infos.match.markets[0].outcomes"
            :key="index"
            @click="selectItem(freeBetInfo.infos.match.markets[0], item)"
          >
            <div class="cl-left">{{ item.name }}</div>
            <div class="cl-right">{{ item.odds }}</div>
          </div>
        </template>
      </div>

      <!-- over/under -->
      <div style="height: calc(10rem / 36)" />
      <div class="cl-flexcc cl-market">
        <template
          v-if="
            freeBetInfo.infos &&
            freeBetInfo.infos.match &&
            freeBetInfo.infos.match.markets
          "
        >
          <div
            class="cl-flexcb cl-item"
            :class="[
              { resultItem: isLive && win_OV_15 === item.id },
              selectOutcome && selectOutcome.id === item.id && !isLive
                ? 'cl-oddsButton'
                : 'cl-noOddsButton'
            ]"
            v-for="(item, index) in freeBetInfo.infos.match.markets[1].outcomes"
            :key="index"
            @click="selectItem(freeBetInfo.infos.match.markets[1], item)"
          >
            <div class="cl-left">{{ item.name + ' ' + 1.5 }}</div>
            <div class="cl-right">{{ item.odds }}</div>
          </div>
        </template>
      </div>

      <!-- choosed -->
      <div class="cl-chosenMarket" v-if="isLive">
        <div style="height: calc(10rem / 36)" />
        <div class="cl-item">
          <span class="cl-market">
            {{ $t('virtualFreebet.mybet') }}
            <span style="font-weight: bold">{{
              selectOutcome.marketName
            }}</span>
          </span>
          <span>
            {{ $t('virtualFreebet.pick') }}
            <span style="font-weight: bold">{{
              selectOutcome.name + '@' + selectOutcome.odds
            }}</span>
          </span>
        </div>
      </div>

      <!-- 投注按钮 -->
      <div style="height: calc(28rem / 36)" />
      <div
        class="cl-flexcc cl-lkButton cl-placeBet"
        :class="{ 'cl-placeBetLive': isLive === 1 && !haveFreeBet }"
        @click="goPlaceBet"
      >
        <div class="cl-placeBox">
          <div class="cl-top">
            {{
              !info
                ? $t('virtualFreebet.login')
                : isLive === 2
                ? $t('virtualFreebet.continue')
                : $t('virtualFreebet.place')
            }}
          </div>
          <div
            class="cl-flexcc cl-bottom"
            v-if="
              !isLive &&
              freeBetInfo.infos &&
              freeBetInfo.infos.free_bets.length > 0
            "
          >
            <div class="cl-stake cl-item">
              {{ $t('virtualFreebet.stake') }}
              <span>{{
                $t('unit') + ' ' + freeBetInfo.infos.free_bets[0].amount
              }}</span>
            </div>
            <div class="cl-payout cl-item" v-if="payout">
              | {{ $t('virtualFreebet.payout') }}
              <span>{{ $t('unit') + ' ' + payout }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- freebet -->
      <div style="height: calc(25rem / 36)" />
      <div class="cl-freebet-number">
        <div class="cl-freebets">
          <div class="cl-name">{{ $t('virtualFreebet.myFreebets') }}</div>
          <div class="cl-views" @click="openFreebet">
            <span class="cl-number" v-if="freeBetInfo.meta">{{
              freeBetInfo.meta.amount
            }}</span>
            <span style="text-decoration: underline">{{
              $t('virtualFreebet.view')
            }}</span>
          </div>
          <div class="cl-more" />
        </div>

        <div class="cl-freebets">
          <div>
            {{
              $t('virtualFreebet.number', {
                number: freeBetInfo.meta ? freeBetInfo.meta.left : 10
              })
            }}
          </div>
          <div class="cl-views" @click="goBet">
            <span style="text-decoration: underline">{{
              $t('virtualFreebet.getNow')
            }}</span>
          </div>
          <div class="cl-more" />
        </div>
      </div>
      <div style="height: calc(10rem / 36)" />
    </div>

    <!-- 规则介绍 -->
    <div class="cl-rules">
      <h2 class="cl-h2 cl-title">{{ $t('virtualFreebet.title1') }}</h2>
      <div class="cl-stepList" v-html="$t('virtualFreebet.list1')" />
    </div>

    <div class="cl-rules">
      <h2 class="cl-h2 cl-title">{{ $t('virtualFreebet.title2') }}</h2>
      <div class="cl-stepList" v-html="$t('virtualFreebet.list2')" />
    </div>

    <div class="cl-rules">
      <h2 class="cl-h2 cl-title">{{ $t('virtualFreebet.title3') }}</h2>
      <div class="cl-stepList" v-html="$t('virtualFreebet.list3')" />
    </div>
    <!-- my freebet -->
    <freebetList
      v-if="isFreebetShow"
      @closeFreebet="closeFreebet"
      :free-bet-info="freeBetInfo"
    />
    <prizeModal
      v-if="isPrizeShow"
      @closePrizeModal="closePrizeModal"
      :home_score="home_score"
      :away_score="away_score"
      :win="win"
    />
    <loading v-if="is_requesting" />
  </div>
</template>

<script>
import freebetList from '@/components/components/onebetLeague/freebetList.vue'
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import prizeModal from '@/components/components/onebetLeague/prizeModal.vue'
import loading from '@/components/components/loading.vue'

export default {
  components: {
    freebetList,
    prizeModal,
    loading,
    headBack
  },
  // libi未修改记录
  inject: ['reload'],
  data() {
    return {
      isLive: 0, // 是否是live状态 0未投注，1live过程，2比赛结果
      isFreebetShow: false, // 关闭freebet
      isPrizeShow: false, // 关闭中奖弹出
      freeBetInfo: {}, // freebet 信息
      selectOutcome: null, // 选中outcome内容
      win: 0,
      home_score: 0,
      show_home_score: 0,
      away_score: 0,
      show_away_score: 0,
      is_requesting: false,
      liveInterval: '',
      win_1X2: '',
      win_OV_15: ''
    }
  },
  computed: {
    modal() {
      return this.$store.state.modal
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    stake() {
      if (
        this.freeBetInfo.infos.free_bets &&
        this.freeBetInfo.infos.free_bets.length > 0
      ) {
        return Number(this.freeBetInfo.infos.free_bets[0].amount)
      } else return 100
    },
    payout() {
      if (this.selectOutcome) {
        return (this.stake * (this.selectOutcome.odds - 1)).toFixed(2)
      } else return 0
    },
    // 用户信息
    info() {
      return this.$store.state.info
    },
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    haveFreeBet() {
      return (
        this.freeBetInfo &&
        this.freeBetInfo.infos &&
        this.freeBetInfo.infos.free_bets &&
        this.freeBetInfo.infos.free_bets.length > 0
      )
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  beforeDestroy() {
    clearInterval(this.liveInterval)
  },
  mounted() {
    // 获取用户信息
    if (!this.info) this.getInfo()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    // 请求freebet 信息
    this.reqFreebetInfo()
  },
  methods: {
    // 关闭freebet
    closeFreebet() {
      this.isFreebetShow = false
    },
    // 打开freebet
    openFreebet() {
      this.isFreebetShow = true
    },
    goBet() {
      Lib.common.event_statistics('onebet_League_freebet_getNow_click')
      if (this.$route.query.isBack) return this.$router.back()
      this.$router.push({
        path: `/${this.locale}/onebetLeague`
      })
    },
    // 关闭PrizeModal
    closePrizeModal() {
      this.isPrizeShow = false
    },
    // 请求数据
    reqFreebetInfo() {
      this.$axios_api
        .LeagueSoccerFreebetInfo({ token: this.token })
        .then((res) => {
          if (res.code === 0) this.freeBetInfo = res.data
        })
    },
    // 选择outcome
    selectItem(market, item) {
      this.selectOutcome = item
      this.$set(
        this.selectOutcome,
        'match_id',
        this.freeBetInfo.infos.match.match_id
      )
      this.$set(this.selectOutcome, 'marketId', market.id)
      this.$set(this.selectOutcome, 'marketName', market.name)
    },
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) this.$store.commit('setInfo', res.data)
      })
    },
    // 校验place bet
    goPlaceBet() {
      // 用户是否登录
      if (!this.info) {
        // 未登录提示
        Lib.store.remove('token')
        this.$store.commit('setInfo', null)
        this.$router.push({
          path: `/${this.locale}/login`,
          query: { fromName: this.$route.path }
        })
        return
      }
      // 已投注
      if (this.isLive === 1) return
      else if (this.isLive === 2) return this.reload()
      // 没有freebet
      if (!this.haveFreeBet) {
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('virtualFreebet.stakeEnough'),
          '',
          this.$t('virtualFreebet.later')
        )
        return
      }
      // 没有选择投注项
      if (!this.selectOutcome) return
      // 提交请求
      this.reqPlaceBet()
    },
    // 提交place bet
    reqPlaceBet() {
      this.is_requesting = true
      this.$axios_api
        .LeagueSoccerFreebetBet({
          token: this.token,
          match_id: this.selectOutcome.match_id,
          market_id: this.selectOutcome.marketId,
          outcome_id: this.selectOutcome.id
        })
        .then((res) => {
          this.is_requesting = false
          if (res.code === 0) {
            Lib.common.errorReminder(
              this,
              'virtualFreebet',
              '',
              '',
              this.$t('virtualFreebet.betSuccess'),
              '',
              this.$t('reminder.button.ok')
            )
            // 投注成功消息
            this.isLive = 1
            this.win = res.data.win.toFixed(2)
            this.home_score = res.data.home_score
            this.away_score = res.data.away_score
            // 设置用户金额
            this.$store.commit('setInfo', {
              ...this.info,
              balance: res.data.balance
            })
            // 抵用卷处理
            this.freeBetInfo.meta.amount =
              Number(this.freeBetInfo.meta.amount) -
              Number(this.freeBetInfo.infos.free_bets[0].amount)
            this.freeBetInfo.infos.free_bets.shift()

            // 设置live倒计时
            const modalInterval = setInterval(() => {
              if (this.modal === null) {
                setTimeout(() => {
                  this.win_1X2 = res.data.win_1X2
                  this.win_OV_15 = res.data.win_OV_15
                }, 3000)
                this.liveCount()
                clearInterval(modalInterval)
              }
            }, 200)
          } else {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              res.msg,
              '',
              this.$t('reminder.button.ok')
            )
          }
        })
    },
    // live倒计时
    liveCount() {
      let index = 0
      this.liveInterval = setInterval(() => {
        index++
        // 第三秒处理
        this.show_home_score = parseInt((index / 6) * this.home_score + 0.4)
        this.show_away_score = parseInt((index / 6) * this.away_score)

        if (index >= 6) {
          clearInterval(this.liveInterval)
          setTimeout(() => {
            if (parseInt(this.win)) this.isPrizeShow = true
          }, 2000)
          this.show_home_score = this.home_score
          this.show_away_score = this.away_score
          this.isLive = 2
        }
      }, 500)
    }
  }
}
</script>

<style scoped lang="less">
.cl-onebetLeague-freebet-wrap {
  min-height: 100vh;
  background-color: #fff;

  .cl-freebet-content {
    position: relative;
    color: #fff;
    font-weight: bold;
    background-color: @mainThemeColor;
    &.cl-live {
      background-color: #251e4f;
    }
    height: 113rem/36;
    .cl-width {
      width: 340rem/36;
      height: 113rem/36;
      .cl-top-name {
        font-size: 10rem/36;
        opacity: 0.8;
        text-align: center;
      }
      .cl-teamName {
        font-size: 10rem/36;
      }
      .cl-logoBox {
        width: 37rem/36;
        height: 37rem/36;
        border-radius: 50%;
        background-color: #fff;
        margin: 0 auto 8rem/36;

        .no-icon1 {
          .sprite(@league-1, 72rem);
        }

        .no-icon2 {
          .sprite(@league-2, 72rem);
        }

        .no-icon3 {
          .sprite(@league-3, 72rem);
        }

        .no-icon4 {
          .sprite(@league-4, 72rem);
        }

        .no-icon5 {
          .sprite(@league-5, 72rem);
        }

        .no-icon6 {
          .sprite(@league-6, 72rem);
        }

        .no-icon7 {
          .sprite(@league-7, 72rem);
        }

        .no-icon8 {
          .sprite(@league-8, 72rem);
        }

        .no-icon9 {
          .sprite(@league-9, 72rem);
        }

        .no-icon10 {
          .sprite(@league-10, 72rem);
        }

        .no-icon11 {
          .sprite(@league-11, 72rem);
        }

        .no-icon12 {
          .sprite(@league-12, 72rem);
        }

        .no-icon13 {
          .sprite(@league-13, 72rem);
        }

        .no-icon14 {
          .sprite(@league-14, 72rem);
        }

        .no-icon15 {
          .sprite(@league-15, 72rem);
        }

        .no-icon16 {
          .sprite(@league-16, 72rem);
        }

        .no-icon17 {
          .sprite(@league-17, 72rem);
        }

        .no-icon18 {
          .sprite(@league-18, 72rem);
        }

        .no-icon19 {
          .sprite(@league-19, 72rem);
        }

        .no-icon20 {
          .sprite(@league-20, 72rem);
        }
      }
    }

    .cl-middle {
      font-size: 22rem/36;
      margin: 0 35rem/36;
    }
  }

  .cl-liveBox {
    position: absolute;
    top: 7rem/36;
    left: 9rem/36;
    .sprite(@ticon-is-live, 108rem);
  }

  .cl-betBox {
    margin: 20rem/36 10rem/36 0;
    border-bottom: 0.1rem/36 solid #c1cbd5;
    font-size: 11rem/36;

    .cl-market {
      height: 33rem/36;
      .cl-item {
        margin-right: 4rem/36;
        flex: 1;
        box-sizing: border-box;
        padding: 10rem/36;

        &.cl-resultItem {
          background-color: #03c382;
          color: #fff;
        }
      }

      .cl-item:last-child {
        margin-right: 0;
      }
    }

    .cl-chosenMarket {
      .cl-item {
        color: #363636;
        font-size: 10rem/36;

        .cl-market {
          padding-right: 8rem/36;
        }
      }
    }

    .cl-placeBet {
      height: 47rem/36;
      text-align: center;
      border-radius: 3rem/36;

      &.cl-placeBetLive {
        opacity: 0.7 !important;
      }

      .cl-placeBox {
        .cl-top {
          font-size: 13rem/36;
          font-weight: bold;
        }

        .cl-bottom {
          padding-top: 5rem/36;
          font-size: 11rem/36;

          .cl-item {
            span {
              font-weight: bold;
            }

            &.cl-stake {
              margin-right: 4rem/36;
            }
          }
        }
      }
    }

    .cl-placeBet:active {
      opacity: 0.8;
    }

    .cl-freebet-number {
      padding: 0 8rem/36;

      .cl-freebets {
        color: #363636;
        padding: 3rem/36 0;
        font-size: 10rem/36;

        > div {
          display: inline-block;
        }

        .cl-name {
          font-size: 11rem/36;
        }

        .cl-views {
          color: @mainThemeColor;

          .cl-number {
            font-weight: bold;
            font-size: 11rem/36;
            margin: 0 3rem/36;
          }
        }

        .cl-more {
          margin-bottom: -5rem/36;
          margin-left: -5rem/36;
          transform: rotate(180deg);
          .sprite(@icon-back-blue, 72rem);
        }
      }
    }
  }

  .cl-rules {
    color: #000;
    padding: 21rem/36 10rem/36 0;

    .cl-title {
      font-size: 13rem/36;
      font-weight: 800;
    }

    .cl-stepList {
      font-size: 12rem/36;
      margin-top: 7rem/36;
      opacity: 0.6;
      line-height: 15rem/36;
    }
  }

  .cl-rules:last-child {
    padding-bottom: 2rem;
  }
}
</style>
