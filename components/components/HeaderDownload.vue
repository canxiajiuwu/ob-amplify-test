<template>
  <div v-if="isDownloadShow" class="cl-headerDownload-wrap">
    <div class="cl-close" @click="closeDownload">
      <div class="cl-closeIcon" />
    </div>

    <div class="cl-right">
      <div class="cl-left">
        <div class="cl-content">
          <h3 class="cl-h3 cl-title">{{ $t('headerDownload.title') }}</h3>
          <h4 class="cl-h4 cl-art">{{ $t('headerDownload.art') }}</h4>
        </div>
      </div>

      <nuxt-link :to="`/${locale}/download`">
        <div class="cl-download" @click.prevent="download">
          <h3 class="cl-h3 cl-word" v-html="$t('headerDownload.button')" />
          <div class="cl-icon">
            <img src="/images/menu/download-2022.gif" alt="download app" />
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  computed: {
    isDownloadShow() {
      return this.$store.state.isDownloadShow
    },
    timeStamp() {
      return Lib.store.get('downloadTimeStamp')
    },
    todayDate() {
      return new Date().getDate()
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    // 获取登陆信息
    if (window.APP) this.$store.commit('setIsDownloadShow', false)
    else if (this.timeStamp) {
      if (this.timeStamp !== this.todayDate) {
        this.$store.commit('setIsDownloadShow', true)
      } else this.$store.commit('setIsDownloadShow', false)
    }
  },
  methods: {
    // 关闭download
    closeDownload() {
      Lib.store.set('downloadTimeStamp', this.todayDate)
      this.$store.commit('setIsDownloadShow', false)
    },
    // 下载
    download() {
      Lib.common.event_statistics('home_app_download')
      this.$router.push({ path: `/${this.$store.state.root.locale}/download` })
    }
  }
}
</script>

<style scoped lang="less">
.cl-headerDownload-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 10rem;
  height: 37rem/36;
  background-color: #fcdb06;

  .cl-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42rem/36;

    .cl-closeIcon {
      .sprite(@ticon-black-close, 108rem);
    }
  }

  .cl-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 318rem/36;

    .cl-content {
      .cl-title {
        font-weight: bold;
        font-size: 12rem/36;
        color: #333;
      }

      .cl-art {
        color: rgba(0, 0, 0, 0.4);
        font-size: 9rem/36;
      }
    }

    .cl-download {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10rem/36;
      height: 24rem/36;
      padding: 0 7rem/36 0 10rem/36;
      background-color: #e52f10;
      border-radius: 6rem/36;
      box-sizing: border-box;
      font-size: 10rem/36;
      font-weight: bold;
      color: #fff;

      .cl-icon {
        margin-left: 5rem/36;
        height: 15rem/36;
        img {
          width: 15rem/36;
          height: 15rem/36;
        }
      }
    }
  }
}
</style>
