import { div, p } from "../../scripts/dom-helpers.js"
export default function decorate(block) {
    console.log(block)
    document.querySelector('.pms-navbar ul').classList.add('pms-navbar-ul')

    Array.from(document.getElementsByClassName('pms-navbar-ul')).forEach(function (item) {
        Array.from(item.children).forEach(function (list) {
            console.log(list.textContent)
            const classTemp = list.textContent
            const temp = classTemp.split(' ').join('-')
            list.classList.add(temp)
        })
    })

    document.querySelector('.pms-navbar-ul').addEventListener('click', function (e) {
        console.log(e.target.textContent)
        const currTarget = e.target.textContent
        const currTargetClass = currTarget.split(' ').join('-')
        console.log(currTargetClass);
        const testtt = document.querySelector('.' + currTargetClass + '-view')
        testtt.scrollIntoView({ behavior: 'smooth' })
        document.querySelectorAll('.pms-navbar-view').forEach(function (item) {
            Array.from(item.children).forEach(function (item) {
                item.children[0].classList.remove('view')
            })
        })
        testtt.classList.add('view')
    })


    // populate on page with dom-helpers 
    const faqContainer = div({ class: 'pms-navbar-view' },
        div(p({ class: "Strategy-Construct-view" }, 'Strategy Construct')),
        div(p({ class: "Investment-Philosophy-view" }, 'Investment-Philosophy')),
        div(p({ class: "Performance-view" }, 'Performance')),
        div(p({ class: "Portfolio-view" }, 'Portfolio')),
        div(p({ class: "Fund-Manager-view" }, 'Fund Manager')),
        div(p({ class: "Strategy-Details-view" }, 'Strategy Details')),
        div(p({ class: "PMS-Strategies-view" }, 'PMS Strategies'))



    )
    block.append(faqContainer)
    // document.querySelectorAll('.pms-navbar-view').forEach(function (item) {
    //     Array.from(item.children).forEach(function (item) {
    //         item.children[0].classList.remove('view')
    //     })
    // })

}