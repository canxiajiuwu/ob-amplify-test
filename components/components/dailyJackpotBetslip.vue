<template>
  <div>
    <div class="cl-jackpotBetslip-wrap">
      <div class="cl-stakeList cl-flexcc">
        <div class="cl-stakeName">
          {{ $t('dailyJackpotDetail.stake') }}
        </div>

        <div
          class="cl-stakeAmount cl-flexcc"
          v-for="(item, index) in meta.allow_bets"
          :key="index"
          :class="{ 'cl-select': moneyType === index }"
          @click="changeStake(index)"
        >
          {{ item }}
        </div>

        <div class="cl-stakeName" style="opacity: 0">
          {{ $t('dailyJackpotDetail.stake') }}
        </div>
      </div>

      <div class="cl-buttonBox cl-flexca">
        <div class="cl-clear cl-flexcc" @click="clearAll">
          <div class="cl-icon"></div>
        </div>

        <div
          class="cl-placeBet cl-flexcc"
          :class="{ 'cl-grayButton': selectArrayNew.length < result.length }"
          @click="placeBet"
        >
          <div class="cl-top">
            {{ $t('dailyJackpotDetail.place') }}
          </div>
        </div>

        <div class="cl-auto cl-flexcc" @click="autoPick">
          <div class="cl-icon"></div>
        </div>
      </div>

      <div class="cl-matchs">
        {{
          $t('dailyJackpotDetail.pick', {
            length: selectArrayNew.length,
            totalLength: result.length
          })
        }}
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  inject: ['changeMoneyType'],
  props: {
    selectArray: {
      type: Array
    },
    id: {
      type: String
    },
    meta: {
      type: Object
    },
    result: {
      type: Array
    },
    moneyType: {
      type: Number
    }
  },
  data() {
    return {
      canPlaceBet: true
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    selectArrayNew() {
      return this.selectArray.filter((item) => {
        return item !== undefined
      })
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    platform() {
      return this.$store.state.platform
    }
  },
  methods: {
    // 清楚已选
    clearAll() {
      this.$emit('autoPick', 0)
    },
    // 随机选择
    autoPick() {
      this.$emit('autoPick', this.result.length)
    },
    // 选择金额
    changeStake(index) {
      this.changeMoneyType(index)
    },
    // 投注
    placeBet() {
      if (
        this.selectArrayNew.length === this.result.length &&
        this.canPlaceBet
      ) {
        this.canPlaceBet = false
        this.$axios_api
          .jackpotDailyBet({
            token: this.token,
            platform: this.platform,
            id: this.id,
            stake: this.meta.allow_bets[this.moneyType],
            outcomes: JSON.stringify(this.selectArray)
          })
          .then((res) => {
            this.canPlaceBet = true
            if (res.code === 0) {
              Lib.common.event_statistics('dailyJackpot_placeBet_success')
              // fbq('track', 'Purchase', {value: this.meta.allow_bets[this.moneyType], currency: 'UGX', content_name:'dailyJackpot'});
              this.clearAll()
              Lib.common.errorReminderUp(
                this,
                true,
                this.$t('jackpotBetslip.accept', { id: res.data.ticket_id[0] }),
                1
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
              Lib.common.errorReminderUp(this, true, res.msg, 0)
            }
          })
          .catch((err) => {
            this.canPlaceBet = true
            console.log(err)
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-jackpotBetslip-wrap {
  box-sizing: border-box;
  width: 10rem;
  padding: 10rem/36;
  background-color: #fff;
  color: #000;

  .cl-stakeList {
    .cl-stakeName {
      color: #363636;
    }

    .cl-stakeAmount {
      width: 83rem/36;
      height: 23rem/36;
      background-color: #d4e4ec;
      border-radius: 3rem/36;
      color: #000;
      font-weight: bold;
      font-size: 10rem/36;
      margin-left: 5rem/36;

      &.cl-select {
        background-color: #fcdb07;
      }
    }
  }

  .cl-buttonBox {
    margin-top: 13rem/36;

    .cl-clear {
      width: 53rem/36;
      height: 40rem/36;
      background-color: #d4e4ec;
      border-radius: 3rem/36;

      .cl-icon {
        .sprite(@menu-jackpot-clear,108rem);
      }
    }

    .cl-auto {
      width: 53rem/36;
      height: 40rem/36;
      background-color: #4c50fa;
      border-radius: 3rem/36;

      .cl-icon {
        .sprite(@menu-jackpot-random,108rem);
      }
    }

    .cl-placeBet {
      width: 228rem/36;
      height: 40rem/36;
      background-color: #009944;
      border-radius: 3rem/36;
      color: #fff;
      text-align: center;
      flex-direction: column;

      .cl-top {
        font-size: 13rem/36;
        font-weight: bold;
      }

      .cl-bottom {
        font-size: 10rem/36;
        margin-top: 2rem/36;
      }
    }
  }

  .cl-matchs {
    font-size: 10rem/36;
    color: #333;
    text-align: center;
    padding: 5rem/36 0 10rem/36;
  }
}
</style>
