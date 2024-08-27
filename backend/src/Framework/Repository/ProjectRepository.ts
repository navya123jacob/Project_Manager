import { IProjectRepository } from '../../domain/Interfaces/IRepository/IProjectRepository';
import ProjectModel from '../database/Models/ProjectModel';
import { IProject } from '../../domain/entities/Project';

export class ProjectRepository implements IProjectRepository {
  async createProject(title: string): Promise<IProject> {
    const project = new ProjectModel({ title, todos: [], createdAt: new Date() });
    return await project.save();
  }

  async getProjects(): Promise<IProject[]> {
    return await ProjectModel.find().populate('todos');
  }

  async getProjectById(id: string): Promise<IProject | null> {
    return await ProjectModel.findById(id).populate('todos');
  }

  async updateProject(project: IProject): Promise<IProject | null> {
    return await ProjectModel.findByIdAndUpdate(project._id, project, { new: true });
  }

  // New method to add a todo to the project's todos array
  async addTodoToProject(projectId: string, todoId: string): Promise<void> {
    await ProjectModel.findByIdAndUpdate(
      projectId,
      { $push: { todos: todoId } },
      { new: true }
    );
  }
}
