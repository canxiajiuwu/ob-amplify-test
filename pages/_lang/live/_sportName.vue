<template>
  <div ref="wrap" class="cl-live-wrap">
    <div class="cl-topHeader" ref="topHeader">
      <div
        :style="{ height: safeAreaTop + 'px', backgroundColor: '#1C2029' }"
      />
      <liveTabs @dataFilter="dataFilter" :live="live" />
      <liveMatchs
        :list="list[sport_id]"
        :list-index="listIndex"
        @changeMatch="changeMatch"
        v-if="!is_upcoming"
      />
      <!-- live crashGame banner WebSocket通讯所需组件 -->
      <!-- <liveWebSocket @changeCrashGameOdds="changeCrashGameOdds" /> -->
    </div>
    <div :style="{ height: safeAreaTop + 'px' }" />
    <div class="cl-matchBox" :class="{ 'cl-is_upcoming': is_upcoming }">
      <van-pull-refresh
        v-model="isLoading"
        :pulling-text="$t('pullRefresh.pull')"
        :loosing-text="$t('pullRefresh.pull')"
        :loading-text="$t('pullRefresh.loading')"
        @refresh="onRefresh"
      >
        <div class="cl-liveScrollBox">
          <dataError v-if="isRequestFailed" :where="where" />
          <div v-else>
            <div v-if="requestLoading">
              <div v-if="listIndex">
                <preMatchBox
                  :match-id="matchId"
                  :result="result"
                  :is_upcoming="is_upcoming"
                  v-if="result.length > 0"
                  @istop="istop"
                  :event_name="event_name"
                  @visibleRangeMarkets="visibleRangeMarkets"
                  :favorite-market-list="favoriteMarketList"
                  @changeCareStatus="changeCareStatus"
                >
                  <!-- <template v-slot:banner> -->
                  <!-- live crashGame banner -->
                  <!-- <liveBanner :showOdds="crashGameShowOdds" /> -->
                  <!-- </template> -->
                </preMatchBox>
                <dataNoResult v-else :where="where" />
              </div>
              <div v-else>
                <liveFavorite
                  :result="favoriteList"
                  @istop="istop"
                  @changeCareStatus="changeCareStatus"
                  :favorite-market-list="favoriteMarketList"
                />
              </div>
            </div>
            <div class="cl-gameLoading" v-else-if="!isLoading">
              <dataLoading :where="where" />
            </div>
          </div>

          <noDataGameList
            event-name="live"
            color="#A2A2A7"
            bgcolor="#32303E"
            line-color="#979797"
          />
        </div>
      </van-pull-refresh>
      <client-only>
        <InfiniteLoading
          @infinite="onInfinite"
          :identifier="infiniteId"
          ref="infiniteLoading"
        >
          <span slot="no-more" />
          <span slot="no-results" />
          <span slot="spinner" />
        </InfiniteLoading>
      </client-only>
    </div>

    <!-- 调用检查数据是否需要刷新的计算属性 -->
    <div v-if="liveRefreshData" />
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import liveTabs from '@/components/components/liveTabs.vue'
import preMatchBox from '@/components/components/liveMatchBox.vue'
import liveMatchs from '@/components/components/liveMatchs.vue'
import liveFavorite from '@/components/components/liveFavorite.vue'
import noDataGameList from '@/components/components/fastGames/noDataGameList.vue'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

// import liveBanner from '@/components/components/liveBanner.vue'
// import liveWebSocket from '@/components/components/liveWebSocket.vue'
// import { liveMockData } from '@/assets/js/liveMockData.js'

export default {
  name: 'Live',
  components: {
    liveTabs,
    preMatchBox,
    InfiniteLoading,
    liveMatchs,
    liveFavorite,
    noDataGameList
    // liveBanner,
  },
  data() {
    return {
      teams: ['1', 'X', '2'],
      result: [], // 循环结果
      favoriteList: [],
      live: [],
      page: 1, // 分页
      infiniteId: +new Date(),
      is_upcoming: 0, // 是否是upcoming: 0 live 1 upcoming
      sport_id: 1, // 球类id
      dataInterval: '',
      isLive: true, // 是否是live
      isRequestFailed: false,
      requestLoading: false,
      isLoading: false, // 下拉刷新
      liveTimes: 1, // 第几次进入live页面
      where: 'live', // where
      listIndex: 1, // live Matchs 数据
      topList: null, // 置顶比赛集合
      crashGameShowOdds: '1.00',
      favoriteMarketList: [] // 用户关注的market
    }
  },
  computed: {
    platform() {
      return this.$store.state.platform
    },
    list() {
      return this.$t('liveMatchs')
    },
    matchId() {
      return this.list[this.sport_id][this.listIndex].matchId
    },
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    event_name() {
      // upcoming
      if (this.is_upcoming === 1) return '_live_upcoming'
      // favorite
      else if (this.listIndex === 0) return '_live_football_myfavorite'
      // live
      else return '_live_football'
    },
    // 用户投注后需要更新数据
    liveRefreshData() {
      if (Lib.store.get('liveRefreshData')) {
        this.page = 1
        this.result = []
        this.infiniteId += 1
        Lib.store.remove('liveRefreshData')
      }
      return Lib.store.get('liveRefreshData')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    // this.liveInterval()
    // 获取置顶比赛数据
    this.getIstopData()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    contestListRestore.call(
      this,
      'LiveIndex',
      ['page', 'result', 'favoriteList', 'listIndex'],
      [],
      '.cl-live-wrap'
    )
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('live', this.saveContestList)
    // 获取关注的markets
    if (this.result.length > 0) {
      return
    }
    this.reqMarketsFollow()
    clearInterval(this.dataInterval)
    if (this.liveTimes !== 1) {
      this.page = 1
      //        this.infiniteId += 1;

      if (this.listIndex) {
        this.getLive()
      } else {
        this.liveFavorites()
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.dataInterval)
  },
  destroyed() {
    pubSub.unSubscribe('live', this.saveContestList)
  },
  methods: {
    // 修改赔率
    changeCrashGameOdds(data) {
      this.crashGameShowOdds = data
    },
    // 请求获取哪些market是被关注的
    reqMarketsFollow() {
      this.$axios_api
        .reqMarketsFollow({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.favoriteMarketList = res.data.items
          }
        })
    },
    // 可视范围内数据变更
    visibleRangeMarkets(data) {
      data.forEach((dataItem) => {
        this.result.forEach((item, index) => {
          if (item.i === dataItem.market_id.split('/')[0]) {
            if (item.ms[dataItem.market_id.split('/')[1]])
              item.ms[dataItem.market_id.split('/')[1]].forEach(
                (innerItem, innerIndex) => {
                  if (innerItem.i === dataItem.market_id) {
                    const os = []
                    for (let i = 0; i < dataItem.outcomes.length; i++) {
                      os[i] = {}
                      for (const key in dataItem.outcomes[i]) {
                        if (key === 'display')
                          os[i].n = dataItem.outcomes[i][key]
                        if (key === 'odds') os[i].o = dataItem.outcomes[i][key]
                        if (key === 'id') os[i].i = dataItem.outcomes[i][key]
                      }
                    }
                    this.$set(
                      this.result[index].ms[dataItem.market_id.split('/')[1]][
                        innerIndex
                      ],
                      'os',
                      os
                    )
                  }
                }
              )
          }
        })
      })
    },
    // 下拉刷新
    onRefresh() {
      this.page = 1
      this.result = []
      this.favoriteList = []
      this.infiniteId += 1

      this.isRequestFailed = false
      this.requestLoading = false
    },
    // 滚动方法
    onInfinite($state) {
      if (this.listIndex) {
        this.getLive($state)
      } else {
        this.liveFavorites($state)
      }
    },
    // 获取live比赛
    getLive($state) {
      this.$axios_api
        .sportLive({
          page: this.page,
          is_upcoming: this.is_upcoming,
          platform: this.platform,
          sport_id: this.sport_id
        })
        .then((res) => {
          this.liveTimes++
          this.isLoading = false
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.page++
            if ($state !== undefined) {
              $state.complete()
            }

            // 循环数据
            this.result = this.topResult(res.data.result)
            this.live = res.data.meta.filters.sport

            // 如果没有live比赛则前往upcoming
            if (
              this.live.length <= 1 &&
              !this.is_upcoming &&
              this.sport_id === 1
            ) {
              this.$router.push({
                path: `/${this.$store.state.root.locale}/live/Upcoming`
              })
            } else if (
              this.live.length > 1 &&
              !this.is_upcoming &&
              this.sport_id === 1 &&
              this.live[1].id !== 1
            ) {
              this.$router.push({
                path: `/${this.$store.state.root.locale}/live/${this.live[1].id}`
              })
            }
          }
        })
        .catch((err) => {
          console.log(err)
          this.isRequestFailed = true
          this.requestLoading = true
          this.isLoading = false
        })
    },
    // 获取live比赛的favorite
    liveFavorites($state) {
      this.$axios_api
        .liveFavorites({
          page: this.page,
          token: this.token,
          platform: this.platform,
          sport_id: this.sport_id
        })
        .then((res) => {
          this.liveTimes++
          this.isLoading = false
          this.isRequestFailed = false
          this.requestLoading = true

          if (res.code === 0) {
            this.page++
            if ($state !== undefined) {
              $state.complete()
            }

            // 循环数据
            this.live = res.data.meta.filters.sport
            this.favoriteList = this.topResult(res.data.result)
          }
        })
        .catch((err) => {
          console.log(err)
          this.isRequestFailed = true
          this.requestLoading = true
          this.isLoading = false
        })
    },
    // tabs 数据筛选
    dataFilter(data) {
      this.sport_id = data.sportId
      this.listIndex = 1
      this.is_upcoming = data.is_upcoming

      this.page = 1
      this.result = []
      this.infiniteId += 1

      this.isRequestFailed = false
      this.requestLoading = false

      this.calculateHeaderHeight()
    },
    // 循环
    liveInterval() {
      this.dataInterval = setInterval(() => {
        this.getLive()
      }, 1000)
    },
    // 选择matches
    changeMatch(index) {
      this.listIndex = index
      this.teams = this.list[this.sport_id][index].teams
      this.calculateHeaderHeight()

      if (index === 0) {
        this.page = 1
        this.favoriteList = []
        this.infiniteId += 1

        this.isRequestFailed = false
        this.requestLoading = false
      }
    },
    // 计算topHeader高度
    calculateHeaderHeight() {
      this.$nextTick(() => {
        if (this.$refs.live_pull_refresh)
          this.$refs.live_pull_refresh.style.paddingTop =
            this.$refs.topHeader.offsetHeight + 'px'
      })
    },
    // 获取缓存中的置顶比赛数据
    getIstopData() {
      this.topList = Lib.store.get('topData')
    },
    // 置顶数据整合
    istop(item) {
      const nowTime = new Date().getTime() / 1000
      this.getIstopData()
      if (this.topList && Array.isArray(this.topList)) {
        for (let i = 0; i < this.topList.length; i++) {
          // 删除过期置顶
          if (
            this.topList[i].i === item.i ||
            nowTime - this.topList[i].st > 24 * 60 * 60
          ) {
            this.topList.splice(i, 1)
            i--
          }
        }
        this.topList.unshift(item)
      } else this.topList = [item]
      this.result = this.topResult(this.result)
      this.favoriteList = this.topResult(this.favoriteList)

      // 置顶后滚动归零
      this.scrollAnimation()
      Lib.store.set('topData', this.topList)
      const str =
        this.$store.state.root.locale === 'fr'
          ? 'Épingler en haut'
          : 'Pin to top'
      this.$store.commit('setToastInfo', str)
    },
    // 对live比赛数据进行置顶排序
    topResult(result) {
      if (
        Array.isArray(result) &&
        this.topList &&
        Array.isArray(this.topList)
      ) {
        const topArr = []
        for (let j = 0; j < this.topList.length; j++) {
          for (let i = 0; i < result.length; i++) {
            if (result[i].i === this.topList[j].i) {
              topArr.push(result[i])
              result.splice(i, 1)
              i--
              break
            }
          }
        }

        return topArr.concat(result)
      }

      return result
    },
    // 滚动归零动画
    scrollAnimation() {
      const dom = document.querySelector('#app')
      // 清除循环
      clearInterval(this.scrollInterval)
      // 设置循环，使滚动条滚动归零
      let times = 0
      this.scrollInterval = setInterval(() => {
        times++
        if (dom.scrollTop > 0) {
          if (times > 15) {
            dom.scrollTop = 0
            clearInterval(this.scrollInterval)
          } else {
            dom.scrollTop = dom.scrollTop - 20
          }
        } else {
          dom.scrollTop = 0
          clearInterval(this.scrollInterval)
        }
      }, 10)
    },
    // 修改favorite数据
    changeCareStatus(data) {
      console.log(data)
      const marketId = data.item[0].i.split('/')[1]

      // 处理favorite 页面数据
      for (let i = 0; i < this.favoriteList.length; i++) {
        if (!data.bool) {
          this.$delete(this.favoriteList[i].ms, marketId)
          const bool = true
          //   for (const key in this.favoriteList[i].ms) {
          //     bool = false
          //   }

          if (bool) {
            this.favoriteList.splice(i, 1)
            i--
          }
        }
      }

      // 处理用户关注的页面数据
      const index = this.favoriteMarketList.findIndex(
        (item) => item === marketId
      )
      if (index !== -1) {
        if (!data.bool) {
          // 取消关注
          this.favoriteMarketList.splice(index, 1)
        }
      } else if (data.bool) {
        // 关注
        this.favoriteMarketList.push(marketId)
      }
    },
    saveContestList() {
      contestListSave.call(
        this,
        ['page', 'result', 'favoriteList', 'listIndex', 'pageScroll'],
        '.cl-matchBox'
      )
    }
  }
}
</script>

<style scoped lang="less">
.cl-live-wrap {
  box-sizing: border-box;
  padding-bottom: 2.2rem;
  background-color: #000;
  height: 100vh;
  overflow-y: auto;
  width: 100%;

  .cl-topHeader {
    position: fixed;
    top: 0;
    margin: 0 auto;
    z-index: 10;
    background-color: #000;
  }

  .cl-matchBox {
    &.cl-is_upcoming {
      .van-pull-refresh {
        padding-top: 40rem/36;
      }
    }
  }

  .van-pull-refresh {
    padding-top: 83rem/36;
    overflow: visible;
  }

  .cl-liveScrollBox {
    padding-bottom: 100rem/36;
  }
}
</style>
