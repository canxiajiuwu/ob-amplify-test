// 客服端公开vue实例化对象
import Lib from '@/assets/js/Lib'
export default (context) => {
  window.vm = context
  window.Lib = Lib
}
