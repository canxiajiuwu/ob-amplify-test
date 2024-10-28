<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="cl-globalFilter-wrap">
    <div class="cl-flexcb cl-filterBox">
      <div class="cl-flexcc cl-left" @click="visibleFilterBox(true)">
        <div>Filter</div>
        <div class="cl-filterDown" />
      </div>
      <div class="cl-flexcc cl-right">
        <div
          v-if="!(minOdds === 0 && maxOdds === oddsList.length - 1)"
          class="cl-flexcc cl-rightbox"
        >
          <div>{{ oddsList[minOdds] }}</div>
          <div class="cl-middle">~</div>
          <div>{{ oddsList[maxOdds] }}</div>
          <div class="cl-resetIcon" @click.stop="reset('odds')" />
        </div>
        <div v-if="checkLabel !== null" class="cl-flexcc cl-rightbox">
          <div>{{ labelList[checkLabel] }}</div>
          <div class="cl-resetIcon" @click.stop="reset('label')" />
        </div>
      </div>
    </div>

    <drawer type="top" :height="domHeight" :visible.sync="isFilterBoxShow">
      <div v-if="safeAreaTop" :style="{ height: safeAreaTop + 'px' }" />
      <filterBox
        :odds-list="oddsList"
        :label-list="labelList"
        :min-odds.sync="minOdds"
        :max-odds.sync="maxOdds"
        :check-label.sync="checkLabel"
        @visibleFilterBox="visibleFilterBox"
        @valueChange="valueChange"
      />
    </drawer>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import filterBox from '~/components/global/fliterBox.vue'

export default {
  components: { filterBox },
  props: {
    // 倍率
    oddsList: {
      type: Array
    },
    // 类型
    labelList: {
      type: Array
    },
    // 最低赔率
    minOdds: {
      type: Number
    },
    // 最高赔率
    maxOdds: {
      type: Number
    },
    // 选中的标签
    checkLabel: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isFilterBoxShow: false
    }
  },
  computed: {
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    domHeight() {
      return `calc(280rem/36 + ${this.safeAreaTop}px)`
    }
  },
  methods: {
    // 打开或关闭筛选
    visibleFilterBox: Lib.common.throttle(function (flag) {
      Lib.common.event_statistics(
        `hottest_tickets_filter_${flag ? 'show' : 'hidden'}`
      )
      this.isFilterBoxShow = flag
    }, 300),
    // 重置
    reset(type) {
      let data = {}
      if (type === 'odds') {
        data = {
          minOdds: 0,
          maxOdds: this.oddsList.length - 1
        }
      }
      if (type === 'label') data.checkLabel = null
      this.valueChange(data)
    },
    // 更改数据
    valueChange(data) {
      this.$emit('valueChange', data)
    }
  }
}
</script>

<style scoped lang="less">
.cl-globalFilter-wrap {
  .cl-filterBox {
    font-size: 9rem/36;
    font-weight: 400;
    color: #444;
    .cl-left {
      padding: 0 6rem/36;
      height: 23rem/36;
      background-color: #f2f2f4;
      border-radius: 12rem/36;
      margin-left: 10rem/36;

      .cl-filterDown {
        margin-left: 5rem/36;
        .sprite(@ticon-down, 111rem);
      }
    }

    .cl-right {
      .cl-rightbox {
        padding: 0 4rem/36;
        margin-right: 3rem/36;
        height: 23rem/36;
        background-color: #f2f2f4;
        border-radius: 12rem/36;
      }

      .cl-middle {
        margin: 0 2rem/36;
      }

      .cl-resetIcon {
        margin-left: 3rem/36;
        .sprite(@icon-close, 108rem);
      }
    }
  }
}
</style>
