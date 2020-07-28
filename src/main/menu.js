import {
    Menu,
    BrowserWindow,
    shell,
    app
} from 'electron'

const isMac = process.platform === 'darwin'

let template = [
    ...(isMac ? [{
        label: app.name,
        submenu: [{
            label: '关于',
            role: 'about'
        }, {
            label: '重启应用',
            accelerator: 'CmdOrCtrl+R',
            click: function(item, focusedWindow) {
                if (focusedWindow) {
                    // on reload, start fresh and close any old
                    // open secondary windows
                    if (focusedWindow.id === 1) {
                        BrowserWindow.getAllWindows().forEach(function(win) {
                            if (win.id > 1) {
                                win.close()
                            }
                        })
                    }
                    focusedWindow.reload()
                }
            }
        }, {
            label: '退出',
            role: 'quit'
        }]
    }] : []), {
        label: '操作',
        submenu: [{
            label: '复制',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: '粘贴',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }]
    }, {
        label: '窗口',
        role: 'window',
        submenu: [{
            label: '最小化',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: '关闭',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }]
    }, {
        label: '帮助',
        role: 'help',
        submenu: [{
            label: '意见反馈',
            click: function() {
                shell.openExternal('https://support.qq.com/products/111465')
            }
        }, {
            label: '开发者文档',
            click: function() {
                shell.openExternal('https://wahao.github.io/Bark-MP-helper/#/zh-cn/')
            }
        }, {
            type: 'separator'
        }]
    }
]

// 右键菜单
const contextMenuTemplate = [
{
    label: '复制',
    role: 'copy'
}, {
    label: '粘贴',
    role: 'paste'
}]

const initMenu = () => {
    try {
        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu) // 设置菜单部分
    } catch (err) {
        console.error(err)
    }
}

const initContextMenu = () => {
    try {
        const contextMenu = Menu.buildFromTemplate(contextMenuTemplate)
        contextMenu.popup(BrowserWindow.getFocusedWindow())
    } catch (err) {
        console.error(err)
    }
}

export const menu = {
    initMenu,
    initContextMenu
}
