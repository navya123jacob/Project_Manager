import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetail';
import ExportGistButton from '../components/ExportGistButton';
import Header from '../components/NavBar';


const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  
  return (
    <div className="background-container" style={{ backgroundImage: 'url(/leaves.jpg)' }}>
      <Header />
      <div className="main-body">
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-white">
              Home
            </li>
            <li className="breadcrumb-item text-white">
              Project Management
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Project Details
            </li>
          </ol>
        </nav>
        <div className="row gutters-sm">
          <div className="col-md-12">
            <div className="card mb-3">
              <div className="card-body">
                <h2 className="text-center">Project Details</h2>
                <ProjectDetail />
                <div className="mt-4">
                  <ExportGistButton projectId={id!} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
