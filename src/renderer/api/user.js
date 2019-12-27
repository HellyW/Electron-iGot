import request from './axios'

const url = {
  login: '/open/user/login',
  logout: '/open/user/logout',
  info: '/open/user/info'
}

const login = (code) => {
  return new Promise((resolve, reject) => {
    try {
      request.post(url.login, {
        code: code
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

const logout = () => {
  return new Promise((resolve, reject) => {
    try {
      request.post(url.logout, {}).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const info = () => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.info, {}).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

export const user = {
  login,
  logout,
  info
}
