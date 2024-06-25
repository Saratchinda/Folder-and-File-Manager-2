import React, { useState, useEffect } from 'react';
import './RenamePanel.css';
import { renameFile, deleteFile } from '../../services/fileService';
import { renameFolder, deleteFolder } from '../../services/folderService';

function RenamePanel({ selectedItem, setFiles, setFolders, type }) {
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setNewName(selectedItem.name || selectedItem.folderName);
    }
  }, [selectedItem]);

  const handleRename = () => {
    if (type === 'file') {
      renameFile(selectedItem.id, newName)
        .then((updatedFile) => {
          setFiles((prevFiles) =>
            prevFiles.map((file) => (file.id === updatedFile.id ? updatedFile : file))
          );
        })
        .catch((error) => {
          console.error('Failed to rename file:', error);
        });
    } else if (type === 'folder') {
      renameFolder(selectedItem.folderId, newName)
        .then((updatedFolder) => {
          setFolders((prevFolders) =>
            prevFolders.map((folder) => (folder.folderId === updatedFolder.folderId ? updatedFolder : folder))
          );
        })
        .catch((error) => {
          console.error('Failed to rename folder:', error);
        });
    }
  };
  const handleDelete = () => {
    if (type === 'file') {
      deleteFile(selectedItem.id)
        .then(() => {
          setFiles((prevFiles) => prevFiles.filter(file => file.id !== selectedItem.id));
        })
        .catch((error) => {
          console.error('Failed to delete file:', error);
        });
    } else if (type === 'folder') {
      deleteFolder(selectedItem.folderId)
        .then(() => {
          setFolders((prevFolders) => prevFolders.filter(folder => folder.folderId !== selectedItem.folderId));
        })
        .catch((error) => {
          console.error('Failed to delete folder:', error);
        });
    }
  };

  return (
    <div className="rename-panel">
      <h2>Renommer le {type === 'file' ? 'fichier' : 'dossier'}</h2>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Nouveau nom"
      />
      <button onClick={handleRename}>OK</button>
      <button className="delete-button" onClick={handleDelete}>Supprimer</button>
    </div>
  );
}

export default RenamePanel;