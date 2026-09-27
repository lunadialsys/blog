import { defineMdastPlugin, type DataMap } from "satteri";

type NodeChildren = any[];
interface FootnoteData extends DataMap {
    footnotes: Record<string, NodeChildren>,
}

export function parseFootnoteDefinitions() {
    return defineMdastPlugin({
        name: 'ld-footnote-defs',
        footnoteDefinition: function(node, ctx) {
            let data = (ctx.data as unknown as FootnoteData);
            if (!data.footnotes) data.footnotes = {};
            data.footnotes[node.identifier] = node.children;
        }
    })
}

export function parseFootnotes() {
    return defineMdastPlugin({
        name: 'ld-footnotes',
        footnoteReference: function(node, ctx) {
            let data = (ctx.data as unknown as FootnoteData);
            ctx.wrapNode(node, {
                type: 'ldnote',
                data: {
                    hName: 'ldnote',
                    hProperties: {
                        id: node.identifier,
                    },
                },
                children: data.footnotes[node.identifier]
            });
        }
    });
}
