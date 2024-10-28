<template>
  <div v-if="loading">
    <Loading />
  </div>
</template>

<script>
import Loading from '@/components/components/loading.vue'
export default {
  components: {
    Loading
  },
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>
