import Swiper from '../swiper/swiper-bundle.min.js';
import { div } from '../../scripts/dom-helpers.js';

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

  swiperWrapper.querySelectorAll('img').forEach((el, ind) => {
    if (ind === 0) {
      el.setAttribute('loading', 'eager');
    }
  });
  const paginationDiv = div({ class: 'swiper-pagination' });
  const nextBtn = div({ class: 'swiper-button-next' });
  const prevBtn = div({ class: 'swiper-button-prev' });

  block.append(swiperWrapper, paginationDiv, nextBtn, prevBtn);
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
}
