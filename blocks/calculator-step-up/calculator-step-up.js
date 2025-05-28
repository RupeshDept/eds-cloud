/* eslint-disable */

import { div, h3, form, label, input, span } from "../../scripts/dom-helpers.js";
// import { } from "../lumpsum-calculator/chart.js";
import { } from "../calculator-lumpsum/chart.js"

export default function (block) {
    // Function form creating left content (Input Fields and Range)
    function createField(id, labelText, min, max, value) {
        return div(
            { class: "each-field" },
            div(
                { class: "each-field-top" },
                label({ class: "field-title", for: id }, labelText),
                input({
                    id: id,
                    class: "default",
                    value: value,
                    type: "number",
                    min: min,
                    max: max,
                    placeholder: "0",
                })
            ),
            div(
                { class: "each-field-bottom" },
                input({
                    type: "range",
                    id: id + "-range",
                    min: min,
                    max: max,
                    value: value,
                })
            )
        );
    }

    // Function for right content
    function createValueField(id, title, value) {
        return div(
            { class: "calculated-content" },
            span({ class: "calculate-title" }, title),
            span({ class: "calculate-value", id: id }, value)
        );
    }

    const stepUpCalc = document.querySelector(".calculator-step-up");
    // Calculator Content
    const stepUpCalcContent = div(
        { class: "step-up-calc-content" },
        // Left Content
        div(
            { class: "left-content" },
            h3({ class: "calc-head" }, "Step Up SIP Calculator"),
            form(
                { class: "left-wrapper" },
                createField(
                    "step-monthly-invest",
                    "Monthly Investment (₹)",
                    "100",
                    "10000",
                    "2000"
                ),
                createField(
                    "annual-stepUp",
                    "Annual Step Up (% p.a.)",
                    "1",
                    "50",
                    "10"
                ),
                createField(
                    "expect-rate-stepUp",
                    "Expected Rate of Return (% p.a.)",
                    "1",
                    "50",
                    "5"
                ),
                createField(
                    "time-prd-stepUp",
                    "Time period (In years)",
                    "1",
                    "100",
                    "5"
                )
            )
        ),
        // Right Content
        div(
            { class: "right-content" },
            div({ id: "stepup-calculate-chart" }),
            div(
                { class: "calculated-container" },
                createValueField("invested-amnt", "Invested Amount", "2000"),
                createValueField("estmted-returns", "Estimated Returns", "2000"),
                createValueField("total-value", "Total Value", "2000")
            )
        )
    );
    stepUpCalc.appendChild(stepUpCalcContent);

    // Calc Functionality
    const stepNumInp = document.querySelectorAll(
        ".step-up-calc-content .each-field-top input"
    );
    const stepRangeInp = document.querySelectorAll(
        ".step-up-calc-content .each-field-bottom input"
    );
    const investedAmnt = document.getElementById("invested-amnt");
    const totalValue = document.getElementById("total-value");
    const estimetdReturns = document.getElementById("estmted-returns");

    function updateFill(range) {
        const min = range.min;
        const max = range.max;
        const val = range.value;
        const getPercentage = ((val - min) / (max - min)) * 100;
        range.style.setProperty("--progress", `${getPercentage}%`);
    }

    function inpRangeSync(e) {
        const target = e.target;
        const wrapper = target.closest(".step-up-calc-content .each-field");
        const numberInput = wrapper.querySelector('input[type="number"]');
        const rangeInput = wrapper.querySelector('input[type="range"]');
        const min = Number(target.min);
        const max = Number(target.max);
        const val = Number(target.value);
        const type = target.type;
        if (type == "number") {
            if (val < min || isNaN(val)) {
                rangeInput.value = min;
                numberInput.classList.add("error");
                numberInput.classList.remove("default");
            } else if (val > max) {
                rangeInput.value = max;
                numberInput.classList.add("error");
                numberInput.classList.remove("default");
            } else {
                rangeInput.value = val;
                numberInput.classList.remove("error");
                numberInput.classList.add("default");
            }
        } else {
            numberInput.value = rangeInput.value;
            numberInput.classList.remove("error");
            numberInput.classList.add("default");
        }
    }

    function handleInp(e) {
        inpRangeSync(e);
        stepRangeInp.forEach((rngInp) => {
            updateFill(rngInp);
        });
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

    function renderCalculatedValue() {
        const monthInvest = Number(
            document.getElementById("step-monthly-invest").value
        );
        const annualSteup = Number(document.getElementById("annual-stepUp").value);
        const timePrd = Number(document.getElementById("time-prd-stepUp").value);
        const expctReturnRate = Number(
            document.getElementById("expect-rate-stepUp").value
        );
        const stepUpResult = calculateStepUp(
            monthInvest,
            annualSteup,
            expctReturnRate,
            timePrd
        );
        totalValue.textContent = stepUpResult.futureValue.toLocaleString("en-IN", {
            currency: "INR",
            maximumFractionDigits: 0,
        });
        investedAmnt.textContent = stepUpResult.investedAmount.toLocaleString(
            "en-IN",
            { currency: "INR", maximumFractionDigits: 0 }
        );
        estimetdReturns.textContent = stepUpResult.estimatedReturns.toLocaleString(
            "en-IN",
            { currency: "INR", maximumFractionDigits: 0 }
        );
    }

    // Input Logic
    stepNumInp.forEach((inp) => {
        inp.addEventListener("input", function (e) {
            console.log("anurag");
            handleInp(e);
            const numMin = Number(e.target.min);
            const numMax = Number(e.target.max);
            const numval = Number(e.target.value);
            if (numval > numMax || numval < numMin) {
                const annualSteup = Number(
                    document.getElementById("annual-stepUp").min
                );
                const monthInvest = Number(
                    document.getElementById("step-monthly-invest").min
                );
                const timePrd = Number(document.getElementById("time-prd-stepUp").min);
                const expctReturnRate = Number(
                    document.getElementById("expect-rate-stepUp").min
                );
                const stepUpResult = calculateStepUp(
                    monthInvest,
                    annualSteup,
                    expctReturnRate,
                    timePrd
                );
                totalValue.textContent = Math.round(stepUpResult.futureValue);
                investedAmnt.textContent = Math.round(stepUpResult.investedAmount);
                estimetdReturns.textContent = Math.round(stepUpResult.estimatedReturns);
                piechart(
                    Number(investedAmnt.textContent.replace(/,/g, "")),
                    Number(estimetdReturns.textContent.replace(/,/g, ""))
                );
            } else {
                renderCalculatedValue();
                piechart(
                    Number(investedAmnt.textContent.replace(/,/g, "")),
                    Number(estimetdReturns.textContent.replace(/,/g, ""))
                );
            }
        });
    });

    // Range Logic
    stepRangeInp.forEach((rng) => {
        rng.addEventListener("input", function (e) {
            handleInp(e);
            renderCalculatedValue();
            piechart(
                Number(investedAmnt.textContent.replace(/,/g, "")),
                Number(estimetdReturns.textContent.replace(/,/g, ""))
            );
        });
    });

    // On Load Logic
    stepRangeInp.forEach((range, i) => {
        updateFill(range);
    });
    renderCalculatedValue();
    piechart(
        Number(investedAmnt.textContent.replace(/,/g, "")),
        Number(estimetdReturns.textContent.replace(/,/g, ""))
    );

    // Chart Configuration
    function piechart(invest, estimated) {
        Highcharts.chart("stepup-calculate-chart", {
            chart: {
                width: 450,
                type: "pie",
                backgroundColor: "transparent",
            },
            credits: {
                enabled: false,
            },
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
                    return `<b>${this.point.name}: ₹${this.y.toLocaleString(
                        "en-IN"
                    )}</b>`;
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
                        enabled: true,
                        format: "<b>{point.name}</b>: ₹{point.y}",
                        connectorWidth: 0,
                        distance: -30,
                        dataLabels: {
                            enabled: false,
                        },
                        legend: {
                            enabled: false,
                        },
                        style: {
                            color: "#000",
                            fontSize: "13px",
                            fontWeight: "normal",
                            display: "none",
                        },
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
};