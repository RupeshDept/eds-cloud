/* eslint-disable */
import { div, input, button, h2, span } from "../../scripts/dom-helpers.js";
import { } from "../calculator-lumpsum/chart.js"


export default function decorate(block) {
    // ––––– Helpers
    function formatIndianCurrency(num) {
        const numStr = Math.round(num).toString();
        // Insert commas as per the Indian numbering format
        return numStr.replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,");
    }

    function calculateSWP(principal, withdrawal, rate, years) {
        const monthlyRate = rate / 1200;
        const totalMonths = years * 12;
        let remaining = principal;

        for (let i = 0; i < totalMonths; i++) {
            remaining = remaining * (1 + monthlyRate) - withdrawal;
        }
        const totalWithdrawal = withdrawal * totalMonths;
        return {
            principal,
            totalWithdrawal,
            remaining: Math.max(0, remaining),
        };
    }

    function renderPieChart(principal, withdrawal) {
        Highcharts.chart(pieChartContainerId, {
            chart: { type: "pie", backgroundColor: "transparent", width: 300 },
            title: { text: "" },
            tooltip: {
                pointFormat: `<b>{point.name}: ₹{point.y:,.0f}</b>`,
            },
            plotOptions: {
                pie: {
                    innerSize: "70%",
                    dataLabels: { enabled: false },
                    states: { hover: { enabled: true, brightness: 0.1 } },
                    borderColor: "#fff",
                    borderWidth: 1,
                },
            },
            colors: ["#1e88e5", "#42389d"],
            series: [{
                name: "SWP",
                data: [
                    { name: "Withdrawn", y: withdrawal },
                    { name: "Remaining", y: principal }
                ],
            }],
        });
    }

    // ––––– Build DOM
    const pieChartContainerId = "swp-piechart-" + Math.random().toString(36).slice(2);
    const defaultVals = { principal: 500000, withdrawal: 10000, rate: 8, years: 5 };
    const initial = calculateSWP(...Object.values(defaultVals));

    const totalInput = input({ type: "number", id: "total-investment", value: defaultVals.principal });
    const withdrawalInput = input({ type: "number", id: "withdrawal-amount", value: defaultVals.withdrawal });
    const rateInput = input({ type: "number", id: "expected-returns", value: defaultVals.rate });
    const rateSlider = input({ type: "range", id: "expected-returns-slider", min: "0", max: "30", step: "0.1", value: defaultVals.rate });
    const tenureInput = input({ type: "number", id: "tenure", value: defaultVals.years });
    const tenureSlider = input({ type: "range", id: "tenure-slider", min: "1", max: "30", value: defaultVals.years });

    const chartCenterRemaining = span({ id: "result-remaining" }, formatIndianCurrency(initial.remaining));

    const form = div({ class: "calculator-form" },
        h2({}, "SWP Calculator"),
        div({}, "Principal (₹)", totalInput),
        div({}, "Monthly Withdrawal (₹)", withdrawalInput),
        div({}, "Rate (%)", rateInput, rateSlider),
        div({}, "Years", tenureInput, tenureSlider),
        button({ id: "calculate-btn" }, "Calculate")
    );

    const chartArea = div({ class: "calculator-result" },
        div({ id: pieChartContainerId, style: "width:300px;height:300px;margin:auto" }),
        div({}, "Remaining Principal: ₹", chartCenterRemaining)
    );

    block.append(form, chartArea);

    // ––––– Update Logic
    function syncSliderAndInput(inputEl, sliderEl) {
        inputEl.addEventListener("input", () => {
            sliderEl.value = inputEl.value;
            updateAll();
        });
        sliderEl.addEventListener("input", () => {
            inputEl.value = sliderEl.value;
            updateAll();
        });
    }
    syncSliderAndInput(rateInput, rateSlider);
    syncSliderAndInput(tenureInput, tenureSlider);

    document.getElementById("total-investment").addEventListener("input", updateAll);
    document.getElementById("withdrawal-amount").addEventListener("input", updateAll);
    document.getElementById("calculate-btn").addEventListener("click", updateAll);

    function updateAll() {
        const p = +totalInput.value;
        const w = +withdrawalInput.value;
        const r = +rateInput.value;
        const y = +tenureInput.value;
        const res = calculateSWP(p, w, r, y);
        chartCenterRemaining.textContent = formatIndianCurrency(res.remaining);
        renderPieChart(res.principal, res.totalWithdrawal);
    }

    // ––––– Initial Render
    renderPieChart(initial.principal, initial.totalWithdrawal);
}
