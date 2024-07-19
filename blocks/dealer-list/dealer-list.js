import utility from '../../utility/utility.js';

export default function decorate(block) {
  console.log(block);

  const dealerListEl = [...block.children];
  console.log(dealerListEl);

  const dealersHTML = dealerListEl.map((dealer) => {
    const image = dealer.querySelector('picture');
    const title = dealer.querySelector('p')?.textContent?.trim() || '';
    const href = dealer.querySelector('a')?.href || '';

    const imageHTML = image ? image.outerHTML : '';

    return `
      <li>
        <a href=${href}>
          <div class="d-grid-item">
            <div class="d-grid-item-icon">
              ${imageHTML ? `<div class="feature__image">${imageHTML}</div>` : ''}
            </div>
            <div class="d-grid-item-title">
              <h2>${title}</h2>
            </div>
          </div>
        </a>
      </li>
    `;
  }).join('');

  const newHtml = `
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-sm-8 col-sm-10">
          ${dealersHTML}
        </div>
      </div>
    </div>
  `;

  block.innerHTML = '';
  block.insertAdjacentHTML('beforeend', utility.sanitizeHtml(newHtml));

  // Any additional logic (like slider initialization) can be added here
}
