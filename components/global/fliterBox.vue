<template>
  <div class="cl-globalFilter-wrap">
    <div style="height: calc(5rem / 36)" />
    <div class="cl-flexcb cl-filterBox" @click="visibleFilterBox(false)">
      <div class="cl-flexcc cl-left">
        <div>Filter</div>
        <div class="cl-filterDown" />
      </div>
      <div class="cl-flexcc cl-right">
        <div
          v-if="!(leftXIndex === 0 && rightXIndex === oddsList.length - 1)"
          class="cl-flexcc cl-rightbox"
        >
          <div>{{ oddsList[leftXIndex] }}</div>
          <div class="cl-middle">~</div>
          <div>{{ oddsList[rightXIndex] }}</div>
          <div class="cl-resetIcon" @click.stop="reset('odds')" />
        </div>
        <div v-if="checkedLabel !== null" class="cl-flexcc cl-rightbox">
          <div>{{ labelList[checkedLabel] }}</div>
          <div class="cl-resetIcon" @click.stop="reset('label')" />
        </div>
      </div>
    </div>
    <div style="height: calc(20rem / 36)" />
    <oddsRange
      :odds-list="oddsList"
      :min-odds="minOdds"
      :max-odds="maxOdds"
      @progressValEmit="progressValEmit"
    />
    <div style="height: calc(30rem / 36)" />
    <div class="cl-flexcc cl-bottom">
      <div class="cl-bottomWidth">
        <div class="cl-labelListType">{{ $t('hottestTickets.type') }}</div>
        <div style="height: calc(3rem / 36)" />
        <div class="cl-labelList">
          <div
            v-for="(item, index) in labelList"
            :key="index"
            class="cl-flexcc cl-item"
            :class="[
              'cl-marginr',
              checkedLabel === index ? 'cl-checked' : 'cl-uncheck'
            ]"
            @click="changeCheckedLabel(index)"
          >
            {{ UpperCase(item) }}
          </div>
        </div>

        <div style="height: calc(27rem / 36)" />
        <div class="cl-flexcb cl-bottonList">
          <div class="cl-flexcc cl-box cl-tcButton cl-clear" @click="clearAll">
            {{ $t('accountDeposit.clear') }}
          </div>
          <div
            class="cl-flexcc cl-box cl-lkButton cl-apply"
            @click="
              confirm({
                minOdds: leftXIndex,
                maxOdds: rightXIndex,
                checkLabel: checkedLabel
              })
            "
          >
            {{ $t('accountDeposit.apply') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import oddsRange from '@/components/components/oddsRange.vue'

export default {
  components: { oddsRange },
  props: {
    // 倍率
    oddsList: {
      type: Array
    },
    // 类型
    labelList: {
      type: Array
    },
    // 最小赔率
    minOdds: {
      type: Number
    },
    // 最大赔率
    maxOdds: {
      type: Number
    },
    // 选中的标签
    checkLabel: {
      type: Number
    }
  },
  data() {
    return {
      progressWidth: 330,
      // 移动端判断是否在移动
      touchflag: false,
      // 进度条左边第几格
      leftXIndex: null,
      // 进度条右边第几格
      rightXIndex: null,
      // 判断是否是移动端
      isMobile: null,
      // 判断点击进度条是否执行函数
      isChick: true,
      // 选中的标签
      checkedLabel: null
    }
  },
  created() {
    this.checkedLabel = this.checkLabel
  },
  methods: {
    // 打开或关闭筛选
    visibleFilterBox(flag) {
      this.$emit('visibleFilterBox', flag)
    },
    // 切换类型
    changeCheckedLabel(index) {
      Lib.common.event_statistics(`hottest_tickets_filter_label_click`)
      this.checkedLabel = this.checkedLabel === index ? null : index
    },
    // 重置
    reset(type) {
      if (type === 'odds') {
        this.leftXIndex = 0
        this.rightXIndex = this.oddsList.length - 1
      }
      if (type === 'label') this.checkedLabel = null
    },
    // 重置全部并退出筛选
    clearAll() {
      Lib.common.event_statistics(`hottest_tickets_filter_clear`)
      this.leftXIndex = 0
      this.rightXIndex = this.oddsList.length - 1
      this.checkedLabel = null
      const obj = {
        minOdds: 0,
        maxOdds: this.oddsList.length - 1,
        checkLabel: null
      }
      this.confirm(obj)
      this.visibleFilterBox(false)
    },
    // 确认
    confirm(data) {
      Lib.common.event_statistics(`hottest_tickets_filter_apply`)
      this.$emit('valueChange', data)
      this.visibleFilterBox(false)
    },
    // 首字母大写
    UpperCase(item) {
      return Lib.common.UpperCase(item)
    },
    // 进度值选择
    progressValEmit(val) {
      this.leftXIndex = val.leftXIndex
      this.rightXIndex = val.rightXIndex
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
        padding: 0 6rem/36;
        margin-right: 10rem/36;
        height: 23rem/36;
        background-color: #f2f2f4;
        border-radius: 12rem/36;
      }

      .cl-middle {
        margin: 0 3rem/36;
      }

      .cl-resetIcon {
        margin-left: 6rem/36;
        .sprite(@icon-close, 108rem);
      }
    }
  }

  .cl-bottom {
    .cl-bottomWidth {
      width: 340rem/36;
      .cl-labelListType {
        color: #000;
        font-weight: bold;
        font-size: 11rem/36;
      }
      .cl-labelList {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .cl-item {
          white-space: nowrap;
          min-width: 79.75rem/36;
          height: 30rem/36;
          font-size: 9rem/36;
          border-radius: @mainButtonRadius;
          padding: 0 9rem/36;
          box-sizing: border-box;
        }

        .cl-marginr {
          margin-top: 7rem/36;
          margin-right: 7rem/36;
        }

        .cl-marginr:nth-child(4n) {
          margin-right: 0;
        }

        .cl-uncheck {
          color: @noChooseColor;
          background-color: @noChooseButton;
        }

        .cl-checked {
          color: @chooseColor;
          background-color: @chooseButton;
        }
      }

      .cl-bottonList {
        font-size: 13rem/36;
        font-weight: bold;

        .cl-box {
          height: 40rem/36;
          box-sizing: border-box;
        }

        .cl-clear {
          width: 108rem/36;
          border: 1rem/36 solid @mainThemeColor;
        }

        .cl-apply {
          width: 221rem/36;
        }
      }
    }
  }
}
</style>
