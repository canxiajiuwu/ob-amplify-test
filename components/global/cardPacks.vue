<template>
  <div v-if="packsNum" class="cl-cardPacks-wrap" @click.self="closeModal">
    <div class="cl-cardBox">
      <div class="cl-closeIcon" @click="closeModal"></div>
      <div class="cl-title">{{ $t('cardPacks.title') }}</div>
      <div class="cl-art">{{ $t('cardPacks.art') }}</div>
      <div class="cl-bg">
        <div class="cl-numBox">
          <div class="cl-x">×</div>
          <div class="cl-num">{{ packsNum }}</div>
        </div>
      </div>
      <div class="cl-button" @click="openPromotion">
        {{ $t('cardPacks.button') }}
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: '',
  components: {},
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    packsNum() {
      return this.$store.state.packsNum
    },
    xfootball_host() {
      return process.env.xFootball_URL_WEB
    },
    token() {
      if (Lib.store.get('token')) {
        return Lib.common.decrypt(Lib.store.get('token'))
      } else {
        return ''
      }
    },
    accountInfo() {
      return this.$store.state.accountInfo
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {},
  methods: {
    closeModal() {
      this.$store.commit('setPacksNum', 0)
    },
    openPromotion() {
      const url = `${this.xfootball_host}/${this.$store.state.root.country}/${
        this.$store.state.root.locale
      }/rtsb_main?source=ob&inviteId=${
        this.accountInfo ? this.accountInfo.uid : ''
      }&token=${this.token}`
      if (window.appInteraction.type === 1) {
        // web
        window.open(url)
      } else {
        // app
        window.appInteraction.openBrowser(url)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cl-cardPacks-wrap {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  width: 10rem;
  z-index: 100;
  text-align: center;
  color: #000;
  background-color: rgba(0, 0, 0, 0.6);

  .cl-cardBox {
    position: relative;
    width: 279rem/36;
    height: 364rem/36;
    border-radius: 10rem/36;
    background-color: #fff;

    .cl-closeIcon {
      position: absolute;
      top: -50rem/36;
      right: 0;

      .sprite(@giveaway-close,108rem);
    }

    .cl-title {
      font-size: 17rem/36;
      font-weight: bold;
      padding: 18rem/36 0 5rem/36;
    }

    .cl-art {
      font-size: 11rem/36;
      color: rgba(0, 0, 0, 0.8);
    }

    .cl-bg {
      background-image: url('/images/rtsb/card.png');
      background-size: 100%;
      background-repeat: no-repeat;
      width: 558rem/72;
      height: 360rem/72;
      margin: 50rem/36 0 20rem/36;

      .cl-numBox {
        padding: 50rem/36 0 0 180rem/36;
        color: #f41939;
        font-weight: bold;
        display: flex;
        align-items: center;

        .cl-x {
          padding-right: 3rem/36;
          font-size: 30rem/36;
        }
        .cl-num {
          font-size: 40rem/36;
        }
      }
    }

    .cl-button {
      height: 32rem/36;
      width: fit-content;
      background-color: #ffb413;
      border-radius: 16rem/36;
      padding: 0 20rem/36;
      line-height: 32rem/36;
      font-size: 13rem/36;
      font-weight: bold;
      margin: 0 auto;
    }
  }
}
</style>
