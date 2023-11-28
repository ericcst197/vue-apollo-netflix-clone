import User from '../../models/User';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ProcessENV from '../../env';

interface RegisterInput {
    name: string
    email: string
    password: string
};

interface LoginInput {
    email: string
    password: string
};

const authResolvers = {
    Name: "Auth",
    Mutation: {
        // Create user
        async createUser(_: any , args: Record<string, any>) {
            const { name, email, password }: RegisterInput = args.registerInput;
            // See if an user exists with email attempting to register
            const oldUser = await User.findOne({ email });
            
            // Throw error if that exists
            if (oldUser) {
                throw new GraphQLError('A user is already registered with the email: ' + email, {
                    extensions: {
                        code: 'USER_ALREADY_EXISTS',
                        argumentName: 'email',
                    },
                });
            };

            // Encrypt password
            let encryptedPassword = await bcrypt.hash(password, 10);
            
            // Build out mongoose model
            const createdUser = new User({
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                createdAt: new Date().toISOString()
            });

            // Create our JWT (attach to our User model
            const token = jwt.sign(
                { user_id: createdUser._id.toString() , email }, 
                ProcessENV.AUTH_TENANT_NAME,
                { expiresIn: "24h"}
            );

            return {
                userId: createdUser._id,
                token
            };
        },
        async loginUser(_: any, args: any) {
            const { email, password }: LoginInput = args.loginInput;
            // See if a user exists with the email
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new GraphQLError('Unable to login', {
                    extensions: {
                        code: 'EMAIL_NOT_EXISTS',
                        argumentName: 'email',
                    },
                });
            };

            // Check if the entered password equlas the encryted password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new GraphQLError('Unable to login', {
                    extensions: {
                        code: 'INCORRECT_PASSWORD',
                        argumentName: 'password',
                    }
                });
            };
          
            // Create a NEW token
            const token = jwt.sign(
                { user_id: user._id.toString() , email }, 
                ProcessENV.AUTH_TENANT_NAME,
                { expiresIn: "1d"}
            );
 
            return {
                userId: user._id,
                token
            };
        },
    }
}

export default authResolvers