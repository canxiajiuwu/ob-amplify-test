<template>
  <div class="cl-search-wrap">
    <div class="cl-width">
      <div class="cl-heightDom" :style="{ height: safeAreaTop + 'px' }" />
      <div class="cl-height" />
      <div class="cl-flexcb cl-tabs">
        <div class="cl-right">
          <div class="cl-icon" />
          <input
            type="text"
            :placeholder="$t('search.placeholder')"
            v-model.trim="keywords"
            @input="inputChange"
          />
          <div
            v-show="keywords || max_odds"
            class="cl-deleteIcon"
            @click="clearSearchInit"
          />
        </div>
        <NuxtLink no-prefetch class="cl-flexcc" :to="`/${locale}`">
          <div class="cl-deleteBox" @click.prevent="clear" />
        </NuxtLink>
      </div>
      <div class="cl-search">
        <div class="cl-height" />
        <div class="cl-search-term">
          {{ $t('search.search') }}
          <span style="color: #4c50fa">
            <span
              >{{ $t('matchDetailInbox.markets') }} -
              {{ marketsList[marketIndex].name }}</span
            >
            <span v-show="max_odds">,odds≤{{ max_odds }}</span>
          </span>
        </div>
      </div>
      <div class="cl-height" />
      <div class="cl-height" />

      <div v-if="result.length === 0 && beforeRequest">
        <div v-if="historyList.length">
          <div class="cl-flexcb">
            <h2 class="cl-h2" style="font-weight: bold">
              {{ $t('search.history') }}
            </h2>
            <div class="cl-searchDelete" @click="searchDelete" />
          </div>
          <div class="cl-height1" />
          <div class="cl-List">
            <div
              class="cl-Info"
              v-for="(item, index) in historyList"
              :key="index"
              @click="searchTrigger(item, '')"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="cl-height1" />
        <div>
          <h2 class="cl-h2" style="font-weight: bold">
            {{ $t('search.popular') }}
          </h2>
          <div class="cl-height1" />
          <div class="cl-List">
            <div
              class="cl-PopularOdds cl-Info"
              v-for="(item, index) in PopularOddsList"
              :key="index"
              @click="searchTrigger('', item)"
            >
              {{ '≤' + item }}
            </div>
          </div>
        </div>

        <div>
          <h2 class="cl-h2" style="font-weight: bold">
            {{ $t('matchDetailInbox.markets') }}
          </h2>
          <div class="cl-height1" />
          <div class="cl-List">
            <div
              class="cl-Info"
              :class="{ 'cl-selected': marketIndex === index }"
              v-for="(item, index) in marketsList"
              :key="index"
              @click="searchTrigger('', '', index)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>

        <div v-if="hotSearchesList.length">
          <div class="cl-height1" />
          <h2 class="cl-h2" style="font-weight: bold">
            {{ $t('search.hot') }}
          </h2>
          <div class="cl-height1" />
          <div class="cl-List">
            <div
              class="cl-Info"
              v-for="(item, index) in hotSearchesList"
              :key="index"
              @click="searchTrigger(item, '')"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <div class="cl-height" />
      </div>
    </div>
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <preMatchBox
          :result="result"
          :max_odds="max_odds"
          v-if="result.length > 0 || beforeRequest"
          where="search"
          event_name="_search"
          :market-id="marketsList[marketIndex].id"
        />
        <dataNoResult v-if="!(result.length > 0 || beforeRequest)" />
      </div>
      <dataLoading v-else />
    </div>
    <client-only>
      <InfiniteLoading @infinite="onInfinite" :identifier="infiniteId">
        <span slot="no-more" />
        <span slot="no-results" />
        <span slot="spinner" />
      </InfiniteLoading>
    </client-only>

    <div v-if="requestLoading && !(result.length > 0 || beforeRequest)">
      <div class="cl-height cl-interval" />
      <div class="cl-width">
        <div class="cl-height" />
        <div class="cl-flexcs">
          <div class="cl-hot" />
          <div style="font-weight: bold">{{ $t('featuredMatch.title') }}</div>
        </div>
        <preMatchBox :result="featureList" where="search" />
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import preMatchBox from '@/components/components/preMatchBox.vue'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  name: '',
  components: {
    preMatchBox,
    InfiniteLoading
  },
  data() {
    return {
      historyList: [],
      hotSearchesList: [],
      featureList: [],
      PopularOddsList: ['1.20', '1.50', '1.80', '2.00'],
      marketsList: [
        { name: '1x2', id: 1 },
        { name: 'Over/Under', id: 18 },
        { name: 'Double chance', id: 10 },
        { name: 'Both teams to score', id: 29 },
        { name: '1st half - total', id: 68 },
        { name: '1st half - 1x2', id: 60 }
      ],
      keywords: '',
      oldKeywords: '',
      max_odds: '',
      marketIndex: 0,
      page: 1,
      infiniteId: +new Date(),
      result: [],
      isRequestFailed: false,
      requestLoading: true,
      // 搜索前控制
      beforeRequest: true
    }
  },
  computed: {
    searchText() {
      return this.$route.query.searchText
    },
    inputDebounce() {
      return Lib.common.deBounce(this.inputEvent, 2000)
    },
    winApp() {
      return window.appInteraction
    },
    isNewApp() {
      return Lib.store.get('isNewApp')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    this.getHistoryList()
    this.getHotSearches()
    if (this.searchText) {
      this.keywords = this.searchText
    }

    // 绑定enter事件
    this.enterKeyup()

    // 删除事件监听
    window.addEventListener('searchDelete', this.clearHistory)

    contestListRestore.call(
      this,
      'Search',
      ['page', 'marketIndex', 'keywords', 'max_odds', 'featureList', 'result'],
      [],
      '.cl-search-wrap'
    )
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('search', this.saveContestList)

    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed()
    window.removeEventListener('searchDelete', this.clearHistory)
    pubSub.unSubscribe('search', this.saveContestList)
  },
  methods: {
    // 搜索判断
    search() {
      if (this.keywords || this.max_odds) {
        this.searchInit()
      } else {
        this.clearSearchInit()
        Lib.common.errorReminderUp(this, true, this.$t('reminder.search'), 0)
      }
    },
    // 搜索内容触发
    searchTrigger(keywords, max_odds, marketIndex) {
      Lib.common.event_statistics(`search_context`, `${keywords || max_odds}`)
      if (keywords) this.keywords = keywords
      if (max_odds) this.max_odds = max_odds
      if (marketIndex) this.marketIndex = marketIndex
      // epl特殊处理
      if (this.keywords === 'EPL') this.keywords = 'England - Premier League'

      // 进行搜索判断
      if (keywords || max_odds) this.search()
    },
    // 清空搜索数据初始化
    clearSearchInit() {
      this.page = 1
      this.result = []
      this.beforeRequest = true
      this.keywords = ''
      this.max_odds = ''
      this.marketIndex = 0
    },
    // 搜索初始化
    searchInit() {
      this.page = 1
      this.result = []
      this.infiniteId++
      this.isRequestFailed = false
      this.requestLoading = false
      this.beforeRequest = false
    },
    // 搜索框输入事件
    inputChange() {
      this.inputDebounce()
    },
    inputEvent() {
      if (
        !(
          this.keywords === '' ||
          (this.keywords === this.oldKeywords && this.oldKeywords)
        )
      ) {
        this.oldKeywords = this.keywords
        this.getHistoryList(this.keywords)
        this.search()
      }
    },
    clear() {
      this.isNewApp ? Lib.common.activityBack(this) : this.$router.back()
    },
    // 滚动方法
    onInfinite($state) {
      this.getSearchData($state)
    },
    // 根据搜索类型传输不一样的参数进行搜索
    getSearchData($state) {
      let name = `search`
      if (this.keywords) {
        name += '_keywords'
      }
      if (this.max_odds) {
        name += '_maxOdds'
      }
      if (this.keywords || this.max_odds) {
        Lib.common.event_statistics(name, this.marketsList[this.marketIndex].id)
        this.confirmGetSearchData($state)
      }
    },
    // 进行搜索
    confirmGetSearchData($state) {
      const obj = {
        page: this.page,
        market_id: this.marketsList[this.marketIndex].id
      }
      if (this.keywords) obj.keywords = this.keywords
      if (this.max_odds) obj.max_odds = this.max_odds
      this.$axios_api
        .search(obj)
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          this.beforeRequest = false
          if (res.code === 0) {
            this.page++
            if ($state !== undefined) {
              res.data.result.length < 10 ? $state.complete() : $state.loaded()
            }
            // 循环数据
            this.result = this.result.concat(res.data.result)
            if (!this.featureList.length) this.getFeaturedMatch()
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // enter键监控
    enterKey(event) {
      const code = event.keyCode
        ? event.keyCode
        : event.which
        ? event.which
        : event.charCode
      if (code == 13) {
        this.getHistoryList(this.keywords)
        this.inputEvent()
      }
    },
    enterKeyupDestroyed() {
      document.removeEventListener('keyup', this.enterKey)
    },
    enterKeyup() {
      document.addEventListener('keyup', this.enterKey)
    },
    // 获取本地历史搜索记录
    getHistoryList(str = '') {
      let list = []

      list = Lib.store.get('onebetHistoryInfo')
      let arr = []
      if (list) {
        if (str) {
          list.push(str)
          arr = [...new Set([...list])]
          // eslint-disable-next-line no-unused-expressions
          arr.length > 3 ? arr.shift() : null
          Lib.store.set('onebetHistoryInfo', arr)
        } else arr = list
      } else if (str) {
        arr.push(str)
        Lib.store.set('onebetHistoryInfo', arr)
      } else Lib.store.set('onebetHistoryInfo', arr)
      this.historyList = arr
    },
    // 清空历史记录
    clearHistory() {
      Lib.store.remove('onebetHistoryInfo')
      Lib.common.event_statistics(`search_clear_history`)

      this.getHistoryList()
    },
    // 获取热门搜索词
    getHotSearches() {
      const hotSearches = Lib.store.get('onebetHotSearches')
      const List = hotSearches && hotSearches.list
      if (List && List.length) {
        const date = new Date().getDate()
        if (date === hotSearches.date) this.hotSearchesList = List
        else this.getHotSearchesReq()
      } else {
        this.getHotSearchesReq()
      }
    },
    getHotSearchesReq() {
      this.$axios_api.getHwords({}).then((res) => {
        if (res.code === 0) {
          this.hotSearchesList = res.data.words
          Lib.store.set('onebetHotSearches', {
            date: new Date().getDate(),
            list: res.data.words
          })
        }
      })
    },
    // 获取热门推荐
    getFeaturedMatch() {
      this.$axios_api.featuredMatchHome({}).then((res) => {
        if (res.code === 0) this.featureList = res.data.data
      })
    },
    // 搜索删除确认
    searchDelete() {
      Lib.common.errorReminder(
        this,
        'searchDelete',
        '',
        '',
        this.$t('search.delete'),
        this.$t('uefaToday.confirm'),
        this.$t('sharePoster.cancel')
      )
    },
    saveContestList() {
      contestListSave.call(
        this,
        [
          'page',
          'marketIndex',
          'keywords',
          'max_odds',
          'featureList',
          'result',
          'pageScroll'
        ],
        '.cl-width'
      )
    }
  }
}
</script>

<style scoped lang="less">
.cl-search-wrap {
  height: 100vh;
  background-color: #fff;
  overflow: auto;
  .cl-width {
    width: 340rem/36;
    margin: 0 auto;
  }
  .cl-height {
    height: 12rem/36;
  }
  .cl-height1 {
    height: 8rem/36;
  }
  .cl-interval {
    background-color: rgb(245, 245, 245);
  }
  .cl-search-term {
    text-align: center;
    font-weight: bold;
  }
  .cl-tabs {
    height: 40rem/36;
    .cl-right {
      height: 40rem/36;
      padding: 0 15rem/36;
      width: 311rem/36;
      display: flex;
      align-items: center;
      border-radius: 40rem/36;
      box-sizing: border-box;
      background-color: rgb(245, 245, 245);
      .cl-deleteIcon {
        .sprite(@menu-clear, 108rem);
      }
    }
    input {
      outline: none;
      border: none;
      width: 250rem/36;
      height: 40rem/36;
      padding: 0;
      background-color: rgb(245, 245, 245);
    }

    input::placeholder {
      font-size: 11rem/36;
      color: #a2a2a7;
    }

    .cl-icon {
      margin-right: 0.2rem;
      .sprite(@icon-search-page-search, 108rem);
    }
  }
  .cl-List {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .cl-Info {
      padding: 10rem/36;
      box-sizing: border-box;
      border: 0.01rem solid #d4dae1;
      border-radius: 3rem/36;
      margin-right: 10rem/36;
      margin-bottom: 10rem/36;
      color: #000;

      &.cl-selected {
        background-color: #fcdb06;
      }
    }
    .cl-PopularOdds {
      text-align: center;
      width: 67rem/36;
    }
  }
  .cl-deleteBox {
    .sprite(@icon-close-black, 94rem);
  }
  .cl-searchDelete {
    .sprite(@icon-search-delete, 108rem);
  }
  .cl-historyDeletePopup {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.5);
    .cl-historyConfirmBox {
      position: absolute;
      left: 10%;
      top: 30%;
      height: 3rem;
      width: 80%;
      z-index: 4;
      background-color: #fff;
      border: 0.01rem solid black;
      .cl-info {
        text-align: center;
      }
      .cl-button {
        padding: 0.2rem 0.5rem;
        background-color: #fff;
        border: 0.01rem solid rgb(180, 180, 180);
      }
      .cl-button:active {
        background-color: rgba(240, 240, 240, 0.5);
      }
    }
  }
}
.cl-hot {
  margin-right: 0.1rem;
  .sprite(@icon-hot, 108rem);
}
</style>
