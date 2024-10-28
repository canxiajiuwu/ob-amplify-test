<template>
  <div
    class="cl-circle-main cl-flexcc"
    :class="{ 'cl-showbgcolor': showbgcolor }"
  >
    <div
      class="cl-blackBox"
      :style="[
        { padding: boxPadding / 36 + 'rem' },
        {
          backgroundColor: boxBackgroundColor,
          borderRadius: boxBorderRadius / 36 + 'rem'
        }
      ]"
    >
      <div
        class="cl-circle-main-box"
        :style="[{ width: size / 36 + 'rem', height: size / 36 + 'rem' }]"
      >
        <svg :width="size" :height="size" class="cl-circle">
          <circle
            :r="radius"
            :cx="cx"
            :cy="cy"
            fill="transparent"
            :stroke="strokeColor"
            :stroke-width="strokeWidth"
          />
          <circle
            :r="radius"
            :cx="cx"
            :cy="cy"
            fill="transparent"
            :stroke="color"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="progress"
          />
        </svg>
        <img
          class="cl-logo"
          :style="{ width: imgWidth / 36 + 'rem' }"
          src="@/assets/images/general/notSprites/progress/whiteLoadingLogo.png"
          alt="loading"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 进度条颜色
    strokeColor: {
      type: String,
      default: 'rgba(255,255,255,0.4)'
    },
    // 图片大小
    imgWidth: {
      type: Number,
      default: 35
    },
    // 圆角
    boxBorderRadius: {
      type: Number,
      default: 10
    },
    // 背景颜色
    boxBackgroundColor: {
      type: String,
      default: 'rgba(0,0,0,0.7)'
    },
    // 背景宽
    boxPadding: {
      type: [String, Number],
      default: 18
    },
    // 进度值
    value: {
      type: [String, Number],
      default: 0
    },
    // 尺寸
    size: {
      type: [String, Number],
      default: 100
    },
    // 边框粗细
    strokeWidth: {
      type: [String, Number],
      default: 5
    },
    // 进度条颜色
    color: {
      type: String,
      default: 'rgba(0,0,0,1)'
    },
    // 动画执行时间
    duration: {
      type: [String, Number],
      default: 1000
    }
  },
  data() {
    return {
      now: 0,
      timer: null,
      showbgcolor: true
    }
  },
  computed: {
    percentage() {
      return this.value
    },
    // 圆心x轴坐标
    cx() {
      return this.size / 2
    },
    // 圆心y轴坐标
    cy() {
      return this.size / 2
    },
    // 半径
    radius() {
      return (this.size - this.strokeWidth) / 2
    },
    // 圆周长
    circumference() {
      return 2 * Math.PI * this.radius
    },
    // 进度长度
    progress() {
      return (1 - this.now / 100) * this.circumference
    }
  },
  mounted() {
    this.run()
  },
  beforeDestroy() {
    this.timer = setInterval(() => {
      if (this.now >= 100) return clearInterval(this.timer)
      this.now++
    }, 1)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    run() {
      if (this.value == 0) return
      const t = this.duration / this.value
      this.timer = setInterval(() => {
        if (this.now >= this.value) {
          if (this.showbgcolor) {
            clearInterval(this.timer)
            this.showbgcolor = false
            this.now = 0
            this.run()
          } else return clearInterval(this.timer)
        }
        this.now++
      }, t)
    }
  }
}
</script>

<style scoped lang="less">
.cl-circle-main {
  width: 10rem;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 1000;
  &.cl-showbgcolor {
    background-color: #fff;
  }
}
.cl-circle {
  transform: rotate(-90deg);
}
.cl-circle-main-box {
  position: relative;
  .cl-logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
