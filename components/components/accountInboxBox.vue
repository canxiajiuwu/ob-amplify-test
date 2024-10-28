<template>
  <div class="cl-accountInboxBox-wrap">
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div class="cl-container" v-if="requestLoading">
        <div class="cl-list" v-if="inboxList.length > 0">
          <div
            class="cl-indexCardShadow cl-item"
            v-for="(item, index) in inboxList"
            :key="index"
          >
            <div class="cl-top cl-flexcb">
              <div class="cl-left">{{ item.title }}</div>
              <div class="cl-right">{{ item.time }}</div>
            </div>

            <div class="cl-bottom">{{ item.content }}</div>
          </div>
        </div>
        <dataNoResult v-else />
      </div>
      <dataLoading v-else />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  data() {
    return {
      inboxList: [],
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    }
  },
  mounted() {
    this.getInboxList()
  },
  methods: {
    // 请求
    getInboxList() {
      this.$axios_api
        .message({ token: this.token })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.inboxList = res.data
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountInboxBox-wrap {
  padding-bottom: 1rem;
  width: 100%;

  .cl-container {
    padding: 0 10rem/36;

    .cl-list {
      margin-top: 2rem/36;
      margin-bottom: 2rem;

      .cl-item {
        border-radius: @mainButtonRadius;
        background-color: #fff;
        box-sizing: border-box;
        margin-bottom: 10rem/36;
        padding: 10rem/36;

        .cl-top {
          color: #636363;
          font-weight: 300;
        }

        .cl-bottom {
          color: #000;
          padding-top: 5rem/36;
        }
      }
    }
  }
}
</style>
