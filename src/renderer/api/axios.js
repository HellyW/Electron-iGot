import axios from 'axios'
import { Message } from 'view-design'
import Router from '../router'
// import qs from 'qs'
import _ from 'underscore'
let axiosIns = axios.create({})

axiosIns.defaults.baseURL = 'https://push.hellyw.com'

axiosIns.defaults.responseType = 'json'

axiosIns.defaults.transformRequest = [function (data = {}) {
    // return qs.stringify(data)
    return JSON.stringify(data)
}]
axiosIns.interceptors.request.use(function (config) {
    // 配置config
    config.params = _.extend({}, config.params, {
        token: localStorage.getItem('USER_TOKEN') || ''
    })
    config.headers['Content-Type'] = 'application/json'
    config.headers.Accept = 'application/json'
    return config
})
axiosIns.interceptors.response.use(function (response) {
    let data = response.data
    let status = response.status
    if (status !== 200) return Promise.reject(new Error(`网络故障【${status}】`))
    if (data.ret) return Promise.reject(data)
    return Promise.resolve(data)
})

let ajaxMethod = ['get', 'post']

let request = {}

ajaxMethod.forEach((method) => {
    // 数组取值的两种方式
    request[method] = function (uri, data, config) {
        return new Promise(function (resolve, reject) {
            axiosIns[method](uri, data, config).then((res) => {
                if (res.data.token) localStorage.setItem('USER_TOKEN', res.data.token)
                resolve(res.data)
            }).catch((res) => {
                const returnRetRegx = /^3\d{2}$/
                Message.error(res.errMsg)
                if (returnRetRegx.test(res.ret.toString())) {
                    setTimeout(() => {
                        Router.push('/')
                    }, 1000)
                }
                reject(res.errMsg)
            })
        })
    }
})

export default request
