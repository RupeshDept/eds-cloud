/* eslint-disable */


export default function decorate(block) {
    console.log(block);


    // Example usage
    const result = window.addToCartDateLogic.validateSipDebitDate(
        '2025-05-29',
        'fortnightly',
        '2025-05-28'
    );

    if (result) {
        alert(result); // Show validation error
    } else {
        console.log('SIP date is valid!');
    }

}