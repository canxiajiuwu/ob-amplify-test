<template>
  <div class="cl-hottestTickets-wrap">
    <headBack
      :title="$t('hottestTickets.title')"
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }"
    />

    <div class="cl-content">
      <div class="cl-list">
        <dataError v-if="isRequestFailed" />
        <div v-else>
          <div v-if="requestLoading">
            <div v-if="result.length > 0">
              <div v-for="(a, b) in result" :key="b">
                <div class="cl-flexcc cl-item">
                  <hottestTicketsMatch
                    :label-list="labelList"
                    :data="a"
                    :data-index="b"
                    is-no-filter
                  />
                </div>
                <div style="height: calc(10rem / 36)" />
              </div>
            </div>
            <dataNoResult v-else />
          </div>
        </div>

        <client-only>
          <InfiniteLoading
            @infinite="onInfinite"
            :identifier="infiniteId"
            ref="infiniteLoading"
          >
            <span slot="no-more" />
            <span slot="no-results" />
            <span slot="spinner">
              <div class="cl-gameLoading">
                <dataLoading />
              </div>
            </span>
          </InfiniteLoading>
        </client-only>
      </div>
      <div class="cl-FooterMenuBox">
        <div :style="{ height: `calc(110rem/36 + ${footerDomHeight}px)` }" />
        <client-only>
          <FooterMenu />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import FooterMenu from '@/components/components/FooterMenu.vue'
import hottestTicketsMatch from '@/components/components/hottestTicketsMatch.vue'

export default {
  components: {
    headBack,
    FooterMenu,
    hottestTicketsMatch,
    InfiniteLoading
  },
  data() {
    return {
      // 数据容器
      result: [],
      // 类型  // 修改类型需要一起修改多语言配置和 hottestTicketsMatch 组件\单独修改 betslipHottestTickets 组件
      labelList: ['official', 'high', 'safe', 'simple', 'world-Cup'],
      // 页码
      page: 1,
      // 滚动组件所需属性
      infiniteId: +new Date(),
      isRequestFailed: 0,
      requestLoading: 0
    }
  },
  computed: {
    footerDomHeight() {
      return this.$store.state.footerDomHeight || 0
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 获取数据
    getData($state) {
      this.$axios_api
        .getHottestTickets({ min_odds: 1, max_odds: 'MAX', page: this.page })
        .then((res) => {
          this.isRequestFailed = 0
          this.requestLoading = 1
          if (res.code === 0) {
            this.page++
            // 数据是否加载完成
            if ($state !== undefined) {
              res.data.length < 10 ? $state.complete() : $state.loaded()
            }

            this.result = this.result.concat(res.data)
          } else {
            if ($state !== undefined) $state.complete()
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          }
        })
        .catch((err) => {
          console.log(err)
          this.isRequestFailed = 1
          this.requestLoading = 1
        })
    },
    // 滚动方法
    onInfinite($state) {
      this.getData($state)
    }
  }
}
</script>

<style scoped lang="less">
.cl-hottestTickets-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  .cl-gameLoading {
    margin-bottom: 500rem/36;
  }

  .cl-content {
    flex: 1;
    overflow-y: auto;
    .cl-list {
      padding-top: 10rem/36;
      padding-bottom: 30rem/36;
    }
  }
}
</style>
