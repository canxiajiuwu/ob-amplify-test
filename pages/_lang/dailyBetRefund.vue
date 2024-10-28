<template>
  <div class="cl-dailyBetRefund-wrap">
    <div class="cl-backBox cl-flexcs" @click="goBack">
      <div class="cl-left cl-flexcc">
        <div class="cl-icon"></div>
        <div class="cl-name">
          {{ $t('accountBack.back') }}
        </div>
      </div>
    </div>
    <div class="cl-top">
      <div class="cl-topBg">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/promotions/dailyBetTop.png`"
          alt="dailyBetTop"
        />
      </div>

      <div class="cl-buttonBox">
        <div
          v-for="(item, index) in 4"
          :key="index"
          class="cl-point"
          :class="'point' + index"
        ></div>
        <div class="cl-buttonTitle">
          {{ $t('dailyBetRefund.conditions') }}
        </div>

        <div class="cl-buttonList">
          <div class="cl-butttonItem">{{ $t('dailyBetRefund.conditions1') }}</div>
          <div class="cl-butttonItem">{{ $t('dailyBetRefund.conditions2') }}</div>
        </div>

        <div class="cl-button cl-flexcc" @click="betNow">
          {{ $t('dailyBetRefund.betNow') }}
        </div>
        <div class="cl-valid">{{ $t('dailyBetRefund.valid') }}</div>
      </div>
    </div>

    <div class="cl-terms">
      <h2 class="cl-h2 cl-termsTitle">{{ $t('dailyBetRefund.terms') }}</h2>

      <div
        class="cl-termsItem"
        v-for="(item, index) in $t('dailyBetRefund.termsList')"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  computed: {
    STATICURL() {
      return process.env.STATICURL
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
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    },
    betNow() {
      this.$router.push({ path: `/${this.locale}` })
    }
  }
}
</script>

<style scoped lang="less">
.cl-dailyBetRefund-wrap {
  background-color: #af2b07;

  .cl-backBox {
    height: 47rem/36;
    padding: 0 10rem/36;
    background-color: white;

    .cl-left {
      .cl-icon {
        height: 12rem/36;

        .sprite(@icon-back,108rem);
      }

      .cl-name {
        margin-left: 5rem/36;
        font-weight: bold;
      }
    }
  }
  .cl-top {
    padding: 15rem/36;
    background-color: #ef3a09;

    .cl-topBg {
      img {
        width: 330rem/36;
      }
    }

    .cl-buttonBox {
      margin-top: 10rem/36;
      height: 144rem/36;
      box-sizing: border-box;
      border-radius: 7rem/36;
      border: 2rem/36 solid #2e2e63;
      background-color: white;
      padding: 5rem/36 16rem/36 0;
      font-size: 10rem/36;
      color: #2e2e63;

      .cl-buttonTitle {
        font-weight: bold;
      }

      .cl-buttonList {
        padding-top: 8rem/36;
      }

      .cl-button {
        height: 42rem/36;
        border-radius: 21rem/36;
        border: 2rem/36 solid #2e2e63;
        background-color: #ef3a09;
        font-weight: bold;
        font-size: 17rem/36;
        text-transform: uppercase;
        margin-top: 12rem/36;
        color: white;
      }

      .cl-valid {
        text-align: center;
        font-weight: bold;
        margin-top: 10rem/36;
      }
    }
  }

  .cl-terms {
    padding: 14rem/36 0;
    font-size: 12rem/36;
    color: white;

    .cl-termsTitle {
      text-align: center;
      font-weight: bold;
      padding-bottom: 16rem/36;
    }

    .cl-termsItem {
      padding: 0 9rem/36 10rem/36 17rem/36;
    }
  }
}
</style>
