<template>
  <div class="cl-deposit-wrap">
    <div class="cl-topBox">
      <headBack
        title="DEPOSIT"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
        :event-burial="['Deposit_Return_Click']"
      >
        <template>
          <div class="cl-top_right">
            <NuxtLink
              no-prefetch
              v-if="info"
              class="cl-flexcc cl-logined"
              :to="`/${locale}/account`"
            >
              <div
                class="cl-flexcc cl-accountInfo"
                @click.prevent="goWhere('account')"
              >
                <div class="cl-icon" />
                <div class="cl-balance">
                  {{ info?.balance?.toFixed(2) || '0.00' }}
                </div>
              </div>
            </NuxtLink>
            <div class="cl-flexce cl-right" v-else>
              <NuxtLink no-prefetch :to="`/${locale}/login`">
                <div
                  class="cl-flexcc cl-lkButton"
                  @click.prevent="goWhere('login')"
                >
                  <div>{{ $t('loginEntry.login') }}</div>
                </div>
              </NuxtLink>
              <NuxtLink no-prefetch :to="`/${locale}/register`">
                <div
                  class="cl-flexcc cl-bsbb cl-tcButton"
                  @click.prevent="goWhere('register')"
                >
                  <div>{{ $t('loginEntry.joinNow') }}</div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </template>
      </headBack>
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />
    <div class="cl-fixwidth" :class="isDepositSuccess ? 'cl-isDS' : 'cl-isNo'">
      <depositCom @tryEmit="tryEmit" />
      <template v-if="isDepositSuccess">
        <div class="cl-flexcc cl-footer-content">
          <div class="cl-width">
            <div style="height: calc(30rem / 36)" />
            <div class="cl-art">{{ $t('depositSuccess.art3') }}</div>
            <div style="height: calc(28rem / 36)" />
            <div class="cl-flexca">
              <div style="position: relative" @click="goContact">
                <div class="cl-liveWord" />
                <div class="cl-liveIcon" />
                <div class="cl-second">{{ $t('footer.online') }}</div>
                <div class="cl-third">7/24</div>
              </div>
              <div>
                <div class="cl-mailIcon" />
                <div class="cl-second">{{ $t('footer.call') }}</div>
                <div class="cl-third">{{ $t('mail') }}</div>
              </div>
            </div>
            <div style="height: calc(30rem / 36)" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="cl-isNoCom">
          <div
            v-if="!(accountInfo && accountInfo.first_deposit_activity === 1)"
            style="height: calc(78.5rem / 36)"
          >
            <div style="height: calc(15rem / 36)" />
            <div class="cl-firstChargeBanner">
              <firstChargeBanner :event-burial="['Deposit_Banner_Click']" />
            </div>
          </div>
          <div class="cl-listBox">
            <div style="height: calc(17rem / 36)" />
            <h2 class="cl-h2 cl-listTitle">{{ $t('firstDeposit.title1') }}</h2>
            <div style="height: calc(3rem / 36)" />
            <div class="cl-art">
              <div>{{ $t('firstDeposit.art1') }}</div>
              <div>{{ $t('firstDeposit.art2') }}</div>
            </div>
            <div style="height: calc(13rem / 36)" />
            <h2 class="cl-h2 cl-listTitle">{{ $t('firstDeposit.title2') }}</h2>
            <div style="height: calc(3rem / 36)" />
            <div class="cl-art">
              <span>{{ $t('firstDeposit.art3') }}</span>
              <br />
              <span v-html="$t('firstDeposit.art4')" />
            </div>
          </div>
        </div>
      </template>
      <div style="height: calc(72rem / 36)" />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import depositCom from '@/components/components/depositCom/depositCom.vue'
import firstChargeBanner from '@/components/components/firstChargeBanner.vue'

export default {
  components: { headBack, depositCom, firstChargeBanner },
  data() {
    return {
      isDepositSuccess: 0
    }
  },
  computed: {
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    info() {
      return this.$store.state.info
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 页面跳转
    goWhere(path) {
      Lib.common.event_statistics(`deposit_${path}`)
      this.$router.push({ path: `/${this.locale}` + '/' + path })
    },
    // 充值成功后，返回充值页面
    tryEmit(flag) {
      this.isDepositSuccess = flag
    },
    // 第三方客服
    goContact() {
      Lib.common.initiateCall(this)
    }
  }
}
</script>

<style scoped lang="less">
.cl-deposit-wrap {
  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;

    .cl-backIcon {
      .sprite(@icon-black-long-back, 108rem);
    }
    .cl-top_right {
      margin-right: 9rem/36;

      .cl-logined {
        .cl-accountInfo {
          .cl-icon {
            .sprite(@ticon-account-black, 108rem);
          }
          .cl-balance {
            margin-left: 7rem/36;
            font-weight: bold;
            font-size: 11rem/36;
            color: @whiteBalanceColor;
            white-space: nowrap;
          }
        }
      }

      .cl-tcButton {
        margin-left: 7rem/36;
        border: 1rem/36 solid @mainThemeColor;
      }
    }
  }

  .cl-fixwidth {
    min-height: 100vh;
    background-color: #fff;
    &.cl-isDS {
      background-color: @footLiveBgColor;
      .cl-footer-content {
        height: 259rem/36;
        background-color: @footLiveBgColor;
        color: #e4e4e4;
        .cl-art {
          color: #c8c8c8;
          font-size: 12rem/36;
          padding: 0 20rem/36;
          opacity: 0.8;
        }
        .cl-width {
          height: 259rem/36;
          text-align: center;

          .cl-liveWord {
            position: absolute;
            top: 0;
            right: 20%;
            .sprite(@icon-live-word, 108rem);
          }

          .cl-liveIcon {
            margin: 0 auto;
            .sprite(@icon-live, 108rem);
          }

          .cl-mailIcon {
            margin: 0 auto;
            .sprite(@icon-mail, 108rem);
          }

          .cl-second {
            font-size: 11rem/36;
            font-weight: bold;
          }

          .cl-third {
            font-size: 10rem/36;
            font-weight: 400;
          }
        }
      }
    }
    &.cl-isNo {
      color: #333;
      font-size: 11rem/36;
      .cl-isNoCom {
        padding: 0 10rem/36;
      }
      .cl-firstChargeBanner {
        position: absolute;
        width: 340rem/36;
        left: 10rem/36;
        overflow: hidden;
        /deep/ img {
          border-radius: @mainButtonRadius;
        }
      }
      .cl-listBox {
        .cl-listTitle {
          font-size: 11rem/36;
          font-weight: 600;
          color: #333;
        }

        .cl-art {
          font-weight: 400;
          color: #74747c;
          font-size: 11rem/36;
          line-height: 15rem/36;
        }
      }
    }
  }
}
</style>
