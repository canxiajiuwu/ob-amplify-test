<template>
  <div class="cl-coinsCenter-wrap">
    <headBack
      is-white-back
      :title="$t('coinsCenter.title')"
      bgcolor="#272727"
      color="#fff"
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }"
    />

    <div class="cl-card">
      <div class="cl-flexcb cl-box">
        <div class="cl-left" @click="goHistory">
          <div class="cl-coins">{{ info ? info.coins : 0 }}</div>
          <div class="cl-flexcc cl-wordBox">
            <div class="cl-word">{{ $t('account.coins') }}</div>
            <div class="cl-more" />
          </div>
        </div>

        <div
          class="cl-flexcc cl-checkInBox"
          @click="checkIn"
          :class="{ 'cl-checked': coinsInfo && coinsInfo.check_in === 1 }"
        >
          <div class="cl-checkIn" />
          <div class="cl-word">{{ $t('homeMenu.coins') }}</div>
        </div>
      </div>
    </div>

    <div class="cl-flexcc cl-tabs">
      <div
        class="cl-flexcc cl-item"
        :class="{ 'cl-selectItem': selectIndex === 0 }"
        @click="goTabs(0)"
      >
        <h2 class="cl-flexcc cl-h2 cl-wordBox">
          {{ $t('coinsCenter.winBonus') }}
        </h2>
        <div class="cl-Wire" />
      </div>
      <div
        class="cl-flexcc cl-item"
        :class="{ 'cl-selectItem': selectIndex === 1 }"
        @click="goTabs(1)"
      >
        <h2 class="cl-flexcc cl-h2 cl-wordBox">
          {{ $t('coinsCenter.getMore') }}
        </h2>
        <div class="cl-Wire" />
      </div>
    </div>

    <div class="cl-bottomBox">
      <nuxt-child :coins-info="coinsInfo" @checkIn="checkIn" />
    </div>

    <signIn v-if="isOpen" @closeSignIn="closeSignIn" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import signIn from '@/components/components/signIn.vue'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'CoinsCenter',
  components: { signIn, headBack },
  data() {
    return {
      selectIndex: 0,
      coinsInfo: {},
      isOpen: false
    }
  },
  computed: {
    // 用户信息
    info() {
      return this.$store.state.info
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    // 请求金币中心数据
    this.coinsInfoFun()
    // underLine init
    this.underlineInit()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    },
    // coins请求
    coinsInfoFun() {
      this.$axios_api.coinsInfo({ token: this.token }).then((res) => {
        if (res.code === 0) this.coinsInfo = res.data
      })
    },
    //
    underlineInit() {
      const name = this.routeName
      if (name === 'winBonus') this.selectIndex = 0
      else this.selectIndex = 1
    },
    // 切换tabs
    goTabs(index) {
      if (index === 0) {
        Lib.common.event_statistics(`coinsCenter_tabs_win_bonus`)
        this.selectIndex = 0
        this.$router.replace({
          path: `/${this.locale}/coinsCenter/winBonus`
        })
      } else {
        Lib.common.event_statistics(`coinsCenter_tabs_get_more_coins`)
        this.selectIndex = 1
        this.$router.replace({
          path: `/${this.locale}/coinsCenter/moreCoins`
        })
      }
    },
    // 打开签到
    checkIn() {
      this.requestSignIn()
    },
    // 关闭签到
    closeSignIn() {
      this.isOpen = false
    },
    // 签到
    requestSignIn() {
      if (this.coinsInfo && this.coinsInfo.check_in === 0) {
        this.$axios_api.checkin({ token: this.token }).then((res) => {
          if (res.code === 0) {
            this.$store.commit('setInfo', {
              ...this.info,
              coins: res.data.balance
            })
            this.getCheckInInfo()
            this.isOpen = true
            this.coinsInfo.check_in = 1
          } else {
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          }
        })
      } else if (this.coinsInfo && this.coinsInfo.check_in === 1) {
        this.isOpen = true
      } else {
        Lib.common.errorReminder(
          this,
          'login',
          '',
          '',
          this.$t('reminder.unLogin'),
          '',
          this.$t('reminder.button.ok')
        )
      }
    },
    // 获取签到信息
    getCheckInInfo() {
      if (this.token) {
        this.$axios_api.checkinInfo({ token: this.token }).then((res) => {
          if (res.code === 0) this.$store.commit('setCheckInInfo', res.data)
        })
      }
    },
    // 记录
    goHistory() {
      this.$router.push({ path: `/${this.locale}/coinsHistory` })
    }
  }
}
</script>

<style scoped lang="less">
.cl-coinsCenter-wrap {
  .cl-card {
    background-color: #272727;
    height: 116rem/36;
    width: 10rem;

    .cl-box {
      margin: 0 auto;
      color: #fff;
      font-weight: bold;
      box-sizing: border-box;
      padding: 0 10rem/36 0 15rem/36;
      .sprite(@coins-coins-bg, 108rem);

      .cl-left {
        display: flex;
        align-items: flex-end;

        .cl-coins {
          font-size: 33rem/36;
          line-height: 28rem/36;
          margin-right: 5rem/36;
        }

        .cl-wordBox {
          .cl-more {
            transform: rotate(180deg);
            .sprite(@icon-back-white, 420rem);
          }
        }
      }

      .cl-checkInBox {
        box-shadow: 0 4rem/36 6rem/36 #ee3812;
        padding: 0 10rem/36;
        height: 25rem/36;
        background-color: #fff;
        font-size: 10rem/36;
        color: #ff6200;
        border-radius: 13rem/36;

        &.cl-checked {
          opacity: 0.5;
        }

        .cl-checkIn {
          margin-right: 3rem/36;
          .sprite(@coins-calendar, 108rem);
        }
      }
    }
  }

  .cl-tabs {
    width: 10rem;
    height: 30rem/36;
    font-size: 11rem/36;
    font-weight: bold;
    margin-top: -30rem/36;
    box-shadow: 0 -10rem/36 10rem/36 rgba(0, 0, 0, 0.15);
    background-color: #fff;

    .cl-item {
      flex: 1;
      flex-direction: column;
      height: 30rem/36;
      box-sizing: border-box;
      color: @tabNoColor;

      .cl-wordBox {
        height: 27rem/36;
      }

      .cl-Wire {
        height: 3rem/36;
        width: 33rem/36;
        border-radius: 2rem/36;
        background-color: #fff;
      }

      &.cl-selectItem {
        color: @tabColor;
        .cl-Wire {
          background-color: @tabColor;
        }
      }
    }
  }
}
</style>
