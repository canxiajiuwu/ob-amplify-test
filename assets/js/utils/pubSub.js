// 事件中心
const pubSub = {
  list: {},
  subscribe: function (key, fn) {
    // 订阅
    if (!this.list[key]) {
      this.list[key] = []
    }
    this.list[key].push(fn)
  },
  publish: function (key, ...arg) {
    // 发布
    for (const fn of this.list[key]) {
      fn.call(this, ...arg)
    }
  },
  unSubscribe: function (key, fn) {
    // 取消订阅
    const fnList = this.list[key]
    if (!fnList) return false

    if (!fn) {
      // 不传入指定取消的订阅方法，则清空所有key下的订阅
      fnList && (fnList.length = 0)
    } else {
      fnList.forEach((item, index) => {
        if (item === fn) {
          fnList.splice(index, 1)
        }
      })
    }
  }
}
export default pubSub
