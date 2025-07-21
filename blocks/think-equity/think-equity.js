import { loadCSS } from '../../scripts/aem.js';

export default function decorate(block) {
  Array.from(block.children).forEach((el, index) => {
    el.classList.add(`imagelist${index + 1}`);
    Array.from(el.children).forEach((elsub) => {
      elsub.classList.add('subimagelist');
    });
  });
  loadCSS(import.meta.url.replace('.js', '.css'));
}
