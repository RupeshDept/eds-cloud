/* eslint-disable */

import {
  div, a, label, input, span, button, ul,
} from '../../scripts/dom-helpers.js';
import moslFundData from './datacal.js';

export default function decorate(block) {
  const col1 = block.children[0].querySelectorAll('p');
  const col2 = block.children[1].querySelectorAll('p');
  const col3 = block.children[2].querySelectorAll('p');
  const col4 = block.children[3].querySelectorAll('p');

  const schemeNames = moslFundData.map((fund) => fund.schDetail.schemeName);

  let selectedFundCode = 'CP';
  let selectedFund = moslFundData.find((fund) => fund.schcode === selectedFundCode);
  let selectedFundName = selectedFund.schDetail.schemeName;
  let returnCAGR = parseFloat(col4[2].textContent.trim()) || 0;

  if (selectedFund) {
    const foundReturn = selectedFund.returns.find((ret) => ret.inception_Ret !== undefined);
    returnCAGR = foundReturn ? parseFloat(foundReturn.inception_Ret) : returnCAGR;
  }

  const calContainer = div(
    { class: 'cal-container' },
    div(
      { class: 'search-bar-wrapper' },
      span(col1[0].textContent.trim()),
      input({
        value: col1[1].textContent.trim(),
        type: 'text',
        placeholder: col1[0].textContent.trim(),
        name: 'searchFundInput',
        id: 'searchFundInput',
      }),
      div({ class: 'search-results-wrapper' }, ul({ id: 'searchResults' })),
    ),
    div(
      { class: 'scheme-btns-wrapper' },
      button({ class: 'sip-btn active' }, col1[2].textContent.trim()),
      button({ class: 'lumpsum-btn' }, col1[3].textContent.trim()),
    ),
    div(
      { class: 'investment-wrapper' },
      div(
        { class: 'sip-wrapper' },
        label({ class: 'labelforsip' }, col2[0].textContent.trim()),
        label({ class: 'labelforlumsum', style: 'display:none' }, col2[1].textContent.trim()),
        input({
          type: 'number',
          value: col2[2].textContent.trim(),
          name: 'investmentAmount',
          id: 'investmentAmount',
          placeholder: 'Enter amount',
        }),
      ),
      div(
        { class: 'tenure-wrapper' },
        label(col2[3].textContent.trim()),
        input({
          type: 'number',
          value: col3[0].textContent.trim(),
          name: 'investmentTenure',
          id: 'investmentTenure',
          placeholder: 'Enter tenure in years',
        }),
      ),
    ),
    div(
      { class: 'invested-amount' },
      div(
        { class: 'invested-amount-wrapper' },
        label(col3[1].textContent.trim()),
        span({ class: 'invested-amount-value' }, col3[2].textContent.trim()),
      ),
    ),
    div(
      { class: 'cal-discription' },
      div(
        { class: 'current-value-wrapper' },
        label(col3[3].textContent.trim()),
        span({ class: 'current-value' }, '0'),
      ),
      div(
        { class: 'return-cagr-wrapper' },
        label(col4[1].textContent.trim()),
        span({ class: 'return-cagr' }, `${returnCAGR.toFixed(2)}%`),
      ),
      div(
        { class: 'start-sip-btn' },
        button(col4[3].textContent.trim()),
      ),
    ),
  );

  const viewOthCalBtn = div(
    { class: 'view-btn-cal' },
    a(
      {
        href: col4[5].querySelector('a')?.href || '#',
        class: 'view-othercal-btn',
      },
      col4[4].textContent.trim(),
    ),
  );

  block.innerHTML = '';
  block.append(calContainer, viewOthCalBtn);

  let mode = 'sip';

  const sipBtn = calContainer.querySelector('.sip-btn');
  const lumpsumBtn = calContainer.querySelector('.lumpsum-btn');
  const amountInput = calContainer.querySelector('#investmentAmount');
  const tenureInput = calContainer.querySelector('#investmentTenure');
  const investedAmountSpan = calContainer.querySelector('.invested-amount-value');
  const currentValueSpan = calContainer.querySelector('.current-value');
  const returnCAGRSpan = calContainer.querySelector('.return-cagr');

  const searchInput = document.getElementById('searchFundInput');
  const searchResults = document.getElementById('searchResults');

  // function updateValues() {
  //   const amount = parseFloat(amountInput.value) || 0;
  //   const tenure = parseFloat(tenureInput.value) || 0;

  //   const r = returnCAGR / 100 / 12;
  //   const n = tenure * 12;

  //   let investedAmount = 0;
  //   let futureValue = 0;

  //   if (mode === 'sip') {
  //     investedAmount = amount * n;
  //     futureValue = amount * (((1 + r) ** n - 1) / r);
  //   } else {
  //     investedAmount = amount;
  //     const lumpsumRate = returnCAGR / 100;
  //     futureValue = amount * (1 + lumpsumRate) ** tenure;
  //   }

  //   investedAmountSpan.textContent = `₹${(investedAmount / 100000).toFixed(2)} Lac`;
  //   currentValueSpan.textContent = `₹${(futureValue / 100000).toFixed(2)} Lac`;
  //   returnCAGRSpan.textContent = `${parseFloat(returnCAGR).toFixed(2)}%`;
  // }

  function updateValues() {
    const amount = parseFloat(amountInput.value) || 0;
    const tenure = parseFloat(tenureInput.value) || 0;

    const investmentWrapper = document.querySelector('.investment-wrapper');
    const investedAmountEl = document.querySelector('.invested-amount');
    const calDescription = document.querySelector('.cal-discription');

    if (!returnCAGR || isNaN(returnCAGR) || returnCAGR <= 0) {
      investedAmountSpan.textContent = '—';
      currentValueSpan.textContent = '—';
      returnCAGRSpan.textContent = '—';

      if (!document.querySelector('.no-returns-msg')) {
        const msg = document.createElement('div');
        msg.className = 'no-returns-msg';
        msg.textContent = 'Returns for this fund are not provided because the scheme has not completed 1 year. Please select a different fund.';
        calContainer.appendChild(msg);
      }

      if (investmentWrapper) investmentWrapper.style.display = 'none';
      if (investedAmountEl) investedAmountEl.style.display = 'none';
      if (calDescription) calDescription.style.display = 'none';

      return;
    }

    // Remove message if exists:
    const oldMsg = document.querySelector('.no-returns-msg');
    if (oldMsg) oldMsg.remove();

    if (investmentWrapper) investmentWrapper.style.display = '';
    if (investedAmountEl) investedAmountEl.style.display = '';
    if (calDescription) calDescription.style.display = '';

    // Continue with calculations...
    const r = returnCAGR / 100 / 12;
    const n = tenure * 12;

    let investedAmount = 0;
    let futureValue = 0;

    if (mode === 'sip') {
      investedAmount = amount * n;
      futureValue = amount * (((1 + r) ** n - 1) / r);
    } else {
      investedAmount = amount;
      const lumpsumRate = returnCAGR / 100;
      futureValue = amount * (1 + lumpsumRate) ** tenure;
    }

    investedAmountSpan.textContent = `₹${(investedAmount / 100000).toFixed(2)} Lac`;
    currentValueSpan.textContent = `₹${(futureValue / 100000).toFixed(2)} Lac`;
    returnCAGRSpan.textContent = `${parseFloat(returnCAGR).toFixed(2)}%`;
  }


  amountInput.addEventListener('input', updateValues);
  tenureInput.addEventListener('input', updateValues);

  sipBtn.addEventListener('click', () => {
    mode = 'sip';
    sipBtn.classList.add('active');
    lumpsumBtn.classList.remove('active');
    updateValues();
  });

  lumpsumBtn.addEventListener('click', () => {
    mode = 'lumpsum';
    lumpsumBtn.classList.add('active');
    sipBtn.classList.remove('active');
    updateValues();
  });

  let currentFocus = -1;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    currentFocus = -1;

    const filtered = query
      ? schemeNames.filter((name) => name.toLowerCase().includes(query))
      : schemeNames;

    filtered.forEach((name) => {
      const li = document.createElement('li');
      const regex = new RegExp(`(${query})`, 'gi');
      li.innerHTML = name.replace(regex, '<strong>$1</strong>');

      li.addEventListener('click', () => {
        searchInput.value = name;
        selectedFundName = name;
        selectedFund = moslFundData.find((f) => f.schDetail.schemeName === name);
        returnCAGR = selectedFund?.returns.find((r) => r.inception_Ret)?.inception_Ret || 0;
        searchResults.innerHTML = '';
        updateValues();
      });

      searchResults.appendChild(li);
    });
  });

  // searchInput.addEventListener('keydown', (e) => {
  //   const items = searchResults.querySelectorAll('li');
  //   if (!items.length) return;

  //   if (e.key === 'ArrowDown') {
  //     currentFocus = Math.min(currentFocus + 1, items.length - 1);
  //     items.forEach(item => item.classList.remove('active'));
  //     items[currentFocus].classList.add('active');
  //   } else if (e.key === 'ArrowUp') {
  //     currentFocus = Math.max(currentFocus - 1, 0);
  //     items.forEach(item => item.classList.remove('active'));
  //     items[currentFocus].classList.add('active');
  //   } else if (e.key === 'Enter') {
  //     e.preventDefault();
  //     if (currentFocus > -1) items[currentFocus].click();
  //   }
  // });


  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('li');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      currentFocus++;
      addActive(items);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      currentFocus--;
      addActive(items);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFocus > -1) items[currentFocus].click();
    }
  });


  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.innerHTML = '';
    }
  });

  updateValues();


  // ✅ Wrap .default-content-wrapper + .calculator-sip-wrapper inside .compounding-two-inner
  const calculatorBlockWrapper = block.closest('.calculator-sip-wrapper');
  const section = calculatorBlockWrapper?.closest('.section');

  if (section) {
    const hero = section.querySelector('.default-content-wrapper');
    const calc = section.querySelector('.calculator-sip-wrapper');

    if (hero && calc && !hero.parentElement.classList.contains('compounding-two-inner')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'compounding-two-inner';

      section.insertBefore(wrapper, hero);
      wrapper.append(hero);
      wrapper.append(calc);
    }
  }


  function removeActive(items) {
    items.forEach((item) => item.classList.remove('active'));
  }

  function addActive(items) {
    if (!items) return;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = items.length - 1;
    if (currentFocus < 0) currentFocus = 0;
    items[currentFocus].classList.add('active');
    items[currentFocus].scrollIntoView({ block: 'nearest' });
  }


}
