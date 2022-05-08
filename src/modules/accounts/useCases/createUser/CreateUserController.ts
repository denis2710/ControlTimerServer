import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(reuquest: Request, response: response) {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    return response.status(201).send();
  }
}

export { CreateUserController };
