import { createApp } from "vue"

// Global components
import ContentContainerVue from "~/layouts/ContentContainer.vue";
import Divider from "~/components/Divider.vue";

import "./index.css"

import App from "./App.vue"
import router from "./router";

const app = createApp(App)

app.use(router);


app.component("content-container", ContentContainerVue);
app.component("divider", Divider);

app.mount('#app');
