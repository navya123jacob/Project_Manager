import { IProject } from "../../entities/Project";

export interface IProjectUseCase {
  createProject(title: string): Promise<IProject>;
  getProjects(): Promise<IProject[]>;
  getProjectById(id: string): Promise<IProject | null>;
  addTodoToProject(projectId: string, todoId: string): Promise<void>;
  exportProjectAsGist(projectId: string, githubToken: string): Promise<string>;
  updateProjectTitle(id: string, title: string): Promise<IProject | null>
}
