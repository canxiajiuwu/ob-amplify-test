<template>
  <div class="cl-setting-wrap">
    <div class="cl-topBox">
      <headBack
        title="SETTING"
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div class="cl-itemBox">
      <div class="cl-flexcb cl-item">
        <div class="cl-left">
          <div class="cl-word">{{ $t('account.phoneNumber') }}</div>
        </div>
        <div class="cl-right">
          <span>
            {{
              accountInfo
                ? `${accountInfo.mobile} ${
                    phoneNumberCompany
                      ? '(' + phoneNumberCompany.toUpperCase() + ')'
                      : ''
                  }`
                : '*********'
            }}
          </span>
        </div>
      </div>
      <NuxtLink
        v-if="accountInfo"
        class="cl-flexcb cl-item"
        :to="`/${locale}/backup`"
      >
        <div class="cl-left">
          <div class="cl-word">{{ $t('backup.alternate') }}</div>
        </div>
        <div class="cl-flexcc cl-right">
          <span>
            {{
              sparesNumberCompany
                ? `${accountInfo.spares_mobile} ${
                    sparesNumberCompany
                      ? '(' + sparesNumberCompany.toUpperCase() + ')'
                      : ''
                  }`
                : $t('backup.notSet')
            }}
          </span>
          <div class="cl-icon" />
        </div>
      </NuxtLink>

      <div class="cl-flexcb cl-item" v-if="accountInfo" @click="openInputEmail">
        <div class="cl-left">
          <div class="cl-word">E-mail</div>
        </div>
        <div class="cl-flexcc cl-right cl-rightEmail">
          <span>
            {{ accountInfo.email != 0 ? accountInfo.email : '' }}
          </span>
          <div class="cl-icon" />
        </div>
      </div>
    </div>
    <inputEmail
      :show-input-email="showInputEmail"
      @closevisible="showInputEmail = false"
      @closeInputEmail="closeInputEmail"
      @emitSendEmailSuccess="emitSendEmailSuccess"
      where="setting"
    />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import headBack from '@/components/components/headBack.vue'
import inputEmail from '@/components/components/account/inputEmail.vue'

export default {
  components: { headBack, inputEmail },
  data() {
    return {
      phoneNumberCompany: '', // 手机号运营商
      sparesNumberCompany: '', // 备用手机号运营商
      showInputEmail: false
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
    },
    locale() {
      return this.$store.state.root.locale
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
    openInputEmail() {
      this.showInputEmail = true
    },
    closeInputEmail() {
      this.showInputEmail = false
    },
    // 发送邮件成功
    emitSendEmailSuccess() {
      this.showInputEmail = false
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
            }
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-setting-wrap {
  width: 10rem;
  min-height: 100vh;
  color: #333;

  .cl-topBox {
    position: fixed;
    top: 0;
    width: 10rem;
    z-index: 1;
  }
  .cl-heightDom {
    padding-bottom: 7rem/36;
  }

  .cl-itemBox {
    margin: 2rem/36 10rem/36 0;
    border-radius: 6rem/36;
    background-color: #fff;
    font-size: 11rem/36;

    .cl-item {
      margin: 0 11rem/36;
      height: 46rem/36;

      .cl-left {
        color: #000;
      }

      .cl-right {
        color: #a2a2a7;
        &.cl-rightEmail {
          text-transform: none;
        }

        .cl-icon {
          .sprite(@taccount-gray-more, 216rem);
        }
      }
    }

    .item + .cl-item {
      border-top: 1rem/36 solid #e9e9f3;
    }
  }
}
</style>
