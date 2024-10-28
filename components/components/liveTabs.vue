<template>
  <div class="cl-liveTabs-wrap">
    <div class="cl-preMatchBox">
      <div class="cl-flexcc cl-top">
        <h2
          class="cl-flexcc cl-h2 cl-tabsItem"
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'cl-select': choosedIndex === index }"
          @click="itemClick(index)"
        >
          {{ item.name }}
        </h2>
        <div
          ref="topLine"
          class="cl-topLine"
          :class="{
            'cl-noTransition': noTransition
          }"
          :style="{ left: topLineLeft(list.length, choosedIndex) }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { contestListRestore } from '@/assets/js/utils/contestListRestore.js'

export default {
  name: '',
  props: {
    live: {
      default: Array
    }
  },
  data() {
    return {
      isLockedTop: true,
      choosedIndex: 0,
      is_upcoming: 0,
      noTransition: false,
      list: [
        {
          name: this.$t('liveTabs.live'),
          id: 0
        },
        {
          name: this.$t('liveTabs.Upcoming'),
          id: 1
        }
      ]
    }
  },
  computed: {
    isDownloadShow() {
      return this.$store.state.isDownloadShow
    }
  },
  mounted() {
    // 滚动吸附初始化
    // this.handleInit()
    // 切换动画
    if (typeof this.$store.state.liveTabsIndex === 'number') {
      this.choosedIndex = this.$store.state.liveTabsIndex
      // 赋值上一次的距离
      this.$refs.topLine.style.left = this.topLineLeft(
        this.list.length,
        this.choosedIndex
      )
      this.$store.commit('setLiveTabsIndex', null)
    }
    contestListRestore.call(this, 'LiveTabs', [], [], null, () => {
      this.noTransition = true
    })
    // tabs 选中状态初始化
    this.tabsChooseInit()
  },
  methods: {
    // 点击选项时滚动到初始吸顶位置
    scrollDeal() {
      const dom = document.querySelector('#app')
      const scrollTop = dom.scrollTop
      if (scrollTop >= this.topHeight) {
        dom.scrollTop = this.topHeight
      }
    },

    // tabs 选中状态初始化
    tabsChooseInit() {
      switch (this.$route.params.sportName) {
        case 'Football':
          this.choosedIndex = 0
          break
        case '1':
          this.choosedIndex = 0
          break
        case 'Upcoming':
          this.choosedIndex = 1
          break
        default:
          this.choosedIndex = 0
      }
      this.itemClick(this.choosedIndex, true)
    },
    // tabs点击事件
    itemClick(index, initBool) {
      if (!initBool) {
        this.$store.commit('setLiveTabsIndex', this.choosedIndex)
        this.noTransition = false
      }
      // tabs选中项
      if (this.choosedIndex === index) initBool = true
      this.choosedIndex = index
      // 设置默认sportId
      let sportId = 0
      this.is_upcoming = 0
      switch (index) {
        case 0:
          sportId = 1
          !initBool &&
            this.$router.push({
              path: `/${this.$store.state.root.locale}/live/Football`
            })
          break
        case 1:
          sportId = 0
          this.is_upcoming = 1
          !initBool &&
            this.$router.push({
              path: `/${this.$store.state.root.locale}/live/Upcoming`
            })
          break
        default:
          sportId = 0
      }
      // this.scrollDeal()
      this.$emit('dataFilter', {
        is_upcoming: this.is_upcoming,
        sportId
      })
    },
    // 下划线left定位
    topLineLeft(len, index) {
      const arr = [0, 1]
      const onelang = 360 / len
      const left = (onelang - 33) / 2
      return (left + arr[index] * onelang) / 36 + 'rem'
    }
  }
}
</script>

<style scoped lang="less">
.cl-liveTabs-wrap {
  .cl-preMatchBox {
    background-color: @footLiveBgColor;
    width: 10rem;
    font-size: 10rem/36;

    .cl-top {
      position: relative;
      box-sizing: border-box;
      font-size: 11rem/36;
      line-height: 12rem/36;

      .cl-tabsItem {
        flex: 1;
        text-align: center;
        font-weight: bold;
        height: 0.83rem;
        color: rgba(255, 255, 255, 0.6);
        padding-top: 10rem/36;
        position: relative;
        &.cl-select {
          color: @tabLiveColor;
        }
      }

      .cl-tabsItem:active {
        background-color: @selectActiveColor;
      }

      .cl-topLine {
        position: absolute;
        bottom: 0;
        width: 33rem/36;
        height: 3rem/36;
        background-color: @tabLiveColor;
        border-radius: 2rem/36;
        transition: left 200ms linear;
        &.cl-noTransition {
          transition: none;
        }
      }
    }

    .cl-upcomingBox {
      padding: 7rem/36 0;
      overflow: hidden;
      touch-action: none;
      box-sizing: border-box;

      .cl-upcomingWrap {
        padding-left: 12rem/36;

        .cl-upcomingItem {
          height: 23rem/36;
          border-radius: 12rem/36;
          background-color: @noChooseButton;
          font-size: 9rem/36;
          color: #333;
          padding: 0 10rem/36;
          margin-right: 3rem/36;
          white-space: nowrap;

          &.cl-select {
            background-color: @chooseButton;
          }
        }
      }
    }
  }
}
</style>
