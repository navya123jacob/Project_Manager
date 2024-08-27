import React, { useState } from 'react';
import { useCreateTodoMutation } from '../store/apiSlice';

interface CreateTodoFormProps {
  projectId: string;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ projectId }) => {
  const [description, setDescription] = useState('');
  const [createTodo, { isLoading, error }] = useCreateTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTodo({ description, projectId }).unwrap();
      setDescription('');
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Todo description"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Create Todo
      </button>
      {error && <p>Error creating todo</p>}
    </form>
  );
};

export default CreateTodoForm;
