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
      console.log(child.children);
  
      const backgroundImage = backgroundImageEl?.querySelector('picture');
      if (backgroundImage) {
        initImage(backgroundImage, backgroundAltTextEl);
      }
  
     
  
      const title = titleEl?.textContent?.trim();
      console.log(title);
      const primaryCta = ctaUtils.getLink(
        ctaLinkEl,
        '',
        "__blank",
        'primary__btn',
      );
      let ctaHtml = '';
      if (primaryCta) {
        ctaHtml = `
          <div class="dealer__actions">
            ${primaryCta ? primaryCta.outerHTML : ''}
          </div>
        `;
      }
      if (title) {
        title.classList.add('dealer__title');
      }
      child.innerHTML = '';
      child.insertAdjacentHTML(
        'beforeend',
        utility.sanitizeHtml(`
          ${backgroundImage ? `<div class="dealer__backgroundImage">${backgroundImage.outerHTML}</div>` : ''}
          <div class="dealer__content">
            <div class="dealer__info">
             
              ${(title) ? `${title.outerHTML}` : ''}
             
            </div>
            ${ctaHtml}
          </div>
          
        `),
      );
      child.classList.add('dealer__card');
      return child.outerHTML;
    })
    .join('');
  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', utility.sanitizeHtml(cards));


  console.log(block);



}
