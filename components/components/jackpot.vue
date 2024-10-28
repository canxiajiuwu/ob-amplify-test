<template>
  <div class="cl-jackpot-wrap">
    <div v-for="(item, index) in result" :key="index" class="cl-matchItem">
      <div class="cl-flexcb cl-top">
        <div class="cl-flexcs cl-left">
          <div class="cl-oneLine cl-name">
            <span>{{ arrayCheck(sportList, item.sport_id) }}</span>
            <span>-</span>
            <span>{{ item.tournament_name }}, {{ item.country_name }}</span>
          </div>
        </div>

        <div class="cl-right">
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
              v-for="(outcomeItem, outcomeIndex) in item.markets.outcomes"
              :key="'outcome' + outcomeIndex"
              class="cl-flexcb cl-item"
              :class="
                selectArray[index] &&
                selectArray[index].indexOf(outcomeItem.id) > -1
                  ? 'cl-oddsButton'
                  : 'cl-noOddsButton'
              "
              @click="selectItem(outcomeItem, index)"
            >
              <span>{{ outcomeItem.display }}</span>
              <span>{{ outcomeItem.odds.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <jackpotBetslip
      :period="period"
      :select-array="selectArray"
      @autoPick="autoPick"
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import jackpotBetslip from '@/components/components/jackpotBetslip.vue' // 组件

export default {
  name: '',
  components: { jackpotBetslip },
  props: {
    result: {
      type: Array,
      default: () => []
    },
    period: {
      type: String
    }
  },
  data() {
    return {
      selectArray: []
    }
  },
  computed: {
    sportList() {
      return this.$store.state.root.sportList
    }
  },
  methods: {
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 数组内容查询
    arrayCheck(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === Number(id)) return arr[i].name
      }
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
        } else if (matchItem.length === 2) {
          Lib.common.errorReminderUp(this, true, this.$t('reminder.jackpot'), 0)
        } else {
          matchItem.push(item.id)
        }
      } else {
        this.$set(this.selectArray, index, [item.id])
      }
    },
    isArray(o) {
      return Object.prototype.toString.call(o) == '[object Array]'
    },
    arrayRemove(arr, val) {
      const index = arr.indexOf(val)
      if (index > -1) {
        arr.splice(index, 1)
      }
    },
    // 随机选择
    autoPick(length) {
      for (let i = 0; i < 13; i++) {
        this.$set(this.selectArray, i, undefined)
      }
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * 3)
        if (this.result[i]) {
          this.$set(this.selectArray, i, [
            this.result[i].markets.outcomes[index].id
          ])
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-jackpot-wrap {
  .cl-matchItem {
    box-sizing: border-box;
    height: 74rem/36;
    padding: 10rem/36 10rem/36;
    background-color: #fff;
    &:last-child {
      border-bottom: none;
    }
    .cl-top {
      font-size: 10rem/36;
      color: #a2a2a7;
      .cl-left {
        .cl-name {
          width: 240rem/36;
        }
      }
    }

    .cl-bottom {
      margin-top: 10rem/36;
      height: 33rem/36;

      .cl-left {
        font-weight: 800;
        font-size: 11rem/36;
        color: #000;

        > div {
          width: 100rem/36;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11rem/36;
        }
      }

      .cl-outcomeBox {
        width: 234rem/36;
        height: 33rem/36;
        font-weight: bold;

        .cl-item {
          width: 75rem/36;
          height: 33rem/36;
          box-sizing: border-box;
          padding: 0 8rem/36;
        }
      }
    }
  }
}
</style>
