<template>
  <div
    class="cl-getCoins-wrap"
    :style="{ top: `calc(163rem/36 + ${safeAreaTop}px)` }"
  >
    <div class="cl-itemBox">
      <div class="cl-flexcb cl-item">
        <div class="cl-left">
          <div class="cl-top">
            +50
            <div class="cl-icon" />
          </div>
          <div class="cl-name">{{ $t('coinsCenter.checkIn') }}</div>
        </div>
        <div class="cl-right">
          <div
            v-if="coinsInfo && coinsInfo.check_in === 1"
            class="cl-flexcc cl-button cl-checked"
          >
            {{ $t('coinsCenter.finish') }}
          </div>
          <div v-else class="cl-flexcc cl-button" @click="goWhere(0)">
            {{ $t('coinsCenter.checkInNow') }}
          </div>
        </div>
      </div>

      <div v-if="!APP" class="cl-flexcb cl-item">
        <div class="cl-left">
          <div class="cl-top">
            +100
            <div class="cl-icon" />
          </div>
          <div class="cl-name">{{ $t('coinsCenter.app') }}</div>
        </div>
        <div class="cl-right">
          <div
            v-if="coinsInfo && coinsInfo.app_login === 1"
            class="cl-flexcc cl-button cl-checked"
          >
            {{ $t('coinsCenter.finish') }}
          </div>
          <div v-else class="cl-flexcc cl-button" @click="goWhere(1)">
            {{ $t('coinsCenter.download') }}
          </div>
        </div>
      </div>

      <div class="cl-flexcb cl-item">
        <div class="cl-left">
          <div class="cl-top">
            +15
            <div class="cl-icon"></div>
          </div>
          <div class="cl-name">{{ $t('coinsCenter.real') }}</div>
          <div class="cl-word">{{ $t('betslipBack.preMatch') }}</div>
        </div>
        <div class="cl-right">
          <div
            v-if="coinsInfo && coinsInfo.bet_real_sport === 1"
            class="cl-flexcc cl-button cl-checked"
          >
            {{ $t('coinsCenter.finish') }}
          </div>
          <div v-else class="cl-flexcc cl-button" @click="goWhere(2)">
            {{ $t('coinsCenter.betNow') }}
          </div>
        </div>
      </div>

      <div class="cl-flexcb cl-item">
        <div class="cl-left">
          <div class="cl-top">
            +20
            <div class="cl-icon"></div>
          </div>
          <div class="cl-name">{{ $t('coinsCenter.virtual') }}</div>
          <div class="cl-word">OneBet League</div>
        </div>
        <div class="cl-right">
          <div
            v-if="coinsInfo && coinsInfo.bet_virtual_sport === 1"
            class="cl-flexcc cl-button cl-checked"
          >
            {{ $t('coinsCenter.finish') }}
          </div>
          <div v-else class="cl-flexcc cl-button" @click="goWhere(3)">
            {{ $t('coinsCenter.betNow') }}
          </div>
        </div>
      </div>

      <div class="cl-flexcb cl-item">
        <div class="cl-left">
          <div class="cl-top">
            +15
            <div class="cl-icon"></div>
          </div>
          <div class="cl-name">{{ $t('coinsCenter.jackpot') }}</div>
        </div>
        <div class="cl-right">
          <div
            v-if="coinsInfo && coinsInfo.bet_jackpot === 1"
            class="cl-flexcc cl-button cl-checked"
          >
            {{ $t('coinsCenter.finish') }}
          </div>
          <div v-else class="cl-flexcc cl-button" @click="goWhere(4)">
            {{ $t('coinsCenter.betNow') }}
          </div>
        </div>
      </div>
    </div>

    <div class="cl-instructions">
      <h2 class="cl-h2 cl-title">{{ $t('coinsSpin.instructions') }}</h2>
      <div class="cl-content">
        <div class="cl-li" v-html="$t('coinsCenter.li')"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  props: ['coinsInfo'],
  computed: {
    APP() {
      return typeof window !== 'undefined' ? window.APP || null : null
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  methods: {
    goWhere(index) {
      if (index === 0) {
        Lib.common.event_statistics(`coinsCenter_task_checkIn`)
        this.$emit('checkIn')
      } else if (index === 1) {
        Lib.common.event_statistics(`coinsCenter_task_download`)
        this.$router.push({
          path: `/${this.locale}/download`
        })
      } else if (index === 2) {
        Lib.common.event_statistics(`coinsCenter_task_real`)
        this.$router.push({
          path: `/${this.locale}`
        })
      } else if (index === 3) {
        Lib.common.event_statistics(`coinsCenter_task_virtual`)
        this.$router.push({
          path: `/${this.locale}/onebetLeague`
        })
      } else if (index === 4) {
        Lib.common.event_statistics(`coinsCenter_task_jackpot`)
        this.$router.push({
          path: `/${this.locale}/jackpotEntrance`
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-getCoins-wrap {
  position: absolute;
  bottom: 0;
  width: 10rem;
  overflow: auto;

  .cl-itemBox {
    padding-top: 6rem/36;

    .cl-item {
      height: 70rem/36;
      background-color: #fff;
      box-sizing: border-box;
      border-bottom: 0.5rem/36 solid #d4dae1;
      padding: 0 11rem/36;

      .cl-left {
        .cl-top {
          color: #ff6c00;
          font-size: 13rem/36;
          font-weight: bold;

          .cl-icon {
            display: inline-block;
            .sprite(@menu-sign,108rem);
          }
        }

        .cl-name {
          font-weight: bold;
          color: #000;
          font-size: 11rem/36;
          padding: 3rem/36 0;
        }

        .cl-word {
          color: rgba(0, 0, 0, 0.8);
          font-size: 10rem/36;
        }
      }

      .cl-right {
        .cl-button {
          min-width: 83rem/36;
          padding: 0 8rem/36;
          height: 26rem/36;
          border-radius: @mainButtonRadius;
          background-color: #fcdb06;
          color: #333;
          font-size: 10rem/36;
          font-weight: bold;

          &.cl-checked {
            color: rgba(51, 51, 51, 0.6);
            background-color: #dfdfdf;
          }
        }
      }
    }
  }

  .cl-instructions {
    color: #333;
    padding: 18rem/36 10rem/36;

    .cl-title {
      font-weight: bold;
      font-size: 15rem/36;
      padding-bottom: 12rem/36;
    }

    .cl-li {
      line-height: 16rem/36;
    }
  }
}
</style>
