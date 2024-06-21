import React, { useState } from 'react';
import './ExplorerActions.css';
import { createFolder, createFile } from '../../services/api';

function ExplorerActions({ setFolders, setFiles, selectedFolder }) {
  const [folderName, setFolderName] = useState('');
  const [fileName, setFileName] = useState('');

  const handleCreateFolder = () => {
    createFolder(folderName)
      .then((newFolder) => {
        setFolders((prevFolders) => [...prevFolders, newFolder]);
        setFolderName('');
      })
      .catch((error) => {
        console.error('Failed to create folder:', error);
      });
  };

  const handleCreateFile = () => {
    if (selectedFolder) {
      createFile(fileName, selectedFolder.folderId)
        .then((newFile) => {
          setFiles((prevFiles) => [...prevFiles, newFile]);
          setFileName('');
        })
        .catch((error) => {
          console.error('Failed to create file:', error);
        });
    }
  };

  return (
    <div className="explorer-actions">
      <h2>Action Explorateur</h2>
      <div>
        <label>Ajouter un nouveau dossier</label>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Nom de l'élément"
        />
        <button onClick={handleCreateFolder}>OK</button>
      </div>
      <div>
        <label>Ajouter un nouveau fichier</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Nom de l'élément"
        />
        <button onClick={handleCreateFile}>OK</button>
      </div>
    </div>
  );
}

export default ExplorerActions;

