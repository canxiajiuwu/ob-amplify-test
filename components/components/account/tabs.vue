<template>
  <div class="cl-flexcc cl-tabs">
    <div class="cl-flexcc cl-item" v-for="(a, b) in tabsList" :key="b">
      <div
        class="cl-flexcb cl-item"
        :class="{ 'cl-selected': tabsIndex === b }"
      >
        <div class="cl-flexcc cl-tabsWord" @click="tabClick(b)">{{ a }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabsList: {
      type: Array
    }
  },
  data() {
    return {
      tabsIndex: 0
    }
  },
  methods: {
    tabClick(b) {
      if (this.tabsIndex == b) return
      this.tabsIndex = b
      this.$emit('emitTabClick', this.tabsIndex)
    }
  }
}
</script>

<style scoped lang="less">
.cl-tabs {
  background-color: @mainThemeColor;
  box-sizing: border-box;
  height: 33rem/36;
  width: 10rem;

  .cl-item {
    height: 30rem/36;
    color: @tabNoColor;
    font-weight: bold;
    flex: 1;
    flex-direction: column;

    .cl-tabsWord {
      height: 30rem/36;
    }

    &.cl-selected {
      color: #fff;
    }
  }
}
</style>
