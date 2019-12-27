import request from './axios'

const url = {
  marketLinks: '/open/link/group/market',
  links: '/open/link/group'
}

const marketLinks = (params) => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.marketLinks, {
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

const links = (params) => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.links, {
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

const addLink = (params) => {
  return new Promise((resolve, reject) => {
    try {
      request.post(url.links, params).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

export const link = {
  marketLinks,
  links,
  addLink
}
