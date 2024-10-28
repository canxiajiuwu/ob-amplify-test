<template>
  <div class="cl-privacy-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('privacy.title1')"
        :middle-word-style="{
          fontSize: 15 / 36 + 'rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />
    <div class="cl-container">
      <div class="cl-content">
        <div v-for="item in 7" :key="item">
          <h2 class="cl-h2 cl-title">{{ $t(`privacy.title${item}`) }}</h2>
          <div class="cl-art" v-for="a in htmlObj[item]" :key="item + '' + a">
            {{ $t(`privacy.art${a}`) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'Privacy',
  components: { headBack },
  data() {
    return {
      htmlObj: {
        1: [1, 2, 3, 4],
        2: [5],
        3: [6],
        4: [7],
        5: [8],
        6: [9],
        7: [10]
      }
    }
  },
  computed: {
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  }
}
</script>

<style scoped lang="less">
.cl-privacy-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }

  .cl-container {
    .cl-content {
      padding: 10rem/36 10rem/36 47rem/36;

      .cl-title {
        font-size: 14rem/36;
        font-weight: bold;
        padding: 10rem/36 0;
      }

      .cl-art {
        line-height: 16rem/36;
        padding-top: 5rem/36;
      }
    }
  }
}
</style>
