export default function decorate(block) {
  function renderDealer(dealerData) {
    const { background_image, title, href } = dealerData;

    return `
      <li>
        <a href="${href}">
          <div class="d-grid-item">
            <div class="d-grid-item-icon">
              <img src="${background_image}" alt="${title}" title="${title}">
            </div>
            <div class="d-grid-item-title">
              ${title}
            </div>
          </div>
        </a>
      </li>
    `;
  }

  const dealersData = block.querySelectorAll('.dealer');
  const dealersHtml = Array.from(dealersData).map((dealer) => {
    const background_image = dealer.dataset.backgroundImage;
    const title = dealer.dataset.title;
    const href = dealer.dataset.href;
    return renderDealer({ background_image, title, href });
  });

  const newHtml = `
    <div class="row">
      <div class="col-sm-12">
        <ul class="dealer-menu">
          ${dealersHtml.join('')}
        </ul>
      </div>
    </div>
  `;

  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', newHtml);
}
