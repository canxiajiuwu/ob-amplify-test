<template>
  <div class="cl-signIn-wrap cl-flexcc">
    <div class="cl-box">
      <div class="cl-delete" @click="closeSignIn"></div>

      <div class="cl-top">
        <div class="cl-name">{{ $t('signIn.title') }}</div>
        <div class="cl-coins">+{{ checkInInfo ? checkInInfo.coins : 0 }}</div>
      </div>

      <div class="cl-bottom">
        <div class="cl-art">{{ $t('signIn.art') }}</div>
        <div class="cl-list cl-flexcc">
          <div
            v-for="(item, index) in checkInInfo ? checkInInfo.lists : []"
            :key="index"
            class="cl-item"
          >
            <div class="cl-checkBox">
              <div v-if="item.checkIn" class="cl-checkModal">
                <div class="cl-coins">+{{ item.coins }}</div>
                <div class="cl-check"></div>
              </div>
              <div class="cl-coins">+{{ item.coins }}</div>
              <div class="cl-coinsIcon"></div>
            </div>
            <div class="cl-week" :class="{ 'cl-select': item.checkIn }">
              {{ $t('signIn.week')[index] }}
            </div>
          </div>
        </div>
        <div class="cl-button cl-flexcc" @click="closeSignIn">
          {{ $t('commonModal.ok') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    token() {
      if (Lib.store.get('token')) {
        return Lib.common.decrypt(Lib.store.get('token'))
      } else {
        return ''
      }
    },
    // 用户信息
    info() {
      return this.$store.state.info
    },
    checkInInfo() {
      return this.$store.state.checkInInfo
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {
    this.getCheckInInfo()
  },
  // 已成功挂载，相当ready()
  mounted() {},
  methods: {
    // 获取签到信息
    getCheckInInfo() {
      if (!this.checkInInfo) {
        this.$axios_api
          .checkinInfo({
            token: this.token
          })
          .then((res) => {
            if (res.code === 0) {
              this.$store.commit('setCheckInInfo', res.data)
            } else if (res.code === 10101) {
              //            Lib.common.errorReminder(this.$t("reminder.unLogin"),this,2);
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
      }
    },
    requestSignIn() {
      this.$axios_api
        .checkin({
          token: this.token
        })
        .then((res) => {
          if (res.code === 0) {
            this.checkInInfo.today = true
            const info = this.info
            info.coins = res.data.balance
            this.$store.commit('setInfo', info)
          } else if (res.code === 10101) {
            //            Lib.common.errorReminder(this.$t("reminder.unLogin"),this,2);
            Lib.common.errorReminder(
              this,
              'login',
              '',
              '',
              this.$t('reminder.unLogin'),
              '',
              this.$t('reminder.button.ok')
            )
          } else {
            Lib.common.errorReminderUp(this, true, res.msg, 0)
          }
        })
    },
    // 关闭签到
    closeSignIn() {
      this.$emit('closeSignIn')
    },
    // 前往大转盘
    goCoinsSpin() {
      this.closeSignIn()
      Lib.common.event_statistics('menu_get_cash')
      this.$router.push({ path: `/${this.$store.state.root.locale}/coinsSpin` })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.cl-signIn-wrap {
  width: 10rem;
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  .cl-box {
    width: 300rem/36;
    height: 320rem/36;
    border-radius: 5rem/36;
    position: relative;
    background-color: #fff;
    box-sizing: border-box;

    .cl-delete {
      position: absolute;
      right: 15rem/36;
      top: -50rem/36;

      .sprite(@icon-modal-close,108rem);
    }

    .cl-top {
      border-radius: 5rem/36 5rem/36 0 0;
      color: white;
      font-weight: bold;
      text-align: center;
      height: 90rem/36;
      background: linear-gradient(to bottom, #ff8800 0%, #ff6200 100%);

      .cl-name {
        padding-top: 16rem/36;
        font-size: 17rem/36;
      }

      .cl-coins {
        padding-top: 6rem/36;
        font-size: 33rem/36;
      }
    }

    .cl-bottom {
      color: #333;
      text-align: center;

      .cl-art {
        padding: 22rem/36 0 18rem/36;
      }

      .cl-list {
        .cl-item {
          margin: 0 2rem/36;

          .cl-checkBox {
            position: relative;
            width: 33rem/36;
            height: 44rem/36;
            border: 1px solid #ff9f32;
            box-sizing: border-box;
            border-radius: 5rem/36;
            background-color: #fdf5ec;

            .cl-checkModal {
              position: absolute;
              width: 33rem/36;
              height: 44rem/36;
              border-radius: 5rem/36;
              background-color: #ff6c00;
              left: 0;
              top: 0;

              .cl-coins {
                color: white;
              }

              .cl-check {
                margin: 4rem/36 auto 0;
                .sprite(@icon-gift-check,108rem);
              }
            }

            .cl-coins {
              padding-top: 5rem/36;
              color: #ff6c00;
              font-weight: bold;
            }

            .cl-coinsIcon {
              margin: 5rem/36 auto 0;
              .sprite(@menu-sign,108rem);
            }
          }

          .cl-week {
            font-size: 10rem/36;
            padding-top: 4rem/36;

            .cl-select {
              color: #ff8800;
            }
          }
        }
      }

      .cl-button {
        width: 220rem/36;
        height: 38rem/36;
        border-radius: 19rem/36;
        background-color: #ff6c00;
        font-size: 16rem/36;
        color: white;
        font-weight: bold;
        margin: 25rem/36 auto 0;
      }

      .cl-winCash {
        color: #ff6c00;
        font-weight: bold;
        padding-top: 18rem/36;
      }
    }
  }
}
</style>
