<template>
  <div class="cl-footMenu-wrap">
    <div v-if="CL.length" class="cl-indexCardShadow cl-cashoutBox">
      <div class="cl-item" v-for="(a, b) in CL" :key="a ? a.auto_id : b">
        <template v-if="a">
          <div class="cl-flexcb cl-itemTop">
            <div class="cl-betId">
              {{ $t('betslipPlaceBet.bet') + ' #' + a.auto_id }}
            </div>
            <div>
              {{ $t('onebetLeague.toWin') + ' ' + abs(a.win_expected) }}
            </div>
          </div>
          <div class="cl-flexcb cl-itemMiddle">
            <div class="cl-time">
              {{ getDate(a.created_at, 'dd/MM,HH:mm') }}
            </div>
            <div>
              {{
                $t('virtualFreebet.stake') +
                ' ' +
                $t('units') +
                abs(a.bet_amount)
              }}
            </div>
          </div>
          <div class="cl-flexcb cl-itemBottom">
            <div class="cl-flexcc cl-openBox" @click="goHistory(a.auto_id)">
              <div>{{ $t('betslipApp.open') }}</div>
              <div class="cl-icon" />
            </div>
            <div
              class="cl-cashout"
              :class="{ 'cl-canCash': a.cash_status === 0 && a.status === 0 }"
              @click="
                a.cash_status === 0 && a.status === 0
                  ? toCashout(a.auto_id)
                  : ''
              "
            >
              {{ $t('onebetLeague.cashout') }}
            </div>
          </div>
          <CollapseTransition>
            <div
              v-if="showCashoutIndex === a.auto_id"
              class="cl-cashoutContent"
            >
              <template v-if="showCashoutData">
                <div class="cl-flexcb cl-cTop">
                  <div class="cl-flexcc">
                    <div>{{ $t('onebetLeague.batc') }}</div>
                    <div class="cl-icon" @click="visibleRules" />
                  </div>
                  <div @click="cashoutAmount = showCashoutData.MaxCash">
                    {{ abs(showCashoutData.MaxCash) }}
                  </div>
                </div>
                <div
                  class="cl-flexcb cl-cMiddle"
                  :class="{ 'cl-canNoClick': clcanClick }"
                >
                  <div class="cl-word">{{ $t('onebetLeague.cashout') }}</div>
                  <input
                    type="number"
                    :placeholder="'Min.' + showCashoutData.MinCash"
                    v-model="cashoutAmount"
                  />
                </div>
                <div
                  class="cl-flexcs cl-ra"
                  :class="{ 'cl-canNoClick': clcanClick }"
                >
                  <template v-if="clcanClick">
                    {{
                      cashoutAmount > showCashoutData.MaxCash
                        ? `Must be less than ${abs(showCashoutData.MaxCash)}`
                        : cashoutAmount < showCashoutData.MinCash
                        ? `Must be greater than ${showCashoutData.MinCash}`
                        : ''
                    }}
                  </template>
                  <template v-else>
                    <div class="cl-restWord">{{ $t('onebetLeague.ra') }}</div>
                    <div>
                      {{
                        abs(
                          ((showCashoutData.MaxCash - cashoutAmount) / 10) * 11
                        )
                      }}
                    </div>
                  </template>
                </div>
                <div
                  class="cl-flexcc cl-buttonBox cl-lkButton"
                  :class="{
                    'cl-canNoClick':
                      clcanClick || showCashoutData.Expire <= nowTime
                  }"
                  @click="
                    showCashoutData.Expire <= nowTime
                      ? toCashout(a.auto_id, 1)
                      : cashoutA(a.auto_id, showCashoutData.MaxCash)
                  "
                >
                  <div class="cl-cashWord">
                    <template v-if="showCashoutData.Expire <= nowTime"
                      >Request Cashout</template
                    >
                    <template v-else>{{
                      $t('onebetLeague.cashout') +
                      ' ' +
                      $t('units') +
                      abs(Number(cashoutAmount))
                    }}</template>
                    <div v-if="isRefresh" class="cl-loadIcon" />
                  </div>
                </div>
                <div class="cl-flexcc cl-timeWord">
                  <template v-if="showCashoutData.Expire <= nowTime">{{
                    $t('onebetLeague.coe')
                  }}</template>
                  <template v-else>{{
                    parseInt(showCashoutData.Expire - nowTime) +
                    's ' +
                    $t('onebetLeague.remaining')
                  }}</template>
                </div>
              </template>
              <dataLoading v-else />
            </div>
          </CollapseTransition>
        </template>
      </div>
      <div style="height: calc(30rem / 36)" />
    </div>
    <div
      v-show="tickets.length"
      class="cl-flexcb cl-bsbb cl-footMenu"
      @click="visibleBetslip"
    >
      <div class="cl-flexcc cl-left">
        <div class="cl-flexcc cl-num">{{ tickets.length }}</div>
        <div class="cl-betslip">{{ $t('footerMenu.betslip') }}</div>
        <div class="cl-total">{{ $t('footerMenu.total') }}</div>
        <div class="cl-odds">{{ totalOdds }}</div>
      </div>
      <div class="cl-icon" />
    </div>

    <!-- betslip 下注框 -->
    <drawer
      :visible.sync="betslipVisible"
      type="bottom"
      :height="(pDom ? pDom.clientHeight : 556) / 36"
      :z-index="4"
      :mask-click="false"
    >
      <betslipModal
        :league_id="league_id"
        @clearExpireTickets="$emit('clearExpireTickets')"
        :markets="markets"
        @visibleBetslip="visibleBetslip"
        @goHistory="goHistory"
      />
    </drawer>
    <!-- 规则 -->
    <drawer
      :visible.sync="rulesVisible"
      type="bottom"
      :height="396 / 36"
      :z-index="4"
    >
      <cashoutRules @visibleRules="visibleRules" />
    </drawer>
    <successPop ref="successPop" />
  </div>
</template>

<script>
import successPop from './successPop.vue'
import betslipModal from './betslipModal.vue'
import cashoutRules from './cashoutRules.vue'
import Lib from '@/assets/js/Lib'

export default {
  components: {
    CollapseTransition: Lib.common.CollapseTransition,
    successPop,
    betslipModal,
    cashoutRules
  },
  props: ['league_id', 'nowTime', 'pDom', 'markets', 'cashoutList', 'pData'],
  data() {
    return {
      betslipVisible: false, // 订单弹窗开关
      showCashoutData: null, // cashout数据
      showCashoutIndex: null, // cashout列表展开的当前项
      cashoutAmount: 0, // 用户cashout金额
      isRefresh: 0, // cashout数据是否在刷新
      rulesVisible: false // 规则弹窗开关
    }
  },
  computed: {
    // cashoutList输入框提示
    clcanClick() {
      if (!this.showCashoutData) return 0
      return (
        this.cashoutAmount < this.showCashoutData.MinCash ||
        this.cashoutAmount > this.showCashoutData.MaxCash
      )
    },
    // 处理后显示的cashoutList
    CL() {
      // 可以cashout并且获得金额较大者靠前
      // eslint-disable-next-line vue/no-mutating-props
      return this.cashoutList.sort((a, b) => {
        if (
          a.cash_status === 0 &&
          a.status === 0 &&
          a.win_expected > b.win_expected
        )
          return -1
        else if (a.win_expected <= b.win_expected) return 0
        else return 1
      })
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    tickets() {
      return this.$store.state.onebetLeagueTickets[this.league_id] || []
    },
    totalOdds() {
      let odds = 1
      for (let i = 0, len = this.tickets.length; i < len; i++)
        odds *= this.tickets[i].odds
      return odds.toFixed(2)
    }
  },
  watch: {
    pData() {
      // 切换期数,重置
      this.cashInit()
    },
    nowTime(val) {
      // 时间到期关闭弹窗
      if (this.showCashoutData) {
        const time = this.showCashoutData.Expire - val
        const fn = this.$store.state.modal
          ? this.$store.state.modal.solidButtonCall
          : ''
        if (
          time < 0 &&
          Object.prototype.toString.call(fn) === '[object Function]'
        ) {
          this.$store.commit('Modal', null)
        }
      }
    }
  },
  methods: {
    // 跳转至mybet 详情页
    goHistory(id) {
      this.$emit('goHistory', id)
    },
    // cashout数据重置
    cashInit() {
      this.showCashoutData = null
      this.showCashoutIndex = null
      this.isRefresh = 0
    },
    // 弹出cashout弹窗
    cashoutA(id, maxNum) {
      if (this.clcanClick) return
      const amount = this.cashoutAmount
      const restNum = this.abs(((maxNum - this.cashoutAmount) / 10) * 11)
      let str = this.$t('onebetLeague.strObj[0]', { amount, restNum })
      if (this.cashoutAmount == maxNum)
        str = this.$t('onebetLeague.strObj[1]', { amount })
      // 给按钮加上的回调
      const cashoutFn = () => {
        this.$store.commit('changeLoadingStatus', true)
        this.$axios_api
          .LeagueSoccerCashoutCash({
            token: this.token,
            ticket_id: id,
            cash_money: Number(this.cashoutAmount)
          })
          .then((res) => {
            this.$store.commit('changeLoadingStatus', false)
            // 成功
            if (res.code === 0) {
              // 成功消息弹窗
              this.$refs.successPop.add({
                title: this.$t('onebetLeague.sct'),
                content: this.$t('onebetLeague.scs')
              })
              // 数据清空
              this.cashInit()
              // 动画结束重新排序
              setTimeout(() => this.$emit('cashListR', id), 300)
            }
            // 失败
            else Lib.common.errorReminderUp(this, true, res.msg, 0)
          })
          .catch(() => {
            this.$store.commit('changeLoadingStatus', false)
            Lib.common.errorReminderUp(
              this,
              true,
              this.$t('reminder.networkError'),
              0
            )
          })
      }

      // 弹窗提示
      Lib.common.errorReminder(
        this,
        '',
        '',
        this.$t('onebetLeague.co'),
        str,
        this.$t('onebetLeague.cashout'),
        this.$t('commonModal.cancel'),
        cashoutFn,
        null
      )
    },
    // 展开cashout窗口
    toCashout(ticket_id, other) {
      if (this.showCashoutIndex === ticket_id && !other)
        this.showCashoutIndex = null
      else {
        this.showCashoutIndex = ticket_id
        this.isRefresh = 1
        this.$axios_api
          .LeagueSoccerCashoutOffer({ token: this.token, ticket_id })
          .then((res) => {
            this.isRefresh = 0
            const { code, data, msg } = res
            if (code === 0) {
              this.showCashoutData = data
              // 刷新不重置默认金额
              if (!other)
                this.cashoutAmount = Number(Number(data.MaxCash).toFixed(2))
            } else {
              this.cashInit()
              Lib.common.errorReminderUp(this, true, msg, 0)
            }
          })
          .catch(() => {
            this.isRefresh = 0
            Lib.common.errorReminderUp(
              this,
              true,
              this.$t('reminder.networkError'),
              0
            )
          })
      }
    },
    // betslip弹窗开关
    visibleBetslip() {
      this.betslipVisible = !this.betslipVisible
      if (!this.betslipVisible) this.$emit('getCashoutList')
      else Lib.common.event_statistics(`onebet_League_open_betslip`)
    },
    // cashout Rules开关
    visibleRules() {
      this.rulesVisible = !this.rulesVisible
    },
    // 金额格式化
    abs(num) {
      return Lib.common.abs(num)
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    }
  }
}
</script>

<style scoped lang="less">
.cl-footMenu-wrap {
  position: fixed;
  width: 10rem;
  bottom: 0;
  z-index: 1;
  .cl-footMenu {
    height: 47rem/36;
    padding: 0 10rem/36;
    box-shadow: 0 1rem/36 4rem/36 0 rgba(206, 206, 222, 1),
      0 1rem/36 4rem/36 0 rgba(206, 206, 222, 1);
    background-color: #fff;

    .cl-left {
      font-weight: 400;
      font-size: 13rem/36;
      color: #000;

      .cl-num {
        width: 30rem/36;
        height: 30rem/36;
        background-color: #fdd806;
        border-radius: 50%;
        color: #363636;
        margin-right: 6rem/36;
        font-size: 13rem/36;
        font-weight: bold;
      }

      .cl-betslip {
        margin-right: 7rem/36;
      }

      .cl-total {
        font-size: 10rem/36;
        color: #a2a2a7;
      }

      .cl-odds {
        margin-left: 5rem/36;
        font-weight: bold;
      }
    }

    .cl-icon {
      .sprite(@icon-black-right, 108rem);
    }
  }
  .cl-cashoutBox {
    max-height: 243rem/36;
    overflow-y: auto;
    background-color: #fff;
    font-size: 13rem/36;
    color: #000;

    .cl-item {
      padding: 10rem/36;
      border-top: 0.5rem/36 solid #e9e9f3;
      .cl-itemTop {
        margin-bottom: 4rem/36;
        .cl-betId {
          text-transform: uppercase;
        }
      }
      .cl-itemMiddle {
        margin-bottom: 10rem/36;
        .cl-time {
          font-size: 11rem/36;
          color: #a2a2a7;
        }
      }
      .cl-itemBottom {
        .cl-openBox {
          text-transform: lowercase;
          .cl-icon {
            margin-left: 1rem/36;
            .sprite(@icon-black-right, 147rem);
          }
        }
        .cl-cashout {
          color: #a2a2a7;
          &.cl-canCash {
            color: @mainThemeColor;
          }
        }
      }
      .cl-cashoutContent {
        padding: 20rem/36 0 0;
        .cl-cTop {
          .cl-icon {
            margin-left: 4rem/36;
            .sprite(@ticon-sigh-grey, 108rem);
          }
        }
        .cl-cMiddle {
          font-size: 15rem/36;
          font-weight: bold;
          margin: 8rem/36 0 6rem/36;
          border: 0.5rem/36 solid #e9e9f3;
          background-color: #f4f4f4;
          border-radius: @mainButtonRadius;
          height: 39rem/36;
          padding: 0 10rem/36;
          input {
            margin-left: 10rem/36;
            flex: 1;
            text-align: right;
            padding: 0;
            border: 0;
            outline: none;
            background-color: transparent;
          }
          input::placeholder {
            font-size: 15rem/36;
          }
          &.cl-canNoClick {
            border-color: #f73a5f;
          }
        }
        .cl-ra {
          .cl-restWord {
            margin-right: 6rem/36;
            color: #a2a2a7;
          }
          &.cl-canNoClick {
            color: #f73a5f;
          }
        }
        .cl-buttonBox {
          font-size: 13rem/36;
          margin: 10rem/36 0 7rem/36;
          height: 40rem/36;
          .cl-cashWord {
            position: relative;
            .cl-loadIcon {
              position: absolute;
              top: 50%;
              left: -25rem/36;
              transform: translateY(-50%);
              animation: refreshA 1.5s linear infinite;
              .sprite(@ticon-refresh, 108rem);
            }
          }
          &.cl-canNoClick {
            opacity: 0.7;
          }
        }
        .cl-timeWord {
          color: #a2a2a7;
        }
      }
    }
    .cl-item:first-child {
      border-bottom: 0;
    }
  }
  @keyframes refreshA {
    0% {
      transform: translateY(-50%) rotate(0deg);
    }

    100% {
      transform: translateY(-50%) rotate(360deg);
    }
  }
}
</style>
