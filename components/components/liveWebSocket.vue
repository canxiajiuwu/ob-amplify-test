<script>
import Lib from '@/assets/js/Lib'
import Client from '@/assets/js/liveClient'

export default {
  name: '',
  data() {
    return {
      newSocket: null, // socket实例
      startTime: 0, // 游戏进行多少时间
      showOdds: 1, // 显示赔率
      nowOdds: 1, // 实时赔率
      spacing: 50, // 速率
      canTimeoutDeal: true, // 是否能延时执行
      nowStatus: 108, // 当前状态
      gcs: 1, // 结束时赔率
      timer: null // 定时器容器
    }
  },
  computed: {
    // 游戏socket链接
    crashSocketUrl() {
      return this.$store.state.root.country === 'ug'
        ? process.env.API_CASH_SOCKET_ug
        : process.env.API_CASH_SOCKET_cm
    }
  },
  watch: {
    // 比赛开始时间
    startTime(val) {
      this.OddsAnimationFun(val)
    },
    showOdds(val) {
      this.$emit('changeCrashGameOdds', this.abs(val))
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.out()
  },
  methods: {
    init() {
      const plate = this.$store.state.root.country
      let basicNumber = null
      if (plate === 'ug') {
        basicNumber = 1000
      } else {
        basicNumber = 2000
      }
      const random = Math.round(Math.random() * 10) + basicNumber
      this.newSocket = new Client({
        auth: {
          room_id: `live://${random}`,
          accepts: [random],
          mid: 0
        },
        plate,
        serve: 'onebet',
        url: this.crashSocketUrl,
        notify: this.socketDeal
      })
    },
    // socket处理函数
    socketDeal(data) {
      switch (data.op) {
        // 新一轮游戏准备倒计时
        case 103:
          this.startTime = 0
          this.nowStatus = 103
          break
        // 游戏开始
        case 105:
          this.nowStatus = 105
          this.startTime = 0
          break
        // 游戏曲线更新消息
        case 106:
          this.startTime = data.dt.n
          this.nowStatus = 106
          break
        // 游戏结束消息
        case 108:
          this.startTime = data.dt.n
          this.gcs = data.dt.gcs
          this.nowStatus = 108
          break
      }
    },
    // cash out当前时间赔率
    SetOptions(n) {
      return Math.pow(Math.E, 6e-5 * n)
    },
    OddsAnimationFun(val) {
      if (val === 0) {
        this.showOdds = 1
        this.nowOdds = 1
        this.spacing = 50
        this.canTimeoutDeal = true
      } else {
        this.nowOdds = this.nowStatus === 108 ? this.gcs : this.SetOptions(val)
        this.spacing =
          250 / (parseInt((this.nowOdds - this.showOdds) * 100) + 1)
        this.OddsJump()
      }
    },
    OddsJump() {
      if (this.canTimeoutDeal) {
        this.canTimeoutDeal = false
        this.oddsJumpFun()
      }
    },
    oddsJumpFun() {
      this.timer = setTimeout(() => {
        this.canTimeoutDeal = true
        if (this.nowOdds > this.showOdds + 0.01) {
          this.showOdds += 0.01
          this.OddsJump()
        } else {
          this.showOdds = this.nowOdds
        }
      }, this.spacing)
    },
    abs(num) {
      return Lib.common.abs(num)
    },
    // 离开页面操作
    out() {
      if (this.newSocket) {
        this.newSocket.alive = false
        this.newSocket.ws.close()
      }
      clearTimeout(this.timer)
      this.dataInit()
    },
    // 数据初始化
    dataInit() {
      this.startTime = 0
      this.showOdds = 1
      this.nowOdds = 1
      this.spacing = 50
      this.canTimeoutDeal = true
      this.nowStatus = 108
      this.gcs = 1
    }
  }
}
</script>
