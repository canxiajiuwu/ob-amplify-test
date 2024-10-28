<template>
  <div class="cl-progress">
    <div
      class="cl-backIcon"
      :style="{ top: `calc(10rem/36 + ${safeAreaTop}px)` }"
      @click="goBack"
    >
      <img
        src="@/assets/images/general/notSprites/progress/back.png"
        alt="back"
      />
    </div>
    <div class="cl-progressBg" v-if="progressData">
      <img v-sharp data-format="webp" :src="progressData.bg_img" />
    </div>
    <div class="cl-progressBg" v-else-if="isFootballGame">
      <img
        :src="
          `${STATICURL}/images/lang/common/gamesHall/` + isFootballGame.loading
        "
        alt="onebet | pregress bg"
      />
    </div>

    <div class="cl-contentBox" v-if="progressData">
      <div class="cl-progressBox" v-if="isChooseType">
        <div class="cl-progressLine">
          <img
            key="progress"
            :src="progressData.progress_img"
            :style="{ transform: 'translateX(-' + (100 - progress) + '%)' }"
            alt="progress_img"
          />
        </div>
        <div
          class="cl-progressWord"
          :style="{ color: `#${progressData.progress_color}` }"
        >
          {{ `${$t('progress.loading')} [${progress}%]` }}
        </div>
      </div>

      <div class="cl-buttonBox" v-else>
        <div class="cl-cash" @click="chooseType(false)">
          <img key="play" :src="progressData.play_img" alt="play_img" />
        </div>
        <div class="cl-demo" @click="chooseType(true)">
          <img
            :src="progressData.free_img"
            alt="free_img"
            v-if="!isGameOpened"
          />
          <div
            key="demo"
            class="cl-demoWord"
            :style="{ color: `#${progressData.free_color}` }"
            v-else
          >
            {{ $t('progress.free') }}
          </div>
        </div>
      </div>
    </div>
    <div class="cl-contentBox1" v-else>
      <div
        class="cl-progressWord"
        :class="{ 'cl-footballWord': isFootballGame }"
      >
        {{ `${$t('progress.loading')} [${progress}%]` }}
      </div>

      <div class="cl-buttonBox" v-if="!isChooseType">
        <div class="cl-cash cl-flexcc" @click="chooseType(false)">
          {{ $t('progress.play') }}
        </div>
        <div class="cl-demo cl-flexcc" @click="chooseType(true)">
          {{ $t('progress.free') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: ['isFootballGame'],
  data() {
    return {
      isChooseType: false, // 是否选择了游戏类型 demo or cash
      progressInterval: '', // 循环变量
      isGameOpened: false // 该游戏以否已打开过
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    info() {
      return this.$store.state.info
    },
    progress() {
      return this.$store.state.progress
    },
    gameOnload() {
      return this.$store.state.gameOnload
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    APP() {
      return window.APP || null
    },
    gameName() {
      return this.$store.state.gameName
    },
    moreGames() {
      return this.$store.state.gamesConfig
    },
    progressData() {
      let data = ''
      this.moreGames.forEach((item) => {
        const gameName = item.name.replace(/\s+/g, '')
        if (this.gameName === gameName) {
          item.loading && item.loading[this.$store.state.root.locale]
            ? (data = item.loading[this.$store.state.root.locale])
            : (data = '')
        }
      })
      return data
    },
    openedGameList() {
      return Lib.store.get('openedGameList')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    routeName() {
      return this.$route.path
    }
  },
  watch: {
    gameOnload(newData) {
      if (newData) {
        this.$store.commit('setGameOnload', false)
        this.$store.commit('setProgress', 0)

        this.$emit('closeLoading')
      }
    }
  },
  mounted() {
    // 判断该游戏是否打开过
    if (this.openedGameList) {
      if (this.openedGameList.includes(this.gameName)) {
        this.isGameOpened = true
      } else {
        this.openedGameList.push(this.gameName)
        Lib.store.set('openedGameList', this.openedGameList)
      }
    } else {
      Lib.store.set('openedGameList', [this.gameName])
    }

    // 是否是ug专属足球游戏
    if (this.isFootballGame) this.isChooseType = true
  },
  beforeDestroy() {
    this.$store.commit('setGameName', '')
    this.progressInterval && clearInterval(this.progressInterval)
  },
  methods: {
    chooseType(bool) {
      // 如果真钱场，判断是否一登录
      if (!bool) {
        if (!this.token) {
          // 由于打开casino时，会创建一个多余路由
          this.goBack()
          Lib.common.errorReminder(
            this,
            '',
            '',
            '',
            this.$t('reminder.unLogin'),
            '',
            this.$t('reminder.button.ok'),
            null,
            () => {
              const pushObj = {
                path: `/${this.$store.state.root.locale}/login`,
                query: { fromName: this.routeName }
              }
              const loginAfterOpenGame =
                sessionStorage.getItem('loginAfterOpenGame')
              if (loginAfterOpenGame)
                pushObj.query.loginAfterOpenGame = loginAfterOpenGame
              this.$router.replace(pushObj)
            }
          )
          return
        }
      }
      this.isChooseType = true
      this.progressInterval = setInterval(() => {
        if (this.progress >= 50) {
          this.progressInterval && clearInterval(this.progressInterval)
          // app 端
          const childWindow =
            window.document.getElementById('gameIframe').contentWindow
          childWindow.JSSetGuest(bool)
        }
      }, 500)
    },
    // 关闭加载页
    goBack() {
      window.document.getElementById('gameEvent').click()
    }
  }
}
</script>

<style scoped lang="less">
.cl-progress {
  background-color: #fff;
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  z-index: 20;
  margin: 0 auto;

  .cl-backIcon {
    position: absolute;
    left: 10rem/36;

    img {
      width: 31rem/36;
      height: 31rem/36;
    }
  }

  .cl-progressBg {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .cl-contentBox {
    margin-top: 70vh;
  }

  .cl-contentBox1 {
    padding-top: 8rem;
    color: #72a7ff;
    text-align: center;

    .cl-progressWord {
      margin-bottom: 50rem/36;

      &.cl-footballWord {
        color: #fff;
      }
    }

    .cl-buttonBox {
      > div {
        padding: 0;
        margin: 10rem/36 auto;
        width: 396rem/72;
        height: 98rem/72;
        font-size: 14rem/36;
        font-weight: bold;
      }

      .cl-cash {
        padding: 0;
        border-radius: 4rem/36;
        background-color: #72a7ff;
        color: #fff;
      }

      .cl-demo {
        padding: 0;
        box-sizing: border-box;
        border-radius: 4rem/36;
        border: 1rem/36 solid #72a7ff;
      }
    }
  }

  .cl-progressBox {
    overflow: hidden;
    text-align: center;
    font-weight: 500;
    font-size: 12rem/36;
    margin-bottom: 20rem/36;

    .cl-progressLine {
      overflow: hidden;
      width: 300rem/36;
      height: 14rem/36;
      background-color: rgba(0, 0, 0, 0.9);
      border: 1px solid #292929;
      border-radius: 2rem/36;
      margin: 15rem/36 auto 10rem/36;

      img {
        width: 300rem/36;
        height: 14rem/36;
      }
    }
  }

  .cl-buttonBox > div {
    padding: 10rem/36 20rem/36;
    margin: 0 auto;
    width: 396rem/72;
    height: 98rem/72;

    img {
      width: 396rem/72;
      height: 98rem/72;
    }

    &.cl-cash {
      padding-top: 20rem/36;
    }

    .cl-demoWord {
      text-align: center;
      text-decoration: underline;
    }
  }

  .cl-loading {
    width: 150px;
    height: 15px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .loading span {
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    background: #72a7ff;
    -webkit-transform-origin: right bottom;
    -webkit-animation: load 1s ease infinite;
  }
  .loading span:last-child {
    margin-right: 0px;
  }
  @-webkit-keyframes load {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
    }
    100% {
      opacity: 0;
      -webkit-transform: rotate(90deg) scale(0.3);
    }
  }
  .loading span:nth-child(1) {
    -webkit-animation-delay: 0.13s;
  }
  .loading span:nth-child(2) {
    -webkit-animation-delay: 0.26s;
  }
  .loading span:nth-child(3) {
    -webkit-animation-delay: 0.39s;
  }
  .loading span:nth-child(4) {
    -webkit-animation-delay: 0.52s;
  }
  .loading span:nth-child(5) {
    -webkit-animation-delay: 0.65s;
  }
}
</style>
