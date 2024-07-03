export default function decorateTeaser(block) {
    function getTeaserData(block) {
      const [backgroundImageContainer, contentContainer] = block.children;
  
      const backgroundImgEl = backgroundImageContainer.querySelector('picture');
      const backgroundImgAltEl = backgroundImgEl?.querySelector('img');
  
      const [pretitleEl, titleEl, descriptionEl] = contentContainer.querySelectorAll('p');
  
      const backgroundImg = backgroundImgEl?.querySelector('img');
      if (backgroundImg) {
        backgroundImg.removeAttribute('width');
        backgroundImg.removeAttribute('height');
        const alt = backgroundImgAltEl?.getAttribute('alt') || 'image';
        backgroundImg.setAttribute('alt', alt);
      }
  
      const pretitle = pretitleEl?.textContent?.trim();
      const title = titleEl?.textContent?.trim();
      const description = Array.from(descriptionEl ? [descriptionEl] : []).map((p) => p.outerHTML).join('');
  
      return {
        backgroundImg,
        pretitle,
        title,
        description
      };
    }
  
    const teaserData = getTeaserData(block);
  
    const teaserHtml = `
      <div class="teaser__wrapper">
        ${(teaserData.backgroundImg) ? teaserData.backgroundImg.outerHTML : ''}
        <div class="teaser__content">
          ${(teaserData.pretitle) ? `<p>${teaserData.pretitle}</p>` : ''}
          ${(teaserData.title) ? `<h3>${teaserData.title}</h3>` : ''}
          ${(teaserData.description) ? `${teaserData.description}` : ''}
        </div>
      </div>
    `;
  
    block.innerHTML = teaserHtml;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const teaserBlock = document.querySelector('.block.teaser');
    if (teaserBlock) {
      decorateTeaser(teaserBlock);
    }
  });
  