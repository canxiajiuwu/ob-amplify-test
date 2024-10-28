<template>
  <div class="cl-downloadPage-wrap">
    <div class="cl-back" @click="goBack" />
    <div class="cl-bg">
      <img
        :src="`${STATICURL}/images/lang/${locale}/${country}/giftHowToUse/bg.jpg`"
        alt="onebet | giftGuide"
      />
    </div>

    <div class="cl-stepBox">
      <h2 class="cl-h2 cl-title">{{ $t('giftGuide.title') }}</h2>
      <div class="cl-art">{{ $t('giftGuide.art1') }}</div>
      <h2 class="cl-h2 cl-title">{{ $t('giftGuide.title1') }}</h2>
      <div class="cl-step1 cl-step">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/giftHowToUse/1.png`"
          alt="onebet | step1"
        />
      </div>
      <div class="cl-art">{{ $t('giftGuide.step1') }}</div>
      <div class="cl-step2 cl-step">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/giftHowToUse/2.png`"
          alt="onebet | step2"
        />
      </div>
      <div class="cl-art">{{ $t('giftGuide.step2') }}</div>
      <div class="cl-step3 cl-step">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/giftHowToUse/3.png`"
          alt="onebet | step3"
        />
      </div>
      <div class="cl-art">{{ $t('giftGuide.step3') }}</div>
    </div>

    <div class="cl-faq">
      <h2 class="cl-h2 cl-title">{{ $t('giftGuide.title2') }}</h2>
      <div class="cl-list">
        <div
          class="cl-item"
          v-for="(item, index) in $t('giftGuide.list2')"
          v-html="item"
          @click="getCash(index)"
          :key="index"
        />
      </div>

      <h2 class="cl-h2 cl-title">{{ $t('giftGuide.title3') }}</h2>

      <div class="cl-list">
        <div
          class="cl-item"
          v-for="(item, index) in $t('giftGuide.list')"
          :key="index"
        >
          <h3 class="cl-h3 cl-itemTitle">{{ item.title }}</h3>
          <div class="cl-itemArt">{{ item.art }}</div>
        </div>
      </div>

      <div class="cl-button cl-flexcc" @click="useGift">
        {{ $t('giftHowToUse.button') }}
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
    Lib.common.hideSkeleton()
  },
  methods: {
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    },
    // 使用抵用卷
    useGift() {
      this.$router.push({ path: `/${this.locale}` })
    },
    getCash(index) {
      if (index === 1) {
        this.$router.push({
          path: `/${this.locale}/coinsSpin`
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-downloadPage-wrap {
  width: 10rem;
  overflow: hidden;
  min-height: 100vh;
  position: relative;
  background-color: #fff;

  .cl-back {
    position: absolute;
    top: 15rem/36;
    left: 20rem/36;

    .sprite(@icon-back,72rem);
  }

  .cl-bg {
    width: 290rem/36;
    margin: 45rem/36 auto 0;

    img {
      width: 290rem/36;
    }
  }

  .cl-title {
    text-align: center;
    color: #535353;
    font-size: 20rem/36;
    font-weight: bold;
    padding-top: 40rem/36;
    padding-bottom: 20rem/36;
  }

  .cl-stepBox {
    color: #313131;
    position: relative;
    padding: 0 25rem/36;

    .cl-step {
      padding-top: 20rem/36;
      width: 100%;

      img {
        width: 100%;
      }
    }

    .cl-art {
      padding-top: 15rem/36;
    }
  }

  .cl-faq {
    padding: 55rem/36 10rem/36 30rem/36;

    .cl-faqTitle {
      text-align: center;
      color: #535353;
      font-size: 20rem/36;
      font-weight: bold;
    }

    .cl-item {
      padding-top: 16rem/36;

      .cl-itemTitle {
        font-weight: bold;
        color: #313131;
      }

      .cl-itemArt {
        color: #707070;
        padding: 10rem/36 0 0 10rem/36;
      }
    }

    .cl-button {
      width: 300rem/36;
      height: 40rem/36;
      box-sizing: border-box;
      border: 1px solid #929292;
      background-color: #009944;
      color: #fff;
      font-weight: bold;
      border-radius: 3rem/36;
      margin: 35rem/36 auto;
    }
  }
}
</style>
