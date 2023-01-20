import React from "react";
import { GlobalContext } from "..";
import { Window1Context } from "../MarketWindow";
type Arg = {
    items: Items[];
    append_items(): Promise<void>;
    properties: SearchProperties;
    is_loading: boolean;
};

export const ItemsContainer: FunctionComponent<Arg> = (args: Arg) => {
    let [no_more_items, SET_no_more_items] = React.useState<boolean>(false);
    let [G, SET_G] = React.useContext(GlobalContext);
    let [Locals, SET_Locals] = React.useContext(Window1Context);
    // let [waiting_for_items, SET_waiting_for_items] = React.useState<boolean>(false);
    let waiting_for_items = React.useRef(false);
    let ItemsContainerRef = React.useRef<any>();
    React.useEffect(() => {
        SET_Locals(L => {
            L.ItemsContainerRef = ItemsContainerRef;
            return { ...L };
        });
    }, []);
    React.useEffect(() => {
        console.log(args.items[args.items.length - 1] == null);
        if (args.items[args.items.length - 1] == null) {
            SET_no_more_items(true);
        } else {
            SET_no_more_items(false);
        }
    }, [args.items]);
    return (
        <div
            id="ItemsContainer"
            ref={ItemsContainerRef as any}
            onScroll={async e => {
                if (no_more_items || waiting_for_items.current) return;
                if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
                    waiting_for_items.current = true;
                    await args.append_items();
                    waiting_for_items.current = false;
                }
            }}
        >
            <div id="Loading_Screen" style={{ display: args.is_loading ? "flex" : "none" }}>
                <span className="loader"></span>
            </div>
            {/* if args.data.length */}
            {args.items.length ? (
                ///////////////////////////////////////////////////// then
                [
                    ...args.items.map((item, index) => {
                        let qulity = args.properties.find(p => p.id == "quality")?.Value;
                        qulity = qulity == "*" || !qulity ? "" : qulity;
                        if (item == null) {
                            return (
                                <div key={index} className="item_row bottom_row" id="no_more_items">
                                    No More Items Found
                                </div>
                            );
                        } else {
                            return (
                                <div className="item_row" key={item.Index}>
                                    <div style={{ height: "100%", display: "flex", alignItems: "center", gap: "2vmin", overflow: "hidden" }}>
                                        <div className="image_container">
                                            <span className="loader"></span>
                                            <img
                                                src={`https://render.albiononline.com/v1/item/${item.UniqueName}.png?quality=${qulity}`}
                                                onError={e => {
                                                    e.currentTarget.src = `https://albiononline2d.ams3.cdn.digitaloceanspaces.com/thumbnails/orig/${qulity}`;
                                                    e.currentTarget.onerror = null;
                                                }}
                                            />
                                        </div>
                                        <div style={{ height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "center", flexShrink: "1", overflow: "hidden" }}>
                                            <div id="LocalizedNames">{item.LocalizedNames ? item.LocalizedNames["EN-US"] : item.UniqueName}</div>
                                            <div style={{ display: "flex", gap: "1vmin" }}>
                                                <span id="UniqueNameContext">{"Unique Name:"}</span>
                                                <span id="UniqueName">{item.UniqueName}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={_ => {
                                            SET_G(g => {
                                                g.items.unshift(item);
                                                return { ...g };
                                            });
                                            setTimeout(G.set_window, 0, 2);
                                        }}
                                    >
                                        Check
                                    </button>
                                </div>
                            );
                        }
                    }),
                    no_more_items ? (
                        (null as any)
                    ) : (
                        <div key={"0"} className="item_row bottom_row" id="loader_row">
                            <span className="loader"></span>
                        </div>
                    ),
                ]
            ) : (
                ////////////////////////////////////////////////////// else
                <div className="item_row bottom_row" id="no_items">
                    No Items Found
                </div>
            )}
        </div>
    );
};
