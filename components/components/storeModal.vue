<template>
  <div class="cl-storeModal-wrap cl-flexcc" @click.stop="closeModal">
    <div class="cl-contentBox">
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg'],
  computed: {
    STATICURL() {
      return process.env.STATICURL
    }
  },
  mounted() {
    setTimeout(this.closeModal, 5000)
  },
  methods: {
    closeModal() {
      this.$emit('closeStoreModal')
    }
  }
}
</script>

<style scoped lang="less">
.cl-storeModal-wrap {
  position: fixed;
  width: 10rem;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
  margin: 0 auto;

  .cl-contentBox {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 3rem/36;
    padding: 8rem/36 15rem/36;
    color: white;
    font-size: 10rem/36;
    text-transform: capitalize;
  }
}
</style>
