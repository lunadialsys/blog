import { useState } from 'preact/hooks';
import './PopupFootnote.css';
import type { JSX } from 'preact/jsx-runtime';

export function PopupFootnote(props: {id: string, reference: string, children: JSX.Element[]}) {
    let [hovered, setHovered] = useState(false);
    
    return (<>
        <a class="note" id={`user-content-fnref-${props.id}`} href={`#user-content-fn-${props.id}`}
            aria-describedby="footnote-label">
            <span class="inner"
                onMouseEnter={() => { setHovered(true); }}
                onMouseLeave={() => { setHovered(false); }}>{props.reference}</span>
            <div class={hovered ? 'bubble' : 'bubble hidden'}>
                <span>{props.children}</span>
            </div>
        </a>
    </>)
}
