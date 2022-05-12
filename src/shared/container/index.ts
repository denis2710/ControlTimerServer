import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  UserRepositoryInMemory,
);
