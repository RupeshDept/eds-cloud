/* eslint-disable */

import { div, input, button, h2, span } from "../../scripts/dom-helpers.js";

export default function decorate(block) {

    // Default values
    const defaultValues = {
        principal: 500000,
        rate: 8,
        years: 5
    };

    // Initial calculation
    const initialResult = calculateSWP(
        defaultValues.principal,
        defaultValues.rate,
        defaultValues.years
    );

    // Principal Investment Input
    const principalInvestment = div({ class: 'input-group' },
        div({ class: 'input-label' },
            'Principal Investment (₹)',
            span({ class: 'info-icon', title: 'Initial investment amount' }, 'ⓘ')
        ),
        input({
            type: 'number',
            id: 'principal-investment',
            class: 'input-field',
            value: defaultValues.principal,
            min: '0'
        })
    );

    // Rate of Return Input
    const rateOfReturn = div({ class: 'input-group' },
        div({ class: 'input-label' },
            'Rate of Return (%)',
            span({ class: 'info-icon', title: 'Expected annual rate of return' }, 'ⓘ')
        ),
        input({
            type: 'number',
            id: 'rate-of-return',
            class: 'input-field',
            value: defaultValues.rate,
            min: '0'
        })
    );

    // Loan Tenure Input
    const loanTenure = div({ class: 'input-group' },
        div({ class: 'input-label' },
            'Loan Tenure (Years)',
            span({ class: 'info-icon', title: 'Duration of the loan in years' }, 'ⓘ')
        ),
        input({
            type: 'number',
            id: 'loan-tenure',
            class: 'input-field',
            value: defaultValues.years,
            min: '1'
        })
    );
    // Calculate Button
    const calculateButton = button({
        id: 'calculate-button',
        class: 'calculate-button'
    }, 'Calculate');

    // Add event listener to the button
    calculateButton.addEventListener('click', () => {
        const principal = parseFloat(document.getElementById('principal-investment').value);
        const rate = parseFloat(document.getElementById('rate-of-return').value);
        const years = parseInt(document.getElementById('loan-tenure').value, 10);

        // Validate inputs
        if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        // Perform calculation
        const result = calculateSWP(principal, rate, years);

        // Update the result display
        // Update the chart and other UI elements here
    });



    const calculatorResult = div({ class: 'calculator-result' },
        div({ class: 'chart-container' },
            // donutChartDiv,
            // chartTooltip,
            // chartCenter
        ),
        // chartLegend,
        // div({ class: 'reset-container' },
        //     button({ id: 'reset-calculator', class: 'reset-button' },
        //         'Reset Calculator',
        //         span({ class: 'reset-icon' }, '↺')
        //     )
        // )
    );




    // Assemble all the components
    const calculatorForm = div({ class: 'calculator-form' },
        h2({ class: 'calculator-heading' }, 'EMI Calculator'),
        principalInvestment,
        rateOfReturn,
        loanTenure,
        calculateButton
    );

    const calculatorContainer = div({ class: 'calculator-container' },
        calculatorForm,
        calculatorResult
    );

    // Calculate SWP (Systematic Withdrawal Plan)
    function calculateSWP(principal, withdrawal, rate, years) {
        const monthlyRate = (rate / 100) / 12;
        const totalMonths = years * 12;
        const totalWithdrawal = withdrawal * totalMonths;

        // Calculate remaining value after withdrawals with growth
        let remainingValue = principal;
        for (let i = 0; i < totalMonths; i++) {
            // Apply growth for the month
            remainingValue = remainingValue * (1 + monthlyRate);
            // Subtract monthly withdrawal
            remainingValue -= withdrawal;
        }

        // Safety check to prevent negative values
        remainingValue = Math.max(0, remainingValue);

        return {
            principal,
            totalWithdrawal,
            remainingValue,
            years
        };
    }

    // Add the calculator to the block
    block.append(calculatorContainer);

}