<template>
  <div class="cl-accountMybetBox-wrap">
    <div class="cl-container">
      <div class="cl-tabs">
        <div class="cl-top">
          <div v-for="(item, index) in tab" :key="index">
            <template v-if="item.index !== 2">
              <div
                class="cl-flexcc cl-item"
                :class="{ 'cl-itemChoosed': ticket_category === item.index }"
                @click="changeCategory(item.index)"
              >
                <h2 class="cl-h2" v-html="item.text" />
              </div>
            </template>
          </div>
          <div
            class="cl-topLine"
            :style="{ left: topLineLeft(4, ticket_category) }"
          />
        </div>
      </div>

      <accoutMybetBoxFilter
        :key="ticket_category"
        :where="filterWhere"
        @getShowResult="getShowResult"
      />
      <!-- 新版app刷新数据需要的dom 勿删 -->
      <div class="cl-appUpdateUserBetData" @click="upBetData" />

      <dataError v-if="isRequestFailed" />
      <div v-else>
        <div v-if="requestLoading">
          <div v-if="result.length > 0" class="cl-list">
            <div v-for="(item, index) in result" :key="index">
              <div v-if="showDateList[index]" class="cl-date">
                <div
                  v-if="item.created_at || item.bet_date"
                  class="cl-dateFont"
                >
                  {{
                    getDate(
                      ticket_category === 4 ? item.bet_date : item.created_at,
                      'dd'
                    )
                  }}
                  {{
                    $t(
                      `accountMybetDetailBox.months[${
                        getDate(
                          ticket_category === 4
                            ? item.bet_date
                            : item.created_at,
                          'M'
                        ) - 1
                      }]`
                    )
                  }}
                </div>
              </div>
              <div class="cl-item" @click="goMybetDetail(item)">
                <div class="cl-flexcb cl-top">
                  <div class="cl-left">
                    {{ $t('accountMybetBox.bet_id') }}
                    <span
                      >#{{
                        ticket_category === 4 ? item.bet_id : item.ticket_id
                      }}</span
                    >
                  </div>
                  <div class="cl-right">
                    {{ $t('unit') }}
                    {{
                      ticket_category === 4 ? item.payout : item.win?.toFixed(2)
                    }}
                  </div>
                </div>

                <div class="cl-flexcb cl-bottom">
                  <div class="cl-left">
                    {{
                      getDate(
                        ticket_category === 4 ? item.bet_date : item.created_at,
                        'dd/MM, HH:mm'
                      )
                    }}
                    <span class="cl-stake"
                      >{{ $t('betslipPlaceBet.stake') }}
                      {{
                        ticket_category === 4
                          ? item.free_stake
                          : item.stake?.toFixed(2)
                      }}</span
                    >
                  </div>

                  <div>
                    <div v-for="(a, b) in 5" :key="b">
                      <div
                        v-if="item.ticket_status === b || item.bet_result === b"
                        class="cl-right"
                        :class="'no-status' + (b + 1)"
                      >
                        {{ $t('accountMybetBox.ticket_status' + (b + 1)) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="index === 0">
                <claimSCom>
                  <template #last>
                    <div v-if="bannerItem && bannerIsShow" class="cl-banner">
                      <img
                        :src="bannerItem.image"
                        @click="itemClick(bannerItem)"
                      />
                    </div>
                  </template>
                </claimSCom>
              </template>
            </div>
          </div>

          <dataNoResult v-else />
        </div>

        <dataLoading v-else />
      </div>
      <client-only>
        <InfiniteLoading :identifier="infiniteId" @infinite="onInfinite">
          <span slot="no-more" />
          <span slot="no-results" />
          <span slot="spinner" />
        </InfiniteLoading>
      </client-only>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import accoutMybetBoxFilter from '@/components/components/accoutMybetBoxFilter.vue'
import claimSCom from '@/components/components/claimCom/claimSCom.vue'

export default {
  components: {
    InfiniteLoading,
    accoutMybetBoxFilter,
    claimSCom
  },
  inject: ['openGame'],
  data() {
    return {
      token: '', // 用户
      ticket_date_type: 0, // 0 all 1 active 2 today 3 week 4 month
      ticket_category: 0, // 0 normal 1 jackpot
      page: 1,
      result: [], // 循环体
      infiniteId: +new Date(),
      isRequestFailed: false,
      requestLoading: false,
      showDateList: [],
      showResult: [],
      ticket_status: -1,
      win_query: -1,
      listData: [], // banner原始数据(未处理)
      bannerIsShow: 0, // banner加载完成后显示
      isFristData: true, // 是否第一次加载数据
      tab: [
        {
          text: this.$t('accountMybetBox.ticket_category')[0],
          index: 0
        },
        {
          text: this.$t('accountMybetBox.ticket_category')[1],
          index: 4
        },
        {
          text: this.$t('accountMybetBox.ticket_category')[2],
          index: 1
        },
        {
          text: this.$t('accountMybetBox.ticket_category')[3],
          index: 2
        },
        {
          text: this.$t('accountMybetBox.ticket_category')[4],
          index: 3
        }
      ],
      isDebouncing: false
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
      const nowTime = new Date().getTime() / 1000
      const bannerObj = this.listData.find(
        (item) => this.statusArr(item.user_status) && item.end_time > nowTime
      )
      if (bannerObj)
        Lib.common.loadImage(bannerObj.image, () => (this.bannerIsShow = 1))
      else this.bannerIsShow = 0
      return bannerObj
    },
    platform() {
      return this.$store.state.platform
    },
    xfootball_host() {
      return process.env.xFootball_URL_WEB
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    filterWhere() {
      return this.ticket_category === 4 ? 'freeBetList' : ''
    },
    strKey() {
      return this.ticket_category === 4
        ? this.freeBet_status
        : `${this.ticket_date_type}_${this.ticket_category}`
    }
  },
  watch: {
    $route(to, from) {
      // isRefresh: 需要刷新
      const routeNameArr = ['mybetDetail', 'mybet']
      const isRefresh = sessionStorage.getItem('updateUserBetData')
      if (
        !(
          routeNameArr.includes(to.name) &&
          routeNameArr.includes(from.name) &&
          !isRefresh
        )
      ) {
        // 重置数据
        if (to.name === 'mybet') {
          setTimeout(() => {
            this.isFristData = true
            this.upBetData()
            sessionStorage.removeItem('updateUserBetData')
          }, 100)
        }
      }
    }
  },
  mounted() {
    this.token = Lib.common.decrypt(Lib.store.get('token') || '')
    this.getData()
    // 是否传参处理
    const ticketDataArr = [
      this.$route.query.ticket_date_type,
      this.$route.query.ticket_category
    ]
    if (ticketDataArr[0] || ticketDataArr[0] === 0) {
      this.ticket_date_type = Number(ticketDataArr[0])
    }
    if (ticketDataArr[1] || ticketDataArr[1] === 0) {
      this.ticket_category = Number(ticketDataArr[1])
    }

    // 判断是否从hottestTickets过来
    if (this.$route.params && this.$route.params.from === 'hottestTickets')
      this.getIsShowTips()
  },
  methods: {
    // app刷新数据
    upBetData() {
      this.page = 1
      this.result = []
      this.infiniteId++
      this.isRequestFailed = false
      this.requestLoading = false
    },
    // 获取history
    getMybet($state, first) {
      const strKey = this.strKey
      const ticket_category = this.ticket_category
      const obj =
        this.ticket_category === 4
          ? {
              token: this.token,
              status: this.freeBet_status
            }
          : {
              token: this.token,
              platform: this.platform,
              ticket_date_type: this.ticket_date_type,
              ticket_category: this.ticket_category,
              page: this.page
            }
      if (this.ticket_status !== -1) obj.ticket_status = this.ticket_status
      if (this.win_query !== -1) obj.win_query = this.win_query
      // 更新数据动画
      if (first) this.requestLoading = false
      ;(this.ticket_category === 4
        ? this.$axios_api.freeBetOrder(obj)
        : this.$axios_api.ticketHistory(obj)
      )
        .then((res) => {
          // 如果请求Key请求和当前key不想等，那么久不需要判断下面的状态了
          if (strKey !== this.strKey) {
            return
          }
          this.$prefetchRoutes(['mybetDetail/_ticketId'])
          this.isRequestFailed = false
          this.requestLoading = true

          if (res.code === 0) {
            this.page++
            let arr = ticket_category === 4 ? res.data : res.data.result
            if ($state !== undefined) {
              if (ticket_category === 4) {
                $state.complete()
              } else {
                arr.length < 10 ? $state.complete() : $state.loaded()
              }
            }
            if (this.win_query === 1 && ticket_category === 4) {
              arr = arr.filter((item) => item.bet_result === 2)
            }
            this.result = this.result.concat(arr)
            this.getShowDateList()
          } else if (res.code === 10101) {
            this.$prefetchRoutes(['login'])
            Lib.common.errorReminder(
              this,
              'login',
              '',
              '',
              this.$t('reminder.unLogin'),
              '',
              this.$t('reminder.button.ok')
            )
          }
          this.requestLoading = true
        })
        .catch((e) => {
          if (e.message === 'tabs change, hand cancel') {
            // 取消的不显示错误
            return
          }
          this.isRequestFailed = true
          this.requestLoading = true
        })
        .finally(() => {})
    },
    // 检测当前是否有可分享的比赛,没有进行提示
    getIsShowTips() {
      const obj = {
        token: this.token,
        platform: this.platform,
        ticket_date_type: 2,
        ticket_category: 0,
        page: 1,
        ticket_status: 0
      }
      this.$axios_api.ticketHistory(obj).then((res) => {
        if (res.code === 0) {
          if (res.data.result.length <= 0)
            Lib.common.errorReminderUp(
              this,
              true,
              this.$t('hottestTickets.noTickets'),
              0
            )
        }
      })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 获取是否展示date的数组
    getShowDateList() {
      let date = ''
      const arr = []
      // eslint-disable-next-line array-callback-return
      this.result.map((item) => {
        const str = this.getDate(
          this.ticket_category === 4 ? item.bet_date : item.created_at,
          'dd/MM'
        )

        if (date !== str) {
          arr.push(true)
          date = str
        } else arr.push(false)
      })
      this.showDateList = arr
    },
    // 滚动方法
    onInfinite($state) {
      if (this.isFristData) {
        this.isFristData = false
        this.getMybet($state, true)
      } else this.getMybet($state)
    },
    // 根据用户需要进行过滤
    getShowResult(e) {
      if (!this.isDebouncing) {
        this.openLoading()
        this.isDebouncing = true
      }
      this.reqDecision(e)
    },
    // 在正式发送请求之前进行防抖操作
    reqDecision: Lib.common.deBounce(function (e) {
      this.isDebouncing = false
      // 清除还没完成的请求
      this.qxqq()
      if (e.reqDecisionType === 1) {
        this.ticket_status = -1
        this.freeBet_status = 0
        this.win_query = -1
        this.ticket_date_type = 1
      } else {
        const arr = [-1, 1, 0]
        e.checked === true ? (this.win_query = 1) : (this.win_query = -1)
        this.ticket_status = arr[e.index]
        this.freeBet_status = e.index
      }

      this.page = 1
      this.result = []
      this.infiniteId += 1
      this.isRequestFailed = false
    }, 500),
    // 打开加载动画
    openLoading() {
      this.requestLoading = false
    },
    // 修改种类
    changeCategory(index) {
      this.ticket_category = index
      this.getShowResult({ reqDecisionType: 1 })
    },
    // 修改日期
    changeDate(index) {
      this.ticket_date_type = index
      this.result = []
      this.page = 1
      this.infiniteId += 1
      this.isRequestFailed = false
      this.requestLoading = false
    },
    // 前往详情页
    goMybetDetail(item) {
      this.$router.push({
        path: `/${this.$store.state.root.locale}/mybetDetail/${
          this.ticket_category === 4 ? item.bet_id : item.ticket_id
        }`
      })
    },
    // banner点击事件
    itemClick(item) {
      if (item.eventName) Lib.common.event_statistics(item.eventName)
      return Lib.common.openWay(item.open, this)(item)
    },
    // 获取数据
    getData() {
      const locale = this.$store.state.root.locale // 获取语言
      const dataSTR = 'mybetBannerData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
      let askFlag = false // 记录是否更新
      // 查询本地时间, true更新
      if (Lib.common.getBackstageDataIsRefresh(dataSTR, 'inquire'))
        askFlag = true
      const data = Lib.store.get(dataSTR) // 获取本地数据
      // 查询本地数据是否完整
      // 完整,优先使用本地数据
      if (Array.isArray(data) && data.length) {
        this.listData = data
      }
      // 数据被破坏
      else askFlag = true
      // 可以请求
      if (askFlag) {
        // 1.5秒后请求,不占主业务请求
        setTimeout(() => {
          // 获取数据
          this.$axios_api.getBackstageBanner({ type: 4 }).then((res) => {
            // 成功
            if (res.code === 0 && Array.isArray(res.data.mybets_banner)) {
              // 存入本地, 修改本地时间, 更新数据
              Lib.store.set(dataSTR, res.data.mybets_banner)
              Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
              this.listData = res.data.mybets_banner
            }
          })
        }, 1500)
      }
    },
    // 下划线left定位
    topLineLeft(len, index) {
      const arr = len === 4 ? [0, 2, 0, 3, 1] : []
      const onelang = 360 / len
      const left = (onelang - 33) / 2
      return (left + arr[index] * onelang) / 36 + 'rem'
    },
    // 取消请求
    qxqq() {
      // 跳转页面时取消未结束的请求
      try {
        const reqObj = this.$store.state.pathCancelReq['lang-mybet']
        if (reqObj) {
          for (const key in reqObj) reqObj[key]('tabs change, hand cancel')
        }
      } catch (e) {}
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountMybetBox-wrap {
  width: 100%;

  .cl-appUpdateUserBetData {
    display: none;
  }

  .cl-banner {
    img {
      width: 100%;
    }
  }

  .cl-container {
    .cl-tabs {
      height: 30rem/36;
      background-color: #fff;
      color: #000;

      .cl-top {
        position: relative;
        height: 30rem/36;
        display: flex;
        align-items: center;

        .cl-item {
          height: 30rem/36;
          width: 90rem/36;
          text-transform: capitalize;
          font-size: 11rem/36;
          text-align: center;
          color: @tabNoColor;
          font-weight: bold;
        }

        .cl-itemChoosed {
          color: @tabColor;
        }

        .cl-topLine {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 33rem/36;
          height: 3rem/36;
          border-radius: 2rem/36;
          background-color: @tabColor;
          transition: left 200ms linear;
        }
      }

      .cl-bottom {
        box-sizing: border-box;
        padding: 5rem/36;

        .cl-item {
          border-radius: 3rem/36;
          width: 65rem/36;
          height: 30rem/36;
          background-color: #e8f0f2;
          text-transform: uppercase;
        }

        .cl-itemChoosed {
          background-color: #fdda06;
        }
      }
    }

    .cl-list {
      .cl-date {
        height: 26rem/36;
        background-color: #f7f7f7;
        display: flex;
        align-items: center;
        padding-left: 10rem/36;

        .cl-dateFont {
          font-size: 10rem/36;
          font-weight: 400;
          color: #74747c;
          text-transform: uppercase;
        }
      }

      .cl-item {
        background-color: #fff;
        font-size: 11rem/36;
        box-sizing: border-box;
        padding: 10rem/36;
        color: #000;

        .cl-top {
          line-height: 11rem/36;
          font-weight: bold;

          .cl-left {
            color: #363636;
            text-transform: uppercase;
          }
        }

        .cl-bottom {
          font-weight: 400;
          font-size: 10rem/36;
          line-height: 10rem/36;
          margin-top: 10rem/36;

          .cl-left {
            color: #a2a2a7;

            .cl-stake {
              padding-left: 10rem/36;
              color: #515151;
            }
          }

          .cl-right {
            color: #fff;
            text-transform: uppercase;
          }

          .no-status1 {
            color: @mainThemeColor;
          }

          .no-status2 {
            color: #404040;
          }

          .no-status3 {
            color: @myBetWon;
          }

          .no-status4 {
            color: #a2a2a7;
          }

          .no-status5 {
            color: #6dd400;
          }
        }
      }
    }
  }
}
</style>
