import User from '../../models/User'

interface UserInput {
    email: string
    password: string
}

const usersResolvers = {
    Name: "Users",
    Query: {
        // Get a user
        async user(_: any, args: Record<string, any>, contextValue: any) {
            return await User.findById(args.ID)
        },
        // Get some users
        async users(_: any, args: Record<string, any>, contextValue: any) {
            return await User.find(args.where)
        }
    },
    Mutation: {
        // Update user
        async updateUser(_: any, args: Record<string, any>) {
            const { email, password } = args.input as UserInput;

            const wasUpdated = await User.findByIdAndUpdate({ _id: args.ID }, {
                email,
                password,
            }, { new: true })

            console.log(`Testing: Updated user in mongoose`)
            console.log('Updated result:', wasUpdated)
            return wasUpdated
        },
        // Delete user
        async deleteUser(_: any, args: Record<string, any>) {
            try {
                const deletedUser = await User.findByIdAndDelete({ _id: args.ID })

                return deletedUser
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default usersResolvers