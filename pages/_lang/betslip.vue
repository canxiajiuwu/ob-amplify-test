<template>
  <div class="cl-betslip-wrap" id="betslipWrap">
    <div class="cl-top">
      <headBack
        :bgcolor="mainStyle.mainThemeColor"
        color="#fff"
        :left-flag="false"
      >
        <template #middle>
          <div class="cl-flexcc cl-middle">
            <div class="cl-name">
              {{ $t('betslipBack.back').toUpperCase() }}
              <span v-if="tickets.length">({{ tickets.length }})</span>
            </div>
          </div>
        </template>
        <template>
          <div class="cl-top_right">
            <div class="cl-flexcc cl-logined" v-if="info">
              <div class="cl-accountInfo" @click="goWhere('account')">
                <div class="cl-icon" />
                <div class="cl-balance">
                  {{ info.balance ? abs(info.balance) : '0.00' }}
                </div>
              </div>
              <div
                v-if="!(locale === 'fr' && Number(info.balance) > 1000)"
                class="cl-flexcc cl-tcButton cl-deposit"
                @click="depositComTriggle(true)"
              >
                {{ $t('betslipBack.deposit') }}
              </div>
            </div>
            <div class="cl-flexcc cl-unLogin" v-else>
              <div class="cl-flexcc cl-lkButton" @click="goWhere('login')">
                <div>{{ $t('loginEntry.login') }}</div>
              </div>
            </div>
          </div>
        </template>
      </headBack>
    </div>
    <div :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }" />
    <nuxt-child />
    <slot />
    <div :style="{ height: `calc(110rem/36 + ${footerDomHeight}px)` }" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'Betslip',
  components: { headBack },
  computed: {
    footerDomHeight() {
      return this.$store.state.footerDomHeight || 0
    },
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    tickets() {
      return this.$store.state.tickets
    },
    intimateTickets() {
      return this.$store.state.intimateTickets
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    info() {
      return this.$store.state.info
    },
    betslipType() {
      return this.$route.meta.betslipType
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    if (this.token) this.getInfo()
    else
      Lib.common.event_statistics(
        'Betslip_Page_View',
        'Login_Status:logged_not'
      )
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    depositComTriggle(bool) {
      this.$store.commit('setFepositComShow', bool)
    },
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) {
          this.$store.commit('setInfo', res.data)
          Lib.common.event_statistics(
            'Betslip_Page_View',
            'Login_Status:logged'
          )
        }
      })
    },
    // 页面跳转
    goWhere(path) {
      Lib.common.event_statistics(`betslip_${path}`)
      this.$router.push({ path: `/${this.locale}` + '/' + path })
    },
    // 金额格式化
    abs(num) {
      return Lib.common.abs(num)
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslip-wrap {
  min-height: 100vh;
  background-color: #fff;
}

.cl-top {
  position: fixed;
  top: 0;
  width: 10rem;
  z-index: 2;

  .cl-middle {
    font-size: 15rem/36;
    font-weight: bold;
  }

  .cl-top_right {
    margin-right: 12rem/36;

    .cl-logined {
      .cl-accountInfo {
        display: block !important;

        .cl-icon {
          margin: 0 auto;
          padding-bottom: 5rem/36;
          .sprite(@icon-account-white, 108rem);
        }

        .cl-balance {
          line-height: 10rem/36;
          margin-left: 5rem/36;
          font-weight: bold;
          font-size: 10rem/36;
          color: @balanceColor;
          white-space: nowrap;
        }
      }

      .cl-deposit {
        margin-left: 7rem/36;
      }
    }

    .cl-unLogin {
      .cl-lkButton {
        border: 1rem/36 solid @mainButtonComparedColor;
      }
    }
  }
}
</style>
