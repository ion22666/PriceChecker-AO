import React, { SyntheticEvent } from "react";

type Arg = {
    fetch_items(): Promise<void>;
    SETproperties: StateChanger<SearchProperties>;
    properties: SearchProperties;
};

export const SearchItem: FunctionComponent<Arg> = (params: Arg) => {
    const [input, SET_input] = React.useState<string>("");

    React.useEffect(() => {
        let timeout_id = setTimeout(() => {
            params.SETproperties(P => {
                P.find(p => p.id == "count")!.Value = "10";
                P.find(p => p.id == "page")!.Value = "0";
                P.find(p => p.id == "search")!.Value = input;
                return [...P];
            });
            params.fetch_items();
        }, 500);
        return () => clearTimeout(timeout_id);
    }, [input]);

    return (
        <div id="SearchItem">
            <span id="title">
                <img src="/img/306425968187146240.png" />
                Albion Online Price Inspector
                <img src="/img/306425968187146240.png" />
            </span>
            <div id="search">
                <div id="wrapper">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={e => {
                            SET_input(e.target.value);
                        }}
                        value={input}
                    />
                    <svg
                        onClick={_ => {
                            params.SETproperties(P => {
                                P.find(p => p.id == "search")!.Value = "";
                                params.fetch_items();
                                return [...P];
                            });
                        }}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1000 1000"
                    >
                        <path d="M825.5,581.9c0,165.1-140.2,299.5-312.4,299.5c-172.3,0-312.5-134.3-312.5-299.5c0-165.1,99.9-299.6,272.2-299.6v163.3l326.7-217.8L472.8,10v163.3c-225.6,0-381.1,187.1-381.1,411.1C91.6,808.4,274.4,990,500,990c225.6,0,408.4-181.6,408.4-405.5L825.5,581.9z" />{" "}
                    </svg>
                </div>
            </div>
        </div>
    );
};
