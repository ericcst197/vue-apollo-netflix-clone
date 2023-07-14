export default function (document) {
    if (document.type === "article") {
        return `/article?id=${document.uid}`;
    }

    return "/";
}
