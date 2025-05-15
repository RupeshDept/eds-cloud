/* eslint-disable */

// sip-calculator.js
// import {
//     div, span, button, select, option, input, strong, text, br
// } from '../../scripts/dom-helpers.js';

// export default function decorate(block) {

// }


// import { createTag } from '../../scripts/dom-helpers.js';

// export default function decorate(block) {
//   const container = createTag('div', { class: 'sip-container' });

//   const inputRow = createTag('div', { class: 'sip-inputs' }, `
//     <label>Monthly SIP Amount: <input type="number" id="sip-amount" value="50000" /></label>
//     <label>Duration: 
//       <select id="sip-duration">
//         <option value="5">5 Years</option>
//         <option value="10">10 Years</option>
//         <option value="15">15 Years</option>
//       </select>
//     </label>
//     <label>Expected Return: <input type="number" id="sip-rate" value="13" /></label>
//   `);

//   const resultDiv = createTag('div', { class: 'sip-results' });

//   const tableDiv = createTag('div', { class: 'sip-growth-table' });

//   container.append(inputRow, resultDiv, tableDiv);
//   block.innerHTML = '';
//   block.append(container);

//   // Call your calc function on change
//   container.querySelectorAll('input, select').forEach(el => {
//     el.addEventListener('input', () => calculateSIP(container));
//   });

//   calculateSIP(container);
// }


import {
    div, span, button, select, option, input, strong, text, br
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
    const container = div({ class: 'sip-container' });

    // --- Input Fields ---
    const sipAmountInput = input({ type: 'number', value: 50000, id: 'sip-amount' });
    const durationSelect = select({ id: 'sip-duration' },
        option({ value: 5 }, '5 Years'),
        option({ value: 10 }, '10 Years'),
        option({ value: 15 }, '15 Years'),
        option({ value: 20 }, '20 Years')
    );
    const rateInput = input({ type: 'number', value: 13, id: 'sip-rate' });

    const inputFields = div({ class: 'sip-inputs' },
        div({}, strong('Monthly SIP Amount: '), sipAmountInput),
        div({}, strong('Duration: '), durationSelect),
        div({}, strong('Expected Return (%): '), rateInput)
    );

    // --- Results Display ---
    const resultDisplay = div({ class: 'sip-results' });

    // --- Compounding Table Container ---
    const growthTable = div({ class: 'sip-growth-table' });

    // Append all
    container.append(inputFields, resultDisplay, growthTable);
    block.textContent = '';
    block.append(container);

    // Event Listeners
    [sipAmountInput, durationSelect, rateInput].forEach(el => {
        el.addEventListener('input', () => calculateAndRender(sipAmountInput, durationSelect, rateInput, resultDisplay, growthTable));
    });

    // Initial render
    calculateAndRender(sipAmountInput, durationSelect, rateInput, resultDisplay, growthTable);
}

// --- SIP Calculation Logic ---
function calculateAndRender(sipAmountInput, durationSelect, rateInput, resultDisplay, growthTable) {
    const monthlyAmount = +sipAmountInput.value;
    const years = +durationSelect.value;
    const rate = +rateInput.value;

    const months = years * 12;
    const monthlyRate = rate / 100 / 12;

    const investedAmt = monthlyAmount * months;
    const maturityAmt = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate)) / monthlyRate;

    resultDisplay.innerHTML = '';
    resultDisplay.append(
        div({}, strong('Investment Amt: '), text(`₹${formatAmount(investedAmt)}`)),
        div({}, strong('Estimated Amt: '), text(`₹${formatAmount(maturityAmt)}`))
    );

    renderCompoundingTable(growthTable, investedAmt);
}

// --- Compounding Table Logic ---
function renderCompoundingTable(container, baseAmt) {
    const tableData = [
        { multiplier: 1.4, period: 'in 5yrs' },
        { multiplier: 2, period: 'in 7yrs 9m' },
        { multiplier: 3, period: 'in 10yrs 10m' },
        { multiplier: 5, period: 'in 14yrs 10m' },
        { multiplier: 10, period: 'in 20yrs 2m' }
    ];

    const rows = tableData.map(row =>
        div({ class: 'growth-row' },
            span({}, `₹${formatAmount(baseAmt * row.multiplier)}`),
            span({ class: 'period' }, `(${row.multiplier}X ${row.period})`)
        )
    );

    container.innerHTML = '';
    container.append(...rows);
}

// --- Helper ---
function formatAmount(val) {
    return val.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

