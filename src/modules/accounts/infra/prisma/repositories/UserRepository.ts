import { ICreateUserDto } from '@modules/accounts/dtos/ICreateUserDto';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { PrismaClient } from '@prisma/client';

class UserRepository implements IUserRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: ICreateUserDto): Promise<void> {
    await this.prisma.$connect();

    const { name, email, password } = data;

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
  async findByEmail(email: string): Promise<ICreateUserDto | undefined> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user as ICreateUserDto;
  }
}

export { UserRepository };
