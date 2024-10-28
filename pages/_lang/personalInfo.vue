<template>
  <div class="cl-setting-wrap">
    <div class="cl-topBox">
      <headBack
        :middle-word-style="{ fontSize: 15 / 36 + 'rem', fontWeight: 'bold' }"
      />
    </div>
    <div
      class="cl-heightDom"
      :style="{ height: `calc(47rem/36 + ${safeAreaTop}px)` }"
    />

    <div class="cl-settingBox">
      <div class="cl-flexcb cl-profile">
        <div class="cl-name">{{ $t('account.profile') }}</div>
        <div class="cl-flexcc cl-right" @click="selectAvatar">
          <div class="cl-icon">
            <img
              v-if="accountInfo && accountInfo.avatar"
              v-lazy="accountInfo.avatar"
              alt="avatar"
            />
          </div>
          <div class="cl-moreIcon" />
        </div>
      </div>
      <div class="cl-flexcb cl-nickname" @click="goNickName">
        <div class="cl-name">{{ $t('account.nickname1') }}</div>
        <div class="cl-flexcc cl-right">
          <div class="cl-user">{{ accountInfo && accountInfo.nickname }}</div>
          <div class="cl-moreIcon" />
        </div>
      </div>

      <div class="cl-list">
        <h2 class="cl-h2 cl-note">NOTE</h2>
        <div class="cl-item">{{ $t('account.note1') }}</div>
        <div class="cl-item">{{ $t('account.note2') }}</div>
        <div class="cl-item">{{ $t('account.note3') }}</div>
      </div>
    </div>
    <input
      v-show="false"
      type="file"
      ref="inputFile"
      @change="changeAvatar"
      accept="image/*"
    />
    <!-- 图片剪裁 -->
    <div class="cl-cropperBox">
      <cropper
        :img-chosen="imgChosen"
        :avatar-img="avatarImg"
        @imgCropped="imgCropped"
        @closeCropper="closeCropper"
        v-if="showCropper"
      />
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
import cropper from '@/components/components/cropper.vue'
import headBack from '@/components/components/headBack.vue'

export default {
  components: { headBack, cropper },
  data() {
    return {
      imgChosen: '',
      showCropper: false,
      workMimeType: '',
      avatarImg: ''
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
    },
    // 上传头像
    selectAvatar() {
      const dom = this.$refs.inputFile
      dom && dom.click()
    },
    // 选中图片回调
    changeAvatar() {
      const avatar = this.$refs.inputFile.files[0]
      this.avatarImg = avatar
      // 选中图片后打开cropper, 传入选中的图片
      this.imgChosen = URL.createObjectURL(avatar)
      this.workMimeType = avatar.type
      this.showCropper = true
    },
    // 关闭图片剪裁框
    closeCropper() {
      this.showCropper = false
      // 清除上一张图片的类型
      this.workMimeType = ''
    },
    // 图片剪裁成功
    imgCropped(img) {
      this.$store.commit('setAccountInfo', { ...this.accountInfo, avatar: img })
    },
    // 前往修改昵称
    goNickName() {
      Lib.common.event_statistics('account_nickname')
      this.$router.push({ path: `/${this.locale}/nickname` })
    }
  }
}
</script>

<style scoped lang="less">
.cl-setting-wrap {
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
    .cl-profile {
      height: 43rem/36;
      margin-left: 10rem/36;
      border-bottom: 1rem/36 solid #c1cbd5;

      .cl-right {
        .cl-icon {
          overflow: hidden;
          width: 31rem/36;
          height: 31rem/36;
          border-radius: 50%;
          border: 1rem/36 solid #c1cbd5;

          img {
            width: 31rem/36;
            height: 31rem/36;
          }
        }

        .cl-moreIcon {
          margin: 0 10rem/36;
          transform: rotate(180deg);
          .sprite(@icon-back, 90rem);
        }
      }
    }

    .cl-nickname {
      height: 43rem/36;
      padding-left: 10rem/36;
      border-bottom: 1rem/36 solid #c1cbd5;

      .cl-right {
        .cl-user {
          font-weight: bold;
        }

        .cl-moreIcon {
          margin: 0 10rem/36;
          transform: rotate(180deg);
          .sprite(@icon-back, 90rem);
        }
      }
    }

    .cl-list {
      padding: 20rem/36 10rem/36;

      .cl-note {
        font-weight: bold;
        padding-bottom: 3rem/36;
      }

      .cl-item {
        color: #515151;
        line-height: 16rem/36;
      }
    }
  }
  .cl-cropperBox {
    position: relative;
    z-index: 2;
  }
}
</style>
