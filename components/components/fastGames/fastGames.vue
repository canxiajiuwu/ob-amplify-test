<template>
  <div class="cl-fastGames-wrap">
    <div class="cl-flexcs cl-topBox">
      <div class="cl-flexcc cl-left">
        <div class="cl-hot" />
        <h2 class="cl-h2 cl-name">
          {{
            $store.state.root.locale === 'fr' ? 'Jeux rapides' : 'Fast Games'
          }}
        </h2>
      </div>
    </div>
    <div class="cl-indexCardShadow cl-hiddenBox">
      <gameList event-name="home_top" />
    </div>
  </div>
</template>

<script>
import gameList from './gameList.vue'

export default {
  components: { gameList }
}
</script>

<style scoped lang="less">
.cl-fastGames-wrap {
  background-color: #fff;
  padding: 0 10rem/36 8rem/36;
  height: 132rem/36;
  .cl-topBox {
    height: 30rem/36;
    .cl-left {
      .cl-hot {
        margin-right: 5rem/36;
        .sprite(@ticon-hot, 108rem);
      }
      .cl-name {
        font-size: 11rem/36;
        color: #000;
        font-weight: bold;
      }
    }
  }
  .cl-hiddenBox {
    padding: 17rem/36 0 13rem/36;
    border-radius: 6rem/36;
  }
}
</style>
