export default function decorate(block) {
  function getDealerComponent() {
    const [
      backgroundImageEl,
      titleEl,
      revealEl,
      hrefEl,
      popupTitleEl,
      tab1El,
      tab1BackgroundImageEl,
      text1El,
      tab1HrefEl,
      tab2El,
      tab2BackgroundImageEl,
      text2El,
      tab2HrefEl,
    ] = block.children;

    const backgroundImage = backgroundImageEl?.querySelector('picture');
    const title = titleEl?.textContent?.trim();
    const reveal = revealEl?.querySelector('input[type="checkbox"]')?.checked;
    const href = hrefEl?.querySelector('a')?.href;

    const popupTitle = popupTitleEl?.textContent?.trim();
    const tab1 = tab1El?.textContent?.trim();
    const tab1BackgroundImage = tab1BackgroundImageEl?.querySelector('picture');
    const text1 = text1El?.textContent?.trim();
    const tab1Href = tab1HrefEl?.querySelector('a')?.href;

    const tab2 = tab2El?.textContent?.trim();
    const tab2BackgroundImage = tab2BackgroundImageEl?.querySelector('picture');
    const text2 = text2El?.textContent?.trim();
    const tab2Href = tab2HrefEl?.querySelector('a')?.href;

    return {
      backgroundImage,
      title,
      reveal,
      href,
      popup: {
        title: popupTitle,
        tab1: {
          label: tab1,
          backgroundImage: tab1BackgroundImage,
          text: text1,
          href: tab1Href,
        },
        tab2: {
          label: tab2,
          backgroundImage: tab2BackgroundImage,
          text: text2,
          href: tab2Href,
        },
      },
    };
  }

  const dealerComponent = getDealerComponent();
  
  if (dealerComponent.reveal) {
    // Create and display pop-up
    const popupHtml = `
      <div class="popup">
        <div class="popup-content">
          <span class="close-btn">&times;</span>
          <h2>${dealerComponent.popup.title}</h2>
          <div class="tab">
            <h3>${dealerComponent.popup.tab1.label}</h3>
            ${(dealerComponent.popup.tab1.backgroundImage) ? `<div class="tab__image">${dealerComponent.popup.tab1.backgroundImage.outerHTML}</div>` : ''}
            <p>${dealerComponent.popup.tab1.text}</p>
            <a href="${dealerComponent.popup.tab1.href}" target="_blank">Link</a>
          </div>
          <div class="tab">
            <h3>${dealerComponent.popup.tab2.label}</h3>
            ${(dealerComponent.popup.tab2.backgroundImage) ? `<div class="tab__image">${dealerComponent.popup.tab2.backgroundImage.outerHTML}</div>` : ''}
            <p>${dealerComponent.popup.tab2.text}</p>
            <a href="${dealerComponent.popup.tab2.href}" target="_blank">Link</a>
          </div>
        </div>
      </div>
    `;
    block.innerHTML = `
      ${(dealerComponent.backgroundImage) ? `<div class="dealer__image">${dealerComponent.backgroundImage.outerHTML}</div>` : ''}
      <div class="dealer__content">
        <h2>${dealerComponent.title}</h2>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHtml);
    const popup = document.querySelector('.popup');
    const closeBtn = popup.querySelector('.close-btn');
    block.addEventListener('click', () => {
      popup.style.display = 'block';
    });
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    });
  } else {
    // Redirect to href
    block.innerHTML = `
      ${(dealerComponent.backgroundImage) ? `<div class="dealer__image">${dealerComponent.backgroundImage.outerHTML}</div>` : ''}
      <div class="dealer__content">
        <h2>${dealerComponent.title}</h2>
      </div>
    `;
    block.addEventListener('click', () => {
      window.location.href = dealerComponent.href;
    });
  }
}
