/* eslint-disable */
import {
  button, div, label, option, select, span, ul, li, h2, p, img,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';
import { loadCSS } from '../../scripts/aem.js';
export default function decorate(block) {
  const fundsTaggingSection = block.fundsTaggingSection.slice(0, 2);
  const DirectPlanlistArr = block.planList.filter((el) => (el.planName === 'Regular' ? el.optionName : ''));

  const tempReturns = [];
  block.returns.forEach((ret, jind) => {
    if (jind === 0) {
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
          { class: 'star' },
          img({ class: 'star-icon', src: '../../icons/star.svg' }),
          img({ class: 'fillstar-icon', src: '../../icons/star-filled.svg' }),
        ),
      ),
      div(
        { class: 'card-category' },
        div(
          { class: 'fund-tagging' },
          ul(
            { class: 'fundtagging-list' },
            ...fundsTaggingSection.map((eloption) => li(eloption.replaceAll('motilal-oswal:', '').replaceAll('-', ' ').toUpperCase())),
          ),
        ),
        div(
          { class: 'planlist-dropdown' },
          select(
            {
              onchange: (event) => {
                // console.log(event.target.value);
                // console.log(event.target.closest('.card-wrapper').querySelector('.cagr-container .cagr-dropdown'));
                // console.log(block.returns, block.planList, block.schDetail.schemeName);
                planListEvent(event, block);
              },
            },
            ...DirectPlanlistArr.map((el) => option({
              value: el.groupedCode,
            }, el.optionName)),
          ),
        ),
      ),
      div(
        { class: 'cagr-container not-provided' },
        div(
          { class: 'cagr-dropdown' },
          label('Return (Absolute)'),
          div(
            { class: 'cagr-select-wrapper' },
            select(
              {
                schemeCode: block.schcode,
                value: tempReturns[0],
                onchange: (event) => {
                  const cgarValue = block.returns[0][event.target.value];
                  event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = '';
                  event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = `${cgarValue}%`;
                },
              },
              ...tempReturns.map((eloption) => option({
                value: dataMapMoObj.ObjTemp[eloption],
              }, eloption)),
            ),
          ),
        ),
        div(
          { class: 'cagr-value' },
          h2(`${block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]]}%`),
          p({ class: 'scheme-yet', style: 'display:none' }, 'Scheme is yet to complete 10 Years'),
          p({ class: 'cagr-date' }, '15th Mar 2020'),
        ),
        div(
          { class: 'cagr-desc' },
          span('Return is not provided because thescheme has not completed 6 months'),
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
          { class: 'dis-choosen' },
          'Chosen by ',
          span({ class: 'dis-investor' }, '2.7 lakh investors'),
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
  const tempReturns = [];
  const codeTempArr = [];
  block.returns.forEach((el) => {
    codeTempArr.push((el.plancode + el.optioncode));
    if (param.target.value === (el.plancode + el.optioncode)) {
      for (const key in el) {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      }
    }
  });
  param.target.closest('.card-wrapper').querySelector('.cagr-container').innerHTML = '';
  if (codeTempArr.includes(param.target.value) && tempReturns.length !== 0) {
    param.target.closest('.card-wrapper').querySelector('.cagr-container').append(
      div(
        {
          class: 'cagr-dropdown',
        },
        label('Return (Absolute)'),
        select(
          {
            schemeCode: block.schcode,
            value: tempReturns[0],
            onchange: (event) => {
              const cgarValue = block.returns[0][event.target.value];
              event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = '';
              event.target.closest('.cagr-container').querySelector('.cagr-value h2').textContent = `${cgarValue}%`;
            },
          },
          ...tempReturns.map((eloption) => option({
            value: dataMapMoObj.ObjTemp[eloption],
          }, eloption)),
        ),
      ),
      div(
        {
          class: 'cagr-value',
        },
        h2(`${block.returns[0][dataMapMoObj.ObjTemp[tempReturns[0]]]}%`),
        p({
          class: 'scheme-yet',
          style: 'display:none',
        }, 'Scheme is yet to complete 10 Years'),
        p({
          class: 'cagr-date',
        }, '15th Mar 2020'),
      ),
    );
  } else {
    param.target.closest('.card-wrapper').querySelector('.cagr-container .cagr-dropdown').append(
      div(
        {
          class: 'cagr-dropdown',
        },
        label('Return (Absolute)'),
        label('NA'),
      ),
      div(
        {
          class: 'cagr-value',
        },
        h2('NA'),
        p({
          class: 'scheme-yet',
          style: 'display:none',
        }, 'Scheme is yet to complete 10 Years'),
        p({
          class: 'cagr-date',
        }, '15th Mar 2020'),
      ),
    );
  }
  loadCSS(import.meta.url.replace('.js', '.css'));
}
