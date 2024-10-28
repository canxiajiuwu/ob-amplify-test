<template>
  <div class="cl-cashoutRules-wrap">
    <div class="cl-closeIcon" @click="$emit('visibleRules')" />
    <div class="cl-flexcc cl-titleBox">{{ $t('onebetLeague.rulesT') }}</div>
    <div class="cl-rulesBox">
      <div
        class="cl-item"
        v-for="(item, index) in $t('onebetLeague.rules')"
        :key="index"
        v-html="item"
      />
    </div>
    <div style="height: calc(30rem / 36)" />
  </div>
</template>

<style scoped lang="less">
.cl-cashoutRules-wrap {
  position: relative;
  white-space: normal;
  height: 100%;
  overflow-y: auto;
  padding: 10rem/36;
  font-size: 13rem/36;
  font-weight: 400;
  color: #686868;
  line-height: 15rem/36;

  .cl-closeIcon {
    position: absolute;
    right: 10rem/36;
    top: 10rem/36;
    .sprite(@icon-close-grey, 108rem);
  }

  .cl-titleBox {
    padding: 2rem/36 0 12rem/36;
    color: #000;
    font-weight: bold;
  }
  .cl-rulesBox {
    .cl-item {
      margin-bottom: 15rem/36;
    }
  }
}
</style>
