<template>
  <div class="cl-countrySelectModal-wrap cl-flexcc">
    <div class="cl-modalBox">
      <div
        class="cl-item cl-flexcb"
        v-for="(item, index) in countryList"
        :key="index"
        @click="changeCountry(item)"
      >
        <div class="cl-left cl-flexcc">
          <div class="cl-icon">
            <img
              :src="STATICURL + '/images/lang/common/country/' + item.logo"
              alt="flag"
            />
          </div>
          <div class="cl-name">{{ $t(`countryInfo.${item.country}`) }}</div>
        </div>

        <div
          class="cl-right"
          :class="{ 'cl-checked': item.country === $store.state.root.country }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  data() {
    return {
      countryList: [
        {
          logo: 'ug-logo.png',
          country: 'ug'
        },
        {
          logo: 'cm-logo.png',
          country: 'cm'
        }
      ]
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    hostname() {
      return process.env.hostname
    },
    hostnamecm() {
      return process.env.hostnamecm
    },
    isApp() {
      return typeof window !== 'undefined' ? window.appInteraction.type : 1
    },
    url_country() {
      const path = window.location.href
      return path.includes('-cm') || path.includes('.cm') ? 'cm' : 'ug'
    }
  },
  mounted() {
    Lib.store.set('isSelectCountry', true)
  },
  methods: {
    // 切换国家
    changeCountry(item) {
      // 切换国家
      this.$store.state.root.country = item.country
      // 跳转方案
      if (this.url_country === 'cm') {
        if (item.country === 'cm') {
          // IP other; url cm; select cm
          this.closeModal()
        } else {
          // IP other; url cm; select ug
          //            window.location.href = this.hostname;
          this.jumpFun(this.hostname)
        }
      } else if (item.country === 'cm') {
        // IP other; url ug; select cm
        //            window.location.href = this.hostnamecm + '/' + this.$store.state.root.locale;
        this.jumpFun(this.hostnamecm + '/' + this.$store.state.root.locale)
      } else {
        // IP other; url ug; select ug
        this.closeModal()
      }
    },
    closeModal() {
      this.$emit('closeCountryModal')
    },
    // 跳转设置
    jumpFun(url) {
      if (this.isApp === 1) {
        // web
        window.location.href = url
      } else {
        // app
        window.appInteraction.openBrowser(url)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-countrySelectModal-wrap {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  z-index: 100;
  margin: 0 auto;

  .cl-modalBox {
    width: 220rem/36;
    height: 80rem/36;
    border-radius: 3rem/36;
    background-color: white;
    box-sizing: border-box;
    padding: 0 10rem/36;

    .cl-item {
      height: 40rem/36;

      .cl-left {
        img {
          width: 27rem/36;
          margin-right: 10rem/36;
        }

        .cl-name {
          color: #333333;
          font-weight: bold;
          font-size: 10rem/36;
        }
      }

      .cl-right {
        &.cl-checked {
          .sprite(@icon-blue-check,80rem);
        }
      }
    }

    .cl-item:first-child {
      border-bottom: 1px solid #c1cbd5;
    }
  }
}
</style>
