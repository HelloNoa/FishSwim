export const d2d = (d1x: number, d1y: number, d2x: number, d2y: number) => {
    const x = d2x - d1x;
    const y = d2y - d1y;
    return Math.sqrt(x ** 2 + y ** 2);
}