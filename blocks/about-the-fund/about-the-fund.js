/* eslint-disable */

import { div, label, ul, li, p, h4 } from '../../scripts/dom-helpers.js'

export default function decorate(block) {
    console.log('About the Fund block loaded');
    block.children[0].classList.add('fund-title')
    block.children[1].classList.add('fund-container')

    const fundTitles = []
    Array.from(block.querySelector('.fund-container div').children).forEach(function (item) {
        fundTitles.push(item.textContent.trim())
    })
    // console.log(fundTitles); // ["Investment Objective", "Application Amount", "Redemption Amount", "Exit Load", "Launched On", "Locked in Period", "Expense Ratio", "Benchmark", "Scheme Ratio"]

    const fundUls = div({ class: 'fund-uls' },
        ...fundTitles.map((title, index) => {
            return div({ class: title.toLowerCase().replace(/\s+/g, '-') + " div" + (index + 1) },
                h4({ class: 'fund-label' }, title),
                ul({ class: title },
                    li({ class: title }, "test item 1"),
                ))
        })
    )
    block.querySelector('.fund-container').innerHTML = ''
    block.querySelector('.fund-container').append(fundUls);

}