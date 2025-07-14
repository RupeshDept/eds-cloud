/*eslint-disable */
import { div, a, label, h4, input, span, button } from '../../scripts/dom-helpers.js';
export default function decorate(block) {
    console.log('Calculator SIP block loaded', block);
    // const config = block.dataset || {};
    Array.from(block.children).forEach((child, index) => {
        child.classList.add('calContainer' + (index + 1));
    });
    let calContainer = div({ class: 'calContainer' },
        div({ class: "searchBarchWrapper" },
            span(block.querySelector('.calContainer1 p').textContent.trim()),
            input({
                value: block.querySelector('.calContainer2 p').textContent.trim(),
                type: "text",
                placeholder: "Search a fund",
                name: "searchFundInput",
                id: "searchFundInput",
            }),
        ),
        div({ class: "schemeBtnsWrapper" },
            button(block.querySelector('.calContainer3 p').textContent.trim()),
            button(block.querySelector('.calContainer4').textContent.trim()),
        ),
        div({ class: "investmentWrapper" },
            div({ class: "sipWrapper" },
                label({ class: "labelforsip" }, block.querySelector('.calContainer5').textContent.trim()),
                label({ class: "labelforlumsum", style: "display:none" }, block.querySelector('.calContainer6').textContent.trim()),
                input({
                    type: "number",
                    value: block.querySelector('.calContainer7').textContent.trim(),
                    name: "investmentAmount",
                    id: "investmentAmount",
                    placeholder: "Enter amount",
                }),
            ),
            div({ class: "tenureWrapper" },
                label(block.querySelector('.calContainer8').textContent.trim()),
                input({
                    type: "number",
                    value: block.querySelector('.calContainer9').textContent.trim(),
                    name: "investmentTenure",
                    id: "investmentTenure",
                    placeholder: "Enter tenure in years",
                }),
            )
        ),
        div({ class: "caldiscription" },
            div({ class: "currentValueWrapper" },
                label({ class: "labelforcurrvalueofinv" }, block.querySelector('.calContainer10')),
                span({ class: "currentValue" }, block.querySelector('.calContainer11').textContent.trim() || '0'),

            ),
            div({ class: "returnCagrWrapper" },
                label({ class: "labelforretrun" }, block.querySelector('.calContainer12')),
                span({ class: "returnCagr" }, block.querySelector('.calContainer13').textContent.trim() || '0'),
            ),
            div({ class: "startSipbtn" },
                // block.querySelector('.calContainer17'),
                button(block.querySelector('.calContainer17').textContent.trim()),
            )
        )
    )
    let viewOthCalBtn = div({ class: "viewBtnCal" },
        a({ href: block.querySelector('.calContainer18').textContent.trim() || '#', class: "viewOtherCalBtn" }, block.querySelector('.calContainer18').textContent.trim() || 'View other calculators')
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