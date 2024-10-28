<template>
  <div class="cl-agent" v-if="isServerInfoShow">
    <div class="cl-topHead">
      <div class="cl-left"></div>
      <div class="cl-title">{{ $t('agent.title') }}</div>
      <div class="cl-right" @click="close">—</div>
    </div>
    <div class="cl-content">
      <div class="cl-item">
        <div class="cl-name">{{ $t('agent.name') }} <span>*</span></div>
        <div class="cl-input">
          <input type="text" v-model="username" />
        </div>
      </div>
      <div class="cl-item">
        <div class="cl-name">{{ $t('agent.email') }} <span>*</span></div>
        <div class="cl-input">
          <input type="email" v-model="email" />
        </div>
      </div>
      <div class="cl-item">
        <div class="cl-name">{{ $t('agent.mobile') }} <span>*</span></div>
        <div class="cl-input">
          <input type="tel" v-model="mobile" />
        </div>
      </div>
    </div>

    <div class="cl-bottomFoot">
      <div class="cl-button" @click="contact">{{ $t('agent.contactUs') }}</div>
    </div>
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'
export default {
  data() {
    return {
      username: '',
      email: '',
      mobile: ''
    }
  },
  computed: {
    isServerInfoShow() {
      return this.$store.state.isServerInfoShow
    }
  },
  mounted() {
    const customerInfo = Lib.store.get('customerInfo')
    if (customerInfo) {
      this.username = customerInfo.name
      this.email = customerInfo.email
      this.mobile = customerInfo.mobile
    }
  },
  methods: {
    close() {
      this.$store.commit('setServerInfoShow', false)
    },
    contact() {
      const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!reg.test(this.email)) {
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('reminder.agent'),
          this.$t('reminder.button.ok'),
          ''
        )
        return
      }

      if (this.username && this.email && this.mobile) {
        const data = {
          name: this.username,
          mobile: this.mobile,
          email: this.email
        }
        // 储存用户信息
        Lib.store.set('customerInfo', data)

        // 判断是否初始化完成
        if (window.fcWidget && window.fcWidget.isLoaded()) {
          // 初始化完成打开客服聊天
          Lib.common.openWchat(this)
        } else {
          // 打开loading
          this.$store.commit('changeLoadingStatus', true)
        }
        // 关闭输入框
        this.close()
      } else {
        Lib.common.errorReminder(
          this,
          '',
          '',
          '',
          this.$t('reminder.agent'),
          this.$t('reminder.button.ok'),
          ''
        )
      }
    }
  }
}
</script>

<style scoped lang="less">
.cl-agent {
  position: fixed;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  width: 10rem;
  background-color: white;
  /*color: white;*/
  z-index: 49;
  color: #2f3941;
  font-size: 16rem/36;

  .cl-topHead {
    padding: 8rem/36 14rem/36;
    height: 30rem/36;
    background-color: #394d8b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    color: white;
  }

  .cl-content {
    box-sizing: border-box;
    padding: 8rem/36 14rem/36;
    text-align: left;
    font-weight: bold;

    .cl-item {
      padding-top: 20rem/36;

      span {
        color: red;
      }

      .cl-input {
        padding: 0 10rem/36;
        position: relative;
        height: 40rem/36;
        border: 1px solid #666666;
        margin-top: 15rem/36;

        input {
          border: none;
          outline: none;
          background-color: transparent;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .cl-bottomFoot {
    height: 40rem/36;
    width: 10rem;
    box-shadow: 0 -2rem/36 2rem/36 rgba(0, 0, 0, 0.2);
    padding: 15rem/36 0;
    /*box-sizing: border-box;*/
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .cl-button {
      height: 36rem/36;
      padding: 0 28rem/36;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #394d8b;
      margin-right: 14rem/36;
      border-radius: 3rem/36;
      font-weight: bold;
      color: white;
    }
  }
}
</style>
