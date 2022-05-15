import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';
import { ICreateUserDto } from '@modules/accounts/dtos/ICreateUserDto';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { container } from 'tsyringe';
import { AuthUserUseCase } from '@modules/accounts/useCases/authUser/AuthUserUseCase';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

const schema = buildSchema(`

type Auth{
  id: ID
}

type CreatUserResponseSuccess {
  sucess: Boolean
}

type Query {
  auth(id: ID): Auth
}

type AuthUserResponseSuccess{
  name: String,
  email: String, 
  token: String
}

type AuthUserResponseError{
  message: String,
}

union AuthUserReponse = AuthUserResponseSuccess | AuthUserResponseError

type Mutation {
  createUser(
    name: String!, 
    email: String!, 
    password: String!
  ): Boolean

  AuthUser(
    email: String!, 
    password: String!
  ): AuthUserResponseSuccess
}
`);

const resolvers = {
  async createUser({ name, email, password }: ICreateUserDto) {
    const userRepository: IUserRepository = container.resolve('UserRepository');
    const createUserUseCase = new CreateUserUseCase(userRepository);

    await createUserUseCase.execute({ name, email, password });
    return true;
  },

  async AuthUser({ email, password }: ICreateUserDto) {
    const userRepository: IUserRepository = container.resolve('UserRepository');
    const authUserUseCase = new AuthUserUseCase(userRepository);

    const { token, user } = await authUserUseCase.execute({ email, password });

    return {
      email: user.email,
      name: user.name,
      token,
    };
  },
};

const graphqlRouter = Router();

graphqlRouter.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);

export { graphqlRouter };
