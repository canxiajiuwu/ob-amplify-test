<template>
  <div class="cl-accountVerify-wrap">
    <div class="cl-flexcb cl-headerBox">
      <div class="cl-flexcc cl-left">
        <div class="cl-back" @click="gohall" />
        <div class="cl-title">{{ $t('accountBack.back') }}</div>
      </div>
      <div class="cl-flexcc cl-right" @click="gohall">
        {{ $t('homeMenu.home') }}
      </div>
    </div>

    <div class="cl-container">
      <div class="cl-flexcc cl-tabs-wrap">
        <h2 class="cl-flexcc cl-h2 cl-item cl-selected" @click="goRegister">
          {{ $t('firstDeposit.register') }}
        </h2>
        <h2 class="cl-flexcc cl-h2 cl-item" @click="goLogin">
          {{ $t('firstDeposit.login') }}
        </h2>
      </div>
      <div class="cl-inputBox">
        <accountModal :msg="msg" />
        <div class="cl-title">
          <h2 class="cl-h2 cl-titleTop">{{ $t('accountVerify.title') }}</h2>

          <div class="cl-art">{{ $t('accountVerify.art') }}</div>
        </div>
        <div class="cl-inputItem">
          <!--<p class="cl-name">{{$t('accountVerify.name')}}</p>-->
          <div class="cl-flexcb cl-input">
            <div
              class="cl-left"
              :class="{
                'cl-select': inputStatus[0] === 1,
                'cl-error': inputStatus[0] === 2
              }"
            >
              <input
                type="number"
                v-model="verifyCode"
                @blur="setBlur(0)"
                @focus="setFocus(0)"
              />
              <div
                class="cl-clear"
                @click="clearInput('verifyCode')"
                v-show="verifyCode"
              />
            </div>

            <div
              class="cl-flexcc cl-right"
              :class="[count !== '00' ? 'cl-hadsendcode' : '']"
              @click="getCode"
            >
              {{ $t('accountVerify.resend') }}
              {{ count === '00' ? '' : '(' + count + 's)' }}
            </div>
          </div>
        </div>

        <div
          class="cl-flexcc cl-button"
          :class="{ 'cl-loginGrayButton': isButtonCanNotUse }"
          @click="gocontinue"
        >
          {{ $t('accountVerify.button') }}
        </div>

        <div
          class="cl-flexcc cl-forgot"
          :key="1"
          v-html="$t('accountRegister.bottom')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import accountModal from '@/components/components/accountModal.vue'

export default {
  name: 'Verify',
  components: { accountModal },
  data() {
    return {
      verifyCode: '',
      isSending: false,
      count: '00',
      timer: null,
      isButtonCanNotUse: true, // 按钮是否可以点击状态
      inputStatus: [],
      msg: '' // 提示信息
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    phoneNumber() {
      return this.$store.state.phoneNumber
    },
    password() {
      return this.$store.state.password
    },
    isApp() {
      return window.appInteraction.type
    },
    imei() {
      return this.$store.state.imei
    },
    inviterCode() {
      return Lib.common.getCookie('inviterCode')
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
    luckyBagId() {
      return this.$route.query.luckyBagId
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  watch: {
    verifyCode(newValue, oldValue) {
      if (this.verifyCode.length > 4) {
        this.verifyCode = oldValue
      }
      this.isButtonCanNotUse = this.verifyCode.length !== 4
    }
  },
  mounted() {
    // 事件埋点
    Lib.common.event_statistics('Register2_Page_View')
    // 自动获取验证码
    this.getCode(1)
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 清除输入框数据
    clearInput(data) {
      Lib.common.clearInputData(data, this)
    },
    // 返回上一页
    goBack() {
      Lib.common.event_statistics('Register2_Return_Click')
      Lib.common.activityBack(this)
    },
    // 返回大厅
    gohall() {
      this.$router.replace({ path: `/${this.locale}` })
    },
    // 前往登录
    goLogin() {
      this.$router.replace({ path: `/${this.locale}/login` })
    },
    // 前往登录
    goRegister() {
      this.$router.push({ path: `/${this.locale}/register` })
    },
    // 获取验证码
    getCode(times) {
      // 计时
      const TIME_COUNT = 60
      if (!this.timer) {
        if (!times) {
          Lib.common.event_statistics('Register2_Resend_Click')
        }
        this.$axios_api
          .sendCode({
            mobile: this.phoneNumber
          })
          .then((res) => {
            if (res.code !== 0) {
              this.msg = res.msg
              Lib.common.event_statistics(
                'Register2_Send_Click',
                `Failed:${res.code}`
              )
            } else {
              Lib.common.event_statistics('Register2_Send_Click', 'Success')
              this.count = TIME_COUNT
              this.isSending = true
              this.timer = setInterval(() => {
                if (this.count > 1 && this.count <= TIME_COUNT) {
                  this.count--
                  this.count =
                    parseInt(this.count) < 10 ? '0' + this.count : this.count
                } else {
                  clearInterval(this.timer)
                  this.timer = null
                  this.count = '00'
                  this.isSending = false
                }
              }, 1000)
            }
          })
      } else {
        console.log('can not send')
      }
    },
    // 下一步
    gocontinue() {
      Lib.common.event_statistics('Register2_Comp_Click')
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

      this.$axios_api
        .register({
          check_code: this.verifyCode,
          mobile: this.phoneNumber,
          password: this.password,
          type,
          device: this.imei,
          inviter: this.inviterCode ? this.inviterCode : ''
        })
        .then((res) => {
          if (res.code === 0) {
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
            Lib.common.event_statistics('Register2_Comp_Click_Success')

            // 跳转到主页
            this.goHall(res.data.token, res.data.uid)
          } else {
            Lib.common.event_statistics('Register2_Comp_Click_Failure')
            this.$store.commit('changeLoadingStatus', false)
            this.msg = res.msg
          }
        })
        .catch(() => {
          Lib.common.event_statistics('Register2_Comp_Click_Failure')
          this.$store.commit('changeLoadingStatus', false)
          this.msg = this.$t('reminder.networkError')
        })
    },
    // 跳转到首页
    goHall(token, uid) {
      this.getInfo(token, uid)
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
    getInfo(token, uid) {
      this.$axios_api
        .userInfo({
          token: token || this.token
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)

          if (res.code === 0) {
            // 设置用户属性
            this.$store.commit('setInfo', res.data)
            if (this.from) {
              this.$router.replace({
                path: `/${this.locale}/${this.from}`
              })
            } else if (this.fromName) {
              this.$router.replace({ path: this.fromName })
            } else if (this.fromNova) {
              this.$axios_api
                .userAccountInfo({
                  token: this.token
                })
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
              if (this.luckyBagId) {
                const value = this.luckyBagId + '_' + uid
                this.setCookie(
                  'TLAR',
                  value,
                  Number(this.$route.query.perpetual)
                )
                // 如果是限时活动注册的，那么在注册成功后帮用户参加活动
                this.$axios_api
                  .luckybagJoin({
                    id: this.luckyBagId,
                    token: token || this.token
                  })
                  .then(() => {
                    // 跳转到主页
                    this.$router.replace({ path: `/${this.locale}` })
                    Lib.store.set('saveInfoStore', {
                      phoneNumber: this.phoneNumber,
                      password: this.password,
                      type: 'joinNow'
                    })
                  })
                return
              }
              this.$router.replace({ path: `/${this.locale}` })
              Lib.store.set('saveInfoStore', {
                phoneNumber: this.phoneNumber,
                password: this.password,
                type: 'joinNow'
              })
            }
          }
        })
    },
    // 获取焦点
    setFocus(index) {
      Lib.common.event_statistics('Register2_Code_Click')
      this.$set(this.inputStatus, index, 1)
    },
    // 失去焦点
    setBlur(index) {
      this.$set(this.inputStatus, index, 0)
    },
    // 设置错误
    setError(index) {
      this.$set(this.inputStatus, index, 2)
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
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountVerify-wrap {
  height: 100vh;
  width: 10rem;
  overflow: hidden;
  background-color: #fff;

  .cl-headerBox {
    width: 10rem;
    height: 47rem/36;
    box-sizing: border-box;
    padding: 0 10rem/36;
    font-weight: bold;
    color: #333333;

    .cl-left {
      .cl-back {
        margin-right: 10rem/36;
        .sprite(@icon-back-login,108rem);
      }
    }

    .cl-right {
      width: 66.67rem/36;
      height: 26rem/36;
      background-color: #fcdb06;
    }
  }

  .cl-container {
    .cl-tabs-wrap {
      box-sizing: border-box;
      border-bottom: 0.33rem/36 solid #c1cbd5;
      height: 33.33rem/36;
      width: 10rem;

      .cl-item {
        color: #5b5b5b;
        font-weight: bold;
        flex: 1;
        height: 31.33rem/36;

        &.cl-selected {
          color: #4c50fa;
          border-bottom: 2rem/36 solid #4c50fa;
        }
      }
    }

    .cl-title {
      padding: 50rem/36 0 30rem/36;
      text-align: center;

      .cl-titleTop {
        color: #313131;
        font-size: 20rem/36;
        font-weight: bold;
      }

      .cl-art {
        color: #7d7d7d;
        padding-top: 5rem/36;

        span {
          font-weight: bold;
        }
      }
    }

    .cl-inputBox {
      position: relative;
      padding: 0 30rem/36;

      .cl-name {
        color: #7d7d7d;
        margin-bottom: 5rem/36;
      }

      .cl-input {
        .cl-left {
          position: relative;
          width: 200rem/36;
          height: 40rem/36;
          border-radius: 3rem/36;
          background-color: #fff;
          border: 1px solid #929292;
          box-sizing: border-box;
          text-align: center;

          &.cl-select {
            border: 1px solid #4c50fa;
          }

          &.cl-error {
            border: 1px solid #eb6149;
          }

          .cl-clear {
            position: absolute;
            right: 10rem/36;
            bottom: 12rem/36;
            .sprite(@menu-clear, 108rem);
          }

          input {
            padding: 0;
            outline: none;
            border: none;
            width: 180rem/36;
            height: 36rem/36;
          }
        }

        .cl-right {
          color: #313131;
          font-weight: bold;
          border: 1px solid #929292;
          width: 90rem/36;
          height: 40rem/36;
          border-radius: 3rem/36;
          background-color: #dcdcdc;
          text-align: center;
          box-sizing: border-box;

          &.cl-hadsendcode {
            color: #999999;
            background-color: #dcdee4;
          }
        }
      }
    }

    .cl-button {
      color: #fff;
      background-color: #4c50fa;
      font-weight: bold;
      height: 40rem/36;
      border-radius: 3rem/36;
      margin-top: 35rem/36;
      text-align: center;
    }

    .cl-forgot {
      margin-top: 13rem/36;
      text-align: left;
    }
  }
}
</style>
