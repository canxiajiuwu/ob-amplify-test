<template>
  <div class="cl-preMatchFeatureMatch-new-wrap">
    <div class="cl-flexcb cl-preMatchFeatureMatch-top" @click.stop="goFeatured">
      <div class="cl-flexcc cl-left">
        <div v-if="type === 'worldCup'" class="cl-worldCupIcon" />
        <div v-else class="cl-hot" />
        <h2 class="cl-h2 cl-name">
          {{
            type === 'worldCup'
              ? $t('worldCup.title')
              : $t('featuredMatch.title')
          }}
        </h2>
      </div>
      <div class="cl-flexcc cl-right">
        <div class="cl-icon" />
      </div>
    </div>
    <div class="cl-preMatchFeatureMatchSBox">
      <div
        v-if="!isLoadingShow"
        ref="featuredWrapper"
        class="cl-preMatchFeatureMatch-scrollBox"
      >
        <div ref="featuredMenuCont" class="cl-flexcs cl-cont cl-getLeft">
          <div
            v-for="(item, index) in gameList"
            :key="isFeaturedShow + '' + index"
            class="cl-indexCardShadow cl-cont-item"
            @click.stop="goDetailPage(item)"
          >
            <div v-if="item.event_status === 1" class="cl-liveIcon" />
            <div class="cl-flexcc cl-top">
              <div class="cl-threeLine cl-homeName cl-teamName">
                {{ item.home_name }}
              </div>
              <div class="cl-homeIcon cl-teamIcon">
                <img
                  v-lazy="item.home_team_logo"
                  :onerror="defaultImg"
                  alt="home_team_logo"
                />
              </div>
              <div
                v-if="item.live_data && item.live_data.live"
                class="cl-contentBox"
              >
                <div class="cl-score">
                  {{ item.live_data.current_score.home_score }}
                  -
                  {{ item.live_data.current_score.away_score }}
                </div>
                <div class="cl-flexcc cl-time cl-liveTime">
                  {{
                    item.live_data.time_elapsed === '0'
                      ? '00:00'
                      : item.live_data.time_elapsed
                  }}
                </div>
              </div>
              <div v-else class="cl-contentBox">
                <div class="cl-score">
                  {{ getDate(item.start_time, 'HH:mm') }}
                </div>
                <div class="cl-preTime">
                  {{ getDate(item.start_time, 'dd/MM') }}
                </div>
              </div>
              <div class="cl-awayIcon cl-teamIcon">
                <img
                  v-lazy="item.away_team_logo"
                  :onerror="defaultImg"
                  alt="away_team_logo"
                />
              </div>
              <div class="cl-threeLine cl-awayName cl-teamName">
                {{ item.away_name }}
              </div>
            </div>
            <div
              v-if="item.markets && item.markets.outcomes.length"
              class="cl-flexcb cl-middle"
            >
              <div
                v-for="(innerItem, innerIndex) in item.markets.outcomes"
                :key="innerIndex"
                class="cl-flexcb cl-item"
                :class="
                  arrayCheckOutcome(tickets, innerItem.id)
                    ? 'cl-oddsButton'
                    : 'cl-noOddsButton'
                "
                @click.stop="addToBetslip(item, innerItem)"
              >
                <div class="cl-display">{{ innerItem.display }}</div>
                <div class="cl-odds">{{ innerItem.odds.toFixed(2) }}</div>
                <div
                  v-if="innerItem.odds === 1"
                  class="cl-flexcc cl-noOddsButton cl-cannotSelect"
                >
                  <div />
                </div>
              </div>
            </div>
            <div v-else class="cl-flexcb cl-middle">
              <div v-for="a in 3" :key="a" class="cl-flexcb cl-item">
                <div class="cl-flexcc cl-noOddsButton cl-cannotSelect">
                  <div />
                </div>
              </div>
            </div>

            <div class="cl-oneLine cl-bottom">
              {{ item.country_name }} - {{ item.tournament_name }}
            </div>
          </div>
        </div>
      </div>
      <dataLoading v-if="isLoadingShow" />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Lib from '@/assets/js/Lib'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  data() {
    return {
      gameList: [],
      isLoadingShow: 1,
      isFeaturedShow: 0,
      // isPreMatchFeaturedMatch: true,
      timeStamp: new Date().getTime(),
      type: ''
    }
  },
  // deactivated () {
  //   this.isPreMatchFeaturedMatch = false;
  // },
  computed: {
    tickets() {
      return this.$store.state.tickets
    },
    defaultImg() {
      return (
        'this.src="' +
        require('@/assets/images/general/notSprites/logo/default-logo.png') +
        '"'
      )
    }
  },
  mounted() {
    this.isFeaturedShow++
    // this.isPreMatchFeaturedMatch = true;
    contestListRestore.call(
      this,
      'PreMatchFeatureMatch',
      ['gameList'],
      [],
      null,
      (x) => {
        if (this.gameList) {
          this.tabsInit(x)
        }
      }
    )

    if (!this.gameList || this.gameList.length === 0) {
      this.getFeatureMatch()
    } else {
      this.isLoadingShow = 0
    }
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('index', this.saveContestList)
    // if (this.isFeaturedShow !== 1) {
    //   let nowStamp = new Date().getTime();
    //   //设置5分钟缓存时间，超过5分钟重新请求featured match数据
    //   if (nowStamp - this.timeStamp > 5 * 60 * 1000) {
    //     this.isLoadingShow = 1;
    //     this.getFeatureMatch();
    //   } else {
    //     this.tabsInit();
    //   }
    // } else {
    //   this.isFeaturedShow++;
    // }
  },
  destroyed() {
    pubSub.unSubscribe('index', this.saveContestList)
  },
  methods: {
    // tabs 初始化事件
    tabsInit(startX) {
      this.$nextTick(() => {
        const width = (this.gameList.length * 264) / 36 // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
        const dom = this.$refs.featuredMenuCont
        if (!dom) return
        dom.style.width = width + 'rem' // 修改滚动区域的宽度
        // eslint-disable-next-line no-new
        new BScroll(this.$refs.featuredWrapper, {
          startX, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
          click: true,
          scrollX: true,
          scrollY: false,
          swipeTime: 1000, // 设置 momentum 动画的动画时长
          deceleration: 0.001, // 表示 momentum 动画的减速度
          eventPassthrough: 'vertical'
        })
      })
    },
    // 获取首页 feature match
    getFeatureMatch() {
      this.isLoadingShow = 1
      this.$axios_api
        .featuredMatchHome({})
        .then((res) => {
          this.isLoadingShow = 0
          if (res.code === 0) {
            this.gameList = res.data.data
            Lib.common.event_statistics('home_feature_match_render')
          }
        })
        .then(() => this.tabsInit(0))
        .catch(() => {
          this.isLoadingShow = 0
          this.$emit('iserr')
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 前往更多feature match页面
    goFeatured() {
      Lib.common.event_statistics('open_more_featured_match')
      this.$router.push({ path: `/${this.$store.state.root.locale}/featured` })
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
      Lib.common.event_statistics('go_match_detail_featured')
      this.$store.commit('setMatchDetailStatus', true)
      this.$router.push({
        path: `/${this.$store.state.root.locale}/match/${item.match_id}`
      })
      pubSub.publish('index')
    },
    saveContestList() {
      contestListSave.call(this, ['gameList', 'preMatchScroll'], '.cl-getLeft')
    },
    // 添加到betslip
    addToBetslip(item, outcomeItem) {
      Lib.common.event_statistics(
        'Betslips_Add_Click',
        `Source: featured_match`
      )

      if (outcomeItem.odds < 1.02) return
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
    }
  }
}
</script>

<style scoped lang="less">
.cl-preMatchFeatureMatch-new-wrap {
  background-color: #fff;
  overflow: hidden;

  .cl-preMatchFeatureMatch-top {
    height: 30rem/36;
    box-sizing: border-box;
    font-size: 10rem/36;
    padding: 0 10rem/36;

    .cl-left {
      .cl-hot {
        margin-right: 5rem/36;
        .sprite(@ticon-hot, 108rem);
      }

      .cl-worldCupIcon {
        margin-right: 5rem/36;
        .sprite(@world-cup-world-cup-icon, 108rem);
      }

      .cl-name {
        font-size: 11rem/36;
        color: #000;
        font-weight: bold;
      }
    }

    .cl-right {
      .cl-icon {
        .sprite(@ticon-back-grey, 108rem);
      }
    }
  }

  .cl-preMatchFeatureMatchSBox {
    width: 10rem;
    height: 105rem/36;
    box-sizing: border-box;
    overflow: hidden;
  }

  .cl-preMatchFeatureMatch-scrollBox {
    width: 10rem;
    height: 105rem/36;
    box-sizing: border-box;
    overflow: hidden;

    .cl-cont {
      padding: 1rem/36 10rem/36;

      .cl-cont-item {
        position: relative;
        width: 257rem/36;
        height: 100rem/36;
        box-sizing: border-box;
        padding: 0 10rem/36;
        border-radius: 6rem/36;
        margin-right: 7rem/36;

        .cl-liveIcon {
          position: absolute;
          top: 6rem/36;
          left: 5rem/36;
          .sprite(@ticon-is-live, 108rem);
        }

        .cl-top {
          padding: 16rem/36 0 6rem/36;
          height: 22rem/36;
          font-size: 10rem/36;
          font-weight: bold;
          color: #000;

          .cl-teamName {
            width: 76rem/36;
            max-height: 28rem/36;
            -webkit-line-clamp: 2;
          }

          .cl-homeName {
            padding-right: 6rem/36;
            text-align: right;
          }

          .cl-awayName {
            padding-left: 6rem/36;
            text-align: left;
          }

          .cl-teamIcon {
            width: 22rem/36;
            height: 22rem/36;

            img {
              width: 22rem/36;
              height: 22rem/36;
            }
          }

          .cl-contentBox {
            width: 42rem/36;
            font-weight: 400;
            text-align: center;

            .cl-time {
              white-space: nowrap;

              &.cl-liveTime {
                color: #e52f10;
              }
            }
          }
        }

        .cl-middle {
          font-weight: 800;
          color: #000;
          .cl-noOddsButton {
            font-size: 11rem/36;
          }

          .cl-oddsButton {
            font-size: 11rem/36;
          }

          .cl-item {
            position: relative;
            width: 77rem/36;
            height: 33rem/36;
            font-size: 12rem/36;
            box-sizing: border-box;
            padding: 0 10rem/36;

            .cl-cannotSelect {
              position: absolute;
              left: 0;
              width: 100%;
              //background-color: @addsLockBgColor;
              div {
                .sprite(@icon-lock, 108rem);
              }
            }
          }
        }

        .cl-bottom {
          color: #cdcdcd;
          font-size: 9rem/36;
          padding-top: 6rem/36;
          width: 100%;
        }
      }
    }
  }
}
</style>
