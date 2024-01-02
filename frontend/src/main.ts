import { createApp } from "vue"
import { createPinia } from "pinia";

// Apollo
import {
    DefaultApolloClient,
    provideApolloClient,
    ApolloClients
} from "@vue/apollo-composable";
import { createApolloProvider } from "@vue/apollo-option";
import combinedApolloClient from "./helpers/apollo";

// Global components
import ContentContainerVue from "~/layouts/ContentContainer.vue";
import Divider from "~/components/Divider.vue";

import "./index.css"

import App from "./App.vue"
import router from "./router";
import prismic from "~/prismic/prismic";


// Options API for Apollo
provideApolloClient(combinedApolloClient);
const apolloProvider = createApolloProvider({
    defaultClient: combinedApolloClient,
});

const app = createApp(App);
const pinia = createPinia();

app.provide(DefaultApolloClient, combinedApolloClient);
app.use(apolloProvider);
app.use(pinia);
app.use(router);
app.use(prismic);

app.component("content-container", ContentContainerVue);
app.component("divider", Divider);

app.mount('#app');
