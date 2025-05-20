/*eslint-disable*/

import { div, h3, form, label, input, span } from "../../scripts/dom-helpers.js";
import { } from "../lumpsum-calculator/chart.js";
export default function (block) {
    // Function form creating left content (Input Fields and Range)
    function createField(id, labelText, min, max, value) {
        return div({ class: "each-field" },
            div({ class: "each-field-top" },
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
            div({ class: "each-field-bottom" },
                input({
                    type: "range",
                    id: id + "-range",
                    min: min,
                    max: max,
                    value: value,
                })
            )
        );
    };

    // Function for right content
    function createValueField(id, title, value) {
        return div({ class: "calculated-content" },
            span({ class: "calculate-title" }, title),
            span({ class: "calculate-value", id: id }, value)
        );
    };

    const lumpsumCalc = document.querySelector(".lumpsum-calculator");
    // Calculator Content
    const lumpsumCalcContent = div({ class: "lumpsum-calc-content" },
        // Left Content
        div({ class: "left-content" },
            h3({ class: "calc-head" }, "Lumpsum SIP Calculator"),
            form({ class: "left-wrapper" },
                createField("investment-number", "Investment Amount (₹)", "500", "1000", "700"),
                createField("expected-rate", "Expected Rate of Return (% p.a.)", "1", "30", "12"),
                createField("invest-period", "Investment period (In years)", "1", "25", "12")
            )
        ),
        // Right Content
        div({ class: "right-content" },
            div({ id: "calculate-chart" }),
            div({ class: "calculated-container" },
                createValueField("invest-amount", "Invested Amount", "2000"),
                createValueField("est-returns", "Estimated Returns", "2000"),
                createValueField("total-amount", "Total Amount", "2000"),
            )
        )
    );
    lumpsumCalc.appendChild(lumpsumCalcContent);


    // Calc Functionality
    const numberInp = document.querySelectorAll(".each-field-top input");
    const rangeInp = document.querySelectorAll(".each-field-bottom input");
    const investAmt = document.getElementById("invest-amount");
    const estReturns = document.getElementById("est-returns");
    const totalAmt = document.getElementById("total-amount");

    function updateFill(range) {
        const min = range.min;
        const max = range.max;
        const val = range.value;
        const getPercentage = ((val - min) / (max - min)) * 100;
        range.style.setProperty("--progress", `${getPercentage}%`);
    };

    function inpRangeSync(e) {
        // numberInp.forEach((numInp, i) => {
        // const range = rangeInp[i];
        const wrapper = e.target.closest(".each-field");
        const numberInput = wrapper.querySelector('input[type="number"]');
        const rangeInput = wrapper.querySelector('input[type="range"]');
        const min = Number(e.target.min);
        const max = Number(e.target.max);
        const val = Number(e.target.value);
        const target = e.target;
        const type = e.target.type;
        if (type == "number") {
            if (min > val || isNaN(val)) {
                rangeInput.value = min;
                target.classList.add("error");
                target.classList.remove("default");
            } else if (max < val) {
                rangeInput.value = max;
                target.classList.add("error");
                target.classList.remove("default");
            } else {
                rangeInput.value = val;
                target.classList.remove("error");
                target.classList.add("default");
            }
        } else {
            numberInput.value = rangeInput.value;
            target.classList.remove("error");
            target.classList.add("default");
        }
    };

    function handleInput(e) {
        // debugger;
        inpRangeSync(e);
        rangeInp.forEach((inp) => {
            updateFill(inp);
        });
    };

    function calculateLumpSum(p, r, n) {
        const calcultedValue = p * Math.pow(1 + r / 100, n);
        const totalInvestment = Math.round(calcultedValue);
        return totalInvestment;
    };

    function renderCalculatedValue() {
        const investAmntInp = Number(
            document.getElementById("investment-number").value
        );
        const expectRtInp = Number(document.getElementById("expected-rate").value);
        const investprdInp = Number(document.getElementById("invest-period").value);
        const result = calculateLumpSum(investAmntInp, expectRtInp, investprdInp);
        investAmt.textContent = investAmntInp;
        estReturns.textContent = result - investAmntInp;
        totalAmt.textContent = result;
    };

    // On load Logic
    rangeInp.forEach((inp, i) => {
        inp.value = numberInp[i].value;
        updateFill(inp);
    });
    renderCalculatedValue();
    piechart(
        Number(investAmt.textContent.replace(/,/g, "")),
        Number(estReturns.textContent.replace(/,/g, ""))
    );

    // Input logic
    numberInp.forEach((ele) => {
        ele.addEventListener("input", function (e) {
            // debugger;
            handleInput(e);
            // rendering logic for number input
            const numMin = Number(e.target.min);
            const numMax = Number(e.target.max);
            const numval = Number(e.target.value);
            if (numval > numMax || numval < numMin) {
                const investMin = Number(
                    document.getElementById("investment-number").min
                );
                const rateMin = Number(document.getElementById("expected-rate").min);
                const periodMin = Number(document.getElementById("invest-period").min);
                const result = calculateLumpSum(investMin, rateMin, periodMin);
                investAmt.textContent = investMin;
                estReturns.textContent = result - investMin;
                totalAmt.textContent = result;
                piechart(
                    Number(investAmt.textContent.replace(/,/g, "")),
                    Number(estReturns.textContent.replace(/,/g, ""))
                );
            } else {
                renderCalculatedValue();
                piechart(
                    Number(investAmt.textContent.replace(/,/g, "")),
                    Number(estReturns.textContent.replace(/,/g, ""))
                );
            }
        });
    });

    // Range Logic
    rangeInp.forEach((ele) => {
        ele.addEventListener("input", function (e) {
            handleInput(e);
            renderCalculatedValue();
            piechart();
            piechart(
                Number(investAmt.textContent.replace(/,/g, "")),
                Number(estReturns.textContent.replace(/,/g, ""))
            );
        });
    });

    // Chart Configuration
    function piechart(invest, estimated) {
        Highcharts.chart("calculate-chart", {
            chart: {
                type: "pie",
                backgroundColor: "transparent",

            },
            title: {
                text: "Lump Sum Investment Breakdown",
                style: {
                    color: "#333",
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
                    return `<b>${this.point.name}</b>: ₹${this.point.y}`;
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
            colors: ["#2b2e8c", "#1f88ce"], // green and orange
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