export default function decorate(block) {


console.log(block);


   const dealerElements = Array.from(block.children);
  
  const dealersHTML = dealerElements.map(dealer => {
    const backgroundImage = dealer.querySelector('img')?.src || '';
    const title = dealer.querySelector('p')?.textContent?.trim() || '';
    const href = dealer.querySelector('a')?.href || '';
    return `
    <li>
    <a href=${href} >
        <div class="d-grid-item">
            <div class="d-grid-item-icon">
                    <img src=${backgroundImage} alt="" title="New Finance Journey">
            </div>

            <div class="d-grid-item-title">
                <p>${title}</p>
            </div>
        </div>
    </a>
</li>
  `;
  }).join('');

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

    block.innerHTML = `<div class="row">
    <div class="col-sm-12">
        <ul class="dealer-menu">
               ${dealersHTML}
        </ul>
    </div>
</div>
</div>`;
  // block.appendChild(dealerListElement);

  // Any additional logic (like slider initialization) can be added here
}
