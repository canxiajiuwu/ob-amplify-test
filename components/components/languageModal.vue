<template>
  <div class="cl-languageModal-wrap cl-flexcc" :style="getDynamicStyle">
    <div class="cl-box">
      <div class="cl-word">Choose your language</div>
      <div
        class="cl-item cl-flexcc"
        :class="{ 'cl-selected': chooseIndex === index }"
        v-for="(item, index) in langList"
        :key="index"
        @click="selectLang(index, item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import {
  getPopupHierarchy,
  removesPopupsBeingDisplayedList
} from '@/assets/js/utils/popupPriority.js'

export default {
  name: '',
  data() {
    return {
      chooseIndex: 0,
      popType: 'languageSelectionBox'
    }
  },
  computed: {
    langList() {
      return this.$store.state.moneyConfig[this.$store.state.root.country]
        .langList
    },
    getDynamicStyle() {
      return {
        'z-index': getPopupHierarchy({ type: this.popType })
      }
    }
  },
  mounted() {
    for (let i = 0; i < this.langList.length; i++) {
      if (this.langList[i].lang === this.$store.state.root.locale) {
        this.chooseIndex = i
      }
    }
  },
  methods: {
    selectLang(index, item) {
      // 关闭选择框
      this.isShow = false
      // 选中第几项
      this.chooseIndex = index
      // 修改语言配置
      this.$store.commit('setRoot', {
        ...this.$store.state.root,
        locale: item.lang
      })
      // 刷新页面
      // 获取路由数组
      const urlArr = window.location.pathname.split('/')
      // 获取地址传参
      const urlParameter = window.location.href.split('?')[1]
      // 替换语言
      if (urlArr.length >= 2) {
        urlArr[1] = item.lang
      }
      // 获取基础域名
      let url = window.location.origin
      // 拼接路由
      for (let i = 1, length = urlArr.length; i < length; i++) {
        url += '/' + urlArr[i]
      }
      // 特定页面删除数据
      if (url.includes('crashGame')) {
        Lib.store.remove('NewbieGuide')
      }
      // 有传参拼接传参
      if (urlParameter) {
        url += '?' + urlParameter
      }
      // 关闭语言弹出
      this.$emit('closeLangModal')
      removesPopupsBeingDisplayedList({ type: this.popType })
      // 刷新当前页面
      window.location.href = url
    }
  }
}
</script>

<style scoped lang="less">
.cl-languageModal-wrap {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 10rem;
  top: 0;
  bottom: 0;
  margin: 0 auto;

  .cl-box {
    width: 300rem/36;
    padding: 30rem/36 0 26rem/36;
    border-radius: 5rem/36;
    background-color: white;
    text-align: center;
    color: #555555;

    .cl-word {
      font-size: 13rem/36;
      padding-bottom: 15rem/36;
    }

    .cl-item {
      width: 220rem/36;
      height: 37rem/36;
      box-sizing: border-box;
      border-radius: 3rem/36;
      border: 1px solid #555;
      font-size: 16rem/36;
      margin: 14rem/36 auto 0;

      &.cl-selected {
        border: none;
        background-color: #4c50fa;
        color: white;
      }
    }
  }
}
</style>
