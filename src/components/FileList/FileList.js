import React, { useEffect } from 'react';
import './FileList.css';
import { fetchFilesFromFolder, deleteFile } from '../../services/api';

function FileList({ files, setFiles, selectedFolder, setSelectedFile }) {
  useEffect(() => {
    if (selectedFolder) {
      fetchFilesFromFolder(selectedFolder.folderId)
        .then((data) => {
          setFiles(data);
        })
        .catch((error) => {
          console.error('Failed to fetch files:', error);
          setFiles([]);
        });
    }
  }, [selectedFolder, setFiles]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleDeleteFile = (fileId, e) => {
    e.stopPropagation();
    deleteFile(fileId)
      .then(() => {
        setFiles((prevFiles) => prevFiles.filter(file => file.id !== fileId));
      })
      .catch((error) => {
        console.error('Failed to delete file:', error);
      });
  };

  return (
    <div className="file-list">
      <h2>Fichiers</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id} onClick={() => handleFileSelect(file)}>
            <span className="file-id">F{file.id}</span>
            {file.name}
            <button className="delete-button" onClick={(e) => handleDeleteFile(file.id, e)}>Suppr</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
