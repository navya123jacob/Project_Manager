import { Request, Response } from 'express';
import { ProjectUseCase } from '../use_case/ProjectUseCase';
import { ProjectRepository } from '../Framework/Repository/ProjectRepository';
import { GistService } from '../Framework/Services/GistService';

export class ProjectController {
  private projectUseCase: ProjectUseCase;

  constructor() {
    const projectRepository = new ProjectRepository();
    const gistService = new GistService(process.env.GITHUB_TOKEN || '');
    this.projectUseCase = new ProjectUseCase(projectRepository, gistService);
  }

  async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const project = await this.projectUseCase.getProjectById(id);
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
      } else {
        res.status(200).json(project);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.body;
      const project = await this.projectUseCase.createProject(title);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = await this.projectUseCase.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async exportProjectAsGist(req: Request, res: Response): Promise<void> {
    try {
      const { projectId } = req.params;  
      const githubToken = process.env.GITHUB_TOKEN || req.body.githubToken;  

      if (!githubToken) {
        throw new Error('GitHub token is required');
      }

      const gistUrl = await this.projectUseCase.exportProjectAsGist(projectId, githubToken);
      res.status(200).json({ gistUrl });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
  async updateProjectTitle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const project = await this.projectUseCase.updateProjectTitle(id, title);
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
      } else {
        res.status(200).json(project);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
  
}
