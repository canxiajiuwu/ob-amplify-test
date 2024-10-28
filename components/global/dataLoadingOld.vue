<template>
  <div
    class="cl-dataLoading-wrap"
    :class="{ 'cl-dataLoadingLiveWrap': where === 'live' }"
  >
    <div class="cl-loading">
      <div class="cl-logo" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['where'],
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    }
  }
}
</script>

<style scoped lang="less">
.cl-dataLoading-wrap {
  .cl-loading {
    text-align: center;
    margin: 1rem auto;

    .cl-logo {
      margin: 0 auto;
      -webkit-animation: logoScale 0.9s ease-in-out 0s infinite;
      -o-animation: logoScale 0.9s ease-in-out 0s infinite;
      animation: logoScale 0.9s ease-in-out 0s infinite;
      .sprite(@menu-loading, 108rem);
    }
  }

  &.cl-dataLoadingLiveWrap {
    .cl-loading {
      .cl-logo {
        .sprite(@menu-loading-live, 108rem);
      }
    }
  }
}

@keyframes logoScale {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
