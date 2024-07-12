export default function decorate(block) {
  function getDealerData(block) {
    const [backgroundImageContainer, titleEl, linkEl, revealEl, popupTitleEl, popupBackgroundImageEl, popupHrefEl] = block.children;

    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const link = linkEl?.querySelector('a')?.href || '#';
    const reveal = revealEl?.querySelector('input')?.checked || false;

    const popupTitle = popupTitleEl?.textContent?.trim() || '';
    const popupBackgroundImgEl = popupBackgroundImageEl?.querySelector('img');
    const popupImageSrc = popupBackgroundImgEl?.src || '';
    const popupLink = popupHrefEl?.querySelector('a')?.href || '';

    return { imageSrc, title, link, reveal, popupTitle, popupImageSrc, popupLink };
  }

  const { imageSrc, title, link, reveal, popupTitle, popupImageSrc, popupLink } = getDealerData(block);

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
          <a href="${popupLink}">Learn More</a>
        </div>
      `;
    }

    return dealerCard;
  }

  function setupEventListener(dealerCard) {
    dealerCard.addEventListener('click', () => {
      window.location.href = link;
    });
  }

  const dealerCard = createDealerCard();

  block.innerHTML = '';
  block.appendChild(dealerCard);
  setupEventListener(dealerCard);
}
