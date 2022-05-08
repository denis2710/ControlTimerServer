import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthUserUseCase } from './AuthUserUseCase';

let authUserUseCase: AuthUserUseCase;
let userRepositoryInMemory: IUserRepository;
let createUserUseCase: CreateUserUseCase;

const user = {
  name: 'Fake user name',
  email: 'fake@example.com',
  password: 'fakepassword',
};

describe('Auth User', () => {
  beforeEach(async () => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authUserUseCase = new AuthUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

    await createUserUseCase.execute(user);
  });

  it('Should autenticate a user', async () => {
    const credentials = { email: user.email, password: user.password };

    const userAuthenticated = await authUserUseCase.execute(credentials);

    expect(userAuthenticated).toHaveProperty('token');
  });

  it('Should not autenticate a user with wrong password', async () => {
    await expect(async () => {
      const credentials = {
        email: user.email,
        password: 'wrong password',
      };

      await authUserUseCase.execute(credentials);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not autenticate a user with wrong email', async () => {
    await expect(async () => {
      const credentials = {
        email: 'wrong@email.com',
        password: user.password,
      };

      await authUserUseCase.execute(credentials);
    }).rejects.toBeInstanceOf(AppError);
  });
});
