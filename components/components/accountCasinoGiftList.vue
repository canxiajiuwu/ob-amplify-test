<template>
  <div class="cl-promotions-wrap">
    <div class="cl-giftList">
      <div
        class="cl-indexCardShadow cl-item"
        v-for="(item, index) in giftList"
        :key="index"
      >
        <div class="cl-top cl-flexcb">
          <div class="cl-left">
            <div class="cl-amount">{{ item.amount }} {{ $t('units') }}</div>
            <div class="cl-limit">
              <span>{{ $t('accountGiftList.limit') }}</span>
              <span>{{ item.limit }}</span>
              <span>{{ $t('accountGiftList.limit1') }}</span>
            </div>
            <div class="cl-expires">
              {{
                $t('accountGiftList.expires', {
                  time: getDate(item.expiry, 'dd/MM HH:mm:ss')
                })
              }}
            </div>
          </div>
          <div class="cl-claim cl-flexcc" @click="useGift(item)">
            {{ $t('accountGiftList.Use') }}
          </div>
        </div>

        <!-- 底部展开 -->
        <div class="cl-bottom">
          <div class="cl-toggle cl-flexcs" @click="toggle(index)">
            {{
              item.remark
                ? item.remark
                : $t('saveMoneyCasino.casinoRemark') +
                  ' ' +
                  getGameName(item.games)
            }}
            <!--            <div class="cl-icon" v-if="item.remark && item.remark.length > 200"></div>-->
          </div>

          <!--          <div class="cl-giftBottom" v-show="openIndex === index">-->
          <!--            {{item.remark}}-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: {
    giftList: {
      type: Array
    }
  },
  data() {
    return {
      msg: '',
      openIndex: 0,
      nowDate: new Date().getTime()
    }
  },

  methods: {
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 使用抵用卷
    useGift(item) {
      Lib.common.event_statistics('gift_casino_list_useNow_click')
      this.$router.push({ path: `/${this.$store.state.root.locale}/casino` })
    },
    // 切换rules
    toggle(index) {
      this.openIndex = index
    },
    // 时间过期状态判断
    timeStatusJudge(time) {
      return this.nowDate > (time * 1000 || 0)
    },
    getGameName(arr) {
      const newArr = arr
        .replace('[', '')
        .replace(']', '')
        .replaceAll(' ', '')
        .split(',')
      return newArr
        .map((item) => Lib.common.gameName({ vm: this, item }))
        .join(', ')
    }
  }
}
</script>

<style scoped lang="less">
.cl-promotions-wrap {
  width: 100%;

  .cl-giftList {
    padding: 5rem/36 10rem/36 2rem;
    .cl-item {
      box-sizing: border-box;
      margin-bottom: 10rem/36;
      position: relative;
      border-radius: @mainButtonRadius;
      padding: 10rem/36 10rem/36 5rem/36;

      .cl-top {
        .cl-left {
          font-size: 11rem/36;
          .cl-amount {
            font-size: 15rem/36;
            color: #eb4949;
            font-weight: bold;
          }

          .cl-limit {
            color: #000;
            padding: 6rem/36 0;
            .cl-limitMoney {
              color: #eb4949;
            }
          }

          .cl-expires {
            color: #eb4949;
          }
        }

        .cl-claim {
          width: 56rem/36;
          height: 26rem/36;
          background-color: #eb4949;
          border-radius: 6rem/36;
          font-size: 10rem/36;
          font-weight: bold;
          color: #fff;
        }
      }

      .cl-bottom {
        border-top: 1rem/36 dashed #d4dae1;
        margin-top: 11rem/36;
        font-size: 10rem/36;
        color: #a2a2a7;

        .cl-toggle {
          padding: 5rem/36 0;

          .cl-icon {
            .sprite(@taccount-gray-more, 280rem);
          }
        }
      }
    }
  }
}
</style>
