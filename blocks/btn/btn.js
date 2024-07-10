export default function decorate(block) {
    // Extract text content from the block's children
   
    const [logoutTextEl, popupHeadingEl, popupDescEl, linkEl, yesEl, noEl] =
      block.children;
   
    const logoutText = logoutTextEl?.textContent?.trim() || "";
    const popupHeading = popupHeadingEl?.textContent?.trim() || "";
    const popupDesc = popupDescEl?.textContent?.trim() || "";
    const link = linkEl?.querySelector("a")?.href || "#";
    const yesText = yesEl?.textContent?.trim() || "";
    const noText = noEl?.textContent?.trim() || "";
   
    function createLogoutButton() {
      const logoutButton = document.createElement("button");
      logoutButton.id = "logoutButton";
      logoutButton.className = "blue-button";
      logoutButton.textContent = logoutText;
      return logoutButton;
    }
   
    function createModal() {
      const modal = document.createElement("div");
      modal.id = "logoutModal";
      modal.innerHTML = `
        <div class="modal-content">
          <h2>${popupHeading}</h2>
          <p>${popupDesc}</p>
          <button id="yesButton" class="blue-button">${yesText}</button>
          <button id="noButton" class="blue-button">${noText}</button>
        </div>
      `;
      return modal;
    }
   
    function setupEventListeners(logoutButton, modal) {
      logoutButton.addEventListener("click", () => {
        modal.style.display = "block";
      });
   
      const yesButton = modal.querySelector("#yesButton");
      const noButton = modal.querySelector("#noButton");
   
      yesButton.addEventListener("click", () => {
        window.location.href = link;
      });
   
      noButton.addEventListener("click", () => {
        modal.style.display = "none";
      });
   
      window.addEventListener("click", (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    }
   
    const logoutButton = createLogoutButton();
    const modal = createModal();
    block.innerHTML = "";
    block.appendChild(logoutButton);
    block.appendChild(modal);
    setupEventListeners(logoutButton, modal);
  }