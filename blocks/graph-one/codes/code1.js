/* eslint-disable */
export default function decorate(block) {

    // Create a new div element to hold the graph
    const graphDiv = document.createElement('div');
    graphDiv.id = 'chartdiv';
    graphDiv.innerHTML = "Peformance Graph";
    block.appendChild(graphDiv);


    const btn = document.createElement('button');
    btn.textContent = 'Show Graph';
    btn.addEventListener('click', () => {
        showGraph();
    });
    btn.classList.add('show-graph-button');
    block.appendChild(btn);

    // AMCharts initialization
    if (!window.am5 || !window.am5xy || !window.am5themes_Animated) {
        console.warn("amCharts not ready yet. Try delaying execution.");
    }


    function showGraph() {
        window.am5.ready(() => {
            var root = window.am5.Root.new("chartdiv");

            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
                window.am5themes_Animated.new(root)
            ]);

            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            var chart = root.container.children.push(window.am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true
            }));

            chart.get("colors").set("step", 3);

            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            var cursor = chart.set("cursor", window.am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);


            // Create axes
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            var xAxis = chart.xAxes.push(window.am5xy.DateAxis.new(root, {
                maxDeviation: 0.3,
                baseInterval: {
                    timeUnit: "day",
                    count: 1
                },
                renderer: window.am5xy.AxisRendererX.new(root, { minorGridEnabled: true }),
                tooltip: window.am5.Tooltip.new(root, {})
            }));

            var yAxis = chart.yAxes.push(window.am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: window.am5xy.AxisRendererY.new(root, {})
            }));


            // Add series
            // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
            var series = chart.series.push(window.am5xy.LineSeries.new(root, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value1",
                valueXField: "date",
                tooltip: window.am5.Tooltip.new(root, {
                    labelText: "{valueX}: {valueY}\n{previousDate}: {value2}"
                })
            }));

            series.strokes.template.setAll({
                strokeWidth: 2
            });

            series.get("tooltip").get("background").set("fillOpacity", 0.5);

            var series2 = chart.series.push(window.am5xy.LineSeries.new(root, {
                name: "Series 2",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value2",
                valueXField: "date"
            }));
            series2.strokes.template.setAll({
                strokeDasharray: [2, 2],
                strokeWidth: 2
            });

            // Set date fields
            // https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
            root.dateFormatter.setAll({
                dateFormat: "yyyy-MM-dd",
                dateFields: ["valueX"]
            });


            // dynamic data

            const storedChartData = localStorage.getItem("chartData");
            const parsedChartData = JSON.parse(storedChartData);
            //console.log(parsedChartData);

            const key = Object.keys(parsedChartData)[0]; // "Nifty Midcap 150 TRI"
            const chartArray = parsedChartData[key];
            const first10 = chartArray.slice(0, 10);
            console.log(first10);


            // Convert data to amCharts-friendly format
            const chartData = first10.map((item) => {
                return {
                    date: new Date(item.navdate).getTime(),
                    value1: parseFloat(item.marketValue_Scheme),
                    value2: parseFloat(item.marketValue_BM1),
                };
            });

            var data = chartData;



            // dynamic data

            /// test data 
            // var data = [{
            //     date: new Date(2019, 1, 1).getTime(),
            //     value1: 10,
            //     value2: 50,
            //     previousDate: "2019-01-01"
            // }, {
            //     date: new Date(2019, 3, 3).getTime(),
            //     value1: 100,
            //     value2: 200,
            //     previousDate: "2019-03-03"
            // }, {
            //     date: new Date(2019, 3, 3).getTime(),
            //     value1: 100,
            //     value2: 200,
            //     previousDate: "2019-03-03"
            // }, {
            //     date: new Date(2020, 3, 3).getTime(),
            //     value1: 65,
            //     value2: 75,
            //     previousDate: "2020-03-03"
            // }]

            // Set data
            // var data = [{
            //     date: new Date(2019, 5, 12).getTime(),
            //     value1: 50,
            //     value2: 48,
            //     previousDate: new Date(2019, 5, 5)
            // }, {
            //     date: new Date(2019, 5, 13).getTime(),
            //     value1: 53,
            //     value2: 51,
            //     previousDate: "2019-05-06"
            // }, {
            //     date: new Date(2019, 5, 14).getTime(),
            //     value1: 56,
            //     value2: 58,
            //     previousDate: "2019-05-07"
            // }, {
            //     date: new Date(2019, 5, 15).getTime(),
            //     value1: 52,
            //     value2: 53,
            //     previousDate: "2019-05-08"
            // }, {
            //     date: new Date(2019, 5, 16).getTime(),
            //     value1: 48,
            //     value2: 44,
            //     previousDate: "2019-05-09"
            // }, {
            //     date: new Date(2019, 5, 17).getTime(),
            //     value1: 47,
            //     value2: 42,
            //     previousDate: "2019-05-10"
            // }, {
            //     date: new Date(2019, 5, 18).getTime(),
            //     value1: 59,
            //     value2: 55,
            //     previousDate: "2019-05-11"
            // }]

            series.data.setAll(data);
            series2.data.setAll(data);


            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear(1000);
            series2.appear(1000);
            chart.appear(1000, 100);



        });
    }
}