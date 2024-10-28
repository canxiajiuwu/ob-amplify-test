<template>
  <div class="cl-highlightsBanner-wrap">
    <div v-if="bannerItem && bannerIsShow" class="cl-bannerBox">
      <img
        class="cl-banner"
        :src="bannerItem.image"
        @click="itemClick(bannerItem)"
      />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  name: 'HighlightsBanner',
  inject: ['openGame'],
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
      else this.bannerIsShow = 1
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
      if (item.eventName) Lib.common.event_statistics(item.eventName)
      return Lib.common.openWay(item.open, this)(item)
    },
    // 获取banner数据
    getData() {
      const locale = this.$store.state.root.locale
      const dataSTR = 'homeAllBannerData' + (locale === 'fr' ? 'Fr' : '')
      const data = Lib.store.get(dataSTR)
      if (
        Object.prototype.toString.call(data) === '[object Object]' &&
        Array.isArray(data.highlights_banner)
      ) {
        this.listData = data.highlights_banner
      } else {
        // 获取数据
        this.$axios_api.getBackstageBanner({ type: 1 }).then((res) => {
          if (res.code === 0) {
            Lib.store.set(dataSTR, res.data)
            this.listData = res.data.highlights_banner
            Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-highlightsBanner-wrap {
  .cl-bannerBox {
    .cl-banner {
      width: 100%;
    }
  }
}
</style>
