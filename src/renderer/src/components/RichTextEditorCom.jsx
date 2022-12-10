import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

// Mbox
import rootStore from '../store'
import { observer } from 'mobx-react-lite'


function RichTextEditorCom() {
    const { editingFile, idStatus, setUnsaved, updateTabList } = rootStore
    const [value, setValue] = useState('');

    useEffect(() => {
        if (idStatus.activeId) {
            setValue(editingFile.content)
        }
    }, [idStatus.activeId, editingFile.content])


    // editing
    const onChange = useCallback((value) => {
        setUnsaved(idStatus.activeId)
        updateTabList(idStatus.activeId, value)
    }, []);


    // 文档：if you change 'options' on each value change you will lose focus, So, put 'options' as a const outside of the component, or if 'options' shall be partially or fully set by props make sure to useMemo in case of functional/hooks components
    const options = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
            minHeight: '385px'
        }
    }, []);

    return (
        <SimpleMdeReact
            key={idStatus.activeId}
            value={value}
            onChange={onChange}
            options={options}
        />
    )
}

export default observer(RichTextEditorCom)