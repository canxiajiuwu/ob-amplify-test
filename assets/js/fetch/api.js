import crashFetch from './cashoutApi'
const wapUrl = process.env.HOSTURLCM
const sportUrl = process.env.SPORTURLCM
const virtualUrl = process.env.VIRTUALURLCM
const AVATARHOSTURL = process.env.AVATARHOSTURLCM
const OBPBCAURL = process.env.onebetpartner_BASE_CM_API

// 游戏 格式是json
const api_ch = process.env.API_CH_cm

// 公开接口
export default {
  ...crashFetch,
  /**
   * 账户系列接口
   */

  /**
   * 登陆
   */
  goLogin: { URL: wapUrl + '/login', TYPE: '' },
  /**
   * 检验手机号
   */
  checkMobile: { URL: wapUrl + '/check/mobile', TYPE: '' },
  /**
   * 发送验证码
   */
  sendCode: { URL: wapUrl + '/send/code', TYPE: '' },
  /**
   * 校验手机号和验证码
   */
  verifyCode: { URL: wapUrl + '/check/code', TYPE: '' },
  /**
   * 注册
   */
  register: { URL: wapUrl + '/register', TYPE: '' },
  /**
   * 代理渠道注册OB主体项目账号
   */
  inviteRegister: { URL: OBPBCAURL + '/agent/invite/register', TYPE: '' },
  /**
   * 设置备用号码
   */
  backup: { URL: wapUrl + '/user/mobile/spare', TYPE: '' },
  // /**
  //  * 找回密码
  //  */
  // smsAnalysis: {
  //   URL: wapUrl + url,
  //   TYPE: ''
  // },
  /**
   * 短信统计
   */
  forget: { URL: wapUrl + '/forget/password', TYPE: '' },
  /**
   * 用户资金账户信息
   */
  userInfo: { URL: wapUrl + '/account/asset', TYPE: '' },
  /**
   * 用户信息
   */
  userAccountInfo: { URL: wapUrl + '/user/info', TYPE: '' },
  /**
   * creash用户信息
   */
  userCrashInfo: { URL: wapUrl + '/crash/earn/info', TYPE: '' },
  /**
   * 用户登出
   */
  logout: { URL: wapUrl + '/logout', TYPE: '' },

  /**
   * 获取banner
   */
  banner: { URL: wapUrl + '/banner/old', TYPE: '' },
  // /**
  //  * 获取首页弹出窗banner
  //  */
  // popUpBanner (data) {
  //   return fetch(wapUrl + "/banner", TYPE:'';
  // },
  /**
   * 邀请好友
   */
  inviteUser: { URL: wapUrl + '/invite/user', TYPE: '' },
  inviteIncome: { URL: wapUrl + '/freebet/income', TYPE: '' },
  /**
   * 修改头像
   */
  changeAvatar: {
    URL: AVATARHOSTURL + '/user/change/avatar',
    TYPE: 'multipart/form-data'
  },
  /**
   * 修改昵称
   */
  changeNickname: { URL: wapUrl + '/user/change/nickname', TYPE: '' },
  /**
   * 发送账户信息邮件
   */
  emailSendAccount: { URL: wapUrl + '/email/send/account', TYPE: '' },
  /**
   * 验证找回密码手机号是否是可用
   */
  checkForgetMobile: { URL: wapUrl + '/check/forget/mobile', TYPE: '' },
  /**
   * 验证找回密码手机号是否是可用
   */
  forgetPasswordTransaction: {
    URL: wapUrl + '/forget/password/transaction',
    TYPE: ''
  },
  /**
   * 验证找回密码手机号是否是可用
   */
  userEmailSet: { URL: wapUrl + '/user/email/set', TYPE: '' },
  /**
   * 充值
   */
  deposit: { URL: wapUrl + '/deposit', TYPE: '' },
  /**
   * 充值记录
   */
  transactionDeposit: { URL: wapUrl + '/transaction/deposit', TYPE: '' },
  /**
   * 提现
   */
  withdraw: { URL: wapUrl + '/withdraw', TYPE: '' },
  /**
   * 提现风控提示
   */
  withdrawRiskTips: { URL: wapUrl + '/withdraw/risk/tips', TYPE: '' },
  /**
   * 提现记录
   */
  transactionWithdraw: { URL: wapUrl + '/transaction/withdraw', TYPE: '' },
  /**
   * 系统bonus
   */
  bonus: { URL: wapUrl + '/transaction/bonus', TYPE: '' },
  /**
   * 站内信
   */
  message: { URL: wapUrl + '/user/messages', TYPE: '' },
  /**
   * 大转盘
   * 1 -> try again;
   * 2 -> gift 500;
   * 3 -> gift 1000;
   * 4 -> gift 2000;
   * 5 -> gift 5000;
   * 6 -> gift 10000;
   * 7 -> cash 5000;
   * 8 -> cash 10000;
   */
  bigWheel: { URL: wapUrl + '/turn', TYPE: '' },
  /**
   * 签到情况
   */
  checkinInfo: { URL: wapUrl + '/checkin/info', TYPE: '' },
  /**
   * 签到
   */
  checkin: { URL: wapUrl + '/checkin/today', TYPE: '' },
  /**
   * 金币情况
   */
  coinsInfo: { URL: wapUrl + '/coins/info', TYPE: '' },
  /**
   * 金币记录
   */
  coinsRecord: { URL: wapUrl + '/coins/record', TYPE: '' },
  /**
   * gifts
   */
  giftsValid: { URL: wapUrl + '/gifts/valid', TYPE: '' },
  /**
   * 身份提交
   */
  identity: { URL: wapUrl + '/user/identity/store', TYPE: '' },
  /**
   * 首冲活动
   */
  firstDeposit: { URL: wapUrl + '/activity/first/deposit/info', TYPE: '' },
  /**
   * bet share
   */
  betsharingDetail: { URL: wapUrl + '/betsharing/detail', TYPE: '' },
  /**
   * 错误提交
   */
  errorReport: { URL: wapUrl + '/report/sport', TYPE: '' },
  /**
   * 用户的free bet
   */
  freeBetValid: { URL: wapUrl + '/freebet/valid', TYPE: '' },
  /**
   * 用户的订单列表
   */
  freeBetOrder: { URL: wapUrl + '/freebet/order', TYPE: '' },
  /**
   * 邀请朋友列表
   */
  freeBetFriendList: { URL: wapUrl + '/freebet/invite/list', TYPE: '' },
  /**
   * free bet 提现
   */
  freeBetDeposit: { URL: wapUrl + '/freebet/deposit', TYPE: '' },
  /**
   * App用户是否有投注bonus
   */
  welfareAppAuth: { URL: wapUrl + '/welfare/app/auth', TYPE: '' },
  /**
   * App用户领取投注bonus
   */
  welfareAppReceive: { URL: wapUrl + '/welfare/app/receive', TYPE: '' },
  /**
   * 每日登录统计
   */
  dailyLoginStatistics: { URL: wapUrl + '/user/daily/login', TYPE: '' },
  /**
   * 博彩系列接口
   *
   *
   *
   *
   *
   */
  /**
   * 首页赛事
   */
  homeMatch: {
    URL: sportUrl + '/home/match',
    TYPE: ''
    // return fetch("https://cdn-api.onebet.cm/sports/home/match/test", TYPE:'';
  },

  /**
   * 获取某个运动项目下的所有国家
   */
  getCountry: { URL: sportUrl + '/get/countries', TYPE: '' },

  /**
   * 获取某个运动项目下的所有国家v2
   */
  getCountryV2: { URL: sportUrl + '/get/countries/v2', TYPE: '' },
  /**
   * 获取某个国家下的所有联赛
   */
  getTournament: { URL: sportUrl + '/get/tournaments', TYPE: '' },

  /**
   * 获取某个联赛下的所有赛事
   */
  getMatch: { URL: sportUrl + '/get/match', TYPE: '' },

  /**
   * 搜索赛事
   */
  search: { URL: sportUrl + '/search', TYPE: '' },
  /**
   * 获取热门搜索词汇
   */
  getHwords: { URL: sportUrl + '/search/hwords', TYPE: '' },
  /**
   * pre赛事详情
   */
  preMatchInfo: { URL: sportUrl + '/match/pre/info', TYPE: '' },
  /**
   * live赛事详情
   */
  matchInfo: { URL: sportUrl + '/match/info', TYPE: '' },
  // live赛事详情meta数据
  matchInfoMeta: { URL: sportUrl + '/match/infometa', TYPE: '' },
  // live赛事详情比赛数据
  matchInfoV2: { URL: sportUrl + '/match/infoV2', TYPE: '' },
  /**
   * Live赛事&Upcoming
   */
  sportLive: { URL: sportUrl + '/sport/live/v3', TYPE: '' },

  /**
   * 获取体育赛事总数
   */
  getSportCount: { URL: sportUrl + '/get/sport/count', TYPE: '' },

  /**
   * 获取单个outcome的最新赔率
   */
  getOutcome: { URL: sportUrl + '/get/outcome', TYPE: '' },

  /**
   * 获取多个outcome的最新赔率
   */
  getOutcomes: { URL: sportUrl + '/get/outcomes', TYPE: '' },

  /**
   * sport 投注
   */
  sportBet: { URL: sportUrl + '/sport/bet', TYPE: '' },

  /**
   * 获取投注记录
   */
  ticketHistory: { URL: sportUrl + '/ticket/history', TYPE: '' },

  /**
   * 获取单个订单的投注详情
   */
  ticketInfo: { URL: sportUrl + '/ticket/info', TYPE: '' },

  /**
   * 删除ticket记录
   */
  ticketDel: { URL: sportUrl + '/ticket/del', TYPE: '' },

  /**
   * 删除ticket记录virtual
   */
  ticketDelVirtual: { URL: virtualUrl + '/ticket/del', TYPE: '' },

  /**
   * 获取分享订单的投注信息
   */
  shareBet: { URL: sportUrl + '/get/share/bet', TYPE: '' },

  /**
   * 获取jackpot 所有期数
   */
  jackpotPeriods: { URL: sportUrl + '/jackpot/periods', TYPE: '' },

  /**
   * 获取jackpot weekly cash 名单
   */
  jackpotWeeklyCash: { URL: sportUrl + '/act/jackpot/info', TYPE: '' },

  /**
   * 礼金膨胀接口
   */
  specialSpin: { URL: wapUrl + '/act/special/spin', TYPE: '' },

  /**
   * 获取jackpot 比赛信息
   */
  jackpotMatch: { URL: sportUrl + '/jackpot/match', TYPE: '' },

  /**
   * jackpot 投注
   */
  jackpotBet: { URL: sportUrl + '/jackpot/bet', TYPE: '' },

  /**
   * 比分查询
   */
  matchResults: { URL: sportUrl + '/match/results', TYPE: '' },

  /**
   * 检查Betslip中Event的状态
   */
  checkBetslip: { URL: sportUrl + '/check-betslip', TYPE: '' },
  /**
   * 获取ticket的mts状态
   */
  ticketPhase: { URL: sportUrl + '/ticket/phase', TYPE: '' },
  /**
   * 取消ticket
   */
  ticketCancel: { URL: sportUrl + '/ticket/cancel', TYPE: '' },
  /**
   * trending
   */
  trending: { URL: sportUrl + '/page/guides', TYPE: '' },
  /**
   * daily jackpot 所有正在进行的期数
   */
  jackpotDailyPeriods: { URL: sportUrl + '/jackpot/daily/periods', TYPE: '' },
  /**
   * 获取Daily Jackpot 赛事
   */
  jackpotDailyMatch: { URL: sportUrl + '/jackpot/daily/match', TYPE: '' },
  /**
   * 获取Daily Jackpot 投注
   */
  jackpotDailyBet: { URL: sportUrl + '/jackpot/daily/bet', TYPE: '' },
  /**
   * 获取Intimate 赛事
   */
  intimateMatch: { URL: sportUrl + '/intimate/match', TYPE: '' },
  /**
   * 获取Intimate 赛事的market
   */
  intimateMarkets: { URL: sportUrl + '/intimate/markets', TYPE: '' },
  /**
   * intimate match 投注
   */
  intimateBet: { URL: sportUrl + '/intimate/bet', TYPE: '' },
  /**
   * intimate check betslip
   */
  intimateCheck: { URL: sportUrl + '/intimate/check-betslip', TYPE: '' },
  /**
   * 首页 Featured Match
   */
  featuredMatchHome: { URL: sportUrl + '/featured/match/home', TYPE: '' },
  /**
   * betslip Related bets(关联赛事接口)
   */
  relatedBetMatch: { URL: sportUrl + '/related/bet/match', TYPE: '' },
  /**
   * betslip Related bets(新关联赛事接口)
   */
  relatedBetMatchNew: {
    URL: 'https://cdn-api.onebet.cm/sports/related/bet/match/recommend',
    TYPE: ''
  },
  /**
   * Featured Match more
   */
  featuredMatchMore: { URL: sportUrl + '/featured/match/more', TYPE: '' },
  /**
   * collect market
   */
  marketStore: { URL: sportUrl + '/market/store', TYPE: '' },
  /**
   * cancel collect market
   */
  marketCancel: { URL: sportUrl + '/market/cancel', TYPE: '' },
  /**
   * 用户首页赢钱弹窗
   */
  winPopup: { URL: sportUrl + '/win/popup', TYPE: '' },
  /**
   * 获取freebet赛事
   */
  freebetMatches: { URL: sportUrl + '/freebet/matches', TYPE: '' },
  /**
   * freebet 投注
   */
  freebetBet: { URL: sportUrl + '/freebet/bet', TYPE: '' },
  /**
   * Live赛事中只展示用户收藏的market(只会展示用户最近收藏的5个market，如果最近的5个market中在赛事中不存在或者不可用会没有这个market的数据)
   */
  liveFavorites: { URL: sportUrl + '/sport/live/favorite', TYPE: '' },
  /**
   * 订单分享页生成
   */
  shareOrder: { URL: sportUrl + '/share/order', TYPE: '' },

  /**
   * 获取json
   */
  downloadApk: { METHOD: 'GET', TYPE: '' },
  /**
   * 在线人数
   */
  online: { METHOD: 'GET', URL: api_ch + '/game/online/number', TYPE: '' },
  /**
   * 离开房间
   */
  roomLeave: { URL: api_ch + '/dq/room/leave', TYPE: '' },
  /**
   * 下注激励活动 - 奖励详情
   */
  betawardInfo: { URL: wapUrl + '/betaward/info', TYPE: '' },
  /**
   * 下注激励活动 - 领取奖励
   */
  betawardReceive: { URL: wapUrl + '/betaward/receive', TYPE: '' },
  /**
   * 下注激励活动 - 中奖用户
   */
  betawardWinner: { URL: wapUrl + '/betaward/winner', TYPE: '' },
  /**
   * Popluar Matches
   */
  soccerPopular: { URL: sportUrl + '/soccer/popular', TYPE: '' },
  /**
   * freebet bonus
   */
  freebetBonus: { URL: wapUrl + '/activity/freebet/info', TYPE: '' },
  /**
   * freebet bonus 抢券
   */
  freebetPanic: { URL: wapUrl + '/activity/freebet/panic/buying', TYPE: '' },
  /**
   * 获取league 期数
   */
  LeagueSoccerPeriod: {
    METHOD: 'GET',
    URL: virtualUrl + '/period',
    TYPE: ''
    // return fetch(virtualUrl + '/soccer/period', TYPE:''
  },
  /**
   * 获取league 比赛
   */
  LeagueSoccerMatches: {
    METHOD: 'GET',
    URL: virtualUrl + '/matches',
    TYPE: ''
    // return fetch(virtualUrl + '/soccer/matches', TYPE:''
  },
  /**
   * 获取league 比赛结果
   */
  LeagueSoccerResult: {
    URL: virtualUrl + '/result',
    TYPE: 'JSON'
    // return fetch(virtualUrl + '/soccer/result', TYPE:''
  },
  /**
   * 获取league 比赛standing
   */
  LeagueSoccerStanding: {
    URL: virtualUrl + '/standing',
    TYPE: 'JSON'
    // return fetch(virtualUrl + '/soccer/standing', TYPE:''
  },
  /**
   * 获取league 比赛live
   */
  LeagueSoccerLive: {
    URL: virtualUrl + '/live',
    TYPE: 'JSON'
    // return fetch(virtualUrl + '/soccer/live', TYPE:''
  },
  /**
   * league 投注
   */
  LeagueSoccerBet: {
    URL: virtualUrl + '/bet',
    TYPE: 'JSON'
    // return fetch(virtualUrl + '/soccer/bet', TYPE:''
  },
  /**
   * league 投注列表
   */
  LeagueSoccerRecord: {
    URL: virtualUrl + '/record',
    TYPE: 'JSON'
    // return fetch(virtualUrl + '/ticket/record', TYPE:''
  },
  /**
   * league cashout列表
   */
  LeagueSoccerCashoutList: {
    URL: virtualUrl + '/players/tickets',
    TYPE: 'JSON'
  },
  /**
   * league cashout详细信息
   */
  LeagueSoccerCashoutOffer: { URL: virtualUrl + '/offer', TYPE: 'JSON' },
  /**
   * league cashout操作
   */
  LeagueSoccerCashoutCash: { URL: virtualUrl + '/cash', TYPE: 'JSON' },
  /**
   * league 投注详情
   */
  LeagueSoccerDetail: {
    URL: virtualUrl + '/detail',
    TYPE: 'JSON'
    // return fetch(virtualUrl + '/ticket/detail', TYPE:''
  },
  /**
   * league freebet数量
   */
  LeagueSoccerFreebet: { URL: virtualUrl + '/freebet/count', TYPE: 'JSON' },
  /**
   * league freebet信息
   */
  LeagueSoccerFreebetInfo: {
    URL: virtualUrl + '/freebet',
    TYPE: 'JSON'
    // return fetch(virtualUrl + '/freebet/index', TYPE:''
  },
  /**
   * league freebet投注
   */
  LeagueSoccerFreebetBet: {
    URL: virtualUrl + '/freebet/bet',
    TYPE: 'JSON'
    // return fetch(virtualUrl + '/freebet/bet', TYPE:''
  },

  // UEFA 2020
  /**
   * uefa basic info
   */
  eucupInfo: { URL: wapUrl + '/eucup/info', TYPE: '' },
  /**
   * uefa win
   */
  eucupWin: { URL: wapUrl + '/eucup/win', TYPE: '' },
  /**
   * uefa jackpot teams
   */
  europeanjackTeams: { URL: sportUrl + '/europeanjack/teams', TYPE: '' },
  /**
   * uefa jackpot bet
   */
  europeanjackBet: { URL: sportUrl + '/europeanjack/bet', TYPE: '' },

  // daily giveaway
  /**
   * daily giveaway活动首页
   */
  dailyGiveawayTask: { URL: wapUrl + '/activity/cash/task', TYPE: '' },
  /**
   * daily giveaway活动翻牌
   */
  dailyGiveawayCard: { URL: wapUrl + '/activity/cash/card', TYPE: '' },
  /**
   * daily giveaway提钱到主账户
   */
  dailyGiveawayWithdraw: { URL: wapUrl + '/activity/cash/withdraw', TYPE: '' },
  /**
   * daily giveaway提现信息
   */
  dailyGiveawayInfo: { URL: wapUrl + '/activity/cash/info', TYPE: '' },
  /**
   * daily giveaway中奖用户
   */
  dailyGiveawayWin: { URL: wapUrl + '/activity/cash/win', TYPE: '' },

  /**
   * kubeti 转盘次数
   */
  kubetiSpinCount: { URL: wapUrl + '/kubeti/spin/count', TYPE: '' },

  /**
   * card packs 活动 分享点击
   */
  xfcard_share: { URL: wapUrl + '/xfcard/share', TYPE: '' },
  /**
   * card packs 活动 casino banner 点击
   */
  xfcard_onegame: { URL: wapUrl + '/xfcard/onegame', TYPE: '' },
  /**
   * card packs 活动 casino 游玩退出后请求
   */
  xfcard_onegame_casino: { URL: api_ch + '/game/cardcount', TYPE: '' },

  /**
   * christmas 转盘信息
   * @token {string} 登录token
   */
  christmas_spin_info: { URL: wapUrl + '/christmas/spin/info', TYPE: '' },

  /**
   * christmas 转动转盘
   * @token {string} 登录token
   */
  christmas_spin: { URL: wapUrl + '/christmas/spin', TYPE: '' },

  /**
   * christmas 今日是否已参加充值
   * @token {string} 登录token
   */
  christmas_deposit: { URL: wapUrl + '/christmas/deposit', TYPE: '' },

  /**
   * christmas 投注league弹窗
   * @token {string} 登录token
   */
  christmas_league: { URL: wapUrl + '/christmas/league', TYPE: '' },

  /**
   * time-limited bonus
   */
  timeLimited: { URL: wapUrl + '/time/limited/info', TYPE: '' },

  /**
   * receive orange info
   */
  orangeInfo: { URL: wapUrl + '/act/orange/info', TYPE: '' },

  /**
   * receive orange bonus
   */
  orangeReceive: { URL: wapUrl + '/act/orange/receive', TYPE: '' },
  /**
   * 获取gift奖励配置
   */
  activeGift: { URL: wapUrl + '/user/act/gift', TYPE: '' },
  /**
   * 领取礼物
   */
  activeGiftRetrieve: { URL: wapUrl + '/user/gift/act/retrieve', TYPE: '' },
  /**
   * epl matches
   */
  epl_matches: { URL: sportUrl + '/epl/matches', TYPE: '' },
  /**
   * epl simple
   */
  epl_simple: { URL: sportUrl + '/epl/questions', TYPE: '' },
  /**
   * epl matches 投注
   */
  epl_match_commit: { URL: sportUrl + '/epl/matches/commit', TYPE: '' },
  /**
   * epl simple 投注
   */
  epl_simple_commit: { URL: sportUrl + '/epl/questions/commit', TYPE: '' },
  /**
   * epl 轮数
   */
  epl_round_all: { URL: sportUrl + '/epl/round/all', TYPE: '' },
  /**
   * epl 我的预测
   */
  epl_myprediction: { URL: sportUrl + '/epl/myprediction', TYPE: '' },
  /**
   * epl winners
   */
  epl_winners: { URL: sportUrl + '/epl/winners', TYPE: '' },
  /**
   * 获取跟投页面数据
   */
  getHottestTickets: { URL: sportUrl + '/follow/bet/list', TYPE: '' },
  /**
   * 分享跟投
   */
  sharingInvestment: { URL: sportUrl + '/follow/share', TYPE: '' },
  /**
   * 奖励榜单
   */
  getShareRewardList: { URL: sportUrl + '/follow/ranking', TYPE: '' },
  /**
   * 奖励弹窗
   */
  getShareRewardPopup: { URL: sportUrl + '/follow/reward', TYPE: '' },
  /**
   * sprots Promos加入活动
   */
  promoJoin: { URL: sportUrl + '/act/promo/join', TYPE: '' },
  /**
   * sprots Promos活动列表
   */
  promoList: { URL: sportUrl + '/act/promo/lists', TYPE: '' },
  /**
   * sprots Promos活动列表
   */
  promoDetail: { URL: sportUrl + '/act/promo/detail', TYPE: '' },
  /**
   * 通过marketIds查询outcomes
   */
  getMarketInfo: { URL: sportUrl + '/act/promo/getMarket', TYPE: '' },
  /**
   * 通过marketIds查询outcomes
   * 为首页ForYou模块提供
   */
  getMarketInfos: {
    URL: 'https://cdn-api.onebet.cm/sports/act/promo/getMarkets',
    TYPE: ''
  },
  /**
   * 后台配置的各种banner
   */
  getBackstageBanner: { URL: wapUrl + '/banner', TYPE: '' },
  /**
   * 获取重大赛事数量
   */
  getImportantMatchesNumber: {
    URL: sportUrl + '/get/daily/important/matches/number',
    TYPE: ''
  },
  /**
   * 后台配置首页图标
   */
  getHomeTabs: { URL: wapUrl + '/home/tab', TYPE: '' },
  /**
   * 后台配置页脚导航栏
   */
  getFooterNav: { URL: wapUrl + '/footer/tab', TYPE: '' },
  /**
   * 平台维护通知
   */
  platformMaintainNotice: { URL: wapUrl + '/tips/platform', TYPE: '' },
  /**
   * 充值/提现维护通知
   */
  rechargeWithdrawNotice: { URL: wapUrl + '/tips/transaction', TYPE: '' },
  /**
   * 首页foryou推荐
   */
  getHomeForYou: { URL: sportUrl + '/home/match/mate', TYPE: '' },
  /**
   * 首页foryou详情
   */
  getForYouDetail: { URL: sportUrl + '/home/match/mate/detail', TYPE: '' },
  /**
   * 请求获取哪些market是被关注的
   */
  reqMarketsFollow: {
    URL: sportUrl + '/sport/live/favorite/markets',
    TYPE: ''
  },
  /**
   * 钱包信息
   */
  saveCardInfo: { URL: wapUrl + '/savecard/info', TYPE: '' },
  /**
   * 开卡
   */
  saveCardOpen: { URL: wapUrl + '/savecard/open', TYPE: '' },
  /**
   * 劵列表查询
   */
  saveCardTickets: { URL: wapUrl + '/savecard/save_gifts', TYPE: '' },
  /**
   * 领劵
   */
  saveCardClaim: { URL: wapUrl + '/savecard/gifts/claim', TYPE: '' },
  /**
   * 领劵v2
   */
  saveCardClaimV2: { URL: wapUrl + '/savecard/gifts/claim/v2', TYPE: '' },
  /**
   * 默认劵列表
   */
  saveCardDefault: { URL: wapUrl + '/savecard/gifts/default', TYPE: '' },
  /**
   * 默认劵列表v2
   */
  saveCardDefaultV2: { URL: wapUrl + '/savecard/gifts/default/v2', TYPE: '' },
  /**
   * casino gifts 可用列表
   */
  saveCardCasinoGifts: { URL: wapUrl + '/savecard/casino/gifts', TYPE: '' },
  /**
   * casino bet history
   */
  casinoHistory: {
    METHOD: 'GET',
    URL: api_ch + '/game/play/history',
    TYPE: ''
  },
  /**
   * 主页获取各分页面有效的活动
   */
  luckybagConfig: {
    METHOD: 'GET',
    URL: wapUrl + '/act/luckybag/config',
    TYPE: ''
  },
  /**
   * 分页面获取活动信息
   */
  luckybagList: { METHOD: 'GET', URL: wapUrl + '/act/luckybag/list', TYPE: '' },
  /**
   * 活动详情
   */
  luckybagInfo: { METHOD: 'GET', URL: wapUrl + '/act/luckybag/info', TYPE: '' },
  /**
   * 用户加入活动
   */
  luckybagJoin: { METHOD: 'GET', URL: wapUrl + '/act/luckybag/join', TYPE: '' },
  /**
   * 获取开奖详情
   */
  luckybagRecord: {
    METHOD: 'GET',
    URL: wapUrl + '/act/luckybag/record',
    TYPE: ''
  },
  /**
   * 展示用户福利页面
   */
  newUserBenefitsGet: {
    METHOD: 'GET',
    URL: sportUrl + '/new/user/benefits/get',
    TYPE: ''
  },
  /**
   * 领取优惠券页面：
   */
  newUserBenefitsOpen: { URL: sportUrl + '/new/user/benefits/open', TYPE: '' },
  /**
   * 快速创建订单
   */
  createBetslip: { URL: sportUrl + '/quick/create/betslip', TYPE: 'JSON' },
  /**
   * 查询联赛配置
   */
  fiveLeaguesGet: {
    METHOD: 'GET',
    URL: sportUrl + '/five/leagues/get',
    TYPE: ''
  },
  /**
   * 提交预测
   */
  fiveLeaguesSubmit: { URL: sportUrl + '/five/leagues/submit', TYPE: 'JSON' },
  /**
   * 领取奖励
   */
  fiveLeaguesGetReward: {
    URL: sportUrl + '/five/leagues/get/reward',
    TYPE: 'JSON'
  }
}
