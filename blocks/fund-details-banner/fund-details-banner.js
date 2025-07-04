import {div,h1,label,p, select,ul,li,option,span} from "../../scripts/dom-helpers.js"
import {
  dataCfObj
} from "../our-fund/dataCfObj.js"
export default function decorate(block){
     let FundData = dataCfObj.filter((el) => {
        if (el.schDetail.schemeName == "Motilal Oswal Large Cap Fund") { //Motilal Oswal Midcap Fund
        return el
        }
    })
    let InvestMethod = "Direct"
    console.log(FundData[0].fundsTaggingSection);
    
    Array.from(block.children).forEach((elem,index)=>{
        elem.classList.add("fundDetails"+(index+1))
    })
    let innerBanner = div({class:"banner-container"},
        div({class:"bannerWrapper"},
            div({class:"button-container"},
               div({class:"buttonWrapper"},
                block.querySelector(".fundDetails1 ul")
               ) 
            ),
            div({class:"Scheme-title-cotainer"},
                div({class:"Scheme-titleWrapper"},
                    h1(FundData[0].schDetail.schemeName),
                    p(FundData[0].  typeOfScheme)
                )
            ),
            div({class:"scheme-sub-part container"},
                div({class:"schemeWrapper"},
                    div({class:"tagsPlansection"},
                        div({class:"tagsPlanWrapper"},
                            ul(
                                li({class:"taggingSection"},
                                    span(FundData[0].fundsTaggingSection[1].replaceAll("motilal-oswal:", "").replaceAll("-", " ").toUpperCase() + " | " + FundData[0].fundsTaggingSection[0].replaceAll("motilal-oswal:", "").toUpperCase().replaceAll("-", " "))
                                ),
                                li({class:"planDropdown"},
                                    select(
                                        option("aswedrfg")
                                    )
                                ),
                                li({class:"direct_regular_togglesBtn"})
                            )
                        )
                    ),
                    div({class:"navCAGR_container"},
                        div({class:"navCAGRWrapper"},
                            div({class:"nav_container"},
                                label("NAV"),
                                div({class:"navValueContainer"},
                                    p({class:"navValue"},"13.21"),
                                    p({class:"navValuePercentage"},"(-1.31%)"),
                                    p({class:"navValueDate"},"As on 30/4/22")
                                )
                            ),
                            div({class:"cagrContainer"},
                                div({class:"cagrValue"},
                                    label("CAGR"),
                                    p({class:"navValue"},"26.24%"), 
                                ),
                                div({class:"cagrDropdown"},
                                    select(
                                        option("asdf")
                                    ),
                                    p({class:"cagrValueDate"},"As on 30/4/22")
                                )

                            )
                        )
                    ),
                    div({class:"discription_container"},
                        span("2.7 LAKH PEOPLE HAVE INVESTED WITH AN AUM 22 CR NOW!")
                    )
                ),
                div({class:"formWrapper"},
                    block.querySelector(".fundDetails2 div"),
                    block.querySelector(".fundDetails1 p")
                )
            )        
        )
    )
    block.innerHTML = "";
    block.append(innerBanner);
}