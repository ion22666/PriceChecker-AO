import * as React from "react";
import { createRoot } from "react-dom/client";
import * as ReactDOM from "react-dom";
import { Market_Window } from "./MarketWindow";
import { Charts_Window } from "./Charts_Window";

const root = createRoot(document.getElementById("root")!);

const global = {
    chart_items: [] as Array<Items>,
    active_window: 1,
};

export const GlobalContext = React.createContext([global, () => void 0] as [typeof global, StateChanger<typeof global>]);

const App: FunctionComponent = () => {
    let [G, SET_G] = React.useState(global);
    let rootRef = React.useRef();

    React.useEffect(() => {
        if (G.chart_items.length > 5) {
            G.chart_items = G.chart_items.slice(0, 6);
        }
    }, [G.chart_items]);

    return (
        <GlobalContext.Provider value={[G, SET_G]}>
            <div ref={rootRef as any} id={"the_real_root"} className={G.active_window == 1 ? "window1" : "window2"}>
                <Market_Window />
                <Charts_Window />
            </div>
        </GlobalContext.Provider>
    );
};

root.render(<App />);
