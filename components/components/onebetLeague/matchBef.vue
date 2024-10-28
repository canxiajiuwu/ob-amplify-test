<template>
  <div class="cl-matchBef-wrap">
    <div style="height: calc(7rem / 36)" />
    <teamTitle :teams="teams" />
    <div
      class="cl-flexcb cl-item"
      v-for="item in matchBase"
      :key="item.match_id"
    >
      <div class="cl-left">
        <div class="cl-flexcs cl-team cl-home" v-if="item.home_name">
          <div class="cl-icon" :class="`no-icon${item.home_name.icon}`" />
          <div class="cl-oneLine cl-name">{{ item.home_name.name }}</div>
        </div>
        <div class="cl-flexcs cl-team cl-away" v-if="item.away_name">
          <div class="cl-icon" :class="`no-icon${item.away_name.icon}`" />
          <div class="cl-oneLine cl-name">{{ item.away_name.name }}</div>
        </div>
      </div>
      <div class="cl-flexcb cl-right">
        <div
          class="cl-flexcc cl-outcome"
          :class="
            arrayCheckOutcome(item, outcomeItem)
              ? 'cl-oddsButton'
              : 'cl-noOddsButton'
          "
          v-for="(outcomeItem, outcomeIndex) in item.outcomes"
          :key="outcomeIndex"
          @click="selectOnebetLeague(item, outcomeItem)"
        >
          {{ outcomeItem.odds }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import teamTitle from '@/components/components/teamTitle.vue'

export default {
  components: { teamTitle },
  props: ['league_id', 'matchBase', 'teams'],
  computed: {
    tickets() {
      return this.$store.state.onebetLeagueTickets[this.league_id] || []
    }
  },
  methods: {
    // 数组内容查询outcome
    arrayCheckOutcome(item, outcomeItem) {
      const res = this.tickets.filter(
        (a) =>
          a.match_id === item.match_id &&
          a.market_id === item.market_id &&
          a.outcome_id === outcomeItem.id
      )
      return res.length
    },
    // 选择投注项
    selectOnebetLeague(item, outcomeItem) {
      Lib.common.event_statistics(`onebet_League_outcome_click`)

      // 选中数据
      const data = {
        match_id: item.match_id,
        market_id: item.market_id,
        outcome_id: outcomeItem.id,
        start_time: item.start_time,
        odds: Number(outcomeItem.odds),
        home_name: item.home_name.name,
        away_name: item.away_name.name,
        outcome_name: outcomeItem.name
      }

      // tickets处理
      // 筛选掉相同match_id的比赛
      const nowDate = new Date().getTime() / 1000
      let bool = 1

      const newTickets = this.tickets
        .filter((a) => {
          if (
            a.match_id === data.match_id &&
            data.market_id === a.market_id &&
            data.outcome_id === a.outcome_id
          )
            bool = 0
          return a.match_id !== data.match_id
        })
        .filter((a) => a.start_time > nowDate)

      if (bool) newTickets.push(data)

      const newTicketsObj = {
        ...this.$store.state.onebetLeagueTickets,
        [this.league_id]: newTickets
      }
      Lib.store.set('onebetLeagueTickets', newTicketsObj)
      this.$store.commit('setOnebetLeagueTickets', newTicketsObj)
    }
  }
}
</script>

<style scoped lang="less">
.cl-matchBef-wrap {
  .cl-item {
    height: 53rem/36;
    color: #363636;
    font-weight: 800;
    padding: 0 10rem/36;

    .cl-left {
      font-size: 11rem/36;

      .cl-name {
        width: 125rem/36;
      }

      .cl-away {
        margin-top: 7rem/36;
      }

      .cl-icon {
        margin-right: 7rem/36;
      }

      .no-icon1 {
        .sprite(@league-1, 108rem);
      }

      .no-icon2 {
        .sprite(@league-2, 108rem);
      }

      .no-icon3 {
        .sprite(@league-3, 108rem);
      }

      .no-icon4 {
        .sprite(@league-4, 108rem);
      }

      .no-icon5 {
        .sprite(@league-5, 108rem);
      }

      .no-icon6 {
        .sprite(@league-6, 108rem);
      }

      .no-icon7 {
        .sprite(@league-7, 108rem);
      }

      .no-icon8 {
        .sprite(@league-8, 108rem);
      }

      .no-icon9 {
        .sprite(@league-9, 108rem);
      }

      .no-icon10 {
        .sprite(@league-10, 108rem);
      }

      .no-icon11 {
        .sprite(@league-11, 108rem);
      }

      .no-icon12 {
        .sprite(@league-12, 108rem);
      }

      .no-icon13 {
        .sprite(@league-13, 108rem);
      }

      .no-icon14 {
        .sprite(@league-14, 108rem);
      }

      .no-icon15 {
        .sprite(@league-15, 108rem);
      }

      .no-icon16 {
        .sprite(@league-16, 108rem);
      }

      .no-icon17 {
        .sprite(@league-17, 108rem);
      }

      .no-icon18 {
        .sprite(@league-18, 108rem);
      }

      .no-icon19 {
        .sprite(@league-19, 108rem);
      }

      .no-icon20 {
        .sprite(@league-20, 108rem);
      }
    }

    .cl-right {
      width: 186rem/36;
      height: 33rem/36;

      .cl-outcome {
        flex: 1;
        margin-right: 7rem/36;
      }
      .cl-outcome:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
