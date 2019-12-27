import request from './axios'

const url = {
  plans: '/open/jpoint/plans',
  balance: '/open/jpoint/balance',
  exchange: '/open/jpoint/exchange'
}

const plans = () => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.plans, {}).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const balance = () => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.balance, {}).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const exchange = (id) => {
  return new Promise((resolve, reject) => {
    try {
      request.post(url.exchange, {
        plan: id
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

export const jpoint = {
  plans,
  balance,
  exchange
}
