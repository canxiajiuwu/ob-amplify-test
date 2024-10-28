<template>
  <div v-if="isFill" style="height: calc(73rem / 36)">
    <div v-if="bannerList.length" class="cl-bsbb cl-banner-wrap">
      <van-swipe
        ref="swiper"
        :show-indicators="false"
        :autoplay="3500"
        @change="(index) => (indicatorIndex = index)"
      >
        <van-swipe-item v-for="(a, b) in bannerList" :key="b">
          <div class="cl-bannerBox cl-flexcc">
            <img :src="a.image" @click="itemClick(a)" alt="home banner" />
          </div>
        </van-swipe-item>
      </van-swipe>

      <!-- 自制轮播图显示点 -->
      <div v-if="bannerList.length > 1" class="cl-flexcc cl-indicatorList">
        <div
          v-for="(a, b) in bannerList"
          :key="b"
          class="cl-indicatorItem"
          :class="{ 'cl-checked': b == indicatorIndex }"
          @click="indexChange(b)"
        />
      </div>
    </div>
    <dataLoading v-else />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  inject: ['openGame'],
  data() {
    return {
      indicatorIndex: 0, // 指示器下标
      listData: [], // banner数据
      isFill: 1 // 初始化高度填充
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
    bannerList() {
      const nowTime = new Date().getTime() / 1000
      return this.listData.filter(
        (item) => this.statusArr(item.user_status) && item.end_time > nowTime
      )
    },
    xfootball_host() {
      return process.env.xFootball_URL_WEB
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    accountInfo() {
      return this.$store.state.accountInfo
    }
  },
  watch: {
    bannerList(val) {
      // 如果banner数据为0, 则v-if为0
      this.isFill = val.length
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 点击指示器
    indexChange(index) {
      // eslint-disable-next-line no-unused-expressions
      this.indicatorIndex == index ? '' : this.$refs.swiper.swipeTo(index)
    },
    // banner点击事件
    itemClick(item) {
      if (item.eventName) Lib.common.event_statistics(item.eventName)
      return Lib.common.openWay(item.open, this)(item)
    },
    // 获取浮窗banner数据
    getData() {
      const locale = this.$store.state.root.locale // 获取语言
      const dataSTR = 'homeAllBannerData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
      let askFlag = 0 // 记录是否更新
      // 查询本地时间, true更新
      if (Lib.common.getBackstageDataIsRefresh(dataSTR, 'inquire')) askFlag = 1
      const data = Lib.store.get(dataSTR) // 获取本地数据
      // 查询本地数据是否完整
      // 完整,优先使用本地数据
      if (
        Object.prototype.toString.call(data) === '[object Object]' &&
        Array.isArray(data.home_banner)
      ) {
        this.listData = data.home_banner
      }
      // 数据被破坏
      else askFlag = 1
      // 可以请求
      if (askFlag) {
        // 1.5秒后请求,不占主业务请求
        setTimeout(() => {
          // 获取数据
          this.$axios_api.getBackstageBanner({ type: 1 }).then((res) => {
            // 成功
            if (res.code === 0) {
              // 存入本地, 修改本地时间, 更新数据
              Lib.store.set(dataSTR, res.data)
              this.listData = res.data.home_banner
              // 弹窗数据
              const arr = res.data.dialog
              // 本地数据
              const storageObjSTR =
                'dialogShowObj' + (locale === 'fr' ? 'Fr' : '')
              let storageObj = Lib.store.get(storageObjSTR)
              if (Array.isArray(arr) && arr.length > 0) {
                // 准备好的重置容器
                const obj = {}
                // 本地数据被破坏(不为对象)
                if (
                  Object.prototype.toString.call(storageObj) !==
                  '[object Object]'
                )
                  storageObj = {}
                arr.forEach((item) => {
                  // 本地有
                  if (storageObj[item.eventName]) {
                    // 有记录的时间并且没有更改过展示频次
                    if (
                      storageObj[item.eventName].time >= 0 &&
                      storageObj[item.eventName].timeInterval ==
                        item.timeInterval
                    )
                      item.time = storageObj[item.eventName].time
                    // 赋值给obj容器
                    obj[item.eventName] = item
                    // 本地没有直接赋值
                  } else obj[item.eventName] = item
                })
                Lib.store.set(storageObjSTR, obj)
              } else Lib.store.set(storageObjSTR, {})

              Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
            }
          })
        }, 1500)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-banner-wrap {
  position: relative;
  overflow-y: hidden;
  width: 10rem;
  padding: 10rem/36 10rem/36 0;
  height: 73rem/36;

  .cl-bannerBox {
    width: 100%;
    height: 63rem/36;
    border-radius: 6rem/36;
    overflow: hidden;
  }

  img {
    width: 338rem/36;
    height: 63rem/36;
    border-radius: 6rem/36;
  }

  .cl-indicatorList {
    position: absolute;
    bottom: 3rem/36;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    .cl-indicatorItem {
      height: 3rem/36;
      width: 16rem/36;
      border-radius: 1.5rem/36;
      box-sizing: border-box;
      margin-right: 7rem/36;
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }

    .cl-indicatorItem:last-child {
      margin-right: 0;
    }

    .cl-checked {
      background-color: @mainThemeColor;
    }
  }
}
</style>
