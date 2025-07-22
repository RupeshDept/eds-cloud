import {
  a,
  div,
  h2,
  li,
  option,
  select,
  span,
  ul,
  p,
  img,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  const fundsTaggingSection = block.fundsTaggingSection.slice(0, 2);
  const finPlangrp = [];
  const tempReturns = [];
  block.returns.forEach((ret, jind) => {
    if (jind === 0) {
      for (const key in ret) {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      }
    }
    finPlangrp.push((ret.plancode + ret.optioncode));
  });

  const DirectPlanlistArr = Array.from(block.planList).filter((el) => {
    if (el.planName === 'Regular' && finPlangrp.includes(el.groupedCode)) {
      return el;
    }
  });

  const findcompval = Array.from(block.returns).filter((ret) => {
    if (DirectPlanlistArr.length !== 0 && DirectPlanlistArr[0].groupedCode === (ret.plancode + ret.optioncode)) {
      return ret;
    }
  });
  const coump = findcompval.length !== 0 ? findcompval[0][dataMapMoObj.ObjTemp[tempReturns[0]]] : 0;

  const styleLine = DirectPlanlistArr.length !== 0 ? 'block' : 'none';
  const container = div(
    {
      class: 'card-container',
      style: `display:${styleLine}`,
    },
    div(
      { class: 'card-wrapper' },
      div(
        { class: 'benchmark-star' },
        div({ class: 'benchmarksec' }, span(block.benchmark)),
        div(
          {
            class: 'star',
            onclick: (event) => {
              !Array.from(event.target.parentElement.classList).includes('star-filled') ? event.target.parentElement.classList.add('star-filled') : event.target.parentElement.classList.remove('star-filled');
            },
            schcode: block.schcode,
          },
          img({ class: 'star-icon', src: '../../icons/star.svg', alt: 'star-icon' }),
          img({ class: 'fillstar-icon', src: '../../icons/star-filled.svg', alt: 'fillstar-icon' }),
        ),
      ),
      div({ class: 'scheme-name' }, p(block.schDetail.schemeName)),
      div(
        { class: 'dropdown-tags' },
        select(
          {
            'aria-label': 'Select Investment Plan',
            onchange: (event) => {
              planListEvent(event, block);
            },
          },
          ...DirectPlanlistArr.map((el) => option(
            {
              value: el.groupedCode,
            },
            el.optionName,
          )),
        ),
        div(
          { class: 'fund-tagging' },
          ul(
            { class: 'fundtagging-list' },
            ...fundsTaggingSection.map((eloption) => li(
              eloption
                .replaceAll('motilal-oswal:', '')
                .replaceAll('-', ' ')
                .toUpperCase(),
            )),
          ),
        ),
      ),
      div(
        { class: 'return-btn' },
        div({ class: 'cagr-value' }, h2(`${coump}%`)),
        div({ class: 'btn-knowmore' }, a('Know More')),
      ),
    ),
  );

  return container;
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

      param.target.closest('.card-wrapper').querySelector('.return-btn h2').textContent = '';
      param.target.closest('.card-wrapper').querySelector('.return-btn h2').textContent = `${el[dataMapMoObj.ObjTemp[tempReturns[0]]]}%`;
    }
  });
}
