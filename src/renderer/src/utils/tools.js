// 格式转换

// 保存文件时，图片path需要格式转换：/ => \ ，远程图片链接和远程链接、a标签和img标签(包含链接的标签)则需要还原
const saveImgTransform = (content) => {
    // ✨注意转换：
    // 1.图片无缩放：(编辑器)![demo](C:/Users/Admin/Desktop/demo.png) => (本地)![demo](C:\Users\Admin\Desktop\demo.png)
    // 2.图片有缩放：(编辑器)<img src="C:/Users/Admin/Desktop/git流程.png" alt="git" style="zoom:80%;" /> => (本地)<img src="C:\Users\Admin\Desktop\git流程.png" alt="git" style="zoom:80%;" />
    // 3.远程图片链接：编辑器和本地格式均为 ![deepl](https://static.deepl.com/img/logo/DeepL_Logo_darkBlue_v2.svg)
    // 4.远程链接：编辑器和本地格式均为 [Issue #58 · imzbf/md-editor-rt (github.com)](https://github.com/imzbf/md-editor-rt/issues/58)
    // 5.a标签：编辑器和本地格式均为 <a href="https://github.com">github</a>
    // 6.img标签：编辑器和本地格式均为 <img src="https://i2.wp.com/img-blog.csdnimg.cn/20200610212212777.png" />

    // 由于replace转换'/'成反斜杠'\'，转变成两个'\\'
    // 还原远程图片链接、远程链接、a标签和img标签时则不匹配
    // 因此，第一次先将'/'转换为一个符号✨
    // 再将需要还原的✨转换为'/'(采用整体替换 ChangeArr => unChangeArr)
    // 最后再将✨转换为反斜杠'\'

    const remote_img_link = /(\[.*\]\()(http.*)(\))/g
    const tag_a_img = /<[a|img].*>/g
    const unChangeArr1 = Array.from(content.matchAll(remote_img_link), m => m[0])
    const unChangeArr2 = Array.from(content.matchAll(tag_a_img), m => m[0])

    // '/'=>✨ && 还原单闭合标签('✨>'=>'/>') && 还原双闭合标签('<✨'=>'</')
    let temp = content.replace(/\//g, '✨').replace(/✨>/g, '/>').replace(/<✨/g, '</')
    const ChangeArr1 = Array.from(temp.matchAll(remote_img_link), m => m[0])
    const ChangeArr2 = Array.from(temp.matchAll(tag_a_img), m => m[0])

    // 还原远程图片链接和远程链接
    ChangeArr1.forEach((item, index) => {
        temp = temp.replace(item, unChangeArr1[index])
    })
    // 还原a标签和img标签
    ChangeArr2.forEach((item, index) => {
        temp = temp.replace(item, unChangeArr2[index])
    })

    return temp.replaceAll('✨', '\\')
}

// upload文件时，本地图片链接需要格式转换：\ => /
// (本地)![img](D:\typora-images\html\img.jpg) =>(编辑器)![img](D:/typora-images/html/img.jpg)
const uploadImgTransform = (content) => {
    // 上传时只对'\'进行转换，对'/>'、'</'、http/https链接、a标签/img标签无影响
    return content.replace(/\\/g, '/')
}

export { saveImgTransform, uploadImgTransform }