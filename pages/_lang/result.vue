<template>
  <div class="cl-result-wrap">
    <div class="cl-topBox">
      <headBack
        title="Result"
        :middle-word-style="{
          fontSize: 15 / 36 + 'rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />
    <resultSelect
      :date="date"
      :sport_name="sport_name"
      :country="country"
      :tournament_name="tournament_name"
      @openModal="openModal"
      @changeDate="changeDate"
    />

    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <resultList
          :result="result"
          :sport_name="sport_name"
          v-if="result.length > 0"
        />
        <dataNoResult v-else />
      </div>
      <div v-else>
        <dataLoading />
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
          <div class="cl-gameLoading" v-if="page !== 1">
            <dataLoading />
          </div>
        </span>
      </InfiniteLoading>
    </client-only>
    <resultModal
      v-if="isSelectModalShow"
      :model-type="modelType"
      :meta="meta"
      @closeModal="closeModal"
      @selectSport="selectSport"
      @selectCountry="selectCountry"
      @selectTournament="selectTournament"
    />
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import resultList from '@/components/components/resultList.vue'
import resultModal from '@/components/components/resultModal.vue'
import resultSelect from '@/components/components/resultSelect.vue'

export default {
  name: 'Result',
  components: {
    headBack,
    resultList,
    resultModal,
    resultSelect,
    InfiniteLoading
  },
  data() {
    return {
      isSelectModalShow: false, // 弹出框是否显示
      modelType: 0, // 弹出框筛选内容: 0 sports 1 country 2 tournament
      date: '', // 筛选日期
      sport_id: 1, // 球类id
      sport_name: this.$t('result.sport_name'), // 球类名称
      country: 'all', // 国家名称
      tournament_id: 0, // 联赛id
      tournament_name: this.$t('result.tournament_name'), // 联赛名称
      meta: null, // meta信息
      result: [], // 比分查询循环体
      page: 1,
      infiniteId: +new Date(),
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    sportList() {
      return this.$root.sportList
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  beforeMount() {
    this.date = this.getDate(new Date().getTime() / 1000, 'dd/MM/yyyy')
  },
  mounted() {
    // this.getResult()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 滚动方法
    onInfinite($state) {
      this.getResult($state)
    },
    // 获取比赛结果数据
    getResult($state) {
      this.$axios_api
        .matchResults({
          page: this.page,
          date: this.date,
          sport_id: this.sport_id,
          country: this.country,
          tournament_id: this.tournament_id
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.page++
            this.meta = res.data.meta
            this.result = this.result.concat(res.data.result)

            // 数据是否加载完成
            if ($state !== undefined) {
              if (res.data.result.length < 20) $state.complete()
              else $state.loaded()
            }
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 打开model
    openModal(index) {
      this.isSelectModalShow = true
      this.modelType = index
    },
    closeModal() {
      this.isSelectModalShow = false
    },
    // 修改日期
    changeDate(index) {
      if (index === 0) this.date = this.meta.yesterday
      else this.date = this.meta.tomorrow

      this.isRequestFailed = false
      this.requestLoading = false
      this.page = 1
      this.infiniteId += 1
      this.result = []
      // this.getResult()
    },
    // 球类筛选
    selectSport(item) {
      this.closeModal()
      this.sport_id = item.id
      this.sport_name = item.name
      this.country = 'all'
      this.tournament_id = 0
      this.tournament_name = this.$t('result.tournament_name')
      this.isRequestFailed = false
      this.requestLoading = false
      this.page = 1
      this.infiniteId += 1
      this.result = []
      // this.getResult()
    },
    // 国家筛选
    selectCountry(item) {
      this.closeModal()
      this.country = item
      this.tournament_id = 0
      this.tournament_name = this.$t('result.tournament_name')
      this.isRequestFailed = false
      this.requestLoading = false
      this.page = 1
      this.infiniteId += 1
      this.result = []
      // this.getResult()
    },
    // 联赛筛选
    selectTournament(item) {
      this.closeModal()
      this.tournament_id = item.id
      this.tournament_name = item.name
      this.isRequestFailed = false
      this.requestLoading = false
      this.page = 1
      this.infiniteId += 1
      this.result = []
      // this.getResult()
    }
  }
}
</script>

<style scoped lang="less">
.cl-result-wrap {
  width: 10rem;
  min-height: 100vh;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }
}
</style>
