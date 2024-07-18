export default function decorate(block) {
  function getDealerData(dealerBlock) {
    
    const [backgroundImageContainer, titleEl, linkEl] = dealerBlock.children;

    
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const link = linkEl?.querySelector('a')?.href || '#';

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

  function renderDealerList(dealers) {
    const dealerCards = dealers.map(dealerData => createDealerCard(dealerData));
    const dealerList = document.createElement('div');
    dealerList.className = 'dealer-list';
    dealerCards.forEach(card => dealerList.appendChild(card));
    return dealerList;
  }

  
  const dealerListData = block.dataset.dealerListData;  
  const dealers = JSON.parse(dealerListData);
  const dealerCard = createDealerCard();
  

  
  block.innerHTML = '';
  const dealerList = renderDealerList(dealers);
  block.appendChild(dealerList);
  setupEventListener(dealerCard);
}
