<template>
  <div ref="casinoWrap" class="cl-casino-wrap">
    <headBack
      style="z-index: 1"
      is-white-back
      :title="$t('saveMoneyCasino.title')"
      bgcolor="transparent"
      color="#fff"
      :middle-word-style="{
        fontSize: 15 / 36 + 'rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        background:
          'linear-gradient(180deg, #EEEEEE 0%, #D8D8D8 100%), linear-gradient(180deg, #FFFFFF 0%, #9D87B3 100%)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'
      }"
    />
    <div
      class="cl-bg"
      :class="{ 'cl-isNewApp': isNewApp }"
      :style="{ paddingTop: safeAreaTop + 'px' }"
    />
    <!--  顶部banner处理  -->
    <div class="cl-topBox">
      <div class="cl-bg-word" v-if="stageStatus === 2">
        {{ $t('saveMoneyCasino.top1') }}
        <span>{{ cardInfo.points }}</span>
      </div>
      <div
        class="cl-bg-title"
        v-if="stageStatus === 1 || stageStatus === 2"
        v-html="$t('saveMoneyCasino.bgTitle')"
      />
      <div class="cl-bg3-word" v-if="stageStatus > 2">
        {{ $t('saveMoneyCasino.top2') }}
      </div>
      <div class="cl-bg3-number cl-flexcs" v-if="stageStatus > 2">
        <span>{{ cardInfo.saving_money.toFixed(2) }}</span>
        <!-- <div class="cl-icon" /> -->
      </div>
      <div class="cl-bg3-bottom" v-if="stageStatus > 2">
        {{ $t('saveMoneyCasino.top3') }} {{ cardInfo.points }}
        <span class="cl-splitLine" v-if="![5, 6].includes(stageStatus)">|</span>
        <span v-if="![5, 6].includes(stageStatus)"
          >{{ $t('saveMoneyCasino.top4') }}
          {{ getDate(cardInfo.cur_expire, 'dd/MM/yyyy') }}</span
        >
      </div>
    </div>
    <!--  文本内容  -->
    <div
      class="cl-contentBox cl-contentBoxV2"
      v-if="cardInfo.card_version === 2"
    >
      <div ref="topTabs" class="cl-top cl-top2">
        <div class="cl-flexcb cl-topTab" v-if="[3, 4, 7].includes(stageStatus)">
          <div
            v-for="(item, index) in cardStatusList"
            class="cl-flexcc cl-tabsItem"
            :class="{ 'cl-select': tabsIndex === index }"
            @click="changeTabs(index)"
            :key="index"
          >
            {{ item[locale] }}
          </div>

          <div class="cl-topLine" :style="{ left: topLineLeft }" />
        </div>
      </div>

      <div
        class="cl-bg-title"
        v-if="stageStatus === 5 || stageStatus === 6"
        v-html="$t('saveMoneyCasino.bgTitle')"
      />

      <div
        class="cl-cardList cl-cardListV2"
        v-if="
          !(
            tabsIndex === 1 &&
            cardInfo.r_num === 0 &&
            cardInfo.recieve_not_use_num === 0 &&
            (stageStatus === 4 || stageStatus === 7)
          )
        "
      >
        <div
          class="cl-claimReminder"
          v-if="
            stageStatus === 4 &&
            tabsIndex === 1 &&
            cardInfo.r_num > 0 &&
            cardInfo.r_amount
          "
        >
          <div class="cl-title">
            {{ absFun(cardInfo.r_amount) }} {{ $t('saveMoneyCasino.art1') }}
          </div>
          <!-- <div class="cl-word">{{$t('saveMoneyCasino.art2')}} {{cardInfo.t_num - cardInfo.r_num}}/{{cardInfo.t_num}}</div> -->
        </div>
        <!-- showGifts.col1.length === 0 && -->
        <cardList2
          :col="col1"
          :tabs-index="tabsIndex"
          :stage-status="stageStatus"
          :show-gifts="showGifts.col1"
          :card-info="cardInfo"
          :gift-default="giftsV2.default"
          :duoshaoqian="giftsInfo[tabsIndex].duoshaoqian"
          :duoshaozhang="giftsInfo[tabsIndex].duoshaozhang"
          :list-index="1"
          @clickCard="clickCard"
          v-if="
            [5, 6].includes(stageStatus) ||
            !(
              tabsIndex === 1 &&
              ((cardInfo.recieve_num === 10 && cardInfo.r_use < 50) ||
                (cardInfo.recieve_num === 22 &&
                  cardInfo.recieve_not_use_num === 0))
            )
          "
        />
        <div class="cl-describe" v-if="stageStatus === 3 && tabsIndex === 1">
          <span
            style="color: #979797"
            v-html="$t('saveMoneyCasino.renewal3')"
          />
          <span style="color: #f79b00">{{
            getDate(cardInfo.next_start, 'dd/MM/yyyy')
          }}</span>
        </div>

        <div
          class="cl-middleWrap"
          v-if="stageStatus === 4 && cardInfo.r_use < 114 && tabsIndex === 1"
        >
          <div class="cl-line" v-if="cardInfo.r_use < 50" />
          <div class="cl-middleBottom" v-if="cardInfo.r_use < 50">
            <div class="cl-title1">
              Unlock 12 times collect after used 50 gifts
            </div>
            <div
              class="cl-art"
              v-html="
                $t('saveMoneyCasino.v2art16', {
                  r_use: cardInfo.r_use,
                  r_left: 50 - cardInfo.r_use
                })
              "
            />
          </div>
        </div>

        <cardList2
          :col="col2"
          :tabs-index="tabsIndex"
          :stage-status="stageStatus"
          :show-gifts="showGifts.col2"
          :list-index="2"
          :card-info="cardInfo"
          v-if="showGifts.col2.length > 0"
        />
      </div>
      <!-- gifts通知提醒 -->
      <div
        class="cl-voice cl-flexcs"
        v-if="
          [2, 6].includes(stageStatus) ||
          (stageStatus === 4 && [0, 1].includes(tabsIndex))
        "
      >
        <div class="cl-icon" />
        <div class="cl-word">{{ $t('saveMoneyCasino.notice') }}</div>
      </div>

      <!-- 已达开卡条件，非首次 -->
      <div
        class="cl-renewalWrap"
        v-if="
          (stageStatus === 7 && cardInfo.r_num === 0 && tabsIndex === 1) ||
          stageStatus === 6
        "
      >
        <div
          class="cl-word"
          style="
            font-weight: bold;
            padding: 0.6rem 0;
            color: #1a1a1a;
            font-size: 0.31rem;
          "
          v-if="stageStatus !== 6"
          v-html="$t('saveMoneyCasino.renewal1')"
        />

        <div
          class="cl-singleMonth cl-flexcb"
          v-if="
            stageStatus === 6 ||
            (stageStatus === 7 &&
              cardInfo.points >= 500 &&
              cardInfo.r_num === 0)
          "
        >
          <div class="cl-left1">
            <div class="cl-single cl-flexcc">
              <div class="cl-icon" />
              <div class="cl-title">{{ $t('saveMoneyCasino.card1') }}</div>
            </div>

            <div class="cl-time">{{ $t('saveMoneyCasino.card3') }}</div>
          </div>

          <div class="cl-amount1">XAF 56</div>
        </div>

        <div
          class="cl-button cl-flexcc"
          v-if="
            stageStatus === 6 || (stageStatus === 7 && cardInfo.points >= 500)
          "
          @click="openCard"
        >
          {{ $t('saveMoneyCasino.renewal2') }}
        </div>
      </div>

      <!-- 已达到开卡条件，首次 -->
      <div class="cl-card" v-if="stageStatus === 2">
        <div class="cl-cardTop cl-flexcb">
          <div class="cl-left cl-flexcs">
            <div class="cl-icon" />
            <div class="cl-name">{{ $t('saveMoneyCasino.card1') }}</div>
          </div>

          <div class="cl-right">{{ $t('saveMoneyCasino.card2') }}</div>
        </div>

        <div class="cl-bottom cl-flexcb">
          <div class="cl-left">{{ $t('saveMoneyCasino.card3') }}</div>
          <div class="cl-right">{{ $t('saveMoneyCasino.card4') }}</div>
        </div>
      </div>

      <!-- 已达到开卡条件，首次 -->
      <div
        class="cl-button cl-flexcc"
        v-if="stageStatus === 2"
        @click="openCard"
      >
        {{ $t('saveMoneyCasino.card8') }}
      </div>
      <!-- 未达到开卡条件，首次 -->
      <div
        class="cl-singleMonth"
        v-if="
          [1, 5].includes(stageStatus) ||
          (tabsIndex === 1 &&
            (stageStatus === 4 || stageStatus === 7) &&
            cardInfo.points < 500 &&
            cardInfo.r_num === 0)
        "
      >
        <div class="cl-cardTop">
          <div class="cl-left cl-flexcc">
            <div class="cl-icon" />
            <div class="cl-word">{{ $t('saveMoneyCasino.card1') }}</div>
          </div>

          <div class="cl-right" v-if="stageStatus === 1">
            {{ $t('saveMoneyCasino.card2') }}
          </div>
        </div>

        <div class="cl-middle">
          <div class="cl-left">{{ $t('saveMoneyCasino.card3') }}</div>

          <div
            class="cl-right"
            :class="{
              'cl-rightAmount':
                stageStatus === 5 || stageStatus === 4 || stageStatus === 7
            }"
          >
            {{ $t('saveMoneyCasino.card4') }}
          </div>
        </div>

        <div class="cl-box">
          <div class="cl-word cl-word1" v-html="$t('saveMoneyCasino.card5')" />
          <div class="cl-lineBox">
            <div class="cl-line">
              <div
                class="cl-process"
                :style="{
                  width:
                    cardInfo.points >= 500 ? '100%' : cardInfo.points / 5 + '%'
                }"
              >
                <div class="cl-number">{{ cardInfo.points }}</div>
              </div>
            </div>

            <div class="cl-button cl-flexcc" @click="goBet">
              {{ $t('saveMoneyCasino.card6') }}
            </div>
          </div>
          <div class="cl-word">
            {{ $t('saveMoneyCasino.card7') }}
            <span>{{ cardInfo.points }}</span>
          </div>
        </div>
      </div>
      <!-- 未达到开卡条件 -->
      <div
        class="cl-notice"
        v-if="
          [1, 5].includes(stageStatus) ||
          (tabsIndex === 1 &&
            (stageStatus === 4 || stageStatus === 7) &&
            cardInfo.points < 500 &&
            cardInfo.r_num === 0)
        "
      >
        <div class="cl-title">{{ $t('saveMoneyCasino.notice1') }}:</div>
        <div class="cl-word">
          {{ $t('saveMoneyCasino.notice2') }}
          <span v-if="stageStatus === 1">{{
            $t('saveMoneyCasino.notice3')
          }}</span>
        </div>
      </div>
    </div>
    <div class="cl-contentBox" v-else>
      <div ref="topTabs" class="cl-top">
        <div class="cl-flexcb cl-topTab" v-if="[3, 4].includes(stageStatus)">
          <div
            v-for="(item, index) in cardStatusList"
            class="cl-flexcc cl-tabsItem"
            :class="{ 'cl-select': tabsIndex === index }"
            @click="changeTabs(index)"
            :key="index"
          >
            {{ item[locale] }}
          </div>

          <div class="cl-topLine" :style="{ left: topLineLeft }" />
        </div>
        <div v-else>
          <div class="cl-title">
            {{ $t('saveMoneyCasino.notStartTitle') }} 1197 XAF
          </div>
          <div class="cl-total">{{ $t('saveMoneyCasino.notStartTotal') }}</div>
        </div>
      </div>

      <div
        class="cl-cardList"
        v-if="!(tabsIndex === 1 && cardInfo.r_num === 0 && stageStatus === 4)"
      >
        <div
          class="cl-claimReminder"
          v-if="stageStatus === 4 && tabsIndex === 1 && cardInfo.r_num > 0"
        >
          <div class="cl-title">
            {{ absFun(cardInfo.r_amount) }} {{ $t('saveMoneyCasino.art1') }}
          </div>
          <div class="cl-word">
            {{ $t('saveMoneyCasino.art2') }}
            {{ cardInfo.t_num - cardInfo.r_num }}/{{ cardInfo.t_num }}
          </div>
        </div>

        <cardList
          :col="col1"
          :tabs-index="tabsIndex"
          :stage-status="stageStatus"
          :show-gifts="showGifts.col1"
          :list-index="1"
          @clickCard="clickCard"
        />

        <div class="cl-describe" v-if="stageStatus === 3 && tabsIndex === 1">
          {{ $t('saveMoneyCasino.renewal3') }}
          <span>{{ getDate(cardInfo.next_start, 'dd/MM/yyyy') }}</span>
        </div>

        <div
          class="cl-middleWrap"
          v-if="stageStatus === 4 && cardInfo.r_use < 114 && tabsIndex === 1"
        >
          <div
            class="cl-middleTop cl-flexcb"
            :class="{ 'cl-middleTopMargin': cardInfo.r_use >= 50 }"
          >
            <div class="cl-left">{{ $t('saveMoneyCasino.middle1') }}</div>
            <div class="cl-right">
              <span>{{ cardInfo.daily_num }}</span>
              {{ $t('saveMoneyCasino.middle2') }}
            </div>
          </div>
          <div class="cl-line" v-if="cardInfo.r_use < 50" />
          <div class="cl-middleBottom" v-if="cardInfo.r_use < 50">
            <div class="cl-title">{{ $t('saveMoneyCasino.middle3') }}</div>
          </div>
        </div>

        <cardList
          :col="col2"
          :tabs-index="tabsIndex"
          :stage-status="stageStatus"
          :show-gifts="showGifts.col2"
          :list-index="2"
          v-if="showGifts.col2.length > 0"
        />

        <!-- 没有gifts时 -->
        <div
          class="cl-noGift"
          v-if="
            [3, 4].includes(stageStatus) &&
            tabsIndex !== 1 &&
            gifts[tabsIndex].length === 0
          "
        >
          <div class="cl-icon" />
          <div class="cl-word" v-if="tabsIndex === 0">
            {{ $t('saveMoneyCasino.noGift') }}
          </div>
          <div class="cl-word" v-else-if="tabsIndex === 2">
            {{ $t('saveMoneyCasino.noUse') }}
          </div>
          <div class="cl-word" v-else-if="tabsIndex === 3">
            {{ $t('saveMoneyCasino.noExpire') }}
          </div>
        </div>
      </div>

      <!-- gifts通知提醒 -->
      <div
        class="cl-voice cl-flexcs"
        v-if="
          [2, 6].includes(stageStatus) ||
          ([3, 4].includes(stageStatus) &&
            tabsIndex === 0 &&
            gifts[tabsIndex].length !== 0)
        "
      >
        <div class="cl-icon" />
        <div class="cl-word">{{ $t('saveMoneyCasino.notice') }}</div>
      </div>

      <div
        class="cl-renewalWrap"
        v-if="
          (stageStatus === 4 && cardInfo.r_num === 0 && tabsIndex === 1) ||
          stageStatus === 6
        "
      >
        <div class="cl-word" v-if="stageStatus !== 6">
          {{ $t('saveMoneyCasino.renewal1') }}
        </div>

        <div
          class="cl-singleMonth cl-flexcb"
          v-if="
            stageStatus === 6 ||
            (stageStatus === 4 &&
              cardInfo.points >= 500 &&
              cardInfo.r_num === 0)
          "
        >
          <div class="cl-left1">
            <div class="cl-single cl-flexcc">
              <div class="cl-icon" />
              <div class="cl-title">{{ $t('saveMoneyCasino.card1') }}</div>
            </div>

            <div class="cl-time">{{ $t('saveMoneyCasino.card3') }}</div>
          </div>

          <div class="cl-amount1">XAF 18</div>
        </div>

        <div
          class="cl-button cl-flexcc"
          v-if="
            stageStatus === 6 || (stageStatus === 4 && cardInfo.points >= 500)
          "
          @click="openCard"
        >
          {{ $t('saveMoneyCasino.renewal2') }}
        </div>
      </div>

      <!--  已达到开卡条件，首次  -->
      <div class="cl-card" v-if="stageStatus === 2">
        <div class="cl-cardTop cl-flexcb">
          <div class="cl-left cl-flexcs">
            <div class="cl-icon" />
            <div class="cl-name">{{ $t('saveMoneyCasino.card1') }}</div>
          </div>

          <div class="cl-right">{{ $t('saveMoneyCasino.card2') }}</div>
        </div>

        <div class="cl-bottom cl-flexcb">
          <div class="cl-left">{{ $t('saveMoneyCasino.card3') }}</div>
          <div class="cl-right">{{ $t('saveMoneyCasino.card4') }}</div>
        </div>
      </div>

      <!--  已达到开卡条件，首次  -->
      <div
        class="cl-button cl-flexcc"
        v-if="stageStatus === 2"
        @click="openCard"
      >
        {{ $t('saveMoneyCasino.card8') }}
      </div>
      <!--  未达到开卡条件，首次  -->
      <div
        class="cl-singleMonth"
        v-if="
          [1, 5].includes(stageStatus) ||
          (tabsIndex === 1 &&
            stageStatus === 4 &&
            cardInfo.points < 500 &&
            cardInfo.r_num === 0)
        "
      >
        <div class="cl-cardTop">
          <div class="cl-left cl-flexcc">
            <div class="cl-icon" />
            <div class="cl-word">{{ $t('saveMoneyCasino.card1') }}</div>
          </div>

          <div class="cl-right" v-if="stageStatus === 1">
            {{ $t('saveMoneyCasino.card2') }}
          </div>
        </div>

        <div class="cl-middle">
          <div class="cl-left">{{ $t('saveMoneyCasino.card3') }}</div>

          <div
            class="cl-right"
            :class="{
              'cl-rightAmount': stageStatus === 5 || stageStatus === 4
            }"
          >
            {{ $t('saveMoneyCasino.card4') }}
          </div>
        </div>

        <div class="cl-box">
          <div class="cl-word cl-word1" v-html="$t('saveMoneyCasino.card5')" />
          <div class="cl-lineBox">
            <div class="cl-line">
              <div
                class="cl-process"
                :style="{
                  width:
                    cardInfo.points >= 500 ? '100%' : cardInfo.points / 5 + '%'
                }"
              >
                <div class="cl-number">{{ cardInfo.points }}</div>
              </div>
            </div>

            <div class="cl-button cl-flexcc" @click="goBet">
              {{ $t('saveMoneyCasino.card6') }}
            </div>
          </div>
          <div class="cl-word">
            {{ $t('saveMoneyCasino.card7') }}
            <span>{{ cardInfo.points }}</span>
          </div>
        </div>
      </div>
      <!--  未达到开卡条件  -->
      <div
        class="cl-notice"
        v-if="
          [1, 5].includes(stageStatus) ||
          (tabsIndex === 1 &&
            stageStatus === 4 &&
            cardInfo.points < 500 &&
            cardInfo.r_num === 0)
        "
      >
        <div class="cl-title">{{ $t('saveMoneyCasino.notice1') }}:</div>
        <div class="cl-word">
          {{ $t('saveMoneyCasino.notice2') }}
          <span v-if="stageStatus === 1">{{
            $t('saveMoneyCasino.notice3')
          }}</span>
        </div>
      </div>
    </div>

    <!--  投注成功提示框  -->
    <CollapseTransition>
      <div
        class="cl-paymentModal"
        @blur="paymentBlur"
        tabindex="-1"
        v-show="isPaymentModal"
      >
        <div class="cl-icon" />
        <div class="cl-title">{{ $t('saveMoneyCasino.payment1') }}</div>
        <div class="cl-word">
          {{ $t('saveMoneyCasino.payment2') }}
          <span>{{ cardInfo.t_amount }} XAF</span>
          {{ $t('saveMoneyCasino.payment3') }}
        </div>
      </div>
    </CollapseTransition>

    <!--  热门比赛  -->
    <div class="cl-hotGames-wrap" v-if="[3, 4, 7].includes(stageStatus)">
      <div class="cl-hotGames">
        <div class="cl-title">{{ $t('saveMoneyCasino.hotGames') }}</div>
        <div class="cl-gameList">
          <div
            class="cl-gameItem"
            v-for="(item, index) in gamesConfig"
            :key="index"
            @click="goOpenGame(item)"
          >
            <img
              v-lazy="item.hotGamesIcon"
              data-size="680x200"
              class="cl-itemImg"
            />
            <!-- <div class="cl-gameName cl-flexcs">{{item.name}}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardList from '@/components/components/saveMoneyCasino/cardList.vue'
import cardList2 from '@/components/components/saveMoneyCasino/cardList2.vue'
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import { casinoMixins } from '@/assets/js/casinoMixins'

export default {
  components: {
    headBack,
    cardList,
    cardList2,
    CollapseTransition: Lib.common.CollapseTransition
  },
  mixins: [casinoMixins],
  inject: ['openGame'],
  data() {
    return {
      col1: 2, // 劵展示为几行
      col2: 0, // 劵展示为几行
      cardStatusList: [
        { en: 'Available', fr: 'Disponible' },
        { en: 'Claim', fr: 'A récupérer' },
        { en: 'Used', fr: 'Utilisé' },
        { en: 'Expired', fr: 'Expiré' }
      ],
      tabsIndex: 1, // tabs栏顺序
      topLineLeft: 0,
      cardInfo: {}, // 钱包信息
      gifts: {
        default: [],
        0: [],
        1: [],
        2: [],
        3: []
      }, // gift列表
      giftsV2: {
        default: [],
        0: [],
        1: {
          first: [],
          second: []
        },
        2: [],
        3: []
      },
      isPaymentModal: false, // 是否开卡成功
      giftsInfo: [{}, {}, {}, {}]
    }
  },
  computed: {
    winApp() {
      return window.appInteraction
    },
    isNewApp() {
      return Lib.store.get('isNewApp')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    STATICURL() {
      return process.env.STATICURL
    },
    isGuest() {
      return this.$store.state.isGuest
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    info() {
      return this.$store.state.info
    },
    gamesConfig() {
      return this.$store.state.gamesConfig
    },
    // gamesConfigUrl游戏配置路径
    gamesConfigUrl() {
      return process.env.gamesConfigUrl
    },
    // 阶段状态
    stageStatus() {
      const date = new Date().getTime() / 1000

      if (
        (this.cardInfo.card_version !== 2 && this.cardInfo.is_open === 0) ||
        (this.cardInfo.card_version === 2 &&
          this.cardInfo.card_version_is_open === 0)
      ) {
        // 从未开卡
        if (this.cardInfo.points < 500) {
          // 未达到开卡条件
          return 1
        } else {
          // 已达到开卡条件
          return 2
        }
      } else {
        // 已开通过卡
        // eslint-disable-next-line no-lonely-if
        if (
          this.cardInfo.cur_start < date &&
          this.cardInfo.cur_expire >= date
        ) {
          // 会员持续期间
          if (this.cardInfo.next_start) {
            // 会员重新续卡
            return 3
          } else {
            // 会员未结束，还未续期
            if (
              this.cardInfo.recieve_num === 22 &&
              this.cardInfo.recieve_not_use_num === 0
            ) {
              return 7
            }
            // 会员卡可领取
            return 4
          }
        } else if (this.cardInfo.cur_expire < date) {
          // 会员卡过期
          if (this.cardInfo.points < 500) {
            // 未达到开卡条件
            return 5
          } else {
            // 已达到开卡条件
            return 6
          }
        }
      }

      return 1
    },
    // 展示gifts内容
    // eslint-disable-next-line vue/return-in-computed-property
    showGifts() {
      // 默认gifts配置
      if (
        this.stageStatus <= 2 ||
        this.stageStatus === 5 ||
        this.stageStatus === 6
      ) {
        this.col1 = 2
        this.col2 = 0
        return {
          col1:
            this.cardInfo.card_version === 2
              ? this.giftsV2.default
              : this.gifts.default,
          col2: []
        }
      } else if (this.tabsIndex === 0) {
        // 待使用
        this.col1 = 1
        this.col2 = 0
        return {
          col1:
            (this.cardInfo.card_version === 2
              ? this.giftsV2[0]
              : this.gifts[0]) || [],
          col2: []
        }
      } else if (this.tabsIndex === 1) {
        if (this.stageStatus === 4 || this.stageStatus === 7) {
          // 待领取
          if (this.cardInfo.r_use < 50) {
            // 未解开
            this.col1 = 1
            this.col2 = 1
            return {
              col1:
                (this.cardInfo.card_version === 2
                  ? this.giftsV2[1].first
                  : this.gifts[1]) || [],
              col2:
                (this.cardInfo.card_version === 2
                  ? this.giftsV2[1].second
                  : this.gifts[1]) || []
            }
          } else {
            // 已解开
            this.col1 = 2
            this.col2 = 0
            return {
              col1:
                (this.cardInfo.card_version === 2
                  ? this.giftsV2[1].first
                  : this.gifts[1]) || [],
              col2: []
            }
          }
        } else {
          this.col1 = 2
          this.col2 = 0
          return {
            col1: this.gifts.default || [],
            col2: []
          }
        }
      } else if (this.tabsIndex === 2) {
        // 已使用
        this.col1 = 1
        this.col2 = 0
        return {
          col1:
            (this.cardInfo.card_version === 2
              ? this.giftsV2[2]
              : this.gifts[2]) || [],
          col2: []
        }
      } else if (this.tabsIndex === 3) {
        // 已过期
        this.col1 = 1
        this.col2 = 0
        return {
          col1:
            (this.cardInfo.card_version === 2
              ? this.giftsV2[3]
              : this.gifts[3]) || [],
          col2: []
        }
      }
    },
    locale() {
      return this.$store.state.root.locale
    },
    isBack() {
      return this.$route.query.isBack
    }
  },
  mounted() {
    if (this.token) this.getInfo()
    else
      Lib.common.errorReminder(
        this,
        'login',
        '',
        '',
        this.$t('reminder.unLogin'),
        '',
        this.$t('reminder.button.ok')
      )
    this.reqSaveCardInfo()
    this.gamesConfigRequest()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          if (this.info.casino_gifts_num > 0) this.changeTabs(0)
        } else if (res.code === 10101) {
          // Lib.common.errorReminder(this.$t('reminder.unLogin'),this,2);
          Lib.common.errorReminder(
            this,
            'login',
            '',
            '',
            this.$t('reminder.unLogin'),
            '',
            this.$t('reminder.button.ok')
          )
        }
      })
    },
    // 切换劵类型tab
    changeTabs(index) {
      this.tabsIndex = index
      this.ComputedTopLineLeft()
      // 如果对应没有数据，则请求
      let length = 0
      if (this.cardInfo.card_version === 2) {
        if (this.tabsIndex === 1) {
          length = this.giftsV2[this.tabsIndex].first.length
        } else {
          length = this.giftsV2[this.tabsIndex].length
        }
      } else {
        length = this.gifts[this.tabsIndex].length
      }
      if (length === 0) this.reqGifts()
    },
    // 下划线left定位
    ComputedTopLineLeft() {
      this.$nextTick(() => {
        const dom = document.querySelector('.cl-select')
        if (dom)
          this.topLineLeft =
            dom.offsetLeft + (dom.offsetWidth - (33 * rem) / 36) / 2 + 'px'
      })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 金额格式化
    absFun(num) {
      return Lib.common.abs(num, 0)
    },
    // 请求省钱卡信息
    reqSaveCardInfo() {
      this.$store.commit('changeLoadingStatus', true)
      this.$axios_api
        .saveCardInfo({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.cardInfo = res.data.casino
            // this.cardInfo = {
            //   "is_open": 1,
            //   "t_num": 114,
            //   "t_amount": 1197,
            //   "r_num": 59,
            //   "r_amount": 1197,
            //   "cur_start": 1700623786,
            //   "cur_expire": 1700627386,
            //   "next_start": 0,
            //   "next_expire": 0,
            //   "id": 33,
            //   "saving_money": 0,
            //   "daily_num": 3,
            //   "r_use": 49,
            //   "open_num": 1,
            //   "points": 300
            // }
          }
          this.ComputedTopLineLeft()
        })
        .then(() => {
          this.reqDefaultGifts()
          if (
            !(
              this.stageStatus <= 2 ||
              this.stageStatus >= 5 ||
              this.stageStatus === 3
            )
          ) {
            this.reqGifts()
          }
        })
    },
    // gifts默认列表
    reqDefaultGifts() {
      if (this.cardInfo.card_version === 2) {
        this.$axios_api
          .saveCardDefaultV2({
            token: this.token
          })
          .then((res) => {
            this.$store.commit('changeLoadingStatus', false)
            if (res.code === 0) {
              this.$set(this.giftsV2, 'default', res.data)
            }
          })
      } else {
        this.$axios_api
          .saveCardDefault({
            token: this.token
          })
          .then((res) => {
            this.$store.commit('changeLoadingStatus', false)
            if (res.code === 0) {
              this.$set(this.gifts, 'default', res.data)
            }
          })
      }
    },
    // 获取指定gifts 列表
    reqGifts() {
      this.$store.commit('changeLoadingStatus', true)
      const tabsIndex = this.tabsIndex
      this.$axios_api
        .saveCardTickets({
          token: this.token,
          type: tabsIndex + 1
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            this.$set(
              this.cardInfo.card_version === 2 ? this.giftsV2 : this.gifts,
              tabsIndex,
              res.data.gifts
            )
            this.$set(
              this.giftsInfo[this.tabsIndex],
              'duoshaoqian',
              res.data.duoshaoqian
            )
            this.$set(
              this.giftsInfo[this.tabsIndex],
              'duoshaozhang',
              res.data.duoshaozhang
            )
          }
        })
    },
    // 前往投注
    goBet() {
      // 跳转到大厅
      this.isBack
        ? this.$router.back()
        : this.$router.push({ path: `/${this.locale}/casino` })
    },
    // 点击gift 卡片
    clickCard(data) {
      if (
        this.tabsIndex === 0 ||
        (this.cardInfo.recieve_not_use_num > 0 && this.tabsIndex === 1)
      ) {
        // 使用游戏
        // 跳转到大厅
        this.isBack
          ? this.$router.back()
          : this.$router.push({ path: `/${this.locale}/casino` })
      } else if (this.tabsIndex === 1) {
        // 领取劵
        this.saveCardClaim(data)
      }
    },
    // 开卡
    openCard() {
      this.$store.commit('changeLoadingStatus', true)

      this.$axios_api
        .saveCardOpen({ token: this.token })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)
          if (res.code === 0) {
            // 开启成功
            this.isPaymentModal = true
            this.$nextTick(() => {
              document.querySelector('.cl-paymentModal').focus()
            })
            this.tabsIndex = 1
            this.cardInfo.is_open = 1
            this.cardInfo.cur_expire = res.data.expire
            this.cardInfo.t_amount = res.data.money
            this.reqSaveCardInfo()
            this.reqGifts()
            this.$nextTick(() => {
              this.ComputedTopLineLeft()
            })
            setTimeout(() => {
              if (this.isPaymentModal) this.paymentBlur()
            }, 3000)
          } else if (res.code === 10207) {
            // 资金不足
            Lib.common.errorReminder(
              this,
              '',
              '',
              this.$t('saveMoneyCasino.payError1'),
              this.$t('saveMoneyCasino.payError2'),
              this.$t('saveMoneyCasino.payError3'),
              this.$t('saveMoneyCasino.payError4'),
              () => (this.$store.state.depositComShow = true)
            )
          } else {
            // 支付失败
            Lib.common.errorReminder(
              this,
              '',
              '',
              this.$t('saveMoneyCasino.payError9'),
              this.$t('saveMoneyCasino.payError10'),
              this.$t('saveMoneyCasino.payError11'),
              this.$t('saveMoneyCasino.payError12'),
              () => {
                Lib.common.initiateCall(this)
              }
            )
          }
        })
        .catch(() => {
          Lib.common.errorReminder(
            this,
            '',
            '',
            this.$t('saveMoneyCasino.payError5'),
            this.$t('saveMoneyCasino.payError6'),
            this.$t('saveMoneyCasino.payError7'),
            this.$t('saveMoneyCasino.payError8'),
            () => {
              this.openCard()
            }
          )
        })
    },
    // 领劵
    saveCardClaim(data) {
      this.$store.commit('changeLoadingStatus', true)
      if (data === 'v2') {
        this.$axios_api
          .saveCardClaimV2({
            token: this.token
          })
          .then((res) => {
            this.$store.commit('changeLoadingStatus', false)
            if (res.code === 0) {
              // 领取成功
              this.reqGifts()
              this.reqSaveCardInfo()
            } else {
              this.$store.commit('setToastInfo', res.msg)
            }
          })
      } else {
        this.$axios_api
          .saveCardClaim({
            token: this.token,
            cid: data.cid
          })
          .then((res) => {
            this.$store.commit('changeLoadingStatus', false)
            if (res.code === 0) {
              if (this.cardInfo.daily_num > 1) {
                // 今日还有多张
                this.cardInfo.r_num--
                // this.$store.commit(
                //   'setToastInfo',
                //   this.$t('saveMoneyCasino.claim1', { amount: (this.cardInfo.daily_num = res.data.daily_num) })
                // )
                Lib.common.errorReminder(
                  this,
                  '',
                  '',
                  this.$t('saveMoneyCasino.claimSuccess'),
                  this.$t('saveMoneyCasino.claim1', {
                    amount: (this.cardInfo.daily_num = res.data.daily_num)
                  }),
                  this.$t('saveMoneyCasino.keepClaim'),
                  this.$t('saveMoneyCasino.goUse'),
                  this.keepClaimCallback,
                  this.goUseCallback
                )
              } else if (this.cardInfo.daily_num === 1) {
                this.cardInfo.daily_num = res.data.daily_num
                if (this.cardInfo.r_num === 1) {
                  // 当期最后一张
                  this.$store.commit(
                    'setToastInfo',
                    this.$t('saveMoneyCasino.claim4')
                  )
                } else {
                  // 今日最后一张
                  // this.$store.commit('setToastInfo', this.$t('saveMoneyCasino.claim2'))
                  Lib.common.errorReminder(
                    this,
                    '',
                    '',
                    this.$t('saveMoneyCasino.claimSuccess'),
                    this.$t('saveMoneyCasino.claim2'),
                    this.$t('saveMoneyCasino.goUse'),
                    this.$t('saveMoneyCasino.payError12'),
                    this.goUseCallback
                  )
                }
                this.cardInfo.r_num--
              } else if (this.cardInfo.daily_num === 0) {
                // 当日无卷
                this.$store.commit(
                  'setToastInfo',
                  this.$t('saveMoneyCasino.claim3')
                )
              }
              // 领取成功后，劵数量减一
              this.gifts[1].forEach((item) => {
                if (item.cid === data.cid) {
                  item.number--
                }
              })
              // 领取成功后，劵数量加一
              let bool = false
              this.gifts[0].forEach((item) => {
                if (item.cid === data.cid) {
                  bool = true
                  item.number++
                }
              })
              if (!bool)
                this.gifts[0].push(Object.assign({}, data, { number: 1 }))
            } else {
              this.$store.commit('setToastInfo', res.msg)
            }
          })
      }
    },
    // 弹出框失去焦点
    paymentBlur() {
      this.isPaymentModal = false
      //  新手引导 - 领取优惠卷
      this.detectionGuide('receive') && this.openGuide('receive')
    },
    // 继续领取
    keepClaimCallback() {
      // 新手引导 - 继续领取
      this.detectionGuide('seemore') && this.openGuide('seemore')
    },
    // 去使用
    goUseCallback() {
      this.tabsScrollIntoView()
      // 新手引导 - 去使用
      this.detectionGuide('use') && this.openGuide('use')
    },
    // 检测是否进行过新手引导
    detectionGuide(str) {
      const guideObj = Lib.store.get('SaveMoneyCasinoGuide')
      return !(
        Object.prototype.toString.call(guideObj) === '[object Object]' &&
        guideObj[str]
      )
    },
    // tabs栏置顶
    tabsScrollIntoView() {
      const topTabs = this.$refs.topTabs
      // eslint-disable-next-line no-unused-expressions
      topTabs ? topTabs.scrollIntoView(true) : ''
    },
    // 打开新手引导
    openGuide(str) {
      const casinoWrap = this.$refs.casinoWrap
      const guide = this.$refs.guide
      // eslint-disable-next-line no-unused-expressions
      casinoWrap ? casinoWrap.scrollIntoView(true) : ''
      // eslint-disable-next-line no-unused-expressions
      guide ? guide.showEName(str) : ''
    },
    goOpenGame(item) {
      const gameName = item.name.replace(/\s+/g, '_')
      Lib.common.event_statistics(`casino_${gameName}`)
      Lib.common.openGameConfig(this, item.gameId, this.isGuest, item.role)
      this.openGame()
    },
    // 游戏数据请求
    gamesConfigRequest() {
      this.$axios_api
        .downloadApk({
          URL: `${this.gamesConfigUrl}game_cm.json?v=${new Date().getTime()}`
        })
        .then((res) => {
          if (res.data) {
            this.$store.commit('setGamesConfig', res.data)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.cl-casino-wrap {
  position: relative;
  min-height: 100vh;
  background-color: #fff;

  .cl-bg {
    width: 100%;
    height: 166rem/36;
    background-image: url('~/static/images/saveMoneyCasino/bg.png');
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    &.cl-isNewApp {
      background-size: 100% 166rem/36;
      background-position: bottom center;
      background-repeat: no-repeat;
      background-color: #171311;
    }
  }

  .cl-topBox {
    position: relative;
    z-index: 2;
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 77rem/36;
    padding: 0 10rem/36;

    .cl-bg-word {
      font-size: 13rem/36;
      padding-bottom: 8rem/36;
      color: #fff;

      span {
        color: #f3dea4;
      }
    }

    .cl-bg-title {
      font-size: 15rem/36;
      font-weight: bold;
      color: #fff;
      line-height: 1;
    }

    .cl-bg3-word {
      font-size: 13rem/36;
      color: #fff;
    }

    .cl-bg3-number {
      margin-top: 3rem/36;
      font-size: 20rem/36;
      color: #f3dea4;
      font-weight: bold;

      .cl-icon {
        width: 5rem/36;
        height: 8rem/36;
        background-image: url('~/static/images/saveMoneyCasino/more.png');
        background-size: cover;
        margin-left: 8rem/36;
        margin-top: 3rem/36;
      }
    }

    .cl-bg3-bottom {
      margin-top: 4rem/36;
      font-size: 11rem/36;
      color: rgba(255, 255, 255, 0.7);

      .cl-splitLine {
        color: rgba(255, 255, 255, 0.4);
      }

      span {
        margin-left: 5rem/36;
      }
    }
  }

  .cl-contentBox {
    position: relative;
    z-index: 2;

    &.cl-contentBoxV2 {
      border-radius: 26rem/36 26rem/36 0 0;
      padding-bottom: 0.65rem;
      background: white;

      .cl-bg-title {
        font-weight: bold;
        font-size: 0.37rem;
        line-height: 0.56rem;
        text-align: center;
        padding-top: 0.36rem;
      }

      .cl-top {
        height: fit-content;
        background: white;
      }

      .cl-voice {
        margin: 10rem/36 10rem/36;
      }

      .cl-cardList {
        min-height: 40rem/36;
        .cl-claimReminder {
          .cl-title {
            color: #1a1a1a;
            font-size: 0.37rem;
            font-weight: bold;
            padding-top: 0.21rem;
          }
        }

        .cl-describe {
          padding: 0.38rem 0.38rem 0;
          font-weight: 400;
        }
      }

      .cl-notice {
        padding-bottom: 0.2rem;
      }
    }

    .cl-top {
      height: 50rem/36;
      background: #ffffff linear-gradient(180deg, #e6cfff 0%, #ffffff 100%);
      border-radius: 26rem/36 26rem/36 0 0;

      .cl-title {
        text-align: center;
        color: #b29033;
        font-weight: bold;
        font-size: 11rem/36;
        padding-top: 10rem/36;
        line-height: 1;
      }

      .cl-total {
        text-align: center;
        color: #979797;
        font-size: 11rem/36;
        line-height: 1;
        padding-top: 7rem/36;
      }

      .cl-topTab {
        position: relative;
        height: 37rem/36;
        box-sizing: border-box;
        font-size: 11rem/36;
        line-height: 12rem/36;
        padding: 0 29rem/36;

        .cl-tabsItem {
          //flex: 1;
          white-space: nowrap;
          text-align: center;
          font-weight: bold;
          height: 29rem/36;
          color: #b497d1;
          position: relative;
          &.cl-select {
            color: #8c4dca;
          }
          @keyframes shake {
            5%,
            15%,
            25% {
              transform: skewY(5deg);
            }
            10%,
            20% {
              transform: skewY(-5deg);
            }

            28%,
            100% {
              transform: skewY(0);
            }
          }
        }

        .cl-tabsItem:active {
          background-color: #dcf0f9;
        }

        .cl-topLine {
          position: absolute;
          bottom: 0;
          width: 33rem/36;
          height: 3rem/36;
          background-color: #8c4dca;
          border-radius: 2rem/36;
          transition: left 200ms linear;
        }
      }
    }

    .cl-renewalWrap {
      .cl-word {
        margin: 18rem/36 25rem/36 16rem/36;
        color: #979797;
        text-align: center;
      }

      .cl-singleMonth {
        .cl-left1 {
          .cl-single {
            color: #000;
            font-size: 11rem/36;
            font-weight: bold;

            .cl-icon {
              width: 17rem/36;
              height: 17rem/36;
              background-image: url('~/static/images/saveMoneyCasino/single.png');
              background-size: cover;
              margin-right: 5rem/36;
            }
          }

          .cl-time {
            margin-top: 4rem/36;
            color: #979797;
          }
        }

        .cl-amount1 {
          font-size: 15rem/36;
          font-weight: bold;
          color: #f53137;
        }
      }
    }

    .cl-singleMonth {
      margin: 10rem/36 10rem/36 0;
      border-radius: 13rem/36;
      background-color: #fff3df;
      border: 1rem/36 solid #f5e5c9;
      padding: 10rem/36 10rem/36 13rem/36;
      color: #979797;
      font-size: 11rem/36;

      .cl-cardTop {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .cl-left {
          color: #000;
          font-size: 11rem/36;
          font-weight: bold;

          .cl-icon {
            width: 17rem/36;
            height: 17rem/36;
            background-image: url('~/static/images/saveMoneyCasino/single.png');
            background-size: cover;
            margin-right: 5rem/36;
          }
        }

        .cl-right {
          color: #f53137;
          font-size: 11rem/36;
          font-weight: bold;
        }
      }

      .cl-middle {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 4rem/36;

        .cl-right {
          color: #000;
          text-decoration: line-through;

          &.cl-rightAmount {
            position: absolute;
            right: 0;
            top: -8rem/36;
            text-decoration: none;
            font-size: 15rem/36;
            font-weight: bold;
            color: #f53137;
          }
        }
      }

      .cl-box {
        margin-top: 13rem/36;
        padding: 7rem/36;
        border-radius: 10rem/36;
        background-color: #fff;
        line-height: 17rem/36;

        .word1 /deep/ span {
          color: #eeaf00;
        }

        .cl-lineBox {
          padding: 3rem/36 0 20rem/36;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10rem/36;

          .cl-line {
            position: relative;
            width: 204rem/36;
            height: 9rem/36;
            border-radius: 5rem/36;
            background-color: #ffefd4;

            &::after {
              content: '500';
              position: absolute;
              top: -4rem/36;
              right: -25rem/36;
            }

            .cl-process {
              position: relative;
              height: 9rem/36;
              border-radius: 5rem/36;
              background: linear-gradient(180deg, #ff8e8e 0%, #ff5555 100%);

              .cl-number {
                position: absolute;
                top: 9rem/36;
                right: -6rem/36;
              }
            }
          }

          .cl-button {
            margin: 0;
            width: 65rem/36;
            height: 23rem/36;
            background: #ff5555;
            border-radius: 13rem/36;
            color: #fff;
            font-weight: bold;
            font-size: 10rem/36;
          }
        }
      }
    }

    .cl-notice {
      padding: 17rem/36 10rem/36 140rem/36;
      line-height: 17rem/36;

      .cl-title {
        color: #000000;
        font-weight: bold;
        font-size: 11rem/36;
      }

      .cl-word {
        color: #979797;
      }
    }

    .cl-voice {
      margin: 10rem/36 10rem/36 27rem/36;
      padding: 0 10rem/36;
      background-color: #ffe2e2;
      height: 25rem/36;
      border-radius: 12rem/36;
      color: #ff5555;
      font-size: 11rem/36;

      .cl-icon {
        width: 14rem/36;
        height: 14rem/36;
        background-image: url('~/static/images/saveMoneyCasino/voice.png');
        background-size: cover;
        margin-right: 7rem/36;
      }
    }

    .cl-card {
      margin: 13rem/36 10rem/36 0;
      border-radius: 13rem/36;
      background-color: #fff3df;
      font-size: 11rem/36;
      padding: 10rem/36 10rem/36 14rem/36;

      .cl-cardTop {
        .cl-icon {
          width: 14rem/36;
          height: 14rem/36;
          background-image: url('~/static/images/saveMoneyCasino/single.png');
          background-size: cover;
          margin-right: 3rem/36;
        }

        .cl-name {
          font-weight: bold;
          color: #000;
        }

        .cl-right {
          font-weight: bold;
          color: #f53137;
        }
      }

      .cl-bottom {
        margin-top: 4rem/36;

        .cl-left {
          color: #979797;
        }

        .cl-right {
          color: #000;
          text-decoration: line-through;
        }
      }
    }

    .cl-button {
      margin: 10rem/36 13rem/36 34rem/36;
      height: 46rem/36;
      background: #d8d8d8 linear-gradient(270deg, #4c3b2f 0%, #181210 100%);
      border-radius: 25rem/36;
      color: #f3dea4;
      font-weight: bold;
      font-size: 15rem/36;
    }

    .cl-cardList {
      position: relative;
      overflow: hidden;
      min-height: 140rem/36;

      .cl-claimReminder {
        font-size: 11rem/36;
        line-height: 1;
        text-align: center;

        .cl-title {
          color: #b29033;
          font-weight: bold;
        }

        .cl-word {
          color: #979797;
          padding-top: 7rem/36;
          padding-bottom: 14rem/36;
        }
      }

      .cl-describe {
        font-size: 11rem/36;
        padding: 0 60rem/36 22rem/36;
        text-align: center;
        color: #979797;
        line-height: 17rem/36;

        span {
          color: #000;
        }
      }

      .cl-middleWrap {
        padding: 0 10rem/36;
        font-size: 11rem/36;
        .cl-middleTop {
          color: #979797;

          .cl-right {
            text-align: right;
          }

          span {
            color: #000;
          }

          &.cl-middleTopMargin {
            margin-bottom: 20rem/36;
          }
        }

        .cl-line {
          border-top: 1rem/36 dashed #c6c1cb;
          margin: 17rem/36 0 11rem/36;
        }

        .cl-middleBottom {
          color: #b29033;
          font-weight: bold;
          text-align: center;
          margin-bottom: 14rem/36;

          .cl-title1 {
            font-size: 0.31rem;
            color: #1a1a1a;
            line-height: 0.47rem;
          }

          .cl-art {
            font-size: 0.31rem;
            color: #979797;
            font-weight: 400;
            margin-top: 0.1rem;
          }
        }
      }

      .cl-noGift {
        text-align: center;
        font-size: 11rem/36;
        color: #979797;
        margin: 57rem/36 0 84rem/36;

        .cl-icon {
          margin: 0 auto 7rem/36;
          width: 41rem/36;
          height: 41rem/36;
          background-image: url('~/static/images/saveMoneyCasino/noGift.png');
          background-size: cover;
        }
      }
    }
  }

  .cl-paymentModal {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1rem/36 4rem/36 0 rgba(0, 0, 0, 0.16);
    border-radius: 23rem/36 23rem/36 0 0;
    background-color: #fff;
    outline: none;
    z-index: 5;

    .cl-icon {
      margin: 23rem/36 auto 0;
      width: 52rem/36;
      height: 52rem/36;
      background-image: url('~/static/images/saveMoneyCasino/check.png');
      background-size: cover;
    }

    .cl-title {
      color: #363636;
      font-size: 13rem/36;
      font-weight: bold;
      text-align: center;
      margin-top: 18rem/36;
    }

    .cl-word {
      margin: 10rem/36 34rem/36 30rem/36;
      line-height: 17rem/36;
      font-size: 11rem/36;
      text-align: center;
      color: #979797;

      span {
        color: #f53137;
      }
    }
  }

  .cl-hotGames-wrap {
    background-color: #f2f2f4;
    padding-top: 10rem/36;

    .cl-hotGames {
      padding: 13rem/36 10rem/36;
      background-color: #fff;

      .cl-title {
        font-size: 11rem/36;
        font-weight: bold;
        padding-bottom: 10rem/36;
      }

      .cl-gameList {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        position: relative;

        .cl-gameItem {
          width: 340rem/36;
          height: 100rem/36;
          border-radius: 6rem/36;
          overflow: hidden;
          margin-bottom: 10rem/36;
          position: relative;

          > img {
            width: 340rem/36;
            height: 100rem/36;
            border-radius: 6rem/36;
          }
        }

        .cl-gameName {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 109rem/36;
          height: 24rem/36;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.4) 100%
          );
          color: #fff;
          box-sizing: border-box;
          padding: 0 7rem/36;
        }
      }
    }
  }
}
</style>
