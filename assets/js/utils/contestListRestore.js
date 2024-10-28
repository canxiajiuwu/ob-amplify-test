import pubSub from '@/assets/js/utils/pubSub'
/**
 *
 * @param {string} where 哪儿在调用
 * @param {Array} key1 共同的父组件保存的数据的键的集合
 * @param {Array} key2 子组件保存的数据的键的集合
 * @param {string} scrollClassName 移动位置的类名
 * @param {Function} callBack 回掉函数
 * 函数内部加？判断是否存在的原因：确保数据存在，比如：首页存在两个组件都可以去match详情页，如果过去的时候有一个还没加载完成，那么数据就不存在需要先行判断防止报错
 *
 */
function contestListRestore(
  where,
  key1 = [],
  key2 = [],
  scrollClassName = '#app',
  callBack
) {
  const obj = this.$store.getters.contestListingsPage
  if (Object.keys(obj).length === 0) return
  // 存在保存的数据那么还原
  const { pageScroll, preMatchScroll } = obj

  key1.forEach((item) => {
    this[item] = obj[item]
  })

  key2.forEach((item) => {
    this[item] = obj[item + where]
  })

  if (where === 'index' && this.tabsIndex === 3) return

  // 还原数据
  if (where === 'index' && this.database[this.strKey]?.result) {
    this.result = this.database[this.strKey].result
  }
  // 滚动位置
  if (['BetSlipRelate', 'PreMatchFeatureMatch'].includes(where)) {
    // this.$nextTick(() => {
    //   document.querySelector(scrollClassName)?.scrollBy(preMatchScroll, 0)
    // })
    callBack && callBack(-preMatchScroll)
    return
  }
  if (
    [
      'index',
      'ForYou',
      'LiveIndex',
      'BetSlipIndex',
      'Search',
      'Popular',
      'Featured',
      'LeagueName'
    ].includes(where)
  ) {
    if (this.result && this.result.length > 0) {
      this.requestLoading = true
    }

    // 移动位置
    this.$nextTick(() => {
      document.querySelector(scrollClassName)?.scrollBy(0, pageScroll)
      this.$store.commit('clearContestListingsPage')
    })
  }

  callBack && callBack()
}
/**
 *
 * @param {Array} key 需要存储的键
 * @param {string} scrollClassName 需要存储位置的元素的类名
 * @param {object} data 一些自定义数据，子组件中用
 */
function contestListSave(key, scrollClassName = '', data = {}) {
  const obj = {}
  key.forEach((item) => {
    switch (item) {
      case 'pageScroll':
        obj[item] = Math.abs(
          document.querySelector(scrollClassName)?.getBoundingClientRect().y ||
            0
        )
        break
      case 'preMatchScroll':
        obj[item] = Math.abs(
          document.querySelector(scrollClassName)?.getBoundingClientRect().x ||
            0
        )
        break
      case 'upcomingIndex':
        obj[item] = this.time_type - 2
        break
      default:
        obj[item] = this[item]
        break
    }
  })
  Object.assign(obj, data)
  this.$store.commit('setContestListingsPage', obj)
}
export { contestListRestore, contestListSave, pubSub }
