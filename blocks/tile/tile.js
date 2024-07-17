export default function decorateTile(block) {
    function getTileData(block) {
      const [backgroundImageContainer, contentContainer] = block.children;
  
      const backgroundImgEl = backgroundImageContainer.querySelector('picture');
      const backgroundImgAltEl = backgroundImgEl?.querySelector('img');
  
      const richTextEl = contentContainer.querySelector('[data-name="text"]');
      const selectEl = contentContainer.querySelector('[data-name="select"]');
      const hrefEl = contentContainer.querySelector('[data-name="href"]');
  
      const backgroundImg = backgroundImgEl?.querySelector('img');
      if (backgroundImg) {
        backgroundImg.removeAttribute('width');
        backgroundImg.removeAttribute('height');
        const alt = backgroundImgAltEl?.getAttribute('alt') || 'image';
        backgroundImg.setAttribute('alt', alt);
      }
  
      const richText = richTextEl?.innerHTML.trim();
      const selectValue = selectEl?.value;
      const href = selectValue === 'option1' ? hrefEl?.textContent.trim() : null;
  
      return {
        backgroundImg,
        richText,
        href
      };
    }
  
    const tileData = getTileData(block);
  
    const tileHtml = `
      <div class="tile__wrapper">
        ${(tileData.backgroundImg) ? tileData.backgroundImg.outerHTML : ''}
        <div class="tile__content">
          ${(tileData.richText) ? `<div class="rich-text">${tileData.richText}</div>` : ''}
        </div>
      </div>
    `;
  
    block.innerHTML = tileHtml;
  
    if (tileData.href) {
      block.addEventListener('click', () => {
        window.location.href = tileData.href;
      });
    }
  }
  