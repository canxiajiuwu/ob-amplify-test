<template>
  <div class="cl-announcement-wrap">
    <div v-if="visible" class="cl-noticeBox" :style="getDynamicStyle">
      <div class="cl-topBox">
        <div class="cl-leftBox">
          <div class="cl-upgradeNoticeIcon" />
          <div class="cl-noticeTitle">
            {{ config.title ? config.title : $t('announcement.title') }}
          </div>
        </div>
        <div class="cl-closeIcon" @click="visible = 0" />
      </div>
      <div class="cl-noticeContent" v-html="config.tips" />
      <div class="cl-footer">
        <div>
          <span>{{ $t('announcement.maintenanceWord') }}:</span>
          <span class="cl-time">{{
            config.time
              ? timeStampDeal(config.time, 'dd/MM/yyyy HH:mm:ss')
              : '--'
          }}</span>
        </div>
        <div>
          <span>{{ $t('announcement.countdownWord') }}:</span>
          <span class="cl-time">{{
            config.time ? timefn(config.time - newTime) : '--'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import {
  getPopupHierarchy,
  popUpWindowDetection,
  removesPopupsBeingDisplayedList
} from '@/assets/js/utils/popupPriority.js'

export default {
  name: 'Announcement',
  data() {
    return {
      // 开关
      visible: 0,
      // config内容, title: 通知标题, tips:通知内容, time: 开始时间
      config: {},
      newTime: new Date().getTime() / 1000, // 现在时间
      timer: null, // 定时器id容器
      popType: 'systemMaintenance'
    }
  },
  computed: {
    getDynamicStyle() {
      return {
        'z-index': getPopupHierarchy({ type: this.popType })
      }
    }
  },
  mounted() {
    const pathname = window.location.pathname
    const routeName = pathname.split('/')[2]
    // 获取平台维护通知
    if (routeName !== 'platformUpgrade') this.platformMaintenance()
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    // 时间格式化处理
    timeStampDeal(time) {
      return Lib.common.getDate(new Date(time * 1000), 'dd/MM/yyyy HH:mm:ss')
    },
    // 时间处理
    timefn(time) {
      if (time < 0) return '--'
      time = Math.floor(time)
      let s = time % 60
      const am = (time - s) / 60
      let m = am % 60
      let h = (am - m) / 60
      if (s < 10) s = '0' + s
      if (m < 10) m = '0' + m
      if (h < 10) h = '0' + h
      return `${h}:${m}:${s}`
    },
    // 获取平台维护通知
    platformMaintenance() {
      const path = window.location.origin
      let country = 'ug'
      if (path.includes('-cm') || path.includes('.cm')) country = 'cm'
      this.$axios_api
        .downloadApk({
          URL:
            process.env.gamesConfigUrl +
            `platform_tips_${country}.json?v=${new Date().getTime()}`
        })
        .then((res) => {
          // 数据符合
          if (res && typeof res === 'object') {
            // 有维护信息
            if (res.status) {
              // 清除上次定时器,开始新的, 时间单位秒
              this.timer && clearInterval(this.timer)
              this.timer = setInterval(() => {
                this.newTime = new Date().getTime() / 1000
                if (this.newTime > res.startTime) this.goToPlatformUpgrade()
              }, 1000)
              const locale = this.$store.state.root.locale
              // 已经开始维护
              if (this.newTime >= res.startTime) {
                Lib.store.remove('maintenanceNotificationTime')
                this.goToPlatformUpgrade()
              }
              // 维护提前通知
              else {
                // 获取本地时间,符合要求则通知
                const time = Lib.store.get('maintenanceNotificationTime')
                if (!time || time <= this.newTime) {
                  // 新存入一小时
                  Lib.store.set(
                    'maintenanceNotificationTime',
                    this.newTime + 60 * 60
                  )
                  this.config = {
                    title: res.title[locale],
                    tips: res.beforeTips[locale],
                    time: res.startTime
                  }
                  // 打开通知
                  popUpWindowDetection({ type: this.popType }) &&
                    (this.visible = 1)
                }
              }
            } else Lib.store.remove('maintenanceNotificationTime')
          }
        })
    },
    goToPlatformUpgrade() {
      this.timer && clearInterval(this.timer)
      this.visible = 0
      removesPopupsBeingDisplayedList({ type: this.popType })
      this.$router.replace({
        path: `${this.$store.state.root.locale}/platformUpgrade`
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-announcement-wrap {
  .cl-noticeBox {
    position: fixed;
    top: 0;
    background-color: #fff;
    width: 10rem;
    box-sizing: border-box;
    padding: 13/36rem 10/36rem 20/36rem;
    box-shadow: 0 3/36rem 7/36rem 0 rgba(156, 156, 156, 0.5);
    animation: easeIn 1s;

    .cl-topBox {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .cl-leftBox {
        display: flex;
        align-items: center;

        .cl-upgradeNoticeIcon {
          margin-right: 7rem/36;
          .sprite(@icon-upgrade-notice, 370rem);
        }

        .cl-noticeTitle {
          font-size: 11/36rem;
          font-weight: bold;
          color: #000;
        }
      }

      .cl-closeIcon {
        .sprite(@icon-close-grey, 108rem);
      }
    }

    .cl-noticeContent {
      padding-left: 37/36rem;
      font-size: 12/36rem;
      font-weight: 400;
      line-height: 18/36rem;
      color: rgba(0, 0, 0, 0.6);
    }

    .cl-footer {
      padding-left: 37/36rem;
      font-size: 14/36rem;
      font-weight: 400;
      color: #000;
      line-height: 18/36rem;

      .cl-time {
        color: #4c50fa;
      }
    }
  }

  @keyframes easeIn {
    0% {
      transform: translateY(-100%);
    }

    100% {
      transform: translateY(0);
    }
  }
}
</style>
import { computed } from 'vue'
