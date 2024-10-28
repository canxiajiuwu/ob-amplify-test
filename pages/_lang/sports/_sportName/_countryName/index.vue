<template>
  <div class="cl-preMatchLeagues-wrap">
    <preMatchSoccerList
      :list="leagueList"
      :type="type"
      :is-request-failed="isRequestFailed"
      :request-loading="requestLoading"
    />
  </div>
</template>

<script>
import preMatchSoccerList from '@/components/components/preMatchSoccerList.vue'

export default {
  components: { preMatchSoccerList },
  data() {
    return {
      leagueList: [],
      type: 1,
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
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
        if (name === this.sportName) {
          return this.sportList[i].id
        }
      }
      return this.sportList[0].id
    }
  },
  mounted() {
    this.getLeague()
  },
  methods: {
    getLeague() {
      this.$axios_api
        .getTournament({
          sport_id: this.sportId,
          country_name: this.countryName
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.leagueList = res.data.result
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    }
  }
}
</script>

<style scoped lang="less"></style>
