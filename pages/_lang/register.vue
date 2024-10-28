<template>
  <div class="cl-accountRegister-wrap">
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
        <div class="cl-flexcb cl-item cl-selected">
          <h2 class="cl-flexcc cl-h2 cl-tabsWord">
            {{ $t('loginEntry.joinNow') }}
          </h2>
        </div>
        <NuxtLink
          no-prefetch
          class="cl-flexcb cl-item"
          :to="`/${locale}/login`"
        >
          <h2 class="cl-flexcc cl-h2 cl-tabsWord" @click.prevent="goLogin">
            {{ $t('firstDeposit.login') }}
          </h2>
        </NuxtLink>
      </div>
      <div class="cl-inputBox">
        <accountModal
          :msg="msg"
          :check-info="checkInfo"
          @emitRePsd="emitRePsd"
        />
        <form>
          <div class="cl-inputItem">
            <p class="cl-name">{{ $t('accountRegister.enter') }}</p>
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
                  type="text"
                  @blur="setBlur(0)"
                  @focus="setFocus(0)"
                  :placeholder="$t('accountRegister.number')"
                  v-model="phoneNumber"
                  autocomplete="new-password"
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
            <p class="cl-name">{{ $t('accountRegister.password') }}</p>
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
                  @blur="setBlur(1)"
                  @focus="setFocus(1)"
                  v-model="password"
                  autocomplete="new-password"
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
              <div class="cl-digit">
                {{ $t('reminder.passwordRestriction') }}
              </div>
              <div class="cl-errorTip">
                <span v-if="inputStatus[1] === 2">{{
                  $t('reminder.passwordTip')
                }}</span>
              </div>
            </div>
          </div>
          <div class="cl-inputItem">
            <p class="cl-name">{{ $t('accountRegister.epc') }}</p>
            <div
              class="cl-flexcc cl-input"
              :class="{
                'cl-select': inputStatus[2] === 1,
                'cl-error': inputStatus[2] === 2
              }"
            >
              <div class="cl-middle">
                <input
                  type="text"
                  @blur="setBlur(2)"
                  @focus="setFocus(2)"
                  :placeholder="$t('optional')"
                  v-model="promoCode"
                  autocomplete="new-password"
                />
              </div>
              <div
                class="cl-clear"
                @click="
                  () => {
                    clearInput('promoCode')
                    $set(inputStatus, 2, 0)
                  }
                "
                v-show="promoCode"
              />
            </div>
            <div class="cl-errorTip">
              <span v-if="inputStatus[2] === 2">{{
                $t('reminder.promoCodeTips')
              }}</span>
            </div>
          </div>
        </form>

        <!-- <div class="cl-lengthReminder">{{$t('accountRegister.length')}}</div> -->

        <div
          class="cl-flexcc cl-lkButton cl-button"
          :class="{ 'cl-isButtonCanNotUse': isButtonCanNotUseComputed }"
          @click="goRegister"
        >
          <span>{{ $t('loginEntry.joinNow') }}</span>
        </div>

        <div
          class="cl-flexcs cl-forgot"
          :key="1"
          v-html="$t('accountRegister.bottom')"
        />
      </div>
    </div>
    <registerLoginBanner where="register" />
    <captcha
      :show-captcha="showCaptcha"
      @emitGoRegister="register"
      @close="showCaptcha = false"
      @captchaVerificationOk="captchaVerificationOk"
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import accountModal from '@/components/components/accountModal.vue'
import registerLoginBanner from '@/components/components/registerLoginBanner.vue'
import captcha from '@/components/components/account/captcha.vue'

export default {
  components: { headBack, accountModal, registerLoginBanner, captcha },
  beforeRouteEnter(to, from, next) {
    const str = Lib.store.get('previousRoute')
    Lib.common.event_statistics('Register_Page_View', `Page_from:${str}`)
    next()
  },
  data() {
    return {
      phoneNumber: '',
      password: '',
      promoCode: '', // 邀请码
      // confirmPassword: '',
      // 按钮是否可以点击状态
      isButtonCanNotUse: true,
      inputStatus: [],
      msg: '', // 提示信息
      checkInfo: '',
      showCaptcha: false,
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
    inviterCode() {
      return Lib.common.getCookie('inviterCode')
    },
    getJumpPhoneArr() {
      const nowTime = new Date().getTime()
      const arr = Lib.store.get('jumpPhoneArr') || []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].timeStamp <= nowTime) {
          arr.splice(i, 1)
          i--
        }
      }
      Lib.store.set('jumpPhoneArr', arr)
      return arr
    },
    isButtonCanNotUseComputed() {
      return this.isButtonCanNotUse || this.inputStatus.includes(2)
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    },
    loginBack() {
      return this.$route.query.loginBack
    }
  },
  watch: {
    phoneNumber(newValue, oldValue) {
      // 最长10位数
      if (newValue.length > 10) this.phoneNumber = oldValue

      if (this.phoneNumber.length >= 9 && this.password.length >= 4) {
        this.isButtonCanNotUse = false
      } else {
        this.isButtonCanNotUse = true
      }
    },
    password(newValue, oldValue) {
      // 4位数
      if (newValue.length > 4) this.password = oldValue

      if (this.phoneNumber.length >= 9 && this.password.length >= 4) {
        this.isButtonCanNotUse = false
      } else {
        this.isButtonCanNotUse = true
      }
    },
    promoCode(newValue, oldValue) {
      // 10位数
      if (!newValue) return
      if (newValue.length > 10 || !/^[a-zA-Z0-9]+$/.test(newValue)) {
        this.promoCode = oldValue
      }
    }
    // confirmPassword(newValue, oldValue) {
    //   // 最长10位数
    //   if (newValue.length > 16) this.confirmPassword = oldValue

    //   if (this.phoneNumber.length >= 9 && this.password.length >= 8) {
    //     this.isButtonCanNotUse = false
    //   } else {
    //     this.isButtonCanNotUse = true
    //   }
    // }
  },
  mounted() {
    // orange活动
    // if (this.country === 'cm') {
    //   this.msg = this.$t('orange.registerReminder', { operator: 'MTN' })
    //   this.checkInfo = 'orange'
    // }
    Lib.common.event_statistics('Register_Page_View_All')
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
    // 返回大厅
    gohall(index) {
      if (index === 0) Lib.common.event_statistics('Register_Return_Click')
      if (index === 1) Lib.common.event_statistics('Register_Home_Click')
      this.$router.replace({ path: `/${this.locale}` })
    },
    // 前往登录
    goLogin() {
      Lib.common.event_statistics('Register_Login_Tab_Click')
      if (this.loginBack) return this.$router.back()
      this.$router.replace({
        path: `/${this.locale}/login`,
        qurey: { registerBack: 1 }
      })
    },
    // 格式校验
    goContinue(index) {
      Lib.common.event_statistics('Reg_Next_Click')
      if (index === 0) {
        // 手机号为空
        if (!this.phoneNumber) {
          Lib.common.event_statistics('Reg_Next_Click', 'Failed:num_exist')
          this.setError(0)
          return
        }

        // 若为9位号码，则将首位添加0
        if (this.phoneNumber.length === 9) {
          this.phoneNumber = '0' + this.phoneNumber
        }

        // 数据校验 手机号09开头，第三位不能为3，总共10位数
        if (!Lib.common.phoneNumberVerify(this).test(this.phoneNumber)) {
          Lib.common.event_statistics('Reg_Next_Click', 'Failed:num_error')
          this.setError(0)
        }
      } else if (index === 1) {
        // 注册页面验证密码 ^[0-9A-Za-z]{8,16}$
        if (!/^\d{4}$/.test(this.password)) {
          Lib.common.event_statistics(
            'Reg_Next_Click',
            'Failed:password_not_standard'
          )
          this.setError(1)
        }
      } else if (index === 2) {
        if (!this.promoCode) return
        let flag = true
        // 效验 是否为纯数字 或 是否为6位数字字母混合
        if (
          /^\d+$/.test(this.promoCode) ||
          /^(?![0-9]{6}$).{6}$/.test(this.promoCode)
        ) {
          flag = false
        }
        if (flag) this.setError(2)
      }
    },
    goRegister() {
      const arr = this.inputStatus.filter((item) => item === 2)
      if (arr.length === 0) {
        // 是否需要验证码验证
        const jumpVerification = Lib.store.get('jumpVerification')
        const currentDay = new Date().getDate()
        if (!jumpVerification || jumpVerification.day !== currentDay) {
          Lib.store.set('jumpVerification', {
            num: 0,
            day: currentDay
          })
        } else if (jumpVerification.num >= 2) {
          this.showCaptcha = true
          Lib.common.event_statistics('Reg_Captcha_Show')
          return
        }
        this.register()
      }
    },
    // 下一步
    register() {
      Lib.common.event_statistics('Reg_Next_Req')
      this.$store.commit('changeLoadingStatus', 1)
      // 生成渠道数组
      const channelArr = [
        sessionStorage.getItem('sesChannel'),
        Lib.common.getCookie('channel'),
        this.getLocalChannel()
      ]
      const clearFnArr = [
        () => sessionStorage.removeItem('sesChannel'),
        () => Lib.common.delCookie('channel'),
        () => Lib.store.remove('channel')
      ]
      // 获取渠道码和注册后需要删除的渠道方法下标
      let channel = 1
      let clearChan = null
      for (let i = 0, len = channelArr.length; i < len; i++) {
        const item = channelArr[i]
        if (item) {
          channel = item
          clearChan = i
          break
        }
      }
      const type = channel == 1 && this.isApp !== 1 ? 2 : channel

      let zcObj = {
        // check_code: this.verifyCode,
        mobile: this.phoneNumber,
        password: this.password,
        type,
        device: this.imei,
        inviter: this.promoCode || this.inviterCode || '',
        reg_cate: 1,
        category: Lib.store.get('category') // 新用户福利
      }
      let reqFn = this.$axios_api.register
      // 如果是代理注册邀请码更换参数与接口
      if (/[a-zA-Z]/.test(this.promoCode)) {
        zcObj = {
          type: 0,
          code: this.promoCode,
          mobile: this.phoneNumber,
          password: this.password,
          password_c: this.password,
          ob_type: 1 // 告知后端来自ob主站, 更改返回code
        }
        reqFn = this.$axios_api.inviteRegister
      }
      reqFn(zcObj)
        .then((res) => {
          if (res.code === 0) {
            // 存储登陆次数，用来判断当日登陆次数是否已经超过了2次
            const jumpVerification = Lib.store.get('jumpVerification')
            jumpVerification.num++
            Lib.store.set('jumpVerification', jumpVerification)
            if (channel == 9 || channel == 1008) {
              try {
                fbq('track', 'CompleteRegistration')
              } catch (e) {}
            }
            // 删除使用后的渠道码
            const clearFn = clearFnArr[clearChan]
            if (clearFn) clearFn()
            // 设置token
            this.$store.commit('setToken', res.data.token)
            Lib.store.set('token', Lib.common.encrypt(res.data.token))
            Lib.common.event_statistics('Reg_Comp_Click')

            const nowTime = new Date().getTime()
            this.getJumpPhoneArr.push({
              timeStamp: nowTime + 24 * 60 * 60 * 1000,
              phone: this.phoneNumber
            })

            Lib.store.set('jumpPhoneArr', this.getJumpPhoneArr)
            // 跳转到主页
            this.goHall(res.data.token, res.data.uid, res.data.login)
          }
          // 单日ip注册超过5次,转到需要验证
          else if (res.code === 10107) this.checkMobile(this.phoneNumber)
          else if (res.code === 10104) {
            this.$store.commit('changeLoadingStatus', false)
            this.msg =
              this.$t('reminder.rePsdJoinNow') + this.$t('reminder.rePsd')
            this.checkInfo = 'rePsd'
          } else {
            Lib.common.event_statistics(`Reg_Comp_Click`, `Failed:${res.code}`)
            this.$store.commit('changeLoadingStatus', false)
            // 该手机号被注册过
            if (res.code === 10103) return this.isRegisteredFn()
            this.msg = res.msg
          }
        })
        .catch(() => {
          Lib.common.event_statistics('Reg_Comp_Click', 'Failed:other')
          this.$store.commit('changeLoadingStatus', false)
          this.msg = this.$t('reminder.networkError')
        })
    },
    // 从本地获取channel
    getLocalChannel() {
      // 从本地解构出channel和time(time为存入时间)
      const obj = Lib.store.get('channel')
      if (Object.prototype.toString.call(obj) === '[object Object]') {
        const { channel, time } = obj
        if (!channel || !time) return Lib.store.remove('channel')
        const newTime = new Date().getTime()
        if (newTime - Number(time) <= 1000 * 60 * 60) return channel
        else return Lib.store.remove('channel')
      } else return Lib.store.remove('channel')
    },
    // 手机号已注册提示
    isRegisteredFn() {
      Lib.common.errorReminder(
        this,
        '',
        '',
        '',
        this.$t('accountRegister.isRegistered'),
        this.$t('accountRegister.tologin'),
        this.$t('accountRegister.rnewnum'),
        () => {
          this.$router.push({ path: `/${this.locale}/login` })
        },
        () => {
          this.phoneNumber = ''
        }
      )
    },
    // 跳转到首页
    goHall(token, uid, login) {
      this.getInfo(token, uid, login)
    },
    // 限时活动注册后将活动ID存入cookie，返回了的话，那么状态即使不对，也应该展示
    setCookie(name, value, perpetual) {
      const exdate = new Date(perpetual)
      document.cookie =
        name +
        '=' +
        value +
        ';expires=' +
        exdate.toGMTString() +
        ';' +
        ';path=/'
    },
    // 获取info
    getInfo(token, uid, login) {
      this.$axios_api.userInfo({ token: token || this.token }).then((res) => {
        this.$store.commit('changeLoadingStatus', false)
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          if (this.from) {
            // 踢球kickersX活动
            if (this.from === 'kickersX') return this.$router.back()
            this.$router.replace({
              path: `/${this.locale}/${this.from}`
            })
          } else if (this.fromName) {
            this.$router.replace({ path: this.fromName })
          } else if (this.fromNova) {
            this.$axios_api
              .userAccountInfo({ token: token || this.token })
              .then((res) => {
                if (res.code === 0) {
                  // 设置用户属性
                  this.$store.commit('setAccountInfo', res.data)
                  window.location.href =
                    this.country === 'ug'
                      ? `${process.env.hostname}/en/nova6`
                      : `${process.env.hostnamecm}/en/nova6`
                }
              })
          } else {
            if (this.$route.query.luckyBagId) {
              const value = this.$route.query.luckyBagId + '_' + uid
              this.setCookie('TLAR', value, Number(this.$route.query.perpetual))
              // 如果是限时活动注册的，那么在注册成功后帮用户参加活动
              this.$axios_api
                .luckybagJoin({
                  id: this.$route.query.luckyBagId,
                  token: token || this.token
                })
                .then(() => {
                  // 跳转到主页
                  this.$router.replace({ path: `/${this.locale}` })
                  !login &&
                    Lib.store.set('saveInfoStore', {
                      phoneNumber: this.phoneNumber,
                      password: this.password,
                      type: 'joinNow'
                    })
                })
              return
            }
            this.$router.replace({ path: `/${this.locale}` })
            !login &&
              Lib.store.set('saveInfoStore', {
                phoneNumber: this.phoneNumber,
                password: this.password,
                type: 'joinNow'
              })
          }
        }
      })
    },
    // 检查手机号
    checkMobile(phoneNumber) {
      this.$store.commit('changeLoadingStatus', true)
      Lib.common.event_statistics('Reg_Check_Click')
      this.$axios_api
        .checkMobile({ mobile: phoneNumber })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)

          // 注册 验证账号格式及账号未组册过
          if (res.code === 0) {
            this.comeToSendCode(phoneNumber)
            Lib.common.event_statistics('Reg_Check_Click', 'Success')
          }
          // 错误处理
          else {
            this.setError(0)
            this.msg = res.msg
            if (res.code === 10103) {
              Lib.common.event_statistics('Reg_Check_Click', 'Failed:num_exist')
              this.isRegisteredFn()
            } else if (res.code === 10100)
              Lib.common.event_statistics('Reg_Check_Click', 'Failed:num_error')
            else Lib.common.event_statistics('Reg_Next_Click', 'Failed:other')
          }
        })
        .catch(() => {
          Lib.common.event_statistics('Reg_Next_Click', 'Failed:other')
          this.$store.commit('changeLoadingStatus', false)
          this.msg = this.$t('reminder.networkError')
        })
    },
    // 前往发送短信
    comeToSendCode(phoneNumber) {
      this.$store.commit('savePhoneNumber', phoneNumber)
      if (this.password) this.$store.commit('savePassword', this.password)

      this.$router.push({
        path: `/${this.locale}/verify`,
        query: {
          from: this.from,
          fromName: this.fromName,
          fromNova: this.fromNova,
          luckyBagId: this.$route.query.luckyBagId,
          perpetual: this.$route.query.perpetual
        }
      })
    },
    // 获取焦点
    setFocus(index) {
      if (index === 0)
        Lib.common.event_statistics('Register_Phone_Number_Click')
      if (index === 1) Lib.common.event_statistics('Register_Password_Click')
      if (index === 2) Lib.common.event_statistics('Register_promoCode_Click')
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
    },
    captchaVerificationOk() {
      // 验证通过，继续注册
      this.register()
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountRegister-wrap {
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
        .cl-digit {
          font-weight: 400;
          font-size: 11rem/36;
          color: #74747c;
          line-height: 11rem/36;
          margin-top: 5rem/36;
        }
        .cl-errorTip {
          min-height: 18rem/36;
          font-weight: 400;
          font-size: 9rem/36;
          color: #e62d0e;
          line-height: 9rem/36;
          margin-top: 4rem/36;
        }
        .cl-tipBox {
          height: 40rem/36;
        }
        .cl-name {
          color: #000;
          font-weight: bold;
          padding-bottom: 6rem/36;
        }

        .cl-input {
          position: relative;
          width: 300rem/36;
          height: 40rem/36;
          font-weight: 400;
          border: 1rem/36 solid #d4dae1;
          border-radius: @mainButtonRadius;

          input {
            background-color: transparent;
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

    .cl-lengthReminder {
      color: #858585;
      padding-top: 8rem/36;
    }

    .cl-button {
      width: 100%;
      height: 40rem/36;
      font-size: 13rem/36;
      box-sizing: border-box;
      text-transform: uppercase;
      &.cl-isButtonCanNotUse {
        opacity: 0.5;

        span {
          opacity: 0.6;
        }
      }
    }

    .cl-forgot {
      margin-top: 13rem/36;
      text-align: left;
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
