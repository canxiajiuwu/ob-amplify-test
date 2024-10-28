<template>
  <div class="cl-coinsSpinComponent-wrap">
    <client-only>
      <div class="cl-container cl-flexcc">
        <div class="cl-news cl-flexcc">
          <div class="cl-scrollingItem cl-bouncein" v-html="msg" />
        </div>
        <div class="cl-pic cl-flexcc">
          <div
            id="bigWheelBg"
            class="cl-bg"
            :style="{ transform: degBoxValue }"
          >
            <img
              :src="`${STATICURL}/images/lang/${locale}/${country}/coinsSpin/wheel1.png`"
              alt="onebet | coins spin"
            />
          </div>
          <div class="cl-pointer">
            <img
              src="@/assets/images/general/notSprites/coinsSpin/point.png"
              alt="onebet pointer"
            />
          </div>
        </div>

        <div
          class="cl-button cl-flexcc"
          :class="{ 'cl-grayButton': coins < 20 }"
          @click="play"
        >
          <div class="cl-play">{{ $t('coinsSpin.play') }}</div>
          <div class="cl-word">{{ $t('coinsSpin.pay') }}</div>
        </div>

        <div class="cl-terms">
          <h2 class="cl-h2 cl-title">{{ $t('coinsSpin.more') }}</h2>
          <div class="cl-art cl-art1">{{ $t('coinsSpin.art1') }}</div>
          <div class="cl-screen">
            <img
              src="@/assets/images/general/notSprites/coinsSpin/screen.png"
              alt="onebet pointer"
            />
          </div>
          <div
            class="cl-art cl-art2"
            @click="betNow"
            v-html="$t('coinsSpin.art2')"
          />
          <div
            class="cl-art cl-art3"
            @click="download"
            v-html="$t('coinsSpin.art3')"
          />

          <h2 class="cl-h2 cl-title">{{ $t('coinsSpin.instructions') }}</h2>
          <div class="cl-art cl-art4" v-html="$t('coinsSpin.ins1')"></div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: 'CoinsSpinComponent',
  data() {
    return {
      // 能否旋转
      canRotate: true,
      rotNum: 0,
      rotNumAfter: 0,
      unique_id: 1,
      degBoxValue: 0,
      wheelData: [
        [1], // 1
        [5], // 2
        [2], // 3
        [0], // 4
        [3, 7], // 5
        [6], // 6
        [4] // 7
      ],
      msg: ''
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    // 用户信息
    info() {
      return this.$store.state.info
    },
    // coins
    coins() {
      return this.info ? this.info.coins : 0
    },
    message() {
      return this.$store.state.message
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    if (!this.info) this.getInfo()

    // 消息接收
    this.setInterTimer = setInterval(() => (this.msg = this.message), 7000)
  },
  beforeDestroy() {
    this.setInterTimer && clearInterval(this.setInterTimer)
  },
  methods: {
    // betnow
    betNow() {
      Lib.common.event_statistics('coinsSpin_bet_now')
      this.$router.push({ path: `/${this.$store.state.root.locale}` })
    },
    // download
    download() {
      Lib.common.event_statistics('coinsSpin_download')
      this.$router.push({ path: `/${this.$store.state.root.locale}/download` })
    },
    // 获取info
    getInfo() {
      this.$axios_api
        .userInfo({
          token: this.token
        })
        .then((res) => {
          // 设置用户属性
          if (res.code === 0) this.$store.commit('setInfo', res.data)
        })
    },
    // 点击领取
    play() {
      Lib.common.event_statistics('CoinsSpin-play')

      if (!this.info) {
        Lib.common.errorReminder(
          this,
          'login',
          '',
          '',
          this.$t('reminder.unLogin'),
          '',
          this.$t('reminder.button.ok')
        )
        return
      }

      if (this.info.coins >= 20) {
        if (!this.canRotate) return

        this.isReturn = false
        this.canRotate = false

        this.unique_id = 1

        // 返回数据前默认旋转
        this.bigWheelRotate()
        // 获取抽奖结果
        this.bigWheelAward()

        let num = 0
        const newInterval = setInterval(() => {
          num++
          if (this.isReturn) {
            clearInterval(newInterval)
            // 请求有结果
            let wheelPosition = 1
            const length = this.wheelData[this.unique_id - 1].length
            const random = parseInt(Math.random() * length)
            wheelPosition = this.wheelData[this.unique_id - 1][random]

            this.degBoxValue =
              'rotate(' +
              (720 * this.rotNum +
                2160 * this.rotNumAfter +
                (360 / 8) * wheelPosition) +
              'deg' +
              ')'

            if (this.unique_id !== 1) {
              setTimeout(() => {
                this.isPrize = true
                this.canRotate = true
                Lib.common.errorReminder(
                  this,
                  '',
                  '',
                  '',
                  this.$t('coinsSpin.reminder', {
                    prize: this.$t(`coinsSpin.prizes`)[this.unique_id - 1]
                  }),
                  this.$t('reminder.button.ok'),
                  ''
                )
              }, 6000)
            } else {
              setTimeout(() => (this.canRotate = true), 6000)
            }
          } else {
            // 请求没有结果
            // eslint-disable-next-line no-lonely-if
            if (num < 6) this.bigWheelRotate()
            else {
              clearInterval(newInterval)
              this.canRotate = true
              Lib.common.errorReminderUp(
                this,
                true,
                this.$t('reminder.network'),
                0
              )
            }
          }
        }, 1000)
      } else
        Lib.common.errorReminderUp(this, true, this.$t('reminder.coins'), 0)
    },
    // 获取抽奖结果
    bigWheelAward() {
      this.$axios_api
        .bigWheel({ token: this.token })
        .then((res) => {
          this.isReturn = true
          if (res.code === 0) {
            this.isReturn = true
            this.rotNumAfter++
            this.unique_id = res.data.id

            // 提交info信息修改
            const info = this.info
            info.coins = res.data.coins
            if (res.data.type === 1) info.balance = res.data.balance

            this.$store.commit('setInfo', info)
          } else Lib.common.errorReminderUp(this, true, res.msg, 0)
        })
        .catch((err) => {
          console.log(err)
          //  Lib.common.errorReminder('Oops, network error occurred. Your coins also will returned to you. Please try again.',this)
        })
    },
    // 默认转动
    bigWheelRotate() {
      this.rotNum++
      this.degBoxValue =
        'rotate(' + (720 * this.rotNum + 2160 * this.rotNumAfter) + 'deg' + ')'
    }
  }
}
</script>

<style scoped lang="less">
.cl-coinsSpinComponent-wrap {
  width: 100%;

  .cl-container {
    padding-top: 12rem/36;
    background-color: #45138e;
    flex-direction: column;

    .cl-news {
      width: 267rem/36;
      height: 20rem/36;
      margin: 0 auto 10rem/36;
      text-align: center;
      color: #fff;
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
      background-color: #995bf2;
      border-radius: 10rem/36;
    }

    .cl-pic {
      position: relative;
      width: 310rem/36;
      height: 310rem/36;
      background-image: url('~@/assets/images/general/notSprites/coinsSpin/bg.png');
      background-size: 100% 100%;

      .cl-bg {
        width: 246rem/36;
        height: 246rem/36;
        -o-transform: transform 6s ease-out;
        -ms-transform: transform 6s ease-out;
        -moz-transform: transform 6s ease-out;
        -webkit-transform: transform 6s ease-out;
        transition: transform 6s ease-out;
        -o-transform-origin: 50% 50%;
        -ms-transform-origin: 50% 50%;
        -moz-transform-origin: 50% 50%;
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;

        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-perspective: 1000;
        -moz-perspective: 1000;
        -ms-perspective: 1000;
        perspective: 1000;

        img {
          width: 246rem/36;
          height: 246rem/36;
        }
      }

      .cl-pointer {
        position: absolute;
        left: 120rem/36;
        top: 108rem/36;
        width: 66rem/36;
        height: 85rem/36;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .cl-button {
      margin-top: 20rem/36;
      width: 300rem/36;
      height: 47rem/36;
      background-color: #ff7017;
      border-radius: 3rem/36;
      text-align: center;
      color: #fff;
      font-weight: bold;
      flex-direction: column;

      .cl-play {
        font-size: 13rem/36;
        text-transform: uppercase;
      }

      .cl-word {
        padding-top: 2rem/36;
        font-size: 10rem/36;
      }
    }

    .cl-terms {
      color: #fff;
      padding: 0 10rem/36 30rem/36;

      .cl-screen {
        width: 315rem/36;
        margin: 0 auto;

        img {
          width: 315rem/36;
          height: 162rem/36;
        }
      }

      .cl-title {
        font-weight: bold;
        font-size: 15rem/36;
        padding-top: 33rem/36;
      }

      .cl-art {
        opacity: 0.8;
        padding: 10rem/36 0;
      }
    }
  }
}

@keyframes bouncein {
  0% {
    transform: matrix(1, 0, 0, 1, 360, 0);
  }
  100% {
    transform: matrix(1, 0, 0, 1, -360, 0);
  }
}

.cl-bouncein {
  animation: bouncein 7s linear infinite;
}
</style>
