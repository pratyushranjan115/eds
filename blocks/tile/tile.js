import utility from '../../utility/utility.js';

export default function decorate(block) {
  function handleOptionSelect(cards, isOption2) {
    cards.forEach((card) => {
      const link = card.querySelector('.tile__link');
      if (isOption2) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          showPopup(card);
        });
      } else {
        link.removeEventListener('click', (e) => {
          e.preventDefault();
          showPopup(card);
        });
      }
    });
  }

  function showPopup(card) {
    const popup = document.createElement('div');
    popup.classList.add('tile__popup');
    const tabs = card.querySelectorAll('.tile__tab');
    tabs.forEach((tab) => {
      popup.appendChild(tab.cloneNode(true));
    });
    document.body.appendChild(popup);
    popup.addEventListener('click', () => {
      popup.remove();
    });
  }

  const [backgroundImageEl, richTextEl, selectEl, ...rest] = block.children;
  const backgroundImage = backgroundImageEl?.querySelector('img')?.src || '';
  const richText = richTextEl?.innerHTML?.trim() || '';

  const select = selectEl?.querySelector('select') || '';
  const options = select?.options || [];

  const tabs = rest.map((tab) => {
    const tabContainer = document.createElement('div');
    tabContainer.classList.add('tile__tab');
    tabContainer.innerHTML = tab.innerHTML;
    return tabContainer;
  });

  const cardHTML = `
    <div class="tile__card">
      <img src="${backgroundImage}" alt="Background Image" class="tile__image"/>
      <div class="tile__content">${richText}</div>
      <a href="#" class="tile__link">Read More</a>
    </div>
  `;

  block.innerHTML = utility.sanitizeHtml(cardHTML);
  const card = block.querySelector('.tile__card');
  tabs.forEach((tab) => card.appendChild(tab));

  const isOption2 = select?.value === 'option2';
  handleOptionSelect([card], isOption2);

  select.addEventListener('change', () => {
    const isOption2 = select?.value === 'option2';
    handleOptionSelect([card], isOption2);
  });
}
