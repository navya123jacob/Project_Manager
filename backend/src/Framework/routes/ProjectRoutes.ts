import { Router } from 'express';
import { ProjectController } from '../../adapter/ProjectController';
import { verifyJWT } from '../middleware/AuthMiddleware';

const router = Router();
const projectController = new ProjectController();

router.post('/create', verifyJWT, projectController.createProject.bind(projectController)); // Protect this route
router.get('/', verifyJWT, projectController.getProjects.bind(projectController)); // Protect this route
router.get('/:id', verifyJWT, projectController.getProjectById.bind(projectController)); // Protect this route
router.post('/export-gist/:projectId', verifyJWT, projectController.exportProjectAsGist.bind(projectController)); // Protect this route

export default router;
