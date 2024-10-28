<template>
  <div v-if="bannerItem && bannerIsShow" class="cl-banner-wrap">
    <div>
      <div style="height: calc(20rem / 36)" />
      <div @click="itemClick(bannerItem)">
        <img class="cl-banner" :src="bannerItem.image" />
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  inject: ['openGame'],
  props: {
    where: {
      type: String
    }
  },
  data() {
    return {
      listData: [], // banner原始数据(未处理)
      bannerIsShow: 0 // banner加载完成后显示
    }
  },
  computed: {
    statusArrData() {
      return [
        1,
        !this.accountInfo,
        !!this.accountInfo,
        !this.accountInfo || !this.accountInfo.first_deposit_activity,
        this.accountInfo ? !this.accountInfo.isComplete : 0,
        this.accountInfo && this.accountInfo.skip_user,
        () => !Lib.common.getMajorEventsIsMore(this)
      ]
    },
    statusArr() {
      return (user_status) => {
        return this.statusArrData[user_status] instanceof Function
          ? this.statusArrData[user_status]()
          : this.statusArrData[user_status]
      }
    },
    // 处理后需要显示的banner
    bannerItem() {
      const nowTime = new Date().getTime() / 1000
      const bannerObj = this.listData.find(
        (item) => this.statusArr(item.user_status) && item.end_time > nowTime
      )
      if (bannerObj)
        Lib.common.loadImage(bannerObj.image, () => (this.bannerIsShow = 1))
      else this.bannerIsShow = 0
      return bannerObj
    },
    accountInfo() {
      return this.$store.state.accountInfo
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // banner点击事件
    itemClick(item) {
      let event_name = item.eventName
      if (event_name) {
        if (this.where === 'register') event_name = 'Register_' + event_name
        if (this.where === 'login') event_name = 'Login_' + event_name
        Lib.common.event_statistics(event_name)
      }
      return Lib.common.openWay(item.open, this)(item)
    },
    // 获取数据
    getData() {
      const locale = this.$store.state.root.locale // 获取语言
      const dataSTR = 'loginBannerData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
      let askFlag = 0 // 记录是否更新
      // 查询本地时间, true更新
      if (Lib.common.getBackstageDataIsRefresh(dataSTR, 'inquire')) askFlag = 1
      const data = Lib.store.get(dataSTR) // 获取本地数据
      // 查询本地数据是否完整
      // 完整,优先使用本地数据
      if (Array.isArray(data) && data.length) this.listData = data
      // 数据被破坏
      else askFlag = 1
      // 可以请求
      if (askFlag) {
        // 1.5秒后请求,不占主业务请求
        setTimeout(() => {
          // 获取数据
          this.$axios_api.getBackstageBanner({ type: 6 }).then((res) => {
            // 成功
            if (res.code === 0 && Array.isArray(res.data.login_banner)) {
              // 存入本地, 修改本地时间, 更新数据
              Lib.store.set(dataSTR, res.data.login_banner)
              Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
              this.listData = res.data.login_banner
            }
          })
        }, 300)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-banner-wrap {
  display: flex;
  justify-content: center;

  .cl-banner {
    width: 300rem/36;
    border-radius: @mainButtonRadius;
  }
}
</style>
