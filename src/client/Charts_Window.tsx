import React, { useEffect } from "react";
import { GlobalContext } from ".";
import { Chart, registerables } from "chart.js";
import type * as ChartTypes from "chart.js";
import "chartjs-adapter-date-fns";

// Make the "line" ctx type available
Chart.register(...registerables);

// the type of a coordinate-like price data // x=time & y=price
type data_pair = { x: number; y: number };

type chart_type = "line";
type ChartData = ChartTypes.ChartData<chart_type, data_pair[], string>;
type ChartOptions = ChartTypes.ChartOptions<chart_type>;
type ChartDataset = ChartTypes.ChartDataset<chart_type, data_pair[]>;
type ChartConfiguration = ChartTypes.ChartConfiguration<chart_type, data_pair[], string>;

//
const markets_locations: { [key: string]: { color: string; icon_url: string } } = {
    ["Black Market"]: { color: "gray", icon_url: "img/Flag_Caerleon.png" },

    ["Caerleon"]: { color: "black", icon_url: "img/Flag_Caerleon.png" },
    ["Lymhurst"]: { color: "green", icon_url: "img/Flag_Lymhurst.png" },
    ["Fort Sterling"]: { color: "lightblue", icon_url: "img/Flag_Fort_Sterling.png" },
    ["Thetford"]: { color: "purple", icon_url: "img/Flag_Thetford.png" },
    ["Martlock"]: { color: "blue", icon_url: "img/Flag_Martlock.png" },
    ["Bridgewatch"]: { color: "orange", icon_url: "img/Flag_Bridgewatch.png" },

    ["Arthurs Rest"]: { color: "darkblue", icon_url: "img/Arthurs Rest.png" },
    ["Merlyns Rest"]: { color: "black", icon_url: "img/Merlyns Rest.png" },
    ["Morganas Rest"]: { color: "black", icon_url: "img/Morganas Rest.png" },

    ["Brecilien Market"]: { color: "pink", icon_url: "img/Brecilien Market.png" }, //5003,1001,4000,5003,6

    ["Lymhurst Portal"]: { color: "green", icon_url: "img/portal.png" },
    ["Fort Sterling Portal"]: { color: "black", icon_url: "img/portal.png" },
    ["Thetford Portal"]: { color: "black", icon_url: "img/portal.png" },
    ["Martlock Portal"]: { color: "black", icon_url: "img/portal.png" },
    ["Bridgewatch Portal"]: { color: "black", icon_url: "img/portal.png" },
};

const chart_basic_config: ChartConfiguration = {
    data: { datasets: [] },
    type: "line",
    options: {
        scales: {
            x: {
                title: {
                    display: true,
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
                ticks: {
                    source: "auto",
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: "line",
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
};

const locations = "Caerleon,Martlock,Bridgewatch,Fort Sterling,Lymhurst,Thetford";

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

    let forceReRenderDatasetsDiv = () => {
        SET_chart_datasets(datasets => [...datasets]);
    };

    let update_chart_datasets = async (unique_name: string, quality: string) => {
        // date -> day-month-year
        let response = await fetch(`https://www.albion-online-data.com/api/v2/stats/charts/${unique_name}?qualities=${quality}&date=10-1-2022&end_date=12-1-2023&time-scale=24`);
        let json: MarketDataResponse = await response.json();

        let new_datasets: ChartDataset[] = [];

        if (json.length) {
            json.map(market => {
                let dataset: ChartDataset = {
                    ...chart_dataset_basic_config,

                    label: market.location,
                    data: market.data.prices_avg.map((avg_price, i) => {
                        let record: data_pair = { x: Date.parse(market.data.timestamps[i]), y: avg_price };
                        return record;
                    }),
                    borderColor: markets_locations[market.location].color || "red",
                };
                new_datasets.push(dataset);
                return dataset;
            });
        }
        ctx.current!.data.datasets = new_datasets;
        SET_chart_datasets(new_datasets);
        ctx.current!.update();
    };

    let toggle_chart_dataset = (dataset: ChartDataset): void => {
        dataset.hidden = !dataset.hidden;
        ctx.current!.update();
        forceReRenderDatasetsDiv();
    };

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
    useEffect(() => {
        if (G.chart_items.length === 0) return;

        let on_screen_item = G.chart_items[0]!;
        update_chart_datasets(on_screen_item.UniqueName, on_screen_item.quality);
    }, [G.chart_items]);

    return (
        <div id="Charts_Window" className="window">
            <div id="wrapper1">
                <div id="chart_items_container">
                    {G.chart_items.map((item, index) => {
                        return (
                            <img
                                key={index}
                                src={`https://render.albiononline.com/v1/item/${item!.UniqueName}.png?quality=${0}`}
                                alt={item!.UniqueName}
                                onError={e => {
                                    e.currentTarget.src = `https://albiononline2d.ams3.cdn.digitaloceanspaces.com/thumbnails/orig/${0}`;
                                    e.currentTarget.onerror = null;
                                }}
                            />
                        );
                    })}
                </div>
                <div id="handle_chart_datasets">
                    {Object.entries(markets_locations).map(([market_name, market_props]) => {
                        let dataset = chart_datasets.find(dataset => dataset.label == market_name);
                        return (
                            <div className={`market_row ${dataset ? "active" : "disabled"}`} key={market_name} onClick={dataset ? () => toggle_chart_dataset(dataset!) : void 0}>
                                {/* svg icon */}
                                {dataset ? (dataset.hidden ? check_square_svg : check_square_svg_fill) : x_square_svg}
                                <img src={market_props.icon_url} alt="" />
                                {market_name}
                                <img src={market_props.icon_url} alt="" />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div id="wrapper2">
                <div id="canvas_container">
                    <canvas ref={el => (canvasRef.current = el!)} id="myChart"></canvas>
                </div>
                <div id="time_handler_container"></div>
            </div>
        </div>
    );
};
