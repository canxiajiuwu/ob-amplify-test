<template>
  <div ref="preMatchContainerWrap" class="cl-preMatchContainer-wrap">
    <div
      ref="filterWrap"
      class="cl-filter-wrap"
      :class="{
        'cl-heightChange': [2, 3].includes(tabsIndex) && tournament_id === 0,
        'cl-upcomingChange': tabsIndex === 1,
        'cl-sticky': flag,
        'cl-zIndexClass': isIndexFilterOpenStatus
      }"
    >
      <div class="cl-filter-box">
        <tabs ref="tabs" @dataFilter="dataFilterNew" @foryouSticky="toTopFun" />
        <indexFilter
          v-if="!([2, 3].includes(tabsIndex) && tournament_id === 0)"
          :min-odds="minOdds"
          :max-odds="maxOdds"
          :market="filterMarket"
          :market-list="market"
          :odds-list="oddsList"
          @oddsEmit="filterOddsChange"
          @marketEmit="filterMarketEmit"
          @isIndexFilterOpen="isIndexFilterOpen"
          @FilterApply="FilterApply"
        />
        <teamTitle
          v-if="
            !(
              ([2, 3].includes(tabsIndex) && tournament_id === 0) ||
              isIndexFilterOpenStatus
            )
          "
          :teams="teams"
        />
      </div>
    </div>
    <preMatchCountrySelect
      v-if="tabsIndex === 2 && tournament_id !== 0"
      :tournament_name="tournament_name"
      :country_name="country_name"
      @clearTournament="clearTournament"
    />
    <homeForYou v-if="tabsIndex === 3" />
    <div
      v-else-if="!(tabsIndex === 2 && tournament_id === 0)"
      class="cl-matchContentBox"
    >
      <van-pull-refresh
        ref="live_pull_refresh"
        v-model="isLoading"
        :pulling-text="$t('pullRefresh.pull')"
        :loosing-text="$t('pullRefresh.pull')"
        :loading-text="$t('pullRefresh.loading')"
        @refresh="onRefresh"
      >
        <dataError v-if="isRequestFailed" />
        <div v-else>
          <div v-if="requestLoading">
            <preMatchBox
              v-if="result.length > 0 || true"
              :key="infiniteId"
              :result="result"
              :event_name="event_name"
              where="index"
              @visibleRangeMarkets="visibleRangeMarkets"
            />
            <dataNoResult v-else />
          </div>
        </div>
      </van-pull-refresh>

      <client-only>
        <InfiniteLoading
          ref="infiniteLoading"
          :identifier="infiniteId"
          @infinite="onInfinite"
        >
          <div slot="no-more">
            <div class="cl-noDataGameList">
              <noDataGameList event-name="home_noMore" />
            </div>
          </div>
          <div slot="no-results">
            <div class="cl-noDataGameList">
              <noDataGameList event-name="home_noResults" />
            </div>
          </div>
          <span slot="spinner">
            <div class="cl-gameLoading">
              <dataLoading />
            </div>
          </span>
        </InfiniteLoading>
      </client-only>
    </div>
    <preMatchCountryList
      v-else
      :country-list="database.countryList"
      @addCountryList="addCountryList"
      @changeTournament="changeTournament"
    />

    <!-- 调用检查数据是否需要刷新的计算属性 -->
    <div v-if="hallRefreshData" />
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import { selectMatch } from '@/assets/js/utils/selectMatch.js'
import tabs from '@/components/components/preMatchFilterNew.vue'
import preMatchBox from '@/components/components/preMatchBox.vue'
import preMatchCountryList from '@/components/components/preMatchCountryList.vue'
import teamTitle from '@/components/components/teamTitle.vue'
import homeForYou from '@/components/components/homeForYou.vue'
import preMatchCountrySelect from '@/components/components/preMatchCountrySelect.vue'
import indexFilter from '@/components/components/indexFilter.vue'
import noDataGameList from '@/components/components/fastGames/noDataGameList.vue'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  components: {
    tabs,
    preMatchBox,
    preMatchCountryList,
    teamTitle,
    InfiniteLoading,
    preMatchCountrySelect,
    homeForYou,
    indexFilter,
    noDataGameList
  },
  data() {
    return {
      isLockedTop: false, // 吸顶效果处理
      topHeight: 171,
      page: 1,
      sport_id: 1, // 筛选框选择内容控制
      market_id: 1,
      max_odds: 0,
      min_odds: 1,
      tournament_id: 0,
      tournament_name: '',
      country_name: '',
      time_type: 1,
      result: [], // 循环结果
      database: {}, // 数据储存
      teams: [], // outcome名称
      market: [], // market筛选项
      tournament: [], // league筛选项
      infiniteId: +new Date(),
      isRequestFailed: false,
      requestLoading: false,
      isLoading: false, // pull refresh
      tabsIndex: 0,
      flag: true,
      // filter 筛选数据
      // 最低赔率
      minOdds: 0,
      // 最高赔率
      maxOdds: 11,
      filterMarket: '1x2 / Winner',
      isIndexFilterOpenStatus: false,
      oddsList: [
        '1.00',
        '1.20',
        '1.50',
        '1.80',
        '2.00',
        '2.50',
        '3.00',
        '4.00',
        '5.00',
        '10.00',
        '20.00',
        'MAX'
      ],
      timeLimitedActivityQuery: null
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    platform() {
      return this.$store.state.platform
    },
    tickets() {
      return this.$store.state.tickets
    },
    event_name() {
      const eventObj = {
        0: '_home_highlights',
        1: {
          2: '_home_upcoming_all',
          3: '_home_upcoming_today',
          4: '_home_upcoming_tomorrow',
          5: '_home_upcoming_next48hrs',
          6: '_home_upcoming_thisweek',
          7: '_home_upcoming_nextweek'
        },
        2: '_home_countries',
        3: '_home_foryou'
      }

      const newEvent = eventObj[this.tabsIndex]
      if (typeof newEvent === 'string') return newEvent
      else return newEvent[this.time_type]
    },
    // 用户投注后需要更新数据
    hallRefreshData() {
      if (Lib.store.get('hallRefreshData')) {
        this.page = 1
        this.result = []
        this.infiniteId += 1
        Lib.store.remove('hallRefreshData')
      }
      return Lib.store.get('hallRefreshData')
    },
    strKey() {
      return `${this.time_type}_${this.sport_id}_${this.tournament_id}_${this.market_id}`
    }
  },
  mounted() {
    // 触发数据更新
    Lib.store.set('homeDataUpdate', new Date().getTime())
    this.isLockedTop = false
    // 滚动到顶部固定处理
    window.addEventListener('scroll', this.handleScroll, true)
    this.topHeightFun()
    // 如果上次进入数据接口返回错误，则重新请求
    if (
      this.isRequestFailed ||
      (this.requestLoading && this.result.length === 0)
    )
      this.onRefresh()
    // 注册监听页面切换事件
    document.addEventListener('visibilitychange', this.dataUpFn, false)
    //  限时活动，监听页面数据传参数
    window.addEventListener(
      'replaceState',
      this.replaceStateEventFallback,
      false
    )
    if (
      this.$route.query.limit_amount ||
      this.$route.query.limit_amount ||
      this.$route.query.limit_odds
    ) {
      this.timeLimitedActivityQuery = this.$route.query
      this.timeLimitedActivitySelectMatch(this.timeLimitedActivityQuery)
    }

    contestListRestore.call(this, 'index', [
      'page',
      'database',
      'sport_id',
      'time_type',
      'tournament_id',
      'market_id',
      'max_odds',
      'min_odds',
      'tabsIndex',
      'market',
      'filterMarket',
      'minOdds',
      'maxOdds',
      'tournament_name',
      'country_name'
    ])
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('index', this.saveContestList)
    // 预加载界面
    this.$prefetchRoutes(['match/_matchId'])
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed()
    pubSub.unSubscribe('index', this.saveContestList)
  },
  methods: {
    // 监听页面切换方法
    dataUpFn() {
      // 页面可见后,如果大于半小时未触发数据更新
      if (document.visibilityState === 'visible') {
        const nowTime = new Date().getTime()
        let oldTime = Lib.store.get('homeDataUpdate')
        let flag = false
        // 数据不合规
        if (isNaN(Number(oldTime))) {
          Lib.store.set('homeDataUpdate', nowTime)
          oldTime = nowTime
          flag = true
        }
        // 时间符合条件
        if (nowTime - oldTime >= 30 * 60 * 1000) flag = true
        // 符合提示
        if (flag) {
          const str =
            this.$store.state.root.locale === 'fr'
              ? 'Il y a beaucoup de mises à jour de données, veuillez actualiser pour voir'
              : 'There are a lot of data updates, please refresh to view'
          Lib.common.errorReminder(this, '', '', '', str, '', 'OK', null, () =>
            this.$router.go(0)
          )
          Lib.store.set('homeDataUpdate', nowTime)
        }
      }
    },
    // 可视范围内数据变更
    visibleRangeMarkets(data) {
      // 即将删除项下标数组
      const deleteArr = []
      data.forEach((dataItem) => {
        this.result.forEach((item, index) => {
          if (item.markets.market_id === dataItem.market_id) {
            // 是否删除判断值
            let flag = false
            // 正常
            if (dataItem.status == 0) {
              // live赛事大于开始时间160分钟
              if (
                item.live_data &&
                item.live_data.live &&
                new Date().getTime() >= (item.start_time + 160 * 60) * 1000
              )
                flag = true
              // 赛前赛事大于开始时间
              else if (new Date().getTime() >= item.start_time * 1000)
                flag = true
            } else flag = true
            // 放进删除下标数组
            if (flag) deleteArr.push(index)
            // 更新信息
            this.$set(this.result[index].markets, 'outcomes', dataItem.outcomes)
          }
        })
      })
      // 排序,从高到低
      deleteArr.sort((a, b) => {
        if (a < b) return 1
        if (a > b) return -1
        return 0
      })
      // 删除对应数据
      deleteArr.forEach((item) => this.result.splice(item, 1))
    },
    // topHeight处理
    topHeightFun() {
      const dom = document.querySelector('.cl-filter-wrap')
      const headerDom = document.querySelector('.cl-Header-wrap')

      if (dom && headerDom) {
        this.topHeight = dom.offsetTop - headerDom.offsetHeight
      }
    },
    // 滚动到顶部固定处理
    handleScroll() {
      const dom = document.querySelector('#app')
      const scrollTop = dom.scrollTop
      const offsetTop = this.$refs.filterWrap.offsetTop

      if (scrollTop >= offsetTop) {
        this.isLockedTop = true
      } else {
        this.isLockedTop = false
      }

      // 滚动位置定位
      if (!this.database[this.strKey]) this.database[this.strKey] = {}
      this.database[this.strKey].scrollTop = scrollTop
      this.database[this.strKey].isLockedTop = this.isLockedTop
    },
    enterKeyupDestroyed() {
      // 销毁监听页面切换
      document.removeEventListener('visibilitychange', this.dataUpFn, false)
      window.removeEventListener('scroll', this.handleScroll, true)
      //  限时活动，监听页面数据传参数
      window.removeEventListener(
        'replaceState',
        this.replaceStateEventFallback,
        false
      )
    },
    // 参数筛选
    dataFilter(data) {
      this.sport_id = data.sport_id
      this.time_type = data.time_type
      this.tournament_id = data.tournament_id
      this.market_id = data.market_id
      this.changeType()
    },
    dataFilterNew(data) {
      this.flag = false
      setTimeout(() => {
        this.flag = true
        this.tabsIndex = data.tabsIndex
        const fnObj = {
          0: () => {
            this.tournament_id = 0
            this.time_type = 1
            this.changeType()
          },
          1: () => {
            this.tournament_id = 0
            this.time_type = data.upcomingIndex + 2
            this.changeType()
          },
          2: () => {
            this.time_type = 2
            if (document.querySelector('#app').scrollTop > 284.5)
              this.toTopFun()
          },
          3: () => {
            if (document.querySelector('#app').scrollTop > 284.5)
              this.toTopFun()
          }
        }
        if (fnObj[data.tabsIndex]) fnObj[data.tabsIndex]()
      })
    },
    changeTournament(data) {
      this.tournament_id = data.id
      this.tournament_name = data.tournament
      this.country_name = data.country
      this.changeType()
    },
    clearTournament() {
      this.tournament_name = ''
      this.country_name = ''
      this.tournament_id = 0
    },
    addCountryList(data) {
      this.$set(this.database, 'countryList', data)
    },
    changeType() {
      // 获取当前滚动
      const dom = document.querySelector('#app')
      const offsetTop = this.$refs.filterWrap.offsetTop
      this.result = []
      if (this.database[this.strKey] && this.database[this.strKey].result) {
        this.result = this.result.concat(this.database[this.strKey].result)
        this.page = this.database[this.strKey].page

        // 滚动处理
        if (this.isLockedTop && this.database[this.strKey].isLockedTop) {
          if (offsetTop >= this.database[this.strKey].scrollTop) {
            dom.scrollTop = offsetTop
          } else {
            dom.scrollTop = this.database[this.strKey].scrollTop
          }
        }
      } else {
        this.page = 1
        this.isRequestFailed = false
        this.requestLoading = false
        // 滚动初始设置
        if (this.isLockedTop) dom.scrollTop = offsetTop
      }

      this.infiniteId += 1
    },
    // 下拉刷新
    onRefresh() {
      this.page = 1
      this.database = {}
      this.result = []
      this.isRequestFailed = false
      this.requestLoading = false
      this.infiniteId += 1
    },
    // 滚动方法
    onInfinite($state) {
      if (typeof window !== 'undefined') this.requestHomeMatch($state)
    },
    // 参数请求
    requestHomeMatch($state) {
      const strKey = this.strKey
      if (!this.database[strKey]) this.database[strKey] = {}
      if (this.database[strKey].loaded) return $state.complete()
      // 新数据且滑动超过设定值,则置顶
      if (this.page === 1 && document.querySelector('#app').scrollTop > 284.5) {
        this.toTopFun()
      }

      this.$axios_api
        .homeMatch({
          page: this.page,
          platform: this.platform,
          sport_id: this.sport_id,
          time_type: this.time_type,
          tournament_id: this.tournament_id,
          market_id: this.market_id,
          max_odds: this.max_odds,
          min_odds: this.min_odds
        })
        .then((res) => {
          this.isLoading = false
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            Lib.common.event_statistics('home_match_data_render')

            // 循环数据
            if (!this.database[strKey].result)
              Object.assign(this.database[strKey], {
                result: [],
                page: 1
              })
            this.database[strKey].page++
            this.database[strKey].result = [
              ...this.database[strKey].result,
              ...res.data.result
            ]
            this.database[strKey].loaded = false
            // 如果请求Key请求和当前key不想等，那么久不需要判断下面的状态了
            if (strKey !== this.strKey) {
              return
            }
            this.page = this.database[strKey].page
            this.result = this.database[strKey].result
            // 数据是否加载完成
            if ($state !== undefined) {
              if (res.data.result.length < 10) {
                $state.complete()
                this.database[strKey].loaded = true
              } else $state.loaded()
            }

            // market设置
            this.market = res.data.meta.filters.market
            // outcome名称设置
            for (let i = 0; i < this.market.length; i++) {
              if (
                Number(this.market_id) === Number(this.market[i].market_type)
              ) {
                this.teams = this.market[i].odd_keys
              } else if (Number(this.market_id) === 0) {
                this.teams = ['1', 'X', '2']
              }
            }
            // tournament设置
            this.tournament = res.data.meta.filters.tournament

            // 新用户第一次进入项目，自动选择两场比赛
            this.autoSelectMatch()
            // 限时活动过来的，帮用户选择投注
            this.parameterJudgment()
          } else {
            if ($state !== undefined) $state.complete()
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          }
        })
        .catch((err) => {
          console.log(err)
          if ($state !== undefined) $state.complete()
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 新用户第一次进入项目，自动选择两场比赛
    autoSelectMatch() {
      if (!Lib.store.get('isAutoSelectMatch')) {
        if (!this.tickets.length) {
          const newTicket = []
          for (let i = 0; i < this.result.length; i++) {
            let index = Math.floor(Math.random() * 3)
            // 判断赔率是否大于1.2满足extra bonus
            if (this.result[i].markets.outcomes[index].odds < 1.2) {
              for (let j = 0; j < this.result[i].markets.outcomes.length; j++) {
                if (this.result[i].markets.outcomes[j].odds >= 1.2) {
                  index = j
                  break
                }
              }
            }
            // 投注项配置
            const ticket = {
              match_id: this.result[i].match_id,
              start_time: this.result[i].start_time,
              sport_id: this.result[i].sport_id,
              country_name: this.result[i].country_name,
              tournament_name: this.result[i].tournament_name,
              tournament_id: this.result[i].tournament_id,
              home_name: this.result[i].home_name,
              away_name: this.result[i].away_name,
              market_id: this.result[i].markets.market_id,
              market_name: this.result[i].markets.market_name,
              display: this.result[i].markets.outcomes[index].display,
              odds: this.result[i].markets.outcomes[index].odds,
              id: this.result[i].markets.outcomes[index].id,
              match_status: this.result[i].match_type === 2 ? 1 : 0
            }
            newTicket.push(ticket)
            // 自动选择3场比赛
            if (i === 2) {
              break
            }
          }
          // 存储tickets
          this.$store.commit('setTickets', newTicket)
          Lib.store.set(
            'tickets',
            Lib.common.encrypt(JSON.stringify(newTicket))
          )
        }
        Lib.store.set('isAutoSelectMatch', true)
      }
    },
    // filter 赔率改变
    filterOddsChange(val) {
      this.minOdds = val.leftXIndex
      this.maxOdds = val.rightXIndex
    },
    filterMarketEmit(data) {
      this.filterMarket = data.name
    },
    oddsDeal() {
      const minOdds = this.oddsList[this.minOdds]
      const maxOdds = this.oddsList[this.maxOdds]
      maxOdds === 'MAX' ? (this.max_odds = 0) : (this.max_odds = maxOdds)
      this.min_odds = minOdds
    },
    // filter apply提交
    FilterApply(isApply) {
      this.isIndexFilterOpenStatus = false
      this.page = 1 // 页数初始化
      this.isRequestFailed = false
      this.requestLoading = false
      this.infiniteId += 1
      // 赔率处理
      this.oddsDeal()

      // market_id及teams处理
      if (isApply) {
        // filter apply
        Lib.common.event_statistics(`home_match_tabs_filter_apply`)
        this.market.forEach((item) => {
          if (item.name === this.filterMarket) {
            this.market_id = item.market_type
            this.teams = item.odd_keys
          }
        })
      } else {
        Lib.common.event_statistics(`home_match_tabs_filter_clear`)
        // filter clear
        this.market_id = 1
        this.teams = ['1', 'X', '2']
      }
      // 比赛数据存储
      this.database[this.strKey] = {}
      // 清空当前数据
      this.result = []
    },
    // filter未确认apply或clear 关闭filter
    isIndexFilterOpen(bool) {
      this.isIndexFilterOpenStatus = bool
      this.market.forEach((item) => {
        if (Number(item.market_type) === Number(this.market_id)) {
          this.filterMarket = item.name
        }
      })
    },
    // 置顶方法
    toTopFun() {
      this.$refs.preMatchContainerWrap.scrollIntoView(true)
    },
    parseQueryString(queryString) {
      // 分割字符串，获取键值对数组
      const pairs = queryString.slice(1).split('&')
      // 创建一个对象来存储解析后的键值对
      const result = {}
      // 遍历数组，将每个键值对解析并存储在对象中
      pairs.forEach(function (pair) {
        pair = pair.split('=')
        result[pair[0]] = decodeURIComponent(pair[1] || '')
      })
      return result
    },
    // 事件回掉
    replaceStateEventFallback(e) {
      if (
        Object.prototype.toString.call(e.arguments[0]) === '[object Object]' &&
        e.arguments[0].type === 'bet'
      ) {
        const obj = this.parseQueryString(e.arguments[2])
        this.$refs.tabs.changeTabs(0)
        this.timeLimitedActivitySelectMatch(obj)
      }
    },
    parameterJudgment() {
      if (this.timeLimitedActivityQuery) {
        this.timeLimitedActivitySelectMatch(this.timeLimitedActivityQuery)
        this.timeLimitedActivityQuery = null
      }
    },
    // 限时活动自动选择订单
    timeLimitedActivitySelectMatch({ limit_amount, limit_count, limit_odds }) {
      setTimeout(() => {
        history.replaceState('', '', '?')
      })
      limit_amount && Lib.store.set('sportsBetActivityStake', limit_amount)
      if (!limit_count && !limit_odds) return
      // 要投注前先清空
      this.$store.commit('setTickets', [])
      Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify('')))
      const newTicket = selectMatch({
        result: this.result,
        limit_count,
        limit_odds
      })
      this.$store.commit('setTickets', newTicket)
      Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify(newTicket)))
    },
    saveContestList() {
      contestListSave.call(
        this,
        [
          'page',
          'database',
          'sport_id',
          'time_type',
          'tournament_id',
          'market_id',
          'max_odds',
          'min_odds',
          'tabsIndex',
          'pageScroll',
          'upcomingIndex',
          'market',
          'filterMarket',
          'minOdds',
          'maxOdds',
          'tournament_name',
          'country_name'
        ],
        '.cl-index-wrap'
      )
    }
  }
}
</script>

<style scoped lang="less">
.cl-preMatchContainer-wrap {
  .cl-gameLoading {
    margin-bottom: 500rem/36;
  }

  .cl-sticky {
    position: sticky;
  }

  .cl-matchContentBox {
    min-height: 400rem/36;
  }

  .cl-filter-wrap {
    min-height: 48rem/36;
    top: 0;
    z-index: 2;

    &.cl-heightChange {
      min-height: 30rem/36;
    }

    &.cl-upcomingChange {
      min-height: 86.3rem/36;
    }

    &.cl-zIndexClass {
      z-index: 10;
    }
  }
  .cl-noDataGameList {
    padding: 32rem/36 0 20rem/36;
  }
}
</style>
