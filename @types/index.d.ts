import { Handler } from "express";

declare global {
    type StateChanger<T> = React.Dispatch<React.SetStateAction<T>>;
    type FunctionComponent<T extends object = {}> = React.FC<T>;
    type Language = "EN-US" | "DE-DE" | "FR-FR" | "RU-RU" | "PL-PL" | "ES-ES" | "PT-BR" | "IT-IT" | "ZH-CN" | "KO-KR" | "JA-JP" | "ZH-TW" | "ID-ID";
    type ItemDocumentProperties =
        | "LocalizationNameVariable"
        | "LocalizationDescriptionVariable"
        | "LocalizedNames"
        | "LocalizedDescriptions"
        | "Index"
        | "UniqueName"
        | "@uniquename"
        | "@shopcategory"
        | "@shopsubcategory1"
        | "@tier"
        | "@enchantmentlevel"
        | "@showinmarketplace"
        | "@maxqualitylevel";

    type MarketData = {
        data: {
            timestamps: string[];
            prices_avg: number[];
            item_count: number[];
        };
        location: string;
        item_id: string;
        quality: number;
    };

    type MarketDataResponse = MarketData[];

    type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

    type ItemLocalizedType = ItemLocalizedDocument & {
        get_img_url(quality?: 1 | 2 | 3 | 4 | 5): string;
    };

    type MyServerConfig = {
        port: number;
        mode: "production" | "development";
    };

    type Items = {
        UniqueName: string;
        Index: string;
        LocalizedNames: {
            "EN-US": string;
            "DE-DE": string;
            "FR-FR": string;
            "RU-RU": string;
            "PL-PL": string;
            "ES-ES": string;
            "PT-BR": string;
            "IT-IT": string;
            "ZH-CN": string;
            "KO-KR": string;
            "JA-JP": string;
            "ZH-TW": string;
            "ID-ID": string;
        };
        quality: string;
    } | null;

    type SearchProperty = {
        id: string;
        Value: string;
        type: "visible" | "hidden";
        HtmlName?: string;
        ValuesList?: string[];
        HtmlValuesList?: string[];
    };

    type SearchVisibleProperty = {
        id: string;
        Value: string;
        type: "visible";
        HtmlName: string;
        ValuesList: string[];
        HtmlValuesList: string[];
    };

    type AdditionalSearchProperty = {
        UrlName: string;
        Value: string;
    };

    type SearchProperties = SearchProperty[];

    type AdditonalSearchProperties = {
        count: AdditionalSearchProperty;
        page: AdditionalSearchProperty;
        search: AdditionalSearchProperty;
    };
    type AddressInfo = AddressInfo;
    type Fetched_Items = { append: number; items: Items[] };
}
