/* eslint-disable */

import {
    div,
    h3,
    form,
    label,
    input,
    span,
    text,
} from "../../scripts/dom-helpers.js";

export default function decorate(block) {
    const createField = (id, labelText, min, max, value) => {
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
    };

    const createResultField = (labelText, id, value) =>
        div(
            { class: "result-field" },
            span({ class: "result-label" }, labelText),
            span({ class: "result-value", id }, value)
        );

    const container = document.querySelector(".calculator-home-loan");

    const fields = [
        ["loan-amount", "Loan amount", 100000, 50000000, 1000000],
        ["interest-rate", "Rate of interest (p.a)", 1, 15, 6.5],
        ["loan-tenure", "Loan tenure (Years)", 1, 30, 5],
    ];

    const fieldElements = fields.map(([id, label, min, max, value]) =>
        createField(id, label, min, max, value)
    );

    const layout = div(
        { class: "home-loan-calc-content" },
        div(
            { class: "left-content" },
            h3({ class: "calc-head" }, "Home Loan EMI Calculator"),
            form({ class: "form-wrapper" }, ...fieldElements)
        ),
        div(
            { class: "right-content" },
            div({ id: "home-loan-chart" }),
            div(
                { class: "results-summary" },
                createResultField("Monthly EMI", "emi-value", "0"),
                createResultField("Principal amount", "principal-value", "0"),
                createResultField("Total interest", "interest-value", "0"),
                createResultField("Total amount", "total-value", "0")
            )
        )
    );

    container.append(layout);

    const numberInputs = container.querySelectorAll(".each-field-top input[type='number']");
    const rangeInputs = container.querySelectorAll(".each-field-bottom input[type='range']");

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

    function calculateEMI(P, R, N) {
        const r = R / (12 * 100);
        const n = N * 12;
        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        return {
            emi,
            principal: P,
            interest: totalInterest,
            total: totalPayment,
        };
    }

    function updateResults() {
        const P = Number(document.getElementById("loan-amount").value);
        const R = Number(document.getElementById("interest-rate").value);
        const N = Number(document.getElementById("loan-tenure").value);

        const result = calculateEMI(P, R, N);

        document.getElementById("emi-value").textContent = `₹${result.emi.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        })}`;
        document.getElementById("principal-value").textContent = `₹${result.principal.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        })}`;
        document.getElementById("interest-value").textContent = `₹${result.interest.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        })}`;
        document.getElementById("total-value").textContent = `₹${result.total.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        })}`;

        piechart(result.principal, result.interest);
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

    function piechart(principal, interest) {
        Highcharts.chart("home-loan-chart", {
            chart: {
                width: 450,
                type: "pie",
                backgroundColor: "transparent",
            },
            credits: { enabled: false },
            title: { text: "" },
            tooltip: {
                pointFormat: '<b>{point.name}</b>: ₹{point.y:,.0f}'
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
                    dataLabels: { enabled: false },
                    borderWidth: 1,
                    borderColor: "#fff",
                },
            },
            colors: ["#e0e4ff", "#3d5afe"],
            series: [
                {
                    name: "Amount",
                    colorByPoint: true,
                    data: [
                        { name: "Principal amount", y: principal },
                        { name: "Interest amount", y: interest },
                    ],
                },
            ],
        });
    }
}
