import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    split,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

async function getHeaders() {
    try {
        const auth = localStorage.getItem("auth");
        const token = auth && JSON.parse(auth).userAuth.token;

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

// Create a middleware to set the authorization header
const authLink = setContext(async (_) => {
    return {
        headers: await getHeaders()
    };
});

// Create a combined Apollo Client using the combined link
const combinedApolloClient = new ApolloClient({
    link: authLink.concat(
        split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return definition.kind === 'OperationDefinition' && definition.operation !== 'subscription';
            },
            // Use the HTTP link with middleware for normal operations
            authHttpLink,
            httpLink,
        )
    ),
    cache: new InMemoryCache(),
});

export default combinedApolloClient;





