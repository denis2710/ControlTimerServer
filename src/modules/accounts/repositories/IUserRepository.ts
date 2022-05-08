import { ICreateUserDto } from '../dtos/ICreateUserDto';

export interface IUserRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<ICreateUserDto | undefined>;
}
