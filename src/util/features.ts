export enum SiteFeature {
    InteractiveFootnotes = "interactive-footnotes",
    NoWebkitTransitions = "disable-webkit-transitions"
}

export function flagFeature(slug: SiteFeature) {
    const body = document.querySelector('body')!;
    let existingFeatures = (body.getAttribute('data-has-feature')?.split(',')) || [];
    if (existingFeatures.includes(slug)) return; // prevent double-flagging
    existingFeatures.push(slug);
    body.setAttribute('data-has-feature', existingFeatures.join(','));
}

export function queryFeature(slug: SiteFeature): boolean {
    const body = document.querySelector('body')!;
    let existingFeatures = (body.getAttribute('data-has-feature')?.split(',')) || [];
    return existingFeatures.includes(slug);
}
