export default function decorate(block) {
  function getDealerData(block) {
    // Extract elements from the block
    const [backgroundImageContainer, titleEl, linkEl, revealEl, tabContainerEl] = block.children;

    // Extract image, title, and link data
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    let link = '#';
    if (linkEl) {
      const linkAnchor = linkEl.querySelector('a');
      if (linkAnchor) {
        link = linkAnchor.href;
      }
    }

    const reveal = revealEl?.querySelector('input')?.checked || false;

    let tabsData = [];
    if (reveal && tabContainerEl) {
      const tabElements = tabContainerEl.children;
      for (let i = 0; i < tabElements.length; i += 2) {
        const tabLabel = tabElements[i]?.querySelector('.tab-label')?.textContent?.trim() || '';
        const tabText = tabElements[i + 1]?.querySelector('.text-input')?.value || '';
        tabsData.push({ label: tabLabel, text: tabText });
      }
    }

    return { imageSrc, title, link, reveal, tabsData };
  }

  const { imageSrc, title, link, reveal, tabsData } = getDealerData(block);

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
      const tabsHTML = tabsData.map(tab => `
        <div class="tab">
          <h3>${tab.label}</h3>
          <p>${tab.text}</p>
        </div>
      `).join('');
      dealerCard.innerHTML += `
        <div class="tabs-content">
          ${tabsHTML}
        </div>
      `;
    }
    return dealerCard;
  }

  function setupEventListener(dealerCard) {
    dealerCard.addEventListener('click', () => {
      if (!reveal) {
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
