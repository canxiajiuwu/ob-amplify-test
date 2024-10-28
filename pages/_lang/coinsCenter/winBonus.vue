<template>
  <div
    class="cl-winBonus-wrap"
    :style="{ top: `calc(163rem/36 + ${safeAreaTop}px)` }"
  >
    <div class="cl-content">
      <div
        v-for="(item, index) in spinList[$store.state.root.country]"
        :key="index"
        class="cl-item"
      >
        <div
          class="cl-modal"
          :class="{ 'cl-select': `ug-${spinOrder[selectIndex]}` === index }"
        ></div>
        <div
          v-if="index === 'ug-1' || index === 'ug-2'"
          class="cl-free cl-bonusBg"
        >
          <div class="cl-name">{{ item }}</div>
          <div class="cl-word">Freebet</div>
          <div class="cl-freeIcon"></div>
        </div>
        <div
          v-else-if="index === 'ug-3' || index === 'ug-4' || index === 'ug-5'"
          class="cl-gift cl-bonusBg"
        >
          <div class="cl-name">{{ item }}</div>
          <div class="cl-word">Cash Gift</div>
          <div class="cl-giftIcon"></div>
        </div>
        <div
          v-else-if="index === 'ug-6' || index === 'ug-7'"
          class="cl-cash cl-bonusBg"
        >
          <div class="cl-name">{{ item }}</div>
          <div class="cl-word">Cash</div>
          <div class="cl-cashIcon"></div>
        </div>
        <div v-else-if="index === 'ug-8'" class="cl-try cl-bonusBg">
          <div class="cl-name" v-html="$t('coinsCenter.again')"></div>
        </div>
        <div
          v-else
          class="cl-play"
          :class="{ 'cl-notPlay': !canRotate }"
          @click="play"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: '',
  props: ['coinsInfo'],
  data() {
    return {
      spinList: {
        cm: {
          'ug-1': '50',
          'ug-4': '100',
          'ug-8': 'Try <br> Again',
          'ug-6': '50',
          'ug-9': 'play',
          'ug-2': '100',
          'ug-5': '1,000',
          'ug-3': '50',
          'ug-7': '200'
        },
        ug: {
          'ug-1': '200',
          'ug-4': '500',
          'ug-8': 'Try <br> Again',
          'ug-6': '500',
          'ug-9': 'play',
          'ug-2': '500',
          'ug-5': '5,000',
          'ug-3': '200',
          'ug-7': '2,000'
        }
      },
      spinOrder: [1, 4, 8, 2, 7, 3, 5, 6],
      selectIndex: 0,
      canRotate: true,
      rotateInterval: '',
      unique_id: 8
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    // 用户信息
    info() {
      return this.$store.state.info
    },
    unit() {
      if (this.unique_id === 1 || this.unique_id === 2) {
        return 'Freebet'
      } else if (this.unique_id === 6 || this.unique_id === 7) {
        return 'Cash'
      } else {
        return 'Cash Gift'
      }
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    if (!this.info) this.getInfo()
  },
  destroyed() {
    this.rotateInterval && clearInterval(this.rotateInterval)
  },
  methods: {
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

      if (this.info.coins >= 40) {
        if (!this.canRotate) {
          return
        }

        this.canRotate = false
        this.unique_id = 8

        // 返回数据前默认旋转
        this.bigWheelRotate()
        // 获取抽奖结果
        this.bigWheelAward()
      } else {
        this.canRotate = false
        Lib.common.errorReminderUp(this, true, this.$t('reminder.coins'), 0)
      }
    },
    // 获取抽奖结果
    bigWheelAward() {
      this.$axios_api
        .bigWheel({
          token: this.token
        })
        .then((res) => {
          this.canRotate = true
          if (res.code === 0) {
            this.unique_id = res.data.id
            // 提交info信息修改
            const info = this.info
            info.coins = res.data.coins
            if (res.data.type === 6 && res.data.type === 7) {
              info.balance = res.data.balance
            }
            this.$store.commit('setInfo', info)
          } else {
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          }
          this.requestBack()
        })
    },
    // 中奖返回
    requestBack() {
      this.rotateInterval && clearInterval(this.rotateInterval)
      let count = 0
      this.rotateInterval = setInterval(() => {
        count++
        // 数据滚动
        this.selectIndex++
        if (this.selectIndex > 7) this.selectIndex = 0
        // 数据返回后滚动2s
        if (count > 10) {
          // 滚动到中奖位置
          if (this.spinOrder[this.selectIndex] === this.unique_id) {
            this.rotateInterval && clearInterval(this.rotateInterval)
            if (this.unique_id !== 8) {
              Lib.common.errorReminder(
                this,
                '',
                '',
                '',
                this.$t('coinsSpin.reminder', {
                  prize:
                    this.spinList[this.$store.state.root.country][
                      `ug-${this.unique_id}`
                    ] +
                    ' ' +
                    this.unit
                }),
                this.$t('reminder.button.ok'),
                ''
              )
            }
          }
        }
      }, 200)
    },
    // 默认转动
    bigWheelRotate() {
      this.rotateInterval && clearInterval(this.rotateInterval)
      this.rotateInterval = setInterval(() => {
        // 数据滚动
        this.selectIndex++
        if (this.selectIndex > 7) this.selectIndex = 0
      }, 200)
    },
    // 获取info
    getInfo() {
      this.$axios_api
        .userInfo({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            // 设置用户属性
            this.$store.commit('setInfo', res.data)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-winBonus-wrap {
  position: absolute;
  bottom: 0;
  width: 10rem;
  background-color: #ae3100;

  .cl-content {
    padding: 10rem/36 13rem/36;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #d55200;
    flex-wrap: wrap;

    .cl-item {
      margin-bottom: 7rem/36;
      position: relative;

      .cl-modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        &.cl-select {
          background-color: rgba(255, 218, 9, 0.3);
          border-radius: 6rem/36;
        }
      }
    }

    .cl-bonusBg {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .sprite(@coins-bg,108rem);

      .cl-name {
        position: relative;
        z-index: 5;
        font-size: 20rem/36;
        font-weight: bold;
        text-align: center;
      }

      .cl-word {
        position: relative;
        z-index: 5;
        font-size: 11rem/36;
      }

      .cl-freeIcon {
        position: relative;
        z-index: 5;
        margin: 5rem/36;
        .sprite(@coins-free,108rem);
      }

      .cl-giftIcon {
        position: relative;
        z-index: 5;
        margin: 5rem/36;
        .sprite(@coins-gift,108rem);
      }

      .cl-cashIcon {
        position: relative;
        z-index: 5;
        margin: 5rem/36;
        .sprite(@coins-cash,108rem);
      }
    }

    .cl-play {
      position: relative;
      z-index: 10;
      .sprite(@coins-button,108rem);

      &.cl-notPlay {
        opacity: 0.5;
      }
    }
  }
}
</style>
