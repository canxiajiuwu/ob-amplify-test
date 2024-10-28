<template>
  <div>
    <div v-if="isShow" class="cl-ownDialog-wrap" :style="getDynamicStyle">
      <div>
        <div class="cl-closeBox">
          <div class="cl-close" @click="close" />
        </div>
        <div class="cl-dialogBox">
          <div @click="itemClick(data)">
            <img :src="data.image" />
          </div>
        </div>
      </div>
    </div>
    <sportsPromosModal
      v-if="sportsPromosShow"
      :sports-promos="sportsPromos"
      :style="getDynamicStyle2"
      @closeSportsPromosModal="closeSportsPromosModal"
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import sportsPromosModal from '~/components/components/sportPromos/modal.vue'
import {
  getPopupHierarchy,
  popUpWindowDetection,
  removesPopupsBeingDisplayedList
} from '@/assets/js/utils/popupPriority.js'

export default {
  components: {
    sportsPromosModal
  },
  inject: ['openGame'],
  data() {
    return {
      data: null, // 显示的数据
      dataObj: null, // 本地数据的容器
      isShow: 0, // 图片加载完成后显示
      sportsPromos: null, // sportsPromos数据容器
      sportsPromosShow: 0, // 是否显示sportsPromos弹窗
      popType: 'homePopUp',
      popType2: 'sportsPromos'
    }
  },
  computed: {
    accountInfo() {
      return this.$store.state.accountInfo
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    savingCardCasino() {
      const obj = Lib.store.get('setSavingCardCasino')
      return obj ? obj.casino : null
    },
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
    getDynamicStyle() {
      return {
        'z-index': getPopupHierarchy({ type: this.popType })
      }
    },
    getDynamicStyle2() {
      return {
        'z-index': getPopupHierarchy({ type: this.popType2 })
      }
    },
    routeName() {
      const routeName = this.$route.name?.split('-')
      return routeName[routeName.length - 1]
    },
    isHall() {
      return ['index', 'lang'].includes(this.$route.name)
    }
  },
  watch: {
    $route() {
      // 有数据
      if (this.dataObj) setTimeout(this.showData, 1500)
      else this.isSportsPromosShow()
    }
  },
  mounted() {
    // 获取本地数据
    const storageObjSTR =
      'dialogShowObj' + (this.$store.state.root.locale === 'fr' ? 'Fr' : '')
    const storageObj = Lib.store.get(storageObjSTR)
    if (Object.prototype.toString.call(storageObj) === '[object Object]')
      this.dataObj = storageObj
    else this.getData()
  },
  methods: {
    // 获取首页弹窗数据
    getData() {
      const locale = this.$store.state.root.locale
      setTimeout(() => {
        this.$axios_api.getBackstageBanner({ type: 1 }).then((res) => {
          if (res.code === 0) {
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
                Object.prototype.toString.call(storageObj) !== '[object Object]'
              )
                storageObj = {}
              // eslint-disable-next-line array-callback-return
              arr.map((item) => {
                // 本地有
                if (storageObj[item.eventName]) {
                  // 有记录的时间并且没有更改过展示频次
                  if (
                    storageObj[item.eventName].time >= 0 &&
                    storageObj[item.eventName].timeInterval == item.timeInterval
                  )
                    item.time = storageObj[item.eventName].time
                  // 赋值给obj容器
                  obj[item.eventName] = item
                  // 本地没有直接赋值
                } else obj[item.eventName] = item
              })
              Lib.store.set(storageObjSTR, obj)
            } else Lib.store.set(storageObjSTR, {})
            const dataSTR = 'homeAllBannerData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
            Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
          }
        })
      }, 1500)
    },
    // 点击Dialog事件
    itemClick(item) {
      if (item.eventName) Lib.common.event_statistics(item.eventName)
      this.close()
      return Lib.common.openWay(item.open, this)(item)
    },
    // 关闭
    close() {
      this.data = null
      this.isShow = 0
      removesPopupsBeingDisplayedList({ type: this.popType })
    },
    // 查询并判断显示数据
    showData() {
      const todayTime = new Date().setHours(0, 0, 0, 0)
      const nowTime = new Date().getTime()
      const timestamp = 60 * 60 * 24 * 1000
      const storageObj = this.dataObj
      let obj = null
      // 循环找出第一个当前可显示的数据
      for (const i in storageObj) {
        if (
          this.statusArr(storageObj[i].user_status) &&
          (storageObj[i].time === undefined ||
            (storageObj[i].time != 0 && nowTime - storageObj[i].time >= 0)) &&
          storageObj[i].end_time > nowTime / 1000 &&
          (storageObj[i].page === this.routeName ||
            (storageObj[i].page === '' && this.isHall))
        ) {
          obj = storageObj[i]
          if (
            obj.eventName === 'casino_dialog_saveMoney_click' &&
            this.savingCardCasino &&
            !(
              this.savingCardCasino.cur_expire * 1000 < new Date().getTime() &&
              this.savingCardCasino.card_version_is_open === 1
            )
          ) {
            // 不符合条件的 续期 casino saving card ，弹窗不弹出
            obj = null
          } else if (
            obj.eventName === 'saveMoneyCardDialog' &&
            this.savingCardCasino &&
            !(
              this.savingCardCasino.card_version_is_open === 0 &&
              this.savingCardCasino.cur_expire * 1000 < new Date().getTime()
            )
          ) {
            // 不符合条件的 首期 casino saving card ，弹窗不弹出
            obj = null
          } else {
            break
          }
        }
      }

      if (obj) {
        if (!popUpWindowDetection({ type: this.popType })) return
        // 修改数据时间
        obj.time =
          obj.timeInterval == 0 ? 0 : timestamp * obj.timeInterval + todayTime
        // 本地数据一起修改
        storageObj[obj.eventName] = obj
        // 显示第一条数据
        this.data = obj
        // 加载完再弹出
        Lib.common.loadImage(obj.image, () => {
          // 展示弹窗事件
          if (obj.eventName)
            Lib.common.event_statistics(obj.eventName + '_view')
          this.isShow = 1
        })
        // 修改本地
        const locale = this.$store.state.root.locale
        const storageObjSTR = 'dialogShowObj' + (locale === 'fr' ? 'Fr' : '')
        Lib.store.set(storageObjSTR, storageObj)
      } else this.isSportsPromosShow()
    },
    // 请求数据列表
    promoListReq() {
      if (!this.isHall) return
      this.$axios_api.promoList({ token: this.token }).then((res) => {
        if (res.code === 0 && popUpWindowDetection({ type: this.popType2 })) {
          const date = new Date().getTime()
          this.sportsPromos = res.data.filter(
            (item) =>
              item.content &&
              item.gift &&
              item.expired * 1000 > date &&
              item.status === 0
          )
          if (this.sportsPromos.length) this.sportsPromosShow = 1
          Lib.store.set('sportsPromosDate', new Date().getDate())
        }
      })
    },
    isSportsPromosShow() {
      const date = Lib.store.get('sportsPromosDate')
      new Date().getDate() !== date
        ? this.promoListReq()
        : this.closeSportsPromosModal()
    },
    closeSportsPromosModal() {
      this.sportsPromosShow = 0
      removesPopupsBeingDisplayedList({ type: this.popType2 })
    }
  }
}
</script>

<style scoped lang="less">
.cl-ownDialog-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);

  .cl-closeBox {
    display: flex;
    justify-content: flex-end;

    .cl-close {
      margin-right: 10rem/36;
      .sprite(@icon-x, 108rem);
    }
  }

  .cl-dialogBox {
    margin-top: 20rem/36;
    width: 300rem/36;

    img {
      width: 300rem/36;
      border-radius: 5rem/36;
    }
  }
}
</style>
