const NODE_ENV = process.env.NODE_ENV

export default (function () {
  const country = 'cm'

  if (NODE_ENV === 'development') {
    return {
      shareUrl: `https://staging-www.onebet.ug/en/share/`,
      ssrShareUrl: `https://staging-${
        country === 'cm' ? 'cm' : 'www'
      }.onebet.ug/ssr/en/OrderShare/`,
      download: `https://static-sport.onebet.cm/${
        country === 'ug' ? 'apkStaging' : 'cm-apkStaging'
      }/version.json`,
      onegameUrl: `https://staging-game-${country}.onebet.ug/?utm_source=onebet&utm_medium=banner&utm_campaign=casino&channel=3000`,
      gameUrl: `https://www.onegame.${country}/gameRes/game-release/games/index.html`,
      onebetAppCmUrl: 'OneBet://com.sport.onebet.cm.staging',
      onebetAppUgUrl: 'OneBet://com.sport.onebet.staging'
    }
  } else if (NODE_ENV === 'sitEnvironment') {
    return {
      shareUrl: `https://staging-www.onebet.ug/en/share/`,
      ssrShareUrl: `https://staging-${
        country === 'cm' ? 'cm' : 'www'
      }.onebet.ug/ssr/en/OrderShare/`,
      download: `https://static-sport.onebet.cm/${
        country === 'ug' ? 'apkStaging' : 'cm-apkStaging'
      }/version.json`,
      onegameUrl: `https://staging-game-${country}.onebet.ug/?utm_source=onebet&utm_medium=banner&utm_campaign=casino&channel=3000`,
      gameUrl: `https://staging-${country}.onebet.ug/gameRes/game-staging/games/index.html`,
      onebetAppCmUrl: 'OneBet://com.sport.onebet.cm.staging',
      onebetAppUgUrl: 'OneBet://com.sport.onebet.staging'
    }
  } else if (NODE_ENV === 'staging') {
    return {
      shareUrl: `https://staging-${
        country === 'cm' ? 'cm' : 'www'
      }.onebet.ug/en/share/`,
      ssrShareUrl: `https://staging-${
        country === 'cm' ? 'cm' : 'www'
      }.onebet.ug/ssr/en/OrderShare/`,
      download: `https://static-sport.onebet.cm/${
        country === 'ug' ? 'apkStaging' : 'cm-apkStaging'
      }/version.json`,
      onegameUrl: `https://staging-game-${country}.onebet.ug/?utm_source=onebet&utm_medium=banner&utm_campaign=casino&channel=3000`,
      gameUrl: `https://staging-${country}.onebet.ug/gameRes/game-staging/games/index.html`,
      onebetAppCmUrl: 'OneBet://com.sport.onebet.cm.staging',
      onebetAppUgUrl: 'OneBet://com.sport.onebet.staging'
    }
  } else if (NODE_ENV === 'production') {
    return {
      shareUrl: `https://www.onebet.${country}/en/share/`,
      ssrShareUrl: `https://www.onebet.${country}/ssr/en/OrderShare/`,
      download:
        `https://static-sport.onebet.cm/${
          country === 'ug' ? 'apkRelease' : 'cm-apkRelease'
        }/version.json?v=` + new Date().getTime(),
      onegameUrl: `https://www.onegame.${country}/?utm_source=onebet&utm_medium=banner&utm_campaign=casino&channel=3000`,
      gameUrl: `https://www.onebet.${country}/gameRes/game-release/games/index.html`,
      onebetAppCmUrl: 'OneBet://com.sport.onebet.cm',
      onebetAppUgUrl: 'OneBet://com.sport.onebet'
    }
  }
})()
