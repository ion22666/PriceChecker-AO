import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Market_Window } from "./MarketWindow";
import { Charts_Window } from "./Charts_Window";
const root = createRoot(document.getElementById("root"));
const global = {
    chart_items: [],
    active_window: 1,
};
export const GlobalContext = React.createContext([global, () => void 0]);
const App = () => {
    let [G, SET_G] = React.useState(global);
    let rootRef = React.useRef();
    React.useEffect(() => {
        if (G.chart_items.length > 5) {
            G.chart_items = G.chart_items.slice(0, 6);
        }
    }, [G.chart_items]);
    return (_jsx(GlobalContext.Provider, { value: [G, SET_G], children: _jsxs("div", { ref: rootRef, id: "the_real_root", className: G.active_window == 1 ? "window1" : "window2", children: [_jsx(Market_Window, {}), _jsx(Charts_Window, {})] }) }));
};
root.render(_jsx(App, {}));
