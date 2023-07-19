import { Element } from "@prismicio/helpers";

export function faqSerializer(type, element, content, children) {
    switch (type) {
        case Element.paragraph:
            return `<p class="text-lg laptop:text-2xl ">${content}<br/><br/></p>`;
        // case Element.oListItem:
        //     return `<li class="text-md text-gray-500">${content}<br/><br/></li>`;
        // case Element.listItem:
        //     return `<li class="text-md text-gray-500">${content}<br/><br/></li>`;
        // case Element.list:
        //     return `<ul class="list-disc pl-8">${children}</ul>`;
        // case Element.oList:
        //     return `<ol class="list-decimal pl-8">${children}</ol>`;
        // case Element.hyperlink:
        //     return `<a class="text-md text-primary-700">${content}<a/>`;
        default:
            return null;
    }
}
