<template>
  <div class="cl-preMatchCountry-wrap">
    <!-- 面包屑 -->
    <preMatchSoccerList
      :list="countryList"
      :type="type"
      :is-request-failed="isRequestFailed"
      :request-loading="requestLoading"
    />
  </div>
</template>

<script>
import preMatchSoccerList from '@/components/components/preMatchSoccerList.vue'

export default {
  name: 'PreMatchCountry',
  components: {
    preMatchSoccerList
  },
  data() {
    return {
      countryList: [],
      type: 0,
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    sportList() {
      return this.$store.state.root.sportList
    },
    sportName() {
      return this.$route.params.sportName
    },
    // 获取sportId
    sportId() {
      for (let i = 0; i < this.sportList.length; i++) {
        const name = this.sportList[i].name.replace(' ', '').toLowerCase()
        if (this.sportName) {
          if (name === this.sportName.toLowerCase()) {
            return this.sportList[i].id
          }
        } else {
          return 0
        }
      }
      return 0
    }
  },
  mounted() {
    this.getCountry()
  },
  methods: {
    // 获取国家列表
    getCountry() {
      this.$axios_api
        .getCountry({
          sport_id: this.sportId
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.countryList = res.data.result
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
