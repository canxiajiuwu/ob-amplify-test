<template>
  <div class="cl-gamePositionPage-wrap">
    <loading />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import loading from '@/components/components/loading.vue'
export default {
  components: { loading },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    // 打开游戏
    this.$store.commit('setIframeGame', 1)
  }
}
</script>

<style scoped lang="less">
.cl-gamePositionPage-wrap {
  background-color: #fff;
  min-height: 100vh;
  width: 10rem;
}
</style>
