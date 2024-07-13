
import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';


function CodeEditor({ code, language, theme, onChange }) {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    const handleEditorChange = (value, event) => {
        onChange(value);
    };

    return (
        <Editor
        className='codeEditor'
        height="80vh"
        width="100%"
        padding="10em"
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
        editorDidMount={handleEditorDidMount}
      />
    )
}

export default CodeEditor;