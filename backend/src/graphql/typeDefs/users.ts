import gql from 'graphql-tag';

const usersTypeDefs = gql`
    scalar DateTime
    # User object
    type User {
        id: ID
        email: String!
        token: String
        createdAt: DateTime
        updatedAt: DateTime
        createdById: String
        updatedById: String
    }

    input UserInput {
        email: String!
        password: String!
    }

    input userFilterInput {
        id: ID
        email: String
    }

    # Query
    type Query {
        user(ID: ID!): User!
        users(where: userFilterInput): [User!]!
    }

    # Mutation
    type Mutation {
        updateUser(ID: ID!, input: UserInput): User!
        deleteUser(ID: ID!): User!
    }
`

export default {
    name: 'Users',
    type: usersTypeDefs
}