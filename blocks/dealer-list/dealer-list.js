export default function decorate(block) {
  function getDealerData(dealerBlock) {
    // Extract elements from the dealer block
    const [backgroundImageContainer, titleEl, linkEl] = dealerBlock.children;

    // Extract image, title, and link data
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const link = linkEl?.querySelector('a')?.href || '#';

    return { imageSrc, title, link };
  }

  function createDealerCard({ imageSrc, title, link }) {
    const dealerCard = document.createElement('div');
    dealerCard.className = 'dealer-card';
    dealerCard.innerHTML = `
      <div class="dealer-content">
        <img src="${imageSrc}" alt="${title}">
        <h2>${title}</h2>
      </div>
    `;
    dealerCard.addEventListener('click', () => {
      window.location.href = link;
    });
    return dealerCard;
  }

  // function renderDealerList(dealers) {
  //   const dealerCards = dealers.map(dealerData => createDealerCard(dealerData));
  //   const dealerList = document.createElement('div');
  //   dealerList.className = 'dealer-list';
  //   dealerCards.forEach(card => dealerList.appendChild(card));
  //   return dealerList;
  // }

  // Get dealer data from the block
  const dealerListData = block.dataset.dealerListData;
  const dealers = JSON.parse(dealerListData);

  // Clear the block and append the new dealer list
  block.innerHTML = '';
  // const dealerList = renderDealerList(dealers);
  block.appendChild(dealerList);
}
