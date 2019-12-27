import { app, BrowserWindow, ipcMain, Notification } from 'electron'
import Pusher from 'pusher-js'

// 创建一个订阅消息
let pusher = new Pusher('6d7d70859379fa308fb0', {
  cluster: 'ap3',
  forceTLS: true
})
let channel = null
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 420,
    height: 780,
    frame: false,
    titleBarStyle: 'hiddenInset',
    resizable: false,
    fullscreen: false,
    useContentSize: true,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL, {
    userAgent: `${mainWindow.webContents.session.getUserAgent()} ${app.getName()}/${app.getVersion()}`
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 系统及操作 -  最小化  和  关闭应用
ipcMain.on('hiddenApp', event => {
  mainWindow && mainWindow.minimize()
})

ipcMain.on('closeApp', event => {
  app.quit()
})

// IPC Event
ipcMain.on('subscribe', (event, token) => {
  // 订阅专属频道
  if (!Notification.isSupported()) return
  if (!channel) channel = pusher.subscribe(token)
  channel.bind('notification', data => {
    if (typeof data === 'string') data = JSON.stringify(data)
    let notification = new Notification({
      title: data.app ? data.app : data.title,
      subtitle: data.app ? (data.title || '') : '',
      body: data.content,
      silent: true
    })
    notification.show()
    mainWindow.webContents.send('message')
    notification.on('click', () => {
      mainWindow.restore()
      mainWindow.webContents.send('getMessage', data.id)
    })
  })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

 require('./ipcNetEvent')
