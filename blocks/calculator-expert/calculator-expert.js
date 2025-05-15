/* eslint-disable */

// swp-calculator.js
import {
    div, span, button, select, option, input, strong, text, br
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
    const calculator = div({ class: 'swp-calculator' },
        div({ class: 'swp-box1' },
            div({ class: 'swp-header' },
                span({ class: 'swp-subtitle' }, 'HELPING YOU PLAN'),
                span({ class: 'swp-title' }, 'Go from liquid to equity!')
            ),
            div({ class: 'swp-frequency' },
                button({ class: 'toggle monthly active', id: 'monthly-btn' }, 'MONTHLY'),
                button({ class: 'toggle quarterly', id: 'quarterly-btn' }, 'QUARTERLY')
            ),
            div({ class: 'swp-inputs' },
                span(text('I want to transfer ')),
                span({ class: 'input-wrapper' },
                    span({ class: 'currency-symbol' }, '₹'),
                    input({ type: 'number', value: 4434260, id: 'amount-input', class: 'input-inline' })
                ),
                br(),
                span(text('in ')),
                // select({ id: 'installments', class: 'input-inline' },
                //     [3, 6, 9, 12].map(n => option({ value: n, textContent: `${n}` }))
                // ),
                select({ id: 'installments', class: 'input-inline' },
                    option({ value: 1 }, '1'),
                    option({ value: 2 }, '2'),
                    option({ value: 3 }, '3'),
                    option({ value: 4, selected: true }, '4'),
                    option({ value: 5 }, '5')
                ),
                span(text(' installments with an expected return of ')),
                select({ id: 'return-rate', class: 'input-inline' },
                    // [0, 2, 4, 6].map(r => option({ value: r, textContent: `${r}%` }))
                    option({ value: '1' }, '1%'),
                    option({ value: '2', selected: true }, '2%'),
                    option({ value: '3' }, '3%'),
                    option({ value: '4' }, '4%'),
                    option({ value: '5' }, '5%')
                ),
                span(text('.'))
            ),
        ),
        div({ class: 'swp-box2' },
            div({ class: 'swp-result-box' },
                span({ class: 'result-label' }, 'VALUE OF INVESTMENT POST TRANSFER'),
                div({ id: 'result', class: 'result-value' }, '₹4,434,260')
            ),
        ),);

    const bottomLine = div({ class: 'swp-cta' },
        span({ class: 'cta-text' }, 'Ready to plan your transfer?'),
        button({ class: 'start-btn' }, 'START NOW')
    )

    block.innerHTML = '';
    block.append(calculator);
    block.append(bottomLine);

    const amountInput = block.querySelector('#amount-input');
    const installmentSelect = block.querySelector('#installments');
    const returnRateSelect = block.querySelector('#return-rate');
    const result = block.querySelector('#result');

    const calculate = () => {
        const amount = parseFloat(amountInput.value);
        const rate = parseFloat(returnRateSelect.value);
        if (isNaN(amount) || isNaN(rate)) {
            result.textContent = '₹0';
            return;
        }
        const finalValue = amount * (1 + rate / 100);
        result.textContent = `₹${Math.round(finalValue).toLocaleString('en-IN')}`;
    };

    amountInput.addEventListener('input', calculate);
    installmentSelect.addEventListener('change', calculate);
    returnRateSelect.addEventListener('change', calculate);

    block.querySelector('#monthly-btn').addEventListener('click', () => setFrequency('monthly'));
    block.querySelector('#quarterly-btn').addEventListener('click', () => setFrequency('quarterly'));

    function setFrequency(freq) {
        block.querySelectorAll('.toggle').forEach(btn => btn.classList.remove('active'));
        block.querySelector(`.${freq}`).classList.add('active');
        // You can implement further logic depending on frequency
    }

    calculate(); // initial calculation
}

