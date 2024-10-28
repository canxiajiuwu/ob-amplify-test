<template>
  <div class="cl-resultList-wrap">
    <div class="cl-container">
      <div class="cl-list">
        <div class="cl-listItem" v-for="(item, index) in result" :key="index">
          <div class="cl-top cl-flexcs">
            <div class="cl-icon"></div>

            <div class="cl-name">
              <span>{{ arrayCheck(list, item.sport_id) }}</span>
              <span>-</span>
              <span>{{ item.tournament_name }},{{ item.country_name }}</span>
            </div>
          </div>

          <div class="cl-bottom">
            <div class="cl-item">
              <div class="cl-left">
                <div class="cl-date">
                  {{ getDate(item.start_time, 'dd/MM/yyyy') }}
                </div>
                <div class="cl-time">
                  {{ getDate(item.start_time, 'HH,mm') }}
                </div>
              </div>

              <div class="cl-right">
                <div class="cl-hometeam">{{ item.home_name }}</div>
                <div class="cl-score" @click="changeDetailShow(index)">
                  <div class="cl-scoreItem cl-flexcb">
                    <div class="cl-scoreDetail" v-if="item.ft_score">
                      {{ item.ft_score.home_score }} :
                      {{ item.ft_score.away_score }}
                    </div>
                    <div
                      class="cl-icon"
                      :class="{ 'cl-openIcon': showList[index] }"
                    ></div>
                  </div>
                  <div
                    class="cl-scoreDetailBox"
                    :class="{ 'cl-openBottom': showList[index] }"
                  >
                    <div
                      class="cl-scoreItem cl-scoreItem1 cl-flexcb"
                      v-for="(periodItem, periodIndex) in item.periods"
                      :key="periodIndex"
                    >
                      <div class="cl-name">{{ periodItem.name }}</div>
                      <div class="cl-scoreDetail">
                        {{ periodItem.home_score }} :
                        {{ periodItem.away_score }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cl-awayteam">{{ item.away_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: '',
  props: {
    result: {
      type: Array
    },
    sport_name: {
      type: String
    }
  },
  data() {
    return {
      showList: [],
      list: [
        {
          name: this.$t('liveTabs.Soccer'),
          icon: 'icon03',
          icon_choosed: 'icon3',
          id: 1
        },
        {
          name: this.$t('liveTabs.Basketball'),
          icon: 'icon04',
          icon_choosed: 'icon4',
          id: 2
        },
        {
          name: this.$t('liveTabs.usa'),
          icon: 'icon05',
          icon_choosed: 'icon5',
          id: 16
        },
        {
          name: this.$t('liveTabs.Rugby'),
          icon: 'icon06',
          icon_choosed: 'icon6',
          id: 12
        },
        {
          name: this.$t('liveTabs.Tennis'),
          icon: 'icon08',
          icon_choosed: 'icon8',
          id: 5
        },
        {
          name: this.$t('liveTabs.Cricket'),
          icon: 'icon07',
          icon_choosed: 'icon7',
          id: 21
        },
        {
          name: this.$t('liveTabs.Volleyball'),
          icon: 'icon09',
          icon_choosed: 'icon9',
          id: 23
        }
      ]
    }
  },
  methods: {
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 改变展开状态
    changeDetailShow(index) {
      this.$set(this.showList, index, !this.showList[index])
    },
    // 数组内容查询球类名称
    arrayCheck(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].id) === Number(id)) {
          return arr[i].name
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-resultList-wrap {
  width: 100%;

  .cl-container {
    margin: 5rem/36;

    .cl-list {
      .cl-listItem {
        margin-bottom: 5rem/36;
        background-color: #fff;
        border-radius: 3rem/36;
        color: #010101;

        .cl-top {
          box-sizing: border-box;
          padding: 0 5rem/36;
          height: 30rem/36;

          .cl-icon {
            transform: rotate(270deg);
            height: 12rem/36;
            margin-right: 12rem/36;

            .sprite(@icon-back,108rem);
          }
        }

        .cl-bottom {
          .cl-item {
            border-top: 1px solid #c9c9c9;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 10rem/36;

            .cl-left {
              text-align: center;
            }

            .cl-right {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;

              .cl-hometeam {
                font-weight: bold;
                width: 70rem/36;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                word-break: break-all;
                /*height: 25rem/36;*/
              }

              .cl-awayteam {
                font-weight: bold;
                width: 70rem/36;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                word-break: break-all;
                /*height: 25rem/36;*/
              }

              .cl-score {
                background-color: #e8f0f2;
                border-radius: 3rem/36;
                margin: 0 20rem/36;
                width: 67rem/36;

                .cl-scoreDetailBox {
                  display: none;

                  &.cl-openBottom {
                    display: block;
                  }
                }

                .cl-scoreItem {
                  height: 25rem/36;
                  box-sizing: border-box;
                  padding: 0 10rem/36;

                  .cl-scoreDetail {
                    font-weight: bold;
                  }

                  .cl-icon {
                    transform: rotate(180deg);
                    height: 10rem/36;

                    .sprite(@icon-back,108rem);
                  }

                  .cl-openIcon {
                    transform: rotate(270deg);
                  }
                }

                .cl-scoreItem1 {
                  border-top: 1px solid #c9c9c9;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
