// version.js
// 版本检测
import { Notification, dialog, shell } from 'electron'
const request = require('request')
const packageConfig = require('../../package.json')
const $isMac = process.platform === 'darwin'

const update = () => {
  request({
    url: `https://push.hellyw.com/client/version/?st=${new Date().getTime()}`,
    method: 'GET'
  }, async (error, response, ret) => {
    try {
      if (error) throw error
      if (response.statusCode !== 200) throw new Error(`请检查当前网络状态 [${response.statusCode}]`)
      if (typeof ret === 'string') ret = JSON.parse(ret) || {}
      if (ret.ret) throw ret.errMsg
      const obj = ret.data
      if (obj.version.version === packageConfig.version) return
      const index = await dialog.showMessageBox({
        type: 'info',
        buttons: ['暂不升级', '立即升级'],
        title: '有新版本，建议您立即升级',
        message: `当前版本为${packageConfig.version}，发现新版本${obj.version.version}，建议您立即升级。本次更新内容：\n ${obj.version.intro}`,
        noLink: true
      })
      if (index === 1) shell.openExternal(`${(obj.version.url && obj.version.url[$isMac ? 'mac' : 'win']) || 'https://wahao.github.io/Bark-MP-helper/#/zh-cn/?id=igot-client'}`)
    } catch (err) {
      new Notification({
          title: '升级检测失败',
          body: err.message
      }).show()
    }
  })
}

update()

export const version = {
  update
}
