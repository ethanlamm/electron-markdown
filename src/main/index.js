import { app, shell, BrowserWindow, protocol } from 'electron'
import * as path from 'path'
import url from 'url'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import ipc from './IPC'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 940,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    // 图标：自定义则需要替换(名称固定，icon.ico或icon.png)
    icon: path.join(__dirname, '../../build/icon.ico'),
    // ...(process.platform === 'linux'
    //   ? {
    //     icon: path.join(__dirname, '../../build/icon.png')
    //   }
    //   : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.setMenu(null)
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // ELECTRON_RENDERER_URL 是 Vite 开发服务运行的本地 URL

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  // devtools
  // mainWindow.webContents.openDevTools({ mode: 'bottom' })
}

// ✨Settings for loading local files(images)
// https://www.electronjs.org/zh/docs/latest/api/protocol#protocolregisterschemesasprivilegedcustomschemes
// 1️.Note: This method can only be used before the 'ready' event of the app module gets emitted and can be called only once.
// 2️.Registering a scheme as standard allows relative and absolute resources to be resolved correctly when served.Otherwise the scheme will behave like the file protocol, but without the ability to resolve relative URLs.
// 3.Registering a scheme as standard will allow access to files through the FileSystem API. Otherwise the renderer will throw a security error for the scheme.
protocol.registerSchemesAsPrivileged([
  { scheme: 'img', privileges: { bypassCSP: true } }
])

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // 4.Register the img protocol as file protocol —— local files can be read
  protocol.registerFileProtocol('img', (request, callback) => {
    const filePath = url.fileURLToPath('file://' + request.url.slice('img://'.length))
    callback(filePath)
  })
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC
  ipc.register()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
