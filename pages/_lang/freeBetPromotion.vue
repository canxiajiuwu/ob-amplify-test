<template>
  <div class="cl-freeBetPromotion-wrap">
    <!-- 返回 -->
    <headBack
      :title="$t('freeBet.title').toUpperCase()"
      :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
    />
    <!-- 橘色背景块 -->
    <div class="cl-bg1">
      <div class="cl-pic1">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/freeBetPromotion/bg.png`"
          alt="freeBet promotion"
        />
      </div>
      <a href="#blackTitle">
        <div class="cl-btn cl-flexcc">{{ $t('freeBetPromotion.claim') }}</div>
      </a>
      <div class="cl-scrollDisplay cl-flexcs">
        <div class="cl-trophy" />
        <div class="cl-scrollText">
          <div class="cl-scrolling">{{ msg }}</div>
        </div>
      </div>
      <h2 class="cl-h2 cl-blackTitle" id="blackTitle flexcs">
        ・{{ $t('freeBetPromotion.get') }}・
      </h2>
      <div class="cl-whiteBox">
        <div class="cl-innerBox cl-flexcb">
          <div class="cl-innerLeft">{{ $t('freeBetPromotion.first') }}</div>
          <div class="cl-innerRight cl-flexcc" v-if="isPC" @click="download">
            {{ $t('headerDownload.button') }}
          </div>
          <div class="cl-innerRight cl-flexcc" v-else @click="betNow">
            {{ $t('freeBetPromotion.upperBtn') }}
          </div>
        </div>
        <div class="cl-innerBox cl-flexcb">
          <div class="cl-innerLeft">{{ $t('freeBetPromotion.invite') }}</div>
          <div class="cl-innerRight cl-flexcc" @click="openInvite">
            {{ $t('freeBetPromotion.lowerBtn') }}
          </div>
        </div>
      </div>
    </div>
    <!-- 黑色背景块 -->
    <div class="cl-bg2">
      <h2 class="cl-h2 cl-bg2Title">{{ $t('freeBetPromotion.how') }}</h2>
      <div class="cl-step1">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/freeBetPromotion/Step1.png`"
          alt="freeBet promotion step1"
        />
        <div class="cl-stepWord cl-flexcs" :style="'left:' + 453 / 108 + 'rem'">
          <div class="cl-triangle" />
          <div class="cl-triangle" />
          <span>{{ $t('freeBetPromotion.step') }} 1</span>
        </div>
      </div>
      <div class="cl-stepDes">{{ $t('freeBetPromotion.step1') }}</div>
      <div class="cl-step2">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/freeBetPromotion/Step2.png`"
          alt="freeBet promotion step2"
        />
        <div class="cl-stepWord cl-flexcs" :style="'left:' + 146 / 108 + 'rem'">
          <div class="cl-triangle" />
          <div class="cl-triangle" />
          <span>{{ $t('freeBetPromotion.step') }} 2</span>
        </div>
      </div>
      <div class="cl-stepDes">{{ $t('freeBetPromotion.step2') }}</div>
      <div class="cl-step3">
        <img
          :src="`${STATICURL}/images/lang/${locale}/${country}/freeBetPromotion/Step3.png`"
          alt="freeBet promotion step3"
        />
        <div class="cl-stepWord cl-flexcs" :style="'left:' + 453 / 108 + 'rem'">
          <div class="cl-triangle" />
          <div class="cl-triangle" />
          <span>{{ $t('freeBetPromotion.step') }} 3</span>
        </div>
      </div>
      <div class="cl-stepDes">{{ $t('freeBetPromotion.step3') }}</div>
      <h2 class="cl-h2 cl-title">{{ $t('freeBetPromotion.title') }}</h2>
      <div
        class="cl-item"
        v-for="(item, index) in $t('freeBetPromotion.list')"
        :key="index"
      >
        {{ item }}
      </div>
    </div>

    <!--share box-->
    <div class="cl-shareContainer" v-if="isShareBoxShow">
      <div class="cl-box">
        <div class="cl-delete" @click="isShareBoxShow = false">
          <img
            src="~/assets/images/general/notSprites/promotions/inviteFriends/delete.png"
            alt
          />
        </div>
        <div class="cl-title">{{ $t('inviteFriend.share') }}</div>

        <div class="cl-shareBox">
          <div class="cl-item" v-if="!APP">
            <a
              :href="whatsappUrl"
              @click="appShareEvent(2)"
              target="_blank"
              id="J-share-whatsapp"
            >
              <div class="cl-icon">
                <img
                  src="~/assets/images/general/notSprites/promotions/inviteFriends/whatsapp.png"
                  alt="whatsapp"
                />
              </div>
            </a>
            <div class="cl-name">{{ $t('inviteFriend.whatsapp') }}</div>
          </div>
          <div class="cl-item" v-else @click="appshare(2)">
            <div class="cl-icon">
              <img
                src="~/assets/images/general/notSprites/promotions/inviteFriends/whatsapp.png"
                alt="whatsapp"
              />
            </div>
            <div class="cl-name">{{ $t('inviteFriend.whatsapp') }}</div>
          </div>

          <div class="cl-item cl-item2" v-if="!APP">
            <a
              :href="facebookUrl"
              @click="appShareEvent(1)"
              target="_blank"
              id="J-share-facebook"
            >
              <div class="cl-icon">
                <img
                  src="~/assets/images/general/notSprites/promotions/inviteFriends/facebook.png"
                  alt="facebook"
                />
              </div>
            </a>
            <div class="cl-name">{{ $t('inviteFriend.facebook') }}</div>
          </div>
          <div class="cl-item cl-item2" v-else @click="appshare(1)">
            <div class="cl-icon">
              <img
                src="~/assets/images/general/notSprites/promotions/inviteFriends/facebook.png"
                alt="facebook"
              />
            </div>
            <div class="cl-name">{{ $t('inviteFriend.facebook') }}</div>
          </div>

          <div class="cl-item" @click="doAction">
            <div class="cl-icon">
              <img
                src="~/assets/images/general/notSprites/promotions/inviteFriends/sms.png"
                alt="sms"
              />
            </div>
            <div class="cl-name">{{ $t('inviteFriend.sms') }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cl-bottom cl-flexcc">©2021 OneBet</div>
  </div>
</template>

<script>
import headBack from '@/components/components/headBack.vue'
import Lib from '@/assets/js/Lib'

export default {
  name: 'FreeBetPromotion',
  components: { headBack },
  data() {
    return {
      // 分享弹出控制
      isShareBoxShow: false,
      shareUrl: 'https://www.onebet.ug/en/refer',
      facebookUrl:
        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent('https://www.onebet.ug/en/refer'),
      whatsappUrl:
        'https://wa.me/?text=' +
        encodeURIComponent(
          'I sent you UGX 5,000 Bonus at Onebet – Quick and easy online sports betting in Uganda. Highest Odds, Free Withdrawals Register Free via: '
        ) +
        encodeURIComponent('https://www.onebet.ug/en/refer'),
      msg: '',
      timer: null
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    isPC() {
      return Lib.common.isPC()
    },
    apk() {
      return this.$store.state.apk
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  mounted() {
    if (!this.apk) this.downloadApk()
    // 隐藏skeleton
    Lib.common.hideSkeleton()
    this.inviteUser()

    this.msgGenerator()
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    download() {
      Lib.common.event_statistics('freebet-download-click')
      window.location.href = this.apk
    },
    // 获取下载地址
    downloadApk() {
      this.$axios_api.downloadApk({ URL: Lib.outUrl.download }).then((res) => {
        this.$store.commit('setApk', res.url)
      })
    },
    betNow() {
      Lib.common.event_statistics('freebet-bet-now-click')
      this.$router.push({ path: `/${this.$store.state.root.locale}` })
    },
    // 获取用户邀请数据
    inviteUser() {
      if (this.token) {
        this.$axios_api
          .inviteUser({
            token: this.token
          })
          .then((res) => {
            if (res.code === 0) {
              // 判断是否邀请过好友
              if (res.data.total > 0) {
                this.haveData = true
                this.total = res.data.total
              }

              this.code = res.data.code

              this.facebookUrl =
                'https://www.facebook.com/sharer/sharer.php?u=' +
                encodeURIComponent(
                  this.hostname +
                    `/${this.$store.state.root.locale}/refer?code=` +
                    this.code +
                    '&channel=3'
                )
              this.whatsappUrl =
                'https://wa.me/?text=' +
                encodeURIComponent(this.$t('inviteFriend.shareWords')) +
                encodeURIComponent(
                  this.hostname +
                    `/${this.$store.state.root.locale}/refer?code=` +
                    this.code +
                    '&channel=3'
                )

              // 赠送金总额
              this.gifts = res.data.gifts.toLocaleString()

              // 邀请用户列表
              this.tableData = res.data.users
            } else if (res.code === 10101) {
              /* empty */
            } else {
              Lib.common.errorReminder(
                this,
                '',
                '',
                '',
                res.msg,
                '',
                this.$t('reminder.button.ok')
              )
            }
          })
      }
    },
    openInvite() {
      Lib.common.event_statistics('freebet-invite-click')
      this.isShareBoxShow = true
    },

    appShareEvent(id) {
      if (id === 1) {
        Lib.common.event_statistics('freebet_refer_friends_facebook')
      } else {
        Lib.common.event_statistics('freebet_refer_friends_whatsapp')
      }
    },

    // 判断是否是移动端
    doAction() {
      const test = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
        navigator.userAgent
      )
      if (!test) {
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('inviteFriend.reminder'),
          '',
          this.$t('reminder.button.ok')
        )
      } else {
        this.sendsms()
      }
    },
    // 发送短信
    sendsms() {
      const u = navigator.userAgent
      // android终端
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      const name =
        this.$t('inviteFriend.message') +
        this.hostname +
        `/${this.$store.state.root.locale}/refer?code=` +
        this.code +
        '&channel=3'

      Lib.common.event_statistics('freebet_refer_friends_sms')

      if (isiOS) {
        window.location.href = 'sms:&body=' + encodeURIComponent(name)
      } else {
        window.location.href = 'sms:?body=' + encodeURIComponent(name)
      }
    },
    // app 分享
    appshare(index) {
      if (index === 1) {
        Lib.common.event_statistics('freebet_refer_friends_app_facebook')
      } else {
        Lib.common.event_statistics('freebet_refer_friends_app_whatsapp')
      }
      window.appInteraction.share(
        index,
        this.hostname +
          `/${this.$store.state.root.locale}/refer?code=` +
          this.code +
          '&channel=3',
        this.$t('inviteFriend.shareWords') +
          this.hostname +
          `/${this.$store.state.root.locale}/refer?code=` +
          this.code +
          '&channel=3'
      )
    },
    msgGenerator() {
      let mobile = Math.random().toString().slice(2, 6)
      let min = parseInt(Math.random() * 5) + 2
      this.timer = setInterval(() => {
        mobile = Math.random().toString().slice(2, 6)
        min = parseInt(Math.random() * 5) + 2
        if (this.$store.state.root.country === 'ug') {
          this.msg = '07****' + mobile + ' got FreeBet ' + min + ' minutes ago'
        } else {
          this.msg = '06****' + mobile + ' got FreeBet ' + min + ' minutes ago'
        }
      }, 7000)
    }
  }
}
</script>

<style scoped lang="less">
.cl-freeBetPromotion-wrap {
  .cl-shareContainer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .cl-box {
      background-color: #fff;
      width: 330rem/36;
      height: 210rem/36;
      border-radius: 7rem/36;
      position: relative;

      .cl-delete {
        position: absolute;
        right: 15rem/36;
        top: 10rem/36;

        img {
          width: 17rem/36;
          height: 17rem/36;
        }
      }

      .cl-title {
        text-align: center;
        font-weight: bold;
        margin-top: 20rem/36;
      }

      .cl-shareBox {
        padding-top: 65rem/36;
        display: flex;
        justify-content: space-around;

        .cl-item {
          .cl-icon {
            text-align: center;
            img {
              width: 40rem/36;
              height: 40rem/36;
            }
          }

          .cl-name {
            color: #333;
            font-size: 15rem/36;
            padding-top: 15rem/36;
          }
        }
      }
    }
  }
  .cl-bg1 {
    padding: 70rem/108 0 74rem/108;
    background: #f36e2e;
    .cl-pic1 {
      width: 803rem/108;
      height: 905rem/108;
      margin: 0 auto 24rem/108;
      img {
        width: 803rem/108;
        height: 905rem/108;
      }
    }
    .cl-btn {
      width: 920rem/108;
      height: 130rem/108;
      background: #ffef09;
      border: 2rem/108 solid #000000;
      border-radius: 65rem/108;
      font-size: 50rem/108;
      font-weight: 900;
      color: #151515;
      margin: 0 auto;
    }
    .cl-scrollDisplay {
      width: 920rem/108;
      height: 64rem/108;
      background: #b4420c;
      border: 2rem/108 solid #000000;
      border-radius: 2rem/108;
      margin: 53rem/108 auto 0;
      .cl-trophy {
        .sprite(@icon-trophy, 108rem);
        margin: 0 25rem/108 0 19rem/108;
      }
      .cl-scrollText {
        flex: 1;
        font-size: 30rem/108;
        color: #000;
        overflow: hidden;
        .cl-scrolling {
          animation: bouncein 7s linear infinite;
        }
        @keyframes bouncein {
          0% {
            transform: matrix(1, 0, 0, 1, 360, 0);
          }
          100% {
            transform: matrix(1, 0, 0, 1, -360, 0);
          }
        }
      }
    }
    .cl-blackTitle {
      width: fit-content;
      height: 68rem/108;
      padding: 0 18rem/108 0;
      margin: 35rem/108 0 0 80rem/108;
      color: #f36d2e;
      font-weight: 700;
      font-size: 40rem/108;
      background: #151515;
    }
    .cl-whiteBox {
      box-sizing: border-box;
      width: 920rem/108;
      padding: 0 22rem/108;
      background: #fff;
      border: 2rem/108 solid #000000;
      border-radius: 2rem/108;
      margin: 0 auto;
      .cl-innerBox {
        height: 152rem/108;
        &:first-child {
          border-bottom: 2rem/108 solid #000;
        }
        .cl-innerLeft {
          width: 642rem/108;
          font-size: 30rem/108;
          line-height: 34rem/108;
        }
        .cl-innerRight {
          width: 196rem/108;
          height: 76rem/108;
          background: #ffef09;
          border: 2rem/108 solid #000;
          font-weight: 900;
          font-size: 34rem/108;
          text-align: center;
        }
      }
    }
  }
  .cl-bg2 {
    padding: 50rem/108 0 1.6rem;
    background: #333333;
    text-align: center;
    .cl-bg2Title {
      color: #f36d2e;
      font-weight: 900;
      font-size: 50rem/108;
    }
    .cl-step1 {
      position: relative;
      width: 892rem/108;
      height: 698rem/108;
      margin: 98rem/108 auto 0;
      img {
        width: 892rem/108;
        height: 698rem/108;
      }
    }
    .cl-stepWord {
      position: absolute;
      top: 0;
      // left: 453rem/108;
      color: #ffef09;
      font-size: 40rem/108;
      font-weight: 900;
      .cl-triangle {
        border-width: 14rem/108 24rem/108;
        border-style: solid;
        border-color: transparent transparent transparent #ffef08;
      }
    }
    .cl-stepDes {
      color: rgba(255, 255, 255, 0.8);
      font-weight: 700;
      font-size: 30rem/108;
      padding: 60rem/108 0 120rem/108;
    }
    .cl-step2 {
      position: relative;
      width: 872rem/108;
      height: 698rem/108;
      margin: 98rem/108 auto 0;
      img {
        width: 872rem/108;
        height: 698rem/108;
      }
    }
    .cl-step3 {
      position: relative;
      width: 882rem/108;
      height: 698rem/108;
      margin: 98rem/108 auto 0;
      img {
        width: 882rem/108;
        height: 698rem/108;
      }
    }
    .cl-title {
      text-align: left;
      padding: 0 80rem/108 30rem/108;
      font-size: 50rem/108;
      font-weight: 700;
      color: #fff;
    }
    .cl-item {
      padding: 25rem/108 80rem/108 0;
      text-align: left;
      line-height: 36rem/108;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      font-size: 30rem/108;
    }
  }
  .cl-bottom {
    height: 50rem/108;
    font-size: 30rem/108;
    color: #fff;
    background: #b4420c;
  }
}
</style>
