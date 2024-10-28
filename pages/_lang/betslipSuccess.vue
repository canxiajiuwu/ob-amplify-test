<template>
  <div class="cl-betslipSuccess-wrap">
    <div class="cl-topBox">
      <headBack />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div class="cl-content">
      <div class="cl-top">
        <div class="cl-icon">
          <img src="@/assets/images/general/notSprites/betslipBox/check.png" />
        </div>
        <div style="height: calc(10rem / 36)" />
        <div class="cl-word" v-if="phase == 1">
          {{ $t('betslipSuccess.betSuccessLive') }}
          <div class="cl-wordArt">
            {{ $t('betslipSuccess.betSuccessLiveWord') }}
          </div>
        </div>
        <div class="cl-word" v-else>
          {{ $t('betslipSuccess.betSuccessful') }}
        </div>
        <template v-if="sportsPromos?.length">
          <div style="height: calc(20rem / 36)" />
          <div
            class="cl-art"
            @click="goSportsPromos"
            v-html="
              $t('sportsPromos.betslip', {
                team: `${sportsPromos[0].home} vs ${sportsPromos[0].away}`
              })
            "
          />
        </template>
      </div>
      <div style="height: calc(25rem / 36)" />
      <!-- 暂未开放活动dom -->
      <!-- <div class="cl-giftsBox">
        <img class="cl-giftsBg" src="@/assets/images/promotions/giftsBg.png" />
        <div class="cl-flexcb cl-gifts">
          <div class="cl-flexcc cl-iconBox">
            <div class="cl-giftRed cl-giftGrey" />
          </div>
          <div class="cl-bsbb cl-giftsWBox">
            <div v-if="0" class="cl-wordBox">
              <span>Lucky man! OneBet prepared 100 XAF Freebet for you.</span>
              <span class="cl-canClick">Claim and Free to use</span>
            </div>
            <div class="cl-pBox">
              <div class="cl-flexcb cl-ptBox">
                <div class="cl-progress">
                  <div class="cl-showPiece" :style="{width: (1/2) * 100 + '%'}" />
                </div>
                <div class="cl-numBox">1/2</div>
              </div>
              <div class="cl-word">8 more bets can get you a Freebet</div>
            </div>
          </div>
        </div>
      </div>-->
      <div class="cl-bottom">
        <div class="cl-list">
          <div class="cl-flexcb cl-row" v-if="ticketId">
            <div class="cl-left">{{ $t('betslipSuccess.bet_id') }}</div>
            <div class="cl-right cl-light">{{ '#' + ticketId }}</div>
          </div>

          <div class="cl-flexcb cl-row">
            <div class="cl-left">{{ $t('accountMybetDetailBox.type') }}</div>
            <div class="cl-right">{{ betType }}</div>
          </div>

          <div class="cl-flexcb cl-row cl-light" v-if="bonus !== 0">
            <div class="cl-left">
              {{ $t('betslipSuccess.bonusList', { bonusList: percent }) }}
            </div>
            <div class="cl-right">{{ bonus.toFixed(2) }}</div>
          </div>

          <div class="cl-flexcb cl-row" v-if="payout">
            <div class="cl-left">{{ $t('betslipSuccess.payout') }}</div>
            <div class="cl-right">{{ payout.toFixed(2) }}</div>
          </div>

          <div class="cl-flexcb cl-row cl-total" v-if="total">
            <div class="cl-left">
              {{ odds ? $t('freeBet.title') : $t('betslipSuccess.total') }}
            </div>
            <div class="cl-right">{{ total.toFixed(2) }}</div>
          </div>

          <div class="cl-flexcb cl-row cl-gift" v-if="gift !== 0">
            <div class="cl-flexcc cl-left">
              <div class="cl-giftIcon" />
              <span>{{ $t('betslipSuccess.cash') }}</span>
            </div>
            <div class="cl-right">-{{ gift.toFixed(2) }}</div>
          </div>

          <div class="cl-flexcb cl-row cl-reduction" v-if="reduction">
            <div class="cl-left">{{ $t('betslipPlaceBet.reduced') }}</div>
            <div class="cl-right">{{ reduction.toFixed(2) }}</div>
          </div>

          <div class="cl-flexcb cl-row" v-if="total && !odds">
            <div class="cl-left">{{ $t('betslipSuccess.payment') }}</div>
            <div class="cl-right">
              {{ (total - (reduction || gift)).toFixed(2) }}
            </div>
          </div>

          <div class="cl-flexcb cl-row" v-if="odds">
            <div class="cl-left">{{ $t('betslipPlaceBet.total') }}</div>
            <div class="cl-right">{{ odds }}</div>
          </div>
        </div>
        <div style="height: calc(30rem / 36)" />
        <div class="cl-flexcc cl-lkButton cl-button" @click="continueFun">
          {{ $t('betslipSuccess.continue') }}
        </div>
        <div style="height: calc(15rem / 36)" />
        <div class="cl-flexcc">
          <span class="cl-check" @click="goHistory">
            {{ $t('betslipSuccess.check') }}
          </span>
          <span class="cl-jt">></span>
        </div>
        <div style="height: calc(15rem / 36)" />
      </div>

      <div
        class="cl-flexcb cl-appExclusive"
        v-if="appBonusStatus"
        :class="{ 'cl-opened': amount }"
      >
        <div class="cl-caps" />
        <div class="cl-word">{{ $t('betslipApp.gift') }}</div>

        <div class="cl-flexcc cl-open" @click="openGift">
          {{ $t('betslipApp.open') }}
        </div>
        <div class="cl-getBox" @click="useNow">
          <div class="cl-flexcc cl-left">
            <div class="cl-icon">
              <img
                :src="STATICURL + '/images/lang/common/appBonus/appBonus.png'"
              />
            </div>
            <div class="cl-dddbox">
              <div class="cl-con">{{ $t('betslipApp.con') }}</div>
              <div
                class="cl-get"
                v-html="
                  $t('betslipApp.get', {
                    number: amount,
                    type: $t('betslipApp.giftList')[giftType - 1]
                  })
                "
              />
            </div>
          </div>

          <div class="cl-flexcc cl-right">{{ $t('betslipApp.use') }}</div>
        </div>
      </div>
    </div>

    <div v-if="bannerItem && bannerIsShow" class="cl-banner">
      <img @click="itemClick(bannerItem)" :src="bannerItem.image" />
    </div>

    <newUserBenefitsPop
      :show-new-user-benefits-pop="showNewUserBenefitsPop"
      :type="newUserBenefitsPopType"
      :new-user-benefits="newUserBenefits"
      @newUserBenefitsPopClose="newUserBenefitsPopClose"
      @gettingReward="gettingReward"
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import { casinoMixins } from '@/assets/js/casinoMixins'
import newUserBenefitsPop from '@/components/components/newUserBenefitsCom/newUserBenefitsPop.vue'

export default {
  components: { headBack, newUserBenefitsPop },
  mixins: [casinoMixins],
  inject: ['openGame'],
  data() {
    return {
      listData: [], // banner原始数据(未处理)
      appBonusStatus: false,
      isBetslipSuccess: true,
      amount: 0,
      giftType: 1,
      sportsPromos: null,
      // 2022世界杯活动新增
      meta: null,
      result: [],
      bannerIsShow: 0, // banner加载完成后显示
      showNewUserBenefitsPop: false,
      newUserBenefits: Lib.store.get('newUserBenefits') || {}, // 新用户福利
      orderSuccessfulType: 1, // 1今天领 2明天领
      newUserBenefitsPopType: ''
    }
  },
  computed: {
    statusArrData() {
      return [
        1,
        !this.accountInfo,
        !!this.accountInfo,
        !this.accountInfo || !this.accountInfo.first_deposit_activity,
        this.accountInfo ? !this.accountInfo.isComplete : 0,
        this.accountInfo && this.accountInfo.skip_user,
        () => !Lib.common.getMajorEventsIsMore()
      ]
    },
    statusArr() {
      return (user_status) => {
        return this.statusArrData[user_status] instanceof Function
          ? this.statusArrData[user_status]()
          : this.statusArrData[user_status]
      }
    },
    // 处理后需要显示的banner
    bannerItem() {
      const nowTime = new Date().getTime() / 1000
      const bannerObj = this.listData.find(
        (item) => this.statusArr(item.user_status) && item.end_time > nowTime
      )
      if (bannerObj)
        Lib.common.loadImage(bannerObj.image, () => (this.bannerIsShow = 1))
      else this.bannerIsShow = 0
      return bannerObj
    },
    STATICURL() {
      return process.env.STATICURL
    },
    betslipType() {
      return this.$route.meta.betslipType
    },
    tickets() {
      return this.$store.state.tickets
    },
    intimateTickets() {
      return this.$store.state.intimateTickets
    },
    total() {
      return Number(this.$route.query.totalStake)
    },
    reduction() {
      return Number(this.$route.query.reduction)
    },
    gift() {
      return Number(this.$route.query.gift)
    },
    percent() {
      return Number(this.$route.query.percent)
    },
    bonus() {
      return Number(this.$route.query.bonus)
    },
    payout() {
      return Number(this.$route.query.payout)
    },
    ticketId() {
      return this.$route.query.ticketId
    },
    shareId() {
      return this.$route.query.shareId
    },
    phase() {
      return this.$route.query.phase
    },
    where() {
      return this.$route.query.where
    },
    odds() {
      return this.$route.query.odds
    },
    period_id() {
      return this.$route.query.period_id
    },
    betType() {
      const typeObj = {
        fr: ['', 'Pré-match', 'En Direct', 'Mélanger'],
        en: ['', 'Pre Match', 'Live', 'Mix']
      }
      const typeList = typeObj[this.locale]
      return typeList[this.$route.query.betType] || this.$route.query.betType
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    info() {
      return this.$store.state.info
    },
    xfootball_host() {
      return process.env.xFootball_URL_WEB
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    // 2022世界杯活动新增
    platform() {
      return this.$store.state.platform
    },
    // isWorldCup() {
    //   if (!this.result.length) return 0
    //   for (let i = 0, length = this.result.length; i < length; i++) {
    //     if (this.result[i].tournament_id == '16' || this.result[i].tournament_name === 'World Cup') return 1
    //   }
    // },
    // 2022 世界杯活动新增
    hostname() {
      return this.country === 'ug'
        ? process.env.hostname
        : process.env.hostnamecm
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  beforeMount() {
    this.getData()
    // sports promos
    if (this.period_id) this.promoListReq()
    this.getNewUserBenefits()
  },
  mounted() {
    this.welfareAppAuth()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    // 2022世界杯活动新增
    this.getTicketInfo()
  },
  methods: {
    // 开奖
    gettingReward() {
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .newUserBenefitsOpen({
          token: this.token,
          cid: this.newUserBenefits.bet_times
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            this.newUserBenefits.today_give = 1
            this.newUserBenefitsPopType = 'successfulCollection'
            this.showNewUserBenefitsPop = true
            Lib.store.set('newUserBenefits', this.newUserBenefits)
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
    newUserBenefitsPopClose() {
      this.showNewUserBenefitsPop = false
    },
    //  获取新用户福利数据
    getNewUserBenefits() {
      // console.log(this.newUserBenefits)
      if (this.betType === 'FreeBet') return
      if (
        !this.newUserBenefits ||
        this.newUserBenefits.use_all ||
        this.newUserBenefits.end_time * 1000 < new Date().getTime()
      ) {
        return
      }
      this.$axios_api
        .newUserBenefitsGet({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            if (
              res.data.benefits.bet_times !== this.newUserBenefits.bet_times
            ) {
              // 不相同说明bet有变化了，
              this.newUserBenefitsPopType = 'orderSuccessful'
              this.newUserBenefits = res.data.benefits
              this.showNewUserBenefitsPop = true
              Lib.store.set('newUserBenefits', this.newUserBenefits)
            }
          }
        })
    },
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    },
    // 页面跳转
    goWhere(path) {
      Lib.common.event_statistics(`home_${path}`)
      this.$router.push({ path: `/${this.locale}` + '/' + path })
    },
    goRtsb() {
      Lib.common.event_statistics('betSuccess_rtsb_main_Click')
      const url = `${this.xfootball_host}/${this.country}/${
        this.locale
      }/rtsb_main?source=ob&inviteId=${
        this.accountInfo ? this.accountInfo.uid : ''
      }&token=${this.token}`
      // web
      if (window.appInteraction.type === 1) window.open(url)
      // app
      else window.appInteraction.openBrowser(url)
    },
    goFreebetGiveaway() {
      window.location.href = `/activity/freebetGiveaway/index.html?lang=${this.locale}`
    },
    // 继续投注
    continueFun() {
      Lib.common.event_statistics(
        this.where === 'betslip'
          ? 'betslip_success_continue_betting'
          : 'betslip_success_continue_betting_intimate'
      )
      this.$router.replace({
        path:
          this.where === 'betslip'
            ? `/${this.locale}`
            : `/${this.locale}/intimate`
      })
    },
    // 前往订单详情
    goHistory() {
      Lib.common.event_statistics(
        this.where === 'betslip'
          ? 'betslip_success_check_bet_history'
          : 'betslip_success_check_bet_history_intimate'
      )
      this.$router.replace({
        path: `/${this.locale}/mybetDetail/${this.ticketId}`,
        query: {
          ticket_date_type: 1,
          ticket_category: this.where === 'betslip' ? 0 : 2
        }
      })
    },
    // 前往daily bet refund活动页面
    goBetRefund() {
      this.$router.replace({ path: `/${this.locale}/dailyBetRefund` })
    },
    // 分享订单
    share() {
      Lib.common.event_statistics(`betslip_success_share_ticket`, this.shareId)
      Lib.common.errorReminder(this, '', 'A', '', this.shareId)
    },
    // 是否有gift
    welfareAppAuth() {
      this.$axios_api.welfareAppAuth({ token: this.token }).then((res) => {
        if (res.code === 0) this.appBonusStatus = res.data.status
      })
    },
    // 获取gift bonus
    openGift() {
      this.$axios_api.welfareAppReceive({ token: this.token }).then((res) => {
        if (res.code === 0) {
          this.giftType = res.data.type
          this.amount = res.data.amount
        } else if (res.code === 10101) {
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
    // useNow
    useNow() {
      this.$router.push({ path: `/${this.locale}/freeBet` })
    },
    goAfcon() {
      window.location.href = `/activity/afcon_cm/index.html?lang=${this.locale}`
    },
    goHottestTickets() {
      Lib.common.event_statistics(`bet_success_hottest_tickets_banner`)
      this.$router.replace({ path: `/${this.locale}/hottestTickets` })
    },
    goSportsPromos() {
      Lib.common.event_statistics(`bet_success_sports_promos`)
      this.$router.replace({
        path: `/${this.locale}/sportPromos/${this.period_id}`
      })
    },
    // goEpl() {
    //   Lib.common.event_statistics('betslip_epl_banner_click')
    //   this.$router.push({ path: `/${this.locale}/epl` })
    // },
    // 请求数据列表
    promoListReq() {
      this.$axios_api.promoList({ token: this.token }).then((res) => {
        if (res.code === 0)
          this.sportsPromos = res.data.filter(
            (item) => item.content && item.gift
          )
      })
    },
    // 2022世界杯活动新增
    // 获取订单信息
    getTicketInfo() {
      this.$axios_api
        .ticketInfo({
          platform: this.platform,
          ticket_id: this.ticketId,
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.meta = res.data.meta
            this.result = res.data.result
          }
        })
    },
    // 分享订单
    shareBet() {
      if (this.meta.can_bet === 1 && this.meta.share_id) {
        Lib.common.event_statistics(
          `bet_success_share_ticket`,
          this.meta.share_id
        )
        Lib.common.errorReminder(this, '', 'A', '', {
          ticket_id: this.ticket_id,
          share_id: this.meta.share_id
        })
      }
    },
    // goWorldCup() {
    //   Lib.common.event_statistics(`bet_success_worldCup`)
    //   window.location.href = `${this.hostname}/ssr/${this.locale}/worldCup`
    // },
    // 活动 点击事件
    itemClick(item) {
      if (item.eventName) Lib.common.event_statistics(item.eventName)
      return Lib.common.openWay(item.open, this)(item)
    },
    // 获取数据
    getData() {
      const locale = this.locale // 获取语言
      const dataSTR = 'betSuccessBannerData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
      let askFlag = 0 // 记录是否更新
      // 查询本地时间, true更新
      if (Lib.common.getBackstageDataIsRefresh(dataSTR, 'inquire')) askFlag = 1
      const data = Lib.store.get(dataSTR) // 获取本地数据
      // 查询本地数据是否完整
      // 完整,优先使用本地数据
      if (Array.isArray(data) && data.length) this.listData = data
      // 数据被破坏
      else askFlag = 1
      // 可以请求
      if (askFlag) {
        // 1.5秒后请求,不占主业务请求
        setTimeout(() => {
          // 获取数据
          this.$axios_api.getBackstageBanner({ type: 3 }).then((res) => {
            // 成功
            if (res.code === 0 && Array.isArray(res.data.bet_success_banner)) {
              // 存入本地, 修改本地时间, 更新数据
              Lib.store.set(dataSTR, res.data.bet_success_banner)
              Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
              this.listData = res.data.bet_success_banner
            }
          })
        }, 300)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipSuccess-wrap {
  background-color: #fff;
  width: 10rem;
  min-height: 100vh;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 2;
  }

  .cl-giftsBox {
    position: relative;
    .cl-gifts {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      .cl-iconBox {
        width: 55rem/36;
        padding-bottom: 5rem/36;
        .cl-giftRed {
          .sprite(@ticon-gift-red, 108rem);
        }
        .cl-giftGrey {
          .sprite(@ticon-gift-grey, 108rem);
        }
      }
      .cl-giftsWBox {
        font-size: 11rem/36;
        color: #939695;
        font-weight: 400;
        flex: 1;
        padding: 10rem/36 10rem/36 16rem/36;
        .cl-wordBox {
          .cl-canClick {
            color: @mainBrandColor;
            text-decoration: underline;
          }
        }
        .cl-pBox {
          .cl-ptBox {
            .cl-progress {
              height: 9rem/36;
              flex: 1;
              background-color: #f0f0f0;
              border-radius: 8rem/36;
              overflow: hidden;
              .cl-showPiece {
                height: 9rem/36;
                border-radius: 8rem/36;
                overflow: hidden;
                background-color: #fcdb06;
              }
            }
            .cl-numBox {
              width: 20rem/36;
              margin-left: 7rem/36;
            }
          }
        }
      }
    }
    .cl-giftsBg {
      width: 340rem/36;
      height: 54rem/36;
    }
  }

  .cl-content {
    padding: 0 10rem/36;
    .cl-top {
      text-align: center;

      .cl-icon {
        img {
          width: 52rem/36;
          height: 52rem/36;
        }
      }

      .cl-word {
        font-size: 13rem/36;
        font-weight: 800;
        color: #363636;

        .cl-wordArt {
          padding: 5rem/36;
          font-weight: 400;
        }
      }

      .cl-art {
        text-align: left;
        padding: 0 10rem/36;
        font-size: 11rem/36;
        color: #939695;
      }
    }

    .cl-bottom {
      padding: 10rem/36 0;

      .cl-list {
        .cl-row {
          padding-bottom: 3rem/36;
          color: #939695;
          font-size: 38rem/108;

          .cl-giftIcon {
            margin-right: 5rem/36;
            .sprite(@icon-betslip-gift, 108rem);
          }

          .cl-right {
            color: #000;
            font-weight: bold;

            &.cl-light {
              color: #515151;
              font-weight: 400;
            }
          }

          &.cl-total {
            padding-top: 10rem/36;
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
        width: 100%;
        box-sizing: border-box;
        height: 40rem/36;
        font-size: 13rem/36;
      }

      .cl-button:active {
        opacity: 0.8;
      }

      .cl-check {
        text-align: center;
        text-decoration: underline;
        color: @mainThemeColor;
        font-size: 11rem/36;
      }
      .cl-jt {
        color: @mainThemeColor;
        margin-left: 3rem/36;
        height: 11rem/36;
      }
    }

    .cl-appExclusive {
      overflow: hidden;
      position: relative;
      margin: 0 5rem/36 30rem/36;
      height: 50rem/36;
      color: #fff;
      border-radius: 6.67rem/36;
      background-size: 100% 100%;
      background-image: url('~/static/images/lang/common/appBonus/appBonusBanner.png');

      &.cl-opened {
        .cl-getBox {
          display: flex;
        }
      }

      .cl-caps {
        position: absolute;
        width: 50rem/36;
        height: 41rem/36;
        background-image: url('~/static/images/lang/common/appBonus/caps.png');
        background-size: 100% 100%;
        left: 24rem/36;
        top: 10rem/36;
        animation: moveUp 800ms infinite alternate;
      }

      @keyframes moveUp {
        to {
          transform: translate3d(0, 0, 0);
        }

        from {
          transform: translate3d(0, -15rem/36, 0);
        }
      }

      .cl-open {
        font-size: 13rem/36;
        font-weight: bold;
        color: #fff;
        width: 80rem/36;
        height: 80rem/36;
        background-color: #f75c07;
        position: absolute;
        right: -10rem/36;
        border-radius: 50%;
      }

      .cl-word {
        width: 100%;
        font-weight: 900;
        font-size: 16.67rem/36;
        text-align: center;
      }

      .cl-getBox {
        display: none;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding: 0 14rem/36;
        background-color: #f75c07;
        height: 50rem/36;
        width: 340rem/36;

        .cl-left {
          .cl-icon {
            margin-right: 8rem/36;
            width: 37rem/36;
            height: 37rem/36;

            img {
              width: 37rem/36;
              height: 37rem/36;
            }
          }

          .cl-dddbox {
            .cl-con {
              text-transform: uppercase;
              font-size: 10rem/36;
              font-weight: bold;
            }

            .cl-get {
              font-size: 14rem/36;
              font-weight: bold;
            }
          }
        }

        .cl-right {
          height: 23rem/36;
          border-radius: 11.5rem/36;
          background-color: #feef00;
          padding: 0 10rem/36;
          color: #f75c07;
          font-weight: bold;
        }
      }
    }
  }

  .cl-banner {
    width: 340/36rem;
    margin: 5/36rem auto;

    img {
      width: 340/36rem;
      border-radius: @mainButtonRadius;
    }
  }
}
</style>
