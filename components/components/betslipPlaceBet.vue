<template>
  <div>
    <div class="cl-betslipPlaceBet-wrap" v-if="tickets.length > 0">
      <div style="height: calc(10rem / 36)" />
      <div class="cl-stake">
        <div class="cl-flexcb cl-stakeInputBox">
          <div class="cl-inl">{{ $t('betslipPlaceBet.stake') }}</div>
          <input
            type="number"
            :placeholder="'Min.' + NormalMinStake"
            v-model="stake"
            @change="inputChange"
          />
          <div class="cl-hb">{{ hb }}</div>
        </div>

        <div style="height: calc(12rem / 36)" />
        <div class="cl-offersRewards">
          {{ $t('betslipPlaceBet.offersRewards') }}
        </div>
        <div
          :style="{
            height: giftList.length > 0 ? 5 / 36 + 'rem' : 7 / 36 + 'rem'
          }"
        />
      </div>
      <div class="cl-flexcb cl-item" v-if="giftList.length > 0">
        <div class="cl-flexcc cl-left">
          <div class="cl-giftIcon" />
          <span @click="openGiftIntro" class="cl-chooseGifts1">{{
            $t('betslipPlaceBet.choose')
          }}</span>
          <div class="cl-flexcc cl-sighIcon" @click="openGiftIntro" />
          <betslipGiftIntro
            v-if="isGiftIntroOpen"
            @closeGiftIntro="closeGiftIntro"
          />
        </div>
        <div
          class="cl-flexcc cl-right cl-chooseGifts2"
          @click="visibleIsGiftShow(true)"
        >
          <div v-if="gift_index !== -1">
            - {{ $t('unit') }} {{ giftList[gift_index].amount }}
          </div>
          <div v-else-if="gift_index === -1 && possibleUseGifts">
            {{
              possibleUseGifts.total.toLocaleString() +
              $t('betslipPlaceBet.available')
            }}
          </div>
          <div class="cl-more" />
        </div>
      </div>

      <!--<div class="cl-flexcb cl-betReduction" @click="goReduce">-->
      <!--<div class="cl-left">-->
      <!--<div class="cl-col"-->
      <!--v-for="(item, index) in showReduction"-->
      <!--:key="index"-->
      <!--&gt;-->
      <!--{{`${$t('betslipPlaceBet.bet')} ≥ ${item.limit},${$t('betslipPlaceBet.odds')} ≥ ${item.odds} ${$t('betslipPlaceBet.get')} ${item.amount} ${$t('betslipPlaceBet.reduction')}`}}-->
      <!--</div>-->
      <!--</div>-->

      <!--<div class="cl-right">-->

      <!--</div>-->
      <!--</div>-->

      <div class="cl-flexcb cl-item cl-light">
        <div class="cl-left">{{ $t('betslipPlaceBet.total') }}</div>
        <div class="cl-right">{{ oddsCount.toFixed(2) }}</div>
      </div>

      <div class="cl-flexcb cl-item cl-light">
        <div class="cl-left">{{ $t('betslipPlaceBet.potential') }}</div>
        <div class="cl-right">{{ possibleWin.toFixed(2) }}</div>
      </div>

      <div class="cl-flexcb cl-item cl-light">
        <div class="cl-flexcc cl-left" @click="visibleBonusIntro(true)">
          <div>{{ $t('betslipPlaceBet.bonusList') }}</div>
          <div class="cl-flexcc cl-sighIcon" />
        </div>
        <div class="cl-right">{{ winBonus.toFixed(2) }}</div>
      </div>

      <div class="cl-flexcb cl-item cl-light cl-payout">
        <div class="cl-left">{{ $t('betslipPlaceBet.payout') }}</div>
        <div class="cl-right">{{ finalPayout.toFixed(2) }}</div>
      </div>

      <!-- <div class="cl-flexcc cl-reduceReminder">
        <div class="cl-icon" />
        <div class="cl-right">{{$t('betslipPlaceBet.reduceReminder')}}</div>
      </div>-->

      <div class="cl-flexce cl-placeWrap" ref="placeBotton">
        <div class="cl-flexcc" v-if="!hadExpiredTicket">
          <div class="cl-payBox">
            <div class="cl-pay">
              <span class="cl-word">{{
                $t('betslipPlaceBet.pay1') + ' ' + hb
              }}</span>
              <span class="cl-payNumber">{{ pay.toFixed(2) }}</span>
            </div>
            <div class="cl-reduceMoney" v-if="gift_index !== -1">
              <span class="cl-word">{{ $t('betslipPlaceBet.reduced') }}</span>
              <span class="cl-reduceNumber">{{
                giftList[gift_index].amount
              }}</span>
            </div>
          </div>
          <div
            class="cl-flexcc cl-lkButton cl-placeBox"
            @click="!info ? goWhere('login') : placeBet()"
          >
            {{ info ? $t('betslipPlaceBet.place') : $t('loginEntry.login') }}
          </div>
        </div>
        <div
          v-else
          class="cl-flexcc cl-lkButton cl-removeExpired"
          @click="removeExpiredMatches"
        >
          {{ $t('betslipMarketList.remove') }}
        </div>
      </div>
    </div>

    <!-- 确认弹窗 -->
    <drawer
      :visible.sync="$store.state.root.isConfirmShow"
      type="bottom"
      :height="146 / 36"
      z-index="3"
      :mask-click="false"
    >
      <betslipConfirm
        :pay="pay"
        :gift_index="gift_index"
        :gift-balance="giftBalance"
        @confirmBet="confirmBet"
        @visibleConfirm="visibleConfirm"
      />
    </drawer>

    <!--礼物列表-->
    <drawer
      :visible="$store.state.root.isGiftShow"
      @update:visible="visibleIsGiftShow"
      type="bottom"
      :height="334 / 36"
    >
      <betslipGifts
        :gift-list="giftList"
        :gift_index="gift_index"
        :odds-count="oddsCount"
        :stake="stake"
        @useGift="useGift"
        @visibleIsGiftShow="visibleIsGiftShow"
      />
    </drawer>

    <!--extra bonus modal-->
    <drawer :visible.sync="bonusIntroShow" type="bottom" :height="240 / 36">
      <betslipExtraBonusModal
        :percent="bonusList[ticketsOver.length]"
        :percent-more="bonusList[ticketsOver.length + 1]"
        :win-bonus="winBonus"
        :tickets-over="ticketsOver"
        @visibleBonusIntro="visibleBonusIntro"
      />
    </drawer>

    <!--loading-->
    <loading v-if="isLoadingShow" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import betslipGifts from '@/components/components/betslipGifts.vue'
import betslipGiftIntro from '@/components/components/betslipGiftIntro.vue'
import betslipConfirm from '@/components/components/betslipConfirm.vue'
import betslipExtraBonusModal from '@/components/components/betslipExtraBonusModal.vue'
import loading from '@/components/components/loading.vue'

export default {
  components: {
    betslipGifts,
    betslipGiftIntro,
    betslipConfirm,
    betslipExtraBonusModal,
    loading
  },
  props: {
    isKeep: {
      type: Boolean
    }
  },
  data() {
    return {
      // 投注金额
      stake: 500,
      // gift选择项
      gift_index: -1,
      // loading状态
      isLoadingShow: false,
      canPlaceBet: true,
      // ticket循环请求
      ticketInterval: '',
      // 按钮是否显示为登录
      isButtonCanNotUse: true,
      // 礼金列表
      giftList: [],
      giftBalance: 0,
      // gift说明控制
      isGiftIntroOpen: false,
      // 是否弹出过gift使用提示
      isGiftReminderShow: false,
      // 循环确认tickets状态
      intervalStatus: 1,
      // extra bonus
      bonusIntroShow: false,
      nowDate: new Date().getTime(),
      sportsBetActivityStake: Lib.store.get('sportsBetActivityStake')
    }
  },
  computed: {
    // 货币
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    },
    tickets() {
      return this.$store.state.tickets
    },
    // 是否有过期订单
    hadExpiredTicket() {
      return this.tickets.some((el) => el.isExpired)
    },
    // odds >= 1.2 的ticket
    ticketsOver() {
      return this.tickets.filter((el) => el.odds >= 1.2)
    },
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    // 总赔率
    oddsCount() {
      let odds = 1
      for (let i = 0; i < this.tickets.length; i++) odds *= this.tickets[i].odds

      if (this.gift_index !== -1) {
        if (odds < this.giftList[this.gift_index].odds) this.gift_index = -1
      }

      return Lib.common.MathFloor(odds, 2)
    },
    FullReduction() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .FullReduction
    },
    FullReduce() {
      const arr = this.FullReduction.filter((item) => {
        return (
          Number(this.stake) >= Number(item.limit) &&
          Number(this.oddsCount) > Number(item.odds)
        )
      })
      return arr ? arr[arr.length - 1] : null
    },
    showReduction() {
      const arr = this.FullReduction.filter((item) => {
        return (
          Number(this.stake) >= Number(item.limit) &&
          Number(this.oddsCount) > Number(item.odds)
        )
      })
      let showArr = []
      // 有合适的满减
      if (arr.length)
        showArr = this.FullReduction.slice(arr.length - 1, arr.length + 1)
      // 没有合适的满减
      else showArr = this.FullReduction.slice(0, 2)

      return showArr
    },
    // 纯赢钱数
    possibleWin() {
      const stake = this.stake || 0
      const payout = Lib.common.MathFloor(stake * this.oddsCount, 2) - stake
      if (payout >= this.NormalMaxWin) return this.NormalMaxWin
      return payout
    },
    // 多场比赛额外奖励金额数
    winBonus() {
      return Lib.common.MathFloor(
        (this.possibleWin * this.bonusList[this.ticketsOver.length]) / 100,
        2
      )
    },
    // 订单真实到账额度
    finalPayout() {
      const stake = this.stake || 0
      const payout = this.possibleWin + this.winBonus + stake
      if (payout >= this.NormalMaxWin) return this.NormalMaxWin
      return payout
    },
    // 真实支付金额
    pay() {
      const stake = this.stake || 0
      if (this.gift_index !== -1)
        return stake - this.giftList[this.gift_index].amount
      else return stake
      //  return this.FullReduce ? stake - Number(this.FullReduce.amount) : stake
    },
    // 可用gift金额
    possibleUseGifts() {
      let total = 0
      let time = 0
      let amount = 0
      // 初始选中gift
      for (let i = 0; i < this.giftList.length; i++) {
        if (
          this.giftList[i].limit <= this.stake &&
          this.oddsCount >= this.giftList[i].odds &&
          this.timeStatusJudge(this.giftList[i].start_time)
        ) {
          if (!time) amount = this.giftList[i].amount

          total += this.giftList[i].total
          time++
        }
      }
      return { total, amount }
    },
    platform() {
      return this.$store.state.platform
    },
    isPC() {
      return Lib.common.isPC()
    },
    bonusList() {
      return this.$store.state.bonusList
    },
    info() {
      return this.$store.state.info
    },
    giftItem() {
      let index = 0
      for (let i = 1; i < this.giftList.length; i++) {
        if (this.giftList[index].limit >= this.giftList[i].limit) index = i
      }
      if (this.gift_index !== -1) return null
      else return this.giftList[index]
    },
    NormalMinStake() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .NormalMinStake
    },
    NormalMaxWin() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .NormalMaxWin
    },
    imei() {
      return this.$store.state.imei
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    }
  },
  watch: {
    stake(newVal) {
      if (newVal) {
        this.stake = parseInt(newVal)
        this.$store.commit('setDefaultStake', this.stake)
      }
      // 帮用户自动选择gift
      this.filterForGifts()
    }
  },
  beforeMount() {
    !this.info ? this.getInfo() : (this.isButtonCanNotUse = false)
  },
  mounted() {
    this.intervalStatus = 1
    if (this.sportsBetActivityStake) {
      this.stake =
        this.sportsBetActivityStake > this.NormalMinStake
          ? this.sportsBetActivityStake
          : this.NormalMinStake
    } else {
      this.stake = this.FullReduction[1].limit
    }
    this.getGifts()
  },
  destroyed() {
    this.$store.commit('setRoot', {
      ...this.$store.state.root,
      isConfirmShow: false,
      isGiftShow: false
    })
    clearInterval(this.ticketInterval)
  },
  methods: {
    inputChange() {
      if (this.sportsBetActivityStake) {
        this.sportsBetActivityStake = null
        Lib.store.remove('sportsBetActivityStake')
      }
    },
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          this.$store.commit('savePhoneNumber', res.data.mobile)
          this.isButtonCanNotUse = false
        }
      })
    },
    // 获取可用gift
    getGifts() {
      this.$axios_api.giftsValid({ token: this.token, type: 1 }).then((res) => {
        if (res.code === 0) {
          this.giftBalance = res.data.balance
          this.giftList = res.data.list

          // 初始选中gift
          this.filterForGifts()
        }
      })
    },
    // 自动给用户选择可用gifts
    filterForGifts() {
      let stake = 0
      let index = -1
      for (let i = 0; i < this.giftList.length; i++) {
        if (
          this.giftList[i].limit <= this.stake &&
          this.oddsCount >= this.giftList[i].odds &&
          this.timeStatusJudge(this.giftList[i].start_time)
        ) {
          if (this.giftList[i].amount > stake) {
            stake = this.giftList[i].amount
            index = i
          }
        }
      }
      this.gift_index = index
    },
    // 打开gift说明
    openGiftIntro() {
      this.isGiftIntroOpen = true
    },
    closeGiftIntro() {
      this.isGiftIntroOpen = false
    },

    // 控制礼物列表的打开与隐藏
    visibleIsGiftShow: Lib.common.throttle(function (visible) {
      this.$store.commit('setRoot', {
        ...this.$store.state.root,
        isGiftShow: visible
      })
    }, 300),

    // 控制bonus打开与隐藏
    visibleBonusIntro: Lib.common.throttle(function (visible) {
      if (visible) Lib.common.event_statistics('betslip_open_bonus_boost_modal')
      this.bonusIntroShow = visible
    }, 300),

    openBonusPage() {
      Lib.common.event_statistics('betslip_bonus_boost_learn_more')
      this.$router.push({
        path: `/${this.$store.state.root.locale}/betslipBonus`
      })
    },
    // 投注
    placeBet() {
      if (Lib.common.getCookie('betSharingTicketId')) {
        Lib.common.event_statistics(
          `betslip_place_bet_sharing`,
          Lib.common.getCookie('betSharingTicketId')
        )
      } else {
        Lib.common.event_statistics('betslip_place_bet')
      }

      // 判断是否在查看ticket状态
      if (this.isLoadingShow) return

      // 赔率是否低于1.01
      if (this.isToLow()) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('reminder.removeMatches'),
          0
        )
        return
      }

      // 判断赠送金是否有限制
      if (
        this.gift_index !== -1 &&
        this.giftList[this.gift_index].limit > this.stake
      ) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('reminder.betLimit', {
            limit: this.giftList[this.gift_index].limit
          }),
          0
        )
        return
      }

      // 投注金额限制
      if (this.stake < this.NormalMinStake) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('reminder.minimumStake', { limit: this.NormalMinStake }),
          0
        )
        return
      }

      // 判断是否已经登录
      if (!this.info) {
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

      // 投注金额限制
      if (this.stake > this.info.balance) {
        Lib.common.errorReminder(
          this,
          'deposit',
          '',
          this.$t('betslipPlaceBet.betReminder1.title'),
          this.$t('betslipPlaceBet.betReminder1.msg'),
          this.$t('betslipPlaceBet.betReminder1.confirmButtonText'),
          this.$t('betslipPlaceBet.betReminder1.cancelButtonText')
        )
        return
      }

      if (this.isGiftReminderShow) {
        // 前往确认
        this.visibleConfirm(true)
      } else {
        // 打开gift reminder modal
        // eslint-disable-next-line no-lonely-if
        if (this.possibleUseGifts.total && this.gift_index === -1) {
          this.isGiftReminderShow = true
          Lib.common.errorReminder(
            this,
            'betslipGift',
            '',
            '',
            `${this.$t('betslipMarketList.reminderBoxTitle', {
              gift: this.possibleUseGifts.total
            })},${this.$t('betslipMarketList.reminderBet', {
              limit: this.stake,
              pay: this.stake - this.possibleUseGifts.amount
            })},${this.$t('betslipMarketList.reminderWhether')}`,
            this.$t('commonModal.yes'),
            this.$t('commonModal.no')
          )
        } else {
          this.visibleConfirm(true)
        }
      }
    },
    // 前往确认
    visibleConfirm: Lib.common.throttle(function (visible) {
      this.$store.state.root.isConfirmShow = visible
    }, 300),
    // 确认投注
    confirmBet() {
      if (!this.canPlaceBet) return
      this.canPlaceBet = false

      const outcomes = []
      for (let i = 0; i < this.tickets.length; i++) {
        outcomes.push(this.tickets[i].id)
      }

      if (Lib.common.getCookie('betSharingTicketId')) {
        Lib.common.event_statistics(
          `betslip_confirm_sharing`,
          Lib.common.getCookie('betSharingTicketId')
        )
      } else {
        Lib.common.event_statistics(`betslip_confirm`)
      }
      // 禁止点击
      this.isButtonCanNotUse = true
      this.isLoadingShow = true

      this.$axios_api
        .sportBet({
          token: this.token,
          share_tid: Lib.common.getCookie('betSharingTicketId'),
          platform: this.platform,
          stake: this.stake,
          device: this.isPC ? 1 : 0,
          device_id: this.imei,
          keep_odds: this.isKeep ? 1 : 0,
          gift_id:
            this.gift_index === -1 ? '' : this.giftList[this.gift_index].id,
          outcomes: JSON.stringify(outcomes),
          foryou: this.tickets.find((item) => item.foryou) ? 1 : 0
        })
        .then((res) => {
          if (res.code === 0) {
            this.ticketInterval = setInterval(() => {
              this.ticketRequest(res.data.ticket_id, res.data.share_id)
            }, 500)
            if (this.sportsBetActivityStake) {
              //  投注成功就清除限时活动金额
              Lib.store.remove('sportsBetActivityStake')
            }
          } else if (res.code === 10101) {
            this.canPlaceBet = true
            this.isButtonCanNotUse = false
            this.isLoadingShow = false
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
          } else if (res.code === 10505) {
            this.canPlaceBet = true
            this.isButtonCanNotUse = false
            this.isLoadingShow = false
            // 投注时，某些market不可投注，删除处理
            for (let j = 0; j < res.data.outcomes.length; j++) {
              for (let i = 0; i < this.tickets.length; i++) {
                if (this.tickets[i].id === res.data.outcomes[j]) {
                  this.$set(this.tickets[i], 'outcome_status', 1)
                }
              }
            }
            Lib.store.set(
              'tickets',
              Lib.common.encrypt(JSON.stringify(this.tickets))
            )
            Lib.common.errorReminderUp(
              this,
              true,
              this.$t('reminder.expired'),
              0
            )
          } else if (res.code === 10077) {
            // gift 错误
            this.canPlaceBet = true
            this.isButtonCanNotUse = false
            this.isLoadingShow = false
            // 重新获取gift信息
            this.getGifts()
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          } else if (res.code === 10078) {
            // 余额不足
            this.canPlaceBet = true
            this.isButtonCanNotUse = false
            this.isLoadingShow = false
            // 重新获取用户账户信息
            this.getInfo()
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          } else {
            // 其他后台系统错误，用户可尝试重新投注
            this.canPlaceBet = true
            this.isButtonCanNotUse = false
            this.isLoadingShow = false
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          }
        })
    },
    // 判断投注项是否有赔率低于1.0.1的
    isToLow() {
      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].odds < 1.01) {
          this.tickets.splice(i, 1)
          Lib.store.set(
            'tickets',
            Lib.common.encrypt(JSON.stringify(this.tickets))
          )
          i--
          return true
        }
      }
      return false
    },
    // 循环请求ticket
    ticketRequest(ticket, share_id) {
      this.$axios_api
        .ticketPhase({
          platform: this.platform,
          ticket_id: ticket,
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            if (res.data.phase === 3 || res.data.phase === 1) {
              // 本地存入通知赛事数据需要初始化更新
              Lib.store.set('hallRefreshData', true)
              Lib.store.set('liveRefreshData', true)
              // 投注成功后
              const finalPayout = this.finalPayout

              if (!this.isKeep) {
                setTimeout(() => {
                  this.$store.commit('setTickets', [])
                  Lib.store.remove('tickets')
                }, 3000)
              }

              if (this.intervalStatus) {
                this.intervalStatus = 0
                // 生成渠道数组
                const channelArr = [
                  sessionStorage.getItem('sesChannel'),
                  Lib.common.getCookie('channel')
                ]
                // 获取渠道码
                const channel = channelArr.find((a) => a)

                if (channel == 9 || channel == 1008) {
                  fbq('track', 'Purchase', {
                    value: this.stake,
                    currency: 'XAF',
                    content_name: 'preMatchOrLive'
                  })
                }
                Lib.common.event_statistics('betslip_placeBet_success')

                this.$router.replace({
                  path: `/${this.$store.state.root.locale}/betslipSuccess`,
                  query: {
                    totalStake: this.stake,
                    //                  reduction:this.FullReduce ? this.FullReduce.amount : 0,
                    gift:
                      this.gift_index === -1
                        ? 0
                        : this.giftList[this.gift_index].amount,
                    percent:
                      this.ticketsOver.length >= 3
                        ? this.bonusList[this.ticketsOver.length]
                        : 0,
                    bonus: this.ticketsOver.length >= 3 ? this.winBonus : 0,
                    payout: res.data.tickets
                      ? res.data.tickets.win_expected
                      : finalPayout,
                    ticketId: ticket,
                    shareId: share_id,
                    where: 'betslip',
                    phase: res.data.phase,
                    period_id: res.data.period_id, // sports promos期数id
                    betType: res.data.tickets ? res.data.tickets.category : ''
                  }
                })
              }

              // 清除分享share code
              this.deleteShareCodeCookie()
              // 清除循环请求状态
              clearInterval(this.ticketInterval)

              // 投注状态调整
              this.isButtonCanNotUse = false
              this.isLoadingShow = false
              this.canPlaceBet = true
            } else if (res.data.phase === 4) {
              this.canPlaceBet = true
              this.isButtonCanNotUse = false
              this.isLoadingShow = false

              Lib.common.errorReminder(
                this,
                '',
                '',
                this.$t('betRefused.title'),
                `${this.$t('accountMybetBox.bet_id_title')} ${ticket},${
                  res.data.error_info.info_msg
                }`,
                this.$t('betslipMarketList.remove'),
                this.$t('betslipPlaceBet.checkDetail'),
                this.removeExpiredMatches,
                () => {
                  if (this.routeName !== 'betslip')
                    this.$router.push({
                      path: `/${this.$store.state.root.locale}/betslip`
                    })
                }
              )

              const err_outcome_id = res.data.error_info
                ? res.data.error_info.rejectinfo
                  ? res.data.error_info.rejectinfo.outcome_id
                  : undefined
                : undefined
              if (err_outcome_id) {
                for (let i = 0; i < this.tickets.length; i++) {
                  if (this.tickets[i].id === err_outcome_id) {
                    this.$set(this.tickets[i], 'outcome_status', 1)
                  }
                }
              }
              clearInterval(this.ticketInterval)
            } else {
              // mts还未返回
            }
          }
        })
        .catch(() => {
          this.canPlaceBet = true
          clearInterval(this.ticketInterval)
        })
    },
    // 清除分享share code
    deleteShareCodeCookie() {
      Lib.common.delCookie('betSharingTicketId')
    },
    // 使用gift
    useGift(index) {
      Lib.common.event_statistics('betslip_choose_gift')
      this.gift_index = index
    },
    goReduce() {
      this.$router.push(`/${this.$store.state.root.locale}/betReduction`)
    },
    goWhere(path) {
      const obj = {
        path: `/${this.$store.state.root.locale}` + '/' + path
      }
      if (path === 'login')
        obj.query = {
          fromName: this.$route.path
        }

      this.$router.push(obj)
    },
    // 删除已过期的比赛
    removeExpiredMatches() {
      const tickets = this.tickets.filter((el) => !el.isExpired)
      this.$store.commit('setTickets', tickets)
      this.judgeFollowBet()
      Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify(tickets)))
    },
    // 判断是否在跟投
    judgeFollowBet() {
      // 跟投订单的比赛数据
      if (!Lib.common.getCookie('betSharingTicketId')) return
      const shareTicketsStorage = Lib.store.get('shareTickets')
      if (!shareTicketsStorage) return
      const shareTickets = Lib.common.decrypt(shareTicketsStorage)
      for (let i = 0; i < shareTickets.length; i++) {
        let bool = false
        for (let j = 0; j < this.tickets.length; j++) {
          if (shareTickets[i].id === this.tickets[j].id) bool = true
        }
        if (!bool) this.deleteShareCodeCookie()
      }
    },
    // 时间过期状态判断
    timeStatusJudge(time) {
      return this.nowDate > (time * 1000 || 0)
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipPlaceBet-wrap {
  width: 10rem;
  background-color: #fff;
  box-sizing: border-box;
  color: #000;

  .cl-stake {
    padding: 0 10rem/36;
    font-size: 15rem/36;

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

    .cl-offersRewards {
      font-size: 13rem/36;
      font-weight: bold;
      color: #000;
    }
  }
  .cl-sighIcon {
    margin-left: 3rem/36;
    .sprite(@ticon-exclamation, 108rem);
  }

  // .cl-betReduction {
  //   width: 340rem/36;
  //   margin: 2rem/36 auto;
  //   padding: 7rem/36;
  //   box-sizing: border-box;
  //   border-radius: 3rem/36;
  //   background-color: #fff3e8;

  //   .cl-left {
  //     color: #e82010;
  //     font-size: 10rem/36;
  //   }

  //   .cl-right {
  //     transform: rotate(180deg);
  //     transform-origin: center;
  //     .sprite(@icon-back, 108rem);
  //   }
  // }

  // .cl-reduceReminder {
  //   padding-bottom: 8rem/36;

  //   .cl-icon {
  //     margin: 0 10rem/36;
  //     .sprite(@icon-reduce, 108rem);
  //   }

  //   .cl-right {
  //     color: #858585;
  //     font-size: 10rem/36;
  //   }
  // }

  .cl-item {
    font-size: 13rem/36;
    color: #000;
    padding: 5rem/36 10rem/36;
    font-weight: bold;
    &.cl-light {
      padding: 3rem/36 10rem/36;
      .cl-left {
        font-weight: 400;
        color: #a2a2a7;
      }
    }
    &.cl-payout {
      margin-bottom: 10rem/36;
    }
    .cl-left {
      position: relative;
      .cl-giftIcon {
        margin-right: 5rem/36;
        .sprite(@icon-betslip-gift, 108rem);
      }
    }
    .cl-chooseGifts1 {
      font-weight: 400;
      color: #e62d0e;
    }
    .cl-chooseGifts2 {
      color: #e62d0e;
    }
    .cl-right {
      .cl-more {
        margin-left: 3rem/36;
        .sprite(@ticon-back-grey, 108rem);
      }
    }
  }

  .cl-placeWrap {
    height: 46.5rem/36;
    background-color: #fff;
    border-top: 0.5rem/36 solid #e9e9f3;
    color: #333;

    .cl-payBox {
      text-align: right;

      .cl-word {
        font-size: 11rem/36;
        font-weight: 400;
      }

      .cl-payNumber {
        font-weight: bold;
        font-size: 19rem/36;
      }

      .cl-reduceNumber {
        color: #e62d0e;
        font-size: 8rem/36;
      }
    }
  }

  .cl-removeExpired {
    width: 340rem/36;
    height: 40rem/36;
    margin-right: 10rem/36;
    font-size: 13rem/36;
  }

  .cl-placeBox {
    width: 133rem/36;
    height: 40rem/36;
    margin-right: 10rem/36;
    margin-left: 10rem/36;
    font-size: 13rem/36;
  }
}
</style>
