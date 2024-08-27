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

router.post('/create', verifyJWT, todoController.createTodo.bind(todoController));
router.patch('/update-status', verifyJWT, todoController.updateTodoStatus.bind(todoController)); 
router.get('/project/:projectId', verifyJWT, todoController.getTodosByProjectId.bind(todoController)); 
router.delete('/:id', verifyJWT, todoController.deleteTodo.bind(todoController));

export default router;
