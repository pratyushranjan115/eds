export default function decorate(block) {
    console.log("Decorate function called");
  
    // Extract text content from the block's children
    const [titleEl, imageEl, linkEl] = block.children;
  
    console.log("Extracted elements:", { titleEl, imageEl, linkEl });
  
    if (!titleEl || !imageEl || !linkEl) {
      console.error("One or more required elements are missing:", { titleEl, imageEl, linkEl });
      return;
    }
  
    const title = titleEl?.textContent?.trim() || "Default Title";
    const imageSrc = imageEl?.querySelector("img")?.src || "https://via.placeholder.com/150";
    const link = linkEl?.querySelector("a")?.href || "#";
  
    console.log("Extracted content:", { title, imageSrc, link });
  
    // Create the dealer card element
    function createDealerCard() {
      const dealerCard = document.createElement("div");
      dealerCard.className = "dealer-card";
      dealerCard.innerHTML = `
        <div class="dealer-content">
          <h2>${title}</h2>
          <img src="${imageSrc}" alt="${title}">
          
        </div>
      `;
      return dealerCard;
    }
  
    // Set up click event listener for navigation
    function setupEventListener(dealerCard) {
      dealerCard.addEventListener("click", () => {
        window.location.href = link;
      });
    }
  
    const dealerCard = createDealerCard();
    console.log("Created dealer card:", dealerCard);
  
    // Clear the block and append the new dealer card
    block.innerHTML = "";
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
  
    console.log("Decorate function completed");
  }
  