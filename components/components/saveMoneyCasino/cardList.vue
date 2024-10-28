<template>
  <div class="cl-cardList-wrap" :class="{ 'cl-cardList2': listIndex === 2 }">
    <div class="cl-cardList" v-for="(list, b) in showList" :key="b">
      <div
        class="cl-card"
        :class="{
          'cl-cardOpacity':
            listIndex === 2 || (stageStatus === 3 && tabsIndex === 1)
        }"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="cl-amountBox">
          <div class="cl-box">
            <div class="cl-amount">{{ item.amount }}</div>
            <div class="cl-unit">{{ $t('units') }}</div>
          </div>
        </div>

        <div class="cl-limit">
          {{ $t('saveMoneyCasino.betOver') }} {{ item.limit }}
        </div>
        <div
          class="cl-button cl-flexcc"
          :class="{
            'cl-buttonBet': tabsIndex === 0,
            'cl-buttonUsed': tabsIndex === 2 || tabsIndex === 3
          }"
          v-if="
            (listIndex === 1 && stageStatus === 4) ||
            (tabsIndex === 0 && (stageStatus === 3 || stageStatus === 4)) ||
            tabsIndex === 2 ||
            tabsIndex === 3
          "
          @click="clickCard(item)"
        >
          <span v-if="tabsIndex === 0">{{ $t('saveMoneyCasino.bet') }}</span>
          <span v-else-if="tabsIndex === 1">{{
            $t('saveMoneyCasino.claim')
          }}</span>
          <span v-else-if="tabsIndex === 2">{{
            $t('saveMoneyCasino.used')
          }}</span>
          <span v-else-if="tabsIndex === 3">{{
            $t('saveMoneyCasino.expired')
          }}</span>
        </div>
        <div class="cl-number">
          <span style="font-size: 0.30556rem">x</span>{{ item.number }}
        </div>
        <div class="cl-flag"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    col: {
      type: Number,
      default: 1
    },
    showGifts: {
      type: Array,
      default: () => []
    },
    stageStatus: {
      type: Number,
      default: 1
    },
    tabsIndex: {
      type: Number,
      default: 0
    },
    listIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {}
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    showList() {
      const length = Math.ceil(this.showGifts.length / this.col)
      let index = 0
      const arr = []
      if (this.listIndex === 2) {
        // eslint-disable-next-line vue/no-mutating-props
        arr.push(this.showGifts.reverse())
      } else if (this.showGifts.length >= 5) {
        if (length < 5) {
          while (index < this.showGifts.length) {
            arr.push(this.showGifts.slice(index, (index += length)))
          }
        } else {
          arr.push(this.showGifts.slice(0, 5))
          arr.push(this.showGifts.slice(5, this.showGifts.length).reverse())
        }
      } else {
        arr.push(this.showGifts)
      }
      return arr
    }
  },
  mounted() {},
  methods: {
    clickCard(data) {
      this.$emit('clickCard', data)
    }
  }
}
</script>

<style scoped lang="less">
.cl-cardList-wrap {
  position: relative;
  z-index: 2;
  width: 10rem;
  overflow: scroll;

  &.cl-cardList2 {
    margin-bottom: 12rem/36;
  }

  .cl-cardList {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: fit-content;
  }

  .cl-card {
    position: relative;
    width: 101rem/36;
    min-height: 96rem/36;
    margin: 0 0 10rem/36 10rem/36;
    color: #000;
    border-radius: 13rem/36;
    background: linear-gradient(180deg, #c794ea 0%, #9e65d5 79%, #8545c6 100%);

    &.cl-cardOpacity {
      opacity: 0.6;
    }

    .cl-button {
      width: 90rem/36;
      height: 28rem/36;
      background: linear-gradient(180deg, #fcdb00 0%, #f7b500 100%);
      border-radius: 14rem/36;
      color: #000;
      font-size: 11rem/36;
      font-weight: bold;
      margin: 5rem/36 auto 8rem/36;
      text-align: center;

      &.cl-buttonBet {
        background: transparent;
        border: 1rem/36 solid #fff;
        color: #fff;
      }

      &.cl-buttonUsed {
        background: rgba(255, 255, 255, 0.47);
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .cl-limit {
      width: 101rem/36;
      text-align: center;
      font-size: 10rem/36;
      color: rgba(255, 255, 255, 0.8);
    }

    .cl-number {
      position: absolute;
      right: -1rem/36;
      top: 5rem/36;
      width: 30rem/36;
      text-align: center;
      transform: rotate(45deg);
      font-size: 13rem/36;
      font-weight: bold;
      z-index: 2;
    }

    .cl-flag {
      position: absolute;
      width: 39rem/36;
      height: 39rem/36;
      top: 0;
      right: 0;
      background-size: cover;
      background-image: url('~/static/images/saveMoneyCasino/flag.png');
      z-index: 1;
    }

    .cl-amountBox {
      width: 90rem/36;
      height: 67rem/36;
      margin: 5rem/36;
      background-size: cover;
      background-image: url('~/static/images/saveMoneyCasino/card.png');

      .cl-box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-top: 18rem/36;
        font-weight: bold;
      }
      .cl-amount {
        width: 40rem/36;
        text-align: right;
        font-size: 29rem/36;
        line-height: 1;
      }

      .cl-unit {
        font-size: 10rem/36;
        margin-bottom: 3rem/36;
        margin-left: 3rem/36;
      }
    }
  }
}
</style>
