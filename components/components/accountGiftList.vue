<template>
  <div class="cl-promotions-wrap">
    <div class="cl-giftList">
      <div
        class="cl-indexCardShadow cl-item"
        v-for="(item, index) in giftList"
        :key="index"
      >
        <div class="cl-notStart" v-if="!timeStatusJudge(item.start_time)">
          {{ $t('accountGiftList.notStart') }}
        </div>
        <div class="cl-itemTop cl-flexcb">
          <div class="cl-left">
            <div class="cl-limit">
              <span>{{ $t('accountGiftList.limit') }}</span>
              <span class="cl-limitMoney">{{ item.limit }}</span>
              <span>{{ $t('accountGiftList.limit1') }}</span>
            </div>
            <div class="cl-expires">
              {{
                timeStatusJudge(item.start_time)
                  ? $t('accountGiftList.expires', { time: item.expire_date })
                  : $t('accountGiftList.start', {
                      time: getDate(item.start_time, 'dd/MM HH:mm:ss')
                    })
              }}
            </div>
          </div>

          <div class="cl-right cl-flexcc">
            <span class="cl-unit">{{ $t('unit') }}</span>
            <span class="cl-amount">{{ item.amount }}</span>
          </div>
        </div>

        <div class="cl-itemBottom">
          <div class="cl-giftTop cl-flexcb">
            <div class="cl-left cl-flexcc" @click="toggle(index)">
              <span class="cl-rules">{{ $t('accountGiftList.rules') }}</span>
              <span
                class="cl-more"
                :class="{ 'cl-closeMore': openIndex === index }"
              />
            </div>

            <div class="cl-right">
              <div
                class="cl-use cl-flexcc"
                :class="{
                  'cl-notStartButton': !timeStatusJudge(item.start_time)
                }"
                @click="useGift(item)"
              >
                {{ $t('accountGiftList.Use') }}
              </div>
            </div>
          </div>

          <div class="cl-giftBottom" v-show="openIndex === index">
            <span>{{ $t('accountGiftList.odds') }}</span>
            <span>{{ item.odds }};</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: ['giftList'],
  data() {
    return {
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
      Lib.common.event_statistics('gift_list_useNow_click')
      if (this.timeStatusJudge(item.start_time))
        this.$router.push({ path: `/${this.$store.state.root.locale}` })
    },
    // 切换rules
    toggle(index) {
      this.openIndex = index
    },
    // 时间过期状态判断
    timeStatusJudge(time) {
      return this.nowDate > (time * 1000 || 0)
    }
  }
}
</script>

<style scoped lang="less">
.cl-promotions-wrap {
  width: 100%;

  .cl-giftList {
    padding: 0 10rem/36 2rem;
    .cl-item {
      background-image: url('~/assets/images/general/notSprites/promotions/freeBet/gift-box.png');
      background-size: 154rem/108 144rem/108;
      background-position: top left;
      background-repeat: no-repeat;
      box-sizing: border-box;
      margin-bottom: 10rem/36;
      position: relative;
      border-radius: @mainButtonRadius;

      .cl-notStart {
        position: absolute;
        right: 0;
        top: 0;
        background-color: #d7d8da;
        border-radius: 0 0 0 7rem/36;
        font-size: 8rem/36;
        padding: 2rem/36 8rem/36;
      }

      .cl-itemTop {
        padding: 15rem/36 17rem/36 0;

        .cl-left {
          .cl-limit {
            font-size: 12rem/36;
            color: #000;
            font-weight: bold;

            .cl-limitMoney {
              color: #fa4f35;
            }
          }

          .cl-expires {
            color: #787878;
            font-size: 11rem/36;
            font-weight: 300;
            padding-top: 6rem/36;
          }
        }

        .cl-right {
          color: #fa4f35;
          font-weight: 300;
          font-size: 20rem/36;

          .cl-amount {
            font-weight: bold;
            margin-left: 7rem/36;
            margin-bottom: 2rem/36;
          }
        }
      }

      .cl-itemBottom {
        color: #626262;
        font-size: 11rem/36;
        padding: 0 17rem/36;
        .cl-giftTop {
          padding: 0 0 8rem/36;

          .cl-rules {
            color: @mainThemeColor;
          }

          .cl-more {
            transform: rotate(180deg);

            .sprite(@icon-back-blue,72rem);

            &.cl-closeMore {
              transform: rotate(270deg);
            }
          }

          .cl-right {
            .cl-use {
              width: 67rem/36;
              height: 24rem/36;
              background-color: #fa6b52;
              border-radius: 12rem/36;
              color: #fff;

              &.cl-notStartButton {
                background-color: #d7d8da;
              }
            }
          }
        }

        .cl-giftBottom {
          border-top: 1rem/36 solid #c1cbd5;
          padding: 4rem/36 0 6rem/36;
        }
      }
    }
  }
}
</style>
