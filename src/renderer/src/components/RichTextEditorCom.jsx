import React from 'react'
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function RichTextEditorCom({ selectedId }) {
    const onChangeHandler = (value) => {
        console.log(value);
    }
    return (
        <SimpleMDEReact
            value={selectedId}
            onChange={onChangeHandler}
            options={{
                minHeight: '385px'
            }}
        />
    )
}

export default RichTextEditorCom