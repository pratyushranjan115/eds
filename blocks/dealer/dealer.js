export default function decorate(block) {
  function getDealerData(block) {
    const [backgroundImageContainer, titleEl, revealEl, linkEl, popupTitleEl, ...tabFields] = block.children;

    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const reveal = revealEl?.querySelector('input')?.checked || false;
    let link = '#';
    if (linkEl) {
      const linkAnchor = linkEl.querySelector('a');
      if (linkAnchor) {
        link = linkAnchor.href;
      }
    }

    const popupTitle = popupTitleEl?.textContent?.trim() || 'Popup Title';
    const tabsData = [];

    for (let i = 0; i < tabFields.length; i += 5) {
      if (tabFields[i].classList.contains('tab')) {
        const tabLabel = tabFields[i].textContent.trim();
        const backgroundImage = tabFields[i + 1]?.querySelector('img')?.src || 'https://via.placeholder.com/150';
        const text = tabFields[i + 2]?.querySelector('input')?.value || 'Default Text';
        const tabLink = tabFields[i + 3]?.querySelector('a')?.href || '#';

        tabsData.push({
          label: tabLabel,
          backgroundImage,
          text,
          link: tabLink
        });
      }
    }

    return { imageSrc, title, link, reveal, popupTitle, tabsData };
  }

  const { imageSrc, title, link, reveal, popupTitle, tabsData } = getDealerData(block);

  function createDealerCard() {
    const dealerCard = document.createElement('div');
    dealerCard.className = 'dealer-card';
    dealerCard.innerHTML = `
      <div class="dealer-content">
        <img src="${imageSrc}" alt="${title}">
        <h2>${title}</h2>
      </div>
    `;
    return dealerCard;
  }

  function createPopup(tabsData, popupTitle) {
    const popup = document.createElement('div');
    popup.className = 'modal';
    popup.id = 'dealerModal';

    const popupContent = document.createElement('div');
    popupContent.className = 'modal-content';
    popupContent.innerHTML = `
      <span class="close">&times;</span>
      <h3>${popupTitle}</h3>
    `;

    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';

    tabsData.forEach(tab => {
      const tabEl = document.createElement('div');
      tabEl.className = 'tab';
      tabEl.innerHTML = `
        <h4>${tab.label}</h4>
        <img src="${tab.backgroundImage}" alt="${tab.text}">
        <p>${tab.text}</p>
      `;

      tabEl.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent click from bubbling up to the dealer card
        window.location.href = tab.link;
      });

      tabsContainer.appendChild(tabEl);
    });

    popupContent.appendChild(tabsContainer);
    popup.appendChild(popupContent);

    // Close button
    const span = popupContent.querySelector('.close');
    span.onclick = function() {
      popup.style.display = 'none';
    };

    // Close modal when clicking outside of it
    window.onclick = function(event) {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    };

    return popup;
  }

  function setupEventListener(dealerCard, popup, link, reveal) {
    dealerCard.addEventListener('click', () => {
      if (!reveal) {
        if (link && link !== '#') {
          window.location.href = link;
        } else {
          console.error('Link is invalid');
        }
      } else {
        popup.style.display = 'block';
      }
    });
  }

  const dealerCard = createDealerCard();
  const popup = createPopup(tabsData, popupTitle);

  block.innerHTML = '';
  block.appendChild(dealerCard);
  block.appendChild(popup);

  setupEventListener(dealerCard, popup, link, reveal);
}
