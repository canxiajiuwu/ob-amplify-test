<template>
  <div class="cl-accountInbox-wrap">
    <div class="cl-topBox">
      <headBack
        title="Inbox"
        :middle-word-style="{
          fontSize: 15 / 36 + 'rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />
    <accountInboxBox />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import accountInboxBox from '@/components/components/accountInboxBox.vue'
export default {
  name: 'Inbox',
  components: {
    headBack,
    accountInboxBox
  },
  computed: {
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  }
}
</script>

<style scoped lang="less">
.cl-accountInbox-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }
}
</style>
