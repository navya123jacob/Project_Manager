import React, { useState } from 'react';
import { useCreateProjectMutation } from '../store/apiSlice';


interface CreateProjectFormProps {
  setChange: React.Dispatch<React.SetStateAction<number>>;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ setChange }) => {
  const [title, setTitle] = useState('');
  const [formerror,setFormError]=useState('')
  const [createProject, { isLoading, error }] = useCreateProjectMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!title.trim()){
        return 
      }
      await createProject(title).unwrap();
      setChange((prev) => prev + 1);
      setTitle('');
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  return (
    <form className="create-project-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
        disabled={isLoading}
        className="project-input"
      />
      <button type="submit" disabled={isLoading} className="submit-button">
        Create Project
      </button>
      {(error||formerror) && <p className="error-message">Add Something</p>}
    </form>
  );
};

export default CreateProjectForm;
