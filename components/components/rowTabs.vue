<template>
  <div>
    <div class="cl-rowTabs-wrap" @touchmove.stop @mousewheel.stop>
      <div class="cl-box">
        <div class="cl-left cl-cont">
          <div class="cl-item-wrap">
            <div
              v-for="(a, b) in list[0].slice(0, 6)"
              :key="b"
              class="cl-flexcc cl-cont-item"
              @click="itemClick(a)"
            >
              <template v-if="a">
                <div
                  v-if="
                    accountInfo && freebetNum && a.event_name === 'home_freebet'
                  "
                  class="cl-flexcc cl-freebetNum"
                >
                  {{ freebetNum }}
                </div>
                <div
                  :class="[
                    classNameCom(a),
                    a.class_name === 'virtual'
                      ? locale === 'fr'
                        ? 'cl-virtual_fr'
                        : 'cl-virtual_en'
                      : ''
                  ]"
                />
                <!-- <img class="cl-icon" :src="a.img" :alt="a.name" /> -->
                <div
                  class="cl-icon"
                  :class="changeEventName(a.event_name)"
                  v-bgImg="a.img"
                ></div>
                <div class="cl-flexcc cl-name">{{ a.name }}</div>
              </template>
              <template v-else>
                <div class="cl-iconSkeleton" />
                <div class="cl-nameSkeleton" />
              </template>
            </div>
          </div>
          <CollapseTransition>
            <div v-show="open">
              <div
                v-for="(item, index) in list"
                :key="index"
                class="cl-item-wrap"
              >
                <template v-for="(a, b) in item">
                  <div
                    v-if="!(index === 0 && b <= 5)"
                    :key="b"
                    class="cl-flexcc cl-cont-item"
                    @click="itemClick(a)"
                  >
                    <template v-if="a">
                      <div
                        v-if="
                          accountInfo &&
                          freebetNum &&
                          a.event_name === 'home_freebet'
                        "
                        class="cl-flexcc cl-freebetNum"
                      >
                        {{ freebetNum }}
                      </div>
                      <div
                        :class="[
                          classNameCom(a),
                          a.class_name === 'virtual'
                            ? locale === 'fr'
                              ? 'virtual_fr'
                              : 'virtual_en'
                            : ''
                        ]"
                      />
                      <!-- <img
                        class="cl-icon"
                        v-lazy="a.img"
                        :alt="a.name"
                      /> -->
                      <div
                        class="cl-icon"
                        :class="changeEventName(a.event_name)"
                        v-bgImg="a.img"
                      ></div>
                      <div class="cl-flexcc cl-name">{{ a.name }}</div>
                    </template>
                    <template v-else>
                      <div class="cl-iconSkeleton" />
                      <div class="cl-nameSkeleton" />
                    </template>
                  </div>
                </template>
                <div class="cl-border-line" />
              </div>
            </div>
          </CollapseTransition>
        </div>
        <div class="cl-flexcc cl-right" :class="open ? '' : 'cl-closeRight'">
          <div
            :class="!open ? 'cl-open' : 'cl-close'"
            @click="clickBox(!open)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="open"
      class="cl-mask-layer"
      @click="clickBox(false)"
      @touchmove.stop
      @mousewheel.stop
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  components: { CollapseTransition: Lib.common.CollapseTransition },
  inject: ['openGame'],
  props: ['isShowFastGames'],
  data() {
    return {
      freebetNum: null, // freebet数量
      listData: [], // 原始数据(未处理)
      open: 0,
      // 骨架屏显示数组
      skeletonList: [
        new Array(12).fill(''),
        new Array(12).fill(''),
        new Array(6).fill('')
      ],
      hasFilterArr: ['OneBet Crash', 'Onebet League', 'KickersX', 'Casino'] // 重大赛事不小于五场后需要后置的数据
    }
  },
  computed: {
    sportName() {
      return this.$route.params.sportName
    },
    list() {
      if (this.listData.length) {
        let firstArr = this.listData.filter(
          (a) =>
            a.classify === 0 &&
            !(
              ['lang', 'index'].includes(this.$route.name) &&
              a.event_name === 'home_highlights'
            )
        )
        if (this.isShowFastGames || !Lib.common.getMajorEventsIsMore(this)) {
          const starArr = firstArr.filter(
            (a) => !this.hasFilterArr.includes(a.name)
          )
          const endArr = firstArr.filter((a) =>
            this.hasFilterArr.includes(a.name)
          )
          firstArr = [...starArr, ...endArr]
        }
        const arr = [
          firstArr,
          this.listData.filter((a) => a.classify === 1),
          this.listData.filter((a) => a.classify === 2)
        ]

        return arr
      }
      // 加载骨架
      else return this.skeletonList
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    this.getData()
    if (this.token) this.freeBetValid()
    // 预加载界面
    this.$prefetchRoutes([
      'freebet',
      'hottestTickets',
      'sportPromos',
      'jackpotEntrance'
    ])
  },
  methods: {
    // 匹配事件名
    changeEventName(str) {
      return str
        .replace(/_/g, '-')
        .replace(/[A-Z]/g, (match) => {
          return '-' + match.toLowerCase()
        })
        .replace(/--/g, '-')
    },
    // 点击遮罩层或者tabs打开图标
    clickBox(flag) {
      Lib.common.event_statistics('home_rowTabs_open')
      this.open = flag
    },
    // 获取freeBet数量
    freeBetValid() {
      this.$axios_api.freeBetValid({ token: this.token }).then((res) => {
        if (res.code === 0) {
          this.freebetNum = res.data.number
          this.$store.commit('setFreebetList', res.data.list)
        } else this.freebetNum = 0
      })
    },
    // tabs 点击事件
    itemClick(item) {
      if (!item) return
      if (item.event_name) Lib.common.event_statistics(item.event_name)
      // 提前拦截检查
      const eventFn = {
        home_loadCode: () => Lib.common.errorReminder(this, '', 'B', '', '')
      }
      if (eventFn[item.event_name]) return eventFn[item.event_name]()
      // 默认
      return Lib.common.openWay(item.open_way, this)(item)
    },
    // 获取数据
    getData: Lib.common.throttle(function () {
      const locale = this.locale // 获取语言
      const dataSTR = 'homeTabsData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
      let askFlag = 0 // 记录是否更新
      // 查询本地时间, true更新
      if (Lib.common.getBackstageDataIsRefresh(dataSTR, 'inquire')) askFlag = 1
      const data = Lib.store.get(dataSTR) // 获取本地数据
      // 查询本地数据是否完整
      // 完整,优先使用本地数据
      if (Array.isArray(data) && data.length) {
        if (!this.listData.length) this.listData = data
      }
      // 数据被破坏
      else askFlag = 1
      // 可以请求
      if (askFlag) {
        // 1.5秒后请求,不占主业务请求
        setTimeout(() => {
          // 获取数据
          this.$axios_api.getHomeTabs({}).then((res) => {
            // 成功
            if (res.code === 0 && Array.isArray(res.data)) {
              // 存入本地, 修改本地时间, 更新数据
              Lib.store.set(dataSTR, res.data)
              Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
              this.listData = res.data
            }
          })
        }, 1000)
      }
    }, 500),
    // 类名控制
    classNameCom(a) {
      if (a.event_name === 'home_crash_game') {
        const nowhour = new Date().getHours()
        const trueArr = [
          nowhour >= 0 && nowhour <= 2,
          nowhour >= 13 && nowhour <= 15,
          nowhour >= 18 && nowhour <= 20
        ]
        if (trueArr.includes(true)) return a.class_name
        else return 'cashout'
      }
      return a.class_name
    }
  }
}
</script>

<style scoped lang="less">
@set: {
  home-app-download: @tabs-home-app-download;
  home-basketball: @tabs-home-basketball;
  home-coins-center: @tabs-home-coins-center;
  home-crash-game: @tabs-home-crash-game;
  home-cricket: @tabs-home-cricket;
  home-freebet: @tabs-home-freebet;
  home-get-cash: @tabs-home-get-cash;
  home-highlights: @tabs-home-highlights;
  home-hottest-tickets: @tabs-home-hottest-tickets;
  home-jackpot: @tabs-home-jackpot;
  home-kickers-x: @tabs-home-kickers-x;
  home-load-code: @tabs-home-load-code;
  home-nova6: @tabs-home-nova6;
  home-onebet-league: @tabs-home-onebet-league;
  home-partner: @tabs-home-partner;
  home-popular: @tabs-home-popular;
  home-promotion: @tabs-home-promotion;
  home-rugby: @tabs-home-rugby;
  home-soccer: @tabs-home-soccer;
  home-sports-promos: @tabs-home-sports-promos;
  home-tabs-casino: @tabs-home-tabs-casino;
  home-tennis: @tabs-home-tennis;
  home-usa-football: @tabs-home-usa-football;
  home-volleyball: @tabs-home-volleyball;
};

each(@set, {
  .@{key} {
    .sprite(@value, 128rem);
  }
});
.cl-iconSkeleton {
  width: 28.16/36rem;
  height: 28.16/36rem;
  margin-bottom: 15/36rem;
  border-radius: 5/36rem;
  animation: skeletonColor 2s infinite;
}

.cl-nameSkeleton {
  height: 10rem/36;
  position: absolute;
  width: 40rem/36;
  bottom: 5rem/36;
  animation: skeletonColor 2s infinite;
}

@keyframes skeletonColor {
  0% {
    background-color: #f2f2f4;
  }

  50% {
    background-color: #e9e9eb;
  }

  100% {
    background-color: #f2f2f4;
  }
}

.cl-rowTabs-wrap {
  width: 10rem;
  touch-action: none;
  background-color: @mainThemeColor;
  position: relative;
  z-index: 9;

  .cl-box {
    display: flex;
    overflow: hidden;
  }

  .cl-left {
    flex: 1;

    .cl-item-wrap {
      display: flex;
      flex-wrap: wrap;

      .cl-border-line {
        height: 0.5rem/36;
        background-color: #fff;
        width: 100%;
        margin-bottom: 0.2rem;
        margin-top: 0.2rem;
        margin-left: 0.3rem;
      }
    }

    .cl-item-wrap:last-child {
      .cl-border-line {
        display: none;
      }
    }
  }

  .cl-right {
    width: 31rem/36;
    height: 56rem/36;
    flex-direction: column;
    position: relative;
  }

  .cl-closeRight::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: -10rem/36;
    height: 56rem/36;
    width: 10rem/36;
    background: linear-gradient(-90deg, #393cdd 0%, rgba(76, 80, 250, 0) 100%);
  }

  .cl-open {
    margin-bottom: 12rem/36;
    .sprite(@ticon-open, 108rem);
  }

  .cl-close {
    margin-bottom: 12rem/36;
    .sprite(@tabs-close, 108rem);
  }

  .cl-cont {
    .cl-freebetNum {
      position: absolute;
      right: 12rem/36;
      top: 5rem/36;
      background-color: #e52f10;
      border-radius: 50%;
      color: #fff;
      font-size: 8rem/36;
      width: 11rem/36;
      height: 11rem/36;
    }

    .cl-hot {
      position: absolute;
      right: 8rem/36;
      top: 2rem/36;
      .sprite(@tabs-hot, 108rem);
    }

    .cl-free {
      position: absolute;
      right: 8rem/36;
      top: 2rem/36;
      .sprite(@league-free, 108rem);
    }

    .cl-cont-item {
      width: 54.5rem/36;
      height: 56rem/36;
      flex-direction: column;
      position: relative;

      .cl-name {
        color: #fff;
        // font-weight: bold;
        transform-origin: center;
        transform: scale(8/12);
        text-align: center;
        white-space: normal;
        line-height: 12rem/36;
        height: 20rem/36;
        position: absolute;
        width: 65rem/36;
        bottom: 2rem/36;
      }
    }

    .cl-icon {
      width: 28.13rem/36;
      height: 28.13rem/36;
      margin-bottom: 15rem/36;
    }

    .new {
      position: absolute;
      right: 8rem/36;
      top: 2rem/36;
      .sprite(@tabs-new, 108rem);
    }

    .cashout {
      position: absolute;
      left: 28rem/36;
      top: 2rem/36;
      .sprite(@tabs-cashout, 108rem);
    }

    .sponsored {
      position: absolute;
      left: 25rem/36;
      top: 2rem/36;
      .sprite(@tabs-sponsored, 108rem);
    }

    .cl-virtual_fr {
      position: absolute;
      left: 28rem/36;
      top: 2rem/36;
      .sprite(@tabs-virtual-fr, 108rem);
    }

    .cl-virtual_en {
      position: absolute;
      left: 28rem/36;
      top: 2rem/36;
      .sprite(@tabs-virtual-en, 108rem);
    }

    .virtualIcon {
      animation-fill-mode: both;
      animation: bounceIn 3s linear infinite;
    }

    .giftIcon {
      position: absolute;
      left: 28rem/36;
      top: 2rem/36;
      .sprite(@tabs-gifts, 108rem);
      animation: shakeIcon 4000ms ease-in-out infinite;
    }

    @keyframes shakeIcon {
      0%,
      5%,
      10% {
        transform: skewY(3deg);
      }
      2.5%,
      7.5% {
        transform: skewY(-3deg);
      }
      12.5%,
      100% {
        transform: skewY(0);
      }
    }

    @keyframes bounceIn {
      from,
      5%,
      10%,
      15%,
      20%,
      to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      }

      0% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
      }

      5% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
      }

      10% {
        -webkit-transform: scale3d(0.9, 0.9, 0.9);
        transform: scale3d(0.9, 0.9, 0.9);
      }

      15% {
        opacity: 1;
        -webkit-transform: scale3d(1.03, 1.03, 1.03);
        transform: scale3d(1.03, 1.03, 1.03);
      }

      20% {
        -webkit-transform: scale3d(0.97, 0.97, 0.97);
        transform: scale3d(0.97, 0.97, 0.97);
      }

      to {
        opacity: 1;
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
      }
    }
  }
}

.cl-mask-layer {
  width: 10rem;
  height: 100vh;
  position: fixed;
  top: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 8;
}
</style>
