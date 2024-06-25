import { File } from '../models/File';

export const API_BASE_URL = 'https://localhost:7277/api';

export const fetchFilesFromFolder = async (folderId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/XFiles/fromParent/${folderId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        console.log('Fetched files data:', data);

        const filesArray = data.$values || [];
        return filesArray.map(file => new File(file.id, file.name, file.type, file.content, file.size, file.folderId, file.folder));
    } catch (error) {
        console.error('Failed to fetch files:', error);
        throw error;
    }
};

export const createFile = async (fileName, folderId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/XFiles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: fileName, type: 'text/plain', content: '', size: 0, folderId })
        });
        if (!response.ok) {
            throw new Error('Failed to create file');
        }
        const data = await response.json();
        return new File(data.id, data.name, data.type, data.content, data.size, data.folderId, data.folder);
    } catch (error) {
        console.error('Failed to create file:', error);
        throw error;
    }
};

export const renameFile = async (fileId, newName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/XFiles/${fileId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, type: 'text/plain', content: '', size: 0, folderId: 0 })
        });
        if (!response.ok) {
            throw new Error('Failed to rename file');
        }
        const data = await response.json();
        return new File(data.id, data.name, data.type, data.content, data.size, data.folderId, data.folder);
    } catch (error) {
        console.error('Failed to rename file:', error);
        throw error;
    }
};

export const updateFileContent = async (fileId, content) => {
    const response = await fetch(`${API_BASE_URL}/XFiles/${fileId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch file details');
    }
    const currentFile = await response.json();
    const updatedFile = { 
        ...currentFile, 
        content 
    };

    try {
        const response = await fetch(`${API_BASE_URL}/XFiles/${fileId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFile)
        });
        if (!response.ok) {
            throw new Error('Failed to update file content');
        }
        const data = await response.json();
        return new File(data.id, data.name, data.type, data.content, data.size, data.folderId, data.folder);
    } catch (error) {
        console.error('Failed to update file content:', error);
        throw error;
    }
};

export const deleteFile = async (fileId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/XFiles/${fileId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete file');
        }
    } catch (error) {
        console.error('Failed to delete file:', error);
        throw error;
    }
};