/* eslint-disable */
import {
    div,
    h2,
    label,
    input,
    span,
    button,
    form,
    text,
} from "../../scripts/dom-helpers.js";

export default function decorate(block) {
    const createField = (id, labelText, value = "") => {
        return div({ class: "input-group" },
            label({ for: id }, text(labelText)),
            input({ type: "number", id, value, class: "input", required: true })
        );
    };

    const resultRow = (labelText, id) =>
        div({ class: "result-row" },
            span({ class: "label" }, text(labelText)),
            span({ id, class: "value" }, text("₹0"))
        );

    const formEl = form({ id: "edu-loan-form" },
        createField("loan-amount", "Loan Amount (₹)", 500000),
        createField("interest-rate", "Interest Rate (Annual %)", 8),
        createField("loan-tenure", "Loan Tenure (Years)", 5),
        button({ type: "submit", class: "calculate-btn" }, text("Calculate EMI"))
    );

    const results = div({ class: "results" },
        resultRow("Monthly EMI", "emi"),
        resultRow("Total Interest", "total-interest"),
        resultRow("Total Payment", "total-payment")
    );

    const container = div({ class: "edu-loan-calculator" },
        h2({}, text("Education Loan EMI Calculator")),
        formEl,
        results
    );

    block.textContent = "";
    block.append(container);

    formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const P = parseFloat(document.getElementById("loan-amount").value);
        const annualRate = parseFloat(document.getElementById("interest-rate").value);
        const tenureYears = parseFloat(document.getElementById("loan-tenure").value);

        const N = tenureYears * 12;
        const R = annualRate / 12 / 100;

        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
        const totalPayment = emi * N;
        const totalInterest = totalPayment - P;

        document.getElementById("emi").textContent = "₹" + emi.toFixed(2);
        document.getElementById("total-interest").textContent = "₹" + totalInterest.toFixed(2);
        document.getElementById("total-payment").textContent = "₹" + totalPayment.toFixed(2);
    });
}
