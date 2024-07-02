export default function decorateTeaser(block) {
    function getTeaserData() {
      const [
        backgroundImgEl,
        backgroundImgAltEl,
        pretitleEl,
        titleEl,
        titleTypeEl,
        descriptionEl
      ] = block.children;
  
      const backgroundImg = backgroundImgEl?.querySelector('picture');
      if (backgroundImg) {
        const img = backgroundImg.querySelector('img');
        img.removeAttribute('width');
        img.removeAttribute('height');
        const alt = backgroundImgAltEl?.textContent?.trim() || 'image';
        img.setAttribute('alt', alt);
      }
  
      const pretitle = pretitleEl?.textContent?.trim();
      const title = titleEl?.textContent?.trim();
      const titleType = titleTypeEl?.textContent?.trim() || 'h3';
      const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');
  
      return {
        backgroundImg,
        pretitle,
        title,
        titleType,
        description
      };
    }
  
    const teaserData = getTeaserData(block);
  
    const teaserHtml = `
      <div class="teaser__wrapper">
        ${(teaserData.backgroundImg) ? teaserData.backgroundImg.outerHTML : ''}
        <div class="teaser__content">
          ${(teaserData.pretitle) ? `<p>${teaserData.pretitle}</p>` : ''}
          ${(teaserData.title) ? `<${teaserData.titleType}>${teaserData.title}</${teaserData.titleType}>` : ''}
          ${(teaserData.description) ? `${teaserData.description}` : ''}
        </div>
      </div>
    `;
  
    block.innerHTML = teaserHtml;
  }
  