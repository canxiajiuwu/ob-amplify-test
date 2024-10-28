<template>
  <div>
    <div ref="Filter" class="cl-Filter-wrap">
      <div class="cl-flexcc cl-layout" @click="clickFilter">
        <div class="cl-filter">Filter</div>
        <div class="cl-down" />
      </div>
      <div class="cl-flexcc">
        <div
          class="cl-flexcb cl-layout cl-special"
          v-if="!(minOdds === 0 && maxOdds === 11)"
          @click="clickFilter"
        >
          <div class="cl-filter">
            {{ `${oddsList[minOdds]}-${oddsList[maxOdds]}` }}
          </div>
          <div class="cl-down" />
        </div>
        <div class="cl-flexcc cl-layout" @click="clickFilter">
          {{ market }}
          <div class="cl-down" />
        </div>
      </div>
    </div>

    <drawer
      type="bottom"
      :height="285 / 36"
      :visible="open"
      @update:visible="clickFilter"
    >
      <!--  filter展开  -->
      <div class="cl-filter-box">
        <div class="cl-filter-title">Filter</div>

        <oddsRange
          :odds-list="oddsList"
          :min-odds="minOdds"
          :max-odds="maxOdds"
          @progressValEmit="progressValEmit"
        />
        <div class="cl-paddingBox">
          <div class="cl-flexcb cl-titleBox">
            <div class="cl-left">{{ $t('preMatchBox.market') }}</div>
          </div>
          <div class="cl-marketBox">
            <div
              class="cl-flexcc cl-market"
              :class="{ 'cl-select': item.name === market }"
              v-for="(item, index) in marketList"
              :key="index"
              @click="marketChange(item.name, item.market_type)"
            >
              {{ item.name }}
            </div>
          </div>

          <div class="cl-flexcb cl-buttonBox">
            <div
              class="cl-flexcc cl-bsbb cl-tcButton cl-clear"
              @click="clearFun"
            >
              {{ $t('accountDeposit.clear') }}
            </div>
            <div class="cl-flexcc cl-lkButton cl-apply" @click="applyFun(true)">
              {{ $t('accountDeposit.apply') }}
            </div>
          </div>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import oddsRange from '@/components/components/oddsRange.vue'

export default {
  components: { oddsRange },
  props: {
    // 最小赔率
    minOdds: {
      type: Number
    },
    // 最大赔率
    maxOdds: {
      type: Number
    },
    oddsList: {
      type: Array
    },
    market: {
      type: String,
      default: '1X2'
    },
    marketList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      open: false,
      // 进度条左边第几格
      leftXIndex: null,
      // 进度条右边第几格
      rightXIndex: null
    }
  },
  computed: {
    filterThrottle() {
      return Lib.common.throttle(this.filterFun, 300)
    },
    widthPercent() {
      return (
        ((this.oddsList.findIndex((item) => {
          return item === this.odds
        }) +
          1) /
          this.oddsList.length) *
          100 +
        '%'
      )
    }
  },
  methods: {
    clickFilter() {
      Lib.common.event_statistics(`home_match_tabs_filter_click`)
      this.open = !this.open
      this.$emit('isIndexFilterOpen', this.open)
      // this.filterThrottle()
    },
    filterFun() {
      this.$parent.$refs.filterWrap.scrollIntoView(true)
    },
    deleteOdds() {
      Lib.common.event_statistics(`home_match_tabs_filter_delete_odds`)
      this.leftXIndex = 0
      this.rightXIndex = this.oddsList.length - 1
      this.applyFun(true)
    },
    marketChange(name, id) {
      console.log(name, id)

      Lib.common.event_statistics(`home_match_tabs_filter_market_change`)
      this.$emit('marketEmit', { name, id })
    },
    clearFun() {
      this.leftXIndex = 0
      this.rightXIndex = this.oddsList.length - 1
      this.$emit('marketEmit', this.marketList[0].name)
      this.applyFun(false)
    },
    applyFun(isApply) {
      this.open = false
      this.oddEmit()
      this.$emit('FilterApply', isApply)
    },
    oddEmit() {
      this.$emit('oddsEmit', {
        leftXIndex: this.leftXIndex,
        rightXIndex: this.rightXIndex
      })
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
.cl-Filter-wrap {
  display: flex;
  justify-content: space-between;
  padding: 10rem/36 10rem/36;
  background-color: #fff;
  .cl-layout {
    font-size: 9rem/36;
    line-height: 9rem/36;
    box-sizing: border-box;
    height: 21rem/36;
    padding: 6rem/36 7rem/36;
    background-color: #f2f2f4;
    border-radius: 12rem/36;
    .cl-down {
      margin-left: 10rem/36;
      .sprite(@ticon-down, 111rem);
    }
  }
  .cl-special {
    margin-right: 3rem/36;
  }
}

.cl-filter-box {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10rem;
  background-color: #fff;
  padding: 0 0 17rem/36;

  .cl-filter-title {
    height: 38rem/36;
    text-align: center;
    line-height: 38rem/36;
    color: #000;
    font-weight: bold;
    //border-bottom: 1rem/36 solid #d4dae1;
    margin-bottom: 10rem/36;
  }

  .cl-paddingBox {
    padding: 30rem/36 10rem/36 0;
  }

  .cl-titleBox {
    color: #000;
    font-size: 11rem/36;
    font-weight: bold;
    padding-top: 10rem/36;
  }

  .cl-marketBox {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    padding-top: 6rem/36;

    .cl-market {
      width: fit-content;
      min-width: 81rem/36;
      height: 30rem/36;
      border-radius: 15rem/36;
      background-color: @noChooseButton;
      font-size: 11rem/36;
      white-space: nowrap;
      padding: 0 20rem/36;
      margin: 0 6rem/36 6rem/36 0;
      color: @noChooseColor;

      &.cl-select {
        background-color: @chooseButton;
        color: @chooseColor;
      }
    }
  }

  .cl-buttonBox {
    padding-top: 17rem/36;

    > div {
      height: 40rem/36;
      font-size: 13rem/36;
      border-radius: 20rem/36;
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
</style>
