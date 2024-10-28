import moneyConfig from '~/assets/js/money.config'
// 引入游戏入口配置
import gamesConfig from '~/static/gamesConfig/index.json'
import { removesPopupsBeingDisplayedList } from '@/assets/js/utils/popupPriority.js'
import Lib from '@/assets/js/Lib'

export const state = () => {
  return {
    root: {
      // 国家分类
      country: 'cm', // ug 乌干达， cm 喀麦隆
      // 球类
      sportList: [
        {
          id: 0,
          name: 'All'
        },
        {
          id: 1,
          name: 'Football'
        },
        {
          id: 2,
          name: 'Basketball'
        },
        {
          id: 12,
          name: 'Rugby'
        },
        {
          id: 16,
          name: 'USA Football'
        },
        {
          id: 5,
          name: 'Tennis'
        },
        {
          id: 21,
          name: 'Cricket'
        },
        {
          id: 23,
          name: 'Volleyball'
        }
      ],
      // 语言
      locale: 'fr',
      // betslip数据
      // 确认投注框状态
      isConfirmShow: false,
      // gift选择弹出控制
      isGiftShow: false,
      userIP: ''
    },
    pathCancelReq: {}, // 路由取消请求方法集合
    seo_head: {}, // 页面的seo
    locales: ['en', 'fr'],
    isKeep: true, // 投注时后台订单赔率是否保持不变
    defaultStake: 0, // 投注额
    modal: null,
    isLoadingShow: false, // loading页面状态
    info: null, // 用户info
    accountInfo: null,
    token: '', // token
    isServerInfoShow: false, // server info show
    phoneNumber: '', // 注册信息
    password: '',
    code: '',
    platform: 1, // 版本信息 1 web 2 lite 3 app
    tickets: [], // betslip订单
    freeBet: [], // freebet订单
    intimateTickets: [], // intimate betslip比赛信息
    live_total: 0, // live_total
    // bonus列表
    bonusList: [
      0, 0, 0, 3, 5, 10, 15, 20, 25, 30, 35, 40, 50, 55, 60, 70, 80, 85, 90, 95,
      100, 105, 110, 115, 130, 145, 160, 175, 200, 225, 250, 275, 300, 325, 350,
      375, 400, 425, 450, 475, 500, 550, 600
    ],
    isCommonReminderShow: false, // 错误提示框
    commonReminderText: '', // 错误提示文本
    commonReminderType: 0, // 错误提示类型 0 一般错误提示 1 成功提示
    matchDetailStatus: false, // matchDetail状态处理
    isDownloadShow: true, // 头部下载
    apk: '', // app下载地址
    imei: '', // 设备信息
    exit_time: 0, // app在大厅右键返回次数
    isFirstDeposit: 0, // 首冲到账礼物
    firstDepositBannerTime: 0, // 首充活动倒计时
    trending: null, // trending
    moneyConfig, // moneyConfig
    checkInInfo: null, // checkInInfo
    message: '', // 消息推送
    isGuest: true, // true为demo
    gameName: 'Top Six',
    openGame: '', // 打开游戏gameId
    gamesConfig: gamesConfig.data,
    onlineList: [], // 在线人数名单
    progress: 0,
    gameOnload: false,
    playGamesTimes: 0,
    onebetLeagueTickets: {}, // onebet league tickets
    ticket_del_ticket_id: {}, // 订单详情页面tickets id
    toastInfo: '', // toast
    packsNum: 0, // card packs弹出
    christmasPrize: [], // 圣诞推送消息
    epl_rounds: [], // epl活动轮数
    isGrandJackpotNoData: false, // grand jackpot是否没有数据
    ticketsDataIsAppReturn: 0, // tickets信息是否为app推送, 1:是 0:否,
    pageIframeUrl: '', // pageIframe
    isPageIframeShow: false,
    isPageIframe: false,
    savingCardCasino: {}, // saving card 数据
    safeAreaTop: 0, // app顶部安全距离
    depositComShow: false, // 充值组件弹窗是否显示
    footerDomHeight: 0, // 页脚空白补充高度
    freebetList: [], // freeBet list数据
    giftList: [], // gift list数据
    iframeGame: 0, // game的iframe是否打开
    contestListingsPage: {}, // 比赛列表页的数据保存一份，在查看详情后回去需要这里里面的数据还原
    liveTabsIndex: null // liveTabs的索引，用来开启动画
  }
}

export const mutations = {
  // 存放取消方法
  setPathCancelReq(state, data) {
    const { name, reqKeyStr, c } = data
    state.pathCancelReq[name][reqKeyStr] = c
  },
  // 是否打开game iframe
  setIframeGame(state, data) {
    state.iframeGame = data
  },
  // tickets信息是否为app推送, 1:是 0:否,
  setTicketsDataIsAppReturn(state, data) {
    state.ticketsDataIsAppReturn = data
  },
  // 设置顶部安全距离
  setSafeAreaTop(state, data) {
    state.safeAreaTop = data
  },
  // 路由修改时设置seo_head
  setSeoHead(state, data) {
    state.seo_head = data
  },
  // 修改是否保持赔率
  setIsKeep(state, data) {
    state.isKeep = data
  },
  // 修改root值
  setRoot(state, data) {
    state.root = data
  },
  // 充值组件弹窗是否显示
  setFepositComShow(state, data) {
    state.depositComShow = data
  },
  // 页脚空白补充高度
  setFooterDomHeight(state, data) {
    state.footerDomHeight = data
  },
  // 设置giftList数据
  setGiftList(state, data) {
    state.giftList = data
  },
  // 设置freebetList数据
  setFreebetList(state, data) {
    state.freebetList = data
  },
  // 设置投注额
  setDefaultStake(state, data) {
    this.state.defaultStake = data
  },
  // 弹出框
  Modal(state, data) {
    if (!data) {
      // 没得data属于关闭弹窗操作
      removesPopupsBeingDisplayedList({
        type: this.state.type === 'B' ? 'orderSharing' : 'publicPopUpBox'
      })
    }
    this.state.modal = data
  },
  // 获取设备信息
  setImei(state, data) {
    this.state.imei = data
  },
  // app在大厅右键返回次数
  setExitTime(state, data) {
    console.log('exit_time', data)
    this.state.exit_time = data
  },
  // loading页面状态
  changeLoadingStatus(state, data) {
    this.state.isLoadingShow = data
  },
  // 设置apk地址
  setApk(state, data) {
    this.state.apk = data
  },
  // 设置用户info
  setInfo(state, data) {
    this.state.info = data
  },
  setMoney(state, data) {
    if (this.state.info) {
      this.state.info.balance = data
    }
  },
  setCoins(state, data) {
    if (this.state.info) {
      this.state.info.coins = data
    }
  },
  setGifts(state, data) {
    if (this.state.info) {
      this.state.info.gifts = Number(data)
    }
  },
  setFirstDeposit(state, data) {
    this.state.isFirstDeposit = data
  },
  setFirstDepositBannerTime(state, data) {
    this.state.firstDepositBannerTime = data
  },
  // set token
  setToken(state, data) {
    this.state.token = data
  },
  // set Server info show
  setServerInfoShow(state, data) {
    this.state.isServerInfoShow = data
  },

  setAccountInfo(state, data) {
    this.state.accountInfo = data
  },
  // 注册信息
  savePhoneNumber(state, data) {
    this.state.phoneNumber = data
  },
  savePassword(state, data) {
    this.state.password = data
  },
  saveCode(state, data) {
    this.state.code = data
  },
  // betslip比赛信息
  setTickets(state, data) {
    if (data) state.tickets = data
    else state.tickets = []
  },
  setFreeBet(state, data) {
    this.state.freeBet = data
  },
  // intimate betslip比赛信息
  setIntimateTickets(state, data) {
    if (data) {
      this.state.intimateTickets = data
    } else {
      this.state.intimateTickets = []
    }
  },
  // live_total
  set_live_total(state, data) {
    this.state.live_total = data
  },

  // 错误提示方法
  setCommonReminder(state, data) {
    this.state.isCommonReminderShow = data.isCommonReminderShow
    // 错误提示文本
    this.state.commonReminderText = data.commonReminderText
    // 错误提示类型
    this.state.commonReminderType = data.commonReminderType
  },

  // matchDetailStatus
  setMatchDetailStatus(state, data) {
    this.state.matchDetailStatus = data
  },

  // 中奖推送
  setMessage(state, data) {
    this.state.message = data
  },

  // 头部下载
  setIsDownloadShow(state, data) {
    this.state.isDownloadShow = data
  },
  // trending
  setTrending(state, data) {
    this.state.trending = data
  },
  // checkInInfo
  setCheckInInfo(state, data) {
    this.state.checkInInfo = data
  },
  // setPlatform
  setPlatForm(state, data) {
    this.state.platform = data
  },
  setGuest(state, data) {
    this.state.isGuest = data
  },
  setGamesConfig(state, data) {
    this.state.gamesConfig = data
  },
  setOnline(state, data) {
    for (let i = 0; i < data.length; i++) {
      let bool = true
      for (let j = 0; j < this.state.onlineList.length; j++) {
        if (data[i].game === this.state.onlineList[j].game) {
          this.state.onlineList[j].number = data[i].number
          bool = false
          break
        }
      }

      if (bool) {
        this.state.onlineList.push(data[i])
      }
    }
  },
  setGameName(state, data) {
    this.state.gameName = data
  },
  setOpenGame(state, data) {
    this.state.openGame = data
  },
  // 与app交互
  setProgress(state, data) {
    this.state.progress = data
  },

  // setgameOnload
  setGameOnload(state, data) {
    console.log('onloadStore')
    this.state.gameOnload = data
  },
  // 设置游戏玩了几局
  setPlayGamesTimes(state, data) {
    this.state.playGamesTimes = data
  },
  // onebet league betslip比赛信息
  setOnebetLeagueTickets(state, data) {
    if (data) {
      this.state.onebetLeagueTickets = data
    } else {
      this.state.onebetLeagueTickets = []
    }
  },
  // 订单详情页面tickets id
  set_ticket_del_ticket_id(state, data) {
    this.state.ticket_del_ticket_id = data
  },
  // 设置toast弹出
  setToastInfo(state, data) {
    this.state.toastInfo = data
  },
  // 设置packsNum
  setPacksNum(state, data) {
    state.packsNum = Number(data)
  },
  // 设置christmas info
  setChristmasPrize(state, data) {
    if (data.type === 'push') {
      state.christmasPrize.push(data.text)
    } else {
      state.christmasPrize.shift()
    }
  },
  // 设置epl 轮数信息
  set_epl_rounds(state, data) {
    state.epl_rounds = data
  },
  // 设置grandJackpot内容是否存在
  SetGrandJackpotNoData(state, data) {
    state.isGrandJackpotNoData = data
  },
  // pageIframe
  setPageIframeUrl(state, data) {
    this.state.pageIframeUrl = data
  },
  setPageIframeShow(state, data) {
    this.state.isPageIframeShow = data
  },
  setIsPageIframe(state, data) {
    this.state.isPageIframe = data
  },
  setSavingCardCasino(state, data) {
    this.state.savingCardCasino = data
  },
  // 保存数据
  setContestListingsPage(state, data) {
    state.contestListingsPage = { ...state.contestListingsPage, ...data }
  },
  clearContestListingsPage(state) {
    state.contestListingsPage = {}
  },
  setLiveTabsIndex(state, data) {
    state.liveTabsIndex = data
  }
}

export const actions = {}

export const getters = {
  gameList(state) {
    const list = {}
    state.gamesConfig.forEach((item) => {
      list[item.gameId] = item.name
    })
    list['3020'] = 'Soccer'
    return list
  },
  contestListingsPage(state) {
    return Lib.common.deepCopy(state.contestListingsPage)
  }
}
