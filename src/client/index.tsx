import * as React from "react";
import { createRoot } from "react-dom/client";
import * as ReactDOM from "react-dom";
import { Market_Window } from "./MarketWindow";
import { Charts_Window } from "./Charts_Window";

const root = createRoot(document.getElementById("root")!);

const global = {
    items: [] as Items[],
    set_window: (n: number) => {
        if (n == 2) {
            document.getElementById("root")?.setAttribute("style", "transform: translateX(-50%);");
        } else {
            document.getElementById("root")?.setAttribute("style", "transform: translateX(0%);");
        }
    },
    
};

export const GlobalContext = React.createContext([global, () => void 0] as [typeof global, StateChanger<typeof global>]);

const App: FunctionComponent = () => {
    let [G, SET_G] = React.useState(global);
    return (
        <GlobalContext.Provider value={[G, SET_G]}>
            <Market_Window />
            <Charts_Window />
        </GlobalContext.Provider>
    );
};

root.render(<App />);
