import gql from 'graphql-tag';

const bookmarksTypeDefs = gql`
    # Bookmark object
    type Bookmark {
        id: ID
        movieId: String!
        profileId: ID!
        userId: ID!
        createdAt: DateTime
        updatedAt: DateTime
        createdById: String
        updatedById: String
    }

    input BookmarkInput {
        movieId: String!
        profileId: ID!
        userId: ID!
    }

    input bookmarkFilterInput {
        id: ID
        movieId: String
        profileId: ID
        userId: ID
    }

    # Query
    type Query {
        bookmark(id: ID!): Bookmark!
        bookmarks(where: bookmarkFilterInput): [Bookmark!]!
    }

    # Mutation
    type Mutation {
        createBookmark(input: BookmarkInput!): Bookmark!
        deleteBookmark(input: BookmarkInput!): Bookmark!
    }
`

export default {
    name: 'Bookmarks',
    type: bookmarksTypeDefs
}