<template>
  <div
    :style="{
      position: 'relative',
      color: color,
      fontSize: fontSize,
      zIndex: zIndex
    }"
  >
    <div
      class="cl-flexcb cl-headBack-wrap"
      :style="{
        height: height + 'rem',
        backgroundColor: bgcolor,
        borderBottom: borderB,
        paddingTop: safeAreaTop + 'px'
      }"
    >
      <NuxtLink no-prefetch class="cl-flexcc cl-left" :to="`/${locale}`">
        <div class="cl-flexcc" v-if="leftFlag" @click.prevent="goWhere">
          <div
            class="cl-leftIcon"
            :class="{ 'cl-leftIconWhite': isWhiteBack }"
          />
        </div>
        <slot v-else name="left" />
      </NuxtLink>
      <div class="cl-right">
        <slot />
      </div>
    </div>
    <div
      class="cl-middle"
      :style="[
        { zIndex: middlezIndex, top: `calc(50% + ${safeAreaTop / 2}px)` },
        middleWordStyle
      ]"
    >
      <h1 class="cl-h1" v-if="title">{{ title }}</h1>
      <div v-else>
        <slot name="middle" />
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  props: {
    noSafeAreaTop: {
      type: Boolean
    },
    eventBurial: {
      type: Array
    },
    height: {
      type: Number,
      default: 47 / 36
    },
    bgcolor: {
      type: String
    },
    borderB: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#000'
    },
    fontSize: {
      type: String
    },
    leftFlag: {
      type: Boolean,
      default: true
    },
    middleWordStyle: {
      type: Object
    },
    path: {
      type: String
    },
    replace: {
      type: Boolean
    },
    title: {
      type: String
    },
    zIndex: {
      type: Number || String
    },
    middlezIndex: {
      type: Number || String,
      default: 1
    },
    isWhiteBack: {
      type: Boolean
    }
  },
  computed: {
    winApp() {
      return window.appInteraction
    },
    isNewApp() {
      return Lib.store.get('isNewApp')
    },
    safeAreaTop() {
      return this.noSafeAreaTop ? 0 : this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  methods: {
    goWhere() {
      this.$emit('goWhere')
      // 事件埋点
      const arr = this.eventBurial
      if (Array.isArray(arr) && arr.length > 0) {
        if (arr[1]) Lib.common.event_statistics(arr[0], arr[1])
        else Lib.common.event_statistics(arr[0])
      }
      // 根据不同属性控制相应的跳转页面操作
      if (this.replace && this.path) {
        this.$router.replace({
          path: `/${this.locale}` + this.path
        })
        return
      }
      if (this.replace && !this.path) {
        this.$router.replace({ path: `/${this.locale}` })
        return
      }
      if (this.path) {
        this.$router.push({
          path: `/${this.locale}` + this.path
        })
        return
      }
      if (this.path === '') {
        this.$router.push({ path: `/${this.locale}` })
        return
      }
      const isPageIframe = this.$store.state.isPageIframe
      if (isPageIframe) {
        setTimeout(() => {
          window.parent.vm.store.commit('setPageIframeUrl', '')
          window.parent.vm.store.commit('setPageIframeShow', false)
        }, 100)
        return
      }
      this.isNewApp ? Lib.common.activityBack(this) : this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.cl-headBack-wrap {
  background-color: @headBackBgColor;
  width: 100%;
  .cl-left {
    white-space: nowrap;
    margin-left: 12rem/36;
    .cl-leftIcon {
      .sprite(@icon-black-long-back, 108rem);

      &.cl-leftIconWhite {
        .sprite(@icon-white-long-back, 108rem);
      }
    }
  }
}

.cl-middle {
  white-space: nowrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cl-right {
  position: relative;
}
</style>
