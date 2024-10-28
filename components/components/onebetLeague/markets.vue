<template>
  <div ref="onebetLeagueMarkets" class="cl-onebetLeagueMarkets-wrap">
    <!-- 有数据 -->
    <template v-if="periodData">
      <div class="cl-periodTabs" v-if="tabsList.length">
        <div
          class="cl-item"
          :class="[
            { 'cl-tabsIndex': tabsIndex === index },
            index === 0 ? 'no-' + firstShow.className : ''
          ]"
          v-for="(item, index) in tabsList"
          :key="item.id"
          @click="changeTabsIndex(index)"
        >
          <div class="cl-flexcc cl-box">
            <div class="cl-roundsId">{{ item.round }}</div>
            <div class="cl-time">
              <template v-if="index === 0">{{ firstShow.word }}</template>
              <template v-else>{{
                getDateFun(item.start_time, 'HH:mm')
              }}</template>
            </div>
          </div>
          <div class="cl-borderBox" />
        </div>
      </div>

      <!-- 比赛列表展示 -->
      <div class="cl-contentBox">
        <!-- 倒计时弹出框 -->
        <countDown
          v-if="tabsIndex === 0 && firstShow.isShowC !== null"
          :count-down-time="firstShow.isShowC"
          :live-word="firstShow.liveWord"
        />
        <div class="cl-matchBox">
          <!-- live下不显示 -->
          <div
            class="cl-flexcb cl-marketsTabsBox"
            v-if="marketsTList && !isLive"
          >
            <div class="cl-flexcb cl-leftTabs">
              <div
                class="cl-a"
                :class="{ 'cl-marketsIndex': marketsIndex == a }"
                v-for="a in marketsTList.tabs1"
                :key="a"
                @click="changeMarketsIndex(a)"
              >
                <h3 class="cl-flexcc cl-h3 cl-name">
                  {{ marketsTList.tabs[a] }}
                </h3>
                <div class="cl-leftLine" />
              </div>
            </div>
            <div class="cl-flexcc cl-rightTabs">
              <div class="cl-flexcc cl-marketBox">
                <div
                  tabindex="-1"
                  class="cl-flexcc cl-tItem"
                  :class="{
                    'cl-marketsIndex': marketsTList.tabs2.includes(marketsIndex)
                  }"
                  @blur="openSelectModal = 0"
                  @click="openSelectModal = !openSelectModal"
                >
                  <div
                    class="cl-flexcc"
                    v-html="
                      marketsTList.tabs2.includes(marketsIndex)
                        ? marketsTList.tabs[marketsIndex]
                        : 'More Markets'
                    "
                  />
                  <div
                    class="cl-moreIcon"
                    :class="
                      openSelectModal ? 'cl-iconRotate-180' : 'cl-iconRotate0'
                    "
                  />
                </div>
                <CollapseTransition>
                  <div class="cl-box" v-show="openSelectModal">
                    <div
                      class="cl-flexcc cl-a"
                      :class="{ 'cl-marketsIndex': marketsIndex == a }"
                      v-for="a in marketsTList.tabs2"
                      :key="a"
                      @click.stop="changeMarketsIndex(a)"
                    >
                      {{ marketsTList.tabs[a] }}
                    </div>
                  </div>
                </CollapseTransition>
              </div>
            </div>
          </div>
          <dataError v-if="isRequestFailed" />
          <template v-else>
            <template v-if="requestLoading">
              <template v-if="isLive">
                <matchLive
                  v-if="matchLiveData.length > 0"
                  :match-base="matchLiveData"
                  :selections="selections"
                  :live-word="firstShow.liveWord"
                />
                <dataNoResult v-else />
              </template>
              <template v-else>
                <matchBef
                  ref="matchBefRef"
                  v-if="matchBefData.length > 0"
                  :league_id="periodData ? periodData.league_id : ''"
                  :match-base="matchBefData"
                  :teams="teamsList[marketsIndex]"
                />
                <dataNoResult v-else />
              </template>
              <div :style="{ height: bottomHight + 'rem' }" />
            </template>
            <dataLoading v-else />
          </template>
        </div>
      </div>
    </template>
    <!-- 无数据 -->
    <dataError v-else />
    <!-- footMenu菜单 -->
    <footMenu
      :league_id="periodData ? periodData.league_id : ''"
      :now-time="nowTime"
      :p-dom="$refs.onebetLeagueMarkets"
      :markets="marketsTList ? marketsTList.tabs : {}"
      :p-data="tabsList[tabsIndex]"
      :cashout-list="cashoutList"
      @getCashoutList="getCashoutList"
      @cashListR="cashListR"
      @clearExpireTickets="clearExpireTickets"
      @goHistory="
        (id) => $emit('goHistory', id, tabsList[tabsIndex]?.round || 0)
      "
    />
  </div>
</template>

<script>
import matchBef from './matchBef.vue'
import matchLive from './matchLive.vue'
import footMenu from './footMenu.vue'
import countDown from './countDown.vue'
import Lib from '@/assets/js/Lib'

export default {
  name: 'OnebetLeagueMarkets',
  components: {
    CollapseTransition: Lib.common.CollapseTransition,
    matchBef,
    matchLive,
    footMenu,
    countDown
  },
  props: ['periodData', 'roundIndex', 'timeLimitedActivityQuery'],
  data() {
    return {
      isRequestFailed: 0, // 请求获取是否失败
      requestLoading: 0, // 请求是否完成
      nowTime: new Date().getTime() / 1000, // 现在实时时间
      nowTimer: null, // 计时器id容器
      tabsIndex: 0, // periodTabs选中项
      marketsIndex: '1', // marketsIndex选中项
      openSelectModal: 0, // 是否展开markets类型选项栏
      matchBefData: [], // 赛前数据
      matchLiveData: [], // live数据
      selections: [], // 用户下注的数据
      cashoutList: [] // cashout数据
    }
  },
  computed: {
    bottomHight() {
      let num = 77
      if (this.cashoutList.length) num += 243
      return num / 36
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    tickets() {
      const { league_id } = this.periodData
      return this.$store.state.onebetLeagueTickets[league_id] || []
    },
    // tab栏处理
    tabsList() {
      // 默认获取五个
      const tabarr = this.periodData ? this.periodData.rounds : ''
      const num = 5
      // 数据符合要求
      if (Array.isArray(tabarr)) {
        // 后面无数据
        if (tabarr.length <= num) this.$emit('noData')
        return tabarr.slice(0, num)
      }
      return []
    },
    // periodTabs第一个需要显示的文案 // 每期总时长360s 赛前投注100s 倒计时10s 上半120s 倒计时10s 下半120s
    firstShow() {
      const data = this.tabsList[0]
      // word: 显示文案, className: item类名, isShowC: 10 - 0显示倒计时遮罩
      const res = {
        word: '--',
        className: 'dTime',
        isShowC: null,
        liveWord: {}
      }
      if (!data) return res
      // 解构需要数据出来
      const { start_time, end_time } = data
      // 比赛开始秒数
      const sTime = parseInt(this.nowTime - start_time)
      // 比赛前秒数
      const eTime = parseInt(start_time - this.nowTime)
      // freeBet数是否需要刷新
      const isCountRefresh = sessionStorage.getItem('onebetLeagueCountRefresh')
      if (isCountRefresh) {
        this.$emit('isCountRefresh')
        sessionStorage.removeItem('onebetLeagueCountRefresh')
      }
      // 结束,删除当前项,重新获取赛前数据
      if (this.nowTime >= end_time) {
        // 比赛结束删除保存的金额
        Lib.store.remove('onebetLeagueActivityStake')
        // eslint-disable-next-line vue/no-mutating-props
        this.periodData && this.periodData.rounds.shift()
        if (this.tabsIndex > 0) this.tabsIndex--
        this.changeTabsIndex(this.tabsIndex)
        this.getInfo()
      }
      // 赛中
      if (sTime >= 0) {
        // live开始清除一次过期比赛
        if (sTime === 0) this.clearExpireTickets()
        // 默认操作
        res.className += ' dLive'
        res.word = this.$t('onebetLeague.live')
        // 0: 上半持续时间, 1: 中场休息时间, 2: 下半持续时间,减5秒为显示end时间
        const flagArr = [sTime < 90, sTime >= 90 && sTime <= 100, sTime <= 185]
        const fnObj = {
          // 上半
          0: () => {
            res.liveWord = {
              name: '1st Half',
              time: Lib.common.minuteDetal(sTime, "mm:ss'")
            }
          },
          // 中场倒计时
          1: () => {
            res.liveWord = { name: '2nd Half', time: 100 - sTime }
            res.isShowC = 100 - sTime
          },
          // 下半
          2: () => {
            res.liveWord = {
              name: '2nd Half',
              time: Lib.common.minuteDetal(sTime - 100, "mm:ss'")
            }
          }
        }
        const flagIndex = flagArr.indexOf(true)
        const str = fnObj[flagIndex]
        // 请求live数据
        if (flagIndex !== 1 && sTime % 2 === 0 && this.tabsIndex === 0)
          this.liveReqFun()
        if (str) str()
        // 结束显示
        else {
          res.word = this.$t('onebetLeague.ended')
          res.className += ' dEnd'
        }
        return res
      }
      res.word = Lib.common.minuteDetal(eTime)
      // 比赛即将开始倒计时
      if (eTime <= 10) res.isShowC = eTime
      // 提前请求live赛事
      if (eTime <= 1 && this.tabsIndex === 0) this.liveReqFun()
      // 赛前
      return res
    },
    // markets类型
    marketsTList() {
      // 前三个提取出来
      const tabarr = this.periodData
        ? Object.keys(this.periodData.markets || {})
        : ''
      const num = 3
      // 数据符合要求
      if (Array.isArray(tabarr) && tabarr.length) {
        return {
          tabs: this.periodData.markets,
          tabs1: tabarr.slice(0, num),
          tabs2: tabarr.slice(num, tabarr.length)
        }
      }
      return null
    },
    // 类型显示
    teamsList() {
      return {
        1: ['1', 'X', '2'],
        2: ['Yes', 'No'],
        3: ['Over', 'Under'],
        4: ['Over', 'Under'],
        5: ['Over', 'Under'],
        6: ['X2', '1X', '12'],
        20: ['Over', 'Under'],
        22: ['Over', 'Under']
      }
    },
    // live中
    isLive() {
      return this.tabsIndex === 0 && this.firstShow.className.includes('dLive')
    }
  },
  watch: {
    periodData() {
      this.tabsIndex = 0
      this.clearExpireTickets()
      // 获取默认比赛数据
      this.periodData && (this.matchBefData = this.periodData.matches)
      // tabs初始化
      this.marketsTList &&
        this.marketsTList.tabs1 &&
        this.changeMarketsIndex(this.marketsTList.tabs1[0])
      this.getCashoutList()
    }
  },
  beforeMount() {
    // 开启计时器
    this.nowTimer = setInterval(
      () => (this.nowTime = new Date().getTime() / 1000),
      1000
    )
    // 默认过滤过期的比赛
    this.clearExpireTickets()
  },
  mounted() {
    // 检查是否有记录的
    if (this.roundIndex !== undefined) {
      const pindex = this.tabsList.findIndex((a) => a.round === this.roundIndex)
      if (pindex >= 0) {
        this.changeTabsIndex(pindex)
        this.$emit('clearRoundIndex')
        return
      }
    }
    if (this.tabsList[this.tabsIndex]) this.changeTabsIndex(this.tabsIndex)
  },
  beforeDestroy() {
    // 清除定时器
    this.nowTimer && clearInterval(this.nowTimer)
  },
  methods: {
    // 一键参与活动
    async direPartic(obj) {
      setTimeout(() => {
        history.replaceState('', '', '?')
      })
      this.$emit('clearTimeLimitedActivityQuery')
      let newData = []
      let ljodds = 1
      const { limit_amount, limit_count, limit_odds } = obj
      limit_amount && Lib.store.set('onebetLeagueActivityStake', limit_amount)
      if (!limit_count && !limit_odds) return

      const newTicketsObj = {
        ...this.$store.state.onebetLeagueTickets,
        [this.periodData.league_id]: []
      }
      Lib.store.set('onebetLeagueTickets', newTicketsObj)
      this.$store.commit('setOnebetLeagueTickets', newTicketsObj)
      if (this.isLive || typeof this.firstShow.isShowC == 'number') {
        this.qxqq()
        this.tabsIndex = 1
        this.getCashoutList()
        newData = await this.soccerMatchesReq()
      } else newData = this.matchBefData
      const {
        matchBefRef: { selectOnebetLeague }
      } = this.$refs
      for (let i = 0, len = newData.length; i < len; i++) {
        const item = newData[i]
        const itemOut = item.outcomes.reduce((ac, cv) => {
          ac ? ac.odds > cv.odds && (ac = cv) : (ac = cv)
          return ac
        })
        ljodds *= itemOut.odds
        selectOnebetLeague(item, itemOut)
        if (
          (!limit_count || i + 1 >= limit_count) &&
          (!limit_odds || ljodds >= limit_odds)
        )
          break
      }
    },
    // 获取Cashout列表,过滤无法cashout的订单
    getCashoutList() {
      this.cashoutList = []
      const { season_id, round } = this.tabsList[this.tabsIndex]
      this.$axios_api
        .LeagueSoccerCashoutList({ token: this.token, season_id, round })
        .then((res) => {
          const { code, data } = res
          if (code === 0 && Array.isArray(data))
            this.cashoutList = data.filter(
              (a) => a.cash_status === 0 && a.status === 0
            )
        })
    },
    // cashList排序
    cashListR(id, arr) {
      if (id) {
        // 改变排序替换数据
        const idIndex = this.cashoutList.findIndex((a) => a.auto_id == id)
        this.cashoutList[idIndex].cash_status = 1
        const spliceArr = this.cashoutList.splice(idIndex, 1)
        this.cashoutList.push(spliceArr[0])
        return
      }
      // 不改变排序替换数据
      if (this.cashoutList.length) {
        arr.forEach((a) => {
          const item = this.cashoutList.find((b) => b.auto_id == a.auto_id)
          for (const i in item) item[i] = a[i]
        })
      } else this.cashoutList = arr
    },
    // 切换periodTabs选中项
    changeTabsIndex(index) {
      this.qxqq()
      this.tabsIndex = index
      this.dataInit()
      this.getCashoutList()
    },
    // 切换marketsIndex选中项
    changeMarketsIndex(index) {
      this.marketsIndex = index
      this.dataInit()
    },
    // 获取数据
    dataInit() {
      this.isLive ? this.liveReqFun() : this.soccerMatchesReq()
    },
    // 时间格式化
    getDateFun(time, timeStamp) {
      return Lib.common.getDate(new Date(time * 1000), timeStamp)
    },
    // 获取比赛数据
    // eslint-disable-next-line require-await
    async soccerMatchesReq() {
      // 初始化
      this.isRequestFailed = 0
      this.requestLoading = 0
      const { season_id, round } = this.tabsList[this.tabsIndex]
      return this.$axios_api
        .LeagueSoccerMatches({ season_id, round, market_id: this.marketsIndex })
        .then((res) => {
          this.isRequestFailed = 0
          this.requestLoading = 1
          if (res.code === 0) {
            this.matchBefData = res.data
            this.timeLimitedActivityQuery &&
              this.$nextTick(() => {
                this.direPartic(this.timeLimitedActivityQuery)
                // this.timeLimitedActivityQuery = null
              })
            return this.matchBefData
          }
        })
        .catch((err) => {
          this.requestLoading = 1
          if (err.message === 'tabs change, hand cancel') return
          this.isRequestFailed = 1
        })
    },
    // 获取live数据
    liveReqFun() {
      const { league_id } = this.periodData
      // 初始化
      this.$axios_api
        .LeagueSoccerLive({ token: this.token, league_id })
        .then((res) => {
          this.isRequestFailed = 0
          this.requestLoading = 1
          if (res.code === 0) {
            const { matches, selections, tickets } = res.data
            if (this.isLive) {
              Array.isArray(matches) && (this.matchLiveData = matches)
              Array.isArray(selections) && (this.selections = selections)
            }
            Array.isArray(tickets) && this.cashListR(null, tickets)
            this.timeLimitedActivityQuery &&
              this.$nextTick(() => {
                this.direPartic(this.timeLimitedActivityQuery)
                // this.timeLimitedActivityQuery = null
              })
          }
        })
        .catch((err) => {
          this.requestLoading = 1
          if (err.message === 'tabs change, hand cancel') return
          this.isRequestFailed = 1
        })
    },
    // 取消请求
    qxqq() {
      // 跳转页面时取消未结束的请求
      try {
        const reqObj = this.$store.state.pathCancelReq['lang-onebetLeague']
        if (reqObj) {
          for (const key in reqObj) reqObj[key]('tabs change, hand cancel')
        }
      } catch (e) {}
    },
    // 清除过期tickets
    clearExpireTickets() {
      const ticketsObj = this.$store.state.onebetLeagueTickets
      const newTicketsObj = {}
      for (const i in ticketsObj) {
        const narr = ticketsObj[i]
        if (Array.isArray(narr))
          newTicketsObj[i] = narr.filter(
            (item) => item.start_time > this.nowTime
          )
      }
      Lib.store.set('onebetLeagueTickets', newTicketsObj)
      this.$store.commit('setOnebetLeagueTickets', newTicketsObj)
    },
    // 获取info
    getInfo(token) {
      this.$axios_api.userInfo({ token: token || this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@MarketsTabsColor: #fcf706;
.cl-onebetLeagueMarkets-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  .cl-periodTabs {
    height: 33rem/36;
    background-color: #2d2367;
    display: flex;
    .cl-item {
      flex: 1;
      border-right: 0.5rem/36 solid #6f679f;
      color: rgba(255, 255, 255, 0.6);
      font-size: 13rem/36;
      line-height: 13rem/36;
      .cl-box {
        height: 31rem/36;
        flex-direction: column;
        .cl-roundsId {
          margin: 3rem/36 0 4rem/36;
          font-size: 8rem/36;
          line-height: 8rem/36;
        }
        .cl-time {
          font-weight: bold;
        }
      }
      .cl-borderBox {
        width: 100%;
        height: 2rem/36;
        background-color: transparent;
      }
      &.cl-tabsIndex {
        .cl-borderBox {
          background-color: @MarketsTabsColor;
        }
        &.cl-dTime {
          .cl-box {
            .cl-time {
              color: @MarketsTabsColor;
            }
          }
        }
        &.cl-dLive {
          background-color: #f73a5f;
          .cl-box {
            .cl-time {
              color: @MarketsTabsColor;
            }
          }
        }
        &.cl-dEnd {
          .cl-borderBox {
            background-color: rgba(255, 255, 255, 0.8);
          }
          .cl-box {
            .cl-time {
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
      }
      &.no-dLive {
        background-color: #f73a5f;
      }
    }
    .cl-item:last-child {
      border-right: 0;
    }
  }
  .cl-marketsTabsBox {
    font-size: 11rem/36;
    height: 30rem/36;
    padding: 0 10rem/36;
    .cl-leftTabs {
      flex: 1;
      color: @tabNoColor;
      font-weight: bold;
      .cl-a {
        // flex: 1;
        .cl-name {
          height: 27rem/36;
        }
        .cl-leftLine {
          margin: 0 auto;
          height: 3rem/36;
          width: 33rem/36;
          border-radius: 2rem/36;
        }
      }
      .cl-marketsIndex {
        color: @tabColor;
        .cl-leftLine {
          background-color: @tabColor;
        }
      }
    }
    .cl-rightTabs {
      position: relative;
      z-index: 1;
      margin-left: 10rem/36;
      height: 23rem/36;
      min-width: 120rem/36;
      font-size: 9rem/36;
      font-weight: 400;
      color: #333;

      .cl-marketBox {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        min-height: 100%;
        background-color: #f2f2f4;
        border-radius: 12rem/36;
        overflow: hidden;
        flex-direction: column;
        box-sizing: border-box;
        .cl-tItem {
          width: 100%;
          height: 23rem/36;
          outline: 0;
          .cl-moreIcon {
            margin-left: 6rem/36;
            .sprite(@ticon-down, 108rem);
          }
          &.cl-marketsIndex {
            border: 0.5rem/36 solid @mainThemeColor;
            background-color: #dcf0f9;
            box-sizing: border-box;
            border-radius: 12rem/36;
          }
        }
        .cl-box {
          width: 100%;
          .cl-a {
            height: 23rem/36;
            width: 100%;
            &.cl-marketsIndex {
              background-color: #dcf0f9;
            }
          }
        }
      }
    }
  }
  .cl-contentBox {
    flex: 1;
    position: relative;
    .cl-matchBox {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;
    }
  }
}
</style>
