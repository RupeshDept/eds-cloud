/*eslint-disable*/
// div({ class: 'calculator-past-performance' }, 'SIP Past Performance Calculator'),


import {
    div,
    input,
    label,
    button,
    select,
    option,
    span,
    p,
    h2,
} from '../../scripts/dom-helpers.js';

function formatCurrency(value) {
    return `₹${Math.round(value).toLocaleString()}`;
}

function calculateSIP(amount, years, rate = 7.05) {
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;
    const futureValue = amount * (((Math.pow(1 + monthlyRate, months)) - 1) * (1 + monthlyRate)) / monthlyRate;
    const invested = amount * months;
    const returns = futureValue - invested;

    return {
        invested: Math.round(invested),
        returns: Math.round(returns),
        total: Math.round(futureValue),
    };
}

export default function decorate(block) {
    block.innerHTML = '';

    // Category filters
    const filters = ['All', 'Indian Equity', 'International Equity', 'Hybrid & Balanced', 'Multi Asset', 'Commodity'];
    const filterContainer = div({ class: 'filters' }, ...filters.map(f => button({ class: 'filter-btn' }, f)));

    // Scheme Input
    const schemeInput = input({ type: 'text', placeholder: 'Scheme', class: 'scheme-input' });

    // Plan and Option
    const planSelect = select({ class: 'plan-select' },
        option({ value: 'Direct' }, 'Direct'),
        option({ value: 'Regular' }, 'Regular')
    );

    const optionSelect = select({ class: 'option-select' },
        option({ value: 'Growth' }, 'Growth'),
        option({ value: 'IDCW' }, 'IDCW')
    );

    // SIP Amount
    const amountInput = input({ type: 'number', value: 10000, class: 'amount-input' });
    const quickAmounts = [5000, 10000, 25000, 50000, 100000];
    const quickBtns = quickAmounts.map(val => {
        const btn = button({}, val.toLocaleString());
        btn.addEventListener('click', () => amountInput.value = val);
        return btn;
    });
    const amountBox = div({}, label({}, 'SIP Amount:'), amountInput, ...quickBtns);

    // Duration
    const durations = [
        { label: 'Since Inception', value: 'since' },
        { label: '1 Year', value: 1 },
        { label: '3 Year', value: 3 },
    ];
    const durationBtns = durations.map(d => {
        const btn = button({ 'data-value': d.value }, d.label);
        if (d.value === 3) btn.classList.add('selected');
        btn.addEventListener('click', () => {
            durationBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
        return btn;
    });
    const durationBox = div({}, label({}, 'Duration:'), ...durationBtns);

    // Results Display
    const resultSection = div({ class: 'results' });

    // CTA Button
    const calculateBtn = button({ class: 'calculate-btn' }, 'Start SIP');

    calculateBtn.addEventListener('click', () => {
        const amount = parseInt(amountInput.value, 10);
        const selectedDuration = durationBtns.find(b => b.classList.contains('selected')).getAttribute('data-value');
        const years = selectedDuration === 'since' ? 5 : parseInt(selectedDuration, 10); // Assuming 5 for demo

        const { invested, returns, total } = calculateSIP(amount, years);

        resultSection.innerHTML = '';
        resultSection.append(
            h2({}, 'SIP Performance'),
            div({},
                p({}, span({ class: 'label' }, 'Invested Amount: '), formatCurrency(invested)),
                p({}, span({ class: 'label' }, 'Returns Value: '), formatCurrency(returns)),
                p({}, span({ class: 'label' }, 'Total wealth accumulated: '), formatCurrency(total))
            ),
            p({}, `Your monthly SIP of ${formatCurrency(amount)} since ${years} years would have been worth ${formatCurrency(total)}`)
        );
    });

    block.append(
        h2({}, 'SIP Past Performance Calculator'),
        filterContainer,
        schemeInput,
        div({}, label({}, 'Plan:'), planSelect),
        div({}, label({}, 'Option:'), optionSelect),
        amountBox,
        durationBox,
        calculateBtn,
        resultSection
    );
}

