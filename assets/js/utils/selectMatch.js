const getMinIndex = (arr) => {
  let index = 0
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].odds < arr[index].odds) {
      index = i
    }
  }
  return index
}
export const selectMatch = ({ result, limit_count, limit_odds }) => {
  const newTicket = []
  let overallOdds = 1
  for (let i = 0; i < result.length; i++) {
    // 投注项配置
    const index = getMinIndex(result[i].markets.outcomes)
    const ticket = {
      match_id: result[i].match_id,
      start_time: result[i].start_time,
      sport_id: result[i].sport_id,
      country_name: result[i].country_name,
      tournament_name: result[i].tournament_name,
      tournament_id: result[i].tournament_id,
      home_name: result[i].home_name,
      away_name: result[i].away_name,
      market_id: result[i].markets.market_id,
      market_name: result[i].markets.market_name,
      display: result[i].markets.outcomes[index].display,
      odds: result[i].markets.outcomes[index].odds,
      id: result[i].markets.outcomes[index].id,
      match_status: result[i].match_type === 2 ? 1 : 0
    }
    overallOdds *= ticket.odds
    newTicket.push(ticket)
    // 满足条件就退出
    if (
      (!limit_count || i + 1 >= limit_count) &&
      (!limit_odds || overallOdds >= limit_odds)
    ) {
      break
    }
  }
  return newTicket
}

// const caches = {}
export const bindHistoryEvent = (method) => {
  // if(caches[method]) return
  // caches[method] = true
  const originMethod = history[method]
  if (!originMethod) {
    throw new Error('history has not this method named ' + method)
  }
  // 闭包处理
  return function () {
    let result = null
    try {
      result = originMethod.apply(this, arguments)
      // 这里也可以把事件名称写死，后面做对应的监听即可
      const evt = new Event(method)
      evt.arguments = arguments
      // 分发事件
      window.dispatchEvent(evt)
    } catch (error) {
      throw new Error('执行出错')
    }
    return result
  }
}
