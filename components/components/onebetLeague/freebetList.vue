<template>
  <div class="cl-freebetList-wrap">
    <div class="cl-flexcb cl-top">
      <div class="cl-left" />
      <h2 class="cl-h2 cl-middle">{{ $t('virtualFreebet.myFreebets') }}</h2>
      <div class="cl-icon" @click="closeFreebet" />
    </div>

    <div class="cl-contentBox" v-if="markets.length > 0">
      <div class="cl-flexcc cl-item" v-for="(item, index) in markets" :key="index">
        <div class="cl-box">
          <div class="cl-number">{{ $t('unit') }} {{ item.amount }}</div>
          <div class="cl-time">
            {{
              $t('accountGiftList.expires', {
                time: getDate(item.expire, 'dd/MM,HH:mm')
              })
            }}
          </div>
        </div>

        <!--<div class="cl-new">NEW</div>-->
      </div>
    </div>

    <dataNoResult v-else />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: ['freeBetInfo'],
  computed: {
    markets() {
      return this.freeBetInfo &&
        this.freeBetInfo.infos &&
        this.freeBetInfo.infos.free_bets
        ? this.freeBetInfo.infos.free_bets
        : []
    }
  },
  methods: {
    closeFreebet() {
      this.$emit('closeFreebet')
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    }
  }
}
</script>

<style scoped lang="less">
.cl-freebetList-wrap {
  position: fixed;
  z-index: 10;
  top: 160rem/36;
  bottom: 0;
  width: 10rem;
  overflow: auto;
  box-shadow: 0 0 20rem/36 20rem/36 rgba(0, 0, 0, 0.4);
  background-color: #fff;
  animation-fill-mode: both;
  animation: moveUp 300ms linear;

  .cl-top {
    height: 33rem/36;
    background-color: #1c2029;
    box-sizing: border-box;
    padding: 0 10rem/36;

    .cl-middle {
      font-size: 10rem/36;
      color: #fff;
      font-weight: bold;
    }
    .cl-icon {
      .sprite(@icon-closewhite,360rem);
    }
  }

  .cl-contentBox {
    padding: 10rem/36 9rem/36;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .cl-item {
      width: 167rem/36;
      height: 77rem/36;
      border-radius: 7rem/36;
      background-color: #fef0eb;
      box-sizing: border-box;
      border: 1rem/36 solid #efb49f;
      position: relative;
      margin-bottom: 7rem/36;

      .cl-box {
        .cl-number {
          color: #ff3434;
          font-size: 20rem/36;
          font-weight: bold;
        }

        .cl-time {
          color: rgba(0, 0, 0, 0.6);
          font-size: 10rem/36;
          padding-top: 5rem/36;
        }
      }

      .cl-new {
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 0 7rem/36 0 7rem/36;
        background: linear-gradient(90deg, #ff6708 0%, #ff8c1d 100%);
        color: #fff;
        font-size: 10rem/36;
        font-weight: bold;
        padding: 3rem/36 7rem/36;
      }
    }

    .item:nth-child(odd) {
      margin-right: 7rem/36;
    }
  }
}

@keyframes moveUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
