export function HexToRgb(hex: string): string | null {
    if (hex[0] !== '#') return null;
    if (hex.length !== 7 && hex.length !== 4) return null;
    // if string has 3 values translate to 6 values
    const code = hex.length === 7 ? hex.substring(1) : hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    const aRgbHex = code.match(/.{1,2}/g);
    return aRgbHex ? aRgbHex.map((el) => parseInt(el, 16)).join(',') : null;
}

export function LighterRGB(rgbcode: string | null, times = 1): string {
    const codes = rgbcode?.includes(',') ? rgbcode.split(',') : ['0', '0', '0'];
    const ligthen = codes.map((el: string) => parseInt(el) + times * 40);
    return ligthen.join(',');
}
