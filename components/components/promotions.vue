<template>
  <div class="cl-promotions-wrap">
    <div class="cl-container">
      <div class="cl-list">
        <div v-for="(item, index) in listData" :key="index">
          <!-- v-if="(!item.country || item.country === $store.state.root.country) && !(item.where === 'downloadActivityTopic' && isApp !== 1) && !(item.where === 'weekly' && (weeklyType === 0 || weeklyType === 2))" -->
          <div class="cl-item">
            <!-- @click="goWhere(item.where)" -->
            <img v-lazy="item.image" @click="itemClick(item)" />
            <!-- <div class="cl-flexcb cl-time" v-if="item.where !== 'weekly'">{{ item.time }}</div> -->
            <div class="cl-flexcb cl-time">
              {{
                `${timeStampDeal(item.startTime)} - ${timeStampDeal(
                  item.end_time
                )}`
              }}
            </div>

            <div
              v-if="newDate - item.end_time > 0"
              class="cl-flexcc cl-finished"
            >
              FINISHED
            </div>

            <div v-if="item.where === 'weekly'" class="cl-countDownBox">
              <span class="cl-ends">{{ $t('weekly.Ends') }}</span>
              <div class="cl-flexcc cl-countDown">
                <div
                  v-for="(a, b) in countDown"
                  :key="b"
                  class="cl-flexcc cl-count"
                >
                  <div class="cl-timeBox">{{ a.time }}</div>
                  <div class="cl-name">{{ a.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: calc(30rem / 36)" />
  </div>
</template>

<script>
import Lib from '@/assets/js/Lib'

export default {
  inject: ['openGame'],
  data() {
    return {
      newDate: new Date().getTime() / 1000, // 现在时间戳
      listData: [], // 数据容器
      countDown: [
        { name: 'H', time: '--' },
        { name: 'M', time: '--' },
        { name: 'S', time: '--' }
      ],
      time: 0,
      weeklyType: 0
    }
  },
  computed: {
    STATICURL() {
      return process.env.STATICURL
    },
    isApp() {
      return typeof window !== 'undefined' ? window.appInteraction.type : 1
    },
    xfootball_host() {
      return process.env.xFootball_URL_WEB
    },
    token() {
      return Lib.common.decrypt(Lib.store.get('token') || '')
    },
    accountInfo() {
      return this.$store.state.accountInfo
    },
    // 2022 世界杯活动新增
    hostname() {
      return this.country === 'ug'
        ? process.env.hostname
        : process.env.hostnamecm
    },
    locale() {
      return this.$store.state.root.locale
    },
    country() {
      return this.$store.state.root.country
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.timeLimitedFun()
  },
  methods: {
    goWhere(path) {
      Lib.common.event_statistics(`promotions_${path}`)
      const ob_token = Lib.store.get('token') ? Lib.store.get('token') : ''
      // console.log(path);
      // // 2022 世界杯新增
      // if (path === "worldCup") {
      //   window.location.href = `${this.hostname}/ssr/${this.locale}/worldCup`;
      //   return;
      // }
      // // 2022 圣诞新增
      // if (path === "christmas") {
      //   window.location.href = `${this.hostname}/ssr/${this.locale}/christmas`;
      //   return;
      // }
      if (path === 'penalty') {
        Lib.common.event_statistics('Promotion_Penalty_Banner_Click')
        window.location.href = `${
          this.$store.state.root.country === 'ug'
            ? 'https://pk-ug.xfootball.net'
            : 'https://pk-cm.xfootball.net'
        }/${this.locale}?token=${this.token}`
        return
      }
      if (path === 'majorFan' && window.appInteraction.type === 3) {
        window.location.href = `${process.env.xFootball_URL_APP}/${
          this.$store.state.root.country
        }/${this.locale}/majorFan?ob_token=${encodeURIComponent(
          ob_token
        )}&source=ob`
        return
      }
      if (path === 'majorFan' && window.appInteraction.type === 1) {
        window.location.href = `${process.env.xFootball_URL_WEB}/${
          this.$store.state.root.country
        }/${this.locale}/majorFan?ob_token=${encodeURIComponent(
          ob_token
        )}&source=ob`
        // window.location.href = `http://192.168.3.20:8080/ug/en/majorFan?ob_token=${encodeURIComponent(ob_token)}&source=ob`
        return
      }

      if (path === 'rtsb_main') {
        const url = `${this.xfootball_host}/${this.$store.state.root.country}/${
          this.locale
        }/rtsb_main?source=ob&inviteId=${
          this.accountInfo ? this.accountInfo.uid : ''
        }&token=${this.token}`
        // web
        if (window.appInteraction.type === 1) window.open(url)
        // app
        else window.appInteraction.openBrowser(url)
      }

      if (path === 'afcon') {
        window.location.href = `/activity/afcon/index.html?lang=${this.locale}`
        return
      }

      if (path === 'weekly') {
        window.location.href = `/activity/weekly-bonus/index.html?lang=${this.locale}`
        return
      }

      if (path === 'freebetGiveaway') {
        window.location.href = `/activity/freebetGiveaway/index.html?lang=${this.locale}`
        return
      }

      if (path === 'onebetPartner') {
        const url = `${process.env.onebetPartner}/${this.$store.state.root.country}/${this.locale}`
        // web
        if (window.appInteraction.type === 1) window.open(url)
        // app
        else window.appInteraction.openBrowser(url)
        return
      }
      this.$router.push({ path: `/${this.locale}/${path}` })
    },
    // 获取weekly info
    timeLimitedFun() {
      this.$axios_api.timeLimited({ token: this.token }).then((res) => {
        if (res.code === 0) {
          this.weeklyType = res.data.type
          this.time = res.data.time
          if (res.data.type === 1 || res.data.type === 3)
            this.minuteDetalFun(this.time, 'HH:MM:ss')
          else if (res.data.type === 2)
            this.minuteDetalFun(this.time, 'dd:HH:MM:ss')
        }
      })
    },
    // 时间处理
    minuteDetalFun(time, fmt) {
      setTimeout(() => {
        if (time > 0) {
          this.countDown = []
          const dealTime = Lib.common.minuteDetal(time, fmt)
          const timeArr = dealTime.split(':').reverse()
          for (let i = 0; i < timeArr.length; i++) {
            if (i === 0) {
              this.countDown.unshift({ name: 'S', time: timeArr[i] })
            } else if (i === 1) {
              this.countDown.unshift({ name: 'M', time: timeArr[i] })
            } else if (i === 2) {
              this.countDown.unshift({ name: 'H', time: timeArr[i] })
            } else if (i === 3) {
              this.countDown.unshift({ name: 'D', time: timeArr[i] })
            }
          }
          time--
          this.minuteDetalFun(time, fmt)
        } else {
          this.countDown = [
            { name: 'H', time: '--' },
            { name: 'M', time: '--' },
            { name: 'S', time: '--' }
          ]
        }
      }, 1000)
    },
    // 获取数据
    getData() {
      const locale = this.locale // 获取语言
      const dataSTR = 'promotionsData' + (locale === 'fr' ? 'Fr' : '') // 获取本地数据名称
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
        // 获取数据
        this.$axios_api.getBackstageBanner({ type: 2 }).then((res) => {
          // 成功
          if (res.code === 0 && Array.isArray(res.data.promotions)) {
            // 存入本地, 修改本地时间, 更新数据
            Lib.store.set(dataSTR, res.data.promotions)
            Lib.common.getBackstageDataIsRefresh(dataSTR, 'storage')
            this.listData = res.data.promotions
          }
        })
      }
    },
    // 时间格式化处理
    timeStampDeal(time) {
      return Lib.common.getDate(new Date(time * 1000), 'dd/MM/yyyy')
    },
    // 活动点击事件
    itemClick(item) {
      if (item.eventName) Lib.common.event_statistics(item.eventName)
      return Lib.common.openWay(item.open, this)(item)
    }
  }
}
</script>

<style scoped lang="less">
img[lazy='loading'] {
  /*your style here*/
  opacity: 0;
}
.cl-promotions-wrap {
  width: 100%;

  .cl-container {
    padding: 0 10rem/36;

    .cl-list {
      .cl-item {
        width: 340rem/36;
        height: 113rem/36;
        border-radius: @mainButtonRadius;
        margin-top: 10rem/36;
        background-color: #fff;
        position: relative;
        overflow: hidden;

        > img {
          width: 340rem/36;
          height: 113rem/36;
        }

        .cl-finished {
          position: absolute;
          bottom: 0;
          right: 0;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
          font-size: 15rem/36;
          font-weight: bold;
        }

        .cl-time {
          box-sizing: border-box;
          padding-left: 10rem/36;
          position: absolute;
          width: 340rem/36;
          height: 26rem/36;
          left: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 11rem/36;
          font-weight: 400;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.33) 100%
          );
        }

        .cl-countDownBox {
          position: absolute;
          left: 14rem/36;
          top: 46rem/36;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            padding-right: 8/36rem;
            font-weight: bold;
          }

          .cl-countDown {
            .cl-count {
              position: relative;
              width: 25/36rem;
              height: 25/36rem;
              background-color: #3285d3;
              font-size: 10rem/36;
              border-radius: 5/36rem;
              margin-right: 14/36rem;

              .cl-timeBox {
                font-weight: 800;
                padding-right: 3rem/36;
              }

              .cl-name {
                color: #a5d3ff;
              }
            }

            .cl-count::after {
              content: ':';
              font-size: 16/36rem;
              font-weight: 900;
              position: absolute;
              right: -10/36rem;
              top: 3/36rem;
            }

            .cl-count:last-child::after {
              visibility: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
