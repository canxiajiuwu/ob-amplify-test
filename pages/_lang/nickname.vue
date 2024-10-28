<template>
  <div class="cl-nickname-wrap">
    <div class="cl-topBox">
      <headBack
        :title="$t('account.nickname')"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div class="cl-settingBox">
      <div class="cl-content">
        <div class="cl-inputItem">
          <div
            class="cl-flexcc cl-input"
            :class="{
              'cl-select': inputStatus === 1,
              'cl-error': inputStatus === 2
            }"
          >
            <div class="cl-middle">
              <input
                type="text"
                v-model="nickname"
                @blur="setBlur"
                @focus="setFocus"
              />
            </div>
            <div class="cl-clear" @click.stop="clearInput" v-show="nickname" />
          </div>
        </div>

        <div class="cl-word">
          <span class="cl-icon" />
          {{ $t('account.nicknameArt') }}
        </div>

        <div class="cl-flexcc cl-lkButton cl-button" @click="submit">
          SUBMIT
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'

export default {
  name: 'Nickname',
  components: { headBack },
  data() {
    return {
      nickname: '',
      inputStatus: null
    }
  },
  computed: {
    info() {
      return this.$store.state.info
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    safeAreaTop() {
      return this.$store.state.safeAreaTop
    }
  },
  watch: {
    nickname(newValue, oldValue) {
      if (newValue.length > 15) {
        this.nickname = oldValue
      }
    }
  },
  mounted() {
    // 获取用户信息
    if (this.token) {
      this.getInfo()
      this.userAccountInfo()
    }
    // 隐藏skeleton
    Lib.common.hideSkeleton()
  },
  methods: {
    // 清楚输入
    clearInput() {
      this.nickname = ''
    },
    // 获取焦点
    setFocus() {
      this.inputStatus = 1
    },
    // 失去焦点
    setBlur() {
      this.inputStatus = 0
    },
    // 设置错误
    setError() {
      this.inputStatus = 2
    },
    // 获取info
    getInfo() {
      this.$axios_api
        .userInfo({
          token: this.token
        })
        .then((res) => {
          this.$store.commit('changeLoadingStatus', false)

          if (res.code === 0) {
            // 设置用户属性
            this.$store.commit('setInfo', res.data)
          } else if (res.code === 10101) {
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
      if (this.accountInfo) {
        this.$axios_api
          .userAccountInfo({
            token: this.token
          })
          .then((res) => {
            if (res.code === 0) {
              // 设置用户属性
              this.$store.commit('setAccountInfo', res.data)
              this.nickname = res.data.nickname
            }
          })
      }
    },
    submit() {
      Lib.common.event_statistics('modify_nickname_submit')
      if (this.nickname && this.nickname !== this.accountInfo.nickname) {
        this.$store.commit('changeLoadingStatus', true)
        this.$axios_api
          .changeNickname({
            token: this.token,
            nickname: this.nickname
          })
          .then((res) => {
            this.$store.commit('changeLoadingStatus', false)
            if (res.code === 0) {
              Lib.common.errorReminder(
                this,
                '',
                '',
                '',
                this.$t('account.nickNameSuccess'),
                '',
                this.$t('reminder.button.ok')
              )
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
    }
  }
}
</script>

<style scoped lang="less">
.cl-nickname-wrap {
  width: 10rem;
  min-height: 100vh;
  background-color: #fff;
  color: #333;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }

  .cl-heightDom {
    padding-bottom: 7rem/36;
    background-color: #d7dae4;
  }

  .cl-settingBox {
    .cl-content {
      padding: 26rem/36 30rem/36;

      .cl-inputItem {
        color: #7d7d7d;

        .cl-name {
          color: #333;
          font-weight: bold;
          padding: 15rem/36 0 6rem/36;
        }

        .cl-input {
          position: relative;
          width: 300rem/36;
          height: 40rem/36;
          border: 1rem/36 solid #929292;
          border-radius: @mainButtonRadius;

          &.cl-select {
            border: 1rem/36 solid @mainThemeColor;
          }

          &.cl-error {
            border: 1rem/36 solid #eb6149;
          }

          .cl-clear {
            position: absolute;
            right: 10rem/36;
            bottom: 12rem/36;
            z-index: 1;
            .sprite(@menu-clear, 108rem);
          }

          .cl-middle > input {
            border: none;
            outline: none;
            padding: 0;
            width: 280rem/36;
            height: 40rem/36;
          }

          .cl-right > input {
            border: none;
            outline: none;
            padding: 0;
            width: 210rem/36;
            height: 40rem/36;
          }
        }
      }

      .cl-word {
        color: #515151;
        padding-top: 10rem/36;

        .cl-icon {
          display: inline-block;
          .sprite(@menu-account-reminder,90rem);
        }
      }

      .cl-button {
        margin-top: 32rem/36;
        height: 47rem/36;
        width: 100%;
        font-size: 16rem/36;
      }
    }
  }
}
</style>
