export const headMixins = {
  head() {
    return { ...this.$store.state.seo_head }
  }
}
