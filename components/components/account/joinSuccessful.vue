<template>
  <div class="cl-joinSuccessful-wrap">
    <drawer
      :visible.sync="showJoinSuccessful"
      type="top"
      :width="360 / 36"
      height="auto"
      :show="true"
      :border-radius="0"
      :z-index="zIndex"
      boxbg-color="rgba(255, 255, 255)"
    >
      <div class="cl-box">
        <div class="cl-close" @click="close">
          <img src="@/assets/images/Index/joinSuccessClose.png" alt="close" />
        </div>
        <div class="cl-top">
          <div class="cl-joinSuccessfulTitle">
            {{
              saveInfoStore.type === 'rePsd'
                ? $t('forgotPsd.modifyPsdSuccess')
                : $t('forgotPsd.joinSuccess')
            }}
          </div>
          <div class="cl-savePsd">{{ $t('forgotPsd.savePsd') }}</div>
          <div class="cl-copyBox" @click="saveAccount('copyText')">
            {{
              `Account: ${saveInfoStore.phoneNumber}  &emsp;   Password: ${saveInfoStore.password} `
            }}
          </div>
          <div class="cl-sendEmailSuccess cl-flexcc">
            {{ sendEmailSuccess ? $t('forgotPsd.sendedEmail') : '' }}
          </div>
          <div
            class="cl-lkButton cl-flexcc cl-saveEmail"
            @click="saveAccount('saveEmail')"
          >
            {{ $t('forgotPsd.saveEmail') }}
          </div>
          <div class="cl-imgAndFile">
            <div class="cl-saveImg cl-flexcc" @click="saveAccount('saveImage')">
              {{ $t('forgotPsd.saveImg') }}
            </div>
            <div class="cl-saveFile cl-flexcc" @click="saveAccount('saveFile')">
              {{ $t('forgotPsd.saveFile') }}
            </div>
          </div>
        </div>
        <div class="cl-bottom" v-if="saveInfoStore.type === 'joinNow'">
          <div class="cl-firstBanner" @click="goPage">
            <img
              :src="`${STATICURL}/images/${$store.state.root.locale}/firstBanner.jpg`"
              alt="firstBanner"
            />
          </div>
        </div>
      </div>
    </drawer>
    <inputEmail
      :show-input-email="showInputEmail"
      :save-info-store="saveInfoStore"
      where="joinSuccessful"
      @closeInputEmail="closeInputEmail"
      @emitSendEmailSuccess="emitSendEmailSuccess"
    />
  </div>
</template>

<script>
import Lib from '../../../assets/js/Lib'
import inputEmail from './inputEmail.vue'
import {
  popUpWindowDetection,
  getPopupHierarchy,
  removesPopupsBeingDisplayedList
} from '@/assets/js/utils/popupPriority.js'
import imgBg from '@/assets/images/Index/saveImgBg.jpg'
export default {
  components: { inputEmail },
  data() {
    return {
      showJoinSuccessful: false,
      showInputEmail: false,
      sendEmailSuccess: false,
      popType: 'saveInfo',
      saveInfoStore: {}
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    STATICURL() {
      return (
        process.env.STATICURL +
        (process.env.NODE_ENV === 'development' ? '/..' : '')
      )
    },
    zIndex() {
      return getPopupHierarchy({ type: this.popType })
    },
    accountInfo() {
      return this.$store.state.accountInfo
    }
  },
  mounted() {
    Lib.common.event_statistics('Home_Page_view')
    this.saveInfoStore = Lib.store.get('saveInfoStore') || {}
    if (
      this.saveInfoStore.phoneNumber &&
      this.saveInfoStore.password &&
      popUpWindowDetection({ type: this.popType })
    ) {
      Lib.common.event_statistics('JoinSuccess_Page_view')
      this.showJoinSuccessful = true
      Lib.store.remove('saveInfoStore')
    }
  },
  methods: {
    close() {
      this.showJoinSuccessful = false
      removesPopupsBeingDisplayedList({ type: this.popType })
    },
    closeInputEmail() {
      this.showInputEmail = false
    },
    // 发送邮件成功
    emitSendEmailSuccess() {
      Lib.common.event_statistics('SavePassword_send_email', 'Success')
      this.showInputEmail = false
      this.sendEmailSuccess = true
    },
    goPage() {
      this.$router.push({
        path: `/${this.$store.state.root.locale}/firstDeposit`
      })
    },
    copyText(name, text) {
      Lib.common.event_statistics('SavePassword_copy_text')
      try {
        const input = document.createElement('input')
        input.value = text
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('cashoutLang.copySuccess'),
          1
        )
      } catch (err) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('cashoutLang.copyFail'),
          0
        )
      }
    },
    saveFile(name, text) {
      Lib.common.event_statistics('SavePassword_save_file')
      const element = document.createElement('a')
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
      )
      element.setAttribute('download', name + '.txt')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    saveImage(name) {
      Lib.common.event_statistics('SavePassword_save_image')
      const canvas = document.createElement('canvas')
      const scaleFactor = window.devicePixelRatio || 2
      canvas.width = 360 * scaleFactor
      canvas.height = 360 * scaleFactor
      const ctx = canvas.getContext('2d')
      // 设定文本内容
      const website = 'https://www.onebet.cm'
      const accountTitle = this.$t('footerMenu.account') + ':'
      const account = this.saveInfoStore.phoneNumber
      const passwordTitle = this.$t('accountLogin.password') + ':'
      const password = this.saveInfoStore.password

      const img = new Image() // 创建一个<img>元素
      img.crossOrigin = 'anonymous'
      img.src = imgBg
      img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // 设置文本样式
        ctx.fillStyle = 'white'
        // 绘制文本
        ctx.font = `normal ${33 * scaleFactor}px Source Han Sans CN`
        const accountTitleWidth = ctx.measureText(accountTitle).width
        ctx.fillText(
          accountTitle,
          (canvas.width - accountTitleWidth) / 2,
          87 * scaleFactor
        )
        ctx.font = `bold ${33 * scaleFactor}px Source Han Sans CN`
        const accountWidth = ctx.measureText(account).width
        ctx.fillText(
          account,
          (canvas.width - accountWidth) / 2,
          87 * scaleFactor + 80
        )

        ctx.font = `normal ${33 * scaleFactor}px Source Han Sans CN`
        const passwordTitleWidth = ctx.measureText(passwordTitle).width
        ctx.fillText(
          passwordTitle,
          (canvas.width - passwordTitleWidth) / 2,
          195 * scaleFactor
        )
        ctx.font = `bold ${33 * scaleFactor}px Source Han Sans CN`
        const passwordWidth = ctx.measureText(password).width
        ctx.fillText(
          password,
          (canvas.width - passwordWidth) / 2,
          195 * scaleFactor + 80
        )

        ctx.font = `normal ${20 * scaleFactor}px Source Han Sans CN`
        const textWidth = ctx.measureText(website).width
        ctx.fillText(website, (canvas.width - textWidth) / 2, 319 * scaleFactor)
        // 生成图片并下载
        ctx.scale(scaleFactor, scaleFactor)
        const dataURL = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataURL
        a.download = name + '.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    },
    saveEmail() {
      if (this.accountInfo.email && this.accountInfo.email != 0) {
        Lib.common.event_statistics('SavePassword_send_email')
        this.send()
        return
      }
      Lib.common.event_statistics('SavePassword_open_email')
      this.showInputEmail = true
    },
    saveAccount(type) {
      const obj = {
        saveEmail: this.saveEmail,
        copyText: this.copyText,
        saveFile: this.saveFile,
        saveImage: this.saveImage
      }
      const text = `${this.$t(
        'forgotPsd.website'
      )}: https://www.onebet.cm \n${this.$t('footerMenu.account')}: ${
        this.saveInfoStore.phoneNumber
      } \n${this.$t('accountLogin.password')}: ${this.saveInfoStore.password}`
      const name = 'onebet'
      obj[type] && obj[type](name, text)
    },
    // 发送
    send() {
      Lib.common.event_statistics('SavePassword_send_email')
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .emailSendAccount({
          token: this.token,
          email: this.accountInfo.email,
          password: this.saveInfoStore.password,
          type: 2
        })
        .then(() => {
          this.$store.commit('changeLoadingStatus', false)
          this.emitSendEmailSuccess()
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-joinSuccessful-wrap {
  .cl-box {
    background-color: #fff;
    position: relative;
    .cl-close {
      width: 14rem/36;
      height: 14rem/36;
      position: absolute;
      top: 16rem/36;
      right: 13rem/36;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .cl-top {
      padding: 50rem/36 30rem/36 12rem/36;
      .cl-joinSuccessfulTitle {
        font-weight: bold;
        font-size: 19rem/36;
        color: #000000;
        line-height: 19rem/36;
      }
      .cl-savePsd {
        font-weight: 400;
        font-size: 13rem/36;
        color: #74747c;
        line-height: 13rem/36;
        margin-top: 5rem/36;
      }
      .cl-copyBox {
        height: 40rem/36;
        border-radius: 6rem/36;
        border: 1rem/36 solid #d4dae1;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 11rem/36;
        color: #000000;
        background-image: url('../../../assets/images/Index/copyIcon.png');
        background-repeat: no-repeat;
        background-size: 17rem/36; /* 设置背景图片大小为 contain，保持比例填充 */
        background-position: 274rem/36 10rem/36;
        display: flex;
        align-items: center;
        padding-left: 20rem/36;
        margin-top: 16rem/36;
      }
      .cl-sendEmailSuccess {
        height: 32rem/36;
        font-weight: 400;
        font-size: 11rem/36;
        color: #30db7f;
        line-height: 14rem/36;
        text-align: center;
      }
      .cl-saveEmail {
        height: 40rem/36;
        font-size: 13rem/36;
      }
      .cl-imgAndFile {
        margin-top: 11rem/36;
        display: flex;
        justify-content: space-between;
        div {
          width: 147rem/36;
          height: 40rem/36;
          border-radius: 6rem/36;
          border: 1rem/36 solid #000000;
          box-sizing: border-box;
          font-size: 13rem/36;
          color: #000000;
          text-align: center;
        }
      }
    }
    .cl-bottom {
      padding-bottom: 5rem/36;
      .cl-firstBanner {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
