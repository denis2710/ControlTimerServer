import { AppError } from '@shared/errors/AppError';
import { IAuthUserDto } from '@modules/accounts/dtos/IAuthUserDto';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: IAuthUserDto): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`User or pasword invalid`, 401);
    }

    const tokenPayload = `${process.env.TOKEN_PAYLOAD}`;

    const token = jwt.sign({}, tokenPayload, {
      subject: user.id,
      expiresIn: '1d',
    });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(`User or pasword invalid`, 401);
    }

    return {
      user: { name: user.name, email: user.email },
      token,
    };
  }
}

export { AuthUserUseCase };
