import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FolderList from './components/FolderList/FolderList';
import FileList from './components/FileList/FileList';
import Editor from './components/Editor/Editor';
import ExplorerActions from './components/ExplorerActions/ExplorerActions';
import InformationPanel from './components/InformationPanel/InformationPanel';
import RenamePanel from './components/RenamePanel/RenamePanel';
import './App.css';

const App = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  return (
    <Router>
     
      <div className="container">
        <ExplorerActions setFolders={setFolders} setFiles={setFiles} selectedFolder={selectedFolder} />
        <FolderList folders={folders} setFolders={setFolders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
        <FileList files={files} setFiles={setFiles} selectedFolder={selectedFolder} setSelectedFile={setSelectedFile} />
        {selectedFile && <Editor selectedFile={selectedFile} setFiles={setFiles} />}
        <InformationPanel selectedFile={selectedFile} />
        {selectedFile && <RenamePanel selectedItem={selectedFile} setFiles={setFiles} type="file" />}
        {selectedFolder && !selectedFile && <RenamePanel selectedItem={selectedFolder} setFolders={setFolders} type="folder" />}
      </div>
     
    </Router>
  );
};

export default App;