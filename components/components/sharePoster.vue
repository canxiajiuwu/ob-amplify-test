<template>
  <div class="cl-sharePoster-wrap">
    <div class="cl-flexcc cl-top" :style="{ paddingTop: safeAreaTop + 'px' }">
      {{ $t('sharePoster.title') }}
    </div>
    <div
      class="cl-closeIcon"
      :style="{ top: `calc(17rem/36 + ${safeAreaTop}px)` }"
      @click="closeModal"
    />

    <div class="cl-iframeBox">
      <iframe
        ref="screenshot"
        name="screenshot"
        class="cl-screenshot"
        :src="shareUrl"
      />
      <div class="cl-shadow" />
    </div>

    <div class="cl-footer" :style="{ top: `calc(484rem/36 + ${safeAreaTop}px)` }">
      <div class="cl-shareTo">{{ $t('sharePoster.via') }}</div>
      <div class="cl-iconBox">
        <div class="cl-flexcc cl-item" v-if="!APP">
          <a
            :href="whatsappUrl"
            @click="appShareEvent(2)"
            target="_blank"
            id="J-share-whatsapp"
          >
            <div class="cl-icon cl-whatsapp" />
          </a>
          <div class="cl-word">Whatsapp</div>
        </div>
        <div class="cl-flexcc cl-item" v-else>
          <div class="cl-icon cl-whatsapp" @click="appshare(2)" />
          <div class="cl-word">Whatsapp</div>
        </div>
        <div class="cl-flexcc cl-item" v-if="!APP">
          <a
            :href="facebookUrl"
            @click="appShareEvent(1)"
            target="_blank"
            id="J-share-facebook"
          >
            <div class="cl-icon cl-facebook" />
          </a>
          <div class="cl-word">Facebook</div>
        </div>
        <div class="cl-flexcc cl-item" v-else @click="appshare(1)">
          <div class="cl-icon cl-facebook" />
          <div class="cl-word">Facebook</div>
        </div>
        <div class="cl-flexcc cl-item" @click="doAction">
          <div class="cl-icon cl-sms" />
          <div class="cl-word">SMS</div>
        </div>
        <div class="cl-flexcc cl-item" @click="screenshots" v-if="!APP">
          <div class="cl-icon cl-gallery" />
          <div class="cl-word">{{ $t('sharePoster.gallery') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: ['order'],
  data() {
    return {
      facebookUrl: '',
      whatsappUrl: '',
      shareText: ''
    }
  },
  computed: {
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    hostname() {
      return this.$store.state.root.country === 'ug'
        ? process.env.hostname
        : process.env.hostnamecm
    },
    APP() {
      return window.APP || null
    },
    shareUrl() {
      return `${this.hostname}/ssr/${this.$store.state.root.locale}/OrderShare/${this.order}`
    },
    winApp() {
      return window.appInteraction
    },
    isNewApp() {
      return Lib.store.get('isNewApp')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    // 添加iframe的load事件
    this.getIframeLoadEvent()
  },
  methods: {
    // 添加iframe的load事件
    getIframeLoadEvent() {
      const framesWindow = window.frames.screenshot
      framesWindow.addEventListener('load', this.getShareWord)
    },
    // 设置分享信息
    getShareWord() {
      const framesWindow = window.frames.screenshot
      this.shareText = framesWindow.document.querySelector('title').textContent
      this.facebookUrl =
        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(this.shareUrl)
      this.whatsappUrl =
        'https://wa.me/?text=' +
        encodeURIComponent(this.shareText + '\r\n') +
        encodeURIComponent(this.shareUrl)
    },
    // 给iframe中window发送消息通知下载图片
    screenshots() {
      const framesWindow = window.frames.screenshot
      framesWindow.postMessage({ fn: 'screenshots' }, '*')
    },
    success_callback(dataUrl) {
      this.$store.commit('changeLoadingStatus', false)
      const link = document.createElement('a')
      link.download = `${this.order}.jpeg`
      link.href = dataUrl
      link.click()

      //        let event = document.createEvent('MouseEvents');
      //        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      //        link.dispatchEvent(event);
    },
    fail_callback() {
      this.$store.commit('changeLoadingStatus', false)
      Lib.common.errorReminder(
        this,
        '',
        '',
        '',
        this.$t('sharePoster.fail'),
        '',
        this.$t('reminder.button.ok')
      )
    },
    closeModal() {
      this.$emit('closeShareModal')
    },
    appShareEvent(id) {
      if (id === 1) {
        Lib.common.event_statistics('sharePoster_friends_facebook')
      } else {
        Lib.common.event_statistics('sharePoster_friends_whatsapp')
      }
    },
    // 判断是否是移动端
    doAction() {
      if (this.isNewApp) return this.appshare(4)
      const test = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
        navigator.userAgent
      )
      if (!test) {
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('inviteFriend.reminder'),
          '',
          this.$t('reminder.button.ok')
        )
      } else {
        this.sendsms()
      }
    },
    // 发送短信
    sendsms() {
      const u = navigator.userAgent
      // android终端
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      const name = this.shareText + this.shareUrl

      Lib.common.event_statistics('sharePoster_friends_sms')

      if (isiOS) {
        window.location.href = 'sms:&body=' + encodeURIComponent(name)
      } else {
        window.location.href = 'sms:?body=' + encodeURIComponent(name)
      }
    },
    // app 分享
    appshare(index) {
      // this.req_xf_Card()
      let eventWord = 'sharePoster_friends_app_'
      const eventArr = [
        '',
        'facebook',
        'whatsapp',
        'instagram',
        'sms',
        'twitter'
      ]
      if (eventArr[index]) {
        eventWord += eventArr[index]
        Lib.common.event_statistics(eventWord)
      }
      let shareStr = this.shareText
      if (index !== 4) shareStr += '\r\n' + this.shareUrl
      this.winApp.share(index, this.shareUrl, shareStr)
    }
  }
}
</script>

<style scoped lang="less">
.cl-sharePoster-wrap {
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  background-color: #000;
  z-index: 2;

  .cl-top {
    height: 47rem/36;
    text-align: center;
    font-weight: bold;
    color: #fff;
    font-size: 13rem/36;
  }

  .cl-closeIcon {
    position: absolute;
    left: 10rem/36;
    .sprite(@icon-closewhite, 360rem);
  }

  .cl-iframeBox {
    position: relative;
    transform: scale(314/360);
    transform-origin: top center;
    width: 10rem;
    height: 14rem;

    .cl-screenshot {
      width: 10rem;
      height: 14rem;
      border: 0;
    }
    .cl-shadow {
      position: absolute;
      left: 0;
      bottom: -5rem/36;
      width: 10rem;
      height: 63rem/36;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }
  }

  .cl-footer {
    position: absolute;
    left: 0;
    width: 10rem;
    text-align: center;

    .cl-shareTo {
      font-weight: bold;
      color: #fff;
      padding: 10rem/36;
      font-size: 13rem/36;
    }

    .cl-iconBox {
      padding: 0 23rem/36;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .cl-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .cl-icon {
          &.cl-whatsapp {
            .sprite(@account-whatsapp, 108rem);
          }

          &.cl-facebook {
            .sprite(@account-facebook, 108rem);
          }

          &.cl-sms {
            .sprite(@account-sms, 108rem);
          }

          &.cl-gallery {
            .sprite(@account-gallery, 108rem);
          }
        }

        .cl-word {
          padding-top: 10rem/36;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>
