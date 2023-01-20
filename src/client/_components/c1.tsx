import React from "react";
import { GlobalContextTest } from "../index_test";

export const C1: FunctionComponent = () => {
    const [G, SET_global] = React.useContext(GlobalContextTest);
    return (
        <div>
            {G.number}
            <button
                onClick={_ => {
                    SET_global((g: any) => {
                        g.number = g.number + 1;
                        return { ...g };
                    });
                }}
            >
                +
            </button>
        </div>
    );
};
