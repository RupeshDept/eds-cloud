// import { createElement } from '../../scripts/scripts.js';
import Swiper from '../swiper/swiper-bundle.min.js';

export default function decorate(block) {
    block.classList.add('swiper');

    const swiperWrapper = document.createElement('div');
    const swiperPagination = document.createElement('div');
    swiperPagination.classList.add('swiper-pagination');
    swiperWrapper.classList.add('swiper-wrapper');

    Array.from(block.children).forEach((row, index) => {
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
            el: swiperPagination,
            clickable: true,
        },
        breakpoints: {
            769: {
                spaceBetween: 16,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
            }
        },
    });
}
// This code initializes a Swiper instance on the block element, allowing for a responsive carousel of slides with pagination and autoplay functionality.
// Each slide is expected to contain direct child <div> elements, which are assigned unique classes based on their order within the slide. The Swiper instance is configured to handle different screen sizes, with specific settings for larger screens (769px and above). The autoplay feature is enabled, allowing the slides to automatically transition every 5 seconds, and pagination is included for user navigation. The code ensures that the Swiper functionality is applied correctly to the block element and its children.