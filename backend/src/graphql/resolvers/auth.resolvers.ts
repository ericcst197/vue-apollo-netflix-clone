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

            return createdUser._id
        },
        async loginUser(_: any, args: any) {
            const { email, password } = args.input as AuthInput;
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

            const duration = moment.duration(1, "d").asMilliseconds()
            console.log(duration, "moment.js_____")
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