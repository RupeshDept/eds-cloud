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
  label,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';

function planListEvent(param, block) {
  const tempReturns = [];
  const codeTempArr = [];
  block.returns.forEach((el) => {
    codeTempArr.push((el.plancode + el.optioncode));
    if (param.target.value === (el.plancode + el.optioncode)) {
      Object.keys(el).forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });

      param.target.closest('.card-wrapper').querySelector('.return-btn h2').textContent = '';
      param.target.closest('.card-wrapper').querySelector('.return-btn h2').textContent = `${el[dataMapMoObj.ObjTemp[tempReturns[0]]]}%`;
    }
  });
}
export default function decorate(block) {
  const fundsTaggingSection = block.fundsTaggingSection.slice(0, 2);
  const finPlangrp = [];
  const tempReturns = [];
  block.returns.forEach((ret, jind) => {
    if (jind === 0) {
      Object.keys(ret).forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });
    }
    finPlangrp.push((ret.plancode + ret.optioncode));
  });

  // FIX: Simplified the filter to explicitly return a boolean value.
  const DirectPlanlistArr = Array.from(block.planList).filter((el) => (
    el.planName === 'Regular' && finPlangrp.includes(el.groupedCode)
  ));

  const findcompval = Array.from(block.returns).filter(
    (ret) => DirectPlanlistArr.length !== 0
      && DirectPlanlistArr[0].groupedCode === (ret.plancode + ret.optioncode),
  );
  const coump = findcompval.length !== 0 ? findcompval[0][dataMapMoObj.ObjTemp[tempReturns[0]]] : 0;

  const styleLine = DirectPlanlistArr.length !== 0 ? 'block' : 'none';
  const container = div(
    {
      class: 'card-container',
      style: `display:${styleLine}`,
    },
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
              if (!Array.from(event.target.parentElement.classList).includes('star-filled')) {
                event.target.parentElement.classList.add('star-filled');
              } else {
                event.target.parentElement.classList.remove('star-filled');
              }
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
        div(
          { class: 'cagr-value' },
          label('Return'),
          h2(`${coump}%`),
        ),
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
      Object.keys(el).forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });

      param.target.closest('.card-wrapper').querySelector('.return-btn h2').textContent = '';
      param.target.closest('.card-wrapper').querySelector('.return-btn h2').textContent = `${el[dataMapMoObj.ObjTemp[tempReturns[0]]]}%`;
    }
  });
}
