import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { graphql } from 'graphql'

import { json } from 'body-parser';
import mongoose from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";

import ProcessENV from "./env";
import context from "./context/context";
import { validTypeDef, typeDefs, authTypeDefs } from "./graphql/typeDefs/index";
import { resolvers, authResolvers } from "./graphql/resolvers/index";

// Utilities in terminal
import chalk from "chalk";

const app = express();
const httpServer = http.createServer(app);
const port = ProcessENV.PORT || 8000;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const authSchema = makeExecutableSchema({
    typeDefs: authTypeDefs,
    resolvers: authResolvers,
});

/** 
 * Main server - with auth middleware
 */
const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: ProcessENV.NODE_ENV !== 'production'
});

/** 
 * Auth server - without middleware
 */
const authServer = new ApolloServer({
    schema: authSchema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: ProcessENV.NODE_ENV !== 'production'
});

/**
 * Connect database and start servers
 */
async function startServers(): Promise<void> {
    await mongoose.connect(ProcessENV.MONGODB, { autoIndex: false });
    
    console.log(chalk.blue("MongoDB Connection successful") + "🚀");

    await server.start();
    await authServer.start();

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(server, {
            context
        }),
    );

    app.use(
        '/auth',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(authServer),
    );
    
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    
    console.log(chalk.blue(`Server running at port: `) + chalk.green(`http://localhost:${port}/graphql`));
    console.log(chalk.blue(`Auth_Server running at port: `) + chalk.green(`http://localhost:${port}/auth`));
}

if(!validTypeDef) {
    console.log("---- Unvalid TypeDef -----")
} else {
    startServers();
}

