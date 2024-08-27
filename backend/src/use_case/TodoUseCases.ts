import { ITodoUseCase } from "../domain/Interfaces/IUseCase/ITodoUseCase";
import { ITodoRepository } from "../domain/Interfaces/IRepository/ITodoRepository";
import { ITodo } from "../domain/entities/Todo";
import { IProjectRepository } from "../domain/Interfaces/IRepository/IProjectRepository";

export class TodoUseCase implements ITodoUseCase {
  private todoRepository: ITodoRepository;
  private projectRepository: IProjectRepository;

  constructor(todoRepository: ITodoRepository, projectRepository: IProjectRepository) {
    this.todoRepository = todoRepository;
    this.projectRepository = projectRepository;
  }

  async createTodo(description: string, projectId: string): Promise<ITodo> {
    const todo = await this.todoRepository.createTodo(description, projectId);
    await this.projectRepository.addTodoToProject(projectId, todo._id as string);
    return todo;
  }

  async updateTodoStatus(todoId: string, status: 'pending' | 'completed'): Promise<ITodo | null> {
    return await this.todoRepository.updateTodoStatus(todoId, status);
  }

  async getTodosByProjectId(projectId: string): Promise<ITodo[]> {
    return await this.todoRepository.getTodosByProjectId(projectId);
  }
}
