export default function decorate(block) {
  function getDealerData(block) {
    // Extract elements from the block
    const [
      backgroundImageContainer,
      titleEl,
      parentLinkEl,
      revealEl,
      popupTitleEl,
      popupBackgroundImageEl,
      popupLinkEl
    ] = block.children;

    // Extract image, title, and link data
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';

    // Extract parent link data
    let link;
    if (parentLinkEl) {
      const parentLinkAnchor = parentLinkEl.querySelector('a');
      if (parentLinkAnchor) {
        link = parentLinkAnchor.href;
      }
    }

    // Extract popup data
    const popupTitle = popupTitleEl?.textContent?.trim() || '';
    const popupImageEl = popupBackgroundImageEl?.querySelector('img');
    const popupImageSrc = popupImageEl?.src || 'https://via.placeholder.com/150';
    const popupLink = popupLinkEl?.querySelector('a')?.href || '#';

    // Extract reveal status
    const reveal = revealEl?.querySelector('input')?.checked ?? false;

    return {
      imageSrc,
      title,
      link,
      popupTitle,
      popupImageSrc,
      popupLink,
      reveal
    };
  }

  const {
    imageSrc,
    title,
    link,
    popupTitle,
    popupImageSrc,
    popupLink,
    reveal
  } = getDealerData(block);

  console.log('Dealer Data:', { imageSrc, title, link, popupTitle, popupImageSrc, popupLink, reveal });

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
    dealerCard.addEventListener('click', (event) => {
      if (!reveal && link) {
        console.log('Redirecting to:', link);
        window.location.href = link;
      } else if (reveal) {
        console.log('Popup is revealed, not redirecting.');
        // Here you can add the popup functionality if needed
      } else {
        console.log('No valid link found.');
      }
    });
  }

  const dealerCard = createDealerCard();

  // Clear the block and append the new dealer card
  block.innerHTML = '';
  block.appendChild(dealerCard);
  setupEventListener(dealerCard);
}
