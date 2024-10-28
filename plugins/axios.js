import qs from 'qs'
import axios from 'axios'
import API_OBJ from '@/assets/js/fetch/api'

const hWin = typeof window !== 'undefined' // window存在为客户端
let winApp = { type: 1 } // js对接app对象
let reqMap = '' // 请求中的接口队列, 服务端为空, 客户端生成
let CancelToken = '' // 取消请求方法
// 客户端
if (hWin) {
  winApp = window.appInteraction
  reqMap = new Map()
  CancelToken = axios.CancelToken
}

// 公开axios的各接口请求方法
export default ({ app, store }, inject) => {
  // const CancelToken = $axios.CancelToken
  app.$axios = axios
  const { $axios } = app
  // 响应拦截器
  $axios.interceptors.response.use(
    (res) => {
      // 如果是app且为新版本
      if (
        winApp &&
        winApp.type === 3 &&
        localStorage.getItem('isNewApp') === 'true'
      ) {
        const resData = res.data
        if (Object.prototype.toString.call(resData) === '[object Object]') {
          if (resData.code === 10101) winApp.renewuserLogin('', 0)
        }
      }
      if (res.status !== 200) return Promise.reject(res)
      return res.data
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 插入各接口请求对象
  const AXIOS_API = {}
  for (const key in API_OBJ) {
    AXIOS_API[key] = (PARAMS) => {
      const { URL, METHOD, TYPE } = API_OBJ[key]
      // 参数处理
      const lang = store.state.root.locale ? store.state.root.locale : 'fr'
      // const country = store.getters.country ? store.getters.country : 'cm'
      PARAMS.Lang = lang
      // console.log(qs.stringify(PARAMS))
      // 存在相同请求则直接返回当前请求
      let reqKeyStr = ''
      if (hWin) {
        reqKeyStr = reqKeyFn(METHOD, URL, TYPE, PARAMS)
        if (reqMap.has(reqKeyStr)) return reqMap.get(reqKeyStr)
      }
      const dataObj = {
        method: METHOD || 'POST',
        url: URL || PARAMS.URL,
        params: METHOD === 'GET' ? PARAMS : undefined,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      // 添加取消请求方法
      if (hWin) {
        dataObj.cancelToken = new CancelToken((c) => {
          try {
            const name = vm.route.name
            if (!store.state.pathCancelReq[name]) {
              store.state.pathCancelReq[name] = {}
            }
            store.commit('setPathCancelReq', { name, reqKeyStr, c })
          } catch (e) {}
        })
      }
      // 根据type类型修改data格式
      if (TYPE === 'multipart/form-data') {
        dataObj.headers = { 'Content-Type': 'multipart/form-data' }
        const newdata = new FormData()
        for (const key in PARAMS) {
          newdata.append(key, PARAMS[key])
        }
        dataObj.data = newdata
      } else if (TYPE === 'JSON') {
        dataObj.headers = { 'Content-Type': 'application/json' }
        dataObj.data = PARAMS
      } else {
        dataObj.data = qs.stringify(PARAMS)
      }
      // 请求方法
      const reqPromise = new Promise((resolve, reject) => {
        $axios(dataObj)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            err?.code === 0 ? resolve(err) : reject(err)
          })
          .finally(() => {
            // 请求完成, 删除队列中请求
            if (hWin) {
              reqFnChange('delete', reqKeyStr)
              try {
                delete store.state.pathCancelReq[vm.route.name][reqKeyStr]
              } catch (e) {}
            }
          })
      })
      // 添加请求
      if (hWin) reqFnChange('set', reqKeyStr, reqPromise)
      return reqPromise
    }
  }
  inject('axios_api', AXIOS_API)
}

// 获取请求专属key
function reqKeyFn(METHOD, URL, TYPE, PARAMS) {
  return [METHOD, URL, TYPE, qs.stringify(PARAMS)].join('&')
}

// 请求添加与删除
function reqFnChange(type, reqKeyStr, reqPromise) {
  const reqFlag = reqMap.has(reqKeyStr)
  const eventFn = {
    set: () => {
      if (!reqFlag) reqMap.set(reqKeyStr, reqPromise)
    },
    delete: () => {
      if (reqFlag) reqMap.delete(reqKeyStr)
    }
  }
  eventFn[type]()
}
