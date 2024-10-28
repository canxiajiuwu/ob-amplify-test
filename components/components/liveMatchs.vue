<template>
  <div class="cl-liveMatchs-wrap cl-bsbb" ref="liveMatchWrapper">
    <div class="cl-cont cl-flexcs" ref="liveMatchCont">
      <div
        ref="contItem"
        class="cl-contItem cl-bsbb cl-flexcc"
        v-for="(item, index) in list"
        :key="index"
        :class="{ 'cl-LiveMatchSelect': listIndex === index }"
        @click="changeMatch(index)"
      >
        {{ item.name }}
      </div>
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

      return width + 3 * contList.length
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
  width: 10rem;
  padding: 10rem/36 0;
  overflow: hidden;

  .cl-cont {
    padding: 0 10rem/36;
    position: relative;
    color: @tabLiveNoColor;
    font-size: 9rem/36;
    flex-wrap: nowrap;

    .cl-contItem {
      flex-shrink: 0;
      height: 23rem/36;
      min-width: 65rem/36;
      padding: 0 11rem/36;
      margin-right: 3rem/36;
      border-radius: 11rem/36;
      background-color: @liveNoOddsColor;

      &.cl-LiveMatchSelect {
        color: @liveNoOddsColor;
        background-color: @oddsColor;
      }
    }

    .cl-contItem:active {
      background-color: @selectActiveColor;
    }
  }
}
</style>
