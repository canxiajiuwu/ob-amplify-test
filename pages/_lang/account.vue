<template>
  <div class="cl-account-wrap">
    <div
      class="cl-userAccount"
      :style="{ paddingTop: `calc(7rem/36 + ${safeAreaTop}px)` }"
    >
      <div class="cl-iconBox cl-flexce">
        <NuxtLink :to="`/${locale}/inbox`">
          <div class="cl-inboxIcon" @click.prevent="goWhere('/inbox')">
            <div class="cl-notice" v-if="accountInfo?.message" />
          </div>
        </NuxtLink>
        <NuxtLink :to="`/${locale}/setting`">
          <div class="cl-setIcon" @click.prevent="goWhere('/setting')" />
        </NuxtLink>
      </div>

      <div class="cl-flexcb cl-userTop">
        <div class="cl-flexcc cl-left">
          <div class="cl-avatar">
            <img
              v-if="accountInfo && accountInfo.avatar"
              v-lazy="accountInfo.avatar"
              alt="avatar"
            />
          </div>
          <div class="cl-nameBox">
            <div
              class="cl-nickname"
              v-if="accountInfo"
              @click="goWhere('/personalInfo')"
            >
              {{ accountInfo.nickname }}
            </div>
            <div
              class="cl-nickname cl-flexcs"
              v-else
              @click="goWhere('/login')"
            >
              {{ $t('account.login') }}
              <div class="cl-icon" />
            </div>

            <div class="cl-card cl-flexcs">
              <div
                class="cl-icon"
                :class="{
                  'cl-icon1':
                    cardInfo &&
                    cardInfo.open_num &&
                    cardInfo.cur_expire > nowDate
                }"
              ></div>
              <div class="cl-name">
                {{
                  cardInfo && cardInfo.open_num
                    ? `${cardInfo.open_num} months`
                    : 'Nonactivated'
                }}
              </div>

              <div class="cl-time" v-if="cardInfo.cur_expire">
                <span>
                  |
                  {{
                    cardInfo.cur_expire < nowDate
                      ? $t('saveMoneyCasino.top5')
                      : $t('saveMoneyCasino.top4')
                  }}
                  {{ getDate(cardInfo.cur_expire, 'dd/MM/yyyy') }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="cl-right cl-flexce" @click="goWhere('/personalInfo')">
          <div
            class="cl-notice"
            v-if="!(accountInfo && accountInfo.isComplete)"
          />
          <div class="cl-icon" />
        </div>
      </div>

      <div
        class="cl-savingCard cl-flexcb"
        v-if="cardInfo.card_version !== 2"
        @click="goWhere('/saveMoneyCasino')"
      >
        <div class="cl-left cl-flexcs">
          <div class="cl-icon"></div>
          <div
            class="cl-art"
            :class="{
              'cl-artFull':
                cardInfo.is_open === 1 &&
                cardInfo.next_start &&
                cardInfo.saving_money
            }"
          >
            <div v-if="!cardInfo.is_open" v-html="$t('account.card1')"></div>
            <!--  开卡未过期,成功续期  -->
            <div
              v-html="
                $t('account.card4', {
                  saving_money: cardInfo.saving_money,
                  t_amount: cardInfo.t_amount
                })
              "
              v-else-if="
                cardInfo.is_open === 1 &&
                cardInfo.next_start &&
                cardInfo.saving_money
              "
            ></div>
            <!--  已过期  -->
            <div
              v-html="
                $t('account.card3', {
                  saving_money: cardInfo.saving_money,
                  t_amount: cardInfo.t_amount
                })
              "
              v-else-if="
                cardInfo.is_open === 1 &&
                cardInfo.cur_expire < nowDate &&
                cardInfo.saving_money
              "
            ></div>
            <!--  开卡未过期,还有劵  -->
            <div
              v-html="$t('account.card2', { r_num: cardInfo.r_amount })"
              v-else-if="
                cardInfo.is_open === 1 &&
                cardInfo.r_num > 0 &&
                cardInfo.cur_expire >= nowDate
              "
            ></div>
            <!--  开卡未过期，没有劵，未续期或者已过期  -->
            <div
              v-html="
                $t('account.card3', { saving_money: cardInfo.saving_money })
              "
              v-else-if="
                cardInfo.is_open === 1 &&
                cardInfo.r_num === 0 &&
                cardInfo.saving_money
              "
            ></div>
            <div
              v-html="$t('account.card5', { t_amount: cardInfo.t_amount })"
              v-else
            ></div>
          </div>
        </div>

        <div class="cl-right cl-flexcc" v-if="!cardInfo.is_open">
          {{ $t('account.check') }}
        </div>
        <div
          class="cl-right cl-flexcc cl-claim"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.r_num > 0 &&
            cardInfo.cur_expire > nowDate
          "
        >
          {{ $t('account.claim') }}
        </div>
        <div v-else-if="cardInfo.is_open === 1 && cardInfo.next_start"></div>
        <div class="cl-right cl-flexcc" v-else>{{ $t('account.Renew') }}</div>
      </div>
      <div
        class="cl-savingCard cl-flexcb"
        v-else
        @click="goWhere('/saveMoneyCasino')"
      >
        <div class="cl-left cl-flexcs">
          <div class="cl-icon"></div>
          <div
            class="cl-art"
            :class="{
              'cl-artFull':
                (cardInfo.is_open === 1 &&
                  cardInfo.next_start > nowDate &&
                  cardInfo.saving_money) ||
                (cardInfo.is_open === 1 &&
                  cardInfo.r_num > 0 &&
                  cardInfo.cur_expire >= nowDate &&
                  cardInfo.recieve_not_use_num === 0 &&
                  cardInfo.daily_num === 0)
            }"
          >
            <!--  未开通｜未登录  -->
            <div v-if="!cardInfo.is_open" v-html="$t('account.card1')"></div>
            <!--  开卡未过期,成功续期  -->
            <div
              v-else-if="
                cardInfo.is_open === 1 &&
                cardInfo.next_start > nowDate &&
                cardInfo.saving_money
              "
              v-html="
                $t('saveMoneyCasino.v2art3', { x: cardInfo.saving_money })
              "
            ></div>
            <!--  已过期  -->
            <div
              v-else-if="
                cardInfo.is_open === 1 &&
                cardInfo.cur_expire < nowDate &&
                cardInfo.cur_expire !== 0
              "
              v-html="
                $t('saveMoneyCasino.v2art5', { x: cardInfo.saving_money })
              "
            ></div>

            <div
              v-else-if="
                cardInfo.is_open === 1 &&
                cardInfo.r_num > 0 &&
                cardInfo.cur_expire >= nowDate
              "
            >
              <div
                v-if="cardInfo.daily_num > 0"
                v-html="$t('saveMoneyCasino.v2art1')"
              ></div>
              <div
                v-else-if="cardInfo.recieve_not_use_money > 0"
                v-html="
                  $t('saveMoneyCasino.v2art2', {
                    x: cardInfo.recieve_not_use_money
                  })
                "
              ></div>
              <div
                v-else-if="cardInfo.r_use < 50 && cardInfo.recieve_num >= 10"
                v-html="
                  $t('saveMoneyCasino.v2art3', { x: cardInfo.saving_money })
                "
              ></div>
              <div
                v-else-if="
                  cardInfo.recieve_not_use_num === 0 && cardInfo.daily_num === 0
                "
                v-html="
                  $t('saveMoneyCasino.v2art14', { x: cardInfo.saving_money })
                "
              ></div>
              <div
                v-else
                v-html="
                  $t('saveMoneyCasino.v2art4', { x: cardInfo.saving_money })
                "
              ></div>
            </div>
            <!-- 卷领完了但是还有卷没过期 -->
            <div
              v-else-if="
                cardInfo.r_num === 0 && cardInfo.recieve_not_use_money > 0
              "
              v-html="
                $t('saveMoneyCasino.v2art2', {
                  x: cardInfo.recieve_not_use_money
                })
              "
            ></div>
            <!--  开卡未过期，没有劵，未续期或者已过期  -->
            <div
              v-else-if="
                cardInfo.is_open === 1 &&
                cardInfo.r_num === 0 &&
                cardInfo.saving_money
              "
              v-html="$t('saveMoneyCasino.v2art5')"
            ></div>
          </div>
        </div>

        <div class="cl-right cl-flexcc" v-if="!cardInfo.is_open">
          {{ $t('account.check') }}
        </div>
        <div
          class="cl-right cl-flexcc cl-claim"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.cur_expire > nowDate &&
            cardInfo.recieve_not_use_num > 0 &&
            cardInfo.daily_num === 0
          "
        >
          {{ $t('saveMoneyCasino.v2art6') }}
        </div>
        <div
          class="cl-right cl-flexcc cl-claim"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.r_num > 0 &&
            cardInfo.cur_expire > nowDate &&
            cardInfo.daily_num === 10
          "
        >
          {{ $t('account.claim') }}
        </div>
        <div
          class="cl-right cl-flexcc cl-claim"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.cur_expire > nowDate &&
            cardInfo.daily_num === 0 &&
            cardInfo.daily_use_num > 0
          "
          @click.prevent="goWhere('/casino')"
        >
          {{ $t('saveMoneyCasino.v2art6') }}
        </div>
        <!--    已过期    -->
        <div
          class="cl-right cl-flexcc"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.cur_expire < nowDate &&
            cardInfo.saving_money
          "
        >
          {{ $t('account.Renew') }}
        </div>
        <div
          class="cl-right cl-flexcc"
          v-else-if="
            cardInfo.is_open === 1 &&
            cardInfo.cur_expire > nowDate &&
            cardInfo.next_start < nowDate &&
            cardInfo.saving_money &&
            cardInfo.recieve_num >= 22
          "
        >
          {{ $t('account.Renew') }}
        </div>
      </div>
      <div class="cl-balanceBox">
        <div class="cl-balanceWord cl-flexcs">
          <div class="cl-name">{{ $t('account.balance') }}</div>
          <div
            class="cl-eyeIcon"
            :class="{ 'cl-eyeOpenIcon': !isHiddenInfo }"
            @click="changeHiddenInfo"
          />
        </div>

        <div class="cl-balance">
          {{ $t('units') }}
          <span v-if="isHiddenInfo">****</span>
          <span v-else>{{
            info && info.balance ? absFun(info.balance) : 0
          }}</span>
        </div>
        <div class="cl-flexcc cl-balanceWay">
          <NuxtLink :to="`/${locale}/withdraw`">
            <div
              class="cl-flexcc cl-bsbb cl-withdraw"
              @click.prevent="goWhere('/withdraw')"
            >
              {{ $t('account.withdraw') }}
            </div>
          </NuxtLink>
          <NuxtLink :to="`/${locale}/deposit`">
            <div
              class="cl-flexcc cl-bsbb cl-deposit"
              @click.prevent="goWhere('/deposit')"
            >
              {{ $t('account.deposit') }}
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="cl-indexCardShadow cl-giftsWrap">
        <h2 class="cl-h2 cl-title">{{ $t('account.authority') }}</h2>

        <div class="cl-centerBox cl-flexcc">
          <NuxtLink :to="`/${locale}/gift`" style="flex: 1">
            <div class="cl-gift" @click.prevent="goWhere('/gift')">
              <div class="cl-right">
                <div class="cl-amountBox">
                  <div class="cl-amount">{{ info?.gifts_num || 0 }}</div>
                </div>
                <div class="cl-name">{{ $t('account.gift') }}</div>
              </div>
            </div>
          </NuxtLink>
          <div class="cl-middleLine" />
          <NuxtLink :to="`/${locale}/casinoGift`" style="flex: 1">
            <div class="cl-gift" @click.prevent="goWhere('/casinoGift')">
              <div class="cl-right">
                <div class="cl-amountBox">
                  <div class="cl-amount">
                    {{ info ? info.casino_gifts_num : 0 }}
                  </div>
                </div>
                <div class="cl-name">{{ $t('account.casinoGift') }}</div>
              </div>
            </div>
          </NuxtLink>
          <div class="cl-middleLine" />
          <NuxtLink :to="`/${locale}/freeBetList`" style="flex: 1">
            <div
              class="cl-gift cl-freebet"
              @click.prevent="goWhere('/freeBetList')"
            >
              <div class="cl-right">
                <div class="cl-amountBox">
                  <div class="cl-amount">
                    {{ info ? absFun(info.freeBet) : 0.0 }}
                  </div>
                </div>
                <div class="cl-name">{{ $t('freeBet.name') }}</div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div
          class="cl-voice cl-flexcs"
          v-if="info && (info.gifts_num > 0 || info.casino_gifts_num > 0)"
        >
          <div class="cl-icon" />
          <div class="cl-word" v-if="giftsNotice">
            {{ $t('account.sportsgifts', { num: info.gifts_num }) }}
          </div>
          <div class="cl-word" v-else>
            {{ $t('account.casinogifts', { num: info.casino_gifts_num }) }}
          </div>
        </div>
      </div>
    </div>
    <div class="cl-container">
      <div class="cl-list">
        <NuxtLink :to="`/${locale}/transactionHistory`">
          <div
            class="cl-flexcc cl-itemBox"
            @click.prevent="goWhere('/transactionHistory')"
          >
            <div class="cl-historyIcon" />
            <div class="cl-flexcb cl-item">
              <div class="cl-left">
                <h3 class="cl-h3 cl-word">{{ $t('account.history') }}</h3>
              </div>
              <div class="cl-right">
                <div class="cl-icon" />
              </div>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink :to="`/${locale}/casinoHistory`">
          <div
            class="cl-flexcc cl-itemBox"
            @click.prevent="goWhere('/casinoHistory')"
          >
            <div class="cl-casinoIcon" />
            <div class="cl-flexcb cl-item">
              <div class="cl-left">
                <h3 class="cl-h3 cl-word">{{ $t('account.casinoHistory') }}</h3>
              </div>
              <div class="cl-right">
                <div class="cl-icon" />
              </div>
            </div>
          </div>
        </NuxtLink>

        <a :href="partnerUrl">
          <div
            class="cl-flexcc cl-itemBox"
            @click.prevent="goWhere(partnerUrl)"
          >
            <div class="cl-partnerIcon" />
            <div class="cl-flexcb cl-item">
              <div class="cl-left">
                <h3 class="cl-h3 cl-word">
                  {{ $t('account.partner') }}
                </h3>
              </div>
              <div class="cl-right">
                <div class="cl-icon" />
              </div>
            </div>
          </div>
        </a>
      </div>

      <client-only>
        <div v-if="bannerItem && bannerIsShow" class="cl-bannerItem">
          <img @click="itemClick(bannerItem)" :src="bannerItem.image" />
        </div>
      </client-only>

      <div class="cl-flexcc cl-footer-content">
        <div class="cl-width">
          <div style="height: calc(30rem / 36)" />
          <div class="cl-flexca">
            <div style="position: relative" @click="goContact">
              <div class="cl-liveWord" />
              <div class="cl-liveIcon" />
              <h2 class="cl-h2 cl-second">{{ $t('footer.online') }}</h2>
              <div class="cl-third">7/24</div>
            </div>
            <div>
              <div class="cl-mailIcon" />
              <h2 class="cl-h2 cl-second">{{ $t('footer.call') }}</h2>
              <div class="cl-third">{{ $t('mail') }}</div>
            </div>
          </div>
          <div style="height: calc(30rem / 36)" />
          <h2
            class="cl-flexcc cl-h2 cl-logOut"
            @click="logOut"
            v-if="accountInfo"
          >
            {{ $t('account.logout') }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import { casinoMixins } from '@/assets/js/casinoMixins'

export default {
  name: 'Account',
  mixins: [casinoMixins],
  inject: ['openGame'],
  data() {
    return {
      listData: [], // banner原始数据容器(未处理)
      isHiddenInfo: false, // 是否隐藏用户信息
      phoneNumberCompany: '', // 手机号运营商
      sparesNumberCompany: '', // 备用手机号运营商
      bannerIsShow: 0, // banner加载完成后显示
      cardInfo: {}, // casino 会员卡信息
      nowDate: new Date().getTime() / 1000,
      giftsNotice: false, // 展示内容序号
      giftNoticeInterval: undefined
    }
  },
  computed: {
    statusArrData() {
      return [
        1,
        !this.accountInfo,
        !!this.accountInfo,
        !this.accountInfo || !this.accountInfo.first_deposit_activity,
        this.accountInfo ? !this.accountInfo.isComplete : 0,
        this.accountInfo && this.accountInfo.skip_user,
        () => !Lib.common.getMajorEventsIsMore()
      ]
    },
    statusArr() {
      return (user_status) => {
        return this.statusArrData[user_status] instanceof Function
          ? this.statusArrData[user_status]()
          : this.statusArrData[user_status]
      }
    },
    // 处理后需要显示的banner
    bannerItem() {
      const nowTime = new Date().getTime() / 1000
      const bannerObj = this.listData.find(
        (item) => this.statusArr(item.user_status) && item.end_time > nowTime
      )
      if (bannerObj)
        Lib.common.loadImage(bannerObj.image, () => (this.bannerIsShow = 1))
      else this.bannerIsShow = 0
      return bannerObj
    },
    STATICURL() {
      return process.env.STATICURL
    },
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    winApp() {
      return window.appInteraction
    },
    isNewApp() {
      return Lib.store.get('isNewApp')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    },
    partnerUrl() {
      const baseStr = process.env.NODE_ENV === 'production' ? 'www' : 'staging'
      return `https://${baseStr}.onebetpartner.com/${this.country}/${this.locale}`
    }
  },
  beforeMount() {
    // 获取banner数据
    this.getData()
    // 更新数据
    // 获取用户信息
    if (this.token) {
      this.getInfo()
      this.userAccountInfo()
      this.reqSaveCardInfo()
    } else this.$prefetchRoutes(['login'])
    // 获取隐藏消息
    this.isHiddenInfo = Lib.store.get('isHiddenInfo')
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  beforeDestroy() {
    if (this.giftNoticeInterval) clearInterval(this.giftNoticeInterval)
  },
  methods: {
    // 请求省钱卡信息
    reqSaveCardInfo() {
      this.$axios_api
        .saveCardInfo({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.cardInfo = res.data.casino
          }
        })
    },
    // 日期格式化
    getDate(timeStamp, fmt) {
      return Lib.common.getDate(new Date(timeStamp * 1000), fmt)
    },
    // 金额格式化
    absFun(num) {
      return Lib.common.abs(num)
    },
    // 修改隐藏信息
    changeHiddenInfo() {
      this.isHiddenInfo = !this.isHiddenInfo
      Lib.store.set('isHiddenInfo', this.isHiddenInfo)
    },
    // 登出
    logOut() {
      // 退出登录
      this.$axios_api.logout({ token: this.token }).then((res) => {
        this.$store.commit('setInfo', null)
        this.$store.commit('setAccountInfo', null)
        this.$store.commit('savePhoneNumber', '')
        this.$store.commit('setCheckInInfo', null)
        this.$store.commit('setGiftList', [])
        this.$store.commit('setFreebetList', [])
        Lib.store.remove('token')
        Lib.store.remove('OB-TLACT')
        Lib.store.remove('newUserBenefits')
        if (this.isNewApp) return this.winApp.renewuserLogin('', 2)
        // 跳转到大厅
        this.$router.push({ path: `/${this.locale}` })
      })
    },
    // 获取info
    getInfo() {
      this.$axios_api.userInfo({ token: this.token }).then((res) => {
        this.$store.commit('changeLoadingStatus', false)
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setInfo', res.data)
          if (!this.info) return
          // 设置
          if (this.info.gifts_num > 0 && this.info.casino_gifts_num > 0) {
            this.giftNoticeInterval = setInterval(() => {
              this.giftsNotice = !this.giftsNotice
            }, 5000)
          } else if (this.info.gifts_num > 0) {
            this.giftsNotice = true
          } else if (this.info.casino_gifts_num > 0) {
            this.giftsNotice = false
          }
        } else if (res.code === 10101) {
          // Lib.common.errorReminder(this.$t('reminder.unLogin'),this,2)
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
    userAccountInfo() {
      this.$axios_api.userAccountInfo({ token: this.token }).then((res) => {
        if (res.code === 0) {
          // 设置用户属性
          this.$store.commit('setAccountInfo', res.data)
          this.phoneNumberCompany = Lib.common.phoneNumberCompany(
            this,
            this.accountInfo?.mobile
          )
          this.sparesNumberCompany = Lib.common.phoneNumberCompany(
            this,
            this.accountInfo?.spares_mobile
          )
          this.completeUserInfo()
        }
      })
    },
    // 跳转页面
    goWhere(path) {
      switch (path) {
        case '/deposit':
          Lib.common.event_statistics('account_deposit')
          break
        case '/withdraw':
          Lib.common.event_statistics('account_withdraw')
          break
        case '/gift':
          Lib.common.event_statistics('account_gifts')
          break
        case '/transactionHistory':
          Lib.common.event_statistics('account_Transaction_history')
          break
        case '/inbox':
          Lib.common.event_statistics('account_inbox')
          break
        case '/giftGuide':
          Lib.common.event_statistics('account_gifts_guide')
          break
        case '/dailyBetRefund':
          Lib.common.event_statistics('account_daily_Bet_Refund')
          break
        case '/betSharing':
          Lib.common.event_statistics('account_bet_sharing')
          break
        case '/downloadActivityTopic':
          Lib.common.event_statistics('account_app_download_banner')
          break
        case '/setting':
          Lib.common.event_statistics('account_setting')
          break
        case '/backup':
          Lib.common.event_statistics('account_backup')
          break
        case '/casino':
          Lib.common.event_statistics('account_casino')
          break
        case '/casinoGift':
          Lib.common.event_statistics('account_casinoGift')
          break
        case '/freeBetList':
          Lib.common.event_statistics('account_freeBetList')
          break
        case this.partnerUrl:
          Lib.common.event_statistics('account_onebetpartner')
          window.open(this.partnerUrl)
          return
      }
      if (path === '/foryou/setTeam' || path === '/foryou/setLeague') {
        const hostname =
          this.country === 'ug' ? process.env.hostname : process.env.hostnamecm
        window.location = `${hostname}/ssr/${this.locale}${path}`
        return
      }
      this.$router.push({ path: `/${this.locale}` + path })
    },
    // 第三方客服
    goContact() {
      Lib.common.event_statistics('account_online_help')
      // try {
      //   if (document.querySelector('#ze-snippet')) {
      //     zE('webWidget', 'open')
      //   } else {
      //     Lib.common.loadScript(
      //       'https://static.zdassets.com/ekr/snippet.js?key=5cc3263e-57bc-4cf7-9e51-4f1c996d5f81',
      //       Lib.common.serverInit,
      //       that.info
      //     )
      //   }
      // } catch (err) {
      //   console.log(err)
      // }
      Lib.common.initiateCall(this)
    },
    // 显示完善用户信息提示
    completeUserInfo() {
      if (!(this.accountInfo && this.accountInfo.isComplete)) {
        const date = new Date().getDate()
        let obj = Lib.store.get('isComplete')
        if (obj && obj.date === date && obj.times === 1) {
          Lib.common.errorReminder(
            this,
            'accountComplete',
            '',
            this.$t('account.completeTitle'),
            this.$t('account.completeInfo'),
            this.$t('account.setting'),
            this.$t('virtualFreebet.later')
          )
        } else if (obj && obj.date !== date) {
          obj = null
        }
        const newObj = Object.assign(
          {
            date,
            times: 0
          },
          obj
        )
        newObj.times++
        Lib.store.set('isComplete', newObj)
      }
    },
    // openOnegame() {
    //   Lib.common.event_statistics('account_casino_open_onegame')
    //   // this.req_xf_Card();
    //   if (this.winApp.type === 1) {
    //     //web
    //     window.open(Lib.outUrl.onegameUrl)
    //   } else {
    //     //app
    //     window.appInteraction.openBrowser(Lib.outUrl.onegameUrl)
    //   }
    // },
    // banner点击事件
    itemClick(item) {
      if (item.eventName) Lib.common.event_statistics(item.eventName)
      return Lib.common.openWay(item.open, this)(item)
    },
    // 获取数据
    getData() {
      const locale = this.locale // 获取语言
      const dataSTR = 'accountBannerData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
      let askFlag = 0 // 记录是否更新
      // 查询本地时间, true更新
      if (Lib.common.getBackstageDataIsRefresh(dataSTR, 'inquire')) askFlag = 1
      const data = Lib.store.get(dataSTR) // 获取本地数据
      // 查询本地数据是否完整
      // 完整,优先使用本地数据
      if (Array.isArray(data) && data.length) this.listData = data
      // 数据被破坏
      else askFlag = 1
      // 可以请求
      if (askFlag) {
        // 1.5秒后请求,不占主业务请求
        setTimeout(() => {
          // 获取数据
          this.$axios_api.getBackstageBanner({ type: 5 }).then((res) => {
            // 成功
            if (res.code === 0 && Array.isArray(res.data.account_banner)) {
              // 存入本地, 修改本地时间, 更新数据
              Lib.store.set(dataSTR, res.data.account_banner)
              Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
              this.listData = res.data.account_banner
            }
          })
        }, 1500)
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-account-wrap {
  min-height: 100vh;
  width: 10rem;
  background-color: #1c2029;

  .cl-userAccount {
    min-height: 310rem/36;
    box-sizing: border-box;
    padding: 0 13rem/36 4rem/36;
    background-color: #fff;

    .cl-iconBox {
      .cl-inboxIcon {
        position: relative;
        width: 23rem/36;
        height: 23rem/36;
        background-image: url('~/static/images/saveMoneyCasino/account/email.png');
        background-size: cover;
        margin-right: 17rem/36;
      }

      .cl-setIcon {
        position: relative;
        .sprite(@taccount-set, 108rem);
      }

      .cl-notice {
        position: absolute;
        right: -2rem/36;
        top: -2rem/36;
        width: 8rem/36;
        height: 8rem/36;
        border-radius: 50%;
        background-color: #ff3822;
      }
    }

    .cl-userTop {
      padding-top: 10rem/108;
      .cl-left {
        .cl-avatar {
          border-radius: 50%;
          overflow: hidden;
          .sprite(@account-un-login, 89rem);
          border: 1rem/36 solid #e9e9f3;
          img {
            width: 39rem/36;
            height: 39rem/36;
          }
        }

        .cl-nickname {
          font-size: 15rem/36;
          font-weight: bold;
          padding-left: 10rem/36;
          color: #000;

          .cl-icon {
            margin-left: 2rem/36;
            margin-top: 2rem/36;
            transform: rotate(180deg);
            .sprite(@icon-back, 108rem);
          }
        }

        .cl-card {
          padding-left: 10rem/36;
          padding-top: 5rem/36;

          .cl-icon {
            width: 17rem/36;
            height: 17rem/36;
            background-image: url('~/static/images/saveMoneyCasino/account/card1.png');
            background-size: cover;
            margin-right: 5rem/36;

            &.cl-icon1 {
              background-image: url('~/static/images/saveMoneyCasino/account/card2.png');
            }
          }

          .cl-name {
            color: @liveNameColor;
          }
          .cl-time {
            color: #a2a2a7;
            margin-left: 0.1rem;
          }
        }
      }

      .cl-right {
        .cl-notice {
          width: 8rem/36;
          height: 8rem/36;
          border-radius: 50%;
          background-color: #ff3822;
          margin-right: 5rem/36;
        }

        .cl-icon {
          .sprite(@icon-black-right, 108rem);
        }
      }
    }

    .cl-savingCard {
      margin: 15rem/36 auto 0;
      padding: 5rem/36 9rem/36 5rem/36 11rem/36;
      box-sizing: border-box;
      width: 310rem/36;
      min-height: 44rem/36;
      font-size: 10rem/36;
      background: linear-gradient(264deg, #4c3b2f 0%, #181210 100%);
      border-radius: 11rem/36 11rem/36 0 0;

      .cl-left {
        .cl-icon {
          width: 23rem/36;
          height: 23rem/36;
          background-image: url('~/static/images/saveMoneyCasino/account/card3.png');
          background-size: cover;
          margin-right: 7rem/36;
        }

        .cl-art {
          line-height: 14rem/36;
          width: 190rem/36;
          color: #ffffff80;

          &.cl-artFull {
            width: 250rem/36;
          }

          /deep/ span {
            color: #ffe89f;
          }
        }
      }

      .cl-right {
        width: 65rem/36;
        height: 23rem/36;
        border-radius: 13rem/36;
        background: #ab98be linear-gradient(90deg, #ffffff 0%, #9d87b3 100%);
        font-weight: bold;
        color: #000;

        &.cl-claim {
          background: transparent;
          border: 1px solid #ffffff;
          color: #fff;
        }
      }
    }

    .cl-balanceBox {
      height: 161rem/36;
      border-radius: 13rem/36;
      background: linear-gradient(
        210deg,
        #3bf0f5 -15%,
        @mainThemeColor 35%,
        @mainThemeColor 100%
      );

      .cl-balanceWord {
        padding-top: 15rem/36;
        padding-left: 22rem/36;

        .cl-name {
          margin-right: 8rem/36;
          font-size: 13rem/36;
          color: rgba(255, 255, 255, 0.6);
        }

        .cl-eyeIcon {
          .sprite(@taccount-close-eye, 108rem);

          &.cl-eyeOpenIcon {
            .sprite(@taccount-open-eye, 108rem);
          }
        }
      }

      .cl-balance {
        color: #fff;
        font-size: 27rem/36;
        font-weight: 800;
        padding: 16rem/36 0 26rem/36 22rem/36;
      }

      .cl-balanceWay {
        font-size: 13rem/36;
        font-weight: bold;
        color: #333;

        .cl-withdraw {
          width: 140rem/36;
          height: 36rem/36;
          border-radius: @mainButtonRadius;
          border: 1rem/36 solid @mainButtonComparedColor;
          color: @mainButtonComparedColor;
        }

        .cl-deposit {
          width: 140rem/36;
          height: 36rem/36;
          margin-left: 10rem/36;
          color: #333;
          border-radius: @mainButtonRadius;
          background-color: @balanceColor;
        }
      }
    }

    .cl-giftsWrap {
      margin-top: 17rem/36;
      border-radius: 13rem/36;
      padding: 10rem/36 10rem/36 0;
      overflow: hidden;
      color: @chooseColor;

      .cl-title {
        font-weight: bold;
      }

      .cl-gift {
        padding: 17rem/36 0 13rem/36;
        box-sizing: border-box;
        flex: 1;
        text-align: center;

        .cl-name {
          font-size: 11rem/36;
          padding-top: 5rem/36;
        }

        .cl-right {
          flex: 1;
          color: #333;

          .cl-amountBox {
            font-size: 19rem/36;
            font-weight: 800;
            line-height: 1;
          }
        }
      }

      .cl-middleLine {
        width: 1rem/36;
        height: 33rem/36;
        background-color: #d4dae1;
      }

      .cl-voice {
        padding: 0 10rem/36;
        background-color: #ffe2e2;
        height: 25rem/36;
        overflow: hidden;
        border-radius: 12rem/36;
        color: #ff5555;
        font-size: 11rem/36;
        margin-bottom: 10rem/36;

        .cl-icon {
          width: 14rem/36;
          height: 14rem/36;
          background-image: url('~/static/images/saveMoneyCasino/voice.png');
          background-size: cover;
          margin-right: 7rem/36;
        }

        .cl-word {
          animation: roll 5s linear infinite;
        }
      }
    }
  }

  .cl-container {
    background-color: #fff;
    padding-top: 5rem/36;

    .cl-list {
      color: #000;
      font-weight: 400;
      padding-left: 10rem/36;

      .cl-itemBox {
        padding: 7rem/36 0;

        .cl-phoneIcon {
          .sprite(@taccount-phone-number, 108rem);
        }

        .cl-plternateIcon {
          .sprite(@taccount-plternate, 108rem);
        }

        .cl-partnerIcon {
          .sprite(@taccount-partner, 108rem);
        }

        .cl-historyIcon {
          .sprite(@taccount-transaction-history, 108rem);
        }

        .cl-inboxIcon {
          .sprite(@taccount-inbox, 108rem);
        }

        .cl-rewardsIcon {
          .sprite(@taccount-rewards, 108rem);
        }

        .cl-problem-icon {
          .sprite(@account-problem, 108rem);
        }

        .cl-setTeam-icon {
          .sprite(@account-set-team, 108rem);
        }

        .cl-setLeague-icon {
          .sprite(@account-set-league, 108rem);
        }

        .cl-casinoIcon {
          width: 23rem/36;
          height: 23rem/36;
          background-image: url('~/static/images/saveMoneyCasino/account/casino.png');
          background-size: cover;
        }

        .cl-cash {
          .sprite(@account-cash, 108rem);
          margin-left: 3rem/36;
          animation: shake 2s ease-in-out infinite;
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

        .cl-item {
          flex: 1;
          margin-left: 7rem/36;
          padding-right: 13rem/36;

          .cl-cashLeft {
            display: flex;
          }
          .cl-left {
            color: #000;
          }

          .cl-right {
            text-align: right;

            span {
              color: #a2a2a7;
            }
            .cl-icon {
              .sprite(@ticon-back-grey, 108rem);
            }
            .cl-rewardsNum {
              margin-right: 5rem/36;
              color: @mainBrandColor;
            }
            .cl-inboxNum {
              margin-right: 5rem/36;
              height: 19rem/36;
              min-width: 19rem/36;
              padding: 0 6rem/36;
              background-color: #eb4949;
              border-radius: 10rem/36;
              color: #fff;
              font-weight: bold;
            }
            .cl-inbox {
              margin-right: 5rem/36;
              height: 10rem/36;
              width: 10rem/36;
              border-radius: 50%;
              background-color: #eb4949;
            }
          }
        }
      }

      //.cl-itemBox:first-child {
      //  padding-top: 0;
      //}
    }

    .cl-bannerItem {
      margin: 10/36rem 0 0;
      display: flex;
      justify-content: center;

      img {
        width: 340rem/36;
        border-radius: @mainButtonRadius;
      }
    }

    .cl-footer-content {
      height: 259rem/36;
      margin-top: 17rem/36;
      background-color: #1c2029;
      color: #e4e4e4;

      .cl-width {
        height: 259rem/36;
        width: 300rem/36;
        text-align: center;

        .cl-liveWord {
          position: absolute;
          top: 0;
          right: 20%;
          .sprite(@icon-live-word, 108rem);
        }

        .cl-liveIcon {
          margin: 0 auto;
          .sprite(@icon-live, 108rem);
        }

        .cl-mailIcon {
          margin: 0 auto;
          .sprite(@icon-mail, 108rem);
        }

        .cl-second {
          font-size: 11rem/36;
          font-weight: bold;
        }

        .cl-third {
          font-size: 10rem/36;
          font-weight: 400;
        }
      }

      .cl-logOut {
        width: 300rem/36;
        height: 40rem/36;
        background-color: #3a3b44;
        border-radius: @mainButtonRadius;
        font-weight: bold;
        font-size: 13rem/36;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

@keyframes roll {
  0%,
  10% {
    transform: translate(0, 150%);
  }
  30%,
  70% {
    transform: translate(0, 0);
  }
  90%,
  100% {
    transform: translate(0, -150%);
  }
}
</style>
