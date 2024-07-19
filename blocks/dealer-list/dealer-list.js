export default function decorate(block) {


console.log(block.outerHTML);

  // const dealerElements = Array.from(block.children);
  
  // const dealers = dealerElements.map(dealer => {
  //   const backgroundImage = dealer.querySelector('[data-name="background_image"]')?.dataset.src || '';
  //   const title = dealer.querySelector('[data-name="title"]')?.textContent?.trim() || '';
  //   const href = dealer.querySelector('[data-name="href"]')?.dataset.href || '';

  //   return { backgroundImage, title, href };
  // });

  // function renderDealer({ backgroundImage, title, href }) {
  //   return `
  //     <div class="dealer">
  //       <div class="dealer__background">
  //         <img src="${backgroundImage}" alt="Background Image">
  //       </div>
  //       <div class="dealer__content">
  //         <h3>${title}</h3>
  //         <a href="${href}" class="dealer__link">Link</a>
  //       </div>
  //     </div>
  //   `;
  // }

  // const dealersHtml = dealers.map(renderDealer).join('');
  
  // const dealerListHtml = `
  //   <div class="dealer-list">
  //     ${dealersHtml}
  //   </div>
  // `;
  
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(dealerListHtml, 'text/html');
  // const dealerListElement = doc.body.firstElementChild;
  
  // // Maintain the dialog box structure
  // dealerElements.forEach((dealerElement, index) => {
  //   const dealerData = dealers[index];
  //   const dealerHtml = renderDealer(dealerData);
  //   const dealerDoc = parser.parseFromString(dealerHtml, 'text/html');
  //   const dealerInnerElement = dealerDoc.body.firstElementChild;
    
  //   dealerElement.innerHTML = dealerInnerElement.innerHTML;
  // });

  // block.innerHTML = '';
  // block.appendChild(dealerListElement);

  // Any additional logic (like slider initialization) can be added here
}
