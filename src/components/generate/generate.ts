import { render } from "vue";
import GenerateProtocol from "./GenerateProtocol.vue";
import { IDocument } from "/@src/services/docs";

export function generate(data: IDocument) {
    let wrap = document.createElement('div');
    let vNode = h(GenerateProtocol, { data: data });
    render(vNode, wrap);
    return `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Madaniy Meros Agentligi</title>
        <style>
            * {
                line-height:1.2;
                font-size:14pt;
                font-family:'Times New Roman'
            }
        </style>
    </head>
    <body>
        ${wrap.outerHTML}
    </body>
    </html>
    `;
}