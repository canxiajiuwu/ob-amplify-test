<template>
  <div class="cl-aboutUs-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('aboutus.title')"
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
      <div
        class="cl-content"
        v-html="$t('aboutus.content', { mail: $t('mail') })"
      />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'AboutUs',
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
.cl-aboutUs-wrap {
  background-color: #fff;
  min-height: 100vh;
  width: 10rem;
  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }

  .cl-container {
    .cl-content {
      box-sizing: border-box;
      padding: 10rem/36 10rem/36 47rem/36;
      color: #000;
      text-indent: 12rem/36;
      /deep/ p {
        padding-top: 8rem/36;
      }
    }
  }
}
</style>
