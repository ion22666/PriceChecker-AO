import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);

const App: FunctionComponent = () => {
    const [input, SET_input] = React.useState<string>("");

    useEffect(() => {
        let timeout_id = setTimeout(() => {
            console.log("Requesting for input=", input);
        }, 1000);
        return () => clearTimeout(timeout_id);
    }, [input]);

    return (
        <input type="text" onChange={e => { SET_input(e.target.value); }} />
    );
};

root.render(<App />);
