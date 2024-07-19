export default function decorate(block) {
  function renderDealer() {
    const { background_image, title, href } = dealerData;

    return `
     
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
