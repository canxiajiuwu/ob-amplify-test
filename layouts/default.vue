<template>
  <div id="app" :style="appHeight">
    <!-- 顶部弹窗 -->
    <topMsgPop
      :type="topPopType"
      :show-top-pop="showTopPop"
      @closeTopPop="showTopPop = false"
    />
    <transition name="slide-bottom">
      <commonReminder v-if="isCommonReminderShow" />
    </transition>
    <!--路由-->
    <!-- <transition :name="transitionName">
        <keep-alive :include="keepAlive" v-if="isRouterAlive">
          <nuxt-child :key="$route.fullPath" />
        </keep-alive>
      </transition> -->

    <Nuxt />
    <!-- 底部导航栏 -->
    <FooterMenu
      v-if="footerMenuFlag"
      :where="$route.name === 'lang-live-sportName' ? 'live' : ''"
    />
    <!-- 新公用弹出框 -->
    <commonModalNew />
    <!-- 加载loading -->
    <loading v-if="isLoadingShow" />
    <!-- 客服信息输入框 -->
    <agent />
    <!-- 初次语言设置 -->
    <languageModal v-if="isOpenLang" @closeLangModal="isOpenLang = false" />
    <!-- 游戏iframe -->
    <gameIframe
      v-if="iframeGame"
      @closeGame="closeGame"
      :is-football-game="isFootballGame"
      :class="isPageIframeShow ? 'cl-hideGameIframe' : ''"
    />
    <div v-else id="gameIframe" @click="closeGame" />

    <!-- 国家选择框 -->
    <countrySelectModal
      v-if="openCountryModal"
      @closeCountryModal="closeCountryModal"
    />
    <div id="gameEvent" @click="closeGame" />
    <div id="outGameModal" @click="outGameModal" />
    <div class="cl-OBgetUserInfo" @click="getInfo" />
    <!-- toastInfo -->
    <toast />
    <!-- card packs弹出 -->
    <!-- <cardPacks /> -->

    <!-- 整个页面加载 -->
    <!-- <layoutCanvas :value="95" color="#fff" :duration="1000" :size="61" /> -->
    <!--  pwa 安装、提示、判断  -->
    <pwa />
    <!-- 平台关停维护公告 -->
    <announcement />
    <!-- 不关闭游戏打开大厅页面 -->
    <pageIframe v-if="isPageIframeShow" :page-iframe-url="pageIframeUrl" />
    <!-- 首页弹窗 -->
    <homePopUps />
    <!-- 限时活动 -->
    <timeLimitedActivity :token="token" />
    <!-- 充值功能弹窗 -->
    <depositPop />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import commonModalNew from '@/components/components/commonModalNew.vue'
import toast from '@/components/components/toast.vue'
import loading from '@/components/components/loading.vue'
import agent from '@/components/components/agent.vue'
import languageModal from '@/components/components/languageModal.vue'
import gameIframe from '@/components/components/game/index.vue'
import countrySelectModal from '@/components/components/countrySelectModal.vue'
import pwa from '@/components/components/pwa.vue'
import announcement from '@/components/components/announcement.vue'
import pageIframe from '@/components/components/pageIframe.vue'
import homePopUps from '@/components/components/homePopUps.vue'
import timeLimitedActivity from '@/components/components/timeLimitedActivity/index.vue'
import depositPop from '@/components/components/depositCom/depositPop.vue'
import { popUpWindowDetection } from '@/assets/js/utils/popupPriority.js'
import { headMixins } from '@/assets/js/headMixins'
// import layoutCanvas from '@/components/components/layoutCanvas.vue'
const FooterMenu = () => import('@/components/components/FooterMenu.vue')

export default {
  name: 'App',
  components: {
    loading,
    commonModalNew,
    agent,
    languageModal,
    gameIframe,
    countrySelectModal,
    toast,
    pwa,
    FooterMenu,
    announcement,
    pageIframe,
    homePopUps,
    timeLimitedActivity,
    depositPop
  },
  mixins: [headMixins],
  provide() {
    return {
      reload: this.reload,
      openGame: this.openGame,
      openCountryModalFun: this.openCountryModalFun,
      addToBetslipFun: this.addToBetslip,
      clearCache: this.clearCache
    }
  },
  data() {
    return {
      isNewApp: undefined, // 是否为新app
      unloginClient: '',
      transitionName: 'page',
      MyClient: '',
      isRouterAlive: true,
      keepAlive: [
        'hall',
        'live',
        'betslip',
        'mybet',
        'account',
        'matchDetail',
        'popular',
        'crashGame'
      ], // 缓存的组件
      keepAlivePosition: {
        // 缓存的组件的滚动距离
        hall: {
          from: ['betslip', 'match'], // 从哪些路由过来需要记录位置
          top: 0 // 离开页面前的滚动距离
        },
        live: {
          from: ['betslip', 'match'],
          top: 0
        },
        mybet: {
          from: ['mybetDetail'],
          top: 0
        }
      },
      scrollInterval: '',
      isOpenLang: false, // open
      isFootballGame: '',
      topPopType: 'A1', // 顶部弹窗类型 A1 A2 B2三种
      showTopPop: false, // 顶部弹窗是否显示
      openCountryModal: false, // 打开国家选择弹窗
      appHeight: '' // app样式
    }
  },
  computed: {
    info() {
      return this.$store.state.info
    },
    WsUrl() {
      return this.country === 'cm' ? process.env.WsCmUrl : process.env.WsUrl
    },
    winApp() {
      return typeof window === 'undefined' ? {} : window.appInteraction
    },
    refreshRemTimes() {
      return window.refreshRemTimes
    },
    isLoadingShow() {
      return this.$store.state.isLoadingShow
    },
    isCommonReminderShow() {
      return this.$store.state.isCommonReminderShow
    },
    token() {
      if (this.isNewApp) {
        const appToken = this.winApp.getUserToken()
        // 获取app最新token, 没有则清空已有token
        if (appToken) Lib.store.set('token', Lib.common.encrypt(appToken))
        else Lib.store.remove('token')
      }
      this.$store.commit(
        'setToken',
        Lib.common.decrypt(Lib.store.get('token') || '')
      )
      return this.$store.state.token
    },
    browserLang() {
      const lang = (
        navigator.language || navigator.browserLanguage
      ).toLowerCase()
      if (lang) return lang.split('-')[0]
      return ''
    },
    storageLang() {
      return this.$cookies.get('languages')
    },
    isGuest() {
      return this.$store.state.isGuest
    },
    todayDate() {
      return new Date().getDate()
    },
    playGamesTimes() {
      return this.$store.state.playGamesTimes
    },
    // 控制底部栏的显示与隐藏
    footerMenuFlag() {
      if (this.isNewApp) return 0
      const routerArr = [
        'index',
        'lang',
        'lang-refer',
        'lang-live-sportName',
        'ad-4201',
        'ad-4202',
        'ad-4203',
        // 'ad-4204',
        'ad-4205',
        'ad-4206',
        'ad-4207',
        'ad-4208',
        'ad-4209',
        'lang-betslip',
        'lang-mybet',
        'lang-account',
        'lang-createBetslip',
        'lang-top-league'
      ]
      return routerArr.includes(this.$route.name)
    },
    // 滚动区间元素
    scrollDom() {
      return document.querySelector('#app')
    },
    tickets() {
      return this.$store.state.tickets
    },
    // tickets信息是否为app推送, 1:是 0:否
    ticketsDataIsAppReturn() {
      return this.$store.state.ticketsDataIsAppReturn
    },
    isPageIframeShow() {
      return this.$store.state.isPageIframeShow
    },
    // 游戏内弹出
    pageIframeUrl() {
      return this.$store.state.pageIframeUrl
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    },
    iframeGame() {
      return this.$store.state.iframeGame
    },
    isHall() {
      return ['index', 'lang'].includes(this.$route.name)
    }
  },
  watch: {
    token(val) {
      if (val && !this.isNewApp) {
        if (this.MyClient) {
          this.MyClient.alive = false
          this.MyClient.ws.close()
        }

        this.client()
      }
    },
    $route(to, from) {
      // 获取当前路由name
      const topath = to.matched[0]?.path
      const frompath = from.matched[0]?.path
      if (frompath === '/:lang' && topath !== '/:lang') {
        const tolang = to.params.lang
        if (['en', 'fr', 'zh'].includes(tolang)) {
          // this.$i18n.locale = tolang
          this.$store.commit('setRoot', {
            ...this.$store.state.root,
            locale: tolang
          })
        }
      }
      // ga4页面统计
      try {
        if (typeof window === 'undefined') return

        Lib.common.event_statistics(
          'pageview',
          `Page_From: ${location.pathname}`
        )
      } catch (err) {
        console.log(err)
      }

      // 关闭弹出框
      this.$store.commit('Modal', null)
      // loading页面确认关闭
      this.$store.commit('changeLoadingStatus', false)
      // 位置回滚
      this.pageScroll(to, from)
      // 顶部freebet弹出窗判断
      // this.freebetModal(to)
    },
    tickets(val) {
      // 不是新app则不触发
      if (!this.isNewApp) return
      // 是app通知修改数据
      if (this.ticketsDataIsAppReturn) {
        // 修改本地
        Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify(val)))
        // 清除记录
        this.$store.commit('setTicketsDataIsAppReturn', 0)
      }
      // 不是则通知app修改数据
      else this.winApp.updateSelectOutcome(val)
    }
  },
  beforeMount() {
    if (this.winApp?.type === 3) {
      Lib.store.set('isNewApp', (this.isNewApp = this.winApp.isNewApp()))
    }
    // 防止app未通知web tickets更改,初始化获取app数据一次
    if (this.isNewApp) {
      const ticketsData = this.winApp.getUserSelectOutcome()
      this.$store.commit('setTicketsDataIsAppReturn', 1)
      this.$store.commit('setTickets', ticketsData)
    }
    const mytoken = Lib.common.GetUrlParam('token')
    if (mytoken) {
      this.$store.commit('setToken', mytoken)
      Lib.store.set('token', Lib.common.encrypt(mytoken))
      // 去掉链接中的token参数
      const obj = new window.URL(window.location.href)
      // console.log(obj.href)
      obj.searchParams.delete('token')
      // console.log(obj.href)
      // history.replaceState({}, 0, obj.href)
      // console.log(this.locale)
      // this.$router.replace({path:`/${this.locale}`})
    }
    // 新用户福利类型
    this.getNewUserBenefitTypes()
    // 屏幕缩放处理
    if (this.winApp?.type !== 1) {
      const docEl = document.documentElement
      const scale = window.screen.width / document.body.offsetWidth
      docEl.style.fontSize = window.rem * scale + 'px'
    }
  },
  created() {
    // 获取app顶部安全距离
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line nuxt/no-globals-in-created
      const winApp = window.appInteraction
      if (winApp?.type === 3)
        this.$store.commit(
          'setSafeAreaTop',
          // eslint-disable-next-line nuxt/no-globals-in-created
          parseInt(winApp.getSafeAreaTop() / window.devicePixelRatio)
        )
    }
  },
  mounted() {
    Lib.common.event_statistics('pageview', `Page_From: ${location.pathname}`)
    // 不是新版app
    if (!this.isNewApp) {
      // 打开语言选择框
      this.openLanguageSelect()
      // socket
      this.client()
    }
    // 获取用户信息
    this.userAccountInfo()
    // 获取参数
    this.getQuery()
    // 输入框控制
    this.inputControl()
    // 国家选择框
    this.judgeCountry()
    // 第三方客服返回
    // window.addEventListener('popstate', this.popStateFun)
    // 获取设备编号
    setTimeout(() => this.getImei(), 2000)

    // 在大厅会多次调用，关闭app启动页面
    if (this.winApp.type !== 1) {
      setTimeout(() => this.winApp.closeStartDialog(), 2000)

      // 设置platform
      this.$store.commit('setPlatForm', 3)
    }
    //  this.$store.commit('setPlatForm', 3)

    // 检测是否是复制自己的Ticket,不是则弹出获取Ticket code框
    // 此方法需要用户主动触发,浏览器控制台会有警告,catch屏蔽
    if (!this.isNewApp) {
      setTimeout(() => {
        if (navigator.clipboard) {
          navigator.clipboard
            .readText()
            .then((text) => {
              if (!text.includes('OBTC-')) return
              const arr = text.split(/OBTC-/)
              const newArr = arr[1].split(/\W/)
              const newStr = 'OBTC-' + newArr[0]
              const historyStr = Lib.store.get('copyTicket')
              if (newStr === historyStr) return
              Lib.common.event_statistics('home_clipboard_load_code')
              Lib.common.errorReminder(this, 'first_copy_code', 'B', '', newStr)
              // 弹出窗口后更新本地复制文本
              Lib.store.set('copyTicket', newStr)
            })
            .catch(() => {})
        }
      }, 300)
    }

    // app返回处理
    setTimeout(() => {
      if (this.winApp.type !== 1 && !this.isNewApp)
        this.winApp.setOnKeyPressedFunction()
    }, 1000)
  },
  methods: {
    // 国家选择弹出判断
    judgeCountry() {
      if (Lib.store.get('isSelectCountry')) return
      this.$axios_api
        .downloadApk({ URL: 'https://www.onebet.ug/get-country-code' })
        .then((res) => {
          this.userIP = res
          if (res.toLowerCase() === 'ug') {
            // 用户IP在ug
            if (this.country === 'cm') {
              // 乌干达用户访问OneBet CM
              this.$store.state.root.country = 'ug'
              this.openCountryModal = true
            }
          } else if (res.toLowerCase() === 'cm') {
            // 用户IP在cm
            if (this.country === 'ug') {
              // 喀麦隆用户访问OneBet UG
              this.$store.state.root.country = 'cm'
              this.openCountryModal = true
            }
          }
        })
    },
    openCountryModalFun() {
      this.openCountryModal = true
    },
    closeCountryModal() {
      this.openCountryModal = false
    },
    // 顶部freebet弹出窗判断
    freebetModal(to) {
      const freebetModalA1 = Lib.store.get('freebetModalA1')
      const freebetModalA2 = Lib.store.get('freebetModalA2')

      if (
        [
          'index',
          'lang',
          'lang-freeBet',
          'lang-match-matchId',
          'lang-popular'
        ].includes(to.name)
      ) {
        // a1 当天未弹出
        if (!freebetModalA1 || freebetModalA1 != this.todayDate) {
          if (
            this.info &&
            !this.info.freeBet &&
            popUpWindowDetection({ type: 'giftOrFreeBetExpire' })
          ) {
            this.topPopType = 'A1' // 顶部弹窗类型 A1 A2 B2三种
            this.showTopPop = true // 顶部弹窗是否显示
            Lib.store.set('freebetModalA1', this.todayDate)
          }
        }

        // a2当天未弹出
        if (!freebetModalA2 || freebetModalA2 != this.todayDate) {
          if (
            this.info &&
            this.info.freeBet &&
            popUpWindowDetection({ type: 'giftOrFreeBetExpire' })
          ) {
            this.topPopType = 'A2' // 顶部弹窗类型 A1 A2 B2三种
            this.showTopPop = true // 顶部弹窗是否显示
            Lib.store.set('freebetModalA2', this.todayDate)
          }
        }
      }
    },
    // b2 当天未弹出
    addToBetslip() {
      const freebetModalB2 = Lib.store.get('freebetModalB2')
      if (!freebetModalB2 || freebetModalB2 != this.todayDate) {
        if (
          this.info &&
          this.info.gifts &&
          popUpWindowDetection({ type: 'giftOrFreeBetExpire' })
        ) {
          this.topPopType = 'B2' // 顶部弹窗类型 A1 A2 B2三种
          this.showTopPop = true // 顶部弹窗是否显示
          Lib.store.set('freebetModalB2', this.todayDate)
        }
      }
    },
    // 首次打开项目打开语言选择框
    openLanguageSelect() {
      // 未选择过语言
      if (!this.storageLang) {
        setTimeout(() => {
          if (this.country === 'ug') return
          // 浏览器默认语言为英语和法语
          if (
            this.browserLang &&
            (this.browserLang === 'en' || this.browserLang === 'fr')
          ) {
            // 刷新页面
            this.$router.push({ path: `/${this.browserLang}` })
          } else {
            // 打开语言选择
            setTimeout(() => {
              popUpWindowDetection({ type: 'languageSelectionBox' }) &&
                (this.isOpenLang = true)
            }, 500)
          }
        }, 500)
      }
    },
    getQuery() {
      const channel = Lib.common.GetQueryString('channel')
      const giftAmount = Lib.common.GetQueryString('giftAmount')
      const code = Lib.common.GetQueryString('code')
      const smsCode = Lib.common.GetQueryString('w')
      const smsCodeX = Lib.common.GetQueryString('x')
      const isPageIframe = Lib.common.GetQueryString('isPageIframe')
      if (isPageIframe) this.$store.commit('setIsPageIframe', true)
      // 短信渠道统计
      if (smsCode) this.smsAnalysis(smsCode, 'w')
      if (smsCodeX) this.smsAnalysis(smsCodeX, 'x')

      if (giftAmount) {
        setTimeout(() => {
          Lib.common.errorReminder(
            this,
            '',
            '',
            '',
            this.$t('reminder.giftActivate', { amount: giftAmount }),
            '',
            this.$t('reminder.button.ok')
          )
        }, 1000)
      }
      // 有说明routing-guard文件有进行保存注册渠道行为, 不覆盖
      const sesChannel = sessionStorage.getItem('sesChannel')
      if (!sesChannel && channel) sessionStorage.setItem('sesChannel', channel)

      if (code) Lib.common.setCookie('inviterCode', code, 7)
      Lib.common.event_statistics('onebet_vue_init')
    },
    // 短信渠道统计
    smsAnalysis(sms, type) {
      let url = '/sms/analysis'
      if (type === 'w') {
        url = '/sms/analysis'
      } else if (type === 'x') {
        url = '/newuser/sms/analysis'
      }
      this.$axios_api.smsAnalysis(
        {
          [type]: sms
        },
        url
      )
    },
    userAccountInfo() {
      if (!this.token) return
      this.$axios_api.userAccountInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 判断是否有消息
          if (this.winApp.type !== 1) {
            this.winApp.showBadger(res.data.message || 0)
          }
          Lib.store.remove('giftModalTimeStamp')
          // 设置用户属性
          this.$store.commit('setAccountInfo', res.data)
          // 每日用户登录信息统计
          try {
            this.dailyLoginStatistics()
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    // 每日用户登录信息统计
    dailyLoginStatistics() {
      const date = new Date().getDate()
      if (Lib.store.get('dailyLoginStatistics') != date)
        this.$axios_api
          .dailyLoginStatistics({
            token: this.token
          })
          .then((res) => {
            // console.log(res)
            if (res.code === 0) Lib.store.set('dailyLoginStatistics', date)
          })
    },
    // socket
    client() {
      const that = this
      setTimeout(() => {
        const client_options = {
          auth: {
            type: 2020,
            body: JSON.stringify({
              token: this.token
            })
          },
          url: that.WsUrl,
          notify: that.onMessageReveived
        }

        this.MyClient = new MyClient(client_options)
      }, 3000)
    },
    // socket回调
    onMessageReveived(res) {
      switch (res.type) {
        case 2021:
          // 验证用户
          this.MyClient.ws.send(
            JSON.stringify({
              type: 2022,
              body: JSON.stringify({
                rid: '101'
              })
            })
          )
          break
        case 1001:
          // 资金推送
          this.$store.commit('setMoney', Number(res.balance))
          break
        case 1002:
          // 金币推送
          this.$store.commit('setCoins', Number(res.balance))
          break
        //        case 1003:
        //          //大转盘中奖名单推送
        //          this.$store.commit('setMessage',res.text);
        //          break;
        case 1004:
          // 充值
          Lib.common.event_statistics('deposit_top_up_received')
          Lib.common.errorReminder(
            this,
            '',
            '',
            '',
            this.$t('reminder.deposit3', {
              amount: res.amount,
              cost: res.cost,
              balance: res.balance
            }),
            '',
            'OK'
          )
          this.$store.commit('setMoney', Number(res.balance))
          break
        case 1005:
          // 首冲到账
          Lib.common.errorReminder(
            this,
            '',
            '',
            '',
            this.$t('reminder.deposit3', {
              amount: res.amount,
              cost: res.cost,
              balance: res.balance
            }),
            '',
            'OK'
          )
          this.$store.commit('setMoney', Number(res.balance))
          this.getInfo()
          this.$store.commit('setFirstDeposit', res.gifts)
          break
        case 3001:
          // live 赛事投注失败
          Lib.common.errorReminder(
            this,
            '',
            '',
            this.$t('betRefused.title'),
            `${this.$t('accountMybetBox.bet_id_title')} ${
              res.data.error_info.ticket_id
            },${res.data.error_info.info_msg}`,
            this.$t('betslipMarketList.remove'),
            this.$t('betslipPlaceBet.checkDetail'),
            this.removeExpiredMatches,
            () => {
              if (this.$route.name === 'lang-betslip') return
              this.$router.push({ path: `/${this.locale}/betslip` })
            }
          )
          break
        case 1006:
          // 完成欧洲杯日常任务
          setTimeout(() => {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('uefaHall.reminder1'),
              '',
              this.$t('reminder.button.ok')
            )
          }, 2000)
          break
        case 1225:
          // christmas spin
          this.$store.commit('setChristmasPrize', {
            type: 'push',
            text: res.text
          })
          break
        case 10000:
          // 投注欧洲杯赛事
          setTimeout(() => {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('uefaHall.reminder1'),
              '',
              this.$t('reminder.button.ok')
            )
          }, 2000)
          Lib.common.errorReminder(
            this,
            '',
            '',
            '',
            this.$t('uefaHall.reminder2'),
            '',
            this.$t('reminder.button.ok')
          )
          break
        // case 10001:
        //   //获取epl免费月测资格
        //   Lib.common.errorReminder(
        //     this,
        //     "eplSocket",
        //     "",
        //     this.$t("epl.predictTitle"),
        //     this.$t("epl.predictContent"),
        //     "",
        //     this.$t("epl.predictButton")
        //   );
        //   break;
      }
    },
    // 输入框控制
    inputControl() {
      const body = document.body
      const bodyHeight = body.offsetHeight || body.clientHeight
      this.appHeight = `height:${bodyHeight}px;`
      // window.onresize = (e) => {
      //   //焦点dom
      //   let focus = document.activeElement;
      //   let focusTop = focus.offsetTop;
      //
      //   //滚动高度
      //   let dom = document.querySelector('#app');
      //   let scrollTop = dom.scrollTop;
      //
      //   if(body !== focus){
      //     dom.scrollTop = scrollTop + 100;
      //   }
      // }
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
      if (Array.isArray(shareTickets)) {
        for (let i = 0, len = shareTickets.length; i < len; i++) {
          const bool = this.tickets.some((x) => shareTickets[i].id == x.id)
          if (!bool) return Lib.common.delCookie('betSharingTicketId')
        }
      }
    },
    // 获取info
    getInfo() {
      if (!this.token) return
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
        }
      })
    },
    // 返回前进处理--第三方客服弹出返回
    popStateFun(e) {
      try {
        const webWidget = document.querySelector('#webWidget')
        if (webWidget.getAttribute('tabindex') == 0) {
          Lib.common.closeServer()
          history.forward()
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取设备编号
    getImei() {
      if (window.appInteraction.type !== 1) {
        try {
          const imei = JSON.parse(window.appInteraction.getIMEI()).imei
          this.$store.commit('setImei', imei)
        } catch (err) {
          console.log(err)
        }
      }
    },
    // 刷新页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    // 位置回滚
    pageScroll(to, from) {
      // 离开前记录需要记录滚动距离的页面的滚动距离
      if (Object.keys(this.keepAlivePosition).includes(from.name)) {
        this.keepAlivePosition[from.name].top = this.scrollDom.scrollTop
      }

      // 进入有记录的滚动的页面的处理
      if (Object.keys(this.keepAlivePosition).includes(to.name)) {
        // 当foryou导航栏置顶，首页置顶取消
        if (this.isHall && this.$route.query.mode === 'foryou') return
        let countDownTime = 0
        if (this.keepAlive.includes(from.name)) countDownTime = 250
        setTimeout(() => {
          if (this.keepAlivePosition[to.name].from.includes(from.name)) {
            // 符合滚动到指定位置条件
            this.scrollDom.scrollTop = this.keepAlivePosition[to.name].top
          } else {
            this.scrollDom.scrollTop = this.keepAlivePosition[to.name].top
            // 滚动归零
            this.scrollAnimation()
          }
        }, countDownTime)
      } else {
        // 直接归零
        this.scrollDom.scrollTop = 0
      }
    },
    // 滚动归零动画
    scrollAnimation() {
      // 清除循环
      clearInterval(this.scrollInterval)
      // 设置循环，使滚动条滚动归零
      let times = 0
      this.scrollInterval = setInterval(() => {
        times++
        if (this.scrollDom.scrollTop > 0) {
          if (times > 80) {
            this.scrollDom.scrollTop = 0
            clearInterval(this.scrollInterval)
          } else {
            this.scrollDom.scrollTop -= 15
          }
        } else {
          this.scrollDom.scrollTop = 0
          clearInterval(this.scrollInterval)
        }
      }, 10)
    },
    // 打开游戏
    openGame(isFootballGame) {
      //      //cash场判断是否已登录
      //      if(!this.isGuest){
      //        if(!this.info && !isLogin){
      //          Lib.common.errorReminder(this,'login','','',this.$t("reminder.unLogin"),'',this.$t("reminder.button.ok"));
      //          return
      //        }
      //      }else {
      //        //demo场禁止打开踢球游戏
      //        if(this.gameName === 'Soccer'){
      //          Lib.common.errorReminder(this,'','','',this.$t("reminder.soccerDemo"),'',this.$t("reminder.button.ok"));
      //          return
      //        }
      //      }
      const { locale, country } = this.$store.state.root
      if (this.isNewApp) {
        const { gameName, openGame } = this.$store.state
        const baseUrl = isFootballGame ? isFootballGame.url : Lib.outUrl.gameUrl
        const page =
          baseUrl +
          `?v=${new Date().getTime()}` +
          `&gameName=${gameName}` +
          `&openGame=${openGame}` +
          `&language=${locale}` +
          `&country=${country}` +
          `&token=${this.token}`
        this.winApp.openPage({ page, type: 2 })
        return
      }
      // 是否是ug专属足球游戏
      this.isFootballGame = isFootballGame
      // 老版app
      if (this.winApp.type === 3 && !this.winApp.isNewApp()) {
        this.$router.push({ path: `/${locale}/gamePositionPage` })
        return
      }
      // 打开游戏
      this.$store.commit('setIframeGame', 1)
    },
    // 游戏调用关闭游戏iframe
    closeGame() {
      // 请求卡牌
      // this.req_xf_Card()
      // 获取个人信息
      this.getInfo()
      // 关闭游戏
      this.$store.commit('setIframeGame', 0)
      this.isFootballGame = ''
      const routerTimer = setInterval(() => {
        if (this.$route.name === 'lang-gamePositionPage') this.$router.back()
        else clearInterval(routerTimer)
      }, 10)
      const event = new CustomEvent('gameClose')
      window.dispatchEvent(event)

      // app返回处理
      setTimeout(() => {
        if (this.winApp.type !== 1 && !this.isNewApp)
          this.winApp.setOnKeyPressedFunction()
      }, 1000)

      // 判断是否弹出过游戏引导
      // if (this.playGamesTimes > 5) {
      //   let hadOnegameModalShow = Lib.store.get('hadOnegameModalShow')
      //   if (!hadOnegameModalShow) {
      //     Lib.store.set('hadOnegameModalShow', true)
      //     Lib.common.errorReminder(
      //       this,
      //       'OnegameModal',
      //       '',
      //       '',
      //       this.$t('casino.modal.title'),
      //       this.$t('casino.modal.go'),
      //       this.$t('casino.modal.later')
      //     )
      //   }
      // }
    },
    // 集卡活动-请求是否是每日第一次分享
    req_xf_Card() {
      // let shownCard = 0
      const date = new Date().getDate()
      // const cardPacksCasinoNum = Lib.store.get('cardPacksCasinoNum')
      // if (cardPacksCasinoNum) {
      // const saveDate = cardPacksCasinoNum.split('-')[0]
      // if (saveDate == date) {
      //   // 今日弹出过
      //   shownCard = cardPacksCasinoNum.split('-')[1]
      // }
      // }
      this.$axios_api
        .xfcard_onegame_casino({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            // this.$store.commit('setPacksNum',res.data.card_count - shownCard);
            Lib.store.set(
              'cardPacksCasinoNum',
              `${date}-${res.data.card_count}`
            )
          }
        })
    },
    // 退出房间事件
    outGameModal() {
      // let token = ''
      // if (Lib.store.get('token')) {
      //   token = Lib.common.decrypt(Lib.store.get('token'))
      // }

      // 获取个人信息
      this.getInfo()
      // 关闭游戏
      this.$store.commit('setIframeGame', 0)

      // this.$axios_api
      //   .roomLeave({
      //     token,
      //     room_id: this.roomId
      //   })
      //   .then((res) => {
      //     if (res.code === 0) {
      //       this.$store.commit('setNotice', res.data.notice)
      //     }
      //   })
      this.$store.commit('setRoomId', '')
    },
    // 清理缓存
    clearCache(com) {
      if (Array.isArray(com)) {
        com.forEach((itemA) => {
          this.deleteCache(itemA)
        })
        this.$nextTick(() => {
          com.forEach((item) => {
            this.keepAlive.push(item)
          })
        })
      } else {
        this.deleteCache(com)
        this.$nextTick(() => {
          this.keepAlive.push(com)
        })
      }
    },
    // 清理下的单个删除缓存
    deleteCache(com) {
      const index = this.keepAlive.findIndex((item) => item === com)
      if (index >= 0) {
        this.keepAlive.splice(index, 1)
      }
    },
    // 获取新用户福利类型
    getNewUserBenefitTypes() {
      if (!Lib.store.get('category')) {
        Lib.store.set('category', Math.floor(Math.random() * 2) + 1)
      }
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Roboto Condensed, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 10rem;
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  color: #444;
  font-size: 12rem/36;
}

.cl-prizeColor {
  color: #f59639;
}

.cl-bigPrizeColor {
  color: #00c229;
  font-style: italic;
  font-weight: 600;
}

.cl-wh_indicator_item {
  opacity: 0.5;
}

.cl-wh_show_bgcolor {
  opacity: 0.8;
}

.cl-wh_slide {
  min-height: 65px !important;
}

.cl-wh_indicator {
  z-index: 10 !important;
  bottom: 0 !important;
}

/*打开游戏*/
.cl-hideGameIframe {
  opacity: 0;
}

.cl-app-slide-right-enter-active,
.cl-app-slide-right-leave-active,
.cl-app-slide-left-enter-active,
.cl-app-slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.cl-app-slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.cl-app-slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.cl-app-slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.cl-app-slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
