/* eslint-disable */
import { div, a, label, input, span, button, ul } from '../../scripts/dom-helpers.js';
import moslFundData from './datacal.js';

export default function decorate(block) {
    console.log('Calculator SIP block loaded', block);
    Array.from(block.children).forEach((child, index) => {
        child.classList.add('cal-container' + (index + 1));
    });

    console.log('moslFundData', moslFundData);

    // 1️⃣ Filter scheme names
    const schemeNames = moslFundData.map(fund => fund.schDetail.schemeName);
    console.log('Scheme Names:', schemeNames);

    // 2️⃣ Find selected fund & CAGR
    let selectedFundCode = 'CP';
    let selectedFund = moslFundData.find(fund => fund.schcode === selectedFundCode);
    let selectedFundName = selectedFund.schDetail.schemeName;
    let returnCAGR = 0;
    if (selectedFund) {
        const foundReturn = selectedFund.returns.find(ret => ret.inception_Ret !== undefined);
        returnCAGR = foundReturn ? parseFloat(foundReturn.inception_Ret) : 0;
    }

    // 3️⃣ Build your block
    let calContainer = div({ class: 'cal-container' },
        div({ class: "search-bar-wrapper" },
            span(block.querySelector('.cal-container1 p').textContent.trim()),
            input({
                value: block.querySelector('.cal-container2 p').textContent.trim(),
                type: "text",
                placeholder: "Search a fund",
                name: "searchFundInput",
                id: "searchFundInput",
            }),
            div({ class: "search-results-wrapper" },
                ul({ id: "searchResults" })
            )
        ),
        div({ class: "scheme-btns-wrapper" },
            button({ class: "sip-btn active" }, block.querySelector('.cal-container3 p').textContent.trim()),
            button({ class: "lumpsum-btn" }, block.querySelector('.cal-container4').textContent.trim()),
        ),
        div({ class: "investment-wrapper" },
            div({ class: "sip-wrapper" },
                label({ class: "labelforsip" }, block.querySelector('.cal-container5').textContent.trim()),
                label({ class: "labelforlumsum", style: "display:none" }, block.querySelector('.cal-container6').textContent.trim()),
                input({
                    type: "number",
                    value: block.querySelector('.cal-container7').textContent.trim(),
                    name: "investmentAmount",
                    id: "investmentAmount",
                    placeholder: "Enter amount",
                }),
            ),
            div({ class: "tenure-wrapper" },
                label(block.querySelector('.cal-container8').textContent.trim()),
                input({
                    type: "number",
                    value: block.querySelector('.cal-container9').textContent.trim(),
                    name: "investmentTenure",
                    id: "investmentTenure",
                    placeholder: "Enter tenure in years",
                }),
            )
        ),
        div({ class: "invested-amount" },
            div({ class: "invested-amount-wrapper" },
                label({}, block.querySelector('.cal-container10').textContent.trim()),
                span({ class: "invested-amount-value" }, block.querySelector('.cal-container11').textContent.trim()),
            )
        ),
        div({ class: "cal-discription" },
            div({ class: "current-value-wrapper" },
                label({ class: "label-for-currvalueof-inv" }, block.querySelector('.cal-container12').textContent.trim()),
                span({ class: "current-value" }, '0'),
            ),
            div({ class: "return-cagr-wrapper" },
                label({ class: "labelforretrun" }, block.querySelector('.cal-container12').textContent.trim()),
                span({ class: "return-cagr" }, `${returnCAGR.toFixed(2)}%`),
            ),
            div({ class: "start-sip-btn" },
                button(block.querySelector('.cal-container17').textContent.trim()),
            )
        )
    );

    let viewOthCalBtn = div({ class: "view-btn-cal" },
        a({ href: block.querySelector('.cal-container19').textContent.trim() || '#', class: "view-othercal-btn" }, block.querySelector('.cal-container18').textContent.trim() || 'View other calculators')
    );

    block.innerHTML = '';
    block.append(calContainer, viewOthCalBtn);

    // 4️⃣ Get elements
    const sipBtn = calContainer.querySelector('.sip-btn');
    const lumpsumBtn = calContainer.querySelector('.lumpsum-btn');
    const sipLabel = calContainer.querySelector('.labelforsip');
    const lumpsumLabel = calContainer.querySelector('.labelforlumsum');
    const sipAmountInput = calContainer.querySelector('#investmentAmount');
    const tenureInput = calContainer.querySelector('#investmentTenure');
    const investedAmountSpan = calContainer.querySelector('.invested-amount-value');
    const currentValueSpan = calContainer.querySelector('.current-value');
    const returnCAGRSpan = calContainer.querySelector('.return-cagr');

    let mode = 'sip'; // default mode

    // 5️⃣ Update calculation
    function updateValues() {
        const amount = parseFloat(sipAmountInput.value) || 0;
        const tenure = parseInt(tenureInput.value) || 0;

        const r = returnCAGR / 100 / 12; // monthly
        const n = tenure * 12;

        let investedAmount = 0;
        let futureValue = 0;

        if (mode === 'sip') {
            investedAmount = amount * n;
            if (r > 0) {
                futureValue = amount * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
            }
        } else if (mode === 'lumpsum') {
            investedAmount = amount;
            const lumpsumRate = returnCAGR / 100;
            futureValue = amount * Math.pow(1 + lumpsumRate, tenure);
        }

        investedAmountSpan.textContent = `₹${(investedAmount / 100000).toFixed(2)} Lac`;
        currentValueSpan.textContent = `₹${(futureValue / 100000).toFixed(2)} Lac`;
        returnCAGRSpan.textContent = `${returnCAGR.toFixed(2)}%`;
    }

    // 6️⃣ Attach inputs
    sipAmountInput.addEventListener('input', updateValues);
    tenureInput.addEventListener('input', updateValues);

    // 7️⃣ Toggle mode handlers
    sipBtn.addEventListener('click', () => {
        mode = 'sip';
        sipBtn.classList.add('active');
        lumpsumBtn.classList.remove('active');
        sipLabel.style.display = '';
        lumpsumLabel.style.display = 'none';
        updateValues();
    });

    lumpsumBtn.addEventListener('click', () => {
        mode = 'lumpsum';
        lumpsumBtn.classList.add('active');
        sipBtn.classList.remove('active');
        sipLabel.style.display = 'none';
        lumpsumLabel.style.display = '';
        updateValues();
    });

    // 8️⃣ Search functionality with proper update
    const searchInput = document.getElementById('searchFundInput');
    const searchResults = document.getElementById('searchResults');

    let currentFocus = -1;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        currentFocus = -1;

        let filteredFunds;

        if (query.length === 0) {
            // ✅ If empty, show ALL funds
            filteredFunds = schemeNames;
        } else {
            filteredFunds = schemeNames.filter(name =>
                name.toLowerCase().includes(query)
            );
        }

        filteredFunds.forEach(name => {
            const li = document.createElement('li');

            if (query.length > 0) {
                // ✅ Highlight match
                const regex = new RegExp(`(${query})`, 'gi');
                li.innerHTML = name.replace(regex, '<strong>$1</strong>');
            } else {
                li.textContent = name;
            }

            li.addEventListener('click', () => {
                searchInput.value = name;
                searchResults.innerHTML = '';
                console.log(`User selected: ${name}`);

                // ✅ Update selected fund + CAGR
                const foundFund = moslFundData.find(fund => fund.schDetail.schemeName === name);
                if (foundFund) {
                    selectedFund = foundFund;
                    selectedFundCode = foundFund.schcode;
                    const foundReturn = foundFund.returns.find(ret => ret.inception_Ret !== undefined);
                    returnCAGR = foundReturn ? parseFloat(foundReturn.inception_Ret) : 0;
                    updateValues();
                }
            });

            searchResults.appendChild(li);
        });
    });


    // Listen for keydown for arrow + enter
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
        } else if (e.key === 'PageDown') {
            currentFocus += 5;
            addActive(items);
            e.preventDefault();
        } else if (e.key === 'PageUp') {
            currentFocus -= 5;
            addActive(items);
            e.preventDefault();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1 && items[currentFocus]) {
                items[currentFocus].click();
            }
        } else if (e.key === 'Escape' || e.key === 'Esc') {
            searchResults.innerHTML = '';
            currentFocus = -1;
        }

    });

    function addActive(items) {
        if (!items) return;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = items.length - 1;
        if (currentFocus < 0) currentFocus = 0;
        items[currentFocus].classList.add('active');
        items[currentFocus].scrollIntoView({ block: 'nearest' });
    }

    function removeActive(items) {
        items.forEach(item => item.classList.remove('active'));
    }

    // li.addEventListener('click', () => {
    //     searchInput.value = name;
    //     selectedFundName = name;
    //     searchResults.innerHTML = '';
    //     console.log(`User selected: ${name}`);

    //     // ✅ UPDATE fund selection!
    //     const foundFund = moslFundData.find(fund => fund.schDetail.schemeName === name);
    //     if (foundFund) {
    //         selectedFund = foundFund;
    //         selectedFundCode = foundFund.schcode;

    //         const foundReturn = foundFund.returns.find(ret => ret.inception_Ret !== undefined);
    //         returnCAGR = foundReturn ? parseFloat(foundReturn.inception_Ret) : 0;

    //         updateValues();
    //     }
    // });


    // Auto-hide when clicking outside
    // document.addEventListener('click', (e) => {
    //     if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    //         searchResults.innerHTML = '';
    //     }
    // });

    document.addEventListener('click', (e) => {
        console.log('Clicked inside block:', e.target);
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.innerHTML = '';
            if (searchInput.value.trim() === '') {
                searchInput.value = selectedFundName;
            }
        }
    });

    // 9️⃣ Init
    updateValues();
}
