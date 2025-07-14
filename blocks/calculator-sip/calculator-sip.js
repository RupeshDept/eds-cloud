/*eslint-disable */
import { div, a, label, h4, input, span, button } from '../../scripts/dom-helpers.js';
export default function decorate(block) {
    console.log('Calculator SIP block loaded', block);
    Array.from(block.children).forEach((child, index) => {
        child.classList.add('cal-container' + (index + 1));
    });
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
        ),
        div({ class: "scheme-btns-wrapper" },
            button(block.querySelector('.cal-container3 p').textContent.trim()),
            button(block.querySelector('.cal-container4').textContent.trim()),
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
        div({ class: "cal-discription" },
            div({ class: "current-value-wrapper" },
                label({ class: "label-for-currvalueof-inv" }, block.querySelector('.cal-container10')),
                span({ class: "current-value" }, block.querySelector('.cal-container11').textContent.trim() || '0'),

            ),
            div({ class: "return-cagr-wrapper" },
                label({ class: "labelforretrun" }, block.querySelector('.cal-container12')),
                span({ class: "return-cagr" }, block.querySelector('.cal-container13').textContent.trim() || '0'),
            ),
            div({ class: "start-sip-btn" },
                button(block.querySelector('.cal-container17').textContent.trim()),
            )
        )
    )
    let viewOthCalBtn = div({ class: "view-btn-cal" },
        a({ href: block.querySelector('.cal-container18').textContent.trim() || '#', class: "view-othercal-btn" }, block.querySelector('.cal-container18').textContent.trim() || 'View other calculators')
    );
    block.innerHTML = '';
    block.append(calContainer, viewOthCalBtn);
    

}




// const defaultFund = config.defaultfund || 'Motilal Oswal Mid cap fund';
    // const buttonText = config.buttontext || 'Start SIP';
    // const calculatorLink = config.calculatorlink || 'View other calculators';
    // const calculatorUrl = config.calculatorurl || '#';
    // const defaultAmount = parseInt(config.defaultamount) || 10000;
    // const defaultTenure = config.defaulttenure || '10';
    // const annualReturnRate = parseFloat(config.annualreturnrate) || 15;

    // // SIP and Lumpsum configuration
    // const sipLabel = config.siplabel || 'SIP';
    // const lumpsumLabel = config.lumpsumlabel || 'Lumpsum';
    // const sipInputLabel = config.sipinputlabel || 'If you would have invested monthly';
    // const lumpsumInputLabel = config.lumpsuninputlabel || 'If you would have invested';
    // const showSip = config.showsip !== 'false';
    // const showLumpsum = config.showlumpsum !== 'false'; 
    // const defaultInvestmentType = config.defaultinvestmenttype || 'sip';

    // Whats need to be Authorable
    // Search a fund 
    // SIP and Lumpsum  
    // If you would have invested monthly (for SIP)
    // If you would have invested (for Lumpsum) 
    // invested Amount
    // Tenure 
    // Current Value of Investment
    // Return (CAGR)
    // Start SIP 