/* eslint-disable */

import test from "./Animated.js"
import test2 from "./index.js"
import test3 from "./xy.js"

export default function decorate(block) {
    // Get the block's text content
    const textContent = block.textContent.trim();

    // Create a new div element to hold the graph
    const graphDiv = document.createElement('div');
    graphDiv.id = 'chartdiv';

    // Set the inner HTML of the graph div with the text content
    graphDiv.innerHTML = `<p>${textContent}</p>`;

    // Append the graph div to the block
    block.appendChild(graphDiv);

    // AMCharts initialization
    if (typeof am4core !== 'undefined') {
        // Use the imported modules to create the chart
        test();
        test2();
        test3();
    } else {
        console.error('AMCharts library is not loaded.');
    }

}