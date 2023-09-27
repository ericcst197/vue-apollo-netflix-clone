import gql from 'graphql-tag';

const usersTypeDefs = gql`
    scalar DateTime
    # User object
    type User {
        id: ID
        name: String!
        email: String!
        password: String!
        image: String
        firstName: String
        lastName: String
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
        firstName: String
        lastName: String
    }

    # Query
    type Query {
        user(ID: ID!): User!
        users(IDS: [ID!]!): [User!]!
    }

    # Mutation
    type Mutation {
        createUser(userInput: UserInput): User!
        updateUser(ID: ID!, userInput: UserInput): User!
        deleteUser(ID: ID!): User!
    }
`
export default usersTypeDefs  