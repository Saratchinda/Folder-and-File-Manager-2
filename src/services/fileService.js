export const API_BASE_URL = 'https://localhost:7277/api';

export const fetchFilesFromFolder = async (folderId) => {
    const response = await fetch(`${API_BASE_URL}/XFiles/fromParent/${folderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }
    return response.json();
  };
  
  export const createFile = async (fileName, folderId) => {
    const response = await fetch(`${API_BASE_URL}/XFiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fileName, type: 'text/plain', content: '', size: 0, folderId })
    });
    if (!response.ok) {
      throw new Error('Failed to create file');
    }
    return response.json();
  };
  
  export const renameFile = async (fileId, newName) => {
    const response = await fetch(`${API_BASE_URL}/XFiles/${fileId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, type: 'text/plain', content: '', size: 0, folderId: 0 })
    });
    if (!response.ok) {
      throw new Error('Failed to rename file');
    }
    return response.json();
  };
  
  export const deleteFile = async (fileId) => {
    const response = await fetch(`${API_BASE_URL}/XFiles/${fileId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete file');
    }
  };
  