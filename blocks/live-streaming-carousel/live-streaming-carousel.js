import Swiper from '../swiper/swiper-bundle.min.js';
import { div, p } from '../../scripts/dom-helpers.js';

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
  const customPagination = div(
    { class: 'custom-pagination' },
    p({ class: 'current-slide' }),
    p({ class: 'total-slide' }),
  );
  const wrapper = block.closest('.live-streaming-carousel-wrapper');

  block.append(swiperWrapper);
  wrapper.append(pagination, nextBtn, prevBtn, customPagination);
  // all, Current and total Slides
  const allSlides = block.querySelectorAll('.swiper-slide');
  const currentSlide = wrapper.querySelector('.custom-pagination .current-slide');
  const totalSlide = wrapper.querySelector('.custom-pagination .total-slide');
  // on load current and total must be some value
  currentSlide.textContent = '01 /';
  if (allSlides.length < 10) {
    totalSlide.textContent = `0${allSlides.length}`;
  } else {
    totalSlide.textContent = allSlides.length;
  }

  Swiper(block, {
    loop: false,
    pagination: {
      el: wrapper.querySelector('.swiper-pagination'),
      clickable: true,
    },
    navigation: {
      nextEl: wrapper.querySelector('.swiper-button-next'),
      prevEl: wrapper.querySelector('.swiper-button-prev'),
    },

    on: {
      slideChange(customSlide) {
        const current = customSlide.activeIndex + 1;
        const total = customSlide.slides.length;
        if (customSlide.activeIndex < 10) {
          currentSlide.textContent = `0${current} /`;
        } else {
          currentSlide.textContent = current;
        }
        if (customSlide.slides.length < 10) {
          totalSlide.textContent = `0${total}`;
        } else {
          totalSlide.textContent = total;
        }
      },
    },
  });
}
