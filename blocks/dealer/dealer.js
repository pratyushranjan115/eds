export default function decorate(block) {
    function getDealerData(block) {
      // Extract elements from the block
      console.log({a:block});
      const [backgroundImageContainer, titleEl, linkEl] = block.children;
  
      // Extract image, title, and link data
      const backgroundImgEl = backgroundImageContainer?.querySelector('img');
      const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
      const title = titleEl?.textContent?.trim() || 'Default Title';
      const link = linkEl?.querySelector('a')?.href || '#';
  
      // Check the 'reveal' condition
      const reveal = block.querySelector('[data-name="reveal"]')?.textContent === 'true';
      console.log({b:block.querySelector('[data-name="reveal"]')?.textContent})
      
      // Extract the condition value for the href component
     // const hrefCondition = block.querySelector('[data-name="href"]')?.dataset.condition === 'false';
     const hrefCondition = true;
  
      return { imageSrc, title, link, reveal, hrefCondition };
    }
  
    const { imageSrc, title, link, reveal, hrefCondition } = getDealerData(block);
  
    function createDealerCard() {
      const dealerCard = document.createElement('div');
      dealerCard.className = 'dealer-card';
      dealerCard.innerHTML = `
        <div class="dealer-content">
          <img src="${imageSrc}" alt="${title}">
          <h2>${title}</h2>
          <h2>${reveal}</h2>
        </div>
      `;
      return dealerCard;
    }
  
    function setupEventListener(dealerCard) {
      dealerCard.addEventListener('click', (event) => {
        console.log(reveal,hrefCondition,link);
        if (reveal) {
          // If reveal is true, do not redirect
          return;
        } else if (!reveal && hrefCondition && link !== '#') {
          // If reveal is false, href condition is false, and link is valid, redirect
          window.location.href = link;
        } else {
          // If none of the above conditions are met, prevent the default action
          event.preventDefault();
        }
      });
    }
  
    const dealerCard = createDealerCard();
  
    // Clear the block and append the new dealer card
    block.innerHTML = '';
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
  }
  