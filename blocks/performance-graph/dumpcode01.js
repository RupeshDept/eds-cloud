/* eslint-disable */
// import { div, img, h2, p, a } from '../../scripts/dom-helpers.js';
import chartsData from "./data.js";
export default function decorate(block) {

    // Create a new div element to hold the graph
    const graphDiv = document.createElement('div');
    graphDiv.id = 'chartdiv';
    block.appendChild(graphDiv);

    // Style the chart div (you can also put this in CSS)
    graphDiv.style.width = "100%";
    graphDiv.style.height = "500px";

    const btn = document.createElement('button');
    btn.textContent = 'Show Graph';
    const useLiveAPI = false;
    btn.addEventListener('click', () => {
        // showGraph();

        if (useLiveAPI) {
            const requestData = {
                api_name: "PerformanceGraphNew",
                cmt_schcode: "24097",
                graphType: "Lumpsum",
                invamount: "10000",
                isCompare: "",
                isin: "INF247L01445",
                schcode: "FM"
            };
            myAPI('POST', 'https://www.motilaloswalmf.com/mutualfund/api/v1/PerformanceGraphNew', requestData)
                .then(data => {
                    localStorage.setItem("chartData", JSON.stringify(data));
                    showGraph();
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    showGraph()

                });

        } else {
            showGraph()
        }
    });

    btn.classList.add('show-graph-button');
    block.appendChild(btn);

    // AMCharts initialization RM11
    if (!window.am5 || !window.am5xy || !window.am5themes_Animated) {
        console.warn("amCharts not ready yet. Try delaying execution.");
    }

    function myAPI(method, url, data = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            if (data) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const json = JSON.parse(xhr.responseText);
                            resolve(json);
                        } catch (err) {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(new Error(`Request failed with status ${xhr.status}`));
                    }
                }
            };
            xhr.onerror = () => reject(new Error("Network error"));
            xhr.send(data ? JSON.stringify(data) : null);
        });
    }

    async function showGraph() {
        try {
            const parsedChartData = chartsData || JSON.parse(localStorage.getItem("chartData"));
            if (!parsedChartData) {
                console.error("No chart data available.");
                return;
            }
            const key = Object.keys(parsedChartData)[0];
            const chartArray = parsedChartData[key];

            const chartData = chartArray.map((item) => {
                return {
                    date: new Date(item.navdate).getTime(),
                    value1: parseFloat(item.marketValue_Scheme),
                    value2: parseFloat(item.marketValue_BM1),
                };
            });

            // rendering chart using this chartData
            renderChart(chartData);
        } catch (error) {
            console.error("Error loading chart data:", error);
        }
    }

    function renderChart(chartData) {
        window.am5.ready(() => {
            const root = window.am5.Root.new("chartdiv");

            root.setThemes([
                window.am5themes_Animated.new(root)
            ]);

            const chart = root.container.children.push(window.am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            }));

            chart.get("colors").set("step", 3);

            const cursor = chart.set("cursor", window.am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            const xAxis = chart.xAxes.push(window.am5xy.DateAxis.new(root, {
                maxDeviation: 0.3,
                baseInterval: {
                    timeUnit: "day",
                    count: 1
                },
                renderer: window.am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
                tooltip: window.am5.Tooltip.new(root, {})
            }));

            const yAxis = chart.yAxes.push(window.am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: window.am5xy.AxisRendererY.new(root, {})
            }));

            const series = chart.series.push(window.am5xy.LineSeries.new(root, {
                name: "Motilal Oswal Midcap Fund",
                xAxis,
                yAxis,
                valueYField: "value1",
                valueXField: "date",
                tensionX: 0.8,
                tooltip: window.am5.Tooltip.new(root, {
                    labelText: "{date.formatDate()}\nScheme: {value1}\nBenchmark: {value2}"
                })
            }));

            series.strokes.template.setAll({ strokeWidth: 2 });
            series.bullets.push(() => window.am5.Bullet.new(root, {
                sprite: window.am5.Circle.new(root, {
                    radius: 4,
                    fill: series.get("stroke"),
                    stroke: root.interfaceColors.get("background"),
                    strokeWidth: 2
                })
            }));

            const series2 = chart.series.push(window.am5xy.LineSeries.new(root, {
                name: "Nifty Midcap 150 TRI",
                xAxis,
                yAxis,
                valueYField: "value2",
                valueXField: "date",
                tensionX: 0.8
            }));

            series2.strokes.template.setAll({
                strokeDasharray: [2, 2],
                strokeWidth: 2
            });

            series2.bullets.push(() => window.am5.Bullet.new(root, {
                sprite: window.am5.Circle.new(root, {
                    radius: 4,
                    fill: series2.get("stroke"),
                    stroke: root.interfaceColors.get("background"),
                    strokeWidth: 2
                })
            }));

            root.dateFormatter.setAll({
                dateFormat: "yyyy-MM-dd",
                dateFields: ["valueX"]
            });

            series.data.setAll(chartData);
            series2.data.setAll(chartData);

            const legend = chart.children.push(window.am5.Legend.new(root, {
                centerX: window.am5.p50,
                x: window.am5.p50
            }));

            legend.data.setAll(chart.series.values);

            series.appear(1000);
            series2.appear(1000);
            chart.appear(1000, 100);
        });
    }
}
