const BASE_URL = 'https://localhost:7277/api';

export const fetchFolders = async () => {
  const response = await fetch(`${BASE_URL}/folders`);
  if (!response.ok) {
    throw new Error('Failed to fetch folders');
  }
  const data = await response.json();
  return data.$values; 
};

export const fetchFilesFromFolder = async (folderId) => {
  const response = await fetch(`${BASE_URL}/xfiles/fromParent/${folderId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }
  const data = await response.json();
  return data.$values; 
};

export const createFolder = async (folderName) => {
  const response = await fetch(`${BASE_URL}/folders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ folderName, size: 0 })
  });
  if (!response.ok) {
    throw new Error('Failed to create folder');
  }
  return response.json();
};

export const createFile = async (fileName, folderId) => {
  const response = await fetch(`${BASE_URL}/xfiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: fileName, type: 'text/plain', content: '', size: 0, folderId })
  });
  if (!response.ok) {
    throw new Error('Failed to create file');
  }
  return response.json();
};

export const updateFileContent = async (file) => {
  const response = await fetch(`${BASE_URL}/xfiles/${file.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(file)
  });
  if (!response.ok) {
    throw new Error('Failed to update file content');
  }
  return response.json();
};

export const renameFile = async (fileId, newName) => {
  const fileResponse = await fetch(`${BASE_URL}/xfiles/${fileId}`);
  if (!fileResponse.ok) {
    throw new Error('Failed to fetch file details');
  }
  const file = await fileResponse.json();

  const response = await fetch(`${BASE_URL}/xfiles/${fileId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: fileId,
      name: newName,
      type: file.type,
      content: file.content,
      size: file.size,
      folderId: file.folderId
    }) 
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to rename file:', errorText); 
    throw new Error('Failed to rename file');
  }
  return response.json();
};

export const renameFolder = async (folderId, newName) => {
  const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ folderId, folderName: newName }) 
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to rename folder:', errorText); 
    throw new Error('Failed to rename folder');
  }
  return response.json();
};

export const deleteFile = async (fileId) => {
  const response = await fetch(`${BASE_URL}/xfiles/${fileId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to delete file:', errorText); 
    throw new Error('Failed to delete file');
  }
  return response.json();
};

export const deleteFolder = async (folderId) => {
  const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to delete folder:', errorText); 
    throw new Error('Failed to delete folder');
  }
  return response.json();
};
