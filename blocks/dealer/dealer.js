export default function decorate(block) {
  function getDealerData(block) {
    // Extract elements from the block
    const [backgroundImageContainer, titleEl, parentRevealEl, parentLinkEl, revealEl, popupTitleEl, popupBackgroundImageEl, popupLinkEl] = block.children;

    // Extract image, title, and link data
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const link = parentLinkEl?.querySelector('a')?.href || '#';

    // Extract popup data
    const popupTitle = popupTitleEl?.textContent?.trim() || '';
    const popupImageEl = popupBackgroundImageEl?.querySelector('img');
    const popupImageSrc = popupImageEl?.src || 'https://via.placeholder.com/150';
    const popupLink = popupLinkEl?.querySelector('a')?.href || '#';

    return { imageSrc, title, link, popupTitle, popupImageSrc, popupLink, reveal: revealEl?.querySelector('input')?.checked, parentReveal: parentRevealEl?.querySelector('input')?.checked };
  }

  const { imageSrc, title, link, popupTitle, popupImageSrc, popupLink, reveal, parentReveal } = getDealerData(block);

  function createDealerCard() {
    const dealerCard = document.createElement('div');
    dealerCard.className = 'dealer-card';
    dealerCard.innerHTML = `
      <div class="dealer-content">
        <img src="${imageSrc}" alt="${title}">
        <h2>${title}</h2>
      </div>
    `;
    if (reveal) {
      dealerCard.innerHTML += `
        <div class="popup-content">
          <img src="${popupImageSrc}" alt="${popupTitle}">
          <h2>${popupTitle}</h2>
        </div>
      `;
    }
    return dealerCard;
  }

  function setupEventListener(dealerCard) {
    dealerCard.addEventListener('click', () => {
      window.location.href = reveal ? popupLink : link;
    });
  }

  const dealerCard = createDealerCard();

  // Clear the block and append the new dealer card
  block.innerHTML = '';
  block.appendChild(dealerCard);
  setupEventListener(dealerCard);
}
