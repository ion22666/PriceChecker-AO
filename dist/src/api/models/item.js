export function ExtendItem(document) {
    if (!document) {
        return null;
    }
    else {
        document.get_img_url = (quality = 1) => {
            return `https://render.albiononline.com/v1/item/${document.UniqueName}.png${quality !== null ? "?qulity=" + quality : void 0}`;
        };
        return document;
    }
}
