import gql from 'graphql-tag';

const authTypeDefs = gql`
    scalar DateTime

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    # Qeury
    # GraphQL not allow to have only 1 Query or none, the _dummy queries used to resolve the error
    type Query {
        _dummy : Boolean
        _dummy2 : Boolean
    }

    # Mutation
    type Mutation {
        createUser(registerInput: RegisterInput): AuthData!
        loginUser(loginInput: LoginInput): AuthData!
    }
`

export default {
    name: 'Auth',
    type: authTypeDefs 
}