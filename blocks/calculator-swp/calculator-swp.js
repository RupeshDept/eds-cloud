/* eslint-disable */
import { div, input, button, h2, span } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
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

  // Create SVG for donut chart using dom-helpers style approach
  function createDonutChart(principal, totalWithdrawal) {
    const svgNS = "http://www.w3.org/2000/svg";
    const total = principal + totalWithdrawal;
    const investmentPercent = (principal / total) * 100;
    const withdrawalPercent = (totalWithdrawal / total) * 100;

    // Create SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("class", "donut-chart-svg");

    // Create investment arc (dark blue)
    const investmentArc = document.createElementNS(svgNS, "circle");
    investmentArc.setAttribute("cx", "50");
    investmentArc.setAttribute("cy", "50");
    investmentArc.setAttribute("r", "40");
    investmentArc.setAttribute("fill", "transparent");
    investmentArc.setAttribute("stroke", "#42389d");
    investmentArc.setAttribute("stroke-width", "20");
    investmentArc.setAttribute("stroke-dasharray", "251.2");
    investmentArc.setAttribute("stroke-dashoffset", `${(withdrawalPercent * 251.2) / 100}`);
    investmentArc.setAttribute("transform", "rotate(-90 50 50)");

    // Create withdrawal arc (light blue)
    const withdrawalArc = document.createElementNS(svgNS, "circle");
    withdrawalArc.setAttribute("cx", "50");
    withdrawalArc.setAttribute("cy", "50");
    withdrawalArc.setAttribute("r", "40");
    withdrawalArc.setAttribute("fill", "transparent");
    withdrawalArc.setAttribute("stroke", "#1e88e5");
    withdrawalArc.setAttribute("stroke-width", "20");
    withdrawalArc.setAttribute("stroke-dasharray", `${(withdrawalPercent * 251.2) / 100} ${251.2}`);
    withdrawalArc.setAttribute("stroke-dashoffset", "0");
    withdrawalArc.setAttribute("transform", "rotate(-90 50 50)");

    svg.appendChild(investmentArc);
    svg.appendChild(withdrawalArc);

    return svg;
  }

  // Default values
  const defaultValues = {
    principal: 500000,
    withdrawal: 10000,
    rate: 8,
    years: 5
  };

  // Initial calculation
  const initialResult = calculateSWP(
    defaultValues.principal,
    defaultValues.withdrawal,
    defaultValues.rate,
    defaultValues.years
  );

  // Total Investment Input
  const totalInvestmentGroup = div({ class: 'input-group' },
    div({ class: 'input-label' },
      'Total Investment (₹)',
      span({ class: 'info-icon', title: 'Initial investment amount' }, 'ⓘ')
    ),
    input({
      type: 'number',
      id: 'total-investment',
      class: 'input-field',
      value: defaultValues.principal,
      min: '0'
    })
  );

  // Withdrawal Amount Input
  const withdrawalAmountGroup = div({ class: 'input-group' },
    div({ class: 'input-label' },
      'Withdrawal amount per month (₹)',
      span({ class: 'info-icon', title: 'Amount to withdraw each month' }, 'ⓘ')
    ),
    input({
      type: 'number',
      id: 'withdrawal-amount',
      class: 'input-field',
      value: defaultValues.withdrawal,
      min: '0'
    })
  );

  // Expected Returns Input
  const expectedReturnsGroup = div({ class: 'input-group' },
    div({ class: 'input-label' },
      'Expected Returns (%)',
      span({ class: 'info-icon', title: 'Annual rate of return' }, 'ⓘ')
    ),
    input({
      type: 'number',
      id: 'expected-returns',
      class: 'input-field',
      value: defaultValues.rate,
      min: '0',
      max: '30',
      step: '0.1'
    }),
    div({ class: 'slider-container' },
      input({
        type: 'range',
        id: 'expected-returns-slider',
        class: 'slider',
        min: '0',
        max: '30',
        step: '0.1',
        value: defaultValues.rate
      })
    )
  );

  // Tenure Input
  const tenureGroup = div({ class: 'input-group' },
    div({ class: 'input-label' },
      'Tenure (In years)',
      span({ class: 'info-icon', title: 'Investment duration in years' }, 'ⓘ')
    ),
    input({
      type: 'number',
      id: 'tenure',
      class: 'input-field',
      value: defaultValues.years,
      min: '1',
      max: '30'
    }),
    div({ class: 'slider-container' },
      input({
        type: 'range',
        id: 'tenure-slider',
        class: 'slider',
        min: '1',
        max: '30',
        value: defaultValues.years
      })
    )
  );

  const investButton = button({ id: 'calculate-btn', class: 'calculator-button' },
    'INVEST NOW',
    span({ class: 'button-arrow' }, '→')
  );

  // Create chart tooltip
  const chartTooltip = div({ class: 'chart-tooltip', id: 'chart-tooltip' },
    div({ class: 'tooltip-content' },
      'Total Withdrawal: ',
      span({ id: 'tooltip-withdrawal' }, `₹${formatIndianCurrency(initialResult.totalWithdrawal)}`)
    )
  );

  // Create chart center text
  const chartCenter = div({ class: 'chart-center' },
    div({ class: 'center-heading' }, 'The total value of'),
    div({ class: 'center-heading' }, 'investment will be'),
    div({ class: 'center-value' },
      '₹ ',
      span({ id: 'result-remaining' }, formatIndianCurrency(initialResult.remainingValue))
    )
  );

  // Create chart legend
  const chartLegend = div({ class: 'chart-legend' },
    div({ class: 'legend-item investment' },
      div({ class: 'legend-color investment-color' }),
      div({ class: 'legend-text' },
        'Total Investment',
        div({ class: 'legend-value', id: 'legend-investment' },
          `₹${formatIndianCurrency(initialResult.principal)}`
        )
      )
    ),
    div({ class: 'legend-item withdrawal' },
      div({ class: 'legend-color withdrawal-color' }),
      div({ class: 'legend-text' },
        'Total Withdrawal',
        div({ class: 'legend-value', id: 'legend-withdrawal' },
          `₹${formatIndianCurrency(initialResult.totalWithdrawal)}`
        )
      )
    )
  );

  // Create donut chart container
  const donutChartDiv = div({ id: 'donut-chart', class: 'donut-chart' });

  // Assemble all the components
  const calculatorForm = div({ class: 'calculator-form' },
    h2({ class: 'calculator-heading' }, 'SWP Calculator'),
    totalInvestmentGroup,
    withdrawalAmountGroup,
    expectedReturnsGroup,
    tenureGroup,
    investButton
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

  const calculatorContainer = div({ class: 'calculator-container' },
    calculatorForm,
    calculatorResult
  );

  // Add the calculator to the block
  block.append(calculatorContainer);

  // Add initial chart
  donutChartDiv.appendChild(createDonutChart(
    initialResult.principal,
    initialResult.totalWithdrawal
  ));

  // Setup event listeners
  document.getElementById('expected-returns').addEventListener('input', function () {
    document.getElementById('expected-returns-slider').value = this.value;
    updateResults();
  });

  document.getElementById('expected-returns-slider').addEventListener('input', function () {
    document.getElementById('expected-returns').value = this.value;
    updateResults();
  });

  document.getElementById('tenure').addEventListener('input', function () {
    document.getElementById('tenure-slider').value = this.value;
    updateResults();
  });

  document.getElementById('tenure-slider').addEventListener('input', function () {
    document.getElementById('tenure').value = this.value;
    updateResults();
  });

  document.getElementById('total-investment').addEventListener('input', updateResults);
  document.getElementById('withdrawal-amount').addEventListener('input', updateResults);
  document.getElementById('calculate-btn').addEventListener('click', updateResults);

  document.getElementById('reset-calculator').addEventListener('click', function () {
    document.getElementById('total-investment').value = defaultValues.principal;
    document.getElementById('withdrawal-amount').value = defaultValues.withdrawal;
    document.getElementById('expected-returns').value = defaultValues.rate;
    document.getElementById('expected-returns-slider').value = defaultValues.rate;
    document.getElementById('tenure').value = defaultValues.years;
    document.getElementById('tenure-slider').value = defaultValues.years;

    updateResults();
  });

  // Function to update chart tooltip position
  function showTooltip() {
    const tooltip = document.getElementById('chart-tooltip');
    tooltip.style.display = 'block';
  }

  // Function to hide tooltip
  function hideTooltip() {
    const tooltip = document.getElementById('chart-tooltip');
    tooltip.style.display = 'none';
  }

  // Add tooltip events to chart
  donutChartDiv.addEventListener('mouseenter', showTooltip);
  donutChartDiv.addEventListener('mouseleave', hideTooltip);

  // Function to update results
  function updateResults() {
    const principal = parseFloat(document.getElementById('total-investment').value);
    const withdrawal = parseFloat(document.getElementById('withdrawal-amount').value);
    const rate = parseFloat(document.getElementById('expected-returns').value);
    const years = parseInt(document.getElementById('tenure').value);

    const result = calculateSWP(principal, withdrawal, rate, years);

    // Update text display
    document.getElementById('result-remaining').textContent = formatIndianCurrency(result.remainingValue);
    document.getElementById('legend-investment').textContent = `₹${formatIndianCurrency(result.principal)}`;
    document.getElementById('legend-withdrawal').textContent = `₹${formatIndianCurrency(result.totalWithdrawal)}`;
    document.getElementById('tooltip-withdrawal').textContent = `₹${formatIndianCurrency(result.totalWithdrawal)}`;

    // Update chart
    const chartContainer = document.getElementById('donut-chart');
    while (chartContainer.firstChild) {
      chartContainer.removeChild(chartContainer.firstChild);
    }
    chartContainer.appendChild(createDonutChart(result.principal, result.totalWithdrawal));
  }
}