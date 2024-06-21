import React, { useState } from 'react';
import './Editor.css';
import { updateFileContent } from '../../services/api';

function Editor({ selectedFile, setFiles }) {
  const [content, setContent] = useState(selectedFile.content);

  const handleSave = () => {
    const updatedFile = { ...selectedFile, content };
    updateFileContent(updatedFile)
      .then((updatedFile) => {
        setFiles((prevFiles) =>
          prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file))
        );
      })
      .catch((error) => {
        console.error('Failed to update file content:', error);
      });
  };

  return (
    <div className="editor">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Enregistrer (Ctrl + S)</button>
    </div>
  );
}

export default Editor;
