import gql from 'graphql-tag';

const authTypeDefs = gql`
    scalar DateTime

    type AuthData {
        userId: ID!
        token: String!
        expiresIn: Int!
        tokenType: String!
    }

    input AuthInput {
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
        createUser(input: AuthInput): ID!
        loginUser(input: AuthInput): AuthData!
    }
`

export default {
    name: 'Auth',
    type: authTypeDefs
}