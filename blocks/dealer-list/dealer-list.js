import utility from '../../utility/utility.js';

export default function decorate(block) {
  function getDealerData(block) {
    const dealerListEl = [...block.children];
    return dealerListEl.map((dealer) => {
      const image = dealer.querySelector('picture');
      const title = dealer.querySelector('p')?.textContent?.trim() || '';
      const href = dealer.querySelector('a')?.href || '';

      if (image) {
        const img = image.querySelector('img');
        img.removeAttribute('width');
        img.removeAttribute('height');
      }

      return {
        imageHTML: image ? image.outerHTML : '',
        title,
        href,
      };
    });
  }

  const dealersData = getDealerData(block);

  const dealersHTML = dealersData.map((dealer) => `
    <li>
      <a href="${dealer.href}">
        <div class="d-grid-item">
          <div class="d-grid-item-icon">
            ${dealer.imageHTML ? `<div class="feature__image">${dealer.imageHTML}</div>` : ''}
          </div>
          <div class="d-grid-item-title">
            <h2>${dealer.title}</h2>
          </div>
        </div>
      </a>
    </li>
  `).join('');

  const newHtml = utility.sanitizeHtml(`
    <div class="row">
      <div class="col-sm-12">
        <ul class="dealer-menu">
          ${dealersHTML}
        </ul>
      </div>
    </div>
  `);

  block.innerHTML = newHtml;

  // Any additional logic (like slider initialization) can be added here
}
