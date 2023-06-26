import { createApp } from "vue"

// Global components
import ContentContainerVue from "~/layouts/ContentContainer.vue";

import "./index.css"

import App from "./App.vue"
import router from "./router";

const app = createApp(App)

app.use(router);


app.component("content-container", ContentContainerVue);
app.mount('#app');
