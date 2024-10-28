<template>
  <div class="cl-accountGift-wrap">
    <div class="cl-topBox">
      <!-- path勿删,传值为空字符串 -->
      <headBack
        :title="$t('account.casinoGift').toUpperCase()"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      >
        <!-- <span class="cl-howToUse" @click="goDetail">{{ $t('accountGiftList.how') }}</span> -->
      </headBack>
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <!-- <div class="cl-giftTitle" v-html="$t('accountGiftList.rem', { number: number, unit: $t('unit'), money: balance.toLocaleString() })" /> -->
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <accountGiftList :gift-list="giftList" v-if="giftList.length > 0" />
        <dataNoResult v-else />
      </div>
    </div>
    <client-only>
      <InfiniteLoading @infinite="onInfinite" :identifier="infiniteId">
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
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import Lib from '@/assets/js/Lib'
import accountGiftList from '@/components/components/accountCasinoGiftList.vue'
import headBack from '@/components/components/headBack.vue'

export default {
  components: {
    accountGiftList,
    InfiniteLoading,
    headBack
  },
  data() {
    return {
      page: 1,
      infiniteId: 1,
      number: 0,
      balance: 0,
      giftList: [],
      isRequestFailed: false,
      requestLoading: false,
      isRequesting: false,
      giftView: true
    }
  },
  computed: {
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    // gamesConfigUrl游戏配置路径
    gamesConfigUrl() {
      return process.env.gamesConfigUrl
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
    // 前往gift how to use 页面
    goDetail() {
      Lib.common.event_statistics('account_gifts_how_to_use')
      this.$router.push({ path: `/${this.locale}/giftHowToUse` })
    },
    // 滚动方法
    onInfinite($state) {
      if (!this.isRequesting) this.getGifts($state)
    },
    // 游戏数据请求
    gamesConfigRequest() {
      return this.$axios_api
        .downloadApk({
          URL: `${this.gamesConfigUrl}game_cm.json?v=${new Date().getTime()}`
        })
        .then((res) => {
          if (res.data) {
            this.$store.commit('setGamesConfig', res.data)
          }
        })
    },
    async getGifts($state) {
      this.isRequesting = true
      if (!this.$store.getters.gameList.length) await this.gamesConfigRequest()
      this.$axios_api
        .saveCardCasinoGifts({ token: this.token, page: this.page })
        .then((res) => {
          this.isRequestFailed = false
          this.isRequesting = false
          this.requestLoading = true
          // console.log(this.$store.getters.gameList)
          if (res.code === 0) {
            this.page++
            this.giftList = this.giftList.concat(res.data)
          } else if (res.code === 10101) {
            // Lib.common.errorReminder(this.$t('reminder.unLogin'), this, 2)
            Lib.common.errorReminder(
              this,
              'login',
              '',
              '',
              this.$t('reminder.unLogin'),
              '',
              this.$t('reminder.button.ok')
            )
          }
          // 数据是否加载完成
          if ($state !== undefined) $state.complete()
        })
        .catch(() => {
          this.isRequestFailed = true
          this.isRequesting = false
          this.requestLoading = true
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-accountGift-wrap {
  min-height: 100vh;
  background-color: #fff;
  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }

  .cl-giftTitle {
    padding: 10rem/36 10rem/36 10rem/36;
    text-align: center;
  }

  .cl-howToUse {
    width: 90rem/36;
    margin-right: 10rem/36;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
}
</style>
