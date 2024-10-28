<template>
  <div class="cl-depositSuccess-wrap">
    <div class="cl-icon" />
    <div class="cl-title">{{ $t('depositSuccess.title') }}</div>
    <div class="cl-art">
      <span>{{ $t('depositSuccess.art1') }}</span>
      <br />
      <span>{{ $t('depositSuccess.art2') }}</span>
    </div>
    <div class="cl-flexcb cl-buttonWrap">
      <div class="cl-flexcc cl-tcButton cl-try" @click="tryFun">
        {{ $t('depositSuccess.try') }}
      </div>
      <div class="cl-flexcc cl-lkButton cl-complete" @click="completeFun">
        {{ $t('depositSuccess.complete') }}
      </div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  name: 'DepositSuccess',
  computed: {
    routeName() {
      const routeName = this.$route.name.split('-')
      return routeName[routeName.length - 1]
    }
  },
  methods: {
    completeFun() {
      if (this.routeName === 'deposit') Lib.common.activityBack(this)
      else this.depositComTriggle(false)
    },
    tryFun() {
      this.$emit('tryEmit')
    },
    depositComTriggle(bool) {
      this.$store.commit('setFepositComShow', bool)
    }
  }
}
</script>

<style scoped lang="less">
.cl-depositSuccess-wrap {
  background-color: #fff;
  padding: 10rem/36 10rem/36 40rem/36;

  .cl-icon {
    margin: 0 auto;
    .sprite(@menu-deposit-success, 108rem);
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

  .cl-buttonWrap {
    font-weight: bold;
    padding-top: 17rem/36;

    .cl-try {
      width: 108rem/36;
      height: 40rem/36;
      box-sizing: border-box;
      border: 1rem/36 solid @mainThemeColor;
      font-size: 13rem/36;
    }

    .cl-complete {
      width: 221rem/36;
      height: 40rem/36;
      font-size: 13rem/36;
    }
  }
}
</style>
