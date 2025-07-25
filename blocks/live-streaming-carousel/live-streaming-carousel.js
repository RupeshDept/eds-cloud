import Swiper from '../swiper/swiper-bundle.min.js';
import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  block.classList.add('swiper');
  const swiperWrapper = div({ class: 'swiper-wrapper' });

  Array.from(block.children).forEach((ele) => {
    ele.classList.add('swiper-slide');
    swiperWrapper.append(ele);
  });

  const pagination = div({ class: 'swiper-pagination' });
  const nextBtn = div({ clasS: 'swiper-button-next' });
  const prevBtn = div({ clasS: 'swiper-button-prev' });
  block.append(swiperWrapper);
  block
    .closest('.live-streaming-carousel-wrapper')
    .append(pagination, nextBtn, prevBtn);

  const wrapper = block.closest('.live-streaming-carousel-wrapper');
  const mobPageLine = div({ class: 'mobile-pagination-line' });
  wrapper.append(mobPageLine);

  Swiper(block, {
    loop: false,
    pagination: {
      el: wrapper.querySelector('.swiper-pagination'),
      type: 'fraction',
      formatFractionCurrent(number) {
        return number < 10 ? `0${number}` : number;
      },
      formatFractionTotal(number) {
        return number < 10 ? `0${number}` : number;
      },
      renderFraction(currentClass, totalClass) {
        return (
          `<span class="${currentClass}"></span>`
          + ' / '
          + `<span class="${totalClass}"></span>`
        );
      },
    },
    navigation: {
      nextEl: block
        .closest('.live-streaming-carousel-wrapper')
        .querySelector('.swiper-button-next'),
      prevEl: block
        .closest('.live-streaming-carousel-wrapper')
        .querySelector('.swiper-button-prev'),
    },
  });
}
