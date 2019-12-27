import request from './axios'

const url = {
  relates: '/open/relate/'
}

const relates = (params) => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.relates, {
        params: params
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

const change = (id) => {
  return new Promise((resolve, reject) => {
    try {
      request.post(`${url.relates}${id}`, {
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

const unbind = (id) => {
  return new Promise((resolve, reject) => {
    try {
      request.post(`${url.relates}unbind/${id}`, {
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

export const relate = {
  relates,
  change,
  unbind
}
