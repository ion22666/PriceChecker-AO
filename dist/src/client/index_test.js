import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
const App = () => {
    const [input, SET_input] = React.useState("");
    useEffect(() => {
        let timeout_id = setTimeout(() => {
            console.log("Requesting for input=", input);
        }, 1000);
        return () => clearTimeout(timeout_id);
    }, [input]);
    return (_jsx("input", { type: "text", onChange: e => { SET_input(e.target.value); } }));
};
root.render(_jsx(App, {}));
