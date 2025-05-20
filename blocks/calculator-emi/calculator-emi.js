/* eslint-disable */
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

    // Total Investment Input

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

    const calculatorResult = div({ class: 'calculator-result' },
        div({ class: 'chart-container' },
            donutChartDiv,
            chartTooltip,
            chartCenter
        ),
        chartLegend,
        div({ class: 'reset-container' },
            button({ id: 'reset-calculator', class: 'reset-button' },
                'Reset Calculator',
                span({ class: 'reset-icon' }, '↺')
            )
        )
    );


    // Assemble all the components
    const calculatorForm = div({ class: 'calculator-form' },
        h2({ class: 'calculator-heading' }, 'SWP Calculator'),
        totalInvestmentGroup,
    );

    const calculatorContainer = div({ class: 'calculator-container' },
        calculatorForm,
        calculatorResult
    );

    // Add the calculator to the block
    block.append(calculatorContainer);

}