<template>
  <div class="cl-coinsSpin-wrap">
    <div class="cl-topBox">
      <headBack
        :left-flag="false"
        bgcolor="#fff"
        title="CoinSpin"
        :middle-word-style="{
          fontSize: 15 / 36 + 'rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#000'
        }"
      >
        <template #left>
          <div class="cl-backIcon" @click="goBack" />
        </template>
        <template>
          <div class="cl-infoCoins">
            {{ $t('accountBack.coins') }}
            <span class="cl-coins">{{ info ? info.coins : 0 }}</span>
          </div>
        </template>
      </headBack>
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />
    <coinsSpin />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import coinsSpin from '@/components/components/coinsSpin.vue'
export default {
  name: 'CoinsSpinWrap',
  components: { headBack, coinsSpin },
  computed: {
    // 用户信息
    info() {
      return this.$store.state.info
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    }
  }
}
</script>

<style scoped lang="less">
.cl-coinsSpin-wrap {
  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
    .cl-backIcon {
      .sprite(@icon-black-long-back, 108rem);
    }
  }
  .cl-infoCoins {
    margin-right: 12rem/36;
    font-size: 11rem/36;
    color: #010101;

    .cl-coins {
      font-weight: bold;
    }
  }
}
</style>
