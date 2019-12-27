import request from './axios'

const url = {
  messages: '/open/message/'
}

const messages = (params) => {
  return new Promise((resolve, reject) => {
    try {
      request.get(url.messages, {
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

const message = (id) => {
  return new Promise((resolve, reject) => {
    try {
      request.get(`${url.messages}${id}`).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

const delMessage = (id) => {
  return new Promise((resolve, reject) => {
    try {
      request.post(`${url.messages}delete/${id}`).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    } catch (err) {
      reject(err)
    }
  })
}

export const notification = {
  messages,
  message,
  delMessage
}
