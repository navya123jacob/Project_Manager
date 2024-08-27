import { ITodoRepository } from '../../domain/Interfaces/IRepository/ITodoRepository';
import { IProjectRepository } from '../../domain/Interfaces/IRepository/IProjectRepository'; 
import TodoModel from '../database/Models/TodoModel';
import ProjectModel from '../database/Models/ProjectModel';
import { ITodo } from '../../domain/entities/Todo';

export class TodoRepository implements ITodoRepository {
  private projectRepository: IProjectRepository;

  constructor(projectRepository: IProjectRepository) { 
    this.projectRepository = projectRepository;
  }

  async createTodo(description: string, projectId: string): Promise<ITodo> {
    const todo = new TodoModel({ description, projectId });
    const savedTodo = await todo.save();

    return savedTodo;
  }

  async updateTodoStatus(todoId: string, status: 'pending' | 'completed'): Promise<ITodo | null> {
    return await TodoModel.findByIdAndUpdate(todoId, { status, updatedAt: new Date() }, { new: true });
  }

  async getTodosByProjectId(projectId: string): Promise<ITodo[]> {
    return await TodoModel.find({ projectId });
  }
  async deleteTodoById(todoId: string): Promise<ITodo | null> {
    return await TodoModel.findByIdAndDelete(todoId);
  }

}
