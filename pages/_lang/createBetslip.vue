<template>
  <div class="cl-createdBetslip-wrap">
    <div class="cl-topBox">
      <headBack
        :left-flag="true"
        bgcolor="#fff"
        :title="$t('createBetslip.title')"
        :middle-word-style="{
          fontSize: 15 / 36 + 'rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#000'
        }"
      >
        <template #left>
          <div class="cl-backIcon" @click="goBack" />
        </template>
      </headBack>
    </div>

    <div class="cl-contentBox">
      <!-- gift -->
      <div
        v-if="giftBalance && $route.query.type === 'chooseGift'"
        class="cl-item"
      >
        <!-- <div class="cl-name">{{ $t("createBetslip.choose") }}</div> -->
        <div class="cl-indexCardShadow cl-bsbb cl-giftItem">
          <div class="cl-flexcc cl-bsbb cl-leftBox">
            <div class="cl-flexec">
              <div class="cl-unit">{{ $t('units') }}</div>
              <div class="cl-amount">{{ giftItem.amount }}</div>
            </div>
          </div>
          <div class="cl-flexcb cl-rightBox">
            <div class="cl-left">
              <div class="cl-up">
                {{
                  $t('accountGiftList.limit') +
                  giftItem.limit +
                  $t('accountGiftList.limit1')
                }}
              </div>
              <div class="cl-down">
                {{ $t('accountGiftList.placed') + giftItem.odds }}
              </div>
            </div>
            <div class="cl-right" />
          </div>
        </div>
      </div>
      <!-- 投注金额 -->
      <div class="cl-item">
        <div class="cl-name">{{ $t('createBetslip.stake') }}</div>
        <div class="cl-inputBox" :class="{ 'cl-inputError': reminderStake }">
          <input v-model="stake" type="number" class="cl-input" />
          <div
            v-if="stake !== ''"
            class="cl-icon"
            @click="clearInput('stake')"
          ></div>
        </div>
        <div v-if="reminderStake" class="cl-reminder">{{ reminderStake }}</div>
      </div>

      <!-- 预期赢钱 -->
      <div class="cl-item">
        <div class="cl-name">{{ $t('createBetslip.desired') }}</div>
        <div class="cl-inputBox" :class="{ 'cl-inputError': reminderWinnings }">
          <input v-model="winnings" type="number" class="cl-input" />
          <div
            v-if="winnings !== ''"
            class="cl-icon"
            @click="clearInput('winnings')"
          ></div>
        </div>
        <div v-if="reminderWinnings" class="cl-reminder">
          {{ reminderWinnings }}
        </div>
      </div>

      <!-- 开始时间 -->
      <div class="cl-item">
        <div class="cl-name">{{ $t('createBetslip.starts') }}</div>
        <div class="cl-inputBox">
          <div class="cl-selectTab" @click.self="changeSelectBox">
            {{ matchTime }} hour
            <div v-if="isSelectBoxShow" class="cl-selectBox">
              <div
                v-for="item in matchTimeArr"
                :key="item"
                class="cl-tabItem"
                @click="selectTime(item)"
              >
                {{ item }} {{ $t('createBetslip.hour') }}
              </div>
            </div>
          </div>
          <div class="cl-icon1" :class="{ 'cl-openIcon': isSelectBoxShow }" />
        </div>
      </div>

      <!-- markets 场次选择 -->
      <div class="cl-item">
        <div class="cl-name">{{ $t('createBetslip.folds') }}</div>
        <div class="cl-inputBox" :class="{ 'cl-inputError': reminderMarkets }">
          <input v-model="markets" type="number" class="cl-input" />
          <div
            v-if="markets !== ''"
            class="cl-icon"
            @click="clearInput('markets')"
          ></div>
        </div>
        <div v-if="reminderMarkets" class="cl-reminder">
          {{ reminderMarkets }}
        </div>
      </div>

      <!-- outcomes 多选 -->
      <div class="cl-item">
        <div class="cl-name">{{ $t('createBetslip.outcomes') }}</div>
        <div class="cl-outcomes">
          <div
            class="cl-outcomesItems"
            :class="{ 'cl-selected': outcomeArr.includes(0) }"
            @click="selectOutcome(0)"
          >
            All
          </div>
          <div
            class="cl-outcomesItems"
            :class="{ 'cl-selected': outcomeArr.includes(1) }"
            @click="selectOutcome(1)"
          >
            Bets on match/period result
          </div>
          <div
            class="cl-outcomesItems"
            :class="{ 'cl-selected': outcomeArr.includes(2) }"
            @click="selectOutcome(2)"
          >
            Totals
          </div>
          <div
            class="cl-outcomesItems"
            :class="{ 'cl-selected': outcomeArr.includes(3) }"
            @click="selectOutcome(3)"
          >
            Handicaps
          </div>
          <div
            class="cl-outcomesItems"
            :class="{ 'cl-selected': outcomeArr.includes(4) }"
            @click="selectOutcome(4)"
          >
            Others
          </div>
        </div>
      </div>
      <div v-if="tickets.length" class="cl-switch">
        <van-switch
          v-model="checked"
          :size="15 / 36 + 'rem'"
          :active-color="mainStyle.mainThemeColor"
          :inactive-color="mainStyle.switchInactiveColor"
        />

        <div class="cl-art">
          {{ $t('createBetslip.merge') }}
        </div>
      </div>

      <!-- 按钮 -->
      <div
        class="cl-button"
        :class="{
          'cl-canNotClick': reminderStake || reminderWinnings || reminderMarkets
        }"
        @click="createBetslip"
      >
        {{ $t('createBetslip.create') }}
      </div>
    </div>

    <!-- 礼物列表 -->
    <drawer
      :visible="$store.state.root.isGiftShow"
      @update:visible="visibleIsGiftShow"
      type="bottom"
      :height="334 / 36"
    >
      <betslipGifts
        :gift-list="giftList"
        :gift_index="gift_index"
        :odds-count="oddsCount"
        :stake="stake"
        @useGift="useGift"
        @visibleIsGiftShow="visibleIsGiftShow"
      />
    </drawer>
    <!-- loading -->
    <loading v-if="isLoadingShow" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import loading from '@/components/components/loading.vue'
import betslipGifts from '@/components/components/betslipGifts.vue'

export default {
  name: 'CreateBetslip',
  components: { headBack, loading, betslipGifts },
  data() {
    return {
      checked: false, // 是否合并本地订单
      stake: 500, // 投注额
      winnings: 5000, // 预期赢钱
      markets: 5, // 用户markets数量
      matchTime: 12, // 开始时间范围
      matchTimeArr: [6, 12, 24], // 比赛时间数组
      isSelectBoxShow: false, // 时间选择框是否展开
      outcomeArr: [0], // markets 栏目
      not_match_ids: [], // 本地订单
      reminderStake: '', // 金额错误提示
      reminderWinnings: '', // 预期赢钱错误提示
      reminderMarkets: '', // markets场次错误提示
      isLoadingShow: false, // 是否展示loading
      giftList: [], // 礼金列表
      gift_index: -1, // gift选择项
      giftBalance: 0
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    tickets() {
      return this.$store.state.tickets
    },
    // 总赔率
    oddsCount() {
      let odds = 1
      for (let i = 0; i < this.tickets.length; i++) odds *= this.tickets[i].odds
      return odds
    },
    // gift 选项
    giftItem() {
      return this.giftList[this.gift_index]
    }
  },
  watch: {
    // 是否合并本地订单
    checked(val) {
      if (val === true) {
        this.tickets.forEach((item) => this.not_match_ids.push(item.match_id))

        // 校验去除本地订单后，各输入框是否合规
        if (this.markets - this.tickets.length <= 0) {
          // markets场次不足
          this.reminderMarkets = this.$t('createBetslip.reminderMarkets1')
        }

        if (this.winnings / this.stake <= this.oddsCount) {
          // 待创建订单赔率不足
          this.reminderWinnings = this.$t('createBetslip.reminderDesired1')
        }
      } else {
        this.not_match_ids = []
      }
    },
    // gift选择
    gift_index(val) {
      if (val !== -1) {
        if (this.stake < this.giftItem.limit) this.stake = this.giftItem.limit
        if (this.winnings < this.stake * this.giftItem.odds)
          this.winnings = this.stake * this.giftItem.odds
        if (this.checked && this.markets - this.tickets.length <= 0)
          this.markets = this.tickets.length + 1
      }
    },
    // 投注额
    stake(val, oldVal) {
      // 低于最低投注额
      if (val < 50) {
        this.reminderStake = this.$t('reminder.minimumStake', { limit: 50 })
      } else {
        this.reminderStake = ''
      }

      // 低于gift使用限额
      if (this.giftItem && val < this.giftItem.limit) {
        this.reminderStake = this.$t('createBetslip.reminderGiftStake', {
          stake: this.giftItem.limit
        })
        // Lib.common.errorReminder(
        //   this,
        //   '',
        //   '',
        //   '',
        //   this.$t('createBetslip.reminder1'),
        //   this.$t('reminder.button.ok'),
        //   this.$t('commonModal.cancel'),
        //   () => {
        //     // ok callback
        //     this.gift_index = -1
        //   },
        //   () => {
        //     // cancel
        //     this.stake = oldVal
        //   }
        // )
      }
    },
    // 预期赢钱
    winnings(val, oldVal) {
      // 低于投注额
      if (val < this.stake) {
        this.reminderWinnings = this.$t('createBetslip.reminderDesired')
      } else {
        this.reminderWinnings = ''
      }

      // 低于gift使用限额
      if (this.giftItem && val < this.giftItem.odds * this.giftItem.limit) {
        this.reminderWinnings = this.$t('createBetslip.reminderGiftWinning', {
          stake: this.giftItem.odds * this.giftItem.limit
        })

        // Lib.common.errorReminder(
        //   this,
        //   '',
        //   '',
        //   '',
        //   this.$t('createBetslip.reminder2'),
        //   this.$t('reminder.button.ok'),
        //   this.$t('commonModal.cancel'),
        //   () => {
        //     // ok callback
        //     this.gift_index = -1
        //   },
        //   () => {
        //     // cancel
        //     this.winnings = oldVal
        //   }
        // )
      }

      if (
        this.checked === true &&
        this.winnings / this.stake <= this.oddsCount
      ) {
        // 待创建订单赔率不足
        this.reminderWinnings = this.$t('createBetslip.reminderDesired1')
      }
    },
    // market场次
    markets(val) {
      // 不在可输入范围内
      if (val < 2 || val > 20) {
        this.reminderMarkets = this.$t('createBetslip.reminderMarkets')
      } else {
        this.reminderMarkets = ''
      }

      // 校验去除本地订单后，各输入框是否合规
      if (this.checked === true && this.markets - this.tickets.length <= 0) {
        // markets场次不足
        this.reminderMarkets = this.$t('createBetslip.reminderMarkets1')
      }
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    // 请求gifts数量
    this.getGifts()
    // 初始化
    this.init()
  },
  methods: {
    // 初始化数据
    init() {
      const { type, stake, gift_odds } = this.$route.query
      if (type === 'chooseGift') {
        Lib.common.event_statistics('Create_Betslip_View', 'Source: Betslip')
        this.checked = true
      } else {
        Lib.common.event_statistics('Create_Betslip_View', 'Source: self')
      }
      if (stake) {
        this.stake = Number(stake)
      }
      if (gift_odds) this.winnings = this.stake * Number(gift_odds)
    },
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    },
    // 选择outcomes
    selectOutcome(type) {
      if (type === 0) {
        this.outcomeArr = [0]
      } else {
        if (this.outcomeArr.includes(0)) this.outcomeArr.splice(0, 1)
        const index = this.outcomeArr.indexOf(type)
        if (index === -1) this.outcomeArr.push(type)
        else {
          this.outcomeArr.splice(index, 1)
          if (this.outcomeArr.length === 0) this.outcomeArr = [0]
        }
      }
    },
    // 选择时间范围
    selectTime(time) {
      this.isSelectBoxShow = !this.isSelectBoxShow
      this.matchTime = time
    },
    // 修改时间选择框
    changeSelectBox() {
      this.isSelectBoxShow = !this.isSelectBoxShow
    },
    // 清除选中数据
    clearInput(type) {
      this[type] = ''
    },
    // 使用gift
    useGift(index) {
      Lib.common.event_statistics('create_betslip_choose_gift')
      this.gift_index = index
    },
    // 控制礼物列表的打开与隐藏
    visibleIsGiftShow: Lib.common.throttle(function (visible) {
      this.$store.commit('setRoot', {
        ...this.$store.state.root,
        isGiftShow: visible
      })
    }, 300),
    // 获取可用gift
    getGifts() {
      this.$axios_api.giftsValid({ token: this.token, type: 1 }).then((res) => {
        if (res.code === 0) {
          this.giftBalance = res.data.balance
          this.giftList = res.data.list
          // 选择最大面额的gift
          const { gift_index } = this.$route.query
          if (gift_index !== undefined) {
            this.gift_index = Number(gift_index)
            this.winnings = this.stake * (this.giftItem.odds + 0.1)
          }
        }
      })
    },
    // 默认选择可使用的最大面额的gift
    getMaxGifts() {
      let maxIndex = 0
      this.giftList.forEach((item, index) => {
        if (item.amount > this.giftList[maxIndex].amount) maxIndex = index
      })
      this.gift_index = maxIndex
    },
    // 打开选择gift弹窗
    selectGift() {
      this.$store.state.root.isGiftShow = true
    },
    // 快速创建订单
    createBetslip() {
      Lib.common.event_statistics('Create_Betslip_Click')
      if (this.reminderStake || this.reminderWinnings || this.reminderMarkets) {
        // 条件不符合
        return
      }

      this.isLoadingShow = true
      this.$axios_api
        .createBetslip({
          token: this.token,
          odds: this.checked
            ? this.winnings / this.stake / this.oddsCount
            : this.winnings / this.stake,
          bet_num: this.checked
            ? this.markets - this.tickets.length
            : this.markets,
          start: this.matchTime,
          market_id: this.outcomeArr,
          not_match_ids: this.not_match_ids,
          must_than_odds: this.$route.query.type === 'chooseGift' ? 1 : 0
        })
        .then((res) => {
          this.isLoadingShow = false
          if (res.code === 0) {
            let newTicket = [...this.tickets]
            // 不保留本地订单
            if (!this.checked) newTicket = []
            newTicket = newTicket.concat(res.data.result)
            this.$store.commit('setTickets', newTicket)
            Lib.store.set(
              'tickets',
              Lib.common.encrypt(JSON.stringify(newTicket))
            )
            this.$router.push({
              name: 'lang-betslip',
              params: {
                stake: this.stake,
                gift_index: this.gift_index
              }
            })
            Lib.common.event_statistics('Create_Betslip_Click', 'Success')
          } else {
            Lib.common.errorReminderUp(
              this,
              true,
              this.$t('createBetslip.reminderFail'),
              0
            )
            Lib.common.event_statistics('Create_Betslip_Click', 'Failed')
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-createdBetslip-wrap {
  background-color: #fff;
  min-height: 100vh;

  .cl-contentBox {
    padding: 0 0.83rem 4rem;
    font-size: 0.31rem;
    color: #000;

    .cl-switch {
      padding-top: 0.5rem;
      display: flex;
      align-items: center;

      .cl-art {
        color: #a2a2a7;
        padding-left: 0.28rem;
      }
    }

    .cl-item {
      position: relative;
      .cl-reminder {
        font-size: 0.26rem;
        color: #e62d0e;
        position: relative;
        top: 0.15rem;
      }

      .cl-name {
        line-height: 0.47rem;
        padding-top: 0.38rem;
      }

      .cl-inputBox {
        position: relative;
        border: 0.02rem solid #d4dae1;
        border-radius: 0.09rem;
        height: 1.12rem;
        margin-top: 0.21rem;

        &.cl-inputError {
          border-color: #e62d0e;
        }

        .cl-selectTab {
          position: relative;
          width: 8.33rem;
          height: 1.12rem;
          line-height: 1.12rem;
          padding: 0 0.28rem;
          box-sizing: border-box;
          font-weight: bold;

          .cl-selectBox {
            position: absolute;
            top: 1.13rem;
            left: -0.02rem;
            z-index: 1;
            width: 8.33rem;
            box-sizing: border-box;
            border: 0.02rem solid #d4dae1;
            border-radius: 0rem 0rem 0.09rem 0.09rem;

            .cl-tabItem {
              height: 1.12rem;
              background-color: white;
              padding: 0 0.28rem;
              border-top: 0.02rem solid #d4dae1;
            }

            .cl-tabItem:first-child {
              border-top: none;
            }
          }
        }

        .cl-input {
          height: 1.12rem;
          padding: 0 0.28rem;
          border: none;
          font-weight: bold;
          width: 7rem;
          font-size: 0.31rem;
        }

        .cl-icon {
          position: absolute;
          right: 0.32rem;
          bottom: 12rem/36;
          .sprite(@menu-clear, 108rem);
        }

        .cl-icon1 {
          position: absolute;
          right: 0.32rem;
          bottom: 16rem/36;
          transform: rotate(180deg);
          .sprite(@ticon-down, 90rem);

          &.cl-openIcon {
            transform: rotate(0deg);
          }
        }
      }

      .cl-outcomes {
        display: flex;
        flex-wrap: wrap;

        .cl-outcomesItems {
          height: 0.81rem;
          line-height: 0.81rem;
          border-radius: 0.4rem;
          text-align: center;
          min-width: 1.72rem;
          padding: 0 0.32rem;
          background-color: #e9e9f3;
          margin-top: 0.28rem;
          margin-right: 0.28rem;
          border: 0.02rem solid #e9e9f3;
          font-size: 0.35rem;

          &.cl-selected {
            background-color: #e6e2ff;
            border: 0.02rem solid #5a40ff;
            color: #5a40ff;
          }
        }
      }
    }

    .cl-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.11rem;
      background-color: #5a40ff;
      border-radius: 0.17rem;
      font-size: 0.37rem;
      color: #fff;
      font-weight: bold;
      margin-top: 0.5rem;

      &.cl-canNotClick {
        opacity: 0.5;
      }
    }
  }
}

.cl-giftItem {
  display: flex;
  min-height: 67rem/36;
  border-radius: 13rem/36;
  padding: 9rem/36 13rem/36 9rem/36 0;
  margin-top: 0.21rem;
  .cl-leftBox {
    width: 85rem/36;
    margin-right: 10rem/36;
    color: #eb4949;
    font-weight: bold;
    border-right: 0.5rem/36 solid #d4dae1;
    .cl-unit {
      font-size: 14rem/36;
      margin-right: 3rem/36;
    }
    .cl-amount {
      font-size: 19rem/36;
      line-height: 19rem/36;
    }
  }
  .cl-rightBox {
    flex: 1;
    .cl-left {
      flex: 1;
      .cl-down {
        margin-top: 5rem/36;
        font-size: 11rem/36;
        color: #a2a2a7;
      }
    }
    .cl-rightIcon {
      margin-left: 10rem/36;
      width: 21rem/36;
      height: 21rem/36;
      border-radius: 50%;
      background-color: #f8f8f8;
      border: 0.5rem/36 solid #cdcdcd;
      box-sizing: border-box;
    }
  }
  &.cl-select {
    .cl-rightBox {
      .cl-rightIcon {
        .sprite(@ticon-red-select, 108rem);
      }
    }
  }
}
</style>
