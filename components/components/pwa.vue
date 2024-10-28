<template>
  <div>
    <drawer
      :visible.sync="pwaVisible"
      type="middle"
      :z-index="zIndex"
      :width="340 / 36"
      :border-radius="5"
      :mask-click="false"
    >
      <div class="cl-top">
        <div style="height: calc(10rem / 36)" />
        <div class="cl-title cl-flexcc">Add to home screen</div>
        <div style="height: calc(10rem / 36)" />
      </div>
      <div class="cl-middle">
        <!-- 内容 -->
        <div class="cl-app_icon">
          <img
            class="cl-img"
            :src="STATICURL + `/images/a2hs/192.png`"
            alt="guide"
          />
        </div>
        <div class="cl-app_name">OneBet</div>
      </div>
      <div class="cl-bottom">
        <div style="height: calc(10rem / 36)" />
        <div class="cl-flexcb">
          <div class="cl-button cl-cancel cl-flexcc" @click="cancel">Cancel</div>
          <div ref="addButton" class="cl-button cl-ok cl-flexcc">OK</div>
        </div>
        <div style="height: calc(10rem / 36)" />
      </div>
    </drawer>
    <chromeA2hs ref="chromeA2hs" :z-index="zIndex" @emitClose="emitClose" />
    <safariA2hs ref="safariA2hs" :z-index="zIndex" @emitClose="emitClose" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import chromeA2hs from '@/components/components/a2hs/chromeA2hs.vue'
import safariA2hs from '@/components/components/a2hs/safariA2hs.vue'
import {
  getPopupHierarchy,
  popUpWindowDetection,
  removesPopupsBeingDisplayedList
} from '@/assets/js/utils/popupPriority.js'

export default {
  components: {
    chromeA2hs,
    safariA2hs
  },
  data() {
    return {
      pwaVisible: false,
      popType: 'webApp',
      zIndex: getPopupHierarchy({ type: 'webApp' })
    }
  },
  computed: {
    isStandalone() {
      return (
        navigator.standalone ||
        window.matchMedia('(display-mode: standalone)').matches
      )
    },
    STATICURL() {
      return process.env.STATICURL
    }
  },
  beforeMount() {
    // 监听离线与在线
    window.addEventListener('online', this.online, false)
    window.addEventListener('offline', this.offline, false)
  },
  mounted() {
    // 检测是否可以添加至首屏
    if (!this.isStandalone && this.addScreenTime() && !window.APP)
      this.addScreen()
    if (window.navigator && window.navigator.onLine === false) this.offline()
  },
  beforeDestroy() {
    // 移除离线与上线监听
    window.removeEventListener('online', this.online)
    window.removeEventListener('offline', this.offline)
  },
  methods: {
    // 离线操作
    offline() {
      Lib.common.errorReminderUp(this, true, 'You are currently offline', 0)
    },
    // 上线操作
    online() {
      Lib.common.errorReminderUp(
        this,
        true,
        'Currently online, please refresh the page',
        1
      )
    },
    // 取消添加至首屏(代表事件都已经注册了)
    cancel() {
      Lib.store.set('addScreenTime', new Date().getTime())
      window.onbeforeinstallprompt = null
      this.$refs.addButton.onclick = null
      this.pwaVisible = false
      Lib.common.event_statistics('a2hs_cancel')
      this.emitClose()
    },
    // 添加至首屏方法
    addScreen() {
      const ua = navigator.userAgent.toLowerCase()
      const testUa = (regexp) => regexp.test(ua)
      // let engine = 'unknow'
      let supporter = 'unknow'
      if (testUa(/\(i[^;]+;( U;)? CPU.+Mac OS X/g)) {
        supporter = 'safari'
      } else if (testUa(/applewebkit/g)) {
        // engine = 'webkit' // webkit内核
        if (testUa(/edge/g)) {
          supporter = 'edge' // edge浏览器
        } else if (testUa(/opr/g)) {
          supporter = 'opera' // opera浏览器
        } else if (testUa(/chrome/g)) {
          supporter = 'chrome' // chrome浏览器
        } else if (testUa(/safari/g)) {
          supporter = 'safari' // safari浏览器
        }
      } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
        // engine = 'gecko' // gecko内核
        supporter = 'firefox' // firefox浏览器
      } else if (testUa(/presto/g)) {
        // engine = 'presto' // presto内核
        supporter = 'opera' // opera浏览器
      } else if (testUa(/trident|compatible|msie/g)) {
        // engine = 'trident' // trident内核
        supporter = 'iexplore' // iexplore浏览器
      }

      if (supporter === 'safari') {
        // 苹果浏览器
        if (!popUpWindowDetection({ type: this.popType })) return
        setTimeout(() => {
          this.$refs.safariA2hs.visible = true
          Lib.store.set('addScreenTime', new Date().getTime())
          Lib.common.event_statistics('a2hs_safari_guide')
        }, 20000)
      } else if (
        supporter === 'chrome' ||
        supporter === 'edge' ||
        supporter === 'firefox'
      ) {
        // 支持a2sh的浏览器
        window.onbeforeinstallprompt = (e) => {
          // 防止 Chrome 67 及更早版本自动显示安装提示
          e.preventDefault()
          setTimeout(() => {
            if (!popUpWindowDetection({ type: this.popType })) return
            // 打开通知安装弹窗
            this.pwaVisible = true
            // 防止没有获取到dom实例
            setTimeout(() => {
              const addBtn = this.$refs.addButton
              // 给ok按钮注册点击事件
              if (addBtn) {
                addBtn.onclick = () => {
                  Lib.common.event_statistics('a2hs_add')
                  // 点击后修改本地时间
                  Lib.store.set('addScreenTime', new Date().getTime())
                  // 显示安装提示
                  e.prompt()
                  // 等待反馈
                  e.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                      console.log('User accepted the A2HS prompt')
                    } else {
                      console.log('User dismissed the A2HS prompt')
                    }
                  })
                  // 无论同没同意都删除事件
                  window.onbeforeinstallprompt = null
                  addBtn.onclick = null
                  this.pwaVisible = false
                  this.emitClose()
                }
              }
            })
          }, 5000)
        }
      } else {
        // 其浏览器
        setTimeout(() => {
          if (!popUpWindowDetection({ type: this.popType })) return
          this.$refs.chromeA2hs.visible = true
          Lib.store.set('addScreenTime', new Date().getTime())
          Lib.common.event_statistics('a2hs_other_guide')
        }, 20000)
      }
    },
    // 检测本地时间,是否可以提示
    addScreenTime() {
      const time = Lib.store.get('addScreenTime')
      if (time) {
        const todayTime = new Date().getTime()
        if (todayTime - 30 * 24 * 60 * 60 * 1000 >= time) {
          return 1
        } else {
          return 0
        }
      } else {
        return 1
      }
    },
    emitClose() {
      removesPopupsBeingDisplayedList({ type: this.popType })
    }
  }
}
</script>

<style scoped lang="less">
.cl-add-button {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 50px;
  height: 50px;
  background-color: #f2f;
}

.cl-top {
  border-bottom: 0.5rem/36 solid #dcdcdc;

  .cl-title {
    font-size: 18rem/36;
  }
}

.cl-middle {
  padding: 10rem/36 30rem/36;

  .cl-app_icon {
    margin: 0 auto;
    width: 50rem/36;
    height: 50rem/36;

    img {
      width: 50rem/36;
      height: 50rem/36;
    }
  }

  .cl-app_name {
    width: fit-content;
    padding: 10rem/36 10rem/36;
    font-weight: bold;
    margin: 0 auto;
    font-size: 16rem/36;
  }
}

.cl-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 0.5rem/36 solid #dcdcdc;

  .cl-button {
    width: 80rem/36;
    height: 35rem/36;
    border-radius: 5rem/36;
    box-sizing: border-box;
    font-size: 16rem/36;
  }

  .cl-cancel {
    border: 0.5rem/36 solid #4c50fa;
    background-color: #fff;
    margin-left: 20rem/36;
    color: #4c50fa;
  }

  .cl-cancel:active {
    background-color: #f1f1f1;
  }

  .cl-ok {
    background-color: #4c50fa;
    margin-right: 20rem/36;
    color: #fff;
  }

  .cl-ok:active {
    background-color: rgba(76, 80, 250, 0.8);
  }
}
</style>
