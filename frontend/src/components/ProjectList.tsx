import React, { useEffect, useState } from 'react';
import { useGetProjectsQuery } from '../store/apiSlice';
import { Link } from 'react-router-dom';


interface ProjectListProps {
  change: number;
}

const ProjectList: React.FC<ProjectListProps> = ({ change }) => {
  const { data: projects, isLoading, error, refetch } = useGetProjectsQuery({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    refetch();
  }, [change, refetch]);

  if (isLoading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">Error loading projects</p>;

  const totalPages = projects ? Math.ceil(projects.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="project-list-container">
      <h2>Projects</h2>
      <ul className="list-group">
        {currentProjects?.map((project: any) => (
          <li key={project._id} className="list-group-item">
            <Link to={`/projects/${project._id}`} className="project-link">
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectList;
