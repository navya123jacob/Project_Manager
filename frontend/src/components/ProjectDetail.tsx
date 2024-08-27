import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetProjectQuery,
  useUpdateProjectTitleMutation,
  useCreateTodoMutation,
  useUpdateTodoStatusMutation,
  useDeleteTodoMutation
} from '../store/apiSlice';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, error, isLoading, refetch } = useGetProjectQuery(id);
  const [updateProjectTitle] = useUpdateProjectTitleMutation();
  const [createTodo] = useCreateTodoMutation();
  const [updateTodoStatus] = useUpdateTodoStatusMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [newTodo, setNewTodo] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(project?.title || '');

  const handleTitleChange = async () => {
    if (title.trim() === '') return;
    await updateProjectTitle({ projectId: id!, title });
    setEditingTitle(false);
    refetch();
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;
    await createTodo({ projectId: id!, description: newTodo });
    setNewTodo('');
    refetch();
  };

  const handleUpdateTodoStatus = async (todoId: string, status: 'pending' | 'completed') => {
    await updateTodoStatus({ todoId, status });
    refetch();
  };

  const handleDeleteTodo = async (todoId: string) => {
    await deleteTodo(todoId);
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project details</div>;

  return (
    <div>
      <h3>
        {editingTitle ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleTitleChange}>Save</button>
            <button onClick={() => setEditingTitle(false)}>Cancel</button>
          </>
        ) : (
          <>
            Project: {project?.title}
            <button onClick={() => setEditingTitle(true)}>Edit Title</button>
          </>
        )}
      </h3>

      <h4>Todos:</h4>
      <ul>
        {project?.todos.map((todo: any) => (
          <li key={todo._id}>
            {todo.description} - {todo.status === 'completed' ? 'Completed' : 'Incomplete'}
            <button onClick={() => handleUpdateTodoStatus(todo._id, todo.status === 'completed' ? 'pending' : 'completed')}>
              Mark as {todo.status === 'completed' ? 'Pending' : 'Completed'}
            </button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default ProjectDetail;
