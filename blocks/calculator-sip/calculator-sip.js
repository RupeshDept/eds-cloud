/* eslint-disable */

import {
    div,
    label,
    input,
    select,
    option,
    p,
    br,
} from "../../scripts/dom-helper.js";
export default function decorate(block) {
    const yearsOptions = [1, 3, 5, 10, 15];
    const returnRates = Array.from({ length: 13 }, (_, i) => i + 1);
    const inflationYears = Array.from({ length: 25 }, (_, i) => i + 1);
    const counter = [];
    for (let index = 1; index <= 13; index++) {
        counter.push(index);
    }
    block.append(
        div(
            { class: "mainDiv" },
            div(
                { class: "amount-div commonclass" },
                label("Your Monthly SIP Amount"),
                br(),
                input({
                    type: "text",
                    value: "5000",
                    class: "amount",
                    onchange: calculateSIP,
                })
            ),
            div(
                { class: "year-div commonclass" },
                label("Duration"),
                br(),
                select(
                    { class: "years", onchange: calculateSIP },
                    ...yearsOptions.map((year) => {
                        return option({ value: year }, year + " year");
                    })
                )
            ),
            div(
                { class: "commonclass" },
                p({ class: "resulatinvestamut" }, "Investment Amt", br(), "60000.00")
            ),
            div(
                { class: "rate-div2 commonclass" },
                div(
                    { class: "rate-div" },
                    label("Expected Annual Return"),
                    select(
                        { class: "returnRate", onchange: calculateSIP },
                        ...counter.map((element) => {
                            return option({ value: element }, element + " %");
                        })
                    )
                ),
                p({ class: "displayestimateamt" }, "60326.00")
            )
            //div({ class: "result-div commonclass" }, p({ class: "result" })),
            //button({ onclick: calculateSIP }, "Calculate")
        ),

        div(
            { class: "mainDiv inflation-calculator" },
            p("Inflation Impact Calculator"),
            div(
                { class: "commonclass" },
                label("Current Cost"),
                br(),
                input({
                    type: "text",
                    value: "1000",
                    class: "current-cost",
                    onchange: calculateInflation,
                })
            ),
            div(
                { class: "commonclass" },
                label("Inflation Rate (%)"),
                br(),
                input({
                    type: "text",
                    value: "6",
                    class: "inflation-rate",
                    onchange: calculateInflation,
                })
            ),
            div(
                { class: "commonclass" },
                label("Years"),
                br(),
                select(
                    { class: "inflation-years", onchange: calculateInflation },
                    ...inflationYears.map((year) =>
                        option({ value: year }, `${year} years`)
                    )
                )
            ),
            div(
                { class: "commonclass" },
                p({ class: "inflation-result" }, "Future Cost: ₹ 0")
            )
        )
    );
}
function calculateSIP() {
    var amount = parseFloat(document.getElementsByClassName("amount")[0].value);
    var years = parseInt(document.getElementsByClassName("years")[0].value);
    var returnRate = parseFloat(
        document.getElementsByClassName("returnRate")[0].value
    );

    if (isNaN(amount) || isNaN(years) || isNaN(returnRate)) {
        document.getElementById("result").innerHTML = "Please enter valid values.";
        return;
    }

    var months = years * 12;
    var monthlyRate = returnRate / 12 / 100;

    var futureValue =
        amount *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate));
    var invested = amount * months;
    // var gainPercent = ((futureValue - invested) / invested) * 100;
    document.getElementsByClassName("resulatinvestamut")[0].innerHTML =
        "Investment Amt" + "<br>" + invested.toFixed();
    document.getElementsByClassName("displayestimateamt")[0].innerHTML =
        futureValue.toFixed();
    //   document.getElementsByClassName("result")[0].innerHTML =
    //     "Invested Amount: ₹" +
    //     invested.toFixed(2) +
    //     "<br>" +
    //     "Estimated Amount: ₹" +
    //     futureValue.toFixed(2) +
    //     "<br>" +
    //     "Returns: " +
    //     gainPercent.toFixed(2) +
    //     "%";
}

function calculateInflation() {
    const cost = parseFloat(document.querySelector(".current-cost").value);
    const rate = parseFloat(document.querySelector(".inflation-rate").value);
    const years = parseInt(document.querySelector(".inflation-years").value);

    if (isNaN(cost) || isNaN(rate) || isNaN(years)) return;

    const futureCost = cost * Math.pow(1 + rate / 100, years);
    document.querySelector(".inflation-result").innerHTML =
        "Future Cost: ₹ " + futureCost.toFixed(2);
}

