import {a, div, h2, li, option, select, span, ul, p, img} from "../../scripts/dom-helpers.js"
import dataMapMoObj from "../../scripts/constant.js"
export default function decorate(block){
    let fundsTaggingSection =  block.fundsTaggingSection.slice(0,2);
    let DirectPlanlistArr = block.planList.filter((el)=>{
        return el.planName === "Regular" ? el.optionName : ""
    })
    let container  = div({class:"card-container"},
        div({class:"cardWrapper"},
            div({class:"benchmarkStar"},
                div({class:"benchmarksec"},
                    span(block.benchmark)
                ),
                div({ class: 'Star' },
                    span('★'),
                ),
            ),
            div({class:"schemeName"},
                p(block.schDetail.schemeName)
            ),
            div({class:"dropdownTags"},
                div({class:"dropdown"},
                    select(
                        ...DirectPlanlistArr.map((el)=>{
                            return option({
                                value:el.groupedCode,
                                },el.optionName)
                            })
                    ),
                ),
                div({ class: 'fundTagging' },
                    ul({class:"fundTaggingList"},
                        ...fundsTaggingSection.map((eloption)=>{
                            return li(eloption.replaceAll('motilal-oswal:', '').replaceAll('-', ' ').toUpperCase())
                        })
                    ),
                ),
            ),
            div({class:"returnBtn"},
                div({ class: 'cagrValue' },
                    h2("15.28%"),
                ),
                div({class:"btnKnowMore"},
                    a("Know More")
                )
            )
        )
    )

    return container;
}