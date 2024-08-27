import { ITodo } from "../../entities/Todo";

export interface ITodoRepository {
  createTodo(description: string, projectId: string): Promise<ITodo>;
  updateTodoStatus(todoId: string, status: 'pending' | 'completed'): Promise<ITodo | null>;
  getTodosByProjectId(projectId: string): Promise<ITodo[]>;
}
