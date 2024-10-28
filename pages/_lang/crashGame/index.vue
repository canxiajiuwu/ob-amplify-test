<template>
  <div class="cl-crashGameIndex-wrap">
    <headBack
      title="CRASH"
      :bgcolor="mainStyle.mainThemeColor"
      color="#fff"
      is-white-back
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold'
      }"
      :path="path"
    >
      <template>
        <div class="cl-top_right">
          <div class="cl-flexcc cl-logined" v-if="info">
            <div class="cl-accountInfo" @click="goWhere('account')">
              <div class="cl-icon" />
              <div class="cl-balance">
                {{ info.balance ? Number(info.balance).toFixed(2) : '0.00' }}
              </div>
            </div>
            <div
              v-if="
                !(
                  $store.state.root.locale === 'fr' &&
                  Number(info.balance) > 1000
                )
              "
              class="cl-flexcc cl-tcButton cl-deposit"
              @click="depositComTriggle(true)"
            >
              {{ $t('betslipBack.deposit') }}
            </div>
          </div>
          <div class="cl-flexcc cl-unLogin" v-else>
            <div class="cl-flexcc cl-lkButton" @click="goWhere('login')">
              <div>{{ $t('loginEntry.login') }}</div>
            </div>
            <div
              v-if="$store.state.root.locale !== 'fr'"
              class="cl-flexcc cl-tcButton"
              @click="goWhere('register')"
            >
              <div>{{ $t('loginEntry.joinNow') }}</div>
            </div>
          </div>
        </div>
      </template>
    </headBack>
    <div class="cl-CashoutPlugIn">
      <Cashout
        theme="onebet"
        :plate="$store.state.root.country"
        :mid="uid"
        :token="token"
        :socket-url="crashSocketUrl"
        :language="$t('cashoutLang')"
        :video-source="videoSource"
        :language-context="$store.state.root.locale"
        :banner-list="bannerList"
        @apiFetch="apiFetch"
        @copyHash="copyHash"
        @msgReminderCallback="msgReminderCallback"
        @Ga_Emit="GaEmitCallback"
        @amountChange="amountChange"
        @bannerListClick="bannerListClick"
        @isInterceptExit="isInterceptExit"
        @betInfo="betInfo"
        @JSFiddleFn="JSFiddleFn"
        ref="cashout"
      >
        <!-- <template #cashout>
            <div class="cl-crashGameYes" />
          </template>-->
        <template #busted>
          <div class="cl-crashGameNo" />
        </template>
      </Cashout>
    </div>
    <div class="cl-onetbetFooterBox">
      <div class="cl-itemBox" @click="goContact">
        <div class="cl-onlineIcon" />
        <div class="cl-onetbetTitle">{{ $t('footer.online') }}</div>
        <div>7/24</div>
      </div>
      <div class="cl-itemBox">
        <div class="cl-mailIcon" />
        <div class="cl-onetbetTitle">{{ $t('footer.call') }}</div>
        <div>{{ $t('mail') }}</div>
      </div>
    </div>
    <drawer
      :visible.sync="remindVisible"
      type="middle"
      :width="300 / 36"
      :height="364 / 36"
      boxbg-color="rgba(0,0,0,0)"
      :mask-click="false"
    >
      <div class="cl-remindBox">
        <div class="cl-closeBox">
          <div class="cl-closeIcon">
            <img
              class="cl-img"
              src="@/assets/images/common/whiteRoundClose105x105.png"
              @click="changeRemindVisible(false)"
            />
          </div>
        </div>
        <div style="height: calc(17rem / 36)" />
        <div class="cl-remindContent">
          <img
            class="cl-remindImg"
            src="@/assets/images/commissionCenter/remindImg.png"
          />
          <div style="height: calc(78rem / 36)" />
          <div style="height: calc(24rem / 36)" />
          <div class="cl-remindWord">
            {{ $t('commissionCenter.remindWord') }}
          </div>
          <div style="height: calc(20rem / 36)" />
          <div class="cl-buttonBox">
            <div class="cl-button" @click="clickItem">
              {{ $t('commissionCenter.IFBN') }}
            </div>
          </div>
        </div>
      </div>
    </drawer>
    <!-- ifream 用来展示ssr的页面 -->
    <div class="cl-iframe" v-if="showIfream">
      <iframe :src="iframeSrc" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cashout } from 'cashout-game-lib-vue2/dist/lib.es'
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import 'cashout-game-lib-vue2/dist/style.css'
Vue.use(Cashout)

export default {
  name: 'CrashGameIndex',
  components: { headBack, Cashout },
  inject: ['reload', 'clearCache'],
  // 路由后置守卫，离开时给提示
  beforeRouteLeave(to, from, next) {
    if (to.name === 'rushHour') {
      next()
      return
    }
    const midNextHandler = this.midNextHandler(next, to)
    if (this.interceptExit.rushHourLength > 0) {
      // 有奖励
      Lib.common.errorReminder(
        this,
        'cashoutBouns',
        '',
        '',
        this.$t('reminder.cashoutBouns'),
        this.$t('reminder.cashoutBounsLeft'),
        this.$t('reminder.cashoutBounsRight'),
        midNextHandler,
        midNextHandler
      )
    } else if (
      this.isEventProgress &&
      this.interceptExit.restTimes !== 0 &&
      this.interceptExit.restTimes < 5
    ) {
      // 没奖励但是在活动期间
      Lib.common.errorReminder(
        this,
        'cashoutRestTimes',
        '',
        '',
        this.$t('reminder.cashoutRestTimes', {
          num: this.interceptExit.restTimes
        }),
        this.$t('reminder.cashoutBounsLeft'),
        this.$t('reminder.cashoutBounsRight'),
        midNextHandler,
        midNextHandler
      )
    } else {
      // next();
      midNextHandler.call(this, true)
      if (to.name === 'login' || to.name === 'register') {
        // 如果失去登陆和注册页面，清理掉缓存
        setTimeout(() => {
          this.reload()
        }, 2000)
      }
    }
  },
  data() {
    return {
      interceptExit: {},
      // 提醒弹窗开关
      remindVisible: false,
      crashInfo: {},
      activityStime: undefined,
      activityEtime: undefined,
      activitying: false,
      showIfream: false,
      iframeSrc: '',
      token: '',
      cacheTime: '',
      uid: undefined,
      path: null // 直接进入游戏页面，返回时去首页
    }
  },
  computed: {
    winApp() {
      return window.appInteraction
    },
    isApp() {
      return this.winApp.type
    },
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    STATICURL() {
      return process.env.STATICURL
    },
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    // 游戏socket链接
    crashSocketUrl() {
      return this.$store.state.root.country === 'ug'
        ? process.env.API_CASH_SOCKET_ug
        : process.env.API_CASH_SOCKET_cm
    },
    // howToPlay视频
    videoSource() {
      return this.STATICURL + '/video/onebet.mp4'
    },
    isEventProgress() {
      return this.$refs.cashout.$refs.rushHour.isEventProgress
    },
    // 轮播图数组
    bannerList() {
      return [
        // {
        //   image: this.STATICURL + `/static/images/lang/${this.$store.state.root.locale}/${this.$store.state.root.country}/rushHour/rushHourBanner.jpg`,
        //   type: 'rushHour'
        // },
        {
          image:
            this.STATICURL +
            `/images/lang/${this.$store.state.root.locale}/common/crashGame/agent.jpg`,
          type: 'agent'
        }
      ]
    },
    isHall() {
      return ['index', 'lang'].includes(this.$route.name)
    }
  },
  watch: {
    accountInfo(val) {
      // 注销账户时用，初次去登陆页面回来，防止token与uid不同时传下去
      if (!val || val.uid !== this.uid) {
        this.refresh()
      }
    }
  },
  beforeMount() {
    // 修改crashGame输入框初始值
    this.inputInit()
    // 获取邀请者ID
    this.agentCodeInit()
    // 绑定ifream消息传输
    this.iframeMessageInit()
    this.init()
  },
  mounted() {
    if (!this.token) {
      this.$refs.cashout.userInfo = null
      this.crashInfo = {}
    }
    if (Object.keys(this.crashInfo).length === 0) {
      this.createdInit()
    }
    this.betSuccess()
    // rushHour初始化
    setTimeout(() => {
      this.$refs.cashout.$refs.rushHour.createdInit()
    })
    // 清楚掉清理缓存的定时器
    if (this.cacheTime) clearTimeout(this.cacheTime)

    this.mountedInit()
    this.$nextTick(() => {
      // 删除 rushHour dom
      const domData = this.$refs.cashout
      const { CashoutControls } = domData ? domData.$refs : {}
      // rushHour && rushHour.$el.remove()
      // banner在一个情况下删除下标指示器
      CashoutControls &&
        CashoutControls.$el.querySelector('.wh_indicator').remove()
    })
  },
  destroyed() {
    this.showIfream = false
    window.removeEventListener('message', this.messageHandler, false)
    if (this.cacheTime) {
      clearTimeout(this.cacheTime)
    }
  },
  methods: {
    depositComTriggle(bool) {
      this.$store.commit('setFepositComShow', bool)
    },
    JSFiddleFn() {
      const JSFiddleUrl =
        this.$store.state.root.country === 'ug'
          ? 'https://jsfiddle.net/Code2023/txpu49vg/2/'
          : 'https://jsfiddle.net/Code2023/3ymdf6aw/20/'
      this.isApp === 3
        ? this.winApp.openBrowser(JSFiddleUrl)
        : window.open(JSFiddleUrl)
    },
    init() {
      this.refresh()
      // rushHour初始化
      setTimeout(() => {
        this.$refs.cashout.$refs.rushHour.createdInit()
      })
      if (history.length === 2) {
        this.path = ''
      }
    },
    // 中转处理，如果是回到主页，那么5分钟没回来，清理掉缓存
    midNextHandler(next, to) {
      return (boolean) => {
        if (this.isHall && boolean) {
          this.cacheTime = setTimeout(() => {
            this.clearCache('crashGame')
          }, 300000)
        }
        next(boolean)
      }
    },
    createdInit() {
      // 获取crash代理信息
      this.$axios_api
        .userCrashInfo({
          token: this.token
        })
        .then((res) => {
          if (res) {
            this.crashInfo = res.data
            this.activityStime = res.data.start_time * 1000
            this.activityEtime = res.data.end_time * 1000
            this.getActivityConfig()
          }
        })
    },
    // 如果回来是投注成功，展示动画
    betSuccess() {
      if (!this.token) return
      const brBackup = this.$refs.cashout.$refs.CashoutSocket.brBackup
      const showOdds =
        this.$refs.cashout.$refs.CashoutSocket.$refs.CashoutChart.showOdds
      if (this.token && brBackup && showOdds >= brBackup) {
        this.$refs.cashout.$refs.CashoutSocket.$refs.CashoutChart.$refs.numberUpdate.play()
      }
    },
    iframeMessageInit() {
      window.addEventListener('message', this.messageHandler, false)
    },
    messageHandler(event) {
      if (typeof event.data === 'string') {
        let data = {}
        try {
          data = JSON.parse(event.data)
        } catch (err) {
          return
        }
        // 关闭消息
        if (data.type === 'closeIfream') this.showIfream = false
        else if (data.type === 'closeLoading')
          this.$store.commit('changeLoadingStatus', false)
        else if (data.type === 'loginSuccess') {
          if (!this.accountInfo || !this.info) {
            this.$parent.refresh()
            // 这个表示用户重新登陆了，需要重新获取用户信息
            this.$parent.getInfo()
            this.$parent.userAccountInfo()
            this.createdInit()
            // 清理掉其他页面
            this.clearCache([
              'hall',
              'live',
              'betslip',
              'mybet',
              'account',
              'matchDetail',
              'popular'
            ])
          }
        }
        // 成为代理，重新获取代理信息
        else if (data.type === 'becomeAgent') this.createdInit()
      }
    },
    // 重新设置token
    refresh() {
      if (Lib.store.get('token'))
        this.token = Lib.common.decrypt(Lib.store.get('token'))
      else this.token = ''
      this.uid = this.accountInfo ? this.accountInfo.uid : undefined
    },
    agentCodeInit() {
      const queryObj = this.$route.query
      let code = ''
      let channel = ''
      if (queryObj.code) {
        if (Array.isArray(queryObj.code)) code = queryObj.code[0]
        else code = queryObj.code
      }
      if (queryObj.channel) {
        if (Array.isArray(queryObj.channel)) channel = queryObj.channel[0]
        else channel = queryObj.channel
      }
      if (code) Lib.store.set('agentInfo', { code, time: new Date().getTime() })
      if (channel)
        Lib.store.set('channel', { channel, time: new Date().getTime() })
    },
    mountedInit() {
      // 如果来自SSR并且需要打开howToplay，则打开
      const queryObj = this.$route.query
      const howToplay = Lib.store.get('howToplay')
      if (queryObj.howToplay === 'true' && !howToplay) {
        this.$refs.cashout.$refs.CashoutControls.howPlay()
        // 防止页面后退又打开howtoplay
        Lib.store.set('howToplay', true)
      }
    },
    // 请求集成
    apiFetch({ name, callback, data }) {
      // if (name === 'history') return
      this.$axios_api[name](data || {})
        .then((res) => {
          callback(res.data)
        })
        .catch(() => {
          callback()
        })
    },
    // 页面跳转
    goWhere(path) {
      // Lib.common.event_statistics(`crash_${path}`)
      if (path === 'deposit') {
        // 事件统计(点击充值按钮)
        this.GaEmitCallback({ name: 'crash_deposit_click' })
      }
      if (path === 'login') {
        this.$router.push({
          path: `/${this.$store.state.root.locale}` + '/' + path,
          query: {
            from: 'crashGame'
          }
        })
        return
      }
      this.$router.push({
        path: `/${this.$store.state.root.locale}` + '/' + path
      })
    },
    // 去rushhour 和 agent
    bannerListClick(item) {
      if (item.type === 'rushHour' || item.eventName === 'rush_hour_icon') {
        if (item.eventName === 'rush_hour_icon')
          this.GaEmitCallback({ name: 'rush_hour_icon' })
        this.$router.push({
          path: `/${this.$store.state.root.locale}` + '/crashGame/rushHour',
          query: {
            isBack: 1
          }
        })
        return
      }
      if (item.type === 'agent') this.middlehandler()
    },
    // 处理下去代理时，给出奖励提示
    middlehandler() {
      if (this.interceptExit.rushHourLength > 0) {
        // 有奖励
        Lib.common.errorReminder(
          this,
          'cashoutBouns',
          '',
          '',
          this.$t('reminder.cashoutBouns'),
          this.$t('reminder.cashoutBounsLeft'),
          this.$t('reminder.cashoutBounsRight'),
          this.goAgent,
          ''
        )
      } else if (
        this.isEventProgress &&
        this.interceptExit.restTimes !== 0 &&
        this.interceptExit.restTimes < 5
      ) {
        // 没奖励但是在活动期间
        Lib.common.errorReminder(
          this,
          'cashoutRestTimes',
          '',
          '',
          this.$t('reminder.cashoutRestTimes', {
            num: this.interceptExit.restTimes
          }),
          this.$t('reminder.cashoutBounsLeft'),
          this.$t('reminder.cashoutBounsRight'),
          this.goAgent,
          ''
        )
      } else {
        this.goAgent()
      }
    },
    goAgent() {
      // 事件统计(点击跳转至佣金入口)
      this.GaEmitCallback({ name: 'Crash_banner' })
      const hostname =
        this.$store.state.root.country === 'ug'
          ? process.env.hostname
          : process.env.hostnamecm
      this.iframeSrc = `${hostname}/ssr/${this.$store.state.root.locale}/commissionCenter/applyToEarn`
      // this.iframeSrc =
      //   "http://localhost:8001/ssr/en/commissionCenter/applyToEarn";
      this.showIfream = true
      this.$store.commit('changeLoadingStatus', true)
    },
    // 第三方客服
    goContact() {
      // 事件统计(点击客服)
      this.GaEmitCallback({ name: 'crash_online_help_click' })
      Lib.common.initiateCall(this)
    },
    // 复制hash值
    copyHash(hash) {
      try {
        const input = document.createElement('input') // 直接构建input
        input.value = hash // 设置内容
        document.body.appendChild(input) // 添加临时实例
        input.select() // 选择实例内容
        document.execCommand('Copy') // 执行复制
        document.body.removeChild(input) // 删除临时实例
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('cashoutLang.copySuccess'),
          1
        )
      } catch (err) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('cashoutLang.copyFail'),
          0
        )
      }
    },
    // ga统计
    GaEmitCallback(data) {
      Lib.common.event_statistics(data.name, data.target)
    },
    // 获取提示
    msgReminderCallback(data) {
      if (data === 'NotLogin') {
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
      if (data === 'NotEnoughCoins') {
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('reminder.money'),
          '',
          this.$t('reminder.button.ok')
        )
        return
      }
      if (data === 'changeBettingAmount') this.changeBettingAmount()
    },
    changeBettingAmount() {
      Lib.common.errorReminder(
        this,
        'changeBettingAmount',
        '',
        '',
        this.$t('reminder.sureAbandonUsing'),
        this.$t('reminder.continueUse'),
        this.$t('reminder.abandon'),
        (a) => {
          a && Lib.store.set('abandonment', true)
          // TODO 取消个gits
          this.$refs.cashout.$refs.CashoutControls.$refs.inputCom.changeGiftsSelection(
            -1
          )
        },
        (a) => {
          console.log(a)
          // TODO 还原用户投注金额
          console.log(this.$refs.cashout.$refs.CashoutControls)
          this.$refs.cashout.$refs.CashoutControls.$refs.inputCom.restoreBettingAmount()
        },
        this.$t('reminder.remind')
      )
    },
    // 通知资金变化
    amountChange(balance) {
      if (this.info) {
        const infoOBj = {
          ...this.info,
          balance
        }
        this.$store.commit('setInfo', infoOBj)
      }
    },
    // 修改crashGame输入框初始值
    inputInit() {
      const inputObj = {}
      if (this.$store.state.root.country === 'ug') inputObj.amount = '1000'
      else inputObj.amount = '200'
      inputObj.autoCashout = '1.50'
      Lib.store.set('coinsTrip', inputObj)
    },
    // 修改数据，
    isInterceptExit(data) {
      this.interceptExit = data
    },
    // 打开或关闭提示弹窗
    changeRemindVisible(flag) {
      this.remindVisible = flag
    },
    getDay() {
      const date = new Date()
      const year = date.getFullYear().toString()
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      return year + month + day
    },
    // 每次正式投注触发
    betInfo() {
      if (!this.activitying) return
      const storageTime = this.getDay()
      const betNumber = Lib.store.get('betNumber') || {}
      if (betNumber.time === storageTime) {
        // 是今天投注
        betNumber.betNumberTimes = betNumber.betNumberTimes + 1
        // 有没隔两天
        const popTimeTnterval =
          !betNumber.popTime || storageTime - betNumber.popTime >= 2
        if (betNumber.betNumberTimes === 5 && popTimeTnterval) {
          this.changeRemindVisible(true)
          betNumber.popTime = storageTime
        }
        Lib.store.set('betNumber', betNumber)
      } else {
        // 不是或者没有
        const data = {
          betNumberTimes: 1,
          time: storageTime,
          popTime: betNumber.popTime
        }
        Lib.store.set('betNumber', data)
      }
    },
    // 弹窗点击去代理页面
    clickItem() {
      const hostname =
        this.$store.state.root.country === 'ug'
          ? process.env.hostname
          : process.env.hostnamecm
      let href = `${hostname}/ssr/${this.$store.state.root.locale}/commissionCenter?isBack=true`
      if (!this.crashInfo.status) {
        href = `${hostname}/ssr/${this.$store.state.root.locale}/commissionCenter/applyToEarn`
      }
      this.iframeSrc = href
      this.showIfream = true
      this.$store.commit('changeLoadingStatus', true)
      this.changeRemindVisible(false)
    },
    // 获取是否在进行活动
    getActivityConfig() {
      const nowDate = new Date().getTime()
      if (nowDate >= this.activityStime && nowDate <= this.activityEtime)
        this.activitying = true
      else this.activitying = false
    }
  }
}
</script>

<style lang="less">
@import '~/assets/css/crashGame.less';

.cl-crashGameIndex-wrap {
  .cl-top_right {
    margin-right: 12rem/36;

    .cl-logined {
      .cl-accountInfo {
        display: block !important;

        .cl-icon {
          margin: 0 auto;
          padding-bottom: 5rem/36;
          .sprite(@icon-account-white, 108rem);
        }

        .cl-balance {
          line-height: 10rem/36;
          margin-left: 5rem/36;
          font-weight: bold;
          font-size: 10rem/36;
          color: @balanceColor;
          white-space: nowrap;
        }
      }

      .cl-deposit {
        margin-left: 7rem/36;
      }
    }

    .cl-unLogin {
      .cl-lkButton {
        margin-right: 7rem/36;
        border: 1rem/36 solid @mainButtonComparedColor;
      }
    }
  }

  .cl-onetbetFooterBox {
    box-sizing: border-box;
    padding: 0 10/36rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e4e4e4;
    min-height: 124/36rem;
    background-color: #1c2029;
    font-weight: 400;
    font-size: 11/36rem;
    text-align: center;
    white-space: nowrap;

    .cl-itemBox {
      flex: 1;
    }

    .cl-onetbetTitle {
      font-size: 10/36rem;
      font-weight: bold;
    }

    .cl-onlineIcon {
      margin: 0 auto;
      .sprite(@icon-live, 108rem);
    }

    .cl-mailIcon {
      margin: 0 auto;
      .sprite(@icon-mail, 108rem);
    }
  }
  .cl-remindBox {
    .cl-closeBox {
      display: flex;
      justify-content: flex-end;
      .cl-closeIcon {
        width: 56rem/72;
        height: 56rem/72;
        .cl-img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .cl-remindContent {
      position: relative;
      background-color: #fff;
      box-sizing: border-box;
      padding: 40rem/72;
      border-radius: 10rem/72;
      .cl-remindImg {
        position: absolute;
        top: -60rem/72;
        left: 50%;
        transform: translate(-50%, 0);
        width: 356rem/72;
        height: 256rem/72;
      }
      .cl-remindWord {
        font-size: 32rem/72;
        font-weight: 400;
        color: #333;
        line-height: 42rem/72;
      }
      .cl-buttonBox {
        display: flex;
        justify-content: center;
        .cl-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 490rem/72;
          height: 86rem/72;
          background: linear-gradient(264deg, #f44368, #fe8825);
          border-radius: 44rem/72;
          font-size: 36rem/72;
          font-weight: bold;
          color: #fff;
          white-space: nowrap;
        }
      }
    }
  }
  .cl-iframe {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  .cl-crashGameYes {
    margin-bottom: 25/36rem;
    .sprite(@icon-crash-game-yes166x166, 108rem);
  }

  .cl-crashGameNo {
    margin-bottom: 25/36rem;
    .sprite(@icon-crash-game-no166x166, 108rem);
  }
}
</style>
