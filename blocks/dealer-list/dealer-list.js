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
                <h2>${title}</h2>
            </div>
        </div>
    </a>
</li>
  `;
  }).join('');

 

    block.innerHTML = `<div class="row">
    <div class="col-sm-12">
        <ul class="dealer-menu">
               ${dealersHTML}
        </ul>
    </div>
</div>
</div>`;
  

  // Any additional logic (like slider initialization) can be added here
}
