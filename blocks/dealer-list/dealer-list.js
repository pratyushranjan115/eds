export default function decorate(block) {
  function renderDealer(dealerData) {
    const { background_image, title, href } = dealerData;

    const dealerHtml = `
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

    // Create a div element to wrap the dealerHtml for adding the event listener
    const dealerWrapper = document.createElement('div');
    dealerWrapper.innerHTML = dealerHtml;

    // Add event listener to redirect to href when clicking anywhere on the dealer component
    dealerWrapper.querySelector('.dealer').addEventListener('click', () => {
      window.location.href = href;
    });

    return dealerWrapper.innerHTML;
  }

  function renderDealerList(dealers) {
    const dealersHtml = dealers.map((dealerData) => renderDealer(dealerData));
    return `
      <div class="dealer-list">
        ${dealersHtml.join('')}
      </div>
    `;
  }

  const dealerListData = block.dataset.dealerListData;
  const dealers = JSON.parse(dealerListData);

  block.innerHTML = renderDealerList(dealers);
}
