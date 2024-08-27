import { IProjectUseCase } from "../domain/Interfaces/IUseCase/IProjectUseCase";
import { IProjectRepository } from "../domain/Interfaces/IRepository/IProjectRepository";
import { IProject } from "../domain/entities/Project";
import { GistService } from "../Framework/Services/GistService";
import { ITodo } from "../domain/entities/Todo";

export class ProjectUseCase implements IProjectUseCase {
  constructor(
    private projectRepository: IProjectRepository,
    private gistService: GistService
  ) {}

  async createProject(title: string): Promise<IProject> {
    return await this.projectRepository.createProject(title);
  }

  async getProjects(): Promise<IProject[]> {
    return await this.projectRepository.getProjects();
  }

  async getProjectById(id: string): Promise<IProject | null> {
    return await this.projectRepository.getProjectById(id);
  }

  async addTodoToProject(projectId: string, todoId: string): Promise<void> {
    await this.projectRepository.addTodoToProject(projectId, todoId);
  }
  async updateProjectTitle(id: string, title: string): Promise<IProject | null> {
    return await this.projectRepository.updateProjectTitle(id, title);
  }
  
  async deleteProject(id: string): Promise<IProject | null> {
    return await this.projectRepository.deleteProject(id);
  }
  
  async exportProjectAsGist(projectId: string, githubToken: string): Promise<string> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const completedTodos = project.todos.filter((todo: ITodo) => todo.status === 'completed');
    const pendingTodos = project.todos.filter((todo: ITodo) => todo.status !== 'completed');

    const projectContent = `
# ${project.title}

**Summary:** ${completedTodos.length} / ${project.todos.length} completed

## Pending Todos
${pendingTodos.map((todo: ITodo) => `- [ ] ${todo.description}`).join('\n')}

## Completed Todos
${completedTodos.map((todo: ITodo) => `- [x] ${todo.description}`).join('\n')}
    `;

    const gistUrl = await this.gistService.createGist(project.title, projectContent.trim(), githubToken);
    console.log(gistUrl)
    return gistUrl;
  }
}
