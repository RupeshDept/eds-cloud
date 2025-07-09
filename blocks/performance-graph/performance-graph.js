/* eslint-disable */
import chartsData from "./data.js";
import * as am5 from "../../scripts/index.js";
import * as am5xy from "../../scripts/xy.js";
import * as am5themes_Animated from "../../scripts/Animated.js";

export default function decorate(block) {

    // console.log("AMCHART", am5, am5xy, am5themes_Animated);
    // Create top filter buttons
    const filterBar = document.createElement('div');
    filterBar.className = 'chart-filter-bar';

    const filters = ['1M', '3M', '6M', '1Y', '3Y', '5Y', 'All'];
    let activeFilter = '3Y';

    // ✅ Store chart root reference for disposal
    let root = null;

    filters.forEach(label => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.className = 'filter-btn';
        if (label === activeFilter) btn.classList.add('active');
        btn.addEventListener('click', () => {
            activeFilter = label;
            [...filterBar.children].forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showGraph(label); // Call graph with current filter
        });
        filterBar.appendChild(btn);
    });

    // Graph container
    const graphDiv = document.createElement('div');
    graphDiv.id = 'chartdiv';
    graphDiv.style.width = "100%";
    graphDiv.style.height = "500px";
    block.append(filterBar, graphDiv);

    // const useLiveAPI = false;
    const useLiveAPI = true;


    async function showGraph(filter) {
        try {
            let parsedChartData;

            if (useLiveAPI) {
                // const requestData = {
                //     api_name: "PerformanceGraphNew",
                //     cmt_schcode: "24097",
                //     graphType: "Lumpsum",
                //     invamount: "10000",
                //     isCompare: "",
                //     isin: "INF247L01445",
                //     period: "Y",
                //     schcode: "FM"
                // };
                const requestData = {
                    api_name: "PerformanceGraphNew",
                    cmt_schcode: "26136",
                    graphType: "Lumpsum",
                    invamount: "10000",
                    isCompare: "",
                    isin: "INF247L01502",
                    period: "Y",
                    schcode: "CP"
                }

                parsedChartData = await myAPI('POST', 'https://www.motilaloswalmf.com/mutualfund/api/v1/PerformanceGraphNew', requestData);
            } else {
                parsedChartData = chartsData;
            }

            const key = Object.keys(parsedChartData)[0];
            const chartArray = parsedChartData[key];

            // Dummy filter logic (actual API or backend should filter this)
            const filteredData = filterChartData(chartArray, filter);

            const chartData = filteredData.map((item) => ({
                date: new Date(item.navdate).getTime(),
                value1: parseFloat(item.marketValue_Scheme),
                value2: parseFloat(item.marketValue_BM1),
            }));

            renderChart(chartData);
        } catch (error) {
            console.error("Error loading chart data:", error);
        }
    }

    function filterChartData(data, filter) {
        if (!data || data.length === 0) return [];

        // Sort data by date to ensure proper filtering
        const sortedData = data.sort((a, b) => new Date(a.navdate) - new Date(b.navdate));

        if (filter === 'All') {
            return sortedData;
        }

        // Get the latest date from the data
        const latestDate = new Date(sortedData[sortedData.length - 1].navdate);

        const daysMap = {
            '1M': 30,
            '3M': 90,
            '6M': 180,
            '1Y': 365,
            '3Y': 1095,
            '5Y': 1825
        };

        const days = daysMap[filter];
        if (!days) return sortedData;

        // Calculate the cutoff date from the latest data point
        const cutoffDate = new Date(latestDate.getTime() - (days * 24 * 60 * 60 * 1000));

        // Filter data from cutoff date onwards
        const filteredData = sortedData.filter(item => new Date(item.navdate) >= cutoffDate);

        // If no data matches the filter (like your sample data is too recent), return all data
        // This prevents empty charts when testing with limited date ranges
        return filteredData.length > 0 ? filteredData : sortedData;
    }

    function renderChart(chartData) {
        // ✅ DISPOSE previous chart before creating new one
        if (root) {
            root.dispose();
            root = null;
        }

        window.am5.ready(() => {
            // ✅ Store the root reference
            root = window.am5.Root.new("chartdiv");

            root.setThemes([window.am5themes_Animated.new(root)]);

            const chart = root.container.children.push(window.am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingBottom: 80
            }));

            chart.get("colors").set("step", 3);

            const cursor = chart.set("cursor", window.am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            const xAxis = chart.xAxes.push(window.am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "day", count: 1 },
                renderer: window.am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
                tooltip: window.am5.Tooltip.new(root, {})
            }));

            const yAxis = chart.yAxes.push(window.am5xy.ValueAxis.new(root, {
                renderer: window.am5xy.AxisRendererY.new(root, {})
            }));

            const series1 = chart.series.push(window.am5xy.LineSeries.new(root, {
                name: "Motilal Oswal Midcap Fund",
                xAxis, yAxis,
                valueYField: "value1",
                valueXField: "date",
                tensionX: 0.8,
                tooltip: window.am5.Tooltip.new(root, {
                    labelText: "{date.formatDate()}\nScheme: {value1}\nBenchmark: {value2}"
                })
            }));

            series1.strokes.template.setAll({ strokeWidth: 2 });
            series1.bullets.push(() => window.am5.Bullet.new(root, {
                sprite: window.am5.Circle.new(root, {
                    radius: 4,
                    fill: series1.get("stroke"),
                    stroke: root.interfaceColors.get("background"),
                    strokeWidth: 2
                })
            }));

            const series2 = chart.series.push(window.am5xy.LineSeries.new(root, {
                name: "Nifty Midcap 150 TRI",
                xAxis, yAxis,
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

            series1.data.setAll(chartData);
            series2.data.setAll(chartData);


            // legend at bottom
            const legend = chart.children.push(window.am5.Legend.new(root, {
                centerX: window.am5.p50,
                x: window.am5.p50,
                centerY: window.am5.p100,
                y: window.am5.percent(110),
                layout: root.horizontalLayout,
                marginTop: 30
            }));

            legend.data.setAll(chart.series.values);

            series1.appear(1000);
            series2.appear(1000);
            chart.appear(1000, 100);
        });
    }

    function myAPI(method, url, data = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            if (data) xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const json = JSON.parse(xhr.responseText);
                            // resolve(json);
                            resolve(json.data.response)
                        } catch (err) {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(new Error(`Request failed: ${xhr.status}`));
                    }
                }
            };
            xhr.onerror = () => reject(new Error("Network error"));
            xhr.send(data ? JSON.stringify(data) : null);
        });
    }

    // Initial load
    showGraph(activeFilter);
}