import { buildSchema } from 'graphql';

export default buildSchema(`

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
