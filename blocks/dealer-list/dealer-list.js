export default function decorate(block) {
  function getDealerData(dealerBlock) {
    // Extract elements from the dealer block
    const [backgroundImageContainer, titleEl, linkEl] = dealerBlock.children;
    
    console.log('dealerBlock children:', dealerBlock.children);
    
    // Extract image, title, and link data
    const backgroundImgEl = backgroundImageContainer?.querySelector('img');
    const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
    const title = titleEl?.textContent?.trim() || 'Default Title';
    const link = linkEl?.querySelector('a')?.href || '#';
    
    return { imageSrc, title, link };
  }
  
  function createDealerCard({ imageSrc, title, link }) {
    const dealerCard = document.createElement('li');
    dealerCard.innerHTML = `
      <a href="${link}">
        <div class="d-grid-item">
          <div class="d-grid-item-icon">
            <img src="${imageSrc}" alt="${title}" title="${title}">
          </div>
          <div class="d-grid-item-title">
            ${title}
          </div>
        </div>
      </a>
    `;
    return dealerCard;
  }
  
  // Process each dealer within the dealer-list block
  const dealerBlocks = [...block.children];
  
  console.log('dealerBlocks:', dealerBlocks);
  
  block.innerHTML = '';  // Clear the block
  
  const rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  
  const colDiv = document.createElement('div');
  colDiv.className = 'col-sm-12';
  
  const ul = document.createElement('ul');
  ul.className = 'dealer-menu';
  
  dealerBlocks.forEach(dealerBlock => {
    const dealerData = getDealerData(dealerBlock);
    const dealerCard = createDealerCard(dealerData);
    ul.appendChild(dealerCard);
  });
  
  colDiv.appendChild(ul);
  rowDiv.appendChild(colDiv);
  block.appendChild(rowDiv);
}
