<template>
  <div class="cl-preMatchSoccer-wrap">
    <dataError v-if="isRequestFailed" />
    <div v-else>
      <div v-if="requestLoading">
        <preMatchBox
          :result="result"
          :meta="meta"
          where="leagueName"
          v-if="result.length > 0"
          :event_name="event_name"
        />
        <dataNoResult v-else />
      </div>
      <dataLoading v-else />
    </div>
  </div>
</template>

<script>
import preMatchBox from '@/components/components/preMatchBox.vue'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  components: { preMatchBox },
  data() {
    return {
      result: [],
      meta: null,
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    sportName() {
      return this.$route.params.sportName.toLowerCase()
    },
    countryName() {
      return this.$route.params.countryName
    },
    leagueName() {
      return this.$route.params.leagueName
    },
    leagueId() {
      return this.$route.params.leagueId
    },
    sportList() {
      return this.$store.state.root.sportList
    },
    // 获取sportId
    sportId() {
      for (let i = 0; i < this.sportList.length; i++) {
        const name = this.sportList[i].name.replace(' ', '').toLowerCase()
        if (name === this.sportName) return this.sportList[i].id
      }
      return this.sportList[0].id
    },
    event_name() {
      return `_${this.sportName}_list`
    }
  },
  mounted() {
    contestListRestore.call(this, 'LeagueName', ['result', 'meta'])
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('leagueName', this.saveContestList)
    if (this.result.length === 0) {
      this.getPreMatch()
    }
  },
  destroyed() {
    pubSub.unSubscribe('leagueName', this.saveContestList)
  },
  methods: {
    getPreMatch() {
      this.$axios_api
        .getMatch({
          sport_id: this.sportId,
          tournament_id: this.leagueId
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.result = res.data.result
            this.meta = res.data.meta
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    saveContestList() {
      contestListSave.call(
        this,
        ['result', 'meta', 'pageScroll'],
        '.cl-soccerCountry-wrap'
      )
    }
  }
}
</script>

<style scoped lang="less">
.cl-preMatchSoccer-wrap {
  border-top: 0.5/36rem solid #d4dae1;
}
</style>
