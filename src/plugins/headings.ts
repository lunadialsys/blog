import { defineHastPlugin } from "satteri";

export default function() {
    return defineHastPlugin({
        name: 'ldheadings',
        element: {
            filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            visit(node, ctx) {
                ctx.replaceNode(node, {
                    type: 'element',
                    tagName: 'ldheading',
                    properties: {
                        id: node.properties.id,
                        level: parseInt(node.tagName.slice(1))
                    },
                    children: node.children
                });
            }
        }
    });
}
