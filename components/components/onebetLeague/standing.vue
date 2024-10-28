<template>
  <div class="cl-standing-wrap">
    <div style="height: calc(10rem / 36)" />
    <div class="cl-flexcb cl-seasonWidth">
      <!-- 占位,勿删 -->
      <div />

      <div class="cl-flexcc cl-rightTabs">
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
    </div>

    <div style="height: calc(10rem / 36)" />
    <div class="cl-list">
      <div class="cl-flexcb cl-ExhibitionList">
        <div v-for="(item, index) in ExhibitionList" :key="index">
          <div class="cl-flexcc cl-item" :style="{ width: item.width + 'rem' }">
            {{ item.name }}
          </div>
        </div>
      </div>
      <dataError v-if="isRequestFailed" />
      <template v-else>
        <template v-if="requestLoading">
          <template v-if="standing.length > 0">
            <div
              class="cl-flexcb cl-showListItem"
              v-for="(item, index) in standing"
              :key="index"
            >
              <div v-for="(a, b) in ExhibitionList" :key="b">
                <div
                  class="cl-flexcc cl-item"
                  :style="{ width: a.width + 'rem' }"
                >
                  {{ `${item[a.word]}${a.word2 ? `/${item[a.word2]}` : ''}` }}
                </div>
              </div>
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
      ExhibitionList: [
        { name: 'Club', width: 132 / 36, word: 'team_name' },
        { name: 'P', width: 27 / 36, word: 'round' },
        { name: 'W', width: 27 / 36, word: 'win' },
        { name: 'D', width: 27 / 36, word: 'draw' },
        { name: 'L', width: 27 / 36, word: 'lose' },
        { name: 'F/A', width: 51 / 36, word: 'goals', word2: 'goals_against' },
        { name: 'Pts', width: 51 / 36, word: 'points' }
      ],
      season: undefined,
      seasonList: [],
      standing: [],
      isListShow: 0,
      requestLoading: 0,
      isRequestFailed: 0
    }
  },
  watch: {
    'periodData.league_id'() {
      this.season = undefined
      this.standingReq()
    }
  },
  mounted() {
    this.standingReq()
  },
  methods: {
    // standing 数据请求
    standingReq() {
      const { league_id } = this.periodData
      // 初始化
      this.isRequestFailed = 0
      this.requestLoading = 0
      this.$axios_api
        .LeagueSoccerStanding({ league_id, season_id: this.season })
        .then((res) => {
          this.isRequestFailed = 0
          this.requestLoading = 1
          if (res.code === 0) {
            this.seasonList = res.data.season
            this.standing = res.data.standing
            if (!this.season) this.season = this.seasonList[0]
          }
        })
        .catch(() => {
          this.isRequestFailed = 1
          this.requestLoading = 1
        })
    },
    // 选择season
    chooseItem(item) {
      this.isListShow = 0
      this.season = item
      this.standing = []
      this.standingReq()
    }
  }
}
</script>

<style scoped lang="less">
.cl-standing-wrap {
  .cl-seasonWidth {
    padding: 0 10rem/36;
    .cl-rightTabs {
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
  }

  .cl-list {
    .cl-ExhibitionList {
      .cl-item {
        height: 27rem/36;
        background-color: #d7dae4;
        color: #333;
        font-size: 10rem/36;
        font-weight: bold;
      }
    }
    .cl-showListItem {
      .cl-item {
        height: 27rem/36;
      }
    }

    .showListItem:nth-child(even) {
      > div {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
