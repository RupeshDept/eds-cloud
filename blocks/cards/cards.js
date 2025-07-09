import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { dataObjTemp } from '../../scripts/constant.js';
import dataCfObj from '../our-funds/dataCfObj.js';
import {
  div, h1, ul, li, option, p, select, span,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  /* change to ul, li */
  const ulCard = document.createElement('ul');
  [...block.children].forEach((row) => {
    const licard = document.createElement('li');
    moveInstrumentation(row, licard);
    while (row.firstElementChild) licard.append(row.firstElementChild);
    [...licard.children].forEach((divElem) => {
      if (divElem.children.length === 1 && divElem.querySelector('picture')) divElem.className = 'cards-card-image';
      else divElem.className = 'cards-card-body';
    });
    ulCard.append(li);
  });
  ulCard.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ulCard);

  Array.from(block.closest('.wrapper').children).forEach((el, index) => {
    if (index === 0) {
      el.classList.add('datacards');
    }
    if (index === 1) {
      el.classList.add('navlinks');
    }
  });

  if (block.closest('.datacards')) {
    const FundData = dataCfObj.filter((el) => {
      if (el.schDetail.schemeName === 'Motilal Oswal Large Cap Fund') { // Motilal Oswal Midcap Fund
        return el;
      }
    });
    const InvestMethod = 'Direct';
    const tempPlanArr = []; let navValue; const cagrArray = [];
    let cagrValue;
    FundData[0].planList.forEach((elm) => {
      if (elm.planName === InvestMethod) {
        tempPlanArr.push(elm);
      }
    });
    FundData[0].nav.forEach((elem) => {
      if ((elem.plancode + elem.optioncode) === tempPlanArr[0].groupedCode) {
        navValue = elem.latnav;
      }
    });
    FundData[0].returns.forEach((elreturn) => {
      if ((elreturn.plancode + elreturn.optioncode) === tempPlanArr[0].groupedCode) {
        Object.keys(elreturn).forEach((key) => {
          if (dataObjTemp[key]) {
            cagrArray.push(dataObjTemp[key]);
          }
        });
        cagrValue = elreturn[dataObjTemp[cagrArray[0]]];
      }
    });
    const fundDivcard = div(
      { class: 'funds-cards' },
      div(
        { class: 'Scheme-title-cotainer' },
        div(
          { class: 'Scheme-titleWrapper' },
          h1(FundData[0].schDetail.schemeName),
          p(FundData[0].typeOfScheme),
        ),
      ),
      div(
        { class: 'scheme-sub-part container' },
        div(
          { class: 'schemeWrapper' },
          div(
            { class: 'tagsPlansection' },
            div(
              { class: 'tagsPlanWrapper' },
              ul(
                li(
                  { class: 'taggingSection' },
                  span(FundData[0].fundsTaggingSection[1].replaceAll('motilal-oswal:', '').replaceAll('-', ' ').toUpperCase()),
                  span({ class: 'taggingLeft' }),
                  span(FundData[0].fundsTaggingSection[0].replaceAll('motilal-oswal:', '').toUpperCase().replaceAll('-', ' ')),
                ),
                li(
                  { class: 'planDropdown' },
                  select(
                    {
                      value: tempPlanArr[0].optionName,
                    },
                    ...tempPlanArr.map((el) => option({
                      value: el.optionName,
                      dataAttr: (el.planCode + el.optionCode),
                    }, el.optionName)),
                  ),
                  span({ class: 'bottonline' }),
                ),
              ),
            ),
          ),
        ),
      ),
      div(
        { class: 'formWrapper' },
        div('Form'),
        div('ICONS'),
      ),
    );
    block.innerHTML = '';
    block.append(fundDivcard);
  }

  document.querySelectorAll('.table-wrapper').forEach((el) => {
    document.querySelector('.navlinks').append(el);
  });

  document.querySelectorAll('.section .navlinks ul li a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');// scrollMap[];
      const target = document.querySelector(`.section[data-id="${targetId}"]`);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
