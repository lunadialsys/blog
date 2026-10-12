import { useEffect, useState } from 'preact/hooks';
import './PopupFootnote.css';
import type { JSX } from 'preact/jsx-runtime';
import { flagFeature, SiteFeature } from '@util/features';

export function PopupFootnote(props: {id: string, children: JSX.Element[]}) {
    let [hovered, setHovered] = useState(false);

    // cleanup on this effect is intentionally skipped
    useEffect(() => {
        flagFeature(SiteFeature.InteractiveFootnotes);
    });
    
    return (<>
        <a class="note" id={`user-content-fnref-${props.id}`} href={`#user-content-fn-${props.id}`}
            aria-describedby="footnote-label">
            <span class="inner"
                onMouseEnter={() => { setHovered(true); }}
                onMouseLeave={() => { setHovered(false); }}>{props.id}</span>
            <div class={hovered ? 'bubble' : 'bubble hidden'}>
                <span>{props.children}</span>
            </div>
        </a>
    </>)
}
