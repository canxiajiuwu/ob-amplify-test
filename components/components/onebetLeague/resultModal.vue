<template>
  <div class="cl-resultModal-wrap">
    <div class="cl-flexcb cl-tabs">
      <div
        class="cl-a"
        :class="{ 'cl-selectItem': index == 0 }"
        @click="index = 0"
      >
        <h3 class="cl-flexcc cl-h3 cl-name">
          {{ $t('onebetLeague.standing') }}
        </h3>
        <div class="cl-leftLine" />
      </div>
      <div
        class="cl-a"
        :class="{ 'cl-selectItem': index == 1 }"
        @click="index = 1"
      >
        <h3 class="cl-flexcc cl-h3 cl-name">
          {{ $t('onebetLeague.matchDays') }}
        </h3>
        <div class="cl-leftLine" />
      </div>
    </div>
    <div class="cl-contentBox">
      <standing v-if="index == 0" :period-data="periodData" />
      <matchDays v-if="index == 1" :period-data="periodData" />
      <div style="height: 1rem" />
    </div>
  </div>
</template>

<script>
import standing from './standing.vue'
import matchDays from './matchdays.vue'

export default {
  components: { standing, matchDays },
  props: ['periodData'],
  data() {
    return {
      index: 0
    }
  }
}
</script>

<style scoped lang="less">
.cl-resultModal-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  .cl-tabs {
    color: @tabNoColor;
    font-weight: bold;
    .cl-a {
      flex: 1;
      .cl-name {
        height: 27rem/36;
      }
      .cl-leftLine {
        margin: 0 auto;
        height: 3rem/36;
        width: 33rem/36;
        border-radius: 2rem/36;
      }
    }
    .cl-selectItem {
      color: @tabColor;
      .cl-leftLine {
        background-color: @tabColor;
      }
    }
  }
  .cl-contentBox {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
