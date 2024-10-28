<template>
  <div class="cl-retrievePassword-wrap">
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

    <div class="cl-container">
      <accountModal :msg="msg" />

      <h2 class="cl-h2 cl-forget">{{ $t('accountLogin.forget') }}</h2>
      <div class="cl-inputPhoneResetPsd">
        {{ $t('forgotPsd.inputPhoneResetPsd') }}
      </div>
      <div class="cl-inputBox">
        <div class="cl-inputItem">
          <!--<p class="cl-name">{{$t('accountForgetStep1.enter')}}</p>-->
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
                :placeholder="$t('accountForgetStep1.number')"
                v-model="phoneNumber"
              />
            </div>
            <div
              v-show="phoneNumber"
              class="cl-clear"
              @click="phoneNumber = ''"
            />
          </div>
        </div>
      </div>
      <div class="cl-phoneNumberErrTip">
        <span v-if="inputStatus[0] === 2">{{ $t('reminder.login') }}</span>
      </div>
      <div
        class="cl-flexcc cl-lkButton cl-button"
        :class="{
          'cl-isButtonCanNotUse': isButtonCanNotUse || inputStatus.includes(2)
        }"
        @click="goNext"
      >
        <span>{{ $t('accountForgetStep1.next') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import accountModal from '@/components/components/accountModal.vue'

export default {
  components: { headBack, accountModal },
  data() {
    return {
      inputStatus: [],
      phoneNumber: '',
      isButtonCanNotUse: 1,
      msg: '' // 提示信息
    }
  },
  computed: {
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    STATICURL() {
      return process.env.STATICURL
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  watch: {
    phoneNumber(newValue, oldValue) {
      // 最长10位数
      if (newValue.length > 10) this.phoneNumber = oldValue

      if (this.phoneNumber.length >= 9) {
        this.isButtonCanNotUse = 0
      } else {
        this.isButtonCanNotUse = 1
      }
    }
  },
  mounted() {
    Lib.common.event_statistics('Forgot1_Page_View')
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    if (this.$route.query.phoneNumber) {
      this.phoneNumber = this.$route.query.phoneNumber
    }
  },
  methods: {
    // 获取焦点
    setFocus(index) {
      this.$set(this.inputStatus, index, 1)
    },
    // 失去焦点
    setBlur(index) {
      this.$set(this.inputStatus, index, 0)
      this.goContinue()
    },
    // 设置错误
    setError(index) {
      this.$set(this.inputStatus, index, 2)
    },
    // 格式校验
    goContinue() {
      // 手机号为空
      if (!this.phoneNumber) {
        Lib.common.event_statistics('Forgot1_Next_Click', 'Failed:num_exist')
        this.setError(0)
        return
      }

      // 若为9位号码，则将首位添加0
      if (this.phoneNumber.length === 9) {
        this.phoneNumber = '0' + this.phoneNumber
      }

      // 数据校验 手机号09开头，第三位不能为3，总共10位数
      if (!Lib.common.phoneNumberVerify(this).test(this.phoneNumber)) {
        Lib.common.event_statistics('Forgot1_Next_Click', 'Failed:num_error')
        this.setError(0)
      }
    },
    goNext() {
      Lib.common.event_statistics('Forgot1_Next_Click')
      this.goContinue()
      const arr = this.inputStatus.filter((item) => item === 2)
      if (arr.length === 0) {
        this.$store.commit('changeLoadingStatus', true)
        this.$axios_api
          .checkForgetMobile({
            mobile: this.phoneNumber
          })
          .then((res) => {
            this.$store.commit('changeLoadingStatus', false)
            if (res.code === 0) {
              Lib.common.event_statistics(
                'Forgot1_Next_Click',
                'Failed:Success'
              )
              // 去verifyIdentity 页面
              this.$router.push({
                path: `/${this.locale}/verifyIdentity`,
                query: {
                  phoneNumber: this.phoneNumber,
                  email: res.data.email
                }
              })
            } else {
              Lib.common.event_statistics(
                'Forgot1_Next_Click',
                `Failed:${res.code}`
              )
              this.msg = res.msg
            }
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-retrievePassword-wrap {
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
    padding: 66rem/36 30rem/36 0;
    box-sizing: border-box;
    position: relative;
    .cl-forget {
      font-weight: bold;
      font-size: 15rem/36;
      color: #000000;
      line-height: 22rem/36;
    }
    .cl-inputPhoneResetPsd {
      font-size: 11rem/36;
      color: #000000;
      line-height: 11rem/36;
      margin-top: 10rem/36;
    }
    .cl-inputBox {
      padding-top: 10rem/36;

      .cl-inputItem {
        color: #7d7d7d;

        .cl-name {
          color: #000;
          font-weight: bold;
          padding: 15rem/36 0 6rem/36;
        }

        .cl-input {
          position: relative;
          width: 298rem/36;
          height: 40rem/36;
          border: 1rem/36 solid #d4dae1;
          border-radius: @mainButtonRadius;
          input {
            border-radius: @mainButtonRadius;
            color: #000;
          }

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
            border-right: 0.5rem/36 solid #d4dae1;
            font-size: 14rem/36;
          }

          .cl-middle > input {
            border: none;
            outline: none;
            padding: 0;
            width: 280rem/36;
            height: 40rem/36;
          }

          .cl-right > input {
            border: none;
            outline: none;
            padding: 0;
            width: 210rem/36;
            height: 40rem/36;
          }
        }
      }
    }
    .cl-phoneNumberErrTip {
      min-height: 25rem/36;
      font-weight: 400;
      font-size: 9rem/36;
      color: #e62d0e;
      padding-top: 3rem/36;
      box-sizing: border-box;
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
