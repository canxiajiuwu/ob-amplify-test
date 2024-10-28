<template>
  <div class="cl-bsbb cl-betslipGifts-wrap">
    <div class="cl-flexce cl-top">
      <div class="cl-title">{{ $t('accountGiftList.title') }}</div>
      <div class="cl-close" @click="closeGifts" />
    </div>
    <div class="cl-giftList">
      <template v-if="giftList.length">
        <template v-for="(item, index) in giftList">
          <div
            :key="index"
            class="cl-indexCardShadow cl-bsbb cl-item"
            :class="{ 'cl-select': gift_index === index }"
            @click="useGift(index, item)"
          >
            <div class="cl-flexcc cl-bsbb cl-leftBox">
              <div class="cl-flexec">
                <div class="cl-unit">{{ $t('units') }}</div>
                <div class="cl-amount">{{ item.amount }}</div>
              </div>
            </div>
            <div class="cl-flexcb cl-rightBox">
              <div class="cl-left">
                <div class="cl-up">
                  {{
                    $t('accountGiftList.limit') +
                    item.limit +
                    $t('accountGiftList.limit1')
                  }}
                </div>
                <div class="cl-down">
                  {{ $t('accountGiftList.placed') + item.odds }}
                </div>
              </div>
              <div class="cl-rightIcon" />
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="cl-flexcc cl-giftsIcon">
          <img src="@/assets/images/general/notSprites/betslipBox/gift.png" />
        </div>

        <div class="cl-flexcc cl-message">
          {{ $t('accountGiftList.noGifts') }}
        </div>
      </template>
      <div :style="{ height: (bottomHeight || 30) / 36 + 'rem' }" />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: {
    gift_index: {
      type: Number
    },
    giftList: {
      type: Array
    },
    bottomHeight: {
      type: Number
    },
    oddsCount: {
      type: Number
    },
    stake: {}
  },
  computed: {
    tword() {
      const { locale } = this.$store.state.root
      return [
        ({ odds }) => {
          return locale === 'fr'
            ? `Ce cadeau en espèces nécessitait une cote >= ${odds} que votre ticket n'a pas atteinte, choisissez d'autres cadeaux en espèces ou ajoutez plus de marchés à votre ticket.`
            : `This cash gift required an Odds >= ${odds} which your ticket didn't reach, choose other cash gifts or add more markets to your ticket.`
        },
        ({ limit }) => {
          return locale === 'fr'
            ? `Ce cadeau nécessite des mises >= ${limit}, acceptez-vous de changer les mises en ${limit} pour utiliser ce cadeau.`
            : `This Gift need the Stakes >= ${limit}, do you agree to change the Stakes to ${limit} to use this Gift.`
        }
      ]
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    }
  },
  methods: {
    // 选择礼物
    useGift(index) {
      Lib.common.event_statistics('betslip_gifts_popup_use')
      if (this.gift_index === index) return this.$emit('useGift', -1)
      // 赔率不满足
      if (
        this.oddsCount < this.giftList[index].odds &&
        this.routeName !== 'createBetslip'
      ) {
        this.giftOddsTips(index)
        this.$emit('useGift', -1)
      } else if (
        this.stake < this.giftList[index].limit &&
        this.routeName !== 'createBetslip'
      ) {
        // 投注金额不满足
        this.giftStakeTips(index)
      } else {
        this.$emit('useGift', index)
      }
    },
    // 赔率不满足
    giftOddsTips(index) {
      Lib.common.errorReminder(
        this,
        '',
        '',
        this.$t('betslipPlaceBet.oddTitle'),
        this.tword[0]({ odds: this.giftList[index].odds }),
        this.$t('betslipPlaceBet.addMore'),
        this.$t('commonModal.cancel'),
        () => {
          this.closeGifts()
          this.$router.push({
            path: `/${this.$store.state.root.locale}/createBetslip`,
            query: {
              type: 'chooseGift',
              gift_index: index,
              stake: this.stake,
              gift_odds: this.giftList[index].odds
            }
          })
        },
        null
      )
    },
    // 投注额不满足
    giftStakeTips(index) {
      Lib.common.errorReminder(
        this,
        '',
        '',
        this.$t('betslipPlaceBet.stakeTitle'),
        this.tword[1]({ limit: this.giftList[index].limit }),
        this.$t('betslipConfirm.confirm'),
        this.$t('commonModal.cancel'),
        () => {
          this.$emit('useGift', index)
          this.closeGifts()
        },
        null
      )
    },
    // 关闭礼物列表
    closeGifts() {
      this.$emit('visibleIsGiftShow', false)
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipGifts-wrap {
  display: flex;
  flex-direction: column;
  padding-top: 17rem/36;
  height: 100%;
  font-size: 13rem/36;
  font-weight: 400;
  color: #000;

  .cl-top {
    position: relative;
    margin-bottom: 10rem/36;
    .cl-title {
      color: #333;
      font-weight: bold;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .cl-close {
      margin-right: 10rem/36;
      .sprite(@ticon-gray-close, 108rem);
    }
  }

  .cl-giftList {
    padding-top: 5rem/36;
    flex: 1;
    overflow-y: auto;

    .cl-item {
      display: flex;
      margin: 0 10rem/36;
      min-height: 67rem/36;
      border-radius: 13rem/36;
      padding: 9rem/36 13rem/36 9rem/36 0;
      margin-bottom: 10rem/36;
      .cl-leftBox {
        width: 85rem/36;
        margin-right: 10rem/36;
        color: #eb4949;
        font-weight: bold;
        border-right: 0.5rem/36 solid #d4dae1;
        .cl-unit {
          font-size: 14rem/36;
          margin-right: 3rem/36;
        }
        .cl-amount {
          font-size: 19rem/36;
          line-height: 19rem/36;
        }
      }
      .cl-rightBox {
        flex: 1;
        .cl-left {
          flex: 1;
          .cl-down {
            margin-top: 5rem/36;
            font-size: 11rem/36;
            color: #a2a2a7;
          }
        }
        .cl-rightIcon {
          margin-left: 10rem/36;
          width: 21rem/36;
          height: 21rem/36;
          border-radius: 50%;
          background-color: #f8f8f8;
          border: 0.5rem/36 solid #cdcdcd;
          box-sizing: border-box;
        }
      }
      &.cl-select {
        .cl-rightBox {
          .cl-rightIcon {
            .sprite(@ticon-red-select, 108rem);
          }
        }
      }
    }
  }

  .cl-giftsIcon {
    height: 200rem/36;
    img {
      height: inherit;
    }
  }
}
</style>
