import store from 'store'
import outUrl from './communicationUrl'

// 公用方法
import common from './common'

// store.js使用说用事例
// 介绍store.js是对localstorage兼容性类库
// store.set('user', { name:'Marcus' })
// store.get('user').name == 'Marcus'
// 详情请在https://github.com/marcuswestin/store.js 上查询
// socket控件
import Client from './client'

export default {
  common,
  store,
  outUrl,
  Client
}
