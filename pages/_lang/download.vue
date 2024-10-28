<template>
  <div class="cl-appDownloadUpdate-wrap">
    <NuxtLink no-prefetch class="cl-flexcc cl-left" :to="`/${locale}`">
      <div class="cl-back" @click.prevent="goBack" />
    </NuxtLink>
    <div class="cl-bgImgBox">
      <img
        class="cl-appDownloadImg"
        :src="`${STATICURL}/images/lang/${locale}/${country}/download/appDownLoad.jpg`"
        alt="download app"
      />
      <h2 class="cl-h2 cl-install" v-html="$t('appDownload.install')" />
    </div>
    <div class="cl-flexcc cl-download_btn" @click="download">
      {{ $t('appDownload.btn') }}
    </div>
    <div class="cl-androidVer">For Android 4.03 or Higher</div>
    <div style="height: calc(17rem / 36)" />

    <div class="cl-flexcc">
      <div class="cl-borderBottom" />
      <h2 class="cl-h2 cl-title">{{ $t('appDownload.app') }}</h2>
      <div class="cl-borderBottom" />
    </div>

    <div class="cl-flexcc">
      <div class="cl-exclusiveBox">
        <div style="height: calc(27rem / 36)" />
        <div class="cl-flexcb">
          <div
            class="cl-exclusiveItem"
            v-for="(a, b) in $t('appDownload.listOne')"
            :key="b"
          >
            <div :class="`cl-itemIcon no-itemIcon${b}`" />
            <div
              :class="`cl-flexcc cl-itemText ${
                b === 2 && locale === 'fr' ? 'cl-bottom20' : 'cl-bottom7'
              }`"
              v-html="a"
            />
          </div>
        </div>
        <div style="height: calc(47rem / 36)" />
        <div class="cl-exclusiveWidth">
          <div class="cl-flexcb">
            <div
              class="cl-exclusiveItem"
              v-for="(a, b) in $t('appDownload.listTwo')"
              :key="b"
            >
              <div :class="`cl-itemIcon no-itemIcon${b + 2}`" />
              <div class="cl-flexcc cl-itemText cl-bottom7" v-html="a" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    apk() {
      return this.$store.state.apk
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    this.downloadApk()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    },
    // 获取下载地址
    downloadApk() {
      this.$axios_api.downloadApk({ URL: Lib.outUrl.download }).then((res) => {
        this.$store.commit('setApk', res.url)
      })
    },
    // 下载
    download() {
      Lib.common.event_statistics('download_new_click')
      window.location.href = this.apk
    },
    // 获取设备安卓版本号
    get_android_ver() {
      const ua = navigator.userAgent.toLowerCase()
      const verArr = ua.match(/android (.*?);/)
      if (verArr instanceof Array) {
        if (Number(verArr[1].split('.')[0]) > 10) {
          return 'https://onebet-web.s3.eu-central-1.amazonaws.com/apkRelease/oneBet_website_v5.0.0_50000_cmRelease.apk'
        }
      }
      return this.apk
    }
  }
}
</script>

<style scoped lang="less">
.cl-appDownloadUpdate-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 10rem;
  background-color: #4c50fa;
  position: relative;

  .cl-exclusiveBox {
    width: 248rem/36;

    .cl-exclusiveItem {
      position: relative;

      .cl-itemIcon {
        margin: 0 auto;
      }

      .no-itemIcon0 {
        .sprite(@icon-app-down-load-fast-light, 90rem);
      }

      .no-itemIcon1 {
        .sprite(@icon-app-down-load-simple-secure, 90rem);
      }

      .no-itemIcon2 {
        .sprite(@icon-app-down-load-save-bundles, 90rem);
      }

      .no-itemIcon3 {
        .sprite(@icon-app-down-load-casino, 90rem);
      }

      .no-itemIcon4 {
        .sprite(@icon-app-down-load-virtual, 90rem);
      }

      .cl-itemText {
        position: absolute;
        left: 0;
        right: 0;
        white-space: nowrap;
        font-weight: 400;
        color: #fff;
        opacity: 0.9;
        font-size: 11rem/36;
        text-align: center;
      }

      .cl-bottom20 {
        bottom: -20rem/36;
      }

      .cl-bottom7 {
        bottom: -7rem/36;
      }
    }

    .cl-exclusiveWidth {
      margin: 0 auto;
      width: 156rem/36;
    }
  }

  .cl-back {
    position: absolute;
    z-index: 1;
    top: 34rem/108;
    left: 34rem/108;
    .sprite(@icon-back-download-activity-topic, 108rem);
  }

  .cl-bgImgBox {
    position: relative;

    .cl-appDownloadImg {
      width: 100%;
    }

    .cl-install {
      position: absolute;
      bottom: 20rem/36;
      left: 0;
      right: 0;
      font-size: 11rem/36;
      font-weight: 400;
      color: #f7ffff;
      font-style: italic;
      text-align: center;
    }
  }

  .cl-download_btn {
    position: relative;
    top: -10rem/36;
    width: 333rem/36;
    height: 43rem/36;
    background: linear-gradient(180deg, #ffe53c, #fc7406);
    border-radius: 22rem/36;
    font-weight: 800;
    font-size: 17rem/36;
    font-style: italic;
    color: #fff;
    text-shadow: 0 2rem/36 5rem/36 rgba(0, 0, 0, 0.2);
    text-transform: capitalize;
  }

  .cl-download_btn:active {
    opacity: 0.8;
  }

  .cl-androidVer {
    position: relative;
    top: -3rem/36;
    font-size: 9rem/36;
    font-weight: 400;
    font-style: italic;
    color: #67b7f5;
  }

  .cl-borderBottom {
    width: 96rem/36;
    border-bottom: 1rem/36 solid #76fbff;
  }

  .cl-title {
    font-size: 13rem/36;
    font-weight: 800;
    color: #76fbff;
    margin: 0 6rem/36;
  }
}
</style>
