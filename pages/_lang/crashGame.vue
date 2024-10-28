<template>
  <div class="cl-crashGameParent-wrap">
    <!-- 插件有此类名crashGameParent-wrap引用，不要改这个类名crashGameParent-wrap -->
    <client-only>
      <router-view />
    </client-only>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  name: 'CrashGame',
  data() {
    return {
      token: ''
    }
  },
  computed: {
    // token() {
    //   return Lib.store.get('token') ? Lib.common.decrypt(Lib.store.get('token')) : ''
    // },
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    }
  },
  mounted() {
    this.refresh()
    if (this.token) {
      if (!this.info) this.getInfo()
      if (!this.accountInfo) this.userAccountInfo()
    }
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
    // 用户基本信息
    userAccountInfo() {
      this.$axios_api.userAccountInfo({ token: this.token }).then((res) => {
        // 设置用户属性
        if (res.code === 0) this.$store.commit('setAccountInfo', res.data)
      })
    },
    // 重新设置token
    refresh() {
      this.token = Lib.store.get('token')
        ? Lib.common.decrypt(Lib.store.get('token'))
        : ''
    }
  }
}
</script>

<style scoped lang="less">
.cl-crashGameParent-wrap {
  height: 100vh;
  overflow-y: overlay;
  background-color: #fff;
}
</style>
