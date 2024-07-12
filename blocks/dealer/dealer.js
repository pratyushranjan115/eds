export default function decorate(block) {
  function getDealerData(block) {
    // Extract elements from the block
    const [backgroundImageContainer, titleEl, linkEl, revealEl, hiddenTextEl] = block.children;

    // Extract image, title, and link data
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const link = linkEl?.querySelector('a')?.href || '#';
    const reveal = revealEl?.textContent?.trim() === 'true'; // Assuming boolean value is stored as text
    const hiddenText = hiddenTextEl?.textContent?.trim() || '';

    return { imageSrc, title, link, reveal, hiddenText };
  }

  const { imageSrc, title, link, reveal, hiddenText } = getDealerData(block);

  function createDealerCard(imageSrc, title, link, hiddenText) {
    const dealerCard = document.createElement('div');
    dealerCard.className = 'dealer-card';
    dealerCard.innerHTML = `
      <div class="dealer-content">
        <img src="${imageSrc}" alt="${title}">
        <h2>${title}</h2>
        ${hiddenText ? `<h1>${hiddenText}</h1>` : ''}
      </div>
    `;
    return dealerCard;
  }

  function setupEventListener(dealerCard, link) {
    dealerCard.addEventListener('click', () => {
      window.location.href = link;
    });
  }

  function createPopup() {
    const popup = document.createElement('div');
    popup.className = 'dealer-popup';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Dealer';
    addButton.addEventListener('click', () => {
      const newDealerCard = createDealerCard(imageSrc, title, link, hiddenText);
      setupEventListener(newDealerCard, link);
      popup.appendChild(newDealerCard);
    });

    popup.appendChild(addButton);
    return popup;
  }

  const dealerCard = createDealerCard(imageSrc, title, link, hiddenText);
  setupEventListener(dealerCard, link);

  block.innerHTML = '';
  block.appendChild(dealerCard);

  if (reveal) {
    const popup = createPopup();
    block.appendChild(popup);
  }
}
