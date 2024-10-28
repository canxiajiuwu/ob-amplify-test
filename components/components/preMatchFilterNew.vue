<template>
  <div class="cl-preMatchFilterNew-wrap">
    <div class="cl-preMatchBox">
      <div class="cl-flexcb cl-top">
        <h3
          v-for="(item, index) in tabs"
          ref="tabsItem"
          :key="index"
          class="cl-flexcc cl-h3 cl-tabsItem"
          :class="{ 'cl-select': tabsIndex === item.id }"
          @click="changeTabs(item.id)"
        >
          {{ item.name }}
          <div v-if="item.id === 3" class="cl-foryouNew" />
        </h3>

        <div
          class="cl-topLine"
          :class="{
            'cl-noTransition': noTransition
          }"
          :style="{
            left: topLineLeft
              ? topLineLeft + 'px'
              : `calc(${locale === 'en' ? 42 : 42.5}rem/36)`
          }"
        />
      </div>

      <div v-if="isUpcomingShow" class="cl-upcomingBoxContent">
        <div v-show="tabsIndex === 1" ref="upcomingBox" class="cl-upcomingBox">
          <div ref="upcomingWrap" class="cl-flexcs cl-upcomingWrap">
            <div
              v-for="(item, index) in $t('preMatchFilter.upcoming')"
              :key="index"
              class="cl-flexcc cl-upcomingItem"
              :class="{ 'cl-select': upcomingIndex === index }"
              @click="changeUpcoming(index)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Lib from '@/assets/js/Lib'
import { contestListRestore } from '@/assets/js/utils/contestListRestore.js'

export default {
  data() {
    return {
      tabsIndex: 0,
      upcomingIndex: 0,
      ownUpComingIndex: 0,
      isUpcomingShow: true,
      topLineLeft: 0,
      noTransition: false // 不需要动画
    }
  },
  computed: {
    emitFunThrottle() {
      return Lib.common.throttle(this.emitFun, 300)
    },
    tabs() {
      let arr = this.$t('preMatchFilter.tabs')
      if (this.country === 'ug') arr = arr.filter((item) => item.id !== 3)
      return arr
    },
    mode() {
      return this.$route.query.mode
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    this.isUpcomingShow = true
    this.tabsInit()
    if (this.mode === 'foryou') {
      this.changeTabs(3)
      this.$emit('foryouSticky')
    }
    contestListRestore.call(
      this,
      'tab',
      ['tabsIndex', 'upcomingIndex'],
      [],
      null,
      () => {
        this.noTransition = true
        this.ComputedTopLineLeft(true)
      }
    )
  },
  beforeDestroy() {
    this.isUpcomingShow = false
    this.leavePage()
  },
  methods: {
    // 修改top tabs
    changeTabs(index) {
      this.noTransition = false
      const eventObj = {
        0: 'toady',
        1: 'upcoming',
        2: 'countries',
        3: 'ForYou'
      }
      if (eventObj[index])
        Lib.common.event_statistics(`home_match_tabs_${eventObj[index]}_click`)
      this.tabsIndex = index
      if (index === 1) this.upcomingIndex = this.ownUpComingIndex
      else this.upcomingIndex = 0
      this.emitFunThrottle()
      this.ComputedTopLineLeft()
    },
    // 修改upcoming
    changeUpcoming(index) {
      this.upcomingIndex = index
      this.ownUpComingIndex = index
      this.emitFunThrottle()
    },
    // emit 事件
    emitFun() {
      this.$emit('dataFilter', {
        tabsIndex: this.tabsIndex,
        upcomingIndex: this.upcomingIndex
      })
    },
    // tabs 初始化事件
    tabsInit() {
      this.$nextTick(() => {
        const width = (this.locale === 'en' ? 360 : 450) / 36 // 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
        const dom = this.$refs.upcomingWrap
        dom.style.width = width + 'rem' // 修改滚动区域的宽度
        // eslint-disable-next-line no-new
        new BScroll(this.$refs.upcomingBox, {
          startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
          click: true,
          scrollX: true,
          scrollY: false,
          swipeTime: 1000, // 设置 momentum 动画的动画时长
          deceleration: 0.001, // 表示 momentum 动画的减速度
          eventPassthrough: 'vertical'
        })
      })
    },
    // 离开当前页面统计事件
    leavePage() {
      const eventObj = {
        0: 'Toady',
        1: 'Upcoming',
        2: 'Countries',
        3: 'ForYou'
      }
      const eventName = eventObj[this.tabsIndex]
      if (eventName)
        Lib.common.event_statistics('Home_Leave_Match_Tabs_Items', eventName)
    },
    // 下划线left定位
    ComputedTopLineLeft() {
      this.$nextTick(() => {
        const dom = this.$refs.tabsItem.find((a) =>
          String(a.className).includes('cl-select')
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
.cl-preMatchFilterNew-wrap {
  .cl-preMatchBox {
    background-color: #fff;
    width: 10rem;
    font-size: 10rem/36;

    .cl-top {
      position: relative;
      height: 30rem/36;
      box-sizing: border-box;
      font-size: 11rem/36;
      line-height: 12rem/36;
      padding: 0 10rem/36;

      .cl-tabsItem {
        //flex: 1;
        white-space: nowrap;
        text-align: center;
        font-weight: bold;
        height: 29rem/36;
        color: @tabNoColor;
        position: relative;
        &.cl-select {
          color: @tabColor;
        }
        .cl-foryouNew {
          .sprite(@tabs-foryou-new, 108rem);
          position: absolute;
          bottom: 11rem/36;
          right: -20rem/36;
          animation: shake 2s ease-in-out infinite;
        }
        @keyframes shake {
          5%,
          15%,
          25% {
            transform: skewY(5deg);
          }
          10%,
          20% {
            transform: skewY(-5deg);
          }

          28%,
          100% {
            transform: skewY(0);
          }
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
        transition: left 0.2s linear;
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
