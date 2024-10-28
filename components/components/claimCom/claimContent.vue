<template>
  <div class="cl-claimContent-wrap" :class="'no-' + type">
    <div class="cl-tophdom" />
    <div class="cl-flexcc cl-bsbb cl-popBox">
      <div class="cl-pacc cl-zsimg" />
      <div class="cl-title">{{ word.title }}</div>
      <div class="cl-time" v-html="word.time" />
      <div style="height: calc(10rem / 36)" />
      <div class="cl-cradBox">
        <!-- 奇数 -->
        <template v-if="cardList.length & 1">
          <div style="height: calc(10rem / 36)" />
          <div class="cl-list cl-oddNum">
            <div
              class="cl-flexcb cl-item"
              :class="a.webClass"
              v-for="(a, b) in cardList"
              :key="b"
            >
              <div v-if="a.amount > 1" class="cl-flexcc cl-numberBox">
                <div class="cl-num">X{{ a.amount }}</div>
              </div>
              <div class="cl-flexcc cl-amountBox">
                <div class="cl-unit">{{ hb }}</div>
                <div class="cl-amount">{{ a.money }}</div>
              </div>
              <div class="cl-bsbb cl-contentBox">
                <div class="cl-ititle">
                  {{
                    a.name || a.webClass === 'FreeBet'
                      ? 'FreeBet'
                      : $t('claimCom.giftname')
                  }}
                </div>
                <div class="cl-tips">
                  <span v-if="a.limit"
                    >{{ $t('newUserBenefits.stakes') + a.limit }};</span
                  >
                  <span v-if="a.odds"
                    >{{ $t('newUserBenefits.odds') + a.odds }};</span
                  >
                  <span v-if="a.market">{{
                    $t('newUserBenefits.market') + a.market
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- 偶数 -->
        <template v-else>
          <div style="height: calc(7rem / 36)" />
          <div class="cl-flexcb cl-list cl-evenNum">
            <div
              class="cl-item"
              :class="[a.webClass, { 'cl-nob': cardList.length <= 2 }]"
              v-for="(a, b) in cardList"
              :key="b"
            >
              <div v-if="a.amount > 1" class="cl-flexcc cl-bsbb cl-numberBox">
                <div class="cl-num">X{{ a.amount }}</div>
              </div>
              <div class="cl-flexec cl-amountBox">
                <div class="cl-amount">{{ a.money }}</div>
                <div class="cl-unit">{{ hb }}</div>
              </div>
              <div class="cl-contentBox">
                <div class="cl-tips">
                  <div v-if="a.limit">
                    {{ $t('newUserBenefits.stakes') + a.limit }}
                  </div>
                  <div v-if="a.odds">
                    {{ $t('newUserBenefits.odds') + a.odds }}
                  </div>
                  <div v-if="a.market">
                    {{ $t('newUserBenefits.market') + a.market }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div style="height: calc(10rem / 36)" />
      <div class="cl-flexcc cl-button" @click="fn">{{ word.button }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'tips', 'cardList', 'expire', 'fn'],
  computed: {
    hb() {
      return this.$t('hottestTickets.winningPopUp[1]')
    },
    word() {
      const time = this.expire
      const strObj = {
        default: {
          time: this.$t('claimCom.time1', { time }),
          title: this.$t('claimCom.title1'),
          button: this.$t('freeBetList.useNow')
        },
        limited: {
          time: this.$t('claimCom.time2', { time }),
          title: this.tips || this.$t('claimCom.title2'),
          button: this.$t('orange.claim')
        }
      }
      return strObj[this.type || 'default']
    }
  }
}
</script>

<style scoped lang="less">
.cl-claimContent-wrap {
  .cl-tophdom {
    height: 20rem/36;
  }
  .cl-popBox {
    position: relative;
    width: 310rem/36;
    flex-direction: column;
    border-radius: 23rem/36;
    background-color: #f7f7f7;
    padding: 27rem/36 15rem/36 17rem/36;
    .cl-zsimg {
      position: absolute;
      top: 0;
      .sprite(@claim-com-usezs, 108rem);
    }
    .cl-title {
      font-size: 16rem/36;
      font-weight: bold;
      color: #050505;
      margin-bottom: 17rem/36;
    }
    .cl-time {
      font-size: 13rem/36;
      font-weight: 400;
      color: #717171;
      white-space: nowrap;
      /deep/ span {
        color: #ff752f;
      }
    }
    .cl-cradBox {
      height: 124rem/36;
      overflow-y: auto;
      .cl-list {
        .cl-item {
          margin-bottom: 10rem/36;
          position: relative;
          .cl-numberBox {
            position: absolute;
            .cl-num {
              font-size: 13rem/36;
              font-weight: bold;
              color: #fff;
            }
          }
          .cl-amountBox {
            color: #ed2136;
            font-weight: bold;
            .cl-amount {
              font-size: 23rem/36;
              line-height: 23rem/36;
            }
          }
          .cl-contentBox {
            color: #4d4d4d;
            .cl-tips {
              font-size: 11rem/36;
              font-weight: 400;
            }
          }
        }
        &.cl-oddNum {
          .cl-item {
            .sprite(@claim-com-gift, 108rem);
            &.FreeBet {
              .sprite(@claim-com-freebet, 108rem);
            }
            .cl-numberBox {
              right: 0;
              top: 0;
              .sprite(@claim-com-jb, 108rem);
              .cl-num {
                transform: rotate(45deg);
                padding-bottom: 18rem/36;
              }
            }
            .cl-amountBox {
              width: 83rem/36;
              flex-direction: column;
              .cl-unit {
                font-size: 16rem/36;
              }
            }
            .cl-contentBox {
              flex: 1;
              padding: 0 13rem/36;
              .cl-ititle {
                margin-bottom: 8rem/36;
                font-size: 13rem/36;
                font-weight: bold;
              }
            }
          }
        }
        &.cl-evenNum {
          padding-right: 13rem/36;
          width: 225rem/36;
          flex-wrap: wrap;
          .cl-item {
            &.cl-nob {
              margin-bottom: 0;
            }
            .sprite(@claim-com-gifteven, 108rem);
            &.FreeBet {
              .sprite(@claim-com-freebeteven, 108rem);
            }
            .cl-numberBox {
              top: -6rem/36;
              right: -13rem/36;
              min-width: 33rem/36;
              height: 19rem/36;
              padding: 0 5rem/36;
              border-radius: 10rem/36;
              background: linear-gradient(-17deg, #9b8002, #efd738);
            }
            .cl-amountBox {
              padding: 17rem/36 0 8rem/36;
              color: #ed2136;
              font-weight: bold;
              .cl-unit {
                font-size: 13rem/36;
              }
            }
            .cl-contentBox {
              text-align: center;
            }
          }
        }
      }
    }
    .cl-button {
      width: 245rem/36;
      height: 46rem/36;
      border-radius: 23rem/36;
      background: linear-gradient(83deg, #fc7933, #ff483d);
      font-size: 16rem/36;
      font-weight: bold;
      color: #fff;
    }
    .cl-button:active {
      opacity: 0.8;
    }
  }
  &.no-limited {
    .cl-tophdom {
      height: 70rem/36;
    }
    .cl-popBox {
      border: 6rem/36 solid #ffbf99;
      padding: 24rem/36 15rem/36 17rem/36;
      .cl-zsimg {
        top: -46rem/36;
        .sprite(@claim-com-claimzs, 108rem);
      }
      .cl-title {
        text-align: center;
        margin-bottom: 15rem/36;
      }
      .cl-time {
        font-size: 12.5rem/36;
      }
    }
  }
}
</style>
