import React from 'react';
import { useExportProjectAsGistMutation } from '../store/apiSlice';

interface ExportGistButtonProps {
  projectId: string;
}

const ExportGistButton: React.FC<ExportGistButtonProps> = ({ projectId }) => {
  const [exportProjectAsGist, { isLoading, error }] = useExportProjectAsGistMutation();

  const handleExport = async () => {
    try {
      
      const githubToken = 'mytoken';  
      await exportProjectAsGist({ projectId, githubToken }).unwrap();
    } catch (err) {
      console.error('Failed to export project as Gist:', err);
    }
  };

  return (
    <button onClick={handleExport} disabled={isLoading}>
      Export as Gist
    </button>
  );
};

export default ExportGistButton;
