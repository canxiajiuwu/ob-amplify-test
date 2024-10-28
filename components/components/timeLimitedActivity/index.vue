<template>
  <div class="cl-timeLimitedActivity_index_wrap">
    <birthdayBox
      v-if="isShowBirthdayBox"
      :end-reminder="endReminder"
      :time="birthdayBoxTime"
      :activity-info="activityInfo"
      @emitBirthdayBoxClick="emitBirthdayBoxClick"
    />
    <drawer
      :visible.sync="isShowActivityDetails"
      type="bottom"
      height="auto"
      z-index="20"
      :mask-click="true"
    >
      <activityDetails
        :time="birthdayBoxTime"
        :activity-info="activityInfo"
        :token="token"
        @emitInstruction="emitInstruction"
        @emitJoin="emitJoin"
      />
    </drawer>
    <drawer
      :visible.sync="isShowActivityResults"
      type="middle"
      width="auto"
      height="auto"
      z-index="20"
      :border-radius="9"
      :mask-click="true"
    >
      <activityResults
        :activity-results-info="activityResultsInfo"
        @emitCloseActivityResults="emitCloseActivityResults"
      />
    </drawer>
    <drawer
      :visible.sync="isShowActivityInstruction"
      type="bottom"
      height="auto"
      z-index="20"
      :mask-click="true"
    >
      <activityInstruction
        @emitCloseActivityInstruction="emitCloseActivityInstruction"
      />
    </drawer>
  </div>
</template>

<script>
import birthdayBox from './birthdayBox.vue'
import activityDetails from './activityDetails.vue'
import activityResults from './activityResults.vue'
import activityInstruction from './activityInstruction.vue'
import { bindHistoryEvent } from '@/assets/js/utils/selectMatch.js'
import Lib from '@/assets/js/Lib'

export default {
  name: 'TimeLimitedActivityIndex',
  components: {
    birthdayBox,
    activityDetails,
    activityResults,
    activityInstruction
  },
  props: {
    token: {
      type: String
    }
  },
  data() {
    return {
      activityInfo: {}, // 活动信息
      recordActivityInfo: {}, // 记录用户参加过的活动，再页面切换时判断活动是否到了开奖时间，到了就帮用户开奖
      activityResultsInfo: {}, // 开奖信息
      birthdayBoxTime: '00:00',
      isShowBirthdayBox: false, // 控制展示礼物盒子
      isShowActivityDetails: false, // 控制展示活动详情
      isShowActivityResults: false, // 控制展示活动结果
      isShowActivityInstruction: false, // 控制活动说明
      endReminder: false, // 30S提示
      eventPage: [], // 活动页面数组
      timer: null, // 定时器
      fulfillCondition: null, // 满足活动的ID信息
      timer2: null,
      timer3: null,
      timer4: null
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    statusArrData() {
      return [
        '',
        1,
        !this.accountInfo,
        !!this.accountInfo,
        this.accountInfo && !this.accountInfo.first_deposit_activity,
        !this.accountInfo || !this.accountInfo.first_deposit_activity,
        this.accountInfo && this.accountInfo.first_deposit_activity
      ]
    },
    routeName() {
      return this.$route.name
    }
  },
  watch: {
    $route(to, from) {
      if (['index', 'lang', 'lang-refer'].includes(to.name)) {
        // 更新活动页面数组
        this.updateActivityPage()
      }
      this.leavePage(from)
      this.timer2 && clearInterval(this.timer2)
      this.timer4 && clearTimeout(this.timer4)
      this.timer2 = setInterval(() => {
        if (document.readyState === 'complete') {
          this.goPage(to)
          this.timer2 && clearInterval(this.timer2)
        }
      }, 1000)
    }
  },
  mounted() {
    this.eventPage = Lib.store.get('eventPage') || []
    this.recordActivityInfo = Lib.store.get('recordActivityInfo') || {}
    history.replaceState = bindHistoryEvent('replaceState')
    window.obTimeLimitedActivityGetEventInfo = this.getEventInfo
    if (['index', 'lang', 'lang-refer'].includes(this.routeName)) {
      // 更新活动页面数组
      this.updateActivityPage()
    }
    this.timer2 = setInterval(() => {
      if (document.readyState === 'complete') {
        this.goPage(this.$route)
        this.timer2 && clearInterval(this.timer2)
      }
    }, 1000)
  },
  beforeDestroy() {
    window.obTimeLimitedActivityGetEventInfo = undefined
    this.timer2 && clearInterval(this.timer2)
  },
  methods: {
    // 将查看过了的活动存到cookie里，方便下次使用
    setCookie(name, value, perpetual) {
      const exdate = new Date(perpetual)
      document.cookie =
        name +
        '=' +
        value +
        ';expires=' +
        exdate.toGMTString() +
        ';' +
        ';path=/'
    },
    // 读取cookie中的那些活动查看过了
    getCookie(name) {
      const { cookie } = document
      const result = cookie.match(new RegExp(`${name}=(?<name>\\w+)`))
      return result && result.groups && result.groups.name
    },
    measureTimeFun() {
      if (!this.activityInfo.id) return
      const timingDifference =
        this.activityInfo.end_time * 1000 - new Date().getTime()
      if (timingDifference > 0) {
        // 如果倒计时小于30s,那么开始提醒
        if (timingDifference < 30000) {
          this.endReminder = true
        }
        const hours = Math.floor(
          (timingDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
          (timingDifference % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((timingDifference % (1000 * 60)) / 1000)
        this.birthdayBoxTime = `${
          hours ? this.padZero(hours) + ':' : ''
        }${this.padZero(minutes)}:${this.padZero(seconds)}`
      } else {
        this.birthdayBoxTime = '00:00'
        clearInterval(this.timer)
        this.timer = null
        this.timer4 = setTimeout(() => {
          // if (this.activityInfo.is_join) {
          this.lottery(this.activityInfo)
          // }
          this.reset()
        }, 2000)
      }
    },
    // 开启定时器，算出倒计时
    measureTime() {
      this.measureTimeFun()
      this.timer = setInterval(this.measureTimeFun, 1000)
    },
    reset() {
      this.isShowBirthdayBox = false
      this.isShowActivityResults = false
      this.isShowActivityDetails = false
      this.isShowActivityInstruction = false
      this.endReminder = false
      this.fulfillCondition = null
      this.activityInfo = {}
    },
    // 离开页面
    leavePage(from) {
      /**
       * 如果活动页面数组中有这个页面
       * 1 展示限时活动关闭 showTimeLimitedActivity
       * 2 endReminder 盒子状态回归初始化
       * 3 离开时，如果用户已参与活动，那么将这个保存到recordActivityInfo
       * 无论哪个页面都将开奖结果页面关闭就好了
       */
      // 是活动页面，并且有满足的活动
      if (this.eventPage.includes(from.name) && this.activityInfo.id) {
        if (this.timer3) clearTimeout(this.timer3)
        this.reset()
      }
    },
    // 进入页面
    goPage(to) {
      /**
       * 1 如果是主页，那么重新获取活动页面数组
       * 2 如果页面满足活动页面，那么去获取活动详情，并根据活动详情算出对应状态
       * 3 查询用户参加了的活动数组是不是有没开奖的，有就去开奖
       */
      if (this.eventPage.includes(to.name)) {
        // 是活动页面
        this.getEventDetails(to.name)
      } else {
        //  其他情况说明没得活动了，把定时器关了
        // eslint-disable-next-line no-lonely-if
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
      for (const key in this.recordActivityInfo) {
        if (
          this.recordActivityInfo[key].end_time <=
          new Date().getTime() / 1000
        ) {
          // 有活动结束了，去开奖
          this.lottery(this.recordActivityInfo[key])
          break
        }
      }
    },
    // 更新活动页面数组
    updateActivityPage() {
      this.$axios_api.luckybagConfig({}).then((res) => {
        if (res.code === 0) {
          const arr = []
          res.data.forEach((item) => {
            for (const key in item) {
              arr.push(item[key])
            }
          })
          this.eventPage = Array.from(new Set(arr))
          Lib.store.set('eventPage', this.eventPage)
        }
      })
    },
    // 是否满足从注册类型活动过来的，完成了参与条件的
    fulfillmentRegistrationRequirements(item, timeLimitedActivityRegisterArr) {
      return (
        timeLimitedActivityRegisterArr &&
        this.accountInfo &&
        timeLimitedActivityRegisterArr[0] == item.id &&
        timeLimitedActivityRegisterArr[1] == this.accountInfo.uid
      )
    },
    // 判断是否满足展示条件
    getShow(item, timeLimitedActivityRegisterArr) {
      return (
        this.statusArrData[item.pop_status] ||
        this.fulfillmentRegistrationRequirements(
          item,
          timeLimitedActivityRegisterArr
        )
      )
    },
    // 获取活动的展示信息，满足条件再去活动活动详情
    async getEventDetails(name) {
      const result = await this.$axios_api.luckybagList({
        type: name
      })
      const timeLimitedActivityRegisterArr =
        this.getCookie('TLAR') && this.getCookie('TLAR').split('_')
      if (result.code === 0) {
        for (let i = 0; i < result.data.length; i++) {
          if (this.getShow(result.data[i], timeLimitedActivityRegisterArr)) {
            this.fulfillCondition = result.data[i]
            break
          }
        }
      }
      if (this.fulfillCondition) {
        this.getEventInfo()
      }
    },
    getEventInfo(isUpdate) {
      if (!this.fulfillCondition) return
      this.$axios_api
        .luckybagInfo({
          id: this.fulfillCondition.id,
          token: this.token
        })
        .then((res) => {
          // 首先返回要正确，其次不能是个空数组，也不能在页面已经切换了才返回这个页面的
          if (
            res.code === 0 &&
            !Array.isArray(res.data) &&
            res.data.page.includes(this.routeName)
          ) {
            this.activityInfo = res.data
            if (!isUpdate) {
              !this.timer && this.measureTime()
              this.isShowBirthdayBox = true
            }
          }
          // 看下是否是注册过来的，是的话把活动信息保存起来，页面切换开奖用
          const timeLimitedActivityRegisterArr =
            this.getCookie('TLAR') && this.getCookie('TLAR').split('_')
          if (
            res.code === 0 &&
            this.fulfillmentRegistrationRequirements(
              res.data,
              timeLimitedActivityRegisterArr
            )
          ) {
            // 如果用户参与并且保存活动信息的对象里面没有，那么久保存起来
            if (!this.recordActivityInfo[res.data.id]) {
              this.recordActivityInfo[res.data.id] = res.data
              Lib.store.set('recordActivityInfo', this.recordActivityInfo)
            }
          }
        })
    },
    padZero(number) {
      // 在个位数前面补零
      return number < 10 ? '0' + number : number
    },
    // 开奖
    lottery(activity) {
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .luckybagRecord({
          id: activity.id,
          token: this.token,
          round: activity.round
        })
        .then((res) => {
          if (res.code === 0) {
            this.activityResultsInfo = res.data
            this.isShowActivityResults = true
            this.$store.commit('changeLoadingStatus', false)
            if (this.recordActivityInfo[activity.id]) {
              delete this.recordActivityInfo[activity.id]
              Lib.store.set('recordActivityInfo', this.recordActivityInfo)
            }
            if (!res.data.is_win) return
            if (
              res.data.award_type === 5 &&
              this.routeName === 'lang-onebetLeague'
            ) {
              sessionStorage.setItem('onebetLeagueCountRefresh', 1)
            }
            if (res.data.award_type !== 5) {
              this.getInfo()
            }
          } else if (res.code === 1) {
            // 还没有开奖，延时1S再去开奖
            this.timer3 = setTimeout(() => {
              this.lottery(activity)
              this.timer3 = null
            }, 1000)
          } else {
            this.$store.commit('changeLoadingStatus', false)
            if (this.recordActivityInfo[activity.id]) {
              delete this.recordActivityInfo[activity.id]
              Lib.store.set('recordActivityInfo', this.recordActivityInfo)
            }
          }
        })
        .catch(() => {
          this.$store.commit('changeLoadingStatus', false)
        })
    },
    // 开奖成功重新获取用户信息
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
        }
      })
    },
    // 点击盒子去看活动具体情况
    emitBirthdayBoxClick() {
      // 再次获取最新活动信息
      this.getEventInfo(true)
      this.isShowActivityDetails = true
    },
    emitInstruction() {
      this.isShowActivityInstruction = true
    },
    // 用户加入活动
    emitJoin() {
      this.isShowActivityDetails = false
      this.activityInfo = { ...this.activityInfo, is_join: 1 }
      // 如果用户参与并且保存活动信息的对象里面没有，那么久保存起来
      if (!this.recordActivityInfo[this.activityInfo.id]) {
        this.recordActivityInfo[this.activityInfo.id] = this.activityInfo
        Lib.store.set('recordActivityInfo', this.recordActivityInfo)
      }
    },
    // 关闭
    emitCloseActivityResults() {
      this.isShowActivityResults = false
    },
    emitCloseActivityInstruction() {
      this.isShowActivityInstruction = false
    }
  }
}
</script>
<style scoped lang="less">
.cl-timeLimitedActivity_index_wrap {
  z-index: 20;
}
</style>
