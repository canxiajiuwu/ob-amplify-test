<template>
  <div>
    <div class="cl-homeBannerAllCom-wrap">
      <div class="cl-activityS" v-if="swiperFlag">
        <van-swipe ref="swiper" :show-indicators="false" :autoplay="5000">
          <van-swipe-item v-if="isHall && newuserFlag">
            <newUserBenefitsBanner
              @emitflag="
                (a) => {
                  newuserFlag = a
                }
              "
              @needR="needR"
              where="home"
            />
          </van-swipe-item>
          <van-swipe-item v-if="configData.id || canUseItem">
            <div v-if="configData.id" class="cl-flexcc cl-claimSCom-wrap">
              <div class="cl-time" v-html="$t('claimCom.time2', { time })" />
              <div
                class="cl-flexcb cl-cradBox"
                :class="[{ 'cl-more': cardList.length > 1 }, webClass]"
              >
                <div
                  v-if="cardList.length === 1 && listItem.amount > 1"
                  class="cl-flexcc cl-numberBox"
                >
                  <div class="cl-num">X{{ listItem.amount }}</div>
                </div>
                <div class="cl-flexcc cl-amountBox">
                  <div class="cl-bsbb cl-amount">{{ hb + amount }}</div>
                  <div style="height: calc(7rem / 36)" />
                  <div class="cl-name">{{ webClass }}</div>
                </div>
                <div class="cl-bsbb cl-contentBox">
                  <div class="cl-ititle">
                    {{ configData.tips || $t('claimCom.title2') }}
                  </div>
                  <template v-if="cardList.length > 1">
                    <div
                      class="cl-more"
                      v-html="
                        $t('claimCom.more', {
                          num: allnum,
                          name: webClass === 'FreeBet' ? webClass : 'Gifts'
                        })
                      "
                    />
                  </template>
                  <template v-else>
                    <div>
                      <span v-if="listItem.limit"
                        >{{
                          $t('newUserBenefits.stakes') + listItem.limit
                        }};</span
                      >
                      <span v-if="listItem.odds"
                        >{{ $t('newUserBenefits.odds') + listItem.odds }};</span
                      >
                      <span v-if="listItem.market">{{
                        $t('newUserBenefits.market') + listItem.market
                      }}</span>
                    </div>
                  </template>
                </div>
                <div class="cl-flexcc cl-bsbb cl-claimb" @click="claimnow">
                  {{ locale === 'fr' ? 'Réclamez' : 'Claim Now' }}
                </div>
              </div>
            </div>
            <div v-else-if="canUseItem" class="cl-flexcc cl-claimSCom-wrap">
              <div style="height: calc(12rem / 36)" />
              <div class="cl-flexcb cl-cradBox" :class="[canUseItem.webClass]">
                <div class="cl-flexcc cl-amountBox">
                  <div class="cl-bsbb cl-amount">
                    {{ hb + ' ' + canUseItem.money }}
                  </div>
                  <div style="height: calc(7rem / 36)" />
                  <div class="cl-name">{{ canUseItem.webClass }}</div>
                </div>
                <div class="cl-bsbb cl-contentBox">
                  <div class="cl-ititle">
                    {{
                      canUseItem.name || canUseItem.webClass === 'FreeBet'
                        ? 'FreeBet'
                        : $t('claimCom.giftname')
                    }}
                  </div>
                  <div>
                    <span v-if="canUseItem.limit"
                      >{{
                        $t('newUserBenefits.stakes') + canUseItem.limit
                      }};</span
                    >
                    <span v-if="canUseItem.odds"
                      >{{ $t('newUserBenefits.odds') + canUseItem.odds }};</span
                    >
                    <span v-if="canUseItem.market">{{
                      $t('newUserBenefits.market') + canUseItem.market
                    }}</span>
                  </div>
                  <div style="height: calc(4rem / 36)" />
                  <div class="cl-exptime">
                    {{
                      canUseTime(
                        canUseItem.expire - nowTime,
                        canUseItem.webClass
                      )
                    }}
                  </div>
                </div>
                <div
                  class="cl-flexcc cl-bsbb cl-claimb"
                  @click="useFn(canUseItem.webClass)"
                >
                  {{ $t('accountGiftList.Use') }}
                </div>
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item v-if="!showbanner">
            <slot name="last" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!--  奖励领取弹出  -->
    <claimPop
      v-if="isClaimModalShow"
      :config-data="configData"
      :mtype="mtype"
      @close="isClaimModalShow = 0"
      @claimed="getData"
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import claimPop from '@/components/components/claimCom/claimPop.vue'
import newUserBenefitsBanner from '@/components/components/newUserBenefitsCom/newUserBenefitsBanner'
import { popUpWindowDetection } from '@/assets/js/utils/popupPriority.js'

export default {
  components: { claimPop, newUserBenefitsBanner },
  data() {
    return {
      mtype: undefined, // 奖励弹窗类型
      swiperFlag: 0, // swiper是否可以渲染
      newuserFlag: 1, // 新用户留存
      configData: {}, // 礼物配置
      isClaimModalShow: 0,
      timer: null, // 定时器容器
      nowTime: parseInt(new Date().getTime() / 1000), // 现在时间
      cardList: [], // 列表
      webClass: '',
      islaod: 0, // 是否在有请求
      giftIsAsk: 0 // 礼物列表是否请求
    }
  },
  computed: {
    showbanner() {
      if (this.isHall)
        return this.newuserFlag || this.configData.id || this.canUseItem
      else return this.configData.id || this.canUseItem
    },
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    time() {
      const { end_time } = this.configData
      const etime = end_time - this.nowTime
      if (!end_time && end_time !== 0) return '-'
      if (etime < 0) this.getData()
      return this.timefmt(etime < 0 ? 0 : etime)
    },
    amount() {
      let num = 0
      const length = this.cardList.length
      if (length <= 0) return num
      if (this.cardList.length > 1) {
        const { gifts = {}, freeBets = {} } = this.configData
        num += gifts.all_amount + freeBets.all_amount
      } else num = this.listItem.money
      return ' ' + (num || 0)
    },
    allnum() {
      const { gifts = {}, freeBets = {} } = this.configData
      return gifts.all_num + freeBets.all_num || 0
    },
    listItem() {
      return this.cardList[0] || {}
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    tickets() {
      return this.$store.state.tickets
    },
    giftList() {
      return this.$store.state.giftList
    },
    freebetList() {
      return this.$store.state.freebetList
    },
    canUseItem() {
      if (!this.giftIsAsk) return 0
      this.timeFn()
      const nowTime = parseInt(new Date().getTime() / 1000)
      const arr1 = this.giftList.map((a) => ({
        ...a,
        money: a.amount,
        amount: 1,
        webClass: 'Gift'
      }))
      // 提升使用门槛最低且面额最大的权重, 有一天内过期且门槛不大于600最优先
      const onega1 = arr1
        .sort((a, b) => (a.limit < b.limit ? -1 : 0))
        .sort((a, b) => (a.limit === b.limit && a.money > b.money ? -1 : 0))
      const onega2 = onega1.filter(
        (a) => a.expire < nowTime + 86400 && a.limit <= 600
      )
      if (onega1.length || onega2.length) this.giftEventFn()
      if (onega2.length) return onega2[0]
      if (onega1.length) return onega1[0]
      const arr2 = this.freebetList
        .filter((a) => a.confirmed === true)
        .map((a) => ({
          ...a,
          money: a.amount,
          amount: 1,
          webClass: 'FreeBet'
        }))
      // 提升面额最大权重, 有一天内过期最优先
      const onefa1 = arr2.sort((a, b) => (a.money > b.money ? -1 : 0))
      const onefa2 = onefa1.filter((a) => a.expire < nowTime + 86400)
      if (onefa1.length || onefa2.length) this.freeBetEventFn()
      if (onefa2.length) return onefa2[0]
      if (onefa1.length) return onefa1[0]
      if (!this.configData.id) this.clearFn()
      return 0
    },
    isHall() {
      return ['index', 'lang'].includes(this.$route.name)
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  watch: {
    accountInfo: {
      handler(val) {
        if (val && this.isHall) this.getData(val.uid)
      },
      immediate: true
    },
    tickets(val) {
      if (val.length === 0) this.giftRfn()
    }
  },
  mounted() {
    this.swiperFlag = 1
    if (!this.token) return
    if (!this.isHall) this.getData()
    this.timeFn()
    setTimeout(() => this.getGiftFreeBet(1), 1000)
  },
  // activated() {
  //   this.timeFn()
  //   this.newuserFlag = 1
  //   this.swiperFlag = 1
  //   this.getGiftFreeBet(1, 1)
  // },
  // deactivated() {
  //   this.swiperFlag = 0
  //   this.clearFn()
  // },
  destroyed() {
    this.clearFn()
  },
  methods: {
    claimnow() {
      this.$store.commit('changeLoadingStatus', 1)
      this.$axios_api
        .activeGiftRetrieve({ id: this.configData.id, token: this.token })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', 0)
          if (res.code === 0) {
            const { name } = this.$route
            Lib.common.event_statistics(
              'Award_Draw_Success_Pop_View',
              `Page_From:${name},Award_Category:${this.webClass}`
            )
            this.mtype = ''
            this.isClaimModalShow = 1
            setTimeout(this.getData, 1000)
          }
        })
    },
    useFn(type) {
      // 路由不区分大小写, 但是大小写不同, 登录态会丢失
      const rname = type === 'FreeBet' ? 'freeBet' : 'betslip'
      const rpath = type === 'FreeBet' ? 'freebet' : 'betslip'
      if (this.routeName !== rname) {
        this.$router.push({ path: `/${this.locale}/` + rpath })
      }
    },
    getData(uid) {
      if (this.islaod) return
      this.islaod = 1
      this.configData = {}
      const locData = Lib.store.get('activeGiftConfig')
      this.$axios_api
        .activeGift({ token: this.token })
        .then((res) => {
          const { code, data } = res
          if (code === 0 && data.id) {
            this.configData = data
            const { gifts = {}, freeBets = {} } = data
            this.cardList = [
              ...gifts.gifts.map((a) => ({ ...a, webClass: 'Gift' })),
              ...freeBets.free_bets.map((a) => ({ ...a, webClass: 'FreeBet' }))
            ]
            if (this.cardList.length > 0) {
              this.webClass = this.listItem.webClass
              Lib.common.event_statistics(
                'Award_Draw_Banner_View',
                `Page_From:${this.routeName},Award_Category:${this.webClass}`
              )
              if (
                uid &&
                this.isHall &&
                popUpWindowDetection({ type: 'giftCollection' })
              ) {
                const newid = uid + '-' + data.id
                if (locData !== newid) {
                  this.mtype = undefined
                  this.isClaimModalShow = 1
                  Lib.common.event_statistics(
                    'Award_Draw_Pop_View',
                    `Page_From:${this.routeName},Award_Category:${this.webClass}`
                  )
                  Lib.store.set('activeGiftConfig', newid)
                }
              }
            }
          }
          this.islaod = 0
        })
        .catch(() => (this.islaod = 0))
    },
    needR(type) {
      type === 'Gift' ? this.getGiftFreeBet(1) : this.getGiftFreeBet(0, 1)
    },
    timeFn() {
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(
        () => (this.nowTime = parseInt(new Date().getTime() / 1000)),
        1000
      )
    },
    timefmt(time) {
      const str = Lib.common.minuteDetal(time, 'dd-HH-MM-ss')
      const strArr = str.split('-')
      const s0 = strArr[0] === '00' ? '' : strArr[0] + 'd'
      return `${s0} ${strArr[1]}h ${strArr[2]}m ${strArr[3]}s`
    },
    canUseTime(time, type) {
      if (time <= 0)
        type === 'Gift' ? this.getGiftFreeBet(1) : this.getGiftFreeBet(0, 1)
      // 一天
      if (time > 86400)
        return this.$t('claimCom.exday', { time: Math.ceil(time / 86400) })
      else
        return this.$t('claimCom.extime', {
          time: Lib.common.minuteDetal(time, 'HH:MM:ss')
        })
    },
    clearFn() {
      this.timer && clearInterval(this.timer)
    },
    getGiftFreeBet(rgift, rfreebet) {
      if (!this.token) return
      if (rgift) {
        this.$axios_api
          .giftsValid({ token: this.token, type: 1 })
          .then((res) => {
            const { code, data } = res
            if (code === 0) this.$store.commit('setGiftList', data.list)
            else this.$store.commit('setGiftList', [])
            this.giftIsAsk = 1
          })
      }
      if (rfreebet) {
        this.$axios_api.freeBetValid({ token: this.token }).then((res) => {
          const { code, data } = res
          if (code === 0) this.$store.commit('setFreebetList', data.list)
          else this.$store.commit('setFreebetList', [])
        })
      }
    },
    giftRfn: Lib.common.deBounce(function () {
      this.getGiftFreeBet(1)
    }, 1000),
    giftEventFn: Lib.common.throttle(function () {
      Lib.common.event_statistics(
        'Gifts_Guide_Banner_View',
        `Page_From:${this.routeName}`
      )
    }, 3000),
    freeBetEventFn: Lib.common.throttle(function () {
      Lib.common.event_statistics(
        'FreeBet_Guide_Banner_View',
        `Page_From:${this.routeName}`
      )
    }, 3000)
  }
}
</script>

<style scoped lang="less">
.cl-claimSCom-wrap {
  position: relative;
  font-size: 10rem/36;
  font-weight: 400;
  height: 90rem/36;
  flex-direction: column;
  .cl-time {
    padding-bottom: 3rem/36;
    font-size: 9rem/36;
    white-space: nowrap;
    line-height: 9rem/36;
    color: #717171;
    /deep/ span {
      color: #ed2136;
    }
  }
  .cl-cradBox {
    position: relative;
    .sprite(@claim-com-swipergift, 108rem);
    .cl-numberBox {
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      .sprite(@claim-com-jb, 108rem);
      .cl-num {
        transform: rotate(45deg);
        padding-bottom: 18rem/36;
        font-size: 13rem/36;
        font-weight: bold;
        color: #fff;
      }
    }
    .cl-amountBox {
      width: 68rem/36;
      flex-direction: column;
      .cl-amount {
        padding: 0 6rem/36;
        text-align: center;
        color: #ed2136;
        font-weight: bold;
        font-size: 14rem/36;
        line-height: 17rem/36;
      }
      .cl-name {
        color: #4d4d4d;
      }
    }
    .cl-contentBox {
      flex: 1;
      padding-left: 13rem/36;
      color: #4d4d4d;
      .cl-more {
        /deep/ span {
          color: #ed2136;
        }
      }
      .cl-ititle {
        margin-bottom: 8rem/36;
        font-weight: bold;
      }
      .cl-exptime {
        color: #ef3a4e;
      }
    }
    &.FreeBet {
      .sprite(@claim-com-swiperfreebet, 108rem);
    }
    &.cl-more {
      .sprite(@claim-com-swipergifts, 108rem);
      .cl-amountBox {
        .cl-amount {
          color: #f9f8c2;
        }
        .cl-name {
          color: #f9f8c2;
        }
      }
      &.FreeBet {
        .sprite(@claim-com-swiperfreebets, 108rem);
      }
    }
    .cl-claimb {
      margin: 0 12rem/36;
      padding: 0 3rem/36;
      height: 23rem/36;
      min-width: 73rem/36;
      border-radius: 12rem/36;
      background: linear-gradient(83deg, #fc7933, #ff483d);
      font-weight: bold;
      color: #fff;
    }
    .cl-claimb:active {
      opacity: 0.8;
    }
  }
}
</style>
