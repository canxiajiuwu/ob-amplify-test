<template>
  <div class="cl-withdrawSuccess-wrap">
    <div class="cl-withdrawSuccess-content">
      <div class="cl-icon" />
      <div class="cl-title">{{ $t('withdrawSuccess.title') }}</div>
      <div class="cl-art">
        <span>{{ $t('withdrawSuccess.art1') }}</span>
      </div>
      <div class="cl-flexcc cl-lkButton cl-goHome" @click="goHome">
        {{ $t('withdrawSuccess.back') }}
      </div>
    </div>

    <div class="cl-flexcc cl-footer-content">
      <div class="cl-width">
        <div style="height: calc(30rem / 36)" />
        <div class="cl-art">{{ $t('withdrawSuccess.art2') }}</div>
        <div style="height: calc(28rem / 36)" />
        <div class="cl-flexca">
          <div style="position: relative" @click="goContact">
            <div class="cl-liveWord" />
            <div class="cl-liveIcon" />
            <div class="cl-second">{{ $t('footer.online') }}</div>
            <div class="cl-third">7/24</div>
          </div>
          <div>
            <div class="cl-mailIcon" />
            <div class="cl-second">{{ $t('footer.call') }}</div>
            <div class="cl-third">{{ $t('mail') }}</div>
          </div>
        </div>
        <div style="height: calc(30rem / 36)" />
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  computed: {
    accountInfo() {
      return this.$store.state.accountInfo
    }
  },
  methods: {
    goHome() {
      this.$router.push({ path: `/${this.$store.state.root.locale}` })
    },
    // 第三方客服
    goContact() {
      Lib.common.initiateCall(this)
    }
  }
}
</script>

<style scoped lang="less">
.cl-withdrawSuccess-wrap {
  height: 100vh;
  background-color: @footLiveBgColor;
  .cl-withdrawSuccess-content {
    background-color: #fff;
    padding: 47rem/36 10rem/36 115rem/36;

    .cl-icon {
      margin: 0 auto;
      .sprite(@menu-withdraw-success, 108rem);
    }

    .cl-title {
      text-align: center;
      color: #363636;
      font-weight: bold;
      font-size: 11.33rem/36;
      padding: 15rem/36 0 32rem/36;
    }

    .cl-art {
      line-height: 15.33rem/36;
      font-size: 12rem/36;
      font-weight: 400;
      color: rgba(51, 51, 51, 0.8);
    }

    .cl-goHome {
      width: 100%;
      margin-top: 17rem/36;
      height: 40rem/36;
      font-size: 13rem/36;
      box-sizing: border-box;
    }
  }

  .cl-footer-content {
    height: 259rem/36;
    background-color: @footLiveBgColor;
    color: #e4e4e4;

    .cl-art {
      color: #c8c8c8;
      font-size: 12rem/36;
      padding: 0 20rem/36;
      opacity: 0.8;
    }
    .cl-width {
      height: 259rem/36;
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
  }
}
</style>
