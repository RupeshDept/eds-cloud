/*eslint-disable*/

import { div, input, label, button, select, option } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
    block.innerHTML = ''; // clear block

    const sipAmountInput = input({ type: 'number', value: 10000, placeholder: 'Enter SIP amount' });
    const schemeInput = input({ type: 'text', placeholder: 'Search Scheme' });

    const durationSelect = select({},
        option({ value: '1' }, '1 Year'),
        option({ value: '3', selected: true }, '3 Years'),
        option({ value: 'since' }, 'Since Inception')
    );

    const calculateBtn = button({ class: 'calculate-btn' }, 'Calculate');

    const resultBox = div({ class: 'sip-result' });

    calculateBtn.addEventListener('click', () => {
        const sip = parseInt(sipAmountInput.value, 10);
        const duration = parseInt(durationSelect.value, 10);
        const invested = sip * 12 * duration;
        const cagr = 7.05 / 100;
        const futureValue = invested * (Math.pow(1 + cagr / 12, 12 * duration));
        const returns = futureValue - invested;

        resultBox.innerHTML = `
      <p>Invested: ₹${invested.toLocaleString()}</p>
      <p>Returns: ₹${Math.round(returns).toLocaleString()}</p>
      <p>Total: ₹${Math.round(futureValue).toLocaleString()}</p>
    `;
    });

    block.append(
        label({}, 'SIP Amount:'), sipAmountInput,
        label({}, 'Scheme:'), schemeInput,
        label({}, 'Duration:'), durationSelect,
        calculateBtn,
        resultBox
    );
}
