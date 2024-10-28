<template>
  <div class="cl-freeBetList-wrap">
    <div class="cl-topBox">
      <!-- path勿删,传值为空字符串 -->
      <headBack
        :title="$t('freeBetList.title').toUpperCase()"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
        path
      >
        <NuxtLink no-prefetch :to="`/${locale}/freeBetHowToUse`">
          <h2 class="cl-h2 cl-howToUse" @click.prevent="goDetailFreeBet">
            {{ $t('accountGiftList.how') }}
          </h2>
        </NuxtLink>
      </headBack>
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <tab
      :tab-list="tabList"
      :init-top-line-left="73.5"
      @emitChangeTab="emitChangeTab"
    />
    <accoutMybetBoxFilter
      where="freeBetList"
      @getShowResult="getShowResult"
      v-if="index === 1"
    />
    <!-- <div
      class="cl-giftTitle"
      v-html="
        $t('accountGiftList.rem1', {
          number: number,
          unit: $t('unit'),
          money: balance.toLocaleString()
        })
      "
    ></div> -->
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <div class="cl-freeBetList" v-if="freeBetList.length > 0">
          <template v-if="index === 0">
            <div
              class="cl-indexCardShadow cl-item"
              v-for="(item, index) in freeBetList"
              :key="index"
            >
              <div class="cl-notStart" v-if="!timeStatusJudge(item.start_time)">
                {{ $t('accountGiftList.notStart') }}
              </div>
              <div class="cl-flexcb cl-giftTop">
                <div class="cl-left">
                  <div class="cl-more">
                    {{ $t('freeBetList.more', { number: item.market }) }}
                  </div>
                  <div class="cl-expires">
                    {{
                      timeStatusJudge(item.start_time)
                        ? $t('accountGiftList.expires', {
                            time: item.expire_date
                          })
                        : $t('accountGiftList.start', {
                            time: timeStampDeal(item.start_time)
                          })
                    }}
                  </div>
                  <!-- <div
                  class="cl-flexcs cl-rulesBox"
                  @click="toggle(index)"
                  v-if="
                    item.daily_bet_amount ||
                    item.daily_bet_count ||
                    item.daily_deposit_amount
                  "
                >
                  <span class="cl-rules">{{ $t('accountGiftList.rules') }}</span>
                  <span
                    class="cl-more"
                    :class="{ closeMore: openIndex === index }"
                  />
                </div> -->
                </div>
                <div class="cl-right">
                  <div class="cl-money">
                    <span class="cl-unit">{{ $t('unit') }}</span>
                    <span class="cl-amount">{{ item.amount }}</span>
                  </div>
                  <div class="cl-useNow">
                    <div
                      class="cl-flexcc cl-useNowButton"
                      :class="{
                        'cl-notStartButton': !timeStatusJudge(item.start_time)
                      }"
                      @click="useNow(item)"
                    >
                      {{
                        item.confirmed === false
                          ? $t('accountGiftList.unlock')
                          : $t('freeBetList.useNow')
                      }}
                    </div>
                  </div>
                </div>
              </div>

              <template v-if="item.free_type === 0">
                <div
                  class="cl-giftBottom"
                  v-show="
                    openIndex === index &&
                    (item.daily_bet_amount ||
                      item.daily_bet_count ||
                      item.daily_deposit_amount)
                  "
                >
                  <span>{{ $t('accountGiftList.freebet') }}</span>
                  <span v-if="item.daily_bet_amount">
                    {{
                      $t('accountGiftList.betAmount', {
                        amount: item.daily_bet_amount
                      })
                    }}
                  </span>
                  <span v-if="item.daily_bet_count">
                    {{
                      $t('accountGiftList.betCount', {
                        count: item.daily_bet_count
                      })
                    }}
                  </span>
                  <span v-if="item.daily_deposit_amount">
                    {{
                      $t('accountGiftList.depositAmount', {
                        amount: item.daily_deposit_amount
                      })
                    }}
                  </span>
                </div>
              </template>
              <template v-else>
                <div class="cl-giftBottom">
                  <div class="cl-presentBox cl-flexcb">
                    <div class="cl-present">
                      {{
                        $t('accountGiftList.present', {
                          get: $t('accountGiftList.from')[item.from - 22],
                          after: $t(`accountGiftList.after${item.from - 22}`, {
                            odd: item.type_odds,
                            amount: item.type_amount
                          })
                        })
                      }}
                    </div>
                    <div
                      class="cl-accomplishNow cl-flexcc"
                      :class="{ 'cl-noAccomplishNow': item.status === 2 }"
                      @click="goPage(item.status, item)"
                    >
                      {{
                        item.status === 2
                          ? $t('accountGiftList.unlocked')
                          : $t('accountGiftList.accomplishNow')
                      }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
          <template v-else>
            <div v-for="item in freeBetList" :key="item.id">
              <freeBetItem :item="item" @manipulate="manipulate" />
            </div>
          </template>
        </div>
        <dataNoResult v-else />
      </div>
      <dataLoading v-else />
    </div>
    <invitePop
      :flag="inviteFlag"
      :config-data="configData"
      @close="inviteFlag = false"
    >
      <div
        v-html="
          $t('accountGiftList.lock1', {
            phone: String(lockItem.friend_mobile).replace('0', '237 '),
            money: abs(Number(lockItem.type_amount))
          })
        "
        @click.stop="learnMore"
      ></div>
    </invitePop>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import accoutMybetBoxFilter from '@/components/components/accoutMybetBoxFilter.vue'
import freeBetItem from '@/components/components/freeBetItem.vue'
import tab from '@/components/common/tab.vue'
import invitePop from '@/components/components/activityAll/invitePop.vue'

export default {
  components: { headBack, accoutMybetBoxFilter, tab, freeBetItem, invitePop },
  data() {
    return {
      isRequestFailed: false,
      requestLoading: false,
      freeBetList: [],
      nowDate: new Date().getTime(),
      openIndex: 0,
      number: 0,
      balance: 0,
      tabList: [
        this.$t('accountGiftList.freeBet'),
        this.$t('accountGiftList.freeBetTickets')
      ],
      index: 0,
      showDateList: [],
      lockItem: {},
      inviteFlag: false,
      friendStr: this.$t('accountGiftList.friendStr'),
      configData: {} // 弹窗配置
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    APP() {
      return window.APP || null
    },
    winApp() {
      return window.appInteraction
    },
    hostname() {
      return this.$store.state.root.country === 'ug'
        ? process.env.hostname
        : process.env.hostnamecm
    }
  },
  mounted() {
    this.freeBetValid()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    abs(num) {
      return Lib.common.abs(num)
    },
    goDetailFreeBet() {
      Lib.common.event_statistics('account_freebet_how_to_use')
      this.$router.push({ path: `/${this.locale}/freeBetHowToUse` })
    },
    freeBetValid(data = {}) {
      this.requestLoading = false
      const index = this.index
      ;(index
        ? this.$axios_api.freeBetOrder({
            token: this.token,
            status: data.index || 0
          })
        : this.$axios_api.freeBetValid({
            token: this.token
          })
      )
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (index !== this.index) {
            return
          }
          if (res.code === 0) {
            if (this.index) {
              this.freeBetList = res.data
              if (data.checked) {
                this.freeBetList = this.freeBetList.filter(
                  (item) => item.bet_result === 2
                )
              }
              this.getShowDateList()
            } else {
              this.number = res.data.number
              this.balance = res.data.balance
              this.freeBetList = res.data.list
            }
          } else if (res.code === 10101) {
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
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    useNow(item) {
      Lib.common.event_statistics('freeBet_List_useNow_click')
      if (this.timeStatusJudge(item.start_time)) {
        if (item.confirmed !== false) {
          this.$router.push({ path: `/${this.locale}/freeBet` })
        } else {
          // 未激活
          const art = `${this.$t('accountGiftList.freebet')}
            ${
              item.daily_bet_amount
                ? this.$t('accountGiftList.betAmount', {
                    amount: item.daily_bet_amount
                  })
                : ''
            }
            ${
              item.daily_bet_count
                ? this.$t('accountGiftList.betCount', {
                    count: item.daily_bet_count
                  })
                : ''
            }
            ${
              item.daily_deposit_amount
                ? this.$t('accountGiftList.depositAmount', {
                    amount: item.daily_deposit_amount
                  })
                : ''
            }
            `
          Lib.common.errorReminder(
            this,
            'unLockFreeBet',
            '',
            '',
            art,
            '',
            this.$t('reminder.button.ok')
          )
        }
      }
    },
    // 时间格式化处理
    timeStampDeal(time) {
      return Lib.common.getDate(new Date(time * 1000), 'dd/MM HH:mm:ss')
    },
    // 时间过期状态判断
    timeStatusJudge(time) {
      return this.nowDate > (time * 1000 || 0)
    },
    // 切换rules
    toggle(index) {
      this.openIndex = index
    },
    // 根据用户需要进行过滤
    getShowResult(data) {
      this.freeBetValid(data)
    },
    // 打开加载动画
    openLoading() {
      console.log(111)
    },
    // tab切换触发的事件
    emitChangeTab(index) {
      this.index = index
      this.freeBetValid()
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
      this.freeBetList.map((item) => {
        const str = this.getDate(item.bet_date, 'dd/MM')
        if (date !== str) {
          arr.push(true)
          date = str
        } else arr.push(false)
      })
      this.showDateList = arr
    },
    goPage(status, item) {
      if (status === 2) return
      this.lockItem = item
      this.lockItem.friend_mobile = this.lockItem.mobile
      this.lock()
    },
    manipulate(item) {
      if (new Date() > item.expire * 1000 || item.bet_result === 0) return
      this.lockItem = item
      if (item.status === 1) {
        this.lock()
      } else if (item.status === 2) {
        Lib.common.errorReminder(
          this,
          '',
          '',
          this.$t('accountGiftList.withdrawMoney'),
          this.$t('accountGiftList.goingWithdraw', {
            money: item.payout
          }),
          this.$t('reminder.button.confirm'),
          this.$t('reminder.button.cancel'),
          () => {
            this.$store.commit('changeLoadingStatus', 1)
            // 提现到账户
            this.$axios_api
              .freeBetDeposit({
                id: item.id,
                token: this.token
              })
              .then((res) => {
                this.$store.commit('changeLoadingStatus', 0)
                if (res.code === 0) {
                  this.freeBetList.forEach((a) => {
                    if (a.id === item.id) a.status = 3
                  })
                  this.$store.commit(
                    'setToastInfo',
                    this.$t('dailyGiveaway.successWithdraw')
                  )
                } else {
                  Lib.common.errorReminder(
                    this,
                    '',
                    '',
                    '',
                    this.$t('accountGiftList.withdrawFail'),
                    '',
                    this.$t('reminder.button.ok')
                  )
                }
              })
          }
        )
      }
    },
    lock() {
      this.configData =
        this.lockItem.from === 23
          ? {
              type: 0,
              leftFn: () => {
                // whatsapp
                const relNumber = this.lockItem.friend_mobile.replace(
                  /^0/,
                  '237'
                )
                const whatsappUrl =
                  `https://wa.me/?phone=${relNumber}&text=` +
                  encodeURIComponent(
                    this.friendStr + ` ${this.hostname}/${this.locale}`
                  )
                if (this.APP) {
                  APP.openBrowser(whatsappUrl)
                } else window.open(whatsappUrl, '_blank')
              },
              rightFn: () => {
                // 发短信
                this.doAction()
              }
            }
          : {
              type: 4,
              typeWord: this.$t('accountGiftList.lock2', {
                money: this.abs(Number(this.lockItem.type_amount))
              }),
              leftFn: () => {
                this.inviteFlag = false
              },
              rightFn: () => {
                this.$router.push({ path: `/${this.locale}/betslip` })
              }
            }
      this.inviteFlag = true
    },
    // 判断是否是移动端
    doAction() {
      const relNumber = this.lockItem.friend_mobile.replace(/^0/, '237')
      const shareStr = this.friendStr + ` ${this.hostname}/${this.locale}`

      const u = navigator.userAgent
      // android终端
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      const str = `sms:${relNumber}${
        isiOS ? '&' : '?'
      }body=${encodeURIComponent(shareStr)}`
      window.location.href = str
    },
    learnMore() {
      Lib.common.errorReminder(
        this,
        '',
        '',
        '',
        this.$t('accountGiftList.present', {
          get: this.$t('accountGiftList.from')[this.lockItem.from - 22],
          after: this.$t(`accountGiftList.after${this.lockItem.from - 22}`, {
            odd: this.lockItem.type_odds,
            amount: this.lockItem.type_amount
          })
        }),
        '',
        this.$t('reminder.button.ok')
      )
    }
  }
}
</script>

<style scoped lang="less">
.cl-freeBetList-wrap {
  min-height: 100vh;
  background-color: #fff;
  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 2;
  }

  .cl-giftTitle {
    padding: 10rem/36 10rem/36 10rem/36;
    text-align: center;
  }

  .cl-howToUse {
    max-width: 90rem/36;
    margin-right: 10rem/36;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    color: #000;
  }

  .cl-freeBetList {
    padding: 10rem/36 10rem/36 2rem;

    .cl-item {
      margin-bottom: 10rem/36;
      background-color: #fff;
      // background-image: url('~/assets/images/general/notSprites/promotions/freeBet/freebet-box.png');
      // background-size: 154rem/108 144rem/108;
      // background-position: top left;
      // background-repeat: no-repeat;
      box-sizing: border-box;
      min-height: 56rem/36;
      padding: 13rem/36 10rem/36 8rem/36;
      position: relative;
      box-shadow: 0 1rem/36 4rem/36 0 #cecede;
      border-radius: @mainButtonRadius;

      .cl-giftBottom {
        margin-top: 14rem/36;
        border-top: 1rem/36 solid #c1cbd5;
        // padding: 4rem/36 0 6rem/36;
        padding-top: 5rem/36;
        .cl-presentBox {
          .cl-present {
            width: 234rem/36;
            font-weight: 400;
            font-size: 10rem/36;
            color: #363636;
            line-height: 13rem/36;
          }
          .cl-accomplishNow {
            height: 20rem/36;
            border-radius: 10rem/36;
            border: 1rem/36 solid #eb4949;
            font-weight: 400;
            font-size: 8rem/36;
            color: #eb4949;
            line-height: 12rem/36;
            padding: 0 10rem/36;
            &.cl-noAccomplishNow {
              border: 1rem/36 solid #878787;
              color: #989898;
            }
          }
        }
      }

      .cl-notStart {
        position: absolute;
        right: 0;
        top: 0;
        background-color: #d7d8da;
        border-radius: 0 0 0 7rem/36;
        font-size: 8rem/36;
        padding: 2rem/36 8rem/36;
      }

      .cl-left {
        .cl-more {
          font-size: 11rem/36;
          font-weight: bold;
          color: #363636;
        }

        .cl-expires {
          padding-top: 8rem/36;
          font-size: 10rem/36;
          color: #a2a2a7;
        }

        .cl-rulesBox {
          padding-top: 5rem/36;

          .cl-rules {
            color: @mainThemeColor;
          }

          .cl-more {
            transform: rotate(180deg);

            .sprite(@icon-back-blue, 72rem);

            &.cl-closeMore {
              transform: rotate(270deg);
            }
          }
        }
      }

      .cl-right {
        .cl-money {
          font-size: 11rem/36;
          line-height: 11rem/36;
          font-weight: bold;
          color: #eb4949;
          text-align: center;
        }

        .cl-useNow {
          display: flex;
          justify-content: flex-end;
          padding-top: 5rem/36;
          .cl-useNowButton {
            background-color: @mainThemeColor;
            color: #fff;
            height: 20rem/36;
            border-radius: 11rem/36;
            padding: 0 10rem/36;
            font-size: 9rem/36;
            font-weight: 400;

            &.cl-notStartButton {
              background-color: #d7d8da;
            }
          }
        }
      }
    }
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
  }
}
</style>
