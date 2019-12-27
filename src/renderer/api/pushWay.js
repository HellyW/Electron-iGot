import request from './axios'

const url = {
  getPushWay: '/open/push-way/',
  setOrders: '/open/push-way/orders',
  unbindType: '/open/push-way/type/unbind',
  bindType: '/open/push-way/type/bind',
  verifyType: '/open/push-way/type/verify',
  wechatBind: '/open/push-way/wechat/bind'
}

const getPushWay = () => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.getPushWay, {
      }).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const setOrders = (orders) => {
  return new Promise((resolve, reject) => {
    try {
      request.post(url.setOrders, {
        orders: orders
      }).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const unBind = (type = 'bark') => {
  return new Promise((resolve, reject) => {
    try {
      request.post(url.unbindType.replace(/type/g, type), {
      }).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const bind = (type = 'bark', key) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(type)
      request.post(url.bindType.replace(/type/g, type), {
        key: key
      }).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const verify = (type = 'bark') => {
  return new Promise((resolve, reject) => {
    try {
      request.post(url.verifyType.replace(/type/g, type), {
      }).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const wechatBind = () => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.wechatBind, {
      }).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}
export const pushWay = {
  getPushWay,
  setOrders,
  unBind,
  bind,
  verify,
  wechatBind
}
