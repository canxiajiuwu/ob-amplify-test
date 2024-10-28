<template>
  <div class="cl-placeBetCom-wrap" :class="{ 'cl-isLive': where === 'live' }">
    <div
      class="cl-maskBox"
      v-if="position === domHeight"
      @click.self="position = 0"
      @touchstart.stop="touchdown"
      @touchmove.stop="touchmove"
      @touchend.stop="end"
    />

    <div
      class="cl-touchMoveBox"
      @touchstart.stop="touchdown"
      @touchmove.stop="touchmove"
      @touchend.stop="end"
    >
      <div
        class="cl-dragBox"
        :style="{ transform: `translateY(${position + moveDistance}px)` }"
        @mousedown.stop="mousedown"
      >
        <div
          class="cl-flexcc cl-dragtag"
          @click.stop="position = position ? 0 : domHeight"
        >
          <div class="cl-icon" />
        </div>
        <div ref="contentBox" class="cl-contentBox">
          <div ref="widthBox" class="cl-widthBox">
            <div class="cl-bonusBox" v-if="ticketsOver.length < 42">
              <span
                v-if="ticketsOver.length >= 3"
                v-html="$t('footerMenu.bonus', { percent: percentBonus + '%' })"
              />
              <span
                v-html="
                  ticketsOver.length >= 3
                    ? $t('footerMenu.bonusMore', {
                        percent: NextStepPercent + '%'
                      })
                    : $t('footerMenu.bonusLess', {
                        number: 3 - ticketsOver.length,
                        percent: '3%'
                      })
                "
              />
            </div>
            <div style="height: calc(10rem / 36)" />
            <div class="cl-flexcc cl-bsbb cl-stake">
              <div class="cl-inl">{{ $t('betslipPlaceBet.stake') }}</div>
              <input
                type="number"
                :placeholder="'Min.' + NormalMinStake"
                v-model="stake"
              />
              <div class="cl-hb">{{ hb }}</div>
            </div>
            <div style="height: calc(14rem / 36)" />
            <div class="cl-offersRewards">
              {{ $t('betslipPlaceBet.offersRewards') }}
            </div>
            <div style="height: calc(10rem / 36)" />
            <div class="cl-flexcb cl-item">
              <div class="cl-left">{{ $t('betslipPlaceBet.total') }}</div>
              <div class="cl-flexcc cl-oddsBox" :class="'no-' + oddsState">
                <div
                  class="cl-oddsCount"
                  :class="{ 'cl-oddsCountExpired': hadExpiredTicket }"
                >
                  {{
                    hadExpiredTicket
                      ? $t('betslipPlaceBet.oddsExpire')
                      : oddsCount.toFixed(2)
                  }}
                </div>
                <div
                  v-if="oddsState && !hadExpiredTicket"
                  class="cl-icon"
                  :class="
                    oddsState === 'up' ? 'cl-iconRotate0' : 'cl-iconRotate180'
                  "
                />
              </div>
            </div>
            <div style="height: calc(7rem / 36)" />
            <template v-if="giftList.length > 0">
              <div class="cl-flexcb cl-item">
                <div
                  class="cl-flexcc cl-left"
                  @click.stop="
                    giftTipsWord = ''
                    isGiftIntroOpen = 1
                  "
                >
                  <div class="cl-giftIcon" />
                  <span class="cl-chooseGifts1">
                    {{ $t('betslipPlaceBet.choose') }}
                  </span>
                  <div class="cl-flexcc cl-sighIcon" />
                  <betslipGiftIntro
                    v-if="isGiftIntroOpen"
                    :where="where"
                    :word="giftTipsWord"
                    :direction="direction"
                    @closeGiftIntro="
                      isGiftIntroOpen = 0
                      direction = ''
                    "
                  />
                </div>
                <div
                  class="cl-flexcc cl-right cl-chooseGifts2"
                  @click="visibleIsGiftShow(true)"
                >
                  <div v-if="gift_index !== -1">
                    - {{ $t('unit') + chooseGift.amount }}
                  </div>
                  <div v-else-if="gift_index === -1 && giftBalance">
                    {{
                      giftBalance.toLocaleString() +
                      ' ' +
                      $t('betslipPlaceBet.available')
                    }}
                  </div>
                  <div class="cl-more" />
                </div>
              </div>
              <div style="height: calc(7rem / 36)" />
            </template>
            <div class="cl-flexcb cl-item cl-payout">
              <div class="cl-left">{{ $t('betslipPlaceBet.payout') }}</div>
              <div class="cl-flexcc cl-right" @click="toggleAmountBox">
                <div>{{ finalPayout.toFixed(2) }}</div>
                <div
                  class="cl-more"
                  :class="amountBoxFlag ? 'cl-iconRotate90' : 'cl-iconRotate0'"
                />
              </div>
            </div>
            <div style="height: calc(7rem / 36)" />
          </div>
          <!-- 填资金抽屉 -->
          <div style="height: calc(79rem / 36)" />
          <div class="cl-amountWrap">
            <CollapseTransition>
              <div v-if="amountBoxFlag" class="cl-amountBox">
                <div style="height: calc(10rem / 36)" />
                <div class="cl-flexcb cl-item">
                  <div class="cl-left">
                    {{ $t('betslipPlaceBet.potential') }}
                  </div>
                  <div>{{ possibleWin.toFixed(2) }}</div>
                </div>
                <div style="height: calc(7rem / 36)" />
                <div class="cl-flexcb cl-item">
                  <div class="cl-left">{{ $t('betslipPlaceBet.stake') }}</div>
                  <div>{{ stake ? stake.toFixed(2) : '0.00' }}</div>
                </div>
                <div style="height: calc(7rem / 36)" />
                <div class="cl-flexcb cl-item">
                  <div
                    class="cl-flexcc cl-left"
                    @click="visibleBonusIntro(true)"
                  >
                    <div>{{ $t('betslipPlaceBet.bonusList') }}</div>
                    <div class="cl-flexcc cl-sighIcon" />
                  </div>
                  <div>{{ winBonus.toFixed(2) }}</div>
                </div>
                <div style="height: calc(10rem / 36)" />
              </div>
            </CollapseTransition>
          </div>
          <!-- 防止可以滚动时,与下方按钮离太近 -->
          <div style="height: calc(10rem / 36)" />
        </div>
        <!-- 填补动画弹动时遗留的空隙 -->
        <div style="height: calc(70rem / 36)" />
      </div>
      <div class="cl-buttonBox">
        <div
          v-if="position != domHeight"
          @click.stop="position = position ? 0 : domHeight"
          class="cl-oddsBox"
          :class="'no-' + oddsState"
        >
          <div class="cl-flexcs">
            <div>{{ $t('betslipPlaceBet.odds') + ':' }}</div>
            <div
              class="cl-oddsCount"
              :class="{ 'cl-oddsCountExpired': hadExpiredTicket }"
            >
              {{
                hadExpiredTicket
                  ? $t('betslipPlaceBet.oddsExpire')
                  : oddsCount.toFixed(2)
              }}
            </div>
            <div
              v-if="oddsState && !hadExpiredTicket"
              class="cl-icon"
              :class="
                oddsState === 'up' ? 'cl-iconRotate0' : 'cl-iconRotate180'
              "
            />
          </div>
          <div class="cl-bonus-boost" v-if="tickets.length > 0">
            <span v-if="ticketsOver.length >= 3">
              Bonus Boost:
              {{
                percentBonus +
                '% ' +
                theword.of[$store.state.root.locale] +
                ' 600%'
              }}
            </span>
            <span v-else>
              {{
                theword.atabb[$store.state.root.locale].replace(
                  '{num}',
                  3 - ticketsOver.length
                )
              }}
            </span>
          </div>
        </div>
        <div class="cl-rightBox">
          <div
            v-if="position == domHeight"
            class="cl-wordBox"
            :class="{ 'cl-wordBox1': gift_index === -1 }"
          >
            <div class="cl-flexcc">
              <span class="cl-word">
                {{ $t('betslipPlaceBet.pay1') + ' ' + hb }}
              </span>
              <span class="cl-payNumber">{{ pay.toFixed(2) }}</span>
            </div>
            <div v-if="gift_index !== -1" class="cl-reduceMoney">
              {{ $t('betslipPlaceBet.reduced') + ' ' + chooseGift.amount }}
            </div>
          </div>
          <div
            class="cl-flexcc cl-lkButton cl-payBox"
            :class="{ 'cl-canNoClick': position == domHeight && canNoClick }"
            @click.stop="buttonObj.fn"
          >
            {{ buttonObj.word }}
          </div>
        </div>
      </div>
    </div>
    <!--礼物列表-->
    <drawer
      :visible="$store.state.root.isGiftShow"
      @update:visible="visibleIsGiftShow"
      type="bottom"
      :border-radius="13"
      :height="341 / 36"
    >
      <betslipGifts
        :gift-list="giftList"
        :gift_index="gift_index"
        :odds-count="oddsCount"
        :stake="stake"
        @useGift="useGift"
        @visibleIsGiftShow="visibleIsGiftShow"
        :bottom-height="70"
      />
    </drawer>
    <!--extra bonus modal-->
    <drawer :visible.sync="bonusIntroShow" type="bottom" :height="300 / 36">
      <betslipExtraBonusModal
        :percent="
          ticketsOver.length >= 42 ? 600 : bonusList[ticketsOver.length]
        "
        :percent-more="
          ticketsOver.length >= 42 ? 600 : bonusList[ticketsOver.length + 1]
        "
        :win-bonus="winBonus"
        :tickets-over="ticketsOver"
        @visibleBonusIntro="visibleBonusIntro"
      />
    </drawer>
    <!-- loading -->
    <loading v-if="isLoadingShow" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import loading from '@/components/components/loading.vue'
import betslipGifts from '@/components/components/betslipGifts.vue'
import betslipGiftIntro from '@/components/components/betslipGiftIntro.vue'
import betslipExtraBonusModal from '@/components/components/betslipExtraBonusModal.vue'

export default {
  name: 'PlaceBetCom',
  components: {
    loading,
    betslipGifts,
    betslipGiftIntro,
    betslipExtraBonusModal,
    CollapseTransition: Lib.common.CollapseTransition
  },
  props: ['where'],
  data() {
    return {
      canPlaceBet: 1,
      isGiftReminderShow: 0, // 是否弹出过gift使用提示
      isLoadingShow: 0, // 加载动画
      stake: 600, // 支付金额
      gift_index: -1, // gift选择项
      giftBalance: 0,
      giftTipsWord: '', // 礼物气泡提示文案
      domHeight: 0, // 抽屉内容当前高度
      holdDownflag: 0, // 按住抽屉
      position: 0, // 抽屉当前位置数据
      clickPosition: 0, // 抽屉按住时位置
      moveDistance: 0, // 单次移动的距离
      oddsState: '', // 赔率变化样式
      amountBoxFlag: 1, // 金额盒子是否展示
      ticketInterval: '', // ticket循环请求
      isGiftIntroOpen: 0, // gift说明控制
      intervalStatus: 1, // 循环确认tickets状态
      bonusIntroShow: false, // extra bonus
      pollingFnTimes: 60, // 订单轮询时间
      pollingFnTimer: null, // 订单轮询计时器容器
      direction: '' // gift提示方位
    }
  },
  computed: {
    isBetslip() {
      return this.routeName === 'betslip'
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    },
    giftList() {
      return this.$store.state.giftList
    },
    theword() {
      return {
        of: { en: 'of', fr: 'sur' },
        atabb: {
          en: 'Add {num} to activate 3% bonus boost',
          fr: 'Ajoutez-en {num} pour activer le bonus de 3 %'
        }
      }
    },
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    // 货币
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    },
    isMobile() {
      return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
        ? 1
        : 0
    },
    tickets() {
      return this.$store.state.tickets
    },
    bonusList() {
      return this.$store.state.bonusList
    },
    percentBonus() {
      return this.ticketsOver.length >= 42
        ? 600
        : this.bonusList[this.ticketsOver.length]
    },
    // 真实支付金额
    pay() {
      const stake = this.stake || 0
      if (this.gift_index !== -1) return stake - this.chooseGift.amount
      else return stake
    },
    // 赔率
    oddsCount() {
      let odds = 1
      for (let i = 0, len = this.tickets.length; i < len; i++)
        odds *= this.tickets[i].odds
      return odds
    },
    // 多场比赛额外奖励金额数
    winBonus() {
      const bonusPercent =
        this.ticketsOver.length >= 42
          ? 600
          : this.bonusList[this.ticketsOver.length]
      return Lib.common.MathFloor((this.possibleWin * bonusPercent) / 100, 2)
    },
    NextStepPercent() {
      return this.bonusList[this.ticketsOver.length + 1]
    },
    // 是否有过期订单
    hadExpiredTicket() {
      return this.tickets.some((a) => a.isExpired)
    },
    // 按钮状态
    buttonObj() {
      if (this.position != this.domHeight) {
        if (this.hadExpiredTicket) {
          // betslip 页面进行删除过气订单
          if (this.isBetslip)
            return {
              word: this.$t('betslipMarketList.remove'),
              fn: () => {
                Lib.common.event_statistics(`Betslip_Remove_Click`)
                this.removeExpiredMatches()
              }
            }
          // 其余页面查看betslip页面
          else
            return {
              word: this.$t('betslipPlaceBet.checkDetail'),
              fn: () => this.goWhere('betslip')
            }
        } else
          return {
            word: this.isBetslip
              ? this.$t('betslipPlaceBet.bet')
              : this.$t('betslipPlaceBet.qBet'),
            fn: () => (this.position = this.domHeight)
          }
      }
      if (this.hadExpiredTicket) {
        // betslip 页面进行删除过气订单
        if (this.isBetslip)
          return {
            word: this.$t('betslipMarketList.remove'),
            fn: () => {
              Lib.common.event_statistics(`Betslip_Remove_Click`)
              this.removeExpiredMatches()
            }
          }
        // 其余页面查看betslip页面
        else
          return {
            word: this.$t('betslipPlaceBet.checkDetail'),
            fn: () => this.goWhere('betslip')
          }
      }
      if (!this.info)
        return {
          word: this.$t('loginEntry.login'),
          fn: () => {
            Lib.common.event_statistics(`Betslip_Login_Click`)
            this.goWhere('login')
          }
        }
      return { word: this.$t('betslipPlaceBet.place'), fn: this.placeBet }
    },
    NormalMinStake() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .NormalMinStake
    },
    NormalMaxWin() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .NormalMaxWin
    },
    platform() {
      return this.$store.state.platform
    },
    isPC() {
      return Lib.common.isPC()
    },
    imei() {
      return this.$store.state.imei
    },
    isKeep() {
      return this.$store.state.isKeep
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    // odds >= 1.2 的ticket
    ticketsOver() {
      return this.tickets.filter((a) => a.odds >= 1.2)
    },
    // 纯赢钱数
    possibleWin() {
      const stake = this.stake || 0
      const payout = Lib.common.MathFloor(stake * this.oddsCount, 2) - stake
      if (payout >= this.NormalMaxWin) return this.NormalMaxWin
      return payout
    },
    // 订单真实到账额度
    finalPayout() {
      const stake = this.stake || 0
      const payout = this.possibleWin + this.winBonus + stake
      if (payout >= this.NormalMaxWin) return this.NormalMaxWin
      return payout
    },
    // 最小gift金额
    giftsminlimit() {
      let minlimit = 0
      this.giftList.forEach((a) => {
        if (minlimit) minlimit = a.limit < minlimit ? a.limit : minlimit
        else minlimit = a.limit
      })
      return minlimit
    },
    chooseGift() {
      const gobj = this.giftList[this.gift_index]
      return gobj || { amount: 0, id: '', limit: 0, odds: 0 }
    },
    canNoClick() {
      return (
        !this.stake ||
        this.stake < this.chooseGift.limit ||
        this.oddsCount < this.chooseGift.odds
      )
    },
    tword() {
      const { locale } = this.$store.state.root
      return [
        ({ odds }) => {
          return locale === 'fr'
            ? `Ce cadeau en espèces nécessitait une cote > ${odds} que votre ticket n'a pas atteinte, choisissez d'autres cadeaux en espèces ou ajoutez plus de marchés à votre ticket.`
            : `This cash gift required an Odds > ${odds} which your ticket didn't reach, choose other cash gifts or add more markets to your ticket.`
        },
        ({ giftBalance, giftsminlimit, hb }) => {
          const str1 = giftBalance + ' ' + hb
          const str2 = giftsminlimit + ' ' + hb
          return locale === 'fr'
            ? `Il vous reste encore un cadeau de ${str1} inutilisé, la mise minimale requise est de seulement ${str2}`
            : `You still have ${str1} gift unused, the minimum required bet is only ${str2}`
        },
        ({ ticket, finalPayout, hb }) => {
          const str = finalPayout + ' ' + hb
          return locale === 'fr'
            ? `Votre ticket #${ticket} a été accepté et vous devriez gagner ${str}`
            : `Your ticket #${ticket} has been accepted and you are expected to win ${str}`
        },
        () => {
          return locale === 'fr'
            ? `Il y a un ou plusieurs matchs expirés/non autorisés à parier, veuillez vérifier les détails dans votre Betslip.`
            : `There is one or more expired/not allowed to bet match(s), kindly check the detail in your BetSlip.`
        }
      ]
    }
  },
  watch: {
    $route() {
      this.position = 0
      this.bonusIntroShow = false
      this.$store.state.root.isGiftShow = false
    },
    oddsCount(newVal, oldVal) {
      if (newVal > oldVal) this.oddsState = 'up'
      else if (newVal < oldVal) this.oddsState = 'down'
      else this.oddsState = ''
    },
    stake(newVal) {
      if (newVal) {
        this.stake = parseInt(newVal)
        this.$store.commit('setDefaultStake', this.stake)
      }
      // 帮用户自动选择gift
      this.filterForGifts()
    },
    'tickets.length'() {
      this.oddsState = ''
    },
    position(val) {
      this.$store.commit('setFooterDomHeight', val * -1)
      // 抽屉展开需要刷新的数据
      if (val == this.domHeight) {
        this.intervalStatus = 1
        // 获取限时礼盒特定金额
        this.getActivityStake()
        // 刷新礼物与订单状态
        this.getGifts()
        this.checkBetslip()
        this.pollingFn(10)
        // 滚动订单数据列表
        this.scrollBetList()
      }
      // 抽屉关闭
      else {
        // 重置气泡提示
        this.isGiftIntroOpen = 0
        this.pollingFn(60)
      }
    }
  },
  beforeMount() {
    this.getActivityStake()
    if (this.token && !this.info) this.getInfo()
  },
  mounted() {
    this.getContentHeight()
    this.setBetslipBasicInfo()
    this.pollingFn(60)
  },
  beforeDestroy() {
    this.pollingFnTimer && clearInterval(this.pollingFnTimer)
    this.ticketInterval && clearInterval(this.ticketInterval)
    const arr = Lib.store.get('tickets')
      ? JSON.parse(Lib.common.decrypt(Lib.store.get('tickets')))
      : []
    if (this.tickets.length == 0 && arr.length == 0)
      sessionStorage.removeItem('userChooseGift')
    // 记录用户选择的金额和gift选择
    sessionStorage.setItem(
      'betslipBasicInfo',
      JSON.stringify({ stake: this.stake, gift_index: this.gift_index })
    )
  },
  methods: {
    // 同步投注信息
    setBetslipBasicInfo() {
      const { stake, gift_index } = this.$route.params
      if (stake) {
        this.stake = stake
        this.gift_index = gift_index
        return
      }

      const basicInfo = sessionStorage.getItem('betslipBasicInfo')
      if (basicInfo) {
        const { stake, gift_index } = JSON.parse(basicInfo)
        this.stake = stake
        this.gift_index = gift_index
      }
    },
    // 获取限时礼盒限定金额
    getActivityStake() {
      const sznum = Lib.store.get('sportsBetActivityStake')
      if (sznum) {
        this.stake = sznum > this.NormalMinStake ? sznum : this.NormalMinStake
        Lib.store.remove('sportsBetActivityStake')
      }
    },
    // 控制礼物列表的打开与隐藏
    visibleIsGiftShow: Lib.common.throttle(function (visible) {
      Lib.common.event_statistics(`Betslip_Gift_Click`)
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

              setTimeout(() => {
                this.$store.commit('setTickets', [])
                Lib.store.remove('tickets')
              }, 1500)

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
                Lib.common.event_statistics(`Betslip_Result`, `Success`)

                sessionStorage.removeItem('betslipBasicInfo')
                if (this.isBetslip) {
                  this.$router.replace({
                    path: `/${this.$store.state.root.locale}/betslipSuccess`,
                    query: {
                      totalStake: this.stake,
                      gift: this.chooseGift.amount,
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
                } else {
                  Lib.common.errorReminder(
                    this,
                    '',
                    '',
                    res.data.phase === 1
                      ? this.$t('betslipSuccess.betSuccessLive')
                      : this.$t('betslipSuccess.betSuccessful'),
                    res.data.phase === 1
                      ? this.$t('betslipSuccess.betSuccessLiveWord')
                      : this.tword[2]({
                          ticket,
                          finalPayout: this.finalPayout,
                          hb: this.hb
                        }),
                    this.$t('reminder.button.ok'),
                    this.$t('betslipSuccess.check'),
                    null,
                    () => {
                      Lib.common.event_statistics(
                        'footer_betslip_success_check_bet_history'
                      )
                      this.$router.push({
                        path: `/${this.$store.state.root.locale}/mybetDetail/${ticket}`,
                        query: { ticket_date_type: 1, ticket_category: 0 }
                      })
                    }
                  )
                }
              }

              // 清除分享share code
              this.deleteShareCodeCookie()
              // 清除循环请求状态
              clearInterval(this.ticketInterval)

              // 投注状态调整

              this.isLoadingShow = false
              this.canPlaceBet = true
            } else if (res.data.phase === 4) {
              this.canPlaceBet = true
              this.isLoadingShow = false
              Lib.common.event_statistics(`Betslip_Result`, `Failed:mts`)

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
                  if (!this.isBetslip)
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
          this.canPlaceBet = 1
          clearInterval(this.ticketInterval)
          Lib.common.event_statistics(`Betslip_Result`, `Failed:other`)
        })
    },
    // 使用gift
    useGift(index) {
      Lib.common.event_statistics('betslip_choose_gift')
      sessionStorage.setItem('userChooseGift', 1)
      this.gift_index = index
      // 投注金额不满足
      if (this.gift_index !== -1 && this.stake < this.chooseGift.limit)
        this.stake = this.chooseGift.limit
      // 取消使用gift提示判断
      this.notUseGiftJudge()
    },
    giftOddsTips() {
      Lib.common.errorReminderUp(
        this,
        true,
        this.tword[0]({ odds: this.chooseGift.odds }),
        0
      )
    },
    // 删除已过期的比赛
    removeExpiredMatches() {
      const tickets = this.tickets.filter((el) => !el.isExpired)
      this.$store.commit('setTickets', tickets)
      this.judgeFollowBet()
      Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify(tickets)))

      // 帮用户自动选择gift
      this.filterForGifts()
    },
    // 判断是否在跟投
    judgeFollowBet() {
      // 跟投订单的比赛数据
      if (!Lib.common.getCookie('betSharingTicketId')) return
      const shareTicketsStorage = Lib.store.get('shareTickets')
      if (!shareTicketsStorage) return
      const shareTickets = Lib.common.decrypt(shareTicketsStorage)
      if (Array.isArray(shareTickets)) {
        for (let i = 0, len = shareTickets.length; i < len; i++) {
          const bool = this.tickets.some((x) => shareTickets[i].id == x.id)
          if (!bool) return this.deleteShareCodeCookie()
        }
      }
    },
    // 投注
    placeBet() {
      Lib.common.event_statistics(
        `Betslip_Stake_Click`,
        `Input_Amount:${this.stake}`
      )
      Lib.common.event_statistics(
        `Betslip_Bets_Click`,
        `Deposit_Status:${
          this.accountInfo?.first_deposit
            ? 'first_deposit_not'
            : 'first_deposit'
        }, Bet_Where: ${this.routeName}`
      )

      if (Lib.common.getCookie('betSharingTicketId')) {
        Lib.common.event_statistics(
          `betslip_place_bet_sharing`,
          `ticketId:${Lib.common.getCookie('betSharingTicketId')}`
        )
      }
      // 判断是否在查看ticket状态
      if (this.isLoadingShow) return
      // 赔率是否低于1.01
      if (this.isToLow())
        return Lib.common.errorReminderUp(
          this,
          true,
          this.$t('reminder.removeMatches'),
          0
        )
      // 判断赠送金是否有限制
      if (this.gift_index !== -1) {
        if (this.chooseGift.limit > this.stake) {
          Lib.common.errorReminderUp(
            this,
            true,
            this.$t('reminder.betLimit', { limit: this.chooseGift.limit }),
            0
          )
          return
        }
        if (this.oddsCount < this.chooseGift.odds) return this.giftOddsTips()
      }
      // 投注金额限制
      if (this.stake < this.NormalMinStake) {
        Lib.common.event_statistics(`Betslip_Result`, `Failed:money_not_enough`)
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('reminder.minimumStake', { limit: this.NormalMinStake }),
          0
        )
        return
      }
      // 投注金额限制
      if (this.stake > this.info.balance) {
        Lib.common.event_statistics(
          `Betslip_Result`,
          `Failed:balance_insufficient`
        )
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
      if (!this.canPlaceBet) return
      this.canPlaceBet = 0
      if (Lib.common.getCookie('betSharingTicketId')) {
        Lib.common.event_statistics(
          `betslip_confirm_sharing`,
          Lib.common.getCookie('betSharingTicketId')
        )
      } else Lib.common.event_statistics(`betslip_confirm`)
      this.isLoadingShow = 1
      this.$axios_api
        .sportBet({
          token: this.token,
          share_tid: Lib.common.getCookie('betSharingTicketId'),
          platform: this.platform,
          stake: this.stake,
          device: this.isPC ? 1 : 0,
          device_id: this.imei,
          keep_odds: this.isKeep ? 1 : 0,
          gift_id: this.gift_index === -1 ? '' : this.chooseGift.id,
          outcomes: JSON.stringify(this.tickets.map((a) => a.id)),
          foryou: this.tickets.find((item) => item.foryou) ? 1 : 0
        })
        .then((res) => {
          if (res.code === 0) {
            this.ticketInterval = setInterval(
              () => this.ticketRequest(res.data.ticket_id, res.data.share_id),
              500
            )
          } else {
            Lib.common.event_statistics(`Betslip_Result`, `Failed:${res.code}`)
            this.canPlaceBet = 1
            this.isLoadingShow = 0
            if (res.code === 10101) {
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
            }
            // 投注时，某些market不可投注，删除处理
            else if (res.code === 10505) {
              const newTicket = [...this.tickets]
              res.data.outcomes.forEach((a) => {
                const item = newTicket.find((x) => x.id === a)
                if (item) item.outcome_status = 1
              })
              this.$store.commit('setTickets', newTicket)
              Lib.store.set(
                'tickets',
                Lib.common.encrypt(JSON.stringify(newTicket))
              )
              Lib.common.errorReminder(
                this,
                '',
                '',
                this.$t('betRefused.title'),
                this.tword[3](),
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
            }
            // gift 错误 重新获取gift信息
            else if (res.code === 10077) {
              this.getGifts()
              Lib.common.errorReminderUp(this, true, res.msg, 0)
            }
            // 余额不足 重新获取用户账户信息
            else if (res.code === 10078) {
              this.getInfo()
              Lib.common.errorReminderUp(this, true, res.msg, 0)
            }
            // 其他后台系统错误，用户可尝试重新投注
            else Lib.common.errorReminderUp(this, true, res.msg, 0)
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
          return 1
        }
      }
      return 0
    },
    goWhere(path) {
      this.position = 0
      const obj = { path: `/${this.$store.state.root.locale}/` + path }
      this.$router.push(obj)
    },
    // 按下
    touchdown(e) {
      // 不是移动端或者有动画进行阻止此事件
      if (!this.isMobile) return
      this.holdDownflag = 1
      const { pageY = 0 } = e.changedTouches[0] || {}
      this.clickPosition = parseInt(pageY)
    },
    // 拖动
    touchmove(e) {
      e.preventDefault()
      if (this.holdDownflag) {
        const { pageY = 0 } = e.changedTouches[0] || {}
        const num = parseInt(pageY - this.clickPosition)
        if (num >= 0 && this.$refs.contentBox.scrollTop !== 0) return
        this.setMoveDistance(num)
      }
    },
    // 松开(共用)
    end() {
      // 初始化
      this.holdDownflag = 0
      document.onmouseup = null
      document.onmousemove = null
      this.position += this.moveDistance
      // 用户行为移动超过三分之一则进行覆盖
      const bjnum = this.domHeight / 4
      const closeFlag = this.moveDistance > 0 && this.moveDistance >= -1 * bjnum
      if (closeFlag) {
        this.position = 0
        this.moveDistance = 0
        return
      }
      const openFlag = this.moveDistance < 0 && this.moveDistance <= bjnum
      if (openFlag) {
        this.position = this.domHeight
        this.moveDistance = 0
        return
      }
      // 进行边界判断, 不符合则覆盖
      this.position = this.position >= this.domHeight / 2 ? 0 : this.domHeight
      this.moveDistance = 0
    },
    // pc端,鼠标按下后开启原生拖拽事件(解决滑动过快问题)
    mousedown(event) {
      if (this.isMobile) return
      this.holdDownflag = 1
      this.clickPosition = event.pageY
      document.onmousemove = (e) => {
        e.preventDefault()
        if (this.holdDownflag)
          this.setMoveDistance(parseInt(e.pageY - this.clickPosition))
      }
      document.onmouseup = this.end
    },
    // 获取抽屉内容高度
    getContentHeight() {
      this.$nextTick(() => {
        const { offsetHeight = 0 } = this.$refs.contentBox || {}
        this.domHeight = -1 * offsetHeight // 抽屉需要负数
        // 展开后高度发生变化
        if (this.position) this.position = this.domHeight
      })
    },
    // 设置移动值
    setMoveDistance(num) {
      const endNum = num + this.position
      // 确认极限值 取值为抽屉内容高度和0之间(包含界限值)
      // 符合
      if (endNum <= 0 && endNum >= this.domHeight)
        return (this.moveDistance = num)
      // 不符合
      if (endNum > 0) this.moveDistance = -1 * this.position
      if (endNum < this.domHeight)
        this.moveDistance = this.domHeight - this.position
    },
    // 自动给用户选择可用gifts
    filterForGifts() {
      if (sessionStorage.getItem('userChooseGift')) {
        // 用户已手动调整gift选择，遵守用户的选择
        if (
          this.gift_index !== -1 &&
          (this.stake < this.chooseGift.limit ||
            this.oddsCount < this.chooseGift.odds)
        )
          this.gift_index = -1
      } else {
        let stake = 0
        let index = -1
        this.giftList.forEach((a, b) => {
          if (a.limit <= this.stake && this.oddsCount >= a.odds) {
            if (a.amount > stake) (stake = a.amount) && (index = b)
          }
        })
        this.gift_index = index
        this.notUseGiftJudge()
      }
    },
    // 每日首次用户不实用gift提示
    notUseGiftJudge() {
      if (
        sessionStorage.getItem('unableUseGift') !== new Date().toDateString() &&
        this.gift_index === -1 &&
        this.giftsminlimit
      ) {
        // this.giftUnUseTips()
        sessionStorage.setItem('unableUseGift', new Date().toDateString())
      }
    },
    giftUnUseTips() {
      // Lib.common.errorReminderUp(this, true, this.tword[1]({ giftBalance: this.giftBalance, giftsminlimit: this.giftsminlimit, hb: this.hb }), 0)
      this.direction = 'right'
      this.giftTipsWord = this.tword[1]({
        giftBalance: this.giftBalance,
        giftsminlimit: this.giftsminlimit,
        hb: this.hb
      })
      this.isGiftIntroOpen = 1
    },
    // 获取可用gift
    getGifts() {
      if (!this.token) return
      this.$axios_api.giftsValid({ token: this.token, type: 1 }).then((res) => {
        const {
          code,
          data: { balance, list }
        } = res
        if (code === 0) {
          this.giftBalance = balance
          this.$store.commit('setGiftList', list)
          this.getContentHeight()
          this.filterForGifts()
        }
      })
    },
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          this.$store.commit('savePhoneNumber', res.data.mobile)
        }
      })
    },
    // 清除分享share code
    deleteShareCodeCookie() {
      Lib.common.delCookie('betSharingTicketId')
    },
    // 循环betslip数据
    checkBetslip() {
      this.$axios_api
        .checkBetslip({
          platform: this.platform,
          outcome_ids: JSON.stringify(this.tickets.map((a) => a.id))
        })
        .then((res) => {
          if (res.code === 0) {
            const newTicket = JSON.parse(JSON.stringify([...this.tickets]))
            res.data.result.forEach((a) => {
              const item = newTicket.find((x) => x.id === a.outcome_id)
              if (item) {
                // 判断赔率是否变化
                if (this.isBetslip) {
                  item.isOddsChange =
                    Number(item.odds) !== Number(a.outcome_odds)
                } else if (Number(item.odds) === Number(a.outcome_odds))
                  item.isOddsChange = false
                // 从prematch变为live
                const prematchToLive =
                  item.match_status === 0 && a.match_status === 1
                item.isPreMatchStart = prematchToLive
                if (!prematchToLive) item.match_status = a.match_status
                item.odds = a.outcome_odds
                item.start_time = a.match_start_time
                item.market_status = a.market_status
                item.outcome_status = a.outcome_status
                // match_status为不可用,或market_status不可用, 或outcome_status不可用时删除列表中的比赛
                item.isExpired =
                  item.match_status > 1 ||
                  item.market_status > 0 ||
                  item.outcome_status
              }
            })
            this.$store.commit('setTickets', newTicket)
            Lib.store.set(
              'tickets',
              Lib.common.encrypt(JSON.stringify(newTicket))
            )
          }
        })
    },
    // 轮询查询订单状态
    pollingFn(time) {
      this.pollingFnTimer && clearInterval(this.pollingFnTimer)
      // 更改为60秒轮询时, 减去之前已经计时的时间
      this.pollingFnTimes =
        time === 60 && this.pollingFnTimes !== 60
          ? 50 + this.pollingFnTimes
          : time
      this.pollingFnTimer = setInterval(() => {
        this.pollingFnTimes--
        if (this.pollingFnTimes <= 0) {
          this.pollingFnTimes = time
          this.checkBetslip()
        }
      }, 1000)
    },
    // 切换金额框抽屉
    toggleAmountBox() {
      this.amountBoxFlag = !this.amountBoxFlag
    },
    // 展开betslip 投注栏时滚动赛事列表至底部
    scrollBetList() {
      if (this.isBetslip) {
        this.$nextTick(() => {
          const scrollDom = document.querySelector('#app')
          const contentDom = document.querySelector('#betslipWrap')
          scrollDom.scrollTo({
            top: contentDom.offsetHeight,
            left: 0,
            behavior: 'smooth'
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-placeBetCom-wrap {
  position: relative;
  height: 58rem/36;

  .cl-maskBox {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }

  .cl-oddsCountExpired {
    color: #f65858 !important;
    font-weight: normal !important;
  }

  .cl-buttonBox {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48rem/36;
    padding: 0 10rem/36;
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    .cl-rightBox {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .cl-payBox {
        flex: 1;
        max-width: 126rem/36;
        height: 35rem/36;
        font-size: 0.37rem;
        &.cl-canNoClick {
          opacity: 0.6;
        }
      }
      .cl-wordBox {
        margin-right: 16rem/36;
        text-align: right;
        font-size: 11rem/36;
        font-weight: 400;
        height: 35rem/36;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        flex-direction: column;

        &.cl-wordBox1 {
          justify-content: center;
        }
        .cl-word {
          color: #333;
          margin-right: 3rem/36;
        }
        .cl-payNumber {
          font-size: 17rem/36;
          font-weight: bold;
          color: #000;
        }
        .cl-reduceMoney {
          color: #f65858;
        }
      }
    }
  }
  .cl-oddsBox {
    font-size: 0.35rem;
    line-height: 0.46rem;
    font-weight: 400;
    color: #000;
    .cl-bonus-boost {
      width: 197rem/36;
    }
    .cl-oddsCount {
      font-weight: bold;
      margin-left: 3rem/36;
    }
    .cl-icon {
      .sprite(@ticon-oddsup, 108rem);
    }
    &.no-up {
      .cl-oddsCount {
        color: #30db7f;
      }
    }
    &.no-down {
      .cl-oddsCount {
        color: #f65858;
      }
    }
  }
  .cl-dragBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-radius: 13rem/36 13rem/36 0 0;
    transition: transform 0.3s cubic-bezier(0.13, 0.97, 0.14, 1.1) 0s;
    box-shadow: 0 -1rem/36 4rem/36 0 #cecede;

    .cl-dragtag {
      height: 10rem/36;
      cursor: grab;
      user-select: none;
      .cl-icon {
        height: 3rem/36;
        width: 67rem/36;
        border-radius: 2rem/36;
        background-color: #efefef;
      }
    }
    .cl-contentBox {
      //height: 244rem/36;
      overflow-y: auto;
      font-size: 13rem/36;
      font-weight: 400;
      color: #000;
      .cl-widthBox {
        padding: 0 10rem/36;
      }
      .cl-bonusBox {
        padding-top: 5rem/36;
        font-size: 11rem/36;
        line-height: 14rem/36;
      }
      .cl-stake {
        font-size: 15rem/36;
        height: 40rem/36;
        padding: 0 10rem/36;
        background-color: #f4f4f4;
        border-radius: 6rem/36;
        font-weight: bold;
        border: 0.5rem/36 solid #e9e9f3;
        .cl-inl {
          margin-right: 10rem/36;
          color: #333;
        }
        .cl-hb {
          font-weight: 400;
          margin-left: 10rem/36;
        }
        input {
          flex: 1;
          background-color: transparent;
          border: none;
          outline: none;
          padding: 0;
          height: 40rem/36;
          text-align: right;
          font: inherit;
        }
      }
      .cl-offersRewards {
        font-weight: bold;
      }
      .cl-sighIcon {
        margin-left: 3rem/36;
        .sprite(@ticon-exclamation, 108rem);
      }
      .cl-item {
        .cl-left {
          position: relative;
          .cl-giftIcon {
            margin-right: 5rem/36;
            .sprite(@icon-betslip-gift, 108rem);
          }
        }
        .cl-chooseGifts1 {
          font-weight: 400;
          color: #f65858;
        }
        .cl-chooseGifts2 {
          color: #f65858;
        }
        .cl-right {
          font-weight: bold;
          .cl-more {
            margin-left: 3rem/36;
            .sprite(@ticon-back-grey, 108rem);
          }
        }
      }
      .cl-amountWrap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 158rem/36;
      }
      .cl-amountBox {
        padding: 0 10rem/36;
        background-color: #f6f6f6;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
    }
  }
  &.cl-isLive {
    .cl-buttonBox {
      background-color: #1c2029;
      .cl-rightBox {
        .cl-wordBox {
          .cl-word {
            color: #fff;
          }
          .cl-payNumber {
            color: #fff;
          }
        }
      }
    }
    .cl-oddsBox {
      color: #fff;
      .cl-icon {
        .sprite(@ticon-oddsup-white, 108rem);
      }
    }
    .cl-dragBox {
      background-color: #1c2029;
      box-shadow: 0 -1rem/36 4rem/36 0 #000;
      .cl-dragtag {
        .cl-icon {
          background-color: #32303e;
        }
      }
      .cl-contentBox {
        color: #fff;
        .cl-bonusBox {
          color: #a2a2a7;
        }
        .cl-stake {
          background-color: #000;
          border: 0.5rem/36 solid #403e4e;
          .cl-inl {
            color: #fff;
          }
        }
        .cl-amountBox {
          background-color: #32303e;
        }
      }
    }
  }
}
</style>
