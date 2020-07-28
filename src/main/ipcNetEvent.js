import { BrowserWindow, ipcMain } from 'electron'
import { menu } from './menu'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

let win = {}

ipcMain.on('addExperience', event => {
  // 添加 经验分享
  if (win.addExperience || (win.addExperience && win.addExperience.isMinimized())) return win.addExperience.restore()
  win.addExperience = new BrowserWindow({
    width: 600,
    height: 480,
    frame: false,
    resizable: false,
    fullscreen: false,
    webPreferences: {
      webSecurity: false
    }
  })
  win.addExperience.loadURL(`${winURL}/#/aboutus`)
})

ipcMain.on('contextMenu', () => {
  menu.initContextMenu()
})
