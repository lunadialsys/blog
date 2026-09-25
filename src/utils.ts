// written by my good friend cynn (@cyclar.fyi on the blue site)
// adapted from the CSS specification: https://www.w3.org/TR/css-color-4/#color-conversion-code
function oklch2srgb([L, c, h]: [number, number, number]) {
    const _a = c * Math.cos(h * 0.017453292519943295);
    const _b = c * Math.sin(h * 0.017453292519943295);

    const [_L, _M, _S] = [
        (L + 0.3963377773761749 * _a + 0.2158037573099136 * _b) ** 3,
        (L - 0.1055613458156586 * _a - 0.0638541728258133 * _b) ** 3,
        (L - 0.0894841775298119 * _a - 1.2914855480194092 * _b) ** 3
    ];
    
    const [_X, _Y, _Z] = [
        1.2268798758459243  * _L - 0.5578149944602171 * _M + 0.2813910456659647 * _S,
        -0.0405757452148008 * _L + 1.1122868032803170 * _M - 0.0717110580655164 * _S,
        -0.0763729366746601 * _L - 0.4214933324022432 * _M + 1.5869240198367816 * _S
    ];

    const _RGB = [
        3.2409699419045213  * _X - 1.5373831775700935  * _Y - 0.4986107602930033  * _Z,
        -0.9692436362808798 * _X + 1.8759675015077206  * _Y + 0.04155505740717561 * _Z,
        0.05563007969699361 * _X - 0.20397695888897657 * _Y + 1.0569715142428786  * _Z
    ].map(x => {
        const sign = Math.sign(x);
        const abs = Math.abs(x);
        return Math.round(255 * Math.min(1, Math.max(0, abs > 0.0031308 ? sign * (1.055 * (abs ** 0.4166666666666667) - 0.055) : 12.92 * x)));
    });

    return _RGB as [number, number, number];
}

function oklab2srgb([L, a, b]: [number, number, number]) {
    const [_L, _M, _S] = [
        (L + 0.3963377773761749 * a + 0.2158037573099136 * b) ** 3,
        (L - 0.1055613458156586 * a - 0.0638541728258133 * b) ** 3,
        (L - 0.0894841775298119 * a - 1.2914855480194092 * b) ** 3
    ];
    
    const [_X, _Y, _Z] = [
        1.2268798758459243  * _L - 0.5578149944602171 * _M + 0.2813910456659647 * _S,
        -0.0405757452148008 * _L + 1.1122868032803170 * _M - 0.0717110580655164 * _S,
        -0.0763729366746601 * _L - 0.4214933324022432 * _M + 1.5869240198367816 * _S
    ];
    const _RGB = [
        3.2409699419045213  * _X - 1.5373831775700935  * _Y - 0.4986107602930033  * _Z,
        -0.9692436362808798 * _X + 1.8759675015077206  * _Y + 0.04155505740717561 * _Z,
        0.05563007969699361 * _X - 0.20397695888897657 * _Y + 1.0569715142428786  * _Z
    ].map(x => {
        const sign = Math.sign(x);
        const abs = Math.abs(x);
        return Math.round(255 * Math.min(1, Math.max(0, abs > 0.0031308 ? sign * (1.055 * (abs ** 0.4166666666666667) - 0.055) : 12.92 * x)));
    });
    return _RGB as [number, number, number];
}

function constrain(n: number, min: number,  max: number)  {
    return min + (n * (max - min));
}

//@ts-ignore unusedFunction
function hashToColourOklab(val: number): string {
    let rawL = (val & 0xff) / 255;
    let rawA = ((val >> 6) & 0xff) / 255;
    let rawB = ((val >> 8) & 0xff) / 255;

    const abBound = 0.3;
    let l = constrain(rawL, 0.5, 0.8);
    let a = constrain(rawA, -abBound, abBound);
    let b = constrain(rawB, -abBound, abBound);

    let [sr, sg, sb] = oklab2srgb([l, a, b]);
    return `rgb(${sr} ${sg} ${sb})`
}

// these numbers (especially those passed to `constrain`, as well as the bit shifts)
// were arrived to in a purely vibes-based fashion. feel free to tweak them if you are using this
function hashToColourOklch(val: number): string {
    let rawL = ((val * 24578573) & 0xff) / 255;
    let rawC = ((val >> 2) & 0xff) / 255;
    let rawH = (((val * 283) >> 3) & 0xff) / 255;

    let l = constrain(rawL, 0.7, 1.0);
    let c = constrain(rawC, 0.15, 0.22);
    let h = constrain(rawH, 0, 360);

    let [sr, sg, sb] = oklch2srgb([l, c, h]);
    return `rgb(${sr} ${sg} ${sb})`
}

export function tagColourHash(tag: string) {
    // cyrb53 (c) 2018 bryc (github.com/bryc). License: Public domain. Attribution appreciated.
    // https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
    let hashFunction = (str: string, seed = 0) => {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for(let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };

    let val = Math.abs(hashFunction(tag));
    return hashToColourOklch(val);
}
