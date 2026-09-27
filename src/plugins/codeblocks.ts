import { defineHastPlugin } from 'satteri';
import {h} from 'hastscript';

export default function() {
    return defineHastPlugin({
        name: 'wrap-code-blocks',
        element: {
            filter: ['pre'],
            visit(node, ctx) {
                const lang = node.properties['dataLanguage'] as string;
                const parent = h('div.codeblock', [
                    h('span.codeblock-tag', `${lang}`),
                    node
                ]);
                parent.properties['data-lang'] = lang;
                ctx.replaceNode(node, parent);
            },
        },
    });
}
