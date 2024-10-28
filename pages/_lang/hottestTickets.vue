<template>
  <div class="cl-hottestTickets-wrap">
    <headBack :bgcolor="mainStyle.mainThemeColor" color="#fff" is-white-back>
      <template>
        <div class="cl-flexcc cl-topRight">
          <h3
            class="cl-h3 cl-reward"
            @click="goWhere('/hottestTicketsReward', 'reward')"
          >
            {{ $t('hottestTickets.Reward') }}
          </h3>
          <h3
            class="cl-h3 cl-rules"
            @click="goWhere('/hottestTicketsRules', 'rules')"
          >
            {{ $t('hottestTickets.Rules') }}
          </h3>
        </div>
      </template>
    </headBack>

    <div class="cl-content">
      <div class="cl-banner">
        <div class="cl-cropBox">
          <nuxtimg
            class="cl-bgimg"
            src="/images/hottestTickets/bg.png"
            alt="onebet | hottestTickets"
          />
        </div>
        <div class="cl-box">
          <h2 class="cl-flexcc cl-h2 cl-title cl-firstTitle">
            {{ $t('hottestTickets.title') }}
          </h2>
          <div style="height: calc(7rem / 36)" />
          <h2 class="cl-flexcc cl-h2 cl-title cl-secondTitle">
            <span class="cl-money">{{ $t('hottestTickets.bigCake[0]') }}</span>
            <span>{{ $t('hottestTickets.bigCake[1]') }}</span>
          </h2>
          <div style="height: calc(10rem / 36)" />
          <div class="cl-flexca cl-icons">
            <div
              v-for="(item, index) in $t('hottestTickets.bgList')"
              :key="index"
            >
              <div class="cl-bgListItem">
                <div
                  class="cl-bgListItemIcon"
                  :class="`no-bgListIcon${index}`"
                />
                <div>{{ item }}</div>
              </div>
            </div>
          </div>
          <div
            class="cl-flexcc cl-button"
            @click="goWhere('/mybet', 'share_bet_now')"
          >
            <h3 class="cl-h3">{{ $t('hottestTickets.button') }}</h3>
            <div class="cl-shareIcon" />
          </div>
        </div>
      </div>

      <div class="cl-flexcb cl-searchBox">
        <div class="cl-filterBox">
          <globalFilter
            @valueChange="valueChange"
            :odds-list="oddsList"
            :label-list="labelList"
            :min-odds.sync="minOdds"
            :max-odds.sync="maxOdds"
            :check-label.sync="checkLabel"
          />
        </div>
        <div class="cl-flexcb cl-search">
          <input
            class="cl-input"
            :placeholder="UpperCase($t('hottestTickets.loadCode'))"
            v-model="searchValue"
            @keyup.enter="search"
          />
          <div class="cl-searchIcon" @click="search" />
        </div>
      </div>

      <div class="cl-list">
        <dataError v-if="isRequestFailed" />
        <div v-else>
          <div v-if="requestLoading">
            <div v-if="result.length > 0">
              <div v-for="(item, index) in result" :key="index">
                <div class="cl-flexcc cl-item">
                  <hottestTicketsMatch
                    :label-list="labelList"
                    :data="item"
                    :data-index="index"
                    :is-no-filter="isNoFilter"
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
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import hottestTicketsMatch from '@/components/components/hottestTicketsMatch.vue'

export default {
  components: {
    headBack,
    hottestTicketsMatch,
    InfiniteLoading
  },
  data() {
    return {
      // 数据容器
      result: [],
      // 倍率
      oddsList: [1, 2, 5, 10, 20, 50, 100, 200, 'MAX'],
      // 类型  // 修改类型需要一起修改多语言配置和 hottestTicketsMatch 组件\单独修改 betslipHottestTickets 组件
      labelList: ['official', 'high', 'safe', 'simple', 'world-Cup'],
      // 搜素
      searchValue: '',
      // 最低赔率(下标)
      minOdds: 0,
      // 最高赔率(下标)
      maxOdds: 8,
      // 选中的标签
      checkLabel: null,
      // 页码
      page: 1,
      // 滚动组件所需属性
      infiniteId: +new Date(),
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    mainStyle() {
      return { ...Lib.common.jsStyleData }
    },
    STATICURL() {
      return process.env.STATICURL
    },
    info() {
      return this.$store.state.info
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    isNoFilter() {
      if (this.minOdds !== 0) return false
      if (this.maxOdds !== this.oddsList.length - 1) return false
      if (this.searchValue !== '') return false
      if (this.checkLabel !== null) return false
      return true
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 跳转页面
    goWhere(path, gaName) {
      Lib.common.event_statistics(`hottest_tickets_${gaName}`)
      if (path === '/mybet') {
        this.$router.replace({
          path: `/${this.locale}/mybet`,
          params: { from: 'hottestTickets' }
        })
        return
      }
      if (path) {
        this.$router.push({ path: `/${this.locale}` + path })
      }
    },
    // 获取数据
    getData($state) {
      const obj = {}
      if (this.minOdds !== 0) obj.min_odds = this.oddsList[this.minOdds]
      if (this.maxOdds !== this.oddsList.length - 1)
        obj.max_odds = this.oddsList[this.maxOdds]
      if (this.searchValue !== '') obj.search = this.searchValue
      if (this.checkLabel !== null) obj.label = this.checkLabel + 1
      obj.page = this.page
      this.$axios_api
        .getHottestTickets(obj)
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
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
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 滚动方法
    onInfinite($state) {
      this.getData($state)
    },
    // 用户进行搜索
    search() {
      if (this.searchValue === '') return
      Lib.common.event_statistics(`hottest_tickets_search`)
      this.resetData()
    },
    // 更改了数据
    valueChange(data) {
      // 有0存在不可以简写
      if (data.minOdds !== undefined) this.minOdds = data.minOdds
      if (data.maxOdds !== undefined) this.maxOdds = data.maxOdds
      if (data.checkLabel !== undefined) this.checkLabel = data.checkLabel
      this.resetData()
    },
    // 重新加载数据
    resetData() {
      this.page = 1
      this.result = []
      this.isRequestFailed = false
      this.requestLoading = false
      this.infiniteId += 1
    },
    // 首字母大写
    UpperCase(item) {
      return Lib.common.UpperCase(item)
    }
  }
}
</script>

<style scoped lang="less">
.cl-hottestTickets-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f6f6f6;

  .cl-gameLoading {
    margin-bottom: 500rem/36;
  }

  .cl-topRight {
    font-size: 10rem/36;
    font-weight: bold;
    color: #fff;

    .cl-reward {
      padding-right: 10rem/36;
      border-right: 1rem/36 solid #fff;
    }

    .cl-rules {
      margin: 0 10rem/36;
    }
  }

  .cl-content {
    flex: 1;
    overflow: auto;

    .cl-banner {
      position: relative;

      .cl-cropBox {
        position: relative;
        height: 175rem/36;
        overflow: hidden;

        .cl-bgimg {
          position: absolute;
          bottom: 0;
          width: 10rem;
        }
      }

      .cl-box {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;

        .cl-title {
          font-size: 15rem/36;
          font-weight: 800;
          color: #fff;
          white-space: nowrap;

          .cl-money {
            margin-right: 5rem/36;
            color: #ffea05;
          }
        }

        .cl-button {
          white-space: nowrap;
          padding: 0 10rem/36;
          height: 30rem/36;
          border-radius: 17rem/36;
          background-color: #fff;
          font-size: 12rem/36;
          font-weight: 800;
          color: @mainThemeColor;
          position: absolute;
          bottom: 10rem/36;
          left: 50%;
          transform: translate(-50%, 0);

          .cl-shareIcon {
            margin-left: 5rem/36;
            .sprite(@icon-4c50fa-right, 108rem);
          }
        }

        .cl-button:active {
          background-color: rgba(255, 255, 255, 0.8);
        }
      }

      .cl-icons {
        > div {
          flex: 1;
        }
        .cl-bgListItem {
          text-align: center;
          font-size: 10rem/36;
          font-weight: 400;
          color: #fff;

          .cl-bgListItemIcon {
            margin: 0 auto;
          }

          .no-bgListIcon0 {
            .sprite(@icon-daily-top3, 108rem);
          }

          .no-bgListIcon1 {
            .sprite(@icon-weekly-top10, 108rem);
          }

          .no-bgListIcon2 {
            .sprite(@icon-50-stake-refund, 108rem);
          }
        }
      }
    }

    .cl-searchBox {
      padding: 10rem/36 0;
      background-color: #fff;
      position: sticky;
      top: 0;
      z-index: 1;
      box-shadow: 0 3rem/36 10rem/36 0 rgba(0, 0, 0, 0.2);

      .cl-filterBox {
        flex: 1;
      }

      .cl-search {
        height: 23rem/36;
        border-radius: 11rem/36;
        overflow: hidden;
        background-color: #f2f2f4;
        margin-right: 10rem/36;

        .cl-input {
          height: 23rem/36;
          border: none;
          padding: 0;
          margin-left: 10rem/36;
          background-color: #f2f2f4;
          font-size: 11rem/36;
          font-weight: 400;
        }

        .input::placeholder {
          font-size: 11rem/36;
          color: #a2a2a7;
        }

        .cl-searchIcon {
          margin-right: 7rem/36;
          .sprite(@icon-search-page-search, 132rem);
        }
      }
    }

    .cl-list {
      background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 6%, #f6f6f6 100%);
      padding-top: 10rem/36;
      padding-bottom: 30rem/36;
    }
  }
}
</style>
