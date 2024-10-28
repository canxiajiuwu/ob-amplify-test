<template>
  <div
    v-if="msg"
    :style="accountModalStyle"
    class="cl-flexcs cl-accountModal-wrap"
    @click="goFun"
  >
    <div class="cl-icon" />
    <div class="cl-msg" v-html="msg" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  props: ['msg', 'checkInfo'],
  computed: {
    accountModalStyle() {
      return {
        pointerEvents:
          this.checkInfo === 'orange' || this.checkInfo === 'rePsd'
            ? 'auto'
            : 'none'
      }
    }
  },
  methods: {
    goFun() {
      switch (this.checkInfo) {
        case 'orange':
          Lib.common.event_statistics('register_orange_click')
          this.$router.push({
            path: `/${this.$store.state.root.locale}/orangeExclusive`
          })
          break
        case 'rePsd':
          this.$emit('emitRePsd')
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountModal-wrap {
  background-color: #fff2a0;
  padding: 8rem/36 10rem/36;
  box-sizing: border-box;
  width: 10rem;
  color: #000;
  font-size: 11rem/36;
  font-weight: 400;
  position: absolute;
  top: 0;
  left: 0;

  .cl-icon {
    flex-shrink: 0;
    margin-right: 10rem/36;
    .sprite(@menu-account-reminder,72rem);
  }
}
</style>
