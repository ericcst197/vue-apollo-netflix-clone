import { createApp } from "vue"
import { createPinia } from "pinia";

// Apollo
import {
    provideApolloClients,
    ApolloClients
} from "@vue/apollo-composable";
import { createApolloProvider } from "@vue/apollo-option";
import { apolloAuthClient, apolloClient } from "./helpers/apollo";

// Global components
import ContentContainerVue from "~/layouts/ContentContainer.vue";
import Divider from "~/components/Divider.vue";

import 'vueperslides/dist/vueperslides.css'
import "./index.css"

import App from "./App.vue"
import router from "./router";
import prismic from "~/prismic/prismic";


// Options API for Apollo
provideApolloClients({
    default: apolloClient,
    authClient: apolloAuthClient
})


const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
    clients: {
        apolloClient,
        apolloAuthClient,
    },
});

const app = createApp(App);
const pinia = createPinia();

app.provide(ApolloClients, {
    default: apolloClient,
    authClient: apolloAuthClient
})
app.use(apolloProvider);
app.use(pinia);
app.use(router);
app.use(prismic);

app.component("content-container", ContentContainerVue);
app.component("divider", Divider);

app.mount('#app');
