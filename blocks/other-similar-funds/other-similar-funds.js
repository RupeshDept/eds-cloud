// import { div, h2, h3, label, option, select,  p} from "../../scripts/dom-helpers";
import {
  div,
  h2,
  h3,
  label,
  option,
  select,
  p,
  button
} from '../../scripts/dom-helpers.js'
import {
  dataCfObj
} from "../our-fund/dataCfObj.js"
import SwiperBlock from "../swiper/swiper.js"
export default function decorate(block) {

  let ObjTemp = {
    "inception_Ret": "SINCE INCEPTION",
    "oneYear_Ret": "1 YEAR",
    "threeYear_Ret": "3 YEAR",
    "fiveYear_Ret": "5 YEAR",
    "sevenYear_Ret": "7 YEAR",
    "tenYear_Ret": "10 YEAR",
    "SINCE INCEPTION": "inception_Ret",
    "1 YEAR": "oneYear_Ret",
    "3 YEAR": "threeYear_Ret",
    "5 YEAR": "fiveYear_Ret",
    "7 YEAR": "sevenYear_Ret",
    "10 YEAR": "tenYear_Ret",
  }


  let FundData = dataCfObj.filter((el) => {
    if (el.schDetail.schemeName == "Motilal Oswal Large Cap Fund") { //Motilal Oswal Midcap Fund
      return el
    }
  })
  console.log(FundData);

  let FundSimilar = dataCfObj.filter((el, infex) => {
    if (el.fundsTaggingSection.includes(FundData[0].fundsTaggingSection[0]) && el.fundsTaggingSection.includes(FundData[0].fundsTaggingSection[1])) {
      return el
    }
  })
  console.log(FundSimilar);
  let FundMainContain = div({
    class: "FundMainContain"
  })
  FundSimilar.forEach((elm, index) => {
    let tempReturns = [],
      navValue;
    elm.returns.forEach((ret, jind) => {
      if (jind == 0) {
        for (const key in ret) {
          if (ObjTemp[key]) {   
            tempReturns.push(ObjTemp[key])
          }
        }
      }
    })
    
    let FundContainerDiv = div({
        class: "funcontainerdiv"
      },
      div({
          class: "upperfuncontainer"
        },
        h3(elm.schDetail.schemeName),
        div({
            class: "fundTaggingLabel"
          },
          (elm.fundsTaggingSection[1].replaceAll("motilal-oswal:", "").replaceAll("-", " ").toUpperCase() + " | " + elm.fundsTaggingSection[0].replaceAll("motilal-oswal:", "").toUpperCase().replaceAll("-", " "))
        )
      ),
      div({
          class: "downfuncontainer"
        },
        div({
            class: "subdownfuncontainer"
          },
          div({
              class: "nav-date-container innerblockcard"
            },
            label("NAV"),
            div({
                class: "navValue"
              },
              h3(Number( elm.nav[0].latnav).toFixed(2)),
              p("(-2.88%)")
            ),
            div({
                class: "navDate"
              },
              p("AS ON 06 MAY 2025")
            )
          ),
          div({
              class: "riskcontainer innerblockcard"
            },
            label("RISK"),
            p("Very High")
          ),
          div({
              class: "cagr-dropdown-container innerblockcard"
            },
            label("CAGR"),
            select({
                class: "dropContainer",
                dataInd:index,
                schemeCode:elm.schcode,
                onchange: (event) => {
                  FundSimilar.forEach((elem)=>{
                    if (event.target.getAttribute("schemecode") === elem.schcode) {
                        let cgarValue = elem.returns[0][event.target.value];
                        block.querySelectorAll(".cagr-date-container h3")[event.target.getAttribute("dataInd")].innerText = "";
                        block.querySelectorAll(".cagr-date-container h3")[event.target.getAttribute("dataInd")].innerText = cgarValue +"%";
                    }
                  })  
                  console.log(event.target.value);
                }
              },
              ...tempReturns.map((eloption, ind) => {
                return option({
                  "value": ObjTemp[eloption],
                  "selected": ind === 0 ? true : false
                }, eloption);
              })
            )
          ),
          div({
              class: "cagr-date-container innerblockcard"
            },
            h3(elm.returns[0][ObjTemp[tempReturns[0]]] +"%"),
            p("AS ON 06 MAY 2025")
          )
        )
      ),
      div({
          class: "descriptionFrame"
        },
        p("2.7 LAKH PEOPLE HAVE INVESTED IN THIS FUND")
      ),
      div({
          class: "btnContainer"
        },
        button("KNOW MORE"),
        button("INVEST NOW")
      )
    )
      FundMainContain.append(FundContainerDiv);
    

  })
  block.append(FundMainContain)
  let funcontainrClassList = [...block.classList];
  funcontainrClassList.forEach((el)=>{
    block.querySelector(".FundMainContain").classList.add(el)
  })
  SwiperBlock(block.querySelector(".FundMainContain"))
}