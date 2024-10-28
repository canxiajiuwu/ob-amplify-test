<template>
  <div
    v-if="!accountInfo?.first_deposit_activity"
    class="cl-firstChargeBanner-wrap"
    @click="goFirstDeposit"
  >
    <img
      class="cl-firstChargeImg"
      :src="`${STATICURL}/images/lang/${locale}/${country}/account/firstChargeBanner.jpg?v=1`"
      alt="first deposit"
    />
    <div class="cl-countdown cl-flexcc">
      <div class="cl-mr8">{{ $t('firstDeposit.time') }}</div>
      <div class="cl-mr4 cl-blackBox cl-flexcc">{{ showTime[0] }}</div>
      <div class="cl-mr4">:</div>
      <div class="cl-mr4 cl-blackBox cl-flexcc">{{ showTime[1] }}</div>
      <div class="cl-mr4">:</div>
      <div class="cl-blackBox cl-flexcc">{{ showTime[2] }}</div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: ['eventBurial'],
  data() {
    return {
      // 剩余时间
      time: null,
      // setTimeout容器
      timer: null
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    showTime() {
      let sec = this.time % 60
      if (sec < 10) sec = '0' + sec

      let min = ((this.time - Number(sec)) / 60) % 60
      if (min < 10) min = '0' + min

      let hour = Math.floor(this.time / (60 * 60))
      if (hour < 10) hour = '0' + hour

      return [hour, min, sec]
    },
    firstDepositBannerTime() {
      return this.$store.state.firstDepositBannerTime
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    this.firstDeposit()
  },
  beforeDestroy() {
    this.$store.commit('setFirstDepositBannerTime', this.time)
    clearTimeout(this.timer)
  },
  methods: {
    // 首冲活动数据
    firstDeposit() {
      if (this.firstDepositBannerTime <= 0) {
        this.$axios_api.firstDeposit({}).then((res) => {
          if (res.code === 0) {
            this.time = res.data.time
            this.selfCirculation()
          }
        })
      } else {
        this.time = this.firstDepositBannerTime
        this.selfCirculation()
      }
    },
    // 时间自减
    selfCirculation() {
      if (this.time <= 0) {
        clearTimeout(this.timer)
        this.firstDeposit()
        return
      }
      this.time--
      this.timer = setTimeout(() => {
        this.selfCirculation()
      }, 1000)
    },
    // 前往首充活动页面
    goFirstDeposit() {
      // 事件埋点(点击了首充活动)
      const arr = this.eventBurial
      if (Array.isArray(arr) && arr.length > 0) {
        if (arr[1]) Lib.common.event_statistics(arr[0], arr[1])
        else Lib.common.event_statistics(arr[0])
      }
      this.$router.push({
        path: `/${this.locale}/firstDeposit`
      })
    },
    // 获取用户信息
    userAccountInfo() {
      if (!this.accountInfo) {
        this.$axios_api.userAccountInfo({ token: this.token }).then((res) => {
          // 设置用户属性
          if (res.code === 0) this.$store.commit('setAccountInfo', res.data)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cl-firstChargeBanner-wrap {
  color: #fff;
  position: relative;
  font-size: 10rem/36;
  font-weight: 800;

  .cl-firstChargeImg {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .cl-countdown {
    position: absolute;
    top: 5rem/36;
    left: 50%;
    transform: translate(-50%, 0);

    .cl-blackBox {
      background-color: #000;
      width: 16rem/36;
      height: 16rem/36;
      border-radius: @mainButtonRadius;
      opacity: 0.7;
    }

    .cl-mr8 {
      margin-right: 8rem/36;
      font-weight: 400;
      white-space: nowrap;
    }

    .cl-mr4 {
      margin-right: 4rem/36;
    }
  }
}
</style>
