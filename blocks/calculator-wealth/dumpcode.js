
// export default function decorate(block) {
//     const rows = [...block.children];
//     block.innerHTML = ''; // Clear original

//     const tabWrapper = div({ class: 'tab-wrapper' },
//         button({ class: 'tab active', type: 'button' }, 'SIP'),
//         button({ class: 'tab', type: 'button' }, 'LUMPSUM')
//     );

//     const investedLabel = rows[0]?.querySelector('p')?.textContent || 'IF YOU HAD INVESTED';
//     const tenureLabel = rows[1]?.querySelector('p')?.textContent || 'TENURE';
//     const investedAmountLabel = rows[2]?.querySelector('p')?.textContent || 'INVESTED AMOUNT';
//     const cagrLabel = rows[3]?.querySelector('p')?.textContent || 'CAGR';
//     const returnsLabel = rows[4]?.querySelector('p')?.textContent || 'ANNUAL RETURNS';

//     const investedSlider = input({ type: 'range', min: 1000, max: 1000000, step: 1000, value: 1000, class: 'slider' });
//     const investedValue = span({ class: 'slider-value' }, '₹1,000');

//     investedSlider.addEventListener('input', () => {
//         investedValue.textContent = `₹${(+investedSlider.value).toLocaleString()}`;
//         updateReturns();
//     });

//     const tenureDropdown = select({ class: 'tenure-dropdown' },
//         option({ value: 1 }, '1 YEAR'),
//         option({ value: 3, selected: true }, '3 YEARS'),
//         option({ value: 5 }, '5 YEARS'),
//         option({ value: 10 }, '10 YEARS')
//     );

//     const investedAmount = span({ class: 'invested-amount' }, '₹12,000');
//     const cagrValue = span({ class: 'cagr-value' }, '21.5%');
//     const returnsOutput = span({ class: 'returns-output' }, '₹43,260');

//     const investBtn = button({ class: 'invest-btn' }, 'INVEST NOW');

//     // Assemble calculator layout
//     block.append(
//         tabWrapper,
//         div({ class: 'invested-block' },
//             span({ class: 'label' }, investedLabel),
//             investedValue,
//             investedSlider
//         ),
//         div({ class: 'row' },
//             div({ class: 'tenure-block' }, span({ class: 'label' }, tenureLabel), tenureDropdown),
//             div({ class: 'amount-block' }, span({ class: 'label' }, investedAmountLabel), investedAmount),
//             div({ class: 'cagr-block' }, span({ class: 'label' }, cagrLabel), cagrValue)
//         ),
//         div({ class: 'result-block' },
//             span({ class: 'label' }, returnsLabel),
//             returnsOutput,
//             investBtn
//         )
//     );

//     // Update output calculation
//     function updateReturns() {
//         const principal = +investedSlider.value;
//         const years = +tenureDropdown.value;
//         const cagr = 21.5;

//         const total = principal * Math.pow(1 + cagr / 100, years);
//         returnsOutput.textContent = `₹${Math.round(total).toLocaleString()}`;

//         investedAmount.textContent = `₹${(principal * (years * 12)).toLocaleString()}`;
//     }

//     updateReturns();

//     tenureDropdown.addEventListener('change', updateReturns);
//     investedSlider.addEventListener('change', updateReturns);
//     investBtn.addEventListener('click', () => {
//         alert('Investment process initiated!');
//     })

// }

// -------------------------------------------
// export default function decorate(block) {
//     console.log("CALCULATOR WEALTH BLOCK", block);
//     const rows = [...block.children];

//     rows.forEach((row, index) => {
//         const label = row.querySelector('p');

//         switch (index) {
//             case 0: // IF YOU HAD INVESTED
//                 label.after(
//                     input({ type: 'number', min: 1000, step: 1000, value: 100000, class: 'invested-input' })
//                 );
//                 break;

//             case 1: // TENURE
//                 label.after(
//                     input({ type: 'number', min: 1, max: 50, value: 10, class: 'tenure-input' })
//                 );
//                 break;

//             case 2: // INVESTED AMOUNT (optional – skip if same as above)
//                 // You can remove this row or leave empty
//                 row.style.display = 'none'; // Hiding if it's duplicate
//                 break;

//             case 3: // CAGR
//                 label.after(
//                     input({ type: 'number', step: 0.1, value: 12, class: 'cagr-input' })
//                 );
//                 break;

//             case 4: // ANNUAL RETURNS
//                 const output = span({ class: 'returns-output' }, '₹ 0');
//                 const calcBtn = button({ class: 'calculate-wealth' }, 'Calculate');
//                 label.after(output, calcBtn);
//                 break;
//         }
//     });

//     // Calculation logic
//     block.querySelector('.calculate-wealth').addEventListener('click', () => {
//         const invested = +block.querySelector('.invested-input')?.value || 0;
//         const tenure = +block.querySelector('.tenure-input')?.value || 0;
//         const cagr = +block.querySelector('.cagr-input')?.value || 0;

//         const finalValue = invested * Math.pow(1 + cagr / 100, tenure);
//         block.querySelector('.returns-output').textContent =
//             `₹ ${finalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
//     });
// }
