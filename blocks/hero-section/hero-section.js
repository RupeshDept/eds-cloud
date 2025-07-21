/* eslint-disable */

import { loadCSS } from '../../scripts/aem.js';

export default function decorate(block) {
    // Get the original parts
    const imgContainer = block.children[0];
    const headingContainer = block.children[1];
    const subheadingContainer = block.children[2];

    // Create new wrappers
    const heroImage = document.createElement('div');
    heroImage.className = 'hero-image';
    heroImage.append(...imgContainer.childNodes);

    const heroText = document.createElement('div');
    heroText.className = 'hero-text';
    heroText.append(...headingContainer.childNodes, ...subheadingContainer.childNodes);

    // Clear old block & rebuild
    block.innerHTML = '';
    block.append(heroImage, heroText);
    loadCSS(import.meta.url.replace('.js', '.css'));
}
