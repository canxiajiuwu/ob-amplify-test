<template>
  <div class="cl-betslipExtraBonus-wrap">
    <div class="cl-title">
      {{ $t('betslipExtraBonus.title', { percent: percent }) }}
    </div>
    <div class="cl-extraBonus">
      <div
        class="cl-extraLength"
        :style="{ width: ((ticketsOver.length + 3) / 45) * 100 + '%' }"
      />
      <div class="cl-flexcc cl-bonusWord">
        {{
          $t('footerMenu.boost', { money: winBonus, percent: percent + '%' })
        }}
      </div>
    </div>
    <div class="cl-flexcb cl-bonusFooter">
      <div class="cl-left">
        {{ $t('betslipExtraBonus.left', { length: ticketsOver.length }) }}
      </div>
      <div class="cl-right">
        {{ $t('betslipExtraBonus.right', { length: ticketsOver.length }) }}
      </div>
    </div>
    <div class="cl-content">
      <div
        class="cl-word"
        v-html="
          ticketsOver.length < 3
            ? $t('footerMenu.bonusLess', {
                number: 3 - ticketsOver.length,
                percent: '3%'
              })
            : $t('footerMenu.bonusMore', { percent: percentMore + '%' })
        "
      />
      <div class="cl-word">{{ $t('betslipExtraBonus.desc') }}</div>
      <div class="cl-bonusMore" @click="openBonusPage">
        {{ $t('footerMenu.learn') }}
      </div>
    </div>

    <div class="cl-flexcc cl-tcButton cl-got" @click="closeModal">
      {{ $t('betslipExtraBonus.got') }}
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  props: ['percent', 'percentMore', 'winBonus', 'ticketsOver'],
  methods: {
    openBonusPage() {
      Lib.common.event_statistics('betslip_bonus_boost_modal_learn_more')
      this.$router.push({
        path: `/${this.$store.state.root.locale}/betslipBonus`
      })
      this.closeModal()
    },
    closeModal() {
      this.$emit('visibleBonusIntro', false)
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipExtraBonus-wrap {
  font-size: 10rem/36;
  padding: 10rem/36;

  .cl-title {
    font-size: 13rem/36;
    font-weight: bold;
    color: #333;
  }

  .cl-extraBonus {
    position: relative;
    flex: 1;
    border-radius: 8rem/36;
    height: 16rem/36;
    margin: 7rem/36 0;
    background-color: rgba(252, 219, 7, 0.3);

    .cl-bonusWord {
      position: relative;
      z-index: 2;
      text-align: center;
      height: 16rem/36;
    }

    .cl-extraLength {
      position: absolute;
      border-radius: 8rem/36;
      z-index: 1;
      height: 16rem/36;
      background-color: #fcdb07;
    }
  }

  .cl-bonusFooter {
    margin-bottom: 15rem/36;
  }

  .cl-content {
    .cl-bonusMore {
      color: #2750ca;
      text-decoration: underline;
      margin-top: 3rem/36;
    }
  }

  .cl-got {
    width: 124rem/36;
    height: 33rem/36;
    border-radius: 17rem/36;
    border: 1rem/36 solid @mainThemeColor;
    margin: 25rem/36 auto 10rem/36;
    font-size: 13rem/36;
  }
}
</style>
