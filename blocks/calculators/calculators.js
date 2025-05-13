/* eslint-disable */
import { div, input, button, label, select, option, p, h2 } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
    console.log(block);
    // populate on page with dom-helpers 
    const container = div({ class: 'container' },
        div(p({ class: "main-one" }, 'Main One')),
        div(p({ class: "main-two" }, 'Main Two'))
    )
    block.append(container)
}