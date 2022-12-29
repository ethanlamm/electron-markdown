import { app, ipcMain } from 'electron'
import fileUtils from '../utils'

const handleUploadFile = async () => {
    const data = await fileUtils.readFile()
    if (data) return data
}

const handleWriteFile = async (event, { filePath, content }) => {
    const data = await fileUtils.writeFile(filePath, content)
    return data
}

const handleCreateFile = async (event, { basePath, title }) => {
    const data = await fileUtils.createFile({ basePath, title })
    return data
}

const handleGetDefaultPath = () => {
    const path = app.getAppPath()
    return path
}

const handleSetPath = async () => {
    const folderPath = await fileUtils.setPath()
    return folderPath
}

const handleRenameFile = async (event, { oldPath, newPath, basePath, title }) => {
    const result = await fileUtils.renameFile({ oldPath, newPath, basePath, title })
    return result
}

const handleDeleteFile = async (event, filePath) => {
    const result = await fileUtils.deleteFile(filePath)
    return result
}

const register = () => {
    // uploadFile
    ipcMain.handle('uploadFile', handleUploadFile)

    // writeFile
    ipcMain.handle('writeFile', handleWriteFile)

    // createFile
    ipcMain.handle('createFile', handleCreateFile)

    // getDefaultPath
    ipcMain.handle('getDefaultPath', handleGetDefaultPath)

    // setPath
    ipcMain.handle('setPath', handleSetPath)

    // renameFile
    ipcMain.handle('renameFile', handleRenameFile)

    // deleteFile
    ipcMain.handle('deleteFile', handleDeleteFile)
}

export default { register }