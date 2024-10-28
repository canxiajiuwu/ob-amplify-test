<template>
  <div
    class="cl-matchDetailMenu-wrap"
    :class="{ 'cl-matchDetailMenuLive-wrap': where === 'live' }"
  >
    <div class="cl-container">
      <div class="cl-top">
        <client-only>
          <div class="cl-flexcs cl-tabsBox" v-if="meta.market_group">
            <div
              class="cl-flexcc cl-tabsItem"
              ref="tabsItem"
              key="-1"
              :class="{ 'cl-select': chooseId === -1 }"
              v-if="token"
              @click="clickItem({ group_id: -1, group_name: 'Main' })"
            >
              <div>{{ $t('matchDetailMenu.favorite') }}</div>
            </div>
            <div
              class="cl-flexcc cl-tabsItem"
              key="0"
              ref="tabsItem"
              :class="{ 'cl-select': chooseId === 0 }"
              @click="clickItem({ group_id: 0, group_name: 'Main' })"
            >
              <div>{{ $t('matchDetailMenu.All') }}</div>
            </div>
            <div
              class="cl-flexcc cl-tabsItem"
              v-for="(item, index) in meta.market_group"
              ref="tabsItem"
              :key="index + 2"
              :class="{ 'cl-select': chooseId === item.group_id }"
              @click="clickItem(item)"
            >
              <div>{{ item.group_name }}</div>
            </div>
            <div class="cl-topLine" :style="{ left: topLineLeft }" />
          </div>
        </client-only>
      </div>
    </div>

    <div class="cl-flexcc cl-DetailsBar" @click="visibleBar(true)">
      <div class="cl-icon" />
    </div>

    <drawer :visible.sync="barFlag" :width="320 / 36" type="right">
      <matchDetailMenuBar
        :result="result"
        :meta="meta"
        @quickNavigation="quickNavigation"
        @visibleBar="visibleBar"
      />
    </drawer>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import matchDetailMenuBar from '@/components/components/matchDetailMenuBar.vue'

export default {
  components: {
    matchDetailMenuBar
  },
  props: {
    result: {
      type: Array
    },
    meta: {
      type: Object
    },
    chooseId: {
      type: Number
    },
    where: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      barFlag: false,
      topLineLeft: 0
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    }
  },
  watch: {
    chooseId() {
      this.$nextTick(this.ComputedTopLineLeft)
    }
  },
  mounted() {
    this.$nextTick(this.ComputedTopLineLeft)
  },
  methods: {
    clickItem(item) {
      this.$emit('changeMarket', { group_id: item.group_id })
    },
    quickNavigation(e) {
      this.$emit('quickNavigation', e)
    },
    // 打开或关闭侧边栏
    visibleBar: Lib.common.throttle(function (visible) {
      // eslint-disable-next-line no-unused-expressions
      visible ? Lib.common.event_statistics('matchDetail_sidebar_open') : ''
      this.barFlag = visible
    }, 300),
    // 下划线left定位
    ComputedTopLineLeft() {
      const dom = document.querySelector('.cl-select')
      if (dom) {
        this.topLineLeft =
          dom.offsetLeft + (dom.offsetWidth - (33 * rem) / 36) / 2 + 'px'
        dom.scrollIntoView({ block: 'nearest', inline: 'center' })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-matchDetailMenu-wrap {
  position: relative;
  .cl-DetailsBar {
    width: 24/36rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #fff;
    box-shadow: -2/36rem 0 10/36rem rgba(0, 0, 0, 0.1);
    .cl-icon {
      .sprite(@icon-details-bar, 108rem);
    }
  }
  &.cl-matchDetailMenuLive-wrap {
    .cl-container {
      .cl-top {
        background-color: @footLiveBgColor;

        .cl-tabsItem {
          color: @liveNameColor;

          &.cl-select {
            color: @selectAddsColor;
          }
        }

        .cl-topLine {
          background-color: @selectAddsColor;
        }
      }
    }

    .cl-DetailsBar {
      background-color: @footLiveBgColor;
      box-shadow: -2/36rem 0 10/36rem #0f1116;

      .cl-icon {
        .sprite(@icon-live-detail-bar, 108rem);
      }
    }
  }
  .cl-container {
    height: 30rem/36;

    .cl-top {
      background-color: #fff;
      position: relative;
      height: 30rem/36;
      box-sizing: border-box;
      font-size: 11rem/36;
      line-height: 12rem/36;
      overflow-x: scroll;

      .cl-tabsBox {
        width: fit-content;
        flex-wrap: nowrap;
        padding: 0 24rem/36 0 0;
      }

      .cl-tabsItem {
        flex: 1;
        text-align: center;
        font-weight: bold;
        height: 29rem/36;
        white-space: nowrap;
        padding: 0 15rem/36;
        color: @tabNoColor;
        position: relative;
        &.cl-select {
          color: @tabColor;
        }
        .cl-foryouNew {
          .sprite(@tabs-foryou-new, 108rem);
          position: absolute;
          bottom: 11rem/36;
          right: 3rem/36;
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
        transition: left 200ms linear;
      }
    }
  }
}
</style>
