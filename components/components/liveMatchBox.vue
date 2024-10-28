<template>
  <div class="cl-preMatchBox-wrap" :class="{ 'cl-isUpcoming': is_upcoming }">
    <div v-for="(item, index) in resultFun(result)" :key="'matchItem_' + index">
      <div
        ref="matchItem"
        class="cl-matchItem"
        :data-match-id="item.i"
        @click="goDetailPage(item)"
      >
        <div class="cl-top cl-flexcb">
          <div class="cl-left cl-flexcs">
            <div
              class="cl-icon"
              :class="arrayCheckIcon(list, meta ? meta.sport_id : item.si)"
            />
            <div class="cl-name cl-flexcc">
              <span class="cl-leaguesName cl-oneLine">
                {{ meta ? meta.country_name : item.cn }}
                -
                {{ meta ? meta.tournament_name : item.tn }}
              </span>
            </div>
          </div>

          <div class="cl-right">
            <div class="cl-markets cl-flexcs">
              <div class="cl-moreMarkets">
                +{{ item.mc + ' ' + $t('preMatchBox.market') }}
              </div>
              <div class="cl-icon" @click.stop="istop(item)" />
            </div>
          </div>
        </div>

        <div class="cl-bottom">
          <div class="cl-itemM cl-flexcc">
            <div class="cl-tM cl-tMl">
              <div class="cl-teamName cl-tnl">{{ item.hn }}</div>
              <img v-lazy="item.hlogo" class="cl-teamIcon" />
            </div>
            <div class="cl-tMm">
              <template v-if="item.ld && item.ld.live">
                <div>
                  {{ item.ld.cs.hs }}
                  -
                  {{ item.ld.cs.as }}
                </div>
                <div class="cl-liveTime">
                  {{
                    item.ld.te === '0'
                      ? item.ld.s
                        ? item.ld.s
                        : '00:00'
                      : item.ld.te
                  }}
                </div>
              </template>
              <template v-else>
                <div class="cl-upcomingDate">
                  <div>{{ getDate2(item.st) }}</div>
                  <div>{{ getDate(item.st, 'HH:mm') }}</div>
                </div>
              </template>
            </div>
            <div class="cl-tM">
              <img v-lazy="item.alogo" class="cl-teamIcon" />
              <div class="cl-teamName">{{ item.an }}</div>
            </div>
          </div>
          <template v-for="(marketId, index) in matchId">
            <div
              v-if="item.ms[marketId]"
              :key="'itemB_' + index"
              class="cl-itemB"
            >
              <matchDetailMarketTop
                :key="index"
                where="live"
                live-favorite="live"
                :item="item.ms[marketId]"
                :favorite-market-list="favoriteMarketList"
                @changeCareStatus="changeCareStatus"
              ></matchDetailMarketTop>
              <div
                v-for="(ms, index) in item.ms[marketId]"
                :key="'marketBox_' + index"
                class="cl-marketBox"
              >
                <template v-if="ms.os.length">
                  <div
                    v-for="a in ms.os"
                    :key="a.i"
                    class="cl-marketA"
                    :class="
                      arrayCheckOutcome(tickets, a.i)
                        ? 'cl-selectColor'
                        : 'cl-defaultColor'
                    "
                    @click.stop="addToBetslip(item, a, 0, marketId)"
                  >
                    <div
                      class="cl-dWord"
                      :class="{ 'cl-displayWord': !String(a.n).includes('or') }"
                      :style="{
                        width: (ms.os.length === 3 ? 48 / 36 : 110 / 36) + 'rem'
                      }"
                    >
                      {{ a.n }}
                    </div>
                    <oddsChange
                      :odds="Number(a.o).toFixed(2)"
                      :font-size-num="11 / 36"
                    />
                    <template v-if="a.o == 1">
                      <div class="cl-lockBox">
                        <div class="cl-lockIcon" />
                      </div>
                    </template>
                  </div>
                </template>
                <template v-else>
                  <div class="cl-lockBox">
                    <div class="cl-lockIcon" />
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!--      <div class="cl-crashGameBannerBox" v-if="index === 0">-->
      <!--        <slot name="banner" />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import oddsChange from '@/components/components/oddsChange.vue'
import matchDetailMarketTop from '@/components/components/matchDetailMarketTop.vue'
import { pubSub } from '@/assets/js/utils/contestListRestore.js'

export default {
  components: {
    oddsChange,
    matchDetailMarketTop
  },
  props: {
    result: {
      type: Array
    },
    meta: {
      type: Object,
      default: null
    },
    matchId: {},
    event_name: {
      type: String,
      default: ''
    },
    is_upcoming: {
      type: [String, Number],
      default: 0
    },
    favoriteMarketList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: [
        {
          name: this.$t('liveTabs.Soccer'),
          icon: 'cl-icon003',
          id: 1
        },
        {
          name: this.$t('liveTabs.Basketball'),
          icon: 'cl-icon004',
          id: 2
        },
        {
          name: this.$t('liveTabs.usa'),
          icon: 'cl-icon005',
          id: 16
        },
        {
          name: this.$t('liveTabs.Rugby'),
          icon: 'cl-icon006',
          id: 12
        },
        {
          name: this.$t('liveTabs.Tennis'),
          icon: 'cl-icon008',
          id: 5
        },
        {
          name: this.$t('liveTabs.Cricket'),
          icon: 'cl-icon007',
          id: 21
        },
        {
          name: this.$t('liveTabs.Volleyball'),
          icon: 'cl-icon009',
          id: 23
        }
      ],
      time_count: 0, // 更新可视范围数据计时器
      staticInterval: null // 定时器id
    }
  },
  computed: {
    sportList() {
      return this.$store.state.root.sportList
    },
    tickets() {
      return this.$store.state.tickets
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
    if (Array.isArray(this.result) && this.result.length) this.enterPage()
  },
  beforeDestroy() {
    this.leavePage()
  },
  methods: {
    changeCareStatus(data) {
      this.$emit('changeCareStatus', data)
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
          .flatMap((item) => {
            const matchId = item.getAttribute('data-match-id')
            const match = this.result.find((e) => (e.i = matchId))
            return this.matchId.flatMap((marketId) => {
              return match.ms[marketId]
                ? match.ms[marketId].map((market) => market.i)
                : []
            })
          })
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
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 日期格式化2 获取比赛开始是今天or明天
    getDate2(timeStamp) {
      // 今天零点
      const td = new Date(new Date().toLocaleDateString()).getTime()
      // 一天时间戳
      const oneDay = 1000 * 60 * 60 * 24
      // tmd: 明天零点, tsd: 后天零点
      const tmd = td + oneDay
      const tsd = tmd + oneDay
      // 数据的时间戳
      const dataTime = new Date(timeStamp * 1000).getTime()
      // 数组中,下标0为true时代表为今天,下标1为true时代表为明天
      const indexArr = [
        dataTime >= td && dataTime < tmd,
        dataTime >= tmd && dataTime < tsd
      ]
      const tIndex = indexArr.indexOf(true)
      if (tIndex !== -1) return this.$t('liveMatchs.dateName')[tIndex]
      else return this.getDate(timeStamp, 'MM-dd')
    },
    // 数组内容查询球类名称
    arrayCheck(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].id) === Number(id)) {
          return arr[i].name
        }
      }
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
    // icon choose
    arrayCheckIcon(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].id) === Number(id)) {
          return arr[i].icon
        }
      }
    },
    // 前往详情页面
    goDetailPage(item) {
      Lib.common.event_statistics('go_match_detail')
      this.$store.commit('setMatchDetailStatus', true)
      this.$router.push({
        path: `/${this.$store.state.root.locale}/match/${item.i}?from=live`
      })
      pubSub.publish('live')
    },
    // 秒变分钟
    minuteDetal(seconds) {
      return Lib.common.minuteDetal(seconds)
    },
    // 添加到betslip
    addToBetslip(item, outcomeItem, index, marketId) {
      Lib.common.event_statistics('Betslips_Add_Click', `Source:live_bet`)
      if (outcomeItem.o === 1) {
        return
      }

      let newTicket = []
      const ticket = {
        match_id: item.i,
        start_time: item.st,
        sport_id: item.si,
        country_name: item.cn,
        tournament_name: item.tn,
        tournament_id: item.ti,
        home_name: item.hn,
        away_name: item.an,
        market_id: item.ms[marketId][0].i,
        market_name: item.ms[marketId][0].n,
        display: outcomeItem.n,
        odds: outcomeItem.o,
        id: outcomeItem.i,
        match_status: item.mt === 2 ? 1 : 0
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
    istop(item) {
      this.$emit('istop', item)
    },
    // 过滤后的数据
    resultFun(arr) {
      return arr.filter((item) => {
        let bool = false
        for (let i = 0; i < this.matchId.length; i++) {
          if (item.ms[this.matchId[i]]) {
            bool = true
            break
          }
        }

        return bool
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-preMatchBox-wrap {
  margin-bottom: 5rem/36;

  &.cl-isUpcoming {
    padding-top: 9rem/36;
  }

  .cl-crashGameBannerBox {
    position: relative;
    width: 100%;
    height: 56rem/36;
  }

  .cl-matchItem {
    margin: 0 10rem/36 10rem/36;
    border-radius: 6rem/36;
    color: @tabLiveNoColor;
    background-color: @footLiveBgColor;
    padding: 7rem/36 10rem/36 0;
    box-sizing: border-box;

    .cl-top {
      font-size: 10rem/36;

      .cl-left {
        .cl-icon {
          margin-right: 3rem/36;
        }

        .cl-icon003 {
          .sprite(@tabs-3, 108rem);
        }

        .cl-name {
          color: @liveNameColor;
          white-space: nowrap;

          .cl-line {
            padding: 0 3rem/36;
          }

          .cl-leaguesName {
            font-weight: 300;
            display: inline-block;
            max-width: 215rem/36;
          }
        }
      }
    }

    .cl-right {
      color: @liveNameColor;
      font-weight: 300;
      white-space: nowrap;

      //.cl-countdown {
      //  margin-left: 3rem/36;
      //  color: #eb6149;
      //}
      .cl-icon {
        margin-left: 7rem/36;
        .sprite(@icon-top-blue, 108rem);
      }
    }

    .cl-bottom {
      .cl-itemM {
        font-size: 11rem/36;
        color: @liveOddsButtonColor;
        font-weight: bold;
        padding: 12rem/36 0 0;

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
            width: 100rem/36;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .cl-tnl {
            text-align: end;
          }
        }

        .cl-tMl {
          justify-content: flex-end;
        }

        .cl-tMm {
          font-weight: normal;
          display: flex;
          align-items: center;
          flex-direction: column;
          text-align: center;

          .cl-liveTime {
            font-weight: 400;
            color: @selectAddsColor;
          }

          .cl-upcomingDate {
            min-width: 56rem/36;
            color: @liveUpcomingDateColor;
          }
        }
      }

      .cl-itemB {
        overflow: hidden;
        font-size: 11rem/36;
        padding-top: 10rem/108;
        //padding-bottom: 7rem/36;

        .cl-marketBox {
          font-weight: bold;
          position: relative;
          margin-bottom: 7rem/36;
          overflow: hidden;
          display: flex;
          height: 33rem/36;

          .cl-marketA {
            flex: 1;
            height: 33rem/36;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 17rem/36;
            padding: 0 10rem/36;
            margin-right: 3rem/36;
            position: relative;
            background-color: @liveNoOddsColor;

            &.cl-selectColor {
              background-color: #fcdb06;
              color: @liveNoOddsColor;

              /deep/ .cl-oddsWord {
                color: @liveNoOddsColor;
              }
            }

            .cl-dWord {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .cl-displayWord {
              text-transform: capitalize;
            }

            /deep/ .cl-oddsWord {
              color: @tabLiveNoColor;
            }
          }

          .cl-marketA:last-child {
            margin-right: 0;
          }
        }
      }

      .cl-analysis > img {
        height: 12rem/36;
      }
    }
  }

  .cl-lockBox {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: @liveNoOddsColor;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 17rem/36;
  }

  .cl-lockIcon {
    .sprite(@icon-lock-white, 300rem);
  }

  .cl-matchItem:last-child {
    border: none;
  }
}
</style>
