import { ITodo } from "../../entities/Todo";

export interface ITodoUseCase {
  createTodo(description: string, projectId: string): Promise<ITodo>;
  updateTodoStatus(todoId: string, status: 'pending' | 'completed'): Promise<ITodo | null>;
  getTodosByProjectId(projectId: string): Promise<ITodo[]>;
  deleteTodoById(todoId: string): Promise<boolean>
}
