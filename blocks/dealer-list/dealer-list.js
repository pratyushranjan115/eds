export default function decorate(block) {
  console.log('Block:', block);

  function getDealerData(dealerBlock) {
    // Extract elements from the dealer block
    const [backgroundImageContainer, titleEl, linkEl] = dealerBlock.children;

    console.log('Dealer Block:', dealerBlock.children);

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

  // Clear existing content in block
  block.innerHTML = '';

  // Process each dealer within the dealer-list block
  [...block.children].forEach(dealerBlock => {
    const dealerData = getDealerData(dealerBlock);
    const dealerCard = createDealerCard(dealerData);
    block.appendChild(dealerCard);
  });
}
