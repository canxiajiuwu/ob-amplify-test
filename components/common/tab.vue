<template>
  <div class="cl-tabs-wrap">
    <div class="cl-top">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        class="cl-itemBox"
        :class="{ 'cl-itemChoosed': ticket_category === index }"
        ref="tabsItem"
      >
        <div class="cl-flexcc cl-item" @click="changeCategory(index)">
          <h2 class="cl-h2" v-html="item" />
        </div>
      </div>
      <div
        class="cl-topLine"
        :style="{
          left: topLineLeft
            ? topLineLeft + 'px'
            : `calc(${initTopLineLeft}rem/36)`
        }"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabList: {
      type: Array
    },
    initTopLineLeft: {
      type: Number
    }
  },
  data() {
    return {
      ticket_category: 0,
      topLineLeft: 0
    }
  },
  mounted() {
    this.computedTopLineLeft(0)
  },
  methods: {
    // 修改种类
    changeCategory(index) {
      this.ticket_category = index
      this.computedTopLineLeft()
      this.$emit('emitChangeTab', index)
    },
    // 下划线left定位
    computedTopLineLeft(index) {
      this.$nextTick(() => {
        const dom = this.$refs.tabsItem.find((a) =>
          String(a.className).includes('cl-itemChoosed')
        )
        if (dom) {
          const { offsetLeft = 0, offsetWidth = 0 } = dom
          this.topLineLeft = offsetLeft + (offsetWidth - (33 * rem) / 36) / 2
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.cl-tabs-wrap {
  height: 30rem/36;
  background-color: #fff;
  color: #000;

  .cl-top {
    position: relative;
    height: 30rem/36;
    display: flex;
    align-items: center;
    .cl-itemBox {
      flex: 1;
      .cl-item {
        height: 30rem/36;
        text-transform: capitalize;
        font-size: 11rem/36;
        text-align: center;
        color: @tabNoColor;
        font-weight: bold;
      }
    }

    .cl-itemChoosed {
      .cl-item {
        color: @tabColor;
      }
    }

    .cl-topLine {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 33rem/36;
      height: 3rem/36;
      border-radius: 2rem/36;
      background-color: @tabColor;
      transition: left 200ms linear;
    }
  }

  .cl-bottom {
    box-sizing: border-box;
    padding: 5rem/36;

    .cl-item {
      border-radius: 3rem/36;
      width: 65rem/36;
      height: 30rem/36;
      background-color: #e8f0f2;
      text-transform: uppercase;
    }

    .cl-itemChoosed {
      background-color: #fdda06;
    }
  }
}
</style>
