/* eslint-disable */

export default function decorate(block) {
    const config = block.dataset || {};

    const defaultFund = config.defaultfund || 'Motilal Oswal Mid cap fund';
    const buttonText = config.buttontext || 'Start SIP';
    const calculatorLink = config.calculatorlink || 'View other calculators';
    const calculatorUrl = config.calculatorurl || '#';
    const defaultAmount = parseInt(config.defaultamount) || 10000;
    const defaultTenure = config.defaulttenure || '10';
    const annualReturnRate = parseFloat(config.annualreturnrate) || 15;

    // SIP and Lumpsum configuration
    const sipLabel = config.siplabel || 'SIP';
    const lumpsumLabel = config.lumpsumlabel || 'Lumpsum';
    const sipInputLabel = config.sipinputlabel || 'If you would have invested monthly';
    const lumpsumInputLabel = config.lumpsuninputlabel || 'If you would have invested';
    const showSip = config.showsip !== 'false';
    const showLumpsum = config.showlumpsum !== 'false';
    const defaultInvestmentType = config.defaultinvestmenttype || 'sip';

    // Build toggle options based on configuration
    let toggleHTML = '';
    if (showSip && showLumpsum) {
        toggleHTML = `
      <div class="investment-type-toggle">
        <div class="toggle-option ${defaultInvestmentType === 'sip' ? 'active' : ''}" data-type="sip">${sipLabel}</div>
        <div class="toggle-option ${defaultInvestmentType === 'lumpsum' ? 'active' : ''}" data-type="lumpsum">${lumpsumLabel}</div>
      </div>
    `;
    } else if (showSip) {
        toggleHTML = `
      <div class="investment-type-toggle">
        <div class="toggle-option active" data-type="sip">${sipLabel}</div>
      </div>
    `;
    } else if (showLumpsum) {
        toggleHTML = `
      <div class="investment-type-toggle">
        <div class="toggle-option active" data-type="lumpsum">${lumpsumLabel}</div>
      </div>
    `;
    }

    // Determine initial label based on default type
    const initialLabel = defaultInvestmentType === 'sip' ? sipInputLabel : lumpsumInputLabel;

    block.innerHTML = `
    <div class="calculator-form">
      <div class="fund-search-container">
        <label class="fund-search-label">Search a fund</label>
        <input 
          type="text" 
          class="fund-search-input" 
          placeholder="${defaultFund}"
          value="${defaultFund}"
          id="fund-search"
        >
        <span class="search-icon">🔍</span>
      </div>
      
      ${toggleHTML}
      
      <div class="form-row">
        <div class="form-group">
          <label id="investment-label">${initialLabel}</label>
          <div class="amount-input-container">
            <span class="currency-symbol">₹</span>
            <input 
              type="number" 
              class="amount-input" 
              value="${defaultAmount}" 
              id="investment-amount"
              min="500"
              step="500"
            >
          </div>
        </div>
        
        <div class="form-group">
          <label>Tenure</label>
          <select class="tenure-select" id="tenure-select">
            <option value="1" ${defaultTenure === '1' ? 'selected' : ''}>1 year</option>
            <option value="2" ${defaultTenure === '2' ? 'selected' : ''}>2 years</option>
            <option value="3" ${defaultTenure === '3' ? 'selected' : ''}>3 years</option>
            <option value="5" ${defaultTenure === '5' ? 'selected' : ''}>5 years</option>
            <option value="10" ${defaultTenure === '10' ? 'selected' : ''}>10 years</option>
            <option value="15" ${defaultTenure === '15' ? 'selected' : ''}>15 years</option>
            <option value="20" ${defaultTenure === '20' ? 'selected' : ''}>20 years</option>
            <option value="25" ${defaultTenure === '25' ? 'selected' : ''}>25 years</option>
            <option value="30" ${defaultTenure === '30' ? 'selected' : ''}>30 years</option>
          </select>
        </div>
      </div>
      
      <div class="calculation-results">
        <div class="result-row">
          <span class="result-label">Invested Amount</span>
          <span class="result-value invested-amount" id="invested-amount">₹12.0 Lac</span>
        </div>
        <div class="result-row">
          <span class="result-label">Current Value of Investment</span>
          <span class="result-value current-value" id="current-value">₹35.20 Lac</span>
        </div>
        <div class="result-row">
          <span class="result-label">Return (CAGR)</span>
          <span class="result-value returns" id="returns">18.72%</span>
        </div>
      </div>
      
      <button class="start-sip-button" id="start-sip">
        ${buttonText}
      </button>
      
      <div class="other-calculators">
        <a href="${calculatorUrl}" id="other-calculators">${calculatorLink}</a>
      </div>
    </div>
  `;

    initializeCalculator(annualReturnRate / 100, defaultInvestmentType, sipInputLabel, lumpsumInputLabel, showSip, showLumpsum);
}

function initializeCalculator(returnRate = 0.15, defaultType = 'sip', sipLabel = 'If you would have invested monthly', lumpsumLabel = 'If you would have invested', showSip = true, showLumpsum = true) {
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const investmentAmount = document.getElementById('investment-amount');
    const tenureSelect = document.getElementById('tenure-select');
    const investedAmountEl = document.getElementById('invested-amount');
    const currentValueEl = document.getElementById('current-value');
    const returnsEl = document.getElementById('returns');
    const startSipButton = document.getElementById('start-sip');
    const investmentLabel = document.getElementById('investment-label');

    let investmentType = defaultType;

    // Toggle between SIP and Lumpsum (only if both are shown)
    toggleOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Only allow toggle if both options are available
            if (!showSip || !showLumpsum) return;

            toggleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            investmentType = option.dataset.type;

            // Update label based on investment type
            if (investmentType === 'sip') {
                investmentLabel.textContent = sipLabel;
            } else {
                investmentLabel.textContent = lumpsumLabel;
            }

            calculateReturns();
        });
    });

    // Calculate returns when inputs change
    investmentAmount.addEventListener('input', calculateReturns);
    tenureSelect.addEventListener('change', calculateReturns);

    startSipButton.addEventListener('click', () => {
        alert('Redirecting to investment platform...');
    });

    function calculateReturns() {
        const amount = parseFloat(investmentAmount.value) || 0;
        const tenure = parseInt(tenureSelect.value) || 1;

        let investedAmount, currentValue;

        if (investmentType === 'sip') {
            // SIP calculation
            const monthlyRate = returnRate / 12;
            const months = tenure * 12;

            investedAmount = amount * months;

            // Future Value of SIP formula
            currentValue = amount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        } else {
            // Lumpsum calculation
            investedAmount = amount;
            currentValue = amount * Math.pow(1 + returnRate, tenure);
        }

        // Calculate CAGR
        const cagr = Math.pow(currentValue / investedAmount, 1 / tenure) - 1;

        // Update display
        investedAmountEl.textContent = `₹${formatCurrency(investedAmount)}`;
        currentValueEl.textContent = `₹${formatCurrency(currentValue)}`;
        returnsEl.textContent = `${(cagr * 100).toFixed(2)}%`;
    }

    function formatCurrency(amount) {
        if (amount >= 10000000) {
            return `${(amount / 10000000).toFixed(1)} Cr`;
        } else if (amount >= 100000) {
            return `${(amount / 100000).toFixed(1)} Lac`;
        } else if (amount >= 1000) {
            return `${(amount / 1000).toFixed(1)}K`;
        }
        return amount.toFixed(0);
    }

    // Initial calculation
    calculateReturns();
}