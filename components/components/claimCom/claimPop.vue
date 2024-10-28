<template>
  <div class="cl-claimPop-wrap">
    <drawer
      :visible.sync="flag"
      type="middle"
      :width="310 / 36"
      :height="400 / 36"
      :mask-click="false"
      boxbg-color="rgba(0,0,0,0)"
      :z-index="getDynamicStyle"
    >
      <div class="cl-flexcc cl-contentBox">
        <div class="cl-close" @click="close" />
        <claimContent
          :type="type"
          :tips="copyConfigData.tips"
          :card-list="cardList"
          :expire="expire"
          :fn="fn"
        />
      </div>
    </drawer>
  </div>
</template>

<script>
import claimContent from './claimContent.vue'
import Lib from '@/assets/js/Lib'
import {
  getPopupHierarchy,
  removesPopupsBeingDisplayedList
} from '@/assets/js/utils/popupPriority.js'

export default {
  components: { claimContent },
  props: ['configData', 'mtype'],
  data() {
    return {
      copyConfigData: {}, // 复制体
      popType: 'giftCollection',
      type: 'limited', // limited
      cardList: [], // 弹窗渲染数据容器
      flag: false,
      expiretimeDay: '', // 领取后第一张有效期天数
      webClass: '', // 领取后第一张类型
      timer: null, // 定时器容器
      nowTime: parseInt(new Date().getTime() / 1000) // 现在时间
    }
  },
  computed: {
    getDynamicStyle() {
      return getPopupHierarchy({ type: this.popType })
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    // 过期时间
    expire() {
      const { end_time } = this.copyConfigData
      const etime = end_time - this.nowTime
      if (this.type === 'limited' && etime < 0) this.flag = false
      return this.type === 'limited'
        ? this.timefmt(etime < 0 ? 0 : etime)
        : this.expiretimeDay
    },
    fn() {
      return this.type === 'limited' ? this.claimnow : this.usenow
    },
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    }
  },
  mounted() {
    if (!this.configData.id) return
    if (this.mtype !== undefined) this.type = this.mtype
    this.copyConfigData = this.configData
    const { gifts = {}, freeBets = {} } = this.configData
    this.cardList = [
      ...gifts.gifts.map((a) => ({ ...a, webClass: 'Gift' })),
      ...freeBets.free_bets.map((a) => ({ ...a, webClass: 'FreeBet' }))
    ]
    this.expiretimeDay = this.cardList[0].expire
    this.webClass = this.cardList[0].webClass
    this.timeFn()
    this.flag = true
  },
  destroyed() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    usenow() {
      // 路由不区分大小写, 但是大小写不同, 登录态会丢失
      const rname = this.webClass === 'FreeBet' ? 'freeBet' : 'betslip'
      const rpath = this.webClass === 'FreeBet' ? 'freebet' : 'betslip'
      if (this.routeName !== rname)
        this.$router.push({
          path: `/${this.$store.state.root.locale}/` + rpath
        })
      this.flag = false
      this.close()
    },
    claimnow() {
      this.$store.commit('changeLoadingStatus', 1)
      this.$axios_api
        .activeGiftRetrieve({ id: this.copyConfigData.id, token: this.token })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', 0)
          if (res.code === 0) {
            const { name } = this.$route
            Lib.common.event_statistics(
              'Award_Draw_Success_Pop_View',
              `Page_From:${name},Award_Category:${this.webClass}`
            )
            this.$emit('claimed')
            this.flag = false
            setTimeout(() => {
              this.type = ''
              this.flag = true
            }, 350)
          }
        })
    },
    close() {
      this.flag = false
      setTimeout(() => {
        this.$emit('close')
        removesPopupsBeingDisplayedList({ type: this.popType })
      }, 300)
    },
    timeFn() {
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(
        () => (this.nowTime = parseInt(new Date().getTime() / 1000)),
        1000
      )
    },
    timefmt(time) {
      return Lib.common.minuteDetal(time, 'HH:MM:ss')
    }
  }
}
</script>

<style scoped lang="less">
.cl-claimPop-wrap {
  .cl-contentBox {
    position: relative;
    height: 100%;
    .cl-close {
      position: absolute;
      top: 0;
      right: 0;
      .sprite(@icon-x, 88.8rem);
    }
  }
}
</style>
