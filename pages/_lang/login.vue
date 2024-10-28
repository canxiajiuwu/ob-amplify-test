<template>
  <div class="cl-login-wrap">
    <headBack :bgcolor="mainStyle.mainThemeColor" color="#fff" is-white-back>
      <template #left>
        <div class="cl-backIcon" @click="gohall(0)" />
      </template>
      <template #middle>
        <div class="cl-logo">
          <img
            :src="`${STATICURL}/images/lang/${locale}/${country}/logo/logo-2022.png`"
            alt="onebet | logo"
          />
        </div>
      </template>
      <template>
        <NuxtLink no-prefetch class="cl-top_right" :to="`/${locale}`">
          <div
            class="cl-flexcc cl-lkButton cl-right"
            @click.prevent="gohall(1)"
          >
            {{ $t('homeMenu.home') }}
          </div>
        </NuxtLink>
      </template>
    </headBack>

    <div class="cl-container">
      <div class="cl-flexcc cl-tabs-wrap">
        <NuxtLink
          no-prefetch
          class="cl-flexcb cl-item"
          :to="`/${locale}/register`"
        >
          <h2 class="cl-flexcc cl-h2 cl-tabsWord" @click.prevent="goRegister">
            {{ $t('loginEntry.joinNow') }}
          </h2>
        </NuxtLink>
        <div class="cl-flexcb cl-item cl-selected">
          <h2 class="cl-flexcc cl-h2 cl-tabsWord">
            {{ $t('firstDeposit.login') }}
          </h2>
        </div>
      </div>
      <div class="cl-inputBox">
        <accountModal
          :msg="msg"
          :check-info="checkInfo"
          @emitRePsd="emitRePsd"
        />
        <form>
          <div class="cl-inputItem">
            <p class="cl-name">{{ $t('accountLogin.enter') }}</p>
            <div
              class="cl-flexcs cl-input"
              :class="{
                'cl-select': inputStatus[0] === 1,
                'cl-error': inputStatus[0] === 2
              }"
            >
              <div class="cl-flexcc cl-left">{{ $t('areaCode') }}</div>

              <div class="cl-right">
                <input
                  type="number"
                  @blur="setBlur(0)"
                  @focus="setFocus(0)"
                  :placeholder="$t('accountLogin.number')"
                  v-model="phoneNumber"
                  autocomplete="on"
                />
              </div>
              <div
                class="cl-clear"
                @click="clearInput('phoneNumber')"
                v-show="phoneNumber"
              />
            </div>
            <div class="cl-errorTip">
              <span v-if="inputStatus[0] === 2">{{
                $t('reminder.login')
              }}</span>
            </div>
          </div>

          <div class="cl-inputItem">
            <p class="cl-name">{{ $t('accountLogin.password') }}</p>

            <div
              class="cl-flexcc cl-input"
              :class="{
                'cl-select': inputStatus[1] === 1,
                'cl-error': inputStatus[1] === 2
              }"
            >
              <div class="cl-middle">
                <input
                  :type="showPasswordText ? 'text' : 'password'"
                  v-model="password"
                  @blur="setBlur(1)"
                  @focus="setFocus(1)"
                  autocomplete="on"
                />
              </div>
              <div
                class="cl-eye"
                :class="showPasswordText ? 'cl-canSeen' : 'cl-noCanSeen'"
                @click="showPasswordText = !showPasswordText"
              />
              <div
                class="cl-clear cl-clearPsd"
                @click="clearInput('password')"
                v-show="password"
              />
            </div>
            <div class="cl-tipBox">
              <div class="cl-errorTip cl-errorTip2">
                <span v-if="inputStatus[1] === 2">{{
                  $t('reminder.password')
                }}</span>
              </div>
            </div>
          </div>
        </form>
        <NuxtLink
          no-prefetch
          class="cl-flexce cl-forgot"
          :to="`/${locale}/retrievePassword`"
        >
          <h2 class="cl-h2 cl-word" @click.prevent="forgotPassword">
            {{ $t('accountLogin.forget') }}
          </h2>
        </NuxtLink>

        <div
          class="cl-flexcc cl-lkButton cl-button"
          :class="{ 'cl-isButtonCanNotUse': isButtonCanNotUse }"
          @click="goLogin"
        >
          <span>{{ $t('accountLogin.login') }}</span>
        </div>
      </div>
    </div>
    <registerLoginBanner where="login" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import accountModal from '@/components/components/accountModal.vue'
import registerLoginBanner from '@//components/components/registerLoginBanner.vue'

export default {
  components: { headBack, accountModal, registerLoginBanner },
  beforeRouteEnter(to, from, next) {
    const str = Lib.store.get('previousRoute')
    Lib.common.event_statistics('Login_Page_View', `Page_from:${str}`)
    next()
  },
  data() {
    return {
      phoneNumber: '',
      password: '',
      isButtonCanNotUse: true, // 按钮是否可以点击状态
      inputStatus: [],
      msg: '', // 提示信息
      checkInfo: '',
      showPasswordText: false // 是否显示密码
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    isApp() {
      return window.appInteraction.type
    },
    imei() {
      return this.$store.state.imei
    },
    from() {
      return this.$route.query.from
    },
    fromName() {
      return this.$route.query.fromName
    },
    fromNova() {
      return this.$route.query.fromNova
    },
    loginAfterOpenGame() {
      return this.$route.query.loginAfterOpenGame
    },
    outside() {
      return this.$route.query.outside
    },
    hostname() {
      return this.country === 'ug'
        ? process.env.hostname
        : process.env.hostnamecm
    },
    winApp() {
      return window.appInteraction
    },
    isNewApp() {
      return Lib.store.get('isNewApp')
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    },
    registerBack() {
      return this.$route.query.registerBack
    },
    backgroundStyles() {
      const imgUrl = this.$img('/images/general/sprites/menu.png', {
        format: 'webp'
      })
      return {
        backgroundImage: `url('${imgUrl}')`
      }
    }
  },
  watch: {
    phoneNumber(newValue, oldValue) {
      // 最长10位数
      if (newValue.length > 10) this.phoneNumber = oldValue
      // this.password.length 由8改为4
      if (this.phoneNumber.length >= 9 && this.password.length >= 4) {
        this.isButtonCanNotUse = false
      } else {
        this.isButtonCanNotUse = true
      }
    },
    password(newValue, oldValue) {
      if (newValue.length > 16) this.password = oldValue

      if (this.phoneNumber.length >= 9 && this.password.length >= 4) {
        this.isButtonCanNotUse = false
      } else {
        this.isButtonCanNotUse = true
      }
    }
  },
  mounted() {
    console.log(this.fromName)
    if (this.token) this.getInfo(this.token)

    Lib.common.event_statistics('Login_Page_View_All')
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 去忘记密码页面
    emitRePsd() {
      this.$router.push({
        path: `/${this.locale}/retrievePassword`,
        query: {
          phoneNumber: this.phoneNumber
        }
      })
    },
    // 清除输入框数据
    clearInput(data) {
      Lib.common.clearInputData(data, this)
    },
    // 前往忘记密码
    forgotPassword() {
      Lib.common.event_statistics('Login_Forgot_Click')
      // this.$router.push({ path: `/${this.locale}/forget` })
      this.emitRePsd()
    },
    // 前往注册
    goRegister() {
      Lib.common.event_statistics('Login_Register_Tab_Click')
      if (this.registerBack) return this.$router.back()
      this.$router.push({
        path: `/${this.locale}/register`,
        query: { loginBack: 1 }
      })
    },
    // 返回大厅
    gohall(index) {
      if (index === 0) Lib.common.event_statistics('Login_Return_Click')
      if (index === 1) Lib.common.event_statistics('Login_Home_Click')
      this.$router.replace({ path: `/${this.locale}` })
    },
    goContinue(index) {
      if (index) {
        if (this.password.length < 4) {
          Lib.common.event_statistics(
            'Login_Login_Click',
            'Failed:password_not_standard'
          )
          this.setError(1)
        }
      } else {
        // 若为9位号码，则将首位添加0
        if (this.phoneNumber.length === 9)
          this.phoneNumber = '0' + this.phoneNumber

        // 数据校验 手机号09开头，第三位不能为3，总共10位数
        if (!Lib.common.phoneNumberVerify(this).test(this.phoneNumber)) {
          Lib.common.event_statistics('Login_Login_Click', 'Failed:num_error')
          this.setError(0)
        }
      }
    },
    // 登陆前校验
    goLogin() {
      Lib.common.event_statistics('Login_Login_Click')
      const arr = this.inputStatus.filter((item) => item === 2)
      if (arr.length === 0) this.login()
    },
    // 电话号码登陆
    login() {
      // type :3 app
      this.$store.commit('changeLoadingStatus', 1)
      // 生成渠道数组
      const channelArr = [
        sessionStorage.getItem('sesChannel'),
        Lib.common.getCookie('channel')
      ]
      // 获取渠道码
      const channel = channelArr.find((a) => a)
      const type = channel == 1 && this.isApp !== 1 ? 2 : channel

      this.$axios_api
        .goLogin({
          mobile: this.phoneNumber,
          password: this.password,
          type,
          device: this.imei
        })
        .then((res) => {
          if (res.code === 0) {
            // // 发送 User-ID 到gtag
            // try {
            //   if (this.country === 'cm') {
            //     gtag('config', 'G-5QJTYT6ZDZ', {
            //       user_id: res.data.uid
            //     })
            //   }
            // } catch (e) {}
            this.$store.commit('setToken', res.data.token)
            Lib.store.set('token', Lib.common.encrypt(res.data.token))
            // this.$router.replace({ path: `/${this.locale}` })
            Lib.common.event_statistics('Login_Login_Click', 'Success')
            this.getInfo(res.data.token)
          } else {
            this.$store.commit('changeLoadingStatus', false)
            this.msg = res.msg
            if (res.code === 10104) {
              this.msg = this.$t('reminder.rePsd')
              this.checkInfo = 'rePsd'
              Lib.common.event_statistics(
                'Login_Login_Click',
                'Failed:password_error'
              )
            } else
              Lib.common.event_statistics(
                'Login_Login_Click',
                `Failed:${res.code}`
              )
          }
        })
        .catch(() => {
          Lib.common.event_statistics(
            'Login_Login_Click',
            `Failed:${this.$t('reminder.networkError')}`
          )
          this.$store.commit('changeLoadingStatus', false)
          this.msg = this.$t('reminder.networkError')
        })
    },
    // 获取info
    getInfo(token) {
      const Rtoken = token || this.token
      const locale = this.locale
      const country = this.country
      this.$axios_api.userInfo({ token: Rtoken }).then((res) => {
        this.$store.commit('changeLoadingStatus', false)
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          if (this.from) {
            // 如果是射门活动
            if (this.from === 'penalty') {
              const penaltyUrl = `https://pk-${country}.xfootball.net/${locale}${this.$route.query.path}?token=${Rtoken}`
              this.isNewApp
                ? this.winApp.openBrowser(penaltyUrl)
                : (window.location.href = penaltyUrl)
              return
            }
            if (this.from === 'orderShare') {
              const orderShareUrl = `${this.hostname}/ssr/${locale}/OrderShare/${this.$route.query.tid}?token=${Rtoken}`
              this.isNewApp
                ? this.winApp.openBrowser(orderShareUrl)
                : (window.location.href = orderShareUrl)
              return
            }
            if (this.from === 'ssr') return this.$router.back()

            this.$router.replace({ path: `/${locale}/${this.from}` })
            // this.$router.back()
          } else if (this.fromName) {
            const fromNameObj = {
              path: this.fromName,
              query: {},
              params: {}
            }
            if (this.loginAfterOpenGame) {
              sessionStorage.setItem('loginToOpenGame', this.loginAfterOpenGame)
            }
            sessionStorage.removeItem('loginAfterOpenGame')
            this.$router.replace(fromNameObj)
          } else if (this.fromNova) {
            this.$axios_api.userAccountInfo({ token: Rtoken }).then((res) => {
              if (res.code === 0) {
                // 设置用户属性
                this.$store.commit('setAccountInfo', res.data)
                window.location.href = `${this.hostname}/${locale}/nova6`
              }
            })
          } else if (this.outside) this.$router.back()
          else this.$router.replace({ path: '/' + locale })
        }
      })
    },
    // 获取焦点
    setFocus(index) {
      if (index === 0) Lib.common.event_statistics('Login_Phone_Number_Click')
      if (index === 1) Lib.common.event_statistics('Login_Password_Click')
      this.$set(this.inputStatus, index, 1)
    },
    // 失去焦点
    setBlur(index) {
      this.$set(this.inputStatus, index, 0)
      this.goContinue(index)
    },
    // 设置错误
    setError(index) {
      this.$set(this.inputStatus, index, 2)
    }
  }
}
</script>

<style scoped lang="less">
.cl-login-wrap {
  height: 100vh;
  width: 10rem;
  overflow: hidden;
  background-color: #fff;

  .cl-backIcon {
    .sprite(@icon-black-long-back, 108rem);
  }
  .cl-top_right {
    .cl-right {
      margin-right: 10rem/36;
      min-width: 67rem/36;
      color: #fff;
      border: 1px solid #fff;
    }
  }

  .cl-container {
    .cl-tabs-wrap {
      background-color: @mainThemeColor;
      box-sizing: border-box;
      height: 33rem/36;
      width: 10rem;

      .cl-item {
        height: 33rem/36;
        color: @tabNoColor;
        font-weight: bold;
        flex: 1;
        flex-direction: column;

        .cl-tabsWord {
          height: 30rem/36;
        }

        &.cl-selected {
          color: #fff;
        }
      }
    }

    .cl-inputBox {
      position: relative;
      padding: 40rem/36 30rem/36 0;

      .cl-inputItem {
        font-size: 11rem/36;
        .cl-errorTip {
          min-height: 18rem/36;
          font-weight: 400;
          font-size: 9rem/36;
          color: #e62d0e;
          line-height: 9rem/36;
          margin-top: 4rem/36;
          &.cl-errorTip2 {
            min-height: 12rem/36;
          }
        }
        .cl-name {
          color: #000;
          font-weight: bold;
          // padding: 15rem/36 0 6rem/36;
          padding-bottom: 6rem/36;
        }

        .cl-input {
          position: relative;
          width: 300rem/36;
          height: 40rem/36;
          border: 1rem/36 solid #d4dae1;
          font-weight: 400;
          border-radius: @mainButtonRadius;

          input {
            border-radius: @mainButtonRadius;
          }

          &.cl-select {
            border: 1rem/36 solid @mainThemeColor;
          }

          &.cl-error {
            border: 1rem/36 solid #eb6149;
          }

          .cl-eye {
            position: absolute;
            right: 14rem/36;
            bottom: 12rem/36;
            &.cl-canSeen {
              .sprite(@menu-can-seen, 108rem);
            }
            &.cl-noCanSeen {
              .sprite(@menu-no-can-seen, 108rem);
            }
          }

          .cl-clear {
            position: absolute;
            right: 14rem/36;
            bottom: 12rem/36;
            .sprite(@menu-clear, 108rem);
            &.cl-clearPsd {
              right: 42rem/36;
            }
          }

          .cl-left {
            width: 78rem/36;
            height: 21rem/36;
            margin-right: 10rem/36;
            color: @mainThemeColor;
            font-weight: bold;
            text-align: center;
            border-right: 0.5rem/36 solid #d4dae1;
            font-size: 14rem/36;
          }

          .cl-middle > input {
            border: none;
            outline: none;
            padding: 0;
            width: 280rem/36;
            height: 40rem/36;
            color: #000;
          }

          .cl-right > input {
            border: none;
            outline: none;
            padding: 0;
            width: 210rem/36;
            height: 40rem/36;
            color: #000;
          }
        }
      }
    }

    .cl-button {
      width: 100%;
      height: 40rem/36;
      margin-top: 25rem/36;
      font-size: 13rem/36;
      box-sizing: border-box;
      &.cl-isButtonCanNotUse {
        opacity: 0.5;

        span {
          opacity: 0.6;
        }
      }
    }

    .cl-forgot {
      color: @mainThemeColor;
    }
  }

  .cl-logo {
    position: relative;
    height: 30rem/36;
  }

  .cl-logo > img {
    height: 30rem/36;
  }
}
</style>
