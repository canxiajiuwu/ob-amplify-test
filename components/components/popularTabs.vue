<template>
  <div
    class="cl-liveMatchs-wrap"
    :class="{ 'cl-popular': where === 'popular' }"
    ref="liveMatchWrapper"
  >
    <div class="cl-cont cl-flexcs" ref="liveMatchCont">
      <h2
        ref="contItem"
        class="cl-h2 cl-contItem cl-flexcc"
        v-for="(item, index) in list"
        :key="index"
        :class="{ 'cl-LiveMatchSelect': listIndex === index }"
        @click="changeMatch(index)"
      >
        {{ item.name }}
      </h2>

      <div
        class="cl-topLine"
        ref="LiveMatchTopLine"
        :class="'select' + listIndex"
      />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: ['list', 'listIndex', 'where'],
  data() {
    return {
      scrollDom: null // 滚动对象
    }
  },
  mounted() {
    this.tabsInit()
  },
  methods: {
    // contItem
    contItemWidth() {
      const contList = this.$refs.contItem
      let width = 0
      for (let i = 0; i < contList.length; i++) {
        width += contList[i].offsetWidth
      }

      return width
    },
    // tabs 初始化事件
    tabsInit() {
      const dom = this.$refs.liveMatchCont
      if (!dom) return
      dom.style.width = this.contItemWidth() + 'px' // 修改滚动区域的宽度
      this.$nextTick(() => {
        if (this.$refs.liveMatchWrapper && !this.scrollDom) {
          this.scrollDom = new BScroll(this.$refs.liveMatchWrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        }
      })
      this.scrollFun()
    },
    // 选择matches
    changeMatch(index) {
      this.$emit('changeMatch', index)
      this.scrollFun()
    },
    // 横向滚动处理
    scrollFun() {
      this.$nextTick(() => {
        const selectTabs = window.document.querySelector('.cl-LiveMatchSelect')
        if (selectTabs) {
          // 下滑线处理
          this.$refs.LiveMatchTopLine.style.left =
            selectTabs.offsetLeft +
            (selectTabs.offsetWidth - (33 * rem) / 36) / 2 +
            'px'
          // 选中项滚动居中
          if (selectTabs.offsetLeft > 120) {
            if (this.scrollDom.maxScrollX < -(selectTabs.offsetLeft - 120)) {
              this.scrollDom.scrollTo(-(selectTabs.offsetLeft - 120), 0)
            } else {
              this.scrollDom.scrollTo(this.scrollDom.maxScrollX, 0)
            }
          } else if (selectTabs.offsetLeft <= 120) {
            this.scrollDom.scrollTo(0, 0)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-liveMatchs-wrap {
  height: 30rem/36;
  width: 10rem;
  overflow: hidden;

  &.cl-popular {
    background-color: #fff;

    .cl-cont {
      color: @tabNoColor;

      .cl-contItem {
        &.cl-LiveMatchSelect {
          color: @mainThemeColor;
          animation: clickActive 200ms;
        }

        @keyframes clickActive {
          from {
            background-color: transparent;
          }

          50% {
            background-color: #dcf0f9;
          }

          to {
            background-color: transparent;
          }
        }
      }
    }
  }

  .cl-cont {
    position: relative;
    font-size: 10rem/36;
    font-weight: bold;
    flex-wrap: nowrap;

    .cl-contItem {
      flex-shrink: 0;
      height: 30rem/36;
      box-sizing: border-box;
      padding: 0 15rem/36;
    }

    .cl-topLine {
      position: absolute;
      bottom: 0;
      width: 33rem/36;
      height: 3rem/36;
      background-color: @mainThemeColor;
      border-radius: 2rem/36;
      transition: left 200ms linear;
    }
  }
}
</style>
