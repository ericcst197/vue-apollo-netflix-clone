import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    split,
    ApolloLink,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

async function getHeaders() {
    try {
        const auth = localStorage.getItem("netflix-clone-auth");
        const token = auth && JSON.parse(auth).token;

        if (typeof token === "string" && token.length > 0) {
            // Attach the token to the headers
            return {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            };
        } else {
            // If the token doesn't exist (e.g., user is not logged in), handle accordingly
            throw new Error('User is not logged in');
        }
    } catch (error: any) {
        console.error('Error retrieving auth token:', error.message);
        throw error;
    }
}

const authHttpLink = createHttpLink({
    uri: import.meta.env.VUE_APP_AUTH_SERVER_BASE_URL,
});

const httpLink = createHttpLink({
    uri: import.meta.env.VUE_APP_APOLLO_SERVER_BASE_URL,
});

const wsLink = new GraphQLWsLink(createClient({
    url: import.meta.env.VUE_APP_APOLLO_SERVER_WS_URL,
    connectionParams: () => ({
        headers: getHeaders(),
        lazy: true,
    }),
}));

// Create a middleware to set the authorization header
const authLink = setContext(async (_) => {
    return {
        headers: await getHeaders()
    };
});

const link: ApolloLink = ApolloLink.from([
    authLink,
    split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink
    ) as any
])

// Create Apollo Clients for each endpoint
export const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export const apolloAuthClient = new ApolloClient({
    link: authHttpLink,
    cache: new InMemoryCache(),
});






