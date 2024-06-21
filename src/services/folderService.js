export const API_BASE_URL = 'https://localhost:7277/api';

export const fetchFolders = async () => {
    const response = await fetch(`${API_BASE_URL}/Folders`);
    if (!response.ok) {
      throw new Error('Failed to fetch folders');
    }
    return response.json();
  };
  
  export const createFolder = async (folderName) => {
    const response = await fetch(`${API_BASE_URL}/Folders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderName, size: 0 })
    });
    if (!response.ok) {
      throw new Error('Failed to create folder');
    }
    return response.json();
  };
  
  export const renameFolder = async (folderId, newName) => {
    const response = await fetch(`${API_BASE_URL}/Folders/${folderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folderName: newName, size: 0 })
    });
    if (!response.ok) {
      throw new Error('Failed to rename folder');
    }
    return response.json();
  };
  
  export const deleteFolder = async (folderId) => {
    const response = await fetch(`${API_BASE_URL}/Folders/${folderId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete folder');
    }
  };