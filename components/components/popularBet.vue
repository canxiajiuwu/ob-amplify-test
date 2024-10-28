<template>
  <div class="cl-popularBet-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('rowTabs.popular')"
        :middle-word-style="{
          fontSize: 15 / 36 + 'rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }"
      />
      <div class="cl-filter-wrap">
        <popularTabs
          :list="list"
          :list-index="listIndex"
          where="popular"
          @changeMatch="changeMatch"
        />

        <teamTitle :teams="teams" />
      </div>
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />
    <div class="cl-filter-wrap" />

    <div class="cl-matchBox">
      <van-pull-refresh
        v-model="isLoading"
        :pulling-text="$t('pullRefresh.pull')"
        :loosing-text="$t('pullRefresh.pull')"
        :loading-text="$t('pullRefresh.loading')"
        @refresh="onRefresh"
      >
        <span slot="loading" />
        <div class="cl-liveScrollBox">
          <dataError v-if="isRequestFailed" />
          <div v-else>
            <div v-if="requestLoading">
              <preMatchBox
                :key="infiniteId"
                event_name="popular"
                :match-id="matchId"
                :result="result"
                where="popular"
                v-if="result && result.length > 0"
              />
              <dataNoResult v-else />
            </div>
            <div class="cl-gameLoading" v-else>
              <dataLoading />
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
            <div class="cl-gameLoading" v-if="requestLoading">
              <dataLoading />
            </div>
          </span>
        </InfiniteLoading>
      </client-only>
    </div>
    <div style="height: calc(47rem / 36)" />
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import teamTitle from '@/components/components/teamTitle.vue'
import popularTabs from '@/components/components/popularTabs.vue'
import preMatchBox from '@/components/components/preMatchBox.vue'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  components: {
    headBack,
    InfiniteLoading,
    teamTitle,
    popularTabs,
    preMatchBox
  },
  data() {
    return {
      teams: ['1', 'X', '2'],
      // 循环结果
      result: [],
      // 数据储存
      database: {},
      // live Matches 数据
      listIndex: 0,
      // 球类id
      sport_id: 1,
      // 分页
      page: 1,
      infiniteId: +new Date(),
      isRequestFailed: false,
      requestLoading: false,
      // 下拉刷新
      isLoading: false
    }
  },
  computed: {
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    platform() {
      return this.$store.state.platform
    },
    list() {
      return this.$t('popularMatches')
    },
    matchId() {
      return this.list[this.listIndex].matchId
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    contestListRestore.call(this, 'Popular', ['page', 'listIndex', 'result'])
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('popular', this.saveContestList)
  },
  destroyed() {
    pubSub.unSubscribe('popular', this.saveContestList)
  },
  methods: {
    // 选择matches
    changeMatch(index) {
      // 初始化各tabs数据
      this.result = []
      this.listIndex = index
      this.teams = this.list[index].teams
      if (this.database[this.matchId] && this.database[this.matchId].result) {
        // 如果已经缓存过数据
        this.result = this.result.concat(this.database[this.matchId].result)
        this.page = this.database[this.matchId].page
      } else {
        // 初次请求数据
        this.page = 1
        this.isRequestFailed = false
        this.requestLoading = false
      }
      this.infiniteId += 1
    },
    // 下拉刷新
    onRefresh() {
      this.page = 1
      this.result = []
      this.database = {}
      this.infiniteId += 1
      this.isRequestFailed = false
      this.requestLoading = false
    },
    // 滚动方法
    onInfinite($state) {
      this.soccerPopular($state)
    },
    // 获取popular比赛
    soccerPopular($state) {
      this.$axios_api
        .soccerPopular({
          page: this.page,
          market_id: this.matchId,
          platform: this.platform
        })
        .then((res) => {
          this.isLoading = false
          this.isRequestFailed = false
          this.requestLoading = true

          if (res.code === 0) {
            this.page++
            if (!this.database[this.matchId]) this.database[this.matchId] = {}
            this.database[this.matchId].page = this.page
            this.database[this.matchId].result = this.result.concat(
              res.data.result
            )

            this.result = this.result.concat(res.data.result)
            // 数据是否加载完成
            if ($state !== undefined) {
              res.data.result.length < 30 ? $state.complete() : $state.loaded()
            }
          }
        })
        .catch((err) => {
          console.log(err)
          this.isRequestFailed = true
          this.requestLoading = true
          this.isLoading = false
        })
    },
    saveContestList() {
      contestListSave.call(
        this,
        ['page', 'listIndex', 'result', 'pageScroll'],
        '.cl-popular-wrap'
      )
    }
  }
}
</script>

<style scoped lang="less">
.cl-popularBet-wrap {
  min-height: 100vh;
  background-color: #fff;
  width: 100%;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
    .cl-backIcon {
      .sprite(@icon-black-long-back, 108rem);
    }
  }

  .cl-filter-wrap {
    min-height: 48rem/36;

    /deep/ .cl-teamTitle-wrap .cl-teams {
      padding-top: 7/36rem;
      padding-bottom: 2/36rem;
      height: auto;
    }
  }

  .cl-liveScrollBox {
    padding-bottom: 50rem/36;
  }
}
</style>
