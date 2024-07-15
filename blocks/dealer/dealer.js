export default function decorate(block) {
    function getDealerData(block) {
      // Extract elements from the block
      const [backgroundImageContainer, titleEl, linkEl] = block.children;
  
      // Extract image, title, and link data
      const backgroundImgEl = backgroundImageContainer?.querySelector('img');
      const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
      const title = titleEl?.textContent?.trim() || 'Default Title';
  
      // Check the 'reveal' condition
      const reveal = block.querySelector('[data-name="reveal"]')?.textContent === 'true';
  
      // Extract the href value and the condition for href
      const hrefComponent = block.querySelector('[data-name="href"]');
      const href = hrefComponent?.textContent?.trim() || '#';
      const hrefCondition = hrefComponent?.dataset?.condition === 'false'; // assuming the condition is set as a data attribute
  
      return { imageSrc, title, href, reveal, hrefCondition };
    }
  
    const { imageSrc, title, href, reveal, hrefCondition } = getDealerData(block);
  
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
        if (reveal && hrefCondition) {
          // If reveal is true and the href condition is false, do not redirect
          event.preventDefault();
        } else if (!reveal && href !== '#') {
          // Otherwise, if reveal is false and href has a valid link, redirect
          window.location.href = href;
        }
      });
    }
  
    const dealerCard = createDealerCard();
  
    // Clear the block and append the new dealer card
    block.innerHTML = '';
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
  }
  