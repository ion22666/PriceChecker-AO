import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { available_sub_category } from "../../api/controllers/constants";
import { FirstLetterUpperCaser } from "./utils";
export const Property_Chooser_Component = (props) => {
    let property = props.property;
    let value_index = property.ValuesList.findIndex(v => v == property.Value);
    return (_jsxs("div", { className: "Property_Chooser_Component" + (props.clicked_property_hook[0] == props.property.id ? " selected" : ""), id: props.property.id, children: [property.HtmlName, ":", " " + property.HtmlValuesList[value_index], _jsx("div", { className: "Options_Container " + (props.clicked_property_hook[0] == props.property.id ? "open" : "clossed"), children: property.HtmlValuesList.map((HtmlValue, index) => {
                    let value_at_index = property.ValuesList[index];
                    return (_jsx("div", { className: "Option " + (value_at_index === property.Value ? "selected" : ""), onClick: _ => {
                            props.SETproperties(P => {
                                if (property.id == "category" && P.find(p => p.id == "category")?.Value != value_at_index) {
                                    let sub_category = P.find(p => p.id == "sub_category");
                                    let sub_categories = available_sub_category[value_at_index];
                                    sub_categories.unshift("all");
                                    sub_category.ValuesList = sub_categories;
                                    sub_category.Value = sub_categories[0];
                                    sub_category.HtmlValuesList = sub_categories.map(FirstLetterUpperCaser);
                                }
                                P.find(p => p.id == property.id).Value = value_at_index;
                                return [...P];
                            });
                            props.fetch_items();
                        }, children: HtmlValue }, index));
                }) })] }));
};
export const Items_Properties_Chooser_Menu = (params) => {
    let [clicked_property, SET_clicked_property] = React.useState("");
    React.useEffect(() => {
        document.addEventListener("click", e => {
            if (e.target.id == clicked_property) {
                SET_clicked_property("");
                return;
            }
            SET_clicked_property(e.target.id);
        });
    }, []);
    return (_jsxs("div", { id: "Items_Properties_Chooser_Menu", children: [params.properties
                .filter(p => p.type == "visible")
                .map(p => {
                return _jsx(Property_Chooser_Component, { clicked_property_hook: [clicked_property, SET_clicked_property], fetch_items: params.fetch_items, property: p, SETproperties: params.SETproperties }, p.id);
            }), _jsx("div", { id: "reset", onClick: () => {
                    params.SETproperties(P => {
                        P.map(p => (p.type == "visible" ? (p.Value = p.ValuesList[0]) : p));
                        return [...P];
                    });
                    params.fetch_items();
                }, children: _jsxs("svg", { fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1000 1000", children: [_jsx("path", { d: "M825.5,581.9c0,165.1-140.2,299.5-312.4,299.5c-172.3,0-312.5-134.3-312.5-299.5c0-165.1,99.9-299.6,272.2-299.6v163.3l326.7-217.8L472.8,10v163.3c-225.6,0-381.1,187.1-381.1,411.1C91.6,808.4,274.4,990,500,990c225.6,0,408.4-181.6,408.4-405.5L825.5,581.9z" }), " "] }) })] }));
};
