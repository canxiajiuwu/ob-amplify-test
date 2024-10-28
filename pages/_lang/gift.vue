<template>
  <div class="cl-accountGift-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('accountGiftList.title1').toUpperCase()"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      >
        <NuxtLink no-prefetch :to="`/${locale}/giftHowToUse`">
          <h2 class="cl-h2 cl-howToUse" @click.prevent="goDetail">
            {{ $t('accountGiftList.how') }}
          </h2>
        </NuxtLink>
      </headBack>
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div
      class="cl-giftTitle"
      v-html="
        $t('accountGiftList.rem', {
          number: number,
          unit: $t('unit'),
          money: balance.toLocaleString()
        })
      "
    />
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
import accountGiftList from '@/components/components/accountGiftList.vue'
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
    locale() {
      return this.$store.state.root.locale
    }
  },
  mounted() {
    this.$prefetchRoutes(['giftHowToUse'])
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
      this.getGifts($state)
    },
    getGifts($state) {
      this.$axios_api
        .giftsValid({ token: this.token, page: this.page })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.page++
            this.number = res.data.number
            this.balance = res.data.balance
            this.giftList = [...this.giftList, ...res.data.list]
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
    color: #000;
  }
}
</style>
