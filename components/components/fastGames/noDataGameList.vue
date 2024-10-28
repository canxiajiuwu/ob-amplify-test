<template>
  <div class="cl-noDataGameList-wrap">
    <div class="cl-flexcc cl-titleBox">
      <div class="cl-line" :style="{ backgroundColor: lineColor || '#e9e9f3' }" />
      <div class="cl-flexcc cl-word">
        <h3 class="cl-h3" :style="{ color: color || '#000' }">
          {{
            $store.state.root.locale === 'fr'
              ? 'Gagnez toutes les quelques minutes'
              : 'Win Every Few Minute'
          }}
        </h3>
        <div class="cl-cashout" />
      </div>
      <div class="cl-line" :style="{ backgroundColor: lineColor || '#e9e9f3' }" />
    </div>
    <div style="height: calc(25rem / 36)" />
    <gameList :event-name="eventName" :bgcolor="bgcolor" />
  </div>
</template>

<script>
import gameList from './gameList.vue'

export default {
  components: { gameList },
  props: ['eventName', 'bgcolor', 'color', 'lineColor']
}
</script>

<style scoped lang="less">
.cl-noDataGameList-wrap {
  width: 10rem;
  .cl-titleBox {
    margin: 0 auto;
    width: 328rem/36;
    .cl-line {
      flex: 1;
      height: 0.5rem/36;
    }
    .cl-word {
      margin: 0 8rem/36 0 13rem/36;
      font-size: 11rem/36;
      font-weight: 400;
      .cl-cashout {
        margin-left: 7rem/36;
        .sprite(@tabs-cashoutblue, 108rem);
      }
    }
  }
}
</style>
