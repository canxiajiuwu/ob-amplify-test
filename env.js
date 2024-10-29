export default {
  // 开发环境
  development: {
    NODE_ENV: 'development', // 环境名称
    ENV_CONFIG: 'development',
    SPORTURL: 'https://staging-api.onebet.ug/sports',
    HOSTURL: 'https://staging-api.onebet.ug/user',
    AVATARHOSTURL: 'https://staging-api.onebet.ug/user',
    VIRTUALURL: 'https://staging-api.onebet.ug/virtual',
    VIRTUALURLCM: 'https://staging-api-cm.onebet.ug/virtual',
    SPORTURLCM: 'https://staging-api-cm.onebet.ug/sports',
    HOSTURLCM: 'https://staging-api-cm.onebet.ug/user',
    AVATARHOSTURLCM: 'https://staging-api-cm.onebet.ug/user',
    WsUrl: 'wss://staging-game-ug-im.onebet.ug/sport',
    WsCmUrl: 'wss://staging-game-cm-im.onebet.ug/sport',
    // HOSTURL: 'https://cdn-api.onebet.ug/user',
    // AVATARHOSTURL: 'https://api.onebet.ug/user',
    // SPORTURL: 'https://cdn-api.onebet.ug/sports',
    // VIRTUALURL: 'https://cdn-api.onebet.ug/virtual',
    // VIRTUALURLCM: 'https://cdn-api.onebet.cm/virtual_cash',
    // SPORTURLCM: 'https://cdn-api.onebet.cm/sports',
    // HOSTURLCM: 'https://cdn-api.onebet.cm/user',
    // AVATARHOSTURLCM: 'https://cm-bet-api-v2.onebet.ug/user',
    // WsUrl: 'wss://live.onebet.ug/sport',
    // WsCmUrl: 'wss://cm-bet-live.onebet.ug/sport',
    hostname: 'http://localhost:8001',
    hostnamecm: 'http://localhost:8001',
    STATICURL: '',
    gamesConfigUrl: 'https://static-sport.onebet.cm/display-staging/',
    API_CH_cm: 'https://staging-api-cm.onebet.ug/onegame',
    xFootball_URL_APP: 'http://192.168.3.20:8080',
    xFootball_URL_WEB: 'http://192.168.3.20:8080',
    onebetPartner: 'https://www.onebetpartner.com',
    API_CASH_SOCKET_ug: 'wss://socket-staging.onebet.ug/sub',
    API_CASH_SOCKET_cm: 'wss://socket-staging-cm.onebet.ug/sub',
    API_CASH_ug: 'https://cashout-staging-api.onebet.ug',
    API_CASH_cm: 'https://cashout-staging-cm-api.onebet.ug',
    onebetpartner_BASE_CM_API: 'https://staging-api.onebetpartner.com/cm'
    // API_CASH_SOCKET_ug: 'wss://socket.onebet.ug/sub',
    // API_CASH_SOCKET_cm: 'wss://socket.onebet.cm/sub',
    // API_CASH_ug: 'https://cashout-api.onebet.ug',
    // API_CASH_cm: 'https://cashout-api.onebet.cm'
  },
  // 测试环境
  staging: {
    NODE_ENV: 'staging',
    ENV_CONFIG: 'ppe',
    HOSTURL: 'https://staging-api.onebet.ug/user',
    AVATARHOSTURL: 'https://staging-api.onebet.ug/user',
    SPORTURL: 'https://staging-api.onebet.ug/sports',
    VIRTUALURL: 'https://staging-api.onebet.ug/virtual',
    VIRTUALURLCM: 'https://staging-api-cm.onebet.ug/virtual',
    SPORTURLCM: 'https://staging-api-cm.onebet.ug/sports',
    HOSTURLCM: 'https://staging-api-cm.onebet.ug/user',
    AVATARHOSTURLCM: 'https://staging-api-cm.onebet.ug/user',
    WsUrl: 'wss://staging-game-ug-im.onebet.ug/sport',
    WsCmUrl: 'wss://staging-game-cm-im.onebet.ug/sport',
    hostname: 'https://staging-www.onebet.ug',
    hostnamecm: 'https://staging-cm.onebet.ug',
    STATICURL: 'https://static-sport.onebet.cm/ssr-static-staging',
    gamesConfigUrl: 'https://static-sport.onebet.cm/display-staging/',
    API_CH_cm: 'https://staging-api-cm.onebet.ug/onegame',
    xFootball_URL_APP: 'http://beta.xfootball.net',
    xFootball_URL_WEB: 'http://beta.xfootball.net',
    onebetPartner: 'https://www.onebetpartner.com',
    API_CASH_SOCKET_ug: 'wss://socket-staging.onebet.ug/sub',
    API_CASH_SOCKET_cm: 'wss://socket-staging-cm.onebet.ug/sub',
    API_CASH_ug: 'https://cashout-staging-api.onebet.ug',
    API_CASH_cm: 'https://cashout-staging-cm-api.onebet.ug',
    onebetpartner_BASE_CM_API: 'https://staging-api.onebetpartner.com/cm'
  },
  // 生产环境
  production: {
    NODE_ENV: 'production',
    ENV_CONFIG: 'production',
    HOSTURL: 'https://cdn-api.onebet.ug/user',
    AVATARHOSTURL: 'https://api.onebet.ug/user',
    SPORTURL: 'https://cdn-api.onebet.ug/sports',
    VIRTUALURL: 'https://cdn-api.onebet.ug/virtual',
    VIRTUALURLCM: 'https://cdn-api.onebet.cm/virtual_cash',
    SPORTURLCM: 'https://cdn-api.onebet.cm/sports',
    HOSTURLCM: 'https://cdn-api.onebet.cm/user',
    AVATARHOSTURLCM: 'https://cm-bet-api-v2.onebet.ug/user',
    WsUrl: 'wss://live.onebet.ug/sport',
    WsCmUrl: 'wss://cm-bet-live.onebet.ug/sport',
    hostname: 'https://www.onebet.ug',
    hostnamecm: 'https://www.onebet.cm',
    // STATICURL: 'https://static-sport.onebet.cm/ssr-static',
    STATICURL: '',
    gamesConfigUrl: 'https://static-sport.onebet.cm/display/',
    API_CH_cm: 'https://cdn-api.onebet.cm/onegame',
    xFootball_URL_APP: 'https://h5.xfootball.net',
    xFootball_URL_WEB: 'https://www.xfootball.net',
    onebetPartner: 'https://www.onebetpartner.com',
    API_CASH_SOCKET_ug: 'wss://socket.onebet.ug/sub',
    API_CASH_SOCKET_cm: 'wss://socket.onebet.cm/sub',
    API_CASH_ug: 'https://cashout-api.onebet.ug',
    API_CASH_cm: 'https://cashout-api.onebet.cm',
    onebetpartner_BASE_CM_API: 'https://api.onebetpartner.com/cm'
  }
}
