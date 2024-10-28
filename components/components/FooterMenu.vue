<template>
  <div class="cl-FooterMenu-wrap" :class="{ 'cl-teamsLive': where === 'live' }">
    <div v-if="tickets.length && isPlaceBetShow" class="cl-placeBetComBox">
      <placeBetCom :where="where" />
    </div>
    <!-- <div class="cl-l-efg2">23273hcsuchas</div> -->
    <div v-if="listData.length" class="cl-flexcb cl-bsbb cl-menuBox">
      <nuxt-link
        v-for="(item, index) in listData"
        :key="index"
        :to="`${item.url}`"
        style="flex: 1"
      >
        <div class="cl-menuItem" @click.prevent="itemClick(item)">
          <div class="cl-flexcc cl-itemImage">
            <div
              class="cl-flexcc"
              :class="{
                'cl-betslip': item.route_name === 'betslip',
                'cl-betslipBgcolor':
                  item.route_name === 'betslip' &&
                  ![item.img, item.live_img, item.select_img][showState(index)]
              }"
            >
              <!-- <img
                v-if="item.img"
                :src="
                  [item.img, item.live_img, item.select_img][showState(index)]
                "
                :alt="item.name"
                class="cl-img"
              /> -->
              <div
                v-if="item.img"
                :class="changeEventName(item.event_name, index)"
              />
              <div
                v-if="item.route_name === 'betslip'"
                class="cl-ticketsLength"
              >
                {{ tickets.length }}
              </div>
            </div>
          </div>
          <div
            v-if="item.route_name !== 'betslip'"
            :class="`cl-itemName ${
              ['cl-defaultName', 'cl-liveName', 'cl-selectName'][
                showState(index)
              ]
            }`"
          >
            {{ item.name + (index === 1 ? `(${live_total})` : '') }}
          </div>
        </div>
      </nuxt-link>
      <div class="cl-betslipBgBoxA" />
      <div class="cl-betslipBgBoxB" />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import placeBetCom from '@/components/components/footerCom/placeBetCom.vue'

export default {
  components: { placeBetCom },
  inject: ['openGame'],
  props: ['where'],
  data() {
    return {
      listData: [
        {
          img: 'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/DvGtj0oI5WaReQUjscyYskKOtTHN6tYfra25M4u7.png',
          select_img:
            'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/bkete7L5VmQpC0z5aST70EPWxCBAPjLyUJbws1jB.png',
          platform: 0,
          open_way: 0,
          event_name: 'bottom_home',
          url: '/en',
          name: 'Home',
          live_img:
            'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/rtxQObP0TzD3rylKzPKfkgK9PF4Ace67wsH01IDc.png',
          route_name: 'hall',
          scheme: 'home'
        },
        {
          img: 'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/uhl8W0JtTzURB1LwKrypLFITS9lnuVlPyNx6GJzL.png',
          select_img:
            'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/keBL1vhLXAxMwVNQtjWaMmzg4Ggjp7pV8aYR1fSK.png',
          platform: 0,
          open_way: 0,
          event_name: 'bottom_live',
          url: '/en/live/Football',
          name: 'Live',
          live_img:
            'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/Mg1QBfuJGByu4h2AjOL58FGFvNebRCM1d34yEfoX.png',
          route_name: 'live',
          scheme: 'live'
        },
        {
          img: '',
          select_img: '',
          platform: 0,
          open_way: 0,
          event_name: 'bottom_betslip',
          url: '/en/betslip',
          name: 'Betslip',
          live_img: '',
          route_name: 'betslip',
          scheme: 'betslip'
        },
        {
          img: 'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/sDVGHabLlVQKR87BySjFex9I6vVATmH1AT0Kx50f.png',
          select_img:
            'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/blRZS7oiqonekLOZzJCrUZabpcEfF1kQmr3iTVgr.png',
          platform: 0,
          open_way: 0,
          event_name: 'bottom_my_bets',
          url: '/en/mybet',
          name: 'My Bets',
          live_img:
            'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/Gteva43EfzK2XhJplAfUAbOwip0DpH1hQqUdo4C1.png',
          route_name: 'mybet',
          scheme: 'mybet'
        },
        {
          img: 'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/LD4kNki6aPPGoaXwES7lKes6lGIqhnCGrDF75e7G.png',
          select_img:
            'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/1KwoOVgFGZoNXoH9BylwkMu0qKoLhdN26tNSdv21.png',
          platform: 0,
          open_way: 0,
          event_name: 'bottom_account',
          url: '/en/account',
          name: 'Account',
          live_img:
            'https://d2m6jvlii5xwqv.cloudfront.net/test/footerTab/MjuLEuxhKQhzt5MOSgOU9Wit9zyc4qLw0BpTKvaa.png',
          route_name: 'account',
          scheme: 'account'
        }
      ] // 渲染数据容器
    }
  },
  computed: {
    tickets() {
      return this.$store.state.tickets
    },
    // live比赛数量
    live_total() {
      return this.$store.state.live_total
    },
    // 路由名,控制图片显示
    routerNameList() {
      return Array.isArray(this.listData)
        ? this.listData.map((item) => item.route_name)
        : []
    },
    routeName() {
      if (
        this.$route.name === 'index' ||
        this.$route.name === 'lang' ||
        this.$route.name === 'lang-refer' ||
        this.$route.name === 'lang-top-league'
      ) {
        return 'hall'
      } else if (this.$route.name === 'lang-live-sportName') {
        return 'live'
      }
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    },
    // 路由名，控制placeBetCom
    isPlaceBetShow() {
      const list = ['createBetslip', 'mybet', 'account']
      return !list.find((item) => item === this.routeName)
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  beforeMount() {
    this.getData()
  },
  mounted() {
    this.getTicket()
  },
  methods: {
    // 匹配事件名
    changeEventName(str, index) {
      const beforeName = ['img', 'live-img', 'select-img'][
        this.showState(index)
      ]
      return (
        beforeName +
        '-' +
        str
          .replace(/_/g, '-')
          .replace(/[A-Z]/g, (match) => {
            return '-' + match.toLowerCase()
          })
          .replace(/--/g, '-')
      )
    },
    // 判断展示状态
    showState(index) {
      const arrIndex = this.routerNameList.indexOf(this.routeName)
      if (arrIndex === index) return 2 // select
      else if (this.where === 'live') return 1 // live
      else return 0 // default
    },
    getTicket() {
      if (Lib.store.get('tickets'))
        this.$store.commit(
          'setTickets',
          JSON.parse(Lib.common.decrypt(Lib.store.get('tickets')))
        )
    },
    // 点击事件
    itemClick(item) {
      this.getData()
      if (!item) return
      if (item.event_name) Lib.common.event_statistics(item.event_name)
      return Lib.common.openWay(item.open_way, this)(item)
    },
    // 获取数据
    getData() {
      const locale = this.$store.state.root.locale // 获取语言
      const dataSTR = 'footerTabsData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
      let askFlag = 0 // 记录是否更新
      // 查询本地时间, true更新
      if (Lib.common.getBackstageDataIsRefresh(dataSTR, 'inquire')) askFlag = 1
      const data = Lib.store.get(dataSTR) // 获取本地数据
      // 查询本地数据是否完整
      // 完整,优先使用本地数据
      if (Array.isArray(data) && data.length && !this.listData.length)
        this.listData = data
      // 数据被破坏
      else askFlag = 1
      // 可以请求
      if (askFlag) {
        // 获取数据
        this.$axios_api
          .getFooterNav({})
          .then((res) => {
            // 成功
            if (res.code === 0 && Array.isArray(res.data) && res.data.length) {
              // 存入本地, 修改本地时间, 更新数据
              this.listData = res.data
              Lib.store.set(dataSTR, res.data)
              Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
            }
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style scoped lang="less">
@set: {
  img-bottom-home: @ticon-img-bottom-home;
  img-bottom-account: @ticon-img-bottom-account;
  img-bottom-live: @ticon-img-bottom-live;
  img-bottom-my-bets: @ticon-img-bottom-my-bets;
  live-img-bottom-account: @ticon-live-img-bottom-account;
  live-img-bottom-home: @ticon-live-img-bottom-home;
  live-img-bottom-my-bets: @ticon-live-img-bottom-my-bets;
  live-img-bottom-live: @ticon-select-img-bottom-live;
  select-img-bottom-account: @ticon-select-img-bottom-account;
  select-img-bottom-home: @ticon-select-img-bottom-home;
  select-img-bottom-live: @ticon-select-img-bottom-live;
  select-img-bottom-my-bets: @ticon-select-img-bottom-my-bets;
};

each(@set, {
  .@{key} {
    .sprite(@value, 109rem);
  }
});
.cl-FooterMenu-wrap {
  width: 10rem;
  z-index: 4;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  .cl-placeBetComBox {
    position: absolute;
    width: 10rem;
    bottom: 50rem/36;
    left: 0;
    z-index: -1;
  }
  .cl-menuBox {
    position: relative;
    height: 50/36rem;
    background-color: #fff;
    border-top: 0.6rem/36 solid #e9e9f3;
    flex-shrink: 0;

    .cl-betslipBgBoxA {
      position: absolute;
      z-index: -1;
      bottom: 5rem/36;
      left: 50%;
      transform: translateX(-50%);
      width: 62rem/36;
      height: 62rem/36;
      background-color: #fff;
      border: 0.6rem/36 solid #e9e9f3;
      border-radius: 50%;
      box-sizing: border-box;
    }
    .cl-betslipBgBoxB {
      position: absolute;
      bottom: 4rem/36;
      left: 50%;
      transform: translateX(-50%);
      width: 62rem/36;
      height: 62rem/36;
      background-color: #fff;
      border-radius: 50%;
    }

    .cl-menuItem {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .cl-itemImage {
        width: 23/36rem;
        height: 23/36rem;
        margin-bottom: 2/36rem;

        .cl-img {
          width: 100%;
          height: 100%;
        }

        .cl-betslip {
          position: absolute;
          top: -10/36rem;
          left: 50%;
          transform: translate(-50%, 0);
          z-index: 1;
          width: 50rem/36;
          height: 50rem/36;
          font-size: 22rem/36;
          color: #000;
          font-weight: 800;
          border-radius: 50%;
          background-color: #fff;

          .cl-img {
            position: absolute;
            z-index: 0;
          }
        }

        .cl-betslipBgcolor {
          background: linear-gradient(180deg, #f5ff2a 0%, #f6d406 100%);
        }

        .cl-ticketsLength {
          position: relative;
          z-index: 1;
        }
      }

      .cl-itemName {
        font-size: 9rem/36;
      }

      .cl-defaultName {
        color: @footDefaultColor;
      }

      .cl-liveName {
        color: @footLiveDefaultColor;
      }

      .cl-selectName {
        font-weight: bold;
        color: @footChooseColor;
      }
    }
  }
  &.cl-teamsLive {
    .cl-menuBox {
      border-top: 0.5rem/36 solid @footLiveBorderColor;
      background-color: @footLiveBgColor;
      .cl-betslipBgBoxA {
        border: 0.5rem/36 solid @footLiveBorderColor;
        background-color: @footLiveBgColor;
      }
      .cl-betslipBgBoxB {
        background-color: @footLiveBgColor;
      }
    }
  }
}
</style>
