import { LRUCache } from 'lru-cache'
const cachePage = new LRUCache({
  max: 100, // 缓存队列长度
  ttl: 1000 * 60 * 5 // 缓存5分钟
})
export default function (req, res, next) {
  const url = req._parsedOriginalUrl
  const pathname = url && url.pathname ? url.pathname : ''
  if (
    pathname === '/' ||
    pathname.indexOf('/en') === 0 ||
    pathname.indexOf('/fr') === 0
  ) {
    const existsHtml = cachePage.get(pathname)
    if (existsHtml) {
      // 不要忘了设置 Content-Type 不然浏览器有时候可能不会渲染而是触发下载文件
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      return res.end(existsHtml.html, 'utf-8')
    } else {
      res.original_end = res.end
      // 重写res.end
      res.end = function (data) {
        if (res.statusCode === 200) {
          // 设置缓存
          cachePage.set(pathname, { html: data })
        }
        // 最终返回结果
        res.original_end(data, 'utf-8')
      }

      next()
    }
  } else {
    next()
  }
}
