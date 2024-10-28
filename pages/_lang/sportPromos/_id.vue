<template>
  <div class="cl-sports-promos-detail-wrap">
    <headBack
      :z-index="2"
      :title="$t('sportsPromos.title').toUpperCase()"
      :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
    >
    </headBack>
    <div class="cl-list">
      <div
        class="cl-heightDom"
        :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
      />
      <dataError v-if="isRequestFailed" />
      <div v-else>
        <div v-if="requestLoading">
          <div v-if="detailData">
            <div class="cl-cardBox">
              <div
                class="cl-tags"
                v-if="
                  !(detailData.expired > nowTime && detailData.status === 0)
                "
                :class="{
                  'cl-OptIn':
                    detailData.expired > nowTime &&
                    (detailData.status === 1 || detailData.status === 2),
                  'cl-Unsettle':
                    detailData.expired < nowTime && detailData.status === 2,
                  'cl-settle':
                    detailData.expired < nowTime && detailData.status === 3,
                  'cl-noPrize':
                    detailData.expired < nowTime && detailData.status === 4,
                  'cl-expired':
                    detailData.expired < nowTime && detailData.status === 0
                }"
              >
                <div
                  class="cl-art"
                  v-if="
                    detailData.expired > nowTime &&
                    (detailData.status === 1 || detailData.status === 2)
                  "
                >
                  {{ $t('sportsPromos.status.optedIn') }}
                </div>
                <div
                  class="cl-art"
                  v-else-if="
                    detailData.expired < nowTime && detailData.status === 2
                  "
                >
                  {{ $t('sportsPromos.status.unsettled') }}
                </div>
                <div
                  class="cl-art"
                  v-else-if="
                    detailData.expired < nowTime && detailData.status === 3
                  "
                >
                  {{ $t('sportsPromos.status.settled') }}
                </div>
                <div
                  class="cl-art"
                  v-else-if="
                    detailData.expired < nowTime && detailData.status === 4
                  "
                >
                  {{ $t('sportsPromos.status.failed') }}
                </div>
                <div
                  class="cl-art"
                  v-else-if="
                    detailData.expired < nowTime && detailData.status === 0
                  "
                >
                  {{ $t('sportsPromos.status.expired') }}
                </div>
              </div>

              <div class="cl-title">
                {{
                  $t('sportsPromos.item_title', {
                    prize: $t('sportsPromos.prizes')[detailData.gift_type - 1],
                    unit: $t('units'),
                    amount: abs(
                      detailData.gift.reduce(
                        (pre, cur) => pre + cur.amount * cur.count,
                        0
                      )
                    )
                  })
                }}
              </div>
              <div class="cl-content">
                {{
                  $t('sportsPromos.detail_art', {
                    art: detailData.content.join(' & '),
                    match: `${detailData.home} vs ${detailData.away}`,
                    league: detailData.league,
                    time: getDate(detailData.expired, 'yyyy.MM.dd HH:mm'),
                    unit: $t('units'),
                    prize: $t('sportsPromos.prizes')[detailData.gift_type - 1],
                    amount: abs(
                      detailData.gift.reduce(
                        (pre, cur) => pre + cur.amount * cur.count,
                        0
                      )
                    )
                  })
                }}
              </div>

              <div class="cl-limitBox">
                <div class="cl-bet cl-limit">
                  <div
                    class="cl-icon"
                    :class="{ 'cl-check': detailData.bet }"
                  ></div>
                  <div class="cl-word">
                    {{
                      $t('sportsPromos.stake', {
                        unit: $t('units'),
                        num: abs(detailData.reach_condition.bet)
                      })
                    }}
                  </div>
                </div>

                <div class="cl-odds cl-limit">
                  <div
                    class="cl-icon"
                    :class="{ 'cl-check': detailData.odds }"
                  ></div>
                  <div class="cl-word">
                    {{
                      $t('sportsPromos.odd', {
                        num: detailData.reach_condition.odds.toFixed(2)
                      })
                    }}
                  </div>
                </div>

                <div class="cl-count cl-limit">
                  <div
                    class="cl-icon"
                    :class="{ 'cl-check': detailData.count }"
                  ></div>
                  <div class="cl-word">
                    {{
                      $t('sportsPromos.folds', {
                        num: detailData.reach_condition.session
                      })
                    }}
                  </div>
                </div>
              </div>
              <div class="cl-time">
                {{
                  $t('sportsPromos.expire', {
                    time: getDate(detailData.expired, 'dd/MM,HH:mm')
                  })
                }}
              </div>
              <div
                class="cl-button"
                :class="{
                  'cl-expired':
                    detailData.expired < nowTime ||
                    detailData.settle_status === 1
                }"
                @click="optInFun(detailData.id)"
              >
                <span
                  v-if="detailData.expired > nowTime && detailData.status === 1"
                  >{{ $t('sportsPromos.come') }}</span
                >
                <span v-else-if="detailData.status === 2">{{
                  $t('sportsPromos.completed')
                }}</span>
                <span v-else-if="detailData.status === 3">{{
                  $t('sportsPromos.status.settled')
                }}</span>
                <span v-else-if="detailData.status === 4">{{
                  $t('sportsPromos.status.failed')
                }}</span>
                <span v-else>{{ $t('sportsPromos.optIn') }}</span>
              </div>
            </div>
            <div class="cl-terms">
              <div class="cl-title">
                {{ $t('terms.title') }}
              </div>
              <div class="cl-listBox">
                <div
                  class="cl-li"
                  v-for="(item, index) in $t('sportsPromos.terms')"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
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
  name: '',
  components: {
    headBack
  },
  data() {
    return {
      detailData: null,
      isRequestFailed: false, // 是否请求失败
      requestLoading: false // 是否在请求中
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      if (Lib.store.get('token')) {
        return Lib.common.decrypt(Lib.store.get('token'))
      } else {
        return ''
      }
    },
    nowTime() {
      return Math.floor(new Date().getTime() / 1000)
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    // 初始化请求
    this.promoDetailReq()
  },
  methods: {
    // 活动详情数据请求
    promoDetailReq() {
      this.$axios_api
        .promoDetail({
          id: this.$route.params.id,
          token: this.token
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.detailData = res.data
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 点击加入活动
    optInFun(id) {
      Lib.common.event_statistics(`sports_promos_detail_opt_in_click`)
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
      // 请求加入活动
      if (
        this.detailData.expired > this.nowTime &&
        this.detailData.status === 0
      )
        this.reqPromos(id)
      else if (
        this.detailData.expired > this.nowTime &&
        this.detailData.status === 1
      ) {
        let conditions = ''
        if (!this.detailData.bet)
          conditions += this.$t('sportsPromos.stake', {
            unit: this.$t('units'),
            num: this.abs(this.detailData.reach_condition.bet)
          })
        if (!this.detailData.odds)
          conditions += `${conditions ? ' & ' : ''} ${this.$t(
            'sportsPromos.odd',
            { num: this.detailData.reach_condition.odds.toFixed(2) }
          )}`
        if (!this.detailData.count)
          conditions += `${conditions ? ' & ' : ''} ${this.$t(
            'sportsPromos.folds',
            { num: this.detailData.reach_condition.session }
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
      } else if (
        this.detailData.expired > this.nowTime &&
        this.detailData.status === 2
      )
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('sportsPromos.reminderList.complete'),
          '',
          this.$t('reminder.button.ok')
        )
      else if (
        this.detailData.expired < this.nowTime &&
        this.detailData.status === 2
      )
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('sportsPromos.reminderList.unsettled'),
          '',
          this.$t('reminder.button.ok')
        )
      else if (this.detailData.status === 3)
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('sportsPromos.reminderList.settled'),
          '',
          this.$t('reminder.button.ok')
        )
      else if (this.detailData.status === 4)
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('sportsPromos.reminderList.failed'),
          '',
          this.$t('reminder.button.ok')
        )
      else if (
        this.detailData.expired < this.nowTime &&
        (this.detailData.status === 0 || this.detailData.status === 1)
      )
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('sportsPromos.reminderList.expired'),
          '',
          this.$t('reminder.button.ok')
        )
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
            Lib.common.event_statistics(`sports_promos_detail_opt_in_success`)
            // 加入成功后更新列表数据
            this.promoDetailReq()
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
    // 金额格式化
    abs(num) {
      return Lib.common.abs(num)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cl-sports-promos-detail-wrap {
  .cl-list {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    background-color: #fff;
    overflow: auto;
    padding: 10rem/36 10rem/36;

    .cl-cardBox {
      position: relative;
      width: 340rem/36;
      background: #ffffff;
      box-shadow: 0 0 5rem/36 0 rgba(208, 208, 216, 0.47);
      border-radius: 5rem/36;
      border: 0.1px solid #d4dae1;
      box-sizing: border-box;
      padding: 36rem/36 10rem/36;

      .cl-tags {
        position: absolute;
        left: 0;
        top: 5rem/36;
        width: 63rem/36;
        height: 25rem/36;
        border-radius: 0 12rem/36 12rem/36 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11rem/36;
        font-weight: bold;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);

        &.cl-OptIn {
          background-color: #ffc000;
        }

        &.cl-expired {
          background-color: #c3c3c3;
        }

        &.cl-Unsettle {
          background-color: #babcff;
        }

        &.cl-settle {
          background-color: #babcff;
        }

        &.cl-noPrize {
          background-color: #c3c3c3;
        }
      }

      .cl-title {
        width: 260rem/36;
        color: #000000;
        font-weight: bold;
        font-size: 13rem/36;
        line-height: 17rem/36;
      }

      .cl-content {
        padding: 10rem/36 0;
        color: #000000;
        line-height: 16rem/36;
      }

      .cl-limitBox {
        .cl-limit {
          font-size: 11rem/36;
          color: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          padding: 3rem/36 0;

          .cl-icon {
            .sprite(@sports-promo-no,108rem);

            &.cl-check {
              .sprite(@sports-promo-comp2,108rem);
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
        color: #000;
        padding-top: 3rem/36;
      }

      .cl-button {
        width: 300rem/36;
        height: 40rem/36;
        background: #4c50fa;
        border-radius: 3rem/36;
        margin: 30rem/36 auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13rem/36;
        font-weight: bold;
        color: #fff;

        &.cl-expired {
          background-color: #d8d9da;
        }
      }
    }

    .cl-terms {
      padding: 30rem/36 0 30rem/36;

      .cl-title {
        color: #000000;
        font-size: 11rem/36;
        font-weight: bold;
      }

      .cl-listBox {
        color: #000000;
        font-size: 11rem/36;
        line-height: 15rem/36;
        padding-top: 10rem/36;
      }
    }
  }
}
</style>
