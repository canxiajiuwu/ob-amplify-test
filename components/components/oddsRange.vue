<template>
  <div class="cl-oddsRange-wrap">
    <div class="cl-progressBox">
      <div class="cl-flexcb cl-titleBox">
        <div class="cl-left">
          {{ $t('betslipPlaceBet.odds') }} {{ $t('accountDeposit.range') }}
        </div>
        <div class="cl-right">
          {{ oddsList[leftXIndex] }} - {{ oddsList[rightXIndex] }}
        </div>
      </div>
      <div style="height: calc(10rem / 36)" />

      <div class="cl-flexcc cl-progress" ref="progress" @click="clickProgress">
        <div
          class="cl-item"
          v-for="(item, index) in oddsList"
          :key="index"
          :style="{
            width: index !== oddsList.length - 1 ? itemWidth + 'rem' : 0
          }"
        />
        <div
          class="cl-actualProgress"
          :style="{ left: leftX / 36 + 'rem', right: rightX / 36 + 'rem' }"
        >
          <div
            class="cl-button cl-button1"
            @mousedown.prevent.stop="mousedown('left')"
            @mouseup.prevent.stop="mouseup('left')"
            @touchstart.prevent.stop="start()"
            @touchmove.prevent.stop="move($event, 'left')"
            @touchend.prevent.stop="end($event, 'left')"
          >
            <div
              class="cl-exhibitionNum"
              :class="{ 'cl-exhibitionLeft': leftXIndex === 0 }"
            >
              {{ oddsList[leftXIndex] }}
            </div>
          </div>
          <div
            class="cl-button cl-button2"
            @mousedown.prevent.stop="mousedown('right')"
            @mouseup.prevent.stop="mouseup('right')"
            @touchstart.prevent.stop="start()"
            @touchmove.prevent.stop="move($event, 'right')"
            @touchend.prevent.stop="end($event, 'right')"
          >
            <div
              class="cl-exhibitionNum"
              :class="{
                'cl-exhibitionRight': oddsList.length - 1 === rightXIndex
              }"
            >
              {{ oddsList[rightXIndex] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  props: {
    // 倍率
    oddsList: {
      type: Array
    },
    // 最小赔率
    minOdds: {
      type: Number
    },
    // 最大赔率
    maxOdds: {
      type: Number
    }
  },
  data() {
    return {
      progressWidth: 330,
      // 移动端判断是否在移动
      touchflag: false,
      // 进度条左边第几格
      leftXIndex: null,
      // 进度条右边第几格
      rightXIndex: null,
      // 判断是否是移动端
      isMobile: null,
      // 判断点击进度条是否执行函数
      isChick: true
    }
  },
  computed: {
    leftX() {
      return this.leftXIndex * this.itemWidth
    },
    rightX() {
      return this.progressWidth - this.rightXIndex * this.itemWidth
    },
    itemWidth() {
      const width = this.progressWidth / (this.oddsList.length - 1)
      return width
    },
    options() {
      const { leftXIndex, rightXIndex } = this
      return { leftXIndex, rightXIndex }
    }
  },
  watch: {
    options: {
      deep: true,
      handler(newVal) {
        this.$emit('progressValEmit', newVal)
      }
    }
  },
  created() {
    // 判断是否是移动端
    this.isMobile = Lib.common.isMobile()
    // 展示接收的传值
    this.leftXIndex = this.minOdds
    this.rightXIndex = this.maxOdds
  },
  mounted() {
    // 获取进度条的最大宽
    this.progressWidth = this.$refs.progress.offsetWidth
  },
  methods: {
    // mousemove事件
    // 鼠标按下后开启原生拖拽事件(解决滑动过快问题)
    mousedown(direction) {
      this.isChick = false
      const length = this.oddsList.length - 1
      document.onmousemove = (e) => {
        const coordinate =
          e.clientX - this.$refs.progress.getBoundingClientRect().x
        // 阻止超出进度条范围
        if (coordinate >= this.progressWidth || coordinate < 0) return
        const index = this.buttonIndex(coordinate)
        const obj = {
          left: this.leftXIndex,
          right: this.rightXIndex,
          length,
          index,
          direction
        }
        this.slidingCondition(obj)
      }
    },
    // 松开鼠标
    mouseup(direction) {
      this.isChick = true
      document.onmousemove = null
      const left = this.leftXIndex
      const right = this.rightXIndex
      const length = this.oddsList.length - 1
      if (direction === 'left') {
        if (left >= length) this.leftXIndex = length - 1
        if (left < 0) this.leftXIndex = 0
        if (left >= right) this.leftXIndex = right - 1
      }
      if (direction === 'right') {
        if (right > length) this.rightXIndex = length
        if (right <= 0) this.rightXIndex = 1
        if (right < left) this.rightXIndex = left + 1
      }
    },
    // 点击了进度条
    clickProgress(e) {
      // 正在进行mouse事件,阻止点击
      if (!this.isChick) return
      const left = this.leftXIndex
      const right = this.rightXIndex
      const length = this.oddsList.length - 1
      let index = null
      if (this.isMobile) {
        const coordinate = e.clientX - 15
        index = this.buttonIndex(coordinate)
      }

      if (!this.isMobile) {
        const x = this.$refs.progress.getBoundingClientRect().x
        const coordinate = e.clientX - x
        index = this.buttonIndex(coordinate)
      }
      if (index < 0 || index > length) return
      const leftnum = Math.abs(left - index)
      const rightnum = Math.abs(right - index)
      if (leftnum > rightnum) this.rightXIndex = index
      if (leftnum <= rightnum) this.leftXIndex = index
    },
    // touch事件
    // 滑动按下立即触发事件
    start() {
      // 不是移动端阻止此事件
      if (!this.isMobile) return
      this.touchflag = true
    },
    // 滑动持续触发事件
    move(e, direction) {
      if (this.touchflag) {
        // 阻止超出进度条范围
        if (
          e.touches[0].clientX >= this.progressWidth ||
          e.touches[0].clientX < 0
        )
          return
        const left = this.leftXIndex
        const right = this.rightXIndex
        const index = this.buttonIndex(e.touches[0].clientX)
        const length = this.oddsList.length - 1
        const obj = {
          left,
          right,
          length,
          index,
          direction
        }
        this.slidingCondition(obj)
        // eslint-disable-next-line no-useless-return
      } else return
    },
    // 滑动结束触发事件
    end() {
      this.touchflag = false
    },
    // 判断按钮该在第几格
    buttonIndex(length) {
      Lib.common.event_statistics(`hottest_tickets_filter_odds_range`)
      const num1 = length / this.itemWidth
      let num2 = Math.floor(num1)
      const decimal = num1 % 1
      // eslint-disable-next-line no-unused-expressions
      decimal >= 0.5 ? num2++ : ''
      return num2
    },
    // 根据判断的条件,当前按钮进行移动
    slidingCondition({ left, index, right, direction, length }) {
      if (direction === 'left') {
        if (
          (right >= length && left >= length - 1 && index >= length) ||
          index >= length
        )
          return
        if (right < length && left + 1 === right) {
          if (left > index) {
            this.leftXIndex = index
            return
          }
          this.rightXIndex = index + 1
          this.leftXIndex = index
          return
        }
        this.leftXIndex = index
      }
      if (direction === 'right') {
        if ((left <= 0 && right <= 1 && index <= 0) || index <= 0) return
        if (left > 0 && right - 1 === left) {
          if (right < index) {
            this.rightXIndex = index
            return
          }
          this.leftXIndex = index - 1
          this.rightXIndex = index
          return
        }
        this.rightXIndex = index
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-oddsRange-wrap {
  .cl-progressBox {
    margin: 0 15rem/36;
    .cl-titleBox {
      color: #000;
      font-size: 11rem/36;
      font-weight: bold;

      .cl-left {
        margin-left: -5rem/36;
      }

      .cl-right {
        margin-right: -8rem/36;
      }
    }
    .cl-progress {
      height: 8rem/36;
      border-radius: 3rem/36;
      background-color: #e9e9f5;
      position: relative;
      // oddsList 的样式
      .cl-item {
        height: 8rem/36;
      }
      //
      .cl-actualProgress {
        z-index: 1;
        position: absolute;
        height: 8rem/36;
        background: linear-gradient(90deg, #3bf0f5 0%, @mainThemeColor 100%);
      }
      .cl-button {
        box-sizing: border-box;
        position: absolute;
        width: 16rem/36;
        height: 16rem/36;
        background-color: #fff;
        border-radius: 50%;
        border: 4rem/36 solid @mainThemeColor;
        top: 50%;
        .cl-exhibitionNum {
          position: absolute;
          left: 50%;
          top: 18rem/36;
          z-index: 3;
          color: @mainThemeColor;
          font-size: 10rem/36;
          font-weight: bold;
          transform: translate(-50%, 0);
        }
      }

      .cl-button1 {
        left: 0;
        transform: translate(-50%, -50%);
        z-index: 3;
        border: 4rem/36 solid #3bf0f5;

        .cl-exhibitionNum {
          color: #3bf0f5;
        }

        .cl-exhibitionLeft {
          left: 80%;
        }
      }

      .cl-button2 {
        right: 0;
        transform: translate(50%, -50%);
        z-index: 3;

        .cl-exhibitionRight {
          left: 0%;
        }
      }
    }
  }
}
</style>
