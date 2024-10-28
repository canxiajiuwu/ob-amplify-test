<template>
  <div class="cl-jackpotsResults-wrap">
    <div v-if="step === 1">
      <dataError v-if="isRequestFailed" />
      <div v-else>
        <div v-if="requestLoading">
          <div class="cl-list" v-if="periods.length">
            <div
              class="cl-item"
              v-for="(item, index) in periods"
              @click="goDetail(item)"
              :key="index"
            >
              <div class="cl-item_1 cl-flexcb">
                <div class="cl-period">
                  {{
                    item.type
                      ? $t('jackpots.dailyJackpots')
                      : $t('jackpots.grandJackpot')
                  }}
                  {{ item.period }}
                </div>
                <div class="cl-date">
                  <span>{{ $t('jackpots.ended') }}</span>
                  {{ getDate(item.end_time, 'dd/MM, HH:mm') }}
                </div>
              </div>
              <div class="cl-item_2 cl-flexcb">
                <div class="cl-win">
                  <span>
                    {{ $t('jackpots.win') }}
                    <span v-if="!item.type">{{
                      addComma(moneyConfig[$store.state.root.country].jackpot)
                    }}</span>
                    <span v-else>{{
                      addComma(
                        moneyConfig[$store.state.root.country].DailyJackpotHigh
                      )
                    }}</span>
                  </span>
                </div>
                <div class="cl-more" />
              </div>
            </div>
          </div>
          <dataNoResult v-else />
        </div>
        <dataLoading v-else />
      </div>
    </div>

    <jackpotsResultsDetail
      :period="period"
      :end_time="end_time"
      :type="type"
      @goBack="goBack"
      v-else
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import jackpotsResultsDetail from '@/components/components/jackpotsResultsDetail.vue' // 组件
export default {
  name: 'JackpotsResults',
  components: { jackpotsResultsDetail },
  data() {
    return {
      isRequestFailed: false,
      requestLoading: false,
      periods: [],
      step: 1,
      period: '',
      end_time: '',
      type: ''
    }
  },
  computed: {
    platform() {
      return this.$store.state.platform
    },
    moneyConfig() {
      return this.$store.state.moneyConfig
    }
  },
  mounted() {
    this.getJackpotPeriods()
  },
  methods: {
    // 获取所有期数
    getJackpotPeriods() {
      this.$axios_api
        .jackpotPeriods({ platform: this.platform })
        .then((res) => {
          if (res.code === 0) {
            this.periods = res.data
            if (this.periods.length > 10) this.periods.length = 10
            this.requestLoading = true
          }
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 获取jackpot数据
    goDetail(item) {
      this.period = item.period
      this.end_time = item.end_time
      this.type = item.type
      this.step = 2
    },
    goBack() {
      this.step = 1
    },
    addComma(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style scoped lang="less">
.cl-jackpotsResults-wrap {
  .cl-list {
    padding: 0 0 236rem/108;
    .cl-item {
      background-color: white;
      box-sizing: border-box;
      height: 187rem/108;
      padding: 15rem/36 10rem/36 0;
      font-size: 10rem/36;
      border-bottom: 0.5rem/36 solid #d4dae1;
      &:last-child {
        border-bottom: none;
      }
      .cl-item_1 {
        .cl-period {
          color: #363636;
        }
        .cl-date {
          color: #939695;
        }
      }
      .cl-item_2 {
        padding: 26rem/108 0 0;
        font-weight: bold;
        .cl-more {
          transform: rotate(180deg);
          .sprite(@icon-back,108rem);
        }
      }
    }
  }
}
</style>
