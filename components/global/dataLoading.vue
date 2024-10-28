<template>
  <div class="cl-flexcc cl-dataLoading-wrap">
    <div class="cl-flexcc cl-box">
      <img
        class="cl-img"
        :src="`${STATICURL}/images/onebet/loadingLogo${type}.gif`"
        alt="loading"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['where'],
  computed: {
    type() {
      return this.where === 'live' ? 'Live' : ''
    },
    STATICURL() {
      return process.env.NODE_ENV === 'development' ? '' : process.env.STATICURL
    }
  }
}
</script>

<style scoped lang="less">
.cl-dataLoading-wrap {
  .cl-box {
    text-align: center;
    margin: 1rem auto;
    .cl-img {
      width: 47rem/36;
    }
  }
}
</style>
