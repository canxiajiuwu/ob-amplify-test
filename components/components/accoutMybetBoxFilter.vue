<template>
  <div class="cl-mybetBoxFilter-wrap">
    <div class="cl-flexcb">
      <div class="cl-flexcb">
        <div
          class="cl-flexcc cl-box"
          v-for="(item, index) in arr"
          :key="index"
          :class="[
            filterIndex === index ? 'cl-selected' : 'cl-unselected',
            { 'cl-box33': where === 'freeBetList' && index === 0 }
          ]"
          @click="clickFilter({ index })"
        >
          <div>
            {{
              where === 'freeBetList'
                ? item
                : $t(`accountMybetDetailBox.filterList[${index}]`)
            }}
          </div>
        </div>
      </div>
      <div
        class="cl-flexcc"
        :class="{ 'cl-switchBox': locale === 'fr' && where === 'freeBetList' }"
        :style="{
          height:
            locale === 'fr' && where === 'freeBetList'
              ? 'calc(30rem/36)'
              : 'calc(23rem / 36)'
        }"
      >
        <div class="cl-flexcc cl-onlyWin">
          {{ $t('accountMybetDetailBox.onlyWinners') }}
        </div>
        <van-switch
          v-model="checked"
          :disabled="switchDisabled"
          :size="15 / 36 + 'rem'"
          active-color="#4C50FA"
          inactive-color="#999AD3"
          @change="clickSwitch"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import 'vant/lib/switch/index.css'

export default {
  props: {
    where: {
      type: String
    }
  },
  data() {
    return {
      arr:
        this.where === 'freeBetList'
          ? this.$t('accountGiftList.filterArr')
          : ['all', 'settled', 'unsettled'],
      filterIndex: 0,
      checked: false,
      switchDisabled: false
    }
  },
  computed: {
    locale() {
      return this.$store.state.root.locale
    }
  },
  methods: {
    clickSwitch() {
      this.switchDisabled = true
      // this.clickFilter(this.filterIndex)
      this.postClickSwitch()
      setTimeout(() => (this.switchDisabled = false), 1000)
      Lib.common.event_statistics('mybet_only_winning')
    },
    postClickSwitch: Lib.common.throttle(function () {
      this.clickFilter(this.filterIndex)
    }, 1000),
    clickFilter({ index }) {
      if (this.filterIndex === index) return
      if (index !== undefined) this.filterIndex = index
      Lib.common.event_statistics('mybet_filter_click')
      this.$emit('getShowResult', {
        index: this.filterIndex,
        checked: this.checked,
        reqDecisionType: 2
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-mybetBoxFilter-wrap {
  background-color: #fff;
  padding: 10rem/36;
  box-sizing: border-box;
  font-size: 9rem/36;
  font-weight: 400;

  /deep/ .van-switch {
    width: 25rem/36;
    .van-switch__node {
      width: 11rem/36;
      height: 11rem/36;
      top: 2rem/36;
      left: 2rem/36;
    }
  }
  /deep/ .van-switch--on {
    .van-switch__node {
      left: -3rem/36;
    }
  }

  .cl-box {
    min-width: 60rem/36;
    height: 23rem/36;
    border-radius: 12rem/36;
    margin-right: 3rem/36;
    color: #333;
    white-space: nowrap;
    padding: 0 5rem/36;
    box-sizing: border-box;
    &.cl-box33 {
      min-width: 33rem/36;
    }
  }
  .cl-selected {
    background-color: @chooseButton;
  }
  .cl-unselected {
    background-color: @noChooseButton;
  }
  .cl-switchBox {
    flex-direction: column-reverse;
  }
  .cl-onlyWin {
    color: #a2a2a7;
    margin-right: 3rem/36;
    white-space: nowrap;
    text-align: right;
  }
}
</style>
