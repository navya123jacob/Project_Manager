import { IProject } from "../../entities/Project";

export interface IProjectRepository {
  createProject(title: string): Promise<IProject>;
  getProjects(): Promise<IProject[]>;
  getProjectById(id: string): Promise<IProject | null>;
  updateProject(project: IProject): Promise<IProject |null>;
  addTodoToProject(projectId: string, todoId: string): Promise<void>;
  updateProjectTitle(id: string, title: string): Promise<IProject | null>;
  deleteProject(id: string): Promise<IProject | null>
}
