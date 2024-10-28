<template>
  <div class="cl-tac-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('terms.title')"
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
    <div class="cl-container">
      <div class="cl-content" v-html="$t('terms.content')" />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'TermsAndConditions',
  components: { headBack },
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
.cl-tac-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }

  .cl-container {
    .cl-content {
      background-color: #fff;
      color: #000;
      padding: 10rem/36 10rem/36 47rem/36;
    }
  }
}
</style>
