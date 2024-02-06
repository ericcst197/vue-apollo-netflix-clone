import User from '../../models/User';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ProcessENV from '../../env';
import moment from "moment"

interface AuthInput {
    email: string
    password: string
};

const authResolvers = {
    Name: "Auth",
    Query: {
        // Get some users
        async user(_: any, args: Record<string, any>, contextValue: any) {
            const result = await User.findById(args.ID)

            return result
        },
        // Get some users
        async users(_: any, args: Record<string, any>, contextValue: any) {
            const results = await User.find(args.where)

            return results
        }
    },
    Mutation: {
        // Create user
        async createUser(_: any, args: Record<string, any>) {
            const { email, password } = args.input as AuthInput;
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
                email: email.toLowerCase(),
                password: encryptedPassword,
            });

            createdUser.save()

            return createdUser._id
        },
        async loginUser(_: any, args: Record<string, any>) {
            const { email, password } = args.input as AuthInput;
            // See if a user exists with the email
            const user = await User.findOne({ email });

            if (!user) {
                throw new GraphQLError('Unable to login, email not exists', {
                    extensions: {
                        code: 'EMAIL_NOT_EXISTS',
                        argumentName: 'email',
                    },
                });
            };

            // Check if the entered password equlas the encryted password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new GraphQLError('Unable to login, incorrect password', {
                    extensions: {
                        code: 'INCORRECT_PASSWORD',
                        argumentName: 'password',
                    }
                });
            };

            const duration = moment.duration(1, "d").asMilliseconds()

            // Create a NEW token
            const token = jwt.sign(
                { user_id: user._id.toString(), email },
                ProcessENV.AUTH_TENANT_NAME,
                { expiresIn: duration }
            );

            user.token = token
            user.save()

            return {
                userId: user._id,
                token,
                expiresIn: duration,
                tokenType: "Bearer"
            };
        },
    }
}

export default authResolvers