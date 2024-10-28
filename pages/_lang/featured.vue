<template>
  <div class="cl-featuredMatch-wrap">
    <commonHeader />
    <rowTabs />
    <headBack
      :title="$t('homeMenu.Soccer') + '-' + $t('featuredMatch.title')"
      :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
    />

    <van-pull-refresh
      v-model="isLoading"
      :pulling-text="$t('pullRefresh.pull')"
      :loosing-text="$t('pullRefresh.pull')"
      :loading-text="$t('pullRefresh.loading')"
      @refresh="onRefresh"
    >
      <div class="cl-liveScrollBox">
        <dataError v-if="isRequestFailed" />
        <div v-else>
          <div v-if="requestLoading">
            <preMatchBox
              :result="result"
              v-if="result.length > 0"
              where="featured"
              event_name="_featured_match"
            />
            <dataNoResult v-else />
          </div>
        </div>
      </div>
    </van-pull-refresh>

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
      <FooterMenu />
    </client-only>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import Header from '@/components/components/Header.vue'
import rowTabs from '@/components/components/rowTabs.vue'
import FooterMenu from '@/components/components/FooterMenu.vue'
import preMatchBox from '@/components/components/preMatchBox.vue'
import headBack from '@/components/components/headBack.vue'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  components: {
    commonHeader: Header,
    rowTabs,
    FooterMenu,
    preMatchBox,
    InfiniteLoading,
    headBack
  },
  data() {
    return {
      result: [], // 循环结果
      page: 1, // 分页
      infiniteId: +new Date(),
      sport_id: 0, // 球类id
      isRequestFailed: false,
      requestLoading: false,
      isLoading: false // 下拉刷新
    }
  },
  computed: {
    platform() {
      return this.$store.state.platform
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    contestListRestore.call(this, 'Featured', ['page', 'result'])
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('featured', this.saveContestList)
  },
  destroyed() {
    // 销毁enter事件
    pubSub.unSubscribe('featured', this.saveContestList)
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.page = 1
      this.result = []
      this.infiniteId += 1
      this.isRequestFailed = false
      this.requestLoading = false
    },
    // 滚动方法
    onInfinite($state) {
      this.resultStatus = false
      this.getFeature($state)
    },
    // 获取featured比赛
    getFeature($state) {
      this.$axios_api
        .featuredMatchMore({
          page: this.page,
          platform: this.platform
        })
        .then((res) => {
          this.isLoading = false
          this.isRequestFailed = false
          this.requestLoading = true

          if (res.code === 0) {
            this.page++
            if ($state !== undefined) {
              res.data.data.length < 20 ? $state.complete() : $state.loaded()
            }

            // 循环数据
            if (this.resultStatus) this.result = res.data.data
            else this.result = this.result.concat(res.data.data)
          } else {
            // eslint-disable-next-line no-unused-expressions
            $state !== undefined ? $state.complete() : ''
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
          this.isLoading = false
        })
    },
    saveContestList() {
      contestListSave.call(
        this,
        ['page', 'result', 'pageScroll'],
        '.cl-featuredMatch-wrap'
      )
    }
  }
}
</script>

<style scoped lang="less">
.cl-featuredMatch-wrap {
  background-color: #fff;
  padding-bottom: 2.2rem;
  width: 100%;

  .cl-gameLoading {
    margin-bottom: 500rem/36;
  }

  .cl-liveScrollBox {
    border-top: 0.5/36rem solid #d4dae1;
    padding-bottom: 100rem/36;
  }
}
</style>
