<template>
  <div>
    <div class="cl-accountMybetDetailBox-wrap">
      <div class="cl-status" v-if="meta">
        <div v-for="(a, b) in 5" :key="b">
          <div
            v-if="meta.ticket_status === b"
            class="cl-right"
            :class="'no-status' + (b + 1)"
          >
            {{ $t('accountMybetBox.ticket_status' + (b + 1)) }}
          </div>
        </div>
      </div>

      <div class="cl-container">
        <div class="cl-actions">
          <div class="cl-totalBox cl-flexcc">
            <div class="cl-item">
              <div class="cl-top">{{ $t('betslipSuccess.total') }}</div>
              <div class="cl-amount">
                {{ $t('unit') }} {{ meta ? meta.stake.toFixed(2) : 0 }}
              </div>
            </div>
            <div class="cl-item">
              <div class="cl-top">{{ $t('betslipSuccess.payout') }}</div>
              <div class="cl-amount">
                {{ $t('unit') }} {{ meta ? meta.win.toFixed(2) : 0 }}
              </div>
            </div>
          </div>

          <div class="cl-list">
            <div class="cl-summary">
              {{ $t('accountMybetDetailBox.summary') }}
            </div>

            <div class="cl-flexcb cl-item">
              <div class="cl-left">{{ $t('accountMybetDetailBox.stake') }}</div>
              <div class="cl-right">
                {{ $t('unit') }} {{ meta ? meta.stake.toFixed(2) : 0 }}
              </div>
            </div>

            <div class="cl-flexcb cl-item">
              <div class="cl-left">{{ $t('accountMybetDetailBox.type') }}</div>
              <div class="cl-right" v-if="meta">
                <span v-for="(a, b) in 7" :key="b">
                  <span v-if="meta.ticket_type === b">{{
                    $t('accountMybetDetailBox.ticket_type' + (b + 1))
                  }}</span>
                </span>
              </div>
            </div>

            <div v-for="(a, b) in summaryArr" :key="b">
              <div
                class="cl-flexcb cl-item"
                v-if="a === 'bonus' ? meta && meta.bonus : true"
                :class="'no-' + a + 'Item'"
              >
                <div class="cl-left">
                  {{ $t(`accountMybetDetailBox.${a}`) }}
                </div>
                <div class="cl-right">
                  <div class="cl-rightText">
                    {{ a === 'bonus' || a === 'payout' ? $t('unit') : '' }}
                    {{
                      meta
                        ? a === 'payout'
                          ? meta.win.toFixed(2)
                          : a === 'freebets'
                          ? bottomTitle
                          : meta[a].toFixed(2)
                        : 0
                    }}
                  </div>
                  <div class="cl-freebetsStatus" v-if="a === 'freebets'">
                    <img
                      class="cl-img"
                      src="@/assets/images/mybet/instruction.png"
                      @click.stop="openInstruction"
                    />
                    <div
                      class="cl-instruction"
                      ref="tooltip"
                      v-if="isShowInstruction"
                      @click.stop="closeInstruction"
                      tabindex="-1"
                      @blur="closeInstruction"
                    >
                      {{
                        new Date() > meta.freebets.type_expire_time * 1000
                          ? $t('accountGiftList.instructionExpire')
                          : instructionList[meta.freebets.type_status - 1]
                      }}
                      <div class="cl-triangles"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cl-time" v-if="meta">
            {{ $t('accountMybetDetailBox.place') }}
            {{ getDate(meta.created_at, 'dd/MM/yy at HH:mm') }}
          </div>
          <div class="cl-expiresBox" v-if="meta && meta.type === 6">
            <div
              class="cl-flexcb cl-expires"
              v-if="meta.freebets.type_status !== 3"
            >
              <div>
                <div
                  class="cl-expiresTime"
                  v-if="meta.ticket_status === 2"
                  v-html="getExpires(meta.freebets.type_expire_time)"
                ></div>
              </div>
              <div
                class="cl-flexcc cl-btn"
                :class="{ 'cl-noBtn': meta.ticket_status === 0 }"
                v-if="$t('inviteFriend.btn')[stateNum]"
                @click="manipulate"
              >
                {{ $t('inviteFriend.btn')[stateNum] }}
              </div>
            </div>
          </div>

          <div
            class="cl-flexcc cl-sharePoster"
            v-else-if="meta && meta.ticket_status === 2"
            @click="openSharePoster('winning')"
          >
            {{ $t('accountMybetDetailBox.sharePoster') }}
            <div class="cl-hotIcon" />
          </div>

          <div v-else>
            <div class="cl-flexcc">
              <div
                class="cl-flexcc cl-buttonItem cl-mybetLineButton"
                :class="{ 'cl-gray': meta && meta.can_bet === 0 }"
                @click="betAgain"
              >
                {{ $t('accountMybetDetailBox.actionsButton2') }}
              </div>
              <div
                class="cl-flexcc cl-buttonItem cl-mybetLineButton"
                v-if="meta && meta.ticket_status === 0"
                :class="{
                  'cl-gray':
                    meta && (meta.can_cancel === 0 || meta.is_canceled === 1)
                }"
                @click="ticketCancel"
              >
                {{ $t('accountMybetDetailBox.actionsButton3') }}
              </div>
              <div
                class="cl-flexcc cl-buttonItem cl-mybetLineButton"
                v-else
                @click="deleteTickets"
              >
                {{ $t('accountMybetDetailBox.delete') }}
              </div>
              <div
                class="cl-flexcc cl-shareBet"
                :class="{
                  'cl-grayButton':
                    !pityFail && meta && (meta.can_bet === 0 || !meta.share_id)
                }"
                @click="pityFail ? openSharePoster('pityFail') : shareBet()"
              >
                {{ $t('accountMybetDetailBox.actionsButton1') }}
              </div>
            </div>
            <div :style="{ height: 10 / 36 + 'rem' }" />
            <div class="cl-tips">
              <span v-html="$t('hottestTickets.betslipTips')" />
              <NuxtLink class="cl-learnMore" :to="`/${locale}/hottestTickets`">
                {{ $t('hottestTickets.learnMore') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <h2 class="cl-h2 cl-title">{{ $t('onebetLeague.matches') }}</h2>
        <div class="cl-actions-wrap">
          <div class="cl-match" v-for="(item, index) in result" :key="index">
            <div class="cl-flexcb cl-top">
              <div
                class="cl-left"
                :class="{
                  'cl-rightIcon': item.outcome_settlement_status === 1,
                  'cl-wrongIcon': item.outcome_settlement_status === 0,
                  'cl-suspendIcon': item.outcome_settlement_status === 3
                }"
              />
              <div class="cl-flexcc cl-center">
                <div class="cl-team cl-homeTeam">{{ item.home_name }}</div>
                <div class="cl-flexcc cl-score">
                  {{
                    item.period_scores[0] && item.period_scores[1]
                      ? `${
                          item.period_scores[0][0] + item.period_scores[1][0]
                        } - ${
                          item.period_scores[0][1] + item.period_scores[1][1]
                        }`
                      : $t('betslipMarketList.vs')
                  }}
                </div>
                <div class="cl-team cl-awayTeam">{{ item.away_name }}</div>
              </div>
              <div class="cl-right" />
            </div>

            <div class="cl-bottom">
              <div class="cl-flexcb cl-item">
                <div class="cl-left">{{ $t('preMatchBox.market') }}</div>
                <div class="cl-right">{{ item.market_name }}</div>
              </div>
              <div class="cl-flexcb cl-item">
                <div class="cl-left">
                  {{ $t('accountMybetDetailBox.pick') }}
                </div>
                <div class="cl-right">
                  {{ item.bet_pick }} @{{ item.odds.toFixed(2) }}
                </div>
              </div>
              <div
                class="cl-flexcb cl-item"
                v-if="item.outcome_settlement_status === 2"
              >
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
                <div
                  class="cl-flexcc cl-right cl-List"
                  @click="clickListFlag({ index, arr: item.period_scores })"
                >
                  <div class="cl-flexcc cl-ft_score">
                    <div class="cl-flexcc cl-tItem">
                      <div>
                        {{
                          item.ft_score
                            ? `${item.ft_score.home_score}:${item.ft_score.away_score}`
                            : '-/-'
                        }}
                      </div>
                      <div
                        v-if="item.period_scores.length"
                        class="cl-down"
                        :class="
                          listFlag[index]
                            ? 'cl-iconRotate180'
                            : 'cl-iconRotate0'
                        "
                      />
                    </div>
                    <CollapseTransition>
                      <div class="cl-box" v-show="listFlag[index]">
                        <div
                          class="cl-flexca cl-period_scores"
                          v-for="(a, b) in item.period_scores"
                          :key="b"
                        >
                          <div style="color: #74747c">{{ b + 1 }}</div>
                          <div style="padding-right: 0.2rem">
                            {{ a[0] + ':' + a[1] }}
                          </div>
                        </div>
                      </div>
                    </CollapseTransition>
                  </div>
                </div>
              </div>
              <div class="cl-flexcb cl-item">
                <div class="cl-left">
                  {{ $t('accountMybetDetailBox.outcome') }}
                </div>
                <div class="cl-right">{{ item.winning_outcome }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-if="isLoadingShow" />
    <!--分享弹出-->
    <sharePoster
      v-if="isSharePosterShow"
      :order="ticket_id"
      @closeShareModal="closeShareModal"
    />
    <invitePop
      :flag="inviteFlag"
      :config-data="configData"
      @close="inviteFlag = false"
    >
      <div
        v-html="
          $t('accountGiftList.lock1', {
            phone:
              meta &&
              meta.freebets &&
              String(meta.freebets.bind_mobile).replace('0', '237 '),
            money:
              meta && meta.freebets && abs(Number(meta.freebets.type_amount))
          })
        "
        @click.stop="learnMore"
      ></div>
    </invitePop>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import loading from '@/components/components/loading.vue'
import sharePoster from '@/components/components/sharePoster.vue'
import invitePop from '@/components/components/activityAll/invitePop.vue'

export default {
  components: {
    loading,
    sharePoster,
    CollapseTransition: Lib.common.CollapseTransition,
    invitePop
  },
  data() {
    return {
      meta: null,
      // 上下半场比分下拉框控制器
      listFlag: [],
      result: [],
      nowTime: new Date().getTime(),
      showList: [],
      isLoadingShow: false,
      // 循环体
      dataInterval: '',
      intervalTimes: 1,
      isSharePosterShow: false,
      configData: {},
      inviteFlag: false,
      friendStr: this.$t('accountGiftList.friendStr'),
      isShowInstruction: false
    }
  },
  computed: {
    bottomTitle() {
      if (!this.meta || this.meta.type !== 6) return
      return new Date() > this.meta.freebets.type_expire_time * 1000
        ? this.$t('accountGiftList.bottomTitleExpired')
        : this.$t('accountGiftList.bottomTitle')[
            this.meta.freebets.type_status - 1
          ]
    },
    instructionList() {
      if (!this.meta || this.meta.type !== 6) return []
      return [
        this.$t('accountGiftList.present', {
          get: this.$t('accountGiftList.from')[this.meta.freebets.from - 22],
          after: this.$t(
            `accountGiftList.after${this.meta.freebets.from - 22}`,
            {
              odd: this.meta.freebets.type_odds,
              amount: this.meta.freebets.type_amount
            }
          )
        }),
        this.meta.freebets.bet_result
          ? this.$t('accountGiftList.instruction1')
          : this.$t('accountGiftList.instruction2'),
        this.$t('accountGiftList.instruction3', {
          money: this.abs(Number(this.meta.win))
        })
      ]
    },
    ticket_id() {
      return this.$route.params.ticketId
    },
    tickets() {
      if (!this.meta) return []
      const returnArr = [
        this.$store.state.tickets, // preMatch & live
        this.$store.state.tickets,
        [], // jackpot
        this.$store.state.intimateTickets, // intimate bet!
        [] // daily jackpot
      ]
      if (returnArr[this.meta.ticket_type])
        return returnArr[this.meta.ticket_type]
      return []
    },
    platform() {
      return this.$store.state.platform
    },
    // 2022圣诞新增
    modal() {
      return this.$store.state.modal
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    // 惜败条件,1为符合,0为不符合
    // eslint-disable-next-line vue/return-in-computed-property
    pityFail() {
      if (Array.isArray(this.result) && this.result.length >= 3) {
        const list = this.result.map((item) =>
          [0, 1, 2].includes(item.outcome_settlement_status)
            ? item.outcome_settlement_status
            : 0
        )
        if (list.includes(2)) return 0
        if (list.filter((item) => item === 0).length === 1) return 1
        return 0
      } else return 0
    },
    locale() {
      return this.$store.state.root.locale
    },
    summaryArr() {
      return [
        'odds',
        this.meta && this.meta.type === 6 ? 'freebets' : 'bonus',
        'payout'
      ]
    },
    stateNum() {
      if (!this.meta || this.meta.type !== 6) return
      const { type_status, type_expire_time } = this.meta.freebets
      const bet_result = this.meta.ticket_status
      if (new Date() > type_expire_time * 1000) {
        if (type_status === 3) return 0 // 已提现
        return 1 // 已过期
      }
      if ([0, 3, 4].includes(bet_result)) {
        if (bet_result === 0) return 2 // 未结算
        if ([3, 4].includes(bet_result)) return 3 // 结算失败
      }
      if (type_status === 1) return 4 // 未解锁
      if (type_status === 3) return 5 // 已提现未过期
      if (type_status === 2) return 6 // 待提现
      return 7 // 可以使用
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    APP() {
      return window.APP || null
    },
    winApp() {
      return window.appInteraction
    },
    hostname() {
      return this.$store.state.root.country === 'ug'
        ? process.env.hostname
        : process.env.hostnamecm
    }
  },
  mounted() {
    this.getTicketInfo()
  },
  beforeDestroy() {
    clearInterval(this.dataInterval)
  },
  methods: {
    abs(num) {
      return Lib.common.abs(num)
    },
    // 比分下拉框
    clickListFlag: Lib.common.throttle(function ({ index, arr }) {
      if (!arr.length) return
      this.$set(this.listFlag, index, !this.listFlag[index])
    }, 300),
    // 获取订单信息
    getTicketInfo() {
      this.$axios_api
        .ticketInfo({
          platform: this.platform,
          ticket_id: this.ticket_id,
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.meta = res.data.meta
            this.result = res.data.result
            this.listFlag = new Array(this.result.length).fill(false)
          }
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 改变展开状态
    changeDetailShow(index) {
      this.$set(this.showList, index, !this.showList[index])
    },
    // 取消投注
    ticketCancel() {
      if (this.meta.can_cancel === 1 && this.meta.is_canceled === 0) {
        Lib.common.event_statistics(`my_bets_detail_cancel`)
        this.$axios_api
          .ticketCancel({
            platform: this.platform,
            ticket_id: this.ticket_id,
            token: this.token
          })
          .then((res) => {
            if (res.code === 0) {
              this.isLoadingShow = true
              this.reqInterval()
              sessionStorage.setItem('updateUserBetData', 1)
            } else {
              Lib.common.errorReminderUp(this, true, res.msg, 0)
            }
          })
      }
    },
    // 分享订单
    shareBet() {
      if (this.meta && this.meta.can_bet === 1 && this.meta.share_id) {
        Lib.common.event_statistics(
          `my_bets_detail_share_ticket`,
          this.meta.share_id
        )
        Lib.common.errorReminder(this, '', 'A', '', {
          ticket_id: this.ticket_id,
          share_id: this.meta.share_id
        })
      }
    },
    // 循环请求ticket
    ticketRequest() {
      if (this.intervalTimes >= 10) {
        this.isLoadingShow = false
        clearInterval(this.dataInterval)
      }

      this.$axios_api
        .ticketPhase({
          platform: this.platform,
          ticket_id: this.ticket_id,
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            if (res.data.phase === 0) {
              this.intervalTimes++
              // mts还未返回
            } else if (res.data.phase === 7) {
              this.isLoadingShow = false
              this.getTicketInfo()
              Lib.common.errorReminderUp(
                this,
                true,
                this.$t('reminder.ticketSuccessful'),
                1
              )
              clearInterval(this.dataInterval)
            } else if (res.data.phase === 8) {
              this.isLoadingShow = false
              this.getTicketInfo()
              Lib.common.errorReminderUp(
                this,
                true,
                this.$t('reminder.ticketFailed'),
                0
              )
              clearInterval(this.dataInterval)
            } else {
              this.isLoadingShow = false
              Lib.common.errorReminderUp(this, true, res.msg, 0)
              clearInterval(this.dataInterval)
            }
          }
        })
    },
    // 重新投注
    betAgain() {
      if (this.meta.can_bet === 1) {
        Lib.common.event_statistics(`my_bets_detail_bet_again`)
        let newTicket = []
        const ticket = []
        for (let i = 0; i < this.result.length; i++) {
          ticket.push({
            match_id: this.result[i].match_id,
            start_time: this.result[i].start_time,
            sport_id: this.result[i].sport_id,
            country_name: this.result[i].country_name,
            tournament_name: this.result[i].tournament_name,
            tournament_id: this.result[i].tournament_id,
            home_name: this.result[i].home_name,
            away_name: this.result[i].away_name,
            market_id: this.result[i].market_id,
            market_name: this.result[i].market_name,
            display: this.result[i].bet_pick,
            odds: this.result[i].odds,
            id: this.result[i].outcome_id,
            match_status: this.result[i].match_status
          })
        }
        // 删除重复match
        for (let i = 0; i < this.tickets.length; i++) {
          for (let j = 0; j < ticket.length; j++) {
            if (ticket[j].match_id === this.tickets[i].match_id) {
              this.tickets.splice(i, 1)
              i--
            }
          }
        }
        // 添加tickets
        newTicket = this.tickets.concat(ticket)
        if ([0, 1].includes(this.meta.ticket_type)) {
          this.$store.commit('setTickets', newTicket)
          Lib.store.set(
            'tickets',
            Lib.common.encrypt(JSON.stringify(newTicket))
          )
          // 跳转到betslip
          this.$router.push({
            path: `/${this.locale}/betslip`
          })
        }
      }
    },
    // 循环体
    reqInterval() {
      this.dataInterval = setInterval(() => {
        this.ticketRequest()
      }, 1000)
    },
    goWhere(path) {
      this.$router.push({ path: `/${this.locale}` + path })
    },
    // 删除订单
    deleteTickets() {
      this.$store.commit('set_ticket_del_ticket_id', {
        ticket_id: this.ticket_id,
        from: 'normal'
      })
      Lib.common.errorReminder(
        this,
        'deleteTickets',
        '',
        '',
        this.$t('accountMybetDetailBox.deleteReminder'),
        this.$t('accountMybetDetailBox.cancel'),
        this.$t('accountMybetDetailBox.delete')
      )
    },
    // 关闭海报分享弹出
    closeShareModal() {
      this.isSharePosterShow = false
    },
    // 打开分享弹出
    openSharePoster(type) {
      this.isSharePosterShow = true
      // this.$store.commit("changeLoadingStatus", true);
      if (type === 'winning') {
        Lib.common.event_statistics('share_your_winning_poster')
      }
      // if (type === 'pityFail') {
      // }
      // this.$axios_api
      //   .shareOrder({
      //     token: this.token,
      //     ticketId: this.ticket_id
      //   })
      //   .then(res => {
      //     this.$store.commit("changeLoadingStatus", false);
      //     if (res.code === 0) {
      //       setTimeout(() => {
      //         this.isSharePosterShow = true;
      //       }, 300);
      //     }
      //   });
    },
    // 秒变分钟
    minuteDetal(timeStamp, fmt) {
      return Lib.common.minuteDetal(timeStamp, fmt)
    },
    getExpires(time) {
      const now = new Date()
      const expiration = new Date(time * 1000)
      // 判断是否已经过期
      if (expiration < now) {
        return `Expired on ${this.getDate(time, 'dd/MM,HH:mm')}`
      }
      const diff = (expiration - now) / 1000
      const days = this.minuteDetal(diff, 'd')
      // 超过1天，显示天数
      if (days >= 1) {
        return `Expires in <span style='color:#FF4C2C'>${days} days</span>`
      }
      // 24小时内，显示小时、分钟和秒
      return `Expires in <span style="color:#FF4C2C">${this.minuteDetal(
        diff,
        'HHa MMb ssc'
      )
        .replace('a', 'h')
        .replace('b', 'm')
        .replace('c', 's')}</span>`
    },
    manipulate() {
      if (
        this.meta.ticket_status === 0 ||
        new Date() > this.meta.freebets.type_expire_time * 1000
      )
        return
      if (this.meta.freebets.type_status === 1) {
        this.lock()
      } else if (this.meta.freebets.type_status === 2) {
        Lib.common.errorReminder(
          this,
          '',
          '',
          this.$t('accountGiftList.withdrawMoney'),
          this.$t('accountGiftList.goingWithdraw', {
            money: this.meta.win.toFixed(2)
          }),
          this.$t('reminder.button.confirm'),
          this.$t('reminder.button.cancel'),
          () => {
            // 提现到账户
            this.$axios_api
              .freeBetDeposit({
                id: this.meta.freebets.id,
                token: this.token
              })
              .then((res) => {
                if (res.code === 0) {
                  this.meta.freebets.type_status = 3
                  this.$store.commit(
                    'setToastInfo',
                    this.$t('dailyGiveaway.successWithdraw')
                  )
                } else {
                  Lib.common.errorReminder(
                    this,
                    '',
                    '',
                    '',
                    this.$t('accountGiftList.withdrawFail'),
                    '',
                    this.$t('reminder.button.ok')
                  )
                }
              })
          }
        )
      }
    },
    lock() {
      this.configData =
        this.meta.freebets.from === 23
          ? {
              type: 0,
              leftFn: () => {
                // whatsapp
                const relNumber = this.meta.freebets.bind_mobile.replace(
                  /^0/,
                  '237'
                )
                const whatsappUrl =
                  `https://wa.me/?phone=${relNumber}&text=` +
                  encodeURIComponent(
                    this.friendStr + ` ${this.hostname}/${this.locale}`
                  )
                if (this.APP) {
                  APP.openBrowser(whatsappUrl)
                } else window.open(whatsappUrl, '_blank')
              },
              rightFn: () => {
                // 发短信
                this.doAction()
              }
            }
          : {
              type: 4,
              typeWord: this.$t('accountGiftList.lock2', {
                money: this.abs(Number(this.meta.freebets.type_amount))
              }),
              leftFn: () => {
                this.inviteFlag = false
              },
              rightFn: () => {
                this.$router.push({ path: `/${this.locale}/betslip` })
              }
            }
      this.inviteFlag = true
    },
    // 判断是否是移动端
    doAction() {
      const relNumber = this.meta.freebets.bind_mobile.replace(/^0/, '237')
      const shareStr = this.friendStr + ` ${this.hostname}/${this.locale}`

      const u = navigator.userAgent
      // android终端
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      const str = `sms:${relNumber}${
        isiOS ? '&' : '?'
      }body=${encodeURIComponent(shareStr)}`
      window.location.href = str
    },
    learnMore() {
      Lib.common.errorReminder(
        this,
        '',
        '',
        '',
        this.$t('accountGiftList.present', {
          get: this.$t('accountGiftList.from')[this.meta.freebets.from - 22],
          after: this.$t(
            `accountGiftList.after${this.meta.freebets.from - 22}`,
            {
              odd: this.meta.freebets.type_odds,
              amount: this.meta.freebets.type_amount
            }
          )
        }),
        '',
        this.$t('reminder.button.ok')
      )
    },
    openInstruction() {
      this.isShowInstruction = true
      this.$nextTick(() => {
        this.$refs.tooltip[0].focus()
      })
    },
    closeInstruction() {
      this.isShowInstruction = false
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountMybetDetailBox-wrap {
  position: absolute;
  padding-bottom: 2rem;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;

  .cl-status {
    position: absolute;
    right: 10rem/36;
    top: -31rem/36;
    font-weight: 300;
    color: #636363;

    .cl-right {
      border-radius: 3rem/36;
      padding: 0 4rem/36;
      height: 15rem/36;
      display: flex;
      align-items: center;
      transform-origin: right center;
      //color: white;
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

  .cl-container {
    margin: 0 0 1rem;

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
      border-radius: 6rem/36;
      box-shadow: 0 1rem/36 4rem/36 0 rgba(206, 206, 222, 1);

      .cl-totalBox {
        padding-bottom: 12rem/36;
        text-align: center;
        border-bottom: 1px solid @betslipLineColor;
        margin: 0 10rem/36 13rem/36;

        .cl-item {
          flex: 1;
          border-right: 1px solid @betslipLineColor;

          .cl-top {
            font-size: 10rem/36;
            color: @liveNameColor;
          }

          .cl-amount {
            color: #000;
            font-size: 13rem/36;
            font-weight: bold;
            padding-top: 6rem/36;
          }
        }

        .cl-item:last-child {
          border: none;
        }
      }

      .cl-list {
        padding: 0 10rem/36;

        .cl-summary {
          color: #000000;
          margin-bottom: 7rem/36;
        }

        .cl-item {
          color: #a2a2a7;
          padding-bottom: 5rem/36;
          font-size: 11rem/36;
          &.no-freebetsItem {
            .cl-left {
              color: #000000;
            }
            .cl-right {
              color: #eb4949;
              display: flex;
              .cl-freebetsStatus {
                width: 12rem/36;
                height: 12rem/36;
                margin-left: 3rem/36;
                position: relative;
                .cl-img {
                  width: 100%;
                  height: 100%;
                }
                .cl-instruction {
                  position: absolute;
                  right: -12rem/36;
                  top: 26rem/36;
                  width: 229rem/36;
                  box-sizing: border-box;
                  padding: 10rem/36 8rem/36 10rem/36 14rem/36;
                  font-weight: 400;
                  font-size: 11rem/36;
                  color: #000000;
                  line-height: 15rem/36;
                  background-color: #fff08c;
                  border-radius: @mainButtonRadius;
                  z-index: 1;
                  .cl-triangles {
                    position: absolute;
                    bottom: 100%;
                    right: 8rem/36;
                    border-width: 10rem/36;
                    border-style: solid;
                    border-color: transparent transparent #fff08c transparent;
                  }
                }
                .cl-instruction:focus {
                  outline: none;
                }
              }
            }
          }
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

    .cl-expiresBox {
      padding: 0 10rem/36;
      margin-top: 15rem/36;
      .cl-expires {
        border-top: 1rem/36 solid #e9e9f3;
        padding-top: 10rem/36;
        .cl-expiresTime {
          font-weight: 400;
          font-size: 10rem/36;
          color: #a2a2a7;
          line-height: 15rem/36;
        }
        .cl-btn {
          min-width: 63rem/36;
          height: 20rem/36;
          border-radius: 10rem/36;
          border: 1rem/36 solid #eb4949;
          padding: 0 10rem/36;
          box-sizing: border-box;
          font-weight: 400;
          font-size: 8rem/36;
          color: #eb4949;
          line-height: 12rem/36;
          &.cl-noBtn {
            border: 1rem/36 solid #878787;
            color: #989898;
          }
        }
      }
    }
    .cl-sharePoster {
      background-color: #fcdb06;
      border-radius: 6rem/36;
      height: 40rem/36;
      width: 320rem/36;
      position: relative;
      color: #000;
      font-weight: bold;
      font-size: 13rem/36;
      margin: 20rem/36 auto 0;

      .cl-hotIcon {
        position: absolute;
        right: 0;
        top: 0;
        .sprite(@account-hot, 108rem);
      }
    }

    .cl-sharePoster:active {
      background-color: @chooseButton;
    }

    .cl-buttonItem {
      margin: 20rem/36 auto 0;
      white-space: normal;

      &.cl-gray {
        opacity: 0.3;
      }
    }

    .cl-shareBet {
      background-color: @mainThemeColor;
      border-radius: 6rem/36;
      height: 33rem/36;
      width: 144rem/36;
      color: #fff;
      font-weight: bold;
      font-size: 13rem/36;
      margin: 20rem/36 auto 0;
      text-transform: capitalize;
    }

    .cl-tips {
      width: 320rem/36;
      margin: 0 auto;
      font-size: 12rem/36;
      font-weight: 400;
      color: @liveNameColor;

      .cl-learnMore {
        color: @mainThemeColor;
        text-decoration: underline;
      }
    }

    .cl-shareBet:active {
      opacity: 0.8;
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

            &.cl-rightIcon {
              .sprite(@league-right, 108rem);
            }

            &.cl-wrongIcon {
              .sprite(@league-wrong, 108rem);
            }

            &.cl-suspendIcon {
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

            .cl-List {
              width: 80rem/36;
              height: 23rem/36;
              font-weight: 400;
              position: relative;

              .cl-ft_score {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                min-height: 100%;
                background-color: #f4f4f4;
                border-radius: 12rem/36;
                flex-direction: column;
                box-sizing: border-box;
                border: 0.5rem/36 solid #d4dae1;
                .cl-tItem {
                  width: 100%;
                  height: 23rem/36;
                }
              }

              .cl-period_scores {
                height: 23rem/36;
                width: 100%;
                border-top: 0.5rem/36 solid #d4dae1;
              }
            }
            .cl-box {
              width: 100%;
            }

            .cl-down {
              margin-left: 20rem/36;
              .sprite(@icon-down, 72rem);
            }
          }
        }
      }
    }

    .cl-banner {
      img {
        width: 1050rem/108;
        height: 140rem/108;
      }
    }
  }
}
</style>
