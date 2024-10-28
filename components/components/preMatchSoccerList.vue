<template>
  <div class="cl-preMatchSoccerList-wrap">
    <div class="cl-listBox">
      <div v-if="requestLoading">
        <div class="cl-list" v-if="list.length > 0">
          <div
            class="cl-item cl-flexcb"
            v-for="(item, index) in list"
            :key="index"
            @click="goLeague(item)"
          >
            <div class="cl-name" v-if="type === 0">
              {{ item.country_name }}
            </div>
            <div class="cl-name" v-else-if="type === 1">
              {{ item.tournament_name }}
            </div>
            <div class="cl-more" />
          </div>
        </div>
        <dataNoResult v-else />
      </div>
      <dataLoading v-else />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
    type: {
      type: Number
    },
    requestLoading: {
      type: Boolean
    },
    isRequestFailed: {
      type: Boolean
    }
  },
  computed: {
    sportName() {
      return this.$route.params.sportName
    }
  },
  methods: {
    // 前往联赛列表
    goLeague(item) {
      if (this.type === 0) {
        this.$router.push({
          path: `/${this.$store.state.root.locale}/sports/${this.sportName}/${item.country_name}`
        })
      } else if (this.type === 1) {
        this.$router.push({
          path: `/${this.$store.state.root.locale}/sports/${this.sportName}/${item.country_name}/${item.tournament_id}/${item.tournament_name}`
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-preMatchSoccerList-wrap {
  width: 10rem;
  box-sizing: border-box;

  .cl-listBox {
    border-top: 0.5/36rem solid #d4dae1;
    padding: 10/36rem 10/36rem 0 13/36rem;
    box-sizing: border-box;

    .cl-list {
      .cl-item {
        height: 37rem/36;
        border-radius: 3rem/36;
        background-color: #ebeef9;
        margin-bottom: 7rem/36;
        box-sizing: border-box;
        padding: 0 10rem/36;
        color: #000;
        font-size: 11/36rem;
        font-weight: bold;

        .cl-more {
          transform: rotate(180deg);
          .sprite(@icon-back, 94rem);
        }
      }
    }
  }
}
</style>
