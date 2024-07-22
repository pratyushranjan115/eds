import utility from '../../utility/utility.js';
import ctaUtils from '../../utility/ctaUtils.js';

export default function decorate(block) {

  function initImage(image, altTextEl) {
    const img = image.querySelector('img');
    img.removeAttribute('width');
    img.removeAttribute('height');
    const alt = altTextEl?.textContent?.trim() || 'image';
    img.setAttribute('alt', alt);
  }

  const cards = [...block.children]
    .map((child) => {
      const [
        backgroundImageEl,
        backgroundAltTextEl,
        titleEl,
        ctaLinkEl
      ] = child.children;

      const backgroundImage = backgroundImageEl?.querySelector('picture');
      if (backgroundImage) {
        initImage(backgroundImage, backgroundAltTextEl);
      }

      const title = titleEl?.textContent?.trim();
      const primaryCta = ctaUtils.getLink(
        ctaLinkEl,
        '',
        '__blank',
        'primary__btn',
      );

      child.innerHTML = '';
      const link = primaryCta?.href || '#';
      child.insertAdjacentHTML(
        'beforeend',
        utility.sanitizeHtml(`
        <li>
        <a href="${link}">
          <div class="d-grid-item">
            ${backgroundImage ? `<div class="d-grid-item-icon">${backgroundImage.outerHTML}</div>` : ''}
            ${title ? `<div class="d-grid-item-title">${title}</div>` : ''}
          </div>
        </a>
      </li>
        `),
      );
      return child.outerHTML;
    })
    .join('');

  block.innerHTML = `
  <ul class="dealer-menu">
    ${cards}
  </ul>
`;
  block.classList.add('grey-bg');
}

// Assuming your CSS is in a separate file, make sure it is properly imported and applied.
