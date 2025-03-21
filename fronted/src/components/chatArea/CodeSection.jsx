import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; 
import "prismjs/components/prism-javascript";  


const CodeSection = () => {
    const [code, setCode] = useState(`function sum(a, b) {\n  return a + b;\n}`);

    return (
        <Editor
        className='editor'
            value={code}
            onValueChange={(value) => setCode(value)}
            highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
        />
    );
}

export default CodeSection;
