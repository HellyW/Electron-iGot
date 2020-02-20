import request from './axios'

const url = {
  version: '/client/version/'
}

const getVersion = () => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.version, {
        params: {
          st: new Date()
        }
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

export const client = {
  getVersion
}
