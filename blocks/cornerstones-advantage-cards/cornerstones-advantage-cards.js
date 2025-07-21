import { loadCSS } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardsChildren = block.querySelectorAll('.cornerstones-advantage-cards > div');
  cardsChildren.forEach((ele) => {
    ele.classList.add('cards-item');
  });
  loadCSS(import.meta.url.replace('.js', '.css'));
}
