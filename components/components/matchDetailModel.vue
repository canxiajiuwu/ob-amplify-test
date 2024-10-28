<template>
  <div class="cl-matchDetailModel-wrap cl-flexcc">
    <div class="cl-modal">
      <div class="cl-contentBox">
        {{ text }}
      </div>
      <div class="cl-button cl-flexcc" @click="closeModal">
        {{ $t('matchDetailModel.ok') }}
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: '',
  components: {},
  props: {
    text: {
      type: String
    }
  },
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {},
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cl-matchDetailModel-wrap {
  width: 10rem;
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;

  .cl-modal {
    margin: 0 5rem/36;
    width: 350rem/36;
    border-radius: 3rem/36;
    background-color: #fff;
    color: #000;
    overflow: hidden;

    .cl-contentBox {
      padding: 10rem/36 10rem/36 24rem/36;
    }

    .cl-button {
      background-color: #e8f0f2;
      height: 28rem/36;
      font-weight: bold;
    }
  }
}
</style>
