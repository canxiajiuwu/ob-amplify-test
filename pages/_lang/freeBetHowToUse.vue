<template>
  <div class="cl-freeBetHowToUse-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('freebetHow.title').toUpperCase()"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div class="cl-container">
      <div class="cl-content">
        <div class="cl-stepBox">
          <h3 class="cl-h3 cl-art">{{ $t('freebetHow.art') }}</h3>
          <div class="cl-step1 cl-step">
            <img
              :src="`/images/lang/${locale}/${country}/freeBetHow/1.png`"
              alt="onebet | step1"
            />
          </div>
          <h3 class="cl-h3 cl-art">
            <span>{{ $t('freebetHow.art1') }}</span>
            <div v-html="$t('freebetHow.art1-1')"></div>
          </h3>
          <div class="cl-step2 cl-step">
            <img
              :src="`/images/lang/${locale}/${country}/freeBetHow/2.png`"
              alt="onebet | step2"
            />
          </div>
          <h3 class="cl-h3 cl-art">
            <span>{{ $t('freebetHow.art2') }}</span>
            {{ $t('freebetHow.art2-1') }}
          </h3>

          <h2 class="cl-h2 cl-title1">{{ $t('freebetHow.title1') }}</h2>
          <h3 class="cl-h3 cl-art">{{ $t('freebetHow.art3') }}</h3>
        </div>
      </div>
      <div style="height: calc(90rem / 36)" />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'FreeBetHowToUse',
  components: { headBack },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
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
  }
}
</script>

<style scoped lang="less">
.cl-freeBetHowToUse-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }

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
      box-sizing: border-box;
      padding: 5rem/36 5rem/36 20rem/36;
      color: #000;

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

          &.cl-step1 {
            img {
              width: 300rem/36;
              height: 276rem/36;
            }
          }

          &.cl-step2 {
            img {
              width: 300rem/36;
              height: 569rem/36;
            }
          }
        }

        .cl-art {
          line-height: 16rem/36;
          padding-top: 12rem/36;

          span {
            padding-right: 4rem/36;
            color: @mainThemeColor;
            font-weight: 500;
          }

          div {
            display: inline;
          }
        }
      }
    }
  }
}
</style>
