<template>
  <div class="cl-firstDeposit-wrap">
    <headBack
      :title="$t('firstDeposit.title')"
      :event-burial="['Activity_Deposit_Return_Click']"
      :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
    />

    <div class="cl-flexcc">
      <div class="cl-width">
        <div style="height: calc(12rem / 36)" />
        <div class="cl-GetUp" v-html="$t('firstDeposit.conspicuous')" />

        <div style="height: calc(18rem / 36)" />
        <div class="cl-flexcb cl-giftsBox">
          <div v-for="(item, index) in list" :key="index">
            <div
              class="cl-item"
              :class="[selectIndex === index ? 'cl-checked' : 'cl-unCheck']"
              @click="selectItem(index)"
            >
              <div style="height: calc(9rem / 36)" />
              <div class="cl-flexcc">
                <div class="cl-itemTop">
                  <div class="cl-itemTopDeposit">
                    {{ $t('firstDeposit.deposit') }}
                  </div>
                  <div style="height: calc(4rem / 36)" />
                  <div class="cl-itemTopMoney">{{ item.deposit }}</div>
                </div>
              </div>
              <div style="height: calc(5rem / 36)" />
              <div class="cl-flexcc">
                <div class="cl-itemBottom">
                  <div style="height: calc(8rem / 36)" />
                  <div class="cl-flexcc cl-get">
                    {{ $t('firstDeposit.get') }}
                  </div>
                  <div style="height: calc(8rem / 36)" />
                  <div class="cl-flexcc cl-itemGet" v-html="item.get" />
                  <div style="height: calc(10rem / 36)" />
                  <div class="cl-flexcc cl-itemCash">
                    {{ $t('firstDeposit.cash') }}
                  </div>
                </div>
              </div>
            </div>
            <div style="height: calc(7rem / 36)" />
          </div>
        </div>

        <div style="height: calc(5rem / 36)" />
        <div class="cl-flexcc cl-reminder">
          <div
            v-if="buttonReminderType"
            v-html="
              $t('firstDeposit.buttonReminder', {
                deposit: list[selectIndex].deposit.toLocaleString(),
                get: list[selectIndex].get.toLocaleString()
              })
            "
          />
          <div v-else>{{ $t('firstDeposit.reminder.submit') }}</div>
        </div>

        <div style="height: calc(10rem / 36)" />
        <div class="cl-flexcc cl-depositButton" @click="deposit">
          {{
            $t('firstDeposit.button', {
              money: list[selectIndex].deposit.toLocaleString()
            })
          }}
        </div>

        <div style="height: calc(10rem / 36)" />
        <div class="cl-flexcc cl-countdown">
          <div class="cl-mr10">{{ $t('firstDeposit.time') }}</div>
          <div class="cl-flexcc cl-mr5 cl-blackBox">{{ showTime[0] }}</div>
          <div class="cl-mr5">:</div>
          <div class="cl-flexcc cl-mr5 cl-blackBox">{{ showTime[1] }}</div>
          <div class="cl-mr5">:</div>
          <div class="cl-flexcc cl-blackBox">{{ showTime[2] }}</div>
        </div>

        <div style="height: calc(20rem / 36)" />
        <div class="cl-borderBottom" />

        <div style="height: calc(10rem / 36)" />
        <div class="cl-listBox">
          <h2 class="cl-h2 cl-listTitle">{{ $t('firstDeposit.title1') }}</h2>

          <div style="height: calc(3rem / 36)" />
          <div class="cl-art">
            <div>{{ $t('firstDeposit.art1') }}</div>
            <div style="height: calc(3rem / 36)" />
            <div>{{ $t('firstDeposit.art2') }}</div>
          </div>

          <div style="height: calc(13rem / 36)" />
          <div v-if="$store.state.root.country === 'ug'">
            <h2 class="cl-h2 cl-listTitle">{{ $t('firstDeposit.title2') }}</h2>
            <div style="height: calc(3rem / 36)" />
            <div class="cl-art">
              <div>{{ $t('firstDeposit.art3') }}</div>
              <div v-html="$t('firstDeposit.art4')" />
            </div>
          </div>
        </div>

        <div style="height: calc(10rem / 36)" />
        <div class="cl-listBox">
          <h2 class="cl-h2 cl-listTitle">{{ $t('firstDeposit.terms') }}</h2>
          <div style="height: calc(3rem / 36)" />
          <div
            v-for="(item, index) in $t('firstDeposit.termsList')"
            :key="index"
          >
            <div class="cl-art">{{ item }}</div>
            <div style="height: calc(3rem / 36)" />
          </div>
        </div>
      </div>
    </div>

    <div style="height: calc(30rem / 36)" />
    <div class="cl-flexcc cl-footer">
      ©2020～{{ new Date().getFullYear() }} OneBet
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  components: { headBack },
  data() {
    return {
      // 剩余时间
      time: null,
      // setTimeout容器
      timer: null,
      selectIndex: 1,
      buttonReminderType: true,
      dailyDepositStatus: 0 // 日常首冲状态
    }
  },
  computed: {
    accountInfo() {
      return this.$store.state.accountInfo
    },
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    list() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .firstDeposit
    },
    showTime() {
      let sec = this.time % 60
      if (sec < 10) sec = '0' + sec

      let min = ((this.time - Number(sec)) / 60) % 60
      if (min < 10) min = '0' + min

      let hour = Math.floor(this.time / (60 * 60))
      if (hour < 10) hour = '0' + hour

      return [hour, min, sec]
    },
    // 货币
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  mounted() {
    // 获取用户信息
    this.userAccountInfo()
    // 首冲数据接口
    this.firstDeposit()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 首冲活动数据
    firstDeposit() {
      this.$axios_api.firstDeposit({}).then((res) => {
        if (res.code === 0) {
          this.time = res.data.time
          this.selfCirculation()
        }
      })
    },
    // 时间自减
    selfCirculation() {
      if (this.time <= 0) {
        clearTimeout(this.timer)
        this.firstDeposit()
        return
      }
      this.time--
      this.timer = setTimeout(() => {
        this.selfCirculation()
      }, 1000)
    },
    // 选择
    selectItem(index) {
      // 事件埋点(选择活动金额)
      this.eventBurial(['Activity_Choose_Amount'])
      this.buttonReminderType = true
      this.selectIndex = index
    },
    // 获取用户信息
    userAccountInfo() {
      if (!this.accountInfo) {
        this.$axios_api.userAccountInfo({ token: this.token }).then((res) => {
          if (res.code === 0) {
            // 设置用户属性
            this.$store.commit('setAccountInfo', res.data)
            this.eventBurial(['Activity_Deposit_View', 'Login_Status:logged'])
          } else if (res.code === 10101) {
            // 事件埋点(未登录)
            this.eventBurial([
              'Activity_Deposit_View',
              'Login_Status:logged_not'
            ])
          }
        })
      }
      // 事件埋点(已登录)
      else this.eventBurial(['Activity_Deposit_View', 'Login_Status:logged'])
    },
    // 当日是否参加过首冲(圣诞节活动)
    christmas_deposit_req() {
      this.$axios_api.christmas_deposit({ token: this.token }).then((res) => {
        if (res.code === 0) {
          this.dailyDepositStatus = res.data.status
          // 已经参与
          if (res.data.status === 1) {
            Lib.common.errorReminder(
              this,
              'daily_first_deposit_reminder',
              '',
              '',
              this.$t('christmas_first_deposit.dailyDeposit'),
              '',
              this.$t('reminder.button.ok')
            )
          }
        }
      })
    },
    // 充值前判断
    deposit() {
      if (this.accountInfo) {
        // 事件埋点(点击充值按钮) // 已登录
        this.eventBurial(['Activity_Deposit_Click', 'Login_Status:logged'])
        if (this.accountInfo.first_deposit_activity === 1) {
          // 事件埋点,充值失败 //原因:已参与
          this.eventBurial(['Activity_Result', 'Deposit_Result:failed'])
          Lib.common.errorReminder(
            this,
            'alreadyDeposit',
            '',
            '',
            this.$t('firstDeposit.reminder.already'),
            '',
            this.$t('firstDeposit.continue')
          )
        } else {
          // 未参与
          this.depositReq()
        }
      } else {
        // 事件埋点(点击充值按钮) // 未登录
        this.eventBurial(['Activity_Result', 'Deposit_Result:failed'])
        // 未登录
        Lib.common.errorReminder(
          this,
          'FirstDepositLogin',
          '',
          '',
          this.$t('firstDeposit.reminder.unLogin'),
          this.$t('firstDeposit.register'),
          this.$t('firstDeposit.login')
        )
      }
    },
    // 判断用户登录且没有参加过活动后
    depositReq() {
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .deposit({
          amount: this.list[this.selectIndex].depositAmount,
          token: this.token
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            // 事件埋点(充值成功)
            this.eventBurial(['Activity_Result', 'Deposit_Result:success'])
            Lib.common.errorReminder(
              this,
              '',
              '',
              '',
              this.$t('firstDeposit.reminder.success'),
              '',
              this.$t('reminder.button.ok')
            )
            this.buttonReminderType = false
          } else if (res.code === 10101) {
            // 事件埋点(充值失败)
            this.eventBurial(['Activity_Result', 'Deposit_Result:failed'])
            Lib.common.errorReminder(
              this,
              'FirstDepositLogin',
              '',
              '',
              this.$t('firstDeposit.reminder.unLogin'),
              this.$t('firstDeposit.register'),
              this.$t('firstDeposit.login')
            )
          } else {
            // 事件埋点(充值失败)
            this.eventBurial(['Activity_Result', 'Deposit_Result:failed'])
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
        .catch(() => {
          // 事件埋点(充值失败)
          this.eventBurial(['Activity_Result', 'Deposit_Result:failed'])
          this.$store.commit('changeLoadingStatus', false)
          Lib.common.errorReminder(
            this,
            '',
            '',
            '',
            this.$t('reminder.deposit2'),
            '',
            this.$t('reminder.button.ok')
          )
        })
    },
    // 事件埋点公用方法
    eventBurial(arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        if (arr[1]) Lib.common.event_statistics(arr[0], arr[1])
        else Lib.common.event_statistics(arr[0])
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-firstDeposit-wrap {
  background-color: #fff;

  .cl-width {
    width: 340rem/36;

    .cl-GetUp {
      text-align: center;
      font-size: 15rem/36;
      font-weight: 400;
      color: #000;
      /deep/ span {
        color: #4c50fa;
        font-weight: bold;
      }
    }

    .cl-giftsBox {
      flex-wrap: wrap;

      .cl-item {
        box-sizing: border-box;
        width: 166.5rem/36;
        height: 145rem/36;
        border-radius: 3rem/36;
        border: 0.5rem/36 solid #d4dae1;
      }

      .cl-unCheck {
        background-color: #ebeef9;
      }

      .cl-checked {
        background-color: #fcdb06;
      }

      .cl-itemTop {
        text-align: center;
        color: #333;

        .cl-itemTopDeposit {
          font-size: 11rem/36;
          font-weight: 400;
        }

        .cl-itemTopMoney {
          font-size: 15rem/36;
          font-weight: 800;
        }
      }

      .cl-itemBottom {
        width: 153rem/36;
        height: 84rem/36;
        background-color: #fff;
        border-radius: 3rem/36;
        color: #333;

        .cl-get {
          font-size: 11rem/36;
          font-weight: 400;
        }

        .cl-itemGet {
          font-size: 19rem/36;
          font-weight: 800;
          /deep/ span {
            color: #ff0000;
            margin-left: 3rem/36;
          }
        }

        .cl-itemCash {
          font-size: 11rem/36;
          font-weight: 400;
        }
      }
    }

    .cl-reminder {
      color: #000;
      /deep/ span {
        margin-left: 3rem/36;
      }
    }

    .cl-depositButton {
      border-radius: 3rem/36;
      color: #fff;
      font-size: 13rem/36;
      font-weight: bold;
      height: 40rem/36;
      background-color: #4c50fa;
    }

    .cl-depositButton:active {
      background-color: rgba(76, 80, 250, 0.8);
    }

    .cl-countdown {
      font-size: 12rem/36;
      color: #000;

      .cl-blackBox {
        font-weight: 800;
        color: #fff;
        background-color: #000;
        width: 19rem/36;
        height: 19rem/36;
        border-radius: 3rem/36;
      }

      .cl-mr10 {
        margin-right: 10rem/36;
        font-weight: 400;
        white-space: nowrap;
      }

      .cl-mr5 {
        margin-right: 5rem/36;
      }
    }

    .cl-borderBottom {
      border-bottom: 0.5rem/36 solid #d4dae1;
    }
  }

  .cl-listBox {
    color: #000;
    line-height: 15rem/36;

    .cl-listTitle {
      font-size: 15rem/36;
      font-weight: 600;
    }

    .cl-art {
      font-size: 11rem/36;
      font-weight: 400;
    }
  }

  .cl-footer {
    height: 35rem/36;
  }
}
</style>
