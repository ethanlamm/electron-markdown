import { makeAutoObservable, runInAction } from 'mobx'
// uuid
import { v4 as uuidv4 } from 'uuid';

// 获取文件名
const getFileName = (filePath) => {
  if (!filePath) return
  const start = filePath.lastIndexOf('\\')
  const end = filePath.lastIndexOf('.')
  return filePath.substring(start + 1, end)
}

class RootStore {

  // 所有文档
  fileList = JSON.parse(localStorage.getItem('fileList') || '[]')
  // fileList = [
  //   {
  //     id: '1',
  //     title: 'first article',
  //     content: 'first article',
  //     unsaved: false,
  //     latest: new Date().toLocaleString('zh-CN'),
  //   },
  //   {
  //     id: '2',
  //     title: 'second article',
  //     content: 'second article',
  //     unsaved: false,
  //     latest: new Date().toLocaleString('zh-CN'),
  //   },
  //   {
  //     id: '3',
  //     title: 'third article',
  //     content: 'third article',
  //     unsaved: false,
  //     latest: new Date().toLocaleString('zh-CN'),
  //   },
  //   {
  //     id: '4',
  //     title: 'fourth article',
  //     content: 'fourth article',
  //     unsaved: false,
  //     latest: new Date().toLocaleString('zh-CN'),
  //   },
  //   {
  //     id: '5',
  //     title: 'fifth article',
  //     content: 'fifth article',
  //     unsaved: false,
  //     latest: new Date().toLocaleString('zh-CN'),
  //   },
  //   {
  //     id: '6',
  //     title: 'sixth article',
  //     content: 'sixth article',
  //     unsaved: false,
  //     latest: new Date().toLocaleString('zh-CN'),
  //   },
  //   {
  //     id: '7',
  //     title: 'seventh article',
  //     content: 'seventh article',
  //     unsaved: false,
  //     latest: new Date().toLocaleString('zh-CN'),
  //   },
  //   {
  //     id: '8',
  //     title: 'eigth article',
  //     content: 'eigth article',
  //     unsaved: false,
  //     latest: new Date().toLocaleString('zh-CN'),
  //   }
  // ]
  // 要展示的tab文档列表
  tabList = []
  // 正在编辑的文件
  get editingFile() {
    return this.tabList.find(item => item.id === this.idStatus.activeId)
  }
  // 目前编辑的文档
  idStatus = {
    activeId: '',
    lastActiveId: ''
  }
  idStatusArry = []
  // 未保存的文档列表
  unsavedList = []

  constructor() {
    makeAutoObservable(this)
  }

  // 删除文档
  deleteArticle = (id) => {
    const findIndex = this.fileList.findIndex(item => item.id === id)
    if (findIndex !== -1) {
      this.fileList.splice(findIndex, 1)
      this.removeTab(id)
    }
  }

  // 添加新文档
  addArticle = (file) => {
    // 相同文档不能重复上传
    const findIndex = this.fileList.findIndex(item => item.filePath === file.filePath)
    if (findIndex !== -1) return
    // 添加至fileLis
    this.fileList.unshift(file)
    // 同时展示至tabList
    this.addTabList(file)
    // 更新fileList
    this.updateFileList()
  }

  // 编辑文档标题
  editArticle = ({ id, title }) => {
    const findIndex = this.fileList.findIndex(item => item.id === id)
    if (findIndex !== -1) {
      this.fileList[findIndex].title = title
      this.fileList[findIndex].latest = new Date().toLocaleString('zh-CN')
    }
  }

  // 更新idStatus
  updateIdStatus = (activeId) => {
    // 多次点击，当重复时return，即不允许lastActiveId和activeId相同
    if (this.idStatus.activeId === activeId) return
    this.idStatus.lastActiveId = this.idStatus.activeId
    this.idStatus.activeId = activeId
    const findIndex = this.idStatusArry.findIndex(item => item.activeId === activeId)
    if (findIndex !== -1) {
      this.idStatusArry.splice(findIndex, 1)
    }
    this.idStatusArry.push({ activeId, lastActiveId: this.idStatus.lastActiveId })
  }

  // 添加tabList
  addTabList = (file) => {
    const findIndex = this.tabList.findIndex(item => item.id === file.id)
    if (findIndex == -1) {
      // 需要深拷贝
      this.tabList.push({ ...file })
    }
    this.updateIdStatus(file.id)
  }

  // 修改tabList内容
  updateTabList = (id, content) => {
    const findIndex = this.tabList.findIndex(item => item.id === id)
    if (findIndex !== -1) {
      this.tabList[findIndex].content = content
    }
  }

  // 移除tabList
  removeTab = (deleteId) => {
    const findIndex = this.tabList.findIndex(item => item.id === deleteId)
    if (findIndex !== -1) {
      // 删除非当前
      if (this.idStatus.activeId !== deleteId) {
        const findIndex = this.idStatusArry.findIndex(item => item.activeId === deleteId)
        if (findIndex !== -1) {
          this.idStatusArry.splice(findIndex, 1)
          this.idStatusArry.forEach(item => {
            if (item.lastActiveId === deleteId) {
              item.lastActiveId = ''
            }
          })
          // 更新idStatus
          const findItem = this.idStatusArry.find(item => item.activeId === this.idStatus.activeId)
          if (findItem) {
            this.idStatus.lastActiveId = findItem.lastActiveId
          }
        }
      }
      // 删除当前(当前记录为最后一个)
      else {
        // 将lastActiveId是当前记录的activeId的 置空
        this.idStatusArry.forEach(item => {
          if (item.lastActiveId === deleteId) {
            item.lastActiveId = ''
          }
        })
        // lastActiveId为空
        if (this.idStatus.lastActiveId === '') {
          // 找前面一个
          const lastItem = this.idStatusArry[(this.idStatusArry.length - 2)]
          if (!lastItem) {
            // 没找到，说明当前为第一个也是最后一个
            this.idStatusArry = []
            this.idStatus.activeId = ''
            this.idStatus.lastActiveId = ''
          } else {
            this.idStatusArry.pop()
            this.idStatus.activeId = lastItem.activeId
            this.idStatus.lastActiveId = lastItem.lastActiveId
          }
        }
        // lastActiveId不为空
        else {
          this.idStatusArry.pop()
          const findIndex = this.idStatusArry.findIndex(item => item.activeId === this.idStatus.lastActiveId)
          if (findIndex !== -1) {
            const lastestItem = this.idStatusArry[findIndex]
            this.idStatusArry.splice(findIndex, 1)
            // 放到最后
            this.idStatusArry.push(lastestItem)
            // 更新idStatus
            this.idStatus.activeId = lastestItem.activeId
            this.idStatus.lastActiveId = lastestItem.lastActiveId
          }
        }
      }
      this.tabList.splice(findIndex, 1)
    }
  }

  // 修改状态(未保存)
  setUnsaved = (id) => {
    const isUnsaved = this.unsavedList.includes(id)
    if (isUnsaved) return
    this.unsavedList.push(id)
  }

  // 修改状态(已保存)
  removeUnsaved = (id) => {
    const findIndex = this.unsavedList.findIndex(item => item === id)
    if (findIndex !== -1) {
      this.unsavedList.splice(findIndex, 1)
    }
  }

  // 本地存储fileList
  updateFileList = () => {
    localStorage.setItem('fileList', JSON.stringify(this.fileList))
  }

  // 上传文件
  uploadFile = ({ filePath, content }) => {
    const title = getFileName(filePath)
    const newFile = {
      id: uuidv4(),
      title,
      content,
      filePath,
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    }
    this.addArticle(newFile)
  }

  // 保存时修改文件内容
  writeFile = async (id) => {
    const { filePath, content } = this.tabList.find(item => item.id === id)
    const result = await electron.ipcRenderer.invoke('writeFile', { filePath, content })
    if (result === 'success') {
      // 去除unsaved状态
      this.removeUnsaved(id)
      // 更新fileList
      const fileIndex = this.fileList.findIndex(item => item.id === id)
      runInAction(() => {
        this.fileList[fileIndex].content = content
        this.fileList[fileIndex].latest = new Date().toLocaleString('zh-CN')
      })
      // 本地存储
      this.updateFileList()
    }
  }
}

const rootStore = new RootStore()
export default rootStore