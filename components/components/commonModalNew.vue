<template>
  <div
    class="cl-flexcc cl-commonModal-wrap"
    v-if="modal"
    :style="getDynamicStyle"
  >
    <div class="cl-contentBox cl-animated" :class="zoomClass">
      <div class="cl-shareBetslip" v-if="modal.type === 'A'">
        <div class="cl-closeModal" @click="closeModal()" />

        <div style="height: calc(15rem / 36)" />
        <div class="cl-flexcc cl-title">{{ $t('commonModal.share') }}</div>

        <div style="height: calc(15rem / 36)" />
        <div class="cl-shareBox">
          <div class="cl-flexcc cl-art">{{ $t('commonModal.shareArt') }}</div>

          <div style="height: calc(20rem / 36)" />
          <div class="cl-flexca cl-shareIconBox" v-if="isApp !== 1">
            <!--<div class="cl-twitter"></div>-->
            <div class="cl-facebook" @click="appShare(1)" />
            <div class="cl-whatsapp" @click="appShare(2)" />
          </div>

          <div class="cl-flexca cl-shareIconBox" v-else>
            <a
              :href="twitterUrl"
              target="_blank"
              id="J-share-twitter"
              @click="webShare(5)"
            >
              <div class="cl-twitter" />
            </a>

            <a
              :href="facebookUrl"
              target="_blank"
              id="J-share-facebook"
              @click="webShare(1)"
            >
              <div class="cl-facebook" />
            </a>

            <a
              :href="whatsappUrl"
              target="_blank"
              id="J-share-whatsapp"
              @click="webShare(2)"
            >
              <div class="cl-whatsapp" />
            </a>
          </div>

          <div style="height: calc(25rem / 36)" />
          <div class="cl-flexcb cl-copyBox">
            <div class="cl-flexcc cl-code">{{ modal.message.share_id }}</div>
            <div class="cl-flexcc cl-lkButton cl-copy" @click="copyShaneUrl">
              {{ $t('commonModal.copy') }}
            </div>
          </div>

          <div style="height: calc(25rem / 36)" />
          <div class="cl-Abottom" @click="isCheckedChange">
            <div :class="isChecked ? 'cl-checkedIcon' : 'cl-uncheckIcon'" />
            <div class="cl-word">{{ $t('hottestTickets.share') }}</div>
          </div>
          <div style="height: calc(10rem / 36)" />
        </div>
      </div>

      <div class="cl-loadBetslip" v-else-if="modal.type === 'B'">
        <div class="cl-closeModal" @click="closeModal()" />
        <div style="height: calc(30rem / 36)" />
        <div class="cl-flexcc cl-top">
          {{
            modal.event === 'first_copy_code'
              ? $t('commonModal.shareArt2')
              : $t('commonModal.shareArt1')
          }}
        </div>
        <div style="height: calc(30rem / 36)" />

        <div class="cl-flexcc">
          <div class="cl-loadBetslipBottom">
            <div class="cl-flexcc">
              <input
                @keyup.enter="getTickets"
                class="cl-flexcc cl-codeBox"
                v-model.trim="inputValue"
              />
            </div>

            <div style="height: calc(30rem / 36)" />
            <div
              class="cl-flexcc cl-lkButton cl-loadButton"
              @click="getTickets"
            >
              {{ $t('commonModal.button') }}
            </div>
            <div style="height: calc(20rem / 36)" />
          </div>
        </div>
      </div>

      <div class="cl-normal" v-else>
        <div
          v-if="
            modal.event !== 'cashoutRestTimes' &&
            modal.event !== 'cashoutBouns' &&
            modal.event !== 'changeBettingAmount'
          "
          class="cl-closeModal"
          @click="closeModal()"
        />
        <div class="cl-title">{{ modal.title }}</div>
        <div class="cl-message">
          <div class="cl-messageText" v-html="modal.message"></div>
        </div>
        <div class="cl-select" v-if="modal.selectTitle" @click="changeSelect">
          <div class="cl-selectIcon" v-if="select"></div>
          <div class="cl-unselectIcon" v-else></div>
          <span class="cl-selectTitle">{{ modal.selectTitle }}</span>
        </div>
        <div
          class="cl-buttonBox"
          :class="{
            'cl-buttonBox1':
              modal.solidButton.length >= 10 || modal.borderButton.length >= 10
          }"
        >
          <div
            class="cl-button1 cl-tcButton cl-flexcc"
            @click="goEvent(0)"
            v-if="modal.borderButton"
          >
            {{ modal.borderButton }}
          </div>
          <div
            class="cl-button2 cl-lkButton cl-flexcc"
            @click="goEvent(1)"
            v-if="modal.solidButton"
          >
            {{ modal.solidButton }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import { getPopupHierarchy } from '@/assets/js/utils/popupPriority.js'

export default {
  data() {
    return {
      token: '',
      zoomClass: 'cl-zoomIn',
      isChecked: true,
      inputValue: '',
      popType: 'orderSharing',
      popType2: 'publicPopUpBox',
      select: false
    }
  },
  computed: {
    tickets() {
      return this.betslipType
        ? this.$store.state.intimateTickets
        : this.$store.state.tickets
    },
    modal() {
      return this.$store.state.modal
    },
    isApp() {
      return typeof window !== 'undefined' ? window.appInteraction.type : 1
    },
    info() {
      return this.$store.state.info
    },
    shareUrl() {
      return Lib.outUrl.shareUrl
    },
    ssrShareUrl() {
      return Lib.outUrl.ssrShareUrl
    },
    twitterUrl() {
      return `https://twitter.com/share?text=${encodeURIComponent(
        this.$t('commonModal.shareContent', {
          url: this.ssrShareUrl,
          code: this.modal.message.ticket_id
        })
      )}`
    },
    facebookUrl() {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.ssrShareUrl + this.modal.message.ticket_id
      )}`
    },
    whatsappUrl() {
      return `https://wa.me/?text=${encodeURIComponent(
        this.$t('commonModal.shareContent', {
          url: this.ssrShareUrl,
          code: this.modal.message.ticket_id
        })
      )}`
    },
    platform() {
      return this.$store.state.platform
    },
    ticket_del_ticket_id() {
      return this.$store.state.ticket_del_ticket_id
    },
    getDynamicStyle() {
      if (this.modal.type === 'A') {
        return {
          'z-index': 50
        }
      } else {
        return this.modal.type === 'B'
          ? {
              'z-index': getPopupHierarchy({ type: this.popType })
            }
          : {
              'z-index': getPopupHierarchy({ type: this.popType2 })
            }
      }
    },
    routePath() {
      return this.$route.path
    }
  },
  watch: {
    modal(newValue) {
      if (newValue && newValue.type === 'B') this.inputValue = newValue.message
    }
  },
  mounted() {
    if (Lib.store.get('token'))
      this.token = Lib.common.decrypt(Lib.store.get('token'))
  },
  methods: {
    // 点击获取比赛按钮
    getTickets() {
      if (this.inputValue === '') {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('hottestTickets.noContent'),
          0
        )
        return
      }

      let str = this.inputValue
      // 判断是否含有code码的字段
      if (this.inputValue.includes('OBTC-')) {
        const arr = this.inputValue.split(/OBTC-/)
        const newArr = arr[1].split(/\W/)
        str = 'OBTC-' + newArr[0]
      }

      this.$axios_api.shareBet({ id: str }).then((res) => {
        if (res.code === 0) {
          Lib.store.set('copyTicket', this.inputValue)
          const shareTickets = res.data

          // for (let i = 0; i < this.tickets.length; i++) {
          //   for (let j = 0; j < shareTickets.length; j++) {
          //     if (this.tickets[i].match_id === shareTickets[j].match_id) {
          //       this.tickets.splice(i, 1);
          //       i--;
          //       break;
          //     }
          //   }
          // }
          //
          // shareTickets = shareTickets.concat(this.tickets);
          // 将code码存入cookie
          this.shareCodeExpireTime(str)

          this.$store.commit('setTickets', shareTickets)
          Lib.store.set(
            'tickets',
            Lib.common.encrypt(JSON.stringify(shareTickets))
          )
          Lib.store.set(
            'shareTickets',
            Lib.common.encrypt(JSON.stringify(shareTickets))
          )
          // 调整到betslip页面
          this.$router.push({
            path: `/${this.$store.state.root.locale}/betslip`
          })
          this.closeModal()
          return
        }
        if (res.code === 1000 && res.msg === 'share id not found') {
          Lib.common.errorReminderUp(
            this,
            true,
            this.$t('hottestTickets.codeWrong'),
            0
          )
        }
      })
    },
    // 选择是否共享到社交媒体和网站
    isCheckedChange() {
      this.isChecked = !this.isChecked
    },
    // 复制
    copyShaneUrl() {
      if (this.isChecked) this.sharingAndInvestment()
      Lib.common.event_statistics(
        `share_modal_web_copy_url`,
        this.modal.message
      )
      try {
        const input = document.createElement('input') // 直接构建input
        input.value = this.$t('commonModal.shareContent', {
          url: this.shareUrl,
          code: this.modal.message.share_id
        }) // 设置内容
        document.body.appendChild(input) // 添加临时实例
        input.select() // 选择实例内容
        document.execCommand('Copy') // 执行复制
        document.body.removeChild(input) // 删除临时实例
        Lib.store.set('copyTicket', this.modal.message)
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('commonModal.copySuccess'),
          1
        )
      } catch (err) {
        Lib.common.errorReminderUp(
          this,
          true,
          this.$t('commonModal.copyFail'),
          0
        )
      }
    },
    // app分享
    appShare(index) {
      if (this.isChecked) this.sharingAndInvestment()
      let eventWord = 'share_modal_app_share_'
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
        Lib.common.event_statistics(eventWord, this.modal.message.ticket_id)
      }

      window.appInteraction.share(
        index,
        this.shareUrl + this.modal.message.share_id,
        this.$t('commonModal.shareContent', {
          url: this.shareUrl,
          code: this.modal.message.share_id
        })
      )
    },
    // web 分享事件统计
    webShare(index) {
      if (this.isChecked) this.sharingAndInvestment()
      let eventWord = 'share_modal_web_share_'
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
        Lib.common.event_statistics(eventWord, this.modal.message.ticket_id)
      }
    },
    closeModal(index) {
      const fnObj = {
        0: this.modal.borderButtonCall,
        1: this.modal.solidButtonCall
      }
      if (Object.prototype.toString.call(fnObj[index]) === '[object Function]')
        fnObj[index]()
      this.$store.commit('Modal', null)
    },
    // 点击处理
    goEvent(index) {
      this.zoomClass = 'cl-zoomOut'
      setTimeout(() => {
        this.zoomClass = 'cl-zoomIn'
        this.$store.commit('Modal', null)
      }, 300)

      switch (this.modal.event) {
        case 'FirstDepositLogin':
          Lib.store.remove('token')
          this.$store.commit('setInfo', null)
          if (index === 0) {
            this.$router.push({
              path: `/${this.$store.state.root.locale}/login`,
              query: { from: 'firstDeposit' }
            })
          } else {
            this.$router.push({
              path: `/${this.$store.state.root.locale}/register`,
              query: { from: 'firstDeposit' }
            })
          }
          break
        case 'login':
          Lib.store.remove('token')
          this.$store.commit('setInfo', null)
          this.$router.push({
            path: `/${this.$store.state.root.locale}/login`,
            query: { fromName: this.routePath }
          })
          break
        case 'login-progress':
          Lib.store.remove('token')
          this.$store.commit('setInfo', null)
          window.document.getElementById('gameEvent').click()
          this.$router.push({ path: `/${this.$store.state.root.locale}/login` })
          break
        case 'deposit':
          if (index === 0) {
            this.closeModal()
          } else {
            this.$router.push({
              path: `/${this.$store.state.root.locale}/deposit`,
              query: { fromName: this.routePath }
            })
          }
          break
        case 'alreadyDeposit':
          this.$router.push({
            path: `/${this.$store.state.root.locale}/deposit`,
            query: { fromName: this.routePath }
          })
          break
        case 'betslipGift':
          if (index === 0) {
            // no 前往确认投注
            this.$store.state.root.isConfirmShow = true
            this.closeModal()
          } else {
            // yes 选择gifts
            this.$store.state.root.isGiftShow = true
            this.closeModal()
          }
          break
        case 'betPrize':
          this.$router.push({ path: `/${this.$store.state.root.locale}` })
          break
        case 'OnegameModal':
          if (index === 0) {
            // maybet later
            this.closeModal()
          } else {
            // go now
            // eslint-disable-next-line no-lonely-if
            if (this.isApp === 1) {
              // web
              window.open(Lib.outUrl.onegameUrl)
            } else {
              // app
              window.appInteraction.openBrowser(Lib.outUrl.onegameUrl)
            }
          }
          break
        case 'deleteTickets':
          if (index === 0) {
            // delete
            this.closeModal()
            ;(this.ticket_del_ticket_id.from === 'normal'
              ? this.$axios_api.ticketDel
              : this.$axios_api.ticketDelVirtual)({
              platform: this.platform,
              token: this.token,
              ticket_id: this.ticket_del_ticket_id.ticket_id
            }).then((res) => {
              if (res.code === 0) {
                this.$store.commit(
                  'setToastInfo',
                  this.$t('accountMybetDetailBox.deleteSuccess')
                )
                setTimeout(() => window.GameToHall.updateUserBetData(), 300)
                this.$router.back()
              } else this.$store.commit('setToastInfo', res.msg)
            })
          }
          // cancel
          else this.closeModal()
          break
        // 没有圣诞转盘次数
        case 'christmas_no_times':
          if (index === 0) {
            this.$router.push({ path: `/${this.$store.state.root.locale}` })
          }
          this.closeModal()
          break
        // 圣诞转盘中奖关闭弹窗事件派发
        case 'christmas_prize_reminder':
          // 创建事件派发
          // eslint-disable-next-line no-case-declarations
          const christmasEvent = new CustomEvent('christmasUpdate', {})
          window.dispatchEvent(christmasEvent)
          this.closeModal()
          break
        // 已参与过每日首冲优惠
        case 'daily_first_deposit_reminder':
          this.$router.replace({
            path: `/${this.$store.state.root.locale}/deposit`
          })
          this.closeModal()
          break
        case 'christmas_league':
          if (index === 0) {
            this.$router.push({
              path: `/${this.$store.state.root.locale}/coinsCenter/winBonus`
            })
          }
          this.closeModal()
          break
        case 'accountComplete':
          if (index === 1) {
            this.$router.push({
              path: `/${this.$store.state.root.locale}/setting`
            })
          } else {
            // cancel
            this.closeModal()
          }

          break
        case 'orange_bet':
          if (index === 1) {
            this.$store.commit('setInfo', null)
            this.$store.commit('setAccountInfo', null)
            this.$store.commit('savePhoneNumber', '')
            this.$store.commit('setCheckInInfo', null)
            Lib.store.remove('token')
            this.$router.push({
              path: `/${this.$store.state.root.locale}/register`
            })
          } else {
            this.$router.push({ path: `/${this.$store.state.root.locale}` })
          }
          break
        case 'orange_league':
          if (index === 1) {
            this.$store.commit('setInfo', null)
            this.$store.commit('setAccountInfo', null)
            this.$store.commit('savePhoneNumber', '')
            this.$store.commit('setCheckInInfo', null)
            Lib.store.remove('token')
            this.$router.push({
              path: `/${this.$store.state.root.locale}/register`
            })
          } else {
            this.$router.push({
              path: `/${this.$store.state.root.locale}/onebetLeague`
            })
          }
          break
        case 'epl_modify':
          if (index === 0) {
            const epl_modify_Event = new CustomEvent('eplModify', {})
            window.dispatchEvent(epl_modify_Event)
          }
          this.closeModal()
          break
        case 'epl_bet':
          if (index === 0) {
            this.$router.push({
              path: `/${this.$store.state.root.locale}/sports/Football/England/17/Premier%20League`
            })
          }
          this.closeModal()
          break
        case 'eplLivePredict':
          if (index === 0) {
            this.$router.push({
              path: `/${this.$store.state.root.locale}/live/Football`
            })
          }
          this.closeModal()
          break
        case 'eplSocket':
          this.$router.push({ path: `/${this.$store.state.root.locale}/epl` })
          this.closeModal()
          break
        case 'searchDelete':
          if (index === 1) {
            const searchDelete = new CustomEvent('searchDelete', {})
            window.dispatchEvent(searchDelete)
          }
          this.closeModal()
          break
        case 'sportsPromosGoBet':
          if (index === 0) {
            this.$router.push(`/${this.$store.state.root.locale}`)
          }
          this.closeModal()
          break
        case 'unLockFreeBet':
          this.$router.push(`/${this.$store.state.root.locale}`)
          this.closeModal()
          break
        case 'cashoutRestTimes':
        case 'cashoutBouns':
          if (index === 0) {
            this.modal.solidButtonCall && this.modal.solidButtonCall(true)
          } else {
            this.modal.borderButtonCall && this.modal.borderButtonCall(false)
          }
          break
        case 'changeBettingAmount':
          if (index === 0) {
            this.modal.solidButtonCall &&
              this.modal.solidButtonCall(this.select)
          } else {
            this.modal.borderButtonCall &&
              this.modal.borderButtonCall(this.select)
          }
          break
        default:
          this.closeModal(index)
      }
    },
    // 分享跟投
    sharingAndInvestment() {
      this.$axios_api.sharingInvestment({
        token: this.token,
        code: this.modal.message.share_id
      })
    },
    // 设置分享的ticketsId的过期时间
    shareCodeExpireTime(code) {
      Lib.common.event_statistics(`common_modal_share_id_save`, code)
      Lib.common.setCookie('betSharingTicketId', code, 1 / (4 * 24))
    },
    changeSelect() {
      this.select = !this.select
    }
  }
}
</script>

<style scoped lang="less">
.cl-commonModal-wrap {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  margin: 0 auto;

  .cl-contentBox {
    position: relative;
    width: 320rem/36;
    border-radius: 6rem/36;
    background-color: #fff;

    .cl-closeModal {
      position: absolute;
      right: 0;
      top: -50rem/36;
      .sprite(@icon-x, 108rem);
    }

    .cl-shareBetslip {
      .cl-title {
        text-transform: uppercase;
        color: #000;
        font-weight: bold;
        font-size: 15rem/36;
      }

      .cl-shareBox {
        padding: 0 20rem/36;

        .cl-art {
          font-size: 11rem/36;
          color: #74747c;
          font-weight: 400;
        }

        .cl-shareIconBox {
          .cl-twitter {
            .sprite(@account-twitter, 108rem);
          }

          .cl-facebook {
            .sprite(@account-facebook, 108rem);
          }

          .cl-whatsapp {
            .sprite(@account-whatsapp, 108rem);
          }
        }

        .cl-copyBox {
          position: relative;
          height: 37rem/36;
          border-radius: @mainButtonRadius;
          background-color: #f4f4f4;
          overflow: hidden;
          box-sizing: border-box;

          .cl-code {
            flex: 1;
            color: #333;
            font-weight: bold;
            font-size: 15rem/36;
            overflow: hidden;
          }

          .cl-copy {
            width: 76rem/36;
            height: 37rem/36;
            border-radius: 0;
            font-size: 15rem/36;
          }
        }

        .cl-Abottom {
          display: flex;
          align-items: center;

          .cl-checkedIcon {
            .sprite(@icon-checked, 108rem);
          }

          .cl-uncheckIcon {
            .sprite(@icon-uncheck, 108rem);
          }

          .cl-word {
            margin-left: 5rem/36;
            font-size: 10rem/36;
            font-weight: 400;
            color: #a2a2a7;
          }
        }
      }
    }

    .cl-loadBetslip {
      .cl-top {
        color: #74747c;
        font-weight: 400;
        font-size: 11rem/36;
        padding: 0 20rem/36;
      }

      .cl-loadBetslipBottom {
        width: 260rem/36;

        .cl-codeBox {
          width: 150rem/36;
          height: 37rem/36;
          border-radius: @mainButtonRadius;
          background-color: #f4f4f4;
          box-sizing: border-box;
          color: #333;
          font-size: 15rem/36;
          font-weight: bold;
          border: none;
          padding: 0;
          text-align: center;
        }

        .cl-loadButton {
          height: 37rem/36;
          font-size: 16rem/36;
          text-transform: uppercase;
        }

        .cl-loadButton:active {
          opacity: 0.8;
        }
      }
    }

    .cl-normal {
      padding: 25rem/36 13rem/36 17rem/36;

      .cl-title {
        width: 100%;
        text-align: center;
        font-weight: bold;
        font-size: 15rem/36;
      }

      .cl-message {
        padding: 10rem/36 0 25rem/36;
        color: #555555;
        font-size: 13rem/36;
        line-height: 18rem/36;
        .cl-messageText {
          display: flex;
          justify-content: center;
        }
      }

      .cl-select {
        height: 12rem/36;
        font-weight: 400;
        font-size: 10rem/36;
        color: #a2a2a7;
        line-height: 12rem/36;
        display: flex;
        align-items: center;
        margin-top: -6rem/36;
        margin-bottom: 10rem/36;
        .cl-unselectIcon {
          width: 12rem/36;
          height: 12rem/36;
          box-sizing: border-box;
          border: 1rem/36 solid #ceced2;
          border-radius: 50%;
        }
        .cl-selectIcon {
          .sprite(@icon-select-icon, 108rem);
        }
        .cl-selectTitle {
          margin-left: 4rem/36;
        }
      }

      .cl-buttonBox {
        display: flex;
        align-items: center;
        justify-content: center;

        &.cl-buttonBox1 {
          flex-direction: column-reverse;

          .cl-button2 {
            width: 293rem/36;
            margin-left: 0;
            margin-bottom: 13rem/36;
          }

          .cl-button1 {
            width: 293rem/36;
            border: none;
            font-size: 13rem/36;
            height: 13rem/36;
            color: #74747c;
            font-weight: 400;
          }
        }

        .cl-button1 {
          width: 143rem/36;
          height: 35rem/36;
          box-sizing: border-box;
          border: 0.5rem/36 solid rgba(0, 0, 0, 0.2);
          font-size: 15rem/36;
          color: #000;
        }

        .cl-button2 {
          box-sizing: border-box;
          width: 143rem/36;
          height: 35rem/36;
          font-size: 15rem/36;
          text-align: center;
          margin-left: 8rem/36;
        }
      }
    }
  }
}
</style>
