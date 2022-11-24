import { computed, makeAutoObservable } from 'mobx'

class RootStore {

  // 所有文档
  fileList = [
    {
      id: '1',
      title: 'first article',
      content: 'first article',
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    },
    {
      id: '2',
      title: 'second article',
      content: 'second article',
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    },
    {
      id: '3',
      title: 'third article',
      content: 'third article',
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    },
    {
      id: '4',
      title: 'fourth article',
      content: 'fourth article',
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    },
    {
      id: '5',
      title: 'fifth article',
      content: 'fifth article',
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    },
    {
      id: '6',
      title: 'sixth article',
      content: 'sixth article',
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    },
    {
      id: '7',
      title: 'sixth article',
      content: 'sixth article',
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    },
    {
      id: '8',
      title: 'sixth article',
      content: 'sixth article',
      unsaved: false,
      latest: new Date().toLocaleString('zh-CN'),
    }
  ]
  // 要展示的tab文档列表
  tabList = []
  // 目前编辑的文档
  activeId = ''
  // 未保存的文档

  constructor() {
    makeAutoObservable(this)
  }

  // 删除文档
  deleteArticle = (id) => {
    const findIndex = this.fileList.findIndex(item => item.id === id)
    if (findIndex !== -1) {
      this.fileList.splice(findIndex, 1)
    }
  }

  // 编辑文档
  editArticle = ({ id, title }) => {
    const findIndex = this.fileList.findIndex(item => item.id === id)
    if (findIndex !== -1) {
      this.fileList[findIndex].title = title
      this.fileList[findIndex].latest = new Date().toLocaleString('zh-CN')
    }
  }


}

const rootStore = new RootStore()
export default rootStore