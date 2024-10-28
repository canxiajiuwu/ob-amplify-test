<template>
  <div class="cl-homeMenu-wrap">
    <div :style="{ height: safeAreaTop + 'px' }" />
    <div class="cl-flexcc cl-top">
      <div class="cl-topWidth">
        <div style="height: calc(15rem / 36)" />
        <div class="cl-flexcb cl-first">
          <div
            class="cl-homeIcon"
            @click="goWhere({ url: { path: '/' + locale } })"
          />
          <div class="cl-closeIcon" @click="visibleMenu" />
        </div>

        <div style="height: calc(15rem / 36)" />
        <div class="cl-flexcb cl-second">
          <div v-if="langList.length > 0" style="position: relative">
            <div
              class="cl-flexcc cl-languageBox"
              :class="isLangShow ? 'cl-borderTop' : 'cl-border'"
              @click="isLangShow = !isLangShow"
            >
              <div class="cl-languageWord">
                {{ langList[LangSelectIndex].name }}
              </div>
              <div
                class="cl-downIcon"
                :class="isLangShow ? 'cl-iconRotate' : 'cl-iconReset'"
              />
            </div>
            <CollapseTransition>
              <div v-show="isLangShow" class="cl-langList">
                <div
                  v-for="(item, index) in langList"
                  :key="index"
                  class="cl-flexcc cl-langListItem"
                  @click="selectLang(index, item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </CollapseTransition>
          </div>
          <div class="cl-flexcc cl-searchBox">
            <div class="cl-searchIcon" @click="goSearch" />
            <input
              id="search"
              v-model.trim="searchText"
              type="text"
              :placeholder="$t('homeMenu.search')"
              @keyup.enter="goSearch"
            />
          </div>
        </div>

        <div style="height: calc(18rem / 36)" />
        <div class="cl-third">
          <div class="cl-flexcb cl-thirdList">
            <div
              v-for="(item, index) in thirdList"
              :key="index"
              class="cl-thirdItem"
              @click="item.fun ? item.fun() : goWhere(item)"
            >
              <div :class="`cl-icon ${item.name}`">
                <div
                  v-if="index === 1 && checkInInfo && !checkInInfo.today"
                  class="cl-noChecked"
                />
              </div>
              <div class="cl-itemName">{{ $t(`homeMenu.${item.name}`) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="height: calc(10rem / 36)" />
    <div
      class="cl-middle"
      :style="{ top: `calc(163rem/36 + ${safeAreaTop}px)` }"
    >
      <div class="cl-middleWidth">
        <div class="cl-flexcc cl-xFootballBanner">
          <img
            :src="STATICURL + `/images/${locale}/xFootballBanner.png`"
            alt="xFootball"
            @click="goxFootball"
          />
        </div>
        <div style="height: calc(15rem / 36)" />
        <div class="cl-middleList">
          <div v-for="(item, index) in middleList" :key="index">
            <div
              class="cl-flexcb"
              @click="item.fun ? item.fun() : goWhere(item)"
            >
              <div class="cl-flexcc cl-left">
                <div :class="`cl-icon ${item.name}`" />
                <h2 class="cl-h2 cl-word">{{ $t(item.word) }}</h2>
              </div>
              <div class="cl-flexcc cl-right">
                <div class="cl-supplement">
                  <div v-if="index === 0" class="cl-flexcc cl-liveNumber">
                    {{ live_total }}
                  </div>
                </div>
                <div
                  class="cl-rightIcon"
                  :class="showList[index] ? 'cl-iconRotate' : 'cl-iconReset'"
                />
              </div>
            </div>

            <div style="height: calc(20rem / 36)" />
            <template>
              <CollapseTransition>
                <div v-if="showList[index]" class="cl-sportsList">
                  <div v-for="(item, index) in sportsList" :key="index">
                    <div class="cl-flexcb" @click="goWhere(item)">
                      <h3 class="cl-h3 cl-left">
                        {{ $t(`homeMenu.${item.name}`) }}
                      </h3>
                      <div class="cl-right">{{ item.number }}</div>
                    </div>
                    <div style="height: calc(20rem / 36)" />
                  </div>
                </div>
              </CollapseTransition>
            </template>
          </div>
        </div>

        <div style="height: calc(16rem / 36)" />
      </div>
    </div>

    <!-- 页脚 -->
    <div style="height: calc(40rem / 36)" />
    <div class="cl-flexcc cl-bottom">
      <h2
        class="cl-flexcc cl-h2 cl-box cl-left"
        @click="
          goWhere({
            click: 'menu_how_to_play',
            url: { path: `/${locale}/howToPlay` }
          })
        "
      >
        {{ $t('howToPlayTitle') }}
      </h2>
      <h2 class="cl-flexcc cl-h2 cl-box cl-right" @click="openOnlineHelp">
        {{ $t('footer.online') }}
      </h2>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  components: { CollapseTransition: Lib.common.CollapseTransition },
  data() {
    return {
      // 语言列表是否展开和选择项
      isLangShow: false,
      LangSelectIndex: 0,
      // 搜索内容
      searchText: '',
      PreMatch: {
        football: {
          big: [],
          other: 0
        },
        other: 0
      },
      showList: new Array(9).fill(false)
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    },
    sportsList() {
      const preMatch = this.PreMatch
      const arr = [
        {
          name: 'Soccer',
          click: 'menu_football_other',
          url: { path: `/${this.locale}/sports/Football` },
          number: preMatch.football.other
        },
        {
          name: 'Basketball',
          url: { path: `/${this.locale}/sports/Basketball` },
          number: this.arrayCheck(preMatch.other, 2, 'sport_id')
        },
        {
          name: 'Cricket',
          url: { path: `/${this.locale}/sports/Cricket` },
          number: this.arrayCheck(preMatch.other, 21, 'sport_id')
        },
        {
          name: 'usa',
          url: { path: `/${this.locale}/sports/USAFootball` },
          number: this.arrayCheck(preMatch.other, 16, 'sport_id')
        },
        {
          name: 'Volleyball',
          url: { path: `/${this.locale}/sports/Volleyball` },
          number: this.arrayCheck(preMatch.other, 23, 'sport_id')
        },
        {
          name: 'Tennis',
          url: { path: `/${this.locale}/sports/Tennis` },
          number: this.arrayCheck(preMatch.other, 5, 'sport_id')
        }
      ]
      return arr
    },
    middleList() {
      const arr = [
        {
          name: 'live',
          word: 'homeMenu.live',
          click: 'menu_live',
          url: { path: `/${this.locale}/live/Football` }
        },
        {
          name: 'sports',
          word: 'homeMenu.sport',
          fun: () => {
            this.$set(this.showList, 1, !this.showList[1])
          }
        },
        {
          name: 'onebetLeague',
          word: 'onebetLeague.onebetLeague',
          click: 'menu_onebet_league',
          url: { path: `/${this.locale}/onebetLeague` }
        },
        {
          name: 'jackpots',
          word: 'jackpots.title',
          click: 'menu_jackpot',
          url: { path: `/${this.locale}/jackpotEntrance` }
        },
        {
          name: 'Nova6',
          word: 'nova6',
          click: 'menu_nova6',
          fun: () => {
            window.location.href =
              this.country === 'ug'
                ? `${process.env.hostname}/${this.locale}/nova6`
                : `${process.env.hostnamecm}/${this.locale}/nova6`
          }
        },
        {
          name: 'promotions',
          word: 'homeMenu.Promotions',
          click: 'menu_promotions',
          url: { path: `/${this.locale}/promotions` }
        },
        {
          name: 'coins',
          word: 'account.coins',
          click: 'menu_coins_center',
          url: { path: `/${this.locale}/coinsCenter/winBonus` }
        },
        {
          name: 'popular',
          word: 'rowTabs.popular',
          click: 'menu_popular_bet',
          url: { path: `/${this.locale}/popular` }
        },
        {
          name: 'cash',
          word: 'homeMenu.cash',
          click: 'menu_get_cash',
          url: { path: `/${this.locale}/invite` }
        }
      ]
      return arr
    },
    thirdList() {
      const arr = [
        {
          name: 'freebet',
          click: 'menu_free_bet',
          url: { path: `/${this.locale}/freebet` }
        },
        {
          name: 'coins',
          click: 'menu_coins_center',
          url: { path: `/${this.locale}/coinsCenter/winBonus` }
        },
        {
          name: 'deposit',
          click: 'menu_deposit',
          fun: () => {
            this.$emit('visibleMenu', false)
            this.depositComTriggle(true)
          }
        },
        {
          name: 'result',
          click: 'menu_result',
          url: { path: `/${this.locale}/result` }
        }
      ]
      if (this.isApp === 1)
        arr.push({
          name: 'app',
          click: 'menu_app_download',
          url: { path: `/${this.locale}/download` }
        })
      else
        arr.push({
          name: 'Promotions',
          click: 'menu_promotions',
          url: { path: `/${this.locale}/promotions` }
        })
      return arr
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    checkInInfo() {
      return this.$store.state.checkInInfo
    },
    isApp() {
      return typeof window !== 'undefined' ? window.appInteraction.type : 1
    },
    langList() {
      return this.$store.state.moneyConfig[this.country].langList
    },
    live_total() {
      return this.$store.state.live_total
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    // 用户信息
    info() {
      return this.$store.state.info
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  created() {
    // 展开sports栏
    this.showList[1] = true
  },
  beforeMount() {
    this.getSportCount()
  },
  mounted() {
    this.LangSelectIndex = this.langList.findIndex(
      (item) => item.lang === this.locale
    )
  },
  methods: {
    // 数组内容查询
    arrayCheck(arr, id, name) {
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (Number(arr[i][name]) === Number(id)) {
            return arr[i].match_count
          }
        }
      }
      return 0
    },
    // 获取live赛事数量
    getSportCount() {
      this.$axios_api
        .getSportCount({
          match_type: 0
        })
        .then((res) => {
          if (res.code === 0) {
            if (res.data && res.data.result && res.data.result.PreMatch)
              this.PreMatch = res.data.result.PreMatch
            if (res.data && res.data.meta && res.data.meta.live_total)
              this.$store.commit('set_live_total', res.data.meta.live_total)
          }
        })
    },
    // 关闭目录
    visibleMenu() {
      this.$emit('visibleMenu', false)
    },
    // 跳转
    goWhere(item) {
      if (item.click) Lib.common.event_statistics(item.click)
      this.$router.push(item.url)
    },
    // 搜索
    goSearch() {
      if (this.searchText) {
        this.$router.push({
          path: `/${this.locale}/search`,
          query: { searchText: this.searchText }
        })
      }
    },
    // 选择语言
    selectLang(index, item) {
      // 关闭选择框
      this.isLangShow = false
      // 选中第几项
      this.LangSelectIndex = index
      // 修改语言配置
      this.$store.commit('setRoot', {
        ...this.$store.state.root,
        locale: item.lang
      })
      // 刷新页面
      // 获取路由数组
      const urlArr = window.location.pathname.split('/')
      // 获取地址传参
      const urlParameter = window.location.href.split('?')[1]
      // 替换语言
      if (urlArr.length >= 2) {
        urlArr[1] = item.lang
      }
      // 获取基础域名
      let url = window.location.origin
      // 拼接路由
      for (let i = 1, length = urlArr.length; i < length; i++) {
        url += '/' + urlArr[i]
      }
      // 有传参拼接传参
      if (urlParameter) {
        url += '?' + urlParameter
      }
      // 刷新当前页面
      window.location.href = url
    },
    openOnlineHelp() {
      Lib.common.event_statistics('menu_online_help')
      Lib.common.initiateCall(this)
    },
    // 前往xFootball官网
    goxFootball() {
      Lib.common.event_statistics('homeMenu_xfootball_banner')
      Lib.common.openWay(1, this)({ url: 'https://www.xfootball.net' })
    },
    depositComTriggle(bool) {
      this.$store.commit('setFepositComShow', bool)
    }
  }
}
</script>

<style scoped lang="less">
.cl-homeMenu-wrap {
  display: flex;
  flex-direction: column;
  width: 304rem/36;
  height: 100%;

  .cl-top {
    box-sizing: border-box;
    height: 163rem/36;
    // border-bottom: 0.1rem/36 solid #d4dae1;
    .cl-topWidth {
      width: 284rem/36;
      height: 163rem/36;
      .cl-first {
        .cl-homeIcon {
          .sprite(@menu-home, 108rem);
        }
        .cl-closeIcon {
          .sprite(@icon-close-black, 108rem);
        }
      }
      .cl-second {
        width: 100%;

        .cl-languageBox {
          margin-right: 7rem/36;
          width: 61rem/36;
          height: 33rem/36;
          box-sizing: border-box;
          background-color: #ebeef9;
          font-weight: 400;
          color: #000;

          .cl-languageWord {
            font-size: 9rem/36;
          }

          .cl-downIcon {
            margin-left: 5rem/36;
            .sprite(@icon-down, 108rem);
          }

          .cl-iconRotate {
            transform: rotate(-180deg);
            -webkit-transform: rotate(-180deg);
            transition: transform 0.3s;
          }

          .cl-iconReset {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transition: transform 0.3s;
          }
        }
        .cl-borderTop {
          border-top-right-radius: 3rem/36;
          border-top-left-radius: 3rem/36;
        }
        .cl-border {
          border-radius: 3rem/36;
        }
        .cl-langList {
          position: absolute;
          left: 0;
          top: 33rem/36;
          z-index: 1;
          width: 61rem/36;
          background-color: #ebeef9;
          color: #000;
          border-radius: 0 0 3rem/36 3rem/36;
          overflow: hidden;
          .cl-langListItem {
            height: 33rem/36;
            box-sizing: border-box;
            border-top: 0.1rem/36 solid #d4dae1;
          }
        }
        .cl-searchBox {
          flex: 1;
          height: 33rem/36;
          box-sizing: border-box;
          background-color: #f2f2f4;
          border-radius: 3rem/36;
          overflow: hidden;

          .cl-searchIcon {
            margin: 0 6rem/36 0 10rem/36;
            .sprite(@icon-search-page-search, 108rem);
          }
          input {
            flex: 1;
            background-color: #f2f2f4;
            border: none;
            outline: none;
            color: #000;
          }
          input::placeholder {
            font-size: 11rem/36;
            color: #a2a2a7;
            font-weight: 400;
          }
        }
      }
      .cl-third {
        .cl-thirdList {
          .cl-thirdItem {
            text-align: center;
            .cl-itemName {
              white-space: nowrap;
              margin-top: 6rem/36;
              color: #74747c;
              font-size: 10rem/36;
              font-weight: 400;
            }
            .cl-icon {
              margin: 0 auto;
              position: relative;
              .cl-noChecked {
                width: 7rem/36;
                height: 7rem/36;
                background-color: #e52f10;
                border-radius: 50%;
                position: absolute;
                right: -1rem/36;
                top: -1rem/36;
              }
            }
            .freebet {
              .sprite(@home-menu-freebet, 108rem);
            }
            .coins {
              .sprite(@home-menu-coins, 108rem);
            }
            .deposit {
              .sprite(@home-menu-deposit, 108rem);
            }
            .result {
              .sprite(@home-menu-result, 108rem);
            }
            .app {
              // 样式会继承公共样式 写此样式覆盖 勿删
              min-width: auto;
              min-height: auto;
              .sprite(@home-menu-app, 108rem);
            }
            .Promotions {
              .sprite(@home-menu-app, 108rem);
            }
          }
        }
      }
    }
  }

  .cl-xFootballBanner {
    img {
      width: 278rem/36;
      height: 80rem/36;
    }
  }

  .cl-middle {
    position: absolute;
    // top: 178rem/36;
    bottom: 40rem/36;
    padding-left: 12rem/36;
    width: 284rem/36;
    display: flex;
    justify-content: center;
    overflow: auto;

    .cl-middleWidth {
      width: 284rem/36;
      .cl-middleList {
        font-size: 11rem/36;
        color: #363636;

        .cl-left {
          .cl-word {
            font-weight: bold;
          }

          .cl-icon {
            margin-right: 6rem/36;
          }

          .live {
            .sprite(@menu-live, 108rem);
          }

          .sports {
            .sprite(@menu-sports, 108rem);
          }

          .onebetLeague {
            .sprite(@menu-league, 108rem);
          }

          .jackpots {
            .sprite(@menu--jackpots, 108rem);
          }

          .Nova6 {
            .sprite(@menu-nova6, 108rem);
          }

          .promotions {
            .sprite(@menu--promotions, 108rem);
          }

          .coins {
            .sprite(@menu--get-coins, 108rem);
          }

          .popular {
            .sprite(@menu-popular, 108rem);
          }

          .cash {
            .sprite(@menu--get-cash, 108rem);
          }
        }

        .cl-right {
          .cl-liveNumber {
            width: 19rem/36;
            height: 19rem/36;
            background-color: #eb6149;
            border-radius: 50%;
            color: #fff;
            font-weight: bold;
            margin-right: 2rem/36;
          }

          .cl-rightIcon {
            .sprite(@icon-black-right, 108rem);
          }

          .cl-iconRotate {
            transform: rotate(90deg);
            -webkit-transform: rotate(90deg);
            transition: transform 0.3s;
          }

          .cl-iconReset {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transition: transform 0.3s;
          }
        }
        .cl-sportsList {
          font-weight: 400;
          .cl-left {
            margin-left: 24rem/36;
          }
          .cl-right {
            color: #000;
          }
        }
      }
    }
  }

  .cl-bottom {
    position: fixed;
    bottom: 0;
    width: 304rem/36;
    height: 40rem/36;
    background-color: #f2f2f4;
    font-size: 11rem/36;
    font-weight: 400;

    .cl-box {
      box-sizing: border-box;
      width: 50%;
      height: 28rem/36;
    }

    .cl-left {
      color: #333;
      border-right: 0.1rem/36 solid #d4dae1;
    }

    .cl-right {
      color: #4c50fa;
    }
  }
}
</style>
