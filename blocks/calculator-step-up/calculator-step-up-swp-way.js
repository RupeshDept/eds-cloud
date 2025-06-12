/* eslint-disable */

import {
    div,
    h3,
    form,
    label,
    input,
    span,
} from "../../scripts/dom-helpers.js";
import { } from "../calculator-lumpsum/chart.js"

export default function decorate(block) {
    function createField(id, labelText, min, max, value) {
        const numberInput = input({
            type: "number",
            id,
            class: "default",
            value,
            min,
            max,
            placeholder: "0",
        });

        const rangeInput = input({
            type: "range",
            id: `${id}-range`,
            min,
            max,
            value,
        });

        return div(
            { class: "each-field" },
            div(
                { class: "each-field-top" },
                label({ class: "field-title", for: id }, labelText),
                numberInput
            ),
            div({ class: "each-field-bottom" }, rangeInput)
        );
    }

    function createResultField(id, title, value) {
        return div(
            { class: "calculated-content" },
            span({ class: "calculate-title" }, title),
            span({ class: "calculate-value", id }, value)
        );
    }

    const stepUpCalc = document.querySelector(".calculator-step-up");

    const leftFields = [
        ["step-monthly-invest", "Monthly Investment (₹)", 100, 10000, 2000],
        ["annual-stepUp", "Annual Step Up (% p.a.)", 1, 50, 10],
        ["expect-rate-stepUp", "Expected Rate of Return (% p.a.)", 1, 50, 5],
        ["time-prd-stepUp", "Time period (In years)", 1, 100, 5],
    ];

    const leftInputs = leftFields.map(([id, label, min, max, value]) =>
        createField(id, label, min, max, value)
    );

    const stepUpCalcContent = div(
        { class: "step-up-calc-content" },
        div(
            { class: "left-content" },
            h3({ class: "calc-head" }, "Step Up SIP Calculator"),
            form({ class: "left-wrapper" }, ...leftInputs)
        ),
        div(
            { class: "right-content" },
            div({ id: "stepup-calculate-chart" }),
            div(
                { class: "calculated-container" },
                createResultField("invested-amnt", "Invested Amount", "2000"),
                createResultField("estmted-returns", "Estimated Returns", "2000"),
                createResultField("total-value", "Total Value", "2000")
            )
        )
    );

    stepUpCalc.append(stepUpCalcContent);

    const numberInputs = stepUpCalc.querySelectorAll(".each-field-top input[type='number']");
    const rangeInputs = stepUpCalc.querySelectorAll(".each-field-bottom input[type='range']");

    function updateFill(range) {
        const percent = ((range.value - range.min) / (range.max - range.min)) * 100;
        range.style.setProperty("--progress", `${percent}%`);
    }

    function syncInputs(e) {
        const input = e.target;
        const wrapper = input.closest(".each-field");
        const numberInput = wrapper.querySelector("input[type='number']");
        const rangeInput = wrapper.querySelector("input[type='range']");

        if (input.type === "range") {
            numberInput.value = input.value;
            numberInput.classList.remove("error");
        } else {
            if (input.value < input.min || input.value > input.max || input.value === "") {
                input.classList.add("error");
            } else {
                rangeInput.value = input.value;
                input.classList.remove("error");
            }
        }
        updateFill(rangeInput);
    }

    function calculateStepUp(P, S, R, N) {
        let FV = 0;
        let invested = 0;
        const s = S / 100;
        const r = R / (12 * 100);

        for (let k = 0; k < N; k++) {
            const pk = P * Math.pow(1 + s, k);
            const fvFactorYear = ((Math.pow(1 + r, 12) - 1) / r) * (1 + r);
            const compoundFactor = Math.pow(1 + r, (N - k - 1) * 12);
            const FV_K = pk * fvFactorYear * compoundFactor;
            FV += FV_K;
            invested += pk * 12;
        }

        return {
            futureValue: FV,
            investedAmount: invested,
            estimatedReturns: FV - invested,
        };
    }

    function updateResults() {
        const monthInvest = Number(document.getElementById("step-monthly-invest").value);
        const stepUp = Number(document.getElementById("annual-stepUp").value);
        const rate = Number(document.getElementById("expect-rate-stepUp").value);
        const period = Number(document.getElementById("time-prd-stepUp").value);

        const result = calculateStepUp(monthInvest, stepUp, rate, period);

        document.getElementById("total-value").textContent = result.futureValue.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        });
        document.getElementById("invested-amnt").textContent = result.investedAmount.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        });
        document.getElementById("estmted-returns").textContent = result.estimatedReturns.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        });

        piechart(
            result.investedAmount,
            result.estimatedReturns
        );
    }

    numberInputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            syncInputs(e);
            updateResults();
        });
    });

    rangeInputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            syncInputs(e);
            updateResults();
        });
        updateFill(input);
    });

    updateResults();

    function piechart(invest, estimated) {
        Highcharts.chart("stepup-calculate-chart", {
            chart: {
                width: 450,
                type: "pie",
                backgroundColor: "transparent",
            },
            credits: { enabled: false },
            title: {
                text: "Step Up SIP Calculator Chart",
                style: {
                    color: "#2e2a94",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                },
            },
            tooltip: {
                backgroundColor: "#fff",
                borderRadius: 3,
                borderWidth: 1,
                style: {
                    color: "#2b238c",
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "Verdana, sans-serif",
                },
                shadow: true,
                padding: 8,
                formatter: function () {
                    return `<b>${this.point.name}: ₹${this.y.toLocaleString("en-IN")}</b>`;
                },
            },
            legend: {
                enabled: true,
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal",
                itemStyle: {
                    fontSize: "14px",
                    color: "#333",
                },
            },
            plotOptions: {
                pie: {
                    innerSize: "70%",
                    size: "100%",
                    dataLabels: {
                        enabled: false,
                    },
                    borderWidth: 1,
                    borderColor: "#fff",
                },
            },
            colors: ["#2b2e8c", "#1f88ce"],
            series: [
                {
                    name: "Amount",
                    colorByPoint: true,
                    data: [
                        { name: "Invested Amount", y: Number(invest) },
                        { name: "Estimated Returns", y: Number(estimated) },
                    ],
                },
            ],
        });
    }
}
