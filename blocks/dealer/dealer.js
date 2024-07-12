export default function decorate(block) {
  function getDealerData(block) {
    const [backgroundImageContainer, titleEl, linkEl, revealEl, ...popupFieldsEls] = block.children;
    
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const link = linkEl?.querySelector('a')?.href || '#';
    const reveal = revealEl?.querySelector('input[type="checkbox"]')?.checked || false;

    let popupData = {};
    if (reveal) {
      popupData = {
        popupTitle: popupFieldsEls[0]?.textContent?.trim() || '',
        popupBackgroundImage: popupFieldsEls[1]?.querySelector('img')?.src || 'https://via.placeholder.com/150',
        popupTitleField: popupFieldsEls[2]?.textContent?.trim() || '',
        popupLink: popupFieldsEls[3]?.querySelector('a')?.href || '#'
      };
    }

    return { imageSrc, title, link, reveal, popupData };
  }

  const { imageSrc, title, link, reveal, popupData } = getDealerData(block);

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
          <h3>${popupData.popupTitle}</h3>
          <img src="${popupData.popupBackgroundImage}" alt="${popupData.popupTitleField}">
          <p>${popupData.popupTitleField}</p>
          <a href="${popupData.popupLink}">Go to Link</a>
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
