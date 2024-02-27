import gql from 'graphql-tag';

const profilesTypeDefs = gql`
    # User object
    type Profile {
        id: ID
        name: String!
        image: String
        userId: String!
        createdAt: DateTime
        updatedAt: DateTime
        createdById: String
        updatedById: String
    }

    input ProfileInput {
        userId: String!
        name: String!
        image: String
    }

    input profileFilterInput {
        id: ID
        userId: String
    }

    # Query
    type Query {
        profile(id: ID!): Profile!
        profiles(where: profileFilterInput): [Profile!]!
    }

    # Mutation
    type Mutation {
        createProfile(input: ProfileInput!): Profile!
        createProfiles(input: [ProfileInput!]!): [Profile!]!
        updateProfile(id: ID!, input: ProfileInput!): Profile!
        deleteProfile(id: ID!): Profile!
    }
`

export default {
    name: 'Profiles',
    type: profilesTypeDefs
}