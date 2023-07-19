import { createPrismic } from "@prismicio/vue";
import LinkResolver from "./LinkResolver";

const prismic = createPrismic({
    endpoint: "Vue-netflix-clone",
    linkResolver: LinkResolver,
});

export default prismic;
