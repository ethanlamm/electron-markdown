// img 转换

// 保存文件时，图片path需要格式转换：/ => \ ，远程图片链接和远程链接则需要还原
const saveImgTransform = (content) => {
    // ✨注意转换：
    // 1.图片无缩放：(编辑器)![demo](C:/Users/Admin/Desktop/demo.png) => (本地)![demo](C:\Users\Admin\Desktop\demo.png)
    // 2.图片有缩放：(编辑器)<img src="C:/Users/Admin/Desktop/git流程.png" alt="git" style="zoom:80%;" /> => (本地)<img src="C:\Users\Admin\Desktop\git流程.png" alt="git" style="zoom:80%;" />
    // 3.远程图片链接：编辑器和本地格式均为 ![deepl](https://static.deepl.com/img/logo/DeepL_Logo_darkBlue_v2.svg)
    // 4.远程链接：编辑器和本地格式均为 [Issue #58 · imzbf/md-editor-rt (github.com)](https://github.com/imzbf/md-editor-rt/issues/58)

    // 由于replace转换'/'成反斜杠'\'，转变成两个'\\'
    // 还原远程图片链接和远程链接时则不匹配
    // 因此，第一次先将'/'转换为一个符号✨
    // 再将远程图片链接和远程链接的✨转换为'/'(采用整体替换 ChangeArr => unChangeArr)
    // 最后再将✨转换为反斜杠'\'

    const reg = /(\[.*\]\()(http.*)(\))/g
    const unChangeArr = Array.from(content.matchAll(reg), m => m[0])
    let temp = content.replace(/\//g, '✨').replace(/✨>/g, '/>')
    const ChangeArr = Array.from(temp.matchAll(reg), m => m[0])
    ChangeArr.forEach((item, index) => {
        temp = temp.replace(item, unChangeArr[index])
    })
    return temp.replaceAll('✨', '\\')
}

// 上传文件时，图片path需要格式转换：\ => /
const uploadImgTransform = (content) => {
    // 上传时只对'\'进行转换，对'\>'无影响
    return content.replace(/\\/g, '/')
}

export { saveImgTransform, uploadImgTransform }