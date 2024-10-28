<template>
  <div class="cl-mybetDetail-wrap" @touchmove.stop @mousewheel.stop>
    <div class="cl-flexcb cl-topBox">
      <div class="cl-left">
        <div class="cl-backIcon" @click="goBack" />
      </div>
      <div class="cl-middle">{{ ticket_id }}</div>
      <div class="cl-flexcc cl-status" v-if="resData">
        <div v-if="resData.cash_status" class="cl-flexcc cl-cashoutBox">
          {{ $t('onebetLeague.cashout') }}
        </div>
        <div
          class="cl-right cl-status5"
          v-if="resData.cash_risk_status === 1 || resData.risk_status === 1"
        >
          {{ $t('accountMybetBox.ticket_status6') }}
        </div>
        <div v-else>
          <div v-for="(a, b) in 5" :key="b">
            <div
              v-if="resData.status === b"
              class="cl-right"
              :class="'no-status' + (b + 1)"
            >
              {{ $t('accountMybetBox.ticket_status' + (b + 1)) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <dataError v-if="isRequestFailed" />
    <template v-else>
      <template v-if="requestLoading">
        <template v-if="resData">
          <div class="cl-container">
            <div class="cl-indexCardShadow cl-actions">
              <div class="cl-totalBox cl-flexcc">
                <div class="cl-item">
                  <div class="cl-top">{{ $t('betslipSuccess.total') }}</div>
                  <div class="cl-amount">
                    {{ $t('units') }} {{ abs(Number(resData.bet_amount)) }}
                  </div>
                </div>
                <div class="cl-item" v-if="resData.cash_status">
                  <div class="cl-top">
                    {{
                      $t('onebetLeague.cashout') +
                      ' ' +
                      $t('inviteFriend.Amount')
                    }}
                  </div>
                  <div class="cl-amount">
                    {{ $t('units') }} {{ abs(Number(resData.cash_money)) }}
                  </div>
                </div>
                <div class="cl-item">
                  <div class="cl-flexcc cl-top">
                    <div>{{ $t('onebetLeague.totalPayout') }}</div>
                    <div
                      class="cl-detailIcon"
                      @click="showTotal = !showTotal"
                    />
                    <div
                      v-if="showTotal"
                      class="cl-indexCardShadow cl-totalpBox"
                    >
                      <div class="cl-flexce">
                        <div class="cl-closeIcon" @click="showTotal = 0" />
                      </div>
                      <div class="cl-flexcb cl-item">
                        <div class="cl-left">
                          {{ $t('accountMybetDetailBox.payout') }}
                        </div>
                        <div class="cl-right">
                          {{
                            $t('units') +
                            ' ' +
                            (abs(Number(resData.win_amount)) || '')
                          }}
                        </div>
                      </div>
                      <div v-if="resData.cash_status" class="cl-flexcb cl-item">
                        <div class="cl-left">
                          {{
                            $t('onebetLeague.cashout') +
                            ' ' +
                            $t('inviteFriend.Amount')
                          }}
                        </div>
                        <div class="cl-right">
                          {{ $t('units') }}
                          {{ abs(Number(resData.cash_money)) }}
                        </div>
                      </div>
                      <div class="cl-flexcb cl-item">
                        <div class="cl-left">
                          {{ $t('onebetLeague.totalPayout') }}
                        </div>
                        <div class="cl-right">
                          {{ $t('units') }}
                          {{
                            abs(Number(resData.win_amount + resData.cash_money))
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="cl-amount">
                    {{ $t('units') }}
                    {{ abs(Number(resData.win_amount + resData.cash_money)) }}
                  </div>
                </div>
              </div>

              <div class="cl-list">
                <div class="cl-summary">
                  {{ $t('accountMybetDetailBox.summary') }}
                </div>

                <div class="cl-flexcb cl-item">
                  <div class="cl-left">
                    {{
                      $t('onebetLeague.betStake', {
                        left: resData.cash_status ? $t('onebetLeague.left') : ''
                      })
                    }}
                  </div>
                  <div class="cl-right">
                    {{ $t('units') }}
                    {{ abs(Number(resData.bet_amount - resData.cash_amount)) }}
                  </div>
                </div>

                <div class="cl-flexcb cl-item">
                  <div class="cl-left">
                    {{ $t('accountMybetDetailBox.type') }}
                  </div>
                  <div class="cl-right">Onebet League</div>
                </div>

                <div class="cl-flexcb cl-item">
                  <div class="cl-left">
                    {{ $t('accountMybetDetailBox.odds') }}
                  </div>
                  <div class="cl-right">
                    {{ Number(resData.odds).toFixed(2) }}
                  </div>
                </div>

                <div class="cl-flexcb cl-item">
                  <div class="cl-left">
                    {{ $t('accountMybetDetailBox.payout') }}
                  </div>
                  <div class="cl-right">
                    {{
                      $t('units') +
                      ' ' +
                      (abs(Number(resData.win_amount)) || '')
                    }}
                  </div>
                </div>
              </div>

              <div class="cl-time">
                {{ $t('accountMybetDetailBox.place') }}
                {{ getDate(resData.bet_time, 'dd/MM/yy at HH:mm') }}
              </div>

              <div class="cl-cashouttBox" v-if="canCash">
                <div
                  v-if="!isShowcash && canCash && !showCashoutData"
                  class="cl-flexcc cl-lkButton cl-cashout"
                  :class="{ 'cl-canNoCash': !canCash || showCashoutData }"
                  @click="
                    canCash && !showCashoutData
                      ? toCashout(resData.order_no)
                      : ''
                  "
                >
                  {{ $t('onebetLeague.cashout') }}
                </div>
                <CollapseTransition>
                  <div v-if="isShowcash" class="cl-cashoutContent">
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
                        <div class="cl-word">
                          {{ $t('onebetLeague.cashout') }}
                        </div>
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
                              ? `Must be less than ${abs(
                                  showCashoutData.MaxCash
                                )}`
                              : cashoutAmount < showCashoutData.MinCash
                              ? `Must be greater than ${showCashoutData.MinCash}`
                              : ''
                          }}
                        </template>
                        <template v-else>
                          <div class="cl-restWord">
                            {{ $t('onebetLeague.ra') }}
                          </div>
                          <div>
                            {{
                              abs(
                                ((showCashoutData.MaxCash - cashoutAmount) /
                                  10) *
                                  11
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
                            ? toCashout(resData.order_no)
                            : cashoutA(
                                resData.order_no,
                                showCashoutData.MaxCash
                              )
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
              </div>
            </div>

            <div class="cl-title">{{ $t('onebetLeague.matches') }}</div>

            <div class="cl-actions-wrap">
              <div
                class="cl-match"
                v-for="(item, index) in resData.bet_outcomes"
                :key="index"
              >
                <div class="cl-flexcb cl-top">
                  <div :class="`left no-LeftIcon${item.status}`" />
                  <div class="cl-flexcc cl-center">
                    <div class="cl-team cl-homeTeam">{{ item.home_name }}</div>
                    <div class="cl-flexcc cl-score">
                      {{
                        item.result.replace(':', ' - ') ||
                        $t('betslipMarketList.vs')
                      }}
                    </div>
                    <div class="cl-team cl-awayTeam">{{ item.away_name }}</div>
                  </div>
                  <div class="cl-right" />
                </div>

                <div class="cl-bottom">
                  <div class="cl-flexcb cl-item">
                    <div class="cl-left">{{ $t('preMatchBox.market') }}</div>
                    <div class="cl-right">{{ item.market }}</div>
                  </div>
                  <div class="cl-flexcb cl-item">
                    <div class="cl-left">
                      {{ $t('accountMybetDetailBox.pick') }}
                    </div>
                    <div class="cl-right">
                      {{ item.outcome }} @{{ Number(item.odds).toFixed(2) }}
                    </div>
                  </div>
                  <div class="cl-flexcb cl-item" v-if="item.status === 2">
                    <div class="cl-left">
                      {{ $t('accountMybetDetailBox.start') }}
                    </div>
                    <div class="cl-right">
                      {{ getDate(item.start_time, 'dd/MM, HH:mm') }}
                    </div>
                  </div>

                  <div class="cl-flexcb cl-item" v-else>
                    <div class="cl-left">
                      {{ $t('accountMybetDetailBox.result') }}
                    </div>
                    <div class="cl-flexcc cl-right">
                      {{ item.result || '-' }}
                    </div>
                  </div>
                  <div class="cl-flexcb cl-item">
                    <div class="cl-left">
                      {{ $t('accountMybetDetailBox.outcome') }}
                    </div>
                    <div class="cl-right">
                      {{ item.winning_outcome || '-' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <dataNoResult v-else />
      </template>
      <dataLoading v-else />
    </template>
    <div style="height: 1rem" />
    <!-- 规则 -->
    <drawer
      :visible.sync="rulesVisible"
      type="bottom"
      :height="396 / 36"
      z-index="4"
    >
      <cashoutRules @visibleRules="visibleRules" />
    </drawer>
    <successPop ref="successPop" />
  </div>
</template>

<script>
import successPop from './successPop.vue'
import cashoutRules from './cashoutRules.vue'
import Lib from '@/assets/js/Lib'

export default {
  components: {
    cashoutRules,
    successPop,
    CollapseTransition: Lib.common.CollapseTransition
  },
  props: ['detailTicketId'],
  data() {
    return {
      nowTime: new Date().getTime() / 1000, // 现在实时时间
      nowTimer: null, // 计时器id容器
      isShowcash: 0, // cash数据是否展示
      showCashoutData: null, // cashout数据
      isRefresh: 0, // cashout数据是否在刷新
      cashoutAmount: 0, // cashout金额
      isRequestFailed: 0,
      requestLoading: 0,
      resData: null, // 订单详情数据
      rulesVisible: false, // 规则弹窗开关
      showTotal: 0, // 浮窗开关
      canRefresh: 0 // 当前数据是否需要刷新
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
    canCash() {
      return this.resData.cash_status === 0 && this.resData.status === 0
    },
    ticket_id() {
      return this.$t('accountMybetBox.bet_id_title') + this.detailTicketId
    },
    platform() {
      return this.$store.state.platform
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    }
  },
  watch: {
    nowTime(val) {
      if (this.canRefresh && val > this.resData.last_time) {
        this.canRefresh = 0
        this.mybetDetailReq()
        this.$emit('refreshData')
      }
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
  beforeMount() {
    // 开启计时器
    this.nowTimer = setInterval(
      () => (this.nowTime = new Date().getTime() / 1000),
      1000
    )
  },
  mounted() {
    this.mybetDetailReq()
  },
  beforeDestroy() {
    // 清除定时器
    this.nowTimer && clearInterval(this.nowTimer)
  },
  methods: {
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
              this.isShowcash = 0
              this.mybetDetailReq()
              this.$emit('refreshData')
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
    toCashout(ticket_id) {
      this.isShowcash = 1
      this.isRefresh = 1
      this.$axios_api
        .LeagueSoccerCashoutOffer({ token: this.token, ticket_id })
        .then((res) => {
          this.isRefresh = 0
          const { code, data, msg } = res
          if (code === 0) {
            // 刷新不重置默认金额
            if (!this.showCashoutData)
              this.cashoutAmount = Number(Number(data.MaxCash).toFixed(2))
            this.showCashoutData = data
          } else Lib.common.errorReminderUp(this, true, msg, 0)
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
    },
    // cashout数据重置
    cashInit() {
      this.showCashoutData = null
      this.isRefresh = 0
    },
    // cashout Rules开关
    visibleRules() {
      this.rulesVisible = !this.rulesVisible
    },
    // 详情数据请求
    mybetDetailReq() {
      // 初始化
      this.isRequestFailed = 0
      this.requestLoading = 0
      this.$axios_api
        .LeagueSoccerDetail({
          token: this.token,
          ticket_id: this.detailTicketId
        })
        .then((res) => {
          this.isRequestFailed = 0
          this.requestLoading = 1
          const { code, data } = res
          if (code === 0) {
            this.resData = data
            if (this.nowTime < data.last_time) this.canRefresh = 1
          } else if (code === 10101) {
            Lib.common.errorReminder(
              this,
              'login',
              '',
              '',
              this.$t('reminder.unLogin'),
              '',
              this.$t('reminder.button.ok')
            )
          }
        })
        .catch(() => {
          this.isRequestFailed = 1
          this.requestLoading = 1
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 关闭详情
    goBack() {
      this.$emit('closeDetail')
    },
    // 金额格式化
    abs(num) {
      return Lib.common.abs(num)
    }
  }
}
</script>

<style scoped lang="less">
.cl-mybetDetail-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  background-color: #fff;

  .cl-topBox {
    position: relative;
    height: 47rem/36;
    padding: 0 10rem/36;
    .cl-backIcon {
      .sprite(@icon-black-long-back, 108rem);
    }
    .cl-middle {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 15rem/36;
      font-weight: bold;
      text-transform: uppercase;
    }
    .cl-status {
      position: absolute;
      right: 10rem/36;
      top: 50%;
      transform: translate(0, -50%);
      font-weight: 300;
      color: #636363;

      .cl-cashoutBox {
        height: 15rem/36;
        padding: 0 5rem/36;
        background-color: #b0f0fd;
        border-radius: 8rem/36;
        color: #00a5e6;
        font-size: 9rem/36;
        //margin-right: 7rem/36;
      }

      .cl-right {
        border-radius: 3rem/36;
        padding: 0 4rem/36;
        height: 15rem/36;
        display: flex;
        align-items: center;
        transform-origin: right center;
        font-size: 12rem/36;
        text-transform: capitalize;
      }

      .no-status1 {
        color: @mainThemeColor;
      }

      .no-status2 {
        color: #404040;
      }

      .no-status3 {
        color: @myBetWon;
      }

      .no-status4 {
        color: #a2a2a7;
      }

      .no-status5 {
        color: #6dd400;
      }
    }
  }

  .cl-container {
    margin: 5rem/36 0 1rem;

    .cl-title {
      color: #000;
      padding: 11rem/36 10rem/36 7rem/36;
      font-size: 12rem/36;
      font-weight: bold;
    }

    .cl-actions {
      background-color: #fff;
      box-sizing: border-box;
      padding: 10rem/36 0;
      margin: 0 10rem/36;
      font-size: 13rem/36;
      border-radius: @mainButtonRadius;

      .cl-totalBox {
        padding-bottom: 12rem/36;
        text-align: center;
        border-bottom: 0.5rem/36 solid @betslipLineColor;
        margin: 0 10rem/36 13rem/36;

        .cl-item {
          flex: 1;
          border-right: 0.5rem/35 solid @betslipLineColor;

          .cl-top {
            position: relative;
            font-size: 10rem/36;
            color: @liveNameColor;
            .cl-totalpBox {
              font-size: 11rem/36;
              line-height: 17rem/36;
              position: absolute;
              background-color: #fff;
              right: 0;
              top: 25rem/36;
              border-radius: 11rem/36;
              white-space: nowrap;
              padding: 5rem/36 5rem/36 10rem/36;
              min-width: 181rem/36;
              .cl-closeIcon {
                margin-bottom: 7rem/36;
                .sprite(@icon-close-grey, 136rem);
              }
              .cl-right {
                color: #000;
              }

              .cl-item {
                border: none;
              }
            }
          }

          .cl-amount {
            color: #000;
            font-size: 13rem/36;
            font-weight: bold;
            padding-top: 6rem/36;
          }

          .cl-detailIcon {
            margin-left: 3rem/36;
            .sprite(@ticon-sigh-grey, 108rem);
          }
        }

        .cl-item:last-child {
          border: none;
        }
      }

      .cl-list {
        padding: 0 10rem/36;

        .cl-summary {
          color: #000;
          margin-bottom: 7rem/36;
        }

        .cl-item {
          color: #a2a2a7;
          padding-bottom: 5rem/36;
          font-size: 11rem/36;

          .cl-payout {
            color: #000;
            font-weight: bold;
          }

          .cl-right {
            color: #000;
            font-weight: bold;
          }
        }
      }

      .cl-time {
        padding: 8rem/36 10rem/36 0;
        text-align: left;
        color: #a2a2a7;
        font-weight: 400;
        font-size: 10rem/36;
      }
    }

    .cl-actions-wrap {
      font-size: 13rem/36;
      background-color: #fff;
      margin: 0 10rem/36;

      .cl-match {
        border-radius: 6rem/36;
        margin-bottom: 10rem/36;
        box-shadow: 0 1rem/36 4rem/36 0 rgba(206, 206, 222, 1);
        .cl-top {
          border-radius: 6rem/36 6rem/36 0 0;
          height: 37rem/36;
          background-color: @noOddsColor;
          padding: 0 10rem/36;
          box-sizing: border-box;

          .cl-left {
            width: 15rem/36;

            &.no-LeftIcon1 {
              .sprite(@league-right, 108rem);
            }

            &.no-LeftIcon0 {
              .sprite(@league-wrong, 108rem);
            }

            &.no-LeftIcon3 {
              .sprite(@league-suspend, 108rem);
            }
          }

          .cl-right {
            width: 15rem/36;
          }

          .cl-center {
            color: #000;
            flex: 1;

            .cl-score {
              width: 58rem/36;
              text-align: center;
              font-weight: bold;
            }

            .cl-team {
              flex: 1;
              font-weight: 400;

              &.cl-homeTeam {
                text-align: right;
              }
            }
          }
        }

        .cl-bottom {
          padding: 10rem/36;

          .cl-item {
            color: @liveNameColor;
            padding-bottom: 3rem/36;
            font-weight: 400;

            .cl-right {
              color: #000;
              font-weight: 400;
            }
          }
        }
      }
    }

    .cl-cashouttBox {
      padding: 10rem/36;
      font-size: 13rem/36;
      color: #000;

      .cl-cashout {
        font-size: 15rem/36;
        height: 40rem/36;
        &.cl-canNoCash {
          opacity: 0.7;
        }
      }

      .cl-cashoutContent {
        padding: 10rem/36 0 0;
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
