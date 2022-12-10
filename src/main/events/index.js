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

app.whenReady().then(() => {
    // uploadFile
    ipcMain.handle('uploadFile', handleUploadFile)

    // writeFile
    ipcMain.handle('writeFile', handleWriteFile)
})