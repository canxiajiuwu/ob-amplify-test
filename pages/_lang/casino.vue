<template>
  <div class="cl-casino-wrap">
    <div class="cl-topBox">
      <headBack :left-flag="false" bgcolor="#393a45">
        <template #left>
          <div class="cl-flexcc cl-left" @click="goBack">
            <div class="cl-icon" />
            <div class="cl-flexcc cl-back">{{ $t('accountBack.back') }}</div>
          </div>
        </template>
      </headBack>
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div class="cl-moreGames-box">
      <div class="cl-savingCardBox">
        <!-- 未登录/未开卡 -->
        <div class="cl-savingCard" v-if="!cardInfo.is_open" @click="goWhere">
          <h2 class="cl-h2 cl-title">{{ $t('saveMoneyCasino.title') }}</h2>
          <div class="cl-word">
            {{ $t('saveMoneyCasino.notStartTitle') }}
            <span>1232 XAF</span>
          </div>

          <div class="cl-button cl-flexcc">
            {{ $t('saveMoneyCasino.card8') }}
          </div>
        </div>
        <!-- 已开通卡&今日未领劵 -->
        <div
          class="cl-savingCard"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.r_num > 0 &&
            cardInfo.cur_expire >= date &&
            cardInfo.daily_num > 0
          "
          @click="goWhere"
        >
          <div class="cl-title cl-title1">
            {{ $t('saveMoneyCasino.title') }}
            <span
              >| {{ $t('saveMoneyCasino.top4') }}
              {{ getDate(cardInfo.cur_expire, 'dd/MM/yyyy') }}</span
            >
          </div>
          <div class="cl-word" v-html="$t('saveMoneyCasino.v2art1')"></div>
          <div class="cl-button cl-flexcc">
            {{ $t('saveMoneyCasino.card9') }}
          </div>
        </div>
        <!-- 已开通卡&今日已领劵&卷还未用完 -->
        <div
          class="cl-savingCard"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.r_num > 0 &&
            cardInfo.cur_expire >= date &&
            cardInfo.recieve_not_use_money > 0
          "
          @click="goWhere"
        >
          <div class="cl-title cl-title1">
            {{ $t('saveMoneyCasino.title') }}
            <span
              >| {{ $t('saveMoneyCasino.top4') }}
              {{ getDate(cardInfo.cur_expire, 'dd/MM/yyyy') }}</span
            >
          </div>

          <div
            class="cl-word"
            v-html="
              $t('saveMoneyCasino.v2art2', {
                x: cardInfo.recieve_not_use_money
              })
            "
          ></div>

          <div class="cl-voice cl-flexcs">
            <div class="cl-icon"></div>
            <div class="cl-art">{{ $t('saveMoneyCasino.notice') }}</div>
          </div>
        </div>
        <!-- 已过期 -->
        <div
          class="cl-savingCard cl-savingExpired"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.cur_expire < date &&
            cardInfo.cur_expire !== 0
          "
          @click="goWhere"
        >
          <div class="cl-title cl-title1">
            {{ $t('saveMoneyCasino.title') }}
            <span
              >| {{ $t('saveMoneyCasino.top5') }}
              {{ getDate(cardInfo.cur_expire, 'dd/MM/yyyy') }}</span
            >
          </div>

          <div
            class="cl-word"
            v-html="$t('saveMoneyCasino.v2art4', { x: cardInfo.saving_money })"
          ></div>

          <div class="cl-button cl-flexcc">
            {{ $t('saveMoneyCasino.renewal2') }}
          </div>
        </div>
        <!-- 开卡未过期，没有劵，未续期 -->
        <div
          class="cl-savingCard"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.r_num === 0 &&
            cardInfo.cur_expire > date &&
            cardInfo.next_start < date
          "
          @click="goWhere"
        >
          <div class="cl-title cl-title1">
            {{ $t('saveMoneyCasino.title') }}
            <span
              >| {{ $t('saveMoneyCasino.top4') }}
              {{ getDate(cardInfo.cur_expire, 'dd/MM/yyyy') }}</span
            >
          </div>
          <div
            class="cl-word"
            v-html="$t('saveMoneyCasino.v2art4', { x: cardInfo.saving_money })"
          ></div>
          <div class="cl-button cl-flexcc">
            {{ $t('saveMoneyCasino.renewal2') }}
          </div>
        </div>
      </div>
      <div class="cl-flexcb cl-container">
        <div
          class="cl-gameItem"
          v-for="(item, index) in gamesConfigBefore"
          :key="'before' + index"
          @click="goOpenGame(item)"
        >
          <img
            v-lazy="item.hotGamesIcon"
            data-format="webp"
            data-size="680x200"
            class="cl-itemImg"
            alt="casino"
          />
          <div class="cl-flexcc cl-scale" v-if="item.type === 0">HOT</div>
          <div class="cl-flexcs cl-person">
            <div class="cl-flexcc cl-personIcon">
              <div class="cl-online" />
            </div>
            <div class="cl-number">
              {{ onlineNumber(item.gameId, item.describe) }}
            </div>
          </div>
          <!-- <div class="cl-gameName">{{item.name}}</div> -->
        </div>

        <!-- <div class="cl-onegameBanner" @click="openOnegame">
            <img :src="STATICURL+ '/static/images/lang/'+ $store.state.root.locale + '/' + $store.state.root.country + '/casino/slogan1.jpg'" alt="casino banner" />
          </div>-->

        <div
          class="cl-gameItem"
          v-for="(item, index) in gamesConfigAfter"
          :key="'after' + index"
          @click="goOpenGame(item)"
        >
          <img
            v-lazy="item.hotGamesIcon"
            data-format="webp"
            data-size="680x200"
            class="cl-itemImg"
            alt="casino"
          />
          <div class="cl-flexcc cl-scale" v-if="item.type === 0">HOT</div>
          <div class="cl-flexcs cl-person">
            <div class="cl-flexcc cl-personIcon">
              <div class="cl-online"></div>
            </div>
            <div class="cl-number">
              {{ onlineNumber(item.gameId, item.describe) }}
            </div>
          </div>
          <!-- <div class="cl-gameName">{{item.name}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import { casinoMixins } from '@/assets/js/casinoMixins'

export default {
  name: 'Casino',
  components: { headBack },
  mixins: [casinoMixins],
  inject: ['openGame'],
  data() {
    return {
      cardInfo: {},
      date: new Date().getTime() / 1000
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    isGuest() {
      return this.$store.state.isGuest
    },
    isApp() {
      return typeof window !== 'undefined' ? window.appInteraction.type : 1
    },
    gamesConfigBefore() {
      return this.$store.state.gamesConfig.slice(0, 6)
    },
    gamesConfigAfter() {
      return this.$store.state.gamesConfig.slice(6)
    },
    // gamesConfigUrl游戏配置路径
    gamesConfigUrl() {
      return process.env.gamesConfigUrl
    },
    onlineList() {
      return this.$store.state.onlineList
    },
    info() {
      return this.$store.state.info
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  beforeMount() {
    // 游戏数据请求
    this.gamesConfigRequest()
    // 请求casino省钱卡信息
    this.reqSaveCardInfo()
    if (this.token) this.getInfo()
    // 在线人数
    if (this.onlineList) this.getOnline()
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()

    // 监听关闭游戏事件
    window.addEventListener('gameClose', () => {
      // 请求casino省钱卡信息
      this.reqSaveCardInfo()
    })
  },
  methods: {
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
    },
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
        }
      })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 前往省钱卡活动
    goWhere() {
      this.$router.push({
        path: `/${this.$store.state.root.locale}/SaveMoneyCasino`,
        query: {
          isBack: 1
        }
      })
    },
    goBack() {
      Lib.common.activityBack(this)
    },
    // 游戏数据请求
    gamesConfigRequest() {
      this.$axios_api
        .downloadApk({
          URL: `${this.gamesConfigUrl}game_cm.json?v=${new Date().getTime()}`
        })
        .then((res) => {
          if (res.data) {
            this.$store.commit('setGamesConfig', res.data)
          }
        })
    },
    changeDemo(bool) {
      this.$store.commit('setGuest', bool)
    },
    openOnegame() {
      Lib.common.event_statistics('casino_open_onegame')
      // this.req_xf_Card()
      if (this.isApp === 1) {
        // web
        window.open(Lib.outUrl.onegameUrl)
      } else {
        // app
        window.appInteraction.openBrowser(Lib.outUrl.onegameUrl)
      }
    },
    goOpenGame(item) {
      const gameName = item.name.replace(/\s+/g, '_')
      Lib.common.event_statistics(`casino_${gameName}`)
      Lib.common.openGameConfig(this, item.gameId, this.isGuest, item.role)
      this.openGame()
    },
    onlineNumber(gameId, describe) {
      for (let i = 0; i < this.onlineList.length; i++) {
        if (gameId == this.onlineList[i].game) {
          if (describe) {
            return this.onlineList[i].number + 56
          } else {
            return this.onlineList[i].number
          }
        }
      }

      return 105
    },
    // 在线人数
    getOnline() {
      this.$axios_api
        .online({ token: this.token })
        .then((res) => {
          if (res.code === 0) {
            this.$store.commit('setOnline', res.data.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 集卡活动-请求是否是每日第一次分享
    req_xf_Card() {
      this.$axios_api.xfcard_onegame({ token: this.token }).then((res) => {
        if (res.code === 0) {
          this.$store.commit('setPacksNum', res.data.number)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
img[lazy='loading'] {
  /*your style here*/
  opacity: 0;
}
img[lazy='error'] {
  /*your style here*/
  opacity: 0;
}

.cl-casino-wrap {
  min-height: 100vh;
  background-color: #393a45;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 3;
    .cl-left {
      margin-left: -2rem/36;
      color: #fff;
      font-size: 17rem/36;
      .cl-icon {
        margin-right: 8rem/36;
        background-size: 100% 100%;
        .sprite(@icon-back-white,300rem);
      }
    }
  }

  .cl-banner {
    margin: 0 auto;
    width: 340rem/36;
    height: 66.67rem/36;

    img {
      width: 340rem/36;
      height: 66.67rem/36;
    }
  }

  .cl-person {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    height: 26rem/36;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.33) 100%
    );
    border-bottom-left-radius: 5rem/36;
    border-top-right-radius: 5rem/36;
    color: #fff;

    .cl-personIcon {
      margin: 0 3rem/36 0 10rem/36;
      .cl-online {
        .sprite(@icon-online-number, 108rem);
      }
    }

    .cl-number {
      font-size: 9rem/36;
      transform-origin: center;
    }
  }

  .cl-scale {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    padding-left: 3rem/36;
    box-sizing: border-box;
    height: 20rem/36;
    width: 40rem/36;
    background-color: #ff2d4d;
    color: #fff;
    border-bottom-left-radius: 10rem/36;
    border-top-left-radius: 10rem/36;
    border-top-right-radius: 6rem/36;
    font-size: 11rem/36;
    font-weight: bold;
  }

  .cl-moreGames-box {
    padding: 10rem/36 10rem/36 1rem;

    .cl-container {
      flex-wrap: wrap;

      .cl-onegameBanner {
        padding: 10rem/36 0;
        width: 340rem/36;
        height: 148.27rem/72;

        img {
          width: 340rem/36;
          height: 148.27rem/72;
        }
      }

      .cl-gameItem {
        width: 340rem/36;
        height: 100rem/36;
        border-radius: 6rem/36;
        overflow: hidden;
        margin-bottom: 10rem/36;
        position: relative;

        > img {
          width: 340rem/36;
          height: 100rem/36;
          border-radius: 6rem/36;
        }

        // .cl-gameName {
        //   text-align: left;
        //   color: rgba(255, 255, 255, 0.8);
        // }
      }
    }

    .cl-savingCard {
      font-size: 11rem/36;
      margin-bottom: 10rem/36;
      min-height: 103rem/36;
      overflow: hidden;
      background-image: url('~/static/images/saveMoneyCasino/savingCard.png');
      background-size: 100% 100%;
      text-align: center;

      &.cl-savingExpired {
        background-image: url('~/static/images/saveMoneyCasino/savingExpired.png');

        .cl-title {
          color: white;
        }
      }

      .cl-title {
        font-weight: bold;
        color: #804211;
        line-height: 26rem/36;
        padding: 0 0.28rem;

        &.cl-title1 {
          text-align: left;

          span {
            font-weight: 400;
            font-size: 0.28rem;
          }
        }
      }

      .cl-word {
        padding: 15rem/36 10rem/36 10rem/36;
        color: #333;

        /deep/ span {
          color: #f53137 !important;
        }
      }

      .cl-button {
        width: 145rem/36;
        height: 30rem/36;
        background: #d8d8d8 linear-gradient(270deg, #4c3b2f 0%, #181210 100%);
        border-radius: 20rem/36;
        color: #f3dea4;
        font-weight: bold;
        margin: 0 auto 9rem/36;
      }

      .cl-voice {
        width: 305rem/36;
        height: 25rem/36;
        border-radius: 13rem/36;
        background-color: #ffe2e2;
        margin: 2rem/36 auto 9rem/36;

        .cl-icon {
          width: 14rem/36;
          height: 14rem/36;
          background-image: url('~/static/images/saveMoneyCasino/voice.png');
          background-size: cover;
          margin: 0 7rem/36 0 10rem/36;
        }

        .cl-art {
          color: #ff5555;
          font-size: 11rem/36;
        }
      }
    }
  }
}
</style>
