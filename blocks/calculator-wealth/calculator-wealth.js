/* eslint-disable */
import { div, input, span, button, select, option } from '../../scripts/dom-helpers.js'

export default function decorate(block) {
    const rows = [...block.children];
    block.innerHTML = '';

    const tabWrapper = div({ class: 'tab-wrapper' },
        button({ class: 'tab active', type: 'button' }, 'SIP'),
        button({ class: 'tab', type: 'button' }, 'LUMPSUM')
    );

    const investedLabel = rows[0]?.querySelector('p')?.textContent || 'IF YOU HAD INVESTED';
    const tenureLabel = rows[1]?.querySelector('p')?.textContent || 'TENURE';
    const investedAmountLabel = rows[2]?.querySelector('p')?.textContent || 'INVESTED AMOUNT';
    const cagrLabel = rows[3]?.querySelector('p')?.textContent || 'CAGR';
    const returnsLabel = rows[4]?.querySelector('p')?.textContent || 'ANNUAL RETURNS';

    const investedSlider = input({ type: 'range', min: 1000, max: 500000, step: 500, value: 1000, class: 'slider' });
    const investedValue = span({ class: 'slider-value' }, '₹1,000');

    investedSlider.addEventListener('input', () => {
        investedValue.textContent = formatINR(+investedSlider.value);
        updateReturns();
    });

    const tenureDropdown = select({ class: 'tenure-dropdown' },
        option({ value: 1 }, '1 YEAR'),
        option({ value: 3, selected: true }, '3 YEARS'),
        option({ value: 5 }, '5 YEARS'),
        option({ value: 10 }, '10 YEARS')
    );

    tenureDropdown.addEventListener('change', updateReturns);

    const investedAmount = span({ class: 'invested-amount' }, '₹12,000');
    const cagrValue = span({ class: 'cagr-value' }, '21.5%');
    const returnsOutput = span({ class: 'returns-output' }, '₹43,260');

    const investBtn = button({ class: 'invest-btn' }, 'INVEST NOW');

    // Assemble calculator layout
    block.append(
        tabWrapper,
        div({ class: 'invested-block' },
            span({ class: 'label' }, investedLabel),
            investedValue,
            investedSlider
        ),
        div({ class: 'row' },
            div({ class: 'tenure-block' }, span({ class: 'label' }, tenureLabel), tenureDropdown),
            div({ class: 'amount-block' }, span({ class: 'label' }, investedAmountLabel), investedAmount),
            div({ class: 'cagr-block' }, span({ class: 'label' }, cagrLabel), cagrValue)
        ),
        div({ class: 'result-block' },
            span({ class: 'label' }, returnsLabel),
            returnsOutput,
            investBtn
        )
    );

    // Update output calculation
    function updateReturns() {
        const principal = +investedSlider.value;
        const years = +tenureDropdown.value;
        const cagr = 21.5;

        let total;
        // If the active tab is SIP, apply SIP formula
        if (tabWrapper.querySelector('.tab.active').textContent === 'SIP') {
            const monthlyRate = cagr / 100 / 12;
            const totalMonths = years * 12;
            total = principal * (((Math.pow(1 + monthlyRate, totalMonths) - 1) * (1 + monthlyRate)) / monthlyRate);
        } else {
            // Lumpsum Formula
            total = principal * Math.pow(1 + cagr / 100, years);
        }

        returnsOutput.textContent = formatINR(total);

        investedAmount.textContent = formatINR(principal * (years * 12));
    }

    // Format INR values with commas and ₹ symbol
    function formatINR(value) {
        return `₹${Math.round(value).toLocaleString('en-IN')}`;
    }

    // Toggle active tab
    const tabs = tabWrapper.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updateReturns(); // Recalculate on tab switch
        });
    });

    updateReturns();
}

