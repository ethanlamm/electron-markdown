// img 转换

// 保存文件时，图片path需要格式转换：/ => \
const saveImgTransform = (content) => {
    // 注意两种转换：
    // 1.常规：(编辑器)![demo](C:/Users/Admin/Desktop/demo.png) => (本地)![demo](C:\Users\Admin\Desktop\demo.png)
    // 2.图片有缩放：(编辑器)<img src="C:/Users/Admin/Desktop/git流程.png" alt="git" style="zoom:80%;" /> => (本地)<img src="C:\Users\Admin\Desktop\git流程.png" alt="git" style="zoom:80%;" />

    // 由于第一种 / => \，会对第二种的img标签的最后'/>'转换为'\>'
    // 因此需要对转换后的'\>'再次转换为'/>'
    return content.replace(/\//g, '\\').replace(/\\>/, '/>')
}

// 上传文件时，图片path需要格式转换：\ => /
const uploadImgTransform = (content) => {
    // 上传时只对'\'进行转换，对'\>'无影响
    return content.replace(/\\/g, '/')
}

export { saveImgTransform, uploadImgTransform }