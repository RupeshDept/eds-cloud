import Swiper from '../swiper/swiper-bundle.min.js';
import { div } from '../../scripts/dom-helpers.js';
import { loadCSS } from '../../scripts/aem.js';

export default function decorate(block) {
  const swiperWrapper = div({ class: 'swiper-wrapper' });
  block.classList.add('swiper');
  Array.from(block.children).forEach((ele) => {
    ele.classList.add('sub-home-banner', 'swiper-slide');
    Array.from(ele.children).forEach((innerEle, i) => {
      innerEle.classList.add(`sub-banner-item-${i + 1}`);
    });
    swiperWrapper.append(ele);
  });

  //   Create div for pagination and buttons
  const paginationDiv = div({ class: 'swiper-pagination' });
  const nextBtn = div({ class: 'swiper-button-next' });
  const prevBtn = div({ class: 'swiper-button-prev' });

  Swiper(block, {
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: block.querySelector('.swiper-button-next'),
      prevEl: block.querySelector('.swiper-button-prev'),
    },
  });
  block.append(swiperWrapper, paginationDiv, nextBtn, prevBtn);
  loadCSS(import.meta.url.replace('.js', '.css'));
}

// export default function decorate(block) {
//   console.log(block)
//   loadCSS(import.meta.url.replace('.js', '.css'));

// }
