import React, { useState } from 'react';
import { useExportProjectAsGistMutation } from '../store/apiSlice';

interface ExportGistButtonProps {
  projectId: string;
  onGistExport: (gistUrl: string) => void;
}

const ExportGistButton: React.FC<ExportGistButtonProps> = ({ projectId, onGistExport }) => {
  const [loading, setLoading] = useState(false);
  const [exportProjectAsGist] = useExportProjectAsGistMutation();
  const handleExport = async () => {
    setLoading(true);
    try {
      const response =  await exportProjectAsGist({ projectId}).unwrap();
       
      if ('gistUrl' in response) { 
        onGistExport(response.gistUrl);
      }
    } catch (error) {
      console.error('Error exporting gist:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <button onClick={handleExport} disabled={loading} className="btn btn-primary">
      {loading ? 'Exporting...' : 'Export to Gist'}
    </button>
  );
};

export default ExportGistButton;
