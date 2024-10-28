<template>
  <div class="cl-hottestTicketsReward-wrap">
    <div class="cl-head">
      <headBack
        :title="$t('hottestTickets.Reward')"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div style="height: calc(15rem / 36)" />
    <div class="cl-firstBox">
      <div class="cl-flexcc cl-top">
        <div>-</div>
        <h2 class="cl-h2 cl-middle">{{ $t('hottestTickets.weeklyTop') }}</h2>
        <div>-</div>
      </div>

      <div style="height: calc(10rem / 36)" />
      <div class="cl-flexcc cl-smiddle">
        {{ getMonthWeek() }} {{ $t('hottestTickets.week') }}
      </div>
      <div style="height: calc(10rem / 36)" />

      <div class="cl-ListBox">
        <div class="cl-flexcc cl-ListTitle">
          <div
            class="cl-flexcc cl-ListTitleItem"
            :style="{ width: widthList[index] / 36 + 'rem' }"
            v-for="(item, index) in $t('hottestTickets.topList')"
            :key="index"
            :class="{ 'cl-borderRight': index === 2 }"
          >
            {{ item }}
          </div>
        </div>
        <div class="cl-List" v-if="shareRewardList.week.length">
          <div v-for="(item, index) in shareRewardList.week" :key="index">
            <div class="cl-flexcc cl-ListItem">
              <div
                class="cl-flexcc cl-itemA"
                :style="{ width: widthList[0] / 36 + 'rem' }"
              >
                {{ item.mobile }}
              </div>
              <div
                class="cl-flexcc cl-itemA"
                :style="{ width: widthList[1] / 36 + 'rem' }"
              >
                {{ item.count }}
              </div>
              <div
                class="cl-flexcc cl-itemA"
                v-html="
                  bigCake.week[`${item.cash}-${item.free_bet}-${item.gift}`]
                "
                :style="{ width: widthList[2] / 36 + 'rem' }"
              />
            </div>
          </div>
        </div>

        <!-- 无数据展示 -->
        <div class="cl-List" v-else>
          <div class="cl-flexcc cl-ListItem">
            <div
              class="cl-flexcc cl-itemB"
              :style="{ width: widthList[0] / 36 + 'rem' }"
            >
              -
            </div>
            <div
              class="cl-flexcc cl-itemB"
              :style="{ width: widthList[1] / 36 + 'rem' }"
            >
              -
            </div>
            <div
              class="cl-flexcc cl-itemB"
              :style="{ width: widthList[2] / 36 + 'rem' }"
            >
              -
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="height: calc(30rem / 36)" />
    <div class="cl-secondBox">
      <div class="cl-flexcc cl-top">
        <div>-</div>
        <h2 class="cl-h2 cl-middle">{{ $t('hottestTickets.yesterdayTop') }}</h2>
        <div>-</div>
      </div>
      <div style="height: calc(15rem / 36)" />
      <div class="cl-ListBox">
        <div class="cl-flexcc cl-ListTitle">
          <div
            class="cl-flexcc cl-ListTitleItem"
            :style="{ width: widthList[index] / 36 + 'rem' }"
            v-for="(item, index) in $t('hottestTickets.topList')"
            :key="index"
            :class="{ 'cl-borderRight': index === 2 }"
          >
            {{ item }}
          </div>
        </div>
        <div class="cl-List" v-if="shareRewardList.day.length">
          <div v-for="(item, index) in shareRewardList.day" :key="index">
            <div class="cl-flexcc cl-ListItem">
              <div
                class="cl-flexcc cl-itemB"
                :style="{ width: widthList[0] / 36 + 'rem' }"
              >
                {{ item.mobile }}
              </div>
              <div
                class="cl-flexcc cl-itemB"
                :style="{ width: widthList[1] / 36 + 'rem' }"
              >
                {{ item.count }}
              </div>
              <div
                class="cl-flexcc cl-itemB"
                v-html="bigCake.day[`${item.cash}`]"
                :style="{ width: widthList[2] / 36 + 'rem' }"
              />
            </div>
          </div>
        </div>

        <!-- 无数据展示 -->
        <div class="cl-List" v-else>
          <div class="cl-flexcc cl-ListItem">
            <div
              class="cl-flexcc cl-itemB"
              :style="{ width: widthList[0] / 36 + 'rem' }"
            >
              -
            </div>
            <div
              class="cl-flexcc cl-itemB"
              :style="{ width: widthList[1] / 36 + 'rem' }"
            >
              -
            </div>
            <div
              class="cl-flexcc cl-itemB"
              :style="{ width: widthList[2] / 36 + 'rem' }"
            >
              -
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="height: calc(30rem / 36)" />
    <div class="cl-thirdBox">
      <div class="cl-flexcc cl-top">
        <div>-</div>
        <h2 class="cl-h2 cl-middle">{{ $t('hottestTickets.details') }}</h2>
        <div>-</div>
      </div>

      <div style="height: calc(15rem / 36)" />
      <div class="cl-flexcc">
        <div class="cl-ditailsBox">
          <div
            v-for="(item, index) in $t('hottestTickets.detailsList')"
            :key="index"
          >
            <div class="cl-item">
              <div v-html="item.title"></div>
              <div v-for="(a, b) in item.list" :key="b">
                <template v-if="item.list">
                  <div style="height: calc(5rem / 36)" v-if="b === 0" />
                  <div class="cl-a">
                    <div class="cl-flexcc" style="height: calc(15rem / 36)">
                      <div class="cl-border" />
                    </div>
                    <div v-html="a" />
                  </div>
                  <div
                    style="height: calc(5rem / 36)"
                    v-if="b !== item.list.length - 1"
                  />
                </template>
              </div>
            </div>
            <div style="height: calc(15rem / 36)" />
          </div>
        </div>
      </div>
    </div>
    <div style="height: calc(15rem / 36)" />

    <!-- 中奖通知弹窗 -->
    <drawer
      type="middle"
      :width="9"
      :height="5.5"
      :border-radius="5"
      :visible.sync="rewardVisible"
      :mask-click="false"
    >
      <div style="height: calc(15rem / 36)" />
      <div class="cl-flexcc cl-title">
        {{ $t('hottestTickets.congratulations') }}
      </div>
      <div style="height: calc(20rem / 36)" />
      <div
        class="cl-middleBox"
        v-if="reward && (reward.type == 1 || reward.type == 3)"
      >
        <div class="cl-flexcc cl-fontContent">
          {{
            `
          ${$t('hottestTickets.winningPopUp[0]')}
          ${reward.cash ? reward.cash.toLocaleString('en-US') : null}
          ${hb} cash
          ${
            reward.free_bet
              ? `, +${reward.free_bet.toLocaleString('en-US')} ${hb} Freebet`
              : ''
          }
          ${
            reward.gift
              ? `, +${reward.gift.toLocaleString('en-US')} ${hb} gift`
              : ''
          }
          ${$t('hottestTickets.winningPopUp[2]')}
          ${$t(`hottestTickets.winningPopUp[${reward.type === 3 ? 4 : 3}]`)}
          `
          }}
        </div>
      </div>
      <div class="cl-middleBox" v-if="reward && reward.type == 2">
        <div class="cl-flexcc cl-fontContent">
          {{
            `
          ${$t('hottestTickets.cashBackPopUp')}
          #${reward.ticket_id} !
          `
          }}
        </div>
      </div>
      <div style="height: calc(15rem / 36)" />
      <div class="cl-flexcc">
        <div class="cl-flexcc cl-OkButton" @click="confirm">
          {{ $t('jackpotsWeeklyCash.noticeWinning.ok') }}
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  components: { headBack },
  data() {
    return {
      // 中奖通知容器
      rewardData: [],
      // 奖励弹窗开关
      rewardVisible: false,
      rewardNum: 0,
      // 奖励榜单初始化
      shareRewardList: {
        day: [],
        week: []
      },
      // 榜单宽度
      widthList: [92, 112, 136]
    }
  },
  computed: {
    info() {
      return this.$store.state.info
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    // 用户的大饼
    bigCake() {
      return {
        week: {
          '2000-2000-6000': `
            <div>
            <div>+2,000 XAF cash</div>
            <div>+2,000 XAF Freebet</div>
            <div>+6,000 XAF gift</div>
            </div>
            `,
          '1000-1000-3000': `
            <div>
            <div>+1,000 XAF cash</div>
            <div>+1,000 XAF Freebet</div>
            <div>+3,000 XAF gift</div>
            </div>
            `,
          '500-500-1000': `
            <div>
            <div>+500 XAF cash</div>
            <div>+500 XAF Freebet</div>
            <div>+1,000 XAF gift</div>
            </div>
            `
        },
        day: {
          1000: `+1,000 XAF cash`,
          800: `+800 XAF cash`,
          500: `+500 XAF cash`
        }
      }
    },
    // 计算属性处理中奖容器
    reward() {
      if (this.rewardData.length && this.rewardData[this.rewardNum])
        return this.rewardData[this.rewardNum]
      else return ''
    },
    // 货币
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    this.getShareRewardList()
    // 隐藏skelet
    Lib.common.hideSkeleton()
    this.getShareRewardPopup()
  },
  methods: {
    // 获取当前用户是否中奖
    getShareRewardPopup() {
      this.$axios_api.getShareRewardPopup({ token: this.token }).then((res) => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            this.rewardData = res.data
            // 获取用户是否全部已经提示
            const arr = res.data.map((item) => item.type)
            const flagArr = arr.map((item) => this.isReward(item))
            const index = flagArr.indexOf(true)
            if (index > -1) {
              this.rewardNum = index
              this.rewardVisible = true
            }
          }
        }
      })
    },
    // 获取榜单
    getShareRewardList() {
      this.$axios_api.getShareRewardList({}).then((res) => {
        if (res.code === 0) this.shareRewardList = res.data
      })
    },
    // 根据排名获取不同奖励(周榜)
    getIndex(index) {
      if (index < 3) return 1
      if (index >= 3 && index < 6) return 2
      if (index >= 6) return 3
    },
    // 获取几月第几周
    getMonthWeek() {
      // 现在的时间 再减去七天就是上一周的
      const date = new Date().getTime() - 1000 * 60 * 60 * 24 * 7 // 时间戳
      const newDate = new Date(date)
      const day = newDate.getDate() // 几号
      let month = newDate.getMonth() // 月份
      const year = newDate.getFullYear() // 年份
      let week = newDate.getDay() // 星期几

      // 星期几为0 就是星期天
      if (week === 0) week = 7

      // 获取当月一号星期几 和 这个月第一周前有剩下的天数
      const d = new Date()
      d.setFullYear(year)
      d.setMonth(month)
      d.setDate(1)
      let monthWeek = d.getDay() // 当月1号星期几
      if (monthWeek === 0) monthWeek = 7
      const differDay = monthWeek - 1 // 相差的天数

      // 今天是第几周
      let getWeek = Math.floor((day - differDay) / 7) + 1

      // 如果今天还不是第一个自然周
      if (day - week < 0) {
        month--
        getWeek = 5
      }
      const arr = ['', '1st', '2nd', '3rd', '4th', 'last']

      return `
      ${this.$t(`accountMybetDetailBox.months[${month}]`)}
      ${arr[getWeek]}
      `
    },
    // 中奖通知确认
    confirm() {
      this.setLocalStorage(this.reward.type)
      this.rewardVisible = false
      // 设置500毫秒延时 防止用户看到中奖变化 // 300过快会让组件无法弹出
      setTimeout(() => {
        this.rewardNum++
        if (this.reward) {
          const flag = this.isReward(this.reward.type)
          if (flag) this.rewardVisible = true
        }
      }, 500)
    },
    // 判断是否需要提示中奖 // 返回false表示不用提示或者true
    isReward(type) {
      const arr = Lib.store.get('hottestTicketReward')
      if (Array.isArray(arr) && arr.length) {
        const { getFullYear, getMonth, getDate } = new Date()
        const day = getFullYear() + `/${getMonth() + 1}/` + getDate()
        const week = `${getFullYear()}/${this.getMonthWeek()}`
        if (type == 1) return !(arr[0] && arr[0].time === day)
        if (type == 2) return !(arr[1] && arr[1].time === day)
        if (type == 3) return !(arr[2] && arr[2].time === week)
      } else return true
    },
    // 存储本地阻止反复提示 // 请提示后在调用此方法
    setLocalStorage(type) {
      const arr = Lib.store.get('hottestTicketReward')
      const { getFullYear, getMonth, getDate } = new Date()
      const day = getFullYear() + `/${getMonth() + 1}/` + getDate()
      const week = `${getFullYear()}/${this.getMonthWeek()}`
      if (Array.isArray(arr) && arr.length) {
        const obj = {}
        if (type == 1) (obj.time = day) && (arr[0] = obj)
        if (type == 2) (obj.time = day) && (arr[1] = obj)
        if (type == 3) (obj.time = week) && (arr[2] = obj)
        Lib.store.set('hottestTicketReward', arr)
      } else {
        const arr = [{}, {}, {}]
        if (type == 1) arr[0].time = day
        if (type == 2) arr[1].time = day
        if (type == 3) arr[2].time = week
        Lib.store.set('hottestTicketReward', arr)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cl-hottestTicketsReward-wrap {
  background-color: #fff;

  .cl-head {
    position: fixed;
    top: 0;
    width: 10rem;
  }

  .cl-top {
    white-space: nowrap;
    font-size: 15rem/36;
    font-weight: bold;
    color: #000;
    .cl-middle {
      margin: 0 10rem/36;
    }
  }

  .cl-smiddle {
    white-space: nowrap;
    font-size: 11rem/36;
    font-weight: 400;
    color: #74747c;
  }

  .cl-ListBox {
    width: 340rem/36;
    margin: 0 auto;

    .cl-ListTitle {
      font-size: 11rem/36;
      font-weight: 400;
      color: #fff;
      .cl-ListTitleItem {
        box-sizing: border-box;
        white-space: nowrap;
        background-color: #8c8ec8;
        height: 23rem/36;
        border-top: 0.1rem/36 solid #444559;
        border-left: 0.1rem/36 solid #444559;
        border-bottom: 0.1rem/36 solid #444559;
      }

      .cl-borderRight {
        border-right: 0.1rem/36 solid #444559;
      }
    }

    .cl-List {
      background-color: #ebebfd;
      font-size: 11rem/36;
      font-weight: 400;
      color: #515050;

      .cl-ListItem {
        border-left: 0.1rem/36 solid #444559;
        border-bottom: 0.1rem/36 solid #444559;

        div {
          white-space: nowrap;
        }

        .cl-itemA {
          height: 49rem/36;
          border-right: 0.1rem/36 solid #444559;
        }

        .cl-itemB {
          height: 29rem/36;
          border-right: 0.1rem/36 solid #444559;
        }
      }
    }
  }

  .cl-thirdBox {
    font-size: 12rem/36;
    font-weight: 400;
    color: #74747c;
    .cl-ditailsBox {
      width: 340rem/36;
      .cl-item {
        line-height: 15rem/36;
        .cl-a {
          display: flex;

          .cl-border {
            display: inline-block;
            width: 10rem/36;
            height: 1rem/36;
            background-color: #74747c;
            margin-right: 5rem/36;
          }
        }
      }
    }
  }

  .cl-title {
    font-size: 20rem/36;
    font-weight: bold;
  }

  .cl-middleBox {
    .cl-fontContent {
      width: 8rem;
      margin: 0 auto;
      text-align: center;
      font-size: 16rem/36;
    }

    .cl-mr {
      margin-right: 3rem/36;
    }
  }

  .cl-OkButton {
    width: 8rem;
    height: 40rem/36;
    border-radius: 20rem/36;
    background-color: #fff;
    border: 0.1rem/36 solid rgb(180, 180, 180);
    font-size: 20rem/36;
    color: #000;
  }

  .cl-OkButton:active {
    background-color: rgba(240, 240, 240, 0.5);
  }
}
</style>
