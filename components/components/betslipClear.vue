<template>
  <div class="cl-betslipClear-wrap">
    <div class="cl-flexcb cl-container">
      <div class="cl-flexcs cl-left" @click="clearBetslip">
        <div class="cl-icon" />
        <div class="cl-name">{{ $t('betslipBack.clear') }}</div>
      </div>

      <div class="cl-flexcc cl-right">
        <div class="cl-keep">{{ $t('betslipBack.keep') }}</div>
        <van-switch
          v-model="checked"
          :size="15 / 36 + 'rem'"
          :active-color="mainStyle.mainThemeColor"
          :inactive-color="mainStyle.switchInactiveColor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import 'vant/lib/switch/index.less'

export default {
  data() {
    return {
      checked: true
    }
  },
  computed: {
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    }
  },
  watch: {
    checked(val) {
      Lib.common.event_statistics('Betslip_Keep_Click')
      this.$store.commit('setIsKeep', val)
    }
  },
  created() {
    this.checked = this.$store.state.isKeep
  },
  methods: {
    // 删除所有tickets
    clearBetslip() {
      Lib.common.event_statistics('Betslip_Clear_Click')
      this.$store.commit('setTickets', [])
      Lib.store.remove('tickets')
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipClear-wrap {
  padding: 6rem/36 10rem/36;
  background-color: #fff;
  .cl-container {
    box-sizing: border-box;
    height: 20rem/36;

    .cl-left {
      .cl-icon {
        .sprite(@icon-clear, 108rem);
      }

      .cl-name {
        margin-left: 6rem/36;
        font-size: 9rem/36;
        font-weight: 400;
        color: @liveNameColor;
      }
    }

    .cl-right {
      /deep/ .van-switch {
        width: 25rem/36;
        .van-switch__node {
          width: 11rem/36;
          height: 11rem/36;
          top: 2rem/36;
          left: 2rem/36;
        }
      }
      /deep/ .van-switch--on {
        .van-switch__node {
          left: -3rem/36;
        }
      }
      .cl-keep {
        font-size: 9rem/36;
        margin-right: 3rem/36;
        color: #a2a2a7;
      }
    }
  }
}
</style>
