export default ({ app, store }, inject) => {
  const prefetchRouteFun = (path) => {
    const Components = app.router.getMatchedComponents(path)

    Components.filter(
      (Component) =>
        typeof Component === 'function' &&
        !Component.options &&
        !Component.__prefetched
    ).forEach((Component) => {
      const componentOrPromise = Component()
      if (componentOrPromise instanceof Promise) {
        componentOrPromise.catch(() => {})
      }
      Component.__prefetched = true
    })
  }

  const prefetchRoutes = (routes) => {
    const locale = store.state.root.locale
    routes.forEach((item) => {
      const path = `/${locale}/${item}`
      prefetchRouteFun(path)
    })
  }
  inject('prefetchRoutes', prefetchRoutes)
}
