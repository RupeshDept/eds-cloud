import {div,h1,label,p, select} from "../../scripts/dom-helpers.js"
export default function decorate(block){
    console.log(block);
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
                    h1("sdcfvgbnasdfg"),
                    p("asdfgh sdfghdc asdf")
                )
            ),
            div({class:"scheme-sub-part container"},
                div({class:"schemeWrapper"},
                    div({class:"tagsPlansection"},
                        div({class:"tagsPlanWrapper"},
                            ul(
                                li({class:"taggingSection"}),
                                li({class:"planDropdown"}),
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
                    block.querySelector(".fundDetails2"),
                    block.querySelector(".fundDetails1 p")
                )
            )        
        )
    )
}