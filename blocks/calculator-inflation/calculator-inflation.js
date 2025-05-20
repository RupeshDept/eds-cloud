/* eslint-disable */

// inflation-calculator.js
import {
    div,
    label,
    input,
    p,
    button,
    span,
    h2
} from "../../scripts/dom-helpers.js";

export default function decorate(block) {
    block.innerHTML = "";

    const inputGroup = (labelText, type, className, value) =>
        div({ class: "input-group" },
            label({}, labelText),
            input({
                type,
                class: className,
                value,
                oninput: handleInputChange,
            })
        );

    const sliderGroup = (className, value, min, max) =>
        div({ class: "slider-group" },
            input({
                type: "range",
                class: className,
                min,
                max,
                value,
                oninput: handleSliderChange,
            })
        );

    block.append(
        div({ class: "inflation-calculator" },
            div({ class: "inputs-section" },
                h2({ class: "heading" }, "Inflation Calculator"),
                inputGroup("Current Cost (₹)", "number", "current-cost", "10000"),
                inputGroup("Inflation rate (% p.a.)", "number", "inflation-rate", "5"),
                sliderGroup("inflation-slider", 5, 1, 30),
                inputGroup("Investment period (in years)", "number", "years", "25"),
                sliderGroup("years-slider", 25, 1, 25),
                button({ class: "calculate-btn" }, "INVEST NOW")
            ),
            div({ class: "result-section" },
                p({}, "Number of Years: ", span({ class: "years-display" }, "25")),
                div({ class: "circle-chart" },
                    div({ class: "donut" }),
                    p({ class: "future-cost" }, "Future Cost ₹33,864")
                ),
                div({ class: "cost-info" },
                    p({}, "Current Cost ₹", span({ class: "curr-cost" }, "10000")),
                    p({}, "Cost Increase (per annum) ₹", span({ class: "increase" }, "23864"))
                )
            )
        )
    );

    calculateInflation();
}

function handleInputChange(e) {
    const className = e.target.className;
    if (className === "inflation-rate") {
        document.querySelector(".inflation-slider").value = e.target.value;
    } else if (className === "years") {
        document.querySelector(".years-slider").value = e.target.value;
    }
    calculateInflation();
}

function handleSliderChange(e) {
    const className = e.target.className;
    if (className === "inflation-slider") {
        document.querySelector(".inflation-rate").value = e.target.value;
    } else if (className === "years-slider") {
        document.querySelector(".years").value = e.target.value;
    }
    calculateInflation();
}

function calculateInflation() {
    const cost = parseFloat(document.querySelector(".current-cost").value) || 0;
    const rate = parseFloat(document.querySelector(".inflation-rate").value) || 0;
    const years = parseInt(document.querySelector(".years").value) || 0;

    const futureCost = cost * Math.pow(1 + rate / 100, years);
    const increase = futureCost - cost;

    document.querySelector(".future-cost").textContent = `Future Cost ₹${Math.round(futureCost).toLocaleString()}`;
    document.querySelector(".curr-cost").textContent = cost.toLocaleString();
    document.querySelector(".increase").textContent = Math.round(increase).toLocaleString();
    document.querySelector(".years-display").textContent = years;

    updateDonut(cost, increase);
}

function updateDonut(current, increase) {
    const total = current + increase;
    const percent = (increase / total) * 100;
    const donut = document.querySelector(".donut");
    donut.style.background = `conic-gradient(#2b9fd9 ${percent}%, #332f80 0)`;
}