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
          <a href="${href}" class="dealer__link"></a>
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

  const dealerListData = block.dataset.dealerListData;
  const dealers = JSON.parse(dealerListData);

  block.innerHTML = renderDealerList(dealers);
}
