<template>
  <div
    class="cl-betslipRelatedBets-wrap"
    v-if="tickets.length > 0 && dataList.length > 0"
  >
    <div class="cl-betslipRelatedBets-top">
      <h2 class="cl-h2">{{ $t('betslipRelatedBets.title') }}</h2>
    </div>

    <template v-if="!isLoadingShow">
      <div class="cl-betslipRelatedBets-scrollBox" ref="featuredWrapper">
        <div class="cl-flexcs cl-cont cl-getLeft" ref="featuredMenuCont">
          <div
            class="cl-indexCardShadow cl-cont-item"
            v-for="(item, index) in dataList"
            :key="item.match_id + '' + index"
            @click="goDetailPage(item)"
          >
            <div class="cl-flexcb cl-itemT">
              <div class="cl-tTl">
                <div :class="checkIcon(item.sport_id)" />
                <div class="cl-oneLine cl-titleName">
                  {{ item.country_name + ' - ' + item.tournament_name }}
                </div>
                <div
                  class="cl-liveIcon"
                  v-if="item.live_data && item.live_data.live"
                />
              </div>
              <div class="cl-tTr">
                <div class="cl-marketCount">
                  {{ '+' + item.market_count + ' ' + $t('preMatchBox.market') }}
                </div>
              </div>
            </div>
            <div class="cl-flexcc cl-itemM">
              <div class="cl-tM cl-tMl">
                <div class="cl-threeLine cl-teamName cl-tnl">
                  {{ item.home_name }}
                </div>
                <img class="cl-teamIcon" v-lazy="item.home_team_logo" />
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
                <img class="cl-teamIcon" v-lazy="item.away_team_logo" />
                <div class="cl-threeLine cl-teamName">{{ item.away_name }}</div>
              </div>
            </div>
            <div class="cl-itemB">
              <div class="cl-marketTitle">{{ item.markets.market_name }}</div>
              <div class="cl-marketBox">
                <template
                  v-if="
                    Array.isArray(item.markets.outcomes) &&
                    item.markets.outcomes.length &&
                    !item.markets.qdLock
                  "
                >
                  <div
                    class="cl-flexcb cl-marketA"
                    :class="
                      arrayCheckOutcome(tickets, a.id)
                        ? 'cl-oddsButton'
                        : 'cl-noOddsButton'
                    "
                    v-for="a in item.markets.outcomes"
                    :key="a.id"
                    @click.stop="addToBetslip(item, a)"
                  >
                    <div
                      class="cl-oneLine"
                      :class="{
                        'cl-displayWord': !String(a.display).includes('or')
                      }"
                      :style="{
                        width:
                          (item.markets.outcomes.length === 3
                            ? 40 / 36
                            : 80 / 36) + 'rem'
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
          </div>
        </div>
      </div>
    </template>
    <div class="cl-flexcc cl-dataLoadingClass" v-if="isLoadingShow">
      <dataLoading />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Lib from '@/assets/js/Lib'
import oddsChange from '@/components/components/oddsChange.vue'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  name: 'BetslipRelatedBets',
  components: { oddsChange },
  data() {
    return {
      dataList: [],
      isLoadingShow: true,
      scroll: null // 滚动实例
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    tickets() {
      return this.$store.state.tickets
    },
    ticketsIds() {
      return this.$store.state.tickets.map((item) => item.id)
    },
    // 联赛id
    ticketsTid() {
      return this.$store.state.tickets.map((item) => item.tournament_id)
    },
    // 比赛id
    ticketsMid() {
      return this.$store.state.tickets.map((item) => item.match_id)
    },
    locale() {
      return this.$store.state.root.locale
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    }
  },
  watch: {
    ticketsMid(newValue, oldValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        if (newValue.length === 0) {
          this.scroll = null
          this.dataList = []
        } else if (this.routeName === 'betslip') this.getData()
      }
    }
  },
  mounted() {
    contestListRestore.call(
      this,
      'BetSlipRelate',
      ['dataList'],
      [],
      null,
      (x) => {
        if (this.dataList) {
          this.tabsInit(x)
        }
      }
    )
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('betSlip', this.saveContestList)

    if (this.tickets.length && !this.dataList.length) {
      this.getData()
    } else {
      this.isLoadingShow = false
    }
  },
  destroyed() {
    pubSub.unSubscribe('betSlip', this.saveContestList)
  },
  methods: {
    // tabs 初始化事件
    tabsInit(startX) {
      this.$nextTick(() => {
        const width = (this.dataList.length * 304 - 7) / 36 // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
        const dom = this.$refs.featuredMenuCont
        if (!dom) return
        dom.style.width = width + 'rem' // 修改滚动区域的宽度
        this.scroll
          ? this.scroll.refresh()
          : (this.scroll = new BScroll(this.$refs.featuredWrapper, {
              startX, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
              click: true,
              scrollX: true,
              scrollY: false,
              swipeTime: 1000, // 设置 momentum 动画的动画时长
              deceleration: 0.001, // 表示 momentum 动画的减速度
              eventPassthrough: 'vertical'
            }))
      })
    },
    // 获取数据
    getData() {
      this.isLoadingShow = true
      this.$axios_api
        .relatedBetMatchNew({
          // tid: JSON.stringify(this.ticketsTid),
          // mid: JSON.stringify(this.ticketsMid)
          token: this.token,
          bet_outcomes: JSON.stringify(this.ticketsIds)
        })
        .then((res) => {
          this.isLoadingShow = false
          if (res.code === 0) {
            this.dataList = res.data.data
            if (Array.isArray(this.dataList) && this.dataList.length > 0) {
              this.tabsInit(0)
            } else {
              this.isLoadingShow = false
            }
          }
        })
        .catch((e) => {
          this.isLoadingShow = false
          console.log(e)
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 数组内容查询outcome
    arrayCheckOutcome(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return 1
      }
      return 0
    },
    // 前往详情页面
    goDetailPage(item) {
      Lib.common.event_statistics('related_go_match_detail')
      this.$store.commit('setMatchDetailStatus', true)
      this.$router.push({
        path: `/${this.locale}/match/${item.match_id}`
      })
      pubSub.publish('betSlip')
    },
    // 添加到betslip
    addToBetslip(item, outcomeItem) {
      Lib.common.event_statistics('related_add_to_bet')
      if (outcomeItem.odds < 1.02) {
        return
      }
      let newTicket = []
      const ticket = {
        match_id: item.match_id,
        start_time: item.start_time,
        sport_id: item.sport_id,
        country_name: item.country_name,
        tournament_name: item.tournament_name,
        tournament_id: item.tournament_id,
        home_name: item.home_name,
        away_name: item.away_name,
        market_id: item.markets.market_id,
        market_name: item.markets.market_name,
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
    saveContestList() {
      contestListSave.call(this, ['dataList', 'preMatchScroll'], '.cl-getLeft')
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipRelatedBets-wrap {
  background-color: #fff;
  overflow: hidden;
  padding-bottom: 10/36rem;

  .cl-betslipRelatedBets-top {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 13/36rem;
    padding: 10/36rem;
    color: #000;
    font-weight: bold;
    line-height: 12/36rem;
  }

  .cl-betslipRelatedBets-scrollBox {
    width: 10rem;
    padding-bottom: 3rem/36;
    box-sizing: border-box;
    overflow: hidden;

    .cl-cont {
      padding: 2rem/36 10/36rem;

      .cl-cont-item {
        width: 297/36rem;
        // height: 113/36rem;
        padding: 10/36rem;
        border-radius: 6/36rem;
        margin-right: 7/36rem;
        box-sizing: border-box;

        .cl-itemT {
          font-size: 10rem/36;
          .cl-tTl {
            display: flex;
            align-items: center;
            .cl-titleName {
              color: #a2a2a7;
              max-width: 160rem/36;
              margin-left: 3rem/36;
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
          padding: 10rem/36 0 5rem/36;
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
              width: 85rem/36;
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
            white-space: nowrap;
            font-weight: 400;
            .cl-liveTime {
              color: #e52f10;
            }
          }
        }
        .cl-itemB {
          font-size: 11rem/36;
          font-weight: 800;
          .cl-marketTitle {
            color: #333;
            font-weight: 400;
            margin-bottom: 7rem/36;
            text-transform: uppercase;
          }
          .cl-marketBox {
            position: relative;
            display: flex;
            height: 33rem/36;

            .cl-marketA {
              position: relative;
              color: #000;
              flex: 1;
              padding: 0 10rem/36;
              margin-right: 3rem/36;
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
      }
    }
  }

  .cl-dataLoadingClass {
    max-height: 92.08/36rem;
  }

  .cl-liveIcon {
    margin-left: 4rem/36;
    .sprite(@ticon-is-live, 108rem);
  }

  .cl-lockIcon {
    .sprite(@icon-lock, 108rem);
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
