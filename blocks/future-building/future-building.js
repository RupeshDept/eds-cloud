/* eslint-disable */
import { loadCSS } from '../../scripts/aem.js';
import Swiper from '../swiper/swiper-bundle.min.js';

export default function decorate(block) {
    block.classList.add('swiper');

    const swiperWrapper = document.createElement('div');
    const swiperPagination = document.createElement('div');
    swiperPagination.classList.add('swiper-pagination');
    swiperWrapper.classList.add('swiper-wrapper');

    Array.from(block.children).forEach((row) => {
        row.classList.add('swiper-slide');

        // Add unique class to each direct <div> inside .swiper-slide
        const divs = row.querySelectorAll(':scope > div');
        divs.forEach((div, divIndex) => {
            div.classList.add(`swiper-slide-cards-${divIndex + 1}`);
        });

        swiperWrapper.appendChild(row);
    });

    block.appendChild(swiperWrapper);
    block.appendChild(swiperPagination);

    Swiper(block, {
        slidesPerView: "auto",
        spaceBetween: 16,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        loop: true,
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        pagination: {
            // el: swiperPagination,
            disabledClass: 'swiper-pagination-disabled',
        },
        breakpoints: {
            769: {
                spaceBetween: 16,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
            }
        },
    });
    loadCSS(import.meta.url.replace('.js', '.css'));
}
