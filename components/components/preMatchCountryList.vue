<template>
  <div class="cl-preMatchCountryList-wrap">
    <dataError v-if="isRequestFailed" />
    <dataLoading v-else-if="!isRequestFailed && !requestLoading" />
    <dataNoResult
      v-else-if="!isRequestFailed && requestLoading && countryList.length === 0"
    />
    <div class="cl-countryBox" v-else>
      <div
        class="cl-countryItemBox"
        v-for="(item, index) in countryList"
        :key="index"
      >
        <div @click="changeDetailShow(index)" class="cl-countryItem">
          <div :style="{ height: 10 / 36 + 'rem' }" />
          <div class="cl-flexcb">
            <div class="cl-left">{{ item.country_name }}</div>
            <div class="cl-right cl-flexcc">
              <div class="cl-number">{{ item.match_count }}</div>
              <div
                class="cl-more"
                :class="showList[index] ? 'cl-iconRotate' : 'cl-iconReset'"
              />
            </div>
          </div>
          <div :style="{ height: 10 / 36 + 'rem' }" />
        </div>

        <CollapseTransition>
          <div class="cl-tournamentBox" v-if="showList[index]">
            <div
              class="cl-tournamentItem"
              v-for="(innerItem, innerIndex) in item.tournaments"
              :key="innerIndex"
              :class="
                innerIndex + 1 === item.tournaments.length ? '' : 'cl-border-b'
              "
              @click="
                goTournament(
                  item.country_name,
                  innerItem.tournament_name,
                  innerItem.tournament_id
                )
              "
            >
              <div :style="{ height: 10 / 36 + 'rem' }" />
              <div class="cl-flexcb">
                <div class="cl-left">{{ innerItem.tournament_name }}</div>
                <div class="cl-right cl-flexcc">
                  <div class="cl-number">{{ innerItem.match_count }}</div>
                  <div class="cl-more" />
                </div>
              </div>
              <div :style="{ height: 10 / 36 + 'rem' }" />
            </div>
          </div>
        </CollapseTransition>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import {
  contestListRestore,
  contestListSave,
  pubSub
} from '@/assets/js/utils/contestListRestore.js'

export default {
  components: { CollapseTransition: Lib.common.CollapseTransition },
  props: {
    countryList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showList: [],
      isRequestFailed: false,
      requestLoading: false
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    }
  },
  mounted() {
    if (this.countryList.length === 0) {
      this.getCountryV2()
    } else {
      this.isRequestFailed = false
      this.requestLoading = true
    }
    contestListRestore.call(this, 'PreMatchCountryList', [], ['showList'])
    // 注册事件，在去往详情页的时候会触发，然后保存数据
    pubSub.subscribe('index', this.saveContestList)
  },
  destroyed() {
    // 销毁enter事件
    pubSub.unSubscribe('index', this.saveContestList)
  },
  methods: {
    // 请求国家数据
    getCountryV2() {
      this.$axios_api
        .getCountryV2({
          sport_id: 1
        })
        .then((res) => {
          this.isRequestFailed = false
          this.requestLoading = true
          if (res.code === 0) {
            this.$emit('addCountryList', res.data.items)
          }
        })
        .catch(() => {
          this.isRequestFailed = true
          this.requestLoading = true
        })
    },
    // 改变展开状态
    changeDetailShow(index) {
      this.$set(this.showList, index, !this.showList[index])
    },
    // 前往指定联赛
    goTournament(country, tournament, id) {
      this.$emit('changeTournament', {
        country,
        tournament,
        id
      })
    },
    saveContestList() {
      contestListSave.call(this, [], '', {
        showListPreMatchCountryList: this.showList
      })
    }
  }
}
</script>

<style scoped lang="less">
.cl-preMatchCountryList-wrap {
  padding: 7rem/36 10rem/36 30rem/36;
  background-color: #fff;

  .cl-countryItemBox {
    color: #000;
    font-size: 11rem/36;
    font-weight: bold;
    margin-bottom: 7rem/36;
    border-radius: 3rem/36;
    background-color: #ebeef9;
    .cl-countryItem {
      padding: 0 10rem/36;
      .cl-right {
        .cl-number {
          font-weight: 400;
          margin-right: 7rem/36;
        }
        .cl-more {
          .sprite(@icon-black-right, 108rem);
        }
        .cl-iconRotate {
          transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
          transition: transform 0.3s;
        }

        .cl-iconReset {
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          transition: transform 0.3s;
        }
      }
    }
    .cl-tournamentBox {
      border-top: 0.1rem/36 solid #d4dae1;
      margin-left: 10rem/36;
      .cl-tournamentItem {
        margin-left: 16rem/36;
        .cl-number {
          font-weight: 400;
          margin-right: 7rem/36;
        }
        .cl-more {
          margin-right: 10rem/36;
          .sprite(@icon-black-right, 108rem);
        }
      }
      .cl-border-b {
        border-bottom: 0.1rem/36 solid #d4dae1;
      }
    }
  }
}
</style>
