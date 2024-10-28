<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="cl-captcha_wrap">
    <drawer
      :visible.sync="showCaptcha"
      type="middle"
      :width="293 / 36"
      :height="283 / 36"
      :show="true"
      :border-radius="17"
      boxbg-color="rgba(255, 255, 255, 0)"
      @update:visible="handleUpdateVisible"
    >
      <div class="cl-box">
        <div v-show="isLoading" class="cl-loading cl-flexcc">
          <loading where="captcha" />
        </div>
        <div v-show="!isLoading" class="cl-captchaBox">
          <canvas id="captcha" class="cl-canvas"></canvas>
          <div class="cl-change" @click="change">
            {{ $t('forgotPsd.change') }}
          </div>
          <div class="cl-errTip">
            <span v-if="inputStatus[0] === 2"
              >{{ $t('forgotPsd.tryAgain') }}
            </span>
          </div>
        </div>
        <div
          class="cl-captchaInput"
          :class="{
            'cl-select': inputStatus[0] === 1,
            error: inputStatus[0] === 2
          }"
        >
          <input
            v-model="captchaInput"
            :placeholder="$t('forgotPsd.verificationCode')"
            @blur="setBlur(0)"
            @focus="setFocus(0)"
          />
        </div>
        <div
          class="cl-flexcc cl-lkButton cl-button"
          :class="{ 'cl-isButtonCanNotUse': isButtonCanNotUse }"
          @click="captchaVerification"
        >
          <span>{{ $t('forgotPsd.send') }}</span>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import CaptchaMini from '@/assets/js/utils/captcha-mini.js'
import loading from '@/components/components/loading'

export default {
  components: { loading },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          lineWidth: 1, // 线条宽度
          lineNum: 2, // 线条数量
          dotR: 2, // 点的半径
          dotNum: 10, // 点的数量
          preGroundColor: [0, 0], // 前景色区间
          backGroundColor: [250, 250], // 背景色区间
          fontSize:
            ((typeof window === 'undefined' ? 36 : window.rem) * 60) / 36, // 字体大小
          fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], // 字体类型
          fontStyle: 'stroke', // 字体绘制方法，有fill和stroke
          content: '0123456789', // 验证码内容
          length: 4 // 验证码长度
        }
      }
    },
    showCaptcha: {
      type: Boolean
    }
  },
  data() {
    return {
      captcha: null,
      captchaNum: null,
      captchaInput: '',
      isButtonCanNotUse: false,
      isLoading: true,
      inputStatus: []
    }
  },
  watch: {
    showCaptcha(val) {
      if (val) {
        if (!this.captcha) {
          this.captcha = new CaptchaMini(this.config)
          this.captcha.draw(document.querySelector('#captcha'), (r) => {
            this.captchaNum = r
          })
        } else {
          this.captcha.drawAgain()
        }
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
        }, this.captcha.getRandom(500, 1000))
      }
    }
  },
  methods: {
    handleUpdateVisible() {
      this.close()
    },
    // 换一张
    change() {
      Lib.common.event_statistics('Reg_Captcha_change')
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        this.captcha.drawAgain()
      }, this.captcha.getRandom(500, 1000))
    },
    done() {
      this.$emit('emitGoRegister')
    },
    close() {
      this.captchaInput = ''
      this.inputStatus = []
      this.$emit('close')
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
    captchaVerification() {
      if (this.captchaNum === this.captchaInput) {
        Lib.common.event_statistics('Reg_Captcha_Verify', 'Success')
        this.close()
        this.$emit('captchaVerificationOk', true)
      } else {
        Lib.common.event_statistics('Reg_Captcha_Verify', 'Failed')
        this.setError(0)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-captcha_wrap {
  .cl-box {
    padding: 27rem/36 37rem/36 0;
    background-color: #fff;
    height: 283rem/36;
    box-sizing: border-box;
    .cl-loading {
      width: 149rem/36;
      height: 129rem/36;
      display: flex;
      margin: 0 auto 14rem/36;
      position: relative;
    }
    .cl-captchaBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      .cl-canvas {
        width: 149rem/36;
        height: 84rem/36;
        background: #d8d8d8;
        margin: 0 auto;
      }
      .cl-change {
        width: 100%;
        font-weight: 400;
        font-size: 11rem/36;
        color: #5a40ff;
        text-decoration-line: underline;
        text-align: right;
        margin-top: 11rem/36;
      }
      .cl-errTip {
        width: 100%;
        font-weight: 400;
        font-size: 11rem/36;
        color: #e62d0e;
        min-height: 35rem/36;
        padding-top: 14rem/36;
        box-sizing: border-box;
      }
    }
    .cl-captchaInput {
      width: 100%;
      height: 37rem/36;
      border: 1rem/36 solid #d4dae1;
      border-radius: 6rem/36;
      box-sizing: border-box;
      &.cl-select {
        border: 1rem/36 solid @mainThemeColor;
      }

      &.cl-error {
        border: 1rem/36 solid #eb6149;
      }
      input {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        color: #000;
        border-radius: 6rem/36;
        padding: 0 10rem/36;
        box-sizing: border-box;
      }
      input::placeholder {
        font-size: 11rem/36;
        color: rgba(0, 0, 0, 0.3);
      }
    }
    .cl-button {
      height: 37rem/36;
      margin-top: 14rem/36;
      font-size: 13rem/36;
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
