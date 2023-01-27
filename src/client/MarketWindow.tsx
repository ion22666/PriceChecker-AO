import * as React from "react";
import * as ReactDOM from "react-dom";
import { SearchItem } from "./components/SearchItem";
import { ItemsContainer } from "./components/ItemsContainer";
import { Items_Properties_Chooser_Menu } from "./components/ItemsPropertyMenu";
import { available_category, available_sub_category } from "../api/controllers/constants";
import { FirstLetterUpperCaser } from "./components/utils";
import { GlobalContext } from ".";

const local: {
    ItemsContainerRef: null | React.MutableRefObject<any>;
    reset_scroll(): void;
} = {
    ItemsContainerRef: null,
    reset_scroll() {
        this.ItemsContainerRef!.current.scrollTop = 0;
    },
};

export const Window1Context = React.createContext([local, () => void 0] as [typeof local, StateChanger<typeof local>]);

export const default_properties: SearchProperties = [
    {
        id: "category",
        Value: "all",
        type: "visible",
        HtmlName: "Category",
        ValuesList: available_category,
        HtmlValuesList: available_category.map(FirstLetterUpperCaser),
    },
    {
        id: "sub_category",
        Value: "all",
        type: "visible",
        HtmlName: "Subcategory",
        ValuesList: ["all"],
        HtmlValuesList: ["All"],
    },
    {
        id: "tier",
        Value: "all",
        type: "visible",
        HtmlName: "Tier",
        ValuesList: ["all", "1", "2", "3", "4", "5", "6", "7", "8"],
        HtmlValuesList: ["All", "1", "2", "3", "4", "5", "6", "7", "8"],
    },
    {
        id: "@enchantmentlevel",
        Value: "all",
        type: "visible",
        HtmlName: "Enchantment",
        ValuesList: ["all", "0", "1", "2", "3", "4"],
        HtmlValuesList: ["All", "0", "1", "2", "3", "4"],
    },
    {
        id: "quality",
        Value: "1",
        type: "visible",
        HtmlName: "Quality",
        ValuesList: ["1", "2", "3", "4", "5"],
        HtmlValuesList: ["Normal", "Good", "Outstanding", "Excellent", "Masterpiece"],
    },
    {
        id: "count",
        Value: "10",
        type: "hidden",
    },
    {
        id: "page",
        Value: "0",
        type: "hidden",
    },
    {
        id: "search",
        Value: "",
        type: "hidden",
    },
];

export const Market_Window: FunctionComponent = () => {
    let [G, SET_G] = React.useContext(GlobalContext);
    let [Locals, SET_Locals] = React.useState(local);
    let [properties, SETproperties] = React.useState<SearchProperties>([...default_properties]);
    let [items, SET_items] = React.useState<Items[]>([]);
    let [is_loading, SET_is_loading] = React.useState<boolean>(true);
    let fetch_items = async (): Promise<void> => {
        Locals.reset_scroll();
        SET_is_loading(true);
        properties.find(p => p.id == "count")!.Value = "10";
        properties.find(p => p.id == "page")!.Value = "0";
        let url_string = properties.map(property => `${property.id}=${property.Value}`).join("&");
        let response = await fetch("api/items?" + url_string);
        if (!response.ok) {
            SET_items([]);
            SET_is_loading(false);
            return;
        }
        let new_items: Items[] = (await response.json()).data;
        let expeted = 10;
        if (new_items.length < expeted) {
            new_items.push(null);
        }
        SET_items(new_items);
        SET_is_loading(false);
    };
    let append_items = async (): Promise<void> => {
        let i = properties.findIndex(p => p.id == "page");
        properties[i].Value = (parseInt(properties[i].Value) + 1).toString();
        let url_string = properties.map(property => `${property.id}=${property.Value}`).join("&");
        let response = await fetch("api/items?" + url_string);
        let new_items: Items[];
        if (!response.ok) {
            new_items = [null];
        } else {
            new_items = (await response.json()).data;
        }
        let expeted = parseInt(properties.find(p => p.id == "count")!.Value);
        if (new_items.length < expeted) {
            new_items.push(null);
        }
        SET_items((i: Items[]) => [...i, ...new_items]);
    };

    React.useEffect(() => {
        fetch_items();
    }, []);
    let i = 1;
    return (
        <Window1Context.Provider value={[Locals, SET_Locals]}>
            <div id="market_window" className="window">
                <div
                    id="go_to_charts"
                    onClick={() => {
                        SET_G(s => {
                            s.active_window = s.active_window == 1 ? 2 : 1;
                            return { ...s };
                        });
                    }}
                >
                    {">"}
                </div>
                <SearchItem fetch_items={fetch_items} SETproperties={SETproperties} properties={properties} />
                <Items_Properties_Chooser_Menu fetch_items={fetch_items} SETproperties={SETproperties} properties={properties} />
                <ItemsContainer is_loading={is_loading} items={items} append_items={append_items} properties={properties} />
            </div>
        </Window1Context.Provider>
    );
};
