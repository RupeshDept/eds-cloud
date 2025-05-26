/* eslint-disable */
import {
    div, span, input, strong, button, text, br
} from '../../scripts/dom-helpers.js';

function calculateSIPFV(monthlyAmount, years, rate) {
    const months = years * 12;
    const r = rate / 12 / 100;
    return monthlyAmount * (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
}

function formatINR(value) {
    if (isNaN(value)) return '₹0.00';
    const formatted = value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    const inLakh = value >= 100000 ? `${(value / 100000).toFixed(2)} Lacs` : formatted;
    return `₹${inLakh}`;
}

export default function decorate(block) {
    // Create inputs
    const sipAmountNow = input({ type: 'number', value: 1000, min: 100 });
    const sipAmountLater = input({ type: 'number', value: 1000, min: 100 });
    const startAgeNow = input({ type: 'number', value: 25, min: 1 });
    const startAgeLater = input({ type: 'number', value: 30, min: 1 });
    const endAgeNow = input({ type: 'number', value: 35, min: 1 });
    const endAgeLater = input({ type: 'number', value: 35, min: 1 });
    const expectedReturnNow = input({ type: 'number', value: 11, min: 1, max: 20, step: 0.1 });
    const expectedReturnLater = input({ type: 'number', value: 11, min: 1, max: 20, step: 0.1 });

    const result = div({ class: 'result' });
    const calculateBtn = button({ class: 'calculate-btn' }, text('CALCULATE'));

    // Headings for Invest Now / Invest Later columns
    // const investNowHeading = div({ class: 'column-header' }, strong(text('Invest Now')));
    // const investLaterHeading = div({ class: 'column-header' }, strong(text('Invest Later')));
    const investNowHeading = strong(text('Invest Now'));
    const investLaterHeading = strong(text('Invest Later'));


    // Helper to create a labeled row with two columns (Now and Later)
    // We'll prepend the headers as the first row
    const createRow = (label, nowInputOrText, laterInputOrText) =>
        div({ class: 'table-row' },
            div({ class: 'label-cell' }, text(label)),
            div({ class: 'value-cell' }, nowInputOrText),
            div({ class: 'value-cell' }, laterInputOrText),
        );

    // Calculation & result update
    const updateResult = () => {
        const amountNow = parseFloat(sipAmountNow.value);
        const amountLater = parseFloat(sipAmountLater.value);
        const ageNow = parseInt(startAgeNow.value);
        const ageLater = parseInt(startAgeLater.value);
        const ageEndNow = parseInt(endAgeNow.value);
        const ageEndLater = parseInt(endAgeLater.value);
        const rNow = parseFloat(expectedReturnNow.value);
        const rLater = parseFloat(expectedReturnLater.value);

        const yearsNow = ageEndNow - ageNow;
        const yearsLater = ageEndLater - ageLater;

        // Validate year values (prevent negative or zero years)
        if (yearsNow <= 0 || yearsLater <= 0) {
            result.innerHTML = '<div class="error">Ending age must be greater than starting age.</div>';
            return;
        }

        const fvNow = calculateSIPFV(amountNow, yearsNow, rNow);
        const fvLater = calculateSIPFV(amountLater, yearsLater, rLater);

        const totalNow = amountNow * 12 * yearsNow;
        const totalLater = amountLater * 12 * yearsLater;

        const wealthNow = fvNow - totalNow;
        const wealthLater = fvLater - totalLater;

        const costOfDelay = fvNow - fvLater;

        result.innerHTML = '';
        result.append(
            createRow('SIP Starting Age', text(ageNow), text(ageLater)),
            createRow('SIP Amount (Monthly)', text(formatINR(amountNow)), text(formatINR(amountLater))),
            createRow('Expected Returns (%)', text(rNow.toFixed(2)), text(rLater.toFixed(2))),
            createRow('SIP Ending Age', text(ageEndNow), text(ageEndLater)),
            createRow('Total Years Invested', text(`${yearsNow} Years`), text(`${yearsLater} Years`)),
            createRow('Total Amount Invested', text(formatINR(totalNow)), text(formatINR(totalLater))),
            createRow('Final Value of Your Investment', text(formatINR(fvNow)), text(formatINR(fvLater))),
            createRow('Wealth Creation', text(formatINR(wealthNow)), text(formatINR(wealthLater))),
            div({ class: 'cost-box' }, strong(text(`Cost of Delay: ${formatINR(costOfDelay)}`)))
        );
    };

    calculateBtn.addEventListener('click', updateResult);

    // Initial render of result with default inputs
    updateResult();


    // Build input rows for user to adjust parameters before results
    // Add the headers row before other input rows:
    const inputsTable = div({ class: 'inputs-table' },
        div({ class: 'table-row headers-row' },
            div({ class: 'label-cell' }, text('')), // empty label cell
            div({ class: 'value-cell' }, investNowHeading),
            div({ class: 'value-cell' }, investLaterHeading)
        ),
        createRow('SIP Starting Age', startAgeNow, startAgeLater),
        createRow('SIP Amount (Monthly)', sipAmountNow, sipAmountLater),
        createRow('Expected Returns (%)', expectedReturnNow, expectedReturnLater),
        createRow('SIP Ending Age', endAgeNow, endAgeLater),
    );

    // Sync SIP Amount (Monthly) inputs
    // When one changes, update the other to match
    sipAmountNow.addEventListener('input', () => {
        if (sipAmountLater.value !== sipAmountNow.value) {
            sipAmountLater.value = sipAmountNow.value;
            updateResult();
        }
    });

    sipAmountLater.addEventListener('input', () => {
        if (sipAmountNow.value !== sipAmountLater.value) {
            sipAmountNow.value = sipAmountLater.value;
            updateResult();
        }
    });

    // Append inputs table, result area and calculate button to main block
    block.append(
        inputsTable,
        div({ class: 'btn-wrapper' }, calculateBtn),
        result
    );

    // Auto-calculate on input changes for better UX
    [
        sipAmountNow, sipAmountLater,
        startAgeNow, startAgeLater,
        endAgeNow, endAgeLater,
        expectedReturnNow, expectedReturnLater
    ].forEach(inp => inp.addEventListener('input', updateResult));
}
