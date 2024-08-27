import { Router } from 'express';
import { TodoController } from '../../adapter/TodoController';
import { TodoRepository } from '../Repository/TodoRepository';
import { ProjectRepository } from '../Repository/ProjectRepository';
import { TodoUseCase } from '../../use_case/TodoUseCases';
import { verifyJWT } from '../middleware/AuthMiddleware';

const projectRepository = new ProjectRepository();
const todoRepository = new TodoRepository(projectRepository);

const todoUseCase = new TodoUseCase(todoRepository, projectRepository);
const todoController = new TodoController(todoUseCase);

const router = Router();

router.post('/create', verifyJWT, todoController.createTodo.bind(todoController)); // Protect this route
router.patch('/update-status', verifyJWT, todoController.updateTodoStatus.bind(todoController)); // Protect this route
router.get('/project/:projectId', verifyJWT, todoController.getTodosByProjectId.bind(todoController)); // Protect this route

export default router;
