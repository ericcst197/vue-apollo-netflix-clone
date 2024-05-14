import { profile } from "console";
import Bookmark from "../../models/Bookmark"
import { GraphQLError } from 'graphql';
import mongoose from "mongoose";

interface BookmarkInput {
    movieId: number
    profileId: string
    userId: string
}

const bookmarksResolvers = {
    Name: "Bookmarks",
    Query: {
        // Get a bookmark
        async bookmark(_: any, args: Record<string, any>, contextValue: any) {
            return await Bookmark.findById(args.id)
        },
        // Get some bookmarks
        async bookmarks(_: any, args: Record<string, any>, contextValue: any) {
            return await Bookmark.find(args.where)
        }
    },
    Mutation: {
        async createBookmark(_: any, args: Record<string, any>) {
            try {
                const { movieId, profileId, userId } = args.input as BookmarkInput;

                const createdBookmark = new Bookmark({
                    movieId,
                    profileId,
                    userId
                })

                return await createdBookmark.save()
            } catch (error: any) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BOOKMARK_CREATION_FAILED',
                        argumentName: 'input',
                    },
                });
            }
        },
        // Delete user
        async deleteBookmark(_: any, args: Record<string, any>) {
            try {
                const { movieId, profileId, userId } = args.input as BookmarkInput;

                const deletedBookmark = await Bookmark.findOneAndDelete({ 
                    movieId,
                    profileId,
                    userId
                })

                return deletedBookmark
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default bookmarksResolvers