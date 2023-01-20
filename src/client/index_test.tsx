import React from "react";
import { createRoot } from "react-dom/client";
import { C1 } from "./_components/c1";

const root = createRoot(document.getElementById("root")!);

const global = {
    theme: "dark",
};

export const GlobalContextTest = React.createContext([null, () => null] as [any, StateChanger<any>]);

const App: FunctionComponent = () => {
    const [global, SET_global] = React.useState({ number: 0 });
    return (
        <GlobalContextTest.Provider value={[global, SET_global]}>
            <C1 />
        </GlobalContextTest.Provider>
    );
};

root.render(<App />);
