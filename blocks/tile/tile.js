export default function decorateTile(block) {
    function getTileData(block) {
      const data = {
        background_image: '',
        text: '',
        select: '',
        href: '',
      };
  
      // Extract background_image
      const backgroundImgEl = block.querySelector('[data-name="background_image"]');
      if (backgroundImgEl) {
        data.background_image = backgroundImgEl.value;
      }
  
      // Extract text
      const textEl = block.querySelector('[data-name="text"]');
      if (textEl) {
        data.text = textEl.value;
      }
  
      // Extract select value
      const selectEl = block.querySelector('[data-name="select"]');
      if (selectEl) {
        data.select = selectEl.value;
      }
  
      // Extract href if select option is 'option1'
      if (data.select === 'option1') {
        const hrefEl = block.querySelector('[data-name="href"]');
        if (hrefEl) {
          data.href = hrefEl.value;
        }
      }
  
      return data;
    }
  
    function renderTile(data) {
      // Create the HTML structure for the tile
      const tileHtml = `
        <div class="tile">
          ${data.background_image ? `<img src="${data.background_image}" alt="Background Image" class="tile__background-image">` : ''}
          <div class="tile__text">${data.text}</div>
        </div>
      `;
  
      // Set the block's inner HTML to the created tile HTML
      block.innerHTML = tileHtml;
  
      // Add click event listener if option1 is selected
      if (data.select === 'option1' && data.href) {
        block.addEventListener('click', () => {
          window.location.href = data.href;
        });
      }
    }
  
    const tileData = getTileData(block);
    renderTile(tileData);
  }
  