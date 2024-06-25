import React, { useEffect } from 'react';
import './FolderList.css';
import { fetchFolders, deleteFolder } from '../../services/folderService';

function FolderList({ folders, setFolders, selectedFolder, setSelectedFolder }) {
  useEffect(() => {
    fetchFolders()
      .then((data) => {
        setFolders(data);
      })
      .catch((error) => {
        console.error('Failed to fetch folders:', error);
        setFolders([]); 
      });
  }, [setFolders]);

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
  };

  const handleDeleteFolder = (folderId, e) => {
    e.stopPropagation(); 
    deleteFolder(folderId)
      .then(() => {
        setFolders((prevFolders) => prevFolders.filter(folder => folder.folderId !== folderId));
        if (selectedFolder && selectedFolder.folderId === folderId) {
          setSelectedFolder(null); 
        }
      })
      .catch((error) => {
        console.error('Failed to delete folder:', error);
      });
  };

  return (
    <div className="folder-list">
      <h2>Dossiers</h2>
      {selectedFolder && <p>Dossier courant: {selectedFolder.folderName}</p>}
      <ul>
        {folders.map((folder) => (
          <li key={folder.folderId} onClick={() => handleFolderSelect(folder)}>
            <span className="folder-id">D{folder.folderId}</span>
            {folder.folderName}
            <button className="delete-button" onClick={(e) => handleDeleteFolder(folder.folderId, e)}>Suppr</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FolderList;
