export default function decorateTile(block) {
    // Function to extract data from the block's DOM structure
    function getTileData(block) {
      const [backgroundImageContainer, contentContainer] = block.children;
  
      // Get the background image URL
      const backgroundImgEl = backgroundImageContainer.querySelector('picture');
      const backgroundImg = backgroundImgEl?.querySelector('img');
      const backgroundImage = backgroundImg ? backgroundImg.src : '';
  
      // Get the rich text content
      const textEl = contentContainer.querySelector('p');
      const text = textEl ? textEl.innerHTML.trim() : '';
  
      // Extract the value of the select dropdown
      const selectEl = block.querySelector('select[name="select"]');
      const selectedOption = selectEl ? selectEl.value : '';
  
      // Extract the href value (only used if option1 is selected)
      const hrefEl = block.querySelector('a[name="href"]');
      const href = hrefEl ? hrefEl.href : '';
  
      return {
        backgroundImage,
        text,
        selectedOption,
        href
      };
    }
  
    // Get data from the block
    const tileData = getTileData(block);
  
    // Generate HTML for the tile component
    const tileHtml = `
      <div class="tile" style="background-image: url('${tileData.backgroundImage}');">
        <div class="tile__content">
          ${tileData.text}
        </div>
      </div>
    `;
  
    // Set the generated HTML as the content of the block
    block.innerHTML = tileHtml;
  
    // Add click event listener to redirect if option1 is selected
    if (tileData.selectedOption === 'option1' && tileData.href) {
      block.addEventListener('click', () => {
        window.location.href = tileData.href;
      });
    }
  }
  