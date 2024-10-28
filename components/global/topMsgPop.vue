<template>
  <div>
    <audio ref="mp3" style="display: none" controls>
      <source :src="`${STATICURL}/audio/msg.mp3`" type="audio/mpeg" />
      <source :src="`${STATICURL}/audio/msg.ogg`" type="audio/ogg" />
    </audio>
    <transition name="topPopSlide">
      <div
        v-if="showTopPop"
        class="cl-topMsgPop-wrap"
        :style="getDynamicStyle"
        @click="clickPop"
      >
        <div class="cl-upper cl-flexcs">
          <div class="cl-icon" :class="['no-icon' + type]"></div>
          <div class="cl-msg">{{ upperText }}</div>
          <div class="cl-close" @click.stop="close"></div>
        </div>
        <div class="cl-lower cl-flexcb">
          <div class="cl-lowerMsg" v-html="lowerText"></div>
          <div v-if="type !== 'D'" class="cl-btn cl-flexcc">
            {{
              type === 'A1'
                ? $t('freebetBonus.activate')
                : $t('newbieExclusive.betNow')
            }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import {
  getPopupHierarchy,
  removesPopupsBeingDisplayedList
} from '@/assets/js/utils/popupPriority.js'
export default {
  name: 'TopMsgPop',
  components: {},
  props: {
    type: {
      type: String
    },
    showTopPop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      popType: 'giftOrFreeBetExpire'
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    info() {
      return this.$store.state.info
    },
    upperText() {
      // A1
      if (this.type === 'A1') return this.$t('topMsgPop.congrat')
      // A2
      else if (this.type === 'A2') return this.$t('topMsgPop.freebetExpired')
      // B2
      else if (this.type === 'B2') return this.$t('topMsgPop.giftExpired')
      // D
      else return 'Notice'
    },
    lowerText() {
      // A1
      if (this.type === 'A1') return this.$t('topMsgPop.activate')
      // A2
      else if (this.type === 'A2')
        return this.$t('topMsgPop.freebetExpiredDate', {
          amount: this.info.freeBet,
          date: Lib.common.getDate(new Date(), 'dd.MM.yyyy')
        })
      // B2
      else if (this.type === 'B2')
        return this.$t('topMsgPop.giftExpiredDate', {
          amount: this.info.gifts,
          date: Lib.common.getDate(new Date(), 'dd.MM.yyyy')
        })
      // D
      else
        return 'Deeply mourns the passing of the Queen,  recent Premier League matches will be postponed. We will temporarily remove Premier League-related sports promos events, thank you for your understanding.'
    },
    getDynamicStyle() {
      return {
        'z-index': getPopupHierarchy({ type: this.popType })
      }
    }
  },
  watch: {
    showTopPop(newVal) {
      if (newVal) {
        this.$refs.mp3.play()
        // 五秒自动消失
        setTimeout(
          () => {
            this.close()
          },
          this.type === 'D' ? 10000 : 5000
        )
      }
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {},
  methods: {
    clickPop() {
      if (this.type === 'A1') {
        Lib.common.event_statistics('top_pop_A1_click')
        this.$router.push({
          path: `/${this.$store.state.root.locale}/freebetbonus`
        })
      } else if (this.type === 'A2') {
        Lib.common.event_statistics('top_pop_A2_click')
        this.$router.push({ path: `/${this.$store.state.root.locale}/freebet` })
      } else if (this.type === 'B2') {
        Lib.common.event_statistics('top_pop_B2_click')
        this.$router.push({ path: `/${this.$store.state.root.locale}/betslip` })
      }
      this.close()
    },
    close() {
      this.$emit('closeTopPop')
      removesPopupsBeingDisplayedList({ type: this.popType })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.topPopSlide-enter-active,
.cl-topPopSlide-leave-active {
  transition: all 0.3s ease-out;
}
.topPopSlide-enter,
.cl-topPopSlide-leave-to {
  opacity: 0;
  transform: translateY(-270rem/108);
}
.topPopSlide-enter-to,
.cl-topPopSlide-leave {
  opacity: 1;
  transform: translateY(0);
}
.cl-topMsgPop-wrap {
  position: fixed;
  top: 40rem/108;
  left: 30rem/108;
  box-sizing: border-box;
  width: 1020rem/108;
  background: #fff;
  box-shadow: 0px 7rem/108 19rem/108 0px rgba(0, 0, 0, 0.18);
  border-radius: 10rem/108;
  border: 1px solid #c1cbd5;
  .cl-upper {
    height: 80rem/108;
    padding: 0 26rem/108;
    .cl-icon {
      .sprite(@icon-top-msg-freebet, 108rem);
      margin: 0 13rem/108 0 0;

      &.no-iconD {
        .sprite(@menu-account-reminder,72rem);
      }
    }
    .cl-msg {
      flex: 1;
      font-size: 30rem/108;
      color: #202020;
    }
    .cl-close {
      .sprite(@icon-close, 108rem);
    }
  }
  .cl-lower {
    min-height: 140rem/108;
    padding: 0 30rem/108 10rem/36;
    background: #f8f8f8;
    .cl-lowerMsg {
      font-size: 34rem/108;
      font-weight: 700;
      color: #202020;
    }
    .cl-btn {
      width: 180rem/108;
      height: 60rem/108;
      background: #ff0000;
      border-radius: 33rem/108;
      font-weight: 700;
      color: #fff;
      font-size: 30rem/108;
      text-align: center;
    }
  }
}
</style>
