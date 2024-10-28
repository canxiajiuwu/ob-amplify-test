<template>
  <div class="cl-withdraw-wrap">
    <headBack
      :title="$t('accountWithdraw.withdraw')"
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }"
    >
      <template>
        <div class="cl-top_right">
          <NuxtLink
            no-prefetch
            v-if="info"
            class="cl-flexcc cl-logined"
            :to="`/${locale}/account`"
          >
            <div
              class="cl-flexcc cl-accountInfo"
              @click.prevent="goWhere('account')"
            >
              <div class="cl-icon" />
              <div class="cl-balance">
                {{ info?.balance?.toFixed(2) || '0.00' }}
              </div>
            </div>
          </NuxtLink>
          <div class="cl-flexce cl-right" v-else>
            <NuxtLink no-prefetch :to="`/${locale}/login`">
              <div
                class="cl-flexcc cl-lkButton"
                @click.prevent="goWhere('login')"
              >
                <div>{{ $t('loginEntry.login') }}</div>
              </div>
            </NuxtLink>
            <NuxtLink no-prefetch :to="`/${locale}/register`">
              <div
                class="cl-flexcc cl-bsbb cl-tcButton"
                @click.prevent="goWhere('register')"
              >
                <div>{{ $t('loginEntry.joinNow') }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </template>
    </headBack>
    <withdrawSuccess v-if="isWithdrawSuccess" />
    <div class="cl-container" v-else>
      <!-- <div class="cl-title">
        <div class="cl-titleTop">{{$t('accountWithdraw.withdraw')}}</div>
      </div>
      <accountModal
        :msg="$t('accountDeposit.mtnReminder', { method: locale === 'en' ? 'withdraw' : 'retrait' })"
        v-if="country === 'ug'"
      />-->

      <div class="cl-inputBox">
        <div class="cl-inputItem">
          <div class="cl-company" v-if="accountInfo && accountInfo.mobile">
            <div>{{ $t('accountWithdraw.Withdrawal') }}</div>
            <div style="height: calc(7rem / 36)" />
            <div class="cl-selectTBox" :class="isSelectShow ? '' : 'cl-border'">
              <div
                class="cl-flexcb cl-tItem cl-selectTItem"
                style="border: 0"
                @click="isSelectShow ? setBackUp() : changeBackup()"
              >
                <template v-if="isSelectShow">
                  <div class="cl-noBackup" v-html="$t('backup.select')" />
                  <div class="cl-greyMore" />
                </template>
                <template v-else>
                  <div class="cl-flexcs" v-if="selectIndex === 0">
                    <img :src="phoneImage(accountInfo.mobile)" />
                    <div class="cl-mobileNumber">
                      ({{ '****' + accountInfo.mobile.substring(6, 10) }})
                    </div>
                  </div>
                  <div class="cl-flexcs" v-else>
                    <img :src="phoneImage(accountInfo.spares_mobile)" />
                    <div class="cl-mobileNumber">
                      ({{
                        '****' + accountInfo.spares_mobile.substring(6, 10)
                      }})
                    </div>
                  </div>

                  <div class="cl-more" />
                </template>
              </div>
              <CollapseTransition>
                <div class="cl-pTBox" v-if="isSelectShow">
                  <div
                    class="cl-flexcb cl-tItem"
                    @click="changeSelectChange(0)"
                  >
                    <div class="cl-flexcs cl-phoneBox">
                      <img :src="phoneImage(accountInfo.mobile)" />
                      <div class="cl-mobileNumber">
                        ({{ '****' + accountInfo.mobile.substring(6, 10) }})
                      </div>
                    </div>

                    <div class="cl-check" v-if="selectIndex === 0" />
                  </div>
                  <div
                    v-if="accountInfo.spares_mobile"
                    class="cl-flexcb cl-tItem"
                    @click="changeSelectChange(1)"
                  >
                    <div class="cl-flexcs cl-phoneBox">
                      <img :src="phoneImage(accountInfo.spares_mobile)" />
                      <div class="cl-mobileNumber">
                        ({{
                          '****' + accountInfo.spares_mobile.substring(6, 10)
                        }})
                      </div>
                    </div>

                    <div class="cl-check" v-if="selectIndex !== 0" />
                  </div>
                </div>
              </CollapseTransition>
            </div>

            <!-- <div class="cl-flexcs cl-tItem">
              <img :src="phoneImage(accountInfo.mobile)" />
              <div class="cl-mobileNumber">({{'****'+(accountInfo.mobile).substring(6,10)}})</div>
            </div>-->
          </div>

          <div class="cl-flexcb cl-inputTBox">
            <div class="cl-flexcc cl-amount">
              {{ $t('accountDeposit.amount') + `(${hb})` }}
            </div>
            <!-- 检测是否输入小数点type换为tel -->
            <input
              type="tel"
              :placeholder="$t('accountWithdraw.placeholder')"
              v-model="money"
            />
            <div v-show="money" class="cl-clear" @click="money = ''" />
          </div>

          <div class="cl-name">
            {{
              $t('accountWithdraw.Balance') +
              ' ' +
              (info ? info.balance.toFixed(2) : 0) +
              ' ' +
              hb
            }}
          </div>

          <div class="cl-reminderBox">
            <div v-if="isshowreminder" class="cl-bsbb cl-reminder">
              {{ reminder }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="cl-flexcc cl-lkButton cl-requestB"
        :class="{ 'cl-isButtonCanNotUse': isButtonCanNotUse }"
        @click="mywithdraw"
      >
        {{ $t('accountWithdraw.request') }}
      </div>

      <div class="cl-bottomList">
        <div
          class="cl-item"
          v-for="(item, index) in $t('accountWithdraw.bottomList')"
          :key="index"
        >
          <span>{{ item }}</span>
          <span v-if="index === 0">{{ maxWithdraw.toLocaleString() }}</span>
          <span v-else-if="index === 1">{{
            maxWithdrawDaily.toLocaleString()
          }}</span>
        </div>
      </div>
    </div>

    <validate v-if="isValidateShow" @closeValidate="closeValidate" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import validate from '@/components/components/validate.vue'
import withdrawSuccess from '@/components/components/withdrawSuccess.vue'
// import accountModal from '@/components/components/accountModal.vue'
import headBack from '@/components/components/headBack.vue'

export default {
  components: {
    validate,
    withdrawSuccess,
    // accountModal,
    headBack,
    CollapseTransition: Lib.common.CollapseTransition
  },
  data() {
    return {
      money: '',
      isshowreminder: 0,
      reminder: '',
      // 按钮是否可以点击状态
      isButtonCanNotUse: 1,
      isValidateShow: false,
      // 是否是withdraw成功
      isWithdrawSuccess: false,
      // 是否展示备用号码
      isSelectShow: false,
      selectIndex: 0,
      // 风控提示
      withdrawRiskTips: undefined
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
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    minWithdraw() {
      return this.$store.state.moneyConfig[this.country].minWithdraw
    },
    maxWithdraw() {
      return this.$store.state.moneyConfig[this.country].maxWithdraw
    },
    maxWithdrawDaily() {
      return this.$store.state.moneyConfig[this.country].maxWithdrawDaily
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  watch: {
    money(newValue, oldValue) {
      const numNewValue = Number(newValue)
      // 不符合或有小数
      if (isNaN(numNewValue) || String(newValue).includes('.'))
        return (this.money = oldValue)
      // 对比用户账户进行提示
      const flagArr = [
        {
          flag: numNewValue > Number(this.balance),
          word: this.$t('reminder.withdraw1')
        },
        {
          flag: numNewValue > this.maxWithdraw,
          word: this.$t('reminder.withdraw5', { amount: this.maxWithdraw })
        },
        {
          flag: numNewValue < this.minWithdraw,
          word: this.$t('reminder.withdraw3', { amount: this.minWithdraw })
        }
      ]
      const flagIndex = flagArr.find((a) => a.flag)

      if (flagIndex) this.isshowreminder = 1 && (this.reminder = flagIndex.word)
      else this.isshowreminder = 0

      this.isButtonCanNotUse = this.money > 0 && !this.isshowreminder ? 0 : 1
    }
  },
  mounted() {
    this.money = this.minWithdraw
    // 初始化
    this.initialization()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 页面跳转
    goWhere(path) {
      Lib.common.event_statistics(`withdraw_${path}`)
      this.$router.push({ path: `/${this.locale}/` + path })
    },
    // 品牌号
    phoneNumberCompany(mobile) {
      return Lib.common.phoneNumberCompany(this, mobile)
    },
    closeValidate() {
      this.isValidateShow = false
    },
    // 获取info
    getInfo() {
      return this.$axios_api.userInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          this.$store.commit('savePhoneNumber', res.data.mobile)
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
    },
    userAccountInfo() {
      return this.$axios_api
        .userAccountInfo({ token: this.token })
        .then((res) => {
          if (res.code === 0) {
            // 设置用户属性
            this.$store.commit('setAccountInfo', res.data)
          }
        })
    },
    // 提现
    mywithdraw() {
      Lib.common.event_statistics('withdraw_request')

      if (this.money < this.minWithdraw) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('reminder.withdraw3', { amount: this.minWithdraw }),
          0
        )
        return
      }

      if (this.money > this.maxWithdraw) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('reminder.withdraw5', { amount: this.maxWithdraw }),
          0
        )
        return
      }

      // 暂时关闭提现身份验证
      // if (this.accountInfo && this.country === 'ug') {
      //   if (!this.accountInfo.first_name) {
      //     this.isValidateShow = true;
      //     return
      //   }
      // }

      // // orange  资金账户封停
      // if (this.phoneNumberCompany(this.accountInfo.mobile) === 'airtel') {
      //   Lib.common.errorReminder(
      //     this,
      //     "",
      //     "",
      //     "",
      //     this.$t('accountDeposit.mtnReminder', { method: this.locale === 'en' ? 'withdraw' : 'retrait' }),
      //     "",
      //     this.$t("reminder.button.ok")
      //   );
      //
      //   this.isSelectShow = true;
      //   return
      // }

      this.$store.commit('changeLoadingStatus', true)

      this.$axios_api
        .withdraw({
          token: this.token,
          amount: this.money,
          type: this.selectIndex
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)

          if (res.code === 0) {
            this.isWithdrawSuccess = true
            Lib.common.event_statistics('withdraw_success')
            //  Lib.common.errorReminderUp(this,true,this.$t('reminder.withdraw4'),1)
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
          } else if (res.code === 10200) {
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          } else {
            Lib.common.errorReminderUp(
              this,
              true,
              this.withdrawRiskTips || res.msg,
              0
            )
          }
        })
        .catch(() => this.$store.commit('changeLoadingStatus', false))
    },
    // 切换备用号码
    changeBackup() {
      this.isSelectShow = !this.isSelectShow
    },
    // 前往设置备用号码
    setBackUp() {
      Lib.common.event_statistics('deposit_set_alternate_number')
      this.$router.push({ path: `/${this.locale}/backup` })
    },
    // 修改充值号码
    changeSelectChange(index) {
      this.selectIndex = index
      this.changeBackup()
    },
    // 初始化(获取用户信息并判断功能是否在维护)
    async initialization() {
      try {
        if (this.token) {
          if (!this.info) await this.getInfo()
          if (!this.accountInfo) await this.userAccountInfo()
          // 获取用户是否处于风控状态
          await this.reqWithdrawRiskTips()
        }
        // 获取提现或充值功能是否维护通知
        this.getMaintenanceNotice()
      } catch (e) {
        console.log(e)
      }

      // 暂时关闭验证
      // if (this.accountInfo && this.country === 'ug') {
      //   if (!this.accountInfo.first_name) this.isValidateShow = true
      // }
    },
    // 获取用户是否处于风控状态
    reqWithdrawRiskTips() {
      return this.$axios_api
        .withdrawRiskTips({ token: this.token })
        .then((res) => {
          if (res.code === 10000) {
            Lib.common.errorReminderUp(this, true, res.msg, 0)
            this.withdrawRiskTips = res.msg
          }
        })
    },
    // 获取提现或充值功能是否维护通知
    getMaintenanceNotice() {
      this.$axios_api
        .rechargeWithdrawNotice({})
        .then((res) => {
          // 成功并且字段是所有或者提现
          if (res.code === 0 && (res.data.type === 0 || res.data.type === 2)) {
            // 用户手机品牌商
            const operator = Lib.common.phoneNumberCompany(
              this,
              this.accountInfo.mobile
            )
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
                  operator === (this.country === 'ug' ? 'airtel' : 'orange')
                ) {
                  Lib.common.errorReminderUp(this, true, res.data.tips, 0)
                }
              }
            ]
            return operatorFn[res.data.operator]()
          }
        })
        .then((res) => {
          if (!res) {
            this.$axios_api
              .downloadApk({
                URL: `https://static-sport.onebet.cm/webRelease/static/freezeUser.json`
              })
              .then((data) => {
                // console.log(data)
                const arr = data.userList || []
                if (this.accountInfo && arr.includes(this.accountInfo.mobile)) {
                  Lib.common.errorReminderUp(
                    this,
                    true,
                    'Due to the unstable of withdrawal system after maintenance, you are required to submit a KYC (National ID, Frontal photo holding ID card, a provth from MTN/Orange to claim this onebet account number belongs to you) information to our customer service team to ensure your account asset safety.',
                    0
                  )
                }
              })
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
.cl-withdraw-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;

  .cl-top_right {
    margin-right: 9rem/36;

    .cl-logined {
      .cl-accountInfo {
        .cl-icon {
          .sprite(@ticon-account-black, 108rem);
        }
        .cl-balance {
          margin-left: 7rem/36;
          font-weight: bold;
          font-size: 11rem/36;
          color: @whiteBalanceColor;
          white-space: nowrap;
        }
      }
    }

    .cl-tcButton {
      margin-left: 7rem/36;
      border: 1rem/36 solid @mainThemeColor;
    }
  }

  .cl-container {
    position: relative;
    padding: 0 10rem/36 50rem/36;

    .cl-title {
      text-align: center;

      .cl-titleTop {
        color: #394d8b;
        font-size: 20rem/36;
        font-weight: bold;
      }

      .cl-art {
        color: #7d7d7d;
        padding-top: 5rem/36;
      }
    }

    .cl-inputBox {
      padding-top: 30rem/36;

      .cl-inputItem {
        color: #333;
        .cl-company {
          padding-top: 5rem/36;
          margin-bottom: 20rem/36;
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
        .cl-inputTBox {
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
            font-size: 13rem/36;
            font-weight: 400;
            color: #7a7a7a;
            opacity: 0.6;
          }
          .cl-clear {
            margin-left: 10rem/36;
            .sprite(@ticon-close, 108rem);
          }
        }
        .cl-name {
          padding: 7rem/36 0;
          color: #74747c;
        }
        .cl-reminderBox {
          min-height: 26rem/36;
          .cl-reminder {
            font-size: 11rem/36;
            line-height: 12rem/36;
            min-height: 26rem/36;
            padding: 7rem/36;
            background-color: rgba(255, 41, 41, 0.2);
            color: #ff1900;
          }
        }
      }
    }

    .cl-requestB {
      width: 340rem/36;
      box-sizing: border-box;
      height: 40rem/36;
      margin-top: 8rem/36;
      font-size: 13rem/36;
      &.cl-isButtonCanNotUse {
        opacity: 0.5;
        color: #ffffff80;
      }
    }

    .cl-bottomList {
      margin-top: 23rem/36;
      color: #74747c;
      font-size: 11rem/36;
      line-height: 15rem/36;
      font-weight: 400;
    }
  }
}
</style>
