export default function decorate(block) {
  function getDealerData(dealerElement) {
    const backgroundImage = dealerElement.querySelector('[data-name="background_image"]')?.dataset.src || '';
    const title = dealerElement.querySelector('[data-name="title"]')?.textContent?.trim() || '';
    const href = dealerElement.querySelector('[data-name="href"]')?.dataset.href || '';

    return {
      backgroundImage,
      title,
      href,
    };
  }

  function renderDealer(dealerData) {
    const { backgroundImage, title, href } = dealerData;

    const dealerHTML = document.createElement('div');
    dealerHTML.classList.add('dealer');

    dealerHTML.innerHTML = `
      <div class="dealer__background">
        <img src="${backgroundImage}" alt="Background Image">
      </div>
      <div class="dealer__content">
        <h3>${title}</h3>
        <a href="${href}" class="dealer__link">Link</a>
      </div>
    `;
    return dealerHTML;
  }

  function renderDealerList(dealers) {
    const dealerListElement = document.createElement('div');
    dealerListElement.classList.add('dealer-list');

    dealers.forEach(dealerData => {
      const dealerElement = renderDealer(dealerData);
      dealerListElement.appendChild(dealerElement);
    });

    return dealerListElement;
  }

  // Extract dealer data from block's child elements
  const dealerElements = block.querySelectorAll('.dealer');
  const dealers = Array.from(dealerElements).map(getDealerData);

  // Render the dealer list
  const dealerListElement = renderDealerList(dealers);
  block.innerHTML = '';
  block.appendChild(dealerListElement);
}
