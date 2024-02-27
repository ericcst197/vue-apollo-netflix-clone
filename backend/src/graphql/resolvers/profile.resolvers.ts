import Profile from "../../models/Profile"
import { GraphQLError } from 'graphql';

interface ProfileInput {
    name: string
    image?: string
    userId: string
}

const profilesResolvers = {
    Name: "Profiles",
    Query: {
        // Get a profile
        async profile(_: any, args: Record<string, any>, contextValue: any) {
            return await Profile.findById(args.id)
        },
        // Get some profiles
        async profiles(_: any, args: Record<string, any>, contextValue: any) {
            return await Profile.find(args.where)
        }
    },
    Mutation: {
        async createProfile(_: any, args: Record<string, any>) {
            try {
                const { name, image, userId } = args.input as ProfileInput;

                const createdProfile = new Profile({
                    name,
                    image,
                    userId
                })

                return await createdProfile.save()
            } catch (error: any) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'PROFILE_CREATION_FAILED',
                        argumentName: 'input',
                    },
                });
            }
        },
        async createProfiles(_: any, args: Record<string, any>) {
            try {
                const profiles = args.input as ProfileInput[];
                const profilesInstances = profiles.map((profile) => new Profile(profile))

                const createdProfiles = await Profile.insertMany(profilesInstances)

                return createdProfiles
            } catch (error: any) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'PROFILES_CREATION_FAILED',
                        argumentName: 'profiles',
                    },
                });
            }
        },
        // Update user
        async updateProfile(_: any, args: Record<string, any>) {
            const { name, image, userId } = args.input as ProfileInput;

            const wasUpdated = await Profile.findByIdAndUpdate({ _id: args.id }, {
                name,
                image,
                userId
            }, { new: true })

            wasUpdated && wasUpdated.save()

            console.log(`Testing: Updated profile in mongoose`)
            console.log('Updated result:', wasUpdated)
            return wasUpdated
        },
        // Delete user
        async deleteProfile(_: any, args: Record<string, any>) {
            try {
                const deletedProfile = await Profile.findByIdAndDelete({ _id: args.id })

                return deletedProfile
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default profilesResolvers