import { defineMdastPlugin, type DataMap } from "satteri";

type NodeChildren = any[];
interface FootnoteData extends DataMap {
    footnotes: Record<string, NodeChildren>,
}

export function parseFootnoteDefinitions() {
    return defineMdastPlugin({
        name: 'ld-footnote-defs',
        footnoteDefinition: function(node, ctx) {
            let dataBag = (ctx.data as unknown as FootnoteData);
            if (!dataBag.footnotes) dataBag.footnotes = {};

            let id = node.identifier as string;
            console.log(id);
            let match = node.children;
            dataBag.footnotes[id] = match;
            console.log(node.children);
        }
    })
}

export function parseFootnotes() {
    return defineMdastPlugin({
        name: 'ld-footnotes',
        footnoteReference: function(node, ctx) {
            let dataBag = (ctx.data as unknown as FootnoteData);
            let id = node.identifier as string;
            ctx.wrapNode(node, {
                type: 'ldnote',
                data: {
                    hName: 'ldnote',
                    hProperties: {
                        id: node.identifier,
                        dataId: id,
                    },
                },
                children: dataBag.footnotes[id]
            });
        }
    });
}
