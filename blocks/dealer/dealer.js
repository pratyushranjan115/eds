export default function decorate(block) {
    function getDealerData(block) {
      // Extract elements from the block
      const [backgroundImageContainer, titleEl, linkEl] = block.children;
  
      // Extract image, title, and link data
      const backgroundImgEl = backgroundImageContainer?.querySelector('img');
      const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
      const title = titleEl?.textContent?.trim() || 'Default Title';
      const link = linkEl?.querySelector('a')?.href || '#';
  
      // Check the `reveal` field to determine whether to redirect or not
      const reveal = block.dataset.reveal === 'true';
  
      return { imageSrc, title, link, reveal };
    }
  
    const { imageSrc, title, link, reveal } = getDealerData(block);
  
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
      // Add event listener only if `reveal` is false
      if (!reveal) {
        dealerCard.addEventListener('click', () => {
          window.location.href = link;
        });
      }
    }
  
    const dealerCard = createDealerCard();
  
    // Clear the block and append the new dealer card
    block.innerHTML = '';
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
  }
  