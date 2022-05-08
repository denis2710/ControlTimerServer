import { IUserRepository } from 'modules/accounts/repositories/IUserRepository';
import { ICreateUserDto } from 'modules/accounts/dtos/ICreateUserDto';

class UserRepositoryInMemory implements IUserRepository {
  database: ICreateUserDto[];

  constructor() {
    this.database = [];
  }

  async create({ id, name, email, password }: ICreateUserDto): Promise<void> {
    this.database.push({ id, name, email, password });
  }

  async findByEmail(email: string): Promise<ICreateUserDto | undefined> {
    const user = this.database.find(u => u.email === email);

    return user;
  }
}

export { UserRepositoryInMemory };
