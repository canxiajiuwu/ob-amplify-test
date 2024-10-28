<template>
  <div class="cl-resultSelect-wrap">
    <div class="cl-container">
      <div class="cl-top cl-flexcb">
        <div class="cl-left cl-item" @click="changeDate(0)">
          <div></div>
        </div>
        <div class="cl-middle cl-item">{{ date }}</div>
        <div class="cl-right cl-item" @click="changeDate(1)">
          <div></div>
        </div>
      </div>
      <div class="cl-bottom cl-flexcb">
        <div class="cl-sports cl-item" @click="openModal(0)">
          <span>{{ sport_name }}</span>
          <div class="cl-icon"></div>
        </div>
        <div class="cl-country cl-item" @click="openModal(1)">
          <span>{{ country }}</span>
          <div class="cl-icon"></div>
        </div>
        <div class="cl-league cl-item" @click="openModal(2)">
          <span>{{ tournament_name }}</span>
          <div class="cl-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    date: {
      type: String
    },
    sport_name: {
      type: String
    },
    country: {
      type: String
    },
    tournament_name: {
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
    // 打开筛选框
    openModal(index) {
      this.$emit('openModal', index)
    },
    // 修改日期
    changeDate(index) {
      this.$emit('changeDate', index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cl-resultSelect-wrap {
  width: 100%;

  .cl-container {
    margin: 5rem/36;
    background-color: #fff;
    border-radius: 3rem/36;
    box-sizing: border-box;
    padding: 5rem/36;

    .cl-item {
      background-color: #e8f0f2;
      height: 25rem/36;
      border-radius: 3rem/36;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .cl-top {
      margin-bottom: 5rem/36;

      .cl-left {
        width: 67rem/36;

        div {
          .sprite(@icon-back,108rem);
        }
      }

      .cl-middle {
        width: 197rem/36;
        font-weight: bold;
      }

      .cl-right {
        width: 67rem/36;

        div {
          transform: rotate(180deg);
          .sprite(@icon-back,108rem);
        }
      }
    }

    .cl-bottom {
      .cl-item {
        width: 110rem/36;
        box-sizing: border-box;
        padding: 0 5rem/36;
        text-transform: capitalize;
        position: relative;

        .cl-icon {
          position: absolute;
          right: 5rem/36;
          top: 7.5rem/36;
          transform: rotate(-90deg);

          .sprite(@icon-back,108rem);
        }
      }

      /*.cl-league {*/
      /*justify-content: flex-start;*/
      /*}*/
    }
  }
}
</style>
