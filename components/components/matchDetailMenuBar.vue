<template>
  <div class="cl-bar-wrap" @touchmove.stop @mousewheel.stop>
    <div class="cl-bar" @click.stop>
      <div
        class="cl-flexcb cl-barHead"
        :style="{ paddingTop: safeAreaTop + 'px' }"
      >
        <div class="cl-barTitle">{{ $t('matchDetailInbox.markets') }}</div>
        <div class="cl-closeBarIcon" @click="visibleBar" />
      </div>

      <div
        class="cl-content"
        :style="{ top: `calc(35rem/36 + ${safeAreaTop}px)` }"
      >
        <div
          style="display: flex"
          v-for="(item, index) in totalList"
          :key="index"
        >
          <div
            class="cl-flexcb"
            style="width: 100%"
            v-if="item.children.length"
          >
            <div
              class="cl-colorList"
              :style="{ backgroundColor: colorList[index] }"
            />
            <div class="cl-List">
              <div class="cl-ListWidth">
                <div class="cl-group_name">{{ item.group_name }}</div>
                <div class="cl-groupBox">
                  <div
                    class="cl-flexcc"
                    :class="a.market_id ? 'cl-a' : 'cl-b'"
                    v-for="(a, b) in item.children"
                    :key="b"
                    @click="quickNavigation(a.market_group, a.market_id)"
                  >
                    <div class="cl-market_name">{{ a.market_name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: {
    result: {
      type: Array
    },
    meta: {
      type: Object
    }
  },
  data() {
    return {
      colorList: [
        '#91DE8A',
        '#FEC04A',
        '#C586E8',
        '#6CE3E4',
        '#FD8E5F',
        '#8C6FF2'
      ]
    }
  },
  computed: {
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    // 重组总数据结构
    totalList() {
      return this.meta.market_group.map((item) => {
        item.children = []
        this.result.forEach((a) => {
          const { market_group, market_id, market_name } = a[0] || {}
          const ig = item.group_id
          if (
            typeof market_group === 'number'
              ? market_group == ig
              : market_group.includes(ig)
          ) {
            item.children.push({ market_group: ig, market_id, market_name })
          }
        })
        if (item.children.length % 3 === 2) item.children.push({})
        return item
      })
    }
  },
  methods: {
    // 点击快速导航
    quickNavigation: Lib.common.throttle(function (group_id, market_id) {
      if (group_id === undefined || market_id === undefined) return
      Lib.common.event_statistics('matchDetail_sidebar_select_market')
      this.visibleBar()
      this.$emit('quickNavigation', { group_id, market_id })
    }, 300),
    visibleBar() {
      this.$emit('visibleBar', false)
    }
  }
}
</script>

<style scoped lang="less">
.cl-bar-wrap {
  .cl-bar {
    color: #000;
    width: 320/36rem;
    .cl-barHead {
      height: 35/36rem;
      width: 320/36rem;
      box-shadow: 0 1/36rem 7/36rem rgba(0, 0, 0, 0.24);
      .cl-barTitle {
        font-weight: bold;
        font-size: 15/36rem;
        margin-left: 10/36rem;
      }
      .cl-closeBarIcon {
        margin-right: 10/36rem;
        .sprite(@icon-close, 1080/19rem);
      }
    }
    .cl-content {
      position: absolute;
      top: 35rem/36;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;

      > div:last-child {
        .cl-List {
          padding-bottom: 50rem/36;
        }
      }
      .cl-colorList {
        display: flex;
        width: 4/36rem;
        height: 100%;
      }
      .cl-List {
        flex: 1;
        .cl-ListWidth {
          margin-left: 5/36rem;
          margin-right: 10/36rem;
          .cl-group_name {
            margin-top: 13/36rem;
            margin-bottom: 7/36rem;
            font-weight: bold;
            font-size: 11/36rem;
          }
          .cl-groupBox {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .cl-a {
              width: 96/36rem;
              height: 53/36rem;
              margin-bottom: 7/36rem;
              border-radius: 3/36rem;
              background-color: #f2f2f4;
            }
            .cl-b {
              width: 96/36rem;
              height: 53/36rem;
            }
            .cl-market_name {
              font-size: 11/36rem;
              line-height: 13/36rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              text-align: center;
            }
          }
          .cl-groupBox:last-child {
            padding-bottom: 20rem/36;
          }
        }
      }
    }
  }
}
</style>
