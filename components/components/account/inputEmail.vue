<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="cl-inputEmail-wrap">
    <drawer
      :visible="showInputEmail"
      @closevisible="$emit('closevisible')"
      type="middle"
      :width="293 / 36"
      :height="167 / 36"
      :show="true"
      :border-radius="13"
      :z-index="zIndex"
      boxbg-color="rgba(255, 255, 255)"
    >
      <div class="cl-box">
        <div class="cl-inputEmailText">{{ $t('forgotPsd.inputEmail') }}</div>
        <div class="cl-errorTip">
          <span v-if="inputStatus[0] === 2">{{
            $t('forgotPsd.emailErrorTip')
          }}</span>
        </div>
        <div
          class="cl-inputBox"
          :class="{
            'cl-select': inputStatus[0] === 1,
            error: inputStatus[0] === 2
          }"
        >
          <input
            v-model="email"
            @blur="setBlur(0)"
            @focus="setFocus(0)"
            placeholder="e-mail"
          />
        </div>
        <div class="cl-flexcc cl-lkButton cl-button" @click="send">
          <span>{{ $t('forgotPsd.send') }}</span>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import { getPopupHierarchy } from '@/assets/js/utils/popupPriority.js'

export default {
  props: {
    showInputEmail: {
      type: Boolean
    },
    saveInfoStore: {
      type: Object
    },
    where: {
      type: String
    }
  },
  data() {
    return {
      inputStatus: [],
      email: ''
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    zIndex() {
      return getPopupHierarchy({ type: 'saveInfo' }) + 1
    }
  },
  watch: {
    showInputEmail(val) {
      if (!val) {
        this.$emit('closeInputEmail')
        this.inputStatus = []
        this.email = ''
      }
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
    },
    // 设置错误
    setError(index) {
      this.$set(this.inputStatus, index, 2)
    },
    // 发送
    send() {
      if (this.emailVerification()) {
        this.$store.commit('changeLoadingStatus', true)
        ;(this.where === 'setting'
          ? this.$axios_api.userEmailSet({
              token: this.token,
              email: this.email
            })
          : this.$axios_api.emailSendAccount({
              token: this.token,
              email: this.email,
              password: this.saveInfoStore.password,
              type: this.saveInfoStore.type === 'rePsd' ? 2 : 1
            })
        ).then(() => {
          this.$store.commit('changeLoadingStatus', false)
          this.$emit('emitSendEmailSuccess')
          const obj = this.$store.state.accountInfo || {}
          obj.email = this.email
          this.$store.commit('setAccountInfo', obj)
        })
      }
    },
    // 邮箱校验
    emailVerification() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (emailRegex.test(this.email)) {
        return true
      }
      this.setError(0)
      return false
    }
  }
}
</script>

<style scoped lang="less">
.cl-inputEmail-wrap {
  .cl-box {
    width: 293rem/36;
    height: 167rem/36;
    background: #ffffff;
    border-radius: 13rem/36;
    box-sizing: border-box;
    padding: 30rem/36 37rem/36 0;
    .cl-inputEmailText {
      font-weight: bold;
      font-size: 11rem/36;
      color: #000000;
      line-height: 17rem/36;
    }
    .cl-errorTip {
      height: 14rem/36;
      font-weight: 400;
      font-size: 11rem/36;
      color: #e62d0e;
      line-height: 11rem/36;
    }
    .cl-inputBox {
      width: 100%;
      height: 37rem/36;
      border-radius: 6rem/36;
      border: 1rem/36 solid #d4dae1;
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
      font-size: 13rem/36;
      margin-top: 14rem/36;
    }
  }
}
</style>
