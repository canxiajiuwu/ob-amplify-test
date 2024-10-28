<template>
  <div class="cl-dailyJackpotsDetail-wrap">
    <div class="cl-banner">
      <div class="cl-banner_back" @click="goBack" />
      <div class="cl-banner_1">{{ period }}</div>
      <div class="cl-banner_2">
        <span>{{ $t('dailyJackpotDetail.win') }}</span>
        <span class="cl-money">{{ $t('unit') }}</span>
        <span class="cl-money">{{ maybe_wins[1].toLocaleString() }}</span>
      </div>
      <div class="cl-banner_3">
        <span>{{ $t('dailyJackpotDetail.expires') }}</span>
        <span>{{ getDate(expire_at, 'dd/MM/yy, HH:mm') }}</span>
      </div>
    </div>
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <div class="cl-jackpotBox">
          <div
            v-for="(item, index) in result"
            :key="index"
            class="cl-matchItem"
          >
            <div class="cl-top cl-flexcb">
              <div class="cl-left cl-flexcs">
                <div class="cl-name">
                  <span>{{ arrayCheck(sportList, item.sport_id) }}</span>
                  <span> - </span>
                  <span
                    >{{ item.tournament_name }}, {{ item.country_name }}</span
                  >
                </div>
              </div>

              <div class="cl-right">
                {{ getDate(item.start_time, 'dd/MM, HH:mm') }}
              </div>
            </div>

            <div class="cl-bottom cl-flexcb">
              <div class="cl-left">
                <div class="cl-hometeam">
                  {{ item.home_name }}
                </div>

                <div class="cl-awayteam">
                  {{ item.away_name }}
                </div>
              </div>

              <div class="cl-outcome">
                <div class="cl-outcomeBox cl-flexcb">
                  <div
                    v-for="(outcomeItem, outcomeIndex) in item.markets.outcomes"
                    :key="'outcome' + outcomeIndex"
                    class="cl-item cl-flexcb"
                    :class="{
                      'cl-select': selectArray[index]
                        ? selectArray[index].indexOf(outcomeItem.id) > -1
                        : '',
                      'cl-outcome1': item.markets.outcomes.length === 2
                    }"
                    @click="selectItem(outcomeItem, index)"
                  >
                    <span>{{ outcomeItem.display }}</span>
                    <span>{{ outcomeItem.odds.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <dailyJackpotBetslip
          v-if="result.length"
          :id="periodId"
          :money-type="moneyType"
          :meta="meta"
          :result="result"
          :select-array="selectArray"
          @autoPick="autoPick"
        />
        <dataNoResult v-else />
      </div>
      <dataLoading v-else />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import dailyJackpotBetslip from '@/components/components/dailyJackpotBetslip.vue' // 组件
export default {
  name: 'DailyJackpotsDetail',
  components: {
    dailyJackpotBetslip
  },
  provide() {
    return {
      changeMoneyType: this.changeMoneyType
    }
  },
  props: {
    periodId: {
      type: [Number, String],
      default: ''
    },
    period: {
      type: String
    },
    expire_at: {
      type: [String, Number]
    },
    maybe_wins: {
      type: Array
    }
  },
  data() {
    return {
      isRequestFailed: false,
      requestLoading: false,
      moneyType: 1,
      selectArray: [],
      meta: null,
      result: []
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    sportList() {
      return this.$store.state.root.sportList
    },
    platform() {
      return this.$store.state.platform
    }
  },
  mounted() {
    this.getDailyJackpot()
  },
  methods: {
    // 修改stake
    changeMoneyType(index) {
      this.moneyType = index
    },
    // 数组内容查询
    arrayCheck(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) {
          return arr[i].name
        }
      }
    },
    // 数组中删除元素
    arrayRemove(arr, val) {
      const index = arr.indexOf(val)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
    isArray(o) {
      return Object.prototype.toString.call(o) == '[object Array]'
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 选择jackpot
    selectItem(item, index) {
      const matchItem = this.selectArray[index]
      if (this.isArray(matchItem)) {
        if (matchItem.includes(item.id)) {
          this.arrayRemove(matchItem, item.id)

          if (matchItem.length === 0) {
            this.$set(this.selectArray, index, undefined)
          }
        } else {
          this.$set(this.selectArray, index, [item.id])
        }
      } else {
        this.$set(this.selectArray, index, [item.id])
      }
    },
    // 随机选择
    autoPick(length) {
      for (let i = 0; i < this.result.length; i++) {
        this.$set(this.selectArray, i, undefined)
      }
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * (this.meta.type === 1 ? 3 : 2))
        if (this.result[i]) {
          this.$set(this.selectArray, i, [
            this.result[i].markets.outcomes[index].id
          ])
        }
      }
    },
    // 获取daily jackpot
    getDailyJackpot(id) {
      this.$axios_api
        .jackpotDailyMatch({
          platform: this.platform,
          id: this.periodId
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.meta = res.data.meta
            this.result = res.data.result
          }
        })
        .catch((err) => {
          this.isRequestFailed = true
          this.requestLoading = true
          console.log(err)
        })
    },
    goBack() {
      this.$emit('goBack')
    }
  }
}
</script>

<style scoped lang="less">
.cl-dailyJackpotsDetail-wrap {
  padding: 20rem/108 0 0;
  .cl-banner {
    position: relative;
    box-sizing: border-box;
    height: 309rem/108;
    background: #7a91f3;
    text-align: center;
    color: #fff;
    font-weight: 700;
    .cl-banner_back {
      position: absolute;
      top: 46rem/108;
      left: 34rem/108;
      .sprite(@icon-back-white, 406rem);
    }
    .cl-banner_1 {
      padding: 40rem/108 0 0;
      font-size: 40rem/108;
    }
    .cl-banner_2 {
      padding: 34rem/108 0 0;
      font-size: 60rem/108;
      font-weight: 800;
    }
    .cl-banner_3 {
      padding: 34rem/108 0 0;
      font-size: 30rem/108;
    }
  }
  .cl-jackpotBox {
    padding: 0 0 30rem/36;

    .cl-matchItem {
      box-sizing: border-box;
      height: 222rem/108;
      padding: 20rem/108 30rem/108 0;
      background-color: #fff;
      border-radius: 3rem/36;
      border-bottom: 1px solid #c1cbd5;
      &:last-child {
        border-bottom: none;
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
            .cl-leaguesName {
              font-weight: 300;
            }
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
          //width: 230rem/36;
          width: fit-content;
          height: 33rem/36;
          border-radius: 3rem/36;
          overflow: hidden;
          font-weight: bold;
          .cl-item {
            width: 74rem/36;
            height: 33rem/36;
            background-color: #d4e4ec;
            box-sizing: border-box;
            padding: 0 8rem/36;
            margin-left: 10rem/108;
            &.cl-outcome1 {
              width: 112rem/36;
            }

            &.cl-select {
              background-color: #fdda06;
            }
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
