const api_url = process.env.API_CASH_cm

export default {
  /**
   * crash 玩家列表
   */
  playerList: { METHOD: 'GET', URL: api_url + '/crash/playerList', TYPE: '' },
  /**
   * crash 历史记录
   */
  history: { METHOD: 'GET', URL: api_url + '/crash/historyList', TYPE: '' },
  /**
   * crash 本轮游戏详情
   */
  roundInformation: {
    METHOD: 'GET',
    URL: api_url + '/crash/roundInformation',
    TYPE: ''
  },
  /**
   * crash 单个用户本轮游戏详情
   */
  betInformation: {
    METHOD: 'GET',
    URL: api_url + '/crash/betInformation',
    TYPE: ''
  },
  /**
   * crash 用户详情
   */
  userStats: { METHOD: 'GET', URL: api_url + '/crash/userStats', TYPE: '' },
  /**
   * chat聊天初始化
   */
  chat: { METHOD: 'GET', URL: api_url + '/crash/chatList', TYPE: '' },
  /**
   * 查询奖励数
   */
  getGifts: {
    METHOD: 'GET',
    URL: api_url + '/crash/rushHour/getGifts',
    TYPE: ''
  },
  /**
   * 打开奖励
   */
  openGift: {
    METHOD: 'GET',
    URL: api_url + '/crash/rushHour/openGift',
    TYPE: ''
  },
  /**
   * 查询gifts
   */
  consultGift: {
    METHOD: 'GET',
    URL: api_url + '/crash/get/crash/gift/list',
    TYPE: ''
  }
}
