<!-- cashout成功消息组件 -->
<template>
  <transition-group
    class="cl-componentsMessage"
    :style="{ top: `calc(47rem/36 + ${safeAreaTop}px)` }"
    tag="div"
  >
    <div
      ref="messageContent"
      class="cl-indexCardShadow cl-bsbb cl-message-content"
      v-for="a in showList"
      :key="a.id"
    >
      <div class="cl-flexcb">
        <div class="cl-flexcc" style="flex: 1">
          <div class="cl-successIcon" />
          <div class="cl-title">{{ a.title }}</div>
        </div>
        <div class="cl-closeIcon" @click="remove(a.id)" />
      </div>
      <div class="cl-msgContent">{{ a.content }}</div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'CashoutSuccessAnimation',
  data() {
    return {
      showList: [],
      id: 0
    }
  },
  computed: {
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  methods: {
    // 生成id
    uuid() {
      return `showList-${this.id++}`
    },
    // 添加显示对象
    add(obj) {
      const { duration = 5 } = obj
      const id = this.uuid()
      const newObj = {
        ...obj,
        id
      }
      this.showList.push(newObj)
      // 设置定时器
      const timer = setTimeout(() => {
        this.remove(id)
        clearTimeout(timer)
      }, duration * 1000)
    },
    // 根据 id 删除显示对象
    remove(id) {
      this.showList = this.showList.filter((a) => a.id !== id)
    },
    // 清空列表
    clearList() {
      this.showList = []
    }
  }
}
</script>

<style scoped lang="less">
.cl-componentsMessage {
  position: fixed;
  z-index: 11;
  left: 50%;
  transform: translateX(-50%);
  max-width: 340rem/36;
  display: flex;
  align-items: center;
  flex-direction: column;

  .cl-message-content {
    border-radius: @mainButtonRadius;
    margin-bottom: 7rem/36;
    width: 340rem/36;
    background-color: #fff;
    padding: 10rem/36;

    .cl-successIcon {
      margin-right: 7rem/36;
      .sprite(@ticon-choose-blue, 87rem);
    }
    .cl-closeIcon {
      margin-left: 7rem/36;
      .sprite(@icon-close-grey, 108rem);
    }
    .cl-title {
      flex: 1;
      white-space: normal;
      color: #000;
      font-size: 13rem/36;
      font-weight: bold;
    }
    .cl-msgContent {
      padding-top: 7rem/36;
      white-space: normal;
      font-size: 11rem/36;
      font-weight: 400;
      color: #686868;
    }
  }
}

.v-enter-active,
.cl-v-leave-active {
  transition: all 300ms ease-in;
}

.v-enter,
.cl-v-leave-to {
  opacity: 0;
  transform: translateY(-30rem/36);
}
</style>
