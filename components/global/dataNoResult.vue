<template>
  <div
    class="cl-dataNoResult-wrap"
    :class="{ 'cl-noResultLiveWrap': where === 'live' }"
  >
    <div class="cl-icon" />

    <div class="cl-word">{{ $t('dataNoResult.inbox') }}</div>
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
.cl-dataNoResult-wrap {
  text-align: center;
  padding: 40rem/36;

  &.cl-noResultLiveWrap {
    opacity: 0.6;

    .cl-word {
      color: #fff;
    }

    .cl-icon {
      .sprite(@menu-5-live, 108rem);
    }
  }

  .cl-icon {
    margin: 0 auto;
    .sprite(@menu-5, 108rem);
  }

  .cl-word {
    font-weight: 400;
    color: #a2a2a7;
  }
}
</style>
