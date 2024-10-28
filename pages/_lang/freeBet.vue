<template>
  <div class="cl-freeBet-wrap">
    <!-- 返回 -->
    <headBack
      :title="$t('freeBet.title').toUpperCase()"
      :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
    >
      <template>
        <div @click="goFreebetHow" class="cl-how" />
      </template>
    </headBack>
    <!-- freebet banner -->
    <div style="height: calc(10rem / 36)" />

    <div class="cl-flexcc cl-freeBet-banner">
      <div class="cl-content">
        <h2 class="cl-h2 cl-title">{{ $t('freeBet.free') }}</h2>
        <h3 class="cl-h3 cl-art">{{ $t('freeBet.predict') }}</h3>
        <h2 class="cl-h2 cl-money">{{ $t('freeBet.money') }}</h2>
      </div>
      <Nuxtimg src="/images/freebet/freebetBanner.png" alt="freebet" />
    </div>

    <div style="height: calc(10rem / 36)" />
    <!-- freebet 比赛数据 -->
    <teamTitle :teams="teams" />
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <div v-if="result.length > 0">
          <preMatchBox
            style="padding-bottom: 4rem"
            :result="result"
            where="freeBet"
            event_name="_freeBet"
          />
          <div style="height: calc(30rem / 36)" />
        </div>
        <dataNoResult v-else />
      </div>
      <dataLoading v-else />
    </div>

    <!-- freebet 投注项 -->
    <div class="cl-freebet-betslipBox">
      <div class="cl-freebetContent">
        <div class="cl-selectTBox" :class="isSelectOpen ? '' : 'cl-border'">
          <CollapseTransition>
            <div class="cl-pTBox" v-if="isSelectOpen">
              <div
                class="cl-flexcb cl-tItem"
                v-for="(item, index) in freeBetArr"
                :key="index"
                @click="changeLevel(index)"
              >
                <div class="cl-flexcs">
                  <span class="cl-noBackup">{{ hb }}</span>
                  <span>{{ item ? item.toFixed(2) : item }}</span>
                </div>

                <div class="cl-check" v-if="selectIndex === index" />
              </div>
            </div>
          </CollapseTransition>
          <div class="cl-flexcb cl-tItem" style="border: 0">
            <div>{{ $t('betslipPlaceBet.stake') }}</div>
            <div
              v-if="freeBetArr.length === 0"
              class="cl-flexce cl-rightBox cl-noFree"
              @click="canNotUse.length > 0 ? getFreeBetList() : getFreeBet()"
            >
              <div
                v-html="
                  canNotUse.length > 0
                    ? $t('freeBet.unlockReminder')
                    : $t('freeBet.noFree')
                "
              />
              <div class="cl-moreIcon" />
            </div>
            <div v-else class="cl-flexce cl-rightBox" @click="toggleSelect">
              <div class="cl-seletFreeBet">
                <span class="cl-freebetWord">{{ $t('freeBet.name') }}</span>
                <span class="cl-freebetNum">{{
                  freeBetArr[selectIndex]
                    ? freeBetArr[selectIndex].toFixed(2)
                    : freeBetArr[selectIndex]
                }}</span>
                <span class="cl-hb">{{ hb }}</span>
              </div>
              <div
                class="cl-more"
                :class="isSelectOpen ? 'cl-iconRotate180' : 'cl-iconRotate0'"
              />
            </div>
          </div>
        </div>
        <!-- <div class="cl-flexcc cl-item"
            @click="changeLevel(index)"
            v-else
            v-for="(item, index) in freeBetArr"
            :key="index"
            :class="selectIndex === index ? 'selected':''"
            &gt;
            {{item}}
        </div>-->
        <!-- <div class="cl-reminder">{{$t('freeBet.activity')}}</div> -->
        <div class="cl-freeBetList">
          <div class="cl-flexcb cl-item">
            <div class="cl-left">{{ $t('betslipPlaceBet.total') }}</div>
            <div class="cl-right">{{ Number(oddsCount).toFixed(2) }}</div>
          </div>
          <div class="cl-flexcb cl-item">
            <div class="cl-left">{{ $t('betslipPlaceBet.payout') }}</div>
            <div class="cl-right">
              {{ hb + ' ' + Number(finalPayout).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="cl-flexcc cl-lkButton cl-placeBox"
        @click="freebetBet"
        :class="{
          'cl-isButtonCanNotUse':
            !canPlaceBet ||
            tickets.length < freeBetMatches ||
            freeBetArr.length === 0
        }"
      >
        <div class="cl-title">
          {{ token ? $t('betslipPlaceBet.place') : $t('freeBet.login') }}
        </div>
        <div
          class="cl-about"
          v-if="freeBetMatches > 1"
          v-html="
            $t('freeBet.pick', {
              select: tickets.length,
              length: freeBetMatches
            })
          "
        ></div>
        <div class="cl-loadEffect" v-if="isLoadingShow">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import preMatchBox from '@/components/components/preMatchBox.vue'
import teamTitle from '@/components/components/teamTitle.vue'

export default {
  components: {
    headBack,
    teamTitle,
    preMatchBox,
    CollapseTransition: Lib.common.CollapseTransition
  },
  data() {
    return {
      result: [],
      isRequestFailed: false,
      requestLoading: false,
      teams: ['1', 'X', '2'],
      isLoadingShow: false,
      canPlaceBet: true,
      freeBetList: [], // 可用的freebet劵
      canNotUse: [], // 不可用的freebet劵
      selectIndex: 0, // 已选择
      isSelectOpen: false,
      nowDate: new Date().getTime()
    }
  },
  computed: {
    // 货币
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    },
    tickets() {
      return this.$store.state.freeBet
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    platform() {
      return this.$store.state.platform
    },
    // 总赔率
    oddsCount() {
      let odds = 1
      for (let i = 0; i < this.tickets.length; i++) odds *= this.tickets[i].odds
      return Lib.common.MathFloor(odds, 2)
    },
    // 订单真实到账额度
    finalPayout() {
      return this.freeBetArr.length === 0
        ? 0
        : Lib.common.MathFloor(
            this.freeBetArr[this.selectIndex] * (this.oddsCount - 1),
            2
          )
    },
    // 投注额度
    freeBetArr() {
      const arr = this.token
        ? []
        : this.$store.state.root.country === 'ug'
        ? [200]
        : [50]
      this.freeBetList.forEach((item) => {
        if (!arr.includes(item.amount)) arr.push(item.amount)
      })
      return arr.sort((a, b) => a - b)
    },
    // gift_id
    gift_id() {
      let gift_id = ''
      this.freeBetList.forEach((item) => {
        if (item.amount === this.freeBetArr[this.selectIndex]) gift_id = item.id
      })
      return gift_id
    },
    // 默认投注比赛数
    freeBetMatches() {
      let num = 1
      if (this.gift_id) {
        this.freeBetList.forEach((item) => {
          if (item.id === this.gift_id) num = item.market
        })
      }
      return num
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    this.$prefetchRoutes([
      'freeBetHowToUse',
      this.token ? 'betslipSuccess' : 'login'
    ])
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    // 请求freebet数据
    this.requestFreebet()
    this.freeBetValid()
    // 全局事件
    window.screenshots = this.screenshots
  },
  methods: {
    goFreebetHow() {
      this.$router.push({
        path: `/${this.locale}/freeBetHowToUse`
      })
    },
    getFreeBetList() {
      this.$router.push({
        path: `/${this.locale}/freeBetList`
      })
    },
    // 切换选择框状态
    toggleSelect() {
      this.isSelectOpen = !this.isSelectOpen
    },
    // 前往获取freebet
    getFreeBet() {
      Lib.common.event_statistics('freeBet_get_now_click')
      this.$router.push({ path: `/${this.locale}` })

      // freebet giveaway活动期间,没有stake时,点击获取跳转到活动页
      // window.location.href = `/activity/freebetGiveaway/index.html?lang=${this.locale}`
    },
    // 修改level
    changeLevel(index) {
      this.isSelectOpen = false
      this.selectIndex = index
    },
    // 请求freebet数据
    requestFreebet() {
      this.$axios_api
        .freebetMatches({})
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.result = Lib.common.recFilFreeBet('filter', res.data.result)
            // console.log(this.result)
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 请求gift
    freeBetValid() {
      this.$axios_api.freeBetValid({ token: this.token }).then((res) => {
        if (res.code === 0) {
          this.freeBetList = res.data.list.filter(
            (item) => item.confirmed === true
          )
          this.canNotUse = res.data.list.filter(
            (item) => item.confirmed === false
          )
        }
      })
    },
    // 时间过期状态判断
    timeStatusJudge(time) {
      return this.nowDate > (time * 1000 || 0)
    },
    // 删除比赛数据
    clearAll() {
      this.$store.commit('setFreeBet', [])
    },
    // 检查gift
    checkGift(giftId) {
      this.freeBetList = this.freeBetList.filter((item) => item.id !== giftId)
      // 金额选择归零
      this.selectIndex = 0
    },
    // 投注
    freebetBet() {
      Lib.common.event_statistics('freeBet_place_now_click')

      if (!this.token) {
        Lib.store.remove('token')
        this.$store.commit('setInfo', null)
        this.$router.push({ path: `/${this.locale}/login` })
        return
      }
      if (this.tickets.length < this.freeBetMatches) return

      if (!this.canPlaceBet) return

      if (!this.freeBetArr.length) return

      this.isLoadingShow = true
      this.canPlaceBet = false
      const outcomes = []
      const idarr = []
      for (let i = 0; i < this.tickets.length; i++) {
        outcomes.push(this.tickets[i].id)
        idarr.push(this.tickets[i].match_id)
      }
      const finalPayout = this.finalPayout
      const odds = this.oddsCount
      this.$axios_api
        .freebetBet({
          token: this.token,
          gift_id: this.gift_id,
          outcomes: JSON.stringify(outcomes),
          platform: this.platform
        })
        .then((res) => {
          this.isLoadingShow = false
          this.canPlaceBet = true
          if (res.code === 0) {
            Lib.common.recFilFreeBet('record', idarr)
            // fbq("track", "Purchase", {
            //   value: this.freeBetArr[this.selectIndex],
            //   currency: "UGX",
            //   content_name: "freebet"
            // });
            // 清除选项
            this.clearAll()
            // 检查gift
            // this.checkGift(this.gift_id);
            // Lib.common.errorReminderUp(this,true,this.$t('jackpotBetslip.accept',{id:res.data.ticket_id}),1);
            Lib.common.event_statistics('freebet_placeBet_success')
            // 跳转到成功页
            this.$router.replace({
              path: `/${this.locale}/betslipSuccess`,
              query: {
                totalStake: this.freeBetArr[this.selectIndex],
                gift: 0,
                percent: 0,
                bonus: 0,
                payout: res.data.win_expected || finalPayout,
                odds,
                ticketId: res.data.ticket_id,
                where: 'betslip',
                betType: 'FreeBet'
              }
            })
          } else if (res.code === 10101) {
            Lib.store.remove('token')
            this.$store.commit('setInfo', null)
            Lib.common.errorReminder(
              this,
              'login',
              '',
              '',
              this.$t('reminder.unLogin'),
              '',
              this.$t('reminder.button.ok')
            )
          } else if (res.code === 10505) {
            // 投注时，某些market不可投注，删除处理
            for (let j = 0; j < res.data.outcomes.length; j++) {
              for (let i = 0; i < this.tickets.length; i++) {
                if (this.tickets[i].id === res.data.outcomes[j]) {
                  this.tickets.splice(i, 1)
                  i--
                }
              }
            }
            this.$store.commit('setFreeBet', this.tickets)
            // 重新请求比赛数据
            this.requestFreebet()
            Lib.common.errorReminderUp(
              this,
              true,
              this.$t('reminder.expired'),
              0
            )
          } else {
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          }
        })
        .catch(() => {
          this.canPlaceBet = true
          this.isLoadingShow = false
          // console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-freeBet-wrap {
  background-color: #fff;

  .cl-how {
    margin-right: 10rem/36;
    .sprite(@ticon-question-mark, 108rem);
  }

  .cl-freeBet-banner {
    margin: 0 auto;
    padding: 0 10rem/36;
    background: linear-gradient(180deg, #f8ff80 0%, #fffbc7 100%);
    border-radius: @mainButtonRadius;
    width: 340rem/36;
    height: 122rem/36;
    box-sizing: border-box;
    color: #333;

    img {
      width: 118rem/36;
      height: 132rem/36;
      padding-bottom: 10rem/36;
    }

    .cl-content {
      padding: 0 10rem/36;
      .cl-title {
        font-weight: 800;
        font-size: 13rem/36;
        text-transform: uppercase;
      }

      .cl-art {
        font-size: 11rem/36;
        font-weight: 400;
        opacity: 0.8;
        margin-bottom: 8rem/36;
      }

      .cl-money {
        color: #e7111c;
        font-weight: 800;
        font-size: 21rem/36;
      }
    }
  }

  .cl-freebet-betslipBox {
    position: fixed;
    width: 10rem;
    bottom: 0;
    color: #333;
    font-size: 13rem/36;
    font-weight: bold;
    background-color: #fff;
    box-shadow: 0 1rem/36 4rem/36 0 #cecede;

    .cl-freebetContent {
      font-weight: bold;
      padding: 10rem/36 10rem/36 18rem/36;

      .cl-selectTBox {
        position: relative;
        background-color: #f4f4f4;
        border-radius: 0 0 3rem/36 3rem/36;
        padding: 0 10rem/36;
        font-size: 15rem/36;
        font-weight: bold;
        .cl-tItem {
          height: 40rem/36;
          border-bottom: 0.5rem/36 solid #d4dae1;
          .cl-more {
            .sprite(@ticon-triangle-black, 108rem);
          }
          .cl-noBackup {
            margin-right: 8rem/36;
            font-weight: 400;
          }
          .cl-greyMore {
            .sprite(@ticon-back-grey, 108rem);
          }
          .cl-check {
            .sprite(@ticon-choose-blue, 108rem);
          }
        }
        .cl-rightBox {
          flex: 1;
          height: 100%;
          .cl-seletFreeBet {
            margin-right: 8rem/36;
            color: #e62d0e;
            .cl-freebetWord {
              color: #000;
            }
            .cl-hb {
              font-weight: 400;
            }
          }
          &.cl-noFree {
            font-size: 13rem/36;
            font-weight: 400;
            white-space: nowrap;
            .cl-moreIcon {
              margin-left: 3rem/36;
              .sprite(@ticon-back-grey, 108rem);
            }
          }
        }

        .cl-pTBox {
          position: absolute;
          bottom: 40rem/36;
          left: 0;
          width: 100%;
          background-color: #f4f4f4;
          padding: 0 10rem/36;
          box-sizing: border-box;
          border-radius: 3rem/36 3rem/36 0 0;
        }
        &.cl-border {
          border-radius: 3rem/36;
        }
      }

      .cl-reminder {
        text-align: right;
        font-weight: 400;
        font-size: 10rem/36;
        color: #e62d0e;
      }

      .cl-freeBetList {
        margin-top: 3rem/36;
        .cl-item {
          padding-top: 8rem/36;
          .cl-left {
            color: #a2a2a7;
            font-weight: 400;
          }
        }
      }
    }

    .cl-placeBox {
      width: 100%;
      flex-direction: column;
      position: relative;
      height: 47rem/36;
      text-align: center;
      border-radius: 0;

      &.cl-isButtonCanNotUse {
        opacity: 0.5;
        color: #ffffff80;
      }

      .cl-title {
        font-weight: bold;
        font-size: 13rem/36;
      }

      .cl-about {
        font-size: 10rem/36;
        padding-top: 3rem/36;
        font-weight: 400;
      }

      .cl-loadEffect {
        width: 1.38889rem;
        height: 1.38889rem;
        position: absolute;
        right: 50rem/36;
        top: 0;
        transform: scale(0.6);
      }
      .loadEffect span {
        display: inline-block;
        width: 0.27778rem;
        height: 0.27778rem;
        border-radius: 50%;
        background: #ededed;
        position: absolute;
        animation: load 1.04s ease infinite;
      }
      @keyframes load {
        0% {
          transform: scale(1.2);
          opacity: 1;
        }
        100% {
          transform: scale(0.3);
          opacity: 0.5;
        }
      }
      .loadEffect span:nth-child(1) {
        left: 0;
        top: 50%;
        margin-top: -0.13889rem;
        animation-delay: 0.13s;
      }
      .loadEffect span:nth-child(2) {
        left: 0.19444rem;
        top: 0.19444rem;
        animation-delay: 0.26s;
      }
      .loadEffect span:nth-child(3) {
        left: 50%;
        top: 0;
        margin-left: -0.13889rem;
        animation-delay: 0.39s;
      }
      .loadEffect span:nth-child(4) {
        top: 0.19444rem;
        right: 0.19444rem;
        animation-delay: 0.52s;
      }
      .loadEffect span:nth-child(5) {
        right: 0;
        top: 50%;
        margin-top: -0.13889rem;
        animation-delay: 0.65s;
      }
      .loadEffect span:nth-child(6) {
        right: 0.19444rem;
        bottom: 0.19444rem;
        animation-delay: 0.78s;
      }
      .loadEffect span:nth-child(7) {
        bottom: 0;
        left: 50%;
        margin-left: -0.19444rem;
        animation-delay: 0.91s;
      }
      .loadEffect span:nth-child(8) {
        bottom: 7px;
        left: 7px;
        animation-delay: 1.04s;
      }
    }
  }
}
</style>
