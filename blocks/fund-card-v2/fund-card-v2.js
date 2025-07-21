import {
  a, div, h2, li, option, select, span, ul, p,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const fundsTaggingSection = block.fundsTaggingSection.slice(0, 2);
  const DirectPlanlistArr = block.planList.filter((el) => (el.planName === 'Regular' ? el.optionName : ''));
  const container = div(
    { class: 'card-container' },
    div(
      { class: 'cardWrapper' },
      div(
        { class: 'benchmarkStar' },
        div(
          { class: 'benchmarksec' },
          span(block.benchmark),
        ),
        div(
          { class: 'Star' },
          span('★'),
        ),
      ),
      div(
        { class: 'schemeName' },
        p(block.schDetail.schemeName),
      ),
      div(
        { class: 'dropdownTags' },
        div(
          { class: 'dropdown' },
          select(
            {
              'aria-label': 'Select Investment Plan',
            },
            ...DirectPlanlistArr.map((el) => option({
              value: el.groupedCode,
            }, el.optionName)),
          ),
        ),
        div(
          { class: 'fundTagging' },
          ul(
            { class: 'fundTaggingList' },
            ...fundsTaggingSection.map((eloption) => li(eloption.replaceAll('motilal-oswal:', '').replaceAll('-', ' ').toUpperCase())),
          ),
        ),
      ),
      div(
        { class: 'returnBtn' },
        div(
          { class: 'cagrValue' },
          h2('15.28%'),
        ),
        div(
          { class: 'btnKnowMore' },
          a('Know More'),
        ),
      ),
    ),
  );

  return container;
}
