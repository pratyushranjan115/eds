document.addEventListener("DOMContentLoaded", () => {
  const dealerListBlocks = document.querySelectorAll(".dealer-list-block");

  dealerListBlocks.forEach((block) => {
    function getDealerData(dealerBlock) {
      const [backgroundImageContainer, titleEl, linkEl] = dealerBlock.children;
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

    function renderDealerList(dealers) {
      const dealerCards = dealers.map(dealerData => createDealerCard(dealerData));
      const dealerList = document.createElement('div');
      dealerList.className = 'dealer-list';
      dealerCards.forEach(card => dealerList.appendChild(card));
      return dealerList;
    }

    const dealerListData = block.getAttribute('data-dealer-list-data');
    console.log('Dealer List Data:', dealerListData);

    if (dealerListData) {
      try {
        const dealers = JSON.parse(dealerListData);
        console.log('Parsed Dealers:', dealers);

        block.innerHTML = '';
        const dealerList = renderDealerList(dealers);
        block.appendChild(dealerList);
      } catch (error) {
        console.error('Error parsing dealer list data:', error);
      }
    } else {
      console.error('No dealer list data found.');
    }
  });
});
