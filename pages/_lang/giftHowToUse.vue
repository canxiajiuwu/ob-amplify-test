<template>
  <div class="cl-giftHowToUse-wrap">
    <headBack
      :title="$t('giftHowToUse.title').toUpperCase()"
      :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
    />
    <div class="cl-container">
      <div class="cl-content">
        <div class="cl-stepBox">
          <h3 class="cl-h3 cl-art">{{ $t('giftHowToUse.step1') }}</h3>
          <div class="cl-account">{{ $t('giftHowToUse.account') }}</div>
          <div class="cl-step1 cl-step">
            <img
              :src="`${STATICURL}/images/lang/${locale}/${country}/giftHowToUse/1.png`"
              alt="onebet | step1"
            />
          </div>
          <h3 class="cl-h3 cl-art" v-html="$t('giftHowToUse.art1')"></h3>
          <div class="cl-step2 cl-step">
            <img
              :src="`${STATICURL}/images/lang/${locale}/${country}/giftHowToUse/2.png`"
              alt="onebet | step2"
            />
          </div>
          <h3 class="cl-h3 cl-art">{{ $t('giftHowToUse.step2') }}</h3>
          <div class="cl-step3 cl-step">
            <img
              :src="`${STATICURL}/images/lang/${locale}/${country}/giftHowToUse/3.png`"
              alt="onebet | step3"
            />
          </div>
          <h3 class="cl-h3 cl-art">{{ $t('giftHowToUse.step3') }}</h3>
          <h3 class="cl-h3 cl-art">{{ $t('giftHowToUse.art3-1') }}</h3>
          <h3 class="cl-h3 cl-art">{{ $t('giftHowToUse.art3-2') }}</h3>

          <h2 class="cl-h2 cl-title1">{{ $t('giftHowToUse.title2') }}</h2>
          <h3 class="cl-h3 cl-art">{{ $t('giftHowToUse.art4') }}</h3>
          <h3 class="cl-h3 cl-art">{{ $t('giftHowToUse.art4-1') }}</h3>
          <h3 class="cl-h3 cl-art">{{ $t('giftHowToUse.art4-2') }}</h3>
        </div>
      </div>
    </div>

    <client-only>
      <FooterMenu />
    </client-only>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import FooterMenu from '@/components/components/FooterMenu.vue'

export default {
  components: {
    headBack,
    FooterMenu
  },
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
    // 使用抵用卷
    useGift() {
      this.$router.push({ path: `/${this.locale}` })
    }
  }
}
</script>

<style scoped lang="less">
.cl-giftHowToUse-wrap {
  .cl-container {
    .cl-title {
      margin: 5rem/36 5rem/36 0;
      background-color: #fff;
      border-radius: 3rem/36;
      box-sizing: border-box;
      height: 30rem/36;
      padding: 0 5rem/36;

      > div {
        flex: 1;
      }

      .cl-left {
        .cl-icon {
          height: 12rem/36;

          .sprite(@icon-back,100rem);
        }

        .cl-name {
          margin-left: 5rem/36;
          font-weight: bold;
        }
      }

      .cl-middle {
        font-weight: bold;
        white-space: nowrap;
      }
    }

    .cl-title1 {
      color: @mainThemeColor;
      font-weight: bold;
      padding-top: 20rem/36;
    }

    .cl-content {
      border-radius: 3rem/36;
      margin: 5rem/36 5rem/36 90rem/36;
      background-color: #fff;
      box-sizing: border-box;
      padding: 5rem/36 5rem/36 20rem/36;
      color: #000;
      min-height: 70vh;

      .cl-stepBox {
        color: #313131;
        position: relative;
        padding: 0 25rem/36;

        .cl-account {
          padding-top: 6rem/36;
          color: @mainThemeColor;
          font-weight: 500;
        }

        .cl-step {
          padding-top: 20rem/36;
          width: 100%;

          img {
            width: 100%;
          }
        }

        .cl-art {
          padding-top: 12rem/36;
        }
      }
    }
  }
}
</style>
