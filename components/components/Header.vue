<template>
  <div
    class="cl-Header-wrap"
    :class="{ 'cl-headerHaveDownload': isDownloadShow }"
  >
    <div
      ref="headerContainer"
      class="cl-headerContainer"
      :class="{ 'cl-notFixed': where === 'home' || where === 'popular' }"
    >
      <HeaderDownload />
      <div :style="{ height: safeAreaTop + 'px' }" />
      <div class="cl-flexcb cl-headerBox">
        <div class="cl-flexcs cl-left">
          <div class="cl-menu" @click="visibleMenu(true)">
            <div class="cl-icon">
              <div
                v-if="checkInInfo && !checkInInfo.today"
                class="cl-noChecked"
              />
            </div>
          </div>
          <div class="cl-search" @click="goWhere('search')">
            <div class="cl-icon" />
          </div>
        </div>

        <div class="cl-middle" @click="goWhere('')">
          <div class="cl-logo">
            <img
              :src="`${STATICURL}/images/lang/${locale}/${country}/logo/logo-2022.png`"
              alt="onebet | logo"
            />
          </div>
        </div>

        <div v-if="info" class="cl-flexce cl-right">
          <nuxt-link :to="`/${locale}/account`">
            <div
              class="cl-flexce cl-headerAccount"
              @click.prevent="goWhere('account')"
            >
              <div class="cl-icon" />
              <div class="cl-word">{{ abs(info.balance) }}</div>
            </div>
          </nuxt-link>
        </div>
        <div v-else class="cl-flexce cl-right">
          <nuxt-link :to="`/${locale}/login`">
            <div
              class="cl-flexcc cl-lkButton"
              @click.prevent="goWhere('login')"
            >
              <div>{{ $t('loginEntry.login') }}</div>
            </div>
          </nuxt-link>
          <nuxt-link :to="`/${locale}/register`">
            <div
              class="cl-flexcc cl-tcButton"
              @click.prevent="goWhere('register')"
            >
              <div>{{ $t('loginEntry.joinNow') }}</div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <drawer :visible.sync="isMenuShow" :width="304 / 36">
      <homeMenu @visibleMenu="visibleMenu" @openSignIn="openSignIn" />
    </drawer>

    <signIn v-if="isOpen" @closeSignIn="closeSignIn" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import HeaderDownload from '@/components/components/HeaderDownload.vue'

export default {
  components: {
    homeMenu: () => import('@/components/components/homeMenu.vue'),
    signIn: () => import('@/components/components/signIn.vue'),
    HeaderDownload
  },
  props: ['where'],
  data() {
    return {
      isMenuShow: false,
      isOpen: false
    }
  },
  computed: {
    STATICURL() {
      return process.env.NODE_ENV === 'development' ? '' : process.env.STATICURL
    },
    tickets() {
      return this.$store.state.tickets
    },
    info() {
      return this.$store.state.info
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    isDownloadShow() {
      return this.$store.state.isDownloadShow
    },
    checkInInfo() {
      return this.$store.state.checkInInfo
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
    // 获取用户信息
    if (this.token) this.getInfo()
  },
  methods: {
    // 打开或关闭目录
    visibleMenu: Lib.common.throttle(function (visible) {
      this.isMenuShow = visible
    }, 300),
    // 打开签到
    openSignIn() {
      this.isOpen = true
    },
    // 关闭签到
    closeSignIn() {
      this.isOpen = false
    },
    // 页面跳转
    goWhere(path) {
      if (path) Lib.common.event_statistics(`home_${path}`)
      this.$router.push({ path: `/${this.locale}/` + path })
    },
    // 获取info
    getInfo(token) {
      this.$axios_api.userInfo({ token: token || this.token }).then((res) => {
        this.$store.commit('changeLoadingStatus', 0)
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          // casino页面,已登录切换到cash
          this.$store.commit('setGuest', false)
        }
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
.cl-Header-wrap {
  width: 10rem;
  overflow: hidden;
  position: relative;
  z-index: 10;
  background-color: @mainThemeColor;

  &.cl-headerHaveDownload {
    height: 84rem/36;
  }

  .cl-headerContainer {
    position: fixed;
    z-index: 2;
    top: 0;
    margin: 0 auto;
    background-color: @mainThemeColor;

    &.cl-notFixed {
      position: relative;
    }
  }

  .cl-headerBox {
    box-sizing: border-box;
    padding: 0 10rem/36;
    width: 10rem;
    height: 47rem/36;
    background-color: @mainThemeColor;
  }

  .cl-left {
    width: 147.5rem/36;
    flex-shrink: 0;
    .cl-menu {
      .cl-icon {
        position: relative;
        margin-top: 3rem/36;
        .sprite(@icon-menu, 108rem);

        .cl-noChecked {
          width: 8rem/36;
          height: 8rem/36;
          background-color: #e52f10;
          border-radius: 50%;
          position: absolute;
          right: -3rem/36;
          top: -3rem/36;
        }
      }
    }

    .cl-search {
      margin-left: 14rem/36;

      .cl-icon {
        margin-top: 3rem/36;
        .sprite(@icon-search, 108rem);
      }
    }
  }

  .cl-middle {
    width: 45rem/36;
    flex-shrink: 0;
    text-align: center;

    .cl-logo {
      position: relative;
      height: 30rem/36;
    }

    .cl-logo > img {
      height: 30rem/36;
    }
  }

  .cl-right {
    width: 147.5rem/36;
    flex-shrink: 0;
    .cl-headerAccount {
      .cl-icon {
        margin-top: 3rem/36;
        margin-right: 3rem/36;
        .sprite(@icon-account-white, 108rem);
      }

      .cl-word {
        padding-top: 2rem/36;
        padding-left: 3rem/36;
        font-size: 10rem/36;
        color: @balanceColor;
        font-weight: bold;
      }
    }

    .cl-lkButton {
      margin-right: 7rem/36;
      border: 1rem/36 solid @mainButtonComparedColor;
    }
  }
}
</style>
