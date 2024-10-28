<template>
  <div class="cl-jackpotsResultsDetail-wrap">
    <div class="cl-header">
      <div class="cl-header_back" @click="goBack" />
      <h3 class="cl-h3 cl-header_title">
        {{ type === 0 ? $t('jackpots.grand') : $t('jackpots.daily') }}
      </h3>
      <div class="cl-flexcb cl-header_2">
        <div class="cl-header_draw">{{ $t('jackpots.draw') }}{{ period }}</div>
        <div class="cl-header_ended">
          {{ $t('jackpots.ended') }}{{ getDate(end_time, 'dd/MM/yy, HH:mm') }}
        </div>
      </div>
    </div>
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <div
          class="cl-winnings_area"
          v-if="type === 0 && meta && meta.award_info.length"
        >
          <div class="cl-winings">{{ $t('jackpots.winnings') }}</div>
          <div
            class="cl-winnings_item"
            v-for="(item, index) in meta.award_info"
            :key="index"
          >
            <span>{{ item.count }} correct:</span>
            {{ item.number_people }} Winners, {{ $t('unit')
            }}{{ addComma(item.award) }}
          </div>
        </div>
        <div class="cl-jackpotBox" v-if="result.length">
          <div
            class="cl-matchItem"
            :class="{ 'cl-abnormalBg': item.event_status > 4 }"
            v-for="(item, index) in result"
            :key="index"
          >
            <div class="cl-flexcb cl-top">
              <div class="cl-flexcs cl-left">
                <div class="cl-name">
                  <span>{{ arrayCheck(sportList, item.sport_id) }}</span>
                  <span>-</span>
                  <span
                    >{{ item.tournament_name }},{{ item.country_name }}</span
                  >
                </div>
              </div>

              <div class="cl-right">
                <span v-if="item.event_status > 4">{{
                  event_status[item.event_status]
                }}</span>
                {{ getDate(item.start_time, 'dd/MM, HH:mm') }}
              </div>
            </div>

            <div class="cl-flexcb cl-bottom">
              <div class="cl-left">
                <div class="cl-hometeam">{{ item.home_name }}</div>
                <div class="cl-awayteam">{{ item.away_name }}</div>
              </div>

              <div class="cl-flexcc cl-outcome">
                <div class="cl-flexcb cl-outcomeBox">
                  <div
                    class="cl-flexcc cl-item"
                    v-for="(outcomeItem, outcomeIndex) in item.markets.outcomes"
                    :key="'outcome' + outcomeIndex"
                    :class="[
                      { 'cl-outcome1': outcomeItem.length === 2 },
                      outcomeItem.winning_outcome === 1
                        ? 'cl-oddsButton'
                        : 'cl-noOddsButton'
                    ]"
                  >
                    <span>{{ outcomeItem.display }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <dataNoResult v-else-if="!result.length" />
      </div>
      <dataLoading v-else />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: 'JackpotsResultsDetail',
  props: {
    period: {
      type: String,
      default: ''
    },
    end_time: {
      type: [String, Number]
    },
    type: {
      type: [Number, String]
    }
  },
  data() {
    return {
      isRequestFailed: false,
      requestLoading: false,
      meta: null,
      result: [],
      event_status: [
        'NotStarted',
        'Live',
        'Suspended',
        'Ended',
        'Finished',
        'Cancelled',
        'Abandoned',
        'Delayed',
        'Unknown',
        'Postponed',
        'Interrupted'
      ]
      /**
       * 比赛状态: @param event_status
       * NotStarted("not_started", 0), 还未开始
       * Live("live", 1), 正在进行
       * Suspended("suspended", 2), 暂停的
       * Ended("ended", 3), 结束的
       * Finished("closed", 4), 完成的
       * 未能正常结束:
       * Cancelled("cancelled", 5), 取消的
       * Abandoned("abandoned", 6), 被抛弃的
       * Delayed("delayed", 7), 延期的
       * Unknown("unknown", 8), 未知的
       * Postponed("postponed", 9), 延期的
       * Interrupted("interrupted", 10); 被打断的
       */
    }
  },
  computed: {
    platform() {
      return this.$store.state.platform
    },
    sportList() {
      return this.$store.state.root.sportList
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$axios_api
        .jackpotMatch({
          platform: this.platform,
          period: this.period
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.meta = res.data.meta
            this.meta.award_info.sort((a, b) => b.count - a.count)
            this.result = res.data.result
          } else this.result = []
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 数组内容查询
    arrayCheck(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].id) === Number(id)) return arr[i].name
      }
    },
    goBack() {
      this.$emit('goBack')
    },
    addComma(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style scoped lang="less">
.cl-jackpotsResultsDetail-wrap {
  padding: 20rem/108 0 0;
  .cl-header {
    position: relative;
    box-sizing: border-box;
    height: 221rem/108;
    padding: 40rem/108 30rem/108 0;
    background: #333;
    color: #fff;
    .cl-header_back {
      position: absolute;
      top: 46rem/108;
      left: 34rem/108;
      .sprite(@icon-back-white, 406rem);
    }
    .cl-header_title {
      font-weight: 700;
      font-size: 40rem/108;
      text-align: center;
    }
    .cl-header_2 {
      padding: 50rem/108 0 0;
      font-size: 30rem/108;
    }
  }
  .cl-winnings_area {
    box-sizing: border-box;
    // height: 253rem/108;
    padding: 20rem/108 30rem/108 32rem/108;
    background: #000;
    color: #fff;
    font-size: 30rem/108;
    .cl-winings {
      font-weight: 700;
      padding: 0 0 14rem/108;
    }
    .cl-winnings_item {
      padding: 16rem/108 0 0;
      span {
        opacity: 0.6;
        padding-right: 10rem/108;
      }
    }
  }
  .cl-jackpotBox {
    padding: 0 0 236rem/108;
    .cl-matchItem {
      box-sizing: border-box;
      height: 222rem/108;
      padding: 20rem/108 30rem/108 0;
      background-color: #fff;
      border-radius: 3rem/36;
      border-bottom: 0.5rem/36 solid #d4dae1;
      &:last-child {
        border-bottom: none;
      }
      &.cl-abnormalBg {
        background: #ebebeb;
      }
      .cl-top {
        font-size: 30rem/108;
        color: #939695;
        .cl-left {
          .cl-name {
            width: 240rem/36;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .cl-right {
          span {
            color: #363636;
            font-weight: 600;
            padding-right: 30rem/108;
          }
        }
      }
      .cl-bottom {
        margin-top: 8rem/36;
        height: 33rem/36;
        .cl-left {
          font-weight: 800;
          > div {
            width: 100rem/36;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 34rem/108;
            line-height: 54rem/108;
          }
        }
        .cl-outcomeBox {
          // width: 230rem/36;
          width: fit-content;
          height: 33rem/36;
          border-radius: 3rem/36;
          overflow: hidden;
          font-weight: bold;
          .cl-item {
            width: 74rem/36;
            height: 33rem/36;
            box-sizing: border-box;
            padding: 0 8rem/36;
            margin-left: 10rem/108;
          }
          &.cl-outcome1 {
            width: 112rem/36;
          }
          .cl-number {
            width: 31rem/36;
            height: 33rem/36;
            background-color: #d4e4ec;
          }
        }
      }
    }
  }
}
</style>
