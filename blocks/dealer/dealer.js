export default function decorate(block) {
    function getDealerData(block) {
        // Extract elements from the block
        const [backgroundImageContainer, titleEl, linkEl] = block.children;

        // Extract image, title, and link data
        const backgroundImgEl = backgroundImageContainer?.querySelector('img');
        const imageSrc = backgroundImgEl?.src || 'https://via.placeholder.com/150';
        const title = titleEl?.textContent?.trim() || 'Default Title';
        
        // Extract link
        const link = linkEl?.querySelector('a')?.href || '#';

        // Check the 'reveal' condition
        const revealEl = block.querySelector('[data-name="reveal"]');
        const reveal = revealEl ? revealEl.textContent.trim() === 'true' : false;

        // Extract the condition value for the href component
        const hrefEl = block.querySelector('[data-name="href"]');
        const hrefCondition = hrefEl && hrefEl.dataset.condition ? hrefEl.dataset.condition === 'false' : false;

        // Debugging outputs
        console.log('Reveal Element:', revealEl);
        console.log('Reveal Condition:', reveal);
        console.log('Href Element:', hrefEl);
        console.log('Href Condition:', hrefCondition);
        console.log('Link:', link);

        return { imageSrc, title, link, reveal, hrefCondition };
    }

    const { imageSrc, title, link, reveal, hrefCondition } = getDealerData(block);

    function createDealerCard() {
        const dealerCard = document.createElement('div');
        dealerCard.className = 'dealer-card';
        dealerCard.innerHTML = `
            <div class="dealer-content">
                <img src="${imageSrc}" alt="${title}">
                <h2>${title}</h2>
            </div>
        `;
        return dealerCard;
    }

    function setupEventListener(dealerCard) {
        dealerCard.addEventListener('click', (event) => {
            console.log('Click Event:', { reveal, hrefCondition, link });
            if (reveal) {
                // If reveal is true, do not redirect
                event.preventDefault();
                console.log('Reveal is true, not redirecting');
            } else if (!reveal) {
                // If reveal is false and link is valid, redirect
                console.log('Reveal is false and link is valid, redirecting to', link);
                window.location.href = link;
            } else {
                // If none of the above conditions are met, prevent the default action
                event.preventDefault();
                console.log('No valid link or reveal condition not met, preventing default action');
            }
        });
    }

    const dealerCard = createDealerCard();

    // Clear the block and append the new dealer card
    block.innerHTML = '';
    block.appendChild(dealerCard);
    setupEventListener(dealerCard);
}
