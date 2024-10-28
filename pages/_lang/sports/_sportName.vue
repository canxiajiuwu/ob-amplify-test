<template>
  <div class="cl-soccerCountry-wrap">
    <div
      :style="{
        height: `calc(${isDownloadShow ? 84 : 47}rem/36 + ${safeAreaTop}px)`
      }"
    >
      <commonHeader />
    </div>
    <rowTabs />

    <headBack
      :title="leagueName || sportName || ''"
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }"
      no-safe-area-top
    />
    <nuxt-child :key="sportName" />
    <div style="height: calc(82rem / 36)" />
    <client-only>
      <FooterMenu />
    </client-only>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import Header from '@/components/components/Header.vue'
import rowTabs from '@/components/components/rowTabs.vue'
import FooterMenu from '@/components/components/FooterMenu.vue'
import headBack from '@/components/components/headBack.vue'

export default {
  components: {
    commonHeader: Header,
    rowTabs,
    FooterMenu,
    headBack
  },
  computed: {
    isDownloadShow() {
      return this.$store.state.isDownloadShow
    },
    STATICURL() {
      return process.env.STATICURL
    },
    sportName() {
      return this.$route.params.sportName
    },
    countryName() {
      return this.$route.params.countryName
    },
    leagueName() {
      return this.$route.params.leagueName
    },
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
.cl-soccerCountry-wrap {
  min-height: 100vh;
  background-color: #fff;
}

.cl-backIcon {
  .sprite(@icon-black-long-back, 108rem);
}
</style>
