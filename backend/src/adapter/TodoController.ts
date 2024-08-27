import { Request, Response, NextFunction } from 'express';
import { ITodoUseCase } from '../domain/Interfaces/IUseCase/ITodoUseCase';

export class TodoController {
  private todoUseCase: ITodoUseCase;

  constructor(todoUseCase: ITodoUseCase) {
    this.todoUseCase = todoUseCase;
  }

  async createTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { description, projectId } = req.body;
      const todo = await this.todoUseCase.createTodo(description, projectId);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  }

  async updateTodoStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { todoId, status } = req.body;
      const updatedTodo = await this.todoUseCase.updateTodoStatus(todoId, status);
      if (updatedTodo) {
        res.status(200).json(updatedTodo);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      next(error);
    }
  }

  async getTodosByProjectId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { projectId } = req.params;
      const todos = await this.todoUseCase.getTodosByProjectId(projectId);
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  }
  async deleteTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.todoUseCase.deleteTodoById(id);
      if (result) {
        res.status(200).json({ message: 'Todo deleted successfully' });
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    } catch (error) {
      next(error);
    }
  }
}
