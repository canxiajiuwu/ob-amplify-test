<template>
  <div class="cl-betslipMarketList-wrap">
    <div v-if="tickets.length > 0" class="cl-betslipMarketList-box">
      <div key="marketList-wrap" class="cl-marketList-wrap">
        <betslipClear />

        <div v-for="(item, index) in tickets" :key="item.id" class="cl-item">
          <div class="cl-flexcb">
            <div class="cl-flexcs cl-closeIcon" @click="clearOne(index)">
              <div class="cl-icon" />
            </div>
            <div class="cl-ticketsBox">
              <div class="cl-itemUp">
                <div class="cl-flexcb cl-top">
                  <div class="cl-flexcs cl-left">
                    <div v-if="item.match_status === 1" class="cl-sportStatus">
                      {{ $t('betslipMarketList.live') }}
                    </div>
                    <div class="cl-teamName" @click="goMatchDetail(item)">
                      {{ item.home_name }}
                      <span>{{ $t('betslipMarketList.vs') }}</span>
                      {{ item.away_name }}
                    </div>

                    <!--<div class="cl-time" v-if="item.match_status === 0">{{$t('betslipMarketList.starts')}} {{getDate(item.start_time,'dd/MM,HH:mm')}}</div>-->
                    <!--<div class="cl-time" v-else-if="item.match_status === 0 && item.isPreMatchStart">{{$t('betslipMarketList.already')}}</div>-->
                  </div>
                  <div class="cl-right" />
                </div>

                <div class="cl-flexcb cl-bottom">
                  <div class="cl-left">
                    <span class="cl-market_name">{{
                      item.market_name + ' - '
                    }}</span>
                    {{ item.display }}
                  </div>
                  <div class="cl-right">
                    <div v-if="item.isExpired" class="cl-art cl-isExpired">
                      {{ $t('betslipMarketList.expired1') }}
                    </div>
                    <div
                      v-else-if="item.isPreMatchStart"
                      class="cl-art cl-isPreMatchStart"
                    >
                      {{ $t('betslipMarketList.started') }}
                    </div>
                    <oddsChange
                      v-else
                      :is-odds-change="item.isOddsChange"
                      :odds="Number(item.odds).toFixed(2)"
                      font-size-num="11"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="
              item.match_status > 1 ||
              item.market_status > 0 ||
              item.outcome_status ||
              item.isOddsChange
            "
            class="cl-flexcb cl-itemDown"
            :class="{
              'cl-itemDownReminder':
                item.match_status > 1 ||
                item.market_status > 0 ||
                item.outcome_status
            }"
          >
            <div class="cl-left">
              <span
                v-if="
                  item.match_status > 1 ||
                  item.market_status > 0 ||
                  item.outcome_status
                "
                >{{ $t('betslipMarketList.expired') }}</span
              >
              <span v-else class="cl-odds">{{
                $t('betslipMarketList.odds', {
                  from: oldOdds(item.id),
                  to: Number(item.odds).toFixed(2)
                })
              }}</span>
            </div>

            <!-- <div class="cl-right" @click="goMatchDetail(item)" v-if="item.match_status <= 1">{{ $t('betslipMarketList.more') }}</div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 没有比赛时样子 -->
    <div v-if="tickets.length === 0" class="cl-flexcc cl-reminderBox">
      <div style="height: calc(40rem / 36)" />
      <div class="cl-reminder" v-html="$t('betslipMarketList.reminder')" />
      <div style="height: calc(36rem / 36)" />
      <div class="cl-noDataList">
        <nuxt-link
          v-for="(a, b) in noDataList"
          :key="b"
          class="cl-indexCardShadow cl-flexcs cl-item"
          @click="a.fn()"
          :to="a.path"
        >
          <div class="cl-icon" :class="'no-' + a.icon" />
          <div class="cl-wordBox">
            <h2 class="cl-h2 cl-title">{{ a.title[locale] }}</h2>
            <h3 class="cl-h3 cl-word">{{ a.word[locale] }}</h3>
          </div>
        </nuxt-link>
      </div>
      <div style="height: calc(96rem / 36)" />
      <noDataGameList event-name="no_tickets" />
    </div>
    <!-- freebet giveaway活动期间新增banner -->
    <!-- <div class="cl-freebetBanner" v-if="!tickets.length" @click="goFreebetGiveaway">
      <div class="cl-freebetBanner_en" v-if="locale === 'en'">
        <img src="https://d2m6jvlii5xwqv.cloudfront.net/banner/OcsK2gW2E6JZW1yYWodVStHVeN1MCwsVODwT5T25.jpeg" />
      </div>
      <div class="cl-freebetBanner_fr" v-if="locale === 'fr'">
        <img src="https://d2m6jvlii5xwqv.cloudfront.net/banner/GUISJa3CeQHIvSd1D1sO7HvSoGn90dOtlCjElW5v.jpeg" />
      </div>
    </div>-->
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import oddsChange from '@/components/components/betslipCom/oddsChange.vue'
import betslipClear from '@/components/components/betslipClear.vue'
import noDataGameList from '@/components/components/fastGames/noDataGameList.vue'
import { pubSub } from '@/assets/js/utils/contestListRestore.js'

export default {
  components: { oddsChange, betslipClear, noDataGameList },
  data() {
    return {
      oldtickets: []
    }
  },
  computed: {
    noDataList() {
      return [
        {
          icon: 'search',
          title: { en: 'Matches search', fr: 'Recherche de correspondances' },
          word: {
            en: 'Search the match you want to bet',
            fr: 'Recherchez le match sur lequel vous souhaitez parier'
          },
          fn: () => {
            // Lib.common.event_statistics('Betslip_Search_Click')
            // this.$router.push({
            //   path: `/${this.locale}/search`
            // })
          },
          path: `/${this.locale}/search`
        },
        {
          icon: 'hottest',
          title: { en: 'Hottest tickets', fr: 'Billets les plus chauds' },
          word: {
            en: 'Best offers for you',
            fr: 'Les meilleures offres pour vous'
          },
          fn: () => {
            Lib.common.event_statistics('Betslip_HottestTicket_Click')
            // this.$router.push({
            //   path: `/${this.locale}/hottestTickets-concise`
            // })
          },
          path: `/${this.locale}/hottestTickets-concise`
        },
        {
          icon: 'create',
          title: { en: 'Create betslip', fr: 'Créer un bulletin de pari' },
          word: {
            en: 'Generate your ticket automatically',
            fr: 'Générez votre ticket automatiquement'
          },
          fn: () => {
            Lib.common.event_statistics('Betslip_CreateBetslip_Click')
            // this.$router.push({
            //   path: `/${this.locale}/createBetslip`
            // })
          },
          path: `/${this.locale}/createBetslip`
        }
      ]
    },
    tickets() {
      return this.$store.state.tickets
    },
    shareCode() {
      return this.$route.params.shareCode
    },
    locale() {
      return this.$store.state.root.locale
    }
  },
  watch: {
    tickets(val, oldVal) {
      this.oldtickets = oldVal
    }
  },
  mounted() {
    // 是否是分享的页面
    if (this.shareCode) {
      // 设置分享的ticketsId的过期时间
      this.shareCodeExpireTime()
      // 获取分享的订单内容
      this.shareBet()
    }
  },
  methods: {
    oldOdds(id) {
      const item = this.oldtickets.find((a) => a.id == id)
      return item ? Number(item.odds).toFixed(2) : '-'
    },
    // goFreebetGiveaway() {
    //   window.location.href = `/activity/freebetGiveaway/index.html?lang=${this.locale}`
    // },
    // 设置分享的ticketsId的过期时间
    shareCodeExpireTime() {
      Lib.common.event_statistics(`betslip_share_id_save`, this.shareCode)
      Lib.common.setCookie('betSharingTicketId', this.shareCode, 1 / (4 * 24))
    },
    // 分享处理
    shareBet() {
      Lib.common.errorReminder(this, '', 'B', '', this.shareCode)
      this.$axios_api.shareBet({ id: this.shareCode }).then((res) => {
        if (res.code === 0) {
          const shareTickets = res.data
          this.$store.commit('setTickets', shareTickets)
          Lib.store.set(
            'tickets',
            Lib.common.encrypt(JSON.stringify(shareTickets))
          )
          Lib.store.set(
            'shareTickets',
            Lib.common.encrypt(JSON.stringify(shareTickets))
          )
        }
      })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 前往比赛详情
    goMatchDetail(item) {
      Lib.common.event_statistics(`Betslip_Match_Click`)
      this.$router.push({
        path: `/${this.locale}/match/${item.match_id}`
      })
      pubSub.publish('betSlip')
    },
    // 删除一场比赛
    clearOne(index) {
      Lib.common.event_statistics(`Betslip_Delete_Click`)
      const newTicket = this.tickets.map((item) => item)
      newTicket.splice(index, 1)
      this.$store.commit('setTickets', newTicket)
      Lib.store.set('tickets', Lib.common.encrypt(JSON.stringify(newTicket)))
      this.judgeFollowBet()
    },
    // 删除所有比赛
    clearAll() {
      this.$store.commit('setTickets', [])
      Lib.store.remove('tickets')
      this.deleteShareCodeCookie()
    },
    // 清除分享share code
    deleteShareCodeCookie() {
      Lib.common.delCookie('betSharingTicketId')
    },
    // 判断是否在跟投
    judgeFollowBet() {
      // 跟投订单的比赛数据
      if (!Lib.common.getCookie('betSharingTicketId')) return
      const shareTicketsStorage = Lib.store.get('shareTickets')
      if (!shareTicketsStorage) return
      const shareTickets = Lib.common.decrypt(shareTicketsStorage)
      for (let i = 0; i < shareTickets.length; i++) {
        let bool = false
        for (let j = 0; j < this.tickets.length; j++) {
          if (shareTickets[i].id === this.tickets[j].id) bool = true
        }
        if (!bool) this.deleteShareCodeCookie()
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-betslipMarketList-wrap {
  width: 10rem;
  color: #363636;

  .cl-marketList-wrap {
    .cl-item {
      border-bottom: 0.5rem/36 solid @betslipLineColor;

      .cl-closeIcon {
        width: 40rem/36;
        .cl-icon {
          margin-left: 10rem/36;
          .sprite(@ticon-gray-close, 108rem);
        }
      }

      .cl-ticketsBox {
        flex: 1;
        flex-shrink: 0;
      }

      .cl-itemUp {
        padding: 8rem/36 10rem/36 9rem/36 0;
        box-sizing: border-box;

        .cl-top {
          .cl-left {
            .cl-time {
              background-color: #e8f0f2;
              font-weight: 300;
              margin-left: 12rem/36;
              padding: 2rem/36 5rem/36;
              border-radius: 2rem/36;
              white-space: nowrap;
              transform: scale(10/12);
              transform-origin: left center;
            }

            .cl-sportStatus {
              font-weight: bold;
              text-transform: uppercase;
              color: #e52f11;
              margin-right: 3rem/36;
            }

            .cl-teamName {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 250rem/36;
              font-size: 11rem/36;
              color: #363636;
              font-weight: 400;

              span {
                text-transform: uppercase;
              }
            }
          }

          .cl-right {
            .cl-icon {
              .sprite(@icon-close, 96rem);
            }
          }
        }

        .cl-bottom {
          font-weight: bold;
          padding-top: 7rem/36;
          text-transform: uppercase;
          font-size: 11rem/36;
          color: #363636;

          .cl-right {
            .cl-art {
              font-weight: 400;
              text-transform: capitalize;
              &.cl-isExpired {
                color: #f65858;
              }
              &.cl-isPreMatchStart {
                color: #a2a2a7;
              }
            }
          }
        }
      }

      .cl-itemDown {
        font-size: 10rem/36;
        font-weight: 400;
        padding: 5rem/36 8rem/36;
        box-sizing: border-box;
        background-color: #dffbec;
        height: 23rem/36;

        .cl-left {
          color: #f65858;
          .cl-odds {
            color: #30db7f;
          }
        }

        .cl-right {
          text-decoration: underline;
        }

        &.cl-itemDownReminder {
          background-color: #fef0ec;
        }
      }
    }
  }

  .cl-clear {
    text-align: center;
    color: #e52f11;
    font-weight: bold;
    padding: 5rem/36;
    text-transform: uppercase;
  }

  .cl-reminderBox {
    flex-direction: column;
    .cl-reminder {
      font-size: 11rem/36;
      font-weight: 400;
      color: #000;
      text-align: center;
      line-height: 15rem/36;
    }
    .cl-noDataList {
      .cl-item {
        width: 340rem/36;
        box-sizing: border-box;
        padding: 13rem/36;
        border-radius: 13rem/36;
        margin-bottom: 10rem/36;
        flex-shrink: 0;
        .cl-icon {
          margin-right: 17rem/36;
          &.no-search {
            .sprite(@tabs-search, 108rem);
          }
          &.no-hottest {
            .sprite(@tabs-hottest, 108rem);
          }
          &.no-create {
            .sprite(@tabs-create, 108rem);
          }
        }
        .cl-wordBox {
          flex: 1;
          .cl-title {
            font-size: 13rem/36;
            font-weight: bold;
            color: #000;
          }
          .cl-word {
            margin-top: 5rem/36;
            font-size: 11rem/36;
            font-weight: 400;
            color: #a2a2a7;
          }
        }
      }
    }
  }

  .cl-freebetBanner {
    position: relative;
    padding: 28rem/108 0 0;

    img {
      height: 47rem/36;
    }
  }
}
</style>
