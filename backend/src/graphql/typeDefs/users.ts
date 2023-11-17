import gql from 'graphql-tag';

const usersTypeDefs = gql`
    scalar DateTime
    # User object
    type User {
        id: ID
        name: String!
        email: String!
        token: String
        image: String
        createdAt: DateTime
        updatedAt: DateTime
        createdById: String
        updatedById: String
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
        image: String
    }

    # Query
    type Query {
        user(ID: ID!): User!
        users: [User!]!
    }

    # Mutation
    type Mutation {
        updateUser(ID: ID!, userInput: UserInput): User!
        deleteUser(ID: ID!): User!
    }
`

export default {
    name: 'Users',
    type: usersTypeDefs
}