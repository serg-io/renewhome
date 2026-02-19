/**
 * Converts HEX color values into an array of RGBA number values
 * @param hex #-prefixed hex color value. Accepts either 6-digit or shortened 3-digit hex values
 * @param alpha optional alpha value, as a decimal value between 0 and 1
 * @returns {[r:number,g:number,b:number,a:number]} array of RGBA values
 */
export function hexToRgbaValues(hex: string, alpha = 1): number[] {
  const rgbArr = (hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g) as RegExpMatchArray).map(x => parseInt(x, 16));

  return [...rgbArr, alpha];
}

/**
 * Format an array of RGBA values into a CSS rgba(x, x, x, x) string
 * @param {[r:number,g:number,b:number,a:number]} rgbaArr arry of RGBA values
 * @returns CSS rgba(x, x, x, x) formatted string
 */
export function formatRgba(rgbaArr: number[]): string {
  const [r = 0, g = 0, b = 0, a = 1] = rgbaArr;
  return 'rgba(' + [Math.round(r), Math.round(g), Math.round(b), a].join(', ') + ')';
}

/**
 * Format a hex value into a CSS rgba(x, x, x, x) string
 * @param hex #-prefixed hex color value. Accepts either 6-digit or shortened 3-digit hex values
 * @param alpha optional alpha value, as a decimal value between 0 and 1
 * @returns CSS rgba(x, x, x, x) formatted string
 */
export function formatHex(hex: string, alpha = 1): string {
  return formatRgba(hexToRgbaValues(hex, alpha));
}
