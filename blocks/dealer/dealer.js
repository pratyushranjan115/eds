export default function decorate(block) {
    console.log("Decorate function called");
  
    function getDealerData(block) {
      // Extract elements from the block
      const [backgroundImageContainer, titleEl, linkEl] = block.children;
  
      console.log("Extracted elements:", { backgroundImageContainer, titleEl, linkEl });
  
      // Extract image, title, and link data
      const backgroundImgEl = backgroundImageContainer?.querySelector('img');
      const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
      const title = titleEl?.textContent?.trim() || 'Default Title';
      const link = linkEl?.querySelector('a')?.href || '#';
  
      console.log("Extracted content:", { title, imageSrc, link });
  
      return { imageSrc, title, link };
    }
  
    const { imageSrc, title, link } = getDealerData(block);
  
    function createDealerCard() {
      const dealerCard = document.createElement('div');
      dealerCard.className = 'dealer-card';
      dealerCard.innerHTML = `
        <div class="dealer-content">
          <img src="${imageSrc}" alt="${title}">
          <h2>${title}</h2>
        </div>
      `;
      return dealerCard;
    }
  
    function setupEventListener(dealerCard) {
      dealerCard.addEventListener('click', () => {
        window.location.href = link;
      });
    }
  
    const dealerCard = createDealerCard();
    console.log("Created dealer card:", dealerCard);
  
    // Clear the block and append the new dealer card
    block.innerHTML = '';
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
  
    console.log("Decorate function completed");
  }
  