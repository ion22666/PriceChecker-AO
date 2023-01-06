import { ObjectId } from "mongodb";

export function ExtendItem(document: ItemDocument | null): ItemType | null {
    if (!document) {
        return null;
    } else {
        (document as ItemType).get_img_url = (quality = 1): string => {
            return `https://render.albiononline.com/v1/item/${document.UniqueName}.png${quality !== null ? "?qulity=" + quality : void 0}`;
        };
        return document as ItemType;
    }
}
