import React, { useEffect } from "react";
import { GlobalContext } from ".";
import { Chart, registerables } from "chart.js";

export const Charts_Window: FunctionComponent = () => {
    let [G, SET_G] = React.useContext(GlobalContext);
    let canvas = React.useRef<any>();
    let chart: Chart;
    let render_canvas = async (UNIQUE_HIDEOUT: string) => {
        let locations = "&locations=Caerleon,Martlock,Bridgewatch,Fort Sterling,Lymhurst,Thetford";
        let colors: any = {
            Caerleon: "black",
            Martlock: "blue",
            "Arthurs Rest": "darkblue",
            "Black Market": "gray",
            Bridgewatch: "orange",
            "Fort Sterling": "lightblue",
            Lymhurst: "green",
            Thetford: "purple",
        };
        let response = await fetch(`https://www.albion-online-data.com/api/v2/stats/charts/${UNIQUE_HIDEOUT}?qualities=${1}&date=10-1-2022&end_date=12-1-2023${locations}&time-scale=24`);
        let json = await response.json();
        let datasets = [];
        for (const market of json) {
            datasets.push({
                label: market.location,
                data: market.data.prices_avg,
                fill: false,
                borderColor: colors[market.location],
                tension: 0.5,
            });
        }
        const labels = json[0].data.timestamps;
        const data = {
            labels: labels,
            datasets: datasets,
        };
        const config = {
            type: "line",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: json[0].item_id + "   quality: " + json[0].quality,
                    },
                },
            },
        };
        Chart.register(...registerables);
        chart = new Chart(canvas.current, config as any);
        return <canvas ref={canvas} id="myChart"></canvas>;
    };
    useEffect(() => {
        if (G.items.length === 0) return;
        render_canvas(G.items[0]?.UniqueName!);
        return () => {
            if (!chart) return;
            chart.destroy();
        };
    }, [G]);
    return (
        <div id="Charts_Window" className="window">
            <div id="items_container">
                {G.items.map(item => {
                    return (
                        <img
                            key={item?.Index}
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
            <div id="wrapper">
                <canvas ref={canvas} id="myChart"></canvas>
            </div>
        </div>
    );
};
