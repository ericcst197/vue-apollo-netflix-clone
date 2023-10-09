import User from '../../models/User'

interface UserInput {
    name: string
    email: string
    password: string
    image: string
    firstName?: string
    lastName?: string
}

const usersResolvers = {
    Query: {
        // Get a user
        async user(_: any, args: Record<string, any>) {
            return await User.findById(args.ID)
        },
        // Get some users
        async users(_: any, args: Record<string, any>) {
            return await User.find({ _id: { $in: args.IDS } })
        }
    },
    Mutation: {
        // Create user
        async createUser(_: any , { userInput: {name, email, password, image} }: any) {
            const createdUser = new User({
                name,
                email,
                password,
                image,
                createdAt: new Date().toISOString()
            })

            const res = await createdUser.save() // MongoDB saving
            
            console.log('Testing: User created in mongoose')
            console.log('Created result', res.toJSON())

            return {
                id: res._id,
                ...res.toJSON()
            }
        },
        // Update user
        async updateUser(_: any, { ID, userInput: {name, email, password, image, createdAt} }: any) {
           const wasUpdated = await User.findByIdAndUpdate({ _id: ID }, {
                name,
                email,
                password,
                image,
                createdAt,
                updatedAt: new Date().toISOString()
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