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

export default function decorate(block) {
  const fundsTaggingSection = block.fundsTaggingSection.slice(0, 2);
  const DirectPlanlistArr = block.planList.filter((el) => (el.planName === 'Regular' ? el.optionName : ''));
  const container = div(
    { class: 'card-container' },
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
        div({ class: 'cagr-value' }, h2('15.28%')),
        div({ class: 'btn-knowmore' }, a('Know More')),
      ),
    ),
  );

  return container;
}
