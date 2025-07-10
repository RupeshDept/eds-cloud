/*eslint-disable */

export default function decorate(block) {
    console.log('Calculator SIP block loaded', block);
    const config = block.dataset || {};

    const defaultFund = config.defaultfund || 'Motilal Oswal Mid cap fund';
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

}
