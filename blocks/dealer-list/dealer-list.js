export default function decorate(block) {
  function getDealerData(dealerElement) {
    const backgroundImage = dealerElement.querySelector('[name="background_image"]')?.src || '';
    const title = dealerElement.querySelector('[name="title"]')?.textContent?.trim() || '';
    const href = dealerElement.querySelector('[name="href"]')?.href || '';

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
        <a href="${href}" class="dealer__link"></a>
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

  const dealerElements = block.querySelectorAll('.dealer');
  const dealers = Array.from(dealerElements).map(getDealerData);
  
  const dealerListElement = renderDealerList(dealers);
  block.innerHTML = '';
  block.appendChild(dealerListElement);
}
