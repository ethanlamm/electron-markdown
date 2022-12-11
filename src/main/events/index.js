import { app, ipcMain } from 'electron'
import { fileUtils } from '../utils'

const handleUploadFile = async () => {
    const data = await fileUtils.readFile()
    if (data) return data
}

const handleWriteFile = async (event, { filePath, content }) => {
    const data = await fileUtils.writeFile(filePath, content)
    return data
}

const handleGetDefaultPath = () => {
    const path = app.getAppPath()
    return path
}

const handleSetDefaultPath = async () => {
    const folderPath = await fileUtils.setDefalutPath()
    return folderPath
}

app.whenReady().then(() => {
    // uploadFile
    ipcMain.handle('uploadFile', handleUploadFile)

    // writeFile
    ipcMain.handle('writeFile', handleWriteFile)

    // getDefaultPath
    ipcMain.handle('getDefaultPath', handleGetDefaultPath)

    // setDefaultPath
    ipcMain.handle('setDefaultPath', handleSetDefaultPath)
})