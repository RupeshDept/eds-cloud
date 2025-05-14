/* eslint-disable */
import { div, input, button, label, select, option, p, h2, span } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  console.log(block);
  // // populate on page with dom-helpers 
  // const container = div({ class: 'container' },
  //     div(p({ class: "main-one" }, 'Main One')),
  //     div(p({ class: "main-two" }, 'Main Two'))
  // )
  // block.append(container)

  /**
* Compound Interest Calculator for EDS using dom-helpers
*/

  // Helper function to format currency in Indian format
  function formatIndianCurrency(num) {
    const numStr = Math.round(num).toString();
    let result = '';
    let count = 0;

    for (let i = numStr.length - 1; i >= 0; i--) {
      count++;
      result = numStr[i] + result;

      if (count === 3 && i !== 0) {
        result = ',' + result;
      } else if (count === 5 && i !== 0) {
        result = ',' + result;
        count = 0;
      } else if (count === 7 && i !== 0) {
        result = ',' + result;
        count = 0;
      }
    }

    return result;
  }

  // Calculate compound interest
  function calculateCompoundInterest(principal, rate, time, frequency) {
    const amount = principal * Math.pow(1 + (rate / 100) / frequency, frequency * time);
    const interest = amount - principal;

    return {
      principal,
      interest,
      total: amount,
      time
    };
  }

  // Create SVG for donut chart using dom-helpers style approach
  function createDonutChart(principal, interest, total) {
    const svgNS = "http://www.w3.org/2000/svg";
    const interestPercent = (interest / total) * 100;

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    const circle1 = document.createElementNS(svgNS, "circle");
    circle1.setAttribute("cx", "50");
    circle1.setAttribute("cy", "50");
    circle1.setAttribute("r", "40");
    circle1.setAttribute("fill", "transparent");
    circle1.setAttribute("stroke", "#2e3d98");
    circle1.setAttribute("stroke-width", "20");
    circle1.setAttribute("stroke-dasharray", "251.2");
    circle1.setAttribute("stroke-dashoffset", "0");

    const circle2 = document.createElementNS(svgNS, "circle");
    circle2.setAttribute("cx", "50");
    circle2.setAttribute("cy", "50");
    circle2.setAttribute("r", "40");
    circle2.setAttribute("fill", "transparent");
    circle2.setAttribute("stroke", "#36C");
    circle2.setAttribute("stroke-width", "20");
    circle2.setAttribute("stroke-dasharray", "251.2");
    circle2.setAttribute("stroke-dashoffset", String(251.2 - (interestPercent * 251.2 / 100)));
    circle2.setAttribute("transform", "rotate(-90 50 50)");

    svg.appendChild(circle1);
    svg.appendChild(circle2);

    return svg;
  }


  // Default values
  const defaultValues = {
    principal: 100000,
    rate: 10,
    time: 10,
    frequency: 1
  };

  // Initial calculation
  const initialResult = calculateCompoundInterest(
    defaultValues.principal,
    defaultValues.rate,
    defaultValues.time,
    defaultValues.frequency
  );

  // Create elements using dom-helpers style
  // Instead of your createElement function, we'll use the native dom-helpers functions

  // Investment Amount Input
  const investmentAmountGroup = div({ class: 'input-group' },
    div({ class: 'input-label' },
      'Investment Amount (₹)',
      span({ class: 'info-icon', title: 'Initial amount to be invested' }, 'ⓘ')
    ),
    input({
      type: 'number',
      id: 'investment-amount',
      class: 'input-field',
      value: defaultValues.principal,
      min: '0'
    })
  );

  // Interest Rate Input
  const interestRateGroup = div({ class: 'input-group' },
    div({ class: 'input-label' },
      'Rate of Interest (% p.a.)',
      span({ class: 'info-icon', title: 'Annual interest rate as a percentage' }, 'ⓘ')
    ),
    input({
      type: 'number',
      id: 'interest-rate',
      class: 'input-field',
      value: defaultValues.rate,
      min: '0',
      max: '100',
      step: '0.1'
    }),
    div({ class: 'slider-container' },
      input({
        type: 'range',
        id: 'interest-rate-slider',
        class: 'slider',
        min: '0',
        max: '30',
        value: defaultValues.rate,
        step: '0.1'
      })
    )
  );

  // Investment Period Input
  const investmentPeriodGroup = div({ class: 'input-group' },
    div({ class: 'input-label' },
      'Investment period (In years)',
      span({ class: 'info-icon', title: 'Duration of the investment in years' }, 'ⓘ')
    ),
    input({
      type: 'number',
      id: 'investment-period',
      class: 'input-field',
      value: defaultValues.time,
      min: '1',
      max: '50'
    }),
    div({ class: 'slider-container' },
      input({
        type: 'range',
        id: 'investment-period-slider',
        class: 'slider',
        min: '1',
        max: '50',
        value: defaultValues.time
      })
    )
  );

  // Compounding Frequency Select
  const compoundingFrequencyGroup = div({ class: 'input-group' },
    div({ class: 'input-label' }, 'Compounding Frequency'),
    div({ class: 'select-container' },
      select({ id: 'compounding-frequency', class: 'select-field' },
        option({ value: '1' }, 'YEARLY'),
        option({ value: '2' }, 'HALF-YEARLY'),
        option({ value: '4' }, 'QUARTERLY'),
        option({ value: '12' }, 'MONTHLY'),
        option({ value: '365' }, 'DAILY')
      ),
      span({ class: 'select-arrow' }, '▼')
    )
  );

  const investButton = button({ id: 'calculate-btn', class: 'calculator-button' },
    'INVEST NOW',
    span({ class: 'button-arrow' }, '→')
  )

  // Create chart center and legend elements
  const chartCenter = div({ class: 'chart-center' },
    div({ class: 'chart-label' },
      'After ',
      span({ id: 'result-years' }, initialResult.time),
      ' years,'
    ),
    div({ class: 'chart-label' }, 'you will have'),
    div({ class: 'chart-value' },
      '₹ ',
      span({ id: 'result-total' }, formatIndianCurrency(initialResult.total))
    )
  );

  const chartLegend = div({ class: 'chart-legend' },
    div({ class: 'legend-item' },
      div({ class: 'legend-color', style: 'background-color: #2e3d98;' }),
      div({ class: 'legend-text' },
        'Invested Amount',
        span({ class: 'legend-value', id: 'legend-principal' },
          `₹${formatIndianCurrency(initialResult.principal)}`
        )
      )
    ),
    div({ class: 'legend-item' },
      div({ class: 'legend-color', style: 'background-color: #36C;' }),
      div({ class: 'legend-text' },
        'Total Interest',
        span({ class: 'legend-value', id: 'legend-interest' },
          `₹${formatIndianCurrency(initialResult.interest)}`
        )
      )
    )
  );

  // Create donut chart container
  const donutChartDiv = div({ id: 'donut-chart', class: 'donut-chart' });

  // Assemble all the components
  const calculatorForm = div({ class: 'calculator-form' },
    h2({ class: 'calculator-heading' }, 'Compound Interest Calculator'),
    investmentAmountGroup,
    interestRateGroup,
    investmentPeriodGroup,
    compoundingFrequencyGroup,
    investButton
    // button({ id: 'calculate-btn', class: 'calculator-button' },
    //   'INVEST NOW',
    //   span({ class: 'button-arrow' }, '→')
    // )
  );

  const calculatorResult = div({ class: 'calculator-result' },
    div({ class: 'chart-container' },
      donutChartDiv,
      chartCenter
    ),
    chartLegend,
    button({ id: 'reset-calculator', class: 'reset-button' },
      'Reset Calculator',
      span({ class: 'reset-icon' }, '↺')
    )
  );

  const calculatorContainer = div({ class: 'calculator-container' },
    calculatorForm,
    calculatorResult
  );

  // Add the calculator to the block
  block.append(calculatorContainer);

  // Add initial chart
  donutChartDiv.appendChild(createDonutChart(
    initialResult.principal,
    initialResult.interest,
    initialResult.total
  ));

  // Setup event listeners
  document.getElementById('interest-rate').addEventListener('input', function () {
    document.getElementById('interest-rate-slider').value = this.value;
    updateResults();
  });

  document.getElementById('interest-rate-slider').addEventListener('input', function () {
    document.getElementById('interest-rate').value = this.value;
    updateResults();
  });

  document.getElementById('investment-period').addEventListener('input', function () {
    document.getElementById('investment-period-slider').value = this.value;
    updateResults();
  });

  document.getElementById('investment-period-slider').addEventListener('input', function () {
    document.getElementById('investment-period').value = this.value;
    updateResults();
  });

  document.getElementById('investment-amount').addEventListener('input', updateResults);
  document.getElementById('compounding-frequency').addEventListener('change', updateResults);
  document.getElementById('calculate-btn').addEventListener('click', updateResults);

  document.getElementById('reset-calculator').addEventListener('click', function () {
    document.getElementById('investment-amount').value = defaultValues.principal;
    document.getElementById('interest-rate').value = defaultValues.rate;
    document.getElementById('interest-rate-slider').value = defaultValues.rate;
    document.getElementById('investment-period').value = defaultValues.time;
    document.getElementById('investment-period-slider').value = defaultValues.time;
    document.getElementById('compounding-frequency').value = defaultValues.frequency;

    updateResults();
  });

  // Function to update results
  function updateResults() {
    const principal = parseFloat(document.getElementById('investment-amount').value);
    const rate = parseFloat(document.getElementById('interest-rate').value);
    const time = parseInt(document.getElementById('investment-period').value);
    const frequency = parseInt(document.getElementById('compounding-frequency').value);

    const result = calculateCompoundInterest(principal, rate, time, frequency);

    // Update text display
    document.getElementById('result-years').textContent = time;
    document.getElementById('result-total').textContent = formatIndianCurrency(result.total);
    document.getElementById('legend-principal').textContent = `₹${formatIndianCurrency(result.principal)}`;
    document.getElementById('legend-interest').textContent = `₹${formatIndianCurrency(result.interest)}`;

    // Update chart
    const chartContainer = document.getElementById('donut-chart');
    while (chartContainer.firstChild) {
      chartContainer.removeChild(chartContainer.firstChild);
    }
    chartContainer.appendChild(createDonutChart(result.principal, result.interest, result.total));
  }



}



