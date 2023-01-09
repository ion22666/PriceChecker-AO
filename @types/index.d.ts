import { Handler } from "express";
declare global {
    type ItemLocalizedDocument = {
        LocalizationNameVariable: string;
        LocalizationDescriptionVariable: string;
        LocalizedNames: { [key: string]: string };
        LocalizedDescriptions: { [key: string]: string };
        Index: string;
        UniqueName: string;
        id?: ObjectId;
        img_url?: string;
    };

    type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

    type ItemLocalizedType = ItemLocalizedDocument & {
        get_img_url(quality?: 1 | 2 | 3 | 4 | 5): string;
    };

    type MyServerConfig = {
        port: number;
        mode: "production" | "development";
    };

    type AddressInfo = AddressInfo;
}
