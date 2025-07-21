import dataCfObj from '../../scripts/dataCfObj.js';
import fundCardBlock from '../fund-card-v2/fund-card-v2.js';
import fundcardblock from '../fund-card/fund-card.js';

export default function decorate(block) {
  Array.from(block.children).forEach((element) => {
    element.classList.add('compound-item');
    Array.from(element.children).forEach((subelement) => {
      subelement.classList.add('compound-sub-item');
    });
  });

  if (block.closest(".compound-journey")) {//[...block.classList].includes('compound-journey')
    const dataCF = dataCfObj.slice(0, 3);
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('card-items');
    dataCF.forEach((el) => {
      const cardV2 = fundCardBlock(el);
      divWrapper.append(cardV2);
    });

    block.querySelector('.compound-item').append(divWrapper);
  }
  if (block.closest(".index-fund")) { //[...block.classList].includes('index-fund')
    const dataCF = dataCfObj.slice(0, 2);
    const divWrapper = document.createElement('div');
    divWrapper.classList.add('card-items');
    dataCF.forEach((el) => {
      const cardV2 = fundcardblock(el);
      divWrapper.append(cardV2);
    });

    block.querySelector('.compound-item').append(divWrapper);
  }
}
