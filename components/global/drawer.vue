<template>
  <div
    v-if="show ? true : flag"
    v-show="flag"
    :class="['cl-drawer-wrap', 'no-drawer-' + type]"
    :style="{ zIndex: zIndex }"
    @touchmove.self.prevent
    @mousewheel.self.prevent
  >
    <div
      v-if="mask"
      :class="`cl-drawer-mask ${maskClass}`"
      :style="{ backgroundColor: maskbgColor }"
      @click.stop="maskClick ? (closevisibletime ? closevisible() : '') : ''"
      @touchmove.self.prevent
      @mousewheel.self.prevent
    />
    <div
      :class="`cl-drawer-box ${drawerClass}`"
      :style="[
        box.width ? { width: box.width } : '',
        box.height ? { height: box.height } : '',
        { borderRadius: boxborderRadius },
        { backgroundColor: boxbgColor }
      ]"
      @touchmove.self.prevent
      @mousewheel.self.prevent
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawerBox',
  props: {
    // 组件层级
    zIndex: {
      type: [Number, String],
      default: 10
    },
    // dom隐藏是否为v-show
    show: {
      type: Boolean,
      default: false
    },
    // 是否开启点击遮罩层进行关闭
    maskClick: {
      type: Boolean,
      default: true
    },
    // 弹出层背景色
    boxbgColor: {
      type: String,
      default: '#fff'
    },
    // 遮罩层颜色
    maskbgColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.5)'
    },
    // 组件开关
    visible: {
      type: Boolean,
      default: false
    },
    // 是否显示遮罩层(注:取消遮罩层后组件弹出时依然不可点击原遮住的物体)
    mask: {
      type: Boolean,
      default: true
    },
    // 组件弹出方向
    type: {
      type: String,
      validator(value) {
        // The value must match one of these strings
        return ['top', 'bottom', 'left', 'right', 'middle'].includes(value)
      },
      default: 'left'
    },
    // 组件宽度(弹出方向为上下时会被忽略)
    width: {
      type: [Number, String],
      default: 200 / 36
    },
    // 组件高度(弹出方向为左右时会被忽略)
    height: {
      type: [Number, String],
      default: 200 / 36
    },
    // 组件圆角
    borderRadius: {
      type: Number
    }
  },
  data() {
    return {
      // 组件动画
      drawerClass: '',
      // 遮罩层动画
      maskClass: '',
      // 组件实际显示开关
      flag: false,
      // 遮罩层节流
      closevisibletime: false
    }
  },
  computed: {
    // 根据组件的方向自动输出不同方向圆角
    boxborderRadius() {
      if (!this.borderRadius) return
      const borderRadius = {
        top: `0 0 ${this.borderRadius / 36}rem ${this.borderRadius / 36}rem`,
        bottom: `${this.borderRadius / 36}rem ${this.borderRadius / 36}rem 0 0`,
        left: `0 ${this.borderRadius / 36}rem ${this.borderRadius / 36}rem 0`,
        right: `${this.borderRadius / 36}rem 0 0 ${this.borderRadius / 36}rem`,
        middle: `${this.borderRadius / 36}rem`
      }
      return typeof borderRadius[this.type] === 'string'
        ? borderRadius[this.type]
        : undefined
    },

    // type值不同输出不同属性 //传入数值或字符串(字符串主要为使用css计算属性设置)
    box() {
      const returnObj = {
        height: '',
        width: ''
      }
      const heightObj = {
        number: this.height + 'rem',
        string: this.height
      }
      const widthObj = {
        number: this.width + 'rem',
        string: this.width
      }

      if (this.type === 'top' || this.type === 'bottom') {
        returnObj.height = heightObj[typeof this.height]
      }

      if (this.type === 'left' || this.type === 'right') {
        returnObj.width = widthObj[typeof this.width]
      }

      if (this.type === 'middle') {
        returnObj.height = heightObj[typeof this.height]
        returnObj.width = widthObj[typeof this.width]
      }

      return returnObj
    }
  },
  // 监听开关的新值,控制组件的动画
  watch: {
    visible(newValue) {
      if (newValue) {
        this.flag = newValue
        this.drawerClass = `no-drawer${this.type}In`
        this.maskClass = 'cl-drawer-maskOpen'
        setTimeout(() => {
          this.drawerClass = ''
          this.maskClass = ''
          this.closevisibletime = true
        }, 300)
      } else {
        this.closevisibletime = false
        this.drawerClass = `no-drawer${this.type}Out`
        this.maskClass = 'cl-drawer-maskClose'
        setTimeout(() => {
          this.flag = newValue
          this.maskClass = ''
          this.drawerClass = ''
        }, 300)
      }
    }
  },
  methods: {
    closevisible() {
      this.$emit('update:visible', false)
      this.$emit('closevisible')
    }
  }
}
</script>

<style scoped lang="less">
.cl-drawer-wrap {
  display: flex;
  width: 10rem;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: hidden;

  .cl-drawer-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .cl-drawer-maskOpen {
    animation: maskOpen 0.3s;
  }

  .cl-drawer-maskClose {
    animation: maskOpen 0.3s reverse forwards;
  }

  .cl-drawer-box {
    overflow: auto;
    position: relative;
  }

  .no-drawerleftIn {
    animation: drawerLeftIn 0.3s;
  }

  .no-drawerleftOut {
    animation: drawerLeftIn 0.3s reverse forwards;
  }

  .no-drawerrightIn {
    animation: drawerRightIn 0.3s;
  }

  .no-drawerrightOut {
    animation: drawerRightIn 0.3s reverse forwards;
  }

  .no-drawertopIn {
    animation: drawerTopIn 0.3s;
  }

  .no-drawertopOut {
    animation: drawerTopIn 0.3s reverse forwards;
  }

  .no-drawerbottomIn {
    animation: drawerBottomIn 0.3s;
  }

  .no-drawerbottomOut {
    animation: drawerBottomIn 0.3s reverse forwards;
  }

  .no-drawermiddleIn {
    animation: drawerMiddleIn 0.3s;
  }

  .no-drawermiddleOut {
    animation: drawerMiddleIn 0.3s reverse forwards;
  }
}

.no-drawer-top {
  flex-direction: column;
  align-items: center;

  .cl-drawer-box {
    width: 100%;
  }
}

.no-drawer-bottom {
  flex-direction: column-reverse;
  align-items: center;

  .cl-drawer-box {
    width: 100%;
  }
}

.no-drawer-left {
  flex-direction: row;
  align-items: center;

  .cl-drawer-box {
    height: 100%;
  }
}

.no-drawer-right {
  flex-direction: row-reverse;
  align-items: center;

  .cl-drawer-box {
    height: 100%;
  }
}

.no-drawer-middle {
  justify-content: center;
  align-items: center;
}

@keyframes drawerMiddleIn {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes drawerTopIn {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes drawerBottomIn {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes drawerLeftIn {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes drawerRightIn {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes maskOpen {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
