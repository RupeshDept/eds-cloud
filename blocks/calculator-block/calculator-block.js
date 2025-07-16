/* eslint-disable */
import {
  div, a, label, input, span, button, ul,
} from '../../scripts/dom-helpers.js';
import moslFundData from '../calculator-sip/datacal.js';

export default function decorate(block) {
  // ✅ Add unique index per block
  const blockIndex = Array.from(document.querySelectorAll('.calculator-block-wrapper')).indexOf(block.closest('.calculator-block-wrapper'));

  const calculatorBlockWrapper = block.closest('.calculator-block-wrapper');
  const section = calculatorBlockWrapper?.closest('.section');

  if (section) {
    const hero = section.querySelector('.hero-section-wrapper');
    const calc = section.querySelector('.calculator-block-wrapper');

    if (hero && calc && !hero.parentElement.classList.contains('compounding-two-inner')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'compounding-two-inner';
      section.insertBefore(wrapper, hero);
      wrapper.append(hero);
      wrapper.append(calc);
    }
  }

  const rows = Array.from(block.children);

  const searchPlaceholder = rows[0].children[1].textContent.trim();
  const defaultFund = rows[1].children[1].textContent.trim();
  const sipLabel = rows[2].children[1].textContent.trim();
  const lumpsumLabel = rows[3].children[1].textContent.trim();
  const sipInputLabel = rows[4].children[1].textContent.trim();
  const lumpsumInputLabel = 'If you would have invested';
  const defaultAmount = rows[4].children[2].textContent.trim();
  const tenureInputLabel = rows[5].children[1].textContent.trim();
  const defaultTenure = rows[5].children[2].textContent.trim().replace(' years', '');
  const investedAmountLabel = rows[6].children[1].textContent.trim();
  const currentValueLabel = rows[7].children[1].textContent.trim();
  const returnCagrLabel = rows[8].children[1].textContent.trim();
  const returnCagrValue = parseFloat(rows[8].children[2].textContent.trim()) || 0;
  const startSipText = rows[9].children[1].textContent.trim();
  const otherCalText = rows[10].children[1].textContent.trim();

  // ✅ Add unique IDs
  const searchInputId = `searchFundInput-${blockIndex}`;
  const searchResultsId = `searchResults-${blockIndex}`;
  const investmentAmountId = `investmentAmount-${blockIndex}`;
  const investmentTenureId = `investmentTenure-${blockIndex}`;

  const calContainer = div(
    { class: 'cal-container' },
    div(
      { class: 'search-bar-wrapper' },
      span(searchPlaceholder),
      input({
        value: defaultFund,
        type: 'text',
        placeholder: searchPlaceholder,
        name: searchInputId,
        id: searchInputId,
      }),
      div(
        { class: 'search-results-wrapper' },
        ul({ id: searchResultsId }),
      ),
    ),
    div(
      { class: 'scheme-btns-wrapper' },
      button({ class: 'sip-btn active' }, sipLabel),
      button({ class: 'lumpsum-btn' }, lumpsumLabel),
    ),
    div(
      { class: 'investment-wrapper' },
      div(
        { class: 'sip-wrapper' },
        label({ class: 'labelforsip' }, sipInputLabel),
        label({ class: 'labelforlumsum', style: 'display:none' }, lumpsumInputLabel),
        input({
          type: 'number',
          value: defaultAmount,
          name: investmentAmountId,
          id: investmentAmountId,
          placeholder: 'Enter amount',
        }),
      ),
      div(
        { class: 'tenure-wrapper' },
        label(tenureInputLabel),
        input({
          type: 'number',
          value: defaultTenure,
          name: investmentTenureId,
          id: investmentTenureId,
          placeholder: 'Enter tenure in years',
        }),
      ),
    ),
    div(
      { class: 'invested-amount' },
      div(
        { class: 'invested-amount-wrapper' },
        label({}, investedAmountLabel),
        span({ class: 'invested-amount-value' }, '0'),
      ),
    ),
    div(
      { class: 'cal-discription' },
      div(
        { class: 'current-value-wrapper' },
        label({}, currentValueLabel),
        span({ class: 'current-value' }, '0'),
      ),
      div(
        { class: 'return-cagr-wrapper' },
        label({}, returnCagrLabel),
        span({ class: 'return-cagr' }, `${returnCagrValue.toFixed(2)}%`),
      ),
      div(
        { class: 'start-sip-btn' },
        button(startSipText),
      ),
    ),
  );

  const viewOthCalBtn = div(
    { class: 'view-btn-cal' },
    a({ href: '#', class: 'view-othercal-btn' }, otherCalText),
  );

  block.innerHTML = '';
  block.append(calContainer, viewOthCalBtn);

  const sipBtn = calContainer.querySelector('.sip-btn');
  const lumpsumBtn = calContainer.querySelector('.lumpsum-btn');
  const sipLabelEl = calContainer.querySelector('.labelforsip');
  const lumpsumLabelEl = calContainer.querySelector('.labelforlumsum');
  const sipAmountInput = calContainer.querySelector(`#${investmentAmountId}`);
  const tenureInput = calContainer.querySelector(`#${investmentTenureId}`);
  const investedAmountSpan = calContainer.querySelector('.invested-amount-value');
  const currentValueSpan = calContainer.querySelector('.current-value');
  const returnCAGRSpan = calContainer.querySelector('.return-cagr');

  const searchInput = document.getElementById(searchInputId);
  const searchResults = document.getElementById(searchResultsId);

  let mode = 'sip';
  let selectedFundName = defaultFund;
  let selectedFund = moslFundData.find((fund) => fund.schDetail.schemeName === defaultFund) || {};
  let returnCAGR = returnCagrValue;

  function updateValues() {
    const amount = parseFloat(sipAmountInput.value) || 0;
    const tenure = parseInt(tenureInput.value, 10) || 0;
    const r = returnCAGR / 100 / 12;
    const n = tenure * 12;

    let investedAmount = 0;
    let futureValue = 0;

    if (mode === 'sip') {
      investedAmount = amount * n;
      if (r > 0) {
        futureValue = amount * ((((1 + r) ** n - 1) / r) * (1 + r));
      }
    } else {
      investedAmount = amount;
      futureValue = amount * (1 + returnCAGR / 100) ** tenure;
    }

    investedAmountSpan.textContent = `₹${(investedAmount / 100000).toFixed(2)} Lac`;
    currentValueSpan.textContent = `₹${(futureValue / 100000).toFixed(2)} Lac`;
    returnCAGRSpan.textContent = `${returnCAGR.toFixed(2)}%`;
  }

  sipBtn.addEventListener('click', () => {
    mode = 'sip';
    sipBtn.classList.add('active');
    lumpsumBtn.classList.remove('active');
    sipLabelEl.style.display = '';
    lumpsumLabelEl.style.display = 'none';
    updateValues();
  });

  lumpsumBtn.addEventListener('click', () => {
    mode = 'lumpsum';
    lumpsumBtn.classList.add('active');
    sipBtn.classList.remove('active');
    sipLabelEl.style.display = 'none';
    lumpsumLabelEl.style.display = '';
    updateValues();
  });

  sipAmountInput.addEventListener('input', updateValues);
  tenureInput.addEventListener('input', updateValues);

  let currentFocus = -1;

  function selectFund(name) {
    searchInput.value = name;
    selectedFundName = name;
    searchResults.innerHTML = '';
    const found = moslFundData.find((f) => f.schDetail.schemeName === name);
    if (found) {
      selectedFund = found;
      const inceptionRetObj = found.returns.find((ret) => ret.inception_Ret);
      const inceptionRet = inceptionRetObj ? inceptionRetObj.inception_Ret : undefined;
      returnCAGR = parseFloat(inceptionRet) || returnCagrValue;
      updateValues();
    }
  }

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';
    currentFocus = -1;

    const filteredFunds = query === '' ? moslFundData.map((f) => f.schDetail.schemeName) : moslFundData.map((f) => f.schDetail.schemeName).filter((name) => name.toLowerCase().includes(query));

    filteredFunds.forEach((name) => {
      const li = document.createElement('li');
      const regex = new RegExp(`(${query})`, 'gi');
      li.innerHTML = name.replace(regex, '<strong>$1</strong>');
      li.addEventListener('click', () => selectFund(name));
      searchResults.appendChild(li);
    });
  });

  function removeActive(items) {
    items.forEach((item) => item.classList.remove('active'));
  }

  function addActive(items) {
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items[currentFocus].classList.add('active');
  }

  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('li');
    if (!items.length) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      currentFocus += 1;
      addActive(items);
      e.preventDefault();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      currentFocus -= 1;
      addActive(items);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFocus > -1) items[currentFocus].click();
    } else if (e.key === 'Escape') {
      searchResults.innerHTML = '';
      searchInput.value = selectedFundName;
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      if (searchInput.value === '') searchInput.value = selectedFundName;
      searchResults.innerHTML = '';
    }
  });

  updateValues();
}
