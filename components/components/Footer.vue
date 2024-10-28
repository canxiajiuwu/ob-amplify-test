<template>
  <div class="cl-Footer-wrap">
    <div class="cl-Footer-top cl-flexcb">
      <h2 class="cl-h2 cl-Footer-top-item" @click="goWhere(0)">
        {{ $t('footer.tc') }}
      </h2>
      <div class="cl-line"></div>
      <h2 class="cl-h2 cl-Footer-top-item" @click="goWhere(1)">
        {{ $t('footer.play') }}
      </h2>
      <div class="cl-line"></div>
      <h2 class="cl-h2 cl-Footer-top-item" @click="goWhere(2)">
        {{ $t('footer.about') }}
      </h2>
      <div class="cl-line"></div>
      <h2 class="cl-h2 cl-Footer-top-item" @click="goWhere(3)">
        {{ $t('footer.contact') }}
      </h2>
    </div>

    <div class="cl-Footer-middle">
      <div class="cl-Footer-middle-title">{{ $t('footer.service') }}</div>
      <div class="cl-Footer-middle-art">{{ $t('footer.dedicatedly') }}</div>

      <div class="cl-Footer-middle-iconBox cl-flexca">
        <!--<div class="cl-Footer-middle-item">-->
        <!--<div class="cl-Footer-middle-item-icon cl-Footer-middle-item-icon1">-->

        <!--</div>-->
        <!--<p>{{$t('footer.call')}}</p>-->
        <!--<p>{{$t('phoneNumber')}}</p>-->
        <!--</div>-->

        <div class="cl-Footer-middle-item" @click="goContact">
          <div class="cl-Footer-middle-item-icon cl-Footer-middle-item-icon2"></div>
          <h2 class="cl-h2" style="font-weight: bold">
            {{ $t('footer.online') }}
          </h2>
          <p class="cl-iconWord">7/24</p>
        </div>

        <div class="cl-Footer-middle-item">
          <div class="cl-Footer-middle-item-icon cl-Footer-middle-item-icon3"></div>
          <h2 class="cl-h2" style="font-weight: bold">{{ $t('footer.call') }}</h2>
          <p class="cl-iconWord">{{ $t('mail') }}</p>
        </div>
      </div>
    </div>

    <div class="cl-countrySelect cl-flexcc" @click="changeCountry">
      <div class="cl-countryIcon">
        <img
          v-lazy="`${STATICURL}/images/lang/common/country/${country}-logo.png`"
          alt="logo"
        />
      </div>
      <div class="cl-countryName">
        {{ $t(`countryInfo.${$store.state.root.country}`) }}
      </div>
      <div class="cl-change">{{ $t('countryInfo.change') }}</div>
    </div>

    <div class="cl-Footer-footer" v-html="$t('footer.reminder')"></div>

    <div class="cl-footerIconBox cl-flexcc">
      <a
        :href="twitter"
        target="_blank"
        aria-label="onebet twitter official platform"
      >
        <div class="cl-icon cl-twitter" @click.prevent="openPage(0)"></div>
      </a>
      <a
        :href="facebook"
        target="_blank"
        aria-label="onebet facebook official platform"
      >
        <div class="cl-icon cl-facebook" @click.prevent="openPage(1)"></div>
      </a>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: '',
  inject: ['openCountryModalFun'],
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    isApp() {
      return typeof window !== 'undefined' ? window.appInteraction.type : 1
    },
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    twitter() {
      return 'https://twitter.com/OnebetC'
    },
    facebook() {
      return this.country === 'ug'
        ? 'https://www.facebook.com/onebetug/'
        : 'https://www.facebook.com/OneBet_CM-100285865161879'
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  methods: {
    goWhere(index) {
      switch (index) {
        // T&C
        case 0:
          this.$router.push({ path: `/${this.locale}/terms` })
          break
        // how to play
        case 1:
          this.$router.push({
            path: `/${this.locale}/howToPlay`
          })
          break
        // about
        case 2:
          this.$router.push({
            path: `/${this.locale}/aboutUs`
          })
          break
        // contact us
        case 3:
          this.$router.push({
            path: `/${this.locale}/privacy`
          })
          break
        default:
          this.$router.push({ path: `/${this.locale}/terms` })
          break
      }
    },
    // app打开浏览器
    openPage(index) {
      if (this.isApp === 1) {
        switch (index) {
          case 0:
            window.open(this.twitter, '_blank')
            break
          case 1:
            window.open(this.facebook, '_blank')
            break
        }
      } else {
        switch (index) {
          case 0:
            window.appInteraction.openBrowser(this.twitter)
            break
          case 1:
            window.appInteraction.openBrowser(this.facebook)
            break
        }
      }
    },
    // 第三方客服
    goContact() {
      //        try {
      //          if(document.querySelector("#ze-snippet")){
      //            zE('webWidget', 'open');
      //          }else {
      Lib.common.initiateCall(this)
      //            Lib.common.loadScript("https://static.zdassets.com/ekr/snippet.js?key=5cc3263e-57bc-4cf7-9e51-4f1c996d5f81",Lib.common.serverInit,that.info);
      //          }
      //        }catch (err){
      //          console.log(err)
      //        }
    },
    // 打开国家
    changeCountry() {
      this.openCountryModalFun()
    }
  }
}
</script>

<style scoped lang="less">
.cl-Footer-wrap {
  background-color: #1c2029;
  color: #e4e4e4;
  width: 10rem;
  text-align: center;
  box-sizing: border-box;
  font-size: 10rem/36;
  padding: 0 13rem/36;

  .cl-Footer-top {
    height: 30rem/36;

    .cl-line {
      height: 10rem/36;
      border-right: 1rem/36 solid #b2b2b2;
    }
  }

  .cl-Footer-middle {
    padding: 0 13rem/36;

    .cl-Footer-middle-title {
      font-weight: bold;
      text-align: center;
      font-size: 11rem/36;
      padding: 18rem/36 0 12rem/36;
    }

    .cl-Footer-middle-art {
      color: rgba(228, 228, 228, 0.6);
    }

    .cl-Footer-middle-iconBox {
      text-align: center;
      padding: 24rem/36 0;

      .cl-Footer-middle-item {
        flex: 1;
      }

      .cl-Footer-middle-item-icon {
        height: 25rem/36;
      }

      .cl-Footer-middle-item-icon1 {
        margin-left: 45rem/36;
        .sprite(@icon-call,108rem);
      }

      .cl-Footer-middle-item-icon2 {
        margin-left: 65rem/36;
        .sprite(@icon-live,108rem);
      }

      .cl-Footer-middle-item-icon3 {
        margin-left: 65rem/36;
        .sprite(@icon-mail,108rem);
      }
    }
  }

  .cl-countrySelect {
    padding: 16rem/36 0 6rem/36;

    .cl-countryIcon {
      img {
        width: 27rem/36;
      }
    }

    .cl-countryName {
      font-weight: bold;
      padding: 0 14rem/36 0 10rem/36;
    }

    .cl-change {
      color: #658afe;
      font-size: 9rem/36;
      text-decoration: underline;
      text-transform: capitalize;
    }
  }

  .cl-Footer-footer {
    color: rgba(228, 228, 228, 0.6);
    padding: 18rem/36 0 0;
  }

  .cl-footerIconBox {
    padding: 30rem/36 5rem/36 200rem/36;

    .cl-icon {
      width: 55rem/36;
      height: 55rem/36;
      background-size: 100% 100%;
    }

    .cl-twitter {
      .sprite(@icon-twitter,80rem);
    }

    .cl-facebook {
      margin-left: 60rem/36;
      .sprite(@icon-facebook,80rem);
    }
  }
}
</style>
