import {
  div, h1, label, p, select, ul, li, option, span, input,
} from '../../scripts/dom-helpers.js';
import {
  dataCfObj,
} from '../our-fund/dataCfObj.js';

export default function decorate(block) {
  const ObjTemp = {
    inception_Ret: 'SINCE INCEPTION',
    oneYear_Ret: '1 YEAR',
    threeYear_Ret: '3 YEAR',
    fiveYear_Ret: '5 YEAR',
    sevenYear_Ret: '7 YEAR',
    tenYear_Ret: '10 YEAR',
    'SINCE INCEPTION': 'inception_Ret',
    '1 YEAR': 'oneYear_Ret',
    '3 YEAR': 'threeYear_Ret',
    '5 YEAR': 'fiveYear_Ret',
    '7 YEAR': 'sevenYear_Ret',
    '10 YEAR': 'tenYear_Ret',
  };
  const FundData = dataCfObj.filter((el) => {
    if (el.schDetail.schemeName == 'Motilal Oswal Large Cap Fund') { // Motilal Oswal Midcap Fund
      return el;
    }
  });
  const InvestMethod = 'Direct';
  const tempPlanArr = []; let navValue; const cagrArray = []; let
    cagrValue;
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
        if (ObjTemp[key]) {
          cagrArray.push(ObjTemp[key]);
        }
      });
      cagrValue = elreturn[ObjTemp[cagrArray[0]]];
    }
  });
  // console.log(FundData[0].fundsTaggingSection);

  Array.from(block.children).forEach((elem, index) => {
    elem.classList.add(`fundDetails${index + 1}`);
  });
  Array.from(block.querySelector('.fundDetails2').children).forEach((innerElement, jindex) => {
    innerElement.classList.add(`subfundDetails${jindex + 1}`);
  });

  const formDiv = div(
    { class: 'formOTP' },
    div(
      { class: 'formOTPWrapper' },
      div(
        { class: 'inputFields' },
        input({ placeholder: block.querySelector('.fundDetails2 .subfundDetails2').children.item(0).textContent, class: 'inputText', type: 'text' }),
        input({ value: block.querySelector('.fundDetails2 .subfundDetails2').children.item(1).textContent, class: 'inputBtn', readonly: true }),
      ),
      div(
        { class: 'belowContentField' },
        span({ class: 'otpdiscription' }, block.querySelector('.fundDetails2 .subfundDetails2').children.item(3).textContent),
        span({ class: 'resendOTP' }, block.querySelector('.fundDetails2 .subfundDetails2').children.item(2).textContent),
      ),
    ),
  );
  block.querySelector('.fundDetails2 .subfundDetails2').innerHTML = '';
  block.querySelector('.fundDetails2 .subfundDetails2').append(formDiv);
  Array.from(block.querySelector('.fundDetails1 ul').children).forEach((elinner, index) => {
    index === 0 ? elinner.querySelector('a').classList.add('active') : '';
    elinner.querySelector('a').addEventListener('click', (event) => {
      event.preventDefault();
      Array.from(block.querySelector('.buttonWrapper ul').children).forEach((el) => {
        el.querySelector('a').classList.remove('active');
      });
      event.target.classList.add('active');
    });
  });
  const innerBanner = div(
    { class: 'banner-container' },
    div(
      { class: 'bannerWrapper' },
      div(
        { class: 'button-container' },
        div(
          { class: 'buttonWrapper' },
          block.querySelector('.fundDetails1 ul'),
        ),
      ),
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
                li(
                  { class: 'direct_regular_togglesBtn' },
                  div(
                    { class: 'bttn-toggles' },
                    span({
                      class: 'regular',
                      onclick: (event) => {
                        Array.from(block.querySelector('.bttn-toggles').children).forEach((el) => {
                          el.classList.remove('active');
                        });
                        event.target.classList.add('active');
                      },
                    }, 'REGULAR'),
                    span({
                      class: 'direct active',
                      onclick: (event) => {
                        Array.from(block.querySelector('.bttn-toggles').children).forEach((el) => {
                          el.classList.remove('active');
                        });
                        event.target.classList.add('active');
                      },
                    }, 'DIRECT'),
                  ),
                ),
              ),
            ),
          ),
          div(
            { class: 'navCAGR_container' },
            div(
              { class: 'navCAGRWrapper' },
              div(
                { class: 'nav_container' },
                label('NAV'),
                div(
                  { class: 'navValueContainer' },
                  p({ class: 'navValue' }, navValue),
                  p({ class: 'navValuePercentage' }, '(-1.31%)'),
                  p({ class: 'navValueDate' }, 'As on 30/4/22'),
                ),
              ),
              div(
                { class: 'cagrContainer' },
                div(
                  { class: 'cagrValue' },
                  label('CAGR'),
                  p({ class: 'navValue' }, `${cagrValue}%`),
                ),
                div(
                  { class: 'cagrDropdown' },
                  select(
                    { value: cagrArray[0] },
                    ...cagrArray.map((el) => option(el)),

                  ),
                  p({ class: 'cagrValueDate' }, 'As on 30/4/22'),
                ),

              ),
            ),
          ),
          div(
            { class: 'discription_container' },
            span('2.7 LAKH PEOPLE HAVE INVESTED WITH AN AUM 22 CR NOW!'),
          ),
        ),
        div(
          { class: 'formWrapper' },
          block.querySelector('.fundDetails2'),
          block.querySelector('.fundDetails1 p'),
        ),
      ),
    ),
  );
  block.innerHTML = '';
  block.append(innerBanner);
}
