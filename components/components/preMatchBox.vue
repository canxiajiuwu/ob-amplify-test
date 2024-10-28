<template>
  <div class="cl-preMatchBox-wrap">
    <div
      v-for="(item, index) in result"
      :key="index"
      ref="matchItem"
      :data-market-id="item.markets.market_id"
    >
      <div
        class="cl-bsbb cl-matchItem"
        :class="{ 'cl-matchItemFirst': index === 0 }"
      >
        <div class="cl-flexcb cl-top" @click="goDetailPage(item)">
          <div class="cl-flexcs cl-left">
            <div v-if="title === 'featured'" class="cl-bestOddsBox">
              <div
                v-if="isBestOdds(item.markets.outcomes)"
                class="cl-flexcc cl-bestOdds"
              >
                {{ $t('featuredMatch.bestOdds') }}
              </div>
            </div>
            <div
              v-else
              class="cl-icon"
              :class="
                arrayCheckIcon(list, meta ? meta.sport_id : item.sport_id)
              "
            />
            <div class="cl-flexcc cl-name">
              <!-- <span class="cl-sportName">{{arrayCheck(sportList,meta ? meta.sport_id : item.sport_id)}}</span> -->
              <!-- <span class="cl-line"> - </span> -->
              <span class="cl-oneLine cl-leaguesName">
                {{ meta ? meta.country_name : item.country_name }}
                -
                {{ meta ? meta.tournament_name : item.tournament_name }}
              </span>
            </div>
            <!-- <div v-if="title === 'featured'" class="cl-hot" /> -->
          </div>

          <div class="cl-right">
            <div v-if="item.live_data && item.live_data.live">
              <span>{{ item.live_data.stage_status }}</span>
              <span
                v-if="item.live_data.time_elapsed !== '0'"
                class="cl-countdown"
                >{{ item.live_data.time_elapsed }}</span
              >
              <span v-else class="cl-countdown">{{
                $t('preMatchBox.live')
              }}</span>
            </div>
            <div v-else>{{ getDate(item.start_time, 'dd/MM,HH:mm') }}</div>
          </div>
        </div>

        <div class="cl-flexcb cl-bottom">
          <div class="cl-left" :class="{ 'cl-live': item.match_type === 2 }">
            <div class="cl-hometeam" @click="goDetailPage(item)">
              {{ item.home_name }}
            </div>

            <div class="cl-awayteam" @click="goDetailPage(item)">
              {{ item.away_name }}
            </div>

            <div
              v-if="where !== 'freeBet'"
              class="cl-markets"
              @click="goDetailPage(item)"
            >
              +{{ item.market_count + ' ' + $t('preMatchBox.market') }}
            </div>
          </div>

          <div v-if="item.live_data && item.live_data.live" class="cl-middle">
            <div>{{ item.live_data.current_score.home_score }}</div>
            <div>{{ item.live_data.current_score.away_score }}</div>
          </div>

          <div class="cl-outcome" :class="{ 'cl-live': item.match_type === 2 }">
            <div class="cl-flexcb cl-outcomeBox">
              <div
                v-if="!(marketId != 18 && marketId != 19 && marketId != 20)"
                :key="'goals' + index"
                class="cl-goals"
              >
                <div
                  tabindex="-1"
                  class="cl-goalsBox"
                  @blur="closeOtherB(index)"
                >
                  <div
                    class="cl-flexcc cl-goalSelected"
                    @click="openGoalSelected(index)"
                  >
                    <div class="cl-odd">
                      {{
                        item.markets[
                          totalGoalsIndexList[marketId] &&
                          totalGoalsIndexList[marketId][index]
                            ? totalGoalsIndexList[marketId][index]
                            : 0
                        ].specifiers.split('=')[1]
                      }}
                    </div>
                    <div
                      class="cl-icon"
                      :class="
                        isGoalsShow[index]
                          ? 'cl-iconRotate-180'
                          : 'cl-iconRotate0'
                      "
                    />
                  </div>
                  <CollapseTransition>
                    <div v-if="isGoalsShow[index]" class="cl-goalsSelect">
                      <template v-for="(goalsItem, goalsIndex) in item.markets">
                        <div
                          v-if="goalsItem.specifiers"
                          :key="goalsIndex"
                          class="cl-flexcc cl-goalsItem"
                          @click.self="selectGoal(index, goalsIndex)"
                        >
                          {{ goalsItem.specifiers.split('=')[1] }}
                        </div>
                      </template>
                    </div>
                  </CollapseTransition>
                </div>
              </div>
              <div
                v-for="outcomeItem in outcomeItemArr(item.markets, index)"
                :key="outcomeItem.id"
                class="cl-flexcc cl-item"
                :class="[
                  arrayCheckOutcome(tickets, outcomeItem.id)
                    ? 'cl-oddsButton'
                    : 'cl-noOddsButton',
                  {
                    outcome2: outcomeLength(item.markets, 2) && marketId !== 18,
                    outcome1: outcomeLength(item.markets, 1)
                  }
                ]"
                @click.self="addToBetslip(item, outcomeItem)"
              >
                <div @click="addToBetslip(item, outcomeItem)">
                  <oddsChange :odds="Number(outcomeItem.odds).toFixed(2)" />
                </div>

                <div
                  v-if="outcomeItem.odds === 1"
                  class="cl-flexcc cl-canNotOddsLock"
                >
                  <div />
                </div>
              </div>
              <div
                v-if="!outcomeItemArr(item.markets, index).length"
                class="cl-flexcc cl-canNotOddsLock"
              >
                <div />
              </div>

              <div
                v-if="item.markets === false || outcomeLength(item.markets, 0)"
                class="cl-flexcc cl-noOddsButton cl-number cl-marketNumberLong"
              >
                <div
                  v-if="item.market_count"
                  class="cl-flexcc cl-markets"
                  @click="goDetailPage(item)"
                >
                  +{{ item.market_count }}
                </div>
                <div v-else class="cl-flexcc cl-canNotOddsLock">
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="index === 0 && where === 'index'" class="cl-bannerBox">
        <claimSCom>
          <template #last>
            <highlightsBanner />
          </template>
        </claimSCom>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import oddsChange from '@/components/components/oddsChange.vue'
import claimSCom from '@/components/components/claimCom/claimSCom.vue'
import highlightsBanner from '@/components/components/highlightsBanner.vue'
import { pubSub } from '@/assets/js/utils/contestListRestore.js'

export default {
  components: {
    oddsChange,
    CollapseTransition: Lib.common.CollapseTransition,
    claimSCom,
    highlightsBanner
  },
  inject: ['addToBetslipFun'],
  props: {
    result: {
      type: Array
    },
    meta: {
      type: Object,
      default: null
    },
    where: {
      type: String
    },
    // eslint-disable-next-line vue/prop-name-casing
    event_name: {
      type: String,
      default: ''
    },
    marketId: {}
  },
  data() {
    return {
      list: [
        {
          name: this.$t('liveTabs.Soccer'),
          icon_choosed: 'icon3',
          id: 1
        },
        {
          name: this.$t('liveTabs.Basketball'),
          icon_choosed: 'icon4',
          id: 2
        },
        {
          name: this.$t('liveTabs.usa'),
          icon_choosed: 'icon5',
          id: 16
        },
        {
          name: this.$t('liveTabs.Rugby'),
          icon_choosed: 'icon6',
          id: 12
        },
        {
          name: this.$t('liveTabs.Tennis'),
          icon_choosed: 'icon8',
          id: 5
        },
        {
          name: this.$t('liveTabs.Cricket'),
          icon_choosed: 'icon7',
          id: 21
        },
        {
          name: this.$t('liveTabs.Volleyball'),
          icon_choosed: 'icon9',
          id: 23
        }
      ],
      time_count: 0, // 更新可视范围数据计时器
      staticInterval: null, // 定时器id
      isGoalsShow: [],
      totalGoalsIndexList: {}
    }
  },
  computed: {
    sportList() {
      return this.$store.state.root.sportList
    },
    tickets() {
      return this.where === 'freeBet'
        ? this.$store.state.freeBet
        : this.$store.state.tickets
    },
    title() {
      return this.$route.meta.title
    },
    // 视图更新
    viewScrollDeBounce() {
      return Lib.common.deBounce(this.visibleRangeMarketReq)
    }
  },
  mounted() {
    if (this.where === 'index') this.enterPage()
  },
  beforeDestroy() {
    this.leavePage()
  },
  methods: {
    closeOtherB(index) {
      // eslint-disable-next-line no-unused-expressions
      this.isGoalsShow[index] ? this.$set(this.isGoalsShow, index, false) : ''
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
    // 可视范围内market数据监听
    visibleRangeWatch() {
      const doms = this.$refs.matchItem
      if (doms && doms.length > 0) {
        const market_ids = doms
          .filter((item) => {
            const data = item.getBoundingClientRect()
            return (
              data.bottom > 0 &&
              data.bottom + 1.3889 * window.rem < document.body.clientHeight
            )
          })
          .map((item) => item.getAttribute('data-market-id'))
        if (market_ids.length > 0) {
          this.$axios_api
            .getMarketInfo({
              market_ids: JSON.stringify(market_ids)
            })
            .then((res) => {
              if (res.data.result && res.data.result.length)
                this.$emit('visibleRangeMarkets', res.data.result)
            })
        }
      }
    },
    // 请求可视范围内market数据
    visibleRangeMarketReq() {
      this.time_count = 0
      this.visibleRangeWatch()
    },
    // 打开goals选择框
    openGoalSelected(index) {
      this.$set(this.isGoalsShow, index, !this.isGoalsShow[index])
    },
    selectGoal(index, goalIndex) {
      if (!this.totalGoalsIndexList[this.marketId])
        this.totalGoalsIndexList[this.marketId] = {}
      this.totalGoalsIndexList[this.marketId][index] = goalIndex
      this.$set(this.isGoalsShow, index, !this.isGoalsShow[index])
    },
    // 是否是bestodds
    isBestOdds(outcome) {
      let bool = true
      if (outcome) {
        outcome.forEach(function (item) {
          if (item.odds < 1.3) bool = false
        })
      } else bool = false
      return bool
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 数组内容查询球类名称
    arrayCheck(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].id) === Number(id)) return arr[i].name
      }
    },
    // 数组内容查询outcome
    arrayCheckOutcome(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return true
      }
      return false
    },
    // icon choose
    arrayCheckIcon(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].id) === Number(id)) return arr[i].icon_choosed
      }
    },
    // 前往详情页面
    goDetailPage(item) {
      if (this.where === 'freeBet') return
      Lib.common.event_statistics('go_match_detail')
      this.$store.commit('setMatchDetailStatus', true)
      this.$router.push({
        path: `/${this.$store.state.root.locale}/match/${item.match_id}`
      })
      // 触发所属组件的事件
      pubSub.publish(this.where)
    },
    // 秒变分钟
    minuteDetal(seconds) {
      return Lib.common.minuteDetal(seconds)
    },
    // 添加到betslip
    addToBetslip(item, outcomeItem) {
      Lib.common.event_statistics(
        'Betslips_Add_Click',
        `Source: ${this.event_name}`
      )

      // 添加到betslip  gift弹出
      this.addToBetslipFun()
      let newTicket = []
      const ticket = {
        match_id: item.match_id,
        start_time: item.start_time,
        sport_id: item.sport_id
          ? item.sport_id
          : this.meta
          ? this.meta.sport_id
          : '',
        country_name: item.country_name
          ? item.country_name
          : this.meta
          ? this.meta.country_name
          : '',
        tournament_name: item.tournament_name
          ? item.tournament_name
          : this.meta
          ? this.meta.tournament_name
          : '',
        tournament_id: item.tournament_id
          ? item.tournament_id
          : this.meta
          ? this.meta.tournament_id
          : '',
        home_name: item.home_name,
        away_name: item.away_name,
        market_id:
          item.markets instanceof Array
            ? item.markets[0].market_id
            : Object.values(item.markets)[0][0].market_id
            ? Object.values(item.markets)[0][0].market_id
            : item.markets.market_id,
        market_name:
          item.markets instanceof Array
            ? item.markets[0].market_name
            : Object.values(item.markets)[0][0].market_name
            ? Object.values(item.markets)[0][0].market_name
            : item.markets.market_name,
        display: outcomeItem.display,
        odds: outcomeItem.odds,
        id: outcomeItem.id,
        match_status: item.match_type === 2 ? 1 : 0
      }

      // 该比赛是否已经选择过outcome
      let bool = false

      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].match_id === ticket.match_id) {
          if (this.tickets[i].id === ticket.id) {
            bool = true
            newTicket = this.tickets.filter((item, index) => {
              return index !== i
            })
          } else {
            bool = true
            newTicket = this.tickets
              .filter((item, index) => {
                return index !== i
              })
              .concat(ticket)
          }
        }
      }

      if (!bool) newTicket = this.tickets.concat(ticket)

      if (this.where === 'freeBet') {
        this.$store.commit('setFreeBet', newTicket)
      } else {
        this.$store.commit('setTickets', newTicket)
        Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify(newTicket)))
      }
    },
    // outcome相关判断
    outcomeItemArr(data, index) {
      if (Array.isArray(data)) {
        if (data.length === 0) return data
        const item = this.totalGoalsIndexList[this.marketId]
        return data[item && item[index] ? item[index] : 0].outcomes
      } else {
        if (data === false) return []
        if (Object.values(data)[0][0].outcomes)
          return Object.values(data)[0][0].outcomes
        if (data.outcomes) return data.outcomes
        return []
      }
    },
    // outcome length相关判断
    outcomeLength(data, len) {
      if (Array.isArray(data)) {
        if (data.length === 0) return 0
        else return data[0].outcomes.length === len
      } else {
        if (data === false) return 0
        if (Object.values(data)[0][0].outcomes)
          return Object.values(data)[0][0].outcomes.length === len
        if (data.outcomes) return data.outcomes.length === len
        return 0
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-preMatchBox-wrap {
  margin-bottom: 5rem/36;

  .cl-matchItem {
    color: #000;
    background-color: #fff;
    padding: 7rem/36 10rem/36;

    .cl-top {
      font-size: 10rem/36;
      color: #a2a2a7;

      .cl-left {
        font-size: 11rem/36;

        .cl-bestOddsBox {
          .cl-bestOdds {
            margin-right: 3rem/36;
            border-radius: 6rem/36;
            padding: 2rem/36 3rem/36;
            background-color: #fcdb06;
            font-size: 7rem/36;
            color: #333;
            text-transform: uppercase;
            white-space: nowrap;
          }
        }

        .cl-hot {
          margin-left: 5rem/36;

          .sprite(@icon-hot, 108rem);
        }

        .cl-icon {
          margin-right: 3rem/36;
        }

        .icon3 {
          .sprite(@tabs-3, 108rem);
        }

        .icon4 {
          .sprite(@tabs-4, 148rem);
        }

        .icon5 {
          .sprite(@tabs-5, 148rem);
        }

        .icon6 {
          .sprite(@tabs-6, 148rem);
        }

        .icon7 {
          .sprite(@tabs-7, 148rem);
        }

        .icon8 {
          .sprite(@tabs-8, 148rem);
        }

        .icon9 {
          .sprite(@tabs-9, 148rem);
        }

        .cl-name {
          white-space: nowrap;
          // margin-left: 3rem/36;

          .cl-line {
            padding: 0 3rem/36;
          }

          // .cl-sportName {
          // }

          .cl-leaguesName {
            font-weight: 300;
            display: inline-block;
            max-width: 215rem/36;
          }
        }
      }
    }

    .cl-right {
      font-weight: 300;
      white-space: nowrap;

      .cl-countdown {
        margin-left: 3rem/36;
        color: #e52f11;
      }
    }

    .cl-bottom {
      margin-top: 8rem/36;
      // height: 42rem/36;

      .cl-left {
        font-size: 11rem/36;
        font-weight: 800;

        > div {
          width: 145rem/36;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &.cl-markets {
            font-weight: 400;
            font-size: 10rem/36;
          }
        }

        &.cl-live {
          > div {
            width: 140rem/36;
          }
        }
      }

      .cl-middle {
        height: 42rem/36;
        color: #e52f11;
        font-weight: bold;
      }

      .cl-outcomeBox {
        position: relative;
        width: 186rem/36;
        height: 33rem/36;

        .cl-item {
          position: relative;
          /deep/ .cl-oddsWord {
            font-weight: 800;
          }
          &.cl-outcome2 {
            width: 90rem/36;
          }
          &.cl-outcome1 {
            width: 186rem/36;
          }
        }

        .cl-goals {
          width: @oddsButtonWidth;
          height: @oddsButtonHeight;
          .cl-goalsBox {
            color: #fd4f30;
            border-radius: @oddsButtonRadius;
            background-color: @noOddsColor;
            overflow: hidden;
            outline: none;
            .cl-goalSelected {
              color: #fd4f30;
              height: @oddsButtonHeight;
              .cl-icon {
                margin-left: 3rem/36;
                .sprite(@ticon-red-down, 108rem);
              }
            }
            .cl-goalsSelect {
              position: relative;
              z-index: 1;
              background-color: @noOddsColor;
              .cl-goalsItem {
                height: @oddsButtonHeight;
              }
            }
          }
        }

        .cl-canNotOddsLock {
          div {
            .sprite(@icon-lock, 108rem);
          }
        }

        .cl-number {
          position: relative;
          font-size: 12rem/36;
          font-weight: 400;
          width: 31rem/36;

          &.cl-marketNumberLong {
            width: 186rem/36;
          }

          .cl-markets {
            width: 100%;
            height: 33rem/36;
          }
        }
      }
    }

    .cl-bannerBox {
      position: absolute;
      left: 0;
    }
  }
}
</style>
