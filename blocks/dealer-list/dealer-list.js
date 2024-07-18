export default function decorate(block) {
  function renderDealer(dealerData) {
    const { background_image, title } = dealerData;

    return `
      <div class="dealer" data-href="${dealerData.href}">
        <div class="dealer__background">
          <img src="${background_image}" alt="Background Image">
        </div>
        <div class="dealer__content">
          <h3>${title}</h3>
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

  function handleClick(event) {
    const dealerElement = event.currentTarget;
    const href = dealerElement.getAttribute('href');
    if (href) {
      window.location.href = href;
    }
  }

  const dealerListData = block.dataset.dealerListData;
  const dealers = JSON.parse(dealerListData);

  block.innerHTML = renderDealerList(dealers);

  // Attach click event listener to each dealer
  const dealerElements = block.querySelectorAll('.dealer');
  dealerElements.forEach(dealer => {
    dealer.addEventListener('click', handleClick);
  });
}
