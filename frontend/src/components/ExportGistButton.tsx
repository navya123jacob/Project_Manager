import React from 'react';
import { useExportProjectAsGistMutation } from '../store/apiSlice';

interface ExportGistButtonProps {
  projectId: string;
}

const ExportGistButton: React.FC<ExportGistButtonProps> = ({ projectId }) => {
  const [exportProjectAsGist, { isLoading, error }] = useExportProjectAsGistMutation();

  const handleExport = async () => {
    try {
      // Assuming you have the GitHub token stored somewhere or retrieved dynamically
      const githubToken = 'your-github-token-here';  // Replace this with actual token logic

      // Pass the projectId and githubToken as an object
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
