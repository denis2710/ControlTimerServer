import { validate } from 'uuid';
import { AppError } from '../../../../shared/errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { ICreateUserDto } from '../../dtos/ICreateUserDto';
import { CreateUserUseCase } from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: IUserRepository;

const user: ICreateUserDto = {
  name: 'Fake user name',
  email: 'fake@example.com',
  password: 'fakepassword',
};

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create a user', async () => {
    await createUserUseCase.execute(user);

    const createdUser = await userRepositoryInMemory.findByEmail(user.email);

    expect(createdUser).not.toBeNull();
  });

  it('Created User should have a id', async () => {
    await createUserUseCase.execute(user);

    const createdUser = await userRepositoryInMemory.findByEmail(user.email);

    expect(createdUser?.id).not.toBeUndefined();
    expect(validate(createdUser?.id as string)).toBeTruthy();
  });

  it('Should not be able to create a user with email invalid', async () => {
    const user: unknown = {
      name: 'Fake user name',
      password: 'fakepassword',
    };

    expect(async () => {
      await createUserUseCase.execute(user as ICreateUserDto);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a user with password invalid', () => {
    const user: unknown = {
      name: 'Fake user name',
      email: 'fake@example.com',
    };

    expect(async () => {
      await createUserUseCase.execute(user as ICreateUserDto);
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to create a user with name invalid', () => {
    const user: unknown = {
      email: 'fake@example.com',
      password: 'fakepassword',
    };

    expect(async () => {
      await createUserUseCase.execute(user as ICreateUserDto);
    }).rejects.toBeInstanceOf(AppError);
  });
  it('User password should be ecriptaded', async () => {
    await createUserUseCase.execute(user);

    const createdUser = await userRepositoryInMemory.findByEmail(user.email);

    expect(user.password).not.toEqual(createdUser?.password);
  });

  it('Should not be able to create a user with email already used', async () => {
    expect(async () => {
      await createUserUseCase.execute(user);
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
