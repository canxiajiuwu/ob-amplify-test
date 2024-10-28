<template>
  <div v-if="depositComShowComputed" class="cl-accountDepositCom-wrap">
    <div class="cl-container">
      <div class="cl-top cl-flexcb">
        <div class="cl-accountDeposit">{{ $t('accountDeposit.deposit') }}</div>
        <div class="cl-close" @click="close">
          <img src="@/assets/images/Index/joinSuccessClose.png" alt="close" />
        </div>
      </div>
      <depositCom where="index" @depositSuccess="depositSuccess" />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import depositCom from '@/components/components/depositCom/depositCom.vue'
export default {
  components: { depositCom },
  data() {
    return {
      depositComShow: true
    }
  },
  computed: {
    accountInfo() {
      return this.$store.state.accountInfo
    },
    depositComShowComputed() {
      const noShowAccountDepositCom = Lib.store.get('noShowAccountDepositCom')
      return (
        this.depositComShow &&
        this.accountInfo &&
        !this.accountInfo.first_deposit &&
        !noShowAccountDepositCom
      )
    }
  },
  methods: {
    close() {
      this.depositComShow = false
      Lib.store.set('noShowAccountDepositCom', true)
    },
    depositSuccess() {
      Lib.common.errorReminderUp(this, true, this.$t('depositSuccess.art1'), 1)
      this.close()
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountDepositCom-wrap {
  .cl-container {
    width: 340rem/36;
    margin: 10rem/36 10rem/36 0;
    background-color: #fff;
    border-radius: 6rem/36;
    box-shadow: 0 1rem/36 4rem/36 0 #cecede;
    padding-bottom: 17rem/36;
    .cl-top {
      height: 32rem/36;
      padding: 10rem/36 10rem/36 0;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 14rem/36;
      color: #000000;
      line-height: 14rem/36;
      margin-top: 10rem/36;
      .cl-close {
        img {
          width: 14rem/36;
          height: 14rem/36;
        }
      }
    }
  }
}
</style>
