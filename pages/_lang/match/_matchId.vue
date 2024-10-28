<template>
  <div
    ref="matchDetail"
    class="cl-matchDetail-wrap"
    :class="{ 'cl-matchDetailLive-wrap': where === 'live' }"
  >
    <div class="cl-topBox">
      <headBack
        :bgcolor="jsStyleData"
        color="#fff"
        :is-white-back="true"
        :title="$t('accountBack.markets').toUpperCase()"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
        @goWhere="goWhere"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <matchDetailInbox
      :meta="meta"
      :where="where"
      :match_status="meta.match_status"
    />
    <newUserBenefitsBanner
      :where="where === 'live' ? 'Bet_History' : 'Market'"
    />
    <matchDetailMenu
      :result="result"
      :meta="meta"
      :where="where"
      :choose-id="chooseId"
      @changeMarket="changeMarket"
      @quickNavigation="quickNavigation"
    />

    <van-pull-refresh
      v-model="isLoading"
      :pulling-text="$t('pullRefresh.pull')"
      :loosing-text="$t('pullRefresh.pull')"
      :loading-text="$t('pullRefresh.loading')"
      @refresh="onRefresh"
    >
      <div class="cl-matchDetailContentBox">
        <dataError v-if="isRequestFailed" :where="where" />
        <div v-else>
          <div v-if="requestLoading">
            <matchDetailMarket
              :key="chooseId"
              @changeCareStatus="changeCareStatus"
              @topIconChange="(e) => (IconShow = e)"
              :meta="meta"
              :where="where"
              :result="showResult"
              :market_id.sync="market_id"
              v-if="showResult.length > 0"
            />
            <div
              v-else-if="showResult.length === 0 && chooseId === -1"
              class="cl-myFavorite"
            >
              <div class="cl-noFavoriteImage">
                <img
                  src="@/assets/images/general/notSprites/live/myFavoride.png"
                  alt="onebet pointer"
                />
              </div>

              <div class="cl-art">
                <span>Click the icon</span>
                <div class="cl-care"></div>
                <span>to add the</span>
                <br />
                <span>market to my favorite.</span>
              </div>
            </div>
            <dataNoResult v-else :where="where" />
          </div>
          <template v-else>
            <dataLoading :where="where" />
            <div style="height: calc(50rem / 36)" />
          </template>
        </div>
      </div>
    </van-pull-refresh>

    <client-only>
      <FooterMenu :where="where" />
    </client-only>
    <div v-show="IconShow" class="cl-topIcon" @click="clickToTop" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import FooterMenu from '@/components/components/FooterMenu.vue'
import matchDetailInbox from '@/components/components/matchDetailInbox.vue'
import matchDetailMenu from '@/components/components/matchDetailMenu.vue'
import matchDetailMarket from '@/components/components/matchDetailMarket.vue'
import headBack from '@/components/components/headBack.vue'
import newUserBenefitsBanner from '@/components/components/newUserBenefitsCom/newUserBenefitsBanner'

export default {
  name: 'MatchDetail',
  components: {
    headBack,
    FooterMenu,
    matchDetailInbox,
    matchDetailMenu,
    matchDetailMarket,
    newUserBenefitsBanner
  },
  async asyncData(context) {
    const { $axios_api, route, store, app } = context
    let res = {}
    if (typeof window === 'undefined') {
      res = await $axios_api
        .matchInfoMeta({
          match_id: route.params.matchId,
          platform: store.state.platform
        })
        .then((res) => {
          const { code, data } = res
          if (code === 0) {
            const start_time = Lib.common.getDate(
              new Date(data.start_time * 1000),
              'dd/MM HH:mm'
            )
            app.$seo_init(context, 'lang-match-matchId-client', {
              title: {
                home_name: data.home_name,
                away_name: data.away_name,
                start_time
              },
              description: {
                tournament_name: data.tournament_name,
                country_name: data.country_name,
                home_name: data.home_name,
                away_name: data.away_name,
                start_time
              }
            })
            return data
          }
          return {}
        })
        .catch((e) => {
          return {}
        })
    }

    return { meta: res }
  },
  data() {
    return {
      IconShow: 0, // 图标显示于隐藏
      meta: {}, // meta信息
      result: [], // market循环体
      liveDataObj: {}, // live赛事数据对象
      chooseId: 0, // market分类id
      dataInterval: '', // 循环体
      liveTime: { meta: 60, data: 5 }, // 数据刷新倒计时, 仅live使用
      isRequestFailed: 0,
      requestLoading: 0,
      isLoading: false,
      where: '', // where
      market_id: '', // 需要快速定位的id
      is_lock: 0, // live赛事是否锁住
      is_complete_seo: false, // 是否完成seo控制
      is_back: false
    }
  },
  computed: {
    // 展示的market循环体
    showResult() {
      const id = this.chooseId
      const ldobj = this.liveDataObj
      const rldata = this.result
      let rList = []
      if (id === -1) rList = rldata.filter((a) => a[0].favorite)
      else if (id === 0) rList = rldata
      else {
        rList =
          ldobj[id] ||
          rldata.filter((a) => {
            const item = a[0].market_group || 0
            return typeof item === 'number' ? id == item : item.includes(id)
          })
      }
      return rList
    },
    matchId() {
      return this.$route.params.matchId
    },
    platform() {
      return this.$store.state.platform
    },
    matchDetailStatus() {
      return this.$store.state.matchDetailStatus
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    from() {
      return this.$route.query.from
    },
    jsStyleData() {
      const { liveThemeColor, mainThemeColor } = Lib.common.jsStyleData
      return this.where === 'live' ? liveThemeColor : mainThemeColor
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()

    this.clearFn()
    // matchDetailStatus
    if (this.matchDetailStatus) {
      this.$store.commit('setMatchDetailStatus', false)
      // 初始化
      this.isRequestFailed = 0
      this.requestLoading = 0
      this.isLoading = false
      this.result = []
      this.meta = {}
      this.chooseId = 0
    }
    // 获取是否是live赛事
    if (this.from === 'live') {
      this.where = 'live'
      this.getlivedataFn()
    } else this.getMarketDetail(1)
  },
  beforeDestroy() {
    this.clearFn()
    if (!this.is_back) this.$store.commit('clearContestListingsPage')
  },
  methods: {
    goWhere() {
      this.is_back = true
    },
    // 下拉刷新
    onRefresh() {
      this.isLoading = true
      this.where === 'live' ? this.getlivedataFn() : this.getMarketDetail(1)
    },
    // seo 内容切换
    seoChange(context, data) {
      if (!this.is_complete_seo) {
        this.is_complete_seo = true
      } else return
      const start_time = Lib.common.getDate(
        new Date(data.start_time * 1000),
        'dd/MM HH:mm'
      )
      this.$seo_init(context, 'lang-match-matchId-client', {
        title: {
          home_name: data.home_name,
          away_name: data.away_name,
          start_time
        },
        description: {
          tournament_name: data.tournament_name,
          country_name: data.country_name,
          home_name: data.home_name,
          away_name: data.away_name,
          start_time
        }
      })
    },
    // 获取market详情
    getMarketDetail(type) {
      this.$axios_api
        .preMatchInfo({
          match_id: this.matchId,
          platform: this.platform,
          token: this.token
        })
        .then((res) => {
          this.isRequestFailed = 0
          this.requestLoading = 1
          this.isLoading = false
          const { code, data } = res
          if (code === 0) {
            this.meta = data.meta
            this.result = this.editResultFn(res.data.result)
            // 修改对where赋值的判断,比赛结束后隐藏比赛详情左上角的live
            this.where = this.meta.match_status === 1 ? 'live' : ''
            // 如果是足球则展示main
            if (this.meta.sport_id === '1' && type) this.chooseId = 1
            if (type) {
              // 是否循环数据
              // live
              if (data.meta.match_type === 2 && data.meta.match_status === 1)
                this.getlivedataFn()
              else {
                // 判断是否离比赛开始在10分钟内
                const date =
                  data.meta.start_time - parseInt(new Date().getTime() / 1000)
                if (date <= 600)
                  setTimeout(this.getlivedataFn, date < 0 ? 0 : date * 1000)
                // // 比赛开始10分钟前和赛后
                // else {
                //   this.dataInterval && clearInterval(this.dataInterval)
                // }
              }
            }

            // seo 内容调整
            this.seoChange(
              {
                route: this.$route,
                app: this,
                store: this.$store
              },
              data.meta
            )
          }
        })
        .catch(() => {
          this.isLoading = false
          this.isRequestFailed = 1
          this.requestLoading = 1
        })
    },
    // 修改market分类
    changeMarket(data) {
      this.chooseId = data.group_id
      this.getGroupFn()
    },
    // 请求group信息节流
    getGroupFn: Lib.common.throttle(function () {
      this.liveTime.data = 2
    }, 500),
    // 是否关注
    changeCareStatus(data) {
      const { item, bool } = data
      const id = this.chooseId
      const rldata = this.result
      const ritem = rldata.find((a) => a[0].market_id === item[0].market_id)
      if (ritem) ritem[0].favorite = bool
      const arr = this.liveDataObj[id] || []
      const aitem = arr.find((a) => a[0].market_id === item[0].market_id)
      if (aitem) aitem[0].favorite = bool
      // 触发计算属性
      if (id === -1) this.result = [...rldata]
    },
    // 获取用户需要定位的数据后进行快速导航
    quickNavigation(e) {
      this.changeMarket(e)
      this.market_id = e.market_id
    },
    // 清除定时器
    clearFn() {
      this.dataInterval && clearInterval(this.dataInterval)
    },
    // 是live赛事时使用方法
    async getlivedataFn() {
      this.clearFn()
      this.isRequestFailed = 0
      this.requestLoading = 0
      await this.getliveMeta(1)
      await this.getliveInfoV2()
      // 请求完成, 展示内容
      this.requestLoading = 1
      this.isLoading = false
      if (!this.where) return
      this.dataInterval = setInterval(() => {
        this.liveTime.meta--
        this.liveTime.data--
        if (this.liveTime.meta <= 0) this.getliveMeta()
        if (this.liveTime.data <= 0)
          this.getliveInfoV2(this.chooseId <= -1 ? 0 : this.chooseId)
      }, 1000)
    },
    // live赛事获取meta信息
    getliveMeta(type) {
      this.liveTime.meta = 60
      return this.$axios_api
        .matchInfoMeta({
          match_id: this.matchId,
          platform: this.platform,
          token: this.token
        })
        .then((res) => {
          const { code, data } = res
          if (code === 0) {
            // 比赛返回time_elapsed为'0'时, 不进行数据更新
            const { live_data: { time_elapsed: oldte } = {} } = this.meta
            const newte = data.live_data.time_elapsed
            const statusFlag = [0, 1].includes(data.match_status)
            const noChange = statusFlag && !data.live_data.live
            // live_data 新旧数据
            const oldLive = this.meta.live_data
            const newLive = {
              ...data.live_data,
              time_elapsed: newte === '0' ? oldte || '0' : newte
            }
            // 后端订阅可能传参live_data中数据live为false
            // 此时若match_status为0或1则不更新meta中live_data且不停止live数据请求
            this.meta = {
              ...data,
              live_data: noChange ? oldLive || newLive : newLive
            }
            // 修改对where赋值的判断,比赛结束后隐藏比赛详情左上角的live, match_status有可能会变为0
            this.where = statusFlag ? 'live' : this.clearFn() || ''
            // 如果是足球则展示main
            if (data.sport_id == 1 && type) this.chooseId = 1

            // seo 内容调整
            this.seoChange(
              {
                route: this.$route,
                app: this,
                store: this.$store
              },
              data
            )
          }
        })
        .catch(() => (this.isRequestFailed = 1))
    },
    // live赛事获取详情信息
    getliveInfoV2(id) {
      this.liveTime.data = 5
      return this.$axios_api
        .matchInfoV2({
          match_id: this.matchId,
          platform: this.platform,
          token: this.token,
          market_group: id || 0
        })
        .then((res) => {
          const { code, data } = res
          if (code === 0) {
            const clarr = this.editResultFn(data.result)
            // 返回数据未锁住且记录已锁住则立即刷新meta
            if (!data.is_lock && this.is_lock) this.liveTime.meta = 0
            this.is_lock = data.is_lock
            // 下标大于0为单项更新, 小于0更新所有
            id > 0
              ? (this.liveDataObj = { ...this.liveDataObj, [id]: clarr })
              : (this.result = clarr)
          }
        })
        .catch(() => (this.isRequestFailed = 1))
    },
    // 接口返回数据处理 返回处理后数据
    editResultFn(rlist) {
      const newlist = []
      rlist.forEach((item) => {
        const mid = Number(item[0].market_id.split('/')[1])
        if (this.midObjFn(mid)) {
          const newItem = []
          item.forEach((a) => {
            const ma = this.midObjFn(mid)(a, newItem)
            // 返回0表示此market不显示
            // eslint-disable-next-line no-unused-expressions
            ma ? newItem.push(ma) : ''
          })
          if (newItem.length) newlist.push(newItem)
        } else newlist.push(item)
      })
      return newlist
    },
    // mid数组处理方法
    midObjFn(id) {
      // 超过两个outcome禁止投注，则隐藏掉该market
      if ([1, 10].includes(id)) return this.exceedTwoFn
      // 隐藏掉禁止投注outcome
      if ([21, 23, 24, 45, 71, 81, 100, 101].includes(id))
        return this.hideCanNotBetFn
      // 最多显示3个market
      if ([18, 19, 20, 68, 90].includes(id)) return this.hideMoreFn
    },
    // 超过两个outcome禁止投注(outcome为1)，则隐藏掉该market
    exceedTwoFn(data) {
      const { outcomes } = data
      const arr = outcomes.filter((a) => a.odds <= 1)
      return arr.length >= 2 ? 0 : data
    },
    // 隐藏掉禁止投注outcome(outcome为1)
    hideCanNotBetFn(data) {
      const { outcomes } = data
      const arr = outcomes.filter((a) => a.odds > 1)
      return arr.length ? { ...data, outcomes: arr } : 0
    },
    // 最多显示3个market outcome其中一项小于1.05，隐藏所属market
    hideMoreFn(data, arr) {
      // 大于3个不执行
      if (arr.length > 2) return 0
      const { outcomes } = data
      const finda = outcomes.find((a) => a.odds < 1.05)
      // 传0不添加
      return finda ? 0 : data
    },
    // 点击滚动至顶部
    clickToTop() {
      this.$refs.matchDetail.scrollIntoView()
      this.IconShow = 0
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

.cl-topBox {
  position: fixed;
  top: 0;
  width: 10rem;
  z-index: 1;
}

.cl-matchDetailLive-wrap {
  min-height: 100vh;
  background-color: #000;

  .cl-myFavorite {
    .cl-noFavoriteImage {
      opacity: 0.8;
    }

    .cl-art {
      text-align: center;
      color: #fff;

      .cl-care {
        display: inline-block;
        .sprite(@icon-nocare, 108rem);
      }
    }
  }
}

.cl-matchDetailContentBox {
  /*padding-bottom: 100rem/36;*/

  .cl-myFavorite {
    .cl-noFavoriteImage {
      width: 290rem/36;
      height: 180rem/36;
      margin: 30rem/36 auto 0;

      img {
        width: 290rem/36;
        height: 180rem/36;
      }
    }

    .cl-art {
      text-align: center;
      color: #363636;

      .cl-care {
        border: 1px solid #fff;
        background-color: #fff;
        border-radius: 2rem/36;
        display: inline-block;
        .sprite(@icon-nocare, 108rem);
      }
    }
  }
}
</style>
