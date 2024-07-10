export default function decorate(block) {
    // Extract text content from the block's children
    const [titleEl, imageEl, linkEl] = block.children;
  
    const title = titleEl?.textContent?.trim() || "";
    const imageSrc = imageEl?.querySelector("img")?.src || "";
    const link = linkEl?.querySelector("a")?.href || "#";
  
    function createDealerCard() {
      const dealerCard = document.createElement("div");
      dealerCard.className = "dealer-card";
      dealerCard.innerHTML = `
        <div class="dealer-content">
          <img src="${imageSrc}" alt="${title}">
          <h2>${title}</h2>
        </div>
      `;
      return dealerCard;
    }
  
    function setupEventListener(dealerCard) {
      dealerCard.addEventListener("click", () => {
        window.location.href = link;
      });
    }
  
    const dealerCard = createDealerCard();
    block.innerHTML = "";
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
  }
  