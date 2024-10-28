<template>
  <div class="cl-accountMybetDetail-wrap">
    <headBack
      :title="ticket_id"
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }"
    />
    <accountMybetDetailBox />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import accountMybetDetailBox from '@/components/components/accountMybetDetailBox.vue'

export default {
  components: {
    accountMybetDetailBox,
    headBack
  },
  computed: {
    ticket_id() {
      return (
        this.$t('accountMybetBox.bet_id_title') + this.$route.params.ticketId
      )
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  }
}
</script>

<style scoped lang="less"></style>
