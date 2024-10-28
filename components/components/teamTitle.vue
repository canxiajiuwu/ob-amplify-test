<template>
  <div class="cl-teamTitle-wrap" v-if="teams.length > 0">
    <div
      class="cl-flexcs cl-bsbb cl-teams"
      :class="{ 'cl-teamsLive': where === 'live' }"
    >
      <div class="cl-left">{{ $t('teamTitle.teams') }}</div>
      <div class="cl-flexcb cl-right" :class="{ 'cl-live': live }">
        <div
          class="cl-flexcc cl-item"
          v-for="(item, index) in teams"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teams: {
      type: Array
    },
    live: {
      type: Boolean
    },
    where: {
      type: String
    }
  }
}
</script>

<style scoped lang="less">
.cl-teamTitle-wrap {
  background-color: #fff;
  margin-top: -1rem/24;
  .cl-teams {
    padding: 0 10rem/36;
    font-size: 10rem/36;
    //height: 18rem/36;
    color: #b6b6cc;
    font-weight: bold;

    .cl-left {
      width: 42rem/36;
    }

    .cl-right {
      margin-left: 108rem/36;
      width: 190rem/36;

      > div {
        flex: 1;
      }

      &.cl-live {
        margin-left: 138rem/36;
        width: 160rem/36;
      }
    }
  }

  .cl-teamsLive {
    background-color: #1c2029;
    color: #827573;
    border-top: 0.5rem/36 solid #403e3d;
  }
}
</style>
