/*eslint-disable*/
import {
    div,
    h1,
    p,
    input,
    label,
    span,
    button,
} from '../../scripts/domhelper.js';

export default async function decorate(block) {
    const retirementCalculator = div(
        { class: "main-Container" },
        div(
            { class: "calc-left" },
            h1({ class: "black-head" }, "Retirement Calculator"),
            div(
                { class: "inputs-container" },
                div(
                    { class: "inp-div" },
                    div({ class: "inputholder" }, label("Current Age (15-60 Years)")),
                    input({
                        id: "ret_CurrentAge",
                        placeholder: "35",
                        type: "number",
                        value: "35",
                    })
                ),
                div(
                    { class: "slid-div" },
                    input({
                        id: "ret_CurrentAge_range",
                        type: "range",
                        min: "15",
                        max: "60",
                        value: "35",
                        class: "range",
                    })
                ),
                div({ id: "reg-error" }, p("error")),
                //* * */
                div(
                    { class: "inp-div" },
                    div(
                        { class: "inputholder" },
                        label("Desired Retirement Age (Upto 70 Years)")
                    ),
                    input({
                        id: "ret_DesiredAge",
                        placeholder: "60",
                        type: "number",
                        value: "60",
                    })
                ),
                div(
                    { class: "slid-div" },
                    input({
                        id: "ret_DesiredAge_range",
                        type: "range",
                        min: "36",
                        max: "70",
                        value: "60",
                        class: "range",
                    })
                ),
                div({ id: "desireage-error" }, p("error")),
                // ***//
                div(
                    { class: "inp-div" },
                    div(
                        { class: "inputholder" },
                        label("Life Expectancy (Upto 100 Years)")
                    ),
                    input({
                        id: "ret_life",
                        placeholder: "80",
                        type: "number",
                        value: "80",
                    })
                ),
                div(
                    { class: "slid-div" },
                    input({
                        id: "ret_life_range",
                        type: "range",
                        min: "19",
                        max: "100",
                        value: "80",
                        class: "range",
                    })
                ),
                div({ id: "retirement-life-error" }, p("error")),

                // **//

                div(
                    { class: "inp-div" },
                    div({ class: "inputholder" }, label("Current Monthly Expenses)")),
                    input({
                        id: "ret_amount",
                        placeholder: "10000",
                        type: "number",
                        min: "1000",
                        value: "10000",
                    })
                ),
                div({ id: "retirement-amount-error" }, p("error")),

                // ** //

                div(
                    { class: "inp-div" },
                    div(
                        { class: "inputholder" },
                        label("Expected Return On Investments Pre(% p.a))   ©")
                    ),
                    input({
                        id: "ret_exp_return",
                        placeholder: "15",
                        type: "number",
                        value: "15",
                    })
                ),
                div(
                    { class: "slid-div" },
                    input({
                        id: "ret_exp_return_range",
                        type: "range",
                        min: "1",
                        max: "36",
                        value: "15",
                        class: "range",
                    })
                ),
                // *** //
                div(
                    { class: "inp-div" },
                    div(
                        { class: "inputholder" },
                        label("Expected Return On Investments Post(% p.a)   ©")
                    ),
                    input({
                        id: "ret_exp_return_post",
                        placeholder: "6",
                        type: "number",
                        value: "6",
                        min: "1",
                        max: "36",
                    })
                ),
                div(
                    { class: "slid-div" },
                    input({
                        id: "ret_exp_return_post_range",
                        type: "range",
                        min: "1",
                        max: "36",
                        value: "6",
                        class: "range",
                    })
                ),
                // *** //
                div(
                    { class: "inp-div" },
                    div(
                        { class: "inputholder" },
                        label("Expected Inflation Rate (% p.a.)    ©")
                    ),
                    input({
                        id: "ret_exp_inflation",
                        placeholder: "6",
                        type: "number",
                        value: "6",
                        min: "1",
                        max: "36",
                    })
                ),

                // ** //
                div(
                    { class: "investbtn-calpage" },
                    div(
                        { class: "inputholder-calc" },
                        div({ class: "getstartedcta" }, p("Invest Now"))
                    )
                )
            )
        ),
        div(
            { class: "calc-right" },

            div(
                { class: "right-first-txt" },
                p(
                    { class: "calc-info-para" },
                    span({ id: "right-first-txt-span" }, "₹5,15,024"),
                    "Annual Expenses at retirement"
                )
            ),

            // ** //
            div(
                { class: "right-second-txt" },
                p(
                    { class: "calc-info-para" },
                    "Amount required for retirement",
                    span({ id: "right-second-txt-span" }, "₹1,03,00,480")
                )
            ),

            // ** //
            div(
                { class: "right-third-txt" },
                p(
                    { class: "calc-info-para" },
                    "Monthly SIP required",
                    span({ id: "right-third-txt-span" }, "₹3,176")
                )
            )
        ),
        button({ id: "reset-calculator" }, "Reset Calculator ◎")
    );
    block.append(retirementCalculator);

    // calculator logic 

    const updateSliderBackground = async (slider) => {
        /* eslint-disable no-console */
        const value =
            ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty("--value", `${value}%`);
    };

    function calculateRetirement() {
        let currAge = parseFloat(block.querySelector("#ret_CurrentAge").value) || 0;
        let desireage =
            parseFloat(block.querySelector("#ret_DesiredAge").value) || 0;
        let monthlyInvest =
            parseFloat(block.querySelector("#ret_amount").value) || 0;
        let yearlyInvestment = monthlyInvest * 12 || 0;
        // eslint-disable-next-line no-console
        let expectedPostReturn =
            parseFloat(block.querySelector("#ret_exp_return_post").value) || 0;
        let ratePer =
            parseFloat(block.querySelector("#ret_exp_inflation").value) || 0;
        let expectedReturn =
            parseFloat(block.querySelector("#ret_exp_return").value) || 0;
        let lifeExpectancy =
            parseFloat(block.querySelector("#ret_life").value) || 0; // 100; // Life expectancy set to 100 years
        block.querySelector("#ret_exp_return_range").textContent = expectedReturn;
        block.querySelector("#ret_exp_return_post_range").textContent =
            expectedPostReturn;
        // Years until retirement

        if (currAge > Number(desireage)) {
            block.querySelector("#desireage-error").innerHTML =
                "Your Desired Retirement Age Should Be Greater Than Current Age";
        } else if (
            block.querySelector("#ret_DesiredAge").value < "36" ||
            Number(desireage) < "36"
        ) {
            block.querySelector("#desireage-error").innerHTML =
                "Please enter Desired Retirement Age between 36 and 70 years.";
        } else if (currAge < Number(desireage)) {
            block.querySelector("#desireage-error").innerHTML = "";
        }
        if (block.querySelector("#ret_CurrentAge").value < 15) {
            block.querySelector("#reg-error").innerHTML =
                "Please enter Current Age between 15 and 60 years.";
        } else if (
            block.querySelector("#ret_CurrentAge").value === "NaN" ||
            block.querySelector("#ret_CurrentAge").value < 15
        ) {
            block.querySelector("#reg-error").innerHTML =
                "Please enter Current Age between 15 and 60 years.";
            block.querySelector("#ret_CurrentAge").value = 30;
            block.querySelector("#ret_CurrentAge_range").value = 30;
        } else if (
            block.querySelector("#ret_CurrentAge").value === "" ||
            block.querySelector("#ret_CurrentAge_range").value >= 15
        ) {
            block.querySelector("#reg-error").innerHTML = "";
        }
        block.addEventListener("click", () => {
            if (
                lifeExpectancy < 19 ||
                block.querySelector("#ret_DesiredAge").value <= 35 ||
                expectedReturn < 1 ||
                lifeExpectancy < 1 ||
                ratePer <= 5 ||
                expectedPostReturn < 1
            ) {
                if (
                    block.querySelector("#ret_CurrentAge").value === "" ||
                    block.querySelector("#ret_life").value <= 0 ||
                    block.querySelector("#ret_amount").value <= 0 ||
                    expectedReturn < 1 ||
                    desireage <= 35 ||
                    block.querySelector("#ret_exp_return_post").value < 1 ||
                    block.querySelector("#ret_exp_inflation").value <= 5
                ) {
                    currAge = 30;
                    yearlyInvestment = 10000;
                    block.querySelector("#ret_DesiredAge").value = 60;
                    block.querySelector("#ret_life").value = 80;
                    lifeExpectancy = 80;
                    block.querySelector("#ret_exp_inflation").value = 6;
                    ratePer = 6;
                    expectedReturn = 8;
                    expectedPostReturn = 6;
                    block.querySelector("#ret_exp_return_post").value = 6;
                    block.querySelector("#ret_exp_inflation").value = 6;
                    //   resetRetCalc();
                    resetCalculator();
                }
            }
        });
        if (
            block.querySelector("#ret_life").value <= 18 ||
            lifeExpectancy < 19 ||
            lifeExpectancy <= 1
        ) {
            block.querySelector("#retirement-life-error").innerHTML =
                "Years Range allowed between 19 to 100";
        } else {
            block.querySelector("#retirement-life-error").innerHTML = "";
        }
        if (
            block.querySelector("#ret_CurrentAge").value > 60 ||
            block.querySelector("#ret_DesiredAge").value > 70 ||
            block.querySelector("#ret_exp_inflation").value > 20 ||
            block.querySelector("#ret_exp_return").value > 36
        ) {
            currAge = 30;
            yearlyInvestment = 10000;
            desireage = 60;
            block.querySelector("#ret_exp_inflation").value = 6;
            ratePer = 7;
            block.querySelector("#ret_exp_return").value = 15;
            //   resetRetCalc();
            resetCalculator();
        }

        if (
            block.querySelector("#ret_amount").value === "" ||
            monthlyInvest < 1000
        ) {
            block.querySelector("#retirement-amount-error").innerHTML =
                "Minimum value allowed is 1000";
        } else if (monthlyInvest >= 10000000) {
            block.querySelector("#ret_amount").value = 10000;
            monthlyInvest = 10000;
            yearlyInvestment = 120000;
            block.querySelector("#retirement-amount-error").innerHTML =
                "Maximum value allowed is 10,00,000";
            //   resetRetCalc();
            resetCalculator();
            // eslint-disable-next-line no-console
        } else if (block.querySelector("#ret_amount").value !== "") {
            block.querySelector("#retirement-amount-error").innerHTML = "";
        }

        if (block.querySelector("#ret_life").value > 100) {
            block.querySelector("#ret_life").value = 80;
            block.querySelector("#ret_life_range").value = 80; // 1
        }

        const yearsuntilRetirement = desireage - currAge;
        const retirementYears = lifeExpectancy - desireage;
        const firstData = Math.round(
            yearlyInvestment * (1 + ratePer / 100) ** yearsuntilRetirement
        );
        // b =retirementYears
        // parseFloat(block.getElementById('ret_exp_return_post').value) || 0;
        const m =
            parseFloat(block.querySelector("#ret_exp_return_post").value) || 0;

        const p = 0;
        const P = 100 * ((1 + m / 100) / (1 + ratePer / 100) - 1);
        const w = Math.round(
            yearlyInvestment * (1 + ratePer / 100) ** yearsuntilRetirement
        );
        const A = p * (1 + expectedReturn / 100) ** yearsuntilRetirement;
        const h = P / 100;
        const g =
            h === 0
                ? w * retirementYears
                : -((1 - (1 + h) ** retirementYears) / h) *
                (w / (1 + h) ** retirementYears);

        const y = Math.round(g - A);

        // , y = Math.round(h - A)
        const sec = y > 0 ? y : 0;
        const M = (1 + expectedReturn / 1200) ** (12 * yearsuntilRetirement);
        const third = Math.round((sec * expectedReturn) / 1200 / (M - 1));

        // Math.round((sec * expectedReturn) / (1200 * (M - 1)));
        let annualExp = "";
        let amountRet = "";
        let monthlySip = "";
        if (Number.isFinite(firstData)) {
            annualExp = `₹${firstData.toLocaleString("en-IN")}`;
        }

        if (Number.isFinite(sec)) {
            amountRet = `₹${sec.toLocaleString("en-IN")}`;
        }

        if (Number.isFinite(third)) {
            monthlySip = `₹${third.toLocaleString("en-IN")}`;
        }

        block.querySelector("#right-first-txt-span").innerHTML = `
    <p>${annualExp}</p>
  `;
        block.querySelector("#right-second-txt-span").innerHTML = `
    <p>${amountRet}</p>
  `;
        block.querySelector("#right-third-txt-span").innerHTML = `
    <p>${monthlySip}</p>
  `;

        const allRanges = block.querySelectorAll(".range");
        allRanges.forEach((range) => {
            updateSliderBackground(range);
        });
    }

    // ========== Link Sliders ==========
    function linkRangeToInput(inputId, rangeId) {
        const input = block.querySelector("#" + inputId);
        const range = block.querySelector("#" + rangeId);
        input.addEventListener("input", () => {
            range.value = input.value;
            calculateRetirement();
        });
        range.addEventListener("input", () => {
            input.value = range.value;
            calculateRetirement();
        });
    }

    linkRangeToInput("ret_CurrentAge", "ret_CurrentAge_range");
    linkRangeToInput("ret_DesiredAge", "ret_DesiredAge_range");
    linkRangeToInput("ret_life", "ret_life_range");
    linkRangeToInput("ret_exp_return", "ret_exp_return_range");
    linkRangeToInput("ret_exp_return_post", "ret_exp_return_post_range");

    ["ret_amount", "ret_exp_inflation"].forEach((id) => {
        block.querySelector("#" + id).addEventListener("input", function () {
            calculateRetirement();
        });
    });

    calculateRetirement();

    function resetCalculator() {
        const defaults = {
            ret_CurrentAge: 35,
            ret_DesiredAge: 60,
            ret_life: 80,
            ret_amount: 10000,
            ret_exp_return: 15,
            ret_exp_return_post: 6,
            ret_exp_inflation: 6,
        };

        // Loop through defaults and reset inputs + sliders
        Object.entries(defaults).forEach(([id, value]) => {
            const input = block.querySelector("#" + id);
            const range = block.querySelector(`${"#" + id}_range`);
            if (input) input.value = value;
            if (range) range.value = value;
        });

        // Recalculate using default values
        calculateRetirement();
    }

    // Add event listener to reset button
    block
        .querySelector("#reset-calculator")
        .addEventListener("click", resetCalculator);
}





// my logic


//

// ========== Validation Helper ==========
//  function validateField(id, errorId, min, max) {
//   const inputEl = block.getElementById(id);
//   const errorEl = block.getElementById(errorId)?.querySelector("p");

//   if (!inputEl || !errorEl) return false;

//   const value = parseFloat(inputEl.value);

//   if (isNaN(value)) {
//     errorEl.innerText = "This field is required.";
//     errorEl.style.display = "block";
//     return false;
//   }

//   if (value < min || value > max) {
//     errorEl.innerText = `Please enter a value between ${min} and ${max}.`;
//     errorEl.style.display = "block";
//     return false;
//   }

//   errorEl.innerText = "";
//   errorEl.style.display = "none";
//   return true;
// }

// ========== Main Calculation ==========
//   function calculateRetirement() {
//     const validations = [
//       validateField("ret_CurrentAge", "reg-error", 15, 60),
//       validateField("ret_DesiredAge", "desireage-error", 36, 70),
//       validateField("ret_life", "retirement-life-error", 19, 100),
//       validateField("ret_amount", "retirement-amount-error", 1000, Infinity),
//     ];
//     if (validations.includes(false)) return;

//     const currentAge = parseInt(block.getElementById("ret_CurrentAge").value);
//     const desiredAge = parseInt(block.getElementById("ret_DesiredAge").value);
//     const lifeExpectancy = parseInt(block.getElementById("ret_life").value);
//     const currentExpenses = parseFloat(block.getElementById("ret_amount").value);
//     const preReturn = parseFloat(block.getElementById("ret_exp_return").value) / 100;
//     const postReturn = parseFloat(block.getElementById("ret_exp_return_post").value) / 100;
//     const inflation = parseFloat(block.getElementById("ret_exp_inflation").value) / 100;

//     const yearsToRetirement = desiredAge - currentAge;
//     const yearsOfRetirement = lifeExpectancy - desiredAge;
//     const futureExpenses = currentExpenses * Math.pow(1 + inflation, yearsToRetirement);
//     const amountRequired =
//       futureExpenses * ((1 - Math.pow(1 + postReturn, -yearsOfRetirement)) / postReturn);
//     const monthlySIP =
//       (amountRequired * preReturn) /
//       (Math.pow(1 + preReturn, yearsToRetirement) - 1);

//     block.getElementById("right-first-txt-span").innerText =
//       "₹" + Math.round(futureExpenses * 12).toLocaleString("en-IN");

//     block.getElementById("right-second-txt-span").innerText =
//       "₹" + Math.round(amountRequired).toLocaleString("en-IN");

//     block.getElementById("right-third-txt-span").innerText =
//       "₹" + Math.round(monthlySIP).toLocaleString("en-IN");
//   }

