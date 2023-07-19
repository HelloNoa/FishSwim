export const setImg = (imgSrc: string) => {
    const img = new Image();
    img.src = imgSrc;
    return img;
}