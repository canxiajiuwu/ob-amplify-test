<template>
  <div class="cl-grandJackpot-wrap">
    <div class="cl-flexcc">
      <div class="cl-banner">
        <img
          class="cl-banner_pic"
          src="/images/jackpot/grandJackpot.png"
          alt="onebet | Grand Jackpot"
        />
        <div class="cl-banner_text">
          <h3 class="cl-h3 cl-banner_text_1">{{ $t('jackpots.grand') }}</h3>
          <h3 class="cl-h3 cl-banner_text_2">{{ $t('jackpots.grand_1') }}</h3>
          <!-- <div class="cl-banner_christmas"><span>+5%</span> Christmas Bonus</div> -->
          <div :style="{ height: 16 / 36 + 'rem' }" />
          <div class="cl-banner_text_3">
            <div>
              {{ $t('jackpots.draw') }}
              <span v-if="meta">{{ meta.period }}</span>
              <span v-else>-</span>
            </div>
            <div :style="{ height: 5 / 36 + 'rem' }" />
            <div>
              {{ $t('jackpots.expire') }}
              <span v-if="meta">{{
                getDate(meta.expire_at, 'dd/MM/yy, HH:mm')
              }}</span>
              <span v-else>-</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <jackpot :result="result" :period="period" v-if="result.length" />
        <dataNoResult v-else />
      </div>
      <dataLoading v-else />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import jackpot from '@/components/components/jackpot.vue'

export default {
  name: 'GrandJackpotWrap',
  components: {
    jackpot
  },
  data() {
    return {
      period: '',
      meta: null,
      result: [],
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    platform() {
      return this.$store.state.platform
    }
  },
  mounted() {
    // 获取所有期数
    this.getJackpotMatch()
  },
  methods: {
    // 获取jackpot数据
    getJackpotMatch() {
      this.$axios_api
        .jackpotMatch({
          platform: this.platform,
          period: ''
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.meta = res.data.meta
            this.period = res.data.meta.period
            this.result = res.data.result
          } else {
            this.result = []
            this.$store.commit('SetGrandJackpotNoData', true)
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    }
  }
}
</script>

<style scoped lang="less">
.cl-grandJackpot-wrap {
  .cl-banner {
    background: linear-gradient(180deg, #addef0 0%, #dff6ff 100%);
    width: 340rem/36;
    height: 122rem/36;
    border-radius: 5rem/36;
    overflow: hidden;
    display: flex;
    align-items: center;
    .cl-banner_pic {
      margin-left: 3rem/36;
      margin-top: 7rem/36;
      width: 120rem/36;
      height: 115rem/36;
    }
    .cl-banner_text {
      margin-left: 10rem/36;
      .cl-banner_text_1 {
        font-weight: 800;
        color: #1d1f61;
        font-size: 13rem/36;
        margin-bottom: 7rem/36;
      }
      .cl-banner_text_2 {
        font-weight: 800;
        color: #e71111;
        font-size: 21rem/36;
      }
      .cl-banner_christmas {
        font-size: 13rem/36;
        font-weight: bold;
        color: #fff;

        span {
          color: #fff900;
        }
      }
      .cl-banner_text_3 {
        font-size: 10rem/36;
        color: rgba(66, 68, 131, 0.7);
        font-weight: 400;
      }
    }
  }
}
</style>
