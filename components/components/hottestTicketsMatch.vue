<template>
  <div class="cl-hottestTicketsMatch-wrap">
    <div class="cl-indexCardShadow cl-item">
      <div style="height: calc(10rem / 36)" />
      <div class="cl-topBox">
        <div class="cl-topWidth">
          <div class="cl-flexcb">
            <div class="cl-flexcc cl-topLeft">
              <div class="cl-codeTitle">Code:</div>
              <div class="cl-codeWord">{{ data.load_code }}</div>
            </div>
            <div class="cl-flexcc cl-topRight">
              <template v-for="(a, b) in label">
                <div
                  v-if="b < 2"
                  :key="b"
                  class="cl-flexcc cl-label"
                  :class="[actualLabelList[a - 1]]"
                >
                  {{ actualLabelList[a - 1] }}
                </div>
              </template>
            </div>
          </div>

          <div style="height: calc(10rem / 36)" />
          <div class="cl-flexcb cl-middle">
            <div class="cl-middleLeft cl-flexend">
              <div class="cl-total">{{ $t('hottestTickets.totalOdds') }}</div>
              <div class="cl-num">{{ data.odds.toFixed(2) }}</div>
            </div>
            <div class="cl-flexcb cl-middleRight">
              <div class="cl-flexend">
                <div class="cl-Matches">{{ $t('hottestTickets.Matches') }}</div>
                <div class="cl-num">{{ data.match }}</div>
              </div>
              <div
                class="cl-flexcc cl-iconBox"
                @click="isShowChange(!isShow)"
                :class="isShow ? 'cl-iconRotate-180' : 'cl-iconRotate0'"
              >
                <div class="cl-iconRotate90 cl-downIcon" />
              </div>
            </div>
          </div>
          <div style="height: calc(10rem / 36)" />
        </div>

        <CollapseTransition>
          <div class="cl-listBox" v-show="isShow">
            <div class="cl-list">
              <div v-for="(item, index) in data.matches" :key="index">
                <div class="cl-listItem">
                  <div style="height: calc(6rem / 36)" />
                  <div class="cl-matcheBox">
                    <div class="cl-flexcb">
                      <div class="cl-oneLine cl-matcheInfo">
                        {{ item.home_name }}
                        <span class="cl-VS">VS.</span>
                        {{ item.away_name }}
                      </div>
                      <div class="cl-startTime">
                        {{ getDate(item.start_time, 'dd/MM, HH:mm') }}
                      </div>
                    </div>
                    <div style="height: calc(7rem / 36)" />
                    <div class="cl-flexcb">
                      <div class="cl-betting">
                        {{ item.market_name }} - {{ item.outcome_name }}
                      </div>
                      <div class="cl-odds">
                        {{ Number(item.odds).toFixed(2) }}
                      </div>
                    </div>
                  </div>
                  <div style="height: calc(9rem / 36)" />
                </div>
              </div>
            </div>

            <div style="height: calc(15rem / 36)" />
            <div
              class="cl-flexcc cl-lkButton cl-followButton"
              @click="followToBet"
            >
              {{ $t('hottestTickets.followBet') }}
            </div>
            <div style="height: calc(18rem / 36)" />
            <div class="cl-flexcc">
              <div class="cl-upIcon" @click="isShowChange(false)" />
            </div>
            <div style="height: calc(10rem / 36)" />
          </div>
        </CollapseTransition>
      </div>
      <div style="height: calc(6rem / 36)" />
      <div class="cl-flexcc cl-accountBox">
        <div class="cl-flexcb cl-accountWidth">
          <div class="cl-flexcc cl-headPortrait">
            <img
              v-if="data.avatar"
              class="cl-img"
              v-lazy="stagingCmUrl + data.avatar"
              alt="avatar"
            />
            <div v-if="!data.avatar" class="cl-avatarIcon" />
            <div class="cl-accountName">{{ data.name }}</div>
          </div>

          <div class="cl-flexcc cl-followUp">
            <div>{{ $t('hottestTickets.followCount') }}</div>
            <div class="cl-followCount">{{ data.follow_count }}</div>
          </div>
        </div>
      </div>
      <div style="height: calc(6rem / 36)" />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  components: { CollapseTransition: Lib.common.CollapseTransition },
  props: {
    // 接收的单独项
    data: {
      type: Object
    },
    // 接收列表index,判断是否添加hot标签
    dataIndex: {
      type: Number
    },
    labelList: {
      type: Array
    },
    isNoFilter: {
      type: Boolean
    }
  },
  data() {
    return {
      isShow: false,
      actualLabelList: []
    }
  },
  computed: {
    stagingCmUrl() {
      return process.env.NODE_ENV === 'development'
        ? 'https://staging-cm.onebet.ug'
        : ''
    },
    // 接收列表index,判断是否添加hot标签
    label() {
      let arr = this.data.label
      if (this.dataIndex <= 2 && this.isNoFilter) {
        // hot
        if (this.data.label.length) arr.push(6)
        else arr = arr.splice(0, 2)
      }
      return arr
    },
    tickets() {
      return this.$store.state.tickets
    }
  },
  created() {
    const str = JSON.stringify(this.labelList)
    this.actualLabelList = JSON.parse(str)
    this.actualLabelList.push('hot')
  },
  methods: {
    // 显示与隐藏
    isShowChange: Lib.common.throttle(function (flag) {
      Lib.common.event_statistics(
        `hottest_tickets_${flag ? 'show' : 'hidden'}_detail`
      )
      this.isShow = flag
    }, 300),
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 进行跟投
    followToBet() {
      Lib.common.event_statistics(`hottest_tickets_follow_to_bet`)
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .shareBet({ id: this.data.load_code })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            const shareTickets = res.data
            if (shareTickets.length <= 0) {
              return Lib.common.errorReminderUp(
                this,
                true,
                this.$t('reminder.pullError'),
                0
              )
            }
            // 将code码存入cookie
            this.shareCodeExpireTime(this.data.load_code)

            this.$store.commit('setTickets', shareTickets)
            Lib.store.set(
              'tickets',
              Lib.common.encrypt(JSON.stringify(shareTickets))
            )
            Lib.store.set(
              'shareTickets',
              Lib.common.encrypt(JSON.stringify(shareTickets))
            )
            this.$router.push({
              path: `/${this.$store.state.root.locale}/betslip`
            })
          } else
            Lib.common.errorReminderUp(
              this,
              true,
              this.$t('reminder.pullError'),
              0
            )
        })
        .catch(() => {
          this.$store.commit('changeLoadingStatus', 0)
          Lib.common.errorReminderUp(
            this,
            true,
            this.$t('reminder.pullError'),
            0
          )
        })
    },
    // 设置分享的ticketsId的过期时间
    shareCodeExpireTime(code) {
      Lib.common.event_statistics(`hottest_tickets_share_id_save`, code)
      Lib.common.setCookie('betSharingTicketId', code, 1 / (4 * 24))
    }
  }
}
</script>

<style lang="less" scoped>
.cl-hottestTicketsMatch-wrap {
  .cl-item {
    width: 340rem/36;
    border-radius: 6rem/36;
    background-color: #fff;

    .cl-topBox {
      border-bottom: 0.1rem/36 solid #d4dae1;

      .cl-topWidth {
        width: 320rem/36;
        margin: 0 auto;

        .cl-topLeft {
          font-size: 10rem/36;
          font-weight: 400;
          color: #a2a2a7;

          .cl-codeTitle {
            margin-right: 3rem/36;
          }
        }

        .cl-topRight {
          .cl-label {
            padding: 0 10rem/36;
            height: 19rem/36;
            border-radius: 11rem/36;
            font-size: 10rem/36;
            font-weight: 400;
            margin-right: 10rem/36;
            text-transform: capitalize;
            white-space: nowrap;
          }

          .cl-label:last-child {
            margin-right: 0;
          }

          .official {
            background-color: #f0f1ff;
            color: #4c50fa;
            border: 0.1rem/36 solid #b7b9ff;
          }

          .world-Cup {
            background-color: #fec2c2;
            color: #a84741;
            border: 0.1rem/36 solid #a84741;
          }

          .hot {
            background-color: #ffeae4;
            color: #ff5222;
            border: 0.1rem/36 solid #fba58c;
          }

          .safe {
            background-color: #e9ffe5;
            color: #33be06;
            border: 0.1rem/36 solid #aad6a2;
          }

          .high {
            background-color: #fffbd5;
            color: #e68516;
            border: 0.1rem/36 solid #e5d751;
          }

          .simple {
            background-color: #f4e8ff;
            color: #aa33cb;
            border: 0.1rem/36 solid #bc94de;
          }
        }

        .cl-middle {
          color: #000;
          font-size: 11rem/36;
          font-weight: 400;

          .cl-middleLeft {
            flex: 1;

            .cl-total {
              white-space: nowrap;
            }
          }

          .cl-middleRight {
            flex: 1;
          }

          .cl-flexend {
            display: flex;
            align-items: flex-end;
          }

          .cl-num {
            margin-left: 6rem/36;
            font-weight: 800;
            font-size: 17rem/36;
            line-height: 17rem/36;
          }

          .cl-iconBox {
            width: 19rem/36;
            height: 19rem/36;
            background-color: #f4f4f4;
            border-radius: 50%;

            .cl-downIcon {
              .sprite(@icon-black-right, 108rem);
            }
          }
        }
      }

      .cl-listBox {
        margin-left: 10rem/36;
        border-top: 0.1rem/36 solid #d4dae1;

        .cl-list {
          .cl-listItem {
            padding-right: 10rem/36;
            border-bottom: 0.1rem/36 solid #d4dae1;

            .cl-matcheBox {
              font-size: 11rem/36;
              font-weight: 400;
              color: #363636;

              .cl-matcheInfo {
                max-width: 235rem/36;

                .cl-VS {
                  margin: 0 3rem/36;
                }
              }

              .cl-startTime {
                color: #a2a2a7;
                font-size: 10rem/36;
              }

              .cl-betting {
                font-weight: bold;
              }

              .cl-odds {
                font-weight: bold;
                color: #000;
              }
            }
          }
        }

        .cl-followButton {
          box-sizing: border-box;
          width: 320rem/36;
          height: 40rem/36;
          font-size: 13rem/36;
        }

        .cl-followButton:active {
          opacity: 0.8;
        }

        .cl-upIcon {
          margin-right: 10rem/36;
          .sprite(@icon-weekly-cash-up, 108rem);
        }
      }
    }

    .cl-accountBox {
      .cl-accountWidth {
        width: 320rem/36;

        .cl-headPortrait {
          .cl-avatarIcon {
            .sprite(@account-un-login, 125rem);
          }

          .cl-img {
            width: 27rem/36;
            height: 27rem/36;
            border-radius: 50%;
            overflow: hidden;
          }

          .cl-accountName {
            margin-left: 7rem/36;
            font-size: 11rem/36;
            font-weight: 400;
            color: #000;
          }
        }

        .cl-followUp {
          font-size: 11rem/36;
          font-weight: 400;
          color: #74747c;

          .cl-followCount {
            margin-left: 3rem/36;
            color: #000;
          }
        }
      }
    }
  }
}
</style>
