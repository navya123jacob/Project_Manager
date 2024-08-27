import React from 'react';
import { useGetProjectsQuery } from '../store/apiSlice';
import { Link } from 'react-router-dom';

const ProjectList: React.FC = () => {
  const { data: projects, isLoading, error } = useGetProjectsQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error loading projects</p>;

  return (
    <div>
      <h2>Projects</h2>
      <ul className="list-group">
        {projects?.map((project: any) => (
          <li key={project._id} className="list-group-item">
            <Link to={`/projects/${project._id}`} className="text-decoration-none">
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
