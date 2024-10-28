<template>
  <div class="cl-rushHour-wrap">
    <headBack
      :title="$t('rushHour.rushHourTitle')"
      :middle-word-style="{ fontSize: 16 / 36 + 'rem', fontWeight: 'bold' }"
    />
    <div class="cl-mian">
      <div class="cl-rushHourBGWrap">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/rushHour/rushHourBG1.jpg`"
          alt="onebet | rush hour"
        />
        <div class="cl-rushHoureButton" @click="goCrashGame">
          {{ $t('rushHour.rushHourPlayNow') }}
        </div>
      </div>
      <div class="cl-rushHourRules-wrap">
        <div class="cl-rushHourRules">{{ $t('rushHour.rushHourRules1') }}</div>
        <div class="cl-rushHourRules">{{ $t('rushHour.rushHourRules2') }}</div>
        <div class="cl-rushHourRules">{{ $t('rushHour.rushHourRules3') }}</div>
        <div class="cl-rushHourRules">{{ $t('rushHour.rushHourRules4') }}</div>
        <div class="cl-rushHourRules">{{ $t('rushHour.rushHourRules5') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'RushHour',
  components: { headBack },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    isBack() {
      return this.$route.query.isBack
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    goCrashGame() {
      this.isBack
        ? Lib.common.activityBack(this)
        : this.$router.push({ path: `/${this.locale}` + '/crashGame' })
    }
  }
}
</script>
<style scoped lang="less">
.cl-rushHour-wrap {
  min-height: 100vh;
  padding-bottom: 30rem/36;
  background-color: #fa744e;
  .cl-mian {
    .cl-rushHourBGWrap {
      height: 399rem/36;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .cl-rushHoureButton {
        width: 317rem/36;
        height: 43rem/36;
        background: linear-gradient(90deg, #f32e6d, #ed1b27);
        border-radius: 22rem/36;
        font-size: 17rem/36;
        font-weight: bold;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 294rem/36;
        left: 22rem/36;
      }
    }
    .cl-rushHourRules-wrap {
      font-size: 13rem/36;
      color: rgba(255, 255, 255, 0.9);
      line-height: 17rem/36;
      padding: 0 28rem/36 0 16rem/36;
      box-sizing: border-box;
      margin-top: -29rem/36;
      position: relative;
      .cl-rushHourRules {
        margin-bottom: 18rem/36;
      }
    }
  }
}
</style>
