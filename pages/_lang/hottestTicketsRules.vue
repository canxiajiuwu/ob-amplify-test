<template>
  <div class="cl-hottestTicketsRules-wrap">
    <headBack
      :title="$t('hottestTickets.Rules')"
      :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
    />
    <div style="height: calc(10rem / 36)" />
    <div class="cl-flexcc cl-rulesBox">
      <div class="cl-rulesBoxWidth">
        <div class="cl-rules">
          <div v-for="(a, b) in $t('hottestTickets.rulesList')" :key="b">
            <template>
              <div class="cl-item">{{ a }}</div>
              <div style="height: calc(15rem / 36)" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  components: { headBack },
  mounted() {
    // 隐藏skelet
    Lib.common.hideSkeleton()
  }
}
</script>

<style lang="less" scoped>
.cl-hottestTicketsRules-wrap {
  min-height: 100vh;
  background-color: #fff;

  .cl-rulesBox {
    .cl-rulesBoxWidth {
      width: 340rem/36;
      .cl-rules {
        font-size: 11rem/36;
        color: #74747c;
        font-weight: 400;
        .cl-item {
          line-height: 15rem/36;
        }
      }
    }
  }
}
</style>
