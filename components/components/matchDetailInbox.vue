<template>
  <div class="cl-matchDetailInbox-wrap">
    <div class="cl-container" :class="{ 'cl-liveWrap': where === 'live' }">
      <div class="cl-inbox">
        <div class="cl-top cl-flexcc">
          <div class="cl-icon" :class="arrayCheckIcon(list, meta.sport_id)" />
          <div class="cl-tournament_name cl-oneLine">
            {{ meta.tournament_name + ',' }} {{ meta.country_name }}
          </div>
          <div class="cl-liveIconBox cl-flexcc" v-if="where === 'live'" />
        </div>

        <div class="cl-bottom">
          <div class="cl-team cl-home">
            <div class="cl-flexcc cl-teamIcon" v-if="meta">
              <div>
                <client-only>
                  <img
                    v-lazy="meta.home_team_logo"
                    alt="home_team_logo"
                    :onerror="defaultImg"
                  />
                </client-only>
              </div>
            </div>
            <div class="cl-teamName">{{ meta.home_name }}</div>
          </div>

          <div class="cl-flexcs cl-middle cl-live" v-if="match_status === 1">
            <div class="cl-flexcb cl-status">
              <div
                class="cl-time"
                v-if="
                  meta.live_data &&
                  meta.live_data.live &&
                  meta.live_data.time_elapsed !== '0'
                "
              >
                {{ meta.live_data.live ? countdown : '' }}
              </div>
              <div
                class="cl-line"
                v-if="
                  meta.live_data &&
                  meta.live_data.live &&
                  meta.live_data.time_elapsed !== '0'
                "
              >
                |
              </div>
              <div class="cl-period">
                {{
                  meta.live_data && meta.live_data.live
                    ? meta.live_data.stage_status_display
                    : ''
                }}
              </div>
            </div>
            <div class="cl-score">
              {{
                meta.live_data && meta.live_data.live
                  ? meta.live_data.current_score.home_score
                  : 0
              }}
              :
              {{
                meta.live_data.live
                  ? meta.live_data.current_score.away_score
                  : 0
              }}
            </div>
          </div>

          <div
            class="cl-flexcs cl-middle cl-preMatch"
            v-else-if="match_status === 0"
          >
            <div class="cl-flexcb cl-status">
              <div class="cl-time" v-if="meta.start_time">
                {{ getDate(meta.start_time, 'dd/MM HH:mm') }}
              </div>
            </div>
            <div class="cl-vs">{{ $t('matchDetailInbox.vs') }}</div>
          </div>

          <div
            class="cl-flexcs cl-middle cl-preMatch"
            v-else-if="match_status === 2"
          >
            <div class="cl-flexcb cl-status">
              <div class="cl-time">{{ $t('matchDetailInbox.suspended') }}</div>
            </div>
            <div class="cl-score">
              {{
                meta.live_data && meta.live_data.live
                  ? meta.live_data.current_score.home_score
                  : 0
              }}
              :
              {{
                meta.live_data.live
                  ? meta.live_data.current_score.away_score
                  : 0
              }}
            </div>
          </div>

          <div
            class="cl-flexcs cl-middle cl-preMatch"
            v-else-if="match_status === 3 || match_status === 4"
          >
            <div class="cl-flexcb cl-status">
              <div class="cl-time">{{ $t('matchDetailInbox.ended') }}</div>
            </div>
            <div class="cl-score">
              {{
                meta.live_data && meta.live_data.live
                  ? meta.live_data.current_score.home_score
                  : 0
              }}
              :
              {{
                meta.live_data.live
                  ? meta.live_data.current_score.away_score
                  : 0
              }}
            </div>
          </div>

          <div class="cl-team cl-away">
            <div class="cl-flexcc cl-teamIcon" v-if="meta">
              <div>
                <client-only>
                  <img
                    v-lazy="meta.away_team_logo"
                    alt="away_team_logo"
                    :onerror="defaultImg"
                  />
                </client-only>
              </div>
            </div>
            <div class="cl-teamName">{{ meta.away_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  props: {
    meta: {
      type: Object
    },
    match_status: {
      type: Number
    },
    where: {
      type: String
    }
  },
  data() {
    return {
      list: [
        {
          name: this.$t('liveTabs.Soccer'),
          icon: 'cl-icon003',
          id: 1
        },
        {
          name: this.$t('liveTabs.Basketball'),
          icon: 'cl-icon004',
          id: 2
        },
        {
          name: this.$t('liveTabs.usa'),
          icon: 'cl-icon005',
          id: 16
        },
        {
          name: this.$t('liveTabs.Rugby'),
          icon: 'cl-icon006',
          id: 12
        },
        {
          name: this.$t('liveTabs.Tennis'),
          icon: 'cl-icon008',
          id: 5
        },
        {
          name: this.$t('liveTabs.Cricket'),
          icon: 'cl-icon007',
          id: 21
        },
        {
          name: this.$t('liveTabs.Volleyball'),
          icon: 'cl-icon009',
          id: 23
        }
      ],
      upInterval: '',
      countdown: ''
    }
  },
  computed: {
    defaultImg() {
      return (
        'this.src="' +
        require('@/assets/images/general/notSprites/logo/default-logo.png') +
        '"'
      )
    },
    stage_status() {
      const { live_data: { stage_status = '' } = {} } = this.meta
      return stage_status
    }
  },
  watch: {
    meta(nval, oval) {
      const { live_data: { time_elapsed: oldte } = {} } = nval
      const newte = oval?.live_data?.time_elapsed
      // 一样为'0'则不重置定时器
      if (oldte === newte) return
      this.time_count_down()
    }
  },
  mounted() {
    // 倒计时初始化
    this.time_count_down()
  },
  beforeDestroy() {
    clearInterval(this.upInterval)
  },
  methods: {
    // 返回上一页
    goBack() {
      Lib.common.activityBack(this)
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // icon choose
    arrayCheckIcon(arr, id) {
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].id) === Number(id)) return arr[i].icon
      }
    },
    // 倒计时
    time_count_down() {
      this.upInterval && clearInterval(this.upInterval)
      let min = '00'
      let sec = '00'
      if (!(this.meta.live_data && this.meta.live_data.live)) return
      const matchTime = this.meta.live_data.time_elapsed
      switch (this.meta.sport_id) {
        case 1:
        case '1':
          // 足球
          if (matchTime !== '0') {
            min = parseInt(matchTime.split(':')[0])
            sec = parseInt(matchTime.split(':')[1])
            this.upInterval = setInterval(() => {
              sec++
              if (sec === 60) {
                sec = 0
                min++
              }

              if (this.stage_status === '1st half') {
                if (min >= 45) {
                  this.countdown =
                    '45:00 +' +
                    this.timeDeal(min - 45) +
                    ':' +
                    this.timeDeal(sec)
                } else {
                  this.countdown = this.timeDeal(min) + ':' + this.timeDeal(sec)
                }
              } else if (this.stage_status === 'Halftime') {
                this.countdown = '45:00'
              } else if (this.stage_status === '2nd half') {
                if (min >= 90) {
                  this.countdown =
                    '90:00 +' +
                    this.timeDeal(min - 90) +
                    ':' +
                    this.timeDeal(sec)
                } else {
                  this.countdown = this.timeDeal(min) + ':' + this.timeDeal(sec)
                }
              } else if (this.stage_status === 'Awaiting extra time') {
                this.countdown = '90:00'
              } else if (this.stage_status === '1st extra') {
                if (min >= 105) {
                  this.countdown =
                    '105:00 +' +
                    this.timeDeal(min - 105) +
                    ':' +
                    this.timeDeal(sec)
                } else {
                  this.countdown = this.timeDeal(min) + ':' + this.timeDeal(sec)
                }
              } else if (this.stage_status === 'Extra time halftime') {
                this.countdown = '105:00'
              } else if (this.stage_status === '2nd extra') {
                if (min >= 120) {
                  this.countdown =
                    '120:00 +' +
                    this.timeDeal(min - 120) +
                    ':' +
                    this.timeDeal(sec)
                } else {
                  this.countdown = this.timeDeal(min) + ':' + this.timeDeal(sec)
                }
              }
            }, 1000)
          }
          break
        default:
          this.countdown = this.meta.live_data.time_elapsed
      }
    },
    // 事件处理
    timeDeal(time) {
      return time < 10 ? '0' + time : time
    }
  }
}
</script>

<style scoped lang="less">
.cl-matchDetailInbox-wrap {
  .cl-container {
    box-sizing: border-box;
    color: @mainButtonComparedColor;
    background-color: @mainThemeColor;

    &.cl-liveWrap {
      background-color: @footLiveBgColor;
      .cl-bottom {
        .cl-status {
          color: @oddsColor;
        }
      }
      .cl-inbox {
        .cl-top {
          color: @liveNameColor;
        }
      }
    }

    .cl-inbox {
      position: relative;
      padding: 0 5rem/36 12rem/36;

      .cl-liveIconBox {
        position: absolute;
        left: 10rem/36;
        top: 3rem/36;
        .sprite(@ticon-detail-icon, 108rem);
      }

      .cl-top {
        font-size: 11rem/36;
        width: 280rem/36;
        margin: 0 auto;
        height: 18rem/36;
        /*background-color: #85b545;*/
        /*background-color: #394D8B;*/
        .cl-icon {
          width: 15rem/36;
          height: 15rem/36;
          background-size: 100%;
          margin-right: 5rem/36;
          opacity: 0.7;
        }

        .cl-icon003 {
          .sprite(@tabs-003, 148rem);
        }
        .cl-icon004 {
          .sprite(@tabs-004, 148rem);
        }
        .cl-icon005 {
          .sprite(@tabs-005, 148rem);
        }
        .cl-icon006 {
          .sprite(@tabs-006, 148rem);
        }
        .cl-icon007 {
          .sprite(@tabs-007, 148rem);
        }
        .cl-icon008 {
          .sprite(@tabs-008, 148rem);
        }
        .cl-icon009 {
          .sprite(@tabs-009, 148rem);
        }
      }

      .cl-bottom {
        position: relative;
        display: flex;
        justify-content: center;

        .cl-team {
          width: 110rem/36;
          font-size: 11rem/36;
          text-align: center;
          padding-top: 16rem/36;

          .cl-teamIcon {
            width: 37rem/36;
            height: 37rem/36;
            border-radius: 50%;
            background-color: white;
            margin: 0 auto;

            div {
              width: 26rem/36;
              height: 26rem/36;
            }

            img {
              width: 26rem/36;
              height: 26rem/36;
            }
          }

          .cl-teamName {
            padding-top: 6rem/36;
          }
        }

        .cl-home {
          margin-right: 40rem/36;
        }

        .cl-away {
          margin-left: 40rem/36;
        }

        .cl-middle {
          width: 340rem/36;
          flex-direction: column;
          top: 0;
          position: absolute;

          .cl-status {
            padding-top: 18rem/36;
            font-size: 11rem/36;
            font-weight: bold;

            .cl-time {
              padding: 0 8rem/36;
              text-align: right;
            }

            // .cl-line {
            // }

            .cl-period {
              padding: 0 8rem/36;
            }
          }

          .cl-score {
            font-size: 27rem/36;
            font-weight: 900;
            margin-top: 4rem/36;
            color: @selectAddsColor;
          }

          .cl-vs {
            margin-top: 4rem/36;
            color: rgba(255, 255, 255, 0.6);
            font-weight: 900;
            font-size: 27rem/36;
          }
        }
      }
    }
  }
}
</style>
