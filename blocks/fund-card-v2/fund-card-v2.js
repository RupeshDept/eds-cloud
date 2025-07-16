import {a, div, h2, li, option, select, span, ul} from "../../scripts/dom-helpers.js"
export default function decorate(block){
    let fundsTaggingSection =  block.fundsTaggingSection.slice(0,2);
    let DirectPlanlistArr = block.planList.filter((el)=>{
        return el.planName === "Regular" ? el.optionName : ""
    })
    let container  = div({class:"card-container"},
        div({class:"cardWrapper"},
            div({class:"benchmarkStar"},
                div({class:"benchmarksec"},
                    span("NIFTY 500 ETF")
                ),
                div({ class: 'Star' },
                    span('★'),
                ),
            ),
            div({class:"schemeName"},
                p("Motilal Oswal Asset Allocation Passiv Fund Conservative")
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
                    h2(block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]]+"%"),
                ),
                div({class:"btnKnowMore"},
                    a("Know More")
                )
            )
        )
    )

    return container;
}