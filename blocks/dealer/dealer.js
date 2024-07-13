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

    // Initialize link variable
    let link = '#';
    if (parentLinkEl) {
      const parentLinkAnchor = parentLinkEl.querySelector('a');
      if (parentLinkAnchor) {
        link = parentLinkAnchor.href;
      } else {
        console.error('No valid link found in parentLinkEl');
      }
    }

    // Extract popup data
    const popupTitle = popupTitleEl?.textContent?.trim() || '';
    const popupImageEl = popupBackgroundImageEl?.querySelector('img');
    const popupImageSrc = popupImageEl?.src || 'https://via.placeholder.com/150';
    const popupLink = popupLinkEl?.querySelector('a')?.href || '#';
    
    // Extract reveal and parentReveal boolean values
    const reveal = revealEl?.querySelector('input')?.checked || false;
    const parentReveal = parentLinkEl?.querySelector('input')?.checked || false;

    console.log('Reveal:', reveal);
    console.log('Parent Reveal:', parentReveal);
    console.log('Link:', link);
    console.log('Popup Link:', popupLink);

    return { imageSrc, title, link, popupTitle, popupImageSrc, popupLink, reveal, parentReveal };
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
      // Check the conditions for redirection
      if (reveal) {
        console.log('Reveal is true');
        // Show the popup with the link from popupLink
        if (popupLink && popupLink !== '#') {
          window.location.href = popupLink;
        } else {
          console.error('Popup link is invalid');
        }
      } else {
        console.log('Reveal is false');
        // Redirect to the link from parentLinkEl
        if (link && link !== '#') {
          window.location.href = link;
        } else {
          console.error('Link is invalid');
        }
      }
    });
  }

  const dealerCard = createDealerCard();

  // Clear the block and append the new dealer card
  block.innerHTML = '';
  block.appendChild(dealerCard);
  setupEventListener(dealerCard);
}
