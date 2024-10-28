<template>
  <div class="cl-coinsHistory-wrap">
    <div class="cl-coinsBack cl-flexcb">
      <div class="cl-left cl-flexcs" @click="goBack">
        <div class="cl-icon"></div>

        <div class="cl-name">
          {{ $t('accountBack.back') }}
        </div>
      </div>

      <div class="cl-middle">
        {{ $t('account.coins') }} {{ $t('winAdModal.detail') }}
      </div>

      <div class="cl-right"></div>
    </div>

    <div class="cl-coinsList">
      <div
        class="cl-item cl-flexcb"
        v-for="(item, index) in coinsList"
        :key="index"
      >
        <div class="cl-left">
          <div class="cl-top">
            {{ item.name }}
          </div>
          <div class="cl-time">
            {{ item.time }}
          </div>
        </div>
        <div
          class="cl-right"
          :class="{ 'cl-add': item.amount.indexOf('+') !== -1 }"
        >
          {{ item.amount }} {{ $t('account.coins') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: '',
  components: {},
  data() {
    return {
      coinsList: []
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      if (Lib.store.get('token')) {
        return Lib.common.decrypt(Lib.store.get('token'))
      } else {
        return ''
      }
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {
    this.coinsListReq()
  },
  methods: {
    // 请求coins
    coinsListReq() {
      this.$axios_api
        .coinsRecord({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.coinsList = res.data
          }
        })
    },
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cl-coinsHistory-wrap {
  .cl-coinsBack {
    height: 47rem/36;
    width: 10rem;
    color: #333333;
    padding: 0 10rem/36;
    background-color: #fff;
    box-sizing: border-box;

    > div {
      flex: 1;
    }

    .cl-left {
      .cl-icon {
        .sprite(@icon-back,108rem);
      }

      .cl-name {
        margin-left: 5rem/36;
        font-size: 10rem/36;
      }
    }

    .cl-middle {
      font-weight: bold;
      white-space: nowrap;
      text-align: center;
      text-transform: capitalize;
      font-size: 11rem/36;
    }

    .cl-right {
      text-align: right;
    }
  }

  .cl-coinsList {
    position: absolute;
    top: 60rem/36;
    bottom: 0;
    overflow: auto;

    .cl-item {
      width: 10rem;
      height: 58rem/36;
      background-color: white;
      box-sizing: border-box;
      padding: 12rem/36 10rem/36;
      border-bottom: 1px solid #c1cbd5;

      .cl-left {
        color: #000000;

        .cl-time {
          font-size: 10rem/36;
          color: #939695;
          padding-top: 10rem/36;
        }
      }

      .cl-right {
        color: #333333;
        font-size: 13rem/36;
        font-weight: bold;

        &.cl-add {
          color: #ff6c00;
        }
      }
    }
  }
}
</style>
