<template>
  <div class="cl-liveFavorite-wrap">
    <div class="cl-matches" v-if="result.length > 0">
      <div v-for="(item, index) in result" :key="index">
        <div class="cl-matchItem" ref="matchItem" @click="goToDetail(item)">
          <div class="cl-top cl-flexcb">
            <div class="cl-left cl-flexcs">
              <div class="cl-icon cl-icon003" />
              <div class="cl-name cl-flexcc">
                <span class="cl-leaguesName cl-oneLine">
                  <!-- {{ meta ? meta.country_name : item.cn }} -->
                  {{ item.cn }}
                  -
                  <!-- {{ meta ? meta.tournament_name : item.tn }} -->
                  {{ item.tn }}
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

          <!--          <matchDetailMarketTop-->
          <!--            @changeCareStatus="changeCareStatus"-->
          <!--            where="live"-->
          <!--            liveFavorite="live"-->
          <!--            :item="marketItem"-->
          <!--            :index="marketIndex"-->
          <!--            :key="marketIndex"-->
          <!--          ></matchDetailMarketTop>-->
          <div class="cl-bottom">
            <div class="cl-itemM cl-flexcc">
              <div class="cl-tM cl-tMl">
                <div class="cl-teamName cl-tnl">{{ item.hn }}</div>
                <img class="cl-teamIcon" v-lazy="item.hlogo" />
              </div>
              <div class="cl-tMm">
                <template v-if="item.ld && item.ld.live">
                  <div>
                    {{ item.ld.cs.hs }}
                    -
                    {{ item.ld.cs.as }}
                  </div>
                  <div class="cl-liveTime">
                    {{ item.ld.te === '0' ? '00:00' : item.ld.te }}
                  </div>
                </template>
                <template v-else>
                  <div>{{ getDate(item.st, 'HH:mm') }}</div>
                  <div>{{ getDate(item.st, 'dd/MM') }}</div>
                </template>
              </div>
              <div class="cl-tM">
                <img class="cl-teamIcon" v-lazy="item.alogo" />
                <div class="cl-teamName">{{ item.an }}</div>
              </div>
            </div>
            <template v-for="(obj, marketId) in item.ms">
              <div class="cl-itemB" :key="marketId" v-if="item.ms[marketId]">
                <matchDetailMarketTop
                  @changeCareStatus="changeCareStatus"
                  where="live"
                  live-favorite="live"
                  :item="item.ms[marketId]"
                  :key="marketId"
                  :favorite-market-list="favoriteMarketList"
                ></matchDetailMarketTop>
                <div
                  class="cl-marketBox"
                  v-for="(ms, index) in item.ms[marketId]"
                  :key="index"
                >
                  <template v-if="ms.os.length">
                    <div
                      class="cl-marketA"
                      :class="
                        arrayCheckOutcome(tickets, a.i)
                          ? 'cl-selectColor'
                          : 'cl-defaultColor'
                      "
                      v-for="a in ms.os"
                      :key="a.i"
                      @click.stop="addToBetslip(item, a, 0, marketId)"
                    >
                      <div
                        class="cl-dWord"
                        :class="{
                          'cl-displayWord': !String(a.n).includes('or')
                        }"
                        :style="{
                          width:
                            (ms.os.length === 3 ? 48 / 36 : 100 / 36) + 'rem'
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
      </div>
    </div>
    <div class="cl-myFavorite" v-else>
      <div class="cl-noFavoriteImage">
        <img
          src="@/assets/images/general/notSprites/live/myFavoride.png"
          alt="onebet pointer"
        />
      </div>

      <div class="cl-art">
        <span>Click the icon</span>
        <div class="cl-care"></div>
        <span>to add the</span>
        <br />
        <span>market to my favorite.</span>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import matchDetailMarketTop from '@/components/components/matchDetailMarketTop.vue'
import oddsChange from '@/components/components/oddsChange.vue'
import { pubSub } from '@/assets/js/utils/contestListRestore.js'

export default {
  name: '',
  components: {
    matchDetailMarketTop,
    oddsChange
  },
  props: {
    result: {
      type: Array
    },
    favoriteMarketList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    tickets() {
      return this.$store.state.tickets
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {},
  methods: {
    changeCareStatus(data) {
      this.$emit('changeCareStatus', data)
    },
    // 置顶
    istop(item) {
      this.$emit('istop', item)
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
    // 前往详情页
    goToDetail(item) {
      Lib.common.event_statistics('live_favorite_go_match_detail')
      this.$store.commit('setMatchDetailStatus', true)
      this.$router.push({
        path: `/${this.$store.state.root.locale}/match/${item.i}?from=live`
      })
      pubSub.publish('live')
    },
    // 添加到betslip
    addToBetslip(item, outcomeItem, index, marketId) {
      if (outcomeItem.o === 1) {
        return
      }

      Lib.common.event_statistics('Betslips_Add_Click', `Source:favorite`)

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
        match_status: 1
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cl-liveFavorite-wrap {
  .cl-matches {
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
            opacity: 0.6;
            .sprite(@tabs-003, 148rem);
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
            display: flex;
            align-items: center;
            flex-direction: column;

            .cl-liveTime {
              font-weight: 400;
              color: @selectAddsColor;
            }
          }
        }

        .cl-itemB {
          overflow: hidden;
          font-size: 11rem/36;
          //padding-bottom: 7rem/36;

          .cl-marketTitle {
            color: @liveNameColor;
            margin-bottom: 7rem/36;
            text-transform: uppercase;
          }

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

  .cl-myFavorite {
    padding-bottom: 50rem/36;
    .cl-noFavoriteImage {
      width: 238rem/36;
      height: 182rem/36;
      opacity: 0.8;
      margin: 30rem/36 auto 0;

      img {
        width: 238rem/36;
        height: 182rem/36;
      }
    }

    .cl-art {
      text-align: center;
      color: white;

      .cl-care {
        display: inline-block;
        .sprite(@ticon--not-star, 108rem);
      }
    }
  }
}
</style>
