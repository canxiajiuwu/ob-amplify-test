<template>
  <div class="cl-invites-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('homeMenu.cash').toUpperCase()"
        bgcolor="#9C8FFA"
        :middle-word-style="{ fontSize: 16 / 36 + 'rem', fontWeight: 'bold' }"
      >
        <div class="cl-rulesIcon" @click="rulesFlag = true" />
      </headBack>
    </div>
    <div class="cl-heightDom" :style="{ height: `calc(${safeAreaTop}px)` }" />
    <div class="cl-imgBox">
      <div class="cl-flexcc cl-wordBox">
        <h1 class="cl-h1 cl-item1" :class="'no-' + locale">
          {{ $t('inviteFriend.title') }}
        </h1>
        <h1 class="cl-h1 cl-item2">{{ $t('inviteFriend.art') }}</h1>
      </div>
      <img
        class="cl-bgImg"
        src="/images/invite/bg.png"
        alt="onebet | inviteFriends"
      />
    </div>
    <div class="cl-width">
      <div class="cl-bgBox cl-CIBox">
        <h2 class="cl-h2 cl-title">{{ $t('inviteFriend.CITitle') }}</h2>
        <div style="height: calc(15rem / 36)" />
        <div class="cl-bsbb cl-infoBox">
          <div class="cl-flexcc cl-bsbb cl-row cl-rowTitle">
            <div class="cl-flexcc">{{ $t('inviteFriend.IF') }}</div>
            <div class="cl-flexcc">{{ $t('homeMenu.freebet') }}</div>
            <div class="cl-flexcc">{{ $t('inviteFriend.fp') }}</div>
          </div>
          <div class="cl-flexcc cl-bsbb cl-row cl-rowCantent">
            <div class="cl-flexcc">{{ userData.invite_count ?? '-' }}</div>
            <div class="cl-flexcc">XAF {{ userData.invite_free ?? '-' }}</div>
            <div class="cl-flexcc">
              XAF
              {{
                userData.invite_free_win >= 0
                  ? Number(userData.invite_free_win).toFixed(2)
                  : '-'
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="cl-bgBox cl-rewardBox">
        <h2 class="cl-h2 cl-title">{{ $t('inviteFriend.rewards') }}</h2>
        <div style="height: calc(20rem / 36)" />
        <div class="cl-tips" v-html="$t('inviteFriend.rftf')" />
        <div style="height: calc(28rem / 36)" />
        <div class="cl-flexcb cl-iconBox">
          <div class="cl-pacc cl-stepbg" />
          <div
            class="cl-flexcc cl-item"
            v-for="(a, b) in $t('inviteFriend.rewardsStep')"
            :key="b"
          >
            <div class="cl-icon">
              <img
                v-if="b === 0"
                :src="STATICURL + `/images/invite/referFriends.png`"
                alt="step1"
              />
              <img
                v-if="b === 1"
                :src="STATICURL + `/images/invite/completeReg.png`"
                alt="step2"
              />
              <img
                v-if="b === 2"
                :src="STATICURL + `/images/invite/getFreeBet.png`"
                alt="step3"
              />
            </div>
            <h3 class="cl-h3 cl-word" v-html="a" />
          </div>
        </div>
        <div style="height: calc(23rem / 36)" />
        <div class="cl-flexcb cl-buttonBox">
          <div class="cl-flexcc cl-comb cl-smb" @click="attend('smb')">
            {{ $t('inviteFriend.sm') }}
          </div>
          <div class="cl-flexcc cl-comb cl-rdfb" @click="attend('rdfb')">
            {{ $t('inviteFriend.rdf') }}
            <div class="cl-flexcc cl-rec">{{ $t('inviteFriend.rec') }}</div>
          </div>
        </div>
      </div>
      <div class="cl-bgBox cl-historyBox">
        <h2 class="cl-h2 cl-title">{{ $t('inviteFriend.rh') }}</h2>
        <div style="height: calc(20rem / 36)" />
        <div class="cl-flexcs cl-filterList">
          <div
            class="cl-flexcc cl-bsbb cl-item"
            v-for="(a, b) in $t('inviteFriend.hisarr')"
            :key="b"
            :class="{ 'cl-selected': hisSelected === b }"
            @click="changeHis(b)"
          >
            {{ a }}
          </div>
        </div>
        <dataError v-if="isRequestFailed" />
        <div v-else>
          <div v-if="requestLoading">
            <div v-if="freeBetList.length > 0">
              <div style="height: calc(11rem / 36)" />
              <div
                class="cl-freebetItem"
                v-for="(a, b) in freeBetList"
                :key="b"
              >
                <freeBetItem
                  where="invite"
                  :item="a"
                  :token="token"
                  @manipulate="manipulate"
                />
              </div>
            </div>
            <dataNoResult v-else />
          </div>
          <dataLoading v-else />
        </div>
      </div>
    </div>

    <invitePop
      :flag="inviteFlag"
      :config-data="configData"
      @close="inviteFlag = false"
    >
      <template #default>
        <div
          v-html="
            $t('accountGiftList.lock1', {
              phone: String(lockItem.friend_mobile).replace('0', '237 '),
              money: abs(Number(lockItem.type_amount))
            })
          "
          @click.stop="learnMore"
        />
      </template>
    </invitePop>
    <drawer
      :visible.sync="rulesFlag"
      type="middle"
      :width="300 / 36"
      :height="460 / 36"
      boxbg-color="rgba(0,0,0,0)"
    >
      <div class="cl-bsbb cl-rulesBox">
        <div class="cl-bsbb cl-srollBox">
          <div class="cl-flexcc cl-title">
            {{ $t('accountGiftList.rules') }}
          </div>
          <template v-for="(a, b) in $t('inviteFriend.rules')">
            <div v-if="Array.isArray(a)" :key="b" class="cl-item">
              <div v-for="(x, y) in a" :key="b + '' + y" class="cl-itemy">
                {{ x }}
              </div>
            </div>
            <div v-else :key="'a' + b" class="cl-item">{{ a }}</div>
          </template>
        </div>
        <div style="height: calc(10rem / 36)" />
        <div class="cl-flexcc cl-buttonBox">
          <div class="cl-flexcc cl-btu" @click="rulesFlag = false">
            {{ $t('reminder.button.confirm') }}
          </div>
        </div>
      </div>
    </drawer>
    <div style="height: calc(1rem / 36)" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import invitePop from '@/components/components/activityAll/invitePop.vue'
import freeBetItem from '@/components/components/freeBetItem.vue'

export default {
  name: 'Invites',
  components: { headBack, invitePop, freeBetItem },
  data() {
    return {
      isLoading: 0, // 加载中
      hisSelected: 0, // 筛选id
      rulesFlag: false, // 规则弹窗
      inviteFlag: false, // 弹窗开关
      configData: {}, // 弹窗配置
      token: '',
      lockItem: {},
      userData: {}, // 用户信息
      statusArr: [0, 4, 1, 2, 3, 'win'], // 状态筛选重定向
      isRequestFailed: false,
      requestLoading: false,
      freeBetList: [],
      friendStr:
        'Join me on OneBet, the most popular sports betting site with the highest odds in Cameroon, to get 100 XAF Freebet to start winning!',
      friendStr2: this.$t('accountGiftList.friendStr')
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    isMobile() {
      return Lib.common.isMobile()
    },
    hostname() {
      return this.$store.state.root.country === 'ug'
        ? process.env.hostname
        : process.env.hostnamecm
    },
    APP() {
      return window.APP || null
    },
    winApp() {
      return window.appInteraction
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    },
    accountInfo() {
      return this.$store.state.accountInfo
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    this.token = Lib.common.decrypt(Lib.store.get('token') || '')
    this.getData()
  },
  methods: {
    // 获取活动信息
    getData() {
      this.$axios_api.inviteIncome({ token: this.token }).then((res) => {
        const { code, data } = res
        if (code === 0) {
          this.userData = data
          this.freeBetValid()
        } else if (code === 10101) {
          this.isLoading = 0
          this.isRequestFailed = false
          this.requestLoading = true
        }
      })
    },
    // 获取freebet数据
    freeBetValid(index = 0, loading) {
      if (loading) this.isLoading = 1
      this.requestLoading = false
      this.$axios_api
        .freeBetFriendList({
          token: this.token,
          status: index === 'win' ? 0 : index
        })
        .then((res) => {
          this.isLoading = 0
          this.isRequestFailed = false
          this.requestLoading = true
          const { code, data } = res
          if (code === 0) {
            if (index === 'win') {
              this.freeBetList = data.filter((a) => a.bet_result === 2)
              return
            }
            this.freeBetList = data
          } else if (code === 10101) {
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
    },
    // 切换freebet状态
    changeHis(b) {
      if (this.isLoading) return
      this.hisSelected = b
      if (!this.token) return
      this.freeBetValid(this.statusArr[b], 1)
    },
    manipulate(item) {
      this.lockItem = item
      if (!item.bet_id) {
        return this.$router.push({ path: `/${this.locale}/freebet` })
      }
      if (new Date().getTime() / 1000 >= item.expire || item.bet_result === 0)
        return
      if (item.status === 1) this.lock()
      else if (item.status === 2) {
        Lib.common.errorReminder(
          this,
          '',
          '',
          this.$t('accountGiftList.withdrawMoney'),
          this.$t('accountGiftList.goingWithdraw', {
            money: item.payout
          }),
          this.$t('reminder.button.confirm'),
          this.$t('reminder.button.cancel'),
          () => {
            this.$store.commit('changeLoadingStatus', 1)
            // 提现到账户
            this.$axios_api
              .freeBetDeposit({
                id: item.id,
                token: this.token
              })
              .then((res) => {
                this.$store.commit('changeLoadingStatus', 0)
                if (res.code === 0) {
                  this.freeBetList.forEach((a) => {
                    if (a.id === item.id) a.status = 3
                  })
                  this.$store.commit(
                    'setToastInfo',
                    this.$t('dailyGiveaway.successWithdraw')
                  )
                } else {
                  Lib.common.errorReminder(
                    this,
                    '',
                    '',
                    '',
                    this.$t('accountGiftList.withdrawFail'),
                    '',
                    this.$t('reminder.button.ok')
                  )
                }
              })
          }
        )
      }
    },
    abs(num) {
      return Lib.common.abs(num)
    },
    lock() {
      this.configData =
        this.lockItem.from === 23
          ? {
              type: 0,
              whatsappUrl:
                'https://wa.me/?text=' +
                encodeURIComponent(
                  this.friendStr2 + ` ${this.hostname}/${this.locale}`
                ),
              leftFn: () => {},
              rightFn: () => {
                this.doAction()
              }
            }
          : {
              type: 4,
              typeWord: this.$t('accountGiftList.lock2', {
                money: this.abs(Number(this.lockItem.type_amount))
              }),
              leftFn: () => {
                this.inviteFlag = false
              },
              rightFn: () => {
                this.$router.push({ path: `/${this.locale}/betslip` })
              }
            }
      this.inviteFlag = true
    },
    // 判断是否是移动端
    doAction() {
      if (this.APP) return this.appshare(4)
      if (this.isMobile) this.sendsms()
      else {
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('inviteFriend.reminder'),
          '',
          this.$t('reminder.button.ok')
        )
      }
    },
    // 发送短信
    sendsms() {
      const u = navigator.userAgent
      // android终端
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      const name = this.friendStr2 + ` ${this.hostname}/${this.locale}`

      if (isiOS) window.location.href = 'sms:&body=' + encodeURIComponent(name)
      else window.location.href = 'sms:?body=' + encodeURIComponent(name)
    },
    learnMore() {
      Lib.common.errorReminder(
        this,
        '',
        '',
        '',
        this.$t('accountGiftList.present', {
          get: this.$t('accountGiftList.from')[this.lockItem.from - 22],
          after: this.$t(`accountGiftList.after${this.lockItem.from - 22}`, {
            odd: this.lockItem.type_odds,
            amount: this.lockItem.type_amount
          })
        }),
        '',
        this.$t('reminder.button.ok')
      )
    },
    // app 分享
    appshare(index) {
      let eventWord = 'refer_friends_app_'
      const eventArr = [
        '',
        'facebook',
        'whatsapp',
        'instagram',
        'sms',
        'twitter'
      ]
      if (eventArr[index]) {
        eventWord += eventArr[index]
        Lib.common.event_statistics(eventWord)
      }

      this.winApp.share(
        index,
        `${this.hostname}/${this.locale}`,
        this.friendStr2 + `${this.hostname}/${this.locale}`
      )
    },
    async attend(type) {
      if (!this.accountInfo) {
        if (this.token) {
          this.$store.commit('changeLoadingStatus', 1)
          await this.userAccountInfo(this.token)
          this.$store.commit('changeLoadingStatus', 0)
        } else
          return Lib.common.errorReminder(
            this,
            'login',
            '',
            '',
            this.$t('reminder.unLogin'),
            '',
            this.$t('reminder.button.ok')
          )
        if (!this.accountInfo) return
      }
      // 分享链接整理
      const shareLink = `${this.hostname}/${this.locale}/refer?code=${this.accountInfo.uid}`
      const shareStr = this.friendStr + ' ' + shareLink
      const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareStr
      )}`
      let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareStr)}`
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareLink
      )}`
      if (type === 'smb') {
        this.configData = {
          type: 3,
          facebookFn: () => {
            if (!this.APP) return
            // this.winApp.appshare(
            //   1,
            //   `${this.hostname}/${this.locale}/refer?code=${this.accountInfo.uid}`,
            //   shareStr
            // )
            // Lib.common.openRequestedTab(facebookUrl, 'Facebook Share')
            APP.openBrowser(facebookUrl)
          },
          whatsappFn: () => {
            if (!this.APP) return
            // this.winApp.appshare(
            //   2,
            //   `${this.hostname}/${this.locale}/refer?code=${this.accountInfo.uid}`,
            //   shareStr
            // )
            // Lib.common.openRequestedTab(whatsappUrl, 'Whatsapp Share')
            APP.openBrowser(whatsappUrl)
          },
          xFn: () => {
            if (!this.APP) return
            // this.winApp.appshare(
            //   5,
            //   `${this.hostname}/${this.locale}/refer?code=${this.accountInfo.uid}`,
            //   shareStr
            // )
            // Lib.common.openRequestedTab(xUrl, 'X Share')
            APP.openBrowser(xUrl)
          },
          showUrl: shareLink,
          copyUrl: shareStr,
          xUrl,
          whatsappUrl,
          facebookUrl
        }
      }
      if (type === 'rdfb') {
        this.configData = {
          type: 2,
          outClose: 1,
          leftFn: (phone) => {
            let relNumber = phone
            if (relNumber.length === 8) {
              relNumber = '06' + relNumber
            } else if (relNumber.length === 9) {
              relNumber = '0' + relNumber
            }

            if (!Lib.common.phoneNumberVerify(this).test(relNumber)) {
              Lib.common.errorReminder(
                this,
                '',
                '',
                '',
                this.$t('reminder.login'),
                '',
                this.$t('reminder.button.ok')
              )
              return
            } else {
              relNumber = relNumber.replace(/^0/, '237')
              whatsappUrl += `&phone=${relNumber}`
            }

            this.inviteFlag = false
            if (this.APP) {
              APP.openBrowser(whatsappUrl)
            } else window.open(whatsappUrl, '_blank')
          },
          rightFn: (phone) => {
            let relNumber = phone
            if (relNumber.length === 8) {
              relNumber = '06' + relNumber
            } else if (relNumber.length === 9) {
              relNumber = '0' + relNumber
            }

            if (!Lib.common.phoneNumberVerify(this).test(relNumber)) {
              Lib.common.errorReminder(
                this,
                '',
                '',
                '',
                this.$t('reminder.login'),
                '',
                this.$t('reminder.button.ok')
              )
              return
            }

            relNumber = relNumber.replace(/^0/, '237')

            this.inviteFlag = false
            const u = navigator.userAgent
            // android终端
            const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            const str = `sms:${relNumber}${
              isiOS ? '&' : '?'
            }body=${encodeURIComponent(shareStr)}`
            window.location.href = str
          }
        }
      }

      this.inviteFlag = true
    },
    // 获取用户uid
    userAccountInfo(token) {
      return this.$axios_api.userAccountInfo({ token }).then((res) => {
        if (res.code === 0) this.$store.commit('setAccountInfo', res.data)
        else if (res.code === 10101)
          Lib.common.errorReminder(
            this,
            'login',
            '',
            '',
            this.$t('reminder.unLogin'),
            '',
            this.$t('reminder.button.ok')
          )
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-invites-wrap {
  min-height: 100vh;
  width: 10rem;
  background-color: #9c8ffa;
  font-weight: 400;
  font-size: 11rem/36;
  color: #212121;
  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 2;
    .cl-rulesIcon {
      margin-right: 10rem/36;
      .sprite(@account-problem, 132.5rem);
    }
  }
  .cl-imgBox {
    position: relative;
    .cl-bgImg {
      width: 100%;
    }
    .cl-wordBox {
      position: absolute;
      top: 47rem/36;
      left: 0;
      right: 0;
      flex-direction: column;
      color: #fffd45;
      text-shadow: 2rem/36 2rem/36 4rem/36 rgba(0, 0, 0, 0.5);
      text-align: center;
      .cl-item1 {
        font-weight: 900;
        font-size: 18.5rem/36;
        line-height: 1;
        margin-bottom: 1rem/36;
        &.no-en {
          margin-bottom: 7rem/36;
          line-height: normal;
        }
      }
      .cl-item2 {
        font-size: 15rem/36;
      }
    }
  }
  .cl-width {
    position: relative;
    top: -80rem/36;
    padding: 0 10rem/36;
    .cl-bgBox {
      box-sizing: border-box;
      background: linear-gradient(180deg, #fbffb4, 30%, #fff);
      border-radius: 10rem/36;
      padding: 10rem/36;
      margin-bottom: 10rem/36;
      .cl-title {
        text-align: center;
        font-weight: 900;
        font-size: 13rem/36;
        color: #212121;
      }
    }
    .cl-CIBox {
      padding-top: 13rem/36;
      padding-bottom: 14rem/36;
      .cl-infoBox {
        border: 1rem/36 solid #bfbfc4;
        .cl-row {
          height: 25rem/36;
          > div {
            flex: 1;
            height: 25rem/36;
            border-right: 1rem/36 solid #bfbfc4;
          }
          > div:last-child {
            border-right: none;
          }
        }
        .cl-rowTitle {
          background-color: #e3dffd;
          border-bottom: 1rem/36 solid #bfbfc4;
        }
      }
    }
    .cl-rewardBox {
      .cl-tips {
        line-height: 15rem/36;
        /deep/ span {
          color: #ff2d2d;
        }
      }
      .cl-iconBox {
        position: relative;
        padding: 0 10rem/36;
        .cl-item {
          width: 64rem/36;
          flex-direction: column;
          .cl-icon {
            position: relative;
            z-index: 1;
            width: 64rem/36;
            height: 64rem/36;
            margin-bottom: 10rem/36;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .cl-word {
            white-space: nowrap;
            height: 21rem/36;
            font-size: 10rem/36;
            color: #656464;
            text-align: center;
            /deep/ span {
              color: #ff2d2d;
            }
          }
        }
        .cl-stepbg {
          width: 221rem/36;
          height: 4rem/36;
          background-color: #e6e6e6;
          top: 31rem/36;
        }
      }
      .cl-buttonBox {
        .cl-comb {
          height: 40rem/36;
          border-radius: 20rem/36;
          font-weight: bold;
          font-size: 14rem/36;
          box-sizing: border-box;
          white-space: nowrap;
        }
        .cl-smb {
          width: 123rem/36;
          border: 1rem/36 solid #3b3b3b;
          color: #3b3b3b;
        }
        .cl-rdfb {
          position: relative;
          width: 186rem/36;
          background: linear-gradient(180deg, #ff7196, #fa3e73);
          color: #fff;
          .cl-rec {
            position: absolute;
            right: -2rem/36;
            top: -13rem/36;
            width: 67rem/36;
            height: 19rem/36;
            background: linear-gradient(180deg, #fcdf2f, #fd8f19);
            border-radius: 10rem/36;
            border-bottom-left-radius: 0;
            font-size: 9rem/36;
          }
        }
      }
    }
    .cl-historyBox {
      padding-top: 13rem/36;
      padding-bottom: 18rem/36;
      .cl-filterList {
        flex-wrap: wrap;
        padding-bottom: 1rem/36;
        .cl-item {
          padding: 0 9rem/36;
          height: 27rem/36;
          border-radius: 13rem/36;
          border: 1rem/36 solid #3b3b3b;
          font-weight: bold;
          color: #3b3b3b;
          margin-right: 6rem/36;
          margin-bottom: 7rem/36;
          white-space: nowrap;
          &.cl-selected {
            border: 0;
            background-color: #8272fc;
            color: #fff;
          }
        }
        .cl-item:last-child {
          margin-right: 0;
        }
      }
      .cl-freebetItem {
        margin-bottom: 10rem/36;
      }
    }
  }
  .cl-rulesBox {
    font-size: 14rem/36;
    background-color: #fff;
    border-radius: 5rem/36;
    padding: 10rem/36;
    .cl-srollBox {
      height: 360rem/36;
      overflow-y: auto;
      padding-bottom: 20rem/36;
      box-shadow: inset 0 -5rem/36 5rem/36 -4rem/36 rgba(0, 0, 0, 0.2);
      .cl-title {
        font-size: 16rem/36;
        font-weight: bold;
        color: #333;
        padding-bottom: 10rem/36;
      }
      .cl-item {
        margin-bottom: 10rem/36;
        color: #333;
      }
      .cl-itemy {
        font-size: 11rem/36;
        padding-left: 10rem/36;
        margin-bottom: 5rem/36;
      }
    }
    .cl-btu {
      width: 87rem/36;
      height: 35rem/36;
      border-radius: 6rem/36;
      background-color: @mainBrandColor;
      color: #fff;
      font-size: 15rem/36;
    }
  }
}
</style>
