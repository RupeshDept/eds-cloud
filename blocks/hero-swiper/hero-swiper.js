/* eslint-disable */

import Swiper from '../hero-swiper/swiper-bundle.min.js';


export default function decorate(block) {
    console.log('Hero Swiper Block Loaded', block);

    // Create main container
    const heroContainer = document.createElement('div');
    heroContainer.className = 'hero-swiper-container';

    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'hero-tabs';

    // Create content container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'hero-content';

    // Create swiper container for content
    const swiperContainer = document.createElement('div');
    swiperContainer.className = 'swiper hero-content-swiper';

    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';

    // Process each row in the block (each row represents a slide/feature)
    const rows = Array.from(block.children);
    const features = [];

    rows.forEach((row, index) => {
        const cells = Array.from(row.children);
        const feature = {
            title: '',
            icon: '',
            description: '',
            images: []
        };

        // Extract content from all cells
        cells.forEach((cell, cellIndex) => {
            // Check if cell contains text content (h3 or paragraphs)
            const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
            const paragraphs = cell.querySelectorAll('p');

            if (heading || paragraphs.length > 0) {
                // This cell contains text content
                if (heading) {
                    feature.title = heading.textContent.trim();
                }
                if (paragraphs.length > 0) {
                    feature.description = paragraphs[0].textContent.trim();
                }
            }

            // Check if cell contains images
            const images = cell.querySelectorAll('img');
            if (images.length > 0) {
                images.forEach(img => {
                    feature.images.push({
                        src: img.src,
                        alt: img.alt || feature.title || 'Feature image'
                    });
                });
            }
        });

        features.push(feature);

        // Create tab
        const tab = document.createElement('div');
        tab.className = `hero-tab ${index === 0 ? 'active' : ''}`;
        tab.dataset.index = index;

        // Add icon placeholder (you can customize this)
        const tabIcon = document.createElement('div');
        tabIcon.className = 'tab-icon';
        tabIcon.innerHTML = getFeatureIcon(feature.title);

        const tabTitle = document.createElement('span');
        tabTitle.className = 'tab-title';
        tabTitle.textContent = feature.title;

        tab.appendChild(tabIcon);
        tab.appendChild(tabTitle);
        tabsContainer.appendChild(tab);

        // Create slide
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const slideContent = document.createElement('div');
        slideContent.className = 'slide-content';

        // Text content
        const textContent = document.createElement('div');
        textContent.className = 'slide-text';

        const title = document.createElement('h2');
        title.className = 'slide-title';
        title.textContent = feature.title;

        const description = document.createElement('p');
        description.className = 'slide-description';
        description.textContent = feature.description;

        textContent.appendChild(title);
        textContent.appendChild(description);

        // Image content
        const imageContent = document.createElement('div');
        imageContent.className = 'slide-image';

        console.log('Feature images:', feature.images); // Debug log

        if (feature.images && feature.images.length > 0) {
            feature.images.forEach((imgData, imgIndex) => {
                const imgWrapper = document.createElement('div');
                imgWrapper.className = `image-wrapper ${imgIndex === 0 ? 'primary-image' : 'secondary-image'}`;

                const img = document.createElement('img');
                img.src = imgData.src;
                img.alt = imgData.alt;
                imgWrapper.appendChild(img);
                imageContent.appendChild(imgWrapper);
            });
        } else {
            console.log('No images found for feature:', feature.title);
        }

        slideContent.appendChild(textContent);
        slideContent.appendChild(imageContent);
        slide.appendChild(slideContent);
        swiperWrapper.appendChild(slide);
    });

    // Add navigation arrows
    const prevButton = document.createElement('div');
    prevButton.className = 'swiper-button-prev hero-nav-prev';
    prevButton.innerHTML = '←';

    const nextButton = document.createElement('div');
    nextButton.className = 'swiper-button-next hero-nav-next';
    nextButton.innerHTML = '→';

    // Assemble the structure
    swiperContainer.appendChild(swiperWrapper);
    contentContainer.appendChild(swiperContainer);
    contentContainer.appendChild(prevButton);
    contentContainer.appendChild(nextButton);

    heroContainer.appendChild(tabsContainer);
    heroContainer.appendChild(contentContainer);

    // Replace the original block content
    block.innerHTML = '';
    block.appendChild(heroContainer);

    // Initialize Swiper
    const swiper = new Swiper('.hero-content-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        speed: 500,

        navigation: {
            nextEl: '.hero-nav-next',
            prevEl: '.hero-nav-prev',
        },

        on: {
            slideChange: function () {
                updateActiveTab(this.activeIndex);
            }
        }
    });

    // Tab click functionality
    function updateActiveTab(index) {
        const tabs = tabsContainer.querySelectorAll('.hero-tab');
        tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });
    }

    // Add click events to tabs
    tabsContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.hero-tab');
        if (tab) {
            const index = parseInt(tab.dataset.index);
            swiper.slideTo(index);
            updateActiveTab(index);
        }
    });

    console.log('Hero Swiper initialized:', swiper);
}

// Helper function to get icons based on feature titles
function getFeatureIcon(title) {
    const iconMap = {
        'brakes': '🛑',
        'technology': '⚙️',
        'suspension': '🔧',
        'seat': '🪑',
        'indicator': '💡',
        'engine': '🔋',
        'safety': '🛡️',
        'comfort': '✨'
    };

    const lowerTitle = title.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
        if (lowerTitle.includes(key)) {
            return icon;
        }
    }
    return '📋'; // Default icon
}