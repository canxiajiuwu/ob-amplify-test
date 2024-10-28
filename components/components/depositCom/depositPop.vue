<template>
  <div class="cl-depositPop-wrap">
    <drawer
      type="top"
      :mask-click="false"
      :visible="depositComShow"
      :height="`calc(${355 + bcheight}rem/36 + ${safeAreaTop}px)`"
    >
      <headBack
        title="DEPOSIT"
        :left-flag="false"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      >
        <template>
          <div class="cl-rightIcon" @click="depositComTriggle(false)" />
        </template>
      </headBack>
      <depositCom />
    </drawer>
  </div>
</template>

<script>
import depositCom from './depositCom.vue'
import headBack from '@/components/components/headBack.vue'

export default {
  components: { headBack, depositCom },
  computed: {
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    bcheight() {
      const accountInfo = this.$store.state.accountInfo
      return accountInfo && accountInfo.mobile ? 65 : 0
    },
    depositComShow() {
      return this.$store.state.depositComShow
    }
  },
  beforeDestroy() {
    this.depositComTriggle(false)
  },
  methods: {
    depositComTriggle(bool) {
      this.$store.commit('setFepositComShow', bool)
    }
  }
}
</script>

<style scoped lang="less">
.cl-depositPop-wrap {
  .cl-rightIcon {
    margin-right: 10rem/36;
    .sprite(@icon-close-black, 86rem);
  }
}
</style>
