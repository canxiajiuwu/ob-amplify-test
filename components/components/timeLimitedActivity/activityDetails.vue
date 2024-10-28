<template>
  <div class="cl-activityDetailsBox">
    <div>
      <div class="cl-top">
        <div class="cl-title1">{{ $t('timeLimitedActivity.title1') }}</div>
        <div class="cl-title2">
          {{ $t('timeLimitedActivity.title2') + activityInfo.join_user }}
        </div>
        <div class="cl-instruction" @click="instruction">
          <img
            :src="`${STATICURL}/images/timeLimitedActivity/instruction.png`"
            alt="instruction"
          />
        </div>
      </div>
      <div class="cl-middle">
        <div class="cl-left">
          <div class="cl-time">{{ time }}</div>
          <div class="cl-timeTitle">{{ $t('timeLimitedActivity.left') }}</div>
        </div>
        <div class="cl-right">
          <div class="cl-total">
            <!-- <div class="cl-total1">
              {{ $t("timeLimitedActivity.total") + " " }}
              <span>{{
                activityInfo.draw_amount +
                  " " +
                  (activityInfo.award_type === 6 ? "" : $t("units"))
              }}</span>
            </div>-->
            <div
              v-html="
                `${$t(
                  'timeLimitedActivity.total'
                )} <span style='font-size:0.52rem'>${
                  activityInfo.draw_amount
                }</span> ${rewardType[activityInfo.award_type]}`
              "
            ></div>
            <!-- <div class="cl-rewardType">
              {{ rewardType[activityInfo.award_type] }}
            </div>-->
          </div>
          <div
            class="cl-chooseNum"
            :class="{ 'cl-chooseNumTop': activityInfo.award_type === 5 }"
            v-html="
              $t('timeLimitedActivity.chooseNum', {
                num: activityInfo.draw_user
              })
            "
          ></div>
        </div>
      </div>

      <div
        class="cl-bottom"
        :class="{
          'cl-doneBottom': activityInfo.is_done && activityInfo.is_join
        }"
      >
        <template v-if="activityInfo.is_done && activityInfo.is_join">
          <div class="cl-waitingResults">
            {{ $t('timeLimitedActivity.waitingResults') }}
          </div>
        </template>
        <template v-else>
          <div class="cl-top">
            <div class="cl-conditions">
              {{ $t('timeLimitedActivity.conditions') }}
            </div>
            <div class="cl-unaccomplished" v-if="activityInfo.type">
              {{
                activityInfo.is_done
                  ? $t('timeLimitedActivity.accomplished')
                  : $t('timeLimitedActivity.unaccomplished')
              }}
            </div>
          </div>
          <div class="cl-conditionsBox">
            <div
              class="cl-item"
              v-for="(item, index) in conditionsList"
              :key="index"
            >
              <div class="cl-icon" v-if="activityInfo.type"></div>
              <div
                class="cl-title"
                :class="{ 'cl-greenerTitle': !activityInfo.type }"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div
      class="cl-btn"
      :class="{ 'cl-doneBtn': activityInfo.is_done && activityInfo.is_join }"
      @click="toJoin"
    >
      {{
        activityInfo.is_join
          ? $t('timeLimitedActivity.participated')
          : $t('timeLimitedActivity.clickJoin')
      }}
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  name: 'ActivityDetailsBox',
  props: {
    time: {
      type: String
    },
    activityInfo: {
      type: Object
    },
    token: {
      type: String
    }
  },
  data() {
    return {
      rewardType: [
        '',
        "<span style='font-size:0.52rem'>XAF</span>",
        "<span style='font-size:0.52rem'>XAF</span> Sports Freebet",
        "<span style='font-size:0.52rem'>XAF</span> Sports Gifts",
        "<span style='font-size:0.52rem'>XAF</span> Casino Gifts",
        "<span style='font-size:0.52rem'>XAF</span> <div style='margin-top: 0.27rem'>Onebet League Freebet</div>",
        'Coins'
      ]
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    conditionsList() {
      const arr = []
      const betTypeArr = ['sports bet', 'onebet league']
      const conditionsListArr = [
        () => {
          arr.push(this.$t('timeLimitedActivity.freeJoin'))
        },
        () => {
          arr.push(this.$t('timeLimitedActivity.register'))
        },
        () => {
          arr.push(this.$t('timeLimitedActivity.deposit'))
        },
        () => {
          arr.push(
            this.$t('timeLimitedActivity.participateBetting', {
              bettingName: betTypeArr[this.activityInfo.bet_type - 1]
            })
          )
          if (this.activityInfo.limit_amount) {
            arr.push(
              `${this.$t('timeLimitedActivity.stake')} >= ${
                this.activityInfo.limit_amount
              }`
            )
          }
          if (this.activityInfo.limit_count) {
            arr.push(
              `${this.$t('timeLimitedActivity.matches')} >= ${
                this.activityInfo.limit_count
              }`
            )
          }
          if (this.activityInfo.limit_odds) {
            arr.push(
              `${this.$t('timeLimitedActivity.odds')} >= ${
                this.activityInfo.limit_odds
              }`
            )
          }
        }
      ]
      conditionsListArr[this.activityInfo.type] &&
        conditionsListArr[this.activityInfo.type]()
      return arr
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    },
    isHall() {
      return ['index', 'lang'].includes(this.$route.name)
    }
  },
  methods: {
    instruction() {
      this.$emit('emitInstruction')
    },
    // 参与投注或者注册
    toJoin() {
      if (this.activityInfo.is_join && this.activityInfo.is_done) {
        //  达成条件不可点击
        return
      }
      if (
        (this.activityInfo.is_join && !this.activityInfo.is_done) ||
        this.activityInfo.type === 1
      ) {
        // 已经参加但是未达成条件 或者去注册
        this.$emit('emitJoin')
        this.judgmentGoPage()
        return
      }
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .luckybagJoin({
          id: this.activityInfo.id,
          token: this.token
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            this.$emit('emitJoin')
            if (!this.activityInfo.is_done) {
              this.judgmentGoPage()
            }
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
          }
        })
        .catch(() => {
          this.$store.commit('changeLoadingStatus', false)
        })
    },
    // 判断去充值还是注册还是投注页面
    judgmentGoPage() {
      // 0是没得条件那么不执行这里面代码
      if (!this.activityInfo.type) return
      const betTypeArr = ['', 'onebetLeague']
      const pageArr = [
        'register',
        'deposit',
        betTypeArr[this.activityInfo.bet_type - 1]
      ]
      const path = pageArr[this.activityInfo.type - 1]
      let query = ''
      if (this.activityInfo.type === 3 || this.activityInfo.type === 1) {
        const queryObj = {
          limit_amount: this.activityInfo.limit_amount,
          limit_count: this.activityInfo.limit_count,
          limit_odds: this.activityInfo.limit_odds,
          luckyBagId: this.activityInfo.id,
          perpetual: this.activityInfo.end_time * 1000
        }
        for (const key in queryObj) {
          if (queryObj[key]) {
            query += `${query ? '&' : '?'}${key}=${queryObj[key]}`
          }
        }
      }

      if (path === this.routeName || (!path && this.isHall)) {
        history.replaceState({ type: 'bet' }, '', query)
      } else {
        this.$router.push({
          path: `/${this.$store.state.root.locale}/${path}${query}`
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
.cl-activityDetailsBox {
  width: 100%;
  background: #ffffff;
  border-radius: 1rem/36;
  padding: 10rem/36 10rem/36 15rem/36;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cl-top {
    position: relative;
    text-align: center;
    padding-top: 5rem/36;
    .cl-title1 {
      font-size: 15rem/36;
      font-weight: bold;
      color: #000000;
      line-height: 11rem/36;
    }
    .cl-title2 {
      font-size: 12rem/36;
      font-weight: 400;
      color: #7d7d7d;
      line-height: 11rem/36;
      margin-top: 9rem/36;
    }
    .cl-instruction {
      position: absolute;
      top: 0;
      right: 0;
      width: 19rem/36;
      height: 19rem/36;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .cl-middle {
    width: 100%;
    padding: 18rem/36 10rem/36;
    box-sizing: border-box;
    border-radius: 6rem/36;
    border: 1rem/36 solid #dddddd;
    background: #f4f4f4;
    display: flex;
    justify-content: space-between;
    margin-top: 20rem/36;
    .cl-left {
      font-size: 12rem/36;
      font-weight: 400;
      color: #eb0d05;
      line-height: 11rem/36;
      .cl-time {
        font-size: 19rem/36;
        font-weight: bold;
        margin-bottom: 10rem/36;
      }
    }
    .cl-right {
      .cl-total {
        text-align: end;
        font-size: 15rem/36;
        font-weight: 400;
        color: #000000;
        line-height: 11rem/36;
        // span {
        //   font-size: 19rem/36;
        //   font-weight: bold;
        // }
        // .cl-rewardType {
        //   margin-top: 10rem/36;
        // }
      }
      .cl-chooseNum {
        font-size: 12rem/36;
        font-weight: 400;
        color: #7d7d7d;
        line-height: 11rem/36;
        margin-top: 10rem/36;
        text-align: right;
        &.cl-chooseNumTop {
          margin-top: 7rem/36;
        }
      }
    }
  }
  .cl-bottom {
    width: 100%;
    background: #f4f4f4;
    border: 1rem/36 solid #dddddd;
    border-radius: 6rem/36;
    padding: 13rem/36 10rem/36 5rem/36;
    margin-top: 10rem/36;
    box-sizing: border-box;
    &.cl-doneBottom {
      background: #fff;
      border: 0;
      margin-top: 49rem/36;
      text-align: center;
    }
    .cl-waitingResults {
      font-size: 12rem/36;
      font-weight: 400;
      color: #000000;
    }
    .cl-top {
      display: flex;
      justify-content: space-between;
      font-size: 12rem/36;
      line-height: 11rem/36;

      .cl-conditions {
        font-weight: bold;
        color: #000000;
      }
      .cl-unaccomplished {
        font-weight: 400;
        color: #eb0d05;
      }
    }
    .cl-conditionsBox {
      margin-top: 12rem/36;
      .cl-greenerTitle {
        color: #34bb0f;
      }
    }
    .cl-item {
      display: flex;
      align-items: center;
      font-size: 12rem/36;
      font-weight: 400;
      color: #000000;
      line-height: 11rem/36;
      margin-bottom: 8rem/36;
      .cl-icon {
        width: 5rem/36;
        height: 5rem/36;
        background: #000000;
        border-radius: 50%;
        margin-right: 6rem/36;
      }
    }
  }
  .cl-btn {
    font-size: 15rem/36;
    font-weight: bold;
    color: #ffffff;
    width: 100%;
    height: 43rem/36;
    background: linear-gradient(90deg, #f84b47, #ff5d96);
    border-radius: 21rem/36;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 17rem/36;
    &.cl-doneBtn {
      opacity: 0.6;
    }
  }
}
</style>
