<template>
  <div class="cl-flexcc cl-prompt-wrap" v-if="toastInfo" @click="close">
    <p class="cl-prompt">{{ toastInfo }}</p>
  </div>
</template>

<script>
export default {
  name: 'Prompt',
  computed: {
    toastInfo() {
      return this.$store.state.toastInfo
    }
  },
  watch: {
    toastInfo(value) {
      if (value) setTimeout(() => this.close(), 3000)
    }
  },
  methods: {
    close() {
      this.$store.commit('setToastInfo')
    }
  }
}
</script>

<style scoped lang="less">
.cl-prompt-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1300;
  .cl-prompt {
    max-width: 262rem/36;
    border-radius: 3rem/36;
    color: #fff;
    text-align: center;
    line-height: 15rem/36;
    padding: 12rem/36 18rem/36;
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>
