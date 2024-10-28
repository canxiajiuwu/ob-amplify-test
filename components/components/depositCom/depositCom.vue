<template>
  <div class="cl-depositCom-wrap">
    <depositSuccess v-if="isDepositSuccess" @tryEmit="tryEmit" />
    <div v-else class="cl-deposit-content">
      <div class="cl-content">
        <div v-if="accountInfo && accountInfo.mobile" class="cl-company">
          <h2 class="cl-h2">{{ $t('accountDeposit.from') }}</h2>
          <div style="height: calc(7rem / 36)" />
          <div class="cl-selectTBox" :class="isSelectShow ? '' : 'cl-border'">
            <div
              class="cl-flexcb cl-tItem cl-selectTItem"
              style="border: 0"
              @click="isSelectShow ? setBackUp() : changeBackup()"
            >
              <template v-if="isSelectShow">
                <div
                  v-if="accountInfo.spares_mobile"
                  class="cl-noBackup"
                  v-html="$t('backup.modify')"
                />
                <div v-else class="cl-noBackup" v-html="$t('backup.select')" />
                <div class="cl-greyMore" />
              </template>
              <template v-else>
                <div v-if="selectIndex === 0" class="cl-flexcs">
                  <img :src="phoneImage(accountInfo.mobile)" />
                  <!-- '****' + (accountInfo.mobile).substring(6, 10) -->
                  <div class="cl-mobileNumber">
                    {{
                      `(${accountInfo.mobile.substring(
                        0,
                        3
                      )}****${accountInfo.mobile.substring(7, 10)})`
                    }}
                  </div>
                </div>
                <div v-else class="cl-flexcs">
                  <img :src="phoneImage(accountInfo.spares_mobile)" />
                  <!-- '****' + (accountInfo.spares_mobile).substring(6, 10) -->
                  <div class="cl-mobileNumber">
                    {{
                      `(${accountInfo.spares_mobile.substring(
                        0,
                        3
                      )}****${accountInfo.spares_mobile.substring(7, 10)})`
                    }}
                  </div>
                </div>

                <div class="cl-more" />
              </template>
            </div>
            <CollapseTransition>
              <div v-if="isSelectShow" class="cl-pTBox">
                <div class="cl-flexcb cl-tItem" @click="changeSelectChange(0)">
                  <div class="cl-flexcs cl-phoneBox">
                    <img :src="phoneImage(accountInfo.mobile)" />
                    <div class="cl-mobileNumber">
                      {{
                        `(${accountInfo.mobile.substring(
                          0,
                          3
                        )}****${accountInfo.mobile.substring(7, 10)})`
                      }}
                    </div>
                  </div>

                  <div v-if="selectIndex === 0" class="cl-check" />
                </div>
                <div
                  v-if="
                    accountInfo.spares_mobile && accountInfo.spares_mobile != 0
                  "
                  class="cl-flexcb cl-tItem"
                  @click="changeSelectChange(1)"
                >
                  <div class="cl-flexcs cl-phoneBox">
                    <img :src="phoneImage(accountInfo.spares_mobile)" />
                    <div class="cl-mobileNumber">
                      {{
                        `(${accountInfo.spares_mobile.substring(
                          0,
                          3
                        )}****${accountInfo.spares_mobile.substring(7, 10)})`
                      }}
                    </div>
                  </div>

                  <div v-if="selectIndex !== 0" class="cl-check" />
                </div>
              </div>
            </CollapseTransition>
          </div>
        </div>
        <div style="height: calc(7rem / 36)" />
        <div v-if="where !== 'index'" class="cl-flexsb cl-tips">
          <div class="cl-icon" />
          <div class="cl-word">
            {{
              $t('accountDeposit.art1', {
                name:
                  $store.state.root.country === 'ug'
                    ? 'MTN/Airtel'
                    : 'MTN/ORANGE'
              })
            }}
          </div>
        </div>

        <h2 v-if="where !== 'index'" class="cl-h2 cl-chooseTitle">
          {{ $t('accountDeposit.choose') + ` (${hb})` }}
        </h2>

        <div
          v-if="where !== 'index'"
          class="cl-flexcb cl-list"
          :class="$store.state.root.country === 'ug' ? '' : 'cl-list-wrap'"
        >
          <div
            v-for="(item, index) in depositList"
            :key="index"
            class="cl-flexcc cl-item"
            :class="{ 'cl-choosed': item == number }"
            @click="depositNumber(item)"
          >
            <div
              v-if="
                accountInfo &&
                !accountInfo.first_deposit_activity &&
                list.find((a) => a.depositAmount == item)
              "
              class="cl-bonusIcon"
            />
            {{ item.toLocaleString() }}
          </div>
        </div>

        <div class="cl-flexcb cl-input">
          <div class="cl-flexcc cl-amount">
            {{ $t('accountDeposit.amount') + `(${hb})` }}
          </div>
          <input
            v-model="number"
            type="number"
            :placeholder="$t('accountDeposit.placeholder')"
            @blur="setBlur"
            @focus="setFocus"
          />
          <div v-show="number" class="cl-clear" @click="number = ''" />
        </div>

        <div class="cl-bsbb cl-reminderBox">
          <div v-if="reminder" class="cl-reminder" v-text="reminder" />
          <div v-else class="cl-reminderTip" v-html="reminderTip" />
        </div>
        <div
          class="cl-flexcc cl-lkButton cl-depositB"
          :class="{ 'cl-isButtonCanNotUse': isButtonCanNotUse }"
          @click="deposit"
        >
          {{ $t('accountDeposit.topUp') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import depositSuccess from '@/components/components/depositCom/depositSuccess.vue'

export default {
  components: {
    depositSuccess,
    CollapseTransition: Lib.common.CollapseTransition
  },
  props: {
    where: {
      type: String
    }
  },
  data() {
    return {
      number: '',
      // 按钮是否可以点击状态
      isButtonCanNotUse: 0,
      reminder: '',
      reminderTip: '',
      // 是否是deposit成功
      isDepositSuccess: 0,
      // 是否展示备用号码
      isSelectShow: 0,
      selectIndex: 0
      // isValidateShow: 0
    }
  },
  computed: {
    // 货币
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    },
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      return Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    info() {
      return this.$store.state.info
    },
    minDeposit() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .minDeposit
    },
    maxDeposit() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .maxDeposit
    },
    // 充值按钮列表
    depositList() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .depositList
    },
    // 首充 充值金额数据
    list() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .firstDeposit
    }
  },
  watch: {
    number: {
      immediate: true,
      handler(newValue) {
        if (this.accountInfo && !this.accountInfo.first_deposit_activity)
          this.changeReminderTip(newValue)
        if (newValue < this.minDeposit) {
          this.reminder = this.$t('reminder.deposit5', {
            amount: this.minDeposit
          })
        } else if (newValue > this.maxDeposit) {
          this.reminder = this.$t('reminder.deposit4', {
            amount: this.maxDeposit
          })
        } else this.reminder = ''
        this.isButtonCanNotUse = newValue > 0 ? 0 : 1
      }
    }
  },
  mounted() {
    // 初始化
    this.initialization()
    // 事件埋点(来到此页面的用户是否是第一次充值)(非活动)
    if (this.accountInfo) {
      // 充过
      if (this.accountInfo.first_deposit === 1)
        this.eventBurial([
          'Deposit_Page_View',
          'Deposit_Status:first_deposit_not'
        ])
      // 没有
      else
        this.eventBurial(['Deposit_Page_View', 'Deposit_Status:first_deposit'])
    }
  },
  methods: {
    // 获取用户信息
    userAccountInfo() {
      if (!this.accountInfo) {
        return this.$axios_api
          .userAccountInfo({ token: this.token })
          .then((res) => {
            // 设置用户属性
            if (res.code === 0) this.$store.commit('setAccountInfo', res.data)
          })
      }
    },
    // 获取info
    getInfo() {
      return this.$axios_api.userInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) {
          this.eventBurial(['Deposit_Page_View', 'Login_Status:logged'])
          this.$store.commit('setInfo', res.data)
        } else if (res.code === 10101)
          this.eventBurial(['Deposit_Page_View', 'Login_Status:logged_not'])
      })
    },
    // 品牌号
    phoneNumberCompany(phone) {
      return this.accountInfo ? Lib.common.phoneNumberCompany(this, phone) : ''
    },
    // 选择金额
    depositNumber(item) {
      // 事件埋点(用户选择金额)
      this.eventBurial(['Deposit_Choose_Amount', `Choose_Amount:${item}`])
      this.number = item
    },
    closeValidate() {
      this.isValidateShow = false
    },
    // 改变充值状态
    tryEmit(flag) {
      this.isDepositSuccess = flag
      this.$emit('tryEmit', flag)
    },
    // 充值
    deposit() {
      this.eventBurial(['Deposit_Button_Click'])
      if (!this.token) {
        // 事件埋点(未登录)
        this.eventBurial(['Deposit_Button_Click', 'Login_Status:logged_not'])
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
      // 事件埋点(已登录)
      else this.eventBurial(['Deposit_Button_Click', 'Login_Status:logged'])

      // if (this.accountInfo) {
      //   if (!this.accountInfo.first_name) return (this.isValidateShow = 1)
      // }

      // 事件埋点(充值失败)
      if (!this.number)
        return this.eventBurial(['Deposit_Result', 'failed:no_amount'])

      // // orange  资金账户封停
      // if (this.phoneNumberCompany(this.accountInfo.mobile) === 'airtel') {
      //   Lib.common.errorReminder(
      //     this,
      //     '',
      //     '',
      //     '',
      //     this.$t('accountDeposit.mtnReminder', { method: this.$store.state.root.locale === 'en' ? 'deposit' : 'déposer' }),
      //     '',
      //     this.$t('reminder.button.ok')
      //   )

      //   this.isSelectShow = true
      //   return
      // }

      this.$store.commit('changeLoadingStatus', 1)

      // 检测用户是否首充过
      let flag = false
      if (this.accountInfo && this.accountInfo.first_deposit === 1) flag = true

      this.$axios_api
        .deposit({
          amount: Number(this.number),
          token: this.token,
          type: this.selectIndex
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', 0)

          if (res.code === 0) {
            // fbq('trackCustom', 'deposit', {
            //   value: this.number,
            //   currency: 'UGX'
            // })
            // 充值成功，对于首页的充值来说，就可以关闭他了
            this.$emit('depositSuccess')
            // 事件埋点(充值成功)
            this.eventBurial(['Deposit_Result', 'success'])
            // 事件埋点(这笔充值是否是首充)
            if (flag)
              this.eventBurial([
                'Deposit_Result',
                'Deposit_Status:first_deposit_not'
              ])
            else
              this.eventBurial([
                'Deposit_Result',
                'Deposit_Status:first_deposit'
              ])

            this.tryEmit(1)
            // Lib.common.errorReminder(this, '', '', '', this.$t('reminder.deposit1'), this.$t('reminder.button.ok'), '')
          } else if (res.code === 10101) {
            // 事件埋点(充值失败)
            this.eventBurial(['Deposit_Result', `failed:${res.code}`])

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
            // 事件埋点(充值失败)
            this.eventBurial(['Deposit_Result', `failed:${res.code}`])
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          }
        })
        .catch(() => {
          // 事件埋点(充值失败)
          this.eventBurial(['Deposit_Result', `failed:network_err`])
          this.$store.commit('changeLoadingStatus', 0)
          Lib.common.errorReminderUp(
            this,
            true,
            this.$t('reminder.deposit2'),
            0
          )
        })
    },
    // 事件埋点公用方法
    eventBurial(arr) {
      if (Array.isArray(arr) && arr.length > 0) {
        if (arr[1]) Lib.common.event_statistics(arr[0], arr[1])
        else Lib.common.event_statistics(arr[0])
      }
    },
    // 金额输入框获取焦点
    setFocus() {
      this.eventBurial(['Deposit_Amount_Click'])
    },
    // 金额输入框失去焦点
    setBlur() {
      this.eventBurial(['Deposit_Amount_Click', `Input_Amount:${this.number}`])
    },
    // 切换备用号码
    changeBackup() {
      this.isSelectShow = !this.isSelectShow
    },
    // 前往设置备用号码
    setBackUp() {
      Lib.common.event_statistics('deposit_set_alternate_number')
      this.depositComTriggle(false)
      this.$router.push({ path: `/${this.$store.state.root.locale}/backup` })
    },
    depositComTriggle(bool) {
      this.$store.commit('setFepositComShow', bool)
    },
    // 修改充值号码
    changeSelectChange(index) {
      this.selectIndex = index
      this.changeBackup()
    },
    // 初始化(获取用户信息并判断功能是否在维护)
    async initialization() {
      // 事件埋点(来到此页面的用户是否登录)
      if (!this.info) {
        if (this.token) await this.getInfo()
        else this.eventBurial(['Deposit_Page_View', 'Login_Status:logged_not'])
      } else this.eventBurial(['Deposit_Page_View', 'Login_Status:logged'])

      if (!this.accountInfo) await this.userAccountInfo()
      if (this.accountInfo && !this.accountInfo.first_deposit_activity)
        this.number = this.depositList[3]

      // 获取提现或充值功能是否维护通知
      this.getMaintenanceNotice()
    },
    changeReminderTip(num) {
      const item = this.list.find((a) => a.depositAmount == num)
      if (item) {
        this.$nextTick(() => {
          this.reminderTip = this.$t('firstDeposit.buttonReminder', {
            deposit: item.deposit.toLocaleString(),
            get: item.get.toLocaleString()
          })
        })
      } else this.reminderTip = ''
    },
    // 获取提现或充值功能是否维护通知
    getMaintenanceNotice() {
      this.$axios_api
        .rechargeWithdrawNotice({})
        .then((res) => {
          // 成功并且字段是所有或者提现
          if (res.code === 0 && (res.data.type === 0 || res.data.type === 1)) {
            // 用户手机品牌商
            const operator = this.phoneNumberCompany(this.accountInfo.mobile)
            // 对应方法 0:所有, 1: mtn, 2: ug-airtel, cm-orange
            const operatorFn = [
              () => {
                Lib.common.errorReminderUp(this, true, res.data.tips, 0)
              },
              () => {
                if (operator === 'mtn') {
                  Lib.common.errorReminderUp(this, true, res.data.tips, 0)
                }
              },
              () => {
                if (
                  operator ===
                  (this.$store.state.root.country === 'ug'
                    ? 'airtel'
                    : 'orange')
                ) {
                  Lib.common.errorReminderUp(this, true, res.data.tips, 0)
                }
              }
            ]
            return operatorFn[res.data.operator]()
          }
        })
        .catch(() => {})
    },
    // 手机商图片
    phoneImage(data) {
      return (
        this.STATICURL +
        '/images/lang/common/mobile/' +
        this.phoneNumberCompany(data) +
        '.jpg'
      )
    }
  }
}
</script>

<style scoped lang="less">
.cl-depositCom-wrap {
  background-color: #fff;

  .cl-content {
    box-sizing: border-box;
    padding: 0 10rem/36;
    color: #333;
    font-size: 11rem/36;
    position: relative;

    .cl-company {
      padding-top: 5rem/36;
      font-weight: bold;

      .cl-selectTBox {
        position: relative;
        background-color: #f4f4f4;
        border-radius: 3rem/36 3rem/36 0 0;
        padding: 0 10rem/36;
        font-size: 10rem/36;
        font-weight: 800;
        .cl-tItem {
          height: 40rem/36;
          border-top: 0.5rem/36 solid #d4dae1;
          img {
            margin-right: 4rem/36;
            width: 21rem/36;
            height: 21rem/36;
          }
          .cl-more {
            transform: rotate(180deg);
            .sprite(@ticon-triangle-black, 108rem);
          }
          .cl-noBackup {
            font-weight: 400;
          }
          .cl-greyMore {
            .sprite(@ticon-back-grey, 108rem);
          }
          .cl-check {
            .sprite(@ticon-choose-blue, 108rem);
          }
        }
        .cl-pTBox {
          position: absolute;
          z-index: 1;
          top: 40rem/36;
          left: 0;
          width: 100%;
          background-color: #f4f4f4;
          padding: 0 10rem/36;
          box-sizing: border-box;
          border-radius: 0 0 3rem/36 3rem/36;
        }
        &.cl-border {
          border-radius: 3rem/36;
        }
      }

      .cl-right {
        width: 240rem/36;
        padding: 0 10rem/36;

        .cl-icon {
          padding-right: 5rem/36;
          width: 30rem/36;
          height: 30rem/36;

          img {
            width: 30rem/36;
            height: 30rem/36;
          }
        }
      }
    }

    .cl-reminderBox {
      height: 1rem;
      padding: 7rem/36 0 12rem/36;
      font-size: 11rem/36;
      font-weight: 400;
      .cl-reminder {
        color: #74747c;
      }
      .cl-reminderTip {
        color: #f78a00;
      }
    }

    .cl-tips {
      font-size: 11rem/36;
      font-weight: 400;
      color: #74747c;
      line-height: 13rem/36;

      .cl-icon {
        .sprite(@icon-lights, 108rem);
      }

      .cl-word {
        width: 320rem/36;
      }
    }

    .cl-chooseTitle {
      padding: 17rem/36 0 7rem/36;
      font-weight: bold;
    }

    .cl-list {
      padding-bottom: 2rem/36;

      .cl-item {
        position: relative;
        color: #363636;
        background-color: #edebf9;
        border-radius: @mainButtonRadius;
        width: 80rem/36;
        height: 43rem/36;
        font-size: 13rem/36;
        font-weight: 800;
        margin-bottom: 7rem/36;
        .cl-bonusIcon {
          position: absolute;
          top: 0;
          right: 0;
          .sprite(@account-bonus, 108rem);
        }
        &.cl-choosed {
          background-color: @chooseButton;
        }
      }

      &.cl-list-wrap {
        flex-wrap: wrap;
      }
    }

    .cl-input {
      padding: 0 10rem/36;
      font-size: 13rem/36;
      font-weight: 400;
      height: 39rem/36;
      background-color: #f4f4f4;
      border: 0.5rem/36 solid #e9e9f3;
      border-radius: @mainButtonRadius;

      .cl-amount {
        margin-right: 12rem/36;
        padding-right: 10rem/36;
        color: #74747c;
        height: 26rem/36;
        border-right: 0.5rem/36 solid #d4dae1;
      }
      input {
        flex: 1;
        background-color: transparent;
        border: none;
        outline: none;
        padding: 0;
        font-size: 13rem/36;
        color: #000;
        font-weight: 800;
      }
      input::placeholder {
        font-weight: 400;
        font-size: 13rem/36;
      }
      .cl-clear {
        margin-left: 10rem/36;
        .sprite(@ticon-close, 108rem);
      }
    }

    .cl-depositB {
      width: 100%;
      box-sizing: border-box;
      height: 40rem/36;
      font-size: 13rem/36;
      &.cl-isButtonCanNotUse {
        opacity: 0.5;
        color: rgba(255, 255, 255, 0.502);
      }
    }
  }
}
</style>
