<template>
  <nuxt-img
    :src="src"
    :format="format"
    :quality="quality"
    :preload="preload"
    :alt="alt"
  />
</template>

<script>
export default {
  name: 'Nuxtimg',
  props: {
    src: {
      type: String
    },
    format: {
      type: String,
      default: 'webp'
    },
    quality: {
      type: String,
      default: '80'
    },
    preload: {
      default: undefined
    },
    alt: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
