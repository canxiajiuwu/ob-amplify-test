<template>
  <div ref="wrap" class="cl-index-wrap">
    <!-- 滚动置顶容器 -->
    <div ref="index">
      <commonHeader where="home" />
      <rowTabs />
      <!-- 充值功能弹窗 -->
      <accountDepositCom />
      <banner :is-show-fast-games="isShowFastGames" />
      <div style="height: calc(135rem / 36)">
        <fastGames v-if="isShowFastGames" />
        <featureMatch v-else @iserr="isShowFastGames = 1" />
      </div>
      <preMatchContainer />
      <language />
      <ownFooter />
      <winAdModal
        v-if="isWinModalShow"
        :win-popup-data="winPopupData"
        :img-url="imgUrl"
        @closeWinAdModal="isWinModalShow = false"
      />

      <div v-if="bannerItem && bannerIsShow" class="cl-bannerIcon">
        <img :src="bannerItem.image" @click="itemClick(bannerItem)" />
      </div>

      <div v-show="isTopIconShow" class="cl-topIcon" @click="clickToTop" />

      <joinSuccessful />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import Header from '@/components/components/Header.vue'
import rowTabs from '@/components/components/rowTabs.vue'
import banner from '@/components/components/banner.vue'
import ownFooter from '@/components/components/Footer.vue'
import language from '@/components/components/language.vue'
import preMatchContainer from '@/components/components/preMatchContainer.vue'
import joinSuccessful from '@/components/components/account/joinSuccessful'
import accountDepositCom from '@/components/components/account/accountDepositCom'
import { casinoMixins } from '@/assets/js/casinoMixins'
import { popUpWindowDetection } from '@/assets/js/utils/popupPriority.js'
const winAdModal = () => import('@/components/components/winAdModal.vue')
const featureMatch = () =>
  import('@/components/components/preMatchFeatureMatch.vue')
const fastGames = () =>
  import('@/components/components/fastGames/fastGames.vue')

export default {
  name: 'Hall',
  components: {
    commonHeader: Header,
    rowTabs,
    banner,
    ownFooter,
    preMatchContainer,
    language,
    featureMatch,
    winAdModal,
    fastGames,
    joinSuccessful,
    accountDepositCom
  },
  mixins: [casinoMixins],
  inject: ['openGame'],
  data() {
    return {
      isShowFastGames: 0,
      winPopupData: null,
      isWinModalShow: false,
      isTopIconShow: false,
      listData: [], // 浮窗banner原始数据(未处理)
      bannerIsShow: 0 // banner加载完成后显示
    }
  },
  computed: {
    statusArrData() {
      return [
        1,
        !this.accountInfo,
        !!this.accountInfo,
        !this.accountInfo || !this.accountInfo.first_deposit_activity,
        this.accountInfo ? !this.accountInfo.isComplete : 0,
        this.accountInfo && this.accountInfo.skip_user,
        () => !Lib.common.getMajorEventsIsMore(this)
      ]
    },
    statusArr() {
      return (user_status) => {
        return this.statusArrData[user_status] instanceof Function
          ? this.statusArrData[user_status]()
          : this.statusArrData[user_status]
      }
    },
    // 处理后需要显示的banner
    bannerItem() {
      this.isShowFastGames = !Lib.common.getMajorEventsIsMore(this)
      const bannerObj = this.listData.find((item) =>
        this.statusArr(item.user_status)
      )
      if (bannerObj)
        Lib.common.loadImage(bannerObj.image, () => (this.bannerIsShow = 1))
      else this.bannerIsShow = 0
      return bannerObj
    },
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    xfootball_host() {
      return process.env.xFootball_URL_WEB
    },
    timeStamp() {
      return Lib.store.get('giftModalTimeStamp')
    },
    todayDate() {
      return new Date().getDate()
    },
    todayTime() {
      return new Date().getTime()
    },
    langList() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .langList
    },
    imgUrl() {
      return (
        this.STATICURL +
        '/images/lang/' +
        this.$store.state.root.locale +
        '/' +
        this.$store.state.root.country +
        '/modal/win.png'
      )
    },
    scrollDeBounce() {
      return Lib.common.deBounce(this.handleScroll, 3000)
    },
    // setFingonTranlalaTime() {
    //   return (
    //     this.accountInfo &&
    //     this.accountInfo.reg_time * 1000 + 6 * 24 * 60 * 60 * 1000 >
    //       this.todayTime
    //   )
    // },
    // 2022 世界杯活动新增
    // hostname() {
    //   return this.$store.state.root.country === 'ug'
    //     ? process.env.hostname
    //     : process.env.hostnamecm
    // },
    savingCardCasino() {
      const obj = Lib.store.get('setSavingCardCasino')
      return obj || null
    },
    winApp() {
      return typeof window === 'undefined' ? {} : window.appInteraction
    }
  },
  mounted() {
    // 在大厅会多次调用，关闭app启动页面
    if (this.winApp.type && this.winApp.type !== 1) {
      setTimeout(() => this.winApp.closeStartDialog(), 2000)
    }
    // 隐藏skeleton
    Lib.common.hideSkeleton()

    // 获取省钱卡消息
    if (
      !(
        this.savingCardCasino &&
        this.savingCardCasino.date === new Date().getDate()
      )
    ) {
      this.reqSaveCardInfo()
    }
    // 获取浮窗banner数据
    this.getData()

    // 获取用户信息
    if (Lib.store.get('token')) {
      // 用户进入首页，打开中奖订单弹出
      this.winPopup()
    }

    // 滚动监听
    window.addEventListener('scroll', this.scrollDeBounce, true)
  },
  methods: {
    betPrizesFun() {
      const mulitImg = [
        `${this.STATICURL}/images/betPrizes/modal/word.png`,
        `${this.STATICURL}/images/betPrizes/modal/phone.png`,
        `${this.STATICURL}/images/betPrizes/modal/rotateLight.png`,
        `${this.STATICURL}/images/betPrizes/modal/ring.png`
      ]
      const promiseAll = []
      const img = []
      const imgTotal = mulitImg.length
      for (let i = 0; i < imgTotal; i++) {
        promiseAll[i] = new Promise((resolve, reject) => {
          img[i] = new Image()
          img[i].src = mulitImg[i]
          img[i].onload = function () {
            // 第i张加载完成
            resolve(img[i])
          }
        })
      }
      Promise.all(promiseAll).then((img) => {
        // 全部加载完成
        if (Lib.store.get('betPrizesTimeStamp') !== this.todayDate) {
          this.isPromotionsShow = true
          Lib.store.set('betPrizesTimeStamp', this.todayDate)
        }
      })
    },
    winPopup() {
      this.$axios_api.winPopup({ token: this.token }).then((res) => {
        if (
          res.code === 0 &&
          popUpWindowDetection({ type: 'winningNotification' })
        ) {
          this.winPopupData = res.data
          Lib.common.loadImage(this.imgUrl, () => {
            this.isWinModalShow = true
          })
        }
      })
    },
    goOrange() {
      Lib.common.event_statistics('home_orange_modal_Click')
      this.$router.push({
        path: `/${this.$store.state.root.locale}/orangeExclusive`
      })
    },
    // 点击滚动至顶部
    clickToTop() {
      this.$refs.index.scrollIntoView({ behavior: 'smooth' })
    },
    // 滚动监听
    handleScroll() {
      const dom = document.querySelector('.cl-matchItemFirst')
      if (dom) this.isTopIconShow = this.isElementNotInViewport(dom)
    },
    // 判断节点是否滚动卷曲隐藏
    isElementNotInViewport(el) {
      const rect = el.getBoundingClientRect()
      return rect.bottom <= 0
    },
    // 前往 influencerChannelActivities (网红渠道活动)
    // goFingonTralala() {
    //   this.$router.push({
    //     path: `/${this.$store.state.root.locale}/influencerChannelActivities`
    //   })
    // },
    // banner点击事件
    itemClick(item) {
      if (item.eventName) Lib.common.event_statistics(item.eventName)
      return Lib.common.openWay(item.open, this)(item)
    },
    // 获取浮窗banner数据
    getData() {
      const locale = this.$store.state.root.locale
      const dataSTR = 'homeAllBannerData' + (locale === 'fr' ? 'Fr' : '')
      const data = Lib.store.get(dataSTR)
      if (
        Object.prototype.toString.call(data) === '[object Object]' &&
        Array.isArray(data.home_float)
      ) {
        this.listData = data.home_float
      } else {
        // 获取数据
        setTimeout(() => {
          this.$axios_api.getBackstageBanner({ type: 1 }).then((res) => {
            if (res.code === 0) {
              Lib.store.set(dataSTR, res.data)
              this.listData = res.data.home_float
              Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
            }
          })
        }, 1500)
      }
    },
    // 请求省钱卡信息
    reqSaveCardInfo() {
      this.$axios_api
        .saveCardInfo({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.cardInfo = res.data.casino
            // this.$store.commit('setSavingCardCasino', res.data.casino)
            Lib.store.set('setSavingCardCasino', {
              date: new Date().getDate(),
              casino: res.data.casino
            })
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-topIcon {
  position: fixed;
  bottom: 3.5rem;
  left: 0.5rem;
  z-index: 3;
  .sprite(@icon-back-to-top, 124rem);
}

.cl-index-wrap {
  background-color: #fff;
}

.cl-freebet {
  position: fixed;
  right: 10rem/36;
  bottom: 120rem/36;
  width: 224rem/108;
  height: 192rem/108;
  background-size: 100% 100%;
  background-image: url('~/assets/images/general/notSprites/promotions/freebet.png');
}

.cl-christmas_float {
  position: fixed;
  right: 10rem/36;
  bottom: 120rem/36;
  width: 185rem/108;
  height: 256rem/108;
  background-size: 100% 100%;

  &.cl-float_en {
    background-image: url('/images/lang/en/common/christmas/float.png');
  }

  &.cl-float_fr {
    background-image: url('/images/lang/en/common/christmas/float.png');
  }

  .cl-reddot {
    position: absolute;
    top: 8rem/36;
    left: 10rem/36;
    width: 8rem/36;
    height: 8rem/36;
    background-color: red;
    border-radius: 50%;
  }
}

.cl-floatModal {
  position: fixed;
  right: 10rem/36;
  bottom: 80rem/36;
  width: 133rem/72;
  height: 154rem/72;

  img {
    width: 133rem/72;
    height: 154rem/72;
  }
}

.cl-sportsPromosModal {
  position: fixed;
  right: 10rem/36;
  bottom: 120rem/36;
  width: 188rem/108;
  height: 188rem/108;

  img {
    width: 188rem/108;
    height: 188rem/108;
  }
}

.cl-FingonTralala {
  position: fixed;
  right: 10rem/36;
  bottom: 120rem/36;
  width: 188rem/108;
  height: 188rem/108;

  img {
    width: 188rem/108;
    height: 188rem/108;
  }
}

.cl-worldCupIcon {
  position: fixed;
  right: 10rem/36;
  bottom: 120rem/36;
  width: 188rem/108;
  height: 188rem/108;

  img {
    width: 188rem/108;
    height: 188rem/108;
  }
}

.cl-bannerIcon {
  position: fixed;
  right: 10rem/36;
  bottom: 120rem/36;
  width: 188rem/108;
  z-index: 3;
  img {
    width: 188rem/108;
  }
}

.cl-rtsbModal {
  position: fixed;
  right: 10rem/36;
  bottom: 80rem/36;
  width: 128rem/90;
  height: 128rem/90;

  .cl-close {
    position: absolute;
    right: 0;
    top: -30rem/36;

    .sprite(@icon-betslip-banner-delete, 72rem);
  }

  img {
    width: 128rem/90;
    height: 128rem/90;
  }
}

.cl-euroModal-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  width: 10rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 15rem/36;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;

  .cl-modalContent {
    width: 600rem/72;
    height: 636rem/72;
    margin-top: -50rem/36;
    position: relative;

    .cl-close {
      position: absolute;
      right: 0;
      top: -40rem/36;

      .sprite(@icon-x, 108rem);
    }

    .cl-bg {
      position: relative;
    }

    img {
      width: 619rem/72;
      height: 596rem/72;
    }
  }
}

.cl-orangeModal {
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  width: 10rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 15rem/36;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;

  .cl-orangeContent {
    width: 598rem/72;
    height: 636rem/72;
    background-image: url('/images/lang/en/common/orange/modal.jpg');
    background-size: cover;
    margin-top: -50rem/36;
    position: relative;

    &.cl-orangeContentFr {
      background-image: url('/images/lang/fr/common/orange/modal.jpg');
    }

    .cl-close {
      position: absolute;
      right: 0;
      top: -40rem/36;

      .sprite(@icon-x, 108rem);
    }
  }
}

.cl-floatOrange {
  position: fixed;
  right: 10rem/36;
  bottom: 3.5rem;
  width: 218rem/108;
  height: 180rem/108;

  img {
    width: 218rem/108;
    height: 180rem/108;
  }
}
</style>
