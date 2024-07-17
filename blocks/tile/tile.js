export default function decorateTile(block) {
    function getTileData() {
      const [backgroundImageContainer, contentContainer] = block.children;
  
      // Extract the background image
      const backgroundImgEl = backgroundImageContainer.querySelector('picture');
      const backgroundImg = backgroundImgEl?.querySelector('img');
      if (backgroundImg) {
        backgroundImg.setAttribute('width', '100%');
        backgroundImg.removeAttribute('height');
      }
  
      // Extract the rich text content
      const textEl = contentContainer.querySelector('p');
      const text = textEl ? textEl.innerHTML.trim() : '';
  
      // Extract the select dropdown value
      const selectEl = block.querySelector('select[name="select"]');
      const selectedOption = selectEl ? selectEl.value : '';
  
      // Extract the href value (only used if option1 is selected)
      const hrefEl = block.querySelector('a[name="href"]');
      const href = hrefEl ? hrefEl.href : '';
  
      return {
        backgroundImg,
        text,
        selectedOption,
        href
      };
    }
  
    // Get the data for the tile
    const tileData = getTileData();
  
    // Generate the background image style
    const backgroundImageStyle = tileData.backgroundImg ? `background-image: url('${tileData.backgroundImg.src}');` : '';
  
    // Construct the HTML for the tile component
    const tileHtml = `
      <div class="tile" style="${backgroundImageStyle}">
        <div class="tile__content">
          ${tileData.text}
        </div>
      </div>
    `;
  
    // Set the HTML content of the block
    block.innerHTML = tileHtml;
  
    // Add a click event listener to handle redirection based on the select dropdown
    if (tileData.selectedOption === 'option1' && tileData.href) {
      block.addEventListener('click', () => {
        window.location.href = tileData.href;
      });
    }
  }
  