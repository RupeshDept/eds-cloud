import {
  button, div, h3, label, option, select, span, ul, li, h2, p, img
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from "../../scripts/constant.js"
export default function decorate(block) { 
  let fundsTaggingSection =  block.fundsTaggingSection.slice(0,2);
  let DirectPlanlistArr = block.planList.filter((el)=>{
    return el.planName === "Regular" ? el.optionName : ""
  })

  const tempReturns = [];
      block.returns.forEach((ret, jind) => {
        if (jind == 0) {
          for (const key in ret) {
            if (dataMapMoObj.ObjTemp[key]) {
              tempReturns.push(dataMapMoObj.ObjTemp[key]);
            }
          }
        }
      });

  const cardContainer = div(
    { class: 'card-container' },
    div(
      { class: 'card-wrapper' },
      div(
        { class: 'card-upper-title' },
        div(
          { class: 'title' },
          h2(block.schDetail.schemeName),
        ),
        div(
          { class: 'Star' },
          span('★'),
        ),
      ),
      div(
        { class: 'card-category' },
        div(
          { class: 'fundTagging' },
          ul({class:"fundTaggingList"},
            ...fundsTaggingSection.map((eloption)=>{
              return li(eloption.replaceAll('motilal-oswal:', '').replaceAll('-', ' ').toUpperCase())
            })
          ),
        ),
        div(
          { class: 'planlistDropdown' },
          select({
            onchange:(event)=>{
                  console.log(event.target.value);
                  console.log(event.target.closest(".card-wrapper").querySelector(".cagr-container .cagrDropdown"));
                  console.log(block.returns,block.planList,block.schDetail.schemeName);
                  planListEvent(event,block)
                }
              },
            ...DirectPlanlistArr.map((el)=>{
              return option({
                value:el.groupedCode,
              },el.optionName)
            })
          ),
        ),
      ),
      div(
        { class: 'cagr-container' },
        div(
          { class: 'cagrDropdown' },
          label('Return (Absolute)'),
          select({
            schemeCode: block.schcode,
            value:tempReturns[0],
            onchange:(event)=>{
               const cgarValue = block.returns[0][event.target.value];
               console.log(cgarValue);
               event.target.closest(".cagr-container").querySelector(".cagrValue h2").textContent =""
               event.target.closest(".cagr-container").querySelector(".cagrValue h2").textContent =cgarValue+"%"
            }
          },
             ...tempReturns.map((eloption, ind) => option({
                value: dataMapMoObj.ObjTemp[eloption],
              }, eloption))
          ),
        ),
        div(
          { class: 'cagrValue' },
          h2(block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]]+"%"),
          p({ class: 'schemeYet', style: 'display:none' }, 'Scheme is yet to complete 10 Years'),
          p({ class: 'cagrDate' }, '15th Mar 2020'),
        ),
      ),
      div(
        { class: 'risk-container' },
        label('Risk Factor'),
        span(block.risk.riskType),
      ),
      div(
        { class: 'discription' },
        p(
          { class: 'disChoosen' },
          'Chosen by',
          span({ class: 'disInvestor' }, '2.7 lakh investors'),
        ),
      ),
      div(
        { class: 'button-container' },
        button({ class: 'know-more' }, 'Know More'),
        button({ class: 'invest-now' }, 'Invest Now'),
      ),
    ),
  );
  return cardContainer;
}

function planListEvent(param, block) {
  const tempReturns = [],
    codeTempArr = [];
  block.returns.forEach((el) => {
    codeTempArr.push((el.plancode + el.optioncode))
    if (param.target.value === (el.plancode + el.optioncode)) {
      for (const key in el) {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      }
    }
  })
  param.target.closest(".card-wrapper").querySelector(".cagr-container").innerHTML = ""
  if (codeTempArr.includes(param.target.value) && tempReturns.length != 0) {
    param.target.closest(".card-wrapper").querySelector(".cagr-container").append(
      div({
          class: 'cagrDropdown'
        },
        label('Return (Absolute)'),
        select({
            schemeCode: block.schcode,
            value: tempReturns[0],
            onchange: (event) => {
              const cgarValue = block.returns[0][event.target.value];
              console.log(cgarValue);
              event.target.closest(".cagr-container").querySelector(".cagrValue h2").textContent = ""
              event.target.closest(".cagr-container").querySelector(".cagrValue h2").textContent = cgarValue + "%"
            }
          },
          ...tempReturns.map((eloption, ind) => option({
            value: dataMapMoObj.ObjTemp[eloption],
          }, eloption))
        ),
      ),
      div({
          class: 'cagrValue'
        },
        h2(block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]] + "%"),
        p({
          class: 'schemeYet',
          style: 'display:none'
        }, 'Scheme is yet to complete 10 Years'),
        p({
          class: 'cagrDate'
        }, '15th Mar 2020'),
      ),
    )
  } else {
    param.target.closest(".card-wrapper").querySelector(".cagr-container .cagrDropdown").append(
      div({
          class: 'cagrDropdown'
        },
        label('Return (Absolute)'),
        label("NA")
      ),
      div({
          class: 'cagrValue'
        },
        h2("NA"),
        p({
          class: 'schemeYet',
          style: 'display:none'
        }, 'Scheme is yet to complete 10 Years'),
        p({
          class: 'cagrDate'
        }, '15th Mar 2020'),
      ),
    )
  }
}