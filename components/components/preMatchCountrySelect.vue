<template>
  <div class="cl-flexcs cl-preMatchCountrySelect-wrap">
    <div class="cl-flexcc cl-content" @click="goBackCountry">
      <div class="cl-name">{{ country_name + ' - ' + tournament_name }}</div>
      <div class="cl-close" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['tournament_name', 'country_name'],
  methods: {
    goBackCountry() {
      this.$emit('clearTournament')
    }
  }
}
</script>

<style scoped lang="less">
.cl-preMatchCountrySelect-wrap {
  background-color: #fff;
  padding: 7rem/36 12rem/36;

  .cl-content {
    font-size: 9rem/36;
    line-height: 9rem/36;
    height: 23rem/36;
    padding: 0 10rem/36;
    background-color: #f2f2f4;
    border-radius: 12rem/36;
    white-space: nowrap;
    color: #333;

    .cl-close {
      width: 9rem/36;
      margin-left: 6rem/36;
      .sprite(@icon-close,90rem);
    }
  }
}
</style>
