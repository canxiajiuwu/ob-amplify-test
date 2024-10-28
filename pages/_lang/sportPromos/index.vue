<template>
  <div class="cl-promos-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('sportsPromos.title').toUpperCase()"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div class="cl-list">
      <dataError v-if="isRequestFailed" />
      <div v-else>
        <div v-if="requestLoading">
          <div v-if="result.length > 0">
            <div v-for="item in result" :key="item.id">
              <div
                class="cl-itemBox"
                :class="[
                  `no-league-${item.tournament_id}`,
                  (item.expired < nowTime || item.settle_status === 1) &&
                  (item.status === 0 || item.status === 1)
                    ? 'cl-expired'
                    : ''
                ]"
              >
                <div
                  class="cl-tags"
                  v-if="!(item.status === 0)"
                  :class="{
                    'cl-OptIn':
                      item.expired > nowTime &&
                      (item.status === 1 || item.status === 2)
                  }"
                >
                  <div
                    class="cl-art"
                    v-if="
                      item.expired > nowTime &&
                      (item.status === 1 || item.status === 2)
                    "
                  >
                    {{ $t('sportsPromos.status.optedIn') }}
                  </div>
                  <div
                    class="cl-art"
                    v-else-if="item.expired < nowTime && item.status === 2"
                  >
                    {{ $t('sportsPromos.status.unsettled') }}
                  </div>
                  <div
                    class="cl-art"
                    v-else-if="item.expired < nowTime && item.status === 3"
                  >
                    {{ $t('sportsPromos.status.settled') }}
                  </div>
                  <div
                    class="cl-art"
                    v-else-if="item.expired < nowTime && item.status === 4"
                  >
                    {{ $t('sportsPromos.status.failed') }}
                  </div>
                  <div
                    class="cl-art"
                    v-else-if="
                      item.expired < nowTime &&
                      (item.status === 0 || item.status === 1)
                    "
                  >
                    {{ $t('sportsPromos.status.expired') }}
                  </div>
                </div>
                <div class="cl-title">
                  {{
                    $t('sportsPromos.item_title', {
                      prize: $t('sportsPromos.prizes')[item.gift_type - 1],
                      unit: $t('units'),
                      amount: abs(
                        item.gift.reduce(
                          (pre, cur) => pre + cur.amount * cur.count,
                          0
                        )
                      )
                    })
                  }}
                </div>
                <div class="cl-content">
                  {{
                    $t('sportsPromos.list_art', {
                      art: item.content.join(' & '),
                      match: `${item.home} vs ${item.away}`
                    })
                  }}
                  {{ item.league }}
                </div>
                <div class="cl-limitBox">
                  <div class="cl-bet cl-limit">
                    <div
                      class="cl-icon"
                      :class="{ 'cl-check': item.bet }"
                    ></div>
                    <div class="cl-word">
                      {{
                        $t('sportsPromos.stake', {
                          unit: $t('units'),
                          num: abs(item.reach_condition.bet)
                        })
                      }}
                    </div>
                  </div>

                  <div class="cl-odds cl-limit">
                    <div
                      class="cl-icon"
                      :class="{ 'cl-check': item.odds }"
                    ></div>
                    <div class="cl-word">
                      {{
                        $t('sportsPromos.odd', {
                          num: item.reach_condition.odds.toFixed(2)
                        })
                      }}
                    </div>
                  </div>

                  <div class="cl-count cl-limit">
                    <div
                      class="cl-icon"
                      :class="{ 'cl-check': item.count }"
                    ></div>
                    <div class="cl-word">
                      {{
                        $t('sportsPromos.folds', {
                          num: item.reach_condition.session
                        })
                      }}
                    </div>
                  </div>
                </div>
                <div class="cl-time">
                  {{
                    $t('sportsPromos.expire', {
                      time: getDate(item.expired, 'dd/MM,HH:mm')
                    })
                  }}
                </div>
                <div class="cl-buttonBox">
                  <div
                    class="cl-button cl-opt-in"
                    v-if="item.status === 0"
                    @click="optInFun(item.id, item)"
                  >
                    {{ $t('sportsPromos.optIn') }}
                  </div>
                  <div
                    class="cl-button cl-complete"
                    v-else-if="item.expired > nowTime && item.status === 1"
                    @click="optInFun(item.id, item)"
                  >
                    {{ $t('sportsPromos.come') }}
                  </div>
                  <div class="cl-button cl-more" @click="showMoreFun(item.id)">
                    {{ $t('sportsPromos.more') }}
                  </div>
                </div>
                <div class="cl-bg"></div>
              </div>
              <div :style="{ height: 10 / 36 + 'rem' }" />
            </div>
          </div>
          <dataNoResult v-else />
        </div>
        <dataLoading v-else />
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'SportsPromos',
  components: { headBack },
  data() {
    return {
      result: [], // 活动列表数据
      isRequestFailed: false, // 是否请求失败
      requestLoading: false // 是否在请求中
    }
  },
  computed: {
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    nowTime() {
      return Math.floor(new Date().getTime() / 1000)
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    // 初始化请求
    this.promoListReq()
  },
  methods: {
    // 请求数据列表
    promoListReq() {
      this.$axios_api
        .promoList({
          token: this.token
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            const date = new Date().getTime()
            const data = res.data.filter((item) => item.content && item.gift)
            const prePromos = data.filter((item) => item.expired * 1000 > date)
            const expiredPromos = data.filter(
              (item) => item.expired * 1000 <= date
            )
            // 比赛游戏已加入赛事，未达到条件的数据
            if (this.result.length === 0) {
              // 第一次进入弹出
              this.completeReward(
                data.filter(
                  (item) => item.expired > this.nowTime && item.status === 1
                )
              )
            }
            this.result = prePromos.concat(expiredPromos)
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 比赛游戏已加入赛事，未达到条件的数据
    completeReward(data) {
      // 有未完成的订单
      if (data.length) {
        // 判断当日是否弹出过
        const sportsPromoDay = Lib.store.get('sportsPromoDay')
        const date = new Date().getDate()
        if (!(sportsPromoDay && sportsPromoDay == date)) {
          Lib.store.set('sportsPromoDay', date)
          // 当日未弹出过
          let conditions = ''
          if (!data[0].bet)
            conditions += this.$t('sportsPromos.stake', {
              unit: this.$t('units'),
              num: this.abs(data[0].reach_condition.bet)
            })
          if (!data[0].odds)
            conditions += `${conditions ? ' & ' : ''} ${this.$t(
              'sportsPromos.odd',
              { num: data[0].reach_condition.odds.toFixed(2) }
            )}`
          if (!data[0].count)
            conditions += `${conditions ? ' & ' : ''} ${this.$t(
              'sportsPromos.folds',
              { num: data[0].reach_condition.session }
            )}`
          Lib.common.errorReminder(
            this,
            'sportsPromosGoBet',
            '',
            `${data[0].home} vs ${data[0].away}`,
            this.$t('sportsPromos.reminderList.goBet', {
              condition: conditions
            }),
            this.$t('accountMybetDetailBox.cancel'),
            this.$t('reminder.button.ok')
          )
        }
      }
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 金额格式化
    abs(num) {
      return Lib.common.abs(num)
    },
    // 点击加入活动
    optInFun(id, item) {
      Lib.common.event_statistics(`sports_promos_optIn_click`)
      if (!this.token) {
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
        return
      }

      if (item.expired > this.nowTime && item.status === 0) this.reqPromos(id)
      else if (item.expired > this.nowTime && item.status === 1) {
        let conditions = ''
        if (!item.bet)
          conditions += this.$t('sportsPromos.stake', {
            unit: this.$t('units'),
            num: this.abs(item.reach_condition.bet)
          })
        if (!item.odds)
          conditions += `${conditions ? ' & ' : ''} ${this.$t(
            'sportsPromos.odd',
            { num: item.reach_condition.odds.toFixed(2) }
          )}`
        if (!item.count)
          conditions += `${conditions ? ' & ' : ''} ${this.$t(
            'sportsPromos.folds',
            { num: item.reach_condition.session }
          )}`
        Lib.common.errorReminder(
          this,
          'sportsPromosGoBet',
          '',
          '',
          this.$t('sportsPromos.reminderList.goBet', { condition: conditions }),
          '',
          this.$t('reminder.button.ok')
        )
      }
    },
    // 请求加入活动
    reqPromos(id) {
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .promoJoin({
          token: this.token,
          id
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            Lib.common.event_statistics(`sports_promos_optIn_success`)
            // 加入成功后更新列表数据
            this.promoListReq()
            // 加入成功弹出提示
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('sportsPromos.success'),
              '',
              this.$t('reminder.button.ok')
            )
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
          } else {
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              res.msg,
              '',
              this.$t('reminder.button.ok')
            )
          }
        })
    },
    // 打开活动详情页
    showMoreFun(id) {
      Lib.common.event_statistics(`sports_promos_show_more_click`)
      this.$router.push(`/${this.$store.state.root.locale}/sportPromos/${id}`)
    }
  }
}
</script>

<style scoped lang="less">
.cl-promos-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
    .cl-backIcon {
      .sprite(@icon-white-long-back, 108rem);
    }
  }

  .cl-list {
    padding: 10rem/36 10rem/36;

    .cl-itemBox {
      position: relative;
      height: 270rem/36;
      overflow: hidden;
      border-radius: 5rem/36;
      box-sizing: border-box;
      padding: 10rem/36 10rem/36 15rem/36;
      color: #ffffff;
      background: linear-gradient(180deg, #164e9d 0%, #011d44 100%);

      &.cl-expired::after {
        content: 'Expired';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14rem/36;
      }

      .cl-tags {
        position: absolute;
        right: 0;
        top: 15rem/36;
        width: 63rem/36;
        height: 25rem/36;
        border-radius: 12rem/36 0 0 12rem/36;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11rem/36;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.5);

        .cl-OptIn {
          background: #ffc000;
        }
      }

      .cl-title {
        font-size: 13rem/36;
        line-height: 17rem/36;
        font-weight: bold;
        height: 1rem;
      }

      .cl-content {
        line-height: 16rem/36;
        padding: 5rem/36 0 10rem/36;
        height: 64rem/36;
      }

      .cl-limitBox {
        .cl-limit {
          font-size: 11rem/36;
          color: #fff;
          display: flex;
          align-items: center;
          padding: 3rem/36 0;

          .cl-icon {
            .sprite(@sports-promo-no,108rem);

            &.cl-check {
              .sprite(@sports-promo-comp1,108rem);
            }
          }

          .cl-word {
            padding-left: 5rem/36;
            opacity: 0.8;
          }
        }
      }

      .cl-time {
        opacity: 0.8;
        font-size: 11rem/36;
        color: #fff;
        padding-top: 3rem/36;
      }

      .cl-buttonBox {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 15rem/36;

        .cl-button {
          border: 1rem/36 solid #fff;
          width: 100rem/36;
          height: 35rem/36;
          border-radius: 3rem/36;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13rem/36;
          margin-left: 6rem/36;

          &.cl-complete {
            width: 220rem/36;
            padding: 0 10rem/36;
            box-sizing: border-box;
            height: 37rem/36;
            text-align: center;
            margin-left: 0;
          }
        }
      }

      .cl-bg {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    .no-league-7 {
      background: linear-gradient(180deg, #3f39d0 0%, #1811aa 100%);

      .cl-bg {
        .sprite(@sports-promo-7, 108rem);
      }
    }

    .no-league-8 {
      background: linear-gradient(180deg, #164e9d 0%, #011d44 100%);
      .cl-bg {
        .sprite(@sports-promo-8, 108rem);
      }
    }

    .no-league-16 {
      background: linear-gradient(180deg, #970b32 0%, #47021a 100%);
      .cl-bg {
        .sprite(@sports-promo-16, 108rem);
      }
    }

    .no-league-17 {
      background: linear-gradient(180deg, #7e129c 0%, #520667 100%);
      .cl-bg {
        .sprite(@sports-promo-17, 108rem);
      }
    }

    .no-league-23 {
      background: linear-gradient(180deg, #00bade 0%, #092e9c 100%);
      .cl-bg {
        .sprite(@sports-promo-23, 108rem);
      }
    }

    .no-league-34 {
      background: linear-gradient(180deg, #093684 0%, #091c3e 100%);
      .cl-bg {
        .sprite(@sports-promo-34, 108rem);
      }
    }

    .no-league-35 {
      background: linear-gradient(180deg, #d90e11 0%, #a92426 100%);
      .cl-bg {
        .sprite(@sports-promo-35, 108rem);
      }
    }
  }
}
</style>
