export default function decorate(block) {
  function renderDealer(dealerData) {
    const { background_image, title, href } = dealerData;

    return `
      <div class="dealer">
        <div class="dealer__background">
          <img src="${background_image}" alt="Background Image">
        </div>
        <div class="dealer__content">
          <h3>${title}</h3>
          <a href="${href}" class="dealer__link">Visit Dealer</a>
        </div>
      </div>
    `;
  }

  function renderDealerList(dealers) {
    const dealersHtml = dealers.map((dealerData) => renderDealer(dealerData));
    return `
      <div class="dealer-list">
        ${dealersHtml.join('')}
      </div>
    `;
  }

  function handleDealerClick(event) {
    const dealerLink = event.currentTarget.querySelector('.dealer__link');
    if (dealerLink) {
      const href = dealerLink.getAttribute('href');
      if (href) {
        window.location.href = href; // Redirect to the specified href link
      }
    }
  }

  const dealerListData = block.dataset.dealerListData;
  const dealers = JSON.parse(dealerListData);

  block.innerHTML = renderDealerList(dealers);

  // Add event listener to handle clicks on dealer components
  const dealerElements = block.querySelectorAll('.dealer');
  dealerElements.forEach((dealerElement) => {
    dealerElement.addEventListener('click', handleDealerClick);
  });
}
