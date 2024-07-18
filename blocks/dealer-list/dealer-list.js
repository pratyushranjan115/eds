export default function decorate(block) {
  // Function to get dealer data from a block
  function getDealerData(dealerBlock) {
    // Extract elements from the block
    const [backgroundImageContainer, titleEl, linkEl] = dealerBlock.children;

    // Extract image, title, and link data
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const link = linkEl?.querySelector('a')?.href || '#';

    return { imageSrc, title, link };
  }

  // Function to create a dealer card
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

  // Function to render a list of dealer cards
  function renderDealerList(dealers) {
    const dealerCards = dealers.map(dealerData => createDealerCard(dealerData));
    const dealerList = document.createElement('div');
    dealerList.className = 'dealer-list';
    dealerCards.forEach(card => dealerList.appendChild(card));
    return dealerList;
  }

  // Check if there's dealer list data in the dataset attribute
  const dealerListData = block.dataset.dealerListData;
  if (dealerListData) {
    try {
      // Parse the dealer list data
      const dealers = JSON.parse(dealerListData);
      console.log('Parsed Dealers:', dealers);

      // Clear the block and append the new dealer list
      block.innerHTML = '';
      const dealerList = renderDealerList(dealers);
      block.appendChild(dealerList);
    } catch (error) {
      console.error('Error parsing dealer list data:', error);
    }
  } else {
    // If no dealer list data, use the block's children as dealer data
    const dealerData = getDealerData(block);

    // Clear the block and append the new dealer card
    block.innerHTML = '';
    const dealerCard = createDealerCard(dealerData);
    block.appendChild(dealerCard);
  }
}
