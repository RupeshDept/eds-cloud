import { div, ul, li, p } from "../../scripts/dom-helpers.js"
import buildBlockDecorate from '../accordion/accordion.js'

export default async function decorate(block) {
    const path = block.textContent.trim()
    block.textContent = "";
    const res = await fetch(path)
    const data = await res.json()
    const mydata = data.data
    console.log(mydata);
    const list = [li({ class: 'active' }, 'All')]


    // populate on page with dom-helpers 
    const faqContainer = div({ class: 'block accordion' },
        ...mydata.map((item) => {
            list.push(li(item.Category))
            return div(
                div(p(item.Name)),
                div(p(item.Details))
            )
        })
    )
    block.append(ul({ class: "filter-ul" }, ...list))
    buildBlockDecorate(faqContainer)
    block.append(faqContainer)


    // Click Events
    document.querySelectorAll('.filter-ul li').forEach(function (li) {
        li.addEventListener('click', function (e) {
            document.querySelectorAll('.filter-ul li').forEach(function (item) {
                item.classList.remove('active')
            })
            const selectedFilter = e.target.textContent
            e.target.classList.add('active')

            const filteredData = []
            mydata.forEach(function (item) {
                console.log(item.Name)
                if (item.Name.includes(selectedFilter)) {
                    filteredData.push(item)
                }
            })
            document.querySelectorAll('.block .accordion').forEach(function (item) {
                item.remove()
            })
            if (selectedFilter == 'All') {
                filteredData.length = 0;
                mydata.forEach(item => filteredData.push(item));
            }

            // populate on page with dom-helpers 
            const faqContainerFiltered = div({ class: 'block accordion' },
                ...filteredData.map((item) => {
                    return div(
                        div(p(item.Name)),
                        div(p(item.Details))
                    )
                })
            )
            buildBlockDecorate(faqContainerFiltered)
            block.append(faqContainerFiltered)
        })
    })
}


