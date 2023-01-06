import { ObjectId } from "mongodb";
export default class Item {
    LocalizationNameVariable: string;
    LocalizationDescriptionVariable: string;
    LocalizedNames: {
        [key: string]: string;
    };
    LocalizedDescriptions: {
        [key: string]: string;
    };
    Index: string;
    UniqueName: string;
    id?: ObjectId | undefined;
    constructor(LocalizationNameVariable: string, LocalizationDescriptionVariable: string, LocalizedNames: {
        [key: string]: string;
    }, LocalizedDescriptions: {
        [key: string]: string;
    }, Index: string, UniqueName: string, id?: ObjectId | undefined);
    get_img_url(quality?: 1 | 2 | 3 | 4 | 5 | null): string;
}
