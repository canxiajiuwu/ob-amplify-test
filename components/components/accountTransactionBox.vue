<template>
  <div class>
    <div class="cl-accountTransactionBox-wrap">
      <div class="cl-container">
        <div class="cl-flexcs cl-containerTab">
          <div
            class="cl-flexcc cl-item"
            :class="chooseIndex === 0 ? 'cl-oddsButton' : 'cl-noOddsButton'"
            @click="changeTabs(0)"
          >
            <span>{{ $t('accountTransactionBox.tabs1') }}</span>
          </div>
          <div
            class="cl-flexcc cl-item"
            :class="chooseIndex === 1 ? 'cl-oddsButton' : 'cl-noOddsButton'"
            @click="changeTabs(1)"
          >
            <span>{{ $t('accountTransactionBox.tabs2') }}</span>
          </div>
          <div
            class="cl-flexcc cl-item"
            :class="chooseIndex === 2 ? 'cl-oddsButton' : 'cl-noOddsButton'"
            @click="changeTabs(2)"
          >
            <span>{{ $t('accountTransactionBox.tabs3') }}</span>
          </div>
        </div>

        <dataError v-if="isRequestFailed" />
        <div v-else>
          <div v-if="requestLoading">
            <div v-if="dataList.length > 0" class="cl-list">
              <div
                v-for="(item, index) in dataList"
                :key="index"
                class="cl-indexCardShadow cl-item"
              >
                <div class="cl-flexcb cl-top">
                  <div class="cl-left">
                    <span v-if="chooseIndex === 0">{{
                      $t('accountTransactionBox.tabs1')
                    }}</span>
                    <span v-else-if="chooseIndex === 1">{{
                      $t('accountTransactionBox.tabs2')
                    }}</span>
                    <span v-else>{{ $t('accountTransactionBox.tabs3') }}</span>
                    <span v-if="chooseIndex !== 2">#{{ item.order_no }}</span>
                  </div>
                  <div v-if="chooseIndex === 0" class="cl-right">
                    + {{ $t('unit') }} {{ item.amount }}
                  </div>
                  <div v-else-if="chooseIndex === 1" class="cl-right">
                    - {{ $t('unit') }} {{ item.amount }}
                  </div>
                  <div v-else class="cl-right">
                    + {{ $t('unit') }} {{ item.amount }}
                  </div>
                </div>

                <div class="cl-flexcb cl-bottom">
                  <div v-if="chooseIndex === 0" class="cl-left">
                    {{ $t('accountTransactionBox.refund') }} {{ $t('unit') }}
                    {{ item.cost }}
                  </div>
                  <div v-else-if="chooseIndex === 1" class="cl-left">
                    {{ $t('accountTransactionBox.fee') }} {{ $t('unit') }}
                    {{ item.cost }}
                  </div>
                  <div v-else class="cl-left">
                    {{ $t('accountTransactionBox.onebet') }}
                  </div>
                  <div class="cl-right" :class="'no-' + item.status">
                    {{ item.status }}
                  </div>
                </div>

                <div class="cl-itemFooter">{{ item.time }}</div>
              </div>
            </div>
            <dataNoResult v-else />
          </div>
          <dataLoading v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  data() {
    return {
      chooseIndex: 0, // 0 deposit 1 withdraw 2 system Bonus
      dataList: [],
      depositList: [],
      withdrawList: [],
      bonus: [],
      bonusList: [],
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    this.dataRequest()
  },
  methods: {
    // 切换按钮
    changeTabs(index) {
      this.chooseIndex = index
      this.dataRequest()
    },
    // 数据请求
    dataRequest() {
      if (this.chooseIndex === 0) {
        if (this.depositList.length === 0) {
          this.isRequestFailed = false
          this.requestLoading = false
          this.depositHistory()
        } else {
          this.dataList = this.depositList
        }
      } else if (this.chooseIndex === 1) {
        if (this.withdrawList.length === 0) {
          this.isRequestFailed = false
          this.requestLoading = false
          this.withdrawHistory()
        } else {
          this.dataList = this.withdrawList
        }
      } else if (this.chooseIndex === 2) {
        if (this.bonusList.length === 0) {
          this.isRequestFailed = false
          this.requestLoading = false
          this.bonusHistory()
        } else {
          this.dataList = this.bonusList
        }
      }
    },
    // 充值记录
    depositHistory() {
      if (this.token) {
        this.$axios_api
          .transactionDeposit({ token: this.token })
          .then((res) => {
            this.isRequestFailed = false
            this.requestLoading = true
            if (res.code === 0) {
              this.depositList = res.data
              this.dataList = res.data
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
      } else {
        this.$router.replace({ path: `/${this.locale}/login` })
      }
    },
    // 提现记录
    withdrawHistory() {
      if (this.token) {
        this.$axios_api
          .transactionWithdraw({ token: this.token })
          .then((res) => {
            this.isRequestFailed = false
            this.requestLoading = true
            if (res.code === 0) {
              this.withdrawList = res.data
              this.dataList = res.data
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
      } else {
        this.$router.push({ path: `/${this.locale}/login` })
      }
    },
    // 系统赠送
    bonusHistory() {
      if (this.token) {
        this.$axios_api
          .bonus({ token: this.token })
          .then((res) => {
            this.isRequestFailed = false
            this.requestLoading = true
            if (res.code === 0) {
              this.bonusList = res.data
              this.dataList = res.data
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
      } else {
        this.$router.push({ path: `/${this.locale}/login` })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountTransactionBox-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;

  .cl-container {
    margin: 0 10rem/36;

    .cl-containerTab {
      margin-bottom: 10rem/36;

      .cl-item {
        width: fit-content;
        min-width: 82rem/36;
        height: 30rem/36;
        margin-right: 5rem/36;

        span {
          transform: scale(5/6);
        }
      }
    }

    .cl-list {
      padding-bottom: 2rem;

      .cl-item {
        border-radius: @mainButtonRadius;
        box-sizing: border-box;
        margin-bottom: 10rem/36;
        padding: 10rem/36;
        color: #000;

        .cl-top {
          font-weight: bold;
        }

        .cl-bottom {
          margin-top: 5rem/36;

          .cl-right {
            border-radius: @mainButtonRadius;
            padding: 3rem/36 20rem/36;
            font-weight: 300;
          }
          .no-Success {
            background-color: #b1def2;
          }
          .no-Pending {
            background-color: #7bd9a7;
          }
          .no-Failed {
            background-color: red;
          }
        }

        .cl-itemFooter {
          text-align: center;
          font-weight: 300;
          margin-top: 5rem/36;
        }
      }
    }
  }
}
</style>
