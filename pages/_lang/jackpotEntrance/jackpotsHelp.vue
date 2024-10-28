<template>
  <div class="cl-jackpotsHelp-wrap">
    <div
      class="cl-flexcc cl-helpTabs"
      :style="{ top: `calc(84rem/36 + ${safeAreaTop}px)` }"
      key="jackpotsHelp"
    >
      <h2
        v-for="(item, index) in $t('jackpots.helpTab')"
        class="cl-flexcc cl-h2 cl-tabsItem"
        :class="{ 'cl-select': tabsIndex === index }"
        @click="changeTabs(index)"
        :key="index"
      >
        {{ item }}
      </h2>

      <div class="cl-topLine" :style="{ left: topLineLeft(tabsIndex) }" />
    </div>
    <div
      class="cl-content"
      :style="{ top: `calc(114rem/36 + ${safeAreaTop}px)` }"
    >
      <div
        class="cl-content_list"
        v-for="(item, index) in showList"
        :key="index"
      >
        <h3 class="cl-h3 cl-content_title">{{ item.title }}</h3>
        <div class="cl-content_text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JackpotsHelp',
  data() {
    return {
      tabsIndex: 0
    }
  },
  computed: {
    showList() {
      return this.tabsIndex
        ? this.$t('jackpots.helpDaily')
        : this.$t('jackpots.helpGrand')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  methods: {
    // 修改top tabs
    changeTabs(index) {
      this.tabsIndex = index
    },
    // 下划线left定位
    topLineLeft(index) {
      return (index * 180 + 73.5) / 36 + 'rem'
    }
  }
}
</script>

<style scoped lang="less">
.cl-jackpotsHelp-wrap {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 60.5rem/36;

  .cl-helpTabs {
    position: fixed;
    width: 10rem;
    height: 30rem/36;
    background-color: #fff;
    z-index: 11;
    box-sizing: border-box;
    font-size: 11rem/36;
    line-height: 12rem/36;

    .cl-tabsItem {
      flex: 1;
      text-align: center;
      font-weight: bold;
      height: 30rem/36;
      color: @tabNoColor;
      position: relative;
      &.cl-select {
        color: @tabColor;
      }
    }

    .cl-tabsItem:active {
      background-color: #dcf0f9;
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

  .cl-content {
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    width: 10rem;
    padding: 0 10rem/36 236rem/108;
    background-color: #fff;
    overflow: auto;
    .cl-content_title {
      padding: 50rem/108 0 30rem/108;
      font-size: 34rem/108;
      font-weight: 800;
    }
    .cl-content_text {
      font-size: 30rem/108;
      line-height: 44rem/108;
      color: 363636;
      white-space: pre-line;
    }
  }
}
</style>
