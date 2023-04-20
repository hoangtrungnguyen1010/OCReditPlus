import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { jsPDF } from "jspdf";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';


function App() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  function createMarkup(html) {
    console.log("hello")
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  const handleClick = (event, convertedContent) => {
    console.log(event);
    console.log(convertedContent);
    var doc = new jsPDF();
      
    // Source HTMLElement or a string containing HTML.
    
    doc.html(convertedContent, {
        callback: function(doc) {
            // Save the PDF
            doc.save('sample-document.pdf');
        },
        x: 15,
        y: 15,
        width: 170, //target width in the PDF document
        windowWidth: 650 //window width in CSS pixels
    });
    // doc.save('sample-document.pdf');
  
  };

  return (
    <div className="App">
      <header className="App-header">
        Rich Text Editor Example
      </header>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
      </div>
      <button id="printButton"  onClick={event => handleClick(event, convertedContent)}>Print</button>

    </div>
  )
}

export default App;