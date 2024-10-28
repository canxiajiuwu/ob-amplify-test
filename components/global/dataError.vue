<template>
  <div
    class="cl-dataError-wrap"
    :class="{ 'cl-dataErrorLiveWrap': where === 'live' }"
  >
    <div class="cl-icon" />

    <div class="cl-word">{{ $t('dataError.loading') }}</div>

    <div class="cl-flexcc cl-button" @click="goFresh">
      <div class="cl-flexcc">{{ $t('dataError.reload') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['where'],
  methods: {
    goFresh() {
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="less">
.cl-dataError-wrap {
  text-align: center;
  padding: 40rem/36;

  &.cl-dataErrorLiveWrap {
    opacity: 0.6;

    .cl-word {
      color: #fff;
    }

    .cl-button {
      color: #fff;

      > div {
        border: 1rem/36 solid #fff;
      }
    }

    .cl-icon {
      .sprite(@menu-reminder-live, 108rem);
    }
  }
  .cl-icon {
    margin: 0 auto;
    .sprite(@menu-reminder, 108rem);
  }

  .cl-word {
    padding-top: 15rem/36;
    color: #404040;
  }

  .cl-button {
    margin-top: 15rem/36;
    color: #394d8b;

    > div {
      border: 1rem/36 solid #394d8b;
      border-radius: @mainButtonRadius;
      width: 96rem/36;
      height: 38rem/36;
    }
  }
}
</style>
