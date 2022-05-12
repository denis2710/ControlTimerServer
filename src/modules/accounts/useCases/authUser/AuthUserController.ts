import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthUserUseCase } from './AuthUserUseCase';

class AuthUserController {
  async handle(request: Request, response: Response) {
    const authUserController = container.resolve(AuthUserUseCase);

    const { email, password } = request.body;

    const userAndToken = await authUserController.execute({ email, password });

    return response.json(userAndToken);
  }
}

export { AuthUserController };
