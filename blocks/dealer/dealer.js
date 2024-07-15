export default function decorate(block) {
    function getDealerData(block) {
      // Extract elements from the block
      const [backgroundImageContainer, titleEl, linkEl] = block.children;
  
      // Extract image, title, and link data
      const backgroundImgEl = backgroundImageContainer?.querySelector('img');
      const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
      const title = titleEl?.textContent?.trim() || 'Default Title';
      const link = linkEl?.querySelector('a')?.href || '#';
  
      // Check the 'reveal' condition
      const reveal = block.querySelector('[data-name="reveal"]')?.textContent === 'true';
      
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
      dealerCard.addEventListener('click', (event) => {
        if (reveal) {
          // Prevent the default action (redirection) if 'reveal' is true
          event.preventDefault(); // This is where the preventDefault method is called
        } else {
          // Otherwise, redirect to the specified link
          window.location.href = link;
        }
      });
    }
  
    const dealerCard = createDealerCard();
  
    // Clear the block and append the new dealer card
    block.innerHTML = '';
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
  }
  