<template>
  <div class="cl-homeForYou-wrap">
    <div class="cl-listBox">
      <!-- 下拉刷新插件 -->
      <van-pull-refresh
        v-model="isLoading"
        :pulling-text="$t('pullRefresh.pull')"
        :loosing-text="$t('pullRefresh.pull')"
        :loading-text="$t('pullRefresh.loading')"
        @refresh="onRefresh"
      >
        <dataError v-if="isRequestFailed" />
        <div v-else>
          <div v-if="requestLoading">
            <template v-if="result.length > 0">
              <div v-for="(item, index) in result" :key="index" ref="matchItem">
                <template>
                  <div class="cl-item" @click="clickShowMore(item, index)">
                    <div
                      v-if="item.live_data && item.live_data.live"
                      class="cl-liveIcon"
                    />
                    <div class="cl-flexcb cl-itemT">
                      <div class="cl-tTl">
                        <div
                          class="cl-icon"
                          :class="checkIcon(item.sport_id)"
                        />
                        <div class="cl-oneLine cl-titleName">
                          {{ item.country_name }}
                          -
                          {{ item.tournament_name }}
                        </div>
                      </div>
                      <div
                        class="cl-tTr"
                        @click.stop="clickShowMore(item, index)"
                      >
                        <div class="cl-marketCount">
                          {{ '+' + item.market_count }}
                          {{ $t('preMatchBox.market') }}
                        </div>
                        <div
                          class="cl-arrowIcon"
                          :class="
                            showList[index] && showList[index].isShow
                              ? 'cl-iconRotate90'
                              : 'cl-iconRotate-90'
                          "
                        />
                      </div>
                    </div>
                    <div class="cl-flexcc cl-itemM">
                      <div class="cl-tM cl-tMl">
                        <div class="cl-threeLine cl-teamName cl-tnl">
                          {{ item.home_name }}
                        </div>
                        <img v-lazy="item.home_team_logo" class="cl-teamIcon" />
                      </div>
                      <div class="cl-tMm">
                        <template v-if="item.live_data && item.live_data.live">
                          <div>
                            {{ item.live_data.current_score.home_score }}
                            -
                            {{ item.live_data.current_score.away_score }}
                          </div>
                          <div class="cl-liveTime">
                            {{
                              item.live_data.time_elapsed === '0'
                                ? '00:00'
                                : item.live_data.time_elapsed
                            }}
                          </div>
                        </template>
                        <template v-else>
                          <div>{{ getDate(item.start_time, 'HH:mm') }}</div>
                          <div>{{ getDate(item.start_time, 'dd/MM') }}</div>
                        </template>
                      </div>
                      <div class="cl-tM">
                        <img v-lazy="item.away_team_logo" class="cl-teamIcon" />
                        <div class="cl-threeLine cl-teamName">
                          {{ item.away_name }}
                        </div>
                      </div>
                    </div>
                    <div v-if="Array.isArray(item.markets)" class="cl-itemB">
                      <div class="cl-marketTitle">
                        {{ item.markets[0].market_name }}
                      </div>
                      <div class="cl-marketBox">
                        <template
                          v-if="
                            Array.isArray(item.markets[0].outcomes) &&
                            item.markets[0].outcomes.length &&
                            !item.markets[0].qdLock
                          "
                        >
                          <div
                            v-for="a in item.markets[0].outcomes"
                            :key="a.id"
                            class="cl-flexcb cl-marketA"
                            :class="
                              arrayCheckOutcome(tickets, a.id)
                                ? 'cl-oddsButton'
                                : 'cl-noOddsButton'
                            "
                            @click.stop="addToBetslip(item, a, 0)"
                          >
                            <div
                              class="cl-oneLine cl-dWord"
                              :class="{
                                'cl-displayWord': !String(a.display).includes(
                                  'or'
                                )
                              }"
                              :style="{
                                width:
                                  (item.markets[0].outcomes.length === 3
                                    ? 60 / 36
                                    : 115 / 36) + 'rem'
                              }"
                            >
                              {{ a.display }}
                            </div>
                            <oddsChange
                              :odds="Number(a.odds).toFixed(2)"
                              :font-size-num="11 / 36"
                            />
                            <template v-if="a.odds == 1">
                              <div class="cl-flexcc cl-canNotOddsLock">
                                <div class="cl-lockIcon" />
                              </div>
                            </template>
                          </div>
                        </template>
                        <template v-else>
                          <div class="cl-flexcc cl-canNotOddsLock">
                            <div class="cl-lockIcon" />
                          </div>
                        </template>
                      </div>
                    </div>
                    <div v-else class="cl-itemB">
                      <div class="cl-marketTitle">
                        {{ item.markets.market_name }}
                      </div>
                      <div class="cl-marketBox">
                        <template
                          v-if="
                            Array.isArray(item.markets.outcomes) &&
                            item.markets.outcomes.length &&
                            !item.markets.qdLock
                          "
                        >
                          <div
                            v-for="a in item.markets.outcomes"
                            :key="a.id"
                            class="cl-flexcb cl-marketA"
                            :class="
                              arrayCheckOutcome(tickets, a.id)
                                ? 'cl-oddsButton'
                                : 'cl-noOddsButton'
                            "
                            @click.stop="addToBetslip(item, a)"
                          >
                            <div
                              class="cl-oneLine cl-dWord"
                              :class="{
                                'cl-displayWord': !String(a.display).includes(
                                  'or'
                                )
                              }"
                              :style="{
                                width:
                                  (item.markets.outcomes.length === 3
                                    ? 60 / 36
                                    : 115 / 36) + 'rem'
                              }"
                            >
                              {{ a.display }}
                            </div>
                            <oddsChange
                              :odds="Number(a.odds).toFixed(2)"
                              :font-size-num="11 / 36"
                            />
                            <template v-if="a.odds == 1">
                              <div class="cl-flexcc cl-canNotOddsLock">
                                <div class="cl-lockIcon" />
                              </div>
                            </template>
                          </div>
                        </template>
                        <template v-else>
                          <div class="cl-flexcc cl-canNotOddsLock">
                            <div class="cl-lockIcon" />
                          </div>
                        </template>
                      </div>
                    </div>
                    <CollapseTransition>
                      <div v-show="showList[index] && showList[index].isShow">
                        <template v-if="Array.isArray(item.markets)">
                          <template v-for="(m, n) in item.markets">
                            <div
                              v-if="n !== 0"
                              :key="m.market_id"
                              class="cl-itemB"
                            >
                              <div class="cl-marketTitle">
                                {{ m.market_name }}
                              </div>
                              <div class="cl-marketBox">
                                <template
                                  v-if="
                                    Array.isArray(m.outcomes) &&
                                    m.outcomes.length &&
                                    !m.qdLock
                                  "
                                >
                                  <div
                                    v-for="a in m.outcomes"
                                    :key="a.id"
                                    class="cl-flexcb cl-marketA"
                                    :class="
                                      arrayCheckOutcome(tickets, a.id)
                                        ? 'cl-oddsButton'
                                        : 'cl-noOddsButton'
                                    "
                                    @click.stop="addToBetslip(item, a, n)"
                                  >
                                    <div
                                      class="cl-oneLine cl-dWord"
                                      :class="{
                                        'cl-displayWord': !String(
                                          a.display
                                        ).includes('or')
                                      }"
                                      :style="{
                                        width:
                                          (m.outcomes.length === 3
                                            ? 60 / 36
                                            : 115 / 36) + 'rem'
                                      }"
                                    >
                                      {{ a.display }}
                                    </div>
                                    <oddsChange
                                      :odds="Number(a.odds).toFixed(2)"
                                      :font-size-num="11 / 36"
                                    />
                                    <template v-if="a.odds === 1">
                                      <div class="cl-flexcc cl-canNotOddsLock">
                                        <div class="cl-lockIcon" />
                                      </div>
                                    </template>
                                  </div>
                                </template>
                                <template v-else>
                                  <div class="cl-flexcc cl-canNotOddsLock">
                                    <div class="cl-lockIcon" />
                                  </div>
                                </template>
                              </div>
                            </div>
                          </template>
                        </template>
                        <template v-else>
                          <dataLoading />
                        </template>
                        <div
                          class="cl-goDetailPage"
                          @click.stop="goDetailPage(item)"
                        >
                          {{
                            $store.state.root.locale === 'fr'
                              ? 'Vérifier Plus'
                              : 'Check More'
                          }}
                          {{ '+' + item.market_count }}
                          {{ $t('preMatchBox.market') }}
                        </div>
                        <div class="cl-flexcc">
                          <div
                            class="cl-putAwayIcon"
                            @click.stop="clickShowMore(item, index)"
                          />
                        </div>
                      </div>
                    </CollapseTransition>
                  </div>
                </template>
              </div>
            </template>
            <dataNoResult v-else />
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <!-- 无限滚动加载插件 -->
    <client-only>
      <InfiniteLoading
        ref="infiniteLoading"
        :identifier="infiniteId"
        @infinite="onInfinite"
      >
        <span slot="no-more" />
        <span slot="no-results" />
        <span slot="spinner">
          <div class="cl-gameLoading">
            <dataLoading />
          </div>
        </span>
      </InfiniteLoading>
    </client-only>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import oddsChange from '@/components/components/oddsChange.vue'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  name: 'HomeForYou',
  components: {
    InfiniteLoading,
    oddsChange,
    CollapseTransition: Lib.common.CollapseTransition
  },
  data() {
    return {
      infiniteId: +new Date(), // 无限滚动id
      page: 1, // 分页
      result: [], // 渲染数组
      showList: [], // 展开数组
      isRequestFailed: 0, // 请求是否失败
      requestLoading: 0, // 是否请求中
      isLoading: false, // pull refresh
      time_count: 0, // 更新可视范围数据计时器
      staticInterval: null, // 定时器id
      isShowMore: 0 // 是否展开过第二项
    }
  },
  computed: {
    tickets() {
      return this.$store.state.tickets
    },
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    // 视图更新
    viewScrollDeBounce() {
      return Lib.common.deBounce(this.visibleRangeMarketReq)
    }
  },
  mounted() {
    this.enterPage()
    // 从比赛详情页回来的话，还原数据
    contestListRestore.call(this, 'ForYou', [], ['page', 'result', 'showList'])
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('index', this.saveContestList)
  },
  beforeDestroy() {
    this.leavePage()
  },
  destroyed() {
    pubSub.unSubscribe('index', this.saveContestList)
  },
  methods: {
    // 滚动方法
    onInfinite($state) {
      this.getData($state)
    },
    // 点击展开更多
    clickShowMore(item, index) {
      const showObj = this.showList[index] || {}
      showObj.isShow = !showObj.isShow
      this.$set(this.showList, index, showObj)
      if (showObj.isShow) Lib.common.event_statistics('Home_ForYou_ShowMore')
      const isArr = this.result[index].markets
      if ((Array.isArray(isArr) && isArr.length > 0) || showObj.isLoading)
        return
      showObj.isLoading = true
      this.$set(this.showList, index, showObj)
      this.$axios_api
        .getForYouDetail({
          match_id: item.match_id,
          lang: this.$store.state.root.locale
        })
        .then((res) => {
          const fnObj = {
            0: () => {
              const map = new Map()
              const AllArr = [this.result[index].markets, ...res.data].filter(
                (item) => !map.has(item.market_id) && map.set(item.market_id, 1)
              )
              this.$set(this.result[index], 'markets', AllArr)
              showObj.isLoading = false
              this.$set(this.showList, index, showObj)
            }
          }
          if (fnObj[res.code]) fnObj[res.code]()
        })
    },
    // 获取数据
    getData($state) {
      this.$axios_api
        .getHomeForYou({
          page: this.page,
          lang: this.$store.state.root.locale,
          token: this.token
        })
        .then((res) => {
          this.isLoading = false
          this.isRequestFailed = 0
          this.requestLoading = 1
          const fnObj = {
            0: () => {
              this.page++
              const arr = res.data.result
              this.result = [...this.result, ...arr]
              // 展开第二项
              if (!this.isShowMore) {
                if (this.result[1]) this.clickShowMore(this.result[1], 1)
                this.isShowMore = 1
              }
              if ($state) {
                if (arr.length < 20) $state.complete()
                else $state.loaded()
              }
            }
          }
          if (fnObj[res.code]) fnObj[res.code]()
        })
        .catch((err) => {
          this.isRequestFailed = 1
          this.requestLoading = 1
          if ($state !== undefined) $state.complete()
          console.log(err)
        })
    },
    // 添加到betslip
    addToBetslip(item, outcomeItem, index) {
      Lib.common.event_statistics('Betslips_Add_Click', `Source:home_foryou`)

      let newTicket = []
      const ticket = {
        match_id: item.match_id,
        start_time: item.start_time,
        sport_id: item.sport_id || '',
        country_name: item.country_name || '',
        tournament_name: item.tournament_name || '',
        tournament_id: item.tournament_id || '',
        home_name: item.home_name,
        away_name: item.away_name,
        market_id: item.markets.market_id || item.markets[index].market_id,
        market_name:
          item.markets.market_name || item.markets[index].market_name,
        display: outcomeItem.display,
        odds: outcomeItem.odds,
        id: outcomeItem.id,
        match_status: item.match_type === 2 ? 1 : 0,
        foryou: true
      }

      // 该比赛是否已经选择过outcome
      let bool = false

      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].match_id === ticket.match_id) {
          if (this.tickets[i].id === ticket.id) {
            bool = true
            newTicket = this.tickets.filter(function (item, index) {
              return index !== i
            })
          } else {
            bool = true
            newTicket = this.tickets
              .filter(function (item, index) {
                return index !== i
              })
              .concat(ticket)
          }
        }
      }

      if (!bool) {
        newTicket = this.tickets.concat(ticket)
      }

      this.$store.commit('setTickets', newTicket)
      Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify(newTicket)))
    },
    // icon choose
    checkIcon(id) {
      const idObj = {
        1: 'cl-icon003',
        2: 'cl-icon004',
        5: 'cl-icon008',
        12: 'cl-icon006',
        16: 'cl-icon005',
        21: 'cl-icon007',
        23: 'cl-icon009'
      }
      return idObj[id] || ''
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 数组内容查询outcome
    arrayCheckOutcome(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          return true
        }
      }
      return false
    },
    // 前往详情页面
    goDetailPage(item) {
      Lib.common.event_statistics('go_match_detail')
      this.$store.commit('setMatchDetailStatus', true)
      this.$router.push({
        path: `/${this.$store.state.root.locale}/match/${item.match_id}`
      })
      pubSub.publish('index')
    },
    saveContestList() {
      contestListSave.call(this, [], '', {
        pageForYou: this.page,
        resultForYou: this.result,
        showListForYou: this.showList
      })
    },
    // 下拉刷新
    onRefresh() {
      this.page = 1
      this.result = []
      this.showList = []
      this.isRequestFailed = 0
      this.requestLoading = 0
      this.infiniteId += 1
    },
    // 进入页面
    enterPage() {
      this.staticGetData()
      // 注册滚动事件
      window.addEventListener('scroll', this.viewScrollDeBounce, true)
    },
    // 离开页面
    leavePage() {
      // 清楚定时器
      clearInterval(this.staticInterval)
      // 销毁滚动事件
      window.removeEventListener('scroll', this.viewScrollDeBounce, true)
    },
    // 每隔10s更新一次可视范围内数据
    staticGetData() {
      this.viewScrollDeBounce()
      this.staticInterval = setInterval(() => {
        this.time_count++
        if (this.time_count >= 10) {
          this.viewScrollDeBounce()
        }
      }, 1000)
    },
    // 请求可视范围内market数据
    visibleRangeMarketReq() {
      this.time_count = 0
      this.visibleRangeWatch()
    },
    // 可视范围内market数据监听
    visibleRangeWatch() {
      // 获取渲染dom
      const doms = this.$refs.matchItem
      // 有dom
      if (doms && doms.length > 0) {
        const indexArr = []
        // 筛选出符合条件dom,获取它的下标
        // eslint-disable-next-line array-callback-return
        doms.map((item, index) => {
          const data = item.getBoundingClientRect()
          // 符合条件
          if (data.bottom > 70 && data.top <= 475) indexArr.push(index)
        })
        // 有符合的dom
        if (indexArr.length > 0) {
          // 请求id数组
          const idsArr = []
          // eslint-disable-next-line array-callback-return
          indexArr.map((item) => {
            // 获取数据中当前项
            const resultObj = this.result[item]
            const showObj = this.showList[item]
            // 获取即将更新数据id
            if (Array.isArray(resultObj.markets)) {
              // 当前项为展开状态且不在请求中
              if (showObj && showObj.isShow && !showObj.isLoading)
                resultObj.markets.map((item) => idsArr.push(item.market_id))
              else idsArr.push(resultObj.markets[0].market_id)
            } else idsArr.push(resultObj.markets.market_id)
          })

          this.$axios_api
            .getMarketInfos({
              market_ids: JSON.stringify(idsArr)
            })
            .then((res) => {
              const data = res.data.result
              // 有数据
              if (data && data.length) {
                // 即将删除下标数组
                const deleteArr = []
                const map = new Map()
                data.map((item) => map.set(item.market_id, item))
                // 更新或删除数据
                // eslint-disable-next-line array-callback-return
                indexArr.map((item) => {
                  const resultObj = this.result[item]
                  const showObj = this.showList[item]
                  // 是否删除此项
                  let flag = false
                  // live赛事大于开始时间160分钟
                  if (
                    resultObj.live_data &&
                    resultObj.live_data.live &&
                    new Date().getTime() >=
                      (resultObj.start_time + 160 * 60) * 1000
                  )
                    flag = true
                  // 赛前赛事大于开始时间
                  else if (
                    !(resultObj.live_data && resultObj.live_data.live) &&
                    new Date().getTime() >= resultObj.start_time * 1000
                  )
                    flag = true

                  // 时间未过期(进行下一步,如果可以删除则flag会被改为true)
                  if (!flag) {
                    // markets项是数组
                    if (Array.isArray(resultObj.markets)) {
                      // 当前项为展开状态且不在请求中
                      if (showObj && showObj.isShow && !showObj.isLoading) {
                        // 默认删除
                        flag = true
                        let lockFlag = false
                        // eslint-disable-next-line array-callback-return
                        resultObj.markets.map((a, b) => {
                          // 获取请求数据
                          const valueObj = map.get(a.market_id)
                          // 合并原数据与请求数据
                          const newObj = { ...a, ...valueObj }
                          // 不正常上锁
                          if (!valueObj || (valueObj && valueObj.status != 0)) {
                            newObj.qdLock = true
                            // 有锁住的比赛
                            lockFlag = true
                          }
                          // 还有进行的比赛,不删除,解锁
                          if (valueObj && valueObj.status == 0) {
                            newObj.qdLock = false
                            flag = false
                          }
                          // 更新
                          this.$set(this.result[item].markets, b, newObj)
                        })
                        // 有锁住的比赛
                        if (lockFlag) {
                          const newArr = this.result[item].markets.sort((x) => {
                            if (x.status == 0) return -1
                            else return 0
                          })
                          // 更新
                          this.$set(this.result[item], 'markets', newArr)
                        }
                      } else {
                        // 获取请求数据
                        const valueObj = map.get(resultObj.markets[0].market_id)
                        // 合并原数据与请求数据
                        const newObj = { ...resultObj.markets[0], ...valueObj }
                        // 不正常上锁
                        if (!valueObj || (valueObj && valueObj.status != 0))
                          newObj.qdLock = true
                        // 正常解锁
                        if (valueObj && valueObj.status == 0)
                          newObj.qdLock = false
                        // 更新
                        this.$set(this.result[item].markets, 0, newObj)
                      }
                    } else {
                      // 获取请求数据
                      const valueObj = map.get(resultObj.markets.market_id)
                      // 合并原数据与请求数据
                      const newObj = { ...resultObj.markets, ...valueObj }
                      // 不正常上锁
                      if (!valueObj || (valueObj && valueObj.status != 0))
                        newObj.qdLock = true
                      // 正常解锁
                      if (valueObj && valueObj.status == 0)
                        newObj.qdLock = false
                      // 更新
                      this.$set(this.result[item], 'markets', newObj)
                    }
                  }

                  // 可以删除
                  if (flag) deleteArr.push(item)
                })

                // 排序,从高到低
                deleteArr.sort((a, b) => {
                  if (a < b) return 1
                  if (a > b) return -1
                  return 0
                })

                // 删除对应数据和展开数据
                deleteArr.forEach(
                  (item) =>
                    this.result.splice(item, 1) && this.showList.splice(item, 1)
                )
              }
            })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-homeForYou-wrap {
  padding-bottom: 20rem/36;
  background-color: @foryouBgColor;

  .cl-listBox {
    padding: 10rem/36;

    .cl-item {
      position: relative;
      border-radius: 5rem/36;
      padding: 7rem/36;
      margin-bottom: 10rem/36;
      background-color: #fff;

      .cl-itemT {
        font-size: 10rem/36;

        .cl-tTl {
          display: flex;
          align-items: center;

          .cl-titleName {
            color: #a2a2a7;
            max-width: 200rem/36;
          }
        }

        .cl-tTr {
          display: flex;
          align-items: center;

          .cl-marketCount {
            color: #74747c;
            white-space: nowrap;
          }
        }
      }

      .cl-itemM {
        font-size: 10rem/36;
        color: #000;
        font-weight: bold;
        padding: 10rem/36 0;

        .cl-teamIcon {
          margin: 0 7rem/36;
          width: 22rem/36;
          height: 22rem/36;
        }

        .cl-tM {
          flex: 1;
          display: flex;
          align-items: center;

          .cl-teamName {
            width: 110rem/36;
            -webkit-line-clamp: 2;
          }

          .cl-tnl {
            text-align: end;
          }
        }

        .cl-tMl {
          justify-content: flex-end;
        }

        .cl-tMm {
          display: flex;
          align-items: center;
          flex-direction: column;

          .cl-liveTime {
            font-weight: 400;
            color: #e52f10;
          }
        }
      }

      .cl-itemB {
        font-size: 11rem/36;
        font-weight: bold;
        color: #333;
        padding-bottom: 7rem/36;

        .cl-marketTitle {
          margin-bottom: 8rem/36;
          text-transform: uppercase;
        }

        .cl-marketBox {
          position: relative;
          display: flex;
          height: 33rem/36;

          .cl-marketA {
            flex: 1;
            padding: 0 10rem/36;
            margin-right: 3rem/36;
            position: relative;
            font-size: 11rem/36;

            .cl-displayWord {
              text-transform: capitalize;
            }

            /deep/ .cl-oddsWord {
              font-weight: 800;
            }
          }

          .cl-marketA:last-child {
            margin-right: 0;
          }
        }
      }

      .cl-goDetailPage {
        display: flex;
        justify-content: center;
        white-space: nowrap;
        font-size: 10rem/36;
        font-weight: 400;
        color: @mainThemeColor;
        padding-top: 5rem/36;
        padding-bottom: 10rem/36;
      }

      .cl-liveIcon {
        position: absolute;
        top: 25rem/36;
        left: 6rem/36;
        .sprite(@icon-red-bg-live, 108rem);
      }
    }
  }

  .cl-lockIcon {
    .sprite(@icon-lock, 108rem);
  }

  .cl-putAwayIcon {
    .sprite(@icon-weekly-cash-up, 108rem);
  }

  .cl-icon {
    margin-right: 3rem/36;
  }

  .cl-arrowIcon {
    margin-left: 7rem/36;
    .sprite(@icon-black-right, 105rem);
  }

  .cl-icon003 {
    .sprite(@tabs-3, 108rem);
  }

  .cl-icon004 {
    .sprite(@tabs-4, 148rem);
  }

  .cl-icon008 {
    .sprite(@tabs-8, 148rem);
  }

  .cl-icon006 {
    .sprite(@tabs-6, 148rem);
  }

  .cl-icon005 {
    .sprite(@tabs-5, 148rem);
  }

  .cl-icon007 {
    .sprite(@tabs-7, 148rem);
  }

  .cl-icon009 {
    .sprite(@tabs-9, 148rem);
  }
}
</style>
