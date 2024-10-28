<template>
  <div class="cl-accountTransactionHistory-wrap">
    <div class="cl-topBox">
      <headBack
        title="Transaction History"
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
    <accountTransactionBox />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import accountTransactionBox from '@/components/components/accountTransactionBox.vue'

export default {
  name: 'TransactionHistory',
  components: {
    headBack,
    accountTransactionBox
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
.cl-accountTransactionHistory-wrap {
  width: 10rem;
  min-height: 100vh;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }
}
</style>
