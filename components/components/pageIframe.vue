<template>
  <div class="cl-mygame">
    <loading v-if="isLoadingShow" />
    <iframe
      :src="pageIframeUrl"
      frameborder="0"
      width="100%"
      height="100%"
      @load="load"
    ></iframe>
  </div>
</template>

<script>
import loading from './loading.vue'

export default {
  components: { loading },
  props: {
    pageIframeUrl: {
      type: String
    }
  },
  data() {
    return {
      isLoadingShow: true
    }
  },
  methods: {
    load() {
      this.isLoadingShow = false
    }
  }
}
</script>

<style scoped lang="less">
.cl-mygame {
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 30;
  background-color: #fff;
}
</style>
