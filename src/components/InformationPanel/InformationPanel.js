import React from 'react';
import './InformationPanel.css';

function InformationPanel({ selectedFile }) {
  if (!selectedFile) {
    return (
      <div className="information-panel">
        <p>Sélectionnez un fichier pour voir ses détails</p>
      </div>
    );
  }

  return (
    <div className="information-panel">
      <h2>Informations</h2>
      <p><strong>Nom:</strong> {selectedFile.name}</p>
      <p><strong>Type:</strong> {selectedFile.type}</p>
      <p><strong>Taille:</strong> {selectedFile.size} KB</p>
      <p><strong>Contenu:</strong></p>
      <pre>{selectedFile.content}</pre>
    </div>
  );
}

export default InformationPanel;