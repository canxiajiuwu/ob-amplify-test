<template>
  <div class="cl-orange-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('orange.title', { operator: 'MTN' })"
        :middle-word-style="{
          fontSize: 15 / 36 + 'rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div class="cl-container" :class="{ 'cl-fr_container': locale === 'fr' }">
      <img
        class="cl-img"
        :src="`${STATICURL}/images/lang/${locale}/common/orange/bg1.jpg`"
        alt="onebet | Orange Exclusive"
      />
      <div style="padding: 0 calc(17rem / 36); position: relative; z-index: 1">
        <div class="cl-word" v-html="$t('orange.word1', { operator: 'MTN' })" />

        <div class="cl-step cl-step1">
          <div class="cl-tag cl-tag1"></div>
          <div class="cl-art">
            {{ $t('orange.word2', { operator: 'MTN' }) }}
          </div>
          <div class="cl-gift cl-flexcs">
            <div class="cl-icon cl-icon1"></div>
            <div class="cl-art"><span>1,000 XAF</span> cash gift</div>
          </div>
          <div class="cl-coins cl-flexcs">
            <div class="cl-icon cl-icon2"></div>
            <div class="cl-art">
              <span>100 coins</span>
            </div>
          </div>
          <div class="cl-tips" v-if="brand !== 'mtn'">
            <div class="cl-tipsIcon"></div>
            <div class="cl-tipsWord">
              {{ $t('orange.word3', { operator: 'MTN' }) }}
            </div>
          </div>
          <div
            class="cl-claim cl-button"
            :class="{ 'cl-claimed': receive === 1 }"
            @click="claimFun"
          >
            {{ brand === 'mtn' ? $t('orange.claim') : $t('orange.register') }}
          </div>
        </div>

        <div class="cl-step cl-step2">
          <div class="cl-tag cl-tag2"></div>

          <div class="cl-box">
            <div class="cl-art" v-html="$t('orange.daily')"></div>

            <div class="cl-get cl-button" @click="getNowFun(0)">
              {{ $t('orange.get') }}
            </div>

            <div class="cl-link" @click="getNowFun(3)">
              {{ $t('orange.check') }}
            </div>
          </div>

          <div class="cl-box">
            <div class="cl-art" v-html="$t('orange.betOnly')"></div>

            <div class="cl-get cl-button" @click="getNowFun(1)">
              {{ $t('orange.get') }}
            </div>

            <div class="cl-link" @click="getNowFun(4)">
              {{ $t('orange.freebet') }}
              <span>{{ freeBetInfo.meta ? freeBetInfo.meta.amount : 0 }}</span>
            </div>
          </div>
        </div>

        <div class="cl-step cl-step3">
          <div class="cl-tag cl-tag3"></div>

          <div class="cl-art" v-html="$t('orange.deposit1')"></div>

          <div class="cl-art" v-html="$t('orange.deposit2')"></div>

          <div class="cl-deposit cl-button" @click="getNowFun(2)">
            {{ $t('orange.deposit') }}
          </div>

          <div class="cl-tips">{{ $t('orange.tips') }}</div>
        </div>

        <div class="cl-rules">
          <h2 class="cl-h2 cl-title">{{ $t('orange.rules') }}</h2>
          <div class="cl-list">
            <div
              class="cl-li"
              v-for="(item, index) in $t('orange.list')"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'Orange',
  components: { headBack },
  data() {
    return {
      receive: 0, // 0 未领取 1 已领取
      info: {}, // 用户信息
      freeBetInfo: {},
      brand: ''
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    winApp() {
      return window.appInteraction
    },
    isNewApp() {
      return Lib.store.get('isNewApp')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    if (this.token) {
      this.orangeInfoReq()
      this.userAccountInfo()
      this.reqFreebetInfo()
    }
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 数据请求
    orangeInfoReq() {
      this.$axios_api.orangeInfo({ token: this.token }).then((res) => {
        if (res.code === 0) this.receive = res.data.receive
      })
    },
    userAccountInfo() {
      this.$axios_api.userAccountInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.info = res.data
          this.brand = Lib.common.phoneNumberCompany(this, res.data.mobile)
        }
      })
    },
    // 请求数据
    reqFreebetInfo() {
      this.$axios_api
        .LeagueSoccerFreebetInfo({ token: this.token })
        .then((res) => {
          if (res.code === 0) this.freeBetInfo = res.data
        })
    },
    // 领取
    claimFun() {
      if (this.brand === 'mtn') {
        // 前往领取
        this.$axios_api.orangeReceive({ token: this.token }).then((res) => {
          if (res.code === 0) {
            this.receive = 1
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('orange.claimSuccess'),
              '',
              this.$t('reminder.button.ok')
            )
          } else if (res.code === 1) {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('orange.claimed'),
              '',
              this.$t('reminder.button.ok')
            )
          } else if (res.code === 404) {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('orange.only', { operator: 'MTN' }),
              '',
              this.$t('reminder.button.ok')
            )
          } else
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              res.msg,
              '',
              this.$t('reminder.button.ok')
            )
        })
      } else {
        // 前往注册
        this.$store.commit('setInfo', null)
        this.$store.commit('setAccountInfo', null)
        this.$store.commit('savePhoneNumber', '')
        this.$store.commit('setCheckInInfo', null)
        Lib.store.remove('token')
        if (this.isNewApp) return this.winApp.renewuserLogin('', 2)
        this.$router.push({
          path: `/${this.locale}/register`
        })
      }
    },
    // 前往
    getNowFun(index) {
      switch (index) {
        case 0:
          Lib.common.event_statistics(`orange_get_now1_click`)
          if (this.brand === 'mtn') {
            this.$router.push({ path: `/${this.locale}` })
          } else {
            Lib.common.errorReminder(
              this,
              'orange_bet',
              '',
              '',
              this.$t('orange.orangeReminder'),
              this.$t('orange.changeAccount'),
              this.$t('orange.coutinue')
            )
          }
          break
        case 1:
          Lib.common.event_statistics(`orange_get_now2_click`)
          if (this.brand === 'mtn') {
            this.$router.push({
              path: `/${this.locale}/onebetLeague`
            })
          } else {
            Lib.common.errorReminder(
              this,
              'orange_league',
              '',
              '',
              this.$t('orange.orangeReminder'),
              this.$t('orange.changeAccount'),
              this.$t('orange.coutinue')
            )
          }
          break
        case 2:
          Lib.common.event_statistics(`orange_deposit_now_click`)
          this.depositComTriggle(true)
          break
        case 3:
          Lib.common.event_statistics(`orange_check_freebet_click`)
          this.$router.push({
            path: `/${this.locale}/freebet`
          })
          break
        case 4:
          Lib.common.event_statistics(`orange_freebet_league_click`)
          this.$router.push({
            path: `/${this.locale}/onebetLeague-freebet`
          })
          break
      }
    },
    depositComTriggle(bool) {
      this.$store.commit('setFepositComShow', bool)
    }
  }
}
</script>

<style scoped lang="less">
.cl-orange-wrap {
  min-height: 100vh;
  width: 10rem;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 2;
  }

  .cl-container {
    position: relative;
    background-color: #fda01b;
    padding: 324rem/36 0 2rem;
    .cl-img {
      position: absolute;
      top: 0;
      width: 100%;
    }

    &.cl-fr_container {
      .cl-step {
        .cl-tag {
          &.cl-tag1 {
            background-image: url('~/static/images/lang/fr/common/orange/MTN1.png');
          }

          &.cl-tag2 {
            background-image: url('~/static/images/lang/fr/common/orange/MTN2.png');
          }

          &.cl-tag3 {
            background-image: url('~/static/images/lang/fr/common/orange/MTN3.png');
          }
        }
      }
    }

    .cl-word {
      color: #fff;
      padding-bottom: 15rem/36;
    }

    .cl-step {
      position: relative;
      background-color: #fff;
      border-radius: 3rem/36;
      box-shadow: 0 1rem/36 9rem/36 1rem/36 rgba(219, 141, 35, 0.54);
      box-sizing: border-box;
      margin-bottom: 17rem/36;
      padding: 42rem/36 17rem/36 18rem/36;

      .cl-tag {
        position: absolute;
        height: 56rem/72;
        width: 100%;
        top: 8rem/36;
        left: -8rem/36;
        background-size: contain;
        background-repeat: no-repeat;

        &.cl-tag1 {
          background-image: url('~/static/images/lang/en/common/orange/MTN1.png');
        }

        &.cl-tag2 {
          background-image: url('~/static/images/lang/en/common/orange/MTN2.png');
        }

        &.cl-tag3 {
          background-image: url('~/static/images/lang/en/common/orange/MTN3.png');
        }
      }

      .cl-art {
        color: #c2760b;
        font-size: 12rem/36;
        padding-bottom: 10rem/36;
        line-height: 14rem/36;

        span {
          color: #f45f1c;
          font-weight: bold;
        }
      }

      .cl-icon {
        width: 36rem/72;
        height: 36rem/72;
        margin: 0 6rem/36 10rem/36 0;
        background-size: cover;
        background-repeat: no-repeat;

        &.cl-icon1 {
          background-image: url('~/static/images/lang/common/orange/gift.png');
        }

        &.cl-icon2 {
          background-image: url('~/static/images/lang/common/orange/coins.png');
        }
      }

      .cl-tips {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        .cl-tipsIcon {
          width: 28rem/72;
          height: 28rem/72;
          flex-shrink: 0;
          margin-right: 6rem/36;
          background-size: cover;
          background-image: url('~/static/images/lang/common/orange/tips.png');
        }

        .cl-tipsWord {
          color: #f64c13;
          font-size: 11rem/36;
          line-height: 13rem/36;
        }
      }

      .cl-button {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        border-radius: 18rem/36;
        background: linear-gradient(0deg, #bf61e1, #f15aba);
        margin: 10rem/36 auto 0;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 1rem/36 3rem/36 rgba(237, 33, 25, 0.35);
        height: 1rem;

        &.cl-claim {
          width: 210rem/36;
          font-size: 17rem/36;

          &.cl-claimed {
            background: #c4c4c4;
          }
        }

        &.cl-get {
          width: fit-content;
          padding: 0 15rem/36;
          height: 28rem/36;
        }

        &.cl-deposit {
          width: 210rem/36;
          font-size: 17rem/36;
        }
      }

      .cl-link {
        text-align: center;
        color: #f45f1c;
        font-size: 9rem/36;
        text-decoration: underline;
        padding-top: 7rem/36;
      }

      .cl-box {
        width: 307rem/36;
        background-color: #fff0d4;
        border-radius: 3rem/36;
        box-sizing: border-box;
        padding: 18rem/36 10rem/36 10rem/36;
        margin: 0 0 7rem/36 -7rem/36;
      }

      .cl-tips {
        color: #afaeaf;
        font-size: 11rem/36;
        padding-top: 15rem/36;
      }
    }

    .cl-rules {
      color: #fff;
      font-size: 11rem/36;
      line-height: 15rem/36;

      .cl-title {
        font-size: 13rem/36;
        font-weight: bold;
        padding-bottom: 8rem/36;
      }

      .cl-list {
        opacity: 0.9;
      }
    }
  }
}
</style>
