<template>
  <div ref="wrap" class="cl-accountMybet-wrap">
    <headBack
      :left-flag="false"
      :title="$t('footerMenu.mybets')"
      :bgcolor="mainStyle.mainThemeColor"
      color="#fff"
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }"
    />
    <accountMybetBox />
    <div style="height: calc(82rem / 36)" />
    <div v-if="isNewApp" class="cl-appShadowBox" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import accountMybetBox from '@/components/components/accountMybetBox.vue'
import { casinoMixins } from '@/assets/js/casinoMixins'

export default {
  name: 'Mybet',
  components: {
    headBack,
    accountMybetBox
  },
  mixins: [casinoMixins],
  computed: {
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    info() {
      return this.$store.state.info
    },
    winApp() {
      return window.appInteraction
    },
    isNewApp() {
      return Lib.store.get('isNewApp')
    }
  },
  mounted() {
    // 更新数据
    if (this.token) this.getInfo()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) this.$store.commit('setInfo', res.data)
      })
    },
    // 用户账户数据
    userAccountInfo() {
      this.$axios_api.userAccountInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) this.$store.commit('setAccountInfo', res.data)
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountMybet-wrap {
  position: relative;
  background-color: #fff;
  width: 10rem;
  min-height: 100vh;

  .cl-appShadowBox {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4rem/36;
    box-shadow: inset 0 -2rem/36 2rem/36 rgba(0, 0, 0, 0.2);
    z-index: 0;
  }
}
</style>
