export default function decorate(block) {
    function getDealerData(block) {
      // Extract elements from the block
      const [backgroundImageContainer, titleEl, linkEl] = block.children;
  
      // Extract image, title, and link data
      const backgroundImgEl = backgroundImageContainer?.querySelector('img');
      const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
      const title = titleEl?.textContent?.trim() || 'Default Title';
  
      // Extract the `data-reveal` attribute value
      const reveal = block.dataset.reveal === 'true';
  
      // Extract the link value from the link element
      const link = linkEl?.querySelector('a')?.href || '#';
  
      // Debugging information
      console.log('block dataset:', block.dataset); // Debugging line to check the entire dataset
      console.log('data-reveal attribute:', block.dataset.reveal); // Debugging line
      console.log('reveal:', reveal); // Debugging line
      console.log('link:', link); // Debugging line
  
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
  
  // Testing setup for manual HTML testing
  document.addEventListener('DOMContentLoaded', () => {
    // Simulate a block for testing
    const block = document.querySelector('.block');
    block.dataset.reveal = 'true'; // Change to 'false' to test both cases
  
    // Call the decorate function
    decorate(block);
  });
  