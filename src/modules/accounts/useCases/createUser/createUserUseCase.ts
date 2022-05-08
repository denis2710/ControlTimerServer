import { IUserRepository } from 'modules/accounts/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDto } from '../../dtos/ICreateUserDto';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDto) {
    const id = uuid();

    if (!name) {
      throw new AppError(`Name must be provided`, 400);
    }

    if (!email) {
      throw new AppError(`Email must be provided`, 400);
    }

    if (!password) {
      throw new AppError(`Password must be provided`, 400);
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError(`User already exists`, 400);
    }

    const passwordHash = await bcrypt.hash(password, 8);

    this.userRepository.create({
      id,
      name,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
