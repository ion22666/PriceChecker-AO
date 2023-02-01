import React, { useEffect } from "react";
import { GlobalContext } from ".";
import { Chart, registerables } from "chart.js";
import type * as ChartTypes from "chart.js";
import "chartjs-adapter-date-fns";
import { DateFormater, formatNumber, ImgElement } from "./components/utils";
import { time } from "console";

// Make the "line" ctx type available
Chart.register(...registerables);

// the type of a coordinate-like price data // x=time & y=price
type data_pair = { x: number; y: number; z: number };

type chart_type = "line";
type ChartData = ChartTypes.ChartData<chart_type, data_pair[], string>;
type ChartOptions = ChartTypes.ChartOptions<chart_type>;
type ChartDataset = ChartTypes.ChartDataset<chart_type, data_pair[]>;
type ChartConfiguration = ChartTypes.ChartConfiguration<chart_type, data_pair[], string>;

//
const markets_locations: { [key: string]: { color: string; icon_url: string; display?: boolean } } = {
    // ["Black Market"]: { color: "gray", icon_url: "img/Flag_Caerleon.png" },

    ["Caerleon"]: { color: "black", icon_url: "img/Flag_Caerleon.png", display: true },
    ["Lymhurst"]: { color: "green", icon_url: "img/Flag_Lymhurst.png", display: true },
    ["Fort Sterling"]: { color: "lightblue", icon_url: "img/Flag_Fort_Sterling.png", display: true },
    ["Thetford"]: { color: "purple", icon_url: "img/Flag_Thetford.png", display: true },
    ["Martlock"]: { color: "blue", icon_url: "img/Flag_Martlock.png", display: true },
    ["Bridgewatch"]: { color: "orange", icon_url: "img/Flag_Bridgewatch.png", display: true },

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

const chart_basic_config: ChartConfiguration = {
    data: { datasets: [] },
    type: "line",
    options: {
        elements: {
            point: {
                // normal
                radius: 4,
                borderWidth: 2,
                backgroundColor: "white",
                // on hover
                hoverRadius: 6,
                hoverBorderWidth: 3,
                hoverBackgroundColor: "red",
            },
        },
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
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(255,255,255,0.3)",
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
                },
            },
            tooltip: {
                itemSort: function (a, b) {
                    return a.element.y - b.element.y;
                },
                usePointStyle: true,
                callbacks: {
                    afterLabel: function (context): string {
                        return `items count: ${(context.raw as data_pair).z}`;
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
        // onResize: (a, b, c) => {
        //     console.log(a, b, c);
        // },
    },
};

const chart_dataset_basic_config: ChartDataset = {
    data: [],
    fill: false,
    tension: 0.2,
    hidden: false,
    pointStyle: "rectRot",
};

const x_square_svg = (
    <svg id="x_square_svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
);

const check_square_svg = (
    <svg id="check_square_svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
    </svg>
);

const check_square_svg_fill = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
    </svg>
);

// --------------  Charts Window  Component ---------------
export const Charts_Window: FunctionComponent = () => {
    let [G, SET_G] = React.useContext(GlobalContext);

    const canvasRef = React.useRef<HTMLCanvasElement>();
    let ctx = React.useRef<Chart>();

    let [chart_datasets, SET_chart_datasets] = React.useState<ChartDataset[]>([]);
    let [active_time, SET_active_time] = React.useState<string>("month");
    let [custom_time, SET_custom_time] = React.useState<{ start: string; end: string }>({ start: DateFormater(new Date(new Date().getTime() - 2592000000)), end: DateFormater(new Date()) });
    let [chart_time_scale, SET_chart_time_scale] = React.useState<"6" | "24">("24");

    let forceReRenderDatasetsDiv = () => {
        SET_chart_datasets(datasets => [...datasets]);
    };

    let update_chart_datasets = async (
        item: Items = G.chart_items[0]!,
        start_date: string | Date = new Date(new Date().setMonth(new Date().getMonth() - 1)),
        end_date: string | Date = new Date(),
        time_scale: "6" | "12" | "24" = chart_time_scale
    ): Promise<any> => {
        // date -> month-day-year
        let response = await fetch(
            `https://www.albion-online-data.com/api/v2/stats/charts/
            ${item!.UniqueName}
            ?qualities=${item?.quality || "1"}
            &date=${typeof start_date === "string" ? start_date : DateFormater(start_date)}
            &end_date=${typeof end_date === "string" ? end_date : DateFormater(end_date)}
            &time-scale=${time_scale}`.replace(/\s|\n/g, "")
        );
        if (!response.ok) {
            if (response.status == 400) return (await response.json()).errors;
            return response.statusText;
        }
        let json: MarketDataResponse = await response.json();

        let new_datasets: ChartDataset[] = [];

        if (json.length) {
            json.filter(market => markets_locations[market.location]).map(market => {
                let dataset: ChartDataset = {
                    ...chart_dataset_basic_config,

                    label: market.location,
                    data: market.data.prices_avg.map((avg_price, i) => {
                        let record: data_pair = { x: Date.parse(market.data.timestamps[i]), y: avg_price, z: market.data.item_count[i] };
                        return record;
                    }),
                    borderColor: markets_locations[market.location].color || "red",
                    hidden: json.length > 5 ? !markets_locations[market.location].display : false,
                };
                new_datasets.push(dataset);
                return dataset;
            });
        }

        // ctx!.current!.options!.scales!.x!.min! = typeof start_date === "string" ? new Date(start_date).getTime() : start_date.getTime();
        // ctx!.current!.options!.scales!.x!.max! = typeof end_date === "string" ? new Date(end_date).getTime() : end_date.getTime();

        ctx.current!.data.datasets = new_datasets;
        SET_chart_datasets(new_datasets);
        ctx.current!.update();
    };

    let toggle_chart_dataset = (dataset: ChartDataset): void => {
        markets_locations[dataset.label!].display = dataset.hidden;
        dataset.hidden = !dataset.hidden;
        ctx.current!.update();
        forceReRenderDatasetsDiv();
    };

    let set_chart_time_scale = React.useCallback((scale: "6" | "24") => {
        SET_chart_time_scale(scale);
        update_chart_datasets(undefined, undefined, undefined, scale);
    }, []);

    // Declare the ctx hook only once
    React.useEffect(() => {
        ctx.current = new Chart(canvasRef.current!, chart_basic_config);
        ctx.current!.config.options!.plugins!.legend!.onClick = function (event, legendItem, legend) {
            ctx.current!.data.datasets[legendItem.datasetIndex!].hidden = !legendItem.hidden;
            ctx.current!.update();
            forceReRenderDatasetsDiv();
        };
    }, []);

    // Hook the chart with the chart_items from thr global context
    React.useEffect(() => {
        if (G.chart_items.length === 0) return;

        let on_screen_item = G.chart_items[0]!;
        update_chart_datasets(on_screen_item);
    }, [G.chart_items]);

    React.useEffect(() => {
        console.log(custom_time);
    }, [custom_time]);
    return (
        <div id="Charts_Window" className="window">
            <div id="wrapper1">
                <div id="chart_items_container">
                    {G.chart_items.length === 0 ? (
                        <>
                            <div id="main_item_name">No item selected</div>
                            <ImgElement id="main_item_img" />
                            <div id="history_items"></div>
                        </>
                    ) : (
                        <>
                            <div id="main_item_name">{G.chart_items[0]?.LocalizedNames["EN-US"] || G.chart_items[0]!.UniqueName}</div>
                            <ImgElement id="main_item_img" unique_name={G.chart_items[0]!.UniqueName} quality={G.chart_items[0]!.quality} />
                            <div id="history_items_container">
                                {G.chart_items.slice(1, 6).map(item => {
                                    return (
                                        <ImgElement
                                            key={item!.UniqueName}
                                            className="history_items_img"
                                            unique_name={item!.UniqueName}
                                            quality={item!.quality}
                                            onClick={_ => {
                                                update_chart_datasets(item);
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
                <div id="handle_chart_datasets">
                    {Object.entries(markets_locations).map(([market_name, market_props]) => {
                        let dataset = chart_datasets.find(dataset => dataset.label == market_name);
                        return (
                            <div className={`market_row ${dataset ? "active" + (dataset.hidden ? " hidden" : "") : "disabled"}`} key={market_name} onClick={dataset ? () => toggle_chart_dataset(dataset!) : void 0}>
                                {/* svg icon */}
                                {dataset ? (dataset.hidden ? check_square_svg : check_square_svg_fill) : x_square_svg}
                                <div style={{ display: "flex", justifyContent: "space-between", flex: "1", height: "100%" }}>
                                    <img src={market_props.icon_url} alt="" />
                                    {market_name}
                                    <img src={market_props.icon_url} alt="" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div id="wrapper2">
                <div id="canvas_container" className={chart_datasets.length === 0 ? "empty" : ""}>
                    <canvas ref={el => (canvasRef.current = el!)} id="myChart"></canvas>
                </div>
                <div id="time_handler_container">
                    <div id="time_scale_choser_container">
                        <span>Time Scale:</span>
                        <div className={"time_choser " + (chart_time_scale == "6" ? "active" : "")} onClick={() => set_chart_time_scale("6")}>
                            6
                        </div>
                        <div className={"time_choser " + (chart_time_scale == "24" ? "active" : "")} onClick={() => set_chart_time_scale("24")}>
                            24
                        </div>
                    </div>
                    <div id="time_choser_container">
                        <span id="last_context">{"Last: "}</span>

                        {/* Time Choosers */}
                        {[
                            { id: "day", time: 86400000, display_value: "24 hours" },
                            { id: "week", time: 604800000, display_value: "7 days" },
                            { id: "month", time: 2592000000, display_value: "1 month" },
                            { id: "year", time: 31536000000, display_value: "1 year" },
                        ].map(({ id, time, display_value }) => {
                            return (
                                <div
                                    key={id}
                                    id="id"
                                    className={"time_choser " + (active_time == id ? "active" : "")}
                                    onClick={_ => {
                                        SET_active_time(id);
                                        SET_custom_time({ start: DateFormater(new Date(new Date().getTime() - time)), end: DateFormater(new Date()) });
                                        update_chart_datasets(undefined, new Date(new Date().getTime() - time));
                                    }}
                                >
                                    {display_value}
                                </div>
                            );
                        })}
                    </div>

                    <div id="custom_time_setter_container">
                        <span id="start_date">
                            {" Start: "}
                            <input
                                type="text"
                                placeholder="mm-dd-yyyy"
                                value={custom_time.start}
                                onChange={e => {
                                    SET_custom_time(v => {
                                        v.start = e.target.value;
                                        return { ...v };
                                    });
                                }}
                            />
                        </span>
                        <span id="end_date">
                            {"End: "}
                            <input
                                type="text"
                                placeholder={DateFormater(new Date())}
                                value={custom_time.end}
                                onChange={e => {
                                    SET_custom_time(v => {
                                        v.end = e.target.value;
                                        return { ...v };
                                    });
                                }}
                            />
                        </span>

                        <button
                            id="submit_button"
                            onClick={async () => {
                                if (custom_time.start === "" || custom_time.end === "") {
                                    alert("Start and End dates must not be empty");
                                    return;
                                }
                                let errors = (await update_chart_datasets(undefined, custom_time.start, custom_time.end)) as Array<any>;
                                if (errors.length > 0) {
                                    alert(JSON.stringify(errors));
                                }
                                SET_active_time("custom");
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
