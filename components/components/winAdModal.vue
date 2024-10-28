<template>
  <div class="cl-winAdModal-wrap cl-flexcc" :style="getDynamicStyle">
    <div class="cl-contentBox">
      <div class="cl-title">
        {{ $t('winAdModal.title') }}
      </div>

      <div class="cl-money">
        {{ $t('unit') + winPopupData.amount }}
      </div>

      <div class="cl-imgBox">
        <img :src="imgUrl" alt="img" />
      </div>

      <div class="cl-art">
        {{ $t('winAdModal.art', { id: winPopupData.bet_id }) }}
      </div>

      <div class="cl-button cl-flexcc" @click="goDetail">
        {{ $t('winAdModal.detail') }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPopupHierarchy,
  removesPopupsBeingDisplayedList
} from '@/assets/js/utils/popupPriority.js'

export default {
  props: ['imgUrl', 'winPopupData'],
  data() {
    return {
      isShow: false,
      popType: 'winningNotification'
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    getDynamicStyle() {
      return {
        'z-index': getPopupHierarchy({ type: this.popType })
      }
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  methods: {
    goDetail() {
      this.$emit('closeWinAdModal')
      removesPopupsBeingDisplayedList({ type: this.popType })
      this.$router.push({
        path: `/${this.locale}/mybetDetail/${this.winPopupData.bet_id}`,
        query: {
          ticket_date_type: 0,
          ticket_category: 0
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-winAdModal-wrap {
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  text-align: center;
  color: #fff;

  .cl-contentBox {
    .cl-title {
      font-size: 33rem/36;
      font-weight: 900;
      text-transform: uppercase;
    }

    .cl-money {
      font-size: 33rem/36;
      font-weight: 900;
      text-transform: uppercase;
      color: #ffe400;
    }

    .cl-imgBox {
      padding: 20rem/36 0;

      img {
        width: 160rem/36;
        height: 160rem/36;
        animation: scaleIcon 0.5s;
      }
    }

    .cl-art {
      font-size: 11rem/36;
    }

    .cl-button {
      border-radius: 3rem/36;
      background-color: #4c50fa;
      font-size: 16rem/36;
      font-weight: bold;
      width: 220rem/36;
      height: 37rem/36;
      text-transform: uppercase;
      margin: 12rem/36 auto 2rem;
    }
  }
}

@keyframes scaleIcon {
  from {
    transform: scale(0.6);
    opacity: 0.6;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
