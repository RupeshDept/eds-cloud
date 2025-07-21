import { loadCSS } from '../../scripts/aem.js';

export default function decorate() {
    loadCSS(import.meta.url.replace('.js', '.css'));
}