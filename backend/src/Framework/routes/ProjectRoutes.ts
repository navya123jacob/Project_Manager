import { Router } from 'express';
import { ProjectController } from '../../adapter/ProjectController';
import { verifyJWT } from '../middleware/AuthMiddleware';

const router = Router();
const projectController = new ProjectController();

router.post('/create', verifyJWT, projectController.createProject.bind(projectController)); 
router.get('/', verifyJWT, projectController.getProjects.bind(projectController)); 
router.get('/:id', verifyJWT, projectController.getProjectById.bind(projectController)); 
router.post('/export-gist/:projectId', verifyJWT, projectController.exportProjectAsGist.bind(projectController)); 
router.put('/:id', verifyJWT, projectController.updateProjectTitle.bind(projectController));
router.delete('/:id', verifyJWT, projectController.deleteProject.bind(projectController));

export default router;
