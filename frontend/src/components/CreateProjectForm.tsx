import React, { useState } from 'react';
import { useCreateProjectMutation } from '../store/apiSlice';
interface CreateProjectFormProps {
  setChange: React.Dispatch<React.SetStateAction<number>>;
  
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({setChange}) => {
  const [title, setTitle] = useState('');
  const [createProject, { isLoading, error }] = useCreateProjectMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject(title).unwrap();
      setChange((prev)=>prev+1)
      setTitle('');
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Create Project
      </button>
      {error && <p>Error creating project</p>}
    </form>
  );
};

export default CreateProjectForm;
