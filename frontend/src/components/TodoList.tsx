import React from 'react';
import { useGetTodosByProjectQuery } from '../store/apiSlice';

interface TodoListProps {
  projectId: string;
}

const TodoList: React.FC<TodoListProps> = ({ projectId }) => {
  const { data: todos, isLoading, error } = useGetTodosByProjectQuery(projectId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos?.map((todo:any) => (
          <li key={todo.id}>{todo.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
