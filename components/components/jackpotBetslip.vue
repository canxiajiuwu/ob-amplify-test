<template>
  <div>
    <div class="cl-jackpotBetslip-wrap">
      <div class="cl-flexcc cl-wordBox">
        <div class="cl-flexcc cl-item">
          <div class="cl-left">{{ $t('jackpotBetslip.Combinations') }}</div>
          <div class="cl-right">{{ combinations.length }}</div>
        </div>

        <div class="cl-flexcc cl-item">
          <div class="cl-left">{{ $t('jackpotBetslip.total') }}</div>
          <div class="cl-right">{{ stake }}</div>
        </div>
      </div>

      <div class="cl-flexca cl-buttonBox">
        <div class="cl-flexcc cl-clear" @click="clearAll">
          <div class="cl-icon" />
        </div>

        <div
          class="cl-flexcc cl-lkButton cl-placeBet"
          :class="{ 'cl-isButtonCanNotUse': selectArrayNew.length < 13 }"
          @click="placeBet"
        >
          <div class="cl-top">{{ $t('jackpotBetslip.place') }}</div>
          <div
            class="cl-bottom"
            v-html="$t('jackpotBetslip.pay', { stake: stake })"
          />
        </div>

        <div class="cl-flexcc cl-auto" @click="autoPick">
          <div class="cl-icon" />
        </div>
      </div>

      <div class="cl-matchs">
        {{ $t('jackpotBetslip.pick', { length: selectArrayNew.length }) }}
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: {
    selectArray: {
      type: Array
    },
    period: {
      type: String
    }
  },
  computed: {
    selectArrayNew() {
      return this.selectArray.filter((item) => item !== undefined)
    },
    combinations() {
      return this.selectArray.filter(
        (item) => item !== undefined && item.length === 2
      )
    },
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    platform() {
      return this.$store.state.platform
    },
    jackpotStake() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .jackpotStake
    },
    info() {
      return this.$store.state.info
    },
    stake() {
      return this.jackpotStake * Math.pow(2, this.combinations.length)
    }
  },
  mounted() {
    if (!this.info) this.getInfo()
  },
  methods: {
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) {
          this.$store.commit('setInfo', res.data)
          this.$store.commit('savePhoneNumber', res.data.mobile)
        }
      })
    },
    // 清楚已选
    clearAll() {
      this.$emit('autoPick', 0)
    },
    // 随机选择
    autoPick() {
      this.$emit('autoPick', 13)
    },
    // 投注
    placeBet() {
      if (this.selectArrayNew.length === 13) {
        // 未登录
        if (!this.info) {
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
        // 金额不足
        if (this.stake > this.info.balance) {
          Lib.common.errorReminder(
            this,
            'deposit',
            '',
            this.$t('betslipPlaceBet.betReminder1.title'),
            this.$t('betslipPlaceBet.betReminder1.msg'),
            this.$t('betslipPlaceBet.betReminder1.confirmButtonText'),
            this.$t('betslipPlaceBet.betReminder1.cancelButtonText')
          )
          return
        }

        this.$axios_api
          .jackpotBet({
            token: this.token,
            platform: this.platform,
            period: this.period,
            outcomes: JSON.stringify(this.selectArray)
          })
          .then((res) => {
            if (res.code === 0) {
              Lib.common.event_statistics('jackpot_placeBet_success')
              // fbq("track", "Purchase", {
              //   value: this.stake,
              //   currency: "UGX",
              //   content_name: "jackpot"
              // });
              this.clearAll()
              Lib.common.errorReminderUp(
                this,
                true,
                this.$t('jackpotBetslip.accept', { id: res.data.ticket_id[0] }),
                1
              )
            } else {
              Lib.common.errorReminderUp(this, true, res.msg, 0)
            }
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-jackpotBetslip-wrap {
  box-sizing: border-box;
  padding: 10rem/36;
  width: 10rem;
  background-color: #fff;
  color: #000;

  .cl-item {
    flex: 1;
    font-size: 11rem/36;

    span {
      color: #e52f11;
    }

    .cl-right {
      padding-left: 5rem/36;
      font-weight: bold;

      .cl-more {
        margin-left: 5rem/36;
        height: 12rem/36;
        transform: rotate(180deg);

        img {
          height: 12rem/36;
        }
      }
    }
  }

  .cl-buttonBox {
    margin-top: 11rem/36;

    .cl-clear {
      width: 53rem/36;
      height: 40rem/36;
      background-color: #d4e4ec;
      border-radius: @mainButtonRadius;

      .cl-icon {
        .sprite(@menu-jackpot-clear, 108rem);
      }
    }

    .cl-auto {
      width: 53rem/36;
      height: 40rem/36;
      background-color: @mainThemeColor;
      border-radius: @mainButtonRadius;

      .cl-icon {
        .sprite(@menu-jackpot-random, 108rem);
      }
    }

    .cl-placeBet {
      width: 228rem/36;
      height: 40rem/36;
      text-align: center;
      flex-direction: column;
      margin: 0 3rem/36;

      &.cl-isButtonCanNotUse {
        opacity: 0.7;
      }

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
    padding: 5rem/36 0 10rem/36;
    text-align: center;
  }
}
</style>
