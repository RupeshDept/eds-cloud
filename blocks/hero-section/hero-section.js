/* eslint-disable */

export default function decorate(block) {
    const config = block.dataset || {};

    const title = config.title || 'Power of Compounding Starts Here';
    const subtitle = config.subtitle || 'Explore how much wealth you would have created by investing in our schemes using this SIP Calculator';
    const icon = config.icon || '📊';

    block.innerHTML = `
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-icon">${icon}</div>
        <div class="hero-text">
          <h1 class="hero-title">${title}</h1>
          <p class="hero-subtitle">${subtitle}</p>
        </div>
      </div>
    </div>
  `;
}