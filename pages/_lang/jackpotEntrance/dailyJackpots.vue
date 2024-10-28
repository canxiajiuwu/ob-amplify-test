<template>
  <div class="cl-dailyJackpots-wrap">
    <div class="cl-dailyJackpotsList" v-if="step === 1">
      <div class="cl-banner">
        <div class="cl-banner_pic" />
        <img
          class="cl-banner_pic"
          src="~/assets/images/jackpot/DAILY.png"
          alt="onebet || Daily Jackpot"
        />
        <h3 class="cl-h3 cl-banner_1">{{ $t('jackpots.daily') }}</h3>
        <h3 class="cl-h3 cl-banner_2">{{ $t('jackpots.only') }}</h3>
        <!--<div class="cl-banner_christmas"><span>+5%</span> Christmas Bonus</div>-->
        <div class="cl-flexcs cl-banner_3">
          <div
            class="cl-flexcc cl-banner_3_item"
            v-for="(item, index) in $t('jackpots.daily_3')"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <dataError v-if="isRequestFailed" />

      <div v-else>
        <div v-if="requestLoading">
          <div class="cl-list" v-if="dailyJackpotList.length">
            <div
              class="cl-item"
              v-for="(item, index) in dailyJackpotList"
              @click="goDetail(item)"
              :key="index"
            >
              <div class="cl-flexcb cl-item_1">
                <div class="cl-period">{{ item.period }}</div>
                <div class="cl-date">
                  {{ getDate(item.expire_at, 'dd/MM, HH:mm') }}
                </div>
              </div>
              <div class="cl-flexcb cl-item_2">
                <div class="cl-win">
                  <span>{{ $t('dailyJackpotIndex.win') }}</span>
                  <span class="cl-money">{{
                    item.maybe_wins[1].toLocaleString()
                  }}</span>
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

    <dailyJackpotsDetail
      :period-id="periodId"
      :period="period"
      :expire_at="expire_at"
      :maybe_wins="maybe_wins"
      @goBack="goBack"
      v-else
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import dailyJackpotsDetail from '@/components/components/dailyJackpotsDetail.vue' // 组件

export default {
  name: 'DailyJackpots',
  components: {
    dailyJackpotsDetail
  },
  data() {
    return {
      step: 1, // 1显示列表,2为进入详情
      dailyJackpotList: [],
      isRequestFailed: false,
      requestLoading: false,
      periodId: '',
      period: '',
      expire_at: '',
      maybe_wins: ''
    }
  },
  computed: {
    platform() {
      return this.$store.state.platform
    }
  },
  mounted() {
    this.getDailyJackpot()
  },
  methods: {
    // 获取daily jackpot数据
    getDailyJackpot() {
      this.$axios_api
        .jackpotDailyPeriods({
          platform: this.platform
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.dailyJackpotList = res.data
          }
        })
        .catch((err) => {
          this.isRequestFailed = true
          this.requestLoading = true
          console.log(err)
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 前往dailyJackpot详情
    goDetail(item) {
      this.periodId = item.id
      this.period = item.period
      this.expire_at = item.expire_at
      this.maybe_wins = item.maybe_wins
      this.step = 2
    },
    goBack() {
      this.step = 1
    }
  }
}
</script>

<style scoped lang="less">
.cl-dailyJackpots-wrap {
  .cl-dailyJackpotsList {
    .cl-banner {
      position: relative;
      height: 388rem/108;
      background: #7a91f3;
      .cl-banner_pic {
        position: absolute;
        bottom: 20rem/36;
        left: 10rem/36;
        width: 298rem/108;
        height: 255rem/108;
      }
      .cl-banner_1 {
        padding: 50rem/108 0 0 385rem/108;
        color: #333;
        font-weight: 800;
        font-size: 40rem/108;
      }
      .cl-banner_2 {
        padding: 18rem/108 0 0 385rem/108;
        color: #fff;
        font-weight: 700;
        font-size: 34rem/108;
      }
      .cl-banner_christmas {
        padding: 3rem/36 0 0 385rem/108;
        font-size: 11rem/36;
        font-weight: bold;
        color: #fff900;
      }
      .cl-banner_3 {
        flex-wrap: wrap;
        padding: 14rem/108 10rem/108 0 380rem/108;
        height: 142rem/108;
        .cl-banner_3_item {
          width: fit-content;
          height: 64rem/108;
          border-radius: 32rem/108;
          padding: 0 20rem/108;
          font-size: 26rem/108;
          color: #fff;
          background: #4965de;
          margin: 0 22rem/108 14rem/108 0;
        }
      }
    }
    .cl-list {
      .cl-item {
        background-color: #fff;
        box-sizing: border-box;
        height: 187rem/108;
        padding: 15rem/36 10rem/36 0;
        font-size: 10rem/36;
        border-bottom: 1rem/36 solid #c1cbd5;
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
          .cl-money {
            margin-left: 3rem/36;
          }
          .cl-more {
            transform: rotate(180deg);
            .sprite(@icon-back, 108rem);
          }
        }
      }
    }
  }
}
</style>
