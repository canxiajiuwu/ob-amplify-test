<template>
  <div class="cl-backup-wrap">
    <headBack
      :title="$t('backup.title')"
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }"
    />
    <div class="cl-content-box">
      <accountModal :msg="msg" />
      <div class="cl-inputBox">
        <div class="cl-inputItem1">
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
              />
            </div>
            <div
              class="cl-clear"
              @click="clearInput('phoneNumber')"
              v-show="phoneNumber"
            />
          </div>
        </div>

        <div class="cl-inputItem2">
          <!-- <p class="cl-name">{{$t('accountVerify.name')}}</p> -->
          <div class="cl-flexcb cl-input">
            <div
              class="cl-left"
              :class="{
                'cl-select': inputStatus[1] === 1,
                'cl-error': inputStatus[1] === 2
              }"
            >
              <input
                type="number"
                v-model="verifyCode"
                @blur="setBlur(1)"
                :placeholder="$t('backup.code')"
                @focus="setFocus(1)"
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
              {{
                count === '00'
                  ? $t('backup.sendCode')
                  : $t('accountVerify.resend') + '(' + count + 's)'
              }}
            </div>
          </div>
        </div>

        <div
          class="cl-flexcc cl-lkButton cl-button"
          :class="{ 'cl-isButtonCanNotUse': isButtonCanNotUse }"
          @click="gocontinue"
        >
          {{ $t('validate.submit') }}
        </div>

        <div class="cl-art">{{ $t('backup.art') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import accountModal from '@/components/components/accountModal.vue'
import headBack from '@/components/components/headBack.vue'

export default {
  components: { accountModal, headBack },
  data() {
    return {
      phoneNumber: '',
      verifyCode: '',
      isSending: false,
      count: '00',
      timer: null,
      // 按钮是否可以点击状态
      isButtonCanNotUse: true,
      inputStatus: [],
      msg: ''
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  watch: {
    verifyCode(newValue, oldValue) {
      if (newValue.length > 4) this.verifyCode = oldValue

      if (this.verifyCode.length === 4) this.isButtonCanNotUse = false
      else this.isButtonCanNotUse = true
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 清除输入框数据
    clearInput(data) {
      Lib.common.clearInputData(data, this)
    },
    // 获取焦点
    setFocus(index) {
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
    // 获取验证码
    getCode() {
      // 计时
      const TIME_COUNT = 60
      if (!this.timer) {
        this.$axios_api.sendCode({ mobile: this.phoneNumber }).then((res) => {
          if (res.code !== 0) this.msg = res.msg
          else {
            this.msg = ''
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
      Lib.common.event_statistics('backup_submit')

      // 若为9位号码，则将首位添加0
      if (this.phoneNumber.length === 9) {
        this.phoneNumber = '0' + this.phoneNumber
      }

      // // 数据校验 手机号09开头，第三位不能为3，总共10位数
      // if (!Lib.common.phoneNumberVerify(this).test(this.phoneNumber)) {
      //   this.msg = this.$t('reminder.login')
      //   this.setError(0)
      //   return
      // }
      // Lib.common.errorReminder(
      //   this,
      //   '',
      //   '',
      //   '',
      //   this.$t('backup.art'),
      //   '',
      //   this.$t('reminder.button.ok')
      // )
      // backup
      this.backup()
    },
    backup() {
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .backup({
          token: this.token,
          mobile: this.phoneNumber,
          code: this.verifyCode
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('backup.success'),
              '',
              this.$t('reminder.button.ok')
            )
            setTimeout(() => {
              this.$router.replace({ path: `/${this.locale}/account` })
            }, 2000)
          } else {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              res.msg,
              '',
              this.$t('reminder.button.ok')
            )
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-backup-wrap {
  height: 100vh;
  overflow: auto;
  background-color: #fff;

  .cl-content-box {
    .cl-inputBox {
      position: relative;
      padding: 50rem/36 30rem/36;

      .cl-inputItem1 {
        margin-bottom: 10rem/36;
        color: #7d7d7d;

        .cl-name {
          color: #333;
          font-weight: bold;
          padding: 15rem/36 0 6rem/36;
        }

        .cl-input {
          position: relative;
          width: 300rem/36;
          height: 40rem/36;
          border: 1rem/36 solid #929292;
          font-weight: bold;
          border-radius: @mainButtonRadius;

          &.cl-select {
            border: 1rem/36 solid @mainThemeColor;
          }

          &.cl-error {
            border: 1rem/36 solid #eb6149;
          }

          .cl-clear {
            position: absolute;
            right: 10rem/36;
            bottom: 12rem/36;
            .sprite(@menu-clear, 108rem);
          }

          .cl-left {
            width: 78rem/36;
            height: 21rem/36;
            margin-right: 10rem/36;
            color: @mainThemeColor;
            font-weight: bold;
            text-align: center;
            border-right: 0.33rem/36 solid #979797;
          }

          .cl-middle > input {
            border: none;
            outline: none;
            padding: 0;
            width: 280rem/36;
            height: 38rem/36;
          }

          .cl-right > input {
            border: none;
            outline: none;
            padding: 0;
            width: 210rem/36;
            height: 38rem/36;
          }
        }
      }

      .cl-inputItem2 {
        .cl-name {
          color: #7d7d7d;
          margin-bottom: 5rem/36;
        }

        .cl-input {
          .cl-left {
            position: relative;
            width: 174rem/36;
            height: 40rem/36;
            border-radius: @mainButtonRadius;
            background-color: #fff;
            border: 1rem/36 solid #929292;
            box-sizing: border-box;
            text-align: center;

            &.cl-select {
              border: 1rem/36 solid @mainThemeColor;
            }

            &.cl-error {
              border: 1rem/36 solid #eb6149;
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
              width: 160rem/36;
              height: 36rem/36;
              margin-top: 2rem/36;
            }

            ::placeholder {
              font-size: 14rem/36;
            }
          }

          .cl-right {
            color: @chooseColor;
            font-weight: bold;
            width: 120rem/36;
            height: 40rem/36;
            border-radius: @mainButtonRadius;
            background-color: @chooseButton;
            text-align: center;
            box-sizing: border-box;

            &.cl-hadsendcode {
              color: @noChooseColor;
              border: 1rem/36 solid #929292;
              background-color: @noChooseButton;
            }
          }
        }
      }
    }

    .cl-button {
      width: 100%;
      height: 47rem/36;
      margin-top: 30rem/36;
      font-size: 16rem/36;
      text-transform: uppercase;

      &.cl-isButtonCanNotUse {
        opacity: 0.7;
      }
    }

    .cl-art {
      color: #515151;
      padding-top: 10rem/36;
    }
  }
}
</style>
