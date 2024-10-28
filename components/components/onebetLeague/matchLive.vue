<template>
  <div class="cl-matchLive-wrap">
    <div class="cl-flexcc cl-bsbb cl-titleBox">
      <div class="cl-name">{{ liveWord.name }}</div>
      <div class="cl-time">{{ liveWord.time }}</div>
    </div>
    <div class="cl-item" v-for="(a, b) in dList" :key="b">
      <div
        class="cl-flexcb cl-matchItem"
        :class="{ 'cl-select': a.selections.length > 0 }"
      >
        <div class="cl-icon" :class="`no-icon${a.home_name.icon}`" />
        <div class="cl-flexcc cl-center">
          <div class="cl-team cl-homeName">{{ a.home_name.name }}</div>
          <div class="cl-flexcc cl-scoreBox">
            <div class="cl-flexcc cl-score">
              <div
                class="cl-flexcc cl-scoreNum"
                :class="{ 'cl-blink': a.home_score > a.away_score }"
              >
                {{ a.home_score || 0 }}
              </div>
            </div>
            <div class="cl-colon">:</div>
            <div class="cl-flexcc cl-score">
              <div
                class="cl-flexcc cl-scoreNum"
                :class="{ 'cl-blink': a.home_score < a.away_score }"
              >
                {{ a.away_score || 0 }}
              </div>
            </div>
          </div>
          <div class="cl-team cl-awayName">{{ a.away_name.name }}</div>
        </div>
        <div class="cl-icon" :class="`no-icon${a.away_name.icon}`" />
      </div>
      <div v-if="a.selections.length">
        <div
          class="cl-flexcb cl-statusBox"
          :class="`no-statusBg${x.result}`"
          v-for="(x, y) in a.selections"
          :key="y"
        >
          <div class="cl-left">
            <span class="cl-status">{{
              $t('onebetLeague.status')[x.result]
            }}</span>
            <span>-</span>
            <span class="cl-market">{{ x.market }}</span>
            <span>-</span>
            <span>{{ x.outcome }}@{{ x.odds }}</span>
          </div>
          <div class="cl-right cl-status">#{{ x.auto_id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['matchBase', 'selections', 'liveWord'],
  computed: {
    dList() {
      return this.matchBase.map((a) => {
        const selections = this.selections.filter(
          (b) => a.match_id === b.match_id
        )
        return {
          ...a,
          selections
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-matchLive-wrap {
  font-size: 11rem/36;
  .cl-titleBox {
    height: 30rem/36;
    font-weight: 400;
    color: #a2a2a7;
    border-bottom: 0.5rem/36 solid #e9e9f3;
    .cl-time {
      margin-left: 3rem/36;
      color: #f73a5f;
    }
  }
  .cl-item {
    .cl-matchItem {
      height: 43rem/36;
      padding: 0 10rem/36;

      &.cl-select {
        background-color: #efeff0;
      }
    }

    .cl-statusBox {
      height: 23rem/36;
      line-height: 23rem/36;
      padding: 0 10rem/36;
      color: #fff;
      font-size: 10rem/36;

      .cl-status {
        font-weight: bold;
      }

      &.no-statusBg0 {
        background-color: #c3c3c3;
      }

      &.no-statusBg1 {
        background-color: #8977fd;
      }

      &.no-statusBg2 {
        background-color: #ff7f68;
      }
    }

    .no-icon1 {
      .sprite(@league-1,108rem);
    }

    .no-icon2 {
      .sprite(@league-2,108rem);
    }

    .no-icon3 {
      .sprite(@league-3,108rem);
    }

    .no-icon4 {
      .sprite(@league-4,108rem);
    }

    .no-icon5 {
      .sprite(@league-5,108rem);
    }

    .no-icon6 {
      .sprite(@league-6,108rem);
    }

    .no-icon7 {
      .sprite(@league-7,108rem);
    }

    .no-icon8 {
      .sprite(@league-8,108rem);
    }

    .no-icon9 {
      .sprite(@league-9,108rem);
    }

    .no-icon10 {
      .sprite(@league-10,108rem);
    }

    .no-icon11 {
      .sprite(@league-11,108rem);
    }

    .no-icon12 {
      .sprite(@league-12,108rem);
    }

    .no-icon13 {
      .sprite(@league-13,108rem);
    }

    .no-icon14 {
      .sprite(@league-14,108rem);
    }

    .no-icon15 {
      .sprite(@league-15,108rem);
    }

    .no-icon16 {
      .sprite(@league-16,108rem);
    }

    .no-icon17 {
      .sprite(@league-17,108rem);
    }

    .no-icon18 {
      .sprite(@league-18,108rem);
    }

    .no-icon19 {
      .sprite(@league-19,108rem);
    }

    .no-icon20 {
      .sprite(@league-20,108rem);
    }

    .cl-center {
      flex: 1;
      color: #363636;
      .cl-team {
        width: 133rem/36;
        font-weight: 400;
        color: #686868;
      }
      .cl-homeName {
        text-align: right;
      }
      .cl-scoreBox {
        width: 45rem/36;
        font-size: 13rem/36;
        font-weight: 800;
        .cl-score {
          width: 22rem/36;
          .cl-scoreNum {
            width: 14rem/36;
            height: 14rem/36;
            &.cl-blink {
              background-color: #fcdb06;
              animation: blink 400ms linear infinite alternate;
            }
          }
        }
      }
    }
  }

  @keyframes blink {
    to {
      opacity: 1;
    }
    from {
      opacity: 0.5;
    }
  }
}
</style>
