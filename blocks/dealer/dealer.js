export default function decorate(block) {
    function getDealerData(block) {
      const [backgroundImageContainer, titleEl, linkEl] = block.children;
  
      const backgroundImgEl = backgroundImageContainer?.querySelector('img');
      const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
      const title = titleEl?.textContent?.trim() || 'Default Title';
  
      let reveal = false;
      if (block.dataset.aueModel) {
        try {
          const model = JSON.parse(block.dataset.aueModel);
          reveal = model.reveal;
          console.log('Parsed model:', model);
        } catch (error) {
          console.error('Failed to parse aueModel:', error);
        }
      } else {
        console.warn('No aueModel dataset found');
      }
  
      const link = linkEl?.querySelector('a')?.href || '#';
  
      console.log('block dataset:', block.dataset);
      console.log('reveal:', reveal);
      console.log('link:', link);
  
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
      if (!reveal) {
        dealerCard.addEventListener('click', () => {
          window.location.href = link;
        });
      }
    }
  
    const dealerCard = createDealerCard();
  
    block.innerHTML = '';
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const block = document.querySelector('.block');
    block.dataset.aueModel = JSON.stringify({
      reveal: true,
    });
  
    decorate(block);
  });
  