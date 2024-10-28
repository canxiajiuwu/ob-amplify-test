<template>
  <div class="cl-platformUpgrade-wrap">
    <div class="cl-noticeBox">
      <div class="cl-upgradeNoticeIcon" />
      <div style="height: calc(15rem / 36)" />
      <h2 class="cl-h2 cl-noticeTitle">
        {{ config.title ? config.title : $t('announcement.title') }}
      </h2>
      <div style="height: calc(10rem / 36)" />
      <h3 class="cl-h3 cl-noticeContent" v-html="config.tips" />
      <div style="height: calc(10rem / 36)" />
      <div class="cl-footer">
        <div>
          <span>{{ $t('announcement.recoveryWord') }}:</span>
          <span class="cl-time">{{
            config.time ? timeStampDeal(config.time) : '--'
          }}</span>
        </div>
        <div>{{ $t('announcement.wait') }}...</div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  name: 'PlatformUpgrade',
  data() {
    return {
      // config内容, title: 通知标题, time:预计恢复时间, tips:通知内容
      config: {}
    }
  },
  beforeMount() {
    // 获取平台维护通知
    this.platformMaintenance()
    // 注册监听页面切换事件
    document.addEventListener('visibilitychange', this.dataUpFn, false)
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  beforeDestroy() {
    // 销毁监听页面切换
    document.removeEventListener('visibilitychange', this.dataUpFn, false)
  },
  methods: {
    // 时间格式化处理
    timeStampDeal(time) {
      return Lib.common.getDate(new Date(time * 1000), 'dd/MM/yyyy HH:mm:ss')
    },
    // 获取平台维护通知
    platformMaintenance() {
      const country = this.$store.state.root.country
      const locale = this.$store.state.root.locale
      this.$axios_api
        .downloadApk({
          URL:
            process.env.gamesConfigUrl +
            `platform_tips_${country}.json?v=${new Date().getTime()}`
        })
        .then((res) => {
          console.log(res)
          // 数据符合
          if (res && typeof res === 'object') {
            // 有维护信息
            if (res.status) {
              this.config = {
                title: res.title[locale],
                tips: res.upgradeTips[locale],
                time: res.endTime
              }
            } else {
              Lib.store.remove('maintenanceNotificationTime')
              this.$router.replace({ path: '/' + locale })
            }
          }
        })
    },
    // 监听页面切换方法
    dataUpFn() {
      // 页面可见后
      if (document.visibilityState === 'visible') this.platformMaintenance()
    }
  }
}
</script>

<style scoped lang="less">
.cl-platformUpgrade-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;
  .cl-noticeBox {
    box-sizing: border-box;
    padding: 27/36rem 21/36rem 20/36rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .cl-upgradeNoticeIcon {
      .sprite(@icon-upgrade-notice, 108rem);
    }

    .cl-noticeTitle {
      font-size: 18/36rem;
      font-weight: bold;
      color: #000;
    }

    .cl-noticeContent {
      font-size: 12/36rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 18/36rem;
    }

    .cl-footer {
      width: 100%;
      font-size: 14/36rem;
      font-weight: 400;
      color: #000;
      line-height: 18/36rem;

      .cl-time {
        color: #4c50fa;
      }
    }
  }
}
</style>
