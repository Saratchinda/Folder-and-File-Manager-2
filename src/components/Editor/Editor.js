import React, { useState, useEffect } from 'react';
import './Editor.css';
import { updateFileContent } from '../../services/fileService';

function Editor({ selectedFile, setFiles }) {
  const [content, setContent] = useState(selectedFile.content);

  useEffect(() => {
    setContent(selectedFile.content);
  }, [selectedFile]);

  const handleSave = async () => {
    try {
      const updatedFile = await updateFileContent(selectedFile.id, content);
      setFiles((prevFiles) =>
        prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file))
      );
    } catch (error) {
      console.error('Failed to update file content:', error);
    }
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
