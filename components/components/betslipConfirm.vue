<template>
  <div class="cl-betslipConfirm">
    <div class="cl-confirmBox">
      <div class="cl-close" @click="visibleConfirm" />
      <div class="cl-title">{{ $t('betslipConfirm.title') }}</div>
      <div class="cl-moneyContent">
        <div class="cl-unit">{{ $t('unit') + ' ' + pay.toLocaleString() }}</div>
      </div>
      <div
        v-if="where !== 'intimate' && gift_index === -1 && giftBalance"
        class="cl-flexce cl-giftChoosed"
        @click="openGifts"
      >
        <div class="cl-giftIcon" />
        <span>{{ $t('betslipConfirm.choose') }}</span>
        <div class="cl-icon" />
      </div>
      <div class="cl-flexcc cl-lkButton cl-confirmButton" @click="confirm">
        {{ $t('betslipConfirm.confirm') }}
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: {
    pay: {
      type: Number
    },
    gift_index: {
      type: Number
    },
    giftBalance: {
      type: Number
    },
    where: {
      type: String
    }
  },
  methods: {
    confirm() {
      Lib.common.event_statistics(
        this.where !== 'intimate'
          ? 'betslip_confirm'
          : 'betslip_confirm_intimate'
      )
      this.$emit('confirmBet')
      this.visibleConfirm()
    },
    visibleConfirm() {
      this.$emit('visibleConfirm', false)
    },
    openGifts() {
      Lib.common.event_statistics('betslip_confirm_box_choose_gifts')
      this.$store.state.root.isGiftShow = true
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipConfirm {
  .cl-confirmBox {
    position: relative;
    height: 146rem/36;
    .cl-close {
      position: absolute;
      right: 10rem/36;
      top: 25rem/108;
      .sprite(@icon-close, 72rem);
    }

    .cl-confirmButton {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 10rem;
      height: 47rem/36;
      border-radius: 0;
      font-size: 14rem/36;
    }
    .cl-confirmButton:active {
      opacity: 0.8;
    }

    .cl-title {
      text-align: center;
      font-size: 10rem/36;
      color: #515151;
      padding-top: 22rem/36;
    }

    .cl-moneyContent {
      text-align: center;
      font-weight: bold;
      color: #333;
      font-size: 20rem/36;
      padding-top: 5rem/36;
    }

    .cl-giftChoosed {
      color: #e62d0e;
      font-size: 10rem/36;
      padding-right: 10rem/36;
      padding-top: 15rem/36;

      .cl-giftIcon {
        margin-right: 5rem/36;
        .sprite(@icon-betslip-gift, 108rem);
      }

      .cl-icon {
        transform: rotate(180deg);
        margin-left: 5rem/36;
        .sprite(@icon-back, 108rem);
      }
    }
  }
}
</style>
