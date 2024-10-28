<template>
  <div class="cl-grandBetslip-wrap">
    <betslipMarketList />
    <betslipRelatedBets />
    <!-- <betslipPlaceBet /> -->
  </div>
</template>

<script>
import betslipMarketList from '@/components/components/betslipMarketList.vue'
// import betslipPlaceBet from '@/components/components/betslipPlaceBet.vue'
import betslipRelatedBets from '@/components/components/betslipRelatedBets.vue'
import {
  contestListRestore,
  pubSub,
  contestListSave
} from '@/assets/js/utils/contestListRestore.js'

export default {
  components: { betslipMarketList, betslipRelatedBets },
  mounted() {
    contestListRestore.call(this, 'BetSlipIndex')
    pubSub.subscribe('betSlip', this.saveContestList)
  },
  destroyed() {
    pubSub.unSubscribe('betSlip', this.saveContestList)
  },
  methods: {
    saveContestList() {
      contestListSave.call(this, ['pageScroll'], '.cl-betslip-wrap')
    }
  }
}
</script>

<style scoped lang="less"></style>
