<template>
  <div class="cl-gameList-wrap">
    <div class="cl-flexcb cl-list">
      <div
        class="cl-flexcc cl-item"
        v-for="(a, b) in list"
        :key="b"
        @click="itemClick(a)"
      >
        <div class="cl-flexcc cl-iconBox" :style="{ backgroundColor: bgcolor }">
          <div class="cl-icon" :class="'no-' + a.icon" />
        </div>
        <div class="cl-name">{{ a.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: ['eventName', 'bgcolor'],
  computed: {
    list() {
      return [
        {
          name: 'Casino',
          icon: 'casino',
          event_name: 'fastGames_casino',
          open_way: 0,
          url: `/${this.$store.state.root.locale}/casino`
        },
        {
          name: 'OneBet Crash',
          icon: 'crash',
          event_name: 'fastGames_crash',
          open_way: 0,
          url: `/${this.$store.state.root.locale}/crashGame`
        },
        {
          name: 'Onebet League',
          icon: 'league',
          event_name: 'fastGames_league',
          open_way: 0,
          url: `/${this.$store.state.root.locale}/onebetLeague`
        },
        {
          name: 'KickersX',
          icon: 'kickersx',
          event_name: 'fastGames_KickersX',
          open_way: 0,
          url: `/${this.$store.state.root.locale}/KickersX`
        }
      ]
    }
  },
  methods: {
    itemClick(a) {
      if (!a) return
      if (a.event_name)
        Lib.common.event_statistics(
          (this.eventName ? this.eventName + '_' : '') + a.event_name
        )
      return Lib.common.openWay(a.open_way, this)({ url: a.url })
    }
  }
}
</script>

<style scoped lang="less">
.cl-gameList-wrap {
  .cl-list {
    width: 100%;
    flex-shrink: 0;
    .cl-item {
      flex: 1;
      flex-direction: column;
      overflow: hidden;
      .cl-iconBox {
        width: 48rem/36;
        height: 48rem/36;
        background-color: #f3f3fa;
        border-radius: 10rem/36;
        margin-bottom: 10rem/36;
        .cl-icon {
          &.no-casino {
            .sprite(@tabs-casino, 108rem);
          }
          &.no-kickersx {
            .sprite(@tabs-kickersx, 108rem);
          }
          &.no-crash {
            .sprite(@tabs-crash, 108rem);
          }
          &.no-league {
            .sprite(@tabs-league, 108rem);
          }
        }
      }
      .cl-name {
        font-size: 10rem/36;
        font-weight: 400;
        color: #a2a2a7;
        white-space: nowrap;
      }
    }
  }
}
</style>
