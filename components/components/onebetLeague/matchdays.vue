<template>
  <div class="cl-matchDays-wrap">
    <div style="height: calc(10rem / 36)" />
    <div class="cl-flexcb cl-select-wrap">
      <div class="cl-flexcc cl-leftTabs">
        <div class="cl-flexcc cl-seasonBox">
          <div
            tabindex="-1"
            class="cl-flexcc cl-tItem"
            @blur="isListShow = 0"
            @click="isListShow = !isListShow"
          >
            <div class="cl-flexcc">
              {{ $t('onebetLeague.season') }} #{{ season }}
            </div>
            <div
              class="cl-moreIcon"
              :class="isListShow ? 'cl-iconRotate-180' : 'cl-iconRotate0'"
            />
          </div>
          <CollapseTransition>
            <div class="cl-box" v-show="isListShow">
              <div
                class="cl-flexcc cl-a"
                :class="{ 'cl-select': season === a }"
                v-for="(a, b) in seasonList"
                :key="b"
                @click.stop="chooseItem(a)"
              >
                #{{ a }}
              </div>
            </div>
          </CollapseTransition>
        </div>
      </div>

      <div class="cl-flexcc cl-rightTabs">
        <div class="cl-flexcc cl-programmeListBox">
          <div
            tabindex="-1"
            class="cl-flexcc cl-tItem"
            @blur="isRoundListShow = 0"
            @click="isRoundListShow = !isRoundListShow"
          >
            <div class="cl-flexcc">
              {{ $t('onebetLeague.matchDays') }}:{{ roundData }}
            </div>
            <div
              class="cl-moreIcon"
              :class="isRoundListShow ? 'cl-iconRotate-180' : 'cl-iconRotate0'"
            />
          </div>
          <CollapseTransition>
            <div class="cl-box" v-show="isRoundListShow">
              <div class="cl-heightBox">
                <div
                  class="cl-flexcc cl-a"
                  :class="{ 'cl-select': roundData === a }"
                  v-for="(a, b) in totalRound"
                  :key="b"
                  @click.stop="chooseRoundItem(a)"
                >
                  {{ a }}
                </div>
              </div>
            </div>
          </CollapseTransition>
        </div>
      </div>
    </div>

    <div style="height: calc(10rem / 36)" />
    <div class="cl-list">
      <dataError v-if="isRequestFailed" />
      <template v-else>
        <template v-if="requestLoading">
          <template v-if="result.length > 0">
            <div
              class="cl-flexcc cl-item"
              v-for="(item, index) in result"
              :key="index"
            >
              <div class="cl-team cl-home">{{ item.home_name }}</div>
              <div class="cl-flexcc cl-score">
                {{ item.home_score }} - {{ item.away_score }}
              </div>
              <div class="cl-team cl-away">{{ item.away_name }}</div>
            </div>
          </template>
          <dataNoResult v-else />
        </template>
        <dataLoading v-else />
      </template>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  components: { CollapseTransition: Lib.common.CollapseTransition },
  props: ['periodData'],
  data() {
    return {
      season: undefined,
      seasonList: [],
      roundData: undefined,
      totalRound: 38,
      result: [],
      isListShow: 0,
      isRoundListShow: 0,
      requestLoading: 0,
      isRequestFailed: 0
    }
  },
  watch: {
    'periodData.league_id'() {
      this.season = this.roundData = undefined
      this.resultReq()
    }
  },
  mounted() {
    this.resultReq()
  },
  methods: {
    // 获取比分数据
    resultReq() {
      const { league_id } = this.periodData
      // 初始化
      this.isRequestFailed = 0
      this.requestLoading = 0
      this.$axios_api
        .LeagueSoccerResult({
          league_id,
          season_id: this.season,
          round: this.roundData
        })
        .then((res) => {
          this.isRequestFailed = 0
          this.requestLoading = 1
          const { code, data } = res
          if (code === 0) {
            this.seasonList = data.season
            if (!this.season) this.season = this.seasonList[0]
            this.totalRound = data.round
            if (this.roundData === undefined) this.roundData = data.round
            this.result = data.result
          }
        })
        .catch(() => {
          this.isRequestFailed = 1
          this.requestLoading = 1
        })
    },
    // 选择season
    chooseItem(a) {
      this.season = a
      this.roundData = 1
      this.result = []
      this.resultReq()
    },
    // 选择第几轮
    chooseRoundItem(a) {
      this.roundData = a
      this.result = []
      this.resultReq()
    }
  }
}
</script>

<style scoped lang="less">
.cl-matchDays-wrap {
  .cl-select-wrap {
    padding: 0 10rem/36;
    .cl-leftTabs {
      position: relative;
      z-index: 1;
      height: 23rem/36;
      min-width: 120rem/36;
      font-size: 9rem/36;
      font-weight: 400;
      color: #333;

      .cl-seasonBox {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        min-height: 100%;
        background-color: #f2f2f4;
        border-radius: 12rem/36;
        overflow: hidden;
        flex-direction: column;
        box-sizing: border-box;
        .cl-tItem {
          width: 100%;
          height: 23rem/36;
          outline: 0;
          .cl-moreIcon {
            margin-left: 6rem/36;
            .sprite(@ticon-down, 108rem);
          }
        }
        .cl-box {
          width: 100%;
          .cl-a {
            height: 23rem/36;
            width: 100%;
            &.cl-select {
              background-color: #dcf0f9;
            }
          }
        }
      }
    }

    .cl-rightTabs {
      position: relative;
      z-index: 1;
      height: 23rem/36;
      min-width: 120rem/36;
      font-size: 9rem/36;
      font-weight: 400;
      color: #333;

      .cl-programmeListBox {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        min-height: 100%;
        background-color: #f2f2f4;
        border-radius: 12rem/36;
        overflow: hidden;
        flex-direction: column;
        box-sizing: border-box;
        .cl-tItem {
          width: 100%;
          height: 23rem/36;
          outline: 0;
          .cl-moreIcon {
            margin-left: 6rem/36;
            .sprite(@ticon-down, 108rem);
          }
        }
        .cl-box {
          width: 100%;
          .cl-a {
            height: 23rem/36;
            width: 100%;
            &.cl-select {
              background-color: #dcf0f9;
            }
          }
        }
        .cl-heightBox {
          height: 125rem/36;
          width: 100%;
          overflow-y: auto;
        }
      }
    }
  }

  .cl-list {
    .cl-item {
      color: #333;
      font-size: 10rem/36;
      height: 27rem/36;

      .cl-score {
        width: 58rem/36;
        color: #333;
        font-weight: bold;
      }

      .cl-team {
        flex: 1;

        &.cl-home {
          text-align: right;
        }
      }
    }

    .item:nth-child(odd) {
      background-color: #f0f0f0;
    }
  }
}
</style>
