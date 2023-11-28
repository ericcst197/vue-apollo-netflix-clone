import jwt from "jsonwebtoken";
import ProcessENV from "../env";
import { ExpressContextFunctionArgument } from "@apollo/server/express4";
import { GraphQLError } from "graphql";
import User from "../models/User";

const verifyUser = async (token: string) => {
    try {
        if (token) {
            const { user_id } = jwt.verify(token, ProcessENV.AUTH_TENANT_NAME) as {
                user_id: string;
            };

            return await User.findOne({ _id: user_id });   
        };
        return null;
    } catch (error) {
        throw new Error('JWT verification failed');
    };
};

const context = async (context: ExpressContextFunctionArgument ) => {
    const { req, res } = context;
    if (req.body.operationName === 'IntrospectionQuery') {
        return {};
    };

    // get the user token from the headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new GraphQLError('Authorization header must be provided', {
            extensions: {
                code: 'AUTHORIZATION_HEADER_NOT_EXIST',
                argumentName: 'authorization',
                http: { status: 401 },
            },
        });
    };

    const token = authHeader.split(' ')[1];

    // Try to retrieve a user with the token
    const currentUser = await verifyUser(token);
    
    if (!currentUser) {
        throw new GraphQLError('User is not Authenticated', {
            extensions: {
                code: 'NOT_AUTHENTICATED',
                argumentName: 'authentication',
                http: { status: 401 },
            },
        });
    };
   
    // add the user to the context
    return { currentUser };
};

export default context;