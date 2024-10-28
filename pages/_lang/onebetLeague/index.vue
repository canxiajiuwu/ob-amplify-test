<template>
  <div class="cl-onebetLeagueIndex-wrap">
    <headBack is-white-back :bgcolor="mainStyle.mainThemeColor" :z-index="5">
      <template #middle>
        <div
          class="cl-middle"
          :class="{ 'cl-middleFr': !info && locale === 'fr' }"
        />
      </template>
      <template>
        <div class="cl-flexcc cl-topRight">
          <template v-if="info">
            <div class="cl-flexcc cl-headerAccount" @click="goWhere('account')">
              <div class="cl-icon" />
              <div class="cl-word">{{ abs(info.balance) }}</div>
            </div>
          </template>
          <template v-else>
            <div
              class="cl-flexcc cl-lkButton cl-login"
              @click="goWhere('login')"
            >
              <div>{{ $t('loginEntry.login') }}</div>
            </div>
            <div
              class="cl-flexcc cl-tcButton cl-register"
              @click="goWhere('register')"
            >
              <div>{{ $t('loginEntry.joinNow') }}</div>
            </div>
          </template>
        </div>
      </template>
    </headBack>
    <div class="cl-leagueBox">
      <div
        class="cl-item"
        v-for="item in leagueArr"
        :key="item.id"
        :class="{ 'cl-league_id': league_id == item.id }"
        @click="changeLeagueId(item.id)"
      >
        <div class="cl-leagueImg" :class="`no-league${item.id}`">
          <div class="cl-leaguemc" />
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <div class="cl-tabsBox">
      <div
        class="cl-flexcc cl-item"
        v-for="item in tabsList"
        :key="item.id"
        @click="changeTabsIndex(item.id)"
      >
        <div
          class="cl-flexcc cl-bsbb cl-name"
          :class="{ 'cl-tabsIndex': tabsIndex === item.id }"
        >
          <div class="cl-tname">
            <h2 class="cl-h2">{{ item.name }}</h2>
            <div
              v-if="item.id === 3 && freebetNum"
              class="cl-flexcc cl-bsbb cl-freeBetNum"
            >
              {{ freebetNum }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cl-onebetLeagueBox">
      <template v-for="item in vueCom">
        <component
          ref="vueCom"
          :key="item.id"
          v-if="tabsIndex === item.id"
          :is="item.name"
          :ticket-id="ticketId"
          :period-data="periodData"
          :round-index="roundIndex"
          :time-limited-activity-query="timeLimitedActivityQuery"
          @noData="requestPeriod"
          @goHistory="goHistory"
          @closeMyBetDetail="closeMyBetDetail"
          @clearRoundIndex="roundIndex = undefined"
          @clearTimeLimitedActivityQuery="timeLimitedActivityQuery = null"
          @isCountRefresh="freebetNumber"
        />
      </template>
    </div>
  </div>
</template>

<script>
import marketsVue from '@/components/components/onebetLeague/markets.vue'
import myBetsVue from '@/components/components/onebetLeague/mybets.vue'
import resultModalVue from '@/components/components/onebetLeague/resultModal.vue'
import headBack from '@/components/components/headBack.vue'
import Lib from '@/assets/js/Lib'

export default {
  name: 'OnebetLeagueIndex',
  components: {
    headBack,
    marketsVue,
    myBetsVue,
    resultModalVue
  },
  data() {
    return {
      leagueArr: [
        { id: 1, name: 'English League' },
        { id: 2, name: 'Spanish League' },
        { id: 3, name: 'Italian League' },
        { id: 5, name: 'Cameroonian League' }
      ], // 联赛id数组
      league_id: '', // 选中联赛id
      tabsIndex: 0, // tabs栏选中项
      periodData: {}, // 期数等数据, 为null代表出错
      ticketId: '', // 订单查询id
      freebetCount: 0, // freeBet数量
      roundIndex: undefined, // 跳转订单详情后记录的当前比赛期数选项
      timeLimitedActivityQuery: null,
      isCountRefresh: 0 // freeBet请求是否在请求中
    }
  },
  computed: {
    // 选项tabs数据
    tabsList() {
      return [
        { id: 0, name: this.$t('preMatchBox.market') },
        { id: 1, name: this.$t('footerMenu.mybets') },
        { id: 2, name: this.$t('onebetLeague.result') },
        { id: 3, name: this.$t('freeBet.name') }
      ]
    },
    // vue组件数据
    vueCom() {
      return [
        { id: 0, name: 'marketsVue' },
        { id: 1, name: 'myBetsVue' },
        { id: 2, name: 'resultModalVue' }
        // { id: 3, name: '' }
      ]
    },
    freebetNum() {
      if (!this.info) return 1
      return this.freebetCount
        ? this.freebetCount > 99
          ? '99+'
          : this.freebetCount
        : ''
    },
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    info() {
      return this.$store.state.info
    },
    tickets() {
      return this.$store.state.onebetLeagueTickets[this.league_id] || []
    },
    id() {
      return this.$route.query.id
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  beforeMount() {
    const ticket = Lib.store.get('onebetLeagueTickets')
    this.$store.commit(
      'setOnebetLeagueTickets',
      Array.isArray(ticket) ? {} : ticket || {}
    )
    if (!this.info && this.token) this.getInfo()
    if (
      this.$route.query.limit_amount ||
      this.$route.query.limit_amount ||
      this.$route.query.limit_odds
    ) {
      this.timeLimitedActivityQuery = this.$route.query
    }
  },
  mounted() {
    // 初始化请求数据
    this.requestPeriod()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    if (this.token) setTimeout(this.freebetNumber, 1500)
    //  限时活动，监听页面数据传参数
    window.addEventListener(
      'replaceState',
      this.replaceStateEventFallback,
      false
    )
  },
  beforeDestroy() {
    //  限时活动，监听页面数据传参数
    window.removeEventListener(
      'replaceState',
      this.replaceStateEventFallback,
      false
    )
  },
  methods: {
    parseQueryString(queryString) {
      // 分割字符串，获取键值对数组
      const pairs = queryString.slice(1).split('&')
      // 创建一个对象来存储解析后的键值对
      const result = {}
      // 遍历数组，将每个键值对解析并存储在对象中
      pairs.forEach(function (pair) {
        pair = pair.split('=')
        result[pair[0]] = decodeURIComponent(pair[1] || '')
      })
      return result
    },
    replaceStateEventFallback(e) {
      if (
        Object.prototype.toString.call(e.arguments[0]) === '[object Object]' &&
        e.arguments[0].type === 'bet'
      ) {
        const obj = this.parseQueryString(e.arguments[2])
        if (this.tabsIndex === 0) {
          this.$refs.vueCom[0].direPartic(obj)
        } else {
          this.timeLimitedActivityQuery = obj
          this.tabsIndex = 0
          // this.$nextTick(()=>{
          //   this.$refs.vueCom[0].direPartic(obj)
          // })
        }
      }
    },
    // mybets详情关闭回调
    closeMyBetDetail() {
      // 0 为markets栏
      if (this.roundIndex !== undefined) this.changeTabsIndex(0)
    },
    // 跳转至mybet 详情页
    goHistory(id, roundIndex) {
      // 特定id
      if (id === 'freebetNumber') return this.freebetNumber()
      this.ticketId = id
      this.roundIndex = roundIndex
      // 1 为mybets栏
      this.changeTabsIndex(1)
      // 清除记录的ticketId
      setTimeout(() => (this.ticketId = ''))
    },
    // 金额格式化
    abs(num) {
      return Lib.common.abs(num)
    },
    // 获取info
    getInfo(token) {
      this.$axios_api.userInfo({ token: token || this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
        }
      })
    },
    // 页面跳转
    goWhere(path) {
      Lib.common.event_statistics(`onebet_legaue_${path}`)
      this.$router.push({
        path: `/${this.locale}/` + path,
        query: { fromName: this.$route.path }
      })
    },
    // 切换tabs栏选项
    changeTabsIndex(id) {
      // 3 freeBet为跳转路由
      if (id === 3) {
        Lib.common.event_statistics('onebet_League_freebet_click')
        sessionStorage.setItem('onebetLeagueCountRefresh', 1)
        this.$router.push({
          path: `/${this.locale}/onebetLeague-freebet`,
          query: { isBack: 1 }
        })
        return
      }
      this.tabsIndex = id
    },
    // 切换league_id
    changeLeagueId(id) {
      if (this.league_id == id) return
      this.league_id = id
      this.periodData.league_id = id
      this.requestPeriod(id)
    },
    // 获取期数等数据
    requestPeriod(league_id) {
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .LeagueSoccerPeriod({ league_id })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          const { code, data } = res
          if (code === 0) {
            this.periodData = data
            this.league_id = data.league_id
          } else this.periodData = null
        })
        .catch(() => {
          this.periodData = null
          this.$store.commit('changeLoadingStatus', false)
        })
    },
    // 请求freebet数量
    freebetNumber() {
      if (this.isCountRefresh) return
      this.isCountRefresh = 1
      this.$axios_api.LeagueSoccerFreebet({ token: this.token }).then((res) => {
        this.isCountRefresh = 0
        const { code, data } = res
        if (code === 0) this.freebetCount = data.count
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-onebetLeagueIndex-wrap {
  position: absolute;
  width: 10rem;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .cl-middle {
    .sprite(@league-logo, 108rem);
    & .cl-middleFr {
      position: absolute;
      left: -20rem/36;
    }
  }
  .cl-topRight {
    font-size: 11rem/36;
    font-weight: bold;
    padding-right: 10rem/36;
    .cl-headerAccount {
      .cl-icon {
        margin-right: 7rem/36;
        .sprite(@icon-account-white, 108rem);
      }
      .cl-word {
        color: @balanceColor;
        white-space: nowrap;
      }
    }
    .cl-login {
      margin-right: 7rem/36;
      box-sizing: border-box;
      border: 1rem/36 solid #fff;
    }
  }
  .cl-leagueBox {
    height: 60rem/36;
    width: 10rem;
    display: flex;
    align-items: center;
    background-color: @mainThemeColor;
    font-size: 9rem/36;
    color: @tabNoColor;
    box-sizing: border-box;
    border-bottom: 0.5rem/36 solid rgba(255, 255, 255, 0.3);
    text-align: center;
    white-space: nowrap;
    .cl-item {
      flex: 1;
      .cl-leagueImg {
        position: relative;
        margin: 0 auto 4rem/36;
        .cl-leaguemc {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
      .no-league1 {
        .sprite(@league-flag1, 108rem);
      }

      .no-league2 {
        .sprite(@league-flag2, 108rem);
      }

      .no-league3 {
        .sprite(@league-flag3, 108rem);
      }

      .no-league5 {
        .sprite(@league-flag5, 108rem);
      }
      &.cl-league_id {
        color: #fdd806;
        .cl-leagueImg {
          .cl-leaguemc {
            border-radius: 1rem/36;
            border: 2rem/36 solid #fdd806;
            background-color: transparent;
          }
        }
      }
    }
  }
  .cl-tabsBox {
    height: 33rem/36;
    width: 10rem;
    display: flex;
    align-items: center;
    background-color: @mainThemeColor;
    font-size: 11rem/36;
    font-weight: bold;
    color: @tabNoColor;
    .cl-item {
      flex: 1;
      .cl-name {
        width: 100%;
        border-right: 0.5rem/36 solid rgba(255, 255, 255, 0.3);
        .cl-tname {
          position: relative;
          .cl-freeBetNum {
            position: absolute;
            right: -8rem/36;
            top: -6rem/36;
            min-width: 10rem/36;
            height: 10rem/36;
            border-radius: 5rem/36;
            padding: 0 2rem/36;
            background-color: #eb614a;
            color: #fff;
            font-size: 8rem/36;
          }
        }
      }
      .cl-tabsIndex {
        color: #fff;
      }
    }
    .cl-item:last-child {
      .cl-name {
        border-right: 0;
      }
    }
  }
  .cl-onebetLeagueBox {
    flex: 1;
    position: relative;
  }
}
</style>
