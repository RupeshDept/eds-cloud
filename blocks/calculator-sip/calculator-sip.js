/* eslint-disable */

// import {
//   div,
//   label,
//   input,
//   select,
//   option,
//   p,
//   br,
// } from "../../scripts/dom-helper.js";
// export default function decorate(block) {
//   const yearsOptions = [1, 3, 5, 10, 15];
//   const returnRates = Array.from({ length: 13 }, (_, i) => i + 1);
//   const inflationYears = Array.from({ length: 25 }, (_, i) => i + 1);
//   const counter = [];
//   for (let index = 1; index <= 13; index++) {
//     counter.push(index);
//   }
//   block.append(
//     div(
//       { class: "mainDiv" },
//       div(
//         { class: "amount-div commonclass" },
//         label("Your Monthly SIP Amount"),
//         br(),
//         input({
//           type: "text",
//           value: "5000",
//           class: "amount",
//           onchange: calculateSIP,
//         })
//       ),
//       div(
//         { class: "year-div commonclass" },
//         label("Duration"),
//         br(),
//         select(
//           { class: "years", onchange: calculateSIP },
//           ...yearsOptions.map((year) => {
//             return option({ value: year }, year + " year");
//           })
//         )
//       ),
//       div(
//         { class: "commonclass" },
//         p({ class: "resulatinvestamut" }, "Investment Amt", br(), "60000.00")
//       ),
//       div(
//         { class: "rate-div2 commonclass" },
//         div(
//           { class: "rate-div" },
//           label("Expected Annual Return"),
//           select(
//             { class: "returnRate", onchange: calculateSIP },
//             ...counter.map((element) => {
//               return option({ value: element }, element + " %");
//             })
//           )
//         ),
//         p({ class: "displayestimateamt" }, "60326.00")
//       )
//       //div({ class: "result-div commonclass" }, p({ class: "result" })),
//       //button({ onclick: calculateSIP }, "Calculate")
//     ),

//     div(
//       { class: "mainDiv inflation-calculator" },
//       p("Inflation Impact Calculator"),
//       div(
//         { class: "commonclass" },
//         label("Current Cost"),
//         br(),
//         input({
//           type: "text",
//           value: "1000",
//           class: "current-cost",
//           onchange: calculateInflation,
//         })
//       ),
//       div(
//         { class: "commonclass" },
//         label("Inflation Rate (%)"),
//         br(),
//         input({
//           type: "text",
//           value: "6",
//           class: "inflation-rate",
//           onchange: calculateInflation,
//         })
//       ),
//       div(
//         { class: "commonclass" },
//         label("Years"),
//         br(),
//         select(
//           { class: "inflation-years", onchange: calculateInflation },
//           ...inflationYears.map((year) =>
//             option({ value: year }, `${year} years`)
//           )
//         )
//       ),
//       div(
//         { class: "commonclass" },
//         p({ class: "inflation-result" }, "Future Cost: ₹ 0")
//       )
//     )
//   );
// }
// function calculateSIP() {
//   var amount = parseFloat(document.getElementsByClassName("amount")[0].value);
//   var years = parseInt(document.getElementsByClassName("years")[0].value);
//   var returnRate = parseFloat(
//     document.getElementsByClassName("returnRate")[0].value
//   );

//   if (isNaN(amount) || isNaN(years) || isNaN(returnRate)) {
//     document.getElementById("result").innerHTML = "Please enter valid values.";
//     return;
//   }

//   var months = years * 12;
//   var monthlyRate = returnRate / 12 / 100;

//   var futureValue =
//     amount *
//     (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
//       (1 + monthlyRate));
//   var invested = amount * months;
//   // var gainPercent = ((futureValue - invested) / invested) * 100;
//   document.getElementsByClassName("resulatinvestamut")[0].innerHTML =
//     "Investment Amt" + "<br>" + invested.toFixed();
//   document.getElementsByClassName("displayestimateamt")[0].innerHTML =
//     futureValue.toFixed();
//   //   document.getElementsByClassName("result")[0].innerHTML =
//   //     "Invested Amount: ₹" +
//   //     invested.toFixed(2) +
//   //     "<br>" +
//   //     "Estimated Amount: ₹" +
//   //     futureValue.toFixed(2) +
//   //     "<br>" +
//   //     "Returns: " +
//   //     gainPercent.toFixed(2) +
//   //     "%";
// }

// function calculateInflation() {
//   const cost = parseFloat(document.querySelector(".current-cost").value);
//   const rate = parseFloat(document.querySelector(".inflation-rate").value);
//   const years = parseInt(document.querySelector(".inflation-years").value);

//   if (isNaN(cost) || isNaN(rate) || isNaN(years)) return;

//   const futureCost = cost * Math.pow(1 + rate / 100, years);
//   document.querySelector(".inflation-result").innerHTML =
//     "Future Cost: ₹ " + futureCost.toFixed(2);
// }

// inflation-calculator.js
import {
    div,
    label,
    input,
    p,
    button,
    span,
} from "../../scripts/dom-helper.js";

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
                p({ class: "heading" }, "Inflation Calculator"),
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