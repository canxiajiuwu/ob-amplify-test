<template>
  <div class="cl-mybets-wrap">
    <mybetList v-if="isRefresh" @goDetail="goDetail" />
    <mybetDetail
      v-if="isDetail"
      :detail-ticket-id="detailTicketId"
      @refreshData="refreshData"
      @closeDetail="closeDetail"
    />
  </div>
</template>

<script>
import mybetList from './mybetList.vue'
import mybetDetail from './mybetDetail.vue'

export default {
  components: { mybetList, mybetDetail },
  props: ['ticketId'],
  data() {
    return {
      isRefresh: 1, // 订单刷新
      isDetail: 0,
      detailTicketId: ''
    }
  },
  mounted() {
    if (this.ticketId) {
      this.detailTicketId = this.ticketId
      this.isDetail = 1
    }
  },
  methods: {
    refreshData() {
      this.isRefresh = 0
      setTimeout(() => (this.isRefresh = 1))
    },
    // 打开详情
    goDetail(item) {
      this.detailTicketId = item.order_no
      this.isDetail = 1
    },
    // 关闭详情
    closeDetail() {
      this.$emit('closeMyBetDetail')
      this.isDetail = 0
    }
  }
}
</script>

<style scoped lang="less">
.cl-mybets-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  z-index: 4;
}
</style>
