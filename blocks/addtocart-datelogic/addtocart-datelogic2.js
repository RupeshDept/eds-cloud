/* eslint-disable */


/* Formats a JS Date object to "DD-MM-YYYY" */
function formatDate(date) {
    const d = new Date(date);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}


/**
 * Fortnightly SIP logic:
 * - Allowed days: 1, 7, 14, 21, 28
 * - If 29/30/31 → go to monthEnd
 * - Else → find next closest allowed date
 */
function fortnightlyCal(selectedDate) {

    // Allowed dates
    const allowedDates = [1, 7, 14, 21, 28];
    const date = new Date(selectedDate);
    const day = date.getDate();

    // If day is 29, 30, or 31 → return result of monthEnd(date)
    if (day >= 29) return monthEnd(date);

    // Else if day not in allowed list → return next closest allowed date
    if (!allowedDates.includes(day)) {
        const nextAllowed = allowedDates.find(d => d > day);
        if (nextAllowed) date.setDate(nextAllowed);
        else return monthEnd(date); // fallback if none found
    }

    return formatDate(date);
}


/**
 * For monthly and fallback logic:
 * - If date is 29, 30, 31 → moves to 1st of next month
 * - Otherwise keeps the same
 */
function monthEnd(date) {
    const d = new Date(date);
    const day = d.getDate();

    // If day is 29–31 → set to 1st of next month
    if (day >= 29) {
        d.setMonth(d.getMonth() + 1);
        d.setDate(1);
    }

    return formatDate(d);
}
/**
 * Weekly SIP logic:
 * - Avoid weekends
 * - If Sunday (0) → +1 day
 * - If Saturday (6) → +2 days
 */
function dailyCal(weekDay, currDate) {
    const date = new Date(currDate);
    // If Sunday (0) → add 1 day , If Saturday (6) → add 2 days Else → return as-is
    if (weekDay === 0) date.setDate(date.getDate() + 1); // Sunday
    else if (weekDay === 6) date.setDate(date.getDate() + 2);  // Saturday
    return formatDate(date);
}

/**
 * Daily SIP logic:
 * - 29–31 → shift to 1st of next month
 * - Avoid weekends for any resulting date
 */
function dailysipCal(day, month, year, weekDay, fullDate) {
    const date = new Date(`${year}-${month}-${day}`);

    if (day >= 29) {
        date.setMonth(date.getMonth() + 1);
        date.setDate(1);
    }

    const d = date.getDay();
    if (d === 0) date.setDate(date.getDate() + 1); // Sunday
    else if (d === 6) date.setDate(date.getDate() + 2); // Saturday

    return formatDate(date);
}

/**
 * Main SIP debit date validator
 * @ param {string|Date} userSelectedDate - date from input
 * @ param {string} frequency - SIP frequency (daily, weekly, etc.)
 * @ param {string|Date} dateHide - minimum allowed SIP start date
 * @ returns {null|string} null if valid, else error string
 */
function validateSipDebitDate(userSelectedDate, frequency, dateHide) {
    const date = new Date(userSelectedDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const weekDay = date.getDay();

    let expectedDate;

    switch (frequency.toLowerCase()) {
        case 'fortnightly':
            expectedDate = fortnightlyCal(date);
            break;
        case 'weekly':
            expectedDate = dailyCal(weekDay, date);
            break;
        case 'daily':
            expectedDate = dailysipCal(day, month, year, weekDay, date);
            break;
        default:
            expectedDate = monthEnd(date);
    }

    const formattedUserDate = formatDate(date);
    const formattedMinDate = formatDate(new Date(dateHide));

    if (formattedUserDate !== expectedDate) {
        return `Expected SIP date ${expectedDate}`;
    }

    if (date < new Date(dateHide)) {
        return `Please select date equal or more than ${formattedMinDate}`;
    }

    return null;
}

// Exporting for use in EDS-style inline JS
window.addToCartDateLogic = {
    formatDate,
    monthEnd,
    fortnightlyCal,
    dailyCal,
    dailysipCal,
    validateSipDebitDate,
};


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
