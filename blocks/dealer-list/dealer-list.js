export default function decorate(block) {
  function renderDealers(dealers) {
    return dealers.map(dealer => `
      <div class="dealer">
        <div class="dealer__background-image">
          <img src="${dealer.background_image}" alt="${dealer.title}">
        </div>
        <div class="dealer__content">
          <h3>${dealer.title}</h3>
          <a href="${dealer.href}" target="_blank" rel="noopener noreferrer">Visit Dealer</a>
        </div>
      </div>
    `).join('');
  }

  function initializeDealers() {
    const dealerListEl = block.querySelector('.dealer-list');
    if (!dealerListEl) return;

    const dealers = block.querySelectorAll('.dealer');
    dealers.forEach(dealer => {
      // Initialize any specific behaviors or interactions for each dealer if needed
    });
  }

  const [titleEl, ...dealerListEl] = block.children;
  const commonTitle = titleEl?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
  commonTitle?.classList?.add('text-color');

  const dealers = dealerListEl.map(dealer => {
    return {
      background_image: dealer.getAttribute('data-background-image'),
      title: dealer.getAttribute('data-title'),
      href: dealer.getAttribute('data-href')
    };
  });

  const newHtml = `
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          ${commonTitle ? commonTitle.outerHTML : ''}
        </div>
      </div>
      <div class="row dealer-list">
        ${renderDealers(dealers)}
      </div>
    </div>
  `;

  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', newHtml);

  initializeDealers();
}
