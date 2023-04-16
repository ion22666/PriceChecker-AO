import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { GlobalContext } from ".";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { DateFormater, formatNumber, ImgElement } from "./components/utils";
// Make the "line" ctx type available
Chart.register(...registerables);
//
const markets_locations = {
    // ["Black Market"]: { color: "gray", icon_url: "img/Flag_Caerleon.png" },
    ["Caerleon"]: { color: "#ff0000", icon_url: "img/Flag_Caerleon.png", display: true },
    ["Lymhurst"]: { color: "#00FF00", icon_url: "img/Flag_Lymhurst.png", display: true },
    ["Fort Sterling"]: { color: "#ADD8E6", icon_url: "img/Flag_Fort_Sterling.png", display: true },
    ["Thetford"]: { color: "#800080", icon_url: "img/Flag_Thetford.png", display: true },
    ["Martlock"]: { color: "#0000FF", icon_url: "img/Flag_Martlock.png", display: true },
    ["Bridgewatch"]: { color: "#FFA500", icon_url: "img/Flag_Bridgewatch.png", display: true },
    ["Arthurs Rest"]: { color: "darkblue", icon_url: "img/Arthurs Rest.png" },
    ["Merlyns Rest"]: { color: "black", icon_url: "img/Merlyns Rest.png" },
    ["Morganas Rest"]: { color: "black", icon_url: "img/Morganas Rest.png" },
    // ["Brecilien Market"]: { color: "pink", icon_url: "img/Brecilien Market.png" }, //5003,1001,4000,4001,3007,2000,5003,6,0
    ["Lymhurst Portal"]: { color: "green", icon_url: "img/Portal_Lymhurst.png" },
    ["Fort Sterling Portal"]: { color: "black", icon_url: "img/Portal_Fort_Sterling.png" },
    ["Thetford Portal"]: { color: "black", icon_url: "img/Portal_Thetford.png" },
    ["Martlock Portal"]: { color: "black", icon_url: "img/Portal_Martlock.png" },
    ["Bridgewatch Portal"]: { color: "black", icon_url: "img/Portal_Bridgewatch.png" },
};
const chart_config = {
    data: { datasets: [] },
    type: "line",
    options: {
        // onHover: function (e, active_elements, chart) {
        //     active_elements.forEach(ActiveElement => (ActiveElement.element.options.pointStyle = false));
        // },
        // Turn off animations and data parsing for performance
        animation: false,
        parsing: false,
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            x: {
                ticks: {
                    source: "auto",
                    // Disabled rotation for performance
                    maxRotation: 0,
                    autoSkip: true,
                },
                title: {
                    display: false,
                    text: "aaaaaa",
                },
                type: "time",
                // min: Date.parse("2021-11-01 00:00:00"),
                // max: Date.parse("2021-11-09 00:00:00"),
                time: {
                    displayFormats: {
                        day: "MMM d",
                        hour: "HH a",
                    },
                    // unit: "hour",
                },
                grid: {
                    color: "rgba(255,255,255,0.2)",
                },
            },
            "price-axis": {
                title: {
                    display: true,
                    text: "average price",
                },
                beginAtZero: false,
                position: "left",
                type: "linear",
                grid: {
                    color: "rgba(255,255,255,0.5)",
                },
                ticks: {
                    callback: (value, index, values) => formatNumber(typeof value === "string" ? parseInt(value) : value),
                },
            },
            "count-axis": {
                title: {
                    display: true,
                    text: "items count",
                },
                display: false,
                beginAtZero: false,
                position: "right",
                type: "linear",
                grid: {
                    color: "rgba(255,255,255,0.1)",
                },
                ticks: {
                    callback: (value, index, values) => formatNumber(typeof value === "string" ? parseInt(value) : value),
                },
            },
        },
        plugins: {
            decimation: {
                enabled: false,
                algorithm: "min-max",
            },
            legend: {
                display: true,
                labels: {
                    usePointStyle: true,
                    pointStyle: "line",
                    filter(item, data) {
                        return eval(`data.datasets[item.datasetIndex].yAxisID === "price-axis"`);
                    },
                },
            },
            tooltip: {
                itemSort: function (a, b) {
                    if (a.dataset.yAxisID === b.dataset.yAxisID) {
                        return a.element.y - b.element.y;
                    }
                    else {
                        return a.dataset.yAxisID === "price-axis" ? -1 : 1;
                    }
                },
                usePointStyle: true,
                callbacks: {
                    // afterBody: (tooltipItems) => {
                    //     let price_elements = tooltipItems.filter(e => (e.dataset.yAxisID = "price-axis"));
                    //     let count_elements = tooltipItems.filter(e => (e.dataset.yAxisID = "price-count"));
                    //     return `${tooltipItems[0].label}\nAvg Price:\n${price_elements.map(e=>`${e.dataset.label}`)}`;
                    // },
                    beforeBody: function (tooltipItems) {
                        for (let i = 0; i < tooltipItems.length; i++) {
                            if (tooltipItems[i].dataset.yAxisID === "price-axis") {
                                if (i === 0)
                                    tooltipItems[i].element.options.my_field = "first price";
                            }
                            else {
                                if (i === 0 || tooltipItems[i - 1].dataset.yAxisID === "price-axis")
                                    tooltipItems[i].element.options.my_field = "first count";
                            }
                        }
                    },
                    beforeLabel: function (tooltipItem) {
                        if (tooltipItem.element.options.my_field === "first price") {
                            return "<<<Average Price>>>";
                        }
                        if (tooltipItem.element.options.my_field === "first count") {
                            return "<<<Items Count>>>";
                        }
                    },
                    // labelPointStyle: () => {
                    //     return { pointStyle: "rectRot", rotation: 0, hoverBorderWidth: 2, hitRadius: 2, backgroundColor: "white" };
                    // },
                },
            },
        },
        //  Responsive Config
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 16 / 9,
    },
};
const price_dataset_options = {
    type: "line",
    yAxisID: "price-axis",
    data: [],
    fill: false,
    tension: 0.2,
    hidden: false,
    pointStyle: "rectRot",
    // normal
    pointRadius: 3,
    borderWidth: 2.5,
    backgroundColor: "white",
    // on hover
    pointHoverRadius: 5,
    hoverBorderWidth: 2.5,
    hoverBackgroundColor: "red",
};
const count_dataset_options = {
    type: "line",
    yAxisID: "count-axis",
    data: [],
    fill: false,
    tension: 0.2,
    hidden: false,
    pointStyle: "rectRot",
    // normal
    pointRadius: 0,
    borderWidth: 2,
    backgroundColor: "white",
    // on hover
    pointHoverRadius: 4,
    hoverBorderWidth: 2,
    hoverBackgroundColor: "red",
};
const x_square_svg = (_jsxs("svg", { id: "x_square_svg", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 16 16", children: [_jsx("path", { d: "M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" }), _jsx("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" })] }));
const check_square_svg = (_jsxs("svg", { id: "check_square_svg", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 16 16", children: [_jsx("path", { d: "M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" }), _jsx("path", { d: "M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" })] }));
const check_square_svg_fill = (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "0 0 16 16", children: _jsx("path", { d: "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" }) }));
// --------------  Charts Window  Component ---------------
export const Charts_Window = () => {
    let [G, SET_G] = React.useContext(GlobalContext);
    const canvasRef = React.useRef();
    let ctx = React.useRef();
    let [chart_datasets, SET_chart_datasets] = React.useState([]);
    let [active_time, SET_active_time] = React.useState("month");
    let [custom_time, SET_custom_time] = React.useState({ start: DateFormater(new Date(new Date().getTime() - 2592000000)), end: DateFormater(new Date()) });
    let [chart_time_scale, SET_chart_time_scale] = React.useState("24");
    let [count_datasets_display, SET_count_datasets_display] = React.useState(false);
    let [price_datasets_display, SET_price_datasets_display] = React.useState(true);
    let [variants, SET_variants] = React.useState({ tier: [], enchant: [], quality: [] });
    let [clicked_property, SET_clicked_property] = React.useState("");
    let forceReRenderDatasetsDiv = () => {
        SET_chart_datasets(v => [...v]);
    };
    let update_chart_datasets = React.useCallback(async (item = G.chart_items[0], start_date = new Date(new Date().setMonth(new Date().getMonth() - 1)), end_date = new Date(), time_scale = chart_time_scale) => {
        // date -> month-day-year
        let response = await fetch(`https://www.albion-online-data.com/api/v2/stats/charts/
            ${item.UniqueName}
            ?qualities=${item?.quality || "1"}
            &date=${typeof start_date === "string" ? start_date : DateFormater(start_date)}
            &end_date=${typeof end_date === "string" ? end_date : DateFormater(end_date)}
            &time-scale=${time_scale}`.replace(/\s|\n/g, ""));
        if (!response.ok) {
            if (response.status == 400)
                return (await response.json()).errors;
            return response.statusText;
        }
        let json = await response.json();
        console.log(chart_datasets);
        let old_datasets_states = chart_datasets.map(v => Object.create({ location: v.market, display: v.display }));
        ctx.current.data.datasets = [];
        let new_datasets = [];
        if (json.length) {
            json.filter(market => markets_locations[market.location]).forEach(market => {
                console.log(old_datasets_states);
                let display_dataset_pair = old_datasets_states.length === 0 ? markets_locations[market.location].display === true : old_datasets_states.find(v => v.location === market.location)?.display === true;
                let dataset_pair = {
                    market: market.location,
                    display: display_dataset_pair,
                    price: {
                        ...price_dataset_options,
                        label: market.location,
                        data: market.data.prices_avg.map((avg_price, i) => {
                            return { x: Date.parse(market.data.timestamps[i]), y: avg_price };
                        }),
                        borderColor: markets_locations[market.location].color || "red",
                        hidden: !(display_dataset_pair && price_datasets_display),
                    },
                    count: {
                        ...count_dataset_options,
                        label: market.location,
                        data: market.data.item_count.map((count, i) => {
                            return { x: Date.parse(market.data.timestamps[i]), y: count };
                        }),
                        borderColor: markets_locations[market.location].color + "40",
                        backgroundColor: markets_locations[market.location].color + "40",
                        hidden: !(display_dataset_pair && count_datasets_display),
                    },
                };
                new_datasets.push(dataset_pair);
                ctx.current.data.datasets.push(dataset_pair.price);
                ctx.current.data.datasets.push(dataset_pair.count);
            });
        }
        // ctx!.current!.options!.scales!.x!.min! = typeof start_date === "string" ? new Date(start_date).getTime() : start_date.getTime();
        // ctx!.current!.options!.scales!.x!.max! = typeof end_date === "string" ? new Date(end_date).getTime() : end_date.getTime();
        console.log("END");
        SET_chart_datasets(new_datasets);
        ctx.current.update();
    }, [chart_datasets]);
    let toggle_chart_dataset_pair = (dataset_pair) => {
        if (!price_datasets_display && !count_datasets_display) {
            SET_price_datasets_display(true);
            price_datasets_display = true;
            chart_datasets.forEach(v => {
                if (v.display) {
                    v.price.hidden = !price_datasets_display;
                    v.count.hidden = !count_datasets_display;
                }
            });
        }
        else {
            let was_displayed = dataset_pair.display;
            dataset_pair.display = !was_displayed;
            dataset_pair.price.hidden = !(!was_displayed && price_datasets_display);
            dataset_pair.count.hidden = !(!was_displayed && count_datasets_display);
        }
        ctx.current.update();
        forceReRenderDatasetsDiv();
    };
    let toggle_datasets_by_axis = (axis_id) => {
        let was_displayed = chart_config.options.scales[axis_id].display === true;
        // hide/display the axis labels
        chart_config.options.scales[axis_id].display = !was_displayed;
        if (axis_id === "price-axis") {
            SET_price_datasets_display(!was_displayed);
            price_datasets_display = !was_displayed;
            chart_datasets.forEach(dataset_pair => (dataset_pair.price.hidden = !(!was_displayed && dataset_pair.display)));
        }
        else {
            SET_count_datasets_display(!was_displayed);
            count_datasets_display = !was_displayed;
            console.log(count_datasets_display);
            chart_datasets.forEach(dataset_pair => (dataset_pair.count.hidden = !(!was_displayed && dataset_pair.display)));
        }
        if (!price_datasets_display && !count_datasets_display) {
            console.log("ambele off");
            chart_datasets.forEach(v => (v.price.hidden = v.count.hidden = true));
        }
        ctx.current.update();
        forceReRenderDatasetsDiv();
    };
    let set_chart_time_scale = React.useCallback((scale) => {
        SET_chart_time_scale(scale);
        update_chart_datasets(undefined, undefined, undefined, scale);
    }, [chart_datasets]);
    // Declare the ctx hook only once
    React.useEffect(() => {
        ctx.current = new Chart(canvasRef.current, chart_config);
        ctx.current.config.options.plugins.legend.onClick = function (event, legendItem, legend) {
            ctx.current.data.datasets[legendItem.datasetIndex].hidden = !legendItem.hidden;
            ctx.current.update();
            forceReRenderDatasetsDiv();
        };
    }, []);
    // Hook the chart with the chart_items from thr global context
    React.useEffect(() => {
        if (G.chart_items.length === 0)
            return;
        let on_screen_item = G.chart_items[0];
        update_chart_datasets(on_screen_item);
        (async () => {
            SET_variants(await fetch(`/api/item/${G.chart_items[0]?.UniqueName}/variants`).then(v => v.json()));
        })();
    }, [G.chart_items]);
    return (_jsxs("div", { id: "Charts_Window", className: "window", children: [_jsxs("div", { id: "wrapper1", children: [_jsxs("div", { id: "togle_datasets_types_container", children: [_jsxs("span", { className: price_datasets_display ? "active" : "", onClick: () => toggle_datasets_by_axis("price-axis"), children: [price_datasets_display ? check_square_svg_fill : check_square_svg, "Price"] }), _jsxs("span", { className: count_datasets_display ? "active" : "", onClick: () => toggle_datasets_by_axis("count-axis"), children: [count_datasets_display ? check_square_svg_fill : check_square_svg, "Count"] })] }), _jsx("div", { id: "chart_items_container", children: G.chart_items.length === 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { id: "main_item_name", children: "No item selected" }), _jsx(ImgElement, { id: "main_item_img" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { id: "main_item_name", children: G.chart_items[0]?.LocalizedNames["EN-US"] || G.chart_items[0].UniqueName }), _jsx(ImgElement, { id: "main_item_img", unique_name: G.chart_items[0].UniqueName, quality: G.chart_items[0].quality })] })) }), _jsx("div", { id: "handle_chart_datasets", children: Object.entries(markets_locations).map(([market_name, market_props]) => {
                            let dataset_pair = chart_datasets.find(({ price, count }) => price.label == market_name);
                            let inactive = dataset_pair ? dataset_pair.price.hidden === true && dataset_pair.count.hidden === true : true;
                            return (_jsxs("div", { className: `market_row ${dataset_pair ? "active" + (inactive ? " hidden" : "") : "disabled"}`, onClick: dataset_pair ? () => toggle_chart_dataset_pair(dataset_pair) : void 0, children: [dataset_pair ? (inactive ? check_square_svg : check_square_svg_fill) : x_square_svg, _jsxs("div", { style: { display: "flex", justifyContent: "space-between", flex: "1", height: "100%" }, children: [_jsx("img", { src: market_props.icon_url, alt: "" }), market_name, _jsx("img", { src: market_props.icon_url, alt: "" })] })] }, market_name));
                        }) })] }), _jsxs("div", { id: "wrapper2", children: [_jsx("div", { id: "canvas_container", className: chart_datasets.length === 0 ? "empty" : "", children: _jsx("canvas", { ref: el => (canvasRef.current = el), id: "myChart" }) }), _jsxs("div", { id: "time_handler_container", children: [_jsxs("div", { id: "time_scale_choser_container", children: [_jsx("span", { children: "Time Scale:" }), _jsx("div", { className: "time_choser " + (chart_time_scale == "6" ? "active" : ""), onClick: () => set_chart_time_scale("6"), children: "6" }), _jsx("div", { className: "time_choser " + (chart_time_scale == "24" ? "active" : ""), onClick: () => set_chart_time_scale("24"), children: "24" })] }), _jsxs("div", { id: "time_choser_container", children: [_jsx("span", { id: "last_context", children: "Last: " }), [
                                        { id: "day", time: 86400000, display_value: "24 hours" },
                                        { id: "week", time: 604800000, display_value: "7 days" },
                                        { id: "month", time: 2592000000, display_value: "1 month" },
                                        { id: "year", time: 31536000000, display_value: "1 year" },
                                    ].map(({ id, time, display_value }) => {
                                        return (_jsx("div", { id: "id", className: "time_choser " + (active_time == id ? "active" : ""), onClick: _ => {
                                                SET_active_time(id);
                                                SET_custom_time({ start: DateFormater(new Date(new Date().getTime() - time)), end: DateFormater(new Date()) });
                                                update_chart_datasets(undefined, new Date(new Date().getTime() - time));
                                            }, children: display_value }, id));
                                    })] }), _jsxs("div", { id: "custom_time_setter_container", children: [_jsxs("span", { id: "start_date", children: [" Start: ", _jsx("input", { type: "text", placeholder: "mm-dd-yyyy", value: custom_time.start, onChange: e => {
                                                    SET_custom_time(v => {
                                                        v.start = e.target.value;
                                                        return { ...v };
                                                    });
                                                } })] }), _jsxs("span", { id: "end_date", children: ["End: ", _jsx("input", { type: "text", placeholder: DateFormater(new Date()), value: custom_time.end, onChange: e => {
                                                    SET_custom_time(v => {
                                                        v.end = e.target.value;
                                                        return { ...v };
                                                    });
                                                } })] }), _jsx("button", { id: "submit_button", onClick: async () => {
                                            if (custom_time.start === "" || custom_time.end === "") {
                                                alert("Start and End dates must not be empty");
                                                return;
                                            }
                                            let errors = (await update_chart_datasets(undefined, custom_time.start, custom_time.end));
                                            if (errors.length > 0) {
                                                alert(JSON.stringify(errors));
                                            }
                                            SET_active_time("custom");
                                        }, children: "Search" })] })] })] })] }));
};
