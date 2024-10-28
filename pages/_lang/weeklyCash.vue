<template>
  <div class="cl-weeklyCash-wrap">
    <div class="cl-top">
      <headBack :bgcolor="mainStyle.mainThemeColor" is-white-back>
        <template>
          <div class="cl-top_right">
            <div class="cl-flexcc cl-logined" v-if="info">
              <div class="cl-flexcc cl-accountInfo" @click="goWhere('account')">
                <div class="cl-icon" />
                <div class="cl-balance">
                  {{ info && info.balance ? info.balance.toFixed(2) : '0.00' }}
                </div>
              </div>
            </div>
            <div class="cl-flexce cl-right" v-else>
              <div class="cl-flexcc cl-lkButton" @click="goWhere('login')">
                <div>{{ $t('loginEntry.login') }}</div>
              </div>
              <div class="cl-flexcc cl-tcButton" @click="goWhere('register')">
                <div>{{ $t('loginEntry.joinNow') }}</div>
              </div>
            </div>
          </div>
        </template>
      </headBack>
    </div>

    <div class="cl-content">
      <!-- top固定定位需要把下面内容撑出来 -->
      <div
        class="cl-heightDom"
        :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
      />
      <div style="position: relative">
        <img
          class="cl-img"
          :src="`${STATICURL}/images/lang/${locale}/${country}/promotions/weekly/weeklyCashBg.jpg`"
        />
        <!-- 图片过长需要把公告定位在图片下面 -->
        <div class="cl-notice cl-flexcc">
          <div class="cl-noticeWidth">
            <div
              class="cl-notice0"
              v-html="$t('jackpotsWeeklyCash.notice[0]')"
            />

            <div style="display: flex">
              <div class="cl-dianWidth cl-flexcc">
                <div class="cl-dian" />
              </div>
              <div
                class="cl-notice1"
                v-html="$t('jackpotsWeeklyCash.notice[1]')"
              />
            </div>

            <div style="display: flex">
              <div class="cl-dianWidth cl-flexcc">
                <div class="cl-dian" />
              </div>
              <div
                class="cl-notice2"
                v-html="$t('jackpotsWeeklyCash.notice[2]')"
              />
            </div>

            <div style="display: flex">
              <div class="cl-tipsBg cl-flexcc">
                <div class="cl-tips" v-html="$t('jackpotsWeeklyCash.tips')" />
              </div>
              <div
                class="cl-notice3"
                v-html="$t('jackpotsWeeklyCash.notice[3]')"
              />
            </div>

            <div :style="{ height: 21 / 36 + 'rem' }" />
            <div class="cl-flexcc">
              <div class="cl-betNow cl-flexcc" @click="goJackpots">
                {{ $t('jackpotsWeeklyCash.betNow') }}
              </div>
            </div>

            <div :style="{ height: 18 / 36 + 'rem' }" />
            <div class="cl-flexcc">
              <div class="cl-joinUsers">
                {{ $t('jackpotsWeeklyCash.joinUsers') }}
              </div>
              <div class="cl-joinUsersNum">
                {{ Number(joinUsers) ? Number(joinUsers) : '--' }}
              </div>
            </div>

            <div :style="{ height: 8 / 36 + 'rem' }" />
          </div>
        </div>
      </div>
      <!-- 公告定位后留下的空位需要填补以及往下空出一段空白 -->
      <div :style="{ height: 202 / 36 + 'rem' }" />
      <div v-if="lastWeekList.length" class="cl-flexcc">
        <div class="cl-lastWeekRewardList cl-flexcc">
          <div class="cl-lastWeekRewardListWidth">
            <div :style="{ height: 10 / 36 + 'rem' }" />
            <div class="cl-flexcb">
              <div class="cl-flexcc">
                <div class="cl-trophy" />
                <div class="cl-lastWeek">
                  {{ $t('jackpotsWeeklyCash.lastWeek') }}
                </div>
              </div>
              <div
                class="cl-downIcon"
                :class="downFlag ? 'cl-iconRotate' : 'cl-iconReset'"
                @click="openLastWeek(!downFlag)"
              />
            </div>

            <!-- 收起展开动画容器 -->

            <CollapseTransition>
              <div v-if="downFlag">
                <div :style="{ height: 25 / 36 + 'rem' }" />
                <div class="cl-listWidth">
                  <div class="cl-flexcc">
                    <div
                      class="cl-box cl-boxHeader cl-flexcc"
                      v-for="(item, index) in $t(
                        'jackpotsWeeklyCash.listHeader'
                      )"
                      :class="index === 0 ? 'cl-boxRight' : ''"
                      :key="index"
                    >
                      {{ item }}
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in lastWeekList"
                    :key="index"
                    class="cl-flexcc"
                  >
                    <div class="cl-flexcc">
                      <div
                        class="cl-box cl-boxRight cl-flexcc"
                        :class="{
                          'cl-borderBottom': lastWeekList.length !== index + 1,
                          'cl-borderTop': index === 0
                        }"
                      >
                        {{ item.mobile }}
                      </div>
                      <div
                        class="cl-box cl-flexcc"
                        :class="{
                          'cl-borderBottom': lastWeekList.length !== index + 1,
                          'cl-borderTop': index === 0
                        }"
                      >
                        {{ Number(item.amount).toLocaleString('en-US') }}
                        {{ $t('jackpotsWeeklyCash.monetaryUnit') }}
                      </div>
                    </div>
                  </div>
                </div>

                <div :style="{ height: 19 / 36 + 'rem' }" />
                <div class="cl-flexcc">
                  <div class="cl-upIcon" @click="openLastWeek(false)" />
                </div>
              </div>
            </CollapseTransition>

            <div
              :style="{ height: downFlag ? 15 / 36 + 'rem' : 12 / 36 + 'rem' }"
            />
          </div>
        </div>
      </div>

      <div :style="{ height: 31 / 36 + 'rem' }" />
      <div class="cl-down cl-flexcc">
        <div class="cl-downWidth">
          <div class="cl-flexcc">
            <div class="cl-border" />
            <h2 class="cl-h2 cl-TermsConditions">Terms & Conditions</h2>
            <div class="cl-border" />
          </div>

          <div :style="{ height: 13 / 36 + 'rem' }" />
          <div class="cl-termsConditionList">
            <div
              v-for="(item, index) in $t(
                'jackpotsWeeklyCash.termsConditionList'
              )"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <!-- 撑开留白 -->
          <div :style="{ height: 30 / 36 + 'rem' }" />
        </div>
      </div>
    </div>

    <div v-if="winningAmountFlag" class="cl-mask-layer cl-flexcc">
      <div class="cl-noticeWinning">
        <div :style="{ height: 10 / 36 + 'rem' }" />
        <div class="cl-title cl-flexcc">
          {{ $t('jackpotsWeeklyCash.noticeWinning.title') }}
        </div>
        <div :style="{ height: 20 / 36 + 'rem' }" />
        <div class="cl-fontContent">
          {{ $t('jackpotsWeeklyCash.noticeWinning.contentFront') }}
          <span>{{
            Number(winningAmount) ? Number(winningAmount) : '--'
          }}</span>
          {{ $t('jackpotsWeeklyCash.noticeWinning.contentBehind') }}
        </div>
        <div :style="{ height: 15 / 36 + 'rem' }" />
        <div class="cl-flexcc">
          <div class="cl-OkButton cl-flexcc" @click="clickOk">
            {{ $t('jackpotsWeeklyCash.noticeWinning.ok') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'WeeklyCash',
  components: { headBack, CollapseTransition: Lib.common.CollapseTransition },
  data() {
    return {
      flag: true,
      joinUsers: null,
      downFlag: false,
      winningAmount: null,
      winningAmountFlag: false,
      lastWeekList: []
    }
  },
  computed: {
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    STATICURL() {
      return process.env.STATICURL
    },
    info() {
      return this.$store.state.info
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    isGrandJackpotNoData() {
      return this.$store.state.isGrandJackpotNoData
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  created() {
    if (!this.info && this.token) this.getInfo()
    this.getLastWeek()
  },
  mounted() {
    // 隐藏skelet
    Lib.common.hideSkeleton()
  },
  methods: {
    // 获取中奖名单
    getLastWeek() {
      this.$axios_api.jackpotWeeklyCash({ token: this.token }).then((res) => {
        if (res.code === 0) {
          this.joinUsers = res.data.join
          this.lastWeekList = res.data.user
          if (res.data.self && Number(res.data.self.amount) > 0) {
            this.winningAmount = Number(res.data.self.amount)
            this.queryNotification(res.data)
          }
        }
      })
    },
    // 查询本地是否通知过
    queryNotification(resdata) {
      const date = Lib.store.get('onebetWinningFlag')
      if (date === resdata.week_number) return
      this.winningAmountFlag = true
      Lib.store.set('onebetWinningFlag', resdata.week_number)
    },
    // 名单显示与隐藏
    openLastWeek: Lib.common.throttle(function (flag) {
      this.downFlag = flag
    }, 300),
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) this.$store.commit('setInfo', res.data)
      })
    },
    // 页面跳转
    goWhere(path) {
      Lib.common.event_statistics(`home_${path}`)
      this.$router.push({
        path: `/${this.locale}` + '/' + path
      })
    },
    // 跳转至Jackpot入口页
    goJackpots() {
      Lib.common.event_statistics('home_jackpot')
      this.$router.replace({
        path: `/${this.locale}/${
          this.isGrandJackpotNoData
            ? 'jackpotEntrance/dailyJackpots'
            : 'jackpotEntrance'
        }`
      })
    },
    // 关闭中奖通知
    clickOk() {
      this.winningAmountFlag = false
    }
  }
}
</script>

<style scoped lang="less">
.cl-weeklyCash-wrap {
  min-height: 100vh;
  background-color: #fff;
  .cl-top {
    position: fixed;
    width: 10rem;
    top: 0;
    z-index: 1;
    .cl-top_right {
      margin-right: 9rem/36;

      .cl-logined {
        .cl-accountInfo {
          .cl-icon {
            .sprite(@icon-account-white, 108rem);
          }
          .cl-balance {
            margin-left: 7rem/36;
            font-weight: bold;
            font-size: 11rem/36;
            color: @balanceColor;
            white-space: nowrap;
          }
        }
      }

      .cl-lkButton {
        margin-right: 7rem/36;
        border: 1rem/36 solid @mainButtonComparedColor;
      }
    }
  }
  .cl-content {
    background: linear-gradient(0deg, #df4073, #fc445e);
    .cl-down {
      .cl-downWidth {
        width: 324rem/36;
        .cl-border {
          border-top: 1px solid #fff;
          width: 90rem/36;
        }
        .cl-TermsConditions {
          color: #fff;
          font-weight: 800;
          font-size: 12rem/36;
          margin: 0 12rem/36;
        }
        .cl-termsConditionList {
          color: #fff;
          font-size: 12rem/36;
          font-weight: 400;
          opacity: 0.8;
          line-height: 15rem/36;
        }
      }
    }
    .cl-img {
      width: 10rem;
    }
    .cl-notice {
      width: 330rem/36;
      background-color: #fdf8ee;
      position: absolute;
      bottom: -192rem/36;
      left: 15rem/36;
      border-radius: 7rem/36;
      .cl-noticeWidth {
        width: 296rem/36;
        margin-top: 19rem/36;
        font-size: 11rem/36;
        color: #333;
        .cl-notice0 {
          opacity: 0.9;
          margin-bottom: 18rem/36;
        }
        .cl-notice1 {
          font-weight: bold;
          flex: 1;
          margin-bottom: 15rem/36;
        }
        .cl-notice2 {
          font-weight: bold;
          color: #000;
          flex: 1;
          margin-bottom: 21rem/36;
        }
        .cl-notice3 {
          flex: 1;
          opacity: 0.9;
        }
        .cl-dianWidth {
          height: 14rem/36;
          width: 14rem/36;
          margin-right: 3rem/36;
          .cl-dian {
            width: 6rem/36;
            height: 6rem/36;
            border-radius: 50%;
            background-color: #000;
          }
        }
        .cl-tipsBg {
          height: 15rem/36;
          box-sizing: border-box;
          background-color: #5f2af6;
          border-radius: 3rem/36;
          overflow: hidden;
          margin-right: 5rem/36;
          padding: 4rem/36 4rem/36 3rem/36 5rem/36;
          .cl-tips {
            font-size: 11rem/36;
            font-weight: bold;
            color: #fff;
          }
        }
        .cl-betNow {
          width: 267rem/36;
          height: 40rem/36;
          background: linear-gradient(
            96deg,
            rgba(188, 36, 209, 1),
            rgba(254, 65, 90, 1)
          );
          border-radius: 20rem/36;
          font-size: 17rem/36;
          color: #fff;
          font-weight: bold;
        }
        .cl-betNow:active {
          background: linear-gradient(
            96deg,
            rgba(188, 36, 209, 0.8),
            rgba(254, 65, 90, 0.8)
          );
        }
        .cl-joinUsers {
          font-size: 10rem/36;
          font-weight: bold;
          color: #000;
          opacity: 0.5;
        }
        .cl-joinUsersNum {
          font-size: 10rem/36;
          font-weight: bold;
          color: #000;
          opacity: 0.8;
          margin-left: 6rem/36;
        }
      }
    }
    .cl-lastWeekRewardList {
      width: 330rem/36;
      background-color: #fdf8ee;
      border-radius: 7rem/36;
      .cl-lastWeekRewardListWidth {
        width: 310rem/36;
        .cl-trophy {
          .sprite(@icon-weekly-cash-trophy, 72rem);
        }
        .cl-lastWeek {
          color: #000;
          font-size: 11rem/36;
          font-weight: bold;
          margin-left: 7rem/36;
        }
        .cl-downIcon {
          .sprite(@icon-weekly-cash-down, 72rem);
        }
        .cl-iconRotate {
          transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
          transition: transform 0.3s;
        }

        .cl-iconReset {
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          transition: transform 0.3s;
        }

        .cl-listWidth {
          margin-left: 11rem/36;
          border: 1px solid #ea6b7c;
          width: 289rem/36;
          .cl-box {
            width: 144rem/36;
            height: 34rem/36;
            font-size: 12rem/36;
            font-weight: 400;
            color: #231919;
          }
          .cl-boxRight {
            border-right: 1px solid #ea6b7c;
          }
          .cl-boxHeader {
            background-color: #feb452;
            font-weight: bold;
            color: #fffefe;
            text-align: center;
          }
          .cl-borderBottom {
            border-bottom: 1px solid #ea6b7c;
          }
          .cl-borderTop {
            border-top: 1px solid #ea6b7c;
          }
        }
        .cl-upIcon {
          .sprite(@icon-weekly-cash-up, 108rem);
        }
      }
    }
  }
  .cl-mask-layer {
    width: 10rem;
    height: 100vh;
    position: fixed;
    top: 0;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 8;
    .cl-noticeWinning {
      width: 9rem;
      height: 5rem;
      background-color: #fff;
      border-radius: 5rem/36;
      .cl-title {
        font-size: 20rem/36;
        font-weight: bold;
      }
      .cl-fontContent {
        width: 8rem;
        margin: 0 auto;
        text-align: center;
        font-size: 16rem/36;
      }
      .cl-OkButton {
        width: 8rem;
        height: 40rem/36;
        border-radius: 20rem/36;
        background-color: #fff;
        border: 0.01rem solid rgb(180, 180, 180);
        font-size: 20rem/36;
        color: #000;
      }
      .cl-OkButton:active {
        background-color: rgba(240, 240, 240, 0.5);
      }
    }
  }
}
</style>
