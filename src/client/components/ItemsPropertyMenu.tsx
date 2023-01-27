import React from "react";
import { available_sub_category } from "../../api/controllers/constants";
import { default_properties } from "../MarketWindow";
import { FirstLetterUpperCaser } from "./utils";

type Property_Component = {
    property: SearchProperty;
    SETproperties: StateChanger<SearchProperties>;
    fetch_items(): Promise<void>;
    clicked_property_hook: [string, StateChanger<string>];
};

const Property_Chooser_Component: FunctionComponent<Property_Component> = (props: Property_Component) => {
    let property = props.property as SearchVisibleProperty;
    let value_index = property.ValuesList.findIndex(v => v == property.Value);

    return (
        <div className={"Property_Chooser_Component" + (props.clicked_property_hook[0] == props.property.id ? " selected" : "")} id={props.property.id}>
            {property.HtmlName}:{" " + property.HtmlValuesList[value_index]}
            <div className={"Options_Container " + (props.clicked_property_hook[0] == props.property.id ? "open" : "clossed")}>
                {property.HtmlValuesList.map((HtmlValue, index) => {
                    let value_at_index = property.ValuesList[index];
                    return (
                        <div
                            key={index}
                            className={"Option " + (value_at_index === property.Value ? "selected" : "")}
                            onClick={_ => {
                                props.SETproperties(P => {
                                    if (property.id == "category" && P.find(p => p.id == "category")?.Value != value_at_index) {
                                        let sub_category = P.find(p => p.id == "sub_category") as SearchVisibleProperty;
                                        let sub_categories = available_sub_category[value_at_index];
                                        sub_categories.unshift("all");
                                        sub_category.ValuesList = sub_categories;
                                        sub_category.Value = sub_categories[0];
                                        sub_category.HtmlValuesList = sub_categories.map(FirstLetterUpperCaser);
                                    }
                                    P.find(p => p.id == property.id)!.Value = value_at_index;
                                    return [...P];
                                });
                                props.fetch_items();
                            }}
                        >
                            {HtmlValue}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

type Arg = {
    properties: SearchProperties;
    SETproperties: StateChanger<SearchProperties>;
    fetch_items(): Promise<void>;
};

export const Items_Properties_Chooser_Menu: FunctionComponent<Arg> = (params: Arg) => {
    let [clicked_property, SET_clicked_property] = React.useState<string>("");
    React.useEffect(() => {
        document.addEventListener("click", e => {
            if ((e.target as HTMLDivElement).id == clicked_property) {
                SET_clicked_property("");
                return;
            }
            SET_clicked_property((e.target as HTMLDivElement).id);
        });
    }, []);

    return (
        <div id="Items_Properties_Chooser_Menu">
            {params.properties
                .filter(p => p.type == "visible")
                .map(p => {
                    return <Property_Chooser_Component clicked_property_hook={[clicked_property, SET_clicked_property]} key={p.id} fetch_items={params.fetch_items} property={p} SETproperties={params.SETproperties} />;
                })}
            <div
                id="reset"
                onClick={() => {
                    params.SETproperties(P => {
                        P.map(p => (p.type == "visible" ? (p.Value = p.ValuesList![0]) : p));
                        return [...P];
                    });
                    params.fetch_items();
                }}
            >
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                    <path d="M825.5,581.9c0,165.1-140.2,299.5-312.4,299.5c-172.3,0-312.5-134.3-312.5-299.5c0-165.1,99.9-299.6,272.2-299.6v163.3l326.7-217.8L472.8,10v163.3c-225.6,0-381.1,187.1-381.1,411.1C91.6,808.4,274.4,990,500,990c225.6,0,408.4-181.6,408.4-405.5L825.5,581.9z" />{" "}
                </svg>
            </div>
        </div>
    );
};
