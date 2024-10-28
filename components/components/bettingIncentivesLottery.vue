<template>
  <div class="cl-bettingIncentivesLottery-wrap">
    <div class="cl-gameBox cl-flexcc">
      <div class="cl-bg cl-bg1" v-show="bgStyle"></div>
      <div class="cl-bg cl-bg2"></div>
      <div
        class="cl-start"
        :class="{ 'cl-opacity': play || award }"
        @click="move"
      ></div>
      <ul>
        <li
          v-for="(item, i) in list"
          :key="i"
          :class="[
            'no-item' + (i + 1),
            { 'cl-firstItem': i === 0 },
            { 'cl-act': index === i }
          ]"
        >
          <div class="cl-white">
            <div class="cl-prizePic">
              <img :class="item.class" :src="STATICURL + item.pic" alt="" />
            </div>
            <div class="cl-prizeName">
              <div class="cl-quantity">
                {{ item.quantity }}
              </div>
              {{ item.name }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <p
      class="cl-chance"
      v-if="left_bet"
      v-html="$t('bettingIncentives.more', { times: left_bet })"
    ></p>
    <p
      class="cl-chance"
      v-html="$t('bettingIncentives.free', { award: award })"
    ></p>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: 'BettingIncentivesLottery',
  data() {
    return {
      list: [
        {
          // 三星手机
          quantity: '',
          name: this.$t('bettingIncentives.first'),
          pic: '/images/betPrizes/1.png',
          class: 'cl-firstPic'
        },
        {
          // 200/50 cash gift
          quantity: this.$t('bettingIncentives.small'),
          name: this.$t('bettingIncentives.cash'),
          pic: '/images/betPrizes/cash.png',
          class: 'cl-cashGift'
        },
        {
          // 500/100 freebet
          quantity: this.$t('bettingIncentives.big'),
          name: this.$t('bettingIncentives.freebet'),
          pic: '/images/betPrizes/freebet.png',
          class: 'cl-freeBet'
        },
        {
          // 话费
          quantity: '50000',
          name: this.$t('bettingIncentives.second'),
          pic: '/images/betPrizes/2.png',
          class: 'cl-airtime'
        },
        {
          // 500/100 cash gift
          quantity: this.$t('bettingIncentives.big'),
          name: this.$t('bettingIncentives.cash'),
          pic: '/images/betPrizes/cash.png',
          class: 'cl-cashGift'
        },
        {
          // 流量
          quantity: '5 G',
          name: this.$t('bettingIncentives.third'),
          pic: '/images/betPrizes/3.png',
          class: 'cl-mbs'
        },
        {
          // 200/50 freebet
          quantity: this.$t('bettingIncentives.small'),
          name: this.$t('bettingIncentives.freebet'),
          pic: '/images/betPrizes/freebet.png',
          class: 'cl-freeBet'
        }
      ], // 奖品列表
      index: 0, // 当前转动到哪个位置，第一次起点位置0,对应页面item1位置
      times: 0, // 转动跑格子次数,
      cycle: 49, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      speed: 200, // 初始转动速度
      timer: 0, // 转动定时器
      lamp: 0, // 边框灯闪烁定时器
      prizeOrder: [1, 6, 4, 2], // 后端奖品id对应前端奖品位置
      prize: 0, // 中奖位置，接口返回
      bgStyle: true,
      play: true, // play按钮是否高亮
      award: 0, // 抽奖次数
      left_bet: 0, // 再投注多少次获得抽奖机会
      loginStatus: true // 记录登录状态,
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    }
  },
  watch: {
    // 首次打开活动页面无论有无抽奖次数,play不透明,使用次数后才会透明
    award(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.play = false
      }
    }
  },
  mounted() {
    this.lampLight()
    // 获取页面信息
    this.getInfo()
  },
  beforeDestroy() {
    clearInterval(this.lamp)
  },
  methods: {
    getInfo() {
      this.$axios_api
        .betawardInfo({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.left_bet = res.data.left_bet
            this.award = res.data.award
          } else if (res.code === 10101) {
            this.loginStatus = false
          } else {
            Lib.common.errorReminder(this, '', 'C', '', res.msg, 'OK')
          }
        })
    },
    // 点击开始抽奖
    move() {
      if (!this.loginStatus) {
        Lib.common.errorReminder(
          this,
          'login',
          'C',
          '',
          this.$t('reminder.unLogin'),
          'OK'
        )
        return
      }
      if (this.left_bet === 0 && this.award === 0) {
        // 抽奖机会用光
        Lib.common.errorReminder(
          this,
          '',
          'C',
          '',
          this.$t('bettingIncentives.noChance'),
          'OK'
        )
        return
      }
      if (this.award === 0) {
        // 机会未激活
        Lib.common.errorReminder(
          this,
          'betPrize',
          'C',
          '',
          this.$t('bettingIncentives.more2', { times: this.left_bet }),
          'OK'
        )
        return
      }
      Lib.common.event_statistics('betPrize_bettingIncentives_play')
      this.$axios_api
        .betawardReceive({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            clearInterval(this.lamp)
            this.left_bet = res.data.left_bet
            this.award = res.data.award
            this.prize = this.prizeOrder[res.data.prize_id - 1] // 奖品id对应奖品位置
            this.speed = 200 // 每次抽奖速度初始化为200
            this.startRoll() // 执行抽奖
          } else if (res.code !== 10101) {
            Lib.common.errorReminder(this, '', 'C', '', res.msg, 'OK')
          }
        })
    },
    // 开始转动
    startRoll() {
      this.times += 1 // 转动次数
      this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      this.usePrize()
    },

    // 每一次转动
    oneRoll() {
      let index = this.index // 当前转动到哪个位置
      const count = 7 // 总共有多少个位置
      index += 1
      if (index > count - 1) {
        index = 0
      }
      this.index = index
      // 每三次转动,灯闪一次
      if (this.times % 2 === 0) {
        this.bgStyle = !this.bgStyle
      }
    },

    usePrize() {
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle + 10 && this.prize === this.index) {
        clearTimeout(this.timer) // 清除转动定时器
        this.lampLight()
        this.times = 0 // 转动跑格子次数初始化为0，可以开始下次抽奖

        const length = this.prizeOrder.length
        for (let i = 0; i < length; i++) {
          if (this.prize === this.prizeOrder[i]) {
            // 弹窗恭喜 1 6 4 2
            setTimeout(() => {
              Lib.common.errorReminder(
                this,
                '',
                'C',
                '',
                this.$t('bettingIncentives.con', {
                  quantity:
                    i < 2
                      ? this.$t('bettingIncentives.small')
                      : this.$t('bettingIncentives.big'),
                  kind:
                    i % 2 === 0
                      ? this.$t('bettingIncentives.cash')
                      : this.$t('bettingIncentives.freebet')
                }),
                'OK'
              )
            }, 1500)
          }
        }
      } else {
        if (this.times < this.cycle - 15) {
          this.speed -= 13 // 加快转动速度
        } else {
          this.speed += 20 // 抽奖即将结束，放慢转动速度
        }
        this.timer = setTimeout(this.startRoll, this.speed) // 开始转动
      }
    },
    lampLight() {
      setInterval(() => {
        this.bgStyle = !this.bgStyle
      }, 618)
    }
  }
}
</script>

<style scoped lang="less">
.cl-bettingIncentivesLottery-wrap {
  .cl-gameBox {
    position: relative;
    width: 868rem/108;
    height: 868rem/108;
    margin: 72rem/108 auto 90rem/108;
    .cl-bg {
      position: absolute;
      top: -55rem/108;
      left: -59rem/108;
      width: 985rem/108;
      height: 977rem/108;
    }
    .cl-bg1 {
      background: url(../../assets/images/bettingIncentives/bg.png) no-repeat
        center/cover;
      z-index: 2;
    }
    .cl-bg2 {
      background: url(../../assets/images/bettingIncentives/bg2.png) no-repeat
        center/cover;
      z-index: 1;
    }
    .cl-start {
      position: absolute;
      width: 272rem/108;
      height: 272rem/108;
      background: url(../../assets/images/bettingIncentives/btn.png) no-repeat
        center/cover;
      z-index: 3;
      opacity: 0.6;
      animation: liveScale linear 1.3s infinite;
    }
    @keyframes liveScale {
      0% {
        transform: scale(1);
      }

      25% {
        transform: scale(1.03);
      }

      50% {
        transform: scale(1);
      }

      75% {
        transform: scale(0.97);
      }
      100% {
        transform: scale(1);
      }
    }
    .cl-opacity {
      opacity: 1;
    }
    ul {
      list-style: none;
      li {
        position: absolute;
        box-sizing: border-box;
        width: 276rem/108;
        height: 276rem/108;
        border: 4rem/108 solid #ff5f2f;
        border-radius: 20rem/108;
        overflow: hidden;
        background: #f8c4b7;
        z-index: 3;
        .cl-white {
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 268rem/108;
          height: 248rem/108;
          padding: 0 0 0 10rem/108;
          background: #fffbf9;
          border-radius: 0 0 20rem/108 20rem/108;
        }
      }
      .cl-firstItem {
        width: 276rem/108;
        height: 572rem/108;
        .cl-white {
          display: block;
          height: 544rem/108;
          .cl-prizeName {
            width: 205rem/108;
            margin: 0 auto;
            text-align: center;
          }
        }
      }
      .cl-act {
        background: #ffcda4;
        .cl-white {
          background: #fff7ab;
        }
      }
      .cl-prizeName {
        font-size: 30rem/108;
        font-weight: 700;
        color: #d92a00;
      }
      .cl-quantity {
        font-size: 46rem/108;
      }
      .cl-prizePic {
        .cl-firstPic {
          width: 181rem/108;
          height: 288rem/108;
          margin: 42rem/108 0 0 35rem/108;
        }
        .cl-cashGift {
          width: 117rem/108;
          height: 133rem/108;
        }
        .cl-freeBet {
          width: 118rem/108;
          height: 121rem/108;
        }
        .cl-airtime {
          width: 122rem/108;
          height: 97rem/108;
        }
        .cl-mbs {
          width: 127rem/108;
          height: 127rem/108;
        }
      }
      .no-item1 {
        left: 0;
        top: 0;
      }
      .no-item2 {
        left: 296rem/108;
        top: 0;
      }
      .no-item3 {
        right: 0;
        top: 0;
      }
      .no-item4 {
        right: 0;
        top: 296rem/108;
      }
      .no-item5 {
        right: 0;
        bottom: 0;
      }
      .no-item6 {
        left: 296rem/108;
        bottom: 0;
      }
      .no-item7 {
        left: 0;
        bottom: 0;
      }
    }
  }
}

.cl-chance {
  font-size: 36rem/108;
  font-weight: 700;
  text-align: center;
  line-height: 50rem/108;
  text-shadow: 0 3rem/108 6rem/108 rgba(203, 57, 14, 0.29);
}
</style>
