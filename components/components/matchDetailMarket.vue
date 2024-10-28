<template>
  <div
    class="cl-matchDetailMarket-wrap"
    :class="{ 'cl-liveWrap': where === 'live' }"
  >
    <div class="cl-lockShade" v-if="meta.lock && meta.match_status === 1">
      <div class="cl-contentBox">
        <div class="cl-icon">
          <img
            src="@/assets/images/general/notSprites/betslipBox/lock.png"
            alt="lock"
          />
        </div>
        <div class="cl-word">Odds Updating</div>
      </div>
    </div>
    <div
      class="cl-container"
      v-if="meta.match_status === 1 || meta.match_status === 0"
    >
      <div
        class="cl-marketBox"
        :class="{ 'cl-marketsNotShow': showList[index] }"
        v-for="(item, index) in result"
        :key="index"
        ref="ListIndex"
      >
        <matchDetailMarketTop
          @changeCareStatus="changeCareStatus"
          :where="where"
          :item="item"
          :index="index"
          :is-show="!showList[index]"
          @openModal="openModal"
          @changeDetailShow="(b) => $set(showList, b, !showList[b])"
          :key="index"
        />
        <CollapseTransition>
          <div v-show="!showList[index]">
            <div
              v-if="item[0].outcomes && item[0].outcomes.length === 0"
              class="cl-flexcc"
              style="height: calc(70rem / 36)"
            >
              <img
                style="width: calc(47rem / 36)"
                :src="STATICURL + `/images/onebet/loadingLogo${type}.gif`"
                alt="loading"
              />
            </div>
            <div v-else>
              <div class="cl-outcomeBox" v-for="(ma, mi) in item" :key="mi">
                <div
                  class="cl-flexcb cl-outcome"
                  :class="{
                    'cl-outcome1': ma.outcomes.length === 1,
                    'cl-outcome2':
                      ma.outcomes.length === 2 ||
                      ma.outcomes.length === 4 ||
                      ma.market_name.includes('&'),
                    'cl-select': arrayCheckOutcome(tickets, outcomeItem.id),
                    'cl-cannotBet': outcomeItem.odds === 1
                  }"
                  v-for="outcomeItem in ma.outcomes"
                  @click="addToBetslip(ma, outcomeItem)"
                  :key="outcomeItem.id"
                >
                  <div class="cl-Name">{{ outcomeItem.display }}</div>

                  <div class="cl-odd">
                    <div
                      class="cl-flexcc cl-cannotSelect"
                      v-if="outcomeItem.odds === 1"
                    >
                      <div />
                    </div>
                    <oddsChange
                      :odds="Number(outcomeItem.odds).toFixed(2)"
                      v-else
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapseTransition>
      </div>
    </div>

    <div class="cl-locked" v-else>
      <div class="cl-icon" />
      <div class="cl-article">{{ $t('matchDetailMarket.available') }}</div>
      <div class="cl-article1">{{ $t('matchDetailMarket.match') }}</div>
    </div>

    <!-- <matchDetailModel v-if="isModalShow" :text="text" @closeModal="closeModal" /> -->
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import oddsChange from '@/components/components/oddsChange.vue'
//  import matchDetailModel from "@/components/components/matchDetailModel.vue"
import matchDetailMarketTop from '@/components/components/matchDetailMarketTop.vue'

export default {
  components: {
    //  matchDetailModel,
    oddsChange,
    matchDetailMarketTop,
    CollapseTransition: Lib.common.CollapseTransition
  },
  props: {
    market_id: {
      type: String
    },
    result: {
      type: Array
    },
    meta: {
      type: Object
    },
    where: {
      type: String,
      default: ''
    },
    chooseId: {
      type: Number
    }
  },
  data() {
    return {
      isModalShow: 0,
      text: '',
      showList: []
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    tickets() {
      return this.$store.state.tickets
    },
    scrollDeBounce() {
      return Lib.common.deBounce(this.handleScroll, 3000)
    },
    type() {
      return this.where === 'live' ? 'Live' : ''
    }
  },
  watch: {
    market_id: {
      handler() {
        if (!this.market_id) return
        setTimeout(() => {
          const index = this.result.findIndex(
            (a) => this.market_id === a[0].market_id
          )
          // 没有或者下标为0时不操作
          if (index <= 0) return
          this.$refs.ListIndex[index].scrollIntoView({ block: 'center' })
          setTimeout(() => this.$emit('update:market_id', ''))
        }, 100)
      },
      immediate: true
    }
  },
  mounted() {
    // 注册滚动事件
    window.addEventListener('scroll', this.scrollDeBounce, true)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollDeBounce, true)
  },
  methods: {
    // 注册的滚动事件 滚动防抖处理置顶图标
    handleScroll() {
      if (!this.$refs.ListIndex.length) return
      const scrollBottom =
        this.$refs.ListIndex[0].getBoundingClientRect().bottom
      this.$emit('topIconChange', scrollBottom <= 0 ? 1 : 0)
    },
    // open market介绍弹出
    openModal(item) {
      this.isModalShow = 1
      this.text = item.market_description
    },
    // changeCareStatus
    changeCareStatus(data) {
      this.$emit('changeCareStatus', data)
    },
    // close market介绍弹出
    closeModal() {
      this.isModalShow = 0
      this.text = ''
    },
    // 数组内容查询outcome
    arrayCheckOutcome(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return 1
      }
      return 0
    },
    // 添加到betslip
    addToBetslip(item, outcomeItem) {
      Lib.common.event_statistics('Betslips_Add_Click', `Source:match_detail`)

      if (outcomeItem.odds === 1) return

      let newTicket = []
      const ticket = {
        match_id: this.meta.match_id,
        start_time: this.meta.start_time,
        sport_id: this.meta.sport_id,
        country_name: this.meta.country_name,
        tournament_name: this.meta.tournament_name,
        tournament_id: this.meta.tournament_id,
        home_name: this.meta.home_name,
        away_name: this.meta.away_name,
        market_id: item.market_id,
        market_name: item.market_name,
        display: outcomeItem.display,
        odds: outcomeItem.odds,
        id: outcomeItem.id,
        match_status: this.meta.match_status
      }

      // 该比赛是否已经选择过outcome
      let bool = false

      for (let i = 0; i < this.tickets.length; i++) {
        if (this.tickets[i].match_id === ticket.match_id) {
          if (this.tickets[i].id === ticket.id) {
            bool = true
            newTicket = this.tickets.filter((a, b) => b !== i)
          } else {
            bool = true
            newTicket = this.tickets.filter((a, b) => b !== i).concat(ticket)
          }
        }
      }

      if (!bool) newTicket = this.tickets.concat(ticket)

      this.$store.commit('setTickets', newTicket)
      Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify(newTicket)))
    }
  }
}
</script>

<style scoped lang="less">
.cl-matchDetailMarket-wrap {
  position: relative;
  min-height: 100vh;
  padding-bottom: 3rem;

  &.cl-liveWrap {
    .cl-marketBox {
      color: #fff;
      background-color: @footLiveBgColor;

      .cl-outcomeBox {
        .cl-outcome {
          background-color: @liveNoOddsColor;

          &.cl-select {
            background-color: @chooseButton;
            color: @oddsButtonColor;
            /deep/ .cl-oddsWord {
              color: @oddsButtonColor;
            }
          }

          &.cl-cannotBet {
            background-color: @liveNoOddsColor;
            color: #fff;
          }

          .cl-odd {
            position: relative;
            font-weight: bold;

            .cl-cannotSelect {
              div {
                height: 12rem/36;

                .sprite(@icon-lock-white, 300rem);
              }
            }
          }
          /deep/ .cl-oddsWord {
            color: #fff;
          }
        }
      }
    }

    .cl-locked {
      opacity: 0.6;
      color: #fff;

      .cl-icon {
        .sprite(@icon-lock-white, 72rem);
      }
    }
  }

  .cl-lockShade {
    overflow: hidden;
    position: absolute;
    z-index: 1;
    width: 10rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    min-height: 6rem;

    .cl-contentBox {
      text-align: center;
      margin: 80rem/36 auto 0;

      .cl-icon {
        img {
          width: 37rem/36;
          height: 44rem/36;
        }
      }

      .cl-word {
        text-align: center;
        color: #fff;
        font-size: 12rem/36;
        padding-top: 10rem/36;
      }
    }
  }

  .cl-marketBox {
    text-transform: uppercase;
    font-size: 11rem/36;
    margin: 10rem/36 10rem/36 0;
    background-color: #fff;
    border-radius: 6rem/36;
    box-sizing: border-box;
    padding: 0 0 5rem/36;
    color: #363636;

    &.cl-marketsNotShow {
      padding: 0;
    }

    .cl-outcomeBox {
      padding: 0 10rem/36;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;

      .cl-outcome {
        position: relative;
        background-color: @noOddsColor;
        border-radius: 17rem/36;
        width: 102.6rem/36;
        height: 33rem/36;
        margin-bottom: 7rem/36;
        margin-right: 4rem/36;
        overflow: hidden;
        box-sizing: border-box;
        padding: 10rem/36;
        font-weight: bold;

        &.cl-cannotBet {
          background-color: #c9c9c9;
          color: #363636;
        }

        &.cl-select {
          background-color: @liveOddsColor;
        }

        .cl-Name {
          width: 58rem/36;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .cl-odd {
          position: relative;

          .cl-cannotSelect {
            div {
              height: 12rem/36;

              .sprite(@icon-lock, 108rem);
            }
          }
        }

        &.cl-outcome2 {
          width: 156rem/36;

          .cl-Name {
            width: 100rem/36;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        &.cl-outcome1 {
          width: 320rem/36;
        }
      }
    }
  }

  .cl-locked {
    text-align: center;
    padding: 1.5rem 0;

    .cl-icon {
      margin: 0 auto;
      .sprite(@icon-lock, 18rem);
    }

    .cl-article {
      font-weight: bold;
      font-size: 14rem/36;
      margin-top: 10rem/36;
      margin-bottom: 5rem/36;
    }
  }

  .slide-right-enter-active,
  .cl-slide-right-leave-active {
    will-change: transform;
    transition: all 300ms linear;
    position: absolute;

    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;

    -webkit-perspective: 1000;
    -moz-perspective: 1000;
    -ms-perspective: 1000;
    perspective: 1000;
  }

  .cl-slide-right-enter {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    -moz-transform: translate3d(-100%, 0, 0);
    -ms-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  .cl-slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    -moz-transform: translate3d(100%, 0, 0);
    -ms-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}
</style>
