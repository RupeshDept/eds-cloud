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
    return '₹' + value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
}

export default function decorate(block) {
    const sipAmount = input({ type: 'number', value: 1000, min: 100 });
    const startNowAge = input({ type: 'number', value: 25 });
    const startLaterAge = input({ type: 'number', value: 30 });
    const endAge = input({ type: 'number', value: 35 });
    const rate = input({ type: 'range', min: 1, max: 20, value: 10, step: 0.1 });
    const rateDisplay = span({ class: 'rate-display' }, text(`${rate.value}%`));

    rate.addEventListener('input', () => {
        rateDisplay.textContent = `${rate.value}%`;
    });

    const result = div({ class: 'result' });

    const calculateBtn = button({ class: 'calculate-btn' }, text('CALCULATE'));

    calculateBtn.addEventListener('click', () => {
        const amount = parseFloat(sipAmount.value);
        const ageNow = parseInt(startNowAge.value);
        const ageLater = parseInt(startLaterAge.value);
        const ageEnd = parseInt(endAge.value);
        const r = parseFloat(rate.value);

        const yearsNow = ageEnd - ageNow;
        const yearsLater = ageEnd - ageLater;

        const investNowFV = calculateSIPFV(amount, yearsNow, r);
        const investLaterFV = calculateSIPFV(amount, yearsLater, r);

        const investNowTotal = amount * 12 * yearsNow;
        const investLaterTotal = amount * 12 * yearsLater;

        const wealthNow = investNowFV - investNowTotal;
        const wealthLater = investLaterFV - investLaterTotal;

        const costOfDelay = investNowFV - investLaterFV;

        result.innerHTML = '';
        result.append(
            div(text(`Total Amount Invested (Now): ${formatINR(investNowTotal)}`)),
            div(text(`Final Value (Now): ${formatINR(investNowFV)}`)),
            div(text(`Wealth Created (Now): ${formatINR(wealthNow)}`)),
            br(),
            div(text(`Total Amount Invested (Later): ${formatINR(investLaterTotal)}`)),
            div(text(`Final Value (Later): ${formatINR(investLaterFV)}`)),
            div(text(`Wealth Created (Later): ${formatINR(wealthLater)}`)),
            br(),
            div({ style: 'background: #dff6f1; padding: 10px; border-radius: 5px;' },
                strong(text(`Cost of Delay: ${formatINR(costOfDelay)}`))
            )
        );
    });

    block.append(
        div({ class: 'input-row' }, strong(text('SIP Amount: ')), sipAmount),
        div({ class: 'input-row' }, strong(text('SIP Starting Age (Now): ')), startNowAge),
        div({ class: 'input-row' }, strong(text('SIP Starting Age (Later): ')), startLaterAge),
        div({ class: 'input-row' }, strong(text('SIP Ending Age: ')), endAge),
        div({ class: 'input-row' }, strong(text('Expected Returns: ')), rate, rateDisplay),
        br(),
        calculateBtn,
        br(),
        result
    );
}
