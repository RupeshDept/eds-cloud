import {
  button, div, h3, label, option, select, span, ul, li, h2, p,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  block.innerHTML = '';
  const cardContainer = div(
    { class: 'card-container' },
    div(
      { class: 'card-wrapper' },
      div(
        { class: 'card-upper-title' },
        div(
          { class: 'title' },
          h3('Motilal Oswal Asset Allocation Passive Fund Conversative'),
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
          ul(
            li('Indian Equity'),
            li('Mid Cap'),
          ),
        ),
        div(
          { class: 'planlistDropdown' },
          select(
            option('Growth'),
            option('IDWC Payout'),
          ),
        ),
      ),
      div(
        { class: 'cagr-container' },
        div(
          { class: 'cagrDropdown' },
          label('Return (Absolute)'),
          select(
            option('Since Inception'),
            option('1 YEAR'),
          ),
        ),
        div(
          { class: 'cagrValue' },
          h2('15.28%'),
          p({ class: 'schemeYet', style: 'display:none' }, 'Scheme is yet to complete 10 Years'),
          p({ class: 'cagrDate' }, '15th Mar 2020'),
        ),
      ),
      div(
        { class: 'risk-container' },
        label('Risk Factor'),
        span('Very High'),
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
  block.append(cardContainer);
}
