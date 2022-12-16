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

    return (
        <Editor ref={editorRef} value={value} onChange={onChange} addImg={addImg} onSave={onSave} />
    )
}

export default observer(RichTextEditorCom)