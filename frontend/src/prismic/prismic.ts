import { createPrismic } from "@prismicio/vue";
import LinkResolver from "./LinkResolver";

const prismic = createPrismic({
    endpoint: "carmine",
    linkResolver: LinkResolver,
});

export default prismic;
