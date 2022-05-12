import { AuthUserController } from '@modules/accounts/useCases/authUser/AuthUserController';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { Router } from 'express';

const authRoutes = Router();
const createUserController = new CreateUserController();
const authUserController = new AuthUserController();

authRoutes.post('/', authUserController.handle);
authRoutes.post('/create', createUserController.handle);

export { authRoutes };
