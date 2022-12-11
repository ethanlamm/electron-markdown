import * as fs from 'fs/promises'
import { dialog } from 'electron'

const openFileOptions = {
    // 只允许打开文件
    properties: ['openFile'],
    // 只允许打开markdown文件
    filters: [{ name: 'markdown', extensions: ['md'] }]
}

const openFolderOptions = {
    // 只允许打开文件夹
    properties: ['openDirectory']
}

export const fileUtils = {
    /**
     * 打开文件，并读取文件的内容
     * @returns 读取到的内容
     */
    readFile: async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(openFileOptions)
        let filePath = ''
        if (!canceled) {
            filePath = filePaths[0]
            const content = await fs.readFile(filePath, { encoding: 'utf8' })
            return { filePath, content }
        }
    },
    /**
     * 写入文件内容
     */
    writeFile: async (filePath, content = '') => {
        try {
            await fs.writeFile(filePath, content, { encoding: 'utf8' })
            return 'success'
        } catch (error) {
            return 'fail'
        }
    },

    /**
     * 打开路径
     */
    setPath: async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(openFolderOptions)
        if (!canceled) {
            return filePaths[0]
        }
    },

    /**
     * 修改文件标题
     */
    renameFile: async ({ oldPath, newPath, basePath, title }) => {
        // 查找文件夹下的所有文件
        const fileList = await fs.readdir(basePath)
        const isSameName = fileList.includes(`${title}.md`)
        if (!isSameName) {
            // 没有重名文件
            try {
                await fs.rename(oldPath, newPath)
                return 'success'
            } catch (error) {
                return 'fail'
            }
        } else {
            // 有重名文件
            return 'sameName'
        }
    }
}