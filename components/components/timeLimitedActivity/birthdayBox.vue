<template>
  <div
    class="cl-birthdayBox"
    ref="birthdayBox"
    :style="{
      top: (position.y + moveDistance.y) / 36 + 'rem',
      left: (position.x + moveDistance.x) / 36 + 'rem'
    }"
    @touchstart.stop="touchdown"
    @touchmove.stop="touchmove"
    @touchend.stop="end"
    @mousedown.stop="mousedown"
    @mouseup.stop="end"
    @click="birthdayBoxClick(showState)"
  >
    <div class="cl-imgBox">
      <img
        :class="{
          'cl-endReminder': endReminder,
          'cl-jellyStretch': jellyStretch
        }"
        :src="`${STATICURL}/images/timeLimitedActivity/birthdayBox${
          activityInfo.is_join || 0
        }.png`"
        alt="gift icon"
      />
      <div class="cl-timeBox">
        <div class="cl-time">{{ time }}</div>
      </div>
    </div>
    <div v-if="animationing || !cloture" class="cl-tipBox">
      <div
        class="cl-tip"
        :class="animationWord ? 'cl-closeAnimation' : 'cl-openAnimation'"
      >
        <template v-if="showState == 0">
          <div class="cl-df">Draw Free</div>
        </template>
        <template v-if="showState == 1">
          <div>
            <div class="cl-left">already joined</div>
            <div class="cl-bottom">waiting draw</div>
          </div>
        </template>
        <template v-if="showState == 2">
          <div class="cl-left">
            <div>{{ $t('timeLimitedActivity.joined') }}</div>
            <div>{{ $t('timeLimitedActivity.value') }}</div>
          </div>
          <div class="cl-right">
            <div>{{ formatNumber(activityInfo.join_user || 0) }}</div>
            <div>
              {{
                (activityInfo.draw_amount || 0) +
                ' ' +
                (activityInfo.award_type == 6 ? 'Coins' : $t('units'))
              }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  name: 'BirthdayBox',
  props: {
    time: {
      type: String
    },
    activityInfo: {
      type: Object
    },
    endReminder: {
      type: Boolean
    }
  },
  data() {
    return {
      holdDownflag: false, // 按住双倍展示盒
      position: { x: 0, y: 182 }, // 双倍展示盒拖动所需数据
      clickPosition: { x: 0, y: 0 }, // 按住时位置
      moveDistance: { x: 0, y: 0 }, // 单次移动的距离
      clotureObj: {}, // 用户是否点击过
      showState: 2, // tip显示属性
      animationing: 0, // 是否在动画中
      animationingT: null, // 是否在动画中定时器
      animationWord: 0, // 展开与关闭动画,0:展开 1:关闭
      jellyStretch: 0 // 果冻动画
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    isMobile() {
      const test = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
        navigator.userAgent
      )
      return !!test
    },
    cloture() {
      const OObj = this.clotureObj[this.keyID]
      return Number(OObj ? OObj.click[this.showState] : 0) || 0
    },
    keyID() {
      return this.activityInfo ? this.activityInfo.id : 'default'
    }
  },
  watch: {
    // 监听活动信息是否变更
    activityInfo(value) {
      this.watchactivityInfoFn(value)
    },
    // 监听盒子展示状态
    showState(value) {
      this.jellyStretchT && clearTimeout(this.jellyStretchT)
      if (value == 0) this.jellyStretch = 1
      else if (value == 1 && !this.yhShowStateFn()) {
        this.jellyStretch = 1
        this.jellyStretchT = setTimeout(() => {
          this.jellyStretch = 0
          this.jellyStretchT && clearTimeout(this.jellyStretchT)
        }, 10000)
      } else this.jellyStretch = 0
    }
  },
  created() {
    this.createdInit()
  },
  mounted() {
    this.watchactivityInfoFn(this.activityInfo)
  },
  beforeDestroy() {
    // 达成条件且已参加活动,展示过
    if (this.showState == 1) this.yhClickFn(1, 1)
    this.animationingT && clearTimeout(this.animationingT)
  },
  methods: {
    // 监听触发方法
    watchactivityInfoFn(value) {
      this.yhClickFn()
      // 解构前后两次的值
      const { is_join, is_done, id } = value
      let returnNum = 2
      // 已达成条件, 是否参加
      if (is_done) returnNum = is_join ? 1 : 0
      const cf = Number(this.clotureObj[id].click[returnNum])
      // 用户点击过当前状态的活动
      if (cf) {
        this.showState = returnNum
        if (this.animationWord) this.showAnimationFn(1)
      }
      // 没有
      else {
        if (!returnNum && !this.animationWord) {
          this.showState = returnNum
          return
        }
        // 关闭的
        if (this.animationWord) {
          this.showState = returnNum
          this.showAnimationFn(0)
        }
        // 展开的
        else {
          this.showAnimationFn(1)
          setTimeout(() => {
            this.showState = returnNum
            this.showAnimationFn(0)
          }, 450)
        }
      }
    },
    // 活动图标状态记录
    yhShowStateFn() {
      const returnNum = this.clotureObj[this.keyID].jellyStretch
      this.clotureObj[this.keyID].jellyStretch = 1
      Lib.store.set('OB-TLACT', this.clotureObj)
      return returnNum
    },
    // 用户点击了当前活动图标
    yhClickFn(word, noA) {
      const nowTime = new Date().getTime() / 1000
      const OBTLACT = Lib.store.get('OB-TLACT')
      const OBTLACTcopy = {}
      if (Object.prototype.toString.call(OBTLACT) == '[object Object]') {
        for (const i in OBTLACT) {
          const item = OBTLACT[i]
          if (item.end_time >= nowTime) OBTLACTcopy[i] = item
        }
      }
      if (this.activityInfo) {
        const OBj = OBTLACTcopy[this.keyID]
        if (OBj && OBj.click && OBj.click[word]) return
        OBTLACTcopy[this.keyID] = {
          end_time: this.activityInfo.end_time,
          click: { ...(OBj ? OBj.click : {}), [word]: word }
        }
        if (word && !noA) this.showAnimationFn(1)
      }
      this.clotureObj = OBTLACTcopy
      Lib.store.set('OB-TLACT', OBTLACTcopy)
    },
    // 是否动画中定时清除
    caiTimeFn() {
      this.animationingT && clearTimeout(this.animationingT)
      this.animationing = 1
      this.animationingT = setTimeout(() => {
        this.$nextTick(this.end)
        this.animationing = 0
      }, 450)
    },
    // 展开或收起动画 0: 展开, 1:关闭
    showAnimationFn(flag) {
      this.showAnimationT && clearTimeout(this.showAnimationT)
      this.caiTimeFn()
      this.animationWord = flag
    },
    createdInit() {
      const timeLimitedActivityPosition = Lib.store.get(
        'timeLimitedActivityPosition'
      )
      if (timeLimitedActivityPosition) {
        this.position = timeLimitedActivityPosition
      }
    },
    // 按下
    touchdown(e) {
      // 不是移动端或者有动画进行阻止此事件
      if (!this.isMobile) return
      this.holdDownflag = true
      const eventObj = e.changedTouches[0]
      this.clickPosition.x = eventObj.pageX
      this.clickPosition.y = eventObj.pageY
    },
    // 拖动
    touchmove(e) {
      if (this.holdDownflag) {
        e.preventDefault()
        const eventObj = e.changedTouches[0]
        this.moveDistance.x = eventObj.pageX - this.clickPosition.x
        this.moveDistance.y = eventObj.pageY - this.clickPosition.y
      }
    },
    // 松开(共用)
    end() {
      this.holdDownflag = false
      document.onmousemove = null
      const { x, y } = this.moveDistance
      this.position.x += x
      this.position.y += y
      this.moveDistance = { x: 0, y: 0 }
      const { width, height } = window.screen
      this.$nextTick(() => {
        const dom = this.$refs.birthdayBox
        if (!dom) return
        const dheight = height - dom.clientHeight
        const boxWidth = dom.clientWidth
        // 边界判断
        this.position.x =
          width / 2 > this.position.x + boxWidth / 2 ? 0 : width - boxWidth
        if (this.position.y < 0) this.position.y = 0
        else if (this.position.y > dheight) this.position.y = dheight
        // 将位置信息存储到本地，下次来了取出来赋值，那么位置还是那儿
        Lib.store.set('timeLimitedActivityPosition', this.position)
      })
    },
    // pc端,鼠标按下后开启原生拖拽事件(解决滑动过快问题)
    mousedown(e) {
      if (this.isMobile) return
      this.holdDownflag = true
      this.clickPosition.x = e.pageX
      this.clickPosition.y = e.pageY
      document.onmousemove = (e) => {
        if (this.holdDownflag) {
          e.preventDefault()
          this.moveDistance.x = e.pageX - this.clickPosition.x
          this.moveDistance.y = e.pageY - this.clickPosition.y
        }
      }
    },
    formatNumber(num) {
      // 将数字转换为字符串
      const numStr = num.toString()

      // 获取首位数字
      const firstDigit = numStr[0]

      // 计算其他位数展示为0的数量
      const zeroCount = numStr.length - 1

      // 构建展示为0的字符串
      const zeros = zeroCount ? '0'.repeat(zeroCount) + '+' : ''

      // 构建最终格式化后的数字字符串
      const formattedNumber = firstDigit + zeros

      return formattedNumber
    },
    birthdayBoxClick(showState) {
      this.yhClickFn(showState)
      this.$emit('emitBirthdayBoxClick')
    }
  }
}
</script>
<style scoped lang="less">
.cl-birthdayBox {
  position: fixed;
  z-index: 20;
  display: flex;
  align-items: center;
  .cl-imgBox {
    width: 65rem/36;
    height: 65rem/36;
    position: relative;
    z-index: 10;
    .cl-endReminder {
      animation: 1.4s linear infinite endReminderAnimation;
    }
    .cl-jellyStretch {
      animation: jellyStretch 5s ease-in-out infinite;
      transform-origin: bottom center;
    }
    @keyframes endReminderAnimation {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .cl-timeBox {
      width: 65rem/36;
      position: absolute;
      bottom: 8rem/36;
      left: 0;
      display: flex;
      justify-content: center;
      .cl-time {
        padding: 3rem/36 5rem/36;
        background-color: rgba(0, 0, 0, 1);
        border-radius: 6rem/36;
        font-size: 7rem/36;
        font-weight: bold;
        color: #ff3f38;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .cl-tipBox {
    margin-top: 5rem/36;
    margin-left: -22rem/36;
    height: 31rem/36;
    overflow: hidden;
    .cl-tip {
      margin-right: 10rem/36;
      height: 31rem/36;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 7rem/36 5rem/36 7rem/36 18rem/36;
      border-radius: 7rem/36;
      box-sizing: border-box;
      font-size: 8rem/36;
      font-weight: 400;
      display: flex;
      align-items: center;
      transition: transform 0.45s;
      white-space: nowrap;
      .cl-df {
        color: #ff4a40;
        padding: 3rem/36 5rem/36;
        border: 0.5rem/36 solid #ff4a40;
        border-radius: 8rem/36;
      }
      .cl-bottom {
        color: #fdae04;
      }
      .cl-left {
        color: #d2d2d2;
      }
      .cl-right {
        color: #fdae04;
        margin-left: 5rem/36;
      }
    }
    .cl-openAnimation {
      transform: translateX(0);
    }
    .cl-closeAnimation {
      transform: translateX(-100%);
    }
  }
  @keyframes jellyStretch {
    0%,
    80%,
    100% {
      transform: scaleY(1);
    }
    85%,
    95% {
      transform: scaleY(0.9);
    }
    90% {
      transform: scaleY(1.1);
    }
  }
}
</style>
