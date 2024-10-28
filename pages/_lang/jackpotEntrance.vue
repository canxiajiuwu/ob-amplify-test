<template>
  <div class="cl-jackpots-wrap">
    <div class="cl-top">
      <headBack
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      >
        <template #middle>
          <div class="cl-middle">{{ $t('jackpots.title').toUpperCase() }}</div>
        </template>
        <template>
          <div class="cl-top_right">
            <div class="cl-flexcc cl-logined" v-if="info">
              <div class="cl-flexcc cl-accountInfo" @click="goWhere('account')">
                <div class="cl-icon" />
                <div class="cl-balance">{{ abs(info.balance) }}</div>
              </div>
            </div>
            <div class="cl-flexce cl-right" v-else>
              <div class="cl-flexcc cl-lkButton" @click="goWhere('login')">
                <div>{{ $t('loginEntry.login') }}</div>
              </div>
              <div
                class="cl-flexcc cl-bsbb cl-tcButton"
                @click="goWhere('register')"
              >
                <div>{{ $t('loginEntry.joinNow') }}</div>
              </div>
            </div>
          </div>
        </template>
      </headBack>

      <div class="cl-flexcc cl-tabs">
        <div
          class="cl-tabsItem"
          v-for="(item, index) in $t('jackpots.tabs')"
          @click="changeTabs(index)"
          :key="index"
        >
          <h2
            class="cl-flexcc cl-h2 cl-tabsTitle"
            :class="{ 'cl-select': tabsIndex === index }"
          >
            {{ item }}
          </h2>
          <div :class="{ 'cl-topLine': tabsIndex === index }" />
        </div>
      </div>
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(87rem/36 + ${safeAreaTop}px)` }"
    />
    <nuxt-child />
    <div
      v-if="
        WeeklyCash && ['jackpotEntrance', 'dailyJackpots'].includes(routeName)
      "
      class="cl-WeeklyCash"
      @click="goWeeklyCash"
    >
      <div class="cl-WeeklyCashIcon" />
      <div class="cl-flexcc cl-WeeklyCashFont">Weekly Cash</div>
      <div class="cl-closeIcon" @click.stop="closeWeeklyCash" />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'Jackpots',
  components: { headBack },
  data() {
    return {
      tabsIndex: 0,
      WeeklyCash: true
    }
  },
  computed: {
    info() {
      return this.$store.state.info
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    },
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    isGrandJackpotNoData() {
      return this.$store.state.isGrandJackpotNoData
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  watch: {
    isGrandJackpotNoData(newVal, oldVal) {
      if (oldVal === false && newVal === true) this.changeTabs(1)
    }
  },
  beforeMount() {
    this.initTabs()
    if (!this.info && this.token) this.getInfo()
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 跳转每周jackpot活动页
    goWeeklyCash() {
      this.$router.replace({
        path: `/${this.$store.state.root.locale}` + '/weeklyCash'
      })
    },
    // 关闭活动浮标
    closeWeeklyCash() {
      this.WeeklyCash = false
    },
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) this.$store.commit('setInfo', res.data)
      })
    },
    // 页面跳转
    goWhere(path) {
      Lib.common.event_statistics(`home_${path}`)
      this.$router.push({
        path: `/${this.$store.state.root.locale}` + '/' + path
      })
    },
    // 初始化tabs
    initTabs() {
      switch (this.routeName) {
        case 'grandJackpot':
          this.tabsIndex = 0
          break
        case 'dailyJackpots':
          this.tabsIndex = 1
          break
        case 'jackpotsResults':
          this.tabsIndex = 2
          break
        case 'jackpotsHelp':
          this.tabsIndex = 3
          break
        default:
          this.tabsIndex = 0
      }
    },
    // 修改top tabs
    changeTabs(index) {
      this.tabsIndex = index
      const routeArr = [
        '',
        '/dailyJackpots',
        '/jackpotsResults',
        '/jackpotsHelp'
      ]
      this.$router.replace({
        path: `/${this.$store.state.root.locale}/jackpotEntrance${routeArr[index]}`
      })
    },
    // 金额格式化
    abs(num) {
      return Lib.common.abs(num)
    }
  }
}
</script>

<style scoped lang="less">
.cl-jackpots-wrap {
  height: 100vh;
  background-color: #fff;

  .cl-top {
    position: fixed;
    width: 10rem;
    top: 0;
    z-index: 11;
    .cl-middle {
      position: absolute;
      left: -10rem/36;
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
  .cl-tabs {
    height: 30rem/36;
    background-color: #fff;
    padding: 0 10rem/36;
    .cl-tabsItem {
      flex: 1;
      height: 30rem/36;
      color: @tabNoColor;
      font-size: 10rem/36;
      font-weight: bold;
      white-space: nowrap;
      .cl-tabsTitle {
        height: 27rem/36;
      }
      .cl-select {
        color: @tabColor;
      }
    }
    .cl-tabsItem:active {
      background-color: #dcf0f9;
    }
    .cl-topLine {
      margin: 0 auto;
      width: 33rem/36;
      height: 3rem/36;
      border-radius: 2rem/36;
      background-color: @tabColor;
      transition: left 200ms linear;
    }
  }
  .cl-WeeklyCash {
    position: fixed;
    bottom: 120rem/36;
    right: 0;
    width: 71rem/36;
    height: 71rem/36;
    .cl-WeeklyCashIcon {
      .sprite(@icon-weekly-cash, 108rem);
    }
    .cl-WeeklyCashFont {
      height: 22rem/36;
      width: 72rem/36;
      position: absolute;
      bottom: -3rem/36;
      left: -1rem/36;
      white-space: nowrap;
      border-radius: 11rem/36 0 0 11rem/36;
      overflow: hidden;
      font-size: 8rem/36;
      color: #fff;
      font-weight: bold;
      background: linear-gradient(90deg, #ffd109 0%, #ff7e11 100%);
    }
    .cl-closeIcon {
      position: absolute;
      top: -6rem/36;
      right: 6rem/36;
      .sprite(@icon-betslip-banner-delete, 108rem);
    }
  }
}
</style>
