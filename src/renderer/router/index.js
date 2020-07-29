import Vue from 'vue'
import Router from 'vue-router'
import { routers } from './router'

const routerOther = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerOther.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: routers
})
