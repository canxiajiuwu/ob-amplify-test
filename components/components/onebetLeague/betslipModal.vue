<template>
  <div class="cl-betslipModal-wrap">
    <div class="cl-flexcb cl-top">
      <div class="cl-flexcc cl-left">
        <div class="cl-flexcc cl-num">{{ tickets.length }}</div>
        <div class="cl-result">{{ $t('betslipBack.back') }}</div>
      </div>
      <div class="cl-icon" @click="visibleBetslip" />
    </div>

    <div class="cl-bottom cl-betslipSuccess-wrap" v-if="isBetslipSuccess">
      <div class="cl-topSuccess">
        <div class="cl-icon">
          <img src="@/assets/images/general/notSprites/betslipBox/check.png" />
        </div>
        <div style="height: calc(16rem / 36)" />
        <div class="cl-word">{{ $t('betslipSuccess.betSuccessful') }}</div>
        <div style="height: calc(10rem / 36)" />
        <div class="cl-progress" v-if="round !== 5">
          <div class="cl-line" :style="{ width: lineWidth }" />
          <div class="cl-number">{{ total - left }}/{{ total }}</div>
        </div>
        <div class="cl-progressLine" v-if="round !== 5">
          <span v-if="left">{{
            $t('virtualFreebet.betslip1', { number: left })
          }}</span>
          <span
            v-else
            @click="goFreebet"
            v-html="$t('virtualFreebet.betslip2')"
          />
        </div>
      </div>

      <div class="cl-bottomBox">
        <div style="height: calc(10rem / 36)" />
        <div class="cl-listBox">
          <div class="cl-flexcb cl-row">
            <div class="cl-left">{{ $t('betslipSuccess.bet_id') }}</div>
            <div class="cl-right cl-light">{{ '#' + ticketId }}</div>
          </div>

          <div class="cl-flexcb cl-row">
            <div class="cl-left">{{ $t('accountMybetDetailBox.type') }}</div>
            <div class="cl-right">Onebet League</div>
          </div>

          <div class="cl-flexcb cl-row">
            <div class="cl-left">{{ $t('betslipSuccess.payment') }}</div>
            <div class="cl-right">
              {{ totalStake ? Number(totalStake).toFixed(2) : totalStake }}
            </div>
          </div>

          <div class="cl-flexcb cl-row">
            <div class="cl-left">{{ $t('betslipSuccess.payout') }}</div>
            <div class="cl-right">{{ finalPayoutData.toFixed(2) }}</div>
          </div>
        </div>

        <div style="height: calc(30rem / 36)" />
        <div class="cl-flexcc cl-lkButton cl-button" @click="continueFun">
          {{ $t('betslipSuccess.continue') }}
        </div>
        <div style="height: calc(15rem / 36)" />
        <div class="cl-check" @click="goHistory">
          {{ $t('betslipSuccess.check') }}
        </div>
        <div style="height: calc(15rem / 36)" />
      </div>
    </div>

    <div class="cl-flexcb cl-bottom cl-betslipBox-wrap" v-else>
      <div class="cl-dList">
        <div class="cl-list">
          <div class="cl-flexcb cl-clearBetslip" v-if="tickets.length > 0">
            <div class="cl-flexcs cl-left" @click="clearBetslip">
              <div class="cl-icon" />
              <div class="cl-name">{{ $t('betslipBack.clear') }}</div>
            </div>
          </div>

          <div class="cl-flexcb cl-item" v-for="(a, b) in tickets" :key="b">
            <div class="cl-flexcc cl-closeIcon" @click="clearOne(a)">
              <div class="cl-icon" />
            </div>
            <div class="cl-right">
              <div class="cl-team">
                {{
                  a.home_name +
                  ' ' +
                  $t('betslipMarketList.vs') +
                  ' ' +
                  a.away_name
                }}
              </div>
              <div class="cl-flexcb cl-bottom">
                <div class="cl-market" v-if="markets">
                  {{ markets[a.market_id] }}-{{ a.outcome_name }}
                </div>
                <div class="cl-odds">{{ a.odds }}</div>
              </div>
            </div>
          </div>

          <div style="height: calc(30rem / 36)" />
        </div>
      </div>

      <div class="cl-betslipBox" v-if="tickets.length > 0">
        <div class="cl-width">
          <div class="cl-flexcb cl-stakeInputBox">
            <div class="cl-inl">{{ $t('betslipPlaceBet.stake') }}</div>
            <input
              type="number"
              :placeholder="`Min.${
                $store.state.root.country === 'ug' ? 200 : 50
              }`"
              v-model="stake"
              @change="inputChange"
            />
            <div class="cl-hb">{{ hb }}</div>
          </div>
          <div style="height: calc(10rem / 36)" />
          <div class="cl-flexcb cl-second">
            <div class="cl-left">{{ $t('betslipPlaceBet.total') }}</div>
            <div class="cl-right">{{ oddsCount.toFixed(2) }}</div>
          </div>
          <div style="height: calc(7rem / 36)" />
          <div class="cl-flexcb cl-third">
            <div class="cl-left">{{ $t('betslipPlaceBet.payout') }}</div>
            <div class="cl-right">{{ finalPayout.toFixed(2) }}</div>
          </div>
        </div>
        <div
          class="cl-flexcc cl-lkButton cl-placeBox"
          :class="{ 'cl-isButtonCanNotUse': isButtonCanNotUse }"
          @click="placeBet"
        >
          <div class="cl-title">{{ $t('betslipPlaceBet.place') }}</div>
          <div class="cl-loadEffect" v-if="isLoadingShow">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: ['league_id', 'markets'],
  data() {
    return {
      // 投注金额
      stake: 500,
      isLoadingShow: 0,
      canPlaceBet: 1,
      // 按钮是否可以点击状态
      isButtonCanNotUse: 1,
      isBetslipSuccess: 0,
      ticketId: '',
      totalStake: 0,
      finalPayoutData: 0,
      left: 10,
      total: 10,
      round: 1,
      activityStake: Lib.store.get('onebetLeagueActivityStake')
    }
  },
  computed: {
    // 货币
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    },
    tickets() {
      return this.$store.state.onebetLeagueTickets[this.league_id] || []
    },
    oddsCount() {
      let odds = 1
      for (let i = 0, len = this.tickets.length; i < len; i++)
        odds *= this.tickets[i].odds
      return odds
    },
    // 订单真实到账额度
    finalPayout() {
      const stake = Number(this.stake) || 0
      return stake * this.oddsCount
    },
    info() {
      return this.$store.state.info
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    NormalMinStake() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .NormalMinStake
    },
    defaultStake() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .defaultStake
    },
    lineWidth() {
      return ((this.total - this.left) / this.total) * 100 + '%'
    }
  },
  beforeMount() {
    if (!this.info && this.token) this.getInfo()
    else this.isButtonCanNotUse = 0
  },
  mounted() {
    const as = this.activityStake
    this.stake = as ? Math.max(as || 0, this.NormalMinStake) : this.defaultStake
  },
  methods: {
    inputChange() {
      this.activityStake && Lib.store.remove('onebetLeagueActivityStake')
    },
    // 删除当前tickets
    clearBetslip() {
      const newTicketsObj = {
        ...this.$store.state.onebetLeagueTickets,
        [this.league_id]: []
      }
      Lib.store.set('onebetLeagueTickets', newTicketsObj)
      this.$store.commit('setOnebetLeagueTickets', newTicketsObj)
    },
    // 删除一个
    clearOne(item, deleted) {
      const newTickets = this.tickets.filter(
        (li) => item.match_id != li.match_id
      )
      const newTicketsObj = {
        ...this.$store.state.onebetLeagueTickets,
        [this.league_id]: newTickets
      }
      Lib.store.set('onebetLeagueTickets', newTicketsObj)
      this.$store.commit('setOnebetLeagueTickets', newTicketsObj)
      if (deleted) this.$emit('clearExpireTickets')
    },
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          this.$store.commit('savePhoneNumber', res.data.mobile)
          this.isButtonCanNotUse = 0
        }
      })
    },
    // 投注
    placeBet() {
      Lib.common.event_statistics(`onebet_League_place_bet_click`)
      // 判断是否在查看ticket状态
      if (this.isLoadingShow || !this.canPlaceBet) return
      // 投注金额限制
      if (this.stake < this.NormalMinStake) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('reminder.minimumStake', { limit: this.NormalMinStake }),
          0
        )
        this.canPlaceBet = 1
        return
      }
      // 未登录
      if (!this.info) {
        this.canPlaceBet = 1
        Lib.store.remove('token')
        this.$store.commit('setInfo', null)
        Lib.common.errorReminder(
          this,
          'login',
          '',
          '',
          this.$t('reminder.unLogin'),
          '',
          this.$t('reminder.button.ok')
        )
        return
      }
      // 余额不足
      if (this.stake > this.info.balance) {
        this.canPlaceBet = 1
        Lib.common.errorReminder(
          this,
          '',
          '',
          this.$t('betslipPlaceBet.betReminder1.title'),
          this.$t('betslipPlaceBet.betReminder1.msg'),
          this.$t('betslipPlaceBet.betReminder1.confirmButtonText'),
          this.$t('betslipPlaceBet.betReminder1.cancelButtonText'),
          () => this.depositComTriggle(true)
        )
        return
      }
      this.confirmBet()
    },
    depositComTriggle(bool) {
      this.$store.commit('setFepositComShow', bool)
    },
    // 确认投注
    confirmBet() {
      this.canPlaceBet = 0
      this.isLoadingShow = 1
      this.$axios_api
        .LeagueSoccerBet({
          token: this.token,
          amount: Number(this.stake),
          data: JSON.stringify(this.tickets)
        })
        .then((res) => {
          this.canPlaceBet = 1
          this.isLoadingShow = 0
          const { code, data } = res
          if (code === 0) {
            Lib.common.event_statistics(`onebet_League_place_bet_success`)
            this.getInfo()
            this.ticketId = data.id
            this.totalStake = this.stake
            this.finalPayoutData = data.win_expected || this.finalPayout
            this.stake = 500
            const {
              total = 10,
              left_count = 10,
              reward = 1
            } = data.free_bets_info
            this.total = total
            this.left = left_count
            if (left_count == 10) this.$emit('goHistory', 'freebetNumber')
            this.round = reward
            this.clearBetslip()
            this.$nextTick(() => (this.isBetslipSuccess = 1))
            this.activityStake && Lib.store.remove('onebetLeagueActivityStake')
            window.obTimeLimitedActivityGetEventInfo &&
              window.obTimeLimitedActivityGetEventInfo()
          } else if (code === 10002) {
            // 过期
            this.clearOne(data, 1)
            Lib.common.errorReminderUp(
              this,
              true,
              this.$t('reminder.expired'),
              0
            )
          }
        })
        .catch((err) => console.log(err))
    },
    // 关闭betlsip
    visibleBetslip() {
      this.$emit('visibleBetslip', false)
    },
    // 继续投注
    continueFun() {
      Lib.common.event_statistics(`onebet_League_continue_bet_click`)
      this.visibleBetslip()
    },
    // 前往订单详情
    goHistory() {
      Lib.common.event_statistics(`onebet_League_betslip_history_click`)
      this.visibleBetslip()
      this.$emit('goHistory', this.ticketId)
    },
    // 前往freebet
    goFreebet() {
      Lib.common.event_statistics(`onebet_League_freebet_click`)
      this.$router.push({
        path: `/${this.$store.state.root.locale}/onebetLeague-freebet`
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipModal-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .cl-top {
    height: 33rem/36;
    background-color: #1c2029;
    box-sizing: border-box;
    padding: 0 10rem/36;

    .cl-left {
      .cl-num {
        width: 23rem/36;
        height: 23rem/36;
        background-color: #fdd806;
        border-radius: 50%;
        color: #363636;
        font-weight: bold;
        font-size: 13rem/36;
        margin-right: 3rem/36;
      }

      .cl-result {
        font-size: 10rem/36;
        font-weight: bold;
        color: #fff;
      }
    }

    .cl-icon {
      .sprite(@icon-closewhite, 360rem);
    }
  }
  .cl-bottom {
    flex: 1;
    &.cl-betslipBox-wrap {
      flex-direction: column;
      .cl-dList {
        flex: 1;
        width: 100%;
        position: relative;
      }
      .cl-list {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        overflow-y: auto;
        .cl-clearBetslip {
          padding: 6rem/36 10rem/36;
          height: 20rem/36;

          .cl-left {
            .cl-icon {
              .sprite(@icon-clear, 108rem);
            }

            .cl-name {
              margin-left: 6rem/36;
              font-size: 9rem/36;
              font-weight: 400;
              color: #363636;
            }
          }
        }
        .cl-item {
          padding: 10rem/36;
          padding-left: 0;
          border-bottom: 0.5rem/36 solid @betslipLineColor;

          .cl-closeIcon {
            width: 40rem/36;
            .cl-icon {
              .sprite(@ticon-black-close, 108rem);
            }
          }

          .cl-right {
            flex: 1;
            .cl-bottom {
              margin-top: 7rem/36;
            }
          }
        }
      }
      .cl-betslipBox {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        box-shadow: 0 -1rem/36 7rem/36 0 rgba(0, 0, 0, 0.24);
        color: #333;
        font-size: 13rem/36;
        font-weight: bold;
        .cl-width {
          padding: 10rem/36;
          .cl-stakeInputBox {
            height: 39rem/36;
            padding: 0 10rem/36;
            background-color: #f4f4f4;
            border-radius: 6rem/36;
            font-weight: bold;
            border: 0.5rem/36 solid #e9e9f3;
            box-sizing: border-box;
            .cl-inl {
              margin-right: 10rem/36;
            }
            .cl-hb {
              font-weight: 400;
              margin-left: 10rem/36;
            }
            input {
              flex: 1;
              background-color: #f4f4f4;
              border: none;
              outline: none;
              padding: 0;
              height: 39rem/36;
              text-align: right;
            }
          }
          .cl-second {
            .cl-left {
              font-weight: 400;
              color: #74747c;
            }
          }
          .cl-third {
            .cl-left {
              font-weight: 400;
              color: #74747c;
            }
          }
        }
        .cl-placeBox {
          height: 47rem/36;
          flex-direction: column;
          position: relative;
          border-radius: 0;
          &.cl-isButtonCanNotUse {
            opacity: 0.7;
          }
          .cl-loadEffect {
            width: 1.38889rem;
            height: 1.38889rem;
            position: absolute;
            right: 50rem/36;
            top: 0;
            transform: scale(0.6);
          }
          .loadEffect span {
            display: inline-block;
            width: 0.27778rem;
            height: 0.27778rem;
            border-radius: 50%;
            background: #ededed;
            position: absolute;
            animation: load 1.04s ease infinite;
          }
          @keyframes load {
            0% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(0.3);
              opacity: 0.5;
            }
          }
          .loadEffect span:nth-child(1) {
            left: 0;
            top: 50%;
            margin-top: -0.13889rem;
            animation-delay: 0.13s;
          }
          .loadEffect span:nth-child(2) {
            left: 0.19444rem;
            top: 0.19444rem;
            animation-delay: 0.26s;
          }
          .loadEffect span:nth-child(3) {
            left: 50%;
            top: 0;
            margin-left: -0.13889rem;
            animation-delay: 0.39s;
          }
          .loadEffect span:nth-child(4) {
            top: 0.19444rem;
            right: 0.19444rem;
            animation-delay: 0.52s;
          }
          .loadEffect span:nth-child(5) {
            right: 0;
            top: 50%;
            margin-top: -0.13889rem;
            animation-delay: 0.65s;
          }
          .loadEffect span:nth-child(6) {
            right: 0.19444rem;
            bottom: 0.19444rem;
            animation-delay: 0.78s;
          }
          .loadEffect span:nth-child(7) {
            bottom: 0;
            left: 50%;
            margin-left: -0.19444rem;
            animation-delay: 0.91s;
          }
          .loadEffect span:nth-child(8) {
            bottom: 7rem/36;
            left: 7rem/36;
            animation-delay: 1.04s;
          }
        }
      }
    }
    &.cl-betslipSuccess-wrap {
      position: absolute;
      width: 10rem;
      box-sizing: border-box;
      padding: 0 10rem/36;
      top: 33rem/36;
      bottom: 0;

      .cl-topSuccess {
        border-bottom: 0.5rem/36 solid #e9e9f3;
        padding-top: 15rem/36;
        text-align: center;

        .cl-icon {
          img {
            width: 80rem/36;
            height: 80rem/36;
          }
        }

        .cl-word {
          font-weight: 800;
          color: #363636;
          font-size: 11rem/36;
        }

        .cl-progress {
          position: relative;
          overflow: hidden;
          width: 177rem/36;
          height: 13rem/36;
          border-radius: 7rem/36;
          background-color: #e5e5e5;
          margin: 0 auto;

          .cl-line {
            border-top-left-radius: 7rem/36;
            border-bottom-left-radius: 7rem/36;
            background-color: #fdd806;
            height: 13rem/36;
          }

          .cl-number {
            position: absolute;
            width: 177rem/36;
            height: 13rem/36;
            line-height: 13rem/36;
            text-align: center;
            font-size: 8rem/36;
            color: #000;
            left: 0;
            top: 0;
          }
        }

        .cl-progressLine {
          padding: 7rem/36 0 10rem/36;
          text-align: center;
          font-size: 10rem/36;
          color: #333;
          font-weight: 400;
        }
      }

      .cl-bottomBox {
        width: 300rem/36;
        margin: 0 auto;

        .cl-listBox {
          .cl-row {
            padding: 2rem/36 0;
            color: #939695;
            font-size: 11rem/36;
            font-weight: 400;

            .cl-giftIcon {
              margin-right: 5rem/36;
              .sprite(@icon-betslip-gift, 108rem);
            }

            .cl-right {
              color: #000;
              font-weight: bold;

              &.cl-light {
                color: #939695;
                font-weight: 400;
              }
            }

            &.cl-total {
              padding-top: 15rem/36;
            }

            &.cl-gift {
              font-weight: bold;
              color: #e82010;

              .cl-right {
                color: #e82010;
              }
            }
          }
        }

        .cl-button {
          height: 40rem/36;
          font-size: 13rem/36;
        }

        .cl-button:active {
          opacity: 0.8;
        }

        .cl-check {
          display: block !important;
          text-align: center;
          text-decoration: underline;
          color: @mainThemeColor;
          font-size: 11rem/36;
        }
      }
    }
  }
}
</style>
