/* eslint-disable */
import {
    div, span, h2, input, text, label
} from "../../scripts/dom-helpers.js";

// Do not remove this, it ensures chart.js loads Highcharts globally
import { } from "../calculator-lumpsum/chart.js"

export default function decorate(block) {
    // Utility
    const formatINR = (val) =>
        "₹" + val.toLocaleString("en-IN", { maximumFractionDigits: 0 });

    // Global slider references
    let loanAmountSlider, interestRateSlider, loanTenureSlider;

    // Create sliders
    const createSliderRow = (labelText, id, min, max, value, step, unit, assignRef) => {
        const valueBox = span({ id: `${id}-value`, class: "value-box" }, text(`${value}${unit}`));
        const slider = input({
            type: "range",
            id,
            min,
            max,
            value,
            step,
            class: "slider"
        });

        if (assignRef) assignRef(slider);

        slider.addEventListener("input", () => {
            const val = slider.value;
            valueBox.textContent = unit.includes("₹") ? formatINR(+val) : `${val}${unit}`;
            calculateAndRender();
        });

        return div({ class: "slider-row" },
            label({}, text(labelText)),
            valueBox,
            slider
        );
    };

    const resultRow = (labelText, id) =>
        div({ class: "result-row" },
            span({ class: "label" }, text(labelText)),
            span({ id, class: "value" }, text("₹0"))
        );

    const chartContainer = div({ id: "edu-loan-chart", class: "chart-container-loan" });

    const slidersBox = div({ class: "sliders-section" },
        createSliderRow("Loan amount", "loan-amount", 100000, 5000000, 1000000, 10000, " ₹", s => loanAmountSlider = s),
        createSliderRow("Rate of interest (p.a)", "interest-rate", 3, 15, 6.5, 0.1, " %", s => interestRateSlider = s),
        createSliderRow("Loan tenure", "loan-tenure", 1, 15, 5, 1, " Yr", s => loanTenureSlider = s)
    );

    const resultsBox = div({ class: "results" },
        resultRow("Monthly EMI", "emi"),
        resultRow("Principal amount", "principal"),
        resultRow("Total interest", "interest"),
        resultRow("Total amount", "total")
    );

    const container = div({ class: "education-loan-calculator" },
        h2({}, text("Education Loan EMI Calculator")),
        div({ class: "content" },
            slidersBox,
            chartContainer
        ),
        resultsBox
    );

    block.textContent = "";
    block.append(container);

    // Calculation and chart rendering
    function calculateAndRender() {
        const P = parseFloat(loanAmountSlider.value);
        const annualRate = parseFloat(interestRateSlider.value);
        const years = parseFloat(loanTenureSlider.value);
        const N = years * 12;
        const R = annualRate / 12 / 100;

        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const totalPayment = emi * N;
        const totalInterest = totalPayment - P;

        document.getElementById("emi").textContent = formatINR(emi);
        document.getElementById("principal").textContent = formatINR(P);
        document.getElementById("interest").textContent = formatINR(totalInterest);
        document.getElementById("total").textContent = formatINR(totalPayment);

        renderChart(P, totalInterest);
    }

    function renderChart(principal, interest) {
        Highcharts.chart("edu-loan-chart", {
            chart: { type: "pie", backgroundColor: "transparent" },
            title: { text: null },
            tooltip: { pointFormat: "<b>{point.y:,.0f}</b>" },
            accessibility: { point: { valueSuffix: "%" } },
            plotOptions: {
                pie: {
                    innerSize: "70%",
                    dataLabels: { enabled: false },
                    colors: ["#D1D8FF", "#5861D8"]
                }
            },
            series: [{
                name: "Amount",
                data: [
                    { name: "Principal", y: principal },
                    { name: "Interest", y: interest }
                ]
            }]
        });
    }

    // Initial render
    calculateAndRender();
}
