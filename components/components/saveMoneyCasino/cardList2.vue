<template>
  <div
    class="cl-cardList-wrap"
    :class="{
      'cl-cardList2': listIndex === 2,
      'cl-cardList1':
        listIndex === 1 &&
        (tabsIndex === 1 || tabsIndex === 0) &&
        cardInfo.is_open === 1 &&
        stageStatus === 4 &&
        showList[0].length !== 0
    }"
  >
    <div class="cl-topBox">
      <div class="cl-top">
        <div
          class="cl-cardTop"
          v-if="
            listIndex === 2 ||
            (listIndex === 1 &&
              tabsIndex === 1 &&
              stageStatus !== 4 &&
              stageStatus !== 7)
          "
        >
          {{ $t('saveMoneyCasino.v2art12', { x: listIndex === 2 ? 12 : 22 }) }}
        </div>
        <div
          class="cl-art"
          :class="{
            'cl-artUse':
              listIndex === 1 &&
              (tabsIndex === 0 ||
                (tabsIndex === 1 && cardInfo.recieve_not_use_num !== 0)) &&
              stageStatus === 4
          }"
        >
          {{
            listIndex === 2 ||
            duoshaoqian === undefined ||
            (cardInfo.recieve_not_use_num === 0 && cardInfo.daily_num > 0)
              ? 56
              : duoshaoqian
          }}
          XAF Gifts
        </div>
        <div
          class="cl-art1"
          v-if="
            listIndex === 1 &&
            tabsIndex === 1 &&
            cardInfo.recieve_not_use_num === 0 &&
            stageStatus === 4
          "
        >
          <span style="color: #f79b00">
            {{
              cardInfo.r_use >= 50
                ? 22 - cardInfo.recieve_num
                : 10 - cardInfo.recieve_num
            }}</span
          >
          {{ $t('saveMoneyCasino.v2art11') }}
        </div>
        <div class="cl-art1" v-else-if="listIndex === 1 && tabsIndex === 2">
          <span style="color: #f79b00">{{ duoshaozhang }}</span>
          {{ $t('saveMoneyCasino.v2art9') }}
        </div>
        <div class="cl-art1" v-else-if="listIndex === 1 && tabsIndex === 3">
          <span style="color: #f79b00">{{ duoshaozhang }} </span>
          {{ $t('saveMoneyCasino.v2art8') }}
        </div>
      </div>
    </div>
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
        <div
          class="cl-amountBox"
          :class="{ 'cl-cardGray': tabsIndex === 2 || tabsIndex === 3 }"
        >
          <div class="cl-box">
            <div class="cl-amount">{{ item.amount }}</div>
            <div class="cl-unit">{{ $t('units') }}</div>
          </div>
        </div>

        <div class="cl-limit">
          {{ $t('saveMoneyCasino.betOver') }} {{ item.limit }}
        </div>
        <div class="cl-number">
          <span style="font-size: 0.30556rem">x</span>{{ item.number }}
        </div>
      </div>
    </div>

    <!-- 没有gifts时 -->
    <div
      class="cl-noGift"
      v-if="
        (stageStatus === 3 || stageStatus === 4 || stageStatus === 7) &&
        tabsIndex !== 1 &&
        showList[0].length === 0
      "
    >
      <div class="cl-icon"></div>
      <div class="cl-word" v-if="tabsIndex === 0">
        {{ $t('saveMoneyCasino.noGift') }}
      </div>
      <div class="cl-word" v-else-if="tabsIndex === 2">
        {{ $t('saveMoneyCasino.noUse') }}
      </div>
      <div class="cl-word" v-else-if="tabsIndex === 3">
        {{ $t('saveMoneyCasino.noExpire') }}
      </div>
    </div>
    <!--  按钮  -->
    <div
      class="cl-tapButton"
      :class="{
        'cl-tapButton1':
          cardInfo.recieve_not_use_num === 0 && cardInfo.daily_num === 0
      }"
      @click="clickCard"
      v-if="
        stageStatus !== 3 &&
        stageStatus !== 5 &&
        stageStatus !== 6 &&
        listIndex === 1 &&
        tabsIndex === 1 &&
        (cardInfo.daily_num !== 0 || cardInfo.recieve_not_use_num === 0) &&
        cardInfo.is_open === 1
      "
    >
      {{
        cardInfo.recieve_not_use_num === 0 && cardInfo.daily_num === 0
          ? $t('saveMoneyCasino.v2art13')
          : $t('saveMoneyCasino.v2art7')
      }}
    </div>
    <div
      class="cl-useButton"
      @click="clickCard"
      v-if="
        listIndex === 1 &&
        (tabsIndex === 0 || (tabsIndex === 1 && cardInfo.daily_num === 0)) &&
        cardInfo.recieve_not_use_num > 0 &&
        cardInfo.is_open === 1
      "
    >
      {{ $t('saveMoneyCasino.bet') }}
    </div>
    <div
      class="cl-button_art"
      v-if="
        listIndex === 1 &&
        (tabsIndex === 0 ||
          (tabsIndex === 1 && cardInfo.recieve_not_use_num !== 0)) &&
        stageStatus === 4 &&
        showList[0].length !== 0
      "
    >
      <span style="color: #f79b00"> {{ giftsNum }}</span>
      {{ $t('saveMoneyCasino.v2art10') }}
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
    },
    cardInfo: {
      type: Object,
      default: () => {}
    },
    giftDefault: {
      type: Array,
      default: () => []
    },
    duoshaoqian: {
      type: Number
    },
    duoshaozhang: {
      type: Number
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
      const arr = []
      const number = this.cardInfo.r_use < 50 ? 10 : 22
      if (
        this.showGifts.length === 0 &&
        this.cardInfo.recieve_num <= number &&
        this.tabsIndex === 1
      ) {
        arr.push(this.giftDefault)
      } else {
        arr.push(this.showGifts)
      }
      return arr
    },
    giftsNum() {
      return this.showList[0].reduce((acc, cur) => acc + cur.number, 0)
    }
  },
  mounted() {},
  methods: {
    clickCard() {
      if (
        this.cardInfo.daily_num !== 0 ||
        this.cardInfo.recieve_not_use_num !== 0
      )
        this.$emit('clickCard', 'v2')
    }
  }
}
</script>

<style scoped lang="less">
.cl-cardList-wrap {
  position: relative;
  z-index: 2;
  width: 9.44rem;
  height: 7.82rem;
  background-image: url('~/static/images/saveMoneyCasino/v2/box.png');
  background-size: cover;
  margin: 0.28rem 0.28rem 0;

  &.cl-cardList1 {
    height: 9.68rem;
    background-image: url('~/static/images/saveMoneyCasino/v2/bigBox.png');
  }

  &.cl-cardList2 {
    margin-bottom: 12rem/36;
  }

  .cl-tapButton {
    width: 8.43rem;
    height: 1.28rem;
    background: linear-gradient(180deg, #fcdb00 0%, #f7b500 100%), #d8d8d8;
    border-radius: 0.69rem;
    font-weight: bold;
    font-size: 0.43rem;
    color: #000000;
    line-height: 1.28rem;
    text-align: center;
    margin: 0.38rem auto 0;
    position: absolute;
    top: 7.35rem;
    left: 0;
    right: 0;

    &.cl-tapButton1 {
      background: #c0c0c0;
      color: #fff;
    }
  }

  .cl-useButton {
    width: 8.43rem;
    height: 1.28rem;
    border-radius: 0.69rem;
    font-weight: bold;
    font-size: 0.43rem;
    color: #000000;
    line-height: 1.28rem;
    text-align: center;
    margin: 0.3rem auto 0;
    border: 0.02rem solid #000000;
    position: absolute;
    top: 7.35rem;
    left: 0;
    right: 0;
  }

  .cl-button_art {
    text-align: center;
    margin-top: 0.1rem;
    font-size: 0.31rem;
    color: #979797;
    position: absolute;
    top: 9rem;
    left: 0;
    right: 0;
  }

  .cl-topBox {
    height: 1.28rem;
    text-align: center;

    .cl-cardTop {
      width: 5.68rem;
      height: 0.61rem;
      line-height: 0.61rem;
      background-image: url('~/static/images/saveMoneyCasino/v2/boxTop.png');
      background-size: cover;
      margin: 0 auto;
      font-size: 0.28rem;
      font-weight: bold;
      color: #000;
    }

    .cl-art {
      color: white;
      line-height: 0.58rem;
      font-size: 0.39rem;
      font-weight: bold;
      padding-top: 0.14rem;

      &.cl-artUse {
        padding-top: 0.4rem;
      }
    }

    .cl-art1 {
      font-size: 0.31rem;
      color: #ffffff;
    }
  }

  .cl-cardList {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0.3rem 0.37rem 0;
  }

  .cl-noGift {
    text-align: center;
    font-size: 11rem/36;
    color: #979797;
    margin: 57rem/36 0 84rem/36;

    .cl-icon {
      margin: 0 auto 7rem/36;
      width: 41rem/36;
      height: 41rem/36;
      background-image: url('~/static/images/saveMoneyCasino/noGift.png');
      background-size: cover;
    }
  }

  .cl-card {
    position: relative;
    width: 4.07rem;
    height: 2.67rem;
    margin: 0.14rem;
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
      width: 4.07rem;
      text-align: center;
      font-size: 0.33rem;
      margin-top: -0.5rem;
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
      width: 4.07rem;
      height: 2.67rem;
      background-size: cover;
      background-image: url('~/static/images/saveMoneyCasino/v2/card.png');

      &.cl-cardGray {
        background-image: url('~/static/images/saveMoneyCasino/v2/cardUse.png');
      }

      .cl-box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-top: 0.73rem;
        font-weight: bold;
        font-size: 0.74rem;

        .cl-amount {
          margin-right: 0.1rem;
        }
      }
    }
  }
}
</style>
