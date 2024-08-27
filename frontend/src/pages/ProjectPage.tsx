import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetail';
import ExportGistButton from '../components/ExportGistButton';
import Header from '../components/NavBar';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gistUrl, setGistUrl] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleGistExport = (url: string) => {
    setGistUrl(url);  
  };

  return (
    <div className="project-page-container" style={{ backgroundImage: 'url(/leaves.jpg)' }}>
      <Header />
      <div className="project-page-main">
        <nav aria-label="breadcrumb" className="project-page-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-white">
              <button className="breadcrumb-back-button" onClick={handleBackClick}>
                &lt; Back
              </button>
            </li>
            <li className="breadcrumb-item text-white">Home</li>
            <li className="breadcrumb-item text-white">Project Management</li>
            <li className="breadcrumb-item active" aria-current="page">Project Details</li>
          </ol>
        </nav>
        <div className="project-page-content">
          <div className="project-page-card">
            <div className="project-page-card-body">
              <h2 className="text-center text-white">Project Details</h2>
              <ProjectDetail />
              <div className="mt-4 text-center">
                <ExportGistButton projectId={id!} onGistExport={handleGistExport} />
                {gistUrl && (
                  <div className="gist-url mt-3">
                    <a href={gistUrl} target="_blank" rel="noopener noreferrer">
                      View Gist: {gistUrl}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
