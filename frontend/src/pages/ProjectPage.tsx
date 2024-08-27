import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetail';
import ExportGistButton from '../components/ExportGistButton';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('pro',id)

  return (
    <div className="container mt-4">
      <h2>Project Details</h2>
      <ProjectDetail />
      <div className="mt-4">
        <ExportGistButton projectId={id!} />
      </div>
    </div>
  );
};

export default ProjectPage;
