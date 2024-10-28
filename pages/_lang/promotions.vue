<template>
  <div class="cl-main-promotions-wrap">
    <div class="cl-top">
      <headBack
        :title="$t('homeMenu.Promotions').toUpperCase()"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />
    <promotions />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import promotions from '@/components/components/promotions.vue'
import { casinoMixins } from '@/assets/js/casinoMixins'

export default {
  components: { headBack, promotions },
  mixins: [casinoMixins],
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
.cl-main-promotions-wrap {
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;

  .cl-top {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }
}
</style>
