<template>
  <div class="cl-verifyIdentity_wrap">
    <headBack :bgcolor="mainStyle.mainThemeColor" color="#fff" is-white-back>
      <template #middle>
        <div class="cl-logo">
          <img
            :src="`${STATICURL}/images/lang/${locale}/${country}/logo/logo-2022.png`"
            alt="onebet | logo"
          />
        </div>
      </template>
      <template>
        <div class="cl-top_right">
          <div
            class="cl-flexcc cl-lkButton cl-right"
            @click="$router.replace({ path: '/' + locale })"
          >
            {{ $t('homeMenu.home') }}
          </div>
        </div>
      </template>
    </headBack>

    <tabs :tabs-list="tabsList" @emitTabClick="emitTabClick" />

    <div class="cl-container">
      <accountModal :msg="msg" />
      <template v-if="tabIndex === 0">
        <div class="cl-smsCodeTopBox">
          <div class="cl-enterCodeModifyPsd">
            {{
              isSended
                ? $t('forgotPsd.enterCodeModifyPsd', { num: phoneNumber })
                : $t('forgotPsd.beforeSending', {
                    num: $t('areaCode') + ' ' + phoneNumber
                  })
            }}
          </div>
          <div class="cl-enterCodeModifyPsdTip" v-if="email && isSended">
            {{ $t('forgotPsd.enterCodeModifyPsdTip') }}
            <span>{{ email }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="cl-txidTopBox">
          <div class="cl-enterTransactionIDModifyPsd">
            {{
              $t('forgotPsd.enterTransactionIDModifyPsd', {
                num: $t('areaCode') + ' ' + phoneNumber
              })
            }}
          </div>
        </div>
      </template>
      <div class="cl-inputItem">
        <div class="cl-name">{{ $t('forgotPsd.inputNewPsd') }}</div>
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
            />
          </div>
          <div
            class="cl-eye"
            :class="showPasswordText ? 'cl-canSeen' : 'cl-noCanSeen'"
            @click="showPasswordText = !showPasswordText"
          />
          <div
            class="cl-clear"
            @click="clearInput('password')"
            v-show="password"
          />
        </div>
      </div>
      <div class="cl-inputItemTipBox">
        <div class="cl-inputItemTip">
          <div class="cl-digit">{{ $t('reminder.passwordRestriction') }}</div>
          <div class="cl-inputItemTipText">
            <span v-if="inputStatus[1] === 2">{{
              $t('reminder.passwordTip')
            }}</span>
          </div>
        </div>
      </div>

      <template v-if="tabIndex === 0">
        <div class="cl-enterCode">{{ $t('forgotPsd.enterCode') }}</div>
        <div class="cl-inputItem2">
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
            </div>
            <div class="cl-rightBox">
              <div
                class="cl-clear"
                @click="clearInput('verifyCode')"
                v-show="verifyCode"
              ></div>
              <div
                class="cl-flexcc cl-right"
                :class="[count !== '00' ? 'cl-hadsendcode' : '']"
                @click="getCode"
              >
                {{
                  count === '00'
                    ? $t('backup.sendCode')
                    : $t('accountVerify.resend')
                }}
                {{ count === '00' ? '' : '(' + count + 's)' }}
              </div>
            </div>
          </div>
        </div>
        <div class="cl-inputItemTipBox cl-inputItemTipBox2">
          <div class="cl-inputItemTip">
            <div class="cl-digit">{{ $t('reminder.passwordRestriction') }}</div>
            <div class="cl-inputItemTipText">
              <span v-if="inputStatus[0] === 2">{{
                $t('forgotPsd.captchaErrorTip')
              }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="cl-enterTransactionIDBox">
          <div class="cl-enterTransactionIDTitle">
            <div>{{ $t('forgotPsd.enterTransactionID') }}</div>
            <div class="cl-icon">
              <img
                src="@/assets/images/Index/transactionIDTip.png"
                @click="changeTransactionIDTip(true)"
              />
              <div
                class="cl-showTransactionIDTip cl-flexcc"
                v-if="showTransactionIDTip"
              >
                {{
                  phoneNumberCompany === 'mtn'
                    ? 'e.g. Transfert de 3000 FCFA effectue avec succes a ONEBET DEPOSIT (237679****15) le xxxx-xx-xxxx:xx:xx. FRAIS O FCFA. transaction ld: 88xxxxxxxx.'
                    : 'e.g. Transaction MPxxxxxx.xxxx.xxxxxx to refill 9000 FCFA from 69****274 is successful.'
                }}
                <div class="cl-triangle"></div>
                <div
                  class="cl-mask"
                  @click="changeTransactionIDTip(false)"
                ></div>
              </div>
            </div>
          </div>
          <div class="cl-enterVerificationCode">
            {{
              $t('forgotPsd.enterVerificationCode', {
                phone:
                  phoneNumberCompany === 'mtn'
                    ? 'MTN, e.g.:88xxxxxxxx'
                    : 'Orange, e.g.:MPxxxxxx.xxxx.xxxxxx'
              })
            }}
          </div>
          <div
            class="cl-transactionIDInput"
            :class="{
              'cl-select': inputStatus[3] === 1
            }"
          >
            <input
              @blur="setBlur(3)"
              @focus="setFocus(3)"
              :placeholder="
                $t('forgotPsd.fullMessage', {
                  phone: phoneNumberCompany === 'mtn' ? 'MTN' : 'Orange'
                })
              "
              v-model="transactionID"
            />
          </div>
        </div>
      </template>

      <div
        class="cl-flexcc cl-lkButton cl-button"
        :class="{
          'cl-isButtonCanNotUse': isButtonCanNotUse || inputStatus.includes(2)
        }"
        @click="goNext"
      >
        <span>{{ $t('forgotPsd.saveNewPsd') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import tabs from '@/components/components/account/tabs'
import accountModal from '@/components/components/accountModal.vue'

export default {
  components: { headBack, tabs, accountModal },
  data() {
    return {
      tabsList: [this.$t('forgotPsd.smcCode'), this.$t('forgotPsd.txid')],
      inputStatus: [],
      verifyCode: '',
      timer: null,
      isSending: false,
      isSended: false,
      count: '00',
      password: '',
      msg: '',
      tabIndex: 0,
      transactionID: '',
      isButtonCanNotUse: true,
      showTransactionIDTip: false,
      showPasswordText: false // 是否显示密码
    }
  },
  computed: {
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    STATICURL() {
      return process.env.STATICURL
    },
    phoneNumber() {
      return this.$route.query.phoneNumber
    },
    // 品牌号
    phoneNumberCompany() {
      return Lib.common.phoneNumberCompany(this, this.phoneNumber)
    },
    email() {
      return this.$route.query.email
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
      if (this.password.length >= 4 && this.verifyCode.length === 4) {
        this.isButtonCanNotUse = false
      } else {
        this.isButtonCanNotUse = true
      }
    },
    password(newValue, oldValue) {
      // 最长10位数
      if (newValue.length > 4) this.password = oldValue
      this.passwordCalibration()
    },
    transactionID(newValue, oldValue) {
      this.passwordCalibration()
    }
  },
  mounted() {
    Lib.common.event_statistics('Forgot2_Page_view')
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 品牌号
    // phoneNumberCompany(phone) {
    //   return this.accountInfo ? Lib.common.phoneNumberCompany(this, phone) : ''
    // },
    // 弹出气泡框
    changeTransactionIDTip(status) {
      this.showTransactionIDTip = status
    },
    // 密码校验
    passwordCalibration() {
      if (this.tabIndex) {
        if (this.transactionID && this.password.length >= 4) {
          this.isButtonCanNotUse = false
        } else {
          this.isButtonCanNotUse = true
        }
        return
      }
      if (this.verifyCode.length === 4 && this.password.length >= 4) {
        this.isButtonCanNotUse = false
      } else {
        this.isButtonCanNotUse = true
      }
    },
    // tab切换
    emitTabClick(index) {
      this.tabIndex = index
      // 清除密码框的聚焦和错误提示
      this.inputStatus = []
      this.msg = ''
      this.passwordCalibration()
    },
    // 清除输入框数据
    clearInput(data) {
      Lib.common.clearInputData(data, this)
    },
    // 格式校验
    goContinue(index) {
      if (index) {
        // 注册页面验证密码 ^[0-9A-Za-z]{8,16}$
        if (!/^\d{4}$/.test(this.password)) {
          Lib.common.event_statistics(
            'Forgot2_Comp_SMS_Click',
            'Failed:password_error'
          )
          this.setError(1)
        }
        return
      }
      if (!/^\d{4}$/.test(this.verifyCode)) {
        Lib.common.event_statistics(
          'Forgot2_Comp_SMS_Click',
          'Failed:code_error'
        )
        this.setError(0)
      }
    },
    // 获取验证码
    getCode() {
      Lib.common.event_statistics('Forgot2_Send_Click')
      // 计时
      const TIME_COUNT = 60
      if (!this.timer && !this.isSending) {
        this.$store.commit('changeLoadingStatus', true)
        this.isSending = true
        this.$axios_api
          .sendCode({
            mobile: this.phoneNumber,
            from: 2
          })
          .then((res) => {
            this.$store.commit('changeLoadingStatus', false)
            if (res.code !== 0) {
              Lib.common.event_statistics('Forgot2_Send_Click', 'Success')
              this.msg = res.msg
              this.isSending = false
            } else {
              Lib.common.event_statistics(
                'Forgot2_Send_Click',
                `Failed:${res.code}`
              )
              this.count = TIME_COUNT
              this.isSended = true
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
    // 获取焦点
    setFocus(index) {
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
    goNext() {
      this.goContinue(1)
      if (!this.tabIndex) {
        this.goContinue(0)
        Lib.common.event_statistics('Forgot2_Comp_SMS_Click')
      } else {
        Lib.common.event_statistics('Forgot2_Comp_txid_Click')
      }
      const arr = this.inputStatus.filter((item) => item === 2)
      // 满足条件并且没得错误提示
      if (arr.length === 0 && !this.isButtonCanNotUse) {
        this.$store.commit('changeLoadingStatus', true)
        // 修改密码
        ;(this.tabIndex
          ? this.$axios_api.forgetPasswordTransaction({
              mobile: this.phoneNumber,
              trans_id: this.transactionID,
              password: this.password
            })
          : this.$axios_api.forget({
              mobile: this.phoneNumber,
              code: this.verifyCode,
              password: this.password,
              password_confirmation: this.password
            })
        ).then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            Lib.common.event_statistics(
              `Forgot2_Comp_${this.tabIndex ? 'txid' : 'SMS'}_Click`,
              'Success'
            )

            // 设置token
            Lib.store.set('token', Lib.common.encrypt(res.data.token))
            // 跳转到主页
            this.gohall()
          } else if (res.code === 404 && this.tabIndex) {
            Lib.common.event_statistics(
              `Forgot2_Comp_${this.tabIndex ? 'txid' : 'SMS'}_Click`,
              `Failed:${res.code}`
            )
            this.msg = this.$t('forgotPsd.noFoundTxid', {
              num1: this.withdrawTransactionID(),
              num2: this.$t('areaCode') + ' ' + this.phoneNumber
            })
          } else {
            Lib.common.event_statistics(
              `Forgot2_Comp_${this.tabIndex ? 'txid' : 'SMS'}_Click`,
              `Failed:${res.code}`
            )
            this.msg = res.msg
          }
        })
      }
    },
    withdrawTransactionID() {
      const reg =
        this.phoneNumberCompany === 'mtn'
          ? /8\d{9}/
          : /([A-Z]{2}\d{6}\.\d{4}\.\w{6})/
      const matches = this.transactionID.match(reg)
      return (matches && matches[0]) || this.transactionID
    },
    // 返回大厅
    gohall() {
      Lib.store.set('saveInfoStore', {
        phoneNumber: this.phoneNumber,
        password: this.password,
        type: 'rePsd'
      })
      this.$router.push({
        path: `/${this.locale}`
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-verifyIdentity_wrap {
  height: 100vh;
  width: 10rem;
  overflow: hidden;
  background-color: #fff;
  .cl-logo {
    position: relative;
    height: 30rem/36;
  }

  .cl-logo > img {
    height: 30rem/36;
  }

  .cl-top_right {
    .cl-right {
      margin-right: 10rem/36;
      min-width: 67rem/36;
      color: #fff;
      border: 1rem/36 solid #fff;
    }
  }
  .cl-container {
    padding: 0 30rem/36;
    position: relative;
    .cl-smsCodeTopBox {
      height: 103rem/36;
      padding-bottom: 18rem/36;
      box-sizing: border-box;
      font-weight: 400;
      font-size: 11rem/36;
      line-height: 14rem/36;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .cl-enterCodeModifyPsd {
        color: #000000;
      }
      .cl-enterCodeModifyPsdTip {
        color: #74747c;
        margin-top: 10rem/36;
        span {
          text-transform: none;
        }
      }
    }
    .cl-txidTopBox {
      font-weight: 400;
      font-size: 11rem/36;
      line-height: 17rem/36;
      min-height: 103rem/36;
      padding-top: 55rem/36;
      box-sizing: border-box;
    }
    .cl-enterCode {
      font-weight: bold;
      font-size: 15rem/36;
      color: #000000;
      line-height: 15rem/36;
      padding-bottom: 10rem/36;
    }
    .cl-inputItem2 {
      position: relative;
      font-size: 11rem/36;
      .cl-input {
        .cl-left {
          width: 300rem/36;
          height: 40rem/36;
          font-weight: 400;
          border: 1rem/36 solid #d4dae1;
          border-radius: @mainButtonRadius;

          &.cl-select {
            border: 1px solid #4c50fa;
          }

          &.cl-error {
            border: 1px solid #eb6149;
          }

          input {
            border: none;
            outline: none;
            padding: 0;
            width: 280rem/36;
            height: 40rem/36;
            color: #000;
            border-radius: @mainButtonRadius;
            padding-left: 10rem/36;
          }
        }
        .cl-rightBox {
          position: absolute;
          top: 8rem/36;
          right: 7rem/36;
          display: flex;
          align-items: center;
          .cl-clear {
            margin-right: 10rem/36;
            .sprite(@menu-clear, 108rem);
          }
          .cl-right {
            height: 26rem/36;
            background: #4c50fa;
            border-radius: 13px;
            padding: 0 8rem/36;
            background-color: #4c50fa;
            text-align: center;
            box-sizing: border-box;
            font-weight: 400;
            font-size: 11rem/36;
            line-height: 11rem/36;
            color: #ffffff;

            &.cl-hadsendcode {
              color: #4c50fa;
              background-color: #fff;
            }
          }
        }
      }
    }
    .cl-enterTransactionIDBox {
      .cl-enterTransactionIDTitle {
        font-weight: bold;
        font-size: 15rem/36;
        color: #000000;
        line-height: 22rem/36;
        display: flex;
        align-items: center;
        .cl-icon {
          display: flex;
          align-items: center;
          margin-left: 4rem/36;
          position: relative;
          img {
            width: 13rem/36;
            height: 13rem/36;
          }
          .cl-showTransactionIDTip {
            width: 229rem/36;
            padding: 10rem/36;
            box-sizing: border-box;
            min-height: 48rem/36;
            background: #fff08c;
            font-weight: 400;
            font-size: 11rem/36;
            color: #000000;
            line-height: 15rem/36;
            border-radius: 6rem/36;
            position: absolute;
            top: 22rem/36;
            left: -115rem/36;
            .cl-triangle {
              width: 0;
              height: 0;
              border: 24rem/108 solid transparent;
              border-bottom: 24rem/108 solid #fff08c;
              position: absolute;
              top: -48rem/108;
              left: 338rem/108;
            }
            .cl-mask {
              width: 100vw;
              height: 100vh;
              position: fixed;
              top: 0;
              left: 0;
            }
          }
        }
      }
      .cl-enterVerificationCode {
        font-weight: 400;
        font-size: 11rem/36;
        color: #000000;
        line-height: 14rem/36;
        margin-top: 3rem/36;
      }
      .cl-transactionIDInput {
        border-radius: @mainButtonRadius;
        border: 1rem/36 solid #d4dae1;
        margin-top: 14rem/36;
        margin-bottom: 22rem/36;
        &.cl-select {
          border: 1px solid #4c50fa;
        }
        input {
          border: none;
          outline: none;
          padding: 0;
          width: 280rem/36;
          height: 40rem/36;
          color: #000;
          border-radius: @mainButtonRadius;
          padding-left: 10rem/36;
        }
        input::placeholder {
          font-size: 10rem/36;
          color: rgba(0, 0, 0, 0.3);
        }
      }
    }

    .cl-inputItem {
      font-size: 11rem/36;

      .cl-name {
        color: #000;
        font-weight: bold;
        padding-bottom: 10rem/36;
        font-size: 15rem/36;
      }

      .cl-input {
        position: relative;
        width: 300rem/36;
        height: 40rem/36;
        font-weight: 400;
        border: 1rem/36 solid #d4dae1;
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
          right: 42rem/36;
          bottom: 12rem/36;
          .sprite(@menu-clear, 108rem);
        }

        .cl-middle > input {
          border: none;
          outline: none;
          padding: 0;
          width: 280rem/36;
          height: 40rem/36;
          color: #000;
        }
      }
    }
    .cl-inputItemTipBox {
      height: 36rem/36;
      .cl-digit {
        font-weight: 400;
        font-size: 11rem/36;
        color: #74747c;
        line-height: 11rem/36;
        margin-top: 7rem/36;
      }
      .cl-inputItemTipText {
        font-weight: 400;
        font-size: 9rem/36;
        color: #e62d0e;
        line-height: 9rem/36;
        margin-top: 4rem/36;
      }
    }
    .cl-inputItemTipBox2 {
      height: 42rem/36;
    }
    .cl-button {
      width: 100%;
      height: 40rem/36;
      font-size: 13rem/36;
      box-sizing: border-box;
      &.cl-isButtonCanNotUse {
        opacity: 0.5;

        span {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
