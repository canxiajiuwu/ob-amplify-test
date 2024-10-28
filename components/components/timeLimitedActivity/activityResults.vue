<template>
  <div
    class="cl-activityResults"
    :class="{ 'cl-notWinner': !activityResultsInfo.is_win }"
  >
    <div
      class="cl-title"
      v-html="
        activityResultsInfo.is_win
          ? $t('timeLimitedActivity.congratulations', {
              num: activityResultsInfo.amount,
              rewardType: rewardType[activityResultsInfo.award_type]
            })
          : $t('timeLimitedActivity.notWinner')
      "
    ></div>
    <template v-if="activityResultsInfo.is_win">
      <div class="cl-icon">
        <img
          :src="`${STATICURL}/images/timeLimitedActivity/${getIconName(
            activityResultsInfo.award_type
          )}.png`"
        />
      </div>
    </template>
    <template v-else>
      <div class="cl-list">
        <div
          class="cl-item"
          :class="{
            'cl-noBorder': index === activityResultsInfo.record.length - 1
          }"
          v-for="(item, index) in activityResultsInfo.record"
          :key="index"
        >
          <div class="cl-index">{{ index + 1 }}</div>
          <div class="cl-avatar">
            <img v-if="item.avatar" :src="item.avatar" />
          </div>
          <div class="cl-name">{{ item.nickname }}</div>
          <div class="cl-money">
            {{
              item.amount +
              (activityResultsInfo.award_type === 6 ? 'Coins' : $t('units'))
            }}
          </div>
        </div>
      </div>
    </template>

    <div class="cl-btn" @click="close">
      {{
        activityResultsInfo.is_win
          ? $t('commonModal.ok')
          : $t('timeLimitedActivity.close')
      }}
    </div>
    <div
      class="cl-checkReward"
      v-if="activityResultsInfo.is_win"
      @click="checkReward"
    >
      {{ $t('timeLimitedActivity.checkReward') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityResults',
  props: {
    activityResultsInfo: {
      type: Object
    }
  },
  data() {
    return {
      rewardType: [
        '',
        "<span style='color:#FF3F38;font-weight:900;font-size:0.47rem'>XAF</span> cash.",
        "<span style='color:#FF3F38;font-weight:900;font-size:0.47rem'>XAF</span>  Onebet League Freebet",
        "<span style='color:#FF3F38;font-weight:900;font-size:0.47rem'>XAF</span>  Sports Gifts",
        "<span style='color:#FF3F38;font-weight:900;font-size:0.47rem'>XAF</span>  Casino Gifts",
        "<span style='color:#FF3F38;font-weight:900;font-size:0.47rem'>XAF</span>  Onebet League Freebet",
        'Coins'
      ]
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    }
  },
  methods: {
    close() {
      this.$emit('emitCloseActivityResults')
    },
    // 点击查看发放记录，则跳转到inbox页面
    checkReward() {
      this.close()
      this.$router.push({ path: `/${this.$store.state.root.locale}/inbox` })
    },
    getIconName(award_type) {
      const iconName = [
        '',
        'cash',
        'freebet',
        'gifts',
        'gifts',
        'freebet',
        'coins'
      ]
      return iconName[award_type]
    }
  }
}
</script>
<style scoped lang="less">
.cl-activityResults {
  width: 300rem/36;
  background: #ffffff;
  border-radius: 9rem/36;
  padding: 30rem/36 0 20rem/36;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.cl-notWinner {
    padding-top: 23rem/36;
    .cl-title {
      width: 232rem/36;
    }
    .cl-btn {
      margin-top: 17rem/36;
    }
  }
  .cl-title {
    width: 100%;
    text-align: center;
  }
  .cl-icon {
    width: 145rem/36;
    height: 145rem/36;
    margin-top: 5rem/36;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .cl-list {
    width: 280rem/36;
    max-height: 255rem/36;
    background: #f4f4f4;
    border-radius: 9rem/36;
    padding: 0 12rem/36;
    box-sizing: border-box;
    font-size: 15rem/36;
    color: #000000;
    overflow-y: auto;
    margin-top: 15rem/36;
    .cl-item {
      display: flex;
      align-items: center;
      height: 57rem/36;
      border-bottom: 1rem/36 solid rgba(0, 0, 0, 0.2);
      &.cl-noBorder {
        border-bottom: 0;
      }
      .cl-index {
        width: 26rem/36;
        text-align: right;
        font-weight: bold;
        margin-right: 8rem/36;
      }
      .cl-avatar {
        width: 37rem/36;
        height: 37rem/36;
        border-radius: 50%;
        overflow: hidden;
        background-image: url('../../../assets/images/general/spritesBefore/account/un-login.png');
        background-size: contain;
        background-repeat: no-repeat;
        border: 1rem/36 solid #e9e9f3;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .cl-name {
        flex: 1;
        margin-left: 11rem/36;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cl-money {
        color: #ff3f38;
        margin-left: 20rem/36;
        font-weight: 400;
      }
    }
  }
  .cl-btn {
    width: 228rem/36;
    height: 43rem/36;
    background: linear-gradient(90deg, #f84b47, #ff5d96);
    border-radius: 21rem/36;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15rem/36;
    font-weight: bold;
    color: #ffffff;
    margin-top: 5rem/36;
  }
  .cl-checkReward {
    font-size: 12rem/36;
    font-weight: 400;
    color: #000000;
    line-height: 17rem/36;
    opacity: 0.8;
    margin-top: 15rem/36;
    text-align: center;
  }
}
</style>
