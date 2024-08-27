import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery, useCreateTodoMutation } from '../store/apiSlice';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: project, error, isLoading } = useGetProjectQuery(id);
 
  const [newTodo, setNewTodo] = useState('');
  const [addTodo] = useCreateTodoMutation();

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;
    let res = await addTodo({ projectId: id!, description: newTodo }); 
    console.log('todo', res);
    setNewTodo(''); 
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project details</div>;

  return (
    <div>
      <h3>Project: {project?.name}</h3>

      <h4>Todos:</h4>
      <ul>
        {project?.todos.map((todo: any) => (
          <li key={todo._id}>
            {todo.description} - {todo.status === 'completed' ? 'Completed' : 'Incomplete'}
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
