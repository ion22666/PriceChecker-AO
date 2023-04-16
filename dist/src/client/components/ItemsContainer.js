import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { GlobalContext } from "..";
import { Window1Context } from "../MarketWindow";
export const ItemsContainer = (args) => {
    let [no_more_items, SET_no_more_items] = React.useState(false);
    let [G, SET_G] = React.useContext(GlobalContext);
    let [Locals, SET_Locals] = React.useContext(Window1Context);
    // let [waiting_for_items, SET_waiting_for_items] = React.useState<boolean>(false);
    let waiting_for_items = React.useRef(false);
    let ItemsContainerRef = React.useRef();
    React.useEffect(() => {
        SET_Locals(L => {
            L.ItemsContainerRef = ItemsContainerRef;
            return { ...L };
        });
    }, []);
    React.useEffect(() => {
        if (args.items[args.items.length - 1] == null) {
            SET_no_more_items(true);
        }
        else {
            SET_no_more_items(false);
        }
    }, [args.items]);
    return (_jsxs("div", { id: "ItemsContainer", ref: ItemsContainerRef, onScroll: async (e) => {
            if (no_more_items || waiting_for_items.current)
                return;
            if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
                waiting_for_items.current = true;
                await args.append_items();
                waiting_for_items.current = false;
            }
        }, children: [_jsx("div", { id: "Loading_Screen", style: { display: args.is_loading ? "flex" : "none" }, children: _jsx("span", { className: "loader" }) }), args.items.length ? (
            ///////////////////////////////////////////////////// then
            [
                ...args.items.map((item, index) => {
                    let quality = args.properties.find(p => p.id == "quality").Value;
                    if (item == null) {
                        return (_jsx("div", { className: "item_row bottom_row", id: "no_more_items", children: "No More Items Found" }, index));
                    }
                    else {
                        return (_jsxs("div", { className: "item_row", children: [_jsxs("div", { style: { height: "100%", display: "flex", alignItems: "center", gap: "2vmin", overflow: "hidden" }, children: [_jsxs("div", { className: "image_container", children: [_jsx("span", { className: "loader" }), _jsx("img", { src: `https://render.albiononline.com/v1/item/${item.UniqueName}.png?quality=${quality}`, onError: e => {
                                                        e.currentTarget.src = `https://albiononline2d.ams3.cdn.digitaloceanspaces.com/thumbnails/orig/${quality}`;
                                                        e.currentTarget.onerror = null;
                                                    } })] }), _jsxs("div", { style: { height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "center", flexShrink: "1", overflow: "hidden" }, children: [_jsx("div", { id: "LocalizedNames", children: item.LocalizedNames ? item.LocalizedNames["EN-US"] : item.UniqueName }), _jsxs("div", { style: { display: "flex", gap: "1vmin" }, children: [_jsx("span", { id: "UniqueNameContext", children: "Unique Name:" }), _jsx("span", { id: "UniqueName", children: item.UniqueName })] })] })] }), _jsx("button", { onClick: () => {
                                        SET_G(s => {
                                            s.active_window = 2;
                                            s.chart_items = [{ ...item, quality: quality }, ...s.chart_items];
                                            return { ...s };
                                        });
                                    }, children: "Check" })] }, item.Index));
                    }
                }),
                no_more_items ? null : (_jsx("div", { className: "item_row bottom_row", id: "loader_row", children: _jsx("span", { className: "loader" }) }, "0")),
            ]) : (
            ////////////////////////////////////////////////////// else
            _jsx("div", { className: "item_row bottom_row", id: "no_items", children: "No Items Found" }))] }));
};
