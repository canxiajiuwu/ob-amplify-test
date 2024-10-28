<template>
  <div class="cl-language-wrap">
    <div class="cl-languageBox cl-flexcb">
      <div class="cl-left">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/logo/logo-2022.png`"
          alt="onebet | logo"
        />
      </div>
      <div v-if="langList.length > 0" class="cl-right">
        <div class="cl-up cl-flexcs" @click="isShow = !isShow">
          <span>{{ langList[chooseIndex].name }}</span>
          <div class="cl-more" />
        </div>

        <div v-if="isShow" class="cl-down">
          <div
            v-for="(item, index) in langList"
            :key="index"
            class="cl-item cl-flexcc"
            :class="{ 'cl-selected': chooseIndex === index }"
            @click="selectLang(index, item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chooseIndex: 0,
      isShow: false
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    langList() {
      return this.$store.state.moneyConfig[this.country].langList
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    for (let i = 0; i < this.langList.length; i++) {
      if (this.langList[i].lang === this.locale) {
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
      // 有传参拼接传参
      if (urlParameter) {
        url += '?' + urlParameter
      }
      // 刷新当前页面
      window.location.href = url
    }
  }
}
</script>

<style scoped lang="less">
.cl-language-wrap {
  .cl-languageBox {
    background-color: #1c2029;
    box-sizing: border-box;
    padding: 11rem/36 13rem/36;

    .cl-left {
      img {
        width: 41rem/36;
      }
    }

    .cl-right {
      height: 33rem/36;
      border-radius: 3rem/36;
      color: #e4e4e4;
      background-color: #3a3b44;
      position: relative;

      .cl-up {
        padding: 0 20rem/36 0 10rem/36;
        height: 33rem/36;
        position: relative;

        .cl-more {
          right: 5rem/36;
          font-size: 10rem/36;
          position: absolute;

          .sprite(@menu-more,108rem);
        }
      }

      .cl-down {
        position: absolute;
        top: 30rem/36;
        right: 0;
        width: 100rem/36;
        color: #e4e4e4;
        background-color: #3a3b44;
        z-index: 1;

        .cl-item {
          height: 33rem/36;

          &.cl-selected {
            background-color: #fcdb06;
            font-weight: bold;
            color: #363636;
          }
        }
      }
    }
  }
}
</style>
