<template>
  <div
    class="cl-flexcc cl-commonReminder-wrap"
    :class="{ 'cl-commonReminderSuccess-wrap': commonReminderType === 1 }"
    :style="{ paddingTop: `calc(15rem/36 + ${safeAreaTop}px)` }"
  >
    <div class="cl-word">{{ commonReminderText }}</div>
    <div
      class="cl-icon"
      :style="{ top: `calc(5rem/36 + ${safeAreaTop}px)` }"
      @click="closeReminder"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonReminder',
  data() {
    return {
      dataTimeout: ''
    }
  },
  computed: {
    commonReminderText() {
      return this.$store.state.commonReminderText
    },
    commonReminderType() {
      return this.$store.state.commonReminderType
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    this.dataTimeout = setTimeout(() => {
      this.closeReminder()
    }, 10000)
  },
  beforeDestroy() {
    clearTimeout(this.dataTimeout)
  },
  methods: {
    // 关闭提示
    closeReminder() {
      this.$store.commit('setCommonReminder', {
        isCommonReminderShow: false,
        commonReminderText: '',
        commonReminderType: 0
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-commonReminder-wrap {
  position: fixed;
  top: 0;
  margin: 0 auto;
  z-index: 10000;
  box-sizing: border-box;
  padding: 0 30rem/36 15rem/36 10rem/36;
  width: 10rem;
  color: #fff;
  font-size: 12rem/36;
  background-color: #e62f10;

  &.cl-commonReminderSuccess-wrap {
    background-color: #009a44;
  }
  .cl-icon {
    position: absolute;
    right: 5rem/36;
    .sprite(@icon-modal-close,216rem);
  }
}
</style>
