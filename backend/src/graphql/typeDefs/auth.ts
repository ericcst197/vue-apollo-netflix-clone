import gql from 'graphql-tag';

const authTypeDefs = gql`
    scalar DateTime

    type User {
        id: ID
        email: String!
        token: String
        createdAt: DateTime
        updatedAt: DateTime
        createdById: String
        updatedById: String
    }

    input userFilterInput {
        id: ID
        email: String
    }

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
    type Query {
        user(ID: ID!): User!
        users(where: userFilterInput): [User!]!
    }

    # Mutation
    type Mutation {
        createUser(input: AuthInput): ID!
        loginUser(input: AuthInput): AuthData!
        logoutUser(ID: ID!): AuthData!
    }
`

export default {
    name: 'Auth',
    type: authTypeDefs
}