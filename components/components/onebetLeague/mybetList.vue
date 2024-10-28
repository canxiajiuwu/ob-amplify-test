<template>
  <div class="cl-mybetList-wrap">
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <div class="cl-list" v-if="result.length > 0">
          <div v-for="(item, index) in result" :key="index">
            <div v-if="showDateList[index]" class="cl-date">
              <div class="cl-dateFont" v-if="item.bet_time">
                {{ getDate(item.bet_time, 'dd') }}
                {{
                  $t(
                    `accountMybetDetailBox.months[${
                      getDate(item.bet_time, 'M') - 1
                    }]`
                  )
                }}
              </div>
            </div>
            <div class="cl-item" @click="goDetail(item)">
              <div class="cl-flexcb cl-top">
                <div class="cl-left">
                  {{ $t('accountMybetBox.bet_id') }}
                  <span>#{{ item.order_no }}</span>
                </div>
                <div class="cl-right">
                  {{ $t('unit') }} {{ abs(Number(item.win_amount)) }}
                </div>
              </div>

              <div class="cl-flexcb cl-bottom">
                <div class="cl-left">
                  {{ getDate(item.bet_time, 'dd/MM, HH:mm') }}
                  <span class="cl-stake"
                    >{{ $t('betslipPlaceBet.stake') }}
                    {{ abs(Number(item.bet_amount)) }}</span
                  >
                </div>

                <div class="cl-flexcc">
                  <div v-if="item.cash_status" class="cl-flexcc cl-cashoutBox">
                    {{ $t('onebetLeague.cashout') }}
                  </div>
                  <div
                    class="cl-right cl-status5"
                    v-if="item.cash_risk_status === 1 || item.risk_status === 1"
                  >
                    {{ $t('accountMybetBox.ticket_status6') }}
                  </div>
                  <div v-else>
                    <div v-for="(a, b) in 5" :key="b">
                      <div
                        v-if="item.status === b"
                        class="cl-right"
                        :class="'no-status' + (b + 1)"
                      >
                        {{ $t('accountMybetBox.ticket_status' + (b + 1)) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 2rem" />
        </div>

        <dataNoResult v-else />
      </div>

      <dataLoading v-else />
    </div>

    <client-only>
      <InfiniteLoading @infinite="onInfinite" :identifier="infiniteId">
        <span slot="no-more" />
        <span slot="no-results" />
        <span slot="spinner" />
      </InfiniteLoading>
    </client-only>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'

export default {
  components: { InfiniteLoading },
  data() {
    return {
      infiniteId: +new Date(), // 滚动加载id
      result: [], // 循环体
      showDateList: [], // 时间列表展示控制
      page: 1, // 分页
      isRequestFailed: 0, // 请求出错
      requestLoading: 0 // 请求中
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    }
  },
  methods: {
    // 滚动方法
    onInfinite($state) {
      this.mybetListReq($state)
    },
    // mybet 请求
    mybetListReq($state) {
      this.$axios_api
        .LeagueSoccerRecord({ token: this.token, page: this.page })
        .then((res) => {
          this.isRequestFailed = 0
          this.requestLoading = 1
          const { code, data } = res
          if (code === 0) {
            this.page++
            if ($state !== undefined)
              data.length < 20 ? $state.complete() : $state.loaded()

            this.result = this.result.concat(data)
            this.getShowDateList()
          } else if (code === 10101) {
            Lib.common.errorReminder(
              this,
              'login',
              '',
              '',
              this.$t('reminder.unLogin'),
              '',
              this.$t('reminder.button.ok')
            )
          }
        })
        .catch(() => {
          this.isRequestFailed = 1
          this.requestLoading = 1
        })
    },
    // 获取是否展示date的数组
    getShowDateList() {
      let date = ''
      const arr = []
      this.result.forEach((item) => {
        const str = this.getDate(item.created_at, 'dd/MM')
        if (date !== str) {
          arr.push(true)
          date = str
        } else arr.push(false)
      })
      this.showDateList = arr
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 打开详情
    goDetail(item) {
      this.$emit('goDetail', item)
    },
    // 金额格式化
    abs(num) {
      return Lib.common.abs(num)
    }
  }
}
</script>

<style scoped lang="less">
.cl-mybetList-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;

  .cl-list {
    .cl-date {
      height: 26rem/36;
      background-color: #f7f7f7;
      display: flex;
      align-items: center;
      padding-left: 10rem/36;

      .cl-dateFont {
        font-size: 10rem/36;
        font-weight: 400;
        color: #74747c;
        text-transform: uppercase;
      }
    }

    .cl-item {
      background-color: #fff;
      font-size: 11rem/36;
      box-sizing: border-box;
      padding: 10rem/36;
      color: #000;

      .cl-top {
        line-height: 11rem/36;
        font-weight: bold;

        .cl-left {
          color: #363636;
          text-transform: uppercase;
        }
      }

      .cl-bottom {
        font-weight: 400;
        font-size: 10rem/36;
        line-height: 10rem/36;
        margin-top: 10rem/36;

        .cl-left {
          color: #a2a2a7;

          .cl-stake {
            padding-left: 10rem/36;
            color: #515151;
          }
        }

        .cl-right {
          color: #fff;
          text-transform: uppercase;
        }

        .cl-cashoutBox {
          height: 13rem/36;
          padding: 0 5rem/36;
          background-color: #b0f0fd;
          border-radius: 7rem/36;
          font-weight: 400;
          color: #00a5e6;
          font-size: 9rem/36;
          margin-right: 7rem/36;
        }

        .no-status1 {
          color: @mainThemeColor;
        }

        .no-status2 {
          color: #404040;
        }

        .no-status3 {
          color: @myBetWon;
        }

        .no-status4 {
          color: #a2a2a7;
        }

        .no-status5 {
          color: #6dd400;
        }
      }
    }
  }
}
</style>
