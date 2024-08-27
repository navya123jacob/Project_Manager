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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading project details</div>;

  const totalPages = project?.todos ? Math.ceil(project.todos.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTodos = project?.todos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="project-detail-container">
      <div className="project-detail-content">
        <h3>
          {editingTitle ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-input"
              />
              <button onClick={handleTitleChange} className="btn btn-save">Save</button>
              <button onClick={() => setEditingTitle(false)} className="btn btn-cancel">Cancel</button>
            </>
          ) : (
            <>
              Project: {project?.title}
              <button onClick={() => setEditingTitle(true)} className="btn btn-edit">Edit Title</button>
            </>
          )}
        </h3>

        <h4>Todos:</h4>
        <ul className="todo-list">
          {currentTodos?.map((todo: any) => (
            <li key={todo._id} className="todo-item">
              <div>
                {todo.description} - {todo.status === 'completed' ? 'Completed' : 'Incomplete'}
              </div>
              <div className="todo-actions">
                <button onClick={() => handleUpdateTodoStatus(todo._id, todo.status === 'completed' ? 'pending' : 'completed')}>
                  Mark as {todo.status === 'completed' ? 'Pending' : 'Completed'}
                </button>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </div>
              <div className="todo-dates">
                <span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
                <span>Updated: {new Date(todo.updatedAt).toLocaleString()}</span>
              </div>
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

        <div className="todo-add">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New todo"
            className="todo-input"
          />
          <button onClick={handleAddTodo} className="btn btn-add-todo">Add Todo</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
