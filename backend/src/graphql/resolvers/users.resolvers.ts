import User from '../../models/User'

interface UserInput {
    name: string
    email: string
    password: string
    image: string
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
            
            return await User.find()
        }
    },
    Mutation: {
        // Update user
        async updateUser(_: any, { ID, userInput: {name, email, password, image} }: any) {
           const wasUpdated = await User.findByIdAndUpdate({ _id: ID }, {
                name,
                email,
                password,
                image,
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