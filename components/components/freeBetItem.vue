<template>
  <div class="cl-freeBetItem-wrap">
    <div v-if="where === 'invite'" class="cl-bsbb cl-inviteItem">
      <div class="cl-flexcb cl-top">
        <div class="cl-left">
          {{
            $t('inviteFriend.fa') +
            ': ' +
            String(item.friend_mobile).replace(
              /(\d{3})(\d{4})(\d{3})/,
              '$1****$3'
            )
          }}
        </div>
        <template v-for="(a, b) in 5">
          <div
            v-if="item.bet_id && item.bet_result === b"
            :key="b"
            class="cl-payStatus"
            :class="'no-status' + (b + 1)"
          >
            {{ $t('accountMybetBox.ticket_status' + (b + 1)) }}
          </div>
        </template>
      </div>
      <div style="height: calc(10rem / 36)" />
      <template v-if="item.bet_id">
        <div class="cl-flexcb cl-rowBox cl-betid">
          <div class="cl-left">
            {{ $t('accountMybetBox.bet_id') + ' #' + item.bet_id }}
          </div>
          <div class="cl-right">
            {{ $t('accountGiftList.freeStake') + ' ' + item.free_stake }}
          </div>
        </div>
        <div style="height: calc(10rem / 36)" />
        <div class="cl-flexcb cl-rowBox cl-payout">
          <div class="cl-left">
            {{ $t('accountGiftList.payout') }}:
            <span>{{
              ' ' + $t('unit') + ' ' + Number(item.payout).toFixed(2)
            }}</span>
          </div>
          <div class="cl-flexcc cl-status">
            <div>
              {{
                isExpired
                  ? $t('accountGiftList.bottomTitleExpired')
                  : $t('accountMybetDetailBox.freebets') +
                    ':' +
                    $t('accountGiftList.bottomTitle')[item.status - 1]
              }}
            </div>
            <img
              class="cl-img"
              src="@/assets/images/mybet/instruction.png"
              data-trigger-button="true"
              @click.stop="openInstruction"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="cl-flexcb cl-rowBox cl-amount">
          <div class="cl-left">
            {{ $t('freeBetList.more', { number: item.market }) }}
          </div>
          <div class="cl-right">
            {{ $t('unit') + ' ' + item.amount }}
          </div>
        </div>
      </template>
      <div style="height: calc(7rem / 36)" />
      <div class="cl-flexsb cl-buttonBox">
        <div
          v-if="!(item.status === 3 || (item.bet_id && item.bet_result === 0))"
          class="cl-expires2"
          v-html="getExpires(item.bet_id ? item.expire : item.use_expire)"
        />
        <!-- 占位dom -->
        <div v-else />
        <div
          v-if="![0, 1, 3, 5].includes(stateNum)"
          class="cl-flexcc cl-bsbb cl-btn"
          :class="'no-btnstate' + stateNum"
          @click.stop="manipulate"
        >
          {{ $t('inviteFriend.btn')[stateNum] }}
        </div>
      </div>
      <div
        class="cl-instruction"
        ref="tooltip"
        v-if="isShowInstruction"
        @click.stop="closeInstruction"
        @blur="blur"
        tabindex="-1"
      >
        {{
          isExpired
            ? $t('accountGiftList.instructionExpire')
            : instructionList[item.status - 1]
        }}
        <div class="cl-triangles" />
      </div>
    </div>

    <div v-else class="cl-indexCardShadow cl-freeBetItem" @click="goDetail">
      <div class="cl-flexsb cl-top">
        <div class="cl-left">
          <div class="cl-title">
            {{ $t('accountMybetBox.bet_id') + ' #' + item.bet_id }}
          </div>
          <div class="cl-expiresAndFreeStake">
            <span class="cl-betDate">{{
              getDate(item.bet_date, 'dd/MM,HH:mm')
            }}</span>
            <span class="cl-freeStake">{{
              $t('accountGiftList.freeStake') + ' ' + item.free_stake
            }}</span>
          </div>
          <div
            v-if="
              item.free_type !== 0 && item.bet_result === 2 && item.status !== 3
            "
            class="cl-expires2"
            v-html="getExpires(item.expire)"
          ></div>
        </div>
        <div class="cl-right">
          <div class="cl-payout">
            {{ $t('accountGiftList.payout') + ':' + item.payout }}
          </div>
          <div v-for="(a, b) in 5" :key="b">
            <div
              v-if="item.bet_result === b"
              class="cl-payStatus"
              :class="'no-status' + (b + 1)"
            >
              {{ $t('accountMybetBox.ticket_status' + (b + 1)) }}
            </div>
          </div>
        </div>
      </div>
      <div class="cl-flexcb cl-bottom" v-if="item.free_type !== 0">
        <div class="cl-flexcs cl-status">
          <div>
            {{
              $t('accountMybetDetailBox.freebets') +
              ': ' +
              (isExpired
                ? $t('accountGiftList.bottomTitleExpired')
                : $t('accountGiftList.bottomTitle')[item.status - 1])
            }}
          </div>
          <img
            class="cl-img"
            src="@/assets/images/mybet/instruction.png"
            @click.stop="openInstruction"
          />
        </div>
        <div
          class="cl-flexcc cl-btn"
          :class="{ 'cl-noBtn': item.bet_result === 0 }"
          v-if="$t('inviteFriend.btn')[stateNum]"
          @click.stop="manipulate"
        >
          {{ $t('inviteFriend.btn')[stateNum] }}
        </div>
      </div>
      <div
        class="cl-instruction"
        :class="{ 'cl-shortInstruction': item.bet_result !== 2 }"
        ref="tooltip"
        v-if="isShowInstruction"
        @click.stop="closeInstruction"
        tabindex="-1"
        @blur="blur"
      >
        {{
          isExpired
            ? $t('accountGiftList.instructionExpire')
            : instructionList[item.status - 1]
        }}
        <div
          class="cl-triangles"
          :style="{ left: instructionLeft + 'px' }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import Lib from '@/assets/js/Lib'
export default {
  props: {
    item: {
      type: Object
    },
    where: {
      type: String
    }
  },
  data() {
    return {
      isShowInstruction: false,
      instructionLeft: 0
    }
  },
  computed: {
    locale() {
      return this.$store.state.root.locale
    },
    stateNum() {
      const { status, bet_result, bet_id, use_expire } = this.item
      if (bet_id === 0) {
        if (new Date() > use_expire * 1000) return 1 // 已过期
        return 7 // 可以使用
      }
      if (this.isExpired) {
        if (status === 3) return 0 // 已提现
        return 1 // 已过期
      }
      if ([0, 1, 3, 4].includes(bet_result)) {
        if (bet_result === 0) return 2 // 未结算
        if ([1, 3, 4].includes(bet_result)) return 3 // 结算失败
      }
      if (status === 1) return 4 // 未解锁
      if (status === 3) return 5 // 已提现未过期
      if (status === 2) return 6 // 待提现
      return 1
    },
    isExpired() {
      return new Date() > this.item.expire * 1000
    },
    instructionList() {
      return [
        this.$t('accountGiftList.present', {
          get: this.$t('accountGiftList.from')[this.item.from - 22],
          after: this.$t(`accountGiftList.after${this.item.from - 22}`, {
            odd: this.item.type_odds,
            amount: this.item.type_amount
          })
        }),
        this.item.bet_result
          ? this.$t('accountGiftList.instruction1')
          : this.$t('accountGiftList.instruction2'),
        this.$t('accountGiftList.instruction3', {
          money: this.item.payout
        })
      ]
    }
  },
  methods: {
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 秒变分钟
    minuteDetal(timeStamp, fmt) {
      return Lib.common.minuteDetal(timeStamp, fmt)
    },
    getExpires(time) {
      const now = new Date()
      const expiration = new Date(time * 1000)
      // 判断是否已经过期
      if (expiration < now) {
        return `Expired on ${this.getDate(time, 'dd/MM,HH:mm')}`
      }
      const diff = Math.floor((expiration - now) / 1000)

      const days = this.minuteDetal(diff, 'd')
      // 超过1天，显示天数
      if (days >= 1) {
        return `Expires in <span style='color:#FF4C2C'>${days} days</span>`
      }
      // 24小时内，显示小时、分钟和秒
      return `Expires in <span style="color:#FF4C2C">${this.minuteDetal(
        diff,
        'HHa MMb ssc'
      )
        .replace('a', 'h')
        .replace('b', 'm')
        .replace('c', 's')}</span>`
    },
    openInstruction(e) {
      this.instructionLeft = e.target.offsetLeft + (10 * window.rem) / 36 / 2
      this.isShowInstruction = true
      this.$nextTick(() => {
        this.$refs.tooltip.focus()
      })
    },
    closeInstruction() {
      this.isShowInstruction = false
    },
    manipulate() {
      this.$emit('manipulate', this.item)
    },
    blur() {
      this.closeInstruction()
    },
    goDetail() {
      this.$router.push({
        path: `/${this.locale}/mybetDetail/${this.item.bet_id}`
      })
    }
  }
}
</script>
<style scoped lang="less">
.cl-freeBetItem-wrap {
  .cl-inviteItem {
    padding: 10rem/36;
    background-color: #fff;
    border-radius: 7rem/36;
    border: 1rem/36 solid #bfbfc4;
    position: relative;
    font-size: 11rem/36;
    font-weight: 400;
    color: #656464;
    .cl-top {
      padding-bottom: 10rem/36;
      border-bottom: 1rem/36 dashed #bfbfc4;
      .cl-left {
        color: #212121;
      }
      .cl-payStatus {
        text-transform: uppercase;
        text-align: right;
        &.no-status1 {
          color: @mainThemeColor;
        }

        &.no-status2 {
          color: #404040;
        }

        &.no-status3 {
          color: @myBetWon;
        }

        &.no-status4 {
          color: #a2a2a7;
        }

        &.no-status5 {
          color: #6dd400;
        }
      }
    }
    .cl-rowBox {
      &.cl-betid {
        .cl-left {
          text-transform: uppercase;
        }
      }
      &.cl-payout {
        .cl-left {
          span {
            color: #ff2d2d;
          }
        }
        .cl-status {
          .cl-img {
            width: 12rem/36;
            height: 12rem/36;
            margin-left: 3rem/36;
          }
        }
      }
      &.cl-amount {
        .cl-right {
          color: #ff2d2d;
        }
      }
    }
    .cl-buttonBox {
      .cl-expires2 {
        font-size: 11rem/36;
        color: #656464;
      }
      .cl-btn {
        min-width: 60rem/36;
        height: 22rem/36;
        border-radius: 11rem/36;
        padding: 0 10rem/36;
        font-size: 8rem/36;
        &.no-btnstate2 {
          color: #fff;
          background-color: #c6c6c6;
        }
        &.no-btnstate4 {
          border: 0.5rem/36 solid #fe5d87;
          color: #fe5d87;
        }
        &.no-btnstate6 {
          border: 0.5rem/36 solid #fe5d87;
          color: #fe5d87;
        }
        &.no-btnstate7 {
          color: #fff;
          background-color: #fe5d87;
        }
      }
    }
    .cl-instruction {
      position: absolute;
      right: -10rem/36;
      top: 90rem/36;
      width: 229rem/36;
      box-sizing: border-box;
      padding: 10rem/36 8rem/36 10rem/36 14rem/36;
      font-weight: 400;
      font-size: 11rem/36;
      color: #000;
      line-height: 15rem/36;
      background-color: #fff08c;
      border-radius: 6rem/36;
      z-index: 1;
      .cl-triangles {
        position: absolute;
        bottom: 100%;
        right: 16rem/36;
        border-width: 10rem/36;
        border-style: solid;
        border-color: transparent transparent #fff08c transparent;
      }
    }
    .cl-instruction:focus {
      outline: none;
    }
  }
  .cl-freeBetItem {
    padding: 13rem/36 14rem/36 10rem/36 10rem/36;
    border-radius: @mainButtonRadius;
    position: relative;
    margin-bottom: 10rem/36;
    .cl-top {
      .cl-left {
        .cl-title {
          font-weight: bold;
          font-size: 11rem/36;
          color: #363636;
          line-height: 11rem/36;
        }

        .cl-expiresAndFreeStake {
          font-weight: 400;
          font-size: 10rem/36;
          color: #515151;
          line-height: 10rem/36;
          margin-top: 11rem/36;
          .cl-betDate {
            color: #a2a2a7;
            margin-right: 8rem/36;
          }
        }
        .cl-expires2 {
          font-weight: 400;
          font-size: 10rem/36;
          color: #a2a2a7;
          line-height: 10rem/36;
          margin-top: 8rem/36;
        }
      }
      .cl-right {
        text-align: right;
        .cl-payout {
          font-weight: bold;
          font-size: 11rem/36;
          color: #363636;
          line-height: 11rem/36;
        }
        .cl-payStatus {
          text-align: right;
          font-weight: 400;
          font-size: 10rem/36;
          line-height: 10rem/36;
          margin-top: 11rem/36;
          text-transform: uppercase;
        }
        .cl-status1 {
          color: @mainThemeColor;
        }

        .cl-status2 {
          color: #404040;
        }

        .cl-status3 {
          color: @myBetWon;
        }

        .cl-status4 {
          color: #a2a2a7;
        }

        .cl-status5 {
          color: #6dd400;
        }
      }
    }
    .cl-bottom {
      margin-top: 9rem/36;
      padding-top: 10rem/36;
      border-top: 1rem/36 solid #e9e9f3;
      .cl-status {
        font-weight: 400;
        font-size: 10rem/36;
        color: #363636;
        line-height: 15rem/36;
        .cl-img {
          width: 12rem/36;
          height: 12rem/36;
          margin-left: 3rem/36;
        }
      }
      .cl-btn {
        min-width: 63rem/36;
        height: 20rem/36;
        border-radius: 10rem/36;
        border: 1rem/36 solid #eb4949;
        padding: 0 10rem/36;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 8rem/36;
        color: #eb4949;
        &.cl-noBtn {
          border: 1rem/36 solid #878787;
          color: #989898;
        }
      }
    }
    .cl-instruction {
      position: absolute;
      left: 0;
      top: 110rem/36;
      width: 229rem/36;
      box-sizing: border-box;
      padding: 10rem/36 8rem/36 10rem/36 14rem/36;
      font-weight: 400;
      font-size: 11rem/36;
      color: #000000;
      line-height: 15rem/36;
      background-color: #fff08c;
      border-radius: @mainButtonRadius;
      z-index: 1;
      &.cl-shortInstruction {
        top: 93rem/36;
      }
      .cl-triangles {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 10rem/36;
        border-style: solid;
        border-color: transparent transparent #fff08c transparent;
      }
    }
    .cl-instruction:focus {
      outline: none;
    }
  }
}
</style>
