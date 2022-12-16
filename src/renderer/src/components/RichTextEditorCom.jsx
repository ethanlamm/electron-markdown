import React, { useState, useRef, useEffect } from 'react'

// for-editor
import Editor from 'for-editor'

// Mbox
import rootStore from '../store'
import { observer } from 'mobx-react-lite'

// 图片路径格式：\\ => /
const getImgPath = (file) => {
    if (file) {
        const transform = file.path.split('\\').join('/')
        return transform
    }
}


function RichTextEditorCom() {
    const { editingFile, idStatus, setUnsaved, updateTabList, writeFile } = rootStore
    const [value, setValue] = useState('');
    const editorRef = useRef(null)

    useEffect(() => {
        if (idStatus.activeId) {
            setValue(editingFile.content)
        }
    }, [idStatus.activeId])

    const addImg = (file) => {
        editorRef.current?.$img2Url(file.name, getImgPath(file))
    }

    const onChange = (value) => {
        setUnsaved(idStatus.activeId)
        updateTabList(idStatus.activeId, value)
        setValue(value)
    }

    const onSave = () => {
        writeFile(idStatus.activeId)
    }

    const onClick = () => {
        console.dir(editorRef.current);
        console.dir(editorRef.current.toolBarRightClick);
        // for-editor内置方法toolBarRightClick：preview 预览 | expand 全屏 | subfield 分栏
        editorRef.current.toolBarRightClick('expand')
    }

    return (
        <Editor
            ref={editorRef}
            value={value}
            onChange={onChange}
            addImg={addImg}
            onSave={onSave}
            height='100%'
            language='en'
            lineNum={false}
        />
    )
}

export default observer(RichTextEditorCom)